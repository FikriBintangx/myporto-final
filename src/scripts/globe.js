import createGlobe from 'cobe';
import showcaseData from '../data/showcase.json';

const PI = Math.PI;

function toVector([lat, lon]) {
    const r = lat * PI / 180;
    const a = lon * PI / 180 - PI;
    const cosLat = Math.cos(r);
    return [-cosLat * Math.cos(a), Math.sin(r), cosLat * Math.sin(a)];
}

function projectPoint(vec, phi, theta) {
    const cosTheta = Math.cos(theta);
    const cosPhi = Math.cos(phi);
    const sinTheta = Math.sin(theta);
    const sinPhi = Math.sin(phi);

    const c = cosPhi * vec[0] + sinPhi * vec[2];
    const s = sinPhi * sinTheta * vec[0] + cosTheta * vec[1] - cosPhi * sinTheta * vec[2];
    // Visible if facing the camera or near the visible rim
    const visible = (-sinPhi * cosTheta * vec[0] + sinTheta * vec[1] + cosPhi * cosTheta * vec[2] >= -0.05) || (c * c + s * s >= 0.64);

    return {
        x: (c + 1) / 2,
        y: (-s + 1) / 2,
        visible
    };
}

function initGlobe() {
    const canvas = document.getElementById('cobe-globe');
    if (!canvas) return;

    const container = document.getElementById('globe-container') || canvas.parentElement;
    let width = container ? container.offsetWidth : (canvas.offsetWidth || 500);
    if (!width || width <= 0) width = 500;

    let phi = 4.76; // Initial rotation angle facing Southeast Asia / Tangerang
    let theta = 0.12;
    let isDragging = false;
    let isHoveringPolaroid = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let startPhi = 0;
    let startTheta = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = width * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${width}px`;

    // Map item locations and vectors
    const itemMap = {};
    (showcaseData.items || []).forEach(item => {
        itemMap[item.id] = {
            ...item,
            vec: toVector(item.location)
        };
    });

    // Dedicated Tangerang base vector & element
    const tangerangVec = toVector([-6.1783, 106.6319]);
    const tangerangPin = document.getElementById('tangerang-pin');

    // Extract markers dynamically from showcase data + Tangerang home base
    const markers = (showcaseData.items || []).map((item) => ({
        location: item.location,
        size: item.type === 'certificate' ? 0.05 : 0.045,
        id: item.id
    }));
    // Add Tangerang base marker
    markers.push({
        location: [-6.1783, 106.6319],
        size: 0.065,
        id: 'marker-tangerang'
    });

    const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: phi,
        theta: theta,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        mapBaseBrightness: 0.04,
        baseColor: [1, 1, 1], // Pure white globe surface
        markerColor: [0.0, 0.32, 0.85], // Vibrant cobalt blue markers
        glowColor: [0.88, 0.94, 1.0], // Ice-blue soft glow
        scale: 1.02,
        offset: [0, 0],
        markers: markers
    });

    const polaroids = document.querySelectorAll('.showcase-polaroid');

    function openShowcaseDetail(polaroid) {
        const projectSlug = polaroid.dataset.projectSlug;
        const certImage = polaroid.dataset.certImage;
        const certTitle = polaroid.dataset.certTitle;

        console.log('[Globe] Opening detail for:', { projectSlug, certImage, certTitle });

        if (projectSlug) {
            if (typeof window.openProjectModal === 'function') {
                window.openProjectModal(projectSlug);
            } else {
                const card = document.querySelector(`.project-card[data-project="${projectSlug}"]`);
                if (card) {
                    card.click();
                }
            }
        } else if (certImage) {
            const certModal = document.getElementById('cert-modal');
            const certModalImg = document.getElementById('cert-modal-image');
            const certModalTitle = document.getElementById('cert-modal-title');
            if (certModal && certModalImg) {
                certModalImg.src = certImage;
                if (certModalTitle) certModalTitle.textContent = certTitle || 'CERTIFICATE';
                certModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }
    }

    // Attach robust tap & click handlers for desktop and mobile touch
    polaroids.forEach((polaroid) => {
        let tapStartX = 0;
        let tapStartY = 0;
        let tapStartTime = 0;
        let isTapInitiated = false;

        // Pause rotation on hover (desktop)
        polaroid.addEventListener('mouseenter', () => {
            isHoveringPolaroid = true;
        });
        polaroid.addEventListener('mouseleave', () => {
            isHoveringPolaroid = false;
        });

        // Pointer event handling (works across touch, mouse, and stylus)
        polaroid.addEventListener('pointerdown', (e) => {
            e.stopPropagation();
            tapStartX = e.clientX;
            tapStartY = e.clientY;
            tapStartTime = Date.now();
            isTapInitiated = true;
            isHoveringPolaroid = true; // freeze rotation while touching
        });

        polaroid.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            isHoveringPolaroid = false;
            if (!isTapInitiated) return;
            isTapInitiated = false;

            const dist = Math.hypot(e.clientX - tapStartX, e.clientY - tapStartY);
            const duration = Date.now() - tapStartTime;

            // If pointer didn't drag significantly and release happened within 700ms -> valid tap!
            if (dist < 15 && duration < 700) {
                e.preventDefault();
                openShowcaseDetail(polaroid);
            }
        });

        polaroid.addEventListener('pointercancel', () => {
            isTapInitiated = false;
            isHoveringPolaroid = false;
        });

        // Fallback click listener
        polaroid.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openShowcaseDetail(polaroid);
        });

        // Mobile touch fallback
        polaroid.addEventListener('touchend', (e) => {
            e.stopPropagation();
            isHoveringPolaroid = false;
            if (isTapInitiated) {
                isTapInitiated = false;
                e.preventDefault();
                openShowcaseDetail(polaroid);
            }
        });
    });

    // Close certificate modal handler
    const certModal = document.getElementById('cert-modal');
    if (certModal) {
        const certCloseBtn = certModal.querySelector('.cert-modal-close');
        if (certCloseBtn) {
            certCloseBtn.addEventListener('click', () => {
                certModal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        window.addEventListener('click', (e) => {
            if (e.target === certModal) {
                certModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // Main animation loop
    function animate() {
        // Only auto-rotate if user is not actively dragging or hovering/touching a polaroid
        if (!isDragging && !isHoveringPolaroid) {
            phi += 0.003;
        }
        globe.update({ phi, theta });

        // Update dedicated Tangerang live pin badge position
        if (tangerangPin) {
            const tProj = projectPoint(tangerangVec, phi, theta);
            tangerangPin.style.left = `${tProj.x * 100}%`;
            tangerangPin.style.top = `${tProj.y * 100}%`;

            if (tProj.visible) {
                tangerangPin.style.opacity = '1';
                tangerangPin.style.pointerEvents = 'auto';
                tangerangPin.style.transform = 'translate(-50%, -50%) scale(1)';
            } else {
                tangerangPin.style.opacity = '0';
                tangerangPin.style.pointerEvents = 'none';
                tangerangPin.style.transform = 'translate(-50%, -50%) scale(0.6)';
            }
        }

        // Update polaroids positions directly via 3D projection
        polaroids.forEach((p) => {
            const item = itemMap[p.dataset.anchor];
            if (item && item.vec) {
                const proj = projectPoint(item.vec, phi, theta);
                p.style.left = `${proj.x * 100}%`;
                p.style.top = `${proj.y * 100}%`;

                if (proj.visible) {
                    p.style.opacity = '1';
                    p.style.pointerEvents = 'auto';
                    p.style.filter = 'none';
                    p.style.transform = `translate(-50%, -100%) rotate(${item.rotation || '0deg'}) scale(1)`;
                } else {
                    p.style.opacity = '0';
                    p.style.pointerEvents = 'none';
                    p.style.filter = 'blur(4px)';
                    p.style.transform = `translate(-50%, -100%) rotate(${item.rotation || '0deg'}) scale(0.5)`;
                }
            }
        });

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Responsive resize handler
    function handleResize() {
        if (!canvas || !container) return;
        const newWidth = container.offsetWidth || 500;
        if (newWidth > 0 && Math.abs(newWidth - width) > 10) {
            width = newWidth;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${width}px`;
            globe.update({
                width: width * dpr,
                height: width * dpr
            });
        }
    }
    window.addEventListener('resize', handleResize);

    // Pointer drag interaction for rotating the globe
    canvas.addEventListener('pointerdown', (e) => {
        isDragging = true;
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        startPhi = phi;
        startTheta = theta;
        canvas.style.cursor = 'grabbing';
        try {
            canvas.setPointerCapture(e.pointerId);
        } catch (_) {}
    });

    canvas.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - pointerStartX;
        const deltaY = e.clientY - pointerStartY;
        phi = startPhi + deltaX * 0.007;
        theta = Math.max(-0.4, Math.min(0.4, startTheta - deltaY * 0.005));
    });

    function endPointer(e) {
        if (isDragging) {
            isDragging = false;
            canvas.style.cursor = 'grab';
            try {
                if (e && e.pointerId !== undefined) {
                    canvas.releasePointerCapture(e.pointerId);
                }
            } catch (_) {}
        }
    }

    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
} else {
    initGlobe();
}
