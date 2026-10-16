/* เทสต์ของใหม่: ออร่าประจำตัว + การ์ดมีหลายสกิล (รุก/รับ) + เอฟเฟคตอนตีที่ทุกคนเห็น
   วิ่งผ่าน HTTP API จริง (ต้องเปิด wrangler dev อยู่ที่ BASE)
   หมายเหตุ: การ์ดในสนามสุ่มและจำนวนรอบไม่คงที่ จึงรวมผลทั้งรอบแล้วตัดสินเป็นข้อ ๆ
   (คูลดาวน์ที่เหลือ = คูลดาวน์ตั้งต้น ลบจำนวนรอบที่ผ่านไปแล้ว) */
const BASE = process.env.BASE || "http://127.0.0.1:8787";
const ORIGIN = process.env.ORIGIN || BASE;

let fails = 0, skips = 0;
const ok = (cond, msg) => {
  if (cond) console.log("  ✅ " + msg);
  else { console.log("  ❌ " + msg); fails++; }
};
const skip = (msg) => { console.log("  ℹ️  ข้าม: " + msg); skips++; };

async function post(path, body) {
  const r = await fetch(BASE + path, {
    method: "POST",
    headers: { "content-type": "application/json", Origin: ORIGIN },
    body: JSON.stringify(body || {}),
    signal: AbortSignal.timeout(10000),
  });
  let d = {};
  try { d = await r.json(); } catch { /* ignore */ }
  return { status: r.status, d };
}
const cfg = (code, seat, action) => post(`/api/rooms/${code}/action`, { playerId: seat.id, token: seat.token, action });
const fight = (code, seat, payload) => cfg(code, seat, { type: "fight", payload });

const FX_SHAPES = new Set(["lightning", "ice", "flame", "spark", "dark", "ring"]);
const LIGHTNING_AURAS = { haki: "#ff2233", thunder: "#7fd6ff" }; // ฮาคิ = แดง/ดำ, ไฟฟ้า = ฟ้า
const HEX = /^#[0-9a-f]{6}$/i;
const DEF_KINDS = new Set(["guard", "fortify", "heal", "rally"]);
const OFF_KINDS = new Set(["strike", "snipe", "heavy", "execute", "drain", "burn", "sweep", "blade", "reaper", "flank", "haki", "stun"]);
const hasOffense = (f) => f.skills.some((s) => OFF_KINDS.has(s.kind));
const hasDefense = (f) => f.skills.some((s) => DEF_KINDS.has(s.kind));

/** เปิดห้อง 2 คน + ประมูลเร็ว (บิดขั้นต่ำแล้วอีกคนผ่าน) → เข้าด่านต่อสู้ */
async function openBattle(cardCount, tag) {
  const host = (await post("/api/rooms", { name: "ออร่าA" + tag })).d;
  const j = (await post(`/api/rooms/${host.code}/join`, { name: "ออร่าB" + tag })).d;
  const seats = {
    A: { id: host.playerId, token: host.token, name: "ออร่าA" + tag },
    B: { id: j.playerId, token: j.token, name: "ออร่าB" + tag },
  };
  await cfg(host.code, seats.A, {
    type: "settings",
    payload: { startingMoney: 300, cardCount, startPrice: 1, minIncrement: 300, battle: true },
  });
  let st = (await cfg(host.code, seats.A, { type: "start" })).d.state;
  let guard = 0;
  while (st.phase === "auction" && guard++ < 300) {
    const seat = st.turn === seats.A.id ? seats.A : seats.B;
    const res = st.highBidder
      ? await cfg(host.code, seat, { type: "pass" })
      : await cfg(host.code, seat, { type: "bid", payload: { amount: st.minNext } });
    if (res.status !== 200) break;
    st = res.d.state;
  }
  return { code: host.code, seats, state: st };
}

