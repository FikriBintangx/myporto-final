/**
 * ==========================================================================
 * EXPERIENCE ROADMAP ENGINE · GSAP SCROLLING & ADAPTIVE SVG CURVE
 * Inspired by Aswin Panengal (aswinpanengal.me) · Precision Motion System
 * ==========================================================================
 */

(function () {
  'use strict';

  function initJourneyRoadmap() {
    const roadmap = document.getElementById('journeyRoadmap');
    const svg = document.getElementById('journeyRoadSvg');
    const base = document.getElementById('journeyRoadBase');
    const ink = document.getElementById('journeyRoadInk');

    if (!roadmap || !svg || !base || !ink) return;

    let isDestroyed = false;

    // ---- 1. SVG Dynamic Path Calculation ----
    function updateCurve() {
      if (isDestroyed) return;

      const rect = roadmap.getBoundingClientRect();
      if (rect.width <= 0) return;

      const markers = Array.from(roadmap.querySelectorAll('.journey-stop-marker')).map(m => {
        const mr = m.getBoundingClientRect();
        return {
          x: mr.left - rect.left + mr.width / 2,
          y: mr.top - rect.top + mr.height / 2
        };
      });

      if (markers.length < 2) return;

      // Update SVG viewBox and dimensions
      svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
      svg.style.width = rect.width + 'px';
      svg.style.height = rect.height + 'px';

      const isMobile = window.innerWidth <= 1024;
      let d = `M ${markers[0].x.toFixed(1)} ${markers[0].y.toFixed(1)}`;

      for (let i = 1; i < markers.length; i++) {
        const p0 = markers[i - 1];
        const p1 = markers[i];

        if (isMobile) {
          // Serpentine vertical Bézier curve
          const midY = (p0.y + p1.y) / 2;
          const curveSpread = Math.min(28, rect.width * 0.08);
          d += ` C ${(p0.x + curveSpread).toFixed(1)} ${midY.toFixed(1)}, ${(p1.x - curveSpread * 0.7).toFixed(1)} ${midY.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
        } else {
          // Undulating horizontal sinusoidal wave
          const midX = (p0.x + p1.x) / 2;
          d += ` C ${midX.toFixed(1)} ${p0.y.toFixed(1)}, ${midX.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
        }
      }

      base.setAttribute('d', d);
      ink.setAttribute('d', d);
    }

    // ---- 2. GSAP ScrollTrigger Scrubbed Motion ----
    let scrollTriggerInstance = null;

    function setupScrollTrigger() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Fallback: IntersectionObserver for CSS draw
        const observer = new IntersectionObserver(([entry]) => {
          roadmap.dataset.drawn = String(entry.isIntersecting);
        }, { threshold: 0.15 });
        observer.observe(roadmap);
        return;
      }

      // Ensure path is prepared
      ink.style.strokeDasharray = '1';
      ink.style.strokeDashoffset = '1';

      const stops = roadmap.querySelectorAll('.journey-stop');

      // Create Scrubbed Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: roadmap,
          start: 'top 82%',
          end: 'bottom 82%',
          scrub: 0.75,
          onUpdate: (self) => {
            roadmap.dataset.drawn = self.progress > 0.05 ? 'true' : 'false';
          }
        }
      });

      // 2a. Animate ink drawing
      tl.fromTo(ink, 
        { strokeDashoffset: 1 }, 
        { strokeDashoffset: 0, ease: 'none', duration: 1 }, 
        0
      );

      // 2b. Animate each stop milestone (marker pop + content slide up)
      stops.forEach((stop, i) => {
        const marker = stop.querySelector('.journey-stop-marker');
        const content = stop.querySelector('.journey-stop-content');
        const pointTime = stops.length > 1 ? (i / (stops.length - 1)) * 0.88 : 0;

        if (marker) {
          tl.fromTo(marker,
            { scale: 0.75, opacity: 0.4 },
            { scale: 1, opacity: 1, duration: 0.22, ease: 'back.out(2)' },
            pointTime
          );
        }

        if (content) {
          tl.fromTo(content,
            { y: 22, opacity: 0.25 },
            { y: 0, opacity: 1, duration: 0.32, ease: 'power2.out' },
            pointTime
          );
        }
      });

      scrollTriggerInstance = tl.scrollTrigger;
    }

    // ---- 3. Observers & Initialization ----
    const resizeObserver = new ResizeObserver(() => {
      updateCurve();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });

    resizeObserver.observe(roadmap);
    roadmap.querySelectorAll('.journey-stop').forEach(s => resizeObserver.observe(s));

    // First paint
    updateCurve();
    setupScrollTrigger();

    // Fonts ready recalculation
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        updateCurve();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
    }

    // Window resize handler with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCurve();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 80);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJourneyRoadmap);
  } else {
    initJourneyRoadmap();
  }
})();
