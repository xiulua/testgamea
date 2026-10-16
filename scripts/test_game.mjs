/* เทสต์เกมประมูลผ่าน HTTP API จริง (ใช้กับ wrangler dev) */
const BASE = process.env.BASE || "http://127.0.0.1:8787";
const ORIGIN = process.env.ORIGIN || BASE;

let fails = 0;
const ok = (cond, msg) => {
  if (cond) console.log("  ✅ " + msg);
  else { console.log("  ❌ " + msg); fails++; }
};

async function post(path, body, origin = ORIGIN) {
  const headers = { "content-type": "application/json" };
  if (origin) headers.Origin = origin;
  const r = await fetch(BASE + path, { method: "POST", headers, body: JSON.stringify(body || {}), signal: AbortSignal.timeout(10000) });
  let d = {};
  try { d = await r.json(); } catch { /* ignore */ }
  return { status: r.status, d };
}
const act = (code, seat, action) =>
  post(`/api/rooms/${code}/action`, { playerId: seat.id, token: seat.token, action });

/* ตรวจพฤติกรรมที่ผู้ใช้ขอ: เปิดราคา 1 บาท แล้วทบขึ้นเรื่อยๆ */
async function testOneBaht() {
  console.log("\n— เปิดราคา 1 บาท ทบไปเรื่อยๆ —");
  const host = (await post("/api/rooms", { name: "บิด" })).d;
  const j = (await post(`/api/rooms/${host.code}/join`, { name: "คู่" })).d;
  const A = { id: host.playerId, token: host.token };
  const B = { id: j.playerId, token: j.token };

  let st = (await act(host.code, A, {
    type: "settings", payload: { startingMoney: 50, cardCount: 3, startPrice: 1, minIncrement: 1, battle: false },
  })).d.state;
  ok(st.settings.startPrice === 1, "ราคาเปิดประมูล = 1 บาท");
  ok(st.settings.minIncrement === 1, "ทบครั้งละ 1 บาท");

  const clampHigh = await act(host.code, A, { type: "settings", payload: { startPrice: 9999 } });
  ok(clampHigh.d.state.settings.startPrice === 500, "ราคาเปิดเกินขอบเขตถูก clamp (500)");
  await act(host.code, A, { type: "settings", payload: { startPrice: 1 } });

  st = (await act(host.code, A, { type: "start" })).d.state;
  ok(st.minNext === 1, "ราคาบิดขั้นต่ำของใบแรก = 1 บาท");

  const seatOf = (id) => (id === A.id ? A : B);
  let expected = 1;
  for (let i = 0; i < 5; i++) {
    const res = await act(host.code, seatOf(st.turn), { type: "bid", payload: { amount: st.minNext } });
    if (res.status !== 200) { ok(false, `บิดครั้งที่ ${i + 1} ล้มเหลว: ${res.d.error}`); return; }
    st = res.d.state;
    ok(st.highBid === expected, `บิดครั้งที่ ${i + 1} → ราคาทบเป็น ${expected}`);
    expected++;
  }
  const jumpTo = st.highBid + 9;
  const jump = await act(host.code, seatOf(st.turn), { type: "bid", payload: { amount: jumpTo } });
  ok(jump.status === 200 && jump.d.state.highBid === jumpTo, `บิดกระโดดเองได้ (ไป ${jumpTo})`);
}

