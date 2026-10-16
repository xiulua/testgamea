/* เทสต์ตั้งค่าห้อง “การ์ดต่อคน (เท่ากันทุกคน)”
   - ตั้ง N → ประมูลทั้งหมด N × จำนวนคน และทุกคนได้ไม่เกิน N ใบ
   - ใครครบโควตาถูกตัดออกจากการบิด (และเกมไม่ค้าง)
   - ตั้ง 0 → ใช้จำนวนการ์ดรวมแบบเดิม */
const BASE = process.env.BASE || "http://127.0.0.1:8787";
const ORIGIN = process.env.ORIGIN || BASE;

let fails = 0;
const ok = (cond, msg) => {
  if (cond) console.log("  ✅ " + msg);
  else { console.log("  ❌ " + msg); fails++; }
};

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
const act = (code, seat, action) => post(`/api/rooms/${code}/action`, { playerId: seat.id, token: seat.token, action });

async function openRoom(names) {
  const host = (await post("/api/rooms", { name: names[0] })).d;
  const seats = [{ id: host.playerId, token: host.token, name: names[0] }];
  for (let i = 1; i < names.length; i++) {
    const j = (await post(`/api/rooms/${host.code}/join`, { name: names[i] })).d;
    seats.push({ id: j.playerId, token: j.token, name: names[i] });
  }
  return { code: host.code, seats };
}

/** ประมูลแบบกำหนดผลได้: ผู้ที่ถึงตาก่อนและยังไม่มีคนบิด = บิด 1 (คนที่เหลือผ่าน) */
async function playAuction(code, seats, state) {
  let st = state;
  let guard = 0;
  while (st.phase === "auction" && guard++ < 200) {
    const seat = seats.find((s) => s.id === st.turn);
    if (!seat) break;
    const res = st.highBidder
      ? await act(code, seat, { type: "pass" })
      : await act(code, seat, { type: "bid", payload: { amount: st.minNext } });
    if (res.status !== 200) { ok(false, `บิดไม่ผ่าน: ${res.status} ${res.d.error}`); break; }
    st = res.d.state;
  }
  return st;
}

/** บังคับให้ "คนที่กำหนด" ชนะรอบนี้: คนอื่นผ่านหมด แล้วให้เป้าบิด 1 ครั้ง */
async function forceWin(code, seats, state, winnerSeat) {
  const round0 = state.round;
  let st = state;
  let guard = 0;
  while (st.phase === "auction" && st.round === round0 && guard++ < 30) {
    const seat = seats.find((s) => s.id === st.turn);
    if (!seat) break;
    const bid = seat.id === winnerSeat.id && !st.highBidder;
    const res = await act(code, seat, bid ? { type: "bid", payload: { amount: st.minNext } } : { type: "pass" });
    if (res.status !== 200) {
      ok(false, `${bid ? "บิด" : "ผ่าน"}ของ ${seat.name} ไม่ผ่าน: ${res.status} ${res.d.error}`);
      break;
    }
    st = res.d.state;
  }
  return st;
}

