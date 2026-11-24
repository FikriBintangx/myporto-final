/* ==========================================================================
   ARTCRAFT KINETIC NAVIGATION RULER
   Labels ride the right rail as a pure function of scroll position.

   Modeled on getartcraft.com. Per section, one state at a time:
     queue  -> horizontal word, right-aligned in a fixed row at the bottom-right
     enter  -> each character turns a corner (right, then up) onto the rail,
               rotating 0deg -> -90deg; the last letter leads
     dwell  -> word stands vertical on the rail and climbs with section progress
     exit   -> each character turns a corner (up, then left) into a fixed row
               at the top-right, rotating -90deg -> 0deg; the last letter leads
     piled  -> horizontal word resting in its top-right row
   Rows are fixed per section, so words never reflow while others move.

   Frame budget: all DOM geometry is read in measure() (resize, load, layout
   change). The per-frame path is arithmetic plus transform/opacity writes,
   driven by the same gsap.ticker that drives Lenis.
   ========================================================================== */

(function () {
  "use strict";

  const NAV = (Array.isArray(window.ARTCRAFT_NAV) && window.ARTCRAFT_NAV.length > 0)
    ? window.ARTCRAFT_NAV
    : [
        { id: 'hero',      label: 'OVERVIEW' },
        { id: 'karya',     label: 'KARYA' },
        { id: 'publikasi', label: 'RISET' },
        { id: 'proses',    label: 'PROSES' },
        { id: 'tentang',   label: 'TENTANG' },
        { id: 'kontak',    label: 'KONTAK' }
      ];

  // Fraction of the viewport over which a label enters / exits.
  const TRANSITION_VH = 0.35;
  const ROW_GAP = 7;
  // Share of the transition each character spends moving (rest is stagger).
  const STAGGER_WINDOW = 0.55;
  const LIGHT_SECTION_SELECTOR = '#publikasi, #tentang, #kontak';
  const WHITE_CARD_SELECTOR = '.card, .receipt, .about-card, .ticket';

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
    const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // ---- Layout (recomputed on resize) ----
  const L = {
    VW: 0, VH: 0,
    RAIL_W: 68,
    CW: 16,
    RAIL_X: 0,       // horizontal center of vertical labels on the rail
    TRACK_TOP: 0,    // top edge of rail track (below navbar on tablet/mobile)
    TRACK_H: 0,      // height of rail track
    TOP: 80,         // first top-right pile row (below the navbar)
    BOTTOM: 0,       // last bottom-right queue row
    ROW: 22,         // row pitch of queue / pile words
    ROW_END_X: 0,    // right edge of queue / pile words (just left of the rail)
    COUNT: 1,
    maxScroll: 1
  };

  function recalcLayout() {
    L.VW = window.innerWidth;
    L.VH = window.innerHeight;
    const isPhone = L.VW <= 600;
    const isTablet = !isPhone && L.VW <= 1024;
    L.RAIL_W = isPhone ? 28 : (isTablet ? 44 : 68);

    const fsize = isPhone ? 8.5 : (isTablet ? 10.5 : 13.5);
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = `800 ${fsize}px 'Space Mono', ui-monospace, monospace`;
    L.CW = Math.max(isPhone ? 9 : (isTablet ? 12 : 14), Math.ceil(ctx.measureText('M').width) + (isPhone ? 1 : 2));

    // Place vertical text in the clear lane left of the right-edge ticks so it never collides.
    L.RAIL_X = isPhone
      ? L.VW - L.RAIL_W + 9.5
      : (isTablet ? L.VW - L.RAIL_W + 15 : L.VW - L.RAIL_W / 2);

    const nav = document.getElementById('site-nav');
    const navBottom = nav ? clamp(Math.round(nav.getBoundingClientRect().bottom), 0, 120) : (L.VW <= 960 ? 48 : 64);
    L.TRACK_TOP = (isPhone || isTablet) ? navBottom : 0;
    L.TRACK_H = Math.max(120, L.VH - L.TRACK_TOP);

    L.ROW = L.CW + ROW_GAP;
    L.TOP = navBottom + 12 + L.ROW / 2;
    L.BOTTOM = L.VH - (isPhone ? 20 : 28);
    L.ROW_END_X = L.VW - L.RAIL_W - (isPhone ? 6 : 10);

    const root = document.documentElement.style;
    root.setProperty('--ruler-rail-w', L.RAIL_W + 'px');
    root.setProperty('--ruler-cw', L.CW + 'px');
    root.setProperty('--ruler-nav-h', navBottom + 'px');
    root.setProperty('--ruler-top', L.TRACK_TOP + 'px');
  }

  function currentScroll() {
    const l = window.lenis;
    return l && typeof l.scroll === 'number' ? l.scroll : (window.scrollY || document.documentElement.scrollTop || 0);
  }

  function computeMaxScroll() {
    const l = window.lenis;
    if (l && typeof l.limit === 'number' && l.limit > 0) return l.limit;
    return Math.max(1, document.documentElement.scrollHeight - L.VH);
  }

  // ---- Contrast map: document-space zones, rebuilt in measure() ----
  const Z = { light: [], heroLight: null, heroDark: null, cards: [] };

  function docRect(el, sy) {
    const r = el.getBoundingClientRect();
    return { top: r.top + sy, bottom: r.bottom + sy, left: r.left, right: r.right, h: r.height };
  }

  function buildContrastMap(sy) {
    Z.light = [...document.querySelectorAll(LIGHT_SECTION_SELECTOR)].map(el => docRect(el, sy));
    Z.cards = [...document.querySelectorAll(WHITE_CARD_SELECTOR)]
      .map(el => docRect(el, sy))
      .filter(r => r.h > 0);

    const hero = document.getElementById('hero');
    Z.heroLight = Z.heroDark = null;
    if (hero) {
      const hr = docRect(hero, sy);
      const horizon = document.querySelector('.waves.celestial-horizon, .horizon-layer-1');
      const waveTop = horizon ? docRect(horizon, sy).top : hr.bottom - 120;
      Z.heroLight = { top: hr.top, bottom: waveTop + 15 };
      Z.heroDark = { top: waveTop + 15, bottom: hr.bottom + 15 };
    }
  }

  // Pure lookup: true when the backdrop at (screenX, screenY) is dark.
  function isDarkAt(screenX, screenY, sy) {
    const y = clamp(screenY, 2, L.VH - 2) + sy;
    const x = clamp(screenX, 10, L.VW - 30);

    for (let i = 0; i < Z.light.length; i++) {
      const r = Z.light[i];
      if (y >= r.top && y <= r.bottom) return false;
    }
    if (Z.heroLight && y >= Z.heroLight.top && y < Z.heroLight.bottom) return false;
    if (Z.heroDark && y >= Z.heroDark.top && y <= Z.heroDark.bottom) return true;
    for (let i = 0; i < Z.cards.length; i++) {
      const r = Z.cards[i];
      if (y >= r.top + 10 && y <= r.bottom - 10 && x >= r.left && x <= r.right) return false;
    }
    return true;
  }

  // ---- Navigation ----
  function glideTo(target, opts) {
    if (typeof window.smoothScrollTo === 'function') {
      window.smoothScrollTo(target, opts);
      return;
    }
    const y = typeof target === 'number'
      ? target
      : target.getBoundingClientRect().top + window.scrollY - 72;
    if (window.lenis) window.lenis.scrollTo(y, Object.assign({ force: true }, opts));
    else window.scrollTo({ top: y, behavior: opts && opts.immediate ? 'auto' : 'smooth' });
  }

  // ---- One label (section) ----
  class Label {
    constructor(def, idx, stage) {
      this.idx = idx;
      this.id = def.id;
      this.label = def.label;
      this.N = def.label.length;
      this.el = document.getElementById(def.id);
      this.top = 0;
      this.bottom = 0;
      this.state = 'queue';
      this.t = 0;

      this.chars = [...def.label].map(ch => {
        const span = document.createElement('span');
        span.className = 'k-ch' + (ch === ' ' ? ' k-dim' : '');
        span.textContent = ch;
        span.dataset.target = def.id;
        span.title = `Lompat ke ${def.label}`;
        span.addEventListener('pointerdown', e => e.stopPropagation());
        span.addEventListener('click', e => {
          e.stopPropagation();
          if (this.el) glideTo(this.el);
        });
        stage.appendChild(span);
        return { span, tf: '', op: '', dark: null, active: null, hit: null };
      });
    }

    measure(sy) {
      if (!this.el) return;
      const r = this.el.getBoundingClientRect();
      this.top = r.top + sy;
      this.bottom = this.top + Math.max(r.height, 1);
    }

    // Reference line is the viewport center: a section is "active" while the
    // center line lies inside it.
    classify(sy) {
      const ref = sy + L.VH * 0.5;
      const span = L.VH * TRANSITION_VH;
      if (!this.el || ref < this.top - span) { this.state = 'queue'; this.t = 0; }
      else if (ref < this.top) { this.state = 'enter'; this.t = (ref - (this.top - span)) / span; }
      else if (ref < this.bottom) { this.state = 'dwell'; this.t = (ref - this.top) / Math.max(1, this.bottom - this.top); }
      else if (ref < this.bottom + span) { this.state = 'exit'; this.t = (ref - this.bottom) / span; }
      else { this.state = 'piled'; this.t = 1; }
    }

    // Fixed rows: section k always queues / piles in the same row.
    queueRowY() { return L.BOTTOM - (L.COUNT - 1 - this.idx) * L.ROW; }
    pileRowY() { return L.TOP + this.idx * L.ROW; }
    rowCharX(i) { return L.ROW_END_X - (this.N - 1 - i + 0.5) * L.CW; }

    // Rail span shared by every section: just above the queue block, down from
    // just below the pile block. Values are the center of character 0.
    // On phones, queue/pile rows are hidden so the active vertical label uses
    // the full clear span between the navbar and bottom edge.
    railStartY() {
      if (L.VW <= 600) return L.VH - 24;
      return L.BOTTOM - (L.COUNT - 1) * L.ROW - L.ROW;
    }
    railEndY() {
      const startY = this.railStartY();
      if (L.VW <= 600) {
        return Math.min(startY, L.TRACK_TOP + 20 + (this.N - 0.5) * L.CW);
      }
      const pileBottom = L.TOP + (L.COUNT - 1) * L.ROW + L.ROW;
      return Math.min(startY, pileBottom + (this.N - 0.5) * L.CW);
    }

    render(sy) {
      const isPhone = L.VW <= 600;
      const N = this.N;
      const CW = L.CW;
      const RX = L.RAIL_X;
      const startY = this.railStartY();
      const endY = this.railEndY();
      const qy = this.queueRowY();
      const py = this.pileRowY();
      const active = this.state === 'dwell';

      // On mobile phones, distribute all section menus cleanly along the right rail
      // so every menu item is always visible, readable, and tappable without overlapping content.
      let phoneBaseY = 0;
      let phoneStep = CW;
      if (isPhone) {
        const usableTop = L.TRACK_TOP + 18;
        const usableBot = L.VH - 18;
        const slotH = Math.max(48, (usableBot - usableTop) / Math.max(1, L.COUNT));
        const slotCenter = usableTop + (this.idx + 0.5) * slotH;
        phoneStep = Math.min(CW, Math.max(6.5, (slotH - 12) / Math.max(1, N)));
        phoneBaseY = slotCenter + ((N - 1) * phoneStep) / 2;
      }

      for (let i = 0; i < N; i++) {
        const c = this.chars[i];
        // The last letter (i = N-1) leads on the way in and on the way out.
        const lead = N <= 1 ? 0 : (N - 1 - i) / (N - 1);
        const k = clamp((this.t - lead * (1 - STAGGER_WINDOW)) / STAGGER_WINDOW, 0, 1);
        const e = easeInOutCubic(k);

        let cx, cy, rot;
        if (isPhone) {
          cx = RX;
          cy = phoneBaseY - i * phoneStep;
          rot = -90;
        } else {
          switch (this.state) {
            case 'queue':
              cx = this.rowCharX(i); cy = qy; rot = 0;
              break;
            case 'enter': {
              // Corner turn: control point sits at (rail x, queue row y), so the
              // path leaves the row heading right and arrives on the rail heading up.
              const x0 = this.rowCharX(i), y0 = qy;
              const x1 = RX, y1 = startY - i * CW;
              const u = 1 - e;
              cx = u * u * x0 + 2 * u * e * x1 + e * e * x1;
              cy = u * u * y0 + 2 * u * e * y0 + e * e * y1;
              rot = lerp(0, -90, e);
              break;
            }
            case 'dwell':
              cx = RX; cy = lerp(startY, endY, this.t) - i * CW; rot = -90;
              break;
            case 'exit': {
              // Corner turn: control point at (rail x, pile row y): up, then left.
              const x0 = RX, y0 = endY - i * CW;
              const x1 = this.rowCharX(i), y1 = py;
              const u = 1 - e;
              cx = u * u * x0 + 2 * u * e * x0 + e * e * x1;
              cy = u * u * y0 + 2 * u * e * y1 + e * e * y1;
              rot = lerp(-90, 0, e);
              break;
            }
            default: // piled
              cx = this.rowCharX(i); cy = py; rot = 0;
          }
        }

        // Spans are CW x CW boxes positioned by their top-left corner.
        const tf = `translate3d(${(cx - CW / 2).toFixed(1)}px,${(cy - CW / 2).toFixed(1)}px,0) rotate(${rot.toFixed(1)}deg)`;
        if (tf !== c.tf) { c.span.style.transform = tf; c.tf = tf; }

        let op = 1;
        if (isPhone) {
          op = active ? 1 : (this.state === 'enter' || this.state === 'exit' ? 0.8 : 0.56);
        }
        const ops = op >= 0.999 ? '1' : op.toFixed(3);
        if (ops !== c.op) { c.span.style.opacity = ops; c.op = ops; }
        const hit = op > 0.35;
        if (hit !== c.hit) { c.span.style.pointerEvents = hit ? 'auto' : 'none'; c.hit = hit; }
        if (active !== c.active) { c.span.classList.toggle('k-active', active); c.active = active; }

        const dark = isDarkAt(cx, cy, sy);
        if (dark !== c.dark) { c.span.classList.toggle('k-on-dark', dark); c.dark = dark; }
      }
    }
  }

  // ---- Canvas ticks with per-tick contrast ----
  function drawTicks(canvas, sy) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = L.RAIL_W;
    const h = L.TRACK_H || L.VH;
    const W = Math.round(w * dpr);
    const H = Math.round(h * dpr);
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const total = w <= 36 ? 50 : 100;
    const step = h / total;
    const compact = w <= 36;
    const showNumbers = w >= 54;
    ctx.font = "800 8.5px 'Space Mono', monospace";

    for (let i = 0; i <= total; i++) {
      const y = i * step;
      const major = compact ? (i % 5 === 0) : (i % 10 === 0);
      const mid = !major && (compact ? false : (i % 5 === 0));
      const len = major ? (compact ? 7 : (w < 54 ? 10 : 18)) : mid ? (w < 54 ? 6 : 11) : (compact ? 3 : 6);
      const alpha = major ? 0.78 : mid ? 0.45 : 0.24;
      const dark = isDarkAt(L.VW - Math.min(10, w / 2), L.TRACK_TOP + y, sy);

      ctx.strokeStyle = dark ? `rgba(255,255,255,${alpha})` : `rgba(11,37,69,${alpha})`;
      ctx.lineWidth = major ? (compact ? 1.2 : 1.5) : mid ? 1 : 0.6;
      ctx.beginPath();
      ctx.moveTo(w - len - 2, y);
      ctx.lineTo(w - 2, y);
      ctx.stroke();

      if (showNumbers && major && i > 0 && i < total) {
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.95)' : 'rgba(11,37,69,0.9)';
        ctx.fillText(String(i).padStart(2, '0'), 5, y + 3);
      }
    }
  }

  // ---- Engine ----
  function initEngine() {
    const ruler = document.getElementById('artcraftRuler');
    const thumb = document.getElementById('rulerThumb');
    const stage = document.getElementById('kineticRulerStage');
    const canvas = document.getElementById('rulerScaleCanvas');
    if (!ruler || !thumb || !stage || !canvas) return;

    stage.innerHTML = '';
    L.COUNT = NAV.length;
    const labels = NAV.map((d, i) => new Label(d, i, stage));

    let lastSy = NaN;
    let dirty = true;

    function measure() {
      recalcLayout();
      const sy = currentScroll();
      L.maxScroll = computeMaxScroll();
      labels.forEach(l => l.measure(sy));
      buildContrastMap(sy);
      dirty = true;
    }

    function frame() {
      const sy = currentScroll();
      if (!dirty && sy === lastSy) return;
      dirty = false;
      lastSy = sy;

      const p = clamp(sy / L.maxScroll, 0, 1);
      const travel = Math.max(0, (L.TRACK_H || ruler.clientHeight || L.VH) - 24);
      const thumbY = p * travel;
      thumb.style.transform = `translate3d(0,${thumbY.toFixed(1)}px,0)`;
      ruler.classList.toggle('ruler-dark', isDarkAt(L.VW - Math.min(20, L.RAIL_W / 2), L.TRACK_TOP + thumbY + 12, sy));

      drawTicks(canvas, sy);

      for (let i = 0; i < labels.length; i++) {
        labels[i].classify(sy);
        labels[i].render(sy);
      }
    }

    // Drive from the same clock as Lenis so labels never lag a frame behind.
    if (window.gsap && window.gsap.ticker) {
      window.gsap.ticker.add(frame);
    } else {
      const loop = () => { frame(); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }

    // ---- Drag-to-scrub ----
    // Press glides to the point; dragging tracks the pointer 1:1.
    let dragging = false;
    function scrollForClientY(clientY) {
      const r = ruler.getBoundingClientRect();
      const p = clamp((clientY - r.top - 12) / Math.max(1, r.height - 24), 0, 1);
      return p * computeMaxScroll();
    }
    function scrubTo(y, immediate) {
      if (window.lenis) window.lenis.scrollTo(y, { immediate, force: true, duration: immediate ? 0 : 0.6, lock: false });
      else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
    }

    ruler.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      dragging = true;
      ruler.setPointerCapture(e.pointerId);
      ruler.classList.add('is-scrubbing');
      e.preventDefault();
      scrubTo(scrollForClientY(e.clientY), false);
    });
    ruler.addEventListener('pointermove', e => {
      if (dragging) scrubTo(scrollForClientY(e.clientY), true);
    });
    const endDrag = () => { dragging = false; ruler.classList.remove('is-scrubbing'); };
    ruler.addEventListener('pointerup', endDrag);
    ruler.addEventListener('pointercancel', endDrag);
    ruler.addEventListener('lostpointercapture', endDrag);

    // ---- Re-measure whenever layout can change ----
    let measurePending = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(measurePending);
      measurePending = requestAnimationFrame(() => {
        measure();
        frame();
      });
    };
    window.addEventListener('resize', scheduleMeasure);
    window.addEventListener('orientationchange', scheduleMeasure);
    window.addEventListener('load', scheduleMeasure);
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(scheduleMeasure);
      ro.observe(document.documentElement);
      ro.observe(document.body);
    }
    if (window.ScrollTrigger && window.ScrollTrigger.addEventListener) {
      window.ScrollTrigger.addEventListener('refresh', scheduleMeasure);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleMeasure);

    measure();
    frame();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngine);
  } else {
    initEngine();
  }
})();
