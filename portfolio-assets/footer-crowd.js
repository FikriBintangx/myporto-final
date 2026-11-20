
(function () {
  'use strict';

  const SCALES = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7,
    0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];

  function startCrowd() {
    const container = document.querySelector('.footer-crowd-scene');
    if (!container) return;

    const canvasBack = container.querySelector('.footer-crowd-back');
    const canvasFront = container.querySelector('.footer-crowd-front');
    const portraitImg = container.querySelector('.footer-crowd-portrait');
    const backToTopBtn = document.querySelector('.footer-back-to-top');

    if (!canvasBack || !canvasFront) return;

    const ctxBack = canvasBack.getContext('2d');
    const ctxFront = canvasFront.getContext('2d');
    if (!ctxBack || !ctxFront) return;

    const contexts = [ctxBack, ctxFront];
    const layers = [canvasBack, canvasFront];

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Load all 7 sprite sheets
    const spriteImages = Array.from({ length: 7 }, (_, t) => {
      const img = new Image();
      const num = String(t + 1).padStart(2, '0');
      img.src = '/footer/bengaluru/crowd-' + num + '.webp';
      return img;
    });

    const T = (e) => {
      const t = 43758.5453 * Math.sin(127.1 * e + 311.7);
      return t - Math.floor(t);
    };

    let isPaused = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animTime = 0;
    let lastTimestamp = 0;
    let spanX = 0;
    let maxW = 0;
    let characters = [];

    container.addEventListener('click', () => {
      isPaused = !isPaused;
      container.setAttribute('aria-label', isPaused ? 'FIKRI. Resume crowd animation' : 'FIKRI. Pause crowd animation');
      container.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
    });

    const updateLayout = () => {
      const clientW = container.clientWidth || 1100;
      const clientH = container.clientHeight || 420;
      if (clientW === 0 || clientH === 0) return;

      width = clientW;
      height = clientH;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      layers.forEach((c) => {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      });

      let pHeight = 330;
      if (portraitImg && portraitImg.clientHeight > 100) {
        pHeight = portraitImg.clientHeight;
      }
      const isWide = width >= 600;
      const scaleRef = Math.max(0.75, Math.min(1.0, pHeight / 330));
      const density = width / (1440 * scaleRef);

      const layerCounts = isWide
        ? [24, 16]
        : [Math.max(10, Math.round(24 * density)), Math.max(7, Math.round(16 * density))];
      const totalChars = layerCounts.reduce((acc, c) => acc + c, 0);

      characters = Array.from({ length: totalChars }, (_, idx) => {
        const layerIdx = idx < layerCounts[0] ? 0 : 1;
        const subIdx = idx - (layerIdx === 0 ? 0 : layerCounts[0]);
        const layerTotal = layerCounts[layerIdx];
        
        // char height & baseline
        const charH = (layerIdx === 1 ? 220 + 25 * T(idx + 8) : 170 + 25 * T(idx + 8)) * scaleRef;
        const baseline =
          layerIdx === 0
            ? height - pHeight + 35 + 25 * T(idx + 4)
            : height - charH + 45 + 15 * T(idx + 4);
            
        const cell = (37 * Math.floor((105 * idx) / totalChars)) % 105;
        const speed = [0.72, 1.08][layerIdx] * (0.88 + 0.24 * T(idx + 97));

        return {
          cell,
          layer: layerIdx > 0 || subIdx % 3 === 0 ? 1 : 0,
          h: charH,
          w: 0.8 * charH,
          baseline,
          speed,
          phase: (subIdx + 0.85 * T(idx + 41)) / layerTotal,
          direction: layerIdx === 1 ? -1 : 1
        };
      }).sort((a, b) => a.baseline - b.baseline);

      maxW = Math.max(...characters.map((c) => c.w));
      spanX = width + 2 * maxW;
    };

    const render = () => {
      if (width === 0 || height === 0) return;

      contexts.forEach((ctx) => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
      });

      characters.forEach((char) => {
        const t = char.phase + (animTime * char.speed) / 10;
        const r = Math.floor(t);
        const a = t - r;
        const s = (char.cell + 37 * r) % 105;
        const sheetImg = spriteImages[Math.floor(s / 15)];
        if (!sheetImg || !sheetImg.complete || sheetImg.naturalWidth === 0) return;

        const colW = (sheetImg.naturalWidth || 1000) / 5;
        const rowH = (sheetImg.naturalHeight || 780) / 3;
        const hIdx = s % 15;
        const posX = (char.direction === 1 ? a : 1 - a) * spanX - maxW;
        // Stride bobbing
        const bob = (1 - Math.cos((animTime * char.speed + 10 * char.phase) * Math.PI * 4)) * 4.5;
        const scaleVal = SCALES[s] || 1;
        const ctx = contexts[char.layer];

        ctx.save();
        ctx.translate(posX, char.baseline + char.h * (1 - scaleVal) - bob);
        ctx.scale(char.direction, 1);
        ctx.drawImage(
          sheetImg,
          (hIdx % 5) * colW,
          Math.floor(hIdx / 5) * rowH,
          colW,
          rowH,
          (-char.w * scaleVal) / 2,
          0,
          char.w * scaleVal,
          char.h * scaleVal
        );
        ctx.restore();
      });
    };

    // Frame ticker - RUNS FOREVER AND EVER SMOOTHLY
    const tick = (now) => {
      if (lastTimestamp) {
        animTime += Math.min((now - lastTimestamp) / 1000, 0.05);
      }
      lastTimestamp = now;
      if (!isPaused && !document.hidden) {
        render();
      }
      requestAnimationFrame(tick);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    requestAnimationFrame(tick);

    // Layout recalibration after fonts and images settle
    setTimeout(updateLayout, 200);
    setTimeout(updateLayout, 800);
    setTimeout(updateLayout, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startCrowd);
  } else {
    startCrowd();
  }
})();
