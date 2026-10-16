/* เทสต์ด่าน "เอาการ์ดมาตีกัน" (เทิร์นเบส + สกิลประจำการ์ด) ผ่าน HTTP API จริง */
const BASE = process.env.BASE || "http://127.0.0.1:8787";
const ORIGIN = process.env.ORIGIN || BASE;

let fails = 0, skips = 0;
const ok = (cond, msg) => {
  if (cond) console.log("  ✅ " + msg);
  else { console.log("  ❌ " + msg); fails++; }
};
const skip = (msg) => { console.log("  ℹ️  ข้าม: " + msg); skips++; };

async function post(path, body, origin = ORIGIN) {
  const headers = { "content-type": "application/json" };
  if (origin) headers.Origin = origin;
  const r = await fetch(BASE + path, { method: "POST", headers, body: JSON.stringify(body || {}), signal: AbortSignal.timeout(10000) });
  let d = {};
  try { d = await r.json(); } catch { /* ignore */ }
  return { status: r.status, d };
}
const cfg = (code, seat, action) => post(`/api/rooms/${code}/action`, { playerId: seat.id, token: seat.token, action });
const fight = (code, seat, payload) => cfg(code, seat, { type: "fight", payload });
const sync = (code, seat) => post(`/api/rooms/${code}/sync`, { playerId: seat.id, token: seat.token });

/* ประมูลให้จบเร็ว ๆ: คนแรกของรอบบิด 1 บาท ส่วนที่เหลือผ่าน (ตั้ง minIncrement สูง) */
async function playAuction(code, seats) {
  let st = (await sync(code, seats[0])).d.state;
  let guard = 0;
  while (st.phase === "auction" && guard++ < 400) {
    const seat = seats.find((s) => s.id === st.turn);
    if (!seat) break;
    const res = st.highBidder
      ? await cfg(code, seat, { type: "pass" })
      : await cfg(code, seat, { type: "bid", payload: { amount: st.minNext } });
    if (res.status !== 200) { console.log("  ⚠️ ประมูลล้มเหลว:", res.status, res.d); break; }
    st = res.d.state;
  }
  return st;
}

/** เปิดห้องใหม่ + ประมูลจบเร็ว ๆ + เข้าด่านต่อสู้ทันที */
async function freshBattle(n, settings = {}) {
  const host = (await post("/api/rooms", { name: "P1" })).d;
  const seats = [{ id: host.playerId, token: host.token, name: "P1" }];
  for (let i = 2; i <= n; i++) {
    const j = (await post(`/api/rooms/${host.code}/join`, { name: "P" + i })).d;
    seats.push({ id: j.playerId, token: j.token, name: "P" + i });
  }
  await cfg(host.code, seats[0], {
    type: "settings",
    payload: { startingMoney: 400, cardCount: n * 3, startPrice: 1, minIncrement: 100, battle: true, ...settings },
  });
  await cfg(host.code, seats[0], { type: "start" });
  const st = await playAuction(host.code, seats);
  return { code: host.code, seats, state: st };
}

