/* เทสต์ตรรกะฝั่งหน้าจอ (ไม่ใช้เบราว์เซอร์จริง) ด้วย DOM ปลอมใน Node
   เน้น 2 เรื่องที่ผู้ใช้เจอ: "กดแล้วไม่ขึ้น ต้องกดใหม่" และหน้าต่อสู้การ์ด */
import fs from "node:fs";
import vm from "node:vm";

let fails = 0;
const ok = (cond, msg) => {
  if (cond) console.log("  ✅ " + msg);
  else { console.log("  ❌ " + msg); fails++; }
};

/* ------------------------- DOM ปลอม ------------------------- */
function makeEl(id) {
  const el = {
    id, hidden: false, disabled: false, value: "", textContent: "", className: "",
    style: {}, _html: "", _handlers: {}, _attrs: {},
    classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } },
    addEventListener(type, fn) { (el._handlers[type] = el._handlers[type] || []).push(fn); },
    removeEventListener() {},
    contains() { return true; },
    focus() {}, blur() {}, select() {}, setSelectionRange() {},
    getAttribute(k) { return el._attrs[k] === undefined ? null : el._attrs[k]; },
    setAttribute(k, v) { el._attrs[k] = String(v); },
    querySelectorAll() { return []; },
    closest() { return null; },
    click() { (el._handlers.click || []).forEach((fn) => fn({ target: el })); },
  };
  Object.defineProperty(el, "innerHTML", { get: () => el._html, set: (v) => { el._html = String(v); } });
  return el;
}

const els = new Map();
const getEl = (id) => { if (!els.has(id)) els.set(id, makeEl(id)); return els.get(id); };

const docHandlers = {};
const document = {
  activeElement: null,
  getElementById: getEl,
  querySelectorAll: () => [],
  addEventListener(type, fn) { (docHandlers[type] = docHandlers[type] || []).push(fn); },
};
const fire = (type, target) => (docHandlers[type] || []).forEach((fn) => fn({ target }));

/* ------------------------- fetch ปลอม ------------------------- */
const posts = [];
let handler = async () => ({ status: 200, d: {} });

const fetchStub = async (url, opt) => {
  const body = JSON.parse((opt && opt.body) || "{}");
  posts.push({ url, body });
  const res = await handler(url, body, posts.length);
  return { ok: res.status < 400, status: res.status, json: async () => res.d };
};

/* ------------------------- โหลด app.js ------------------------- */
const sandbox = {
  console, setTimeout, clearTimeout, setInterval, clearInterval, Promise, JSON, Math, Number, String, Object, Set, Map, Date, RegExp, Error, Array, URLSearchParams,
  fetch: fetchStub,
  confirm: () => true,
  navigator: { clipboard: { writeText: () => Promise.resolve() } },
  localStorage: { _v: null, getItem() { return this._v; }, setItem(k, v) { this._v = v; }, removeItem() { this._v = null; } },
  location: { origin: "https://game.example", pathname: "/", search: "" },
  document,
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("site/public/app.js", "utf8"), sandbox, { filename: "app.js" });
const APP = sandbox.__opAuction;
const gameEl = getEl("game");

/* ------------------------- สถานะตัวอย่าง ------------------------- */
const player = (id, name, extra = {}) =>
  ({ id, name, money: 120, isHost: id === "p1", online: true, passed: false, cards: [], ...extra });

const base = (v) => ({
  version: v, phase: "lobby", hostId: "p1",
  settings: { startingMoney: 120, cardCount: 20, startPrice: 1, minIncrement: 1, battle: true },
  round: 0, remaining: 0, current: null, highBid: 0, highBidder: null, highBidderName: null,
  turn: null, turnName: null, minNext: null, discard: [], log: [], scores: null, battle: null,
  players: [player("p1", "ผม"), player("p2", "คู่หู")],
  me: { id: "p1", isHost: true },
});

const fighter = (cid, pid, name, skill, over = {}) => ({
  cid, pid, owner: pid === "p1" ? "ผม" : "คู่หู", name, img: `images/${cid}.png`, group: "หมวกฟาง", pl: 90,
  hp: 100, maxHp: 120, atk: 28, effAtk: 28, alive: true, shield: 0, buff: 0, stun: 0, burn: 0, burnDmg: 0,
  cd: 0, passive: null, passiveUsed: false, skill, ...over,
});

