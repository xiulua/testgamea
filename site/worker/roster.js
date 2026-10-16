// ⚠️ สร้างอัตโนมัติจาก data/characters.json — อย่าแก้มือ
export const ROSTER = [
 {
  "id": "roger",
  "name": "Gol D. Roger",
  "group": "ตำนานยุคทอง",
  "pl": 100,
  "effect": "\"ราชาโจรสลัด\": เมื่อจบเกม ขโมยพลัง 10 จากผู้เล่นที่พลังสูงสุด",
  "img": "images/roger.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "execute",
   "name": "ราชาโจรสลัด",
   "label": "ประหาร",
   "desc": "ดาเมจ 120% · ดาเมจ x2 ถ้าเป้าหมาย HP ≤ 35% · พัก 3 เทิร์น",
   "mult": 1.2,
   "cd": 3,
   "target": "enemy",
   "aura": "haki",
   "basic": false,
   "passive": {
    "kind": "brave",
    "name": "ใจสิงห์",
    "desc": "พลังโจมตี +25% เมื่อ HP เหลือไม่ถึง 40%"
   }
  },
  "skills": [
   {
    "kind": "execute",
    "name": "ราชาโจรสลัด",
    "label": "ประหาร",
    "desc": "ดาเมจ 120% · ดาเมจ x2 ถ้าเป้าหมาย HP ≤ 35% · พัก 3 เทิร์น",
    "mult": 1.2,
    "cd": 3,
    "target": "enemy",
    "aura": "haki",
    "basic": false,
    "passive": {
     "kind": "brave",
     "name": "ใจสิงห์",
     "desc": "พลังโจมตี +25% เมื่อ HP เหลือไม่ถึง 40%"
    }
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 106,
  "tier": "S",
  "bonus": 6
 },
 {
  "id": "whitebeard",
  "name": "Edward Newgate",
  "group": "สี่จักรพรรดิ",
  "pl": 99,
  "effect": "\"Gura Gura no Mi\": สั่นสะเทือน ลดพลังคู่แข่งทุกคน 5",
  "img": "images/whitebeard.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "sweep",
   "name": "Gura Gura no Mi",
   "label": "กวาดล้าง",
   "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
   "mult": 0.7,
   "cd": 3,
   "target": "all",
   "aura": "haki",
   "basic": false,
   "passive": {
    "kind": "sturdy",
    "name": "กายาเหล็ก",
    "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
   }
  },
  "skills": [
   {
    "kind": "sweep",
    "name": "Gura Gura no Mi",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "haki",
    "basic": false,
    "passive": {
     "kind": "sturdy",
     "name": "กายาเหล็ก",
     "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
    }
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 105,
  "tier": "S",
  "bonus": 6
 },
 {
  "id": "kaido",
  "name": "Kaido",
  "group": "สี่จักรพรรดิ",
  "pl": 97,
  "effect": "\"สิ่งมีชีวิตที่แข็งแกร่งที่สุด\": ทนทาน ไม่ถูกลดพลังจากเอฟเฟค",
  "img": "images/kaido.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "guard",
   "name": "สิ่งมีชีวิตที่แข็งแกร่งที่สุด",
   "label": "ตั้งการ์ด",
   "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "ally",
   "aura": "haki",
   "basic": false,
   "passive": {
    "kind": "sturdy",
    "name": "กายาเหล็ก",
    "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
   }
  },
  "skills": [
   {
    "kind": "guard",
    "name": "สิ่งมีชีวิตที่แข็งแกร่งที่สุด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "haki",
    "basic": false,
    "passive": {
     "kind": "sturdy",
     "name": "กายาเหล็ก",
     "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
    }
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 103,
  "tier": "S",
  "bonus": 6
 },
 {
  "id": "garp",
  "name": "Monkey D. Garp",
  "group": "กองทัพเรือ",
  "pl": 96,
  "effect": "\"วีรบุรุษนาวี\": ถือการ์ดกองทัพเรือ >=3 ได้ +6",
  "img": "images/garp.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "rally",
   "name": "วีรบุรุษนาวี",
   "label": "ปลุกใจ",
   "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "self",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "rally",
    "name": "วีรบุรุษนาวี",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 102,
  "tier": "S",
  "bonus": 6
 },
 {
  "id": "shanks",
  "name": "Shanks",
  "group": "สี่จักรพรรดิ",
  "pl": 96,
  "effect": "\"กองเรือผมแดง\": ถือ Yasopp/Beckman/Lucky Roux เพิ่ม +5 ต่อใบ",
  "img": "images/shanks.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "rally",
   "name": "กองเรือผมแดง",
   "label": "ปลุกใจ",
   "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "self",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "rally",
    "name": "กองเรือผมแดง",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "snipe",
    "name": "เล็งธนู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 102,
  "tier": "S",
  "bonus": 6
 },
 {
  "id": "luffy",
  "name": "Monkey D. Luffy",
  "group": "หมวกฟาง",
  "pl": 95,
  "effect": "\"Gear 5 อิสรภาพ\": ถือหมวกฟาง >=3 ได้ +15",
  "img": "images/luffy.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "blade",
   "name": "Gear 5 อิสรภาพ",
   "label": "สิ่งคม",
   "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น",
   "mult": 1.0,
   "cd": 2,
   "target": "enemy",
   "aura": "haki",
   "basic": false,
   "passive": {
    "kind": "brave",
    "name": "ใจสิงห์",
    "desc": "พลังโจมตี +25% เมื่อ HP เหลือไม่ถึง 40%"
   }
  },
  "skills": [
   {
    "kind": "blade",
    "name": "Gear 5 อิสรภาพ",
    "label": "สิ่งคม",
    "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "haki",
    "basic": false,
    "passive": {
     "kind": "brave",
     "name": "ใจสิงห์",
     "desc": "พลังโจมตี +25% เมื่อ HP เหลือไม่ถึง 40%"
    }
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 101,
  "tier": "S",
  "bonus": 6
 },
 {
  "id": "bigmom",
  "name": "Charlotte Linlin",
  "group": "สี่จักรพรรดิ",
  "pl": 94,
  "effect": "\"โซล-โซล\": เก็บวิญญาณ ขโมยพลัง 3 จากคู่แข่งทุกคน",
  "img": "images/bigmom.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "sweep",
   "name": "โซล-โซล",
   "label": "กวาดล้าง",
   "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
   "mult": 0.7,
   "cd": 3,
   "target": "all",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "sweep",
    "name": "โซล-โซล",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "heal",
    "name": "ฮีล",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 100,
  "tier": "S",
  "bonus": 6
 },
 {
  "id": "blackbeard",
  "name": "Marshall D. Teach",
  "group": "สี่จักรพรรดิ",
  "pl": 94,
  "effect": "\"Yami Yami no Mi\": เมื่อชนะประมูล เก็บเงิน 10 จากผู้เล่นอื่น",
  "img": "images/blackbeard.png",
  "aura": {
   "id": "dark",
   "th": "ยามิ ยามิ ความมืด",
   "fx": "dark",
   "c1": "#a06bff",
   "c2": "#0b0514"
  },
  "skill": {
   "kind": "drain",
   "name": "Yami Yami no Mi",
   "label": "ดูดพลัง",
   "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
   "mult": 1.0,
   "cd": 2,
   "target": "enemy",
   "aura": "dark",
   "basic": false
  },
  "skills": [
   {
    "kind": "drain",
    "name": "Yami Yami no Mi",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "dark",
    "basic": false
   },
   {
    "kind": "execute",
    "name": "ประหาร",
    "label": "ประหาร",
    "desc": "ดาเมจ 120% · ดาเมจ x2 ถ้าเป้าหมาย HP ≤ 35% · พัก 3 เทิร์น",
    "mult": 1.2,
    "cd": 3,
    "target": "enemy",
    "aura": "dark",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "dark",
    "basic": false
   }
  ],
  "meta": 97,
  "tier": "A",
  "bonus": 3
 },
 {
  "id": "sakazuki",
  "name": "Sakazuki (Akainu)",
  "group": "กองทัพเรือ",
  "pl": 93,
  "effect": "\"มากุมากุ\": เผาผลาญ ผู้แพ้ประมูลเสียเงินเพิ่ม 5",
  "img": "images/sakazuki.png",
  "aura": {
   "id": "magma",
   "th": "มากุ มากุ ลาวา",
   "fx": "flame",
   "c1": "#ff5a1f",
   "c2": "#3a0d05"
  },
  "skill": {
   "kind": "burn",
   "name": "มากุมากุ",
   "label": "เผาไหม้",
   "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "magma",
   "basic": false
  },
  "skills": [
   {
    "kind": "burn",
    "name": "มากุมากุ",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "magma",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "magma",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "magma",
    "basic": false
   }
  ],
  "meta": 96,
  "tier": "A",
  "bonus": 3
 },
 {
  "id": "sengoku",
  "name": "Sengoku",
  "group": "กองทัพเรือ",
  "pl": 91,
  "effect": "\"จอมทัพเรือ\": ถือกองทัพเรือ >=3 ได้ +6",
  "img": "images/sengoku.png",
  "aura": {
   "id": "holy",
   "th": "พุทธะทองคำ",
   "fx": "ring",
   "c1": "#ffe08a",
   "c2": "#2f2408"
  },
  "skill": {
   "kind": "rally",
   "name": "จอมทัพเรือ",
   "label": "ปลุกใจ",
   "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "self",
   "aura": "holy",
   "basic": false
  },
  "skills": [
   {
    "kind": "rally",
    "name": "จอมทัพเรือ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "holy",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "holy",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "holy",
    "basic": false
   }
  ],
  "meta": 94,
  "tier": "A",
  "bonus": 3
 },
 {
  "id": "kuzan",
  "name": "Kuzan (Aokiji)",
  "group": "กองทัพเรือ",
  "pl": 92,
  "effect": "\"ฮิเอะฮิเอะ\": แช่แข็ง ทำให้เอฟเฟคคู่แข่ง 1 ใบใช้ไม่ได้",
  "img": "images/kuzan.png",
  "aura": {
   "id": "ice",
   "th": "ฮิเอะ ฮิเอะ น้ำแข็ง",
   "fx": "ice",
   "c1": "#8fe9ff",
   "c2": "#0a3550"
  },
  "skill": {
   "kind": "stun",
   "name": "ฮิเอะฮิเอะ",
   "label": "สะกด",
   "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "ice",
   "basic": false
  },
  "skills": [
   {
    "kind": "stun",
    "name": "ฮิเอะฮิเอะ",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "ice",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "ice",
    "basic": false
   },
   {
    "kind": "sweep",
    "name": "กวาดล้าง",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "ice",
    "basic": false
   }
  ],
  "meta": 96,
  "tier": "A",
  "bonus": 4
 },
 {
  "id": "mihawk",
  "name": "Dracule Mihawk",
  "group": "เจ็ดเทพโจรสลัด",
  "pl": 92,
  "effect": "\"ดาบดำ\": ดวลตัวที่พลังสูงสุดได้ +8 ถ้าชนะ",
  "img": "images/mihawk.png",
  "aura": {
   "id": "blade",
   "th": "คมดาบ",
   "fx": "spark",
   "c1": "#dfe9f5",
   "c2": "#20293a"
  },
  "skill": {
   "kind": "snipe",
   "name": "ดาบดำ",
   "label": "เล็งธนู",
   "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
   "mult": 1.1,
   "cd": 2,
   "target": "enemy",
   "aura": "blade",
   "basic": false
  },
  "skills": [
   {
    "kind": "snipe",
    "name": "ดาบดำ",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "execute",
    "name": "ประหาร",
    "label": "ประหาร",
    "desc": "ดาเมจ 120% · ดาเมจ x2 ถ้าเป้าหมาย HP ≤ 35% · พัก 3 เทิร์น",
    "mult": 1.2,
    "cd": 3,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "blade",
    "basic": false
   }
  ],
  "meta": 95,
  "tier": "A",
  "bonus": 3
 },
 {
  "id": "borsalino",
  "name": "Borsalino (Kizaru)",
  "group": "กองทัพเรือ",
  "pl": 91,
  "effect": "\"ปิกะปิกะ\": ความเร็วแสง เปิดการ์ดก่อนใครตอนประมูล",
  "img": "images/borsalino.png",
  "aura": {
   "id": "light",
   "th": "ปิกะ ปิกะ แสง",
   "fx": "spark",
   "c1": "#ffe66b",
   "c2": "#4a3a00"
  },
  "skill": {
   "kind": "snipe",
   "name": "ปิกะปิกะ",
   "label": "เล็งธนู",
   "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
   "mult": 1.1,
   "cd": 2,
   "target": "enemy",
   "aura": "light",
   "basic": false
  },
  "skills": [
   {
    "kind": "snipe",
    "name": "ปิกะปิกะ",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "light",
    "basic": false
   },
   {
    "kind": "sweep",
    "name": "กวาดล้าง",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "light",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "light",
    "basic": false
   }
  ],
  "meta": 95,
  "tier": "A",
  "bonus": 4
 },
 {
  "id": "oden",
  "name": "Kozuki Oden",
  "group": "วาโนะคุนิ",
  "pl": 92,
  "effect": "\"ซามูไรในตำนาน\": ถือการ์ดวาโนะ >=3 ได้ +8",
  "img": "images/oden.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "heavy",
   "name": "ซามูไรในตำนาน",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "ซามูไรในตำนาน",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 98,
  "tier": "A",
  "bonus": 6
 },
 {
  "id": "rayleigh",
  "name": "Silvers Rayleigh",
  "group": "ตำนานยุคทอง",
  "pl": 91,
  "effect": "\"ราชาปีศาจ\": สอนการ์ดหมวกฟาง 1 ใบ +5",
  "img": "images/rayleigh.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "rally",
   "name": "ราชาปีศาจ",
   "label": "ปลุกใจ",
   "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "self",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "rally",
    "name": "ราชาปีศาจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "snipe",
    "name": "เล็งธนู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 97,
  "tier": "A",
  "bonus": 6
 },
 {
  "id": "issho",
  "name": "Issho (Fujitora)",
  "group": "กองทัพเรือ",
  "pl": 90,
  "effect": "\"ซุซุซุ\": ดึงอุกกาบาต สุ่มทำคู่แข่งเสียเงิน 5",
  "img": "images/issho.png",
  "aura": {
   "id": "gravity",
   "th": "ซุซุ ซุซุ แรงโน้มถ่วง",
   "fx": "spark",
   "c1": "#c3a6ff",
   "c2": "#1b1430"
  },
  "skill": {
   "kind": "sweep",
   "name": "ซุซุซุ",
   "label": "กวาดล้าง",
   "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
   "mult": 0.7,
   "cd": 3,
   "target": "all",
   "aura": "gravity",
   "basic": false
  },
  "skills": [
   {
    "kind": "sweep",
    "name": "ซุซุซุ",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "gravity",
    "basic": false
   },
   {
    "kind": "stun",
    "name": "สะกด",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "gravity",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "gravity",
    "basic": false
   }
  ],
  "meta": 94,
  "tier": "A",
  "bonus": 4
 },
 {
  "id": "aramaki",
  "name": "Aramaki (Ryokugyu)",
  "group": "กองทัพเรือ",
  "pl": 89,
  "effect": "\"โมริโมริ\": ดูดพลังจากธรรมชาติ ฟื้นพลัง 5 ต่อรอบ",
  "img": "images/aramaki.png",
  "aura": {
   "id": "plant",
   "th": "โมริ โมริ ป่า",
   "fx": "ring",
   "c1": "#5ce07a",
   "c2": "#0c2a14"
  },
  "skill": {
   "kind": "heal",
   "name": "โมริโมริ",
   "label": "ฮีล",
   "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
   "mult": 1.4,
   "cd": 2,
   "target": "ally",
   "aura": "plant",
   "basic": false
  },
  "skills": [
   {
    "kind": "heal",
    "name": "โมริโมริ",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "plant",
    "basic": false
   },
   {
    "kind": "drain",
    "name": "ดูดพลัง",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "plant",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "plant",
    "basic": false
   }
  ],
  "meta": 91,
  "tier": "B",
  "bonus": 2
 },
 {
  "id": "zoro",
  "name": "Roronoa Zoro",
  "group": "หมวกฟาง",
  "pl": 90,
  "effect": "\"ราชาสามดาบ\": ถือหมวกฟาง >=3 ได้ +10",
  "img": "images/zoro.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "flank",
   "name": "ราชาสามดาบ",
   "label": "กัดรอบ",
   "desc": "ดาเมจ 120% โดนกัดรอบ + สะกด 1 เทิร์น · พัก 2 เทิร์น",
   "mult": 1.2,
   "cd": 2,
   "target": "enemy",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "flank",
    "name": "ราชาสามดาบ",
    "label": "กัดรอบ",
    "desc": "ดาเมจ 120% โดนกัดรอบ + สะกด 1 เทิร์น · พัก 2 เทิร์น",
    "mult": 1.2,
    "cd": 2,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 96,
  "tier": "A",
  "bonus": 6
 },
 {
  "id": "katakuri",
  "name": "Charlotte Katakuri",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 88,
  "effect": "\"โมจิโมจิเห็นอนาคต\": ดูการ์ดที่จะเปิดถัดไป 1 ใบ",
  "img": "images/katakuri.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "guard",
   "name": "โมจิโมจิเห็นอนาคต",
   "label": "ตั้งการ์ด",
   "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "ally",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "guard",
    "name": "โมจิโมจิเห็นอนาคต",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "stun",
    "name": "สะกด",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 94,
  "tier": "A",
  "bonus": 6
 },
 {
  "id": "yamato",
  "name": "Yamato",
  "group": "วาโนะคุนิ",
  "pl": 88,
  "effect": "\"ผู้สืบทอดโอเดน\": +5 ถ้าถือ Kozuki Oden",
  "img": "images/yamato.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "heavy",
   "name": "ผู้สืบทอดโอเดน",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "ผู้สืบทอดโอเดน",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 94,
  "tier": "A",
  "bonus": 6
 },
 {
  "id": "sabo",
  "name": "Sabo",
  "group": "กองทัพปฏิวัติ",
  "pl": 88,
  "effect": "\"มังกรไฟ\": เผา ลดพลังคู่แข่งตัวหนึ่ง 6",
  "img": "images/sabo.png",
  "aura": {
   "id": "fire",
   "th": "เพลิง",
   "fx": "flame",
   "c1": "#ff8a2b",
   "c2": "#4a1405"
  },
  "skill": {
   "kind": "burn",
   "name": "มังกรไฟ",
   "label": "เผาไหม้",
   "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "fire",
   "basic": false
  },
  "skills": [
   {
    "kind": "burn",
    "name": "มังกรไฟ",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "fire",
    "basic": false
   }
  ],
  "meta": 91,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "beckman",
  "name": "Benn Beckman",
  "group": "กองเรือผมแดง",
  "pl": 88,
  "effect": "\"สมองกองเรือผมแดง\": ถือ Shanks ได้ +8",
  "img": "images/beckman.png",
  "aura": {
   "id": "bullet",
   "th": "กระสุน",
   "fx": "spark",
   "c1": "#ffd27f",
   "c2": "#33260a"
  },
  "skill": {
   "kind": "strike",
   "name": "สมองกองเรือผมแดง",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "bullet",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "สมองกองเรือผมแดง",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "bullet",
    "basic": false
   },
   {
    "kind": "snipe",
    "name": "เล็งธนู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "bullet",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "bullet",
    "basic": false
   }
  ],
  "meta": 91,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "sanji",
  "name": "Vinsmoke Sanji",
  "group": "หมวกฟาง",
  "pl": 87,
  "effect": "\"Ifrit Jambe\": ถือหมวกฟาง >=3 ได้ +10",
  "img": "images/sanji.png",
  "aura": {
   "id": "fire",
   "th": "เพลิง",
   "fx": "flame",
   "c1": "#ff8a2b",
   "c2": "#4a1405"
  },
  "skill": {
   "kind": "reaper",
   "name": "Ifrit Jambe",
   "label": "เก็บเกี่ยว",
   "desc": "ดาเมจ 80% ใส่ศัตรูทุกคน · พัก 3 เทิร์น",
   "mult": 0.8,
   "cd": 3,
   "target": "all",
   "aura": "fire",
   "basic": false
  },
  "skills": [
   {
    "kind": "reaper",
    "name": "Ifrit Jambe",
    "label": "เก็บเกี่ยว",
    "desc": "ดาเมจ 80% ใส่ศัตรูทุกคน · พัก 3 เทิร์น",
    "mult": 0.8,
    "cd": 3,
    "target": "all",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "burn",
    "name": "เผาไหม้",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "fire",
    "basic": false
   }
  ],
  "meta": 92,
  "tier": "A",
  "bonus": 5
 },
 {
  "id": "marco",
  "name": "Marco",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 86,
  "effect": "\"ฟีนิกซ์\": ฟื้นคืนชีพ กันเอฟเฟคขโมยพลังได้ 1 ครั้ง",
  "img": "images/marco.png",
  "aura": {
   "id": "phoenix",
   "th": "ฟีนิกซ์",
   "fx": "flame",
   "c1": "#6bd8ff",
   "c2": "#062a3a"
  },
  "skill": {
   "kind": "heal",
   "name": "ฟีนิกซ์",
   "label": "ฮีล",
   "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
   "mult": 1.4,
   "cd": 2,
   "target": "ally",
   "aura": "phoenix",
   "basic": false,
   "passive": {
    "kind": "revive",
    "name": "ไม่ยอมตาย",
    "desc": "เมื่อถูกทำให้หมดสติ ฟื้นกลับมาด้วย HP 30% ได้ 1 ครั้ง"
   }
  },
  "skills": [
   {
    "kind": "heal",
    "name": "ฟีนิกซ์",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "phoenix",
    "basic": false,
    "passive": {
     "kind": "revive",
     "name": "ไม่ยอมตาย",
     "desc": "เมื่อถูกทำให้หมดสติ ฟื้นกลับมาด้วย HP 30% ได้ 1 ครั้ง"
    }
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "phoenix",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "phoenix",
    "basic": false
   }
  ],
  "meta": 88,
  "tier": "B",
  "bonus": 2
 },
 {
  "id": "king",
  "name": "King",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 86,
  "effect": "\"ลูนาเรีย\": อึด ถือ Kaido ได้ +6",
  "img": "images/king.png",
  "aura": {
   "id": "fire",
   "th": "เพลิง",
   "fx": "flame",
   "c1": "#ff8a2b",
   "c2": "#4a1405"
  },
  "skill": {
   "kind": "guard",
   "name": "ลูนาเรีย",
   "label": "ตั้งการ์ด",
   "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "ally",
   "aura": "fire",
   "basic": false,
   "passive": {
    "kind": "sturdy",
    "name": "กายาเหล็ก",
    "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
   }
  },
  "skills": [
   {
    "kind": "guard",
    "name": "ลูนาเรีย",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "fire",
    "basic": false,
    "passive": {
     "kind": "sturdy",
     "name": "กายาเหล็ก",
     "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
    }
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "fire",
    "basic": false
   }
  ],
  "meta": 89,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "ace",
  "name": "Portgas D. Ace",
  "group": "หมวกฟาง(พันธมิตร)",
  "pl": 85,
  "effect": "\"เมระเมระ\": ไฟลุก +5 ถ้าถือ Luffy หรือ Sabo",
  "img": "images/ace.png",
  "aura": {
   "id": "fire",
   "th": "เพลิง",
   "fx": "flame",
   "c1": "#ff8a2b",
   "c2": "#4a1405"
  },
  "skill": {
   "kind": "burn",
   "name": "เมระเมระ",
   "label": "เผาไหม้",
   "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "fire",
   "basic": false
  },
  "skills": [
   {
    "kind": "burn",
    "name": "เมระเมระ",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "sweep",
    "name": "กวาดล้าง",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "fire",
    "basic": false
   }
  ],
  "meta": 89,
  "tier": "B",
  "bonus": 4
 },
 {
  "id": "law",
  "name": "Trafalgar Law",
  "group": "ซูเปอร์โนวา",
  "pl": 85,
  "effect": "\"โอเปะโอเปะ\": สลับการ์ดกับคู่แข่งได้ 1 ใบ",
  "img": "images/law.png",
  "aura": {
   "id": "ice",
   "th": "ฮิเอะ ฮิเอะ น้ำแข็ง",
   "fx": "ice",
   "c1": "#8fe9ff",
   "c2": "#0a3550"
  },
  "skill": {
   "kind": "stun",
   "name": "โอเปะโอเปะ",
   "label": "สะกด",
   "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "ice",
   "basic": false
  },
  "skills": [
   {
    "kind": "stun",
    "name": "โอเปะโอเปะ",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "ice",
    "basic": false
   },
   {
    "kind": "drain",
    "name": "ดูดพลัง",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "ice",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "ice",
    "basic": false
   }
  ],
  "meta": 88,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "doflamingo",
  "name": "Donquixote Doflamingo",
  "group": "เจ็ดเทพโจรสลัด",
  "pl": 85,
  "effect": "\"อิโตะอิโตะ\": ควบคุมคู่แข่งบังคับจ่ายเงิน 8",
  "img": "images/doflamingo.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "stun",
   "name": "อิโตะอิโตะ",
   "label": "สะกด",
   "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "stun",
    "name": "อิโตะอิโตะ",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 91,
  "tier": "B",
  "bonus": 6
 },
 {
  "id": "hancock",
  "name": "Boa Hancock",
  "group": "เจ็ดเทพโจรสลัด",
  "pl": 84,
  "effect": "\"เมโระเมโระ\": ทำให้ผู้เล่นชาย/คู่แข่ง 1 คนออกจากการประมูล",
  "img": "images/hancock.png",
  "aura": {
   "id": "haki",
   "th": "ฮาคิราชันย์",
   "fx": "lightning",
   "c1": "#ff2233",
   "c2": "#12060c"
  },
  "skill": {
   "kind": "stun",
   "name": "เมโระเมโระ",
   "label": "สะกด",
   "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "haki",
   "basic": false
  },
  "skills": [
   {
    "kind": "stun",
    "name": "เมโระเมโระ",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "haki",
    "name": "ฮาคิราชันย์",
    "label": "ฮาคิราชันย์",
    "desc": "ปล่อยฮาคิราชันย์ ดาเมจ 90% ใส่ศัตรูทุกตัว + ตัวที่ HP ≤ 50% สลบข้ามเทิร์น · พัก 4 เทิร์น",
    "mult": 0.9,
    "cd": 4,
    "target": "all",
    "aura": "haki",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "haki",
    "basic": false
   }
  ],
  "meta": 90,
  "tier": "B",
  "bonus": 6
 },
 {
  "id": "kuma",
  "name": "Bartholomew Kuma",
  "group": "เจ็ดเทพโจรสลัด",
  "pl": 84,
  "effect": "\"นิคิว\": ผลักการ์ดคู่แข่งออก 1 ใบ (คืนกองกลาง)",
  "img": "images/kuma.png",
  "aura": {
   "id": "paw",
   "th": "นิคิว อุ้งเท้า",
   "fx": "ring",
   "c1": "#f0b7d8",
   "c2": "#331428"
  },
  "skill": {
   "kind": "sweep",
   "name": "นิคิว",
   "label": "กวาดล้าง",
   "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
   "mult": 0.7,
   "cd": 3,
   "target": "all",
   "aura": "paw",
   "basic": false
  },
  "skills": [
   {
    "kind": "sweep",
    "name": "นิคิว",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "paw",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "paw",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "paw",
    "basic": false
   }
  ],
  "meta": 88,
  "tier": "B",
  "bonus": 4
 },
 {
  "id": "jimbei",
  "name": "Jinbe",
  "group": "หมวกฟาง",
  "pl": 83,
  "effect": "\"อัศวินแห่งท้องทะเล\": ลดความเสียหายจากเอฟเฟคครึ่งหนึ่ง",
  "img": "images/jimbei.png",
  "aura": {
   "id": "water",
   "th": "อัศวินท้องทะเล",
   "fx": "ring",
   "c1": "#7fd0ff",
   "c2": "#0b2436"
  },
  "skill": {
   "kind": "guard",
   "name": "อัศวินแห่งท้องทะเล",
   "label": "ตั้งการ์ด",
   "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "ally",
   "aura": "water",
   "basic": false
  },
  "skills": [
   {
    "kind": "guard",
    "name": "อัศวินแห่งท้องทะเล",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "water",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "water",
    "basic": false
   },
   {
    "kind": "heal",
    "name": "ฮีล",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "water",
    "basic": false
   }
  ],
  "meta": 86,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "kid",
  "name": "Eustass Kid",
  "group": "ซูเปอร์โนวา",
  "pl": 83,
  "effect": "\"จิกิจิกิ\": ประกอบโลหะ +10 ถ้าถือ Killer",
  "img": "images/kid.png",
  "aura": {
   "id": "magnet",
   "th": "จิกิ จิกิ แม่เหล็ก",
   "fx": "spark",
   "c1": "#c8c8ff",
   "c2": "#171733"
  },
  "skill": {
   "kind": "heavy",
   "name": "จิกิจิกิ",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "magnet",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "จิกิจิกิ",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "magnet",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "magnet",
    "basic": false
   },
   {
    "kind": "sweep",
    "name": "กวาดล้าง",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "magnet",
    "basic": false
   }
  ],
  "meta": 87,
  "tier": "B",
  "bonus": 4
 },
 {
  "id": "weevil",
  "name": "Edward Weevil",
  "group": "เจ็ดเทพโจรสลัด",
  "pl": 82,
  "effect": "\"ลูกชายไวท์เบิร์ด\": +10 ถ้าถือ Whitebeard",
  "img": "images/weevil.png",
  "aura": {
   "id": "steel",
   "th": "เหล็กกล้า",
   "fx": "spark",
   "c1": "#c8d3e0",
   "c2": "#1d2733"
  },
  "skill": {
   "kind": "heavy",
   "name": "ลูกชายไวท์เบิร์ด",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "steel",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "ลูกชายไวท์เบิร์ด",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "steel",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "steel",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "steel",
    "basic": false
   }
  ],
  "meta": 85,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "jozu",
  "name": "Jozu",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 82,
  "effect": "\"ไดมอนด์\": แข็งเป็นเพชร กันเอฟเฟคดาเมจทั้งหมด 1 ครั้ง",
  "img": "images/jozu.png",
  "aura": {
   "id": "diamond",
   "th": "ไดมอนด์ เพชร",
   "fx": "ice",
   "c1": "#bfe9ff",
   "c2": "#16344a"
  },
  "skill": {
   "kind": "guard",
   "name": "ไดมอนด์",
   "label": "ตั้งการ์ด",
   "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "ally",
   "aura": "diamond",
   "basic": false,
   "passive": {
    "kind": "sturdy",
    "name": "กายาเหล็ก",
    "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
   }
  },
  "skills": [
   {
    "kind": "guard",
    "name": "ไดมอนด์",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "diamond",
    "basic": false,
    "passive": {
     "kind": "sturdy",
     "name": "กายาเหล็ก",
     "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
    }
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "diamond",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "diamond",
    "basic": false
   }
  ],
  "meta": 85,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "queen",
  "name": "Queen",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 82,
  "effect": "\"ไอซ์ออนิ\": โรคระบาด ทำคู่แข่งติดดีบัฟ -5",
  "img": "images/queen.png",
  "aura": {
   "id": "poison",
   "th": "พิษ",
   "fx": "ring",
   "c1": "#b6ff4d",
   "c2": "#1b2b06"
  },
  "skill": {
   "kind": "burn",
   "name": "ไอซ์ออนิ",
   "label": "เผาไหม้",
   "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "poison",
   "basic": false
  },
  "skills": [
   {
    "kind": "burn",
    "name": "ไอซ์ออนิ",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "poison",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "poison",
    "basic": false
   },
   {
    "kind": "drain",
    "name": "ดูดพลัง",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "poison",
    "basic": false
   }
  ],
  "meta": 85,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "lucci",
  "name": "Rob Lucci",
  "group": "CP0",
  "pl": 81,
  "effect": "\"โรกุชิกิ\": สังหารเงียบ ขโมยพลัง 6 จากคู่แข่ง 1 คน",
  "img": "images/lucci.png",
  "aura": {
   "id": "beast",
   "th": "อสูรกาย",
   "fx": "flame",
   "c1": "#e06b3a",
   "c2": "#2a1206"
  },
  "skill": {
   "kind": "execute",
   "name": "โรกุชิกิ",
   "label": "ประหาร",
   "desc": "ดาเมจ 120% · ดาเมจ x2 ถ้าเป้าหมาย HP ≤ 35% · พัก 3 เทิร์น",
   "mult": 1.2,
   "cd": 3,
   "target": "enemy",
   "aura": "beast",
   "basic": false
  },
  "skills": [
   {
    "kind": "execute",
    "name": "โรกุชิกิ",
    "label": "ประหาร",
    "desc": "ดาเมจ 120% · ดาเมจ x2 ถ้าเป้าหมาย HP ≤ 35% · พัก 3 เทิร์น",
    "mult": 1.2,
    "cd": 3,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "beast",
    "basic": false
   }
  ],
  "meta": 84,
  "tier": "B",
  "bonus": 3
 },
 {
  "id": "smoothie",
  "name": "Charlotte Smoothie",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 80,
  "effect": "\"ชิบูชิบู\": คั้นน้ำ ดูดพลังคู่แข่ง 4 ให้ตัวเอง",
  "img": "images/smoothie.png",
  "aura": {
   "id": "liquid",
   "th": "ชิบู ชิบู ของเหลว",
   "fx": "ring",
   "c1": "#a8f0d8",
   "c2": "#0d2a24"
  },
  "skill": {
   "kind": "drain",
   "name": "ชิบูชิบู",
   "label": "ดูดพลัง",
   "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
   "mult": 1.0,
   "cd": 2,
   "target": "enemy",
   "aura": "liquid",
   "basic": false
  },
  "skills": [
   {
    "kind": "drain",
    "name": "ชิบูชิบู",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "liquid",
    "basic": false
   },
   {
    "kind": "heal",
    "name": "ฮีล",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "liquid",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "liquid",
    "basic": false
   }
  ],
  "meta": 82,
  "tier": "C",
  "bonus": 2
 },
 {
  "id": "jack",
  "name": "Jack",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 80,
  "effect": "\"แมมมอธ\": บุกไม่หยุด ไล่ประมูลต่อทันที 1 ใบ",
  "img": "images/jack.png",
  "aura": {
   "id": "beast",
   "th": "อสูรกาย",
   "fx": "flame",
   "c1": "#e06b3a",
   "c2": "#2a1206"
  },
  "skill": {
   "kind": "heavy",
   "name": "แมมมอธ",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "beast",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "แมมมอธ",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "beast",
    "basic": false
   }
  ],
  "meta": 83,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "crocodile",
  "name": "Crocodile",
  "group": "เจ็ดเทพโจรสลัด",
  "pl": 80,
  "effect": "\"ซูนะซูนะ\": ทรายดูดน้ำ ลดพลังคู่แข่งที่พลังสูงสุด 8",
  "img": "images/crocodile.png",
  "aura": {
   "id": "sand",
   "th": "ซูนะ ซูนะ ทราย",
   "fx": "ring",
   "c1": "#e0c07a",
   "c2": "#3a2a10"
  },
  "skill": {
   "kind": "drain",
   "name": "ซูนะซูนะ",
   "label": "ดูดพลัง",
   "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
   "mult": 1.0,
   "cd": 2,
   "target": "enemy",
   "aura": "sand",
   "basic": false
  },
  "skills": [
   {
    "kind": "drain",
    "name": "ซูนะซูนะ",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "sand",
    "basic": false
   },
   {
    "kind": "sweep",
    "name": "กวาดล้าง",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "sand",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "sand",
    "basic": false
   }
  ],
  "meta": 84,
  "tier": "B",
  "bonus": 4
 },
 {
  "id": "vista",
  "name": "Vista",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 80,
  "effect": "\"ดอกกุหลาบแห่งดาบ\": +5 ถ้าถือ Whitebeard",
  "img": "images/vista.png",
  "aura": {
   "id": "blade",
   "th": "คมดาบ",
   "fx": "spark",
   "c1": "#dfe9f5",
   "c2": "#20293a"
  },
  "skill": {
   "kind": "heavy",
   "name": "ดอกกุหลาบแห่งดาบ",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "blade",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "ดอกกุหลาบแห่งดาบ",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "snipe",
    "name": "เล็งธนู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "blade",
    "basic": false
   }
  ],
  "meta": 83,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "ivankov",
  "name": "Emporio Ivankov",
  "group": "กองทัพปฏิวัติ",
  "pl": 80,
  "effect": "\"ฮอร์โมน\": เมื่อชนะประมูลครั้งสุดท้าย ฟื้นพลัง 8",
  "img": "images/ivankov.png",
  "aura": {
   "id": "hormone",
   "th": "ฮอร์โมน",
   "fx": "ring",
   "c1": "#ff8ac1",
   "c2": "#33122a"
  },
  "skill": {
   "kind": "heal",
   "name": "ฮอร์โมน",
   "label": "ฮีล",
   "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
   "mult": 1.4,
   "cd": 2,
   "target": "ally",
   "aura": "hormone",
   "basic": false
  },
  "skills": [
   {
    "kind": "heal",
    "name": "ฮอร์โมน",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "hormone",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "hormone",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "hormone",
    "basic": false
   }
  ],
  "meta": 82,
  "tier": "C",
  "bonus": 2
 },
 {
  "id": "yasopp",
  "name": "Yasopp",
  "group": "กองเรือผมแดง",
  "pl": 80,
  "effect": "\"มือปืนสังหาร\": +5 ถ้าถือ Shanks",
  "img": "images/yasopp.png",
  "aura": {
   "id": "bullet",
   "th": "กระสุน",
   "fx": "spark",
   "c1": "#ffd27f",
   "c2": "#33260a"
  },
  "skill": {
   "kind": "snipe",
   "name": "มือปืนสังหาร",
   "label": "เล็งธนู",
   "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
   "mult": 1.1,
   "cd": 2,
   "target": "enemy",
   "aura": "bullet",
   "basic": false
  },
  "skills": [
   {
    "kind": "snipe",
    "name": "มือปืนสังหาร",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "bullet",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "bullet",
    "basic": false
   },
   {
    "kind": "execute",
    "name": "ประหาร",
    "label": "ประหาร",
    "desc": "ดาเมจ 120% · ดาเมจ x2 ถ้าเป้าหมาย HP ≤ 35% · พัก 3 เทิร์น",
    "mult": 1.2,
    "cd": 3,
    "target": "enemy",
    "aura": "bullet",
    "basic": false
   }
  ],
  "meta": 83,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "cracker",
  "name": "Charlotte Cracker",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 79,
  "effect": "\"บิสกิตบิสกิต\": สร้างทหารบิสกิต +6 ถ้าถือ Big Mom",
  "img": "images/cracker.png",
  "aura": {
   "id": "biscuit",
   "th": "บิสกิต บิสกิต",
   "fx": "ring",
   "c1": "#f0d9a8",
   "c2": "#2e2410"
  },
  "skill": {
   "kind": "heavy",
   "name": "บิสกิตบิสกิต",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "biscuit",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "บิสกิตบิสกิต",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "biscuit",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "biscuit",
    "basic": false
   },
   {
    "kind": "sweep",
    "name": "กวาดล้าง",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "biscuit",
    "basic": false
   }
  ],
  "meta": 83,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "killer",
  "name": "Killer",
  "group": "ซูเปอร์โนวา",
  "pl": 79,
  "effect": "\"คามะคามะ\": +8 ถ้าถือ Kid",
  "img": "images/killer.png",
  "aura": {
   "id": "blade",
   "th": "คมดาบ",
   "fx": "spark",
   "c1": "#dfe9f5",
   "c2": "#20293a"
  },
  "skill": {
   "kind": "snipe",
   "name": "คามะคามะ",
   "label": "เล็งธนู",
   "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
   "mult": 1.1,
   "cd": 2,
   "target": "enemy",
   "aura": "blade",
   "basic": false
  },
  "skills": [
   {
    "kind": "snipe",
    "name": "คามะคามะ",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "blade",
    "name": "สิ่งคม",
    "label": "สิ่งคม",
    "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "blade",
    "basic": false
   }
  ],
  "meta": 83,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "drake",
  "name": "X Drake",
  "group": "ซูเปอร์โนวา",
  "pl": 78,
  "effect": "\"ริวริว\": ไดโนเสาร์ เพิ่มพลัง 4 ต่อการประมูลที่ชนะ",
  "img": "images/drake.png",
  "aura": {
   "id": "beast",
   "th": "อสูรกาย",
   "fx": "flame",
   "c1": "#e06b3a",
   "c2": "#2a1206"
  },
  "skill": {
   "kind": "heavy",
   "name": "ริวริว",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "beast",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "ริวริว",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "beast",
    "basic": false
   }
  ],
  "meta": 81,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "vergo",
  "name": "Vergo",
  "group": "กองทัพเรือ",
  "pl": 78,
  "effect": "\"บัมโบ้\": เตะเหล็ก ลดพลังคู่แข่ง 5",
  "img": "images/vergo.png",
  "aura": {
   "id": "steel",
   "th": "เหล็กกล้า",
   "fx": "spark",
   "c1": "#c8d3e0",
   "c2": "#1d2733"
  },
  "skill": {
   "kind": "strike",
   "name": "บัมโบ้",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "steel",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "บัมโบ้",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "steel",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "steel",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "steel",
    "basic": false
   }
  ],
  "meta": 81,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "nekomamushi",
  "name": "Nekomamushi",
  "group": "วาโนะคุนิ",
  "pl": 78,
  "effect": "\"ทาบูกิ โนะ จิน\": +6 ถ้าถือ Inuarashi",
  "img": "images/nekomamushi.png",
  "aura": {
   "id": "beast",
   "th": "อสูรกาย",
   "fx": "flame",
   "c1": "#e06b3a",
   "c2": "#2a1206"
  },
  "skill": {
   "kind": "strike",
   "name": "ทาบูกิ โนะ จิน",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "beast",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "ทาบูกิ โนะ จิน",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "snipe",
    "name": "เล็งธนู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "beast",
    "basic": false
   }
  ],
  "meta": 81,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "inuarashi",
  "name": "Inuarashi",
  "group": "วาโนะคุนิ",
  "pl": 78,
  "effect": "\"ยักษ์วานร\": +6 ถ้าถือ Nekomamushi",
  "img": "images/inuarashi.png",
  "aura": {
   "id": "beast",
   "th": "อสูรกาย",
   "fx": "flame",
   "c1": "#e06b3a",
   "c2": "#2a1206"
  },
  "skill": {
   "kind": "strike",
   "name": "ยักษ์วานร",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "beast",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "ยักษ์วานร",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "snipe",
    "name": "เล็งธนู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "beast",
    "basic": false
   }
  ],
  "meta": 81,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "luckyroux",
  "name": "Lucky Roux",
  "group": "กองเรือผมแดง",
  "pl": 78,
  "effect": "\"ความเร็วสายฟ้า\": +5 ถ้าถือ Shanks",
  "img": "images/luckyroux.png",
  "aura": {
   "id": "bullet",
   "th": "กระสุน",
   "fx": "spark",
   "c1": "#ffd27f",
   "c2": "#33260a"
  },
  "skill": {
   "kind": "snipe",
   "name": "ความเร็วสายฟ้า",
   "label": "เล็งธนู",
   "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
   "mult": 1.1,
   "cd": 2,
   "target": "enemy",
   "aura": "bullet",
   "basic": false
  },
  "skills": [
   {
    "kind": "snipe",
    "name": "ความเร็วสายฟ้า",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "bullet",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "bullet",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "bullet",
    "basic": false
   }
  ],
  "meta": 81,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "hawkins",
  "name": "Basil Hawkins",
  "group": "ซูเปอร์โนวา",
  "pl": 77,
  "effect": "\"วาระห์\": ดูดวง ทำนาย ป้องกันดาเมจ 1 ครั้ง",
  "img": "images/hawkins.png",
  "aura": {
   "id": "tarot",
   "th": "วาระห์ ดูดวง",
   "fx": "spark",
   "c1": "#ffb0d0",
   "c2": "#2a0f1c"
  },
  "skill": {
   "kind": "guard",
   "name": "วาระห์",
   "label": "ตั้งการ์ด",
   "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "ally",
   "aura": "tarot",
   "basic": false,
   "passive": {
    "kind": "sturdy",
    "name": "กายาเหล็ก",
    "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
   }
  },
  "skills": [
   {
    "kind": "guard",
    "name": "วาระห์",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "tarot",
    "basic": false,
    "passive": {
     "kind": "sturdy",
     "name": "กายาเหล็ก",
     "desc": "รับดาเมจน้อยลง 20% ทุกครั้ง"
    }
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "tarot",
    "basic": false
   },
   {
    "kind": "burn",
    "name": "เผาไหม้",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "tarot",
    "basic": false
   }
  ],
  "meta": 80,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "bege",
  "name": "Capone Bege",
  "group": "ซูเปอร์โนวา",
  "pl": 77,
  "effect": "\"ชิบุชิบุ\": ปราสาทคนแคระ +1 เอฟเฟคยิงจากในตัว",
  "img": "images/bege.png",
  "aura": {
   "id": "castle",
   "th": "ปราสาทคนแคระ",
   "fx": "ring",
   "c1": "#b9c6d6",
   "c2": "#1a2230"
  },
  "skill": {
   "kind": "snipe",
   "name": "ชิบุชิบุ",
   "label": "เล็งธนู",
   "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
   "mult": 1.1,
   "cd": 2,
   "target": "enemy",
   "aura": "castle",
   "basic": false
  },
  "skills": [
   {
    "kind": "snipe",
    "name": "ชิบุชิบุ",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "castle",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "castle",
    "basic": false
   },
   {
    "kind": "sweep",
    "name": "กวาดล้าง",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "castle",
    "basic": false
   }
  ],
  "meta": 81,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "apoo",
  "name": "Scratchmen Apoo",
  "group": "ซูเปอร์โนวา",
  "pl": 76,
  "effect": "\"โอโตะโอโตะ\": ระเบิดเสียง ทำคู่แข่งทุกคนเสียเงิน 4",
  "img": "images/apoo.png",
  "aura": {
   "id": "sound",
   "th": "โอโตะ โอโตะ เสียง",
   "fx": "spark",
   "c1": "#7fd6ff",
   "c2": "#122a3a"
  },
  "skill": {
   "kind": "sweep",
   "name": "โอโตะโอโตะ",
   "label": "กวาดล้าง",
   "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
   "mult": 0.7,
   "cd": 3,
   "target": "all",
   "aura": "sound",
   "basic": false
  },
  "skills": [
   {
    "kind": "sweep",
    "name": "โอโตะโอโตะ",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "sound",
    "basic": false
   },
   {
    "kind": "stun",
    "name": "สะกด",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "sound",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "sound",
    "basic": false
   }
  ],
  "meta": 80,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "urouge",
  "name": "Urouge",
  "group": "ซูเปอร์โนวา",
  "pl": 76,
  "effect": "\"คามะบากะ\": ยิ่งเจ็บยิ่งแกร่ง +3 ต่อใบที่แพ้ประมูล",
  "img": "images/urouge.png",
  "aura": {
   "id": "karma",
   "th": "คามะบากะ กรรม",
   "fx": "spark",
   "c1": "#ffd9a0",
   "c2": "#2a1c08"
  },
  "skill": {
   "kind": "heavy",
   "name": "คามะบากะ",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "karma",
   "basic": false,
   "passive": {
    "kind": "brave",
    "name": "ใจสิงห์",
    "desc": "พลังโจมตี +25% เมื่อ HP เหลือไม่ถึง 40%"
   }
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "คามะบากะ",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "karma",
    "basic": false,
    "passive": {
     "kind": "brave",
     "name": "ใจสิงห์",
     "desc": "พลังโจมตี +25% เมื่อ HP เหลือไม่ถึง 40%"
    }
   },
   {
    "kind": "fortify",
    "name": "ป้อมปราการ",
    "label": "ป้อมปราการ",
    "desc": "ตั้งป้อม ลดดาเมจที่รับ 50% นาน 3 เทิร์น + ฟื้น HP 25% ของหลอดสูงสุด · พัก 4 เทิร์น",
    "mult": 0.0,
    "cd": 4,
    "target": "self",
    "aura": "karma",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "karma",
    "basic": false
   }
  ],
  "meta": 79,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "smoker",
  "name": "Smoker",
  "group": "กองทัพเรือ",
  "pl": 76,
  "effect": "\"โมโม่\": ควันจับกุม ทำให้คู่แข่งข้ามรอบถัดไป",
  "img": "images/smoker.png",
  "aura": {
   "id": "smoke",
   "th": "โมโม่ ควัน",
   "fx": "dark",
   "c1": "#cfd8e3",
   "c2": "#232a33"
  },
  "skill": {
   "kind": "stun",
   "name": "โมโม่",
   "label": "สะกด",
   "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "smoke",
   "basic": false
  },
  "skills": [
   {
    "kind": "stun",
    "name": "โมโม่",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "smoke",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "smoke",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "smoke",
    "basic": false
   }
  ],
  "meta": 79,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "denjiro",
  "name": "Denjiro",
  "group": "วาโนะคุนิ",
  "pl": 76,
  "effect": "\"ซามูไรปลอมตัว\": ขโมยข้อมูล ดูเงินคู่แข่งทุกคน",
  "img": "images/denjiro.png",
  "aura": {
   "id": "blade",
   "th": "คมดาบ",
   "fx": "spark",
   "c1": "#dfe9f5",
   "c2": "#20293a"
  },
  "skill": {
   "kind": "strike",
   "name": "ซามูไรปลอมตัว",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "blade",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "ซามูไรปลอมตัว",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "blade",
    "name": "สิ่งคม",
    "label": "สิ่งคม",
    "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "blade",
    "basic": false
   }
  ],
  "meta": 80,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "perospero",
  "name": "Perospero",
  "group": "ผู้บัญชาการจักรพรรดิ",
  "pl": 76,
  "effect": "\"เพโรเพโร\": ลูกกวาดเหนียว +6 ถ้าถือ Big Mom",
  "img": "images/perospero.png",
  "aura": {
   "id": "candy",
   "th": "เพโร เพโร ลูกกวาด",
   "fx": "ring",
   "c1": "#ff9ad5",
   "c2": "#3a1030"
  },
  "skill": {
   "kind": "guard",
   "name": "เพโรเพโร",
   "label": "ตั้งการ์ด",
   "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "ally",
   "aura": "candy",
   "basic": false
  },
  "skills": [
   {
    "kind": "guard",
    "name": "เพโรเพโร",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "candy",
    "basic": false
   },
   {
    "kind": "stun",
    "name": "สะกด",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "candy",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "candy",
    "basic": false
   }
  ],
  "meta": 79,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "bonney",
  "name": "Jewelry Bonney",
  "group": "ซูเปอร์โนวา",
  "pl": 74,
  "effect": "\"โทชิโทชิ\": เปลี่ยนวัย ย้อนคืนเงินค่าประมูล 10",
  "img": "images/bonney.png",
  "aura": {
   "id": "time",
   "th": "โทชิ โทชิ เวลา",
   "fx": "ring",
   "c1": "#c9a6ff",
   "c2": "#1d1233"
  },
  "skill": {
   "kind": "heal",
   "name": "โทชิโทชิ",
   "label": "ฮีล",
   "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
   "mult": 1.4,
   "cd": 2,
   "target": "ally",
   "aura": "time",
   "basic": false
  },
  "skills": [
   {
    "kind": "heal",
    "name": "โทชิโทชิ",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "time",
    "basic": false
   },
   {
    "kind": "drain",
    "name": "ดูดพลัง",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "time",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "time",
    "basic": false
   }
  ],
  "meta": 76,
  "tier": "C",
  "bonus": 2
 },
 {
  "id": "kaku",
  "name": "Kaku",
  "group": "CP0",
  "pl": 74,
  "effect": "\"คิริน\": ยีราฟขยายตัว +5 ถ้าถือ Rob Lucci",
  "img": "images/kaku.png",
  "aura": {
   "id": "beast",
   "th": "อสูรกาย",
   "fx": "flame",
   "c1": "#e06b3a",
   "c2": "#2a1206"
  },
  "skill": {
   "kind": "strike",
   "name": "คิริน",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "beast",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "คิริน",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "beast",
    "basic": false
   }
  ],
  "meta": 77,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "moria",
  "name": "Gecko Moria",
  "group": "เจ็ดเทพโจรสลัด",
  "pl": 74,
  "effect": "\"คาเงะคาเงะ\": ขโมยเงา ทำคู่แข่ง 1 คนพลัง -10",
  "img": "images/moria.png",
  "aura": {
   "id": "shadow",
   "th": "คาเงะ คาเงะ เงา",
   "fx": "dark",
   "c1": "#7c5cff",
   "c2": "#07060f"
  },
  "skill": {
   "kind": "drain",
   "name": "คาเงะคาเงะ",
   "label": "ดูดพลัง",
   "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
   "mult": 1.0,
   "cd": 2,
   "target": "enemy",
   "aura": "shadow",
   "basic": false
  },
  "skills": [
   {
    "kind": "drain",
    "name": "คาเงะคาเงะ",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "shadow",
    "basic": false
   },
   {
    "kind": "sweep",
    "name": "กวาดล้าง",
    "label": "กวาดล้าง",
    "desc": "ดาเมจ 70% ใส่ศัตรูทุกตัว · พัก 3 เทิร์น",
    "mult": 0.7,
    "cd": 3,
    "target": "all",
    "aura": "shadow",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "shadow",
    "basic": false
   }
  ],
  "meta": 78,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "kikunojo",
  "name": "Kikunojo",
  "group": "วาโนะคุนิ",
  "pl": 72,
  "effect": "\"ดอกไม้หิมะ\": +4 ถ้าถือ Kozuki Oden",
  "img": "images/kikunojo.png",
  "aura": {
   "id": "blade",
   "th": "คมดาบ",
   "fx": "spark",
   "c1": "#dfe9f5",
   "c2": "#20293a"
  },
  "skill": {
   "kind": "strike",
   "name": "ดอกไม้หิมะ",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "blade",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "ดอกไม้หิมะ",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "blade",
    "name": "สิ่งคม",
    "label": "สิ่งคม",
    "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "heal",
    "name": "ฮีล",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "blade",
    "basic": false
   }
  ],
  "meta": 76,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "reiju",
  "name": "Vinsmoke Reiju",
  "group": "Germa 66",
  "pl": 72,
  "effect": "\"พิษ\": ดูดพลังคู่แข่ง 4 ให้ตัวเอง",
  "img": "images/reiju.png",
  "aura": {
   "id": "poison",
   "th": "พิษ",
   "fx": "ring",
   "c1": "#b6ff4d",
   "c2": "#1b2b06"
  },
  "skill": {
   "kind": "drain",
   "name": "พิษ",
   "label": "ดูดพลัง",
   "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
   "mult": 1.0,
   "cd": 2,
   "target": "enemy",
   "aura": "poison",
   "basic": false
  },
  "skills": [
   {
    "kind": "drain",
    "name": "พิษ",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "poison",
    "basic": false
   },
   {
    "kind": "burn",
    "name": "เผาไหม้",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "poison",
    "basic": false
   },
   {
    "kind": "heal",
    "name": "ฮีล",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "poison",
    "basic": false
   }
  ],
  "meta": 75,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "ichiji",
  "name": "Vinsmoke Ichiji",
  "group": "Germa 66",
  "pl": 72,
  "effect": "\"สปาร์คกิ้งเรด\": +6 ถ้าถือ Sanji",
  "img": "images/ichiji.png",
  "aura": {
   "id": "fire",
   "th": "เพลิง",
   "fx": "flame",
   "c1": "#ff8a2b",
   "c2": "#4a1405"
  },
  "skill": {
   "kind": "strike",
   "name": "สปาร์คกิ้งเรด",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "fire",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "สปาร์คกิ้งเรด",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "burn",
    "name": "เผาไหม้",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "fire",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "fire",
    "basic": false
   }
  ],
  "meta": 75,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "niji",
  "name": "Vinsmoke Niji",
  "group": "Germa 66",
  "pl": 72,
  "effect": "\"เด็นจิบลู\": ความเร็ว +5 ถ้าถือ Sanji",
  "img": "images/niji.png",
  "aura": {
   "id": "thunder",
   "th": "สายฟ้า",
   "fx": "lightning",
   "c1": "#7fd6ff",
   "c2": "#0b2740"
  },
  "skill": {
   "kind": "snipe",
   "name": "เด็นจิบลู",
   "label": "เล็งธนู",
   "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
   "mult": 1.1,
   "cd": 2,
   "target": "enemy",
   "aura": "thunder",
   "basic": false
  },
  "skills": [
   {
    "kind": "snipe",
    "name": "เด็นจิบลู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "thunder",
    "basic": false
   },
   {
    "kind": "stun",
    "name": "สะกด",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "thunder",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "thunder",
    "basic": false
   }
  ],
  "meta": 75,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "yonji",
  "name": "Vinsmoke Yonji",
  "group": "Germa 66",
  "pl": 70,
  "effect": "\"วินช์กรีน\": พลังแกร่ง +4 ถ้าถือ Sanji",
  "img": "images/yonji.png",
  "aura": {
   "id": "steel",
   "th": "เหล็กกล้า",
   "fx": "spark",
   "c1": "#c8d3e0",
   "c2": "#1d2733"
  },
  "skill": {
   "kind": "strike",
   "name": "วินช์กรีน",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "steel",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "วินช์กรีน",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "steel",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "steel",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "steel",
    "basic": false
   }
  ],
  "meta": 73,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "kinemon",
  "name": "Kin'emon",
  "group": "วาโนะคุนิ",
  "pl": 68,
  "effect": "\"ฟูกุฟูกุ\": เสื้อผ้าวิเศษ +4 ถ้าถือวาโนะ >=2",
  "img": "images/kinemon.png",
  "aura": {
   "id": "cloth",
   "th": "ฟูกุ ฟูกุ เสื้อผ้า",
   "fx": "ring",
   "c1": "#ffe1a8",
   "c2": "#2f2410"
  },
  "skill": {
   "kind": "guard",
   "name": "ฟูกุฟูกุ",
   "label": "ตั้งการ์ด",
   "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
   "mult": 0.0,
   "cd": 3,
   "target": "ally",
   "aura": "cloth",
   "basic": false
  },
  "skills": [
   {
    "kind": "guard",
    "name": "ฟูกุฟูกุ",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "cloth",
    "basic": false
   },
   {
    "kind": "blade",
    "name": "สิ่งคม",
    "label": "สิ่งคม",
    "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "cloth",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "cloth",
    "basic": false
   }
  ],
  "meta": 72,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "franky",
  "name": "Franky",
  "group": "หมวกฟาง",
  "pl": 63,
  "effect": "\"เจเนอรัลแฟรงกี้\": +8 ถ้าถือหมวกฟาง >=4",
  "img": "images/franky.png",
  "aura": {
   "id": "laser",
   "th": "เทคโนโลยี",
   "fx": "spark",
   "c1": "#8fe3ff",
   "c2": "#10242e"
  },
  "skill": {
   "kind": "heavy",
   "name": "เจเนอรัลแฟรงกี้",
   "label": "ท่าไม้ตาย",
   "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
   "mult": 1.8,
   "cd": 2,
   "target": "enemy",
   "aura": "laser",
   "basic": false
  },
  "skills": [
   {
    "kind": "heavy",
    "name": "เจเนอรัลแฟรงกี้",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "laser",
    "basic": false
   },
   {
    "kind": "snipe",
    "name": "เล็งธนู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "laser",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "laser",
    "basic": false
   }
  ],
  "meta": 66,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "brook",
  "name": "Brook",
  "group": "หมวกฟาง",
  "pl": 61,
  "effect": "\"โยมิโยมิ\": หลบดาเมจ 1 ครั้ง กลับมายืนใหม่ได้",
  "img": "images/brook.png",
  "aura": {
   "id": "ghost",
   "th": "โยมิ โยมิ วิญญาณ",
   "fx": "dark",
   "c1": "#9ad7ff",
   "c2": "#0a1a2a"
  },
  "skill": {
   "kind": "heal",
   "name": "โยมิโยมิ",
   "label": "ฮีล",
   "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
   "mult": 1.4,
   "cd": 2,
   "target": "ally",
   "aura": "ghost",
   "basic": false,
   "passive": {
    "kind": "revive",
    "name": "ไม่ยอมตาย",
    "desc": "เมื่อถูกทำให้หมดสติ ฟื้นกลับมาด้วย HP 30% ได้ 1 ครั้ง"
   }
  },
  "skills": [
   {
    "kind": "heal",
    "name": "โยมิโยมิ",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "ghost",
    "basic": false,
    "passive": {
     "kind": "revive",
     "name": "ไม่ยอมตาย",
     "desc": "เมื่อถูกทำให้หมดสติ ฟื้นกลับมาด้วย HP 30% ได้ 1 ครั้ง"
    }
   },
   {
    "kind": "blade",
    "name": "สิ่งคม",
    "label": "สิ่งคม",
    "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "ghost",
    "basic": false
   },
   {
    "kind": "stun",
    "name": "สะกด",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "ghost",
    "basic": false
   }
  ],
  "meta": 65,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "robin",
  "name": "Nico Robin",
  "group": "หมวกฟาง",
  "pl": 60,
  "effect": "\"โพเนกลีฟ\": ดูพลังรวมทุกคนก่อน แล้ว +8 ให้ตัวเอง",
  "img": "images/robin.png",
  "aura": {
   "id": "flower",
   "th": "โพเนกลีฟ",
   "fx": "ring",
   "c1": "#ffc0e0",
   "c2": "#33152a"
  },
  "skill": {
   "kind": "heal",
   "name": "โพเนกลีฟ",
   "label": "ฮีล",
   "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
   "mult": 1.4,
   "cd": 2,
   "target": "ally",
   "aura": "flower",
   "basic": false
  },
  "skills": [
   {
    "kind": "heal",
    "name": "โพเนกลีฟ",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "flower",
    "basic": false
   },
   {
    "kind": "stun",
    "name": "สะกด",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "flower",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "flower",
    "basic": false
   }
  ],
  "meta": 63,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "momonosuke",
  "name": "Kozuki Momonosuke",
  "group": "วาโนะคุนิ",
  "pl": 60,
  "effect": "\"มังกรวาโนะ\": +10 ถ้าถือ Kozuki Oden",
  "img": "images/momonosuke.png",
  "aura": {
   "id": "beast",
   "th": "อสูรกาย",
   "fx": "flame",
   "c1": "#e06b3a",
   "c2": "#2a1206"
  },
  "skill": {
   "kind": "strike",
   "name": "มังกรวาโนะ",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "beast",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "มังกรวาโนะ",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "burn",
    "name": "เผาไหม้",
    "label": "เผาไหม้",
    "desc": "ดาเมจ 50% + ติดไฟ 3 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "beast",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "beast",
    "basic": false
   }
  ],
  "meta": 63,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "chopper",
  "name": "Tony Tony Chopper",
  "group": "หมวกฟาง",
  "pl": 52,
  "effect": "\"รัมเบิ้ล\": ฮีลพลัง 10 ให้การ์ดหมวกฟาง 1 ใบ",
  "img": "images/chopper.png",
  "aura": {
   "id": "rumble",
   "th": "รัมเบิ้ลบอล",
   "fx": "ring",
   "c1": "#ffa8c0",
   "c2": "#33111e"
  },
  "skill": {
   "kind": "heal",
   "name": "รัมเบิ้ล",
   "label": "ฮีล",
   "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
   "mult": 1.4,
   "cd": 2,
   "target": "ally",
   "aura": "rumble",
   "basic": false
  },
  "skills": [
   {
    "kind": "heal",
    "name": "รัมเบิ้ล",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "rumble",
    "basic": false
   },
   {
    "kind": "rally",
    "name": "ปลุกใจ",
    "label": "ปลุกใจ",
    "desc": "พลังโจมตีตัวเอง +40% นาน 2 เทิร์น · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "self",
    "aura": "rumble",
    "basic": false
   },
   {
    "kind": "heavy",
    "name": "ท่าไม้ตาย",
    "label": "ท่าไม้ตาย",
    "desc": "ดาเมจหนัก 180% · พัก 2 เทิร์น",
    "mult": 1.8,
    "cd": 2,
    "target": "enemy",
    "aura": "rumble",
    "basic": false
   }
  ],
  "meta": 55,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "tashigi",
  "name": "Tashigi",
  "group": "กองทัพเรือ",
  "pl": 50,
  "effect": "\"นักดาบสาว\": +5 ถ้าถือ Smoker",
  "img": "images/tashigi.png",
  "aura": {
   "id": "blade",
   "th": "คมดาบ",
   "fx": "spark",
   "c1": "#dfe9f5",
   "c2": "#20293a"
  },
  "skill": {
   "kind": "strike",
   "name": "นักดาบสาว",
   "label": "โจมตี",
   "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
   "mult": 1.0,
   "cd": 0,
   "target": "enemy",
   "aura": "blade",
   "basic": false
  },
  "skills": [
   {
    "kind": "strike",
    "name": "นักดาบสาว",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "blade",
    "name": "สิ่งคม",
    "label": "สิ่งคม",
    "desc": "ดาเมจ 100% และโจมตีแบบสิ่งเดียวที่ฆ่าได้ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "blade",
    "basic": false
   }
  ],
  "meta": 54,
  "tier": "C",
  "bonus": 4
 },
 {
  "id": "buggy",
  "name": "Buggy",
  "group": "เจ็ดเทพโจรสลัด",
  "pl": 50,
  "effect": "\"สายมู\": ขโมยพลัง 10 จากผู้เล่นที่พลังสูงสุดตอนจบ",
  "img": "images/buggy.png",
  "aura": {
   "id": "blade",
   "th": "คมดาบ",
   "fx": "spark",
   "c1": "#dfe9f5",
   "c2": "#20293a"
  },
  "skill": {
   "kind": "drain",
   "name": "สายมู",
   "label": "ดูดพลัง",
   "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
   "mult": 1.0,
   "cd": 2,
   "target": "enemy",
   "aura": "blade",
   "basic": false
  },
  "skills": [
   {
    "kind": "drain",
    "name": "สายมู",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "strike",
    "name": "โจมตี",
    "label": "โจมตี",
    "desc": "ดาเมจ 100% ของพลังโจมตี · ไม่มีคูลดาวน์",
    "mult": 1.0,
    "cd": 0,
    "target": "enemy",
    "aura": "blade",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "blade",
    "basic": false
   }
  ],
  "meta": 52,
  "tier": "C",
  "bonus": 2
 },
 {
  "id": "usopp",
  "name": "Usopp",
  "group": "หมวกฟาง",
  "pl": 48,
  "effect": "\"ราชาแห่งการโกหก\": หลอกคู่แข่งให้ผ่าน 1 ครั้ง",
  "img": "images/usopp.png",
  "aura": {
   "id": "bullet",
   "th": "กระสุน",
   "fx": "spark",
   "c1": "#ffd27f",
   "c2": "#33260a"
  },
  "skill": {
   "kind": "stun",
   "name": "ราชาแห่งการโกหก",
   "label": "สะกด",
   "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
   "mult": 0.5,
   "cd": 3,
   "target": "enemy",
   "aura": "bullet",
   "basic": false
  },
  "skills": [
   {
    "kind": "stun",
    "name": "ราชาแห่งการโกหก",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "bullet",
    "basic": false
   },
   {
    "kind": "snipe",
    "name": "เล็งธนู",
    "label": "เล็งธนู",
    "desc": "ดาเมจ 110% ทะลุเกราะ (ไม่สนใจโล่) · พัก 2 เทิร์น",
    "mult": 1.1,
    "cd": 2,
    "target": "enemy",
    "aura": "bullet",
    "basic": false
   },
   {
    "kind": "guard",
    "name": "ตั้งการ์ด",
    "label": "ตั้งการ์ด",
    "desc": "ลดดาเมจที่รับ 50% นาน 2 เทิร์น (ใช้กับตัวเองได้) · พัก 3 เทิร์น",
    "mult": 0.0,
    "cd": 3,
    "target": "ally",
    "aura": "bullet",
    "basic": false
   }
  ],
  "meta": 51,
  "tier": "C",
  "bonus": 3
 },
 {
  "id": "nami",
  "name": "Nami",
  "group": "หมวกฟาง",
  "pl": 45,
  "effect": "\"โคโนโคโน\": โจรกรรม เก็บเพิ่ม 15 เงินตอนสรุป",
  "img": "images/nami.png",
  "aura": {
   "id": "weather",
   "th": "สภาพอากาศ",
   "fx": "spark",
   "c1": "#9be6ff",
   "c2": "#0d2a3a"
  },
  "skill": {
   "kind": "drain",
   "name": "โคโนโคโน",
   "label": "ดูดพลัง",
   "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
   "mult": 1.0,
   "cd": 2,
   "target": "enemy",
   "aura": "weather",
   "basic": false
  },
  "skills": [
   {
    "kind": "drain",
    "name": "โคโนโคโน",
    "label": "ดูดพลัง",
    "desc": "ดาเมจ 100% แล้วฮีลตัวเอง 60% ของดาเมจ · พัก 2 เทิร์น",
    "mult": 1.0,
    "cd": 2,
    "target": "enemy",
    "aura": "weather",
    "basic": false
   },
   {
    "kind": "stun",
    "name": "สะกด",
    "label": "สะกด",
    "desc": "ดาเมจ 50% + เป้าหมายข้ามเทิร์นถัดไป · พัก 3 เทิร์น",
    "mult": 0.5,
    "cd": 3,
    "target": "enemy",
    "aura": "weather",
    "basic": false
   },
   {
    "kind": "heal",
    "name": "ฮีล",
    "label": "ฮีล",
    "desc": "ฟื้น HP ให้ตัวเองหรือเพื่อน 140% ของพลังโจมตี · พัก 2 เทิร์น",
    "mult": 1.4,
    "cd": 2,
    "target": "ally",
    "aura": "weather",
    "basic": false
   }
  ],
  "meta": 48,
  "tier": "C",
  "bonus": 3
 }
];
