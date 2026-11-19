/* ==========================================================================
   MOBILE RADIAL / ARC NAVIGATION RULER · CLAUDE ENGINE
   Zero Layout Thrashing, Touch Scrubber, Dynamic Contrast, Retinal Geometry
   ========================================================================== */

(function () {
  "use strict";

  const NAV_SECTIONS = [
    { id: 'hero',      code: 'OVR', label: 'OVERVIEW' },
    { id: 'karya',     code: 'KRY', label: 'KARYA' },
    { id: 'publikasi', code: 'RST', label: 'RISET' },
    { id: 'proses',    code: 'PRS', label: 'PROSES' },
    { id: 'tentang',   code: 'TTG', label: 'TENTANG' },
    { id: 'kontak',    code: 'KTK', label: 'KONTAK' }
  ];

  const CIRCLE_CIRCUMFERENCE = 125.66; // 2 * PI * 20
  const ARC_CIRCUMFERENCE = 314.16;    // PI * 100
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

  function initMobileRadialRuler() {
    const root = document.getElementById('mobileRadialRuler');
    if (!root) return;

    const dock = document.getElementById('mrrDock');
    const dial = document.getElementById('mrrDial');
    const dialProgress = document.getElementById('mrrDialProgress');
    const dialNeedle = document.getElementById('mrrDialNeedle');
    const dialPct = document.getElementById('mrrDialPct');
    const dialSec = document.getElementById('mrrDialSec');
    const arcHud = document.getElementById('mrrArcHud');
    const arcActive = document.getElementById('mrrArcActive');
    const arcBead = document.getElementById('mrrArcBead');
    const arcLabel = document.getElementById('mrrArcLabel');
    const arcTicksG = document.getElementById('mrrArcTicks');
    const nodeButtons = Array.from(document.querySelectorAll('.mrr-node'));

    let sectionOffsets = [];
    let darkRanges = [];
    let hideArcTimer = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartP = 0;

    function measureLayout() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      // Measure section start scroll percentages
      sectionOffsets = NAV_SECTIONS.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { ...s, top: 0, pct: 0 };
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const pct = clamp(top / docH, 0, 1);
        return { ...s, top, pct };
      });

      // Render ticks along arc SVG
      if (arcTicksG) {
        arcTicksG.innerHTML = '';
        sectionOffsets.forEach((sec, idx) => {
          const theta = Math.PI * (1 - sec.pct);
          const cx = 120 + 100 * Math.cos(theta);
          const cy = 110 - 100 * Math.sin(theta);

          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('class', 'mrr-arc-tick');
          circle.setAttribute('cx', cx.toFixed(2));
          circle.setAttribute('cy', cy.toFixed(2));
          circle.setAttribute('r', '3');
          circle.setAttribute('data-id', sec.id);

          circle.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollToSection(sec.id);
          });

          arcTicksG.appendChild(circle);
        });
      }

      // Measure dark background zones for adaptive contrast
      const darkSelectors = ['.works', '.process', '.footer', '#publikasi', '#proses', '#kontak', '.dark-zone'];
      darkRanges = [];
      darkSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          const r = el.getBoundingClientRect();
          const top = r.top + scrollY;
          const bottom = top + r.height;
          darkRanges.push({ top, bottom });
        });
      });
    }

    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.lenis) {
        window.lenis.scrollTo(el, { duration: 1.1 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function showArcBriefly() {
      if (arcHud) {
        arcHud.classList.add('visible');
        clearTimeout(hideArcTimer);
        hideArcTimer = setTimeout(() => {
          if (!isDragging) {
            arcHud.classList.remove('visible');
          }
        }, 1800);
      }
    }

    function update() {
      const sy = window.pageYOffset || document.documentElement.scrollTop;
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = clamp(sy / maxScroll, 0, 1);

      // 1. Detect Active Section
      let currentSection = sectionOffsets[0] || NAV_SECTIONS[0];
      const probeY = sy + vh * 0.45;
      for (let i = 0; i < sectionOffsets.length; i++) {
        if (probeY >= sectionOffsets[i].top - 60) {
          currentSection = sectionOffsets[i];
        }
      }

      // 2. Adaptive Contrast (Check if bottom dock intersects dark zones)
      const dockY = sy + vh - 40;
      const isDark = darkRanges.some(r => dockY >= r.top && dockY <= r.bottom);
      if (dock) {
        dock.classList.toggle('mrr-on-dark', isDark);
      }
      if (arcHud) {
        arcHud.classList.toggle('mrr-on-dark', isDark);
      }

      // 3. Update Circular Dial
      const pctNumber = Math.round(p * 100);
      const pctStr = pctNumber.toString().padStart(3, '0') + '%';
      if (dialPct) dialPct.textContent = pctStr;
      if (dialSec) dialSec.textContent = currentSection.code;

      if (dialProgress) {
        const offset = CIRCLE_CIRCUMFERENCE * (1 - p);
        dialProgress.style.strokeDashoffset = offset.toFixed(2);
      }
      if (dialNeedle) {
        const deg = p * 360;
        dialNeedle.style.transform = `rotate(${deg}deg)`;
      }

      // 4. Update Arched Radial HUD
      if (arcActive) {
        const arcOffset = ARC_CIRCUMFERENCE * (1 - p);
        arcActive.style.strokeDashoffset = arcOffset.toFixed(2);
      }
      if (arcBead) {
        const theta = Math.PI * (1 - p);
        const bx = 120 + 100 * Math.cos(theta);
        const by = 110 - 100 * Math.sin(theta);
        arcBead.setAttribute('cx', bx.toFixed(2));
        arcBead.setAttribute('cy', by.toFixed(2));
      }
      if (arcLabel) {
        arcLabel.textContent = `${currentSection.label} · ${pctStr}`;
      }

      // 5. Update Active Section Nodes & Arc Ticks
      nodeButtons.forEach(btn => {
        const target = btn.getAttribute('data-target');
        btn.classList.toggle('active', target === currentSection.id);
      });

      if (arcTicksG) {
        const ticks = arcTicksG.querySelectorAll('.mrr-arc-tick');
        ticks.forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-id') === currentSection.id);
        });
      }
    }

    // Attach click to node buttons
    nodeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-target');
        scrollToSection(target);
      });
    });

    // Touch / Pointer Scrubbing on Circular Dial
    function scrubByDelta(dx) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const sensitivity = 0.0035; // scrub progress per px
      const newP = clamp(dragStartP + dx * sensitivity, 0, 1);
      const targetY = newP * maxScroll;

      if (window.lenis) {
        window.lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    }

    if (dial) {
      dial.addEventListener('pointerdown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        const sy = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        dragStartP = clamp(sy / maxScroll, 0, 1);
        dial.setPointerCapture(e.pointerId);
        if (arcHud) arcHud.classList.add('visible', 'active');
      });

      dial.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        scrubByDelta(dx);
      });

      dial.addEventListener('pointerup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        if (arcHud) {
          arcHud.classList.remove('active');
          showArcBriefly();
        }
      });

      dial.addEventListener('pointercancel', () => {
        isDragging = false;
        if (arcHud) {
          arcHud.classList.remove('active');
          showArcBriefly();
        }
      });

      // Toggle Arc HUD on tap
      dial.addEventListener('click', (e) => {
        if (arcHud) {
          arcHud.classList.toggle('visible');
        }
      });
    }

    // Scroll listener with RAF throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
      showArcBriefly();
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    }, { passive: true });

    // Orientation / Resize handling
    window.addEventListener('resize', () => {
      measureLayout();
      update();
    });

    // Initial setup
    measureLayout();
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileRadialRuler);
  } else {
    initMobileRadialRuler();
  }
})();