async function main() {
  console.log("\n— ตั้งค่า: การ์ดต่อคน = 2 (3 ผู้เล่น → ประมูล 6 ใบ) —");
  const { code, seats } = await openRoom(["ออฟ", "บี", "ซี"]);
  const [A, B, C] = seats;
  let st = (await act(code, A, {
    type: "settings",
    payload: { startingMoney: 300, cardCount: 20, cardsPerPlayer: 2, startPrice: 1, minIncrement: 1, battle: true },
  })).d.state;
  ok(st.settings.cardsPerPlayer === 2, "บันทึกค่า “การ์ดต่อคน” ได้ (2 ใบ)");

  const other = await act(code, B, { type: "settings", payload: { cardsPerPlayer: 5 } });
  ok(other.status === 400, "ผู้เล่นที่ไม่ใช่เจ้าของห้องแก้การตั้งค่าไม่ได้");

  st = (await act(code, A, { type: "start" })).d.state;
  ok(st.totalCards === 6, `จำนวนการ์ดที่ประมูล = 2 × 3 คน = 6 ใบ (ได้ ${st.totalCards})`);
  ok(st.log.some((l) => l.msg.includes("โควตาการ์ดต่อคน")), "บันทึกโควตาลงใน log ให้ผู้เล่นเห็น");

  // รอบ 1-2: ให้ ออฟ เก็บครบโควตา 2 ใบก่อนคนอื่น
  st = await forceWin(code, seats, st, A);
  ok(st.round === 2 || st.phase !== "auction", `รอบ 1 จบแล้ว (รอบที่ ${st.round})`);
  st = await forceWin(code, seats, st, A);
  const offPlayer = st.players.find((p) => p.id === A.id);
  ok(offPlayer.cards.length === 2, `ออฟ ได้การ์ดครบโควตา 2 ใบ (${offPlayer.cards.length})`);
  ok(offPlayer.passed, "คนที่ครบโควตาถูกตัดออกจากการบิดรอบถัดไปอัตโนมัติ");
  ok(st.log.some((l) => l.msg.includes("ได้การ์ดครบ 2 ใบแล้ว")), "ขึ้นข้อความใน log ว่าได้ครบโควตาแล้ว");

  const lateBid = await act(code, A, { type: "bid", payload: { amount: 50 } });
  ok(lateBid.status === 400, `คนครบโควตาบิดเพิ่มไม่ได้ (${lateBid.d.error})`);

  st = await playAuction(code, seats, st);
  ok(st.phase === "battle", `ประมูลจบและเข้าด่านต่อสู้ (${st.phase})`);
  const held = st.players.map((p) => ({ name: p.name, n: p.cards.length }));
  ok(held.every((h) => h.n === 2), `ทุกคนได้การ์ดเท่ากัน 2 ใบ (${held.map((h) => h.name + " " + h.n).join(" · ")})`);
  ok(st.players.every((p) => p.cards.length <= 2), "ไม่มีใครได้เกินโควตา");
  const totalHeld = st.players.reduce((n, p) => n + p.cards.length, 0);
  ok(totalHeld + st.discard.length === 6, `การ์ดครบ 6 ใบ (ในมือ ${totalHeld} + กองกลาง ${st.discard.length})`);
  ok(st.battle.fighters.length === 6, `ลงสนามครบ 6 ตัวตามโควตา (${st.battle.fighters.length})`);
  ok(st.scores === null, "ยังไม่จบเกม (กำลังต่อสู้)");

  console.log("\n— ตั้งค่า 0 = ไม่จำกัด (แบบเดิม) —");
  const g2 = await openRoom(["หนึ่ง", "สอง"]);
  let st2 = (await act(g2.code, g2.seats[0], {
    type: "settings",
    payload: { startingMoney: 200, cardCount: 5, cardsPerPlayer: 0, startPrice: 1, minIncrement: 500, battle: false },
  })).d.state;
  ok(st2.settings.cardsPerPlayer === 0, "ตั้ง 0 = ปิดโควตา");
  st2 = (await act(g2.code, g2.seats[0], { type: "start" })).d.state;
  ok(st2.totalCards === 5, `ใช้จำนวนการ์ดรวมแบบเดิม 5 ใบ (ได้ ${st2.totalCards})`);
  st2 = await playAuction(g2.code, g2.seats, st2);
  ok(st2.phase === "ended", "เกมจบหลังประมูล (โหมดต่อสู้ปิด)");
  ok(st2.scores.reduce((n, r) => n + r.cards.length, 0) + st2.discard.length === 5, "การ์ดครบ 5 ใบ ไม่มีใครเกินโควตาแบบเดิม");

  console.log("\n— ค่าที่ส่งมาเกินขอบเขตต้องถูกจำกัด —");
  const g3 = await openRoom(["โควต้า", "เพื่อน"]);
  let st3 = (await act(g3.code, g3.seats[0], {
    type: "settings",
    payload: { cardsPerPlayer: 99, startingMoney: 100, cardCount: 10 },
  })).d.state;
  ok(st3.settings.cardsPerPlayer === 20, `ค่าสูงสุดที่รับได้คือ 20 (ได้ ${st3.settings.cardsPerPlayer})`);
  st3 = (await act(g3.code, g3.seats[0], { type: "settings", payload: { cardsPerPlayer: -5 } })).d.state;
  ok(st3.settings.cardsPerPlayer === 0, `ค่าติดลบถูกจำกัดเป็น 0 (ได้ ${st3.settings.cardsPerPlayer})`);
  await act(g3.code, g3.seats[0], { type: "settings", payload: { cardsPerPlayer: 20 } });
  const started = (await act(g3.code, g3.seats[0], { type: "start" })).d.state;
  ok(started.totalCards === 40, `2 คน × 20 ใบ = 40 ใบ (ได้ ${started.totalCards})`);
  const afterStart = await act(g3.code, g3.seats[0], { type: "settings", payload: { cardsPerPlayer: 3 } });
  ok(afterStart.status === 400, `แก้การตั้งค่าไม่ได้หลังเกมเริ่ม (${afterStart.d.error})`);

  console.log("\n" + (fails === 0 ? "🎉 ผ่านทั้งหมด" : `❌ ล้มเหลว ${fails} ข้อ`));
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => { console.error("เทสต์พัง:", e); process.exit(1); });
