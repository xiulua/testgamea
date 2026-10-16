#!/usr/bin/env python3
"""สร้างไฟล์สำหรับเว็บออนไลน์ (โฟลเดอร์ site/) จาก data/characters.json

รวมการสร้าง "สกิลต่อสู้" ของการ์ดทุกใบ (ชื่อสกิลมาจากความสามารถของตัวละครเอง)
การ์ดทุกใบมี 3 สกิล: สกิลประจำตัว + สกิลโจมตี/ป้องกันที่เข้ากับตัวละครนั้น
และมี "ออร่า" ประจำตัว (ฮาคิราชันย์ = กรอบแดง-สายฟ้าดำ, น้ำแข็ง = กรอบฟ้า ฯลฯ)
ที่ไคลเอนต์ใช้วาดกรอบการ์ด + เอฟเฟคตอนตี
"""
import json
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data", "characters.json")
WORKER_DIR = os.path.join(ROOT, "site", "worker")
PUBLIC = os.path.join(ROOT, "site", "public")
IMG_DST = os.path.join(PUBLIC, "images")
COMPAT_DATE = "2025-01-01"

# ------------------------------------------------------------------
# สกิลต่อสู้: ชนิดสกิล (mechanics) — mult = ตัวคูณพลังโจมตี, cd = เทิร์นพัก
# ------------------------------------------------------------------
KINDS = {
    "strike":  {"th": "โจมตี",     "mult": 1.0, "cd": 0, "target": "enemy",
                "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์"},
    "snipe":   {"th": "เล็งธนู",   "mult": 1.1, "cd": 2, "target": "enemy",
                "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น"},
    "heavy":   {"th": "ท่าไม้ตาย", "mult": 1.8, "cd": 2, "target": "enemy",
                "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น"},
    "execute": {"th": "ประหาร",    "mult": 1.2, "cd": 3, "target": "enemy",
                "desc": "ดาเมจ 120% · ดาเมจ x2 ถ้าเป้าหมาย HP ≤ 35% · พัก 3 เทิร์น"},
    "drain":   {"th": "ดูดพลัง",   "mult": 1.0, "cd": 2, "target": "enemy",
                "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น"},
    "burn":    {"th": "เผาไหม้",   "mult": 0.5, "cd": 3, "target": "enemy",
                "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น"},
    "stun":    {"th": "สะกด",      "mult": 0.5, "cd": 3, "target": "enemy",
                "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น"},
    "sweep":   {"th": "กวาดล้าง",  "mult": 0.7, "cd": 3, "target": "all",
                "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น"},
    "heal":    {"th": "ฮีล",       "mult": 1.4, "cd": 2, "target": "ally",
                "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น"},
    "rally":   {"th": "ปลุกใจ",    "mult": 0.0, "cd": 3, "target": "self",
                "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น"},
    "guard":   {"th": "ตั้งการ์ด", "mult": 0.0, "cd": 3, "target": "ally",
                "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น"},
    "blade":   {"th": "สิ่งคม",    "mult": 1.0, "cd": 2, "target": "enemy",
                "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น"},
    "reaper":  {"th": "เก็บเกี่ยว",  "mult": 0.8, "cd": 3, "target": "all",
                "desc": "ดาเมจ 80% ใส่ศัตรูทุกคน · พัก 3 เทิร์น"},
    "flank":   {"th": "กัดรอบ",    "mult": 1.2, "cd": 2, "target": "enemy",
                "desc": "ดาเมจ 120% โดนกัดรอบ + สะกด 1 เทิร์น · พัก 2 เทิร์น"},
    # ---- สกิลเฉพาะทาง: ฮาคิราชันย์ (สายฮาคิ) และป้อมปราการ (สายป้องกัน) ----
    "haki":    {"th": "ฮาคิราชันย์", "mult": 0.9, "cd": 4, "target": "all",
                "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น"},
    "fortify": {"th": "ป้อมปราการ", "mult": 0.0, "cd": 4, "target": "self",
                "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น"},
}

