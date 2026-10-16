/* เทสต์เมนู “ดูการ์ดทั้งหมด & เมต้า”: API /api/cards + สูตรคะแนนเมต้า/tier
   วิ่งผ่าน HTTP จริง (ต้องเปิด dev server อยู่ที่ BASE) */
const BASE = process.env.BASE || "http://127.0.0.1:8787";

let fails = 0, skips = 0;
const ok = (cond, msg) => {
  if (cond) console.log("  ✅ " + msg);
  else { console.log("  ❌ " + msg); fails++; }
};
const skip = (msg) => { console.log("  ℹ️  ข้าม: " + msg); skips++; };

// สูตรที่ประกาศไว้ในหน้าเว็บ (ต้องตรงกับ scripts/build_site_app.py)
const BONUS = {
  haki: 6, reaper: 5, sweep: 4, blade: 4, flank: 4,
  execute: 3, heavy: 3, snipe: 3, burn: 3, stun: 3,
  drain: 2, heal: 2, rally: 2, guard: 2, fortify: 2, strike: 1,
};
const KINDS = Object.keys(BONUS);
const DEF = new Set(["guard", "fortify", "heal", "rally"]);
const OFF = new Set(KINDS.filter((k) => !DEF.has(k)));
const FX_SHAPES = new Set(["lightning", "ice", "flame", "spark", "dark", "ring"]);
const HEX = /^#[0-9a-f]{6}$/i;

async function get(path) {
  const r = await fetch(BASE + path, { signal: AbortSignal.timeout(10000) });
  let d = null;
  try { d = await r.json(); } catch { /* ignore */ }
  return { status: r.status, d, headers: r.headers };
}