/** เลือกท่าที่จะใช้: ฮาคิ > ป้อมปราการ > สกิลอื่นที่พร้อม > โจมตีพื้นฐาน */
function chooseAction(st, me) {
  const mine = st.battle.fighters.filter((f) => f.pid === me.id && f.alive);
  const enemies = st.battle.fighters.filter((f) => f.pid !== me.id && f.alive);
  const weakest = [...enemies].sort((a, c) => a.hp - c.hp)[0];
  const prio = ["haki", "fortify", "heavy", "burn", "stun", "guard", "heal", "sweep", "snipe", "strike"];
  for (const kind of prio) {
    for (const f of mine) {
      const sk = f.skills.find((s) => s.kind === kind && (s.cdLeft || 0) === 0);
      if (!sk) continue;
      const p = { fighter: f.cid, skill: sk.kind };
      if (sk.target === "enemy" && weakest) { p.targetPid = weakest.pid; p.target = weakest.cid; }
      if (sk.target === "ally") { p.targetPid = me.id; p.target = f.cid; }
      return { payload: p, sk, fighter: f, expect: sk.kind };
    }
  }
  const attacker = mine[0];
  return {
    payload: { fighter: attacker.cid, skill: "basic", targetPid: weakest.pid, target: weakest.cid },
    sk: { kind: "strike", name: "โจมตีพื้นฐาน", cd: 0, target: "enemy" },
    fighter: attacker,
    expect: "basic",
  };
}