# ------------------------------------------------------------------
# ออร่าประจำตัว: id -> (ชื่อไทย, รูปแบบเอฟเฟค, สีกรอบ, สีเงา)
# fx ใช้ 6 แบบเท่านั้น: lightning / ice / flame / spark / dark / ring
# ------------------------------------------------------------------
AURAS = {
    "haki":     ("ฮาคิราชันย์", "lightning", "#ff2233", "#12060c"),
    "ice":      ("ฮิเอะ ฮิเอะ น้ำแข็ง", "ice", "#8fe9ff", "#0a3550"),
    "magma":    ("มากุ มากุ ลาวา", "flame", "#ff5a1f", "#3a0d05"),
    "fire":     ("เพลิง", "flame", "#ff8a2b", "#4a1405"),
    "light":    ("ปิกะ ปิกะ แสง", "spark", "#ffe66b", "#4a3a00"),
    "thunder":  ("สายฟ้า", "lightning", "#7fd6ff", "#0b2740"),
    "dark":     ("ยามิ ยามิ ความมืด", "dark", "#a06bff", "#0b0514"),
    "shadow":   ("คาเงะ คาเงะ เงา", "dark", "#7c5cff", "#07060f"),
    "gravity":  ("ซุซุ ซุซุ แรงโน้มถ่วง", "spark", "#c3a6ff", "#1b1430"),
    "plant":    ("โมริ โมริ ป่า", "ring", "#5ce07a", "#0c2a14"),
    "poison":   ("พิษ", "ring", "#b6ff4d", "#1b2b06"),
    "candy":    ("เพโร เพโร ลูกกวาด", "ring", "#ff9ad5", "#3a1030"),
    "steel":    ("เหล็กกล้า", "spark", "#c8d3e0", "#1d2733"),
    "diamond":  ("ไดมอนด์ เพชร", "ice", "#bfe9ff", "#16344a"),
    "sand":     ("ซูนะ ซูนะ ทราย", "ring", "#e0c07a", "#3a2a10"),
    "smoke":    ("โมโม่ ควัน", "dark", "#cfd8e3", "#232a33"),
    "sound":    ("โอโตะ โอโตะ เสียง", "spark", "#7fd6ff", "#122a3a"),
    "beast":    ("อสูรกาย", "flame", "#e06b3a", "#2a1206"),
    "blade":    ("คมดาบ", "spark", "#dfe9f5", "#20293a"),
    "bullet":   ("กระสุน", "spark", "#ffd27f", "#33260a"),
    "soul":     ("โซล โซล วิญญาณ", "dark", "#c58cff", "#160a2a"),
    "ghost":    ("โยมิ โยมิ วิญญาณ", "dark", "#9ad7ff", "#0a1a2a"),
    "weather":  ("สภาพอากาศ", "spark", "#9be6ff", "#0d2a3a"),
    "phoenix":  ("ฟีนิกซ์", "flame", "#6bd8ff", "#062a3a"),
    "hormone":  ("ฮอร์โมน", "ring", "#ff8ac1", "#33122a"),
    "paw":      ("นิคิว อุ้งเท้า", "ring", "#f0b7d8", "#331428"),
    "castle":   ("ปราสาทคนแคระ", "ring", "#b9c6d6", "#1a2230"),
    "tarot":    ("วาระห์ ดูดวง", "spark", "#ffb0d0", "#2a0f1c"),
    "time":     ("โทชิ โทชิ เวลา", "ring", "#c9a6ff", "#1d1233"),
    "liquid":   ("ชิบู ชิบู ของเหลว", "ring", "#a8f0d8", "#0d2a24"),
    "water":    ("อัศวินท้องทะเล", "ring", "#7fd0ff", "#0b2436"),
    "karma":    ("คามะบากะ กรรม", "spark", "#ffd9a0", "#2a1c08"),
    "laser":    ("เทคโนโลยี", "spark", "#8fe3ff", "#10242e"),
    "flower":   ("โพเนกลีฟ", "ring", "#ffc0e0", "#33152a"),
    "cloth":    ("ฟูกุ ฟูกุ เสื้อผ้า", "ring", "#ffe1a8", "#2f2410"),
    "biscuit":  ("บิสกิต บิสกิต", "ring", "#f0d9a8", "#2e2410"),
    "rumble":   ("รัมเบิ้ลบอล", "ring", "#ffa8c0", "#33111e"),
    "magnet":   ("จิกิ จิกิ แม่เหล็ก", "spark", "#c8c8ff", "#171733"),
    "holy":     ("พุทธะทองคำ", "ring", "#ffe08a", "#2f2408"),
}

