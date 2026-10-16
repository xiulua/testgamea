import { ROSTER } from "./roster.js";

const STALE_MS = 45000; // ถือว่า offline / ถูกข้ามอัตโนมัติ
const MAX_LOG = 40;
const MAX_PLAYERS = 8;
const PING_MS = 5000; // อัปเดต lastSeen อย่างมากทุก 5 วิ (ลดการเขียน DB)

const CHAR_BY_ID = Object.fromEntries(ROSTER.map((c) => [c.id, c]));

// ส่งการ์ดแบบย่อ (ตัดรายละเอียดสกิลยาว ๆ ออก) เพื่อไม่ให้สถานะห้องใหญ่เกินไป
const cardBrief = (c) =>
  c && {
    id: c.id,
    name: c.name,
    img: c.img,
    pl: c.pl,
    group: c.group,
    effect: c.effect,
    aura: c.aura || null,
  };

/* ------------------------------ utils ------------------------------ */
const J = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const ERR = (error, status = 400) => J({ error }, status);

const randHex = (bytes) =>
  [...crypto.getRandomValues(new Uint8Array(bytes))]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");

const token = () => randHex(24);
const pid = () => "p_" + randHex(6);

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function roomCode(len = 5) {
  const b = crypto.getRandomValues(new Uint8Array(len));
  return [...b].map((x) => CODE_ALPHABET[x % CODE_ALPHABET.length]).join("");
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const clampInt = (v, lo, hi) => {
  const n = Math.floor(Number(v));
  if (!Number.isFinite(n)) return null;
  return Math.min(hi, Math.max(lo, n));
};

const cleanName = (v) =>
  String(v == null ? "" : v)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, 16);

