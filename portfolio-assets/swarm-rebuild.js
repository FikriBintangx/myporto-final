/**
 * Swarm Rebuild Engine v3.0.0 · Polish & Precision Edition
 * Dedicated to fikribintang.web.id
 * Features:
 * - Minimalist Red Dot Header Button (Zero Clutter, Replaces Bulky Banner)
 * - Text Field Placement & Streamed Mechanical Typing Simulation (with audio clatters)
 * - Complete Polished Footer Reconstruction Pipeline
 * - GSAP Stacking Cards Auto-Scroll Integration
 */

(function () {
  "use strict";

  // ==========================================
  // 1. PROCEDURAL AUDIO SYNTHESIZER
  // ==========================================
  let audioCtx = null;
  let soundEnabled = true;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq = 440, duration = 0.08, type = "sine", gainVal = 0.09) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq * 0.7), ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  // Realistic mechanical keyboard clatter
  function playTypeTick() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      const baseFreq = 950 + (Math.random() * 300 - 150);
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch (e) {}
  }

  function playTick() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  }

  function playWipeSwoosh() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {}
  }

  function playChime() {
    if (!soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((f, i) => {
      setTimeout(() => playTone(f, 0.35, "sine", 0.08), i * 90);
    });
  }

  // ==========================================
  // 2. FLAT AGENTS ROSTER (Clean, Zero Glow)
  // ==========================================
  const AGENTS = [
    { id: 1, name: "Agent 1", color: "#2E6BC4" }, // Navy Blue
    { id: 2, name: "Agent 2", color: "#7C3AED" }, // Deep Violet
    { id: 3, name: "Agent 3", color: "#059669" }, // Emerald
    { id: 4, name: "Agent 4", color: "#D97706" }, // Warm Amber
    { id: 5, name: "Agent 5", color: "#E11D48" }, // Crimson Rose
    { id: 6, name: "Agent 6", color: "#0891B2" }  // Ocean Cyan
  ];

  // ==========================================
  // 3. INJECT ENGINE STYLES
  // ==========================================
  const styleEl = document.createElement("style");
  styleEl.id = "swarm-granular-styles";
  styleEl.textContent = `
    /* Minimalist Red Dot Header Button - Perfectly Centered */
    .swarm-red-dot-btn {
      width: 30px !important;
      height: 30px !important;
      min-width: 30px !important;
      min-height: 30px !important;
      border-radius: 50% !important;
      background: rgba(239, 68, 68, 0.09) !important;
      border: 1.5px solid rgba(239, 68, 68, 0.5) !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      align-self: center !important; /* CRITICAL: Centered vertically in stretch flex parent */
      cursor: pointer !important;
      margin: auto 1.1rem auto 0.95rem !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      line-height: 1 !important;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
      vertical-align: middle !important;
      z-index: 999999 !important;
      position: relative !important;
    }
    .swarm-red-dot-btn:hover {
      background: rgba(239, 68, 68, 0.22) !important;
      border-color: #EF4444 !important;
      transform: scale(1.1) !important;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.35) !important;
    }
    .swarm-rec-dot {
      width: 10px !important;
      height: 10px !important;
      border-radius: 50% !important;
      background: #EF4444 !important;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      flex-shrink: 0 !important;
      box-shadow: 0 0 6px rgba(239, 68, 68, 0.6) !important;
      transition: transform 0.2s ease !important;
    }
    .swarm-rec-dot.is-recording {
      animation: swarmRecBlink 1.1s infinite ease-in-out;
    }
    @keyframes swarmRecBlink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.8); }
    }

    /* Minimalist Bottom-Left Status Pill (Replaces noisy top banner) */
    .swarm-status-dock {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 2147483647 !important;
      background: #0B2545;
      border: 1.5px solid #2E6BC4;
      color: #FAF8F2;
      padding: 8px 16px;
      border-radius: 999px;
      font-family: "Space Mono", monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 4px 16px rgba(11, 37, 69, 0.4);
      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
      transition: all 0.25s ease-out;
      user-select: none;
    }
    .swarm-status-dock.is-visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
    .swarm-dock-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #EF4444;
      animation: swarmRecBlink 1.1s infinite ease-in-out;
    }
    .swarm-dock-close {
      background: none;
      border: none;
      color: #93C5FD;
      cursor: pointer;
      font-size: 10px;
      margin-left: 6px;
      padding: 2px 5px;
      border-radius: 3px;
    }
    .swarm-dock-close:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    /* Multiplayer Cursors Layer */
    #swarm-cursors-layer {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2147483640;
      overflow: hidden;
    }
    .swarm-agent-cursor {
      position: absolute;
      top: 0;
      left: 0;
      will-change: transform;
      pointer-events: none;
      transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      filter: drop-shadow(0 1px 3px rgba(0,0,0,0.3));
    }
    .swarm-cursor-svg {
      width: 20px;
      height: 20px;
      transform: translate(-1px, -1px);
    }
    .swarm-agent-tag {
      font-family: "Space Mono", monospace;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      color: #FFFFFF;
      margin-left: 14px;
      margin-top: -4px;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      border: 1px solid rgba(255, 255, 255, 0.25);
    }
    .swarm-action-label {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 9px;
      opacity: 0.9;
      font-weight: 400;
      background: rgba(0, 0, 0, 0.25);
      padding: 1px 5px;
      border-radius: 3px;
    }

    /* Ghost State on Deconstructed Elements */
    .swarm-ghost-element {
      opacity: 0.08 !important;
      filter: blur(4px) !important;
      outline: 1.5px dashed rgba(46, 107, 196, 0.4) !important;
      outline-offset: 3px !important;
      pointer-events: none !important;
      transition: opacity 0.35s ease, filter 0.35s ease !important;
    }
    .swarm-rebuilt-element {
      opacity: 1 !important;
      filter: blur(0) !important;
      outline: none !important;
      pointer-events: auto !important;
      transition: opacity 0.4s ease, filter 0.4s ease !important;
    }

    /* Micro Bounding Box */
    .swarm-micro-box {
      position: absolute;
      border: 1.5px solid #2E6BC4;
      background: rgba(46, 107, 196, 0.06);
      pointer-events: none;
      z-index: 2147483630;
      border-radius: 4px;
    }
    .swarm-box-type-tag {
      position: absolute;
      top: -20px;
      left: 0;
      background: #2E6BC4;
      color: #FFFFFF;
      font-family: "Space Mono", monospace;
      font-size: 8.5px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 3px;
      white-space: nowrap;
    }
    .swarm-box-dim-tag {
      position: absolute;
      bottom: -18px;
      right: 0;
      background: #0B2545;
      color: #93C5FD;
      border: 1px solid #2E6BC4;
      font-family: "Space Mono", monospace;
      font-size: 8px;
      padding: 1px 4px;
      border-radius: 2px;
      white-space: nowrap;
    }
    .swarm-handle {
      position: absolute;
      width: 5px;
      height: 5px;
      background: #FFFFFF;
      border: 1px solid #2E6BC4;
      border-radius: 1px;
    }
    .handle-tl { top: -3px; left: -3px; }
    .handle-tr { top: -3px; right: -3px; }
    .handle-bl { bottom: -3px; left: -3px; }
    .handle-br { bottom: -3px; right: -3px; }

    /* Typing Field Frame Simulation */
    .swarm-text-field-box {
      position: absolute;
      border: 1.5px solid #2E6BC4;
      background: rgba(46, 107, 196, 0.08);
      border-radius: 6px;
      pointer-events: none;
      z-index: 2147483632;
      display: flex;
      align-items: center;
      padding: 4px 8px;
      box-sizing: border-box;
    }
    .swarm-type-caret {
      display: inline-block;
      width: 2px;
      height: 1.1em;
      background: #2E6BC4;
      margin-left: 2px;
      animation: swarmCaretBlink 0.6s infinite;
      vertical-align: middle;
    }
    @keyframes swarmCaretBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .swarm-micro-ripple {
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1.5px solid #2E6BC4;
      pointer-events: none;
      z-index: 2147483635;
      transform: translate(-50%, -50%) scale(0.2);
      animation: microRipple 0.5s ease-out forwards;
    }
    @keyframes microRipple {
      0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0.9; }
      100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
    }
  `;
  document.head.appendChild(styleEl);

  // ==========================================
  // 4. DOM CONTAINERS
  // ==========================================
  // Minimalist Status Dock at bottom-left
  const statusDock = document.createElement("div");
  statusDock.className = "swarm-status-dock";
  statusDock.id = "swarmStatusDock";
  statusDock.innerHTML = `
    <span class="swarm-dock-dot"></span>
    <span id="swarmDockText">REBUILDING</span>
    <span id="swarmDockCount" style="color:#93C5FD; font-size:10px;">0%</span>
    <button class="swarm-dock-close" id="swarmDockCancel">ESC</button>
  `;
  document.body.appendChild(statusDock);

  const cursorsLayer = document.createElement("div");
  cursorsLayer.id = "swarm-cursors-layer";
  document.body.appendChild(cursorsLayer);

  const cursorNodes = new Map();

  function spawnAgentCursors() {
    cursorsLayer.innerHTML = "";
    cursorNodes.clear();

    AGENTS.forEach(agent => {
      const el = document.createElement("div");
      el.className = "swarm-agent-cursor";
      el.id = `cursor-agent-${agent.id}`;
      el.innerHTML = `
        <svg class="swarm-cursor-svg" viewBox="0 0 24 24" fill="none">
          <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" 
                fill="${agent.color}" 
                stroke="#FFFFFF" 
                stroke-width="1.3"/>
        </svg>
        <div class="swarm-agent-tag" style="background:${agent.color};">
          <span>${agent.name}</span>
          <span class="swarm-action-label" id="act-label-${agent.id}">idle</span>
        </div>
      `;

      const startX = 40 + Math.random() * (window.innerWidth - 80);
      const startY = -60;
      el.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
      cursorsLayer.appendChild(el);

      cursorNodes.set(agent.id, {
        el,
        x: startX,
        y: startY,
        color: agent.color,
        name: agent.name,
        actEl: el.querySelector(`#act-label-${agent.id}`)
      });
    });
  }

  function moveAgent(agentId, targetX, targetY, action = "building", duration = 400) {
    const node = cursorNodes.get(agentId);
    if (!node) return;
    node.x = targetX;
    node.y = targetY;
    node.el.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    node.el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    if (node.actEl) {
      node.actEl.textContent = action;
    }
  }

  function emitRipple(x, y, color) {
    const r = document.createElement("div");
    r.className = "swarm-micro-ripple";
    r.style.left = `${x}px`;
    r.style.top = `${y}px`;
    r.style.borderColor = color;
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 550);
  }

  // Smooth scroll helper
  async function smoothScrollTo(targetY, duration = 0.8) {
    if (window.lenis) {
      window.lenis.scrollTo(targetY, { duration: duration });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
    await new Promise(r => setTimeout(r, Math.round(duration * 1000) + 150));
  }

  let isExecuting = false;
  let cancelToken = false;

  // ==========================================
  // 5. GRANULAR RECONSTRUCTION WITH TYPING
  // ==========================================
  async function executeGranularRebuild() {
    if (isExecuting) return;
    isExecuting = true;
    cancelToken = false;

    // Set red dot to recording state
    const redDot = document.querySelector(".swarm-rec-dot");
    if (redDot) redDot.classList.add("is-recording");

    statusDock.classList.add("is-visible");
    const dockText = document.getElementById("swarmDockText");
    const dockCount = document.getElementById("swarmDockCount");

    // Scroll to top
    await smoothScrollTo(0, 0.4);

    function get(selector, type, label) {
      const el = document.querySelector(selector);
      if (!el) return null;
      return { el, type, label };
    }

    function getAll(selector, type, label) {
      return Array.from(document.querySelectorAll(selector)).map(el => ({ el, type, label }));
    }

    // 1. Hero items
    const heroItems = [
      get(".nav-logo", "BRAND", "nav.logo"),
      ...getAll(".nav-menu .nav-link", "LINK", "nav.link"),
      get(".nav-cta-btn", "BUTTON", "btn.unduh-cv"),
      get(".hero-text-select-box .label", "TEXT", "hero.label"),
      get(".hero-title", "TEXT", "h1.fikri-bintang"),
      get(".hero-route", "TEXT", "hero.coords"),
      get(".hero-desc", "TEXT", "p.lead-desc"),
      ...getAll(".hero-actions a", "BUTTON", "hero.cta"),
      get(".celestial-orbit", "SVG", "celestial.orbit"),
      get(".constellation-layer", "SVG", "constellation.layer"),
      get(".photo-wrap.photo-celestial", "PHOTO", "foto-hero.png"),
      get(".photo-wrap.photo-celestial img", "PHOTO", "foto-hero.png"),
      get(".celestial-badge", "BADGE", "about.me.2026"),
      get(".badge-tilt", "BADGE", "terima.proyek"),
      get(".hero-bottombar", "BAR", "hero.bottombar"),
      get(".waves.celestial-horizon", "SVG", "horizon.waves")
    ].filter(Boolean);

    // 2. Cards in projects section
    const cardWrappers = Array.from(document.querySelectorAll(".card-sticky-wrapper"));

    // 2.5 Academic & 3D Tactile Manilla Folders
    const academicItems = [
      get("#publikasi .research-callout-card", "CARD", "research.callout"),
      get("#academicShelf h3", "TEXT", "academic.title"),
      get("#academicShelf .mono", "BADGE", "academic.verified"),
      ...getAll(".tactile-folder", "FOLDER", "manilla.folder")
    ].filter(Boolean);

    // 3. Process items
    const processItems = [
      get(".process-header .process-title", "TEXT", "h2.proses"),
      ...getAll(".process-cards > div, .process-step", "STEP", "process.card")
    ].filter(Boolean);

    // 4. Experience Roadmap & About items
    const experienceItems = [
      get(".experience-title", "TEXT", "h2.experience"),
      get("#journeyRoadSvg", "SVG", "journey.roadmap"),
      ...getAll(".journey-stop", "STOP", "career.stop")
    ].filter(Boolean);

    const aboutItems = [
      ...experienceItems,
      get(".about-imgs img", "PHOTO", "about.photo"),
      get(".about-text h2, .about-text h3", "TEXT", "about.title"),
      ...getAll(".about-text p", "TEXT", "about.desc"),
      ...getAll(".career-card, .matrix-row, .dossier-card", "ROW", "career.matrix")
    ].filter(Boolean);

    // 5. Contact items
    const contactItems = [
      get(".contact-title", "TEXT", "h2.kontak"),
      get(".ticket, .stub-ticket", "TICKET", "boarding.pass"),
      get(".contact .btn-navy", "BUTTON", "btn.whatsapp")
    ].filter(Boolean);

    // 6. Dedicated Polished Footer & Walking Crowd sequence
    const footerItems = [
      get(".footer .zigzag", "SVG", "footer.zigzag"),
      get(".footer-crowd-title", "TEXT", "footer.see-you-around"),
      get(".footer-crowd-name", "TEXT", "footer.name.fikri"),
      get(".footer-standing-wrap img", "PHOTO", "fikri.character"),
      get(".footer-crowd-strip canvas", "CANVAS", "walking.crowd"),
      get(".footer p.mono.label.light", "TEXT", "footer.thankyou"),
      get(".footer-desc", "TEXT", "footer.desc"),
      ...getAll(".footer-cols > div", "COL", "footer.col"),
      get(".footer-giant", "TEXT", "footer.giant.fikri-bintang"),
      get(".footer-base", "LEGAL", "footer.legal")
    ].filter(Boolean);

    let totalItems = heroItems.length + 2 + (cardWrappers.length * 4) + academicItems.length + processItems.length + aboutItems.length + contactItems.length + footerItems.length;
    let completedCount = 0;

    dockCount.textContent = `0%`;
    dockText.textContent = `BLUEPRINT WIPE`;
    playWipeSwoosh();

    // Deconstruct into ghost blueprint
    const allGhostTargets = [
      ...heroItems.map(it => it.el),
      ...cardWrappers.map(w => w.querySelector(".card")).filter(Boolean),
      ...academicItems.map(it => it.el),
      ...processItems.map(it => it.el),
      ...aboutItems.map(it => it.el),
      ...contactItems.map(it => it.el),
      ...footerItems.map(it => it.el)
    ];

    allGhostTargets.forEach(el => {
      el.classList.remove("swarm-rebuilt-element");
      el.classList.add("swarm-ghost-element");
    });

    spawnAgentCursors();
    await new Promise(r => setTimeout(r, 700));
    if (cancelToken) return exitRebuild(false);

    // REBUILD SINGLE ELEMENT WITH FIELD PLACEMENT & TYPING SIMULATION
    async function rebuildSingleElement(item, agentIndex) {
      if (cancelToken || !item || !item.el) return;
      const agent = AGENTS[agentIndex % AGENTS.length];
      const el = item.el;
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      const targetX = rect.left + scrollX + Math.min(80, rect.width * 0.4);
      const targetY = rect.top + scrollY + Math.min(40, rect.height * 0.5);

      // 1. If item is TEXT: Perform "Naro Field Text Trus Typing"
      if (item.type === "TEXT" && el.textContent.trim().length > 0) {
        moveAgent(agent.id, rect.left + scrollX + 10, rect.top + scrollY + 12, "naro field text", 360);
        await new Promise(r => setTimeout(r, 160));
        if (cancelToken) return;

        // Place dashed field frame with blinking caret
        const fieldBox = document.createElement("div");
        fieldBox.className = "swarm-text-field-box";
        fieldBox.style.left = `${rect.left + scrollX - 4}px`;
        fieldBox.style.top = `${rect.top + scrollY - 4}px`;
        fieldBox.style.width = `${rect.width + 8}px`;
        fieldBox.style.height = `${rect.height + 8}px`;
        fieldBox.innerHTML = `
          <div class="swarm-handle handle-tl"></div>
          <div class="swarm-handle handle-tr"></div>
          <div class="swarm-handle handle-bl"></div>
          <div class="swarm-handle handle-br"></div>
          <div class="swarm-box-type-tag">INPUT · ${item.label}</div>
          <div class="swarm-box-dim-tag">typing...</div>
        `;
        document.body.appendChild(fieldBox);
        playTick();

        moveAgent(agent.id, rect.left + scrollX + Math.min(rect.width * 0.6, 120), rect.top + scrollY + 16, "typing...", 300);

        // Stream typing sounds
        for (let t = 0; t < 3; t++) {
          await new Promise(r => setTimeout(r, 60));
          playTypeTick();
        }

        await new Promise(r => setTimeout(r, 100));
        fieldBox.remove();
      } else {
        // Standard non-text element (photo, button, card, etc.)
        let verb = "styling";
        if (item.type === "PHOTO") verb = "rendering photo";
        else if (item.type === "SVG") verb = "drawing svg";
        else if (item.type === "BUTTON") verb = "binding click";
        else if (item.type === "CARD") verb = "mounting shell";
        else if (item.type === "TICKET") verb = "printing pass";

        moveAgent(agent.id, targetX, targetY, verb, 380);
        await new Promise(r => setTimeout(r, 180));
        if (cancelToken) return;

        const box = document.createElement("div");
        box.className = "swarm-micro-box";
        box.style.left = `${rect.left + scrollX - 3}px`;
        box.style.top = `${rect.top + scrollY - 3}px`;
        box.style.width = `${rect.width + 6}px`;
        box.style.height = `${rect.height + 6}px`;
        box.innerHTML = `
          <div class="swarm-handle handle-tl"></div>
          <div class="swarm-handle handle-tr"></div>
          <div class="swarm-handle handle-bl"></div>
          <div class="swarm-handle handle-br"></div>
          <div class="swarm-box-type-tag">${item.type} · ${item.label}</div>
          <div class="swarm-box-dim-tag">${Math.round(rect.width)}×${Math.round(rect.height)}</div>
        `;
        document.body.appendChild(box);
        playTick();

        await new Promise(r => setTimeout(r, 200));
        if (cancelToken) {
          box.remove();
          return;
        }
        box.remove();
      }

      // Snap rebuilt
      emitRipple(targetX, targetY, agent.color);
      el.classList.remove("swarm-ghost-element");
      el.classList.add("swarm-rebuilt-element");
      moveAgent(agent.id, targetX + 10, targetY + 10, "verified ✓", 180);

      completedCount++;
      const pct = Math.round((completedCount / totalItems) * 100);
      dockCount.textContent = `${pct}%`;
      playTone(360 + (completedCount / totalItems) * 520, 0.05, "sine", 0.07);
    }

    // ==========================================
    // SCENE 1: HERO & NAVBAR (STRICT TOP)
    // ==========================================
    dockText.textContent = "HERO & PORTRAIT";
    for (let i = 0; i < heroItems.length; i += 2) {
      if (cancelToken) return exitRebuild(false);
      const p1 = rebuildSingleElement(heroItems[i], i);
      const p2 = (i + 1 < heroItems.length) ? rebuildSingleElement(heroItems[i + 1], i + 1) : Promise.resolve();
      await Promise.all([p1, p2]);
    }
    await new Promise(r => setTimeout(r, 1000));

    // ==========================================
    // SCENE 2: KARYA PILIHAN (GSAP AUTO-STACKING CARDS)
    // ==========================================
    const worksSection = document.querySelector(".works");
    if (worksSection) {
      dockText.textContent = "KARYA / PROJECTS";
      const worksHeadTop = worksSection.getBoundingClientRect().top + window.scrollY - 40;
      await smoothScrollTo(worksHeadTop, 0.85);

      const wTitle = get(".works-head .works-title", "TEXT", "h2.karya");
      const wReceipt = get(".receipt", "RECEIPT", "observatorium.index");
      await rebuildSingleElement(wTitle, 0);
      await rebuildSingleElement(wReceipt, 1);
      await new Promise(r => setTimeout(r, 350));

      for (let cIdx = 0; cIdx < cardWrappers.length; cIdx++) {
        if (cancelToken) return exitRebuild(false);
        const wrapper = cardWrappers[cIdx];
        const card = wrapper.querySelector(".card");
        if (!card) continue;

        const cardTitleEl = card.querySelector(".card-title");
        const titleText = cardTitleEl ? cardTitleEl.textContent.trim().replace(/\s+/g, " ") : `Project #${cIdx + 1}`;
        dockText.textContent = `CARD [${cIdx + 1}/${cardWrappers.length}]`;

        const cardTargetY = wrapper.getBoundingClientRect().top + window.scrollY - 50;
        await smoothScrollTo(cardTargetY, 0.75);

        const cardItems = [
          { el: card, type: "CARD", label: `card.${cIdx+1}` },
          { el: card.querySelector(".polaroid-img-wrap img"), type: "PHOTO", label: "thumb.cover" },
          { el: cardTitleEl, type: "TEXT", label: "card.title" },
          { el: card.querySelector(".card-tech"), type: "TAGS", label: "card.tech" },
          { el: card.querySelector(".btn-open-modal"), type: "BUTTON", label: "btn.detail" }
        ].filter(it => it.el !== null);

        for (let k = 0; k < cardItems.length; k += 2) {
          if (cancelToken) return exitRebuild(false);
          const p1 = rebuildSingleElement(cardItems[k], k);
          const p2 = (k + 1 < cardItems.length) ? rebuildSingleElement(cardItems[k + 1], k + 1) : Promise.resolve();
          await Promise.all([p1, p2]);
        }
        await new Promise(r => setTimeout(r, 380));
      }
    }

    // ==========================================
    // SCENE 2.5: AKADEMIK & 3D MANILLA FOLDERS (#publikasi)
    // ==========================================
    const pubSection = document.getElementById("publikasi");
    if (pubSection && academicItems.length > 0) {
      dockText.textContent = "AKADEMIK & FOLDER 3D";
      const pubTop = pubSection.getBoundingClientRect().top + window.scrollY - 40;
      await smoothScrollTo(pubTop, 0.85);

      for (let i = 0; i < academicItems.length; i += 2) {
        if (cancelToken) return exitRebuild(false);
        const p1 = rebuildSingleElement(academicItems[i], i);
        const p2 = (i + 1 < academicItems.length) ? rebuildSingleElement(academicItems[i + 1], i + 1) : Promise.resolve();
        await Promise.all([p1, p2]);
      }
      await new Promise(r => setTimeout(r, 450));
    }

    // ==========================================
    // SCENE 3: PROSES (#proses)
    // ==========================================
    const processSection = document.getElementById("proses");
    if (processSection) {
      dockText.textContent = "PROSES SISTEM";
      const pTop = processSection.getBoundingClientRect().top + window.scrollY - 40;
      await smoothScrollTo(pTop, 0.85);

      for (let i = 0; i < processItems.length; i += 2) {
        if (cancelToken) return exitRebuild(false);
        const p1 = rebuildSingleElement(processItems[i], i);
        const p2 = (i + 1 < processItems.length) ? rebuildSingleElement(processItems[i + 1], i + 1) : Promise.resolve();
        await Promise.all([p1, p2]);
      }
      await new Promise(r => setTimeout(r, 500));
    }

    // ==========================================
    // SCENE 4: TENTANG (#tentang)
    // ==========================================
    const aboutSection = document.getElementById("tentang");
    if (aboutSection) {
      dockText.textContent = "EXPERIENCE ROADMAP";
      const aTop = aboutSection.getBoundingClientRect().top + window.scrollY - 40;
      await smoothScrollTo(aTop, 0.85);

      for (let i = 0; i < aboutItems.length; i += 2) {
        if (cancelToken) return exitRebuild(false);
        const p1 = rebuildSingleElement(aboutItems[i], i);
        const p2 = (i + 1 < aboutItems.length) ? rebuildSingleElement(aboutItems[i + 1], i + 1) : Promise.resolve();
        await Promise.all([p1, p2]);
      }
      await new Promise(r => setTimeout(r, 500));
    }

    // ==========================================
    // SCENE 5: KONTAK (#kontak)
    // ==========================================
    const contactSection = document.getElementById("kontak");
    if (contactSection) {
      dockText.textContent = "TIKET KOLABORASI";
      const cTop = contactSection.getBoundingClientRect().top + window.scrollY - 40;
      await smoothScrollTo(cTop, 0.85);

      for (let i = 0; i < contactItems.length; i += 2) {
        if (cancelToken) return exitRebuild(false);
        const p1 = rebuildSingleElement(contactItems[i], i);
        const p2 = (i + 1 < contactItems.length) ? rebuildSingleElement(contactItems[i + 1], i + 1) : Promise.resolve();
        await Promise.all([p1, p2]);
      }
      await new Promise(r => setTimeout(r, 500));
    }

    // ==========================================
    // SCENE 6: POLISHED FOOTER RECONSTRUCTION
    // ==========================================
    const footerSection = document.querySelector(".footer");
    if (footerSection) {
      dockText.textContent = "FOOTER & CROWD FINALE";
      const fTop = footerSection.getBoundingClientRect().top + window.scrollY - 40;
      await smoothScrollTo(fTop, 0.85);

      for (let i = 0; i < footerItems.length; i++) {
        if (cancelToken) return exitRebuild(false);
        await rebuildSingleElement(footerItems[i], i);
      }
      await new Promise(r => setTimeout(r, 700));
    }

    // COMPLETE CELEBRATION
    dockCount.textContent = "100%";
    dockText.textContent = "REBUILD COMPLETE ✨";
    playChime();

    AGENTS.forEach((a, idx) => {
      const outX = Math.random() * window.innerWidth;
      const outY = window.innerHeight + 90;
      setTimeout(() => {
        moveAgent(a.id, outX, outY, "synced ✓", 700);
      }, idx * 70);
    });

    await new Promise(r => setTimeout(r, 1100));
    exitRebuild(true);
  }

  function exitRebuild(success = true) {
    isExecuting = false;
    statusDock.classList.remove("is-visible");

    const redDot = document.querySelector(".swarm-rec-dot");
    if (redDot) redDot.classList.remove("is-recording");

    document.querySelectorAll(".swarm-ghost-element").forEach(el => {
      el.classList.remove("swarm-ghost-element");
      el.classList.add("swarm-rebuilt-element");
    });

    setTimeout(() => {
      cursorsLayer.innerHTML = "";
      cursorNodes.clear();
    }, 500);
  }

  // Red dot button in navbar
  const redDotBtn = document.getElementById("btnNavbarRebuild");
  if (redDotBtn) {
    redDotBtn.addEventListener("click", (e) => {
      e.preventDefault();
      executeGranularRebuild();
    });
  }

  // Cancel dock button
  const cancelBtn = document.getElementById("swarmDockCancel");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      cancelToken = true;
      exitRebuild(false);
    });
  }

  // Hotkey [R]
  window.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") {
      if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      executeGranularRebuild();
    } else if (e.key === "Escape") {
      if (isExecuting) {
        cancelToken = true;
        exitRebuild(false);
      }
    }
  });

  window.SwarmRebuild = {
    play: executeGranularRebuild,
    stop: () => { cancelToken = true; exitRebuild(false); },
    setSound: (val) => { soundEnabled = !!val; }
  };
})();