# ---- ออร่าของการ์ดแต่ละใบ (ตามความสามารถ/ธาตุของตัวละคร) ----
CARD_AURA = {
    "roger": "haki", "whitebeard": "haki", "kaido": "haki", "garp": "haki",
    "shanks": "haki", "luffy": "haki", "bigmom": "haki", "blackbeard": "dark",
    "sakazuki": "magma", "sengoku": "holy", "kuzan": "ice", "mihawk": "blade",
    "borsalino": "light", "oden": "haki", "rayleigh": "haki", "issho": "gravity",
    "aramaki": "plant", "zoro": "haki", "katakuri": "haki", "yamato": "haki",
    "sabo": "fire", "beckman": "bullet", "sanji": "fire", "marco": "phoenix",
    "king": "fire", "ace": "fire", "law": "ice", "doflamingo": "haki",
    "hancock": "haki", "kuma": "paw", "jimbei": "water", "kid": "magnet",
    "weevil": "steel", "jozu": "diamond", "queen": "poison", "lucci": "beast",
    "smoothie": "liquid", "jack": "beast", "crocodile": "sand", "vista": "blade",
    "ivankov": "hormone", "yasopp": "bullet", "cracker": "biscuit", "killer": "blade",
    "drake": "beast", "vergo": "steel", "nekomamushi": "beast", "inuarashi": "beast",
    "luckyroux": "bullet", "hawkins": "tarot", "bege": "castle", "apoo": "sound",
    "urouge": "karma", "smoker": "smoke", "denjiro": "blade", "perospero": "candy",
    "bonney": "time", "kaku": "beast", "moria": "shadow", "kikunojo": "blade",
    "reiju": "poison", "ichiji": "fire", "niji": "thunder", "yonji": "steel",
    "kinemon": "cloth", "franky": "laser", "brook": "ghost", "robin": "flower",
    "momonosuke": "beast", "chopper": "rumble", "tashigi": "blade", "buggy": "blade",
    "usopp": "bullet", "nami": "weather",
}

# ------------------------------------------------------------------
# คะแนนเมต้า (ใช้จัดอันดับการ์ดให้หน้า "ดูการ์ด & เมต้า")
# meta = PL + โบนัสจากสกิลที่แรงที่สุดของใบนั้น · tier: S ≥ 100, A ≥ 92, B ≥ 84
# ------------------------------------------------------------------
SKILL_BONUS = {
    "haki": 6, "reaper": 5, "sweep": 4, "blade": 4, "flank": 4,
    "execute": 3, "heavy": 3, "snipe": 3, "burn": 3, "stun": 3,
    "drain": 2, "heal": 2, "rally": 2, "guard": 2, "fortify": 2, "strike": 1,
}
TIER_CUTS = (("S", 100), ("A", 92), ("B", 84))


def meta_of(pl, skills):
    bonus = max(SKILL_BONUS[s["kind"]] for s in skills)
    meta = pl + bonus
    tier = "C"
    for name, cut in TIER_CUTS:
        if meta >= cut:
            tier = name
            break
    return meta, tier, bonus


PASSIVES = {
    "sturdy": {"th": "กายาเหล็ก", "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"},
    "revive": {"th": "ไม่ยอมตาย", "desc": "เมื่อถูกทำให้หมดสติ ฟื้นกลับมาด้วย HP 30% ได้ 1 ครั้ง"},
    "brave":  {"th": "ใจสิงห์",   "desc": "พลังโจมตี +25% เมื่อ HP เหลือไม่ถึง 40%"},
}