const ATTACK = { name: "เกียร์ 5", label: "ท่าไม้ตาย", kind: "heavy", desc: "ดาเมจหนัก 180%", cd: 2, target: "enemy", mult: 1.8 };
const HEAL = { name: "รัมเบิล", label: "ฮีล", kind: "heal", desc: "ฟื้น HP", cd: 2, target: "ally", mult: 1.4 };
const BASIC = { name: "โจมตีพื้นฐาน", label: "โจมตีพื้นฐาน", kind: "strike", desc: "ดาเมจ 100%", cd: 0, target: "enemy", mult: 1 };
const HAKI_AURA = { id: "haki", th: "ฮาคิราชันย์", fx: "lightning", c1: "#ff2233", c2: "#12060c" };
const HAKI = { kind: "haki", name: "ฮาคิราชันย์", label: "ฮาคิราชันย์", desc: "ดาเมจทุกตัว + ตัวอ่อนสลบ", cd: 4, target: "all", mult: 0.9, aura: "haki", cdLeft: 0 };
const GUARD = { kind: "guard", name: "ตั้งการ์ด", label: "ตั้งการ์ด", desc: "ลดดาเมจ 50%", cd: 3, target: "ally", mult: 0, aura: "haki", cdLeft: 3 };

const battleState = (v) => ({
  ...base(v),
  phase: "battle",
  battle: {
    basic: BASIC, turn: "p1", turnName: "ผม", turns: 3, maxTurns: 24, result: null,
    order: [{ pid: "p1", name: "ผม", kos: 0, points: 0, alive: 2 }, { pid: "p2", name: "คู่หู", kos: 1, points: 20, alive: 1 }],
    fighters: [
      fighter("luffy", "p1", "Luffy", ATTACK),
      fighter("chopper", "p1", "Chopper", HEAL, { hp: 60 }),
      fighter("kaido", "p2", "Kaido", ATTACK, { skill: { ...ATTACK, name: "คำราม" } }),
    ],
  },
});

const clickThing = (attrs) => {
  const btn = { _attrs: attrs, disabled: false, getAttribute(k) { return this._attrs[k] === undefined ? null : this._attrs[k]; } };
  const target = { closest: (sel) => (sel === "[data-act]" ? btn : null) };
  (gameEl._handlers.click || []).forEach((fn) => fn({ target }));
};

const cardsEl = getEl("cards");
const clickCards = (attrs) => {
  const btn = { _attrs: attrs, disabled: false, getAttribute(k) { return this._attrs[k] === undefined ? null : this._attrs[k]; } };
  const target = { closest: (sel) => (sel === "[data-cards-act]" ? btn : null) };
  (cardsEl._handlers.click || []).forEach((fn) => fn({ target }));
};

const waitFor = async (fn, ms = 800) => {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (fn()) return true;
    await new Promise((r) => setTimeout(r, 15));
  }
  return false;
};