/* ทดสอบสกิลช่วยทีม/บัฟ: เกราะ ปลุกใจ และฮีล (ต้องเล่นหลายห้องเพราะการ์ดสุ่ม) */
async function testSupportAndBuffs() {
  console.log("\n— สกิลช่วยทีม/บัฟทำงานจริง —");
  const done = { guard: false, guardFade: false, rally: false, heal: false };
  const allDone = () => Object.values(done).every(Boolean);

  for (let attempt = 1; attempt <= 16 && !allDone(); attempt++) {
    const g = await freshBattle(2, { cardCount: 8 });
    const me = g.seats[0];
    const foe = g.seats[1];
    let st = g.state;
    let pendingGuard = null;
    let guardTurns = 0;

    while (st.phase === "battle" && guardTurns++ < 80) {
      const turnPid = st.battle.turn;
      const seat = turnPid === me.id ? me : foe;
      const mine = st.battle.fighters.filter((f) => f.pid === turnPid && f.alive);
      const enemies = st.battle.fighters.filter((f) => f.pid !== turnPid && f.alive);
      let action = null;

      if (turnPid === me.id) {
        if (pendingGuard) {
          const f2 = st.battle.fighters.find((f) => f.cid === pendingGuard.cid);
          if (f2) {
            ok(f2.shield === 1, `เกราะลดลงเมื่อผ่านไป 1 เทิร์นของตัวเอง (เหลือ ${f2.shield})`);
            done.guardFade = true;
          }
          pendingGuard = null;
        }
        const free = (kind) => mine.find((f) => f.skill.kind === kind && f.cd === 0);
        const guardF = !done.guard ? free("guard") : null;
        const rallyF = !done.rally ? free("rally") : null;
        const healF = !done.heal ? free("heal") : null;

        if (guardF) {
          const r = await fight(g.code, me, {
            fighter: guardF.cid, skill: guardF.skill.kind, targetPid: me.id, target: guardF.cid,
          });
          if (r.status === 200) {
            const after = r.d.state.battle.fighters.find((f) => f.cid === guardF.cid);
            ok(after.shield === 2, `${guardF.skill.name} (ตั้งการ์ด) ติดเกราะ 2 เทิร์น`);
            done.guard = true;
            pendingGuard = { cid: guardF.cid };
            st = r.d.state;
            continue;
          }
        } else if (rallyF) {
          const r = await fight(g.code, me, { fighter: rallyF.cid, skill: rallyF.skill.kind });
          if (r.status === 200) {
            const after = r.d.state.battle.fighters.find((f) => f.cid === rallyF.cid);
            ok(after.buff === 2 && after.effAtk === Math.round(rallyF.atk * 1.4),
              `${rallyF.skill.name} (ปลุกใจ) เพิ่มพลังโจมตี ${rallyF.atk} → ${after.effAtk}`);
            done.rally = true;
            st = r.d.state;
            continue;
          }
        } else if (healF) {
          const lowest = [...mine].sort((a, c) => a.hp / a.maxHp - c.hp / c.maxHp)[0];
          const r = await fight(g.code, me, {
            fighter: healF.cid, skill: healF.skill.kind, targetPid: me.id, target: lowest.cid,
          });
          if (r.status === 200) {
            const after = r.d.state.battle.fighters.find((f) => f.cid === lowest.cid);
            ok(after.hp >= lowest.hp && after.hp <= after.maxHp,
              `${healF.skill.name} (ฮีล) ฟื้น HP และไม่เกินหลอดสูงสุด (${lowest.hp} → ${after.hp}/${after.maxHp})`);
            done.heal = true;
            st = r.d.state;
            continue;
          }
        }
        // ไม่มีสกิลที่ต้องทดสอบแล้ว → โจมตีพื้นฐานเพื่อเดินเกม
        const attacker = mine.find((f) => f.skill.target === "enemy") || mine[0];
        const tgt = [...enemies].sort((x, y) => x.hp - y.hp)[0];
        action = { type: "fight", payload: { fighter: attacker.cid, skill: "basic", targetPid: tgt.pid, target: tgt.cid } };
      } else {
        action = { type: "autoplay" };
      }

      const res = await cfg(g.code, seat, action);
      if (res.status !== 200) { console.log(`  ⚠️ ${res.status} ${res.d.error}`); break; }
      st = res.d.state;
    }
    if (!allDone() && attempt === 1) console.log("     (ยังไม่ครบ — การ์ดสุ่มยังไม่ติดสกิลที่เหลือ กำลังเปิดห้องใหม่)");
  }
  ok(allDone(), `ทดสอบสกิลช่วยทีม/บัฟครบทุกแบบ (${Object.keys(done).filter((k) => done[k]).join(", ")})`);
}