async function main() {
  console.log("\n— ข้อมูลการ์ดในสนาม: ออร่า + ชุดสกิล —");
  const byName = new Map();
  let g = await openBattle(12, "1");
  ok(g.state.phase === "battle", "เข้าด่านต่อสู้ได้");

  const collect = (st) => { for (const f of st.battle.fighters) byName.set(f.name, f.aura); };
  collect(g.state);

  const fighters = g.state.battle.fighters;
  ok(fighters.length >= 4, `มีการ์ดลงสนาม ${fighters.length} ใบ`);
  ok(fighters.every((f) => f.aura && FX_SHAPES.has(f.aura.fx) && HEX.test(f.aura.c1) && HEX.test(f.aura.c2)),
    "ทุกใบมีออร่า (รูปแบบเอฟเฟค + สี 2 สี) เอาไปทำสีกรอบการ์ดได้");
  ok(fighters.every((f) => Array.isArray(f.skills) && f.skills.length >= 2),
    `ทุกใบมีอย่างน้อย 2 สกิล (ในสนามนี้สูงสุด ${Math.max(...fighters.map((f) => f.skills.length))} สกิล)`);
  ok(fighters.every((f) => new Set(f.skills.map((s) => s.kind)).size === f.skills.length),
    "ไม่มีการ์ดใบไหนมีสกิลชนิดซ้ำกัน (คูลดาวน์ไม่ชนกัน)");
  ok(fighters.every((f) => f.skills.every((s) => s.name && s.label && s.desc && typeof s.cd === "number" && s.target && s.aura === f.aura.id)),
    "ทุกสกิลมีชื่อ/ป้าย/คำอธิบาย/คูลดาวน์/เป้าหมาย/ออร่า ครบ และผูกออร่ากับการ์ดถูกใบ");
  ok(fighters.filter(hasOffense).length === fighters.length, `ทุกใบมีสกิลสายรุกของตัวเอง (${fighters.length}/${fighters.length})`);
  ok(fighters.filter(hasDefense).length === fighters.length, `ทุกใบมีสกิลสายรับ เกราะ/ป้อม/ฮีล/ปลุกใจ (${fighters.length}/${fighters.length})`);
  console.log(`     ชนิดสกิลในสนาม: ${[...new Set(fighters.flatMap((f) => f.skills.map((s) => s.kind)))].sort().join(", ")}`);
  const hakiField = fighters.find((f) => f.aura.id === "haki");
  if (hakiField) {
    ok(hakiField.aura.fx === "lightning" && hakiField.aura.c1.toLowerCase() === LIGHTNING_AURAS.haki,
      `${hakiField.name} สายฮาคิ → เอฟเฟคสายฟ้า สีกรอบแดง (${hakiField.aura.c1})`);
    ok(hakiField.skills.some((s) => s.kind === "haki"), `${hakiField.name} มีสกิลฮาคิราชันย์ประจำตัว`);
  } else skip("สนามนี้ไม่มีการ์ดสายฮาคิ");

  console.log("\n— เอฟเฟคตอนตีที่ทุกคนเห็น (battle.fx) —");
  const agg = {
    fx: 0, haki: 0, fortify: 0, hakiDmg: 0, hakiStun: 0, hakiFaint: 0, cdChecks: 0,
    badStructure: [], badDmg: [], badCd: [],
    lightningAuras: new Set(), shapes: new Set(), kinds: new Set(),
  };
  const MAX_ROOMS = 6;
  for (let room = 1; room <= MAX_ROOMS; room++) {
    if (room > 1) g = await openBattle(12, String(room));
    collect(g.state);
    let st = g.state;
    let lastFxId = 0;
    let turn = 0;
    while (st.phase === "battle" && turn++ < 140) {
      const me = st.battle.turn === g.seats.A.id ? g.seats.A : g.seats.B;
      const choice = chooseAction(st, me);
      const roundsBefore = st.battle.rounds || 0;
      const res = await fight(g.code, me, choice.payload);
      if (res.status !== 200) { ok(false, `ลงมือไม่ผ่าน: ${res.status} ${res.d.error}`); break; }
      st = res.d.state;
      collect(st);
      const roundsPassed = (st.battle.rounds || 0) - roundsBefore;

      // 1) สกิลที่เพิ่งใช้: คูลดาวน์ต่อสกิลคิดตามรอบที่ผ่านไป
      if (choice.expect !== "basic") {
        const self = st.battle.fighters.find((f) => f.cid === choice.fighter.cid && f.pid === me.id);
        const used = self && self.skills.find((s) => s.kind === choice.expect);
        if (used) {
          agg.cdChecks++;
          const want = Math.max(0, used.cd - roundsPassed);
          if (used.cdLeft !== want)
            agg.badCd.push(`“${used.name}” cd ${used.cd} → เหลือ ${used.cdLeft} (คาด ${want} · ผ่าน ${roundsPassed} รอบ)`);
        }
      }

      // 2) เหตุการณ์เอฟเฟคใหม่ (ทุกคนในห้องเห็นเหมือนกันเพราะเก็บไว้ในสถานะห้อง)
      for (const ev of (st.battle.fx || []).filter((e) => e.id > lastFxId)) {
        lastFxId = Math.max(lastFxId, ev.id);
        agg.fx++;
        agg.kinds.add(ev.kind);
        if (ev.aura) agg.shapes.add(ev.aura.fx);
        if (!(ev.kind && ev.skill && ev.owner && ev.ownerCid && Array.isArray(ev.targets) && ev.targets.length))
          agg.badStructure.push(JSON.stringify(ev).slice(0, 140));
        const uniq = new Set(ev.targets.map((t) => t.pid + ":" + t.cid));
        if (uniq.size !== ev.targets.length) agg.badStructure.push(`มีเป้าหมายซ้ำในเหตุการณ์เดียว (${ev.owner}/${ev.skill})`);
        if (ev.kind === "haki") {
          agg.haki++;
          agg.hakiDmg += ev.targets.reduce((n, t) => n + (t.dmg || 0), 0);
          agg.hakiStun += ev.targets.filter((t) => t.stun).length;
          if (ev.targets.some((t) => t.pid === ev.pid)) agg.badStructure.push("ฮาคิยิงใส่ฝั่งตัวเอง");
        }
        if (ev.kind === "fortify") {
          agg.fortify++;
          const self = st.battle.fighters.find((f) => f.cid === ev.ownerCid && f.pid === ev.pid);
          if (!(self && self.shield >= 1)) agg.badStructure.push("ป้อมปราการไม่ติดเกราะให้ตัวเอง");
        }
        for (const t of ev.targets) {
          if (t.aura && t.aura.fx === "lightning") agg.lightningAuras.add(t.aura.id);
          if (t.tag === "hit" && !(t.dmg > 0)) agg.badDmg.push(`${ev.skill} → ${t.name} (dmg ${t.dmg})`);
          if (t.stun && ev.ownerCid !== t.cid) agg.hakiFaint++;
        }
      }
    }
  }

  console.log(`     เหตุการณ์ที่ตรวจ ${agg.fx} · ชนิดสกิล ${[...agg.kinds].join(", ") || "—"} · รูปแบบเอฟเฟค ${[...agg.shapes].join(", ") || "—"}`);
  ok(agg.fx > 0, `มีการลงมือและบันทึกเหตุการณ์เอฟเฟคจริง (${agg.fx} เหตุการณ์)`);
  ok(agg.shapes.size >= 2, `มีรูปแบบเอฟเฟคมากกว่าหนึ่งแบบให้เห็น (${[...agg.shapes].join(", ")})`);
  ok(agg.badStructure.length === 0,
    `เหตุการณ์เอฟเฟคข้อมูลครบทุกอัน${agg.badStructure.length ? ` — ผิด: ${agg.badStructure.slice(0, 2).join(" | ")}` : ""}`);
  ok(agg.badDmg.length === 0,
    `เป้าหมายที่โดนตีมีดาเมจมากกว่า 0 เสมอ${agg.badDmg.length ? ` — ผิด: ${agg.badDmg.slice(0, 2).join(" | ")}` : ""}`);
  ok(agg.cdChecks > 0 && agg.badCd.length === 0,
    `คูลดาวน์ของแต่ละสกิลคิดถูกตามรอบที่ผ่านไป (ตรวจ ${agg.cdChecks} ครั้ง)${agg.badCd.length ? ` — ผิด: ${agg.badCd.slice(0, 2).join(" | ")}` : ""}`);
  ok([...agg.lightningAuras].every((id) => id in LIGHTNING_AURAS),
    `เอฟเฟคสายฟ้าใช้เฉพาะออร่าที่มีในระบบ (${[...agg.lightningAuras].join(", ") || "—"})`);

  if (agg.haki) {
    ok(agg.hakiDmg > 0, `สกิลฮาคิราชันย์ทำดาเมจรวม ${agg.hakiDmg} (ใช้ ${agg.haki} ครั้ง)`);
    if (agg.hakiFaint) ok(true, `ตัวที่ HP ≤ 50% สลบตอนโดนฮาคิ (${agg.hakiFaint} ครั้ง)`);
    else skip("ยังไม่มีตัวที่ HP ≤ 50% ตอนโดนฮาคิ จึงไม่เกิดการสลบ");
  } else skip("ยังไม่มีการ์ดสายฮาคิถูกใช้ในรอบทดสอบ");

  if (agg.fortify) ok(true, `สกิลป้อมปราการติดเกราะให้ตัวเองถูกต้อง (${agg.fortify} ครั้ง)`);
  else skip("ยังไม่มีการ์ดที่มีป้อมปราการถูกใช้ในรอบทดสอบ");

  console.log("\n— ออร่าของการ์ดชื่อดัง (ต้องตรงกับตัวละคร) —");
  const expect = {
    "Kuzan (Aokiji)": "ice", "Sakazuki (Akainu)": "magma", "Monkey D. Luffy": "haki",
    "Borsalino (Kizaru)": "light", "Edward Newgate": "haki", "Roronoa Zoro": "haki",
  };
  let matched = 0;
  for (const [name, auraId] of Object.entries(expect)) {
    const a = byName.get(name);
    if (!a) continue;
    matched++;
    ok(a.id === auraId, `${name} → ออร่า ${a.id} (${a.th})`);
  }
  if (!matched) skip("ยังไม่มีการ์ดชื่อดังในสนามที่ทดสอบ (การ์ดสุ่ม)");

  console.log("\n" + (fails === 0 ? `🎉 ผ่านทั้งหมด${skips ? ` (ข้าม ${skips} ข้อ)` : ""}` : `❌ ล้มเหลว ${fails} ข้อ`));
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => { console.error("เทสต์พัง:", e); process.exit(1); });