async function main() {
  const S = APP.S;
  S.code = "TEST1"; S.playerId = "p1"; S.token = "tok";
  let led = null;

  console.log("\n— สถานะที่มาช้ากว่าต้องไม่ทับของใหม่ —");
  APP.applyState(battleState(10));
  ok(S.state.version === 10, "รับสถานะ v10 เข้าไปแล้ว");
  const htmlV10 = gameEl.innerHTML;
  ok(/Luffy/.test(htmlV10), "หน้าจอแสดงผลของ v10");
  APP.applyState(battleState(9)); // คำตอบเก่าที่มาถึงทีหลัง
  ok(S.state.version === 10, "สถานะเก่า v9 ถูกทิ้ง ไม่ย้อนกลับ");
  ok(gameEl.innerHTML === htmlV10, "หน้าจอไม่ถูกวาดใหม่ด้วยข้อมูลเก่า (สิ่งที่เพิ่งกดไม่หาย)");
  const st11 = battleState(11);
  st11.battle.fighters[2].hp = 42;
  APP.applyState(st11);
  ok(S.state.version === 11 && S.rendered === 11 && /42\/120/.test(gameEl.innerHTML),
    "สถานะใหม่ v11 ยังอัปเดตหน้าจอได้ตามปกติ");

  console.log("\n— ห้ามวาดจอใหม่ระหว่างที่ยังกดอยู่ (กันคลิกหลุด) —");
  APP.applyState(battleState(20));
  const html20 = gameEl.innerHTML;
  const btnEl = { closest: (sel) => (sel === "#game" ? gameEl : null) }; // จำลองนิ้วกดอยู่บนปุ่มในหน้าห้อง
  fire("pointerdown", btnEl);
  const st21 = battleState(21);
  st21.battle.fighters[2].hp = 7;
  APP.applyState(st21);
  ok(gameEl.innerHTML === html20, "ตอนกดค้างอยู่ หน้าจอยังไม่ถูกสร้างใหม่ (ปุ่มไม่หลุดมือ)");
  ok(S.state.version === 21 && S.rendered === 20, "แต่ข้อมูลใหม่ถูกเก็บไว้แล้ว (ยังไม่วาด)");
  fire("pointerup", btnEl);
  await new Promise((r) => setTimeout(r, 30));
  ok(S.rendered === 21 && /7\/120/.test(gameEl.innerHTML), "พอปล่อยนิ้วแล้ววาดจอใหม่ให้ทันที");

  console.log("\n— กดรัว ๆ ต้องไม่หาย —");
  posts.length = 0;
  let resolveSlow;
  handler = async (url) => {
    if (url.endsWith("/action")) {
      await new Promise((r) => { resolveSlow = r; });
      return { status: 200, d: { state: battleState(30 + posts.length) } };
    }
    return { status: 200, d: { state: battleState(40) } };
  };
  clickThing({ "data-act": "bid", "data-amt": "5", disabled: false });
  clickThing({ "data-act": "bid", "data-amt": "5", disabled: false });
  clickThing({ "data-act": "bid", "data-amt": "5", disabled: false });
  await waitFor(() => !!resolveSlow);
  const actedNow = posts.filter((p) => p.url.endsWith("/action")).length;
  ok(actedNow === 1, `ส่งคำสั่งทีละอัน (ตอนนี้ส่งไป ${actedNow} อัน)`);
  ok(APP.queue.length === 3, `คำสั่งที่กดรัวยังอยู่ครบในคิว ไม่มีถูกทิ้ง (คิว ${APP.queue.length} = ตัวที่กำลังส่ง + 2 ที่รอ)`);
  for (let i = 0; i < 3; i++) { if (resolveSlow) { const r = resolveSlow; resolveSlow = null; r(); } await new Promise((r) => setTimeout(r, 20)); }
  await waitFor(() => APP.queue.length === 0);
  ok(posts.filter((p) => p.url.endsWith("/action")).length === 3, "กด 3 ครั้ง → ส่งครบ 3 ครั้ง ไม่หายไปไหน");

  console.log("\n— ล้มเพราะสถานะเก่า → ลองเองอัตโนมัติ (ไม่ต้องกดใหม่) —");
  posts.length = 0;
  let attempts = 0;
  handler = async (url) => {
    if (url.endsWith("/action")) {
      attempts++;
      if (attempts === 1) return { status: 400, d: { error: "ยังไม่ถึงเทิร์นของคุณ" } };
      return { status: 200, d: { state: battleState(50) } };
    }
    return { status: 200, d: { state: battleState(49) } };
  };
  clickThing({ "data-act": "pass", disabled: false });
  await waitFor(() => APP.queue.length === 0 && attempts >= 2);
  ok(attempts === 2, `ส่งซ้ำเองอัตโนมัติ ${attempts} ครั้ง (ผู้ใช้ไม่ต้องกดใหม่)`);
  ok(posts.some((p) => p.url.endsWith("/sync")), "ดึงสถานะใหม่ก่อนลองซ้ำ");
  ok(S.state.version === 50, "จบด้วยสถานะล่าสุด");

  console.log("\n— หน้าต่อสู้การ์ด: เลือกการ์ด → สกิล → เป้าหมาย —");
  posts.length = 0;
  handler = async (url) => ({ status: 200, d: { state: url.endsWith("/action") ? battleState(60) : battleState(59) } });
  APP.PICK.fighter = null; APP.PICK.skill = null;
  APP.applyState(battleState(60));
  ok(/Luffy/.test(gameEl.innerHTML) && /เกียร์ 5/.test(gameEl.innerHTML), "แสดงการ์ดในสนามพร้อมชื่อสกิล");
  ok(/ตาถึงคุณ/.test(gameEl.innerHTML), "บอกว่าถึงเทิร์นของเรา");

  clickThing({ "data-act": "pick", "data-cid": "luffy", disabled: false });
  ok(APP.PICK.fighter === "luffy", "เลือกการ์ดที่จะออกโรงได้");
  ok(/data-act="skill" data-kind="heavy"/.test(gameEl.innerHTML), "ขึ้นปุ่มสกิลประจำการ์ด");
  ok(/data-kind="basic"/.test(gameEl.innerHTML), "มีปุ่มโจมตีพื้นฐานให้ใช้เสมอ");

  clickThing({ "data-act": "skill", "data-kind": "heavy", disabled: false });
  ok(APP.PICK.skill === "heavy", "เลือกสกิลแล้ว");
  ok(/data-act="target" data-pid="p2" data-cid="kaido"/.test(gameEl.innerHTML), "ขึ้นปุ่มเลือกเป้าหมาย (ศัตรู)");
  clickThing({ "data-act": "target", "data-pid": "p2", "data-cid": "kaido", disabled: false });
  await waitFor(() => posts.some((p) => p.url.endsWith("/action")));
  const fightPost = posts.find((p) => p.url.endsWith("/action"));
  ok(fightPost && fightPost.body.action.type === "fight", "ส่งคำสั่งต่อสู้ไปเซิร์ฟเวอร์");
  ok(JSON.stringify(fightPost.body.action.payload) === JSON.stringify({ fighter: "luffy", skill: "heavy", targetPid: "p2", target: "kaido" }),
    `ข้อมูลที่ส่งถูกต้อง (${JSON.stringify(fightPost.body.action.payload)})`);

  console.log("\n— สกิลช่วยทีมต้องเลือกเป้าหมายฝั่งเรา —");
  posts.length = 0;
  APP.PICK.fighter = null; APP.PICK.skill = null;
  APP.applyState(battleState(70));
  clickThing({ "data-act": "pick", "data-cid": "chopper", disabled: false });
  clickThing({ "data-act": "skill", "data-kind": "heal", disabled: false });
  ok(/data-act="target" data-pid="p1" data-cid="chopper"/.test(gameEl.innerHTML), "สกิลฮีลขึ้นเป้าหมายเป็นทีมตัวเอง");
  ok(!/data-act="target" data-pid="p2"/.test(gameEl.innerHTML), "ไม่มีศัตรูให้เลือกสำหรับสกิลฮีล");
  clickThing({ "data-act": "target", "data-pid": "p1", "data-cid": "chopper", disabled: false });
  await waitFor(() => posts.some((p) => p.url.endsWith("/action")));
  const healPost = posts.find((p) => p.url.endsWith("/action"));
  ok(healPost.body.action.payload.skill === "heal" && healPost.body.action.payload.target === "chopper", "ส่งคำสั่งฮีลถูกต้อง");

  console.log("\n— สกิลที่ติดคูลดาวน์กดไม่ได้ —");
  const cdState = battleState(80);
  cdState.battle.fighters[0].cd = 2;
  APP.PICK.fighter = null; APP.PICK.skill = null;
  APP.applyState(cdState);
  clickThing({ "data-act": "pick", "data-cid": "luffy", disabled: false });
  ok(/พักอีก 2/.test(gameEl.innerHTML), "แสดงว่าสกิลกำลังพักอยู่");
  ok(/data-kind="heavy" disabled/.test(gameEl.innerHTML) || /disabled[^>]*data-kind="heavy"/.test(gameEl.innerHTML), "ปุ่มสกิลถูกปิดเมื่อติดคูลดาวน์");
  ok(/data-kind="basic"/.test(gameEl.innerHTML), "ยังกดโจมตีพื้นฐานได้แทน");

  console.log("\n— ออร่าประจำตัว + สกิลหลายท่า —");
  posts.length = 0;
  const auraState = battleState(82);
  auraState.battle.fighters[0] = {
    ...auraState.battle.fighters[0],
    name: "Luffy", cid: "luffy", aura: HAKI_AURA,
    skill: { ...ATTACK, aura: "haki" },
    skills: [{ ...ATTACK, aura: "haki", cdLeft: 0 }, GUARD, HAKI],
  };
  APP.PICK.fighter = null; APP.PICK.skill = null;
  APP.applyState(auraState);
  ok(/aura fx-lightning/.test(gameEl.innerHTML), "การ์ดมีคลาสออร่าของตัวเอง (fx-lightning)");
  ok(/--au:#ff2233/.test(gameEl.innerHTML), "ส่งสีออร่าไปที่ CSS ผ่าน --au/--au2");
  ok(/ฮาคิราชันย์/.test(gameEl.innerHTML), "แสดงชื่อออร่า + ป้ายในกล่องออร่า");
  clickThing({ "data-act": "pick", "data-cid": "luffy", disabled: false });
  ok(/data-act="skill" data-kind="haki"/.test(gameEl.innerHTML), "ขึ้นปุ่มสกิลฮาคิราชันย์ของการ์ด");
  ok(/data-kind="guard" disabled/.test(gameEl.innerHTML), "สกิลที่ติดคูลดาวน์ในชุด skills ถูกปิด");
  clickThing({ "data-act": "skill", "data-kind": "haki", disabled: false });
  await waitFor(() => posts.some((p) => p.url.endsWith("/action")));
  const hakiPost = posts.find((p) => p.url.endsWith("/action"));
  ok(hakiPost && hakiPost.body.action.payload.skill === "haki" && !hakiPost.body.action.payload.target,
    "สกิลยิงทั้งสนามส่งไปเลย ไม่ต้องเลือกเป้า");

  console.log("\n— เอฟเฟคตอนตี: ต้องไม่พังเมื่อไม่มี DOM จริง —");
  const fxState = battleState(83);
  fxState.battle.fighters[0].aura = HAKI_AURA;
  fxState.battle.fx = [{
    id: 1, ts: 1, kind: "heavy", skill: "เกียร์ 5", label: "ท่าไม้ตาย", owner: "Luffy", ownerCid: "luffy",
    pid: "p1", pname: "ผม", aura: HAKI_AURA,
    targets: [{ pid: "p2", cid: "kaido", name: "Kaido", dmg: 42, tag: "hit", aura: HAKI_AURA, ko: false }],
  }];
  led = null; let fxThrew = false;
  try { APP.applyState(fxState); } catch (e) { fxThrew = true; led = e.message; }
  ok(!fxThrew, "สถานะที่มีเหตุการณ์เอฟเฟคไม่ทำให้หน้าจอพัง" + (fxThrew ? ` (${led})` : ""));
  ok(/42\/120|Kaido/.test(gameEl.innerHTML), "ยังวาดสนามต่อสู้ได้ปกติหลังมีเอฟเฟค");
  ok(APP.skillsOf({ skills: [ATTACK, GUARD] }).length === 2 && APP.skillsOf({ skill: ATTACK }).length === 1,
    "อ่านชุดสกิลได้ทั้งแบบหลายท่าและแบบท่าเดียว (ข้อมูลเก่า)");

  console.log("\n— เมนูหน้าแรก: ดูการ์ดทั้งหมด & เมต้า —");
  const ICE_AURA = { id: "ice", th: "ฮิเอะ ฮิเอะ น้ำแข็ง", fx: "ice", c1: "#8fe9ff", c2: "#0a3550" };
  const CAT = {
    count: 3, groups: ["หมวกฟาง", "กองทัพเรือ"], auras: [HAKI_AURA, ICE_AURA],
    tiers: ["S", "A", "B", "C"], kinds: { heavy: "ท่าไม้ตาย", haki: "ฮาคิราชันย์" },
    cards: [
      { id: "luffy", name: "Monkey D. Luffy", group: "หมวกฟาง", pl: 95, effect: '"Gear 5 อิสรภาพ"', img: "images/luffy.png",
        aura: HAKI_AURA, tier: "S", meta: 101, bonus: 6, passive: null,
        skills: [{ ...ATTACK, aura: "haki" }, HAKI, GUARD] },
      { id: "kuzan", name: "Kuzan (Aokiji)", group: "กองทัพเรือ", pl: 92, effect: '"ฮิเอะฮิเอะ"', img: "images/kuzan.png",
        aura: ICE_AURA, tier: "A", meta: 96, bonus: 4, passive: null,
        skills: [{ ...ATTACK, name: "ฮิเอะฮิเอะ", aura: "ice" }, { ...GUARD, aura: "ice" }, HAKI] },
      { id: "nami", name: "Nami", group: "หมวกฟาง", pl: 45, effect: '"โคโนโคโน"', img: "images/nami.png",
        aura: { id: "weather", th: "สภาพอากาศ", fx: "spark", c1: "#9be6ff", c2: "#0d2a3a" },
        tier: "C", meta: 48, bonus: 3, passive: null,
        skills: [{ ...ATTACK, name: "โคโนโคโน" }, GUARD, HAKI] },
    ],
  };
  handler = async (url) => (url.includes("/api/cards") ? { status: 200, d: CAT } : { status: 200, d: { state: battleState(84) } });
  APP.NAV.data = null; APP.NAV.error = null; APP.NAV.q = ""; APP.NAV.tier = "";
  const cat = await APP.loadCards();
  ok(cat && cat.cards.length === 3, `โหลดข้อมูลการ์ดจาก /api/cards ได้ (${cat && cat.cards.length} ใบ)`);
  ok(APP.filterCards(CAT.cards, { tier: "S" }).length === 1, "กรองตาม tier ได้");
  ok(APP.filterCards(CAT.cards, { q: "luffy" }).length === 1, "ค้นหาชื่อการ์ดได้ (พิมพ์เล็กก็เจอ)");
  ok(APP.filterCards(CAT.cards, { q: "ฮิเอะ" }).length === 1, "ค้นหาจากชื่อออร่า/ความสามารถก็เจอ");
  ok(APP.filterCards(CAT.cards, { group: "กองทัพเรือ" }).length === 1, "กรองตามกลุ่มได้");
  ok(APP.filterCards(CAT.cards, { aura: "haki" }).length === 1, "กรองตามออร่าได้");
  const byMeta = APP.sortCards(CAT.cards, "meta");
  ok(byMeta[0].id === "luffy" && byMeta[2].id === "nami", `เรียงตามคะแนนเมต้าได้ (${byMeta.map((c) => c.name).join(" > ")})`);
  ok(APP.sortCards(CAT.cards, "tier")[0].tier === "S" && APP.sortCards(CAT.cards, "pl")[0].pl === 95, "เรียงตาม tier/PL ได้");

  S.code = null; S.state = null;
  APP.NAV.page = "cards";
  APP.renderNow();
  ok(getEl("cards").hidden === false && getEl("home").hidden === true, "เปิดหน้า “การ์ด & เมต้า” ได้จากเมนู");
  ok(/Monkey D\. Luffy/.test(cardsEl.innerHTML) && /PL 95/.test(cardsEl.innerHTML), "หน้าเว็บแสดงการ์ดพร้อม PL");
  ok(/เมต้าสูงสุด 10 อันดับ/.test(cardsEl.innerHTML), "มีการ์ดเมต้าสูงสุดพร้อมคะแนน");
  ok(/--au:#ff2233/.test(cardsEl.innerHTML) && /fx-/.test(cardsEl.innerHTML), "การ์ดในหน้าเว็บใช้สีกรอบตามออร่า");
  clickCards({ "data-cards-act": "pick", "data-id": "luffy" });
  ok(APP.NAV.pick === "luffy" && /สกิลทั้งหมด/.test(cardsEl.innerHTML), "กดการ์ดแล้วเปิดรายละเอียดได้");
  ok(/ฮาคิราชันย์/.test(cardsEl.innerHTML) && /ตั้งการ์ด/.test(cardsEl.innerHTML), "รายละเอียดโชว์สกิลทั้งชุดของใบนั้น");
  clickCards({ "data-cards-act": "close", disabled: false });
  ok(APP.NAV.pick === null, "ปิดรายละเอียดได้");
  APP.NAV.q = "ซุง"; APP.NAV.page = "cards"; APP.renderNow();
  ok(/ไม่พบการ์ดที่ตรงกับตัวกรอง/.test(cardsEl.innerHTML), "ค้นหาไม่เจอแล้วขึ้นข้อความบอก");
  APP.NAV.q = "";

  APP.NAV.page = "help";
  APP.renderNow();
  ok(getEl("help").hidden === false, "เปิดหน้าวิธีเล่นได้");
  ok(/วิธีเล่น/.test(getEl("help").innerHTML) && /ฮาคิราชันย์/.test(getEl("help").innerHTML), "หน้าวิธีเล่นอธิบายกติกาและออร่า");
  ok(/การ์ดต่อคน/.test(getEl("help").innerHTML), "หน้าวิธีเล่นอธิบายการตั้งค่าการ์ดต่อคน");

  console.log("\n— ตั้งค่าห้อง: การ์ดต่อคนเท่ากัน —");
  S.code = "TEST1"; S.playerId = "p1"; S.token = "tok";
  APP.NAV.page = "home";
  APP.applyState(base(85));
  ok(/id="setPer"/.test(gameEl.innerHTML), "เจ้าของห้องเห็นช่อง “การ์ดต่อคน” ในหน้าตั้งค่า");
  const lobPer = base(86);
  lobPer.settings.cardsPerPlayer = 2;
  lobPer.players = [player("p1", "ผม"), player("p2", "คู่หู"), player("p3", "เพื่อน")];
  APP.applyState(lobPer);
  ok(/การ์ดต่อคน \(เท่ากันทุกคน\)/.test(gameEl.innerHTML), "ตั้งค่าห้องมีหัวข้อการ์ดต่อคน (เท่ากันทุกคน)");
  const auPer = {
    ...base(87), phase: "auction", round: 2, totalCards: 4, minNext: 2, highBid: 0,
    settings: { ...base(87).settings, cardsPerPlayer: 2 },
  };
  APP.applyState(auPer);
  ok(/โควตาการ์ดต่อคน/.test(gameEl.innerHTML), "หน้าประมูลบอกโควตาการ์ดต่อคน");
  ok(/คนละ 2 ใบ/.test(getEl("tRound").textContent), `แถบหัวบอกโควตาต่อคน (${getEl("tRound").textContent})`);
  APP.NAV.page = "home";
  APP.applyState(battleState(88));
  ok(getEl("game").hidden === false && getEl("cards").hidden === true, "กลับเข้าหน้าห้องเกมได้หลังออกไปดูการ์ด");

  console.log("\n— จังหวะซิงก์ตามตา (ลดการกินโควตา 10,000 คำขอ/วัน) —");
  APP.applyState(battleState(90));
  ok(APP.pollDelay() === 800, `ถึงตาเรา → ซิงก์ถี่ ${APP.pollDelay()}ms`);
  const otherTurn = battleState(91);
  otherTurn.battle.turn = "p2";
  APP.applyState(otherTurn);
  ok(APP.pollDelay() === 1800, `รอคนอื่นเล่น → ซิงก์ห่าง ${APP.pollDelay()}ms`);
  const lobby = base(92);
  APP.applyState(lobby);
  ok(APP.pollDelay() === 1800, `อยู่ในห้องรอ → ซิงก์ห่าง ${APP.pollDelay()}ms`);

  console.log("\n" + (fails === 0 ? "🎉 ผ่านทั้งหมด" : `❌ ล้มเหลว ${fails} ข้อ`));
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => { console.error("เทสต์พัง:", e); process.exit(1); });