async function main() {
  console.log("\n— เตรียมเกม: 3 ผู้เล่น + โหมดต่อสู้เปิด —");
  const host = (await post("/api/rooms", { name: "หนึ่ง" })).d;
  const j2 = (await post(`/api/rooms/${host.code}/join`, { name: "สอง" })).d;
  const j3 = (await post(`/api/rooms/${host.code}/join`, { name: "สาม" })).d;
  const code = host.code;
  const A = { id: host.playerId, token: host.token, name: "หนึ่ง" };
  const B = { id: j2.playerId, token: j2.token, name: "สอง" };
  const C = { id: j3.playerId, token: j3.token, name: "สาม" };
  const seats = [A, B, C];
  const seatOf = (id) => seats.find((s) => s.id === id);

  let st = (await cfg(code, A, {
    type: "settings",
    payload: { startingMoney: 200, cardCount: 6, startPrice: 1, minIncrement: 100, battle: true },
  })).d.state;
  ok(st.settings.battle === true, "เปิดโหมดต่อสู้การ์ดในการตั้งค่าได้");

  st = (await cfg(code, A, { type: "start" })).d.state;
  ok(st.phase === "auction", "เริ่มที่ด่านประมูล");
  st = await playAuction(code, seats);
  ok(st.phase === "battle", "ประมูลครบแล้วเข้าด่านต่อสู้ (battle) อัตโนมัติ");

  const b = st.battle;
  ok(!!b, "มีข้อมูลการต่อสู้ส่งมาให้ไคลเอนต์");
  ok(b.fighters.length === 6, `ทุกการ์ดที่ประมูลได้ลงสนามครบ (${b.fighters.length} ตัว)`);
  ok(b.order.length === 3, "ผู้เล่นที่มีการ์ดอยู่ในลำดับเทิร์น 3 คน");
  ok(b.fighters.every((f) => f.alive && f.hp > 0), "ทุกตัวเริ่มด้วย HP เต็มและยังไม่หมดสติ");

  const sample = b.fighters[0];
  const hpOk = sample.maxHp === 50 + Math.round(sample.pl * 0.8);
  const atkOk = sample.atk === 10 + Math.round(sample.pl * 0.2);
  ok(hpOk && atkOk, `HP/พลังโจมตีคิดจาก PL ถูกต้อง (${sample.name} PL${sample.pl} → HP ${sample.maxHp} ATK ${sample.atk})`);
  ok(b.fighters.every((f) => f.skill && f.skill.name && f.skill.desc && f.skill.kind), "ทุกตัวมีสกิลประจำการ์ดของตัวเอง");
  const skillNames = new Set(b.fighters.map((f) => f.skill.name));
  console.log(`     สกิลในสนาม: ${b.fighters.map((f) => `${f.name}=${f.skill.name}(${f.skill.label})`).join(", ")}`);
  ok(skillNames.size === b.fighters.length, "ชื่อสกิลไม่ซ้ำกันเลย");

  ok(b.turn === b.order[0].pid, "เทิร์นแรกเป็นของผู้เล่นคนแรกในลำดับ");
  ok(b.turns === 1, "นับเทิร์นเริ่มที่ 1");

  console.log("\n— กติกาการลงมือ —");
  const notTurn = seats.find((s) => s.id !== b.turn);
  const notTurnFight = b.fighters.find((f) => f.pid === notTurn.id && f.alive);
  const wrong = await fight(code, notTurn, { fighter: notTurnFight.cid, skill: notTurnFight.skill.kind });
  ok(wrong.status === 400, "คนที่ไม่ถึงเทิร์นสั่งตีไม่ได้");

  let turnSeat = seatOf(b.turn);
  const myFighters = b.fighters.filter((f) => f.pid === b.turn && f.alive);
  const attackers = myFighters.filter((f) => f.skill.target === "enemy");
  const supporters = myFighters.filter((f) => f.skill.target === "ally");
  const enemies = b.fighters.filter((f) => f.pid !== b.turn && f.alive);

  if (attackers.length) {
    const a0 = attackers[0];
    const selfHit = await fight(code, turnSeat, {
      fighter: a0.cid, skill: a0.skill.kind, targetPid: b.turn, target: a0.cid,
    });
    ok(selfHit.status === 400, `สกิลโจมตีเล็งตัวเองไม่ได้ (${a0.skill.label})`);
  } else skip("ผู้เล่นคนแรกไม่มีการ์ดสกิลโจมตีในมือ");

  if (supporters.length) {
    const s0 = supporters[0];
    const enemyHit = await fight(code, turnSeat, {
      fighter: s0.cid, skill: s0.skill.kind, targetPid: enemies[0].pid, target: enemies[0].cid,
    });
    ok(enemyHit.status === 400, `สกิลช่วยทีมใช้กับศัตรูไม่ได้ (${s0.skill.label})`);
  } else skip("ผู้เล่นคนแรกไม่มีการ์ดสกิลช่วยทีมในมือ");

  const ghost = await fight(code, turnSeat, { fighter: "nope", skill: "strike" });
  ok(ghost.status === 400, "ส่งการ์ดที่ไม่มีในสนามไม่ได้");

  console.log("\n— ลงมือจริง 1 เทิร์น —");
  // เลือกตัวที่คูลดาวน์ยาวสุด (แล้วค่อยดู HP มาก) เพื่อทดสอบว่าคูลดาวน์เดินหน้าจริง
  const attacker = [...(attackers.length ? attackers : myFighters)]
    .sort((x, y) => y.skill.cd - x.skill.cd || y.hp - x.hp)[0];
  const target = [...enemies].sort((x, y) => x.hp - y.hp)[0];
  const hpBefore = target.hp;
  const usedCd = attacker.skill.cd;
  const hit = await fight(code, turnSeat, {
    fighter: attacker.cid, skill: attacker.skill.kind, targetPid: target.pid, target: target.cid,
  });
  ok(hit.status === 200, `สั่งใช้สกิลได้ (${attacker.skill.name})`);
  st = hit.d.state;
  const targetAfter = st.battle.fighters.find((f) => f.cid === target.cid && f.pid === target.pid);
  const attackerAfter = st.battle.fighters.find((f) => f.cid === attacker.cid && f.pid === attacker.pid);
  if (attacker.skill.kind === "sweep") ok(st.battle.fighters.some((f) => f.alive && f.hp < f.maxHp), "สกิลกวาดล้างทำดาเมจหลายตัว");
  else ok(targetAfter.hp < hpBefore, `เป้าหมายโดนดาเมจ (${hpBefore} → ${targetAfter.hp})`);
  if (usedCd > 0) ok(attackerAfter.cd === usedCd, `ติดคูลดาวน์ตามที่การ์ดกำหนด (พัก ${attackerAfter.cd} เทิร์น)`);
  else ok(attackerAfter.cd === 0, "สกิลไม่มีคูลดาวน์ ใช้ซ้ำได้ทุกเทิร์น");
  ok(st.battle.turn !== b.turn, "หลังลงมือแล้วส่งเทิร์นต่อให้คนถัดไป");

  console.log("\n— ครบรอบ: คูลดาวน์ต้องเดินหน้า —");
  // จำนวนรอบที่ผ่านไปนับจาก rounds ของการต่อสู้ (รอบละ 1 การลดคูลดาวน์)
  const roundsBefore = st.battle.rounds;
  let guard = 0;
  while (st.battle.turn !== b.turn && st.phase === "battle" && guard++ < 10) {
    const other = seatOf(st.battle.turn);
    const res = await cfg(code, other, { type: "autoplay" });
    if (res.status !== 200) { ok(false, `บอทเล่นแทนไม่ได้: ${res.d.error}`); break; }
    st = res.d.state;
  }
  ok(st.battle.turn === b.turn, "วนครบรอบแล้วกลับมาถึงเทิร์นเดิมอีกครั้ง");
  const roundsPassed = (st.battle.rounds || 0) - roundsBefore;
  ok(roundsPassed >= 1, `นับจำนวนรอบที่ผ่านไปได้ (${roundsPassed} รอบ)`);
  const attackerRound2 = st.battle.fighters.find((f) => f.cid === attacker.cid && f.pid === attacker.pid);
  if (attackerRound2 && attackerRound2.alive) {
    if (usedCd > 0)
      ok(attackerRound2.cd === Math.max(0, usedCd - roundsPassed),
        `คูลดาวน์ลดลงรอบละ 1 (${usedCd} → ${attackerRound2.cd} หลังผ่าน ${roundsPassed} รอบ)`);
    const alive = st.battle.fighters.filter((f) => f.pid !== b.turn && f.alive);
    if (alive.length) {
      const tgt = [...alive].sort((x, y) => x.hp - y.hp)[0];
      const again = await fight(code, turnSeat, {
        fighter: attacker.cid, skill: attacker.skill.kind, targetPid: tgt.pid, target: tgt.cid,
      });
      if (attackerRound2.cd > 0) {
        ok(again.status === 400 && /พักอีก/.test(again.d.error || ""), `สกิลที่ยังพักอยู่ใช้ซ้ำไม่ได้ (${again.d.error})`);
        const basic = await fight(code, turnSeat, {
          fighter: attacker.cid, skill: "basic", targetPid: tgt.pid, target: tgt.cid,
        });
        ok(basic.status === 200, "สกิลติดคูลดาวน์ก็ยังใช้โจมตีพื้นฐานได้ (เกมไม่ค้าง)");
        st = basic.d.state || (await sync(code, turnSeat)).d.state;
      } else {
        ok(again.status === 200, "สกิลคูลดาวน์หมดแล้วใช้ซ้ำได้");
        st = again.d.state || (await sync(code, turnSeat)).d.state;
      }
    } else skip("ไม่มีศัตรูเหลือให้ทดสอบสกิลซ้ำ");
  } else skip("การ์ดที่เลือกตายก่อนครบรอบ");

  console.log("\n— เล่นจนจบสงคราม —");
  guard = 0;
  while (st.phase === "battle" && guard++ < 200) {
    const seat = seatOf(st.battle.turn);
    const res = await cfg(code, seat, { type: "autoplay" });
    if (res.status !== 200) { ok(false, `เล่นต่อไม่ได้: ${res.status} ${res.d.error}`); break; }
    st = res.d.state;
  }
  ok(st.phase === "ended", `การต่อสู้จบและเข้าสู่หน้าสรุป (${st.battle.result && st.battle.result.reason})`);
  const res = st.battle.result;
  ok(!!res && !!res.winnerPid, `มีผู้ชนะสงคราม: ${res && res.winnerName} (+${res && res.bonus} คะแนน)`);
  const survivors = st.battle.fighters.filter((f) => f.alive);
  ok(survivors.every((f) => f.pid === res.winnerPid) || res.timeout,
    res.timeout ? "จบเพราะหมดเวลา — ตัดสินจากตัวที่รอด" : "ตัวที่รอดทั้งหมดเป็นของผู้ชนะ");

  console.log("\n— คะแนนรวม —");
  ok(Array.isArray(st.scores) && st.scores.length === 3, "มีตารางคะแนน 3 คน");
  ok(st.scores.every((r) => r.total === r.pl + r.synergy + r.battle),
    "คะแนนรวม = พลัง + ทีมเวิร์ค + คะแนนสงคราม");
  ok(st.scores.every((r) => r.total >= 0), "ไม่มีคะแนนติดลบ");
  ok(st.scores[0].total >= st.scores[1].total, "อันดับเรียงจากมากไปน้อย");
  const winnerRow = st.scores.find((r) => r.id === res.winnerPid);
  ok(!!winnerRow && winnerRow.battle >= res.bonus, `ผู้ชนะได้โบนัสสงครามครบ (${winnerRow && winnerRow.battle} คะแนน)`);
  const totalKos = st.scores.reduce((n, r) => n + r.kos, 0);
  ok(totalKos > 0, `มีการล้มเกิดขึ้นจริง (KO รวม ${totalKos} ตัว)`);
  console.log(`     คะแนน: ${st.scores.map((r) => `${r.name} ${r.total} (PL ${r.pl} + ทีม ${r.synergy} + สงคราม ${r.battle}, KO ${r.kos})`).join(" | ")}`);

  await testSupportAndBuffs();

  console.log("\n— เล่นใหม่หลังสงคราม —");
  const rst = await cfg(code, A, { type: "reset" });
  ok(rst.d.state.phase === "lobby", "รีเซ็ตกลับห้องรอได้");
  ok(rst.d.state.battle === null, "ข้อมูลการต่อสู้ถูกล้างทั้งหมด");

  console.log("\n" + (fails === 0 ? `🎉 ผ่านทั้งหมด${skips ? ` (ข้าม ${skips} ข้อ)` : ""}` : `❌ ล้มเหลว ${fails} ข้อ`));
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => { console.error("เทสต์พัง:", e); process.exit(1); });
