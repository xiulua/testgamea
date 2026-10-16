(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const LS = "op_auction_v1";
  const POLL_MS = 800; // ถึงตาเรา → ซิงก์ถี่ให้ทันใจ
  const WATCH_MS = 1800; // รอคนอื่นเล่น → ซิงก์ห่าง ๆ (โควตาเว็บนี้ 10,000 คำขอ/วัน)
  const isHidden = () => typeof document.hidden === "boolean" && document.hidden;
  const S = {
    code: null, playerId: null, token: null, state: null,
    timer: null, inflight: false, busy: false, rendered: -1,
  };
  // เลือกการ์ด/สกิลในหน้าต่อสู้ (เก็บไว้ฝั่งไคลเอนต์ เพื่อไม่ให้หลุดตอน re-render)
  const PICK = { fighter: null, skill: null };
  const queue = []; // คำสั่งที่รอส่ง — กดรัว ๆ ไม่หาย

  /* ------------------- เมนูหน้าแรก: ดูการ์ด / วิธีเล่น -------------------
     NAV.page = home | game | cards | help
     อยู่ในห้องเกมแล้วระบบจะสลับไปหน้า game ให้เอง
  ------------------------------------------------------------------- */
  const NAV = {
    page: "home",
    data: null, loading: false, error: null,
    q: "", group: "", aura: "", tier: "", sort: "meta", pick: null,
  };
  const TIER_ORDER = "SABC";

  /* ------------------------- ออร่าประจำตัว -------------------------
     การ์ดแต่ละใบมีออร่าของตัวเอง (ฮาคิราชันย์ = กรอบแดง-สายฟ้าดำ,
     น้ำแข็ง = กรอบฟ้า-เกล็ดน้ำแข็ง, เพลิง = เปลวไฟ, ความมืด = ม่วง-ดำ ...)
     ตอนโดนตีการ์ดฝั่งตรงข้ามจะสว่างตามออร่านั้นและมีเลขดาเมจลอย
  ------------------------------------------------------------------ */
  const fxOf = (a) => (a && a.fx ? a.fx : "ring");
  function auraClass(a) {
    return a ? ` aura fx-${esc(a.fx || "ring")}` : "";
  }
  function auraStyle(a) {
    return a ? ` style="--au:${esc(a.c1)};--au2:${esc(a.c2)}"` : "";
  }
  function auraBadge(a) {
    return a ? `<span class="bd aurabd" title="ออร่าประจำตัว: ${esc(a.th)}">◎ ${esc(a.th)}</span>` : "";
  }
  /** รายการสกิลทั้งหมดของการ์ดใบหนึ่ง (รองรับข้อมูลเก่าที่มีสกิลเดียว) */
  function skillsOf(f) {
    if (!f) return [];
    return Array.isArray(f.skills) && f.skills.length ? f.skills : f.skill ? [f.skill] : [];
  }
  function skOf(f, kind) {
    return skillsOf(f).find((s) => s.kind === kind) || null;
  }
  function cdOf(f, sk) {
    if (typeof sk.cdLeft === "number") return sk.cdLeft;
    return f && sk === f.skill ? f.cd || 0 : 0;
  }

  /* ------------------------- เอฟเฟคตอนตี -------------------------
     เซิร์ฟเวอร์ส่งเหตุการณ์การลงมือมา (battle.fx) ทุกเครื่องจึงเห็นเหมือนกัน
     เก็บ id ล่าสุดไว้ เพื่อไม่ให้เล่นซ้ำเหตุการณ์เก่าตอน re-render
  ---------------------------------------------------------------- */
  const FXSEEN = { id: 0 };
  function fxLayer() {
    if (typeof document.querySelector !== "function") return null;
    const el = document.getElementById("fx");
    if (!el || typeof el.appendChild !== "function") return null;
    return el;
  }
  function fxNode(node, aura, small) {
    const el = document.createElement("div");
    el.className = `fxfx fxk-${fxOf(aura)}${small ? " sm" : ""}`;
    if (aura) { el.style.setProperty("--au", aura.c1); el.style.setProperty("--au2", aura.c2); }
    return el;
  }
  function playFx() {
    const st = S.state;
    const b = st && st.battle;
    if (!b || !Array.isArray(b.fx) || !b.fx.length || b.result) return;
    const maxId = b.fx[b.fx.length - 1].id;
    const fresh = b.fx.filter((e) => e.id > FXSEEN.id);
    if (!fresh.length) { FXSEEN.id = maxId; return; }
    FXSEEN.id = maxId;
    const layer = fxLayer();
    if (!layer) return;
    // เล่นเฉพาะเหตุการณ์ใหม่ล่าสุด 2 อัน (กันหน้าจอรก ตอนตามคนอื่นทัน)
    for (const ev of fresh.slice(-2)) showFx(ev, layer);
  }
  function showFx(ev, layer) {
    const aura = ev.aura || null;
    const banner = document.createElement("div");
    banner.className = `fxbanner fxk-${fxOf(aura)}`;
    if (aura) { banner.style.setProperty("--au", aura.c1); banner.style.setProperty("--au2", aura.c2); }
    const hits = (ev.targets || []).filter((t) => t.dmg > 0 || t.ko);
    const hitTxt = hits
      .map((t) => `${t.name} ${t.tag === "heal" ? "+" : "-"}${t.dmg}` +
        `${t.stun ? " 💫" : ""}${t.burn ? " 🔥" : ""}${t.ko ? " 💀" : ""}`)
      .join(" · ");
    banner.innerHTML =
      `<b>${esc(ev.owner || "")}</b> ใช้ <b>${esc(ev.skill || "")}</b>` +
      (hitTxt ? ` <span class="fxdmg">${esc(hitTxt)}</span>` : "") +
      (ev.pname ? ` <small>(${esc(ev.pname)})</small>` : "");
    layer.appendChild(banner);
    setTimeout(() => banner.remove(), 2800);

    for (const t of ev.targets || []) {
      const node = document.querySelector(`.fighter[data-cid="${t.cid}"][data-pid="${t.pid}"]`);
      if (!node) continue;
      node.classList.add("behit", `fxk-${fxOf(t.aura)}`);
      if (t.aura) { node.style.setProperty("--au", t.aura.c1); node.style.setProperty("--au2", t.aura.c2); }
      setTimeout(() => node.classList.remove("behit", `fxk-${fxOf(t.aura)}`), 1300);
      // ลูกศรจากผู้โจมตีไปยังเป้าหมาย (เห็นได้ทุกคนพร้อมกัน)
      const fromNode =
        ev.ownerCid && ev.pid
          ? document.querySelector(`.fighter[data-cid="${ev.ownerCid}"][data-pid="${ev.pid}"]`)
          : null;
      if (fromNode && typeof fromNode.getBoundingClientRect === "function") {
        const a = fromNode.getBoundingClientRect();
        const b2 = node.getBoundingClientRect();
        const dx = b2.left + b2.width / 2 - (a.left + a.width / 2);
        const dy = b2.top + b2.height / 2 - (a.top + a.height / 2);
        const len = Math.sqrt(dx * dx + dy * dy);
        const arrow = fxNode(null, t.aura, true);
        arrow.classList.add("fxarrow");
        arrow.style.left = a.left + a.width / 2 + "px";
        arrow.style.top = a.top + a.height / 2 + "px";
        arrow.style.width = Math.max(12, len - 34) + "px";
        arrow.style.transform = `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI}deg)`;
        layer.appendChild(arrow);
        setTimeout(() => arrow.remove(), 900);
      }
      if (t.dmg > 0 || t.ko) {
        const float = fxNode(null, t.aura, false);
        float.classList.add("fxdmgfloat");
        float.innerHTML = `<b>${t.tag === "heal" ? "+" : "-"}${t.dmg}</b>${t.ko ? "<i>K.O.</i>" : ""}`;
        const rect = node.getBoundingClientRect ? node.getBoundingClientRect() : null;
        float.style.left = rect ? rect.left + rect.width * 0.5 + "px" : "50%";
        float.style.top = rect ? rect.top + 18 + "px" : "30%";
        layer.appendChild(float);
        setTimeout(() => float.remove(), 1500);
      }
    }
  }

  /* ------------------------- session ------------------------- */
  function saveSession() {
    if (!S.code) return localStorage.removeItem(LS);
    localStorage.setItem(LS, JSON.stringify({ code: S.code, playerId: S.playerId, token: S.token }));
  }
  function loadSession() {
    try { return JSON.parse(localStorage.getItem(LS) || "null"); } catch { return null; }
  }
  function clearSession() {
    localStorage.removeItem(LS);
    S.code = S.playerId = S.token = S.state = null;
    S.rendered = -1;
    queue.length = 0;
    PICK.fighter = PICK.skill = null;
    FXSEEN.id = 0;
    stopPoll();
    render();
  }

  /* ------------------------- helpers ------------------------- */
  let toastTimer = null;
  function toast(msg, ok) {
    const t = $("toast");
    t.textContent = msg;
    t.className = "toast" + (ok ? " ok" : "");
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 2800);
  }

  async function api(path, body) {
    const r = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body || {}),
    });
    let d = {};
    try { d = await r.json(); } catch { /* ignore */ }
    if (!r.ok) {
      const e = new Error(d.error || "HTTP " + r.status);
      e.status = r.status;
      throw e;
    }
    return d;
  }

  /* ------------------------- state merge -------------------------
     ⚠️ หัวใจของความเสถียร: คำตอบที่มาถึงช้ากว่าต้องไม่ย้อนกลับไปแสดงสถานะเก่า
     (เดิมคำขอ sync ที่ค้างอยู่อาจมาถึงหลังคำสั่งบิด ทำให้สิ่งที่เพิ่งกด "หายไป")
  ---------------------------------------------------------------- */
  function isStale(next) {
    if (typeof next.version !== "number") return false;
    if (!S.state || typeof S.state.version !== "number") return false;
    return next.version < S.state.version;
  }

  function applyState(state) {
    if (!state) return;
    if (isStale(state)) return; // คำตอบเก่า — ทิ้ง
    const changed = !S.state || state.version !== S.state.version;
    S.state = state;
    if (changed || state.version !== S.rendered) { render(); playFx(); }
    else { updateTop(); updatePresence(state); }
  }

  /* ------------------------- polling -------------------------
     ปล่อยแท็บไว้ในพื้นหลัง → ไม่ยิงคำขอเลย (ไม่กินโควตา) และซิงก์ทันทีที่เปิดกลับ
  ---------------------------------------------------------------- */
  function pollDelay() {
    const st = S.state;
    if (!st) return WATCH_MS;
    const mine =
      (st.phase === "auction" && st.turn === S.playerId) ||
      (st.phase === "battle" && st.battle && st.battle.turn === S.playerId);
    return mine ? POLL_MS : WATCH_MS;
  }
  function startPoll() {
    stopPoll();
    schedulePoll();
  }
  function stopPoll() {
    if (S.timer) clearTimeout(S.timer);
    S.timer = null;
  }
  function schedulePoll() {
    if (S.timer) clearTimeout(S.timer);
    S.timer = null;
    if (!S.code || isHidden()) return;
    S.timer = setTimeout(async () => {
      try { await pollOnce(); } finally { schedulePoll(); }
    }, pollDelay());
  }
  function onVisible() {
    if (!S.code || isHidden()) return;
    if (S.timer) clearTimeout(S.timer);
    S.timer = null;
    pollOnce().then(schedulePoll);
  }
  async function syncNow() {
    if (!S.code) return null;
    try {
      const d = await api(`/api/rooms/${S.code}/sync`, { playerId: S.playerId, token: S.token });
      applyState(d.state);
      return d.state;
    } catch (e) {
      if (e.status === 401 || e.status === 404) { toast(e.message); clearSession(); }
      return null;
    }
  }
  async function pollOnce() {
    if (!S.code || S.inflight || S.busy) return;
    S.inflight = true;
    try { await syncNow(); } finally { S.inflight = false; }
  }

  /* ------------------------- action queue -------------------------
     กดรัว/กดซ้ำไม่หาย: คำสั่งเข้าคิวแล้วส่งทีละอัน
     ถ้าล้มเพราะสถานะฝั่งเราเก่า (เทิร์นขยับ/มีคนแก้พร้อมกัน) จะ sync ใหม่และลองเอง
  ------------------------------------------------------------------ */
  function setBusy(extra) {
    const n = queue.length + (extra || 0);
    const el = $("tBusy");
    if (!el) return;
    el.hidden = n === 0;
    el.textContent = n > 1 ? `⏳ กำลังส่ง ${n} คำสั่ง…` : "⏳ กำลังส่ง…";
  }

  function act(type, payload) {
    queue.push({ type, payload, tries: 0 });
    setBusy();
    drain();
  }

  async function drain() {
    if (S.busy) return;
    S.busy = true;
    setBusy();
    try {
      while (queue.length) {
        const job = queue[0];
        job.tries += 1;
        const res = await sendAction(job, job.tries >= 2);
        if (res.ok) { queue.shift(); applyState(res.state); }
        else if (res.retry) { await sleep(150 + Math.random() * 250); }
        else {
          queue.shift();
          toast(res.error);
          if (res.status === 401) clearSession();
        }
        setBusy();
      }
    } finally {
      S.busy = false;
      setBusy();
      if (!isHidden()) setTimeout(pollOnce, 60); // ดึงสถานะล่าสุดทันทีหลังส่งเสร็จ
    }
  }

  async function sendAction(job, alreadyRetried) {
    try {
      const d = await api(`/api/rooms/${S.code}/action`, {
        playerId: S.playerId, token: S.token, action: { type: job.type, payload: job.payload },
      });
      return { ok: true, state: d.state };
    } catch (e) {
      if (e.status === 401) return { error: e.message, status: 401 };
      const stale = e.status === 409 || /ยังไม่ถึงเทิร์น|มีการแก้ไขพร้อมกัน/.test(e.message || "");
      if (stale && !alreadyRetried) {
        await syncNow(); // สถานะฝั่งเราเก่า → อัปเดตแล้วลองส่งซ้ำเอง (ไม่ต้องให้ผู้ใช้กดใหม่)
        return { retry: true };
      }
      return { error: e.message, status: e.status };
    }
  }

  /* ------------------------- render -------------------------
     ห้าม re-render แทน DOM ระหว่างที่นิ้ว/เมาส์ยังกดอยู่
     (เดิมปุ่มถูกสร้างใหม่กลางทาง ทำให้ click ไม่เกิด → "กดแล้วไม่ขึ้น ต้องกดใหม่")
  ------------------------------------------------------------- */
  let pressing = false;
  let renderPending = false;
  let pressTimer = null;

  function render() {
    if (pressing) { renderPending = true; return; }
    renderNow();
  }
  function flushRender() {
    if (renderPending) { renderPending = false; renderNow(); }
  }
  function watchClicks() {
    document.addEventListener("pointerdown", (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("#game")) {
        pressing = true;
        clearTimeout(pressTimer);
        pressTimer = setTimeout(() => { pressing = false; flushRender(); }, 1500);
      }
    }, true);
    const release = () => {
      if (!pressing) return;
      pressing = false;
      clearTimeout(pressTimer);
      setTimeout(flushRender, 0);
    };
    document.addEventListener("pointerup", release, true);
    document.addEventListener("pointercancel", release, true);
  }

  function setScreen(name) {
    $("home").hidden = name !== "home";
    $("cards").hidden = name !== "cards";
    $("help").hidden = name !== "help";
    $("game").hidden = name !== "game";
    $("topMeta").hidden = name !== "game";
    renderNav(name);
  }

  /** เมนูบนสุด: อยู่ในห้องแล้วจะเห็น “ห้องของฉัน” แทน “หน้าแรก” */
  function renderNav(name) {
    const inRoom = !!(S.code && S.state);
    const home = $("navHome");
    const game = $("navGame");
    if (home) home.hidden = inRoom;
    if (game) game.hidden = !inRoom;
    [["navHome", "home"], ["navGame", "game"], ["navCards", "cards"], ["navHelp", "help"]]
      .forEach(([id, page]) => {
        const b = $(id);
        if (b) b.classList.toggle("on", name === page);
      });
  }

  function updateTop() {
    const st = S.state;
    if (!st) return;
    const me = st.players.find((p) => p.id === S.playerId);
    $("tMoney").innerHTML = "💰 <b>" + (me ? me.money : 0) + "</b>";
    const total = st.totalCards || st.settings.cardCount;
    const per = st.settings.cardsPerPlayer || 0;
    $("tRound").textContent =
      st.phase === "lobby" ? "รอเริ่ม"
      : st.phase === "auction" ? `ประมูล ${Math.min(st.round, total)}/${total}${per ? ` · คนละ ${per} ใบ` : ""}`
      : st.phase === "battle" && st.battle ? `เทิร์น ${Math.min(st.battle.turns, st.battle.maxTurns)}/${st.battle.maxTurns}`
      : "จบเกม";
  }

  function updatePresence(state) {
    const map = new Map(state.players.map((p) => [p.id, !!p.online]));
    document.querySelectorAll("[data-pdot]").forEach((el) => {
      el.classList.toggle("on", !!map.get(el.getAttribute("data-pdot")));
    });
  }

  function renderNow() {
    const st = S.state;
    if (S.code && st && NAV.page === "home") NAV.page = "game";
    if (!S.code || !st) {
      if (NAV.page === "game") NAV.page = "home";
      if (NAV.page === "cards") { setScreen("cards"); renderCards(); return; }
      if (NAV.page === "help") { setScreen("help"); renderHelp(); return; }
      setScreen("home");
      return;
    }
    if (NAV.page === "cards") { setScreen("cards"); renderCards(); return; }
    if (NAV.page === "help") { setScreen("help"); renderHelp(); return; }
    setScreen("game");
    S.rendered = st.version;

    const ae = document.activeElement;
    let keep = null;
    if (ae && ae.tagName === "INPUT" && ae.id && $("game").contains(ae)) {
      keep = { id: ae.id, value: ae.value, s: ae.selectionStart, e: ae.selectionEnd };
    }

    $("tCode").textContent = S.code;
    updateTop();

    const game = $("game");
    if (st.phase === "lobby") game.innerHTML = lobbyHTML(st);
    else if (st.phase === "auction") game.innerHTML = auctionHTML(st);
    else if (st.phase === "battle") game.innerHTML = battleHTML(st);
    else game.innerHTML = resultHTML(st);

    if (keep) {
      const el = $(keep.id);
      if (el) {
        el.value = keep.value;
        try { el.focus({ preventScroll: true }); el.setSelectionRange(keep.s, keep.e); } catch { /* ignore */ }
      }
    }
    updatePresence(st);
  }

  /* ---- ดูการ์ดทั้งหมด & เมต้า ---- */
  function auraTagHTML(a, small) {
    if (!a) return "";
    return `<span class="alg fxk-${esc(a.fx)}${small ? " sm" : ""}"${auraStyle(a)}>${esc(a.th)}</span>`;
  }

  async function loadCards() {
    if (NAV.data || NAV.loading) return NAV.data;
    NAV.loading = true;
    try {
      const r = await fetch("/api/cards");
      if (!r.ok) throw new Error("HTTP " + r.status);
      NAV.data = await r.json();
      NAV.error = null;
    } catch (e) {
      NAV.error = "โหลดข้อมูลการ์ดไม่สำเร็จ (";
      NAV.error += "" + (e && e.message ? e.message : e) + ")";
    } finally {
      NAV.loading = false;
    }
    return NAV.data;
  }

  /** การ์ดใบนี้ผ่านตัวกรองไหม (ค้นหาชื่อ/เอฟเฟค/ชื่อสกิลได้) */
  function cardMatches(c, f) {
    if (f.group && c.group !== f.group) return false;
    if (f.aura && (!c.aura || c.aura.id !== f.aura)) return false;
    if (f.tier && c.tier !== f.tier) return false;
    const q = (f.q || "").trim().toLowerCase();
    if (q) {
      const hay = [
        c.name, c.group, c.effect, c.aura ? c.aura.th : "", "PL " + c.pl, c.tier,
        ...c.skills.map((s) => s.name + " " + s.label + " " + s.kind + " " + s.desc),
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }
  const filterCards = (cards, f) => cards.filter((c) => cardMatches(c, f));

  function sortCards(cards, sort) {
    const a = [...cards];
    if (sort === "pl") a.sort((x, y) => y.pl - x.pl || y.meta - x.meta);
    else if (sort === "tier")
      a.sort((x, y) => TIER_ORDER.indexOf(x.tier) - TIER_ORDER.indexOf(y.tier) || y.meta - x.meta);
    else if (sort === "name") a.sort((x, y) => x.name.localeCompare(y.name));
    else a.sort((x, y) => y.meta - x.meta || y.pl - x.pl);
    return a;
  }

  function cardTileHTML(c) {
    return `<button class="ctile fx-${esc(c.aura ? c.aura.fx : "ring")}"${auraStyle(c.aura)} data-cards-act="pick" data-id="${esc(c.id)}">
      <img src="${esc(c.img)}" alt="${esc(c.name)}" loading="lazy">
      <span class="ctier t-${esc(c.tier)}">${esc(c.tier)}</span>
      <span class="cpl">PL ${c.pl}</span>
      <span class="cname">${esc(c.name)}</span>
      <span class="cgroup">${esc(c.group)}</span>
      <span class="cmeta">เมต้า <b>${c.meta}</b></span>
    </button>`;
  }

  function cardDetailHTML(c) {
    const skills = c.skills
      .map(
        (s) => `<li><b>${esc(s.name)}</b> · ${esc(s.label)}
          <small>${esc(s.desc)}${s.cd > 0 ? ` · พัก ${s.cd} เทิร์น` : " · ไม่มีคูลดาวน์"}</small></li>`
      )
      .join("");
    return `<div class="box cdetail"${auraStyle(c.aura)}>
      <button class="btn tiny ghost cclose" data-cards-act="close">✕ ปิด</button>
      <div class="cdhead">
        <img src="${esc(c.img)}" alt="${esc(c.name)}" loading="lazy">
        <div class="cdinfo">
          <div class="cdname">${esc(c.name)} <span class="ctier t-${esc(c.tier)}">${esc(c.tier)}</span></div>
          <div class="cdgroup">${esc(c.group)} · PL ${c.pl} · คะแนนเมต้า <b>${c.meta}</b> (PL ${c.pl} + โบนัสสกิล ${c.bonus})</div>
          <div class="cdeff">${esc(c.effect)}</div>
          <div class="cdaura">${auraTagHTML(c.aura)} <span class="dimtext">ออร่านี้คือสีกรอบการ์ดและเอฟเฟคตอนโดนตี</span></div>
          ${c.passive ? `<div class="cdpass">✨ ${esc(c.passive.name)} — ${esc(c.passive.desc)}</div>` : ""}
        </div>
      </div>
      <h4>สกิลทั้งหมด (${c.skills.length} ท่า — ใช้ได้ทุกท่าในด่านต่อสู้)</h4>
      <ul class="cdskills">${skills}</ul>
    </div>`;
  }

  function cardsGridHTML() {
    const d = NAV.data;
    if (!d) return "";
    const list = sortCards(filterCards(d.cards, NAV), NAV.sort);
    if (!list.length) return `<div class="cempty">ไม่พบการ์ดที่ตรงกับตัวกรอง — ลองล้างตัวกรอง</div>`;
    return list.map(cardTileHTML).join("");
  }

  function cardsCountText() {
    const d = NAV.data;
    if (!d) return "";
    const n = sortCards(filterCards(d.cards, NAV), NAV.sort).length;
    return `แสดง ${n} / ${d.count} ใบ`;
  }

  function renderCards() {
    const el = $("cards");
    const d = NAV.data;
    if (!d) {
      el.innerHTML = `<div class="box cpagehead">
        <h2>📚 การ์ดทั้งหมด &amp; เมต้า</h2>
        <p class="dimtext">${NAV.error ? esc(NAV.error) : "กำลังโหลดข้อมูลการ์ด…"}</p>
        ${NAV.error ? `<button class="btn" data-cards-act="retry">ลองใหม่</button>` : ""}
      </div>`;
      return;
    }
    const top = sortCards(d.cards, "meta").slice(0, 10);
    const opts = (arr, sel) =>
      arr.map((v) => `<option value="${esc(v)}"${v === sel ? " selected" : ""}>${esc(v)}</option>`).join("");
    const picked = NAV.pick ? d.cards.find((c) => c.id === NAV.pick) : null;
    el.innerHTML = `
      <div class="box cpagehead">
        <h2>📚 การ์ดทั้งหมด &amp; เมต้า</h2>
        <p class="dimtext">การ์ด <b>${d.count}</b> ใบ · ${d.groups.length} กลุ่ม · ออร่า ${d.auras.length} แบบ ·
          เมต้า = PL + โบนัสสกิลที่แรงสุด · กดการ์ดเพื่อดูรายละเอียดและสกิลทั้งชุด</p>
        <div class="tstrip">
          <span class="tslbl">🔥 เมต้าสูงสุด 10 อันดับ</span>
          ${top
            .map(
              (c, i) =>
                `<button class="tchip fx-${esc(c.aura ? c.aura.fx : "ring")}"${auraStyle(c.aura)} data-cards-act="pick" data-id="${esc(c.id)}">
                  <i>${i + 1}</i>${esc(c.name)} <b>${c.meta}</b><span class="tchipt t-${esc(c.tier)}">${esc(c.tier)}</span></button>`
            )
            .join("")}
        </div>
      </div>
      ${picked ? cardDetailHTML(picked) : ""}
      <div class="box cfilters">
        <input id="cq" placeholder="ค้นหาชื่อ / ความสามารถ / ชื่อสกิล…" value="${esc(NAV.q)}" autocomplete="off">
        <select id="cgroup"><option value="">ทุกกลุ่ม</option>${opts(d.groups, NAV.group)}</select>
        <select id="caura"><option value="">ทุกออร่า</option>${
          d.auras.map((a) => `<option value="${esc(a.id)}"${a.id === NAV.aura ? " selected" : ""}>${esc(a.th)}</option>`).join("")
        }</select>
        <select id="ctier"><option value="">ทุก tier</option>${opts(d.tiers, NAV.tier)}</select>
        <select id="csort">
          <option value="meta"${NAV.sort === "meta" ? " selected" : ""}>เรียงตามคะแนนเมต้า</option>
          <option value="pl"${NAV.sort === "pl" ? " selected" : ""}>เรียงตาม PL</option>
          <option value="tier"${NAV.sort === "tier" ? " selected" : ""}>เรียงตาม tier</option>
          <option value="name"${NAV.sort === "name" ? " selected" : ""}>เรียงตามชื่อ</option>
        </select>
        <button class="btn tiny ghost" data-cards-act="clear">ล้างตัวกรอง</button>
      </div>
      <p class="ccount" id="ccount">${cardsCountText()}</p>
      <div class="cgrid" id="cgrid">${cardsGridHTML()}</div>`;
  }

  function renderHelp() {
    const d = NAV.data;
    const auras = d ? d.auras : [];
    $("help").innerHTML = `
      <div class="box helpbox">
        <h2>❓ วิธีเล่น</h2>
        <ol class="helplist">
          <li><b>สร้างห้อง / เข้าด้วยรหัส</b> — เล่นได้ 2–8 คน</li>
          <li><b>ตั้งค่าห้อง</b> (เจ้าของห้อง) · ตั้ง “การ์ดต่อคน” มากกว่า 0 เพื่อให้ <b>ทุกคนได้การ์ดเท่ากัน</b> (0 = ไม่จำกัด)</li>
          <li><b>ช่วงประมูล</b> — ถึงตากดบิด (ทบครั้งละ N) หรือผ่าน · ใครเงียบเกิน 45 วิ ระบบข้ามให้</li>
          <li><b>ด่านต่อสู้</b> — กดการ์ดของเรา → เลือก 1 ในสกิลทั้งหมด (มีสายรุกและสายรับ) → เลือกเป้าหมาย</li>
          <li><b>เอฟเฟค</b> — ทุกคนเห็นพร้อมกัน: ป้ายกลางจอ + เลขดาเมจลอย + การ์ดเป้าหมายสว่างตามออร่า</li>
        </ol>
        <h3>◎ ออร่าประจำตัว (${auras.length || "…"} แบบ)</h3>
        <p class="dimtext">ฮาคิราชันย์ = กรอบแดง + สายฟ้าแดงดำ · น้ำแข็ง = เกล็ดน้ำแข็ง · เพลิง/ลาวา = เปลวไฟ ·
          ความมืด/เงา = หมอกม่วง · แสง/แรงโน้มถ่วง = ประกาย · ป่า/พิษ/ทอง = วงแหวน</p>
        <div class="alggrid">${auras.map((a) => auraTagHTML(a)).join("") || '<span class="dimtext">กำลังโหลด…</span>'}</div>
        <h3>🔥 การ์ดเมต้า</h3>
        <p class="dimtext">คะแนนเมต้า = PL + โบนัสสกิลที่แรงสุดของใบนั้น
          (ฮาคิ +6 · เก็บเกี่ยว +5 · กวาดล้าง/สิ่งคม/กัดรอบ +4 · ท่าไม้ตาย/เล็งธนู/ประหาร/เผา/สะกด +3 · ดูดพลัง/ฮีล/ปลุกใจ/เกราะ/ป้อม +2)
          · tier S ≥ 100, A ≥ 92, B ≥ 84 ที่เหลือ C — เป็นคะแนนแนะนำตอนเลือกประมูล</p>
      </div>`;
  }

  function onCardsInput(e) {
    const t = e.target;
    if (!t || !t.id) return;
    if (t.id === "cq") NAV.q = t.value;
    else if (t.id === "cgroup") NAV.group = t.value;
    else if (t.id === "caura") NAV.aura = t.value;
    else if (t.id === "ctier") NAV.tier = t.value;
    else if (t.id === "csort") NAV.sort = t.value;
    else return;
    // อัปเดตเฉพาะกริด/จำนวน เพื่อไม่ให้ช่องค้นหาหลุดโฟกัส
    const grid = $("cgrid");
    if (grid) grid.innerHTML = cardsGridHTML();
    const count = $("ccount");
    if (count) count.textContent = cardsCountText();
  }

  function onCardsClick(e) {
    const el = e.target.closest("[data-cards-act]");
    if (!el) return;
    const what = el.getAttribute("data-cards-act");
    if (what === "pick") { NAV.pick = el.getAttribute("data-id"); return render(); }
    if (what === "close") { NAV.pick = null; return render(); }
    if (what === "clear") { NAV.q = ""; NAV.group = ""; NAV.aura = ""; NAV.tier = ""; return render(); }
    if (what === "retry") { NAV.data = null; NAV.error = null; loadCards().then(render); return; }
  }

  function onNav(e) {
    const b = e.target.closest("[data-nav]");
    if (!b) return;
    NAV.page = b.getAttribute("data-nav");
    render();
    if (NAV.page === "cards" || NAV.page === "help")
      loadCards().then(() => { if (NAV.page === "cards" || NAV.page === "help") render(); });
  }

  /* ---- lobby ---- */
  function lobbyHTML(st) {
    const isHost = st.me && st.me.isHost;
    const per = st.settings.cardsPerPlayer || 0;
    const totalCards = per > 0 ? Math.min(74, per * st.players.length) : st.settings.cardCount;
    const link = location.origin + location.pathname + "?code=" + S.code;
    const players = st.players
      .map((p) => {
        const kick = isHost && !p.isHost
          ? `<button class="btn tiny danger" data-act="kick" data-pid="${p.id}">นำออก</button>` : "";
        return `<div class="prow">
          <span class="dot ${p.online ? "on" : ""}" data-pdot="${p.id}"></span>
          <span class="nm">${esc(p.name)}</span>
          ${p.isHost ? '<span class="tag">👑 เจ้าของห้อง</span>' : ""}
          ${kick}
        </div>`;
      })
      .join("");

    const settings = isHost
      ? `<div class="box">
           <h3>⚙️ ตั้งค่าห้อง</h3>
           <div class="setrow"><label>เงินเริ่มต้น (Belly)</label>
             <input id="setMoney" type="number" min="20" max="2000" value="${st.settings.startingMoney}"></div>
           <div class="setrow"><label>จำนวนตัวละครที่ประมูล</label>
             <input id="setCards" type="number" min="3" max="74" value="${st.settings.cardCount}"></div>
           <div class="setrow"><label>การ์ดต่อคน (เท่ากันทุกคน)</label>
             <input id="setPer" type="number" min="0" max="20" value="${per}"></div>
           <div class="setnote">
             ตั้ง <b>0</b> = ไม่จำกัด (ใครบิดได้ก็ได้) · ตั้ง <b>N</b> = ทุกคนได้คนละไม่เกิน N ใบ เท่ากัน
             — จะประมูลทั้งหมด <b>${totalCards}</b> ใบ (N × จำนวนคน ${st.players.length} คน)
           </div>
           <div class="setrow"><label>ราคาเปิดประมูล</label>
             <input id="setStart" type="number" min="1" max="500" value="${st.settings.startPrice}"></div>
           <div class="setrow"><label>บิดทบครั้งละ</label>
             <input id="setInc" type="number" min="1" max="100" value="${st.settings.minIncrement}"></div>
           <div class="setrow"><label>โหมดเอาการ์ดมาตีกัน</label>
             <input id="setBattle" type="checkbox" ${st.settings.battle ? "checked" : ""} style="width:auto"></div>
           <button class="btn ghost" data-act="settings">บันทึกการตั้งค่า</button>
           <p style="font-size:11.5px;color:#93a9c0;margin:10px 0 0">
             ทุกการ์ดเปิดที่ราคาเดียวกัน แล้วทบขึ้นครั้งละ N · แนะนำเงินเริ่มต้น ≈ จำนวนการ์ดต่อคน × 30<br>
             โหมดต่อสู้: หลังประมูลครบ ทุกคนเอาการ์ดที่ได้มาตีกันแบบเทิร์นเบส (การ์ดแต่ละใบมีสกิลของตัวเอง)</p>
         </div>`
      : `<div class="box"><h3>⚙️ ตั้งค่าห้อง</h3>
           <div class="setrow"><label>เงินเริ่มต้น</label><span>${st.settings.startingMoney} Belly</span></div>
           <div class="setrow"><label>จำนวนตัวละคร</label><span>${per > 0 ? `${totalCards} ใบ (${per} × ${st.players.length} คน)` : `${st.settings.cardCount} ใบ`}</span></div>
           <div class="setrow"><label>การ์ดต่อคน</label><span>${per > 0 ? `${per} ใบเท่ากันทุกคน ⚖️` : "ไม่จำกัด"}</span></div>
           <div class="setrow"><label>ราคาเปิดประมูล</label><span>${st.settings.startPrice} บาท</span></div>
           <div class="setrow"><label>บิดทบครั้งละ</label><span>${st.settings.minIncrement} บาท</span></div>
           <div class="setrow"><label>โหมดต่อสู้การ์ด</label><span>${st.settings.battle ? "เปิด ⚔️" : "ปิด"}</span></div>
           <p style="font-size:11.5px;color:#93a9c0;margin:10px 0 0">เจ้าของห้องเป็นคนตั้งค่า</p>
         </div>`;

    return `
      <div class="codebox">
        <div class="lbl">บอกเพื่อนให้เข้าเว็บนี้ แล้วใส่รหัสห้อง</div>
        <div class="codebig">${esc(S.code)}</div>
        <button class="btn tiny ghost" data-act="copy" data-val="${esc(S.code)}">📋 คัดลอกรหัส</button>
        <div class="linkbox">
          <input readonly value="${esc(link)}" onclick="this.select()">
          <button class="btn tiny" data-act="copy" data-val="${esc(link)}">คัดลอกลิงก์</button>
        </div>
      </div>
      <div class="grid2">
        <div class="box">
          <h3>👥 ผู้เล่นในห้อง <span>${st.players.length}/8</span></h3>
          <div class="plist">${players}</div>
        </div>
        ${settings}
      </div>
      <div style="text-align:center;margin-top:20px">
        ${isHost
          ? `<button class="btn primary big" data-act="start" ${st.players.length < 2 ? "disabled" : ""}>
               🚩 เริ่มเกม ${st.players.length < 2 ? "(ต้องมีอย่างน้อย 2 คน)" : ""}
             </button>`
          : `<p style="color:#93a9c0">รอเจ้าของห้องกดเริ่มเกม…</p>`}
      </div>`;
  }

  /* ---- auction ---- */
  function auctionHTML(st) {
    const me = st.players.find((p) => p.id === S.playerId) || { money: 0 };
    const myTurn = st.turn === S.playerId && !!st.current;
    const c = st.current;
    const per = st.settings.cardsPerPlayer || 0;

    const cardHTML = c
      ? `<div class="showcard${auraClass(c.aura)}"${auraStyle(c.aura)}>
           <img src="${esc(c.img)}" alt="${esc(c.name)}">
           <div class="plbadge"><small>PL</small><span>${c.pl}</span></div>
           ${c.aura ? `<div class="aurabadge" title="ออร่าประจำตัว">◎ ${esc(c.aura.th)}</div>` : ""}
           <div class="info">
             <div class="nm">${esc(c.name)}</div>
             <div class="grp">${esc(c.group)}</div>
             <div class="eff">${esc(c.effect)}</div>
             ${c.skill ? `<div class="skl"><b>สกิลต่อสู้ · ${esc(c.skill.name)}</b>
               <span>${esc(c.skill.label)} — ${esc(c.skill.desc)}</span>
               ${(c.skills || []).slice(1).map((sk) => `<span>+ ${esc(sk.name)} (${esc(sk.label)}) — ${esc(sk.desc)}</span>`).join("")}
             </div>` : ""}
           </div>
         </div>`
      : `<div class="box" style="text-align:center;padding:40px">กำลังเปิดการ์ดใบถัดไป…</div>`;

    let bidbtns = "";
    if (me && st.highBidder === S.playerId && st.highBid > 0) {
      bidbtns = `<div class="turnbar mine">คุณเป็นผู้บิดสูงสุดอยู่ — รอคนอื่นตัดสินใจ</div>`;
    } else if (myTurn) {
      const min = st.minNext;
      const inc = st.settings.minIncrement;
      const opts = [...new Set([min, min + inc, min + 10, min + 50])].filter((a) => a <= me.money);
      const allIn = me.money;
      const allInBtn = allIn > min - 1 && !opts.includes(allIn)
        ? `<button class="btn" data-act="bid" data-amt="${allIn}">บิดสูงสุด ${allIn}</button>` : "";
      bidbtns =
        `<div class="bidbtns">
           ${opts.map((a) => `<button class="btn" data-act="bid" data-amt="${a}">บิด ${a}</button>`).join("")}
           ${allInBtn}
           <button class="btn danger full" data-act="pass">🚫 ผ่าน</button>
         </div>
         <div class="customrow">
           <input id="bidAmt" type="number" min="${min}" max="${me.money}" placeholder="กำหนดเอง (${min}–${me.money})">
           <button class="btn ghost" data-act="bidcustom">บิด</button>
         </div>`;
    } else {
      bidbtns = `<div class="turnbar other">⏳ รอ ${esc(st.turnName || "…")} ตัดสินใจ</div>`;
    }

    const strip = st.players
      .map((p) => {
        const cls = [
          "pcard",
          p.id === st.turn ? "turn" : "",
          p.id === S.playerId ? "me" : "",
          p.passed ? "passed" : "",
        ].join(" ");
        return `<div class="${cls}">
          <div class="top">
            <span class="dot ${p.online ? "on" : ""}" data-pdot="${p.id}"></span>
            <span class="nm">${p.isHost ? "👑 " : ""}${esc(p.name)}</span>
            <span class="cash">${p.money}</span>
          </div>
          <div style="font-size:11.5px;color:#93a9c0">
            ${p.cards.length}${per ? "/" + per : ""} ใบ${
              per && p.cards.length >= per ? ' · ครบโควตา ⚖️' : p.passed ? " · ผ่านแล้ว" : ""
            }
          </div>
          <div class="thumbrow">${p.cards.map((x) => `<img src="${esc(x.img)}"${auraStyle(x.aura)} title="${esc(x.name)} (PL ${x.pl})${x.aura ? " · " + esc(x.aura.th) : ""}">`).join("")}</div>
        </div>`;
      })
      .join("");

    const logs = st.log.slice().reverse()
      .map((l) => `<div>${esc(l.msg)}</div>`).join("");

    return `
      <div class="auction">
        ${cardHTML}
        <div>
          <div class="bidbox">
            <div class="bidnow">
              <div class="amt">${c ? (st.highBid || st.settings.startPrice) : 0}</div>
              <div class="who">${st.highBidder ? "บิดสูงสุด: " + esc(st.highBidderName) : (c ? "ราคาเปิด " + st.settings.startPrice + " · ยังไม่มีใครบิด" : "")}</div>
            </div>
            <div style="text-align:center;font-size:13px;color:#93a9c0;margin-bottom:12px">
              ${c ? `ทบครั้งละ <b style="color:#f2c14e">${st.settings.minIncrement}</b> · ราคาต่อไปขั้นต่ำ <b style="color:#f2c14e">${st.minNext}</b>` : ""}
              ${per ? `<br>โควตาการ์ดต่อคน <b style="color:#f2c14e">${per}</b> ใบเท่ากัน · ใบที่ ${Math.min(st.round, st.totalCards || st.settings.cardCount)}/${st.totalCards || st.settings.cardCount}` : ""}
            </div>
            ${bidbtns}
          </div>
          <div class="box logbox">
            <h3>📜 เหตุการณ์</h3>
            <div class="loglist">${logs || "<div>—</div>"}</div>
          </div>
        </div>
      </div>
      <div class="pstrip">${strip}</div>
      ${st.discard.length ? `<p style="font-size:12px;color:#6f8296;margin-top:14px">
        กองกลาง (ไม่มีใครเอา): ${st.discard.map((x) => esc(x.name)).join(", ")}</p>` : ""}`;
  }

  /* ---- battle ---- */
  function statusBadges(f) {
    const b = [];
    if (!f.alive) b.push('<span class="bd dead">💀 หมดสติ</span>');
    if (f.shield > 0) b.push(`<span class="bd shield">🛡 เกราะ ${f.shield}</span>`);
    if (f.buff > 0) b.push(`<span class="bd buff">📣 +40% ${f.buff}</span>`);
    if (f.stun > 0) b.push(`<span class="bd stun">💤 สะกด ${f.stun}</span>`);
    if (f.burn > 0) b.push(`<span class="bd burn">🔥 เผา ${f.burnDmg} (${f.burn})</span>`);
    if (f.passive) b.push(`<span class="bd passive" title="${esc(f.passive.desc)}">✨ ${esc(f.passive.name)}</span>`);
    return b.join("");
  }

  function fighterHTML(f, st) {
    const myTurn = st.battle.turn === S.playerId;
    const mine = f.pid === S.playerId;
    const sel = mine && PICK.fighter === f.cid;
    const pct = Math.max(0, Math.round((f.hp / f.maxHp) * 100));
    const cls = ["fighter", f.alive ? "" : "dead", mine ? "mine" : "", sel ? "sel" : ""]
      .join(" ") + auraClass(f.aura);
    const clickable = myTurn && mine && f.alive;
    const cdTxt = f.cd > 0 ? `<b class="cd">พักอีก ${f.cd}</b>` : `<b class="ready">พร้อมใช้</b>`;
    const ownerSpan = `<div class="fowner">เล่นโดย ${esc(st.players.find((p) => p.id === f.pid)?.name || f.pid)}</div>`;
    const chips = skillsOf(f)
      .map((sk) => {
        const cd = cdOf(f, sk);
        return `<span class="skchip ${cd > 0 ? "cdown" : ""}">${esc(sk.label)}${cd > 0 ? ` ${cd}` : ""}</span>`;
      })
      .join("");
    return `<div class="${cls}"${auraStyle(f.aura)} data-cid="${f.cid}" data-pid="${f.pid}" ${clickable ? `data-act="pick"` : ""}>
      <img src="${esc(f.img)}" alt="${esc(f.name)}">
      <div class="fbody">
        <div class="fname">${esc(f.name)} <span class="pl">PL${f.pl}</span></div>
        <div class="hpbar"><i style="width:${pct}%"></i></div>
        <div class="fmeta">❤️ ${f.hp}/${f.maxHp} · ⚔️ ${f.effAtk}${f.effAtk !== f.atk ? ` <small>(ฐาน ${f.atk})</small>` : ""}</div>
        <div class="fskill" title="${esc(f.skill.desc)}">🔸 <b>${esc(f.skill.name)}</b> (${esc(f.skill.label)}) ${cdTxt}</div>
        <div class="skchips" title="สกิลทั้งหมดของการ์ดนี้">${chips}</div>
        ${ownerSpan}
        <div class="badges">${statusBadges(f)}${auraBadge(f.aura)}</div>
      </div>
    </div>`;
  }

  function battleHTML(st) {
    const b = st.battle;
    if (!b) return `<div class="box">กำลังเตรียมสนาม…</div>`;
    const myTurn = b.turn === S.playerId;
    const myAlive = b.fighters.filter((f) => f.pid === S.playerId && f.alive);
    const sel = myAlive.find((f) => f.cid === PICK.fighter) || null;
    if (!sel) PICK.skill = null;

    let panel = "";
    if (!myTurn) {
      panel = `<div class="turnbar other">⏳ รอบ ${b.rounds || 1} · รอ <b>${esc(b.turnName || "…")}</b> เลือกท่า (ถ้าไม่ขยับ ระบบจะให้บอทเล่นแทนใน 45 วิ)</div>`;
    } else if (!sel) {
      panel = `<div class="turnbar mine">👉 ตาถึงคุณ — กดการ์ดของคุณเพื่อเลือกตัวออกโรง</div>`;
    } else {
      const chosen = PICK.skill && PICK.skill !== "basic" ? skOf(sel, PICK.skill) : null;
      const targetMode = PICK.skill === "basic" ? "enemy" : chosen ? chosen.target : null;
      const needTarget = targetMode === "enemy" || targetMode === "ally";
      const enemyTargets = b.fighters.filter((f) => f.pid !== S.playerId && f.alive);
      const allyTargets = myAlive;
      let targetHTML = "";
      if (needTarget) {
        const list = targetMode === "enemy" ? enemyTargets : allyTargets;
        const skName = PICK.skill === "basic" ? b.basic.name : chosen.name;
        targetHTML = `<div class="tgtpick"><h4>👉 กดการ์ดเป้าหมายที่อยากให้โดน “${esc(skName)}”</h4><div class="tgtrow">${
          list.map((f) => `<button class="btn tiny tgt"${auraStyle(f.aura)} data-act="target" data-pid="${f.pid}" data-cid="${f.cid}">
            ${esc(f.name)} <small>${f.hp}/${f.maxHp}</small></button>`).join("") || "<span>ไม่มีเป้าหมาย</span>"
        }</div>
        <button class="btn tiny ghost" data-act="unpick">ยกเลิก</button></div>`;
      }
      const ownBtns = skillsOf(sel)
        .map((sk) => {
          const cd = cdOf(sel, sk);
          const on = PICK.skill === sk.kind;
          return `<button class="btn ${cd > 0 ? "" : on ? "primary" : "ghost"} skillbtn${sk.kind === "haki" ? " hakibtn" : ""}" data-act="skill" data-kind="${esc(sk.kind)}" ${cd > 0 ? "disabled" : ""}>
            <b>${esc(sk.name)}</b> · ${esc(sk.label)}${on ? " ✓" : ""}
            <small>${esc(sk.desc)}${cd > 0 ? ` · พักอีก ${cd} เทิร์น` : ""}</small>
          </button>`;
        })
        .join("");
      panel = `<div class="turnbar mine">👉 รอบ ${b.rounds || 1} · <b>${esc(sel.name)}</b> ออกโรง — เลือกท่า (${skillsOf(sel).length + 1} ท่า)</div>
        <div class="skillpick">
          ${ownBtns}
          <button class="btn skillbtn basic" data-act="skill" data-kind="basic">
            <b>${esc(b.basic.name)}</b> · ${esc(b.basic.label)}
            <small>${esc(b.basic.desc)}</small>
          </button>
          <button class="btn tiny ghost" data-act="unpick">เปลี่ยนการ์ด</button>
        </div>
        ${targetHTML}`;
    }
    const autoBtn = myTurn
      ? `<div class="autorow"><button class="btn tiny ghost" data-act="autoplay">🤖 ให้บอทเล่นเทิร์นนี้</button></div>` : "";

    // จัดเป็นกระดาน 2 ฝั่ง: ทีมศัตรูอยู่บน · ทีมเราอยู่ล่าง (อ่านง่ายบนมือถือ)
    const side = { enemy: [], mine: [] };
    for (const o of b.order) {
      const fs = b.fighters.filter((f) => f.pid === o.pid);
      const me = o.pid === S.playerId;
      const html = `<div class="team ${me ? "me" : ""} ${o.alive ? "" : "out"}">
          <div class="theader">
            <span class="dot ${fs.some((f) => f.alive) ? "on" : ""}"></span>
            <b>${esc(o.name)}</b>${me ? " (คุณ)" : ""}
            <span class="tinfo">เหลือ ${o.alive} ตัว · KO ${o.kos} · คะแนนสงคราม ${o.points}</span>
          </div>
          <div class="frow">${fs.map((f) => fighterHTML(f, st)).join("")}</div>
        </div>`;
      (me ? side.mine : side.enemy).push(html);
    }
    const standing = b.order.filter((o) => o.alive > 0).length;
    const head = `<div class="battlehead">
      <div class="bhbox"><small>รอบ</small><b>${b.rounds || 1}</b></div>
      <div class="bhbox"><small>เทิร์น</small><b>${b.turns}/${b.maxTurns}</b></div>
      <div class="bhbox wide ${myTurn ? "mine" : "other"}">
        <small>${myTurn ? "⬅ ตาของคุณ" : "ตาของคู่แข่ง"}</small>
        <b>${esc(myTurn ? "เลือกการ์ดของคุณ" : b.turnName || "…")}</b>
      </div>
      <div class="bhbox"><small>ทีมที่ยังยืน</small><b>${standing}/${b.order.length}</b></div>
    </div>`;
    const board = `<div class="board">
      <div class="board-side enemy">
        <div class="side-lbl">👹 ฝั่งศัตรู</div>
        ${side.enemy.join("") || '<div class="dimtext">ยังไม่มีคู่แข่งที่ลงสนาม</div>'}
      </div>
      <div class="side-divider"><span>⚔️</span></div>
      <div class="board-side mine">
        <div class="side-lbl">🏴‍☠️ ทีมของคุณ</div>
        ${side.mine.join("") || '<div class="dimtext">คุณไม่ได้การ์ดในรอบนี้ — นั่งดูเพื่อนสู้</div>'}
      </div>
    </div>`;

    const logs = st.log.slice().reverse().map((l) => `<div>${esc(l.msg)}</div>`).join("");

    // ข้อความสรุปการกดสกิล: แสดงให้เห็นทันทีว่าเลือกอะไรและกดไปที่ใคร
    let footer = "";
    if (sel) {
      const sk = PICK.skill === "basic" ? b.basic : (PICK.skill && skOf(sel, PICK.skill)) || sel.skill;
      const where = sk.target === "ally" ? "ตัวเอง/เพื่อน" : sk.target === "all" ? "ศัตรูทุกตัว" : sk.target === "self" ? "ตัวเอง (ป้องกัน)" : "ศัตรู 1 ตัว";
      footer = `<div class="footerbattle">
        <b>${esc(sel.name)}</b> เลือก <b>${esc(sk.name)}</b> → เป้าหมาย: <b>${where}</b>${PICK.skill ? " · เลือกเป้าหมายแล้วทุกคนจะเห็นเอฟเฟคพร้อมกัน" : " · กดปุ่มสกิลเพื่อเลือกเป้าหมาย"}
      </div>`;
    }
    const legend = [
      ...new Map(b.fighters.filter((f) => f.aura).map((f) => [f.aura.id, f.aura])).values(),
    ]
      .map((a) => `<span class="alg fxk-${fxOf(a)}"${auraStyle(a)}>${esc(a.th)}</span>`)
      .join("");

    return `
      ${head}
      ${board}
      <details class="box logbox">
        <summary>📜 บันทึกการต่อสู้ (${st.log.length})</summary>
        <div class="loglist">${logs || "<div>—</div>"}</div>
      </details>
      <div class="box battlepanel actionbar">${panel}${autoBtn}
        <div class="auralegend"><b>◎ ออร่าประจำตัว:</b> ${legend || "—"}
          <span class="alghint">กรอบการ์ดสีตามออร่า · ตอนโดนตีการ์ดจะสว่างและมีเอฟเฟค (ฮาคิราชันย์ = สายฟ้าแดงดำ, น้ำแข็ง = เกล็ดน้ำแข็ง ฯลฯ)</span>
        </div>
      </div>
      ${footer}`;
  }

  /* ---- result ---- */
  function resultHTML(st) {
    const scores = st.scores || [];
    const win = scores[0];
    const isHost = st.me && st.me.isHost;
    const war = st.battle && st.battle.result;
    const rows = scores
      .map((r, i) => `
        <div class="rrow ${i === 0 ? "win" : ""}">
          <div class="pos">${i + 1}</div>
          <div class="rname">${esc(r.name)}${war && war.winnerPid === r.id ? ' <span class="tag">🥇 ชนะสงคราม</span>' : ""}</div>
          <div class="metric">พลัง <b>${r.pl}</b></div>
          <div class="metric">ทีม +<b>${r.synergy}</b></div>
          <div class="metric">สงคราม <b>+${r.battle || 0}</b><br><small>KO ${r.kos || 0} · รอด ${r.survivors || 0}</small></div>
          <div class="metric">เงินเหลือ <b>${r.moneyLeft}</b></div>
          <div class="metric">รวม <span class="big">${r.total}</span></div>
          ${r.synergyDetail.length ? `<div class="syn">โบนัสทีมเวิร์ค: ${esc(r.synergyDetail.join(" · "))}</div>` : ""}
          <div class="rthumbs">${r.cards.map((c) => `<img src="${esc(c.img)}"${auraStyle(c.aura)} title="${esc(c.name)} (PL ${c.pl})${c.aura ? " · " + esc(c.aura.th) : ""}">`).join("")}</div>
        </div>`)
      .join("");

    return `
      ${win ? `<div class="winner">
         <div class="crown">👑</div>
         <div class="nm">${esc(win.name)}</div>
         <div class="sc">ชนะด้วยคะแนนรวม <b style="color:#f2c14e">${win.total}</b>
           (พลัง ${win.pl} + ทีม ${win.synergy} + สงคราม ${win.battle || 0})</div>
         ${war && war.winnerName ? `<div class="sc" style="font-size:14px;color:#93a9c0">
           แชมป์สงครามการ์ด: ${esc(war.winnerName)} (+${war.bonus} คะแนน${war.timeout ? " · ตัดสินเพราะหมดเวลา" : ""})</div>` : ""}
       </div>` : ""}
      <div class="box"><h3>🏁 สรุปคะแนน — พลังรวม + โบนัสทีมเวิร์ค + คะแนนสงครามการ์ด</h3>
        <div class="rank">${rows}</div>
        <p style="font-size:12px;color:#93a9c0;margin:12px 0 0">
          ทีมเวิร์ค: กลุ่มเดียวกัน 3 ใบขึ้นไป +5/ใบ · สงคราม: ล้มการ์ดศัตรูได้ 10 + (PL/10) คะแนน
          และผู้ยืนหยัดคนสุดท้ายได้ +60 (+5 ต่อตัวที่รอด)</p>
      </div>
      <div style="text-align:center;margin-top:20px">
        ${isHost
          ? `<button class="btn primary big" data-act="reset">🔁 เล่นใหม่อีกครั้ง</button>`
          : `<p style="color:#93a9c0">รอเจ้าของห้องกดเล่นใหม่…</p>`}
      </div>`;
  }

  /* ------------------------- events ------------------------- */
  function doCreate() {
    const name = $("nameInput").value.trim();
    if (!name) return showHomeMsg("ใส่ชื่อก่อนสร้างห้อง");
    createRoom(name);
  }

  async function createRoom(name) {
    try {
      $("createBtn").disabled = true;
      const d = await api("/api/rooms", { name });
      S.code = d.code; S.playerId = d.playerId; S.token = d.token; S.state = d.state;
      saveSession(); S.rendered = -1; render(); startPoll();
      toast("สร้างห้องแล้ว! แชร์รหัส " + d.code + " ให้เพื่อน", true);
    } catch (e) {
      showHomeMsg(e.message);
    } finally {
      $("createBtn").disabled = false;
    }
  }

  async function joinRoom(code, name) {
    try {
      $("joinBtn").disabled = true;
      const d = await api(`/api/rooms/${code}/join`, { name });
      S.code = d.code; S.playerId = d.playerId; S.token = d.token; S.state = d.state;
      saveSession(); S.rendered = -1; render(); startPoll();
      toast("เข้าห้อง " + d.code + " แล้ว", true);
    } catch (e) {
      showHomeMsg(e.message);
    } finally {
      $("joinBtn").disabled = false;
    }
  }

  function showHomeMsg(msg) {
    $("homeMsg").textContent = msg || "";
  }

  function selectedFighter() {
    const st = S.state;
    if (!st || !st.battle) return null;
    return st.battle.fighters.find((f) => f.pid === S.playerId && f.cid === PICK.fighter && f.alive) || null;
  }

  function fire(kind, t) {
    const f = selectedFighter();
    if (!f) return;
    const payload = { fighter: f.cid, skill: kind };
    if (t) { payload.targetPid = t.targetPid; payload.target = t.target; }
    PICK.skill = null;
    act("fight", payload);
  }

  function onGameClick(e) {
    const btn = e.target.closest("[data-act]");
    if (!btn || btn.disabled) return;
    const actType = btn.getAttribute("data-act");

    if (actType === "bid") return act("bid", { amount: Number(btn.getAttribute("data-amt")) });
    if (actType === "pass") return act("pass");
    if (actType === "start") return act("start");
    if (actType === "reset") return act("reset");
    if (actType === "autoplay") return act("autoplay");
    if (actType === "kick") return act("kick", { playerId: btn.getAttribute("data-pid") });
    if (actType === "settings") {
      const b = $("setBattle");
      const per = $("setPer");
      return act("settings", {
        startingMoney: Number($("setMoney").value),
        cardCount: Number($("setCards").value),
        cardsPerPlayer: per ? Number(per.value) : 0,
        startPrice: Number($("setStart").value),
        minIncrement: Number($("setInc").value),
        battle: b ? !!b.checked : true,
      });
    }
    if (actType === "bidcustom") {
      const v = Number($("bidAmt").value);
      if (!v) return toast("ใส่จำนวนเงินที่จะบิด");
      return act("bid", { amount: v });
    }
    if (actType === "pick") { PICK.fighter = btn.getAttribute("data-cid"); PICK.skill = null; return render(); }
    if (actType === "unpick") { PICK.fighter = null; PICK.skill = null; return render(); }
    if (actType === "skill") {
      const kind = btn.getAttribute("data-kind");
      const f = selectedFighter();
      if (!f) return render();
      const sk = kind === "basic" ? null : skOf(f, kind);
      if (kind !== "basic" && !sk) return toast("การ์ดนี้ไม่มีสกิลนั้น");
      // สกิลที่ยิงทั้งสนาม/ป้องกันตัวเอง ไม่ต้องเลือกเป้า → ยิงเลย
      const target = kind === "basic" ? "enemy" : sk.target;
      if (target === "self" || target === "all") return fire(kind, null);
      // กดแล้วเห็นทันที: ไฮไลต์ปุ่มที่เลือก + เปิดช่องเลือกเป้าหมาย
      PICK.skill = kind;
      return render();
    }
    if (actType === "target") {
      return fire(PICK.skill, { targetPid: btn.getAttribute("data-pid"), target: btn.getAttribute("data-cid") });
    }
    if (actType === "unpick") {
      // ยกเลิกการเลือกการ์ดหรือเป้าหมาย
      if (typeof document.querySelector === "function") {
        const tp = document.querySelector(".tgtpick");
        if (tp) tp.remove();
      }
      PICK.fighter = null;
      PICK.skill = null;
      return render();
    }
    if (actType === "copy") {
      const val = btn.getAttribute("data-val");
      navigator.clipboard.writeText(val).then(
        () => toast("คัดลอกแล้ว: " + val, true),
        () => toast("คัดลอกไม่สำเร็จ ลอกเองนะ")
      );
    }
  }

  function initEvents() {
    $("createBtn").addEventListener("click", doCreate);
    $("joinBtn").addEventListener("click", () => {
      const name = $("nameInput").value.trim();
      const code = $("codeInput").value.trim().toUpperCase();
      if (!name) return showHomeMsg("ใส่ชื่อก่อนเข้าห้อง");
      if (code.length < 4) return showHomeMsg("รหัสห้องไม่ถูกต้อง");
      joinRoom(code, name);
    });
    $("codeInput").addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    });
    [$("nameInput"), $("codeInput")].forEach((el) =>
      el.addEventListener("keydown", (e) => { if (e.key === "Enter") $("joinBtn").click(); })
    );
    $("leaveBtn").addEventListener("click", () => {
      if (confirm("ออกจากห้องนี้?")) { clearSession(); toast("ออกจากห้องแล้ว"); }
    });
    $("game").addEventListener("click", onGameClick);
    $("cards").addEventListener("click", onCardsClick);
    $("cards").addEventListener("input", onCardsInput);
    $("cards").addEventListener("change", onCardsInput);
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("[data-nav]")) onNav(e);
    });
    document.addEventListener("visibilitychange", onVisible);
  }

  /* ------------------------- boot ------------------------- */
  async function boot() {
    initEvents();
    watchClicks();
    const params = new URLSearchParams(location.search);
    const fromUrl = (params.get("code") || "").toUpperCase();
    if (fromUrl) { $("codeInput").value = fromUrl; }

    const saved = loadSession();
    if (saved && saved.code && saved.playerId && saved.token) {
      S.code = saved.code; S.playerId = saved.playerId; S.token = saved.token;
      try {
        const d = await api(`/api/rooms/${S.code}/sync`, { playerId: S.playerId, token: S.token });
        applyState(d.state);
        startPoll();
        return;
      } catch (e) {
        clearSession();
        if (e.status !== 401 && e.status !== 404) toast(e.message);
      }
    }
    render();
  }

  boot();

  // จุดเชื่อมสำหรับเทสต์อัตโนมัติ (ไม่กระทบการใช้งานจริง)
  window.__opAuction = {
    S, PICK, NAV, applyState, act, render, renderNow, queue, isStale, pollDelay,
    playFx, skillsOf, skOf, filterCards, sortCards, cardMatches, loadCards, setScreen,
  };
})();