async function main() {
  console.log("\n— ความปลอดภัย / ต้นทาง —");
  const evil = await post("/api/rooms", { name: "Evil" }, "https://evil.example.com");
  ok(evil.status === 403, "Origin ต่างถิ่นถูกปฏิเสธ (403)");
  const noOrigin = await post("/api/rooms", { name: "NoOrigin" }, null);
  ok(noOrigin.status === 200, "ไม่มี Origin (ไม่ใช่เบราว์เซอร์) ผ่านได้");

  console.log("\n— สร้างห้อง + เข้าร่วม —");
  const A = (await post("/api/rooms", { name: "Alice" })).d;
  ok(!!(A.code && A.playerId && A.token), `สร้างห้องได้ รหัส ${A.code}`);
  ok(A.state.phase === "lobby", "สถานะเริ่มต้น = lobby");
  ok(A.state.players.length === 1, "มีเจ้าของห้อง 1 คน");

  const B = (await post(`/api/rooms/${A.code}/join`, { name: "Bob" })).d;
  ok(B.state.players.length === 2, "Bob เข้าห้อง (2 คน)");

  const seatA = { id: A.playerId, token: A.token };
  const seatB = { id: B.playerId, token: B.token };

  const dup = await post(`/api/rooms/${A.code}/join`, { name: "Bob" });
  ok(dup.status === 400, "ชื่อซ้ำถูกปฏิเสธ");

  const wrong = await post(`/api/rooms/${A.code}/sync`, { playerId: A.playerId, token: "bad" });
  ok(wrong.status === 401, "token ผิด → 401");

  console.log("\n— ตั้งค่าห้อง —");
  const nohost = await act(A.code, seatB, { type: "settings", payload: { startingMoney: 300 } });
  ok(nohost.status === 400, "คนที่ไม่ใช่เจ้าของห้องตั้งค่าไม่ได้");
  const set = await act(A.code, seatA, {
    type: "settings", payload: { startingMoney: 200, cardCount: 8, startPrice: 5, minIncrement: 5, battle: false },
  });
  ok(set.d.state.settings.startingMoney === 200, "เงินเริ่มต้น = 200");
  ok(set.d.state.settings.cardCount === 8, "จำนวนการ์ด = 8");
  ok(set.d.state.settings.battle === false, "ปิดโหมดต่อสู้การ์ดได้ (จบหลังประมูล)");
  ok(set.d.state.players.every((p) => p.money === 200), "เงินทุกคนอัปเดตเป็น 200");

  const clamp = await act(A.code, seatA, { type: "settings", payload: { startingMoney: 999999 } });
  ok(clamp.d.state.settings.startingMoney === 2000, "ค่าที่เกินขอบเขตถูก clamp (2000)");
  await act(A.code, seatA, { type: "settings", payload: { startingMoney: 200 } });

  console.log("\n— เริ่มเกม —");
  const start = await act(A.code, seatA, { type: "start" });
  ok(start.d.state.phase === "auction", "เริ่มเกมแล้ว (auction)");
  ok(!!start.d.state.current, `การ์ดใบแรก: ${start.d.state.current && start.d.state.current.name}`);
  ok(start.d.state.remaining === 7, "เหลือในกอง 7 ใบ");

  const late = await post(`/api/rooms/${A.code}/join`, { name: "Carol" });
  ok(late.status === 409, "เข้าห้องหลังเกมเริ่มไม่ได้ (409)");

  const notTurn = await act(A.code, start.d.state.turn === A.playerId ? seatB : seatA, { type: "bid", payload: { amount: 5 } });
  ok(notTurn.status === 400, "คนที่ไม่ถึงเทิร์นบิดไม่ได้");

  const tooLow = await act(A.code, { id: start.d.state.turn, token: (start.d.state.turn === A.playerId ? A.token : B.token) }, { type: "bid", payload: { amount: 1 } });
  ok(tooLow.status === 400, "บิดต่ำกว่าขั้นต่ำถูกปฏิเสธ");

  console.log("\n— เล่นจนจบ —");
  const seats = { [A.playerId]: { id: A.playerId, token: A.token }, [B.playerId]: { id: B.playerId, token: B.token } };
  let st = start.d.state;
  let guard = 0;
  let sales = 0, passes = 0, lastRemaining = st.remaining;
  while (st.phase === "auction" && guard++ < 500) {
    const turn = st.turn;
    if (!turn) { await new Promise((r) => setTimeout(r, 60)); continue; }
    const me = st.players.find((p) => p.id === turn);
    const isHigh = st.highBidder === turn && st.highBid > 0;
    const canBid = st.minNext <= me.money;
    const wantPass = guard % 5 === 0 && !isHigh;
    let res;
    if (canBid && !wantPass) {
      res = await act(A.code, seats[turn], { type: "bid", payload: { amount: st.minNext } });
      if (res.status === 200) sales++;
    } else if (!isHigh) {
      res = await act(A.code, seats[turn], { type: "pass" });
      if (res.status === 200) passes++;
    } else {
      res = await act(A.code, seats[turn], { type: "bid", payload: { amount: st.minNext } });
    }
    if (res.status !== 200) { console.log("  ⚠️ action ล้มเหลว:", res.status, res.d); break; }
    st = res.d.state;
    if (st.remaining !== lastRemaining) { lastRemaining = st.remaining; }
  }

  ok(st.phase === "ended", "เกมจบเองหลังประมูลครบทุกใบ");
  ok(Array.isArray(st.scores) && st.scores.length === 2, "มีตารางคะแนน 2 คน");
  ok(st.scores[0].total >= st.scores[1].total, "อันดับ 1 คะแนน >= อันดับ 2");

  const cardsHeld = st.scores.reduce((n, r) => n + r.cards.length, 0);
  ok(cardsHeld + st.discard.length === 8, `การ์ดถูกจัดสรรครบ 8 ใบ (ขาย ${cardsHeld} + กองกลาง ${st.discard.length})`);
  ok(st.players.every((p) => p.money >= 0), "ไม่มีใครเงินติดลบ");

  const spent = st.players.reduce((n, p) => n + (200 - p.money), 0);
  ok(spent >= 0, `เงินที่ใช้ไปรวม ${spent}`);

  // ตรวจสูตรคะแนน: total = pl + synergy(กลุ่ม 3 ใบขึ้นไป +5/ใบ)
  let scoreOk = true;
  for (const r of st.scores) {
    const counts = {};
    for (const c of r.cards) counts[c.group] = (counts[c.group] || 0) + 1;
    let syn = 0;
    for (const n of Object.values(counts)) if (n >= 3) syn += n * 5;
    const pl = r.cards.reduce((a, c) => a + c.pl, 0);
    if (r.pl !== pl || r.synergy !== syn || r.total !== pl + syn) scoreOk = false;
  }
  ok(scoreOk, "สูตรคะแนนถูกต้อง (พลัง + โบนัสทีมเวิร์ค)");

  console.log("\n— เล่นใหม่ —");
  const reset = await act(A.code, seatA, { type: "reset" });
  ok(reset.d.state.phase === "lobby", "เจ้าของห้องรีเซ็ตกลับ lobby ได้");
  ok(reset.d.state.scores === null, "คะแนนถูกล้าง");

  const wrongReset = await act(A.code, seatB, { type: "reset" });
  ok(wrongReset.status === 400, "คนอื่นรีเซ็ตไม่ได้");

  await testOneBaht();

  console.log("\n— ไฟล์ static —");
  const home = await fetch(BASE + "/");
  ok(home.status === 200 && (home.headers.get("content-type") || "").includes("text/html"), "เสิร์ฟ index.html");
  const img = await fetch(BASE + "/images/luffy.png");
  ok(img.status === 200 && (img.headers.get("content-type") || "").startsWith("image/"), "เสิร์ฟภาพตัวละคร");

  console.log("\n" + (fails === 0 ? "🎉 ผ่านทั้งหมด" : `❌ ล้มเหลว ${fails} ข้อ`));
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => { console.error("เทสต์พัง:", e); process.exit(1); });
