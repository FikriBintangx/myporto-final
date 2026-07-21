/**
 * motion.js — Portfolio Animation Engine
 * Powered by Motion.dev (https://motion.dev)
 * Design: Modern Dark / Cinematic | Variance:7 Motion:8 Density:4
 * Easing: expo.out = cubic-bezier(0.16, 1, 0.3, 1)
 */
import { animate, inView, stagger, spring } from 'https://cdn.jsdelivr.net/npm/motion@11/+esm';

// ─────────────────────────────────────────────
// 0. Respect prefers-reduced-motion
// ─────────────────────────────────────────────
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DURATION   = prefersReduced ? 0 : 0.7;
const STAGGER    = prefersReduced ? 0 : 0.08;
const EASE_EXPO  = [0.16, 1, 0.3, 1]; // expo.out
const EASE_IN    = [0.4,  0, 1, 1];
const springConf = { type: 'spring', damping: 20, stiffness: 90 };

// ─────────────────────────────────────────────
// 1. Page Load — reveal body
// ─────────────────────────────────────────────
document.documentElement.style.setProperty('--motion-ready', '1');

// ─────────────────────────────────────────────
// 2. Hero Entrance — stagger cascade
// ─────────────────────────────────────────────
function initHeroAnimations() {
    const badge   = document.querySelector('.badge');
    const title   = document.querySelector('.hero-title');
    const desc    = document.querySelector('.hero-description');
    const ctas    = document.querySelector('.hero-ctas');
    const heroEls = [badge, title, desc, ctas].filter(Boolean);

    if (prefersReduced) return;

    // Set initial invisible state
    heroEls.forEach(el => {
        if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(28px)'; }
    });

    // Stagger cascade on load
    setTimeout(() => {
        heroEls.forEach((el, i) => {
            if (!el) return;
            animate(el,
                { opacity: [0, 1], y: [28, 0] },
                { duration: DURATION, delay: i * 0.13 + 0.15, easing: EASE_EXPO }
            );
        });
    }, 200);

    // Draggable asset entrances
    const draggables = document.querySelectorAll('.draggable-wrapper');
    draggables.forEach((el, i) => {
        el.style.opacity = '0';
        const isRight = el.classList.contains('layout-right');
        animate(el,
            { opacity: [0, 1], x: [isRight ? 40 : -40, 0] },
            { duration: 0.9, delay: 0.5 + i * 0.15, easing: EASE_EXPO }
        );
    });
}

// ─────────────────────────────────────────────
// 3. Scroll Reveal — inView for all sections
// ─────────────────────────────────────────────
function initScrollReveals() {
    if (prefersReduced) return;

    // Generic sections with .reveal class
    document.querySelectorAll('.grid-section.reveal').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';

        inView(section, () => {
            animate(section,
                { opacity: [0, 1], y: [40, 0] },
                { duration: DURATION, easing: EASE_EXPO }
            );
        }, { margin: '-80px' });
    });

    // Feature cards — stagger grid items
    const featureSection = document.querySelector('.feature-section');
    if (featureSection) {
        const cards = featureSection.querySelectorAll('.feature-card');
        cards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(24px)'; });

        inView(featureSection, () => {
            animate(cards,
                { opacity: [0, 1], y: [24, 0] },
                { duration: 0.55, delay: stagger(0.07, { start: 0.1 }), easing: EASE_EXPO }
            );
        }, { margin: '-60px' });
    }

    // Projects section
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectsSection.style.opacity = '0';
        projectsSection.style.transform = 'translateY(32px)';

        inView(projectsSection, () => {
            animate(projectsSection,
                { opacity: [0, 1], y: [32, 0] },
                { duration: DURATION, easing: EASE_EXPO }
            );

            // Then stagger individual project cards
            const cards = projectsSection.querySelectorAll('.project-card');
            cards.forEach(c => { c.style.opacity = '0'; });
            animate(cards,
                { opacity: [0, 1], x: [20, 0] },
                { duration: 0.5, delay: stagger(0.06, { start: 0.3 }), easing: EASE_EXPO }
            );
        }, { margin: '-50px' });
    }

    // Header — slide down
    const header = document.querySelector('.grid-header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        animate(header,
            { opacity: [0, 1], y: [-20, 0] },
            { duration: 0.6, delay: 0.05, easing: EASE_EXPO }
        );
    }

    // Footer
    const footer = document.querySelector('.grid-footer');
    if (footer) {
        footer.style.opacity = '0';
        inView(footer, () => {
            animate(footer, { opacity: [0, 1] }, { duration: 0.5, easing: EASE_EXPO });
        }, { margin: '-40px' });
    }
}

// ─────────────────────────────────────────────
// 4. Project Card Hover — spring scale + glow
// ─────────────────────────────────────────────
function initCardHovers() {
    if (prefersReduced) return;

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            animate(card, { scale: 1.025 }, { ...springConf, duration: 0.35 });
        });
        card.addEventListener('mouseleave', () => {
            animate(card, { scale: 1.0 }, { ...springConf, duration: 0.4 });
        });
    });

    // CTA button hover pops
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            animate(btn, { scale: 1.04 }, { ...springConf, duration: 0.25 });
        });
        btn.addEventListener('mouseleave', () => {
            animate(btn, { scale: 1.0 }, { ...springConf, duration: 0.3 });
        });
    });
}

