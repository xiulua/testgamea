/* ทดสอบเพิ่มเติม: 4 ผู้เล่น และระบบ auto-skip คนที่หลุด */
const BASE = process.env.BASE || "http://127.0.0.1:8787";
let fails = 0;
const ok = (c, m) => { if (c) console.log("  ✅ " + m); else { console.log("  ❌ " + m); fails++; } };

async function post(path, body) {
  const r = await fetch(BASE + path, {
    method: "POST",
    headers: { "content-type": "application/json", Origin: BASE },
    body: JSON.stringify(body || {}),
    signal: AbortSignal.timeout(10000),
  });
  let d = {};
  try { d = await r.json(); } catch { /* ignore */ }
  return { status: r.status, d };
}
const act = (code, seat, action) => post(`/api/rooms/${code}/action`, { playerId: seat.id, token: seat.token, action });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function playFullGame(nPlayers) {
  const host = (await post("/api/rooms", { name: "P1" })).d;
  const seats = [{ id: host.playerId, token: host.token }];
  for (let i = 2; i <= nPlayers; i++) {
    const j = (await post(`/api/rooms/${host.code}/join`, { name: "P" + i })).d;
    seats.push({ id: j.playerId, token: j.token });
  }
  await act(host.code, seats[0], { type: "settings", payload: { startingMoney: 60, cardCount: 6, minIncrement: 5, battle: false } });
  let st = (await act(host.code, seats[0], { type: "start" })).d.state;
  ok(st.players.length === nPlayers, `${nPlayers} ผู้เล่นอยู่ในเกม`);

  let guard = 0;
  while (st.phase === "auction" && guard++ < 800) {
    const seat = seats.find((s) => s.id === st.turn);
    if (!seat) { await sleep(30); continue; }
    const me = st.players.find((p) => p.id === st.turn);
    const isHigh = st.highBidder === st.turn && st.highBid > 0;
    let res;
    if (st.minNext <= me.money && guard % 4 !== 0) res = await act(host.code, seat, { type: "bid", payload: { amount: st.minNext } });
    else if (!isHigh) res = await act(host.code, seat, { type: "pass" });
    else res = await act(host.code, seat, { type: "bid", payload: { amount: st.minNext } });
    if (res.status !== 200) { console.log("  ⚠️", res.status, res.d); break; }
    st = res.d.state;
  }
  ok(st.phase === "ended", `${nPlayers} ผู้เล่น: เกมจบได้`);
  const held = st.scores.reduce((n, r) => n + r.cards.length, 0);
  ok(held + st.discard.length === 6, `${nPlayers} ผู้เล่น: การ์ดครบ 6 ใบ`);
  ok(st.players.every((p) => p.money >= 0), `${nPlayers} ผู้เล่น: เงินไม่ติดลบ`);
  return { code: host.code, seats, st };
}

async function testStale() {
  const host = (await post("/api/rooms", { name: "ส้ม" })).d;
  const j = (await post(`/api/rooms/${host.code}/join`, { name: "เขียว" })).d;
  const A = { id: host.playerId, token: host.token };
  const B = { id: j.playerId, token: j.token };
  await act(host.code, A, { type: "settings", payload: { startingMoney: 100, cardCount: 3, minIncrement: 5, battle: false } });
  let st = (await act(host.code, A, { type: "start" })).d.state;

  const first = st.turn === A.id ? A : B;
  const second = st.turn === A.id ? B : A;
  const r1 = await act(host.code, first, { type: "bid", payload: { amount: st.minNext } });
  st = r1.d.state;
  ok(st.turn === second.id, "เทิร์นส่งต่อให้ผู้เล่นคนที่สอง");

  console.log("  ⏳ รอ 47 วินาทีให้ผู้เล่นคนที่สองหลุด...");
  await sleep(47000);
  const r2 = await post(`/api/rooms/${host.code}/sync`, { playerId: first.id, token: first.token });
  ok(r2.status === 200, "sync ของผู้เล่นที่ยังอยู่สำเร็จ");
  st = r2.d.state;

  const staleName = second.id === A.id ? "ส้ม" : "เขียว";
  const skipped = st.log.some((l) => l.msg.includes(staleName) && l.msg.includes("ข้าม"));
  ok(skipped, `ระบบบันทึกว่าข้าม ${staleName} ที่ไม่ตอบสนอง`);
  const firstP = st.players.find((p) => p.id === first.id);
  ok(firstP.cards.length === 1, "ผู้เล่นที่ยังอยู่ได้การ์ดไปเลย (ปิดรอบอัตโนมัติ)");
  ok(st.round === 2, "เกมเดินหน้าไปรอบที่ 2 แล้ว");
}

