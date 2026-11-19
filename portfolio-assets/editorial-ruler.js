/* =========================================
   EDITORIAL SCROLL RULER ENGINE
   GSAP 3.12 + ScrollTrigger + Lenis Clock Sync
   ========================================= */
(() => {
  function initEditorialRuler() {
    const ruler = document.querySelector("#scrollRuler");
    const track = document.querySelector("#rulerTrack");
    const cursor = document.querySelector("#rulerCursor");
    const label = document.querySelector("#cursorLabel");
    const navItems = [...document.querySelectorAll(".ruler-nav a[data-section]")];
    const sections = [...document.querySelectorAll("[data-ruler-section]")];

    if (!ruler || !track || !cursor || !label || !sections.length) {
      return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Label layers
    let current = label.querySelector(".label-current");
    if (!current) {
      current = document.createElement("span");
      current.className = "label-current";
      label.appendChild(current);
    }
    let next = label.querySelector(".label-next");
    if (!next) {
      next = document.createElement("span");
      next.className = "label-next";
      label.appendChild(next);
    }

    // GPU-friendly transform setter
    const setCursorY = gsap.quickSetter(cursor, "y", "px");
    let activeSection = null;
    let labelTimeline = null;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* -----------------------------------------
       1. GLOBAL SCROLL PROGRESS
       ----------------------------------------- */
    const globalTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const trackHeight = track.clientHeight;
        const progress = gsap.utils.clamp(0, 1, self.progress);
        setCursorY(progress * trackHeight);
      },
      onRefresh(self) {
        setCursorY(self.progress * track.clientHeight);
      }
    });

    /* -----------------------------------------
       2. SECTION DETECTION & ODOMETER TRANSITION
       ----------------------------------------- */
    function animateLabel(name) {
      if (name === activeSection) return;
      activeSection = name;

      // Dark background detection for Proses section
      if (name === 'PROSES') {
        ruler.classList.add('ruler-on-dark');
      } else {
        ruler.classList.remove('ruler-on-dark');
      }

      if (labelTimeline) {
        labelTimeline.kill();
      }

      next.textContent = name;
      gsap.set(next, { yPercent: 110, autoAlpha: 0 });

      if (prefersReducedMotion) {
        current.textContent = name;
        gsap.set(current, { clearProps: "all" });
        gsap.set(next, { autoAlpha: 0 });
        return;
      }

      labelTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete() {
          current.textContent = name;
          gsap.set(current, { clearProps: "all" });
          gsap.set(next, { yPercent: 110, autoAlpha: 0 });
        }
      });

      labelTimeline
        .to(current, { yPercent: -110, autoAlpha: 0, duration: 0.22 }, 0)
        .to(next, { yPercent: 0, autoAlpha: 1, duration: 0.34 }, 0.04);
    }

    /* -----------------------------------------
       3. ACTIVE NAVIGATION
       ----------------------------------------- */
    function updateNavigation(name) {
      navItems.forEach((item) => {
        const active = item.dataset.section.toLowerCase() === name.toLowerCase();
        item.classList.toggle("is-active", active);
        if (active) {
          item.setAttribute("aria-current", "location");
        } else {
          item.removeAttribute("aria-current");
        }
      });
    }

    function setActiveSection(section) {
      const name = section.dataset.rulerSection || section.id.toUpperCase();
      animateLabel(name);
      updateNavigation(name);
    }

    /* -----------------------------------------
       4. SECTION SCROLL TRIGGERS
       ----------------------------------------- */
    const sectionTriggers = sections.map((section) => {
      return ScrollTrigger.create({
        trigger: section,
        start: "top 45%",
        end: "bottom 45%",
        onEnter() {
          setActiveSection(section);
        },
        onEnterBack() {
          setActiveSection(section);
        }
      });
    });

    /* -----------------------------------------
       5. NAVIGATION CLICK
       ----------------------------------------- */
    navItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const target = document.querySelector(item.getAttribute("href"));
        if (!target) return;
        event.preventDefault();

        if (window.lenis) {
          window.lenis.scrollTo(target, { offset: 0, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    /* -----------------------------------------
       6. INITIALIZATION & REFRESH
       ----------------------------------------- */
    function refreshRuler() {
      ScrollTrigger.refresh();
      const currentPosition = globalTrigger.progress * track.clientHeight;
      setCursorY(currentPosition);
    }

    window.addEventListener("load", refreshRuler, { once: true });

    const resizeObserver = new ResizeObserver(() => {
      refreshRuler();
    });
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(track);

    const initialSection = [...sections].reverse().find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.45;
    });

    if (initialSection) {
      setActiveSection(initialSection);
    } else {
      setActiveSection(sections[0]);
    }

    // Cleanup API
    window.destroyScrollRuler = () => {
      globalTrigger.kill();
      sectionTriggers.forEach((trigger) => trigger.kill());
      resizeObserver.disconnect();
      if (labelTimeline) labelTimeline.kill();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditorialRuler);
  } else {
    initEditorialRuler();
  }
})();