function normalizeSettings(raw) {
  const r = raw && typeof raw === "object" ? raw : {};
  return {
    startingMoney: clampInt(r.startingMoney, 20, 2000) ?? 120,
    cardCount: clampInt(r.cardCount, 3, ROSTER.length) ?? 20,
    startPrice: clampInt(r.startPrice, 1, 500) ?? 1,
    minIncrement: clampInt(r.minIncrement, 1, 100) ?? 1,
    // จำนวนการ์ดต่อคน (เท่ากันทุกคน) · 0 = ไม่จำกัด ใครบิดได้ก็ได้
    cardsPerPlayer: clampInt(r.cardsPerPlayer, 0, 20) ?? 0,
    battle: r.battle !== false, // โหมดเอาการ์ดมาตีกันเป็นเทิร์น
  };
}

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true; // ไม่ใช่เบราว์เซอร์ / same-origin แบบไม่มี header
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function readJson(request) {
  const text = await request.text();
  if (text.length > 4000) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/* --------------------------- D1 persistence --------------------------- */
let schemaDone = false;
async function ensureSchema(env) {
  if (schemaDone) return;
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS rooms (
       code TEXT PRIMARY KEY,
       host_id TEXT NOT NULL,
       state TEXT NOT NULL,
       version INTEGER NOT NULL DEFAULT 1,
       created_at INTEGER NOT NULL,
       updated_at INTEGER NOT NULL
     )`
  ).run();
  schemaDone = true;
}

async function readRoom(env, code) {
  const row = await env.DB.prepare(
    "SELECT code, state, version, created_at FROM rooms WHERE code = ?"
  )
    .bind(code)
    .first();
  if (!row) return null;
  return {
    code: row.code,
    version: row.version,
    createdAt: row.created_at,
    state: JSON.parse(row.state),
  };
}

/** อ่าน–แก้–เขียนแบบ optimistic lock; fn(room) คืน {data} / {error} / {skip} */
async function mutate(env, code, fn) {
  for (let i = 0; i < 12; i++) {
    const room = await readRoom(env, code);
    if (!room) return { status: 404, error: "ไม่พบห้องนี้ (รหัสอาจพิมพ์ผิด)" };
    const out = fn(room) || {};
    if (out.error) return { status: out.status || 400, error: out.error };
    if (out.skip) return { room, data: out.data };
    if (out.presence) {
      // อัปเดต presence อย่างเดียว — ไม่ bump version เพื่อให้ไคลเอนต์ไม่ re-render
      // ⚠️ ต้องเทียบ version ด้วย ไม่งั้นการเขียน presence จะทับคำสั่งที่คนอื่นเพิ่งทำสำเร็จ (ปุ่มกดแล้วหาย)
      const pr = await env.DB.prepare(
        "UPDATE rooms SET state = ?, updated_at = ? WHERE code = ? AND version = ?"
      )
        .bind(JSON.stringify(room.state), Date.now(), code, room.version)
        .run();
      if (pr.meta && pr.meta.changes > 0) return { room, data: out.data };
      continue; // มีคนแก้พร้อมกัน → อ่านสถานะใหม่แล้วลองอีกครั้ง
    }
    const nextV = room.version + 1;
    const r = await env.DB.prepare(
      "UPDATE rooms SET state = ?, version = ?, updated_at = ? WHERE code = ? AND version = ?"
    )
      .bind(JSON.stringify(room.state), nextV, Date.now(), code, room.version)
      .run();
    if (r.meta && r.meta.changes > 0) {
      room.version = nextV;
      return { room, data: out.data };
    }
  }
  return { status: 409, error: "มีการแก้ไขพร้อมกัน ลองอีกครั้ง" };
}

/* --------------------------- game logic --------------------------- */
const pById = (s, id) => s.players.find((p) => p.id === id) || null;
const isActive = (s, id) => !s.passed.includes(id);
const activePlayers = (s) => s.players.filter((p) => isActive(s, p.id));

function pushLog(s, msg) {
  s.log.push({ ts: Date.now(), msg });
  if (s.log.length > MAX_LOG) s.log = s.log.slice(-MAX_LOG);
}

// ราคาเปิด = startPrice (ค่าตั้งต้น 1 บาท) แล้วทบขึ้นครั้งละ minIncrement ทุกครั้งที่มีคนบิด
const minNextBid = (s) =>
  s.highBid === 0 ? s.settings.startPrice : s.highBid + s.settings.minIncrement;

/* ---- โควตาการ์ดต่อคน (ตั้งค่าในห้อง): ทุกคนได้เท่ากัน ---- */
const perPlayerOf = (s) => (s.settings && s.settings.cardsPerPlayer) || 0;
const atCardCap = (s, p) => perPlayerOf(s) > 0 && p.cards.length >= perPlayerOf(s);
/** จำนวนการ์ดทั้งหมดที่จะเปิดประมูล (โควตาต่อคน × จำนวนคน) */
const deckSizeOf = (s) => {
  const per = perPlayerOf(s);
  return per > 0 ? Math.min(ROSTER.length, per * s.players.length) : s.settings.cardCount;
};

/** คะแนนช่วงประมูล: พลังรวม + โบนัสทีมเวิร์ค (กลุ่มเดียวกัน 3 ใบขึ้นไป +5/ใบ) */
function auctionScore(p) {
  const cards = p.cards.map((id) => CHAR_BY_ID[id]).filter(Boolean);
  const pl = cards.reduce((a, c) => a + c.pl, 0);
  const counts = {};
  for (const c of cards) counts[c.group] = (counts[c.group] || 0) + 1;
  let synergy = 0;
  const synergyDetail = [];
  for (const [g, n] of Object.entries(counts)) {
    if (n >= 3) {
      synergy += n * 5;
      synergyDetail.push(`${g} ×${n} = +${n * 5}`);
    }
  }
  return { cards, pl, synergy, synergyDetail };
}

function endGame(s) {
  s.phase = "ended";
  s.current = null;
  s.turn = null;
  const b = s.battle;
  s.scores = s.players
    .map((p) => {
      const { cards, pl, synergy, synergyDetail } = auctionScore(p);
      const kos = b ? b.kos[p.id] || 0 : 0;
      const battle = b ? b.koPoints[p.id] || 0 : 0;
      const survivors = b ? aliveFighters(b, p.id).length : 0;
      return {
        id: p.id,
        name: p.name,
        cards: cards.map(cardBrief),
        pl,
        synergy,
        synergyDetail,
        kos,
        survivors,
        battle,
        total: pl + synergy + battle,
        moneyLeft: p.money,
      };
    })
    .sort((a, b) => b.total - a.total || b.pl - a.pl || a.name.localeCompare(b.name));
  const win = s.scores[0];
  pushLog(s, win ? `🏆 จบเกม! ผู้ชนะ: ${win.name} (${win.total} คะแนน)` : "จบเกม");
}

/* ============================ การ์ดตีกัน (เทิร์นเบส) ============================ */
/** รหัสสกิลที่ไคลเอนต์/บอทส่งมา: "basic" = โจมตีพื้นฐาน, อื่น ๆ = ชนิดสกิลประจำการ์ด */
const skPayloadId = (sk) => (sk === BASIC_SKILL ? "basic" : sk.kind);

/** ทุกการ์ดใช้ "โจมตีพื้นฐาน" ได้เสมอ แม้สกิลประจำตัวจะติดคูลดาวน์ (เกมจะไม่ค้าง) */
const BASIC_SKILL = {
  name: "โจมตีพื้นฐาน",
  label: "โจมตีพื้นฐาน",
  kind: "strike",
  desc: "ดาเมจ 100% ของพลังโจมตี · ใช้ได้ทุกเทิร์น ไม่มีคูลดาวน์",
  cd: 0,
  target: "enemy",
  mult: 1,
  aura: null,
  basic: true,
};

const KO_BASE = 10; // คะแนนสงครามพื้นฐานต่อการล้ม 1 ตัว
const WIN_BONUS = 60; // ผู้ยืนหยัดคนสุดท้าย
const WIN_BONUS_PER_SURVIVOR = 5;
const TIMEOUT_BONUS = 25;

/** HP/พลังโจมตีต่อสู้ คิดจาก PL ของการ์ดใบนั้น */
const fighterHp = (pl) => 50 + Math.round(pl * 0.8);
const fighterAtk = (pl) => 10 + Math.round(pl * 0.2);
const koPoints = (pl) => KO_BASE + Math.floor(pl / 10);

const fById = (b, pid, cid) => b.fighters.find((f) => f.pid === pid && f.cid === cid) || null;
const fightersOf = (b, pid) => b.fighters.filter((f) => f.pid === pid);
const aliveFighters = (b, pid) =>
  b.fighters.filter((f) => f.alive && (pid == null || f.pid === pid));
const cardOf = (f) => CHAR_BY_ID[f.cid];

/** ทุกสกิลที่การ์ดใบนี้ใช้ได้ (สกิลประจำตัว + สกิลเสริม) */
const cardSkills = (c) =>
  c && Array.isArray(c.skills) && c.skills.length ? c.skills : c && c.skill ? [c.skill] : [];
const skillOf = (c, kind) => cardSkills(c).find((sk) => sk.kind === kind) || null;
const auraOf = (cid) => (CHAR_BY_ID[cid] && CHAR_BY_ID[cid].aura) || null;

/** พลังโจมตีจริง (รวมบัพปลุกใจ + พาสซีฟใจสิงห์) */
function effAtk(f) {
  let atk = f.atk;
  if (f.buff > 0) atk = Math.round(atk * 1.4);
  if (f.passive === "brave" && f.hp <= f.maxHp * 0.4) atk = Math.round(atk * 1.25);
  return atk;
}

function startBattle(s) {
  const b = {
    fighters: [],
    order: [],
    idx: -1,
    turns: 0,
    rounds: 0,
    maxTurns: 0,
    kos: {},
    koPoints: {},
    result: null,
  };
  for (const p of s.players) {
    b.kos[p.id] = 0;
    b.koPoints[p.id] = 0;
    for (const cid of p.cards) {
      const c = CHAR_BY_ID[cid];
      if (!c) continue;
      b.fighters.push({
        pid: p.id,
        cid,
        hp: fighterHp(c.pl),
        maxHp: fighterHp(c.pl),
        atk: fighterAtk(c.pl),
        alive: true,
        buff: 0,
        shield: 0,
        stun: 0,
        burn: 0,
        burnDmg: 0,
        cds: {},
        passive: c.skill && c.skill.passive ? c.skill.passive.kind : null,
        passiveUsed: false,
      });
    }
    if (p.cards.length) b.order.push(p.id);
    else pushLog(s, `${p.name} ไม่มีตัวละครในทีม — นั่งดูเพื่อนสู้`);
  }
  s.battle = b;
  s.phase = "battle";
  b.maxTurns = Math.max(12, b.order.length * 12);
  pushLog(
    s,
    `⚔️ เริ่มการต่อสู้! ${b.fighters.length} ตัวลงสนาม · KO 1 ตัว = ${KO_BASE}+คะแนน · ผู้รอดคนสุดท้าย +${WIN_BONUS}`
  );
  if (b.order.length === 0) return endBattle(s, "nofighter");
  if (b.order.length === 1) {
    pushLog(s, `🏅 ${pById(s, b.order[0]).name} เป็นผู้รอดเพียงคนเดียว`);
    return endBattle(s, "walkover");
  }
  advanceBattle(s);
}

/** เริ่มรอบใหม่: คูลดาวน์เดินหน้า, ไฟไหม้ทำงาน, บัพ/เกราะหมดอายุ */
function battleRoundStart(s) {
  const b = s.battle;
  b.rounds = (b.rounds || 0) + 1;
  for (const f of b.fighters) {
    for (const k of Object.keys(f.cds)) if (f.cds[k] > 0) f.cds[k] -= 1;
  }
  for (const f of b.fighters) {
    if (!f.alive) continue;
    if (f.burn > 0) {
      f.burn -= 1;
      const dmg = f.burnDmg;
      f.hp = Math.max(0, f.hp - dmg);
      pushLog(s, `🔥 ${cardOf(f).name} ของ ${pById(s, f.pid).name} ถูกไฟไหม้ ${dmg} (เหลือ ${f.hp})`);
      pushFx(s, {
        kind: "burn",
        skill: "ไฟลุกต่อเนื่อง",
        label: "เผาไหม้",
        owner: cardOf(f).name,
        ownerCid: f.cid,
        pid: f.pid,
        pname: pById(s, f.pid).name,
        aura: auraOf(f.cid),
        targets: [{ pid: f.pid, cid: f.cid, name: cardOf(f).name, dmg, tag: "burn", aura: auraOf(f.cid), ko: false }],
      });
      if (f.hp === 0) killFighter(s, null, f);
    }
    if (f.buff > 0) f.buff -= 1;
    if (f.shield > 0) f.shield -= 1;
  }
}

/** สรุปว่ามีผู้ยืนหยัดเหลือคนเดียวหรือยัง */
function checkBattleEnd(s) {
  const b = s.battle;
  if (!b || b.result) return true;
  const standing = b.order.filter((pid) => aliveFighters(b, pid).length > 0);
  if (standing.length <= 1) {
    endBattle(s, standing.length === 1 ? "knockout" : "wipeout");
    return true;
  }
  return false;
}

function advanceBattle(s) {
  const b = s.battle;
  if (!b || b.result) return;
  for (let guard = 0; guard < 400; guard++) {
    b.idx += 1;
    if (b.idx >= b.order.length) {
      b.idx = 0;
      battleRoundStart(s);
      if (checkBattleEnd(s)) return;
    }
    const pid = b.order[b.idx];
    const mine = aliveFighters(b, pid);
    if (!mine.length) continue;
    if (mine.every((f) => f.stun > 0)) {
      for (const f of mine) if (f.stun > 0) f.stun -= 1;
      pushLog(s, `💤 ${pById(s, pid).name} ถูกสะกดทั้งทีม — ข้ามเทิร์น`);
      continue;
    }
    b.turns += 1;
    if (b.turns > b.maxTurns) {
      endBattle(s, "timeout");
      return;
    }
    return;
  }
  endBattle(s, "stuck");
}

function endBattle(s, reason) {
  const b = s.battle;
  if (!b || b.result) return;
  const standing = b.order.filter((pid) => aliveFighters(b, pid).length > 0);
  let winnerPid = null;
  let bonus = 0;
  if (standing.length === 1) {
    winnerPid = standing[0];
    bonus = WIN_BONUS + WIN_BONUS_PER_SURVIVOR * aliveFighters(b, winnerPid).length;
  } else if (standing.length > 1) {
    const ranked = [...standing].sort((a, c) => {
      const da = aliveFighters(b, a).length;
      const dc = aliveFighters(b, c).length;
      if (dc !== da) return dc - da;
      const ha = aliveFighters(b, a).reduce((n, f) => n + f.hp, 0);
      const hc = aliveFighters(b, c).reduce((n, f) => n + f.hp, 0);
      return hc - ha;
    });
    winnerPid = ranked[0];
    bonus = TIMEOUT_BONUS;
  }
  if (winnerPid) b.koPoints[winnerPid] = (b.koPoints[winnerPid] || 0) + bonus;
  b.result = {
    winnerPid,
    winnerName: winnerPid ? pById(s, winnerPid).name : null,
    reason,
    bonus,
    timeout: reason === "timeout" || reason === "stuck",
  };
  b.idx = -1;
  if (winnerPid)
    pushLog(
      s,
      `🥇 สิ้นสุดการต่อสู้ — ${b.result.winnerName} ชนะสงคราม${b.result.timeout ? " (หมดเวลา ตัดสินจากตัวที่รอด)" : ""} +${bonus} คะแนน`
    );
  else pushLog(s, "การต่อสู้จบลงโดยไม่มีผู้ชนะ");
  endGame(s);
}

function killFighter(s, killer, f) {
  const b = s.battle;
  const c = cardOf(f);
  const owner = pById(s, f.pid).name;
  if (f.passive === "revive" && !f.passiveUsed) {
    f.passiveUsed = true;
    f.hp = Math.max(1, Math.round(f.maxHp * 0.3));
    f.alive = true;
    pushLog(s, `✨ ${c.name} ของ ${owner} ลุกขึ้นมายืนอีกครั้ง! (HP ${f.hp})`);
    return;
  }
  f.alive = false;
  f.hp = 0;
  pushLog(s, `💀 ${c.name} ของ ${owner} หมดสติ`);
  if (killer && killer.pid !== f.pid) {
    const pts = koPoints(c.pl);
    b.kos[killer.pid] = (b.kos[killer.pid] || 0) + 1;
    b.koPoints[killer.pid] = (b.koPoints[killer.pid] || 0) + pts;
    pushLog(s, `🏅 ${pById(s, killer.pid).name} ล้มได้ ${c.name} → +${pts} คะแนนสงคราม`);
  }
}

function applyDamage(s, attacker, target, raw, opts = {}) {
  let dmg = Math.max(1, Math.round(raw));
  const blocked = target.shield > 0 && !opts.ignoreShield;
  if (blocked) dmg = Math.max(1, Math.ceil(dmg * 0.5));
  if (target.passive === "sturdy") dmg = Math.max(1, Math.ceil(dmg * 0.8));
  target.hp = Math.max(0, target.hp - dmg);
  fxNote(s, target, dmg, blocked ? "block" : "hit");
  if (target.hp === 0) killFighter(s, attacker, target);
  return { dmg, blocked };
}

/* ---------------------- เอฟเฟคที่ทุกคนเห็น ----------------------
   ทุกการลงมือจะถูกบันทึกเป็น "เหตุการณ์" ไว้ในสถานะห้อง
   ไคลเอนต์ทุกเครื่องดึงไปเล่นอนิเมชันเดียวกัน (ดาเมจลอย, กรอบออร่าติดไฟ/น้ำแข็ง/สายฟ้า)
----------------------------------------------------------------- */
function fxNote(s, f, dmg, tag) {
  const b = s.battle;
  if (!b) return;
  if (!Array.isArray(b._fxTargets)) b._fxTargets = [];
  b._fxTargets.push({ pid: f.pid, cid: f.cid, name: cardOf(f).name, dmg: dmg || 0, tag: tag || "hit" });
}

/** ติดสถานะเพิ่มให้โน้ตของเป้าหมายที่มีอยู่แล้ว (เช่น โดนตีแล้วสลบ/ติดไฟ)
    ใช้เพื่อไม่ให้เกิดโน้ตซ้ำต่อเป้าหมายเดียวในเทิร์นเดียวกัน */
function fxFlag(s, f, key) {
  const b = s.battle;
  const list = b && Array.isArray(b._fxTargets) ? b._fxTargets : [];
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i].pid === f.pid && list[i].cid === f.cid) {
      list[i][key] = true;
      return;
    }
  }
}

function pushFx(s, ev) {
  const b = s.battle;
  if (!b || !ev) return;
  b.fxId = (b.fxId || 0) + 1;
  const list = Array.isArray(b.fx) ? b.fx.slice(-7) : [];
  list.push({ id: b.fxId, ts: Date.now(), ...ev });
  b.fx = list;
}

/** ปิดท้ายเทิร์น: แปลงสิ่งที่เพิ่งเกิดขึ้นเป็นเหตุการณ์เอฟเฟค 1 อัน */
function flushFx(s, player, mine, c, sk) {
  const b = s.battle;
  const raw = b && Array.isArray(b._fxTargets) ? b._fxTargets : [];
  if (b) delete b._fxTargets;
  const targets = raw.map((t) => ({
    ...t,
    aura: auraOf(t.cid),
    ko: !(fById(b, t.pid, t.cid) || {}).alive,
  }));
  pushFx(s, {
    kind: sk.kind,
    skill: sk.name,
    label: sk.label,
    owner: c.name,
    ownerCid: c.id,
    pid: player.id,
    pname: player.name,
    aura: c.aura || null,
    targets,
  });
}

/** เลือกเป้าหมายที่ถูกต้องตามชนิดสกิล */
function pickTarget(s, player, sk, payload) {
  const b = s.battle;
  if (sk.target === "self") return null;
  const t = fById(b, payload.targetPid, payload.target);
  if (!t || !t.alive) return { error: "เลือกเป้าหมายที่ยังอยู่บนสนามด้วย" };
  if (sk.target === "enemy" && t.pid === player.id) return { error: "สกิลนี้ต้องเล็งไปที่ศัตรู" };
  if (sk.target === "ally" && t.pid !== player.id)
    return { error: "สกิลนี้ใช้ได้กับทีมตัวเองเท่านั้น" };
  return { target: t };
}

/** ลงมือ 1 เทิร์นของผู้เล่น (บังคับให้เป็นเทิร์นของคนนี้) */
function resolveFight(s, player, payload) {
  const b = s.battle;
  if (!b || b.result) return { error: "การต่อสู้จบไปแล้ว" };
  if (b.order[b.idx] !== player.id) return { error: "ยังไม่ถึงเทิร์นของคุณ" };
  const mine = fById(b, player.id, payload.fighter);
  if (!mine || !mine.alive) return { error: "เลือกการ์ดที่จะออกโรงก่อน" };
  const c = cardOf(mine);
  const isBasic = payload.skill === "basic";
  const own = cardSkills(c);
  const sk = isBasic ? BASIC_SKILL : skillOf(c, payload.skill || (own[0] && own[0].kind));
  if (!sk) return { error: `${c.name} ไม่มีสกิลนั้น` };
  const cdLeft = isBasic ? 0 : mine.cds[sk.kind] || 0;
  if (cdLeft > 0) return { error: `${sk.label} ยังพักอีก ${cdLeft} เทิร์น` };
  b._fxTargets = [];

  const who = `${c.name} (${player.name})`;
  const atk = effAtk(mine);
  let picked = null;
  if (sk.target === "enemy" || sk.target === "ally") {
    picked = pickTarget(s, player, sk, payload);
    if (picked.error) return picked;
  }
  const t = picked ? picked.target : null;

  switch (sk.kind) {
    case "strike":
    case "heavy": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      pushLog(
        s,
        `⚔️ ${who} ใช้ “${sk.name}” → ${cardOf(t).name} โดน ${r.dmg}${r.blocked ? " (ติดเกราะ)" : ""} (เหลือ ${t.hp})`
      );
      break;
    }
    case "snipe": {
      const r = applyDamage(s, mine, t, atk * sk.mult, { ignoreShield: true });
      pushLog(s, `🏹 ${who} ใช้ “${sk.name}” ทะลุเกราะ → ${cardOf(t).name} โดน ${r.dmg} (เหลือ ${t.hp})`);
      break;
    }
    case "execute": {
      const low = t.hp <= t.maxHp * 0.35;
      const r = applyDamage(s, mine, t, atk * sk.mult * (low ? 2 : 1));
      pushLog(
        s,
        `☠️ ${who} ใช้ “${sk.name}”${low ? " เข้าเงื่อนไขประหาร!" : ""} → ${cardOf(t).name} โดน ${r.dmg} (เหลือ ${t.hp})`
      );
      break;
    }
    case "drain": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      const heal = Math.round(r.dmg * 0.6);
      const before = mine.hp;
      mine.hp = Math.min(mine.maxHp, mine.hp + heal);
      fxNote(s, mine, mine.hp - before, "heal");
      pushLog(
        s,
        `🩸 ${who} ใช้ “${sk.name}” → ${cardOf(t).name} โดน ${r.dmg} · ดูดเลือดคืน ${mine.hp - before} (ตัวเอง ${mine.hp})`
      );
      break;
    }
    case "burn": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      t.burn = 3;
      t.burnDmg = Math.max(3, Math.round(atk * 0.4));
      fxFlag(s, t, "burn");
      pushLog(
        s,
        `🔥 ${who} ใช้ “${sk.name}” → ${cardOf(t).name} โดน ${r.dmg}${t.alive ? ` + ติดไฟ ${t.burnDmg}/เทิร์น 3 เทิร์น` : ""}`
      );
      break;
    }
    case "stun": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      if (t.alive) {
        t.stun = 1;
        fxFlag(s, t, "stun");
      }
      pushLog(
        s,
        `💤 ${who} ใช้ “${sk.name}” → ${cardOf(t).name} โดน ${r.dmg}${t.alive ? " + ถูกสะกด 1 เทิร์น" : ""}`
      );
      break;
    }
    case "sweep": {
      const enemies = aliveFighters(b).filter((f) => f.pid !== player.id);
      let total = 0;
      for (const e of enemies) total += applyDamage(s, mine, e, atk * sk.mult).dmg;
      pushLog(s, `🌊 ${who} ใช้ “${sk.name}” กวาด ${enemies.length} ตัว รวม ${total} ดาเมจ`);
      break;
    }
    case "heal": {
      const amount = Math.round(atk * sk.mult);
      const before = t.hp;
      t.hp = Math.min(t.maxHp, t.hp + amount);
      fxNote(s, t, t.hp - before, "heal");
      pushLog(
        s,
        `💚 ${who} ใช้ “${sk.name}” → ฟื้น ${t.hp - before} HP ให้ ${cardOf(t).name} (${t.hp}/${t.maxHp})`
      );
      break;
    }
    case "rally": {
      mine.buff = 2;
      fxNote(s, mine, 0, "buff");
      pushLog(s, `📣 ${who} ใช้ “${sk.name}” → พลังโจมตี +40% (${effAtk(mine)}) นาน 2 เทิร์น`);
      break;
    }
    case "guard": {
      t.shield = 2;
      fxNote(s, t, 0, "shield");
      pushLog(s, `🛡️ ${who} ใช้ “${sk.name}” → ${cardOf(t).name} ติดเกราะลดดาเมจ 50% 2 เทิร์น`);
      break;
    }
    case "blade": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      pushLog(
        s,
        `🗡️ ${who} ใช้ “${sk.name}” → ${cardOf(t).name} โดนสิ่งคม ${r.dmg} · สิ่งเดียวที่ฆ่าได้`
      );
      break;
    }
    case "reaper": {
      const enemies = aliveFighters(b).filter((f) => f.pid !== player.id);
      let total = 0;
      for (const e of enemies) {
        const r = applyDamage(s, mine, e, atk * sk.mult);
        total += r.dmg;
      }
      pushLog(s, `💀 ${who} ใช้ “${sk.name}” จากด้านหลัง → ศัตรู ${enemies.length} ตัว รวม ${total} ดาเมจ`);
      break;
    }
    case "flank": {
      const r = applyDamage(s, mine, t, atk * sk.mult);
      if (t.alive) {
        t.stun = 1;
        fxFlag(s, t, "stun");
      }
      pushLog(
        s,
        `🎯 ${who} ใช้ “${sk.name}” → ${cardOf(t).name} โดนกัดรอบ ${r.dmg} + สะกด 1 เทิร์น`
      );
      break;
    }
    // ฮาคิราชันย์: ดาเมจใส่ทุกตัว + สะกดตัวที่ยังยืนอยู่
    // ฮาคิราชันย์: ดาเมจทุกตัว + ตัวที่อ่อน (HP ≤ 50%) สลบข้ามเทิร์น
    case "haki": {
      const enemies = aliveFighters(b).filter((f) => f.pid !== player.id);
      let total = 0;
      let stunned = 0;
      for (const e of enemies) {
        const r = applyDamage(s, mine, e, atk * sk.mult);
        total += r.dmg;
        if (e.alive && e.hp <= e.maxHp * 0.5) {
          e.stun = 1;
          stunned += 1;
          fxFlag(s, e, "stun");
        }
      }
      pushLog(
        s,
        `🌩️ ${who} ปล่อย “${sk.name}” → ศัตรู ${enemies.length} ตัว โดนรวม ${total} · ตัวอ่อนสลบ ${stunned} ตัว`
      );
      break;
    }
    // ป้อมปราการ: ตั้งรับหนัก ๆ แล้วฮีลตัวเอง
    case "fortify": {
      mine.shield = Math.max(mine.shield, 3);
      const heal = Math.round(mine.maxHp * 0.25);
      const before = mine.hp;
      mine.hp = Math.min(mine.maxHp, mine.hp + heal);
      fxNote(s, mine, mine.hp - before, "heal");
      pushLog(
        s,
        `🧱 ${who} ใช้ “${sk.name}” → เกราะ 3 เทิร์น + ฟื้น ${mine.hp - before} HP (${mine.hp}/${mine.maxHp})`
      );
      break;
    }
    default:
      return { error: "สกิลนี้ยังใช้ไม่ได้" };
  }

  if (!isBasic && sk.cd > 0) mine.cds[sk.kind] = sk.cd;
  flushFx(s, player, mine, c, sk);
  if (checkBattleEnd(s)) return { data: { ok: true } };
  advanceBattle(s);
  return { data: { ok: true } };
}

/** บอทเลือกท่าให้ผู้เล่นที่หลุด/กดเล่นอัตโนมัติ */
function botAction(s) {
  const b = s.battle;
  if (!b || b.result) return null;
  const player = pById(s, b.order[b.idx]);
  if (!player) return null;
  const mine = aliveFighters(b, player.id);
  const enemies = aliveFighters(b).filter((f) => f.pid !== player.id);
  if (!mine.length || !enemies.length) return null;
  const ready = (f, sk) => (f.cds[sk.kind] || 0) === 0;
  const weakest = [...enemies].sort((a, c) => a.hp - c.hp)[0];
  const optionsOf = (f) => [BASIC_SKILL, ...cardSkills(cardOf(f)).filter((sk) => ready(f, sk))];

  // 1) ถ้ามีตัวเจ็บหนักและมีหมอพร้อม → ฮีล
  const hurt = [...mine].sort((a, c) => a.hp / a.maxHp - c.hp / c.maxHp)[0];
  if (hurt.hp < hurt.maxHp * 0.5) {
    for (const f of mine) {
      const healer = cardSkills(cardOf(f)).find((sk) => sk.kind === "heal" && ready(f, sk));
      if (healer)
        return { fighter: f.cid, skill: healer.kind, targetPid: player.id, target: hurt.cid };
    }
  }

  // 1.5) ทีมเริ่มเจ็บและยังมีตัวที่ตั้งป้อม/ตั้งการ์ดพร้อม → กันก่อน
  if (hurt.hp < hurt.maxHp * 0.75 && hurt.hp >= hurt.maxHp * 0.5) {
    for (const f of mine) {
      const ward = cardSkills(cardOf(f)).find(
        (sk) => (sk.kind === "fortify" || sk.kind === "guard") && ready(f, sk)
      );
      if (ward && ward.kind === "fortify")
        return { fighter: f.cid, skill: ward.kind };
    }
  }

  // 2) เลือกท่าที่ "คุ้ม" ที่สุด แล้วเล็งตัวที่เลือดน้อยสุด
  let best = null;
  let bestScore = -1;
  for (const f of mine) {
    for (const sk of optionsOf(f)) {
      let mult = sk.mult;
      if (sk.kind === "sweep") mult = 0.7 * Math.min(3, enemies.length);
      else if (sk.kind === "blade" || sk.kind === "flank") mult = 1.5;
      else if (sk.kind === "reaper") mult = 0.8 * Math.min(3, enemies.length);
      else if (sk.kind === "haki") mult = 0.9 * Math.min(3, enemies.length) + 0.3;
      else if (sk.kind === "fortify") mult = 0.55;
      else if (sk.kind === "rally" || sk.kind === "guard") mult = 0.35;
      if (sk.kind === "execute" && weakest.hp <= weakest.maxHp * 0.35) mult *= 2;
      if (sk.kind === "blade" && weakest.hp <= weakest.maxHp * 0.35) mult *= 1.5;
      let score = effAtk(f) * mult;
      if (sk.kind === "heal") score = 0.4 * effAtk(f); // ฮีลตอนเลือดยังเต็มไม่คุ้ม
      if (score > bestScore) {
        bestScore = score;
        best = { f, sk };
      }
    }
  }
  const chosen = best || { f: mine[0], sk: BASIC_SKILL };
  const { f, sk } = chosen;
  const id = skPayloadId(sk);
  if (sk.target === "all" || sk.kind === "sweep" || sk.kind === "reaper") return { fighter: f.cid, skill: id };
  if (sk.target === "enemy")
    return { fighter: f.cid, skill: id, targetPid: weakest.pid, target: weakest.cid };
  if (sk.target === "ally")
    return { fighter: f.cid, skill: id, targetPid: player.id, target: (hurt || f).cid };
  return { fighter: f.cid, skill: id };
}

/** เริ่มรอบใหม่: ดึงการ์ดใบถัดไป ถ้าหมดกองก็จบเกม */
function beginRound(s) {
  s.current = null;
  while (s.deck.length) {
    // ทุกคนได้การ์ดครบโควตาเท่ากันแล้ว — ไม่ต้องเปิดใบที่เหลือ
    if (perPlayerOf(s) > 0 && s.players.length && s.players.every((p) => atCardCap(s, p))) {
      pushLog(s, `🎯 ทุกคนได้การ์ดครบ ${perPlayerOf(s)} ใบเท่ากันแล้ว`);
      break;
    }
    const id = s.deck.shift();
    s.round += 1;
    s.highBid = 0;
    s.highBidder = null;
    const min = s.settings.startPrice;
    s.passed = s.players.filter((p) => p.money < min || atCardCap(s, p)).map((p) => p.id);
    for (const p of s.players) {
      if (!s.passed.includes(p.id)) continue;
      pushLog(
        s,
        atCardCap(s, p)
          ? `${p.name} ได้การ์ดครบ ${perPlayerOf(s)} ใบแล้ว — นั่งดูเพื่อนบิด`
          : `${p.name} ไม่มีเงินพอ — ผ่านอัตโนมัติ`
      );
    }
    if (activePlayers(s).length === 0) {
      s.discard.push(id);
      pushLog(s, `ไม่มีใครสู้ราคาได้ — ${CHAR_BY_ID[id].name} เข้ากองกลาง`);
      continue;
    }
    s.current = id;
    const startIdx = (s.round - 1) % s.players.length;
    let turn = null;
    for (let k = 0; k < s.players.length; k++) {
      const p = s.players[(startIdx + k) % s.players.length];
      if (isActive(s, p.id)) {
        turn = p.id;
        break;
      }
    }
    s.turn = turn;
    pushLog(
      s,
      `เปิดประมูล: ${CHAR_BY_ID[id].name} (PL ${CHAR_BY_ID[id].pl}) — เริ่มที่ ${turn ? pById(s, turn).name : "-"}`
    );      return true;
  }
  if (s.settings.battle) {
    pushLog(s, "🎴 ประมูลครบทุกใบแล้ว — ต่อไปคือด่านเอาการ์ดมาตีกัน!");
    startBattle(s);
  } else {
    endGame(s);
  }
  return false;
}

/** ปิดรอบ: ขายให้ผู้บิดสูงสุด หรือเข้ากองกลาง */
function settle(s) {
  const id = s.current;
  const active = activePlayers(s);
  if (active.length === 1 && s.highBidder) {
    const winner = pById(s, s.highBidder);
    winner.money -= s.highBid;
    winner.cards.push(id);
    pushLog(
      s,
      `✅ ${winner.name} ชนะประมูล ${CHAR_BY_ID[id].name} ที่ราคา ${s.highBid} (เหลือ ${winner.money})`
    );
  } else {
    s.discard.push(id);
    pushLog(s, `ไม่มีใครบิด — ${CHAR_BY_ID[id].name} เข้ากองกลาง`);
  }
  beginRound(s);
}

/** เรียกหลังทุกการเปลี่ยนแปลงในรอบ: จัดการ auto-pass, หมุนเทิร์น, หรือปิดรอบ */
function afterChange(s) {
  const min = minNextBid(s);
  for (const p of s.players) {
    if (!isActive(s, p.id)) continue;
    if (s.highBidder === p.id) continue;
    if (p.money < min) {
      s.passed.push(p.id);
      pushLog(s, `${p.name} ผ่าน (เงินไม่พอสู้)`);
    }
  }
  const active = activePlayers(s);
  if (active.length === 0) {
    settle(s);
    return;
  }
  if (active.length === 1) {
    if (s.highBidder) {
      settle(s);
      return;
    }
    s.turn = active[0].id; // ยังไม่มีคนบิด ให้คนสุดท้ายเลือกเอง
    return;
  }
  const idx = s.players.findIndex((p) => p.id === s.turn);
  for (let k = 1; k <= s.players.length; k++) {
    const p = s.players[(idx + k) % s.players.length];
    if (isActive(s, p.id)) {
      s.turn = p.id;
      return;
    }
  }
  settle(s);
}

function doPass(s, player) {
  if (!s.passed.includes(player.id)) s.passed.push(player.id);
  pushLog(s, `🙅 ${player.name} ผ่าน`);
  afterChange(s);
}

/** ข้ามอัตโนมัติถ้าผู้เล่นถึงเทิร์นแล้วไม่ตอบสนอง */
function tick(s) {
  // ด่านต่อสู้: คนที่หลุดถูกให้บอทเล่นแทนทันที เกมจะไม่ค้าง
  if (s.phase === "battle" && s.battle && !s.battle.result) {
    const pid = s.battle.order[s.battle.idx];
    const bp = pid ? pById(s, pid) : null;
    if (!bp) return false;
    if (Date.now() - (bp.lastSeen || 0) > STALE_MS) {
      const a = botAction(s);
      pushLog(s, `⏱️ ${bp.name} ไม่ตอบสนอง — บอทเล่นเทิร์นนี้ให้`);
      if (a) resolveFight(s, bp, a);
      else advanceBattle(s);
      return true;
    }
    return false;
  }
  if (s.phase !== "auction" || !s.turn || !s.current) return false;
  const p = pById(s, s.turn);
  if (!p) return false;
  if (Date.now() - (p.lastSeen || 0) > STALE_MS) {
    if (s.highBidder === p.id && s.highBid > 0) {
      // ผู้บิดสูงสุดหลุด — ปิดรอบให้เลย
      settle(s);
      pushLog(s, `⏱️ ${p.name} หลุดการเชื่อมต่อ — ปิดรอบ`);
      return true;
    }
    pushLog(s, `⏱️ ${p.name} ไม่ตอบสนอง ถูกข้ามอัตโนมัติ`);
    doPass(s, p);
    return true;
  }
  return false;
}

function doAction(s, player, action) {
  const type = action && action.type;
  const payload = (action && action.payload) || {};
  const hostOnly = player.id === s.hostId;

  switch (type) {
    case "settings": {
      if (!hostOnly) return { error: "เฉพาะเจ้าของห้อง" };
      if (s.phase !== "lobby") return { error: "แก้ไขได้เฉพาะตอนอยู่ในห้องรอ" };
      const st = s.settings;
      const sm = clampInt(payload.startingMoney, 20, 2000);
      const cc = clampInt(payload.cardCount, 3, ROSTER.length);
      const sp = clampInt(payload.startPrice, 1, 500);
      const mi = clampInt(payload.minIncrement, 1, 100);
      const cp = clampInt(payload.cardsPerPlayer, 0, 20);
      if (sm) st.startingMoney = sm;
      if (cc) st.cardCount = cc;
      if (sp) st.startPrice = sp;
      if (mi) st.minIncrement = mi;
      if (cp !== null) st.cardsPerPlayer = cp; // 0 = ปิดโควตา
      if (typeof payload.battle === "boolean") st.battle = payload.battle;
      s.players.forEach((p) => (p.money = st.startingMoney));
      return { data: { ok: true } };
    }
    case "start": {
      if (!hostOnly) return { error: "เฉพาะเจ้าของห้อง" };
      if (s.phase !== "lobby") return { error: "เกมเริ่มไปแล้ว" };
      if (s.players.length < 2) return { error: "ต้องมีผู้เล่นอย่างน้อย 2 คน" };
      s.players.forEach((p) => {
        p.cards = [];
        p.money = s.settings.startingMoney;
      });
      s.deck = shuffle(ROSTER.map((c) => c.id)).slice(0, deckSizeOf(s));
      s.discard = [];
      s.log = [];
      s.round = 0;
      s.current = null;
      s.highBid = 0;
      s.highBidder = null;
      s.passed = [];
      s.scores = null;
      s.battle = null;
      s.phase = "auction";
      pushLog(
        s,
        `🚩 เริ่มเกม! เงินเริ่มต้น ${s.settings.startingMoney} · ${s.deck.length} ตัวละคร · เปิดราคา ${s.settings.startPrice} ทบครั้งละ ${s.settings.minIncrement}`
      );
      if (perPlayerOf(s) > 0)
        pushLog(
          s,
          `⚖️ โควตาการ์ดต่อคน: ${perPlayerOf(s)} ใบเท่ากันทุกคน (รวม ${s.deck.length} ใบ)`
        );
      pushLog(
        s,
        s.settings.battle
          ? "⚔️ โหมดต่อสู้: เปิด — หลังประมูลครบทุกคนจะเอาการ์ดมาตีกันแบบเทิร์นเบส"
          : "โหมดต่อสู้: ปิด — จบเกมหลังประมูล"
      );
      beginRound(s);
      return { data: { ok: true } };
    }
    case "reset": {
      if (!hostOnly) return { error: "เฉพาะเจ้าของห้อง" };
      s.phase = "lobby";
      s.deck = [];
      s.discard = [];
      s.current = null;
      s.highBid = 0;
      s.highBidder = null;
      s.passed = [];
      s.turn = null;
      s.scores = null;
      s.battle = null;
      s.log = [];
      s.players.forEach((p) => {
        p.cards = [];
        p.money = s.settings.startingMoney;
      });
      pushLog(s, "↩️ กลับสู่ห้องรอ พร้อมเล่นใหม่");
      return { data: { ok: true } };
    }
    case "bid": {
      if (s.phase !== "auction") return { error: "ยังไม่ถึงช่วงประมูล" };
      if (s.turn !== player.id) return { error: "ยังไม่ถึงเทิร์นของคุณ" };
      const amount = Math.floor(Number(payload.amount));
      const min = minNextBid(s);
      if (!Number.isFinite(amount) || amount < min)
        return { error: `ต้องบิดอย่างน้อย ${min}` };
      if (amount > player.money) return { error: `เงินไม่พอ (มี ${player.money})` };
      s.highBid = amount;
      s.highBidder = player.id;
      pushLog(s, `💰 ${player.name} บิด ${amount}`);
      afterChange(s);
      return { data: { ok: true } };
    }
    case "pass": {
      if (s.phase !== "auction") return { error: "ยังไม่ถึงช่วงประมูล" };
      if (s.turn !== player.id) return { error: "ยังไม่ถึงเทิร์นของคุณ" };
      if (s.highBidder === player.id && s.highBid > 0)
        return { error: "คุณเป็นผู้บิดสูงสุดอยู่ ผ่านไม่ได้" };
      doPass(s, player);
      return { data: { ok: true } };
    }
    case "fight": {
      if (s.phase !== "battle") return { error: "ยังไม่ถึงช่วงต่อสู้การ์ด" };
      return resolveFight(s, player, payload);
    }
    case "autoplay": {
      if (s.phase !== "battle" || !s.battle || s.battle.result)
        return { error: "ยังไม่ถึงช่วงต่อสู้การ์ด" };
      if (s.battle.order[s.battle.idx] !== player.id) return { error: "ยังไม่ถึงเทิร์นของคุณ" };
      const auto = botAction(s);
      if (!auto) return { error: "ยังเล่นไม่ได้" };
      return resolveFight(s, player, auto);
    }
    case "kick": {
      if (!hostOnly) return { error: "เฉพาะเจ้าของห้อง" };
      if (s.phase !== "lobby") return { error: "เตะได้เฉพาะในห้องรอ" };
      const target = payload.playerId;
      if (target === s.hostId) return { error: "เตะตัวเองไม่ได้" };
      const before = s.players.length;
      s.players = s.players.filter((p) => p.id !== target);
      if (s.players.length === before) return { error: "ไม่พบผู้เล่นคนนี้" };
      pushLog(s, "ผู้เล่นถูกนำออกจากห้อง");
      return { data: { ok: true } };
    }
    case "ping":
      return { skip: true, data: { ok: true } };
    default:
      return { error: "ไม่รู้จักคำสั่งนี้" };
  }
}

/* --------------------------- public view --------------------------- */
function battlePublic(s) {
  const b = s.battle;
  if (!b) return null;
  const turnPid = !b.result && b.idx >= 0 ? b.order[b.idx] : null;
  return {
    basic: BASIC_SKILL,
    turn: turnPid,
    turnName: turnPid ? pById(s, turnPid).name : null,
    turns: b.turns,
    rounds: b.rounds || 0,
    maxTurns: b.maxTurns,
    result: b.result,
    fx: Array.isArray(b.fx) ? b.fx.slice(-6) : [],
    order: b.order.map((pid) => ({
      pid,
      name: pById(s, pid).name,
      kos: b.kos[pid] || 0,
      points: b.koPoints[pid] || 0,
      alive: aliveFighters(b, pid).length,
    })),
    fighters: b.fighters.map((f) => {
      const c = cardOf(f);
      const p = pById(s, f.pid);
      return {
        cid: f.cid,
        pid: f.pid,
        owner: p.name,
        name: c.name,
        img: c.img,
        group: c.group,
        pl: c.pl,
        hp: f.hp,
        maxHp: f.maxHp,
        atk: f.atk,
        effAtk: effAtk(f),
        alive: f.alive,
        shield: f.shield,
        buff: f.buff,
        stun: f.stun,
        burn: f.burn,
        burnDmg: f.burnDmg,
        cd: f.cds[c.skill.kind] || 0,
        passive: c.skill.passive || null,
        passiveUsed: !!f.passiveUsed,
        aura: c.aura || null,
        skills: cardSkills(c).map((sk) => ({ ...sk, cdLeft: f.cds[sk.kind] || 0 })),
        skill: {
          name: c.skill.name,
          label: c.skill.label,
          kind: c.skill.kind,
          desc: c.skill.desc,
          cd: c.skill.cd,
          target: c.skill.target,
          mult: c.skill.mult,
        },
      };
    }),
  };
}

function publicState(room, meId) {
  const s = room.state;
  return {
    version: room.version,
    phase: s.phase,
    hostId: s.hostId,
    settings: s.settings,
    round: s.round,
    remaining: s.deck.length,
    totalCards: deckSizeOf(s),
    current: s.current ? CHAR_BY_ID[s.current] : null,
    highBid: s.highBid,
    highBidder: s.highBidder,
    highBidderName: s.highBidder && pById(s, s.highBidder) ? pById(s, s.highBidder).name : null,
    turn: s.turn,
    turnName: s.turn && pById(s, s.turn) ? pById(s, s.turn).name : null,
    minNext: s.current ? minNextBid(s) : null,
    players: s.players.map((p) => ({
      id: p.id,
      name: p.name,
      money: p.money,
      isHost: p.id === s.hostId,
      online: Date.now() - (p.lastSeen || 0) < STALE_MS,
      passed: s.passed.includes(p.id),
      cards: p.cards.map((id) => cardBrief(CHAR_BY_ID[id])).filter(Boolean),
    })),
    discard: s.discard.map((id) => cardBrief(CHAR_BY_ID[id])).filter(Boolean),
    log: s.log.slice(-25),
    scores: s.scores,
    battle: battlePublic(s),
    me: meId ? { id: meId, isHost: meId === s.hostId } : null,
  };
}

/* --------------------------- ข้อมูลการ์ดสำหรับหน้าเว็บ ---------------------------
   อ่านอย่างเดียว (ไม่ต้องเข้าห้อง) ใช้ทำเมนู “ดูการ์ดทั้งหมด & เมต้า”
   แคชไว้ในหน่วยความจำ isolate เพราะ roster ไม่เปลี่ยนระหว่างรัน
-------------------------------------------------------------------------------- */
let CATALOG = null;
function cardCatalog() {
  if (CATALOG) return CATALOG;
  const seenAura = new Set();
  const auras = [];
  const kindLabels = {};
  for (const c of ROSTER) {
    for (const sk of c.skills) kindLabels[sk.kind] = sk.label;
    if (c.aura && !seenAura.has(c.aura.id)) {
      seenAura.add(c.aura.id);
      auras.push(c.aura);
    }
  }
  CATALOG = {
    count: ROSTER.length,
    groups: [...new Set(ROSTER.map((c) => c.group))],
    auras: auras.sort((a, b) => a.id.localeCompare(b.id)),
    kinds: kindLabels,
    tiers: ["S", "A", "B", "C"],
    cards: ROSTER.map((c) => ({
      id: c.id,
      name: c.name,
      group: c.group,
      pl: c.pl,
      effect: c.effect,
      img: c.img,
      aura: c.aura,
      tier: c.tier,
      meta: c.meta,
      bonus: c.bonus,
      passive: (c.skill && c.skill.passive) || null,
      skills: c.skills.map((s) => ({
        kind: s.kind, name: s.name, label: s.label, desc: s.desc,
        cd: s.cd, target: s.target, mult: s.mult,
      })),
    })),
  };
  return CATALOG;
}

function catalogResponse() {
  return new Response(JSON.stringify(cardCatalog()), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}

/* --------------------------- HTTP --------------------------- */
function newRoomState(name, settings) {
  const hostId = pid();
  const hostToken = token();
  const state = {
    hostId,
    settings,
    phase: "lobby",
    players: [
      {
        id: hostId,
        name,
        token: hostToken,
        money: settings.startingMoney,
        cards: [],
        lastSeen: Date.now(),
        joinedAt: Date.now(),
      },
    ],
    deck: [],
    discard: [],
    current: null,
    highBid: 0,
    highBidder: null,
    passed: [],
    turn: null,
    round: 0,
    log: [],
    scores: null,
    battle: null,
  };
  pushLog(state, `สร้างห้องแล้ว — รอผู้เล่นเข้าห้อง (${name} เป็นเจ้าของห้อง)`);
  return { hostId, hostToken, state };
}

async function handleApi(request, env, url) {
  const seg = url.pathname.split("/").filter(Boolean); // api / rooms / :code / :op

  if (seg[1] === "health") return J({ ok: true, cards: ROSTER.length });
  if (seg[1] === "cards") return catalogResponse();
  if (seg[1] !== "rooms") return ERR("ไม่รู้จักเส้นทางนี้", 404);

  // สร้างห้อง
  if (seg.length === 2) {
    const body = await readJson(request);
    if (!body) return ERR("ข้อมูลไม่ถูกต้อง");
    const name = cleanName(body.name) || "เจ้าของห้อง";
    const settings = normalizeSettings(body.settings);
    const { hostId, hostToken, state } = newRoomState(name, settings);
    for (let i = 0; i < 8; i++) {
      const code = roomCode();
      const exists = await env.DB.prepare("SELECT 1 FROM rooms WHERE code = ?").bind(code).first();
      if (exists) continue;
      await env.DB.prepare(
        "INSERT INTO rooms (code, host_id, state, version, created_at, updated_at) VALUES (?, ?, ?, 1, ?, ?)"
      )
        .bind(code, hostId, JSON.stringify(state), Date.now(), Date.now())
        .run();
      const room = { code, version: 1, state };
      return J({ code, playerId: hostId, token: hostToken, state: publicState(room, hostId) });
    }
    return ERR("สร้างรหัสห้องไม่ได้ ลองใหม่อีกครั้ง", 500);
  }

  const code = (seg[2] || "").toUpperCase();
  const op = seg[3];
  if (!/^[A-Z0-9]{4,8}$/.test(code)) return ERR("รหัสห้องไม่ถูกต้อง");

  if (op === "join") {
    const body = await readJson(request);
    if (!body) return ERR("ข้อมูลไม่ถูกต้อง");
    const name = cleanName(body.name) || "ผู้เล่น";
    const res = await mutate(env, code, (room) => {
      const s = room.state;
      if (s.phase !== "lobby")
        return { status: 409, error: "เกมเริ่มไปแล้ว — ขอให้เจ้าของห้องกด “เล่นใหม่”" };
      if (s.players.length >= MAX_PLAYERS) return { status: 409, error: `ห้องเต็ม (สูงสุด ${MAX_PLAYERS} คน)` };
      if (s.players.some((p) => p.name === name)) return { error: "มีชื่อนี้ในห้องแล้ว เปลี่ยนชื่อหน่อย" };
      const id = pid();
      const t = token();
      s.players.push({
        id,
        name,
        token: t,
        money: s.settings.startingMoney,
        cards: [],
        lastSeen: Date.now(),
        joinedAt: Date.now(),
      });
      pushLog(s, `👋 ${name} เข้าห้อง`);
      return { data: { playerId: id, token: t } };
    });
    if (res.error) return ERR(res.error, res.status);
    return J({
      code,
      playerId: res.data.playerId,
      token: res.data.token,
      state: publicState(res.room, res.data.playerId),
    });
  }

  if (op === "sync" || op === "action") {
    const body = await readJson(request);
    if (!body) return ERR("ข้อมูลไม่ถูกต้อง");
    const res = await mutate(env, code, (room) => {
      const s = room.state;
      const p = s.players.find((x) => x.id === body.playerId);
      if (!p) return { status: 401, error: "คุณไม่ได้อยู่ในห้องนี้แล้ว" };
      if (p.token !== body.token) return { status: 401, error: "เซสชันไม่ถูกต้อง" };
      const now = Date.now();
      const touched = now - (p.lastSeen || 0) > PING_MS;
      if (touched) p.lastSeen = now;
      if (op === "action") {
        const out = doAction(s, p, body.action);
        if (out.error) return out;
        return { data: out.data };
      }
      const changed = tick(s);
      if (changed) return { data: { ok: true } }; // เกมเปลี่ยนจริง → bump version
      if (touched) return { presence: true, data: { ok: true } };
      return { skip: true, data: { ok: true } };
    });
    if (res.error) return ERR(res.error, res.status);
    return J({ state: publicState(res.room, body.playerId) });
  }

  // ดูข้อมูลห้องแบบอ่านอย่างเดียว (ไม่ต้องมี token)
  if (op === "view") {
    const room = await readRoom(env, code);
    if (!room) return ERR("ไม่พบห้องนี้", 404);
    return J({ state: publicState(room, null) });
  }

  return ERR("ไม่รู้จักคำสั่งนี้", 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const isHealth = url.pathname === "/api/health";
      const isCards = url.pathname === "/api/cards"; // อ่านข้อมูลการ์ดได้โดยไม่ต้องเข้าห้อง
      if (request.method !== "POST" && !isHealth && !isCards)
        return ERR("method not allowed", 405);
      if (request.method === "POST" && !sameOrigin(request))
        return ERR("คำขอมาจากต้นทางอื่น", 403);
      try {
        await ensureSchema(env);
        return await handleApi(request, env, url);
      } catch (e) {
        return ERR("เซิร์ฟเวอร์ผิดพลาด: " + (e && e.message ? e.message : e), 500);
      }
    }

    if (!env.ASSETS) return new Response("Not found", { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
