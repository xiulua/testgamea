/* เทสต์ความเสถียรของการส่งข้อมูล: คำสั่งที่กดต้องไม่หาย แม้มี sync/presence ยิงพร้อมกัน */
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
const sync = (code, seat) => post(`/api/rooms/${code}/sync`, { playerId: seat.id, token: seat.token });
const act = (code, seat, action) => post(`/api/rooms/${code}/action`, { playerId: seat.id, token: seat.token, action });

const ROUNDS = Number(process.env.ROUNDS || 6);

async function main() {
  console.log(`\n— ยิงพร้อมกัน ${ROUNDS} รอบ: sync หลายทาง + คำสั่งบิด 1 ครั้ง —`);
  let bidLost = 0, http500 = 0, conflicts = 0, rounds = 0;

  for (let i = 0; i < ROUNDS; i++) {
    const host = (await post("/api/rooms", { name: "โฮสต์" })).d;
    const j = (await post(`/api/rooms/${host.code}/join`, { name: "เพื่อน" })).d;
    const code = host.code;
    const A = { id: host.playerId, token: host.token };
    const B = { id: j.playerId, token: j.token };

    await act(code, A, {
      type: "settings",
      payload: { startingMoney: 500, cardCount: 4, startPrice: 1, minIncrement: 2, battle: false },
    });
    let st = (await act(code, A, { type: "start" })).d.state;

    const bidder = st.turn === A.id ? A : B;
    const amount = st.minNext;

    // 6 sync (presence) จากทั้งสองฝั่ง + 1 คำสั่งบิด ยิงพร้อมกันเป๊ะ
    const all = await Promise.all([
      sync(code, A), sync(code, B), sync(code, A),
      act(code, bidder, { type: "bid", payload: { amount } }),
      sync(code, B), sync(code, A), sync(code, B),
    ]);
    const bid = all[3];
    if (bid.status === 500 || all.some((r) => r.status === 500)) http500++;
    conflicts += all.filter((r) => r.status === 409).length;

    if (bid.status !== 200) {
      console.log(`     รอบ ${i + 1}: บิดล้มเหลว ${bid.status} ${bid.d.error}`);
      bidLost++;
      continue;
    }
    // หลังทุกคำขอจบ ราคาที่บิดต้องยังอยู่ (ไม่ถูกเขียนทับด้วย state เก่า)
    const after = (await sync(code, bidder)).d.state;
    if (after.highBid !== amount || after.highBidder !== bidder.id) {
      console.log(`     รอบ ${i + 1}: ราคาหาย! คาด ${amount}/${bidder.id} ได้ ${after.highBid}/${after.highBidder}`);
      bidLost++;
      continue;
    }
    rounds++;
  }

  ok(bidLost === 0, `${rounds}/${ROUNDS} รอบ: คำสั่งบิดที่ส่งไประหว่างมี sync พร้อมกันไม่หายไปเลย`);
  ok(http500 === 0, "ไม่มีคำขอไหนล้มด้วย error 500 (แม้ยิงพร้อมกัน 7 คำขอ)");
  console.log(`     (409 conflict ที่ต้องลองใหม่: ${conflicts} ครั้ง — ไคลเอนต์จะลองใหม่รอบถัดไป)`);

  console.log("\n— คำสั่งซ้ำ/กดรัว ๆ —");
  const host = (await post("/api/rooms", { name: "รัว" })).d;
  const j = (await post(`/api/rooms/${host.code}/join`, { name: "เร็ว" })).d;
  const code = host.code;
  const A = { id: host.playerId, token: host.token };
  const B = { id: j.playerId, token: j.token };
  await act(code, A, {
    type: "settings",
    payload: { startingMoney: 500, cardCount: 4, startPrice: 1, minIncrement: 1, battle: false },
  });
  let st = (await act(code, A, { type: "start" })).d.state;
  const bidder = st.turn === A.id ? A : B;
  // ส่งบิดเดียวกัน 3 ครั้งพร้อมกัน (จำลองกดรัว) → ต้องสำเร็จไม่เกิน 1 ครั้ง และราคาต้องไม่เพี้ยน
  const triple = await Promise.all([
    act(code, bidder, { type: "bid", payload: { amount: st.minNext } }),
    act(code, bidder, { type: "bid", payload: { amount: st.minNext } }),
    act(code, bidder, { type: "bid", payload: { amount: st.minNext } }),
  ]);
  const okCount = triple.filter((r) => r.status === 200).length;
  ok(okCount >= 1, `กดบิดรัว ๆ 3 ครั้งพร้อมกัน สำเร็จ ${okCount} ครั้ง (ไม่หายไปเลย)`);
  const fin = (await sync(code, bidder)).d.state;
  ok(fin.highBid === st.minNext, `ราคาที่บันทึกตรงกับที่กด (${fin.highBid} = ${st.minNext})`);
  ok(fin.players.every((p) => p.money >= 0), "เงินไม่ติดลบจากการกดซ้ำ");

  const ended = await act(code, A, { type: "reset" });
  ok(ended.status === 200, "เซิร์ฟเวอร์ยังตอบสนองปกติหลังยิงพร้อมกัน");

  console.log("\n" + (fails === 0 ? "🎉 ผ่านทั้งหมด" : `❌ ล้มเหลว ${fails} ข้อ`));
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => { console.error("เทสต์พัง:", e); process.exit(1); });