# สกิลประจำตัวของการ์ดแต่ละใบ (ชื่อสกิลดึงจากความสามารถใน characters.json)
CARD_SKILL = {
    "roger": "execute", "whitebeard": "sweep", "kaido": "guard", "garp": "rally",
    "shanks": "rally", "luffy": "blade", "bigmom": "sweep", "blackbeard": "drain",
    "sakazuki": "burn", "sengoku": "rally", "kuzan": "stun", "mihawk": "snipe",
    "borsalino": "snipe", "oden": "heavy", "rayleigh": "rally", "issho": "sweep",
    "aramaki": "heal", "zoro": "flank", "katakuri": "guard", "yamato": "heavy",
    "sabo": "burn", "beckman": "strike", "sanji": "reaper", "marco": "heal",
    "king": "guard", "ace": "burn", "law": "stun", "doflamingo": "stun",
    "hancock": "stun", "kuma": "sweep", "jimbei": "guard", "kid": "heavy",
    "weevil": "heavy", "jozu": "guard", "queen": "burn", "lucci": "execute",
    "smoothie": "drain", "jack": "heavy", "crocodile": "drain", "vista": "heavy",
    "ivankov": "heal", "yasopp": "snipe", "cracker": "heavy", "killer": "snipe",
    "drake": "heavy", "vergo": "strike", "nekomamushi": "strike", "inuarashi": "strike",
    "luckyroux": "snipe", "hawkins": "guard", "bege": "snipe", "apoo": "sweep",
    "urouge": "heavy", "smoker": "stun", "denjiro": "strike", "perospero": "guard",
    "bonney": "heal", "kaku": "strike", "moria": "drain", "kikunojo": "strike",
    "reiju": "drain", "ichiji": "strike", "niji": "snipe", "yonji": "strike",
    "kinemon": "guard", "franky": "heavy", "brook": "heal", "robin": "heal",
    "momonosuke": "strike", "chopper": "heal", "tashigi": "strike", "buggy": "drain",
    "usopp": "stun", "nami": "drain",
}

