/* ==========================================================================
   ARTCRAFT KINETIC NAVIGATION RULER · PRODUCTION ENGINE
   Claude Mathematical Architecture:
   - Staggered Quadratic Bézier Ribbon Peeling
   - Pure Function of scrollY (Scrub-safe, Zero State Drift)
   - Monospace CW Cached Once (Zero Layout Reads in Render Loop)
   - GPU-Composited translate3d + rotate(-90deg)
   - Retina Canvas Engineering Ticks + Interactive 1:1 Scrubber
   ========================================================================== */

(function () {
  "use strict";

  // Navigation definition mapped to portfolio sections (Dynamic fallback via window.ARTCRAFT_NAV)
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

  const RAIL_W = 68;
  const ROW_GAP = 10;
  const STAGGER_WINDOW = 0.58;
  const BOW_STRENGTH = 0.32;

  let CW = 16; // Char cell width, measured dynamically against monospace font
  let VW = window.innerWidth;
  let VH = window.innerHeight;

  let RAIL_X, RIGHT_X, QUEUE_TOP_Y, PILE_TOP_Y, RAIL_ENTRY_Y, RAIL_EXIT_Y;

  function recalcLayout() {
    VW = window.innerWidth;
    VH = window.innerHeight;

    // Desktop only; bail out if on mobile/tablet portrait
    if (VW <= 1024) return;

    RAIL_X       = VW - 36;
    RIGHT_X      = VW - RAIL_W - 18;
    QUEUE_TOP_Y  = VH - 170;
    PILE_TOP_Y   = 80 + parseFloat(getComputedStyle(document.documentElement).paddingTop || 0);
    RAIL_ENTRY_Y = VH * 0.80;
    RAIL_EXIT_Y  = VH * 0.20;
  }

  function measureCW() {
    const c = document.createElement('canvas').getContext('2d');
    c.font = "700 13.5px 'Space Mono', ui-monospace, monospace";
    CW = Math.max(15, Math.ceil(c.measureText('M').width) + 3);
    document.documentElement.style.setProperty('--ruler-cw', CW + 'px');
  }

  // ---- Mathematical Primitives (Claude Pure Functions) ----
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
    const py = -dx / len; // Perpendicular vector for organic ribbon curl
    const bow = len * BOW_STRENGTH;
    return {
      x: (p0.x + p1.x) / 2 + px * bow,
      y: (p0.y + p1.y) / 2 + py * bow
    };
  }

  // Positional primitives (pure arithmetic, zero DOM reads)
  function queuePos(slot, i, N) {
    return {
      x: RIGHT_X - (N - 1 - i) * CW,
      y: QUEUE_TOP_Y + slot * (CW + ROW_GAP)
    };
  }

  function railPos(i, railY) {
    // Character 0 at bottom, character N-1 at top (rotate -90deg bottom-to-top reading)
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
        } else if (this.state === 'enter') {
          const p0 = queuePos(this.queueSlot, i, N);
          const p1 = railPos(i, RAIL_ENTRY_Y);
          const c  = bowControl(p0, p1);
          ({ x, y } = quadBezier(p0, c, p1, e));
          rot = lerp(0, -90, e);
          span.classList.add('k-active');
          span.style.opacity = '1';
        } else if (this.state === 'dwell') {
          const railRideY = lerp(RAIL_ENTRY_Y, RAIL_EXIT_Y, this.dwellT);
          ({ x, y } = railPos(i, railRideY));
          rot = -90;
          span.classList.add('k-active');
          span.style.opacity = '1';
        } else if (this.state === 'exit') {
          const p0 = railPos(i, RAIL_EXIT_Y);
          const p1 = pilePos(this.pileSlot, i, N);
          const c  = bowControl(p0, p1);
          ({ x, y } = quadBezier(p0, c, p1, e));
          rot = lerp(-90, 0, e);
          span.classList.remove('k-active');
          span.style.opacity = '';
        } else { // piled
          ({ x, y } = pilePos(this.pileSlot, i, N));
          rot = 0;
          span.classList.remove('k-active');
          span.style.opacity = '';
        }

        // Dynamic dark background adaptation per character
        const charDocY = sy + y;
        if (isDocYDark(charDocY)) {
          span.classList.add('k-on-dark');
        } else {
          span.classList.remove('k-on-dark');
        }

        span.style.transform = `translate3d(${(x - CW / 2).toFixed(1)}px, ${(y - CW / 2).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      });
    }
  }

  let items = [];
  let darkRegions = [];

  function measureDarkRegions() {
    darkRegions = [];
    const darkSelectors = ['.works', '.process', '.footer', '.card-dark', '#karya', '#proses'];
    const seen = new Set();
    darkSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (seen.has(el)) return;
        seen.add(el);
        const r = el.getBoundingClientRect();
        const top = r.top + (window.scrollY || window.pageYOffset);
        const bottom = top + r.height;
        if (r.height > 50) {
          darkRegions.push({ top, bottom });
        }
      });
    });
  }

  function isDocYDark(docY) {
    for (let j = 0; j < darkRegions.length; j++) {
      if (docY >= darkRegions[j].top && docY <= darkRegions[j].bottom) {
        return true;
      }
    }
    return false;
  }

  function assignSlots() {
    let qSlot = 0;
    let pSlot = 0;
    items.forEach(it => {
      if (it.state === 'queue') it.queueSlot = qSlot++;
      if (it.state === 'piled' || it.state === 'exit') it.pileSlot = pSlot++;
    });
  }

  // ---- Crisp Canvas Ticks Drawing ----
  let isDarkModeActive = false;
  function drawRulerTicks(rulerCanvas, isDark) {
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

    for (let i = 0; i <= totalLines; i++) {
      const y = i * step;
      const isMajor = (i % 10 === 0);
      const isMid = (i % 5 === 0 && !isMajor);
      const len = isMajor ? 18 : (isMid ? 11 : 6);
      const stroke = isMajor ? 1.5 : (isMid ? 1.0 : 0.6);
      const alpha = isMajor ? 0.65 : (isMid ? 0.35 : 0.16);

      ctx.strokeStyle = isDark
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(11, 37, 69, ${alpha})`;
      ctx.lineWidth = stroke;
      ctx.beginPath();
      ctx.moveTo(w - len - 3, y);
      ctx.lineTo(w - 3, y);
      ctx.stroke();

      if (isMajor && i > 0 && i < 100) {
        ctx.fillStyle = isDark
          ? "rgba(169, 198, 232, 0.75)"
          : "rgba(107, 107, 110, 0.75)";
        ctx.font = "700 8.5px 'Space Mono', monospace";
        ctx.fillText(String(i).padStart(2, '0'), 5, y + 3);
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

    // Mobile / Tablet check
    if (window.innerWidth <= 1024) return;

    recalcLayout();
    measureCW();
    measureDarkRegions();
    drawRulerTicks(canvas, false);

    // Populate Items
    stage.innerHTML = '';
    items = NAV.map((d, i) => new Item(d, i, stage));
    items.forEach(it => it.measure());

    // Main Render Loop function
    function update() {
      if (window.innerWidth <= 1024) return;

      const sy = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - VH);
      const p = clamp(sy / maxScroll, 0, 1);

      // 1. Move Thumb needle & update percentage
      const trackH = VH - 28;
      const needleY = 14 + p * trackH;
      thumb.style.transform = `translate3d(0, ${needleY.toFixed(1)}px, 0)`;
      if (thumbPct) {
        thumbPct.textContent = `${String(Math.round(p * 100)).padStart(3, '0')}%`;
      }

      // 2. Classify state per item
      items.forEach(it => it.classify(sy));
      assignSlots();

      // 3. Dynamic Dark Contrast Check for Ruler Track (measured at viewport center)
      const midDocY = sy + (VH * 0.5);
      const shouldBeDark = isDocYDark(midDocY);
      if (shouldBeDark !== isDarkModeActive) {
        isDarkModeActive = shouldBeDark;
        if (isDarkModeActive) {
          ruler.classList.add('ruler-dark');
        } else {
          ruler.classList.remove('ruler-dark');
        }
        drawRulerTicks(canvas, isDarkModeActive);
      }

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
      const p = clamp((clientY - r.top - 14) / (r.height - 28), 0, 1);
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
      if (window.innerWidth <= 1024) return;
      recalcLayout();
      measureCW();
      measureDarkRegions();
      drawRulerTicks(canvas, isDarkModeActive);
      items.forEach(it => it.measure());
      update();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measureCW();
        measureDarkRegions();
        update();
      });
    }

    // Connect to GSAP ticker if available for 120Hz/ProMotion sync
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