// ─────────────────────────────────────────────
// 5. Modal — spring entrance & exit
// ─────────────────────────────────────────────
function initModalAnimations() {
    if (prefersReduced) return;

    const modal        = document.getElementById('project-modal');
    const modalContent = modal?.querySelector('.modal-content');
    const pdfModal     = document.getElementById('pdf-modal');
    const pdfContent   = pdfModal?.querySelector('.modal-content');

    if (!modal || !modalContent) return;

    // Observe class changes to animate
    const observer = new MutationObserver(() => {
        if (modal.classList.contains('show')) {
            // entrance
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9) translateY(20px)';
            animate(modalContent,
                { opacity: [0, 1], scale: [0.9, 1], y: [20, 0] },
                { duration: 0.45, easing: EASE_EXPO }
            );
        }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });

    // PDF modal too
    if (pdfModal && pdfContent) {
        const pdfObs = new MutationObserver(() => {
            if (pdfModal.classList.contains('show')) {
                pdfContent.style.opacity = '0';
                pdfContent.style.transform = 'scale(0.92)';
                animate(pdfContent,
                    { opacity: [0, 1], scale: [0.92, 1] },
                    { duration: 0.4, easing: EASE_EXPO }
                );
            }
        });
        pdfObs.observe(pdfModal, { attributes: true, attributeFilter: ['class'] });
    }
}

// ─────────────────────────────────────────────
// 6. Custom Cursor Dot (desktop only)
// ─────────────────────────────────────────────
function initCursor() {
    if (prefersReduced || window.innerWidth < 768) return;

    const dot = document.createElement('div');
    dot.id = 'motion-cursor';
    dot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
        mix-blend-mode: difference;
        opacity: 0;
    `;

    const ring = document.createElement('div');
    ring.id = 'motion-cursor-ring';
    ring.style.cssText = `
        position: fixed;
        width: 32px;
        height: 32px;
        border: 1.5px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: all 0.08s linear;
        opacity: 0;
        mix-blend-mode: difference;
    `;

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
        dot.style.opacity = '1';
        ring.style.opacity = '0.6';
    });

    // Smooth ring follow
    function lerp(a, b, t) { return a + (b - a) * t; }
    function updateRing() {
        ringX = lerp(ringX, mouseX, 0.12);
        ringY = lerp(ringY, mouseY, 0.12);
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(updateRing);
    }
    updateRing();

    // Scale up on hover interactive elements
    document.querySelectorAll('a, button, .project-card, .cta-button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.transform  = 'translate(-50%, -50%) scale(2.5)';
            ring.style.transform = 'translate(-50%, -50%) scale(1.4)';
            ring.style.opacity   = '0.4';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.transform  = 'translate(-50%, -50%) scale(1)';
            ring.style.transform = 'translate(-50%, -50%) scale(1)';
            ring.style.opacity   = '0.6';
        });
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
}

// ─────────────────────────────────────────────
// 7. Terminal Tab Switch Animation
// ─────────────────────────────────────────────
function initTerminalAnimations() {
    if (prefersReduced) return;

    const tabs = document.querySelectorAll('.terminal-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = 'terminal-body-' + tab.dataset.mode;
            const targetBody = document.getElementById(targetId);
            if (targetBody && targetBody.style.display !== 'none') {
                animate(targetBody,
                    { opacity: [0, 1], y: [8, 0] },
                    { duration: 0.3, easing: EASE_EXPO }
                );
            }
        });
    });
}

// ─────────────────────────────────────────────
// 8. Heatmap squares stagger when visible
// ─────────────────────────────────────────────
function initHeatmapAnimation() {
    if (prefersReduced) return;

    const heatmapWrapper = document.querySelector('.heatmap-wrapper');
    if (!heatmapWrapper) return;

    inView(heatmapWrapper, () => {
        const squares = heatmapWrapper.querySelectorAll('.heatmap-square:not(.legend-squares .heatmap-square)');
        if (squares.length === 0) return;
        animate(squares,
            { opacity: [0, 1], scale: [0.6, 1] },
            { duration: 0.3, delay: stagger(0.003), easing: EASE_EXPO }
        );
    }, { margin: '-40px' });
}

// ─────────────────────────────────────────────
// 9. Slider Button Clicks — bounce animation
// ─────────────────────────────────────────────
function initSliderAnimations() {
    if (prefersReduced) return;

    document.querySelectorAll('.slider-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            animate(btn, { scale: [0.9, 1.05, 1] }, { duration: 0.3, easing: EASE_EXPO });
        });
    });
}

// ─────────────────────────────────────────────
// 10. Map overlay pulse glow
// ─────────────────────────────────────────────
function initMapAnimation() {
    if (prefersReduced) return;

    const mapOverlay = document.querySelector('.map-overlay-text');
    if (!mapOverlay) return;

    inView(mapOverlay, () => {
        animate(mapOverlay,
            { opacity: [0, 1], x: [-16, 0] },
            { duration: 0.6, easing: EASE_EXPO }
        );
    }, { margin: '-60px' });
}

// ─────────────────────────────────────────────
// INIT ALL
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollReveals();
    initCardHovers();
    initModalAnimations();
    initCursor();
    initTerminalAnimations();
    initSliderAnimations();
    initMapAnimation();

    // Wait a tick for heatmap to possibly load
    setTimeout(initHeatmapAnimation, 800);
});