# สกิลเสริม 2 ท่า: ให้แต่ละตัวมีทั้งทางรุกและทางรับ (หรือทางรับ 2 แบบ)
# กติกา: ห้ามซ้ำชนิดกับสกิลอื่นของใบเดียวกัน
CARD_EXTRA = {
    "roger": ["haki", "rally"],           # ราชาโจรสลัด: ฮาคิ + ปลุกใจกองเรือ
    "whitebeard": ["haki", "fortify"],    # สั่นสะเทือน + ยืนหยัด
    "kaido": ["haki", "heavy"],           # ฮาคิ + กระบองสายฟ้า
    "garp": ["haki", "heavy"],            # หมัดฮาคิ
    "shanks": ["haki", "snipe"],          # ฮาคิ + ข่มด้วยดาบ
    "luffy": ["haki", "rally"],           # ฮาคิราชันย์ + ปลุกใจลูกเรือ
    "bigmom": ["haki", "heal"],           # ฮาคิ + ดูดวิญญาณมาเติม HP
    "blackbeard": ["execute", "fortify"], # ความมืดกลืนทุกอย่าง
    "sakazuki": ["heavy", "fortify"],
    "sengoku": ["guard", "heavy"],
    "kuzan": ["fortify", "sweep"],        # Ice Age
    "mihawk": ["execute", "guard"],
    "borsalino": ["sweep", "rally"],      # ยาสาคานิโนะมากาโตะ
    "oden": ["haki", "guard"],
    "rayleigh": ["haki", "snipe"],
    "issho": ["stun", "guard"],           # กดแรงโน้มถ่วง
    "aramaki": ["drain", "fortify"],
    "zoro": ["haki", "guard"],            # ราชาสามดาบ + ฮาคิ
    "katakuri": ["haki", "stun"],
    "yamato": ["haki", "fortify"],
    "sabo": ["heavy", "guard"],
    "beckman": ["snipe", "guard"],
    "sanji": ["burn", "rally"],           # Ifrit Jambe
    "marco": ["rally", "strike"],
    "king": ["heavy", "fortify"],
    "ace": ["sweep", "rally"],
    "law": ["drain", "fortify"],
    "doflamingo": ["haki", "guard"],      # ฮาคิ + กางเส้นด้ายอิโตะเป็นเกราะ
    "hancock": ["haki", "rally"],          # ฮาคิ + เสน่ห์ที่ปลุกใจพวกพ้อง
    "kuma": ["guard", "strike"],
    "jimbei": ["heavy", "heal"],
    "kid": ["guard", "sweep"],
    "weevil": ["guard", "strike"],
    "jozu": ["fortify", "heavy"],
    "queen": ["guard", "drain"],
    "lucci": ["strike", "guard"],
    "smoothie": ["heal", "strike"],
    "jack": ["strike", "fortify"],
    "crocodile": ["sweep", "guard"],
    "vista": ["snipe", "guard"],
    "ivankov": ["rally", "strike"],
    "yasopp": ["guard", "execute"],
    "cracker": ["guard", "sweep"],
    "killer": ["blade", "guard"],
    "drake": ["strike", "guard"],
    "vergo": ["guard", "heavy"],
    "nekomamushi": ["snipe", "guard"],
    "inuarashi": ["snipe", "guard"],
    "luckyroux": ["strike", "rally"],
    "hawkins": ["fortify", "burn"],       # คำสาป
    "bege": ["guard", "sweep"],
    "apoo": ["stun", "guard"],            # ระเบิดเสียง
    "urouge": ["fortify", "strike"],
    "smoker": ["guard", "strike"],
    "denjiro": ["blade", "guard"],
    "perospero": ["stun", "heavy"],
    "bonney": ["drain", "rally"],
    "kaku": ["heavy", "guard"],
    "moria": ["sweep", "guard"],
    "kikunojo": ["blade", "heal"],
    "reiju": ["burn", "heal"],            # พิษ
    "ichiji": ["burn", "guard"],
    "niji": ["stun", "guard"],            # ไฟฟ้า
    "yonji": ["guard", "heavy"],
    "kinemon": ["blade", "rally"],
    "franky": ["snipe", "guard"],         # เรดีคัลบีม
    "brook": ["blade", "stun"],           # ดาบน้ำแข็ง
    "robin": ["stun", "guard"],
    "momonosuke": ["burn", "rally"],
    "chopper": ["rally", "heavy"],        # มอนสเตอร์พอยท์
    "tashigi": ["blade", "guard"],
    "buggy": ["strike", "guard"],
    "usopp": ["snipe", "guard"],
    "nami": ["stun", "heal"],             # สายฟ้าจาก clima tact
}

CARD_PASSIVE = {
    "roger": "brave", "kaido": "sturdy", "marco": "revive", "jozu": "sturdy",
    "king": "sturdy", "brook": "revive", "urouge": "brave", "luffy": "brave",
    "hawkins": "sturdy", "whitebeard": "sturdy",
}


def skill_name(card):
    """ชื่อสกิล = ชื่อความสามารถที่อยู่ในเครื่องหมายคำพูดของการ์ด"""
    m = re.search(r'"([^"]+)"', card.get("effect", ""))
    return m.group(1) if m else card["name"]


def build_skills(card):
    """สกิลทั้งหมดของใบนี้ (สกิลประจำตัวก่อน แล้วตามด้วยสกิลเสริม)"""
    kinds = []
    for k in [CARD_SKILL[card["id"]]] + list(CARD_EXTRA[card["id"]]):
        if k not in kinds:
            kinds.append(k)
    aura_id = CARD_AURA[card["id"]]
    out = []
    for i, kind in enumerate(kinds):
        k = KINDS[kind]
        if i == 0:
            name = skill_name(card)
        else:
            name = k["th"]
        out.append({
            "kind": kind,
            "name": name,
            "label": k["th"],
            "desc": k["desc"],
            "mult": k["mult"],
            "cd": k["cd"],
            "target": k["target"],
            "aura": aura_id,
            "basic": False,
        })
    pk = CARD_PASSIVE.get(card["id"])
    if pk:
        out[0]["passive"] = {"kind": pk, "name": PASSIVES[pk]["th"], "desc": PASSIVES[pk]["desc"]}
    return out


