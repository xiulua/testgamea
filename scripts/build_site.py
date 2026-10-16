#!/usr/bin/env python3
"""สร้าง index.html (gallery + พิมพ์การ์ด) จาก data/characters.json"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(ROOT, "data", "characters.json"), encoding="utf-8") as f:
    chars = json.load(f)

DATA_JSON = json.dumps(chars, ensure_ascii=False)

HTML = r"""<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>ONE PIECE — ชุดการ์ดประมูลตัวละคร</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;800&family=Pirata+One&display=swap" rel="stylesheet" />
<style>
  :root{
    --navy:#0a1626; --navy2:#122239; --gold:#f2c14e; --gold2:#c9922b;
    --parch:#f7f1e1; --ink:#1a1a1a; --red:#d7263d;
  }
  *{box-sizing:border-box}
  body{
    margin:0; font-family:'Kanit',system-ui,-apple-system,"Segoe UI",sans-serif;
    background:radial-gradient(circle at 20% 0%, #16324f 0%, var(--navy) 55%, #050b14 100%);
    color:#eaf1f8; min-height:100vh;
  }
  header{
    padding:26px 20px 14px; text-align:center;
    border-bottom:2px solid rgba(242,193,78,.35);
    background:linear-gradient(180deg, rgba(242,193,78,.10), transparent);
  }
  h1{font-family:'Pirata One',cursive; margin:0; font-size:clamp(30px,5vw,52px);
     letter-spacing:2px; color:var(--gold); text-shadow:0 2px 0 #7a5410, 0 0 22px rgba(242,193,78,.35)}
  .sub{opacity:.8; margin-top:6px; font-size:14px}
  .stats{display:flex; gap:18px; justify-content:center; flex-wrap:wrap; margin-top:12px; font-size:13px}
  .stats b{color:var(--gold); font-size:16px}
  .controls{
    position:sticky; top:0; z-index:20; backdrop-filter:blur(10px);
    background:rgba(10,22,38,.88); border-bottom:1px solid rgba(242,193,78,.2);
    padding:12px 16px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; justify-content:center;
  }
  #search{
    background:#0e1c30; border:1px solid rgba(242,193,78,.4); color:#fff;
    border-radius:10px; padding:9px 14px; font-family:inherit; font-size:14px; min-width:210px; outline:none;
  }
  #search:focus{border-color:var(--gold); box-shadow:0 0 0 3px rgba(242,193,78,.15)}
  .tabs{display:flex; flex-wrap:wrap; gap:7px; justify-content:center}
  .tab{
    background:#0e1c30; color:#cfe0f2; border:1px solid rgba(255,255,255,.14);
    border-radius:999px; padding:7px 13px; font-size:12.5px; cursor:pointer; font-family:inherit; transition:.15s;
  }
  .tab:hover{border-color:var(--gold); color:#fff}
  .tab.active{background:var(--gold); color:#20303f; border-color:var(--gold); font-weight:600}
  .btn{
    background:linear-gradient(180deg,var(--gold),var(--gold2)); color:#2a1e05; border:0;
    border-radius:10px; padding:9px 16px; font-weight:600; cursor:pointer; font-family:inherit; font-size:13.5px;
  }
  .btn.ghost{background:transparent; color:var(--gold); border:1px solid var(--gold)}
  .sortsel{background:#0e1c30;border:1px solid rgba(242,193,78,.4);color:#fff;border-radius:10px;padding:9px;font-family:inherit;font-size:13px}
  main{padding:22px clamp(12px,3vw,40px) 60px; max-width:1500px; margin:0 auto}
  .grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:18px}
  .card{
    position:relative; background:linear-gradient(180deg,#14263d,#0c1727);
    border:2px solid rgba(242,193,78,.5); border-radius:16px; overflow:hidden;
    box-shadow:0 10px 24px rgba(0,0,0,.45); transition:transform .18s, box-shadow .18s;
    display:flex; flex-direction:column; cursor:pointer;
  }
  .card:hover{transform:translateY(-6px); box-shadow:0 18px 34px rgba(0,0,0,.6), 0 0 0 2px var(--gold) inset}
  .imgwrap{position:relative; aspect-ratio:5/6; overflow:hidden; background:#0a1420}
  .imgwrap img{width:100%; height:100%; object-fit:cover; object-position:top center; display:block}
  .pl{
    position:absolute; top:8px; right:8px; width:52px; height:52px; border-radius:50%;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    font-weight:800; line-height:1; color:#fff; border:2px solid rgba(255,255,255,.85);
    box-shadow:0 4px 12px rgba(0,0,0,.5);
  }
  .pl small{font-size:9px; font-weight:600; opacity:.9; letter-spacing:.5px}
  .pl span{font-size:19px}
  .tier-Sp{background:radial-gradient(circle at 35% 30%,#ff5f6d,#a4020f)}
  .tier-S{background:radial-gradient(circle at 35% 30%,#ff9f43,#c1440e)}
  .tier-A{background:radial-gradient(circle at 35% 30%,#a06bff,#5b2a9e)}
  .tier-B{background:radial-gradient(circle at 35% 30%,#4aa3ff,#12447e)}
  .tier-C{background:radial-gradient(circle at 35% 30%,#3ecf8e,#146b46)}
  .tier-D{background:radial-gradient(circle at 35% 30%,#8fa3b8,#3c4a5a)}
  .body{padding:10px 12px 13px; display:flex; flex-direction:column; gap:6px; flex:1}
  .name{font-weight:600; font-size:15px; color:#fff; line-height:1.2}
  .group{font-size:11px; color:var(--gold); opacity:.95}
  .effect{font-size:11.5px; color:#bcd0e6; line-height:1.45; flex:1}
  .pricerow{display:flex; align-items:center; justify-content:space-between; border-top:1px dashed rgba(255,255,255,.16); padding-top:7px; margin-top:2px}
  .price{font-size:12.5px; color:#ffd97a; font-weight:600}
  .price b{font-size:15px}
  .money{font-size:11px; color:#7f96ad}
  /* modal */
  #modal{position:fixed; inset:0; background:rgba(3,8,15,.85); display:none; align-items:center; justify-content:center; z-index:50; padding:20px}
  #modal.open{display:flex}
  .mcard{background:linear-gradient(180deg,#16283f,#0b1524); border:2px solid var(--gold); border-radius:20px; max-width:760px; width:100%; display:grid; grid-template-columns:1fr 1fr; overflow:hidden; box-shadow:0 30px 70px rgba(0,0,0,.7)}
  .mcard img{width:100%; height:100%; object-fit:cover; object-position:top center; max-height:70vh}
  .mtext{padding:24px; display:flex; flex-direction:column; gap:10px}
  .mtext h2{margin:0; font-family:'Pirata One',cursive; font-size:34px; color:var(--gold); letter-spacing:1px}
  .mtext .g{color:var(--gold); font-size:13px}
  .mtext .eff{background:rgba(242,193,78,.09); border-left:3px solid var(--gold); padding:10px 12px; border-radius:8px; font-size:13.5px; line-height:1.5; color:#dfeaf6}
  .close{align-self:flex-start; margin-top:auto}
  .plbig{font-size:44px; font-weight:800; color:#fff}
  footer{text-align:center; padding:26px; font-size:11.5px; color:#6f8296}
  @media(max-width:560px){.mcard{grid-template-columns:1fr}.mcard img{max-height:38vh}}
  @media print{
    body{background:#fff; color:#000}
    header,.controls,footer{display:none!important}
    main{padding:0; max-width:none}
    .grid{grid-template-columns:repeat(3,1fr); gap:8px}
    .card{break-inside:avoid; border-color:#333; box-shadow:none; background:#fff; color:#000}
    .name{color:#000}.effect{color:#333}.group{color:#a4700f}
    .card:hover{transform:none}
  }
</style>
</head>
<body>
<header>
  <h1>ONE PIECE — AUCTION WAR</h1>
  <div class="sub">ชุดการ์ดประมูลตัวละคร · พร้อมภาพและเอฟเฟคการ์ดต่อสู้</div>
  <div class="stats">
    <div>การ์ดทั้งหมด <b id="cnt">0</b> ใบ</div>
    <div>พลังรวมทั้งกอง <b id="sum">0</b></div>
    <div>กลุ่มทั้งหมด <b id="grp">0</b></div>
  </div>
</header>

<div class="controls">
  <input id="search" placeholder="🔍 ค้นหาชื่อตัวละคร..." />
  <select id="sort" class="sortsel">
    <option value="pl-desc">พลัง: มาก → น้อย</option>
    <option value="pl-asc">พลัง: น้อย → มาก</option>
    <option value="name">ชื่อ (ก-ฮ / A-Z)</option>
    <option value="group">ตามกลุ่ม</option>
  </select>
  <div class="tabs" id="tabs"></div>
  <button class="btn" onclick="window.print()">🖨️ พิมพ์การ์ด</button>
</div>

<main><div class="grid" id="grid"></div></main>

<div id="modal" onclick="if(event.target===this)closeModal()">
  <div class="mcard">
    <img id="mimg" alt="" />
    <div class="mtext">
      <h2 id="mname"></h2>
      <div class="g" id="mgroup"></div>
      <div class="eff" id="meffect"></div>
      <div style="display:flex;gap:22px;align-items:flex-end">
        <div><div class="money">พลัง (PL)</div><div class="plbig" id="mpl"></div></div>
        <div><div class="money">ราคาเริ่มประมูล</div><div class="plbig" id="mprice"></div></div>
      </div>
      <button class="btn ghost close" onclick="closeModal()">ปิด</button>
    </div>
  </div>
</div>

<footer>
  ภาพและตัวละคร © Eiichiro Oda / Shueisha / Toei Animation · ใช้สำหรับเล่นส่วนตัวเท่านั้น
</footer>

<script id="chardata" type="application/json">__DATA__</script>
<script>
const CHARS = JSON.parse(document.getElementById('chardata').textContent);
const grid = document.getElementById('grid');
const tabsEl = document.getElementById('tabs');
const searchEl = document.getElementById('search');
const sortEl = document.getElementById('sort');
let activeGroup = 'ALL';

const GROUPS = [...new Set(CHARS.map(c => c.group))].sort((a,b)=>a.localeCompare(b,'th'));

function tier(pl){
  if(pl>=95) return ['Sp','S+'];
  if(pl>=90) return ['S','S'];
  if(pl>=82) return ['A','A'];
  if(pl>=70) return ['B','B'];
  if(pl>=50) return ['C','C'];
  return ['D','D'];
}
const priceOf = pl => Math.ceil(pl/2/5)*5;

function renderTabs(){
  const all=['ALL',...GROUPS];
  tabsEl.innerHTML = all.map(g=>{
    const label = g==='ALL'?'ทั้งหมด':g;
    const n = g==='ALL'?CHARS.length:CHARS.filter(c=>c.group===g).length;
    return `<button class="tab ${g===activeGroup?'active':''}" data-g="${g}">${label} (${n})</button>`;
  }).join('');
  tabsEl.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{activeGroup=b.dataset.g; renderTabs(); render();});
}

function current(){
  let list = CHARS.filter(c=>c.group===activeGroup || activeGroup==='ALL');
  const q = searchEl.value.trim().toLowerCase();
  if(q) list = list.filter(c=>c.name.toLowerCase().includes(q)||c.group.toLowerCase().includes(q));
  const s = sortEl.value;
  list = [...list];
  if(s==='pl-desc') list.sort((a,b)=>b.pl-a.pl);
  else if(s==='pl-asc') list.sort((a,b)=>a.pl-b.pl);
  else if(s==='name') list.sort((a,b)=>a.name.localeCompare(b.name,'th'));
  else if(s==='group') list.sort((a,b)=>a.group.localeCompare(b.group,'th')||b.pl-a.pl);
  return list;
}

function render(){
  const list = current();
  grid.innerHTML = list.map(c=>{
    const [cls,label]=tier(c.pl);
    const img = c.img ? c.img : '';
    return `<div class="card" onclick="openModal('${c.id}')">
      <div class="imgwrap">
        <img src="${img}" alt="${c.name}" loading="lazy" onerror="this.style.display='none'"/>
        <div class="pl tier-${cls}"><small>${label}</small><span>${c.pl}</span></div>
      </div>
      <div class="body">
        <div class="name">${c.name}</div>
        <div class="group">${c.group}</div>
        <div class="effect">${c.effect}</div>
        <div class="pricerow">
          <div class="price">ราคาเริ่ม <b>${priceOf(c.pl)}</b></div>
          <div class="money">Belly</div>
        </div>
      </div>
    </div>`;
  }).join('');
  grid.innerHTML = list.length ? grid.innerHTML
    : '<div style="padding:40px;color:#7f96ad">ไม่พบตัวละครที่ค้นหา</div>';
}

function openModal(id){
  const c = CHARS.find(x=>x.id===id); if(!c) return;
  document.getElementById('mimg').src = c.img||'';
  document.getElementById('mname').textContent = c.name;
  document.getElementById('mgroup').textContent = c.group;
  document.getElementById('meffect').textContent = c.effect;
  document.getElementById('mpl').textContent = c.pl;
  document.getElementById('mprice').textContent = priceOf(c.pl);
  document.getElementById('modal').classList.add('open');
}
function closeModal(){document.getElementById('modal').classList.remove('open');}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
searchEl.addEventListener('input',render);
sortEl.addEventListener('change',render);

document.getElementById('cnt').textContent = CHARS.length;
document.getElementById('sum').textContent = CHARS.reduce((a,c)=>a+c.pl,0);
document.getElementById('grp').textContent = GROUPS.length;
renderTabs(); render();
</script>
</body>
</html>
"""

html = HTML.replace("__DATA__", DATA_JSON)
with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as f:
    f.write(html)
print("เขียน index.html สำเร็จ (%d ตัวละคร)" % len(chars))
