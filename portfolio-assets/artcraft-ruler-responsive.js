/* ==========================================================================
   ARTCRAFT KINETIC NAVIGATION RULER · FULLY RESPONSIVE PRODUCTION ENGINE
   Pure Function of scrollY · GPU Composited · Zero Layout Thrashing
   Rock-Solid Horizon, Section & Card Geometric Contrast Engine
   ========================================================================== */

(function () {
  "use strict";

  // Navigation definition mapped to portfolio sections
  const NAV = (window.ARTCRAFT_NAV && Array.isArray(window.ARTCRAFT_NAV) && window.ARTCRAFT_NAV.length > 0)
    ? window.ARTCRAFT_NAV
    : [
        { id: 'hero',      label: 'OVERVIEW' },
        { id: 'karya',     label: 'KARYA' },
        { id: 'publikasi', label: 'RISET' },
        { id: 'proses',    label: 'PROSES' },
        { id: 'tentang',   label: 'TENTANG' },
        { id: 'kontak',    label: 'KONTAK' }
      ];

  const ROW_GAP = 8;
  const STAGGER_WINDOW = 0.58;
  const BOW_STRENGTH = 0.32;

  let RAIL_W = 68;
  let CW = 16;
  let VW = window.innerWidth;
  let VH = window.innerHeight;

  let RAIL_X, RIGHT_X, QUEUE_TOP_Y, PILE_TOP_Y, RAIL_ENTRY_Y, RAIL_EXIT_Y;

  function recalcLayout() {
    VW = window.innerWidth;
    VH = window.innerHeight;

    // Responsive rail width and char cell width
    if (VW <= 600) {
      RAIL_W = 32;
      CW = 11;
    } else if (VW <= 1024) {
      RAIL_W = 44;
      CW = 13;
    } else {
      RAIL_W = 68;
      CW = 16;
    }

    document.documentElement.style.setProperty('--ruler-rail-w', RAIL_W + 'px');
    document.documentElement.style.setProperty('--ruler-cw', CW + 'px');

    RAIL_X       = VW - (RAIL_W * 0.48);
    RIGHT_X      = VW - RAIL_W - (VW <= 600 ? 6 : 14);
    QUEUE_TOP_Y  = VH - (VW <= 600 ? 120 : 160);
    PILE_TOP_Y   = (VW <= 600 ? 50 : 75);
    RAIL_ENTRY_Y = VH * 0.80;
    RAIL_EXIT_Y  = VH * 0.20;
  }

  function measureCW() {
    const c = document.createElement('canvas').getContext('2d');
    const fsize = VW <= 600 ? "9.5px" : (VW <= 1024 ? "11px" : "13.5px");
    c.font = `800 ${fsize} 'Space Mono', ui-monospace, monospace`;
    const measured = Math.ceil(c.measureText('M').width) + 2;
    CW = Math.max(VW <= 600 ? 10 : 14, measured);
    document.documentElement.style.setProperty('--ruler-cw', CW + 'px');
  }

  // ---- Mathematical Primitives ----
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp  = (a, b, t) => a + (b - a) * t;
  const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function quadBezier(p0, pc, p1, t) {
    const u = 1 - t;
    return {
      x: u * u * p0.x + 2 * u * t * pc.x + t * t * p1.x,
      y: u * u * p0.y + 2 * u * t * pc.y + t * t * p1.y
    };
  }

  function bowControl(p0, p1) {
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const len = Math.hypot(dx, dy) || 1;
    const px = dy / len;
    const py = -dx / len;
    const bow = len * BOW_STRENGTH;
    return {
      x: (p0.x + p1.x) / 2 + px * bow,
      y: (p0.y + p1.y) / 2 + py * bow
    };
  }

  function queuePos(slot, i, N) {
    return {
      x: RIGHT_X - (N - 1 - i) * CW,
      y: QUEUE_TOP_Y + slot * (CW + ROW_GAP)
    };
  }
  function railPos(i, railY) {
    return {
      x: RAIL_X,
      y: railY - i * CW
    };
  }

  function pilePos(slot, i, N) {
    return {
      x: RIGHT_X - (N - 1 - i) * CW,
      y: PILE_TOP_Y + slot * (CW + ROW_GAP)
    };
  }
  function isPixelDark(screenX, screenY) {
    const probeY = clamp(screenY, 2, window.innerHeight - 2);
    const probeX = Math.max(10, Math.min(screenX, window.innerWidth - 30));

    // 1. TENTANG & KONTAK SECTIONS ARE 100% LIGHT IVORY -> SOLID BLACK/NAVY TEXT!
    const lightSections = document.querySelectorAll('#tentang, #kontak');
    for (let i = 0; i < lightSections.length; i++) {
      const r = lightSections[i].getBoundingClientRect();
      if (probeY >= r.top && probeY <= r.bottom) {
        return false; // IN TENTANG / KONTAK -> SOLID BLACK/NAVY TEXT (#0B2545)
      }
    }

    // 2. HERO SECTION
    const hero = document.getElementById('hero');
    const horizon = document.querySelector('.waves.celestial-horizon, .horizon-layer-1');
    if (hero) {
      const hr = hero.getBoundingClientRect();
      const waveTop = horizon ? horizon.getBoundingClientRect().top : hr.bottom - 120;
      // 2a. Upper hero (above waves) -> LIGHT IVORY/GRID -> SOLID BLACK/NAVY TEXT!
      if (probeY >= hr.top && probeY < waveTop + 15) {
        return false;
      }
      // 2b. Hero celestial waves -> DEEP BLUE WAVES -> SOLID WHITE TEXT (#FFFFFF)
      if (probeY >= waveTop + 15 && probeY <= hr.bottom + 15) {
        return true;
      }
    }

    // 3. WHITE CARDS / RECEIPTS / TICKETS IN KARYA -> SOLID BLACK/NAVY TEXT!
    const whiteCards = document.querySelectorAll('.card, .receipt, .about-card, .ticket');
    for (let i = 0; i < whiteCards.length; i++) {
      const cr = whiteCards[i].getBoundingClientRect();
      if (cr.height > 0 && probeY >= cr.top + 10 && probeY <= cr.bottom - 10 && probeX >= cr.left && probeX <= cr.right) {
        return false; // ON WHITE CARD -> SOLID BLACK/NAVY TEXT (#0B2545)
      }
    }

    // 4. EVERYWHERE ELSE IS DARK BLUE / BLACK COSMOS -> SOLID WHITE TEXT (#FFFFFF) WITH GLOW!
    // (Works starfield & headings, Publikasi, Proses, Footer)
    return true; // ON DARK COSMOS -> SOLID WHITE TEXT (#FFFFFF)
  }

  // ---- Section Item Model ----
  class Item {
    constructor(def, idx, stageEl) {
      this.idx = idx;
      this.id = def.id;
      this.label = def.label;
      this.N = def.label.length;
      this.el = document.getElementById(def.id);
      this.sectionTop = 0;
      this.sectionH = 0;

      this.chars = [...def.label].map((ch, i) => {
        const span = document.createElement('span');
        span.className = 'k-ch' + (ch === ' ' ? ' k-dim' : '');
        span.textContent = ch;
        span.setAttribute('data-target', def.id);
        span.title = `Lompat ke ${def.label}`;
        span.addEventListener('click', (e) => {
          e.stopPropagation();
          this.jumpTo();
        });
        stageEl.appendChild(span);
        return span;
      });

      this.state = 'queue';
      this.morph = 0;
      this.dwellT = 0;
      this.queueSlot = 0;
      this.pileSlot = 0;
    }

    measure() {
      if (!this.el) return;
      const r = this.el.getBoundingClientRect();
      this.sectionTop = r.top + (window.scrollY || window.pageYOffset);
      this.sectionH = Math.max(r.height, 400);
    }

    jumpTo() {
      const top = Math.max(0, this.sectionTop - 30);
      if (window.lenis) {
        window.lenis.scrollTo(top, { duration: 1.2 });
      } else {
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    }

    classify(sy) {
      const enterLead = VH * 0.82;
      const exitTrail = VH * 0.50;
      const enterStart = this.sectionTop - enterLead;
      const enterEnd   = this.sectionTop;
      const exitStart  = this.sectionTop + this.sectionH;
      const exitEnd    = exitStart + exitTrail;

      if (sy < enterStart) {
        this.state = 'queue';
        this.morph = 0;
      } else if (sy < enterEnd) {
        this.state = 'enter';
        this.morph = (sy - enterStart) / (enterEnd - enterStart);
      } else if (sy < exitStart) {
        this.state = 'dwell';
        this.dwellT = (sy - enterEnd) / Math.max(1, (exitStart - enterEnd));
      } else if (sy < exitEnd) {
        this.state = 'exit';
        this.morph = (sy - exitStart) / (exitEnd - exitStart);
      } else {
        this.state = 'piled';
        this.morph = 1;
      }
    }

    render(sy) {
      const N = this.N;
      const isDwelling = (this.state === 'dwell');

      this.chars.forEach((span, i) => {
        let x, y, rot = 0;
        const stagDelay = (N <= 1 ? 0 : (i / (N - 1))) * (1 - STAGGER_WINDOW);
        const t = clamp((this.morph - stagDelay) / STAGGER_WINDOW, 0, 1);
        const e = easeInOutCubic(t);

        if (this.state === 'queue') {
          ({ x, y } = queuePos(this.queueSlot, i, N));
          rot = 0;
          span.classList.remove('k-active');
          span.style.opacity = '';
          span.style.pointerEvents = 'auto';
        } else if (this.state === 'enter') {
          const p0 = queuePos(this.queueSlot, i, N);
          const p1 = railPos(i, RAIL_ENTRY_Y);
          const c  = bowControl(p0, p1);
          ({ x, y } = quadBezier(p0, c, p1, e));
          rot = lerp(0, -90, e);
          span.classList.remove('k-active');
          span.style.opacity = '';
          span.style.pointerEvents = 'auto';
        } else if (this.state === 'dwell') {
          const railY = lerp(RAIL_ENTRY_Y, RAIL_EXIT_Y, this.dwellT);
          ({ x, y } = railPos(i, railY));
          rot = -90;
          span.classList.add('k-active');
          span.style.opacity = '1';
          span.style.pointerEvents = 'auto';
        } else if (this.state === 'exit') {
          const p0 = railPos(i, RAIL_EXIT_Y);
          const p1 = pilePos(this.pileSlot, i, N);
          const c  = bowControl(p0, p1);
          ({ x, y } = quadBezier(p0, c, p1, e));
          rot = lerp(-90, 0, e);
          span.classList.remove('k-active');
          span.style.opacity = '';
          span.style.pointerEvents = 'auto';
        } else { // piled
          ({ x, y } = pilePos(this.pileSlot, i, N));
          rot = 0;
          span.classList.remove('k-active');
          span.style.opacity = '';
          span.style.pointerEvents = 'auto';
        }

        // Apply dynamic contrast per character based on underlying element
        const inDark = isPixelDark(x, y);
        span.classList.toggle('k-on-dark', inDark);

        // Hardware composited transform
        span.style.transform = `translate3d(${(x - CW / 2).toFixed(1)}px, ${(y - CW / 2).toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg)`;
      });
    }
  }

  // ---- Retina Canvas Engineering Ticks with Per-Tick Contrast ----
  function drawRulerTicks(rulerCanvas) {
    if (!rulerCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = RAIL_W;
    const h = VH;

    if (rulerCanvas.width !== Math.round(w * dpr) || rulerCanvas.height !== Math.round(h * dpr)) {
      rulerCanvas.width = Math.round(w * dpr);
      rulerCanvas.height = Math.round(h * dpr);
    }

    const ctx = rulerCanvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const totalLines = 100;
    const step = h / totalLines;
    const isMobile = (w <= 36);

    for (let i = 0; i <= totalLines; i++) {
      const y = i * step;
      const isMajor = (i % 10 === 0);
      const isMid = (i % 5 === 0 && !isMajor);
      const len = isMajor ? (isMobile ? 12 : 18) : (isMid ? (isMobile ? 7 : 11) : (isMobile ? 4 : 6));
      const stroke = isMajor ? 1.5 : (isMid ? 1.0 : 0.6);
      const alpha = isMajor ? 0.80 : (isMid ? 0.45 : 0.22);

      // Check darkness for THIS exact tick Y coordinate!
      const tickIsDark = isPixelDark(w - 10, y);

      ctx.strokeStyle = tickIsDark
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(11, 37, 69, ${alpha})`;
      ctx.lineWidth = stroke;
      ctx.beginPath();
      ctx.moveTo(w - len - 2, y);
      ctx.lineTo(w - 2, y);
      ctx.stroke();

      if (isMajor && i > 0 && i < 100) {
        ctx.fillStyle = tickIsDark
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(11, 37, 69, 0.90)";
        ctx.font = isMobile ? "800 7.5px 'Space Mono', monospace" : "800 8.5px 'Space Mono', monospace";
        const xOffset = isMobile ? 3 : 5;
        ctx.fillText(String(i).padStart(2, '0'), xOffset, y + 3);
      }
    }
  }

  // ---- Main Initialization ----
  function initEngine() {
    const ruler = document.getElementById('artcraftRuler');
    const thumb = document.getElementById('rulerThumb');
    const thumbPct = document.getElementById('rulerThumbPct');
    const stage = document.getElementById('kineticRulerStage');
    const canvas = document.getElementById('rulerScaleCanvas');

    if (!ruler || !thumb || !stage || !canvas) return;

    recalcLayout();
    measureCW();
    drawRulerTicks(canvas);

    // Populate Items
    stage.innerHTML = '';
    const items = NAV.map((d, i) => new Item(d, i, stage));
    items.forEach(it => it.measure());

    // Main Render Loop
    function update() {
      const sy = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - VH);
      const p = clamp(sy / maxScroll, 0, 1);

      // 1. Move Thumb (Scrubber)
      const rH = ruler.clientHeight || VH;
      const thumbY = p * (rH - 24);
      thumb.style.transform = `translate3d(0, ${thumbY.toFixed(1)}px, 0)`;

      // Percentage Text (if element exists)
      if (thumbPct) {
        const pctStr = Math.round(p * 100).toString().padStart(3, '0') + '%';
        thumbPct.textContent = pctStr;
      }

      // 2. Track & Scrubber Dark Zone Adaptivity via direct point sampling
      const isDark = isPixelDark(VW - 20, thumbY + 12);
      ruler.classList.toggle('ruler-dark', isDark);

      // Redraw ticks with per-tick contrast
      drawRulerTicks(canvas);

      // 3. Classify all items against current scroll
      items.forEach(it => it.classify(sy));

      let qCount = 0;
      let pCount = 0;
      items.forEach(it => {
        if (it.state === 'queue' || it.state === 'enter') it.queueSlot = qCount++;
        if (it.state === 'piled' || it.state === 'exit')  it.pileSlot  = pCount++;
      });

      // 4. Render all characters via GPU translate3d + rotate + dynamic contrast
      items.forEach(it => it.render(sy));
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    }

    // Ruler Drag-to-Scrub
    let dragging = false;
    function scrubFromClientY(clientY) {
      const r = ruler.getBoundingClientRect();
      const p = clamp((clientY - r.top - 12) / (r.height - 24), 0, 1);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - VH);
      const targetY = p * maxScroll;
      if (window.lenis) {
        window.lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    }

    ruler.addEventListener('pointerdown', e => {
      dragging = true;
      ruler.setPointerCapture(e.pointerId);
      scrubFromClientY(e.clientY);
    });

    ruler.addEventListener('pointermove', e => {
      if (dragging) scrubFromClientY(e.clientY);
    });

    ruler.addEventListener('pointerup', () => { dragging = false; });
    ruler.addEventListener('pointercancel', () => { dragging = false; });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      recalcLayout();
      measureCW();
      items.forEach(it => it.measure());
      update();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measureCW();
        update();
      });
    }

    // Connect to GSAP ticker if available
    if (window.gsap && window.gsap.ticker) {
      window.gsap.ticker.add(update);
    }

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngine);
  } else {
    initEngine();
  }
})();