async function main() {
  console.log("\n— GET /api/cards (อ่านข้อมูลการ์ดได้โดยไม่ต้องเข้าห้อง) —");
  const res = await get("/api/cards");
  ok(res.status === 200, `เรียก /api/cards ได้ (${res.status})`);
  const d = res.d || {};
  ok(Array.isArray(d.cards) && d.cards.length === 74, `ส่งการ์ดมาครบ 74 ใบ (${(d.cards || []).length})`);
  ok(d.count === 74, "มีจำนวนการ์ดรวม (count)");
  ok(Array.isArray(d.groups) && d.groups.length === 13, `มีรายชื่อกลุ่มสำหรับตัวกรอง ${d.groups.length} กลุ่ม`);
  ok(Array.isArray(d.auras) && d.auras.length >= 30, `มีรายชื่อออร่าสำหรับตัวกรอง ${d.auras.length} แบบ`);
  ok(Array.isArray(d.tiers) && d.tiers.join("") === "SABC", `มีลำดับ tier ให้เรียง (${(d.tiers || []).join("/")})`);
  ok((res.headers.get("cache-control") || "").includes("max-age"), "ตั้ง cache ให้หน้าเว็บดึงซ้ำได้เร็ว");
  const groupsOfCards = [...new Set(d.cards.map((c) => c.group))];
  ok(groupsOfCards.every((g) => d.groups.includes(g)) && groupsOfCards.length === d.groups.length,
    "รายชื่อกลุ่มตรงกับกลุ่มที่มีจริงในการ์ด");
  const auraIds = [...new Set(d.cards.map((c) => c.aura && c.aura.id).filter(Boolean))];
  ok(auraIds.length === d.auras.length && auraIds.every((id) => d.auras.some((a) => a.id === id)),
    "รายชื่อออร่าตรงกับออร่าที่ใช้จริง");

  console.log("\n— ข้อมูลต่อใบ (ใช้โชว์ในหน้าเว็บ) —");
  const badFields = d.cards.filter(
    (c) => !(c.id && c.name && c.group && c.effect && c.img && c.aura && c.tier && typeof c.meta === "number" && Array.isArray(c.skills))
  );
  ok(badFields.length === 0, `ทุกใบมีข้อมูลครบ (ผิด ${badFields.length} ใบ)`);
  ok(d.cards.every((c) => FX_SHAPES.has(c.aura.fx) && HEX.test(c.aura.c1) && HEX.test(c.aura.c2) && c.aura.th),
    "ออร่าทุกแบบมีรูปแบบเอฟเฟค + สี 2 สี + ชื่อไทย");
  ok(d.cards.every((c) => c.skills.length >= 2 && new Set(c.skills.map((s) => s.kind)).size === c.skills.length),
    "ทุกใบมีสกิลอย่างน้อย 2 ท่า และไม่มีชนิดซ้ำ");
  ok(d.cards.every((c) => c.skills.every((s) => s.name && s.label && s.desc && KINDS.includes(s.kind) && typeof s.cd === "number" && s.target)),
    "สกิลทุกท่ารู้จักชนิด มีชื่อ/คำอธิบาย/คูลดาวน์/เป้าหมาย");
  ok(d.cards.every((c) => c.skills.some((s) => OFF.has(s.kind))), "ทุกใบมีสกิลสายรุก");
  ok(d.cards.every((c) => c.skills.some((s) => DEF.has(s.kind))), "ทุกใบมีสกิลสายรับ (เกราะ/ป้อม/ฮีล/ปลุกใจ)");
  ok(Object.keys(d.kinds).length === 16 && KINDS.every((k) => d.kinds[k]),
    `มีตารางชื่อไทยของสกิลทุกชนิด (${Object.keys(d.kinds).length} ชนิด)`);

  console.log("\n— สูตรคะแนนเมต้า + tier —");
  const badMeta = d.cards.filter((c) => {
    const bonus = Math.max(...c.skills.map((s) => BONUS[s.kind]));
    const want = c.pl + bonus;
    const tier = want >= 100 ? "S" : want >= 92 ? "A" : want >= 84 ? "B" : "C";
    return c.bonus !== bonus || c.meta !== want || c.tier !== tier;
  });
  ok(badMeta.length === 0,
    `คะแนนเมต้า = PL + โบนัสสกิลที่แรงสุด และ tier ถูกต้อง (ผิด ${badMeta.length} ใบ${badMeta.length ? ": " + badMeta.slice(0, 2).map((c) => c.name).join(", ") : ""})`);
  const tiers = d.cards.reduce((a, c) => { a[c.tier] = (a[c.tier] || 0) + 1; return a; }, {});
  ok(tiers.S > 0 && tiers.A > 0 && tiers.B > 0 && tiers.C > 0,
    `มีทั้ง 4 tier (S ${tiers.S} · A ${tiers.A} · B ${tiers.B} · C ${tiers.C})`);
  const byName = Object.fromEntries(d.cards.map((c) => [c.name, c]));
  const spot = [["Gol D. Roger", "S"], ["Monkey D. Luffy", "S"], ["Kuzan (Aokiji)", "A"], ["Buggy", "C"]];
  let checked = 0;
  for (const [name, tier] of spot) {
    const c = byName[name];
    if (!c) continue;
    checked++;
    ok(c.tier === tier, `${name} = tier ${c.tier} (เมต้า ${c.meta})`);
  }
  if (!checked) skip("ไม่พบการ์ดตัวอย่างในแคตตาล็อก");
  const top = [...d.cards].sort((a, b) => b.meta - a.meta).slice(0, 5).map((c) => c.name);
  ok(top.length === 5 && d.cards.every((c) => c.meta <= byName[top[0]].meta) && byName[top[0]].tier === "S",
    `การ์ดเมต้าสูงสุด 5 อันดับ: ${top.join(", ")}`);
  const oldest = [...d.cards].sort((a, b) => a.meta - b.meta)[0];
  ok(oldest.tier === "C" && oldest.meta < 92, `การ์ดเมต้าต่ำสุด (${oldest.name} ${oldest.meta}) อยู่ tier C`);

  console.log("\n— ออร่าเกรดพิเศษตามตัวละคร —");
  const haki = d.cards.filter((c) => c.aura.id === "haki");
  ok(haki.length >= 10, `มีการ์ดสายฮาคิราชันย์ ${haki.length} ใบ`);
  ok(haki.every((c) => c.aura.fx === "lightning" && c.aura.c1.toLowerCase() === "#ff2233"),
    "สายฮาคิทุกใบ = กรอบแดง #ff2233 + เอฟเฟคสายฟ้า");
  ok(haki.every((c) => c.skills.some((s) => s.kind === "haki")), "สายฮาคิทุกใบมีสกิลฮาคิราชันย์");
  const kuzan = byName["Kuzan (Aokiji)"];
  ok(!kuzan || (kuzan.aura.id === "ice" && kuzan.aura.fx === "ice"), "Kuzan = ออร่าน้ำแข็ง (เกล็ดน้ำแข็ง)");
  const iceCards = d.cards.filter((c) => c.aura.id === "ice");
  ok(iceCards.length >= 1 && iceCards.every((c) => c.aura.fx === "ice"), `การ์ดออร่าน้ำแข็ง ${iceCards.length} ใบใช้เอฟเฟคเกล็ดน้ำแข็ง`);

  console.log("\n" + (fails === 0 ? `🎉 ผ่านทั้งหมด${skips ? ` (ข้าม ${skips} ข้อ)` : ""}` : `❌ ล้มเหลว ${fails} ข้อ`));
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((e) => { console.error("เทสต์พัง:", e); process.exit(1); });