def build_aura(card):
    a = AURAS[CARD_AURA[card["id"]]]
    return {"id": CARD_AURA[card["id"]], "th": a[0], "fx": a[1], "c1": a[2], "c2": a[3]}


os.makedirs(WORKER_DIR, exist_ok=True)
os.makedirs(IMG_DST, exist_ok=True)

with open(SRC, encoding="utf-8") as f:
    chars = json.load(f)

ids = [c["id"] for c in chars]
for name, table in (("CARD_SKILL", CARD_SKILL), ("CARD_AURA", CARD_AURA), ("CARD_EXTRA", CARD_EXTRA)):
    missing = [i for i in ids if i not in table]
    if missing:
        raise SystemExit("%s ยังขาดการ์ด: %s" % (name, ", ".join(missing)))

# ---- roster.js (แหล่งข้อมูลเดียวสำหรับ Worker) ----
KEEP = ("id", "name", "group", "pl", "effect", "img")
roster = []
for c in chars:
    row = {k: c[k] for k in KEEP if k in c}
    row["aura"] = build_aura(c)
    skills = build_skills(c)
    row["skill"] = skills[0]          # สกิลประจำตัว (การ์ดเก่า/เทสต์ยังใช้ช่องนี้)
    row["skills"] = skills            # ทุกสกิลที่การ์ดนี้ใช้ได้
    meta, tier, bonus = meta_of(c["pl"], skills)
    row["meta"] = meta                # คะแนนเมต้า = PL + โบนัสสกิลที่แรงสุด
    row["tier"] = tier                # S/A/B/C ใช้โชว์ป้ายในการ์ด
    row["bonus"] = bonus
    roster.append(row)

js = "// ⚠️ สร้างอัตโนมัติจาก data/characters.json — อย่าแก้มือ\n"
js += "export const ROSTER = " + json.dumps(roster, ensure_ascii=False, indent=1) + ";\n"
with open(os.path.join(WORKER_DIR, "roster.js"), "w", encoding="utf-8") as f:
    f.write(js)

# ---- คัดลอกรูปเข้า public/images ----
copied = 0
for c in chars:
    if not c.get("img"):
        continue
    src = os.path.join(ROOT, c["img"])
    dst = os.path.join(IMG_DST, os.path.basename(c["img"]))
    if not os.path.exists(src):
        raise SystemExit("ไม่พบรูป: " + src)
    if not os.path.exists(dst) or os.path.getmtime(src) > os.path.getmtime(dst):
        shutil.copy2(src, dst)
        copied += 1

# ---- deploy manifest ----
manifest = {
    "entrypoint": "index.js",
    "compatibilityDate": COMPAT_DATE,
    "modules": [
        {"name": "index.js", "type": "esm", "path": "./worker/index.js"},
        {"name": "roster.js", "type": "esm", "path": "./worker/roster.js"},
    ],
    "assetsDirectory": "./public",
}
with open(os.path.join(ROOT, "site", "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

total = 0
for base, _dirs, files in os.walk(PUBLIC):
    for fn in files:
        total += os.path.getsize(os.path.join(base, fn))

kinds_used = sorted({s["kind"] for c in chars for s in build_skills(c)})
auras_used = sorted({CARD_AURA[i] for i in ids})
skills_total = sum(len(build_skills(c)) for c in chars)
tiers = {t: sum(1 for r in roster if r["tier"] == t) for t in ("S", "A", "B", "C")}
print(
    "roster.js: %d ตัว · สกิลรวม %d ท่า (%d ชนิด: %s) · ออร่า %d แบบ · "
    "เมต้า S/A/B/C = %d/%d/%d/%d · คัดลอกรูปใหม่ %d ใบ · public รวม %.2f MB · compat %s"
    % (len(roster), skills_total, len(kinds_used), ",".join(kinds_used),
       len(auras_used), tiers["S"], tiers["A"], tiers["B"], tiers["C"],
       copied, total / 1048576, COMPAT_DATE)
)