/** 4 ผู้เล่น + เล่นด่านต่อสู้จนจบ (ใช้โจมตีพื้นฐาน/สกิลของแต่ละการ์ด) */
async function playBattleGame(nPlayers) {
  const host = (await post("/api/rooms", { name: "B1" })).d;
  const seats = [{ id: host.playerId, token: host.token }];
  for (let i = 2; i <= nPlayers; i++) {
    const j = (await post(`/api/rooms/${host.code}/join`, { name: "B" + i })).d;
    seats.push({ id: j.playerId, token: j.token });
  }
  await act(host.code, seats[0], {
    type: "settings",
    payload: { startingMoney: 40, cardCount: 12, minIncrement: 500, startPrice: 1, battle: true },
  });
  let st = (await act(host.code, seats[0], { type: "start" })).d.state;
  let guard = 0;
  while (st.phase === "auction" && guard++ < 800) {
    const seat = seats.find((s) => s.id === st.turn);
    if (!seat) break;
    const res = st.highBidder
      ? await act(host.code, seat, { type: "pass" })
      : await act(host.code, seat, { type: "bid", payload: { amount: st.minNext } });
    if (res.status !== 200) { console.log("  ⚠️", res.status, res.d); break; }
    st = res.d.state;
  }
  ok(st.phase === "battle", `${nPlayers} ผู้เล่น: หลังประมูลเข้าด่านต่อสู้การ์ด`);
  const down = st.battle.order.length;
  ok(down >= 2, `${nPlayers} ผู้เล่น: มี ${down} ทีมลงสนาม (คนที่ไม่ได้การ์ดเลยไม่ถูกล็อกเกม)`);

  guard = 0;
  while (st.phase === "battle" && guard++ < 400) {
    const seat = seats.find((s) => s.id === st.battle.turn);
    const res = await act(host.code, seat, { type: "autoplay" });
    if (res.status !== 200) { ok(false, `เล่นต่อไม่ได้: ${res.d.error}`); return; }
    st = res.d.state;
  }
  ok(st.phase === "ended", `${nPlayers} ผู้เล่น: การต่อสู้จบครบทุกคน`);
  const koTotal = st.scores.reduce((n, r) => n + r.kos, 0);
  ok(koTotal > 0, `${nPlayers} ผู้เล่น: มีการล้มกันจริง (KO ${koTotal})`);
  ok(st.scores.every((r) => r.total === r.pl + r.synergy + r.battle), `${nPlayers} ผู้เล่น: สูตรคะแนนรวมถูกต้อง`);
}

/** คนหลุดตอนด่านต่อสู้ → บอทเล่นแทนอัตโนมัติ (เกมไม่ค้าง) */
async function testBattleAutoplay() {
  const host = (await post("/api/rooms", { name: "ออโต้" })).d;
  const j = (await post(`/api/rooms/${host.code}/join`, { name: "หลุด" })).d;
  const A = { id: host.playerId, token: host.token };
  const B = { id: j.playerId, token: j.token };
  await act(host.code, A, {
    type: "settings",
    payload: { startingMoney: 30, cardCount: 6, minIncrement: 500, startPrice: 1, battle: true },
  });
  let st = (await act(host.code, A, { type: "start" })).d.state;
  let guard = 0;
  while (st.phase === "auction" && guard++ < 200) {
    const seat = st.turn === A.id ? A : B;
    const res = st.highBidder
      ? await act(host.code, seat, { type: "pass" })
      : await act(host.code, seat, { type: "bid", payload: { amount: st.minNext } });
    if (res.status !== 200) break;
    st = res.d.state;
  }
  ok(st.phase === "battle", "เข้าด่านต่อสู้ก่อนทดสอบคนหลุด");

  // ให้เราเล่นก่อน 1 เทิร์น เพื่อส่งตาไปให้ "ผู้ที่จะหลุด" ตอนยิงจริง
  const mine = st.battle.turn === A.id ? A : B;
  const moved = await act(host.code, mine, { type: "autoplay" });
  if (moved.status === 200) st = moved.d.state;
  const target = st.battle.turn === B.id ? B : A;
  ok(target === B, "ตาอยู่กับผู้เล่นคนที่สอง (กำลังจะหลุด)");

  console.log("  ⏳ รอ 47 วินาทีให้คู่ต่อสู้หลุด แล้วดูว่าบอทเล่นแทนเองไหม...");
  await sleep(47000);
  const r = await post(`/api/rooms/${host.code}/sync`, { playerId: A.id, token: A.token });
  ok(r.status === 200, "ซิงก์ของผู้เล่นที่ยังอยู่ได้ปกติ");
  st = r.d.state;
  const botLines = st.log.filter((l) => l.msg.includes("บอทเล่นเทิร์นนี้ให้")).length;
  ok(botLines > 0 || st.phase === "ended", `ระบบให้บอทเล่นแทนคนหลุด ${botLines} ครั้ง (หรือจบเกมไปแล้ว)`);
  ok(st.battle.turns > 1, `เทิร์นเดินหน้าไปแล้ว ${st.battle.turns} เทิร์นหลังคนหนึ่งหลุด`);
  ok(st.battle.turn !== target.id || st.phase === "ended", "ตาไม่ค้างอยู่ที่คนที่หลุด");
}

async function main() {
  console.log("\n— เกม 4 ผู้เล่น (ประมูล) —");
  await playFullGame(4);
  console.log("\n— เกม 3 ผู้เล่น (ต่อสู้การ์ดจนจบ) —");
  await playBattleGame(3);
  console.log("\n— ผู้เล่นหลุดกลางเกม —");
  await testStale();
  console.log("\n— คนหลุดในด่านต่อสู้ → บอทเล่นแทน —");
  await testBattleAutoplay();
  console.log("\n" + (fails === 0 ? "🎉 ผ่านทั้งหมด" : `❌ ล้มเหลว ${fails} ข้อ`));
  process.exit(fails === 0 ? 0 : 1);
}
main().catch((e) => { console.error("เทสต์พัง:", e); process.exit(1); });
