// ============ INITIALIZE LENIS SMOOTH SCROLL ============
let lenis = null;

if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Sync with GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
}

// ============ APPLE HELLO LOADER ============
(function () {
  const loader = document.getElementById('loader');
  const greetingEl = document.getElementById('greetingText');
  const langEl = document.getElementById('loaderLang');
  const pctEl = document.getElementById('loaderPct');
  const fillEl = document.getElementById('loaderBarFill');

  if (!loader) return;
  document.body.style.overflow = 'hidden';

  // Apple multilingual setup greeting sequence
  const greetings = [
    { text: "Halo", lang: "INDONESIA" },
    { text: "Hello", lang: "ENGLISH" },
    { text: "Bonjour", lang: "FRANÇAIS" },
    { text: "Hola", lang: "ESPAÑOL" },
    { text: "Ciao", lang: "ITALIANO" },
    { text: "こんにちは", lang: "JAPANESE" },
    { text: "Olá", lang: "PORTUGUÊS" },
    { text: "Halo", lang: "FIKRI BINTANG" },
  ];

  let currentIdx = 0;
  let progress = 0;
  let isDone = false;

  // Function to transition greeting with Apple-style blur & spring slide
  function showNextGreeting() {
    if (isDone) return;
    currentIdx = (currentIdx + 1) % greetings.length;
    const item = greetings[currentIdx];

    if (typeof gsap !== 'undefined' && greetingEl) {
      gsap.to(greetingEl, {
        y: -24,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.24,
        ease: 'power2.in',
        onComplete: () => {
          greetingEl.textContent = item.text;
          if (langEl) langEl.textContent = item.lang;

          gsap.fromTo(
            greetingEl,
            { y: 24, opacity: 0, filter: 'blur(10px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.36, ease: 'power3.out' }
          );
        },
      });

      if (langEl) {
        gsap.to(langEl, {
          opacity: 0,
          duration: 0.18,
          onComplete: () => {
            gsap.to(langEl, { opacity: 0.75, duration: 0.28 });
          },
        });
      }
    } else if (greetingEl) {
      greetingEl.textContent = item.text;
      if (langEl) langEl.textContent = item.lang;
    }
  }

  // Interval for changing greeting
  const greetingInterval = setInterval(showNextGreeting, 400);

  // Smooth progress counter tracking from 0% to 100%
  const progressTimer = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressTimer);
      clearInterval(greetingInterval);
      isDone = true;

      if (pctEl) pctEl.textContent = '100%';
      if (fillEl) fillEl.style.width = '100%';

      // Final celebration scale and curtain dismiss
      setTimeout(() => {
        if (typeof gsap !== 'undefined' && greetingEl) {
          gsap.to(greetingEl, {
            scale: 1.08,
            duration: 0.35,
            ease: 'back.out(2)',
          });
        }

        setTimeout(() => {
          loader.classList.add('done');
          document.body.style.overflow = '';
          setTimeout(() => {
            loader.remove();
          }, 950);
        }, 400);
      }, 300);
    } else {
      if (pctEl) pctEl.textContent = progress + '%';
      if (fillEl) fillEl.style.width = progress + '%';
    }
  }, 95);
})();

// ============ GSAP SCROLL ANIMATIONS ============
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Celestial Parallax Elements
  gsap.to('.celestial-orbit', {
    rotation: 50,
    scale: 1.12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });

  gsap.to('.constellation-layer', {
    yPercent: -18,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to('.sparkle-top', {
    yPercent: -45,
    rotation: 90,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  gsap.to('.sparkle-right', {
    xPercent: 25,
    yPercent: 30,
    rotation: -45,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });

  gsap.to('.sparkle-left', {
    xPercent: -20,
    yPercent: 40,
    rotation: 60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });

  gsap.to('.photo-wrap', {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to('.celestial-badge', {
    yPercent: 25,
    rotation: -14,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // Layered waves scrub
  gsap.to('.waves svg:nth-child(1)', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.5 },
  });

  gsap.to('.waves svg:nth-child(2)', {
    yPercent: 55,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
  });

  gsap.to('.waves svg:nth-child(3)', {
    yPercent: 80,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
  });

  // 2. Receipt Tilt-In
  gsap.from('.receipt', {
    rotation: -10,
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'elastic.out(1, 0.6)',
    scrollTrigger: {
      trigger: '.works-head',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // 3. Stacking Cards Depth Effect (Card Stacking Scrub)
  const cardWrappers = gsap.utils.toArray('.card-sticky-wrapper');
  const totalCards = cardWrappers.length;

  cardWrappers.forEach((wrapper, i) => {
    const card = wrapper.querySelector('.card');
    if (!card) return;

    // Accordion tab top offset
    const offsetTop = 20 * i;
    card.style.top = offsetTop + "px";

    // As next cards scroll on top, scale down and dim this card
    if (i < totalCards - 1) {
      const nextWrapper = cardWrappers[i + 1];

      gsap.to(card, {
        scale: 0.94,
        opacity: 0.4,
        filter: 'blur(3px) brightness(0.6)',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: nextWrapper,
          start: 'top 60%',
          end: 'top top',
          scrub: 0.4,
        },
      });
    }
  });

  // 4. Process Cards Stagger Entrance
  gsap.from('.p-card', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.process-cards',
      start: 'top 82%',
      toggleActions: 'play none none reverse',
    },
  });

  // 5. Tentang Word-by-Word Scrub
  const aboutEl = document.getElementById('aboutText');
  if (aboutEl) {
    const rawWords = aboutEl.textContent.trim().split(/\s+/);
    aboutEl.innerHTML = rawWords.map((w) => `<span class="w">${w}</span>`).join(' ');
    const spans = gsap.utils.toArray('.about-text .w');

    gsap.to(spans, {
      color: '#0B2545',
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 75%',
        end: 'bottom 45%',
        scrub: 0.8,
      },
    });
  }

  // 6. About Stickers
  gsap.from('.sticker', {
    y: 50,
    opacity: 0,
    scale: 0.95,
    duration: 0.9,
    stagger: 0.2,
    ease: 'back.out(1.6)',
    scrollTrigger: {
      trigger: '.about-imgs',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });

  // 7. Stats counter animation
  gsap.from('.stat', {
    y: 35,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.stats',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
  });

  // 8. Ticket Boarding Pass Reveal
  gsap.from('.ticket', {
    y: 70,
    opacity: 0,
    rotation: -4,
    duration: 1.2,
    ease: 'elastic.out(1, 0.75)',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 78%',
      toggleActions: 'play none none reverse',
    },
  });

  // 10. Giant Footer Name
  gsap.from('.footer-giant', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 92%',
      toggleActions: 'play none none reverse',
    },
  });

  // 11. Navbar backdrop blur on scroll
  ScrollTrigger.create({
    trigger: 'main',
    start: 'top -70',
    onEnter: () => document.querySelector('.nav')?.classList.add('scrolled'),
    onLeaveBack: () => document.querySelector('.nav')?.classList.remove('scrolled'),
  });
})();

// ============ SMOOTH ANCHOR NAVIGATION (WITH LENIS COMPATIBILITY) ============
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', function (ev) {
    const id = this.getAttribute('href');
    if (!id || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;

    ev.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -60, duration: 1.2 });
    } else {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 60,
        behavior: 'smooth',
      });
    }
  });
});

// Marquee pause on hover
const marquee = document.querySelector('.marquee-track');
if (marquee) {
  marquee.addEventListener('mouseenter', () => (marquee.style.animationPlayState = 'paused'));
  marquee.addEventListener('mouseleave', () => (marquee.style.animationPlayState = 'running'));
}

// ============ PROJECT DETAIL MODAL INTERACTION ============
(function () {
  const projectsData = {
    jurnalku: {
      title: "JurnalKu (Dejournal) AI",
      category: "AI & E-Learning Web Application",
      year: "2026",
      role: "UI/UX Engineer & Fullstack Developer",
      image: "assets/p-jurnalku.png",
      tagline: "Riset Ilmiah Lebih Cerdas, Cepat, dan Terstruktur dengan Bantuan AI",
      overview: "JurnalKu adalah platform riset komprehensif yang dirancang untuk mengatasi hambatan mahasiswa dan akademisi dalam memilah ribuan referensi ilmiah. Menggabungkan model AI pemrosesan bahasa alami dengan antarmuka yang bersih dan bebas distraksi untuk membaca dan menganalisis paper akademik.",
      problem: "Peneliti sering menghabiskan puluhan jam hanya untuk membaca abstrak dan mencari korelasi antar-makalah ilmiah secara manual tanpa sistem pengorganisasian yang efektif.",
      solution: "Membangun sistem pencarian semantik cerdas dengan kemampuan ekstraksi intisari otomatis, manajemen bibliografi real-time, serta visualisasi keterkaitan topik riset.",
      features: [
        "Smart Semantic Search: Pencarian berbasis konteks topik riset, bukan sekadar kata kunci statis.",
        "Automated Key Takeaways: Ringkasan abstrak otomatis, metodologi, dan temuan kunci dalam hitungan detik.",
        "Citation & Reading List Manager: Penyimpanan referensi terintegrasi Supabase dengan sinkronisasi multi-device.",
        "Clean Reading Mode: Antarmuka pembaca artikel ramah mata dengan anotasi catatan digital."
      ],
      stack: ["Next.js 16", "React", "Python AI", "Supabase", "Tailwind CSS", "Figma"]
    },
    marimatcha: {
      title: "MariMatcha Ecommerce",
      category: "E-Commerce Web Platform",
      year: "2026",
      role: "Frontend Developer & UI Designer",
      image: "assets/p-marimatcha.png",
      tagline: "Pengalaman Belanja Produk Matcha Artisan dengan Estetika Visual Modern",
      overview: "Platform e-commerce modern khusus produk minuman dan bubuk matcha berkualitas tinggi. Menghadirkan identitas visual hijau segar yang menenangkan, dipadukan alur belanja yang ringkas dan sistem manajemen pesanan back-office yang handal.",
      problem: "Banyak toko e-commerce UMKM memiliki alur checkout yang rumit, navigasi katalog kaku, dan lambat dibuka di smartphone.",
      solution: "Merancang pengalaman belanja mobile-first dengan cart drawer interaktif, visualisasi varian produk real-time, serta dashboard operasional yang memudahkan admin memproses order.",
      features: [
        "Interactive Product Catalog: Filter varian rasa, ukuran, dan paket bundling secara dinamis.",
        "Seamless Cart & Quick Checkout: Alur pembelian responsif dengan kalkulasi ongkir instan.",
        "Admin Back-Office Panel: Manajemen stok bahan baku, pemantauan status pesanan, dan laporan penjualan.",
        "Fresh Modern Visuals: Desain tipografi editorial yang meningkatkan citra premium brand matcha."
      ],
      stack: ["CodeIgniter / Laravel", "MySQL", "Tailwind CSS", "JavaScript", "Figma"]
    },
    tiarafinn: {
      title: "TiaraFinn - Iuran RT/RW",
      category: "Mobile Application (Cross-Platform)",
      year: "2026",
      role: "Mobile UI/UX Engineer & Flutter Developer",
      image: "assets/p-tiarafinn.png",
      tagline: "Transparansi Kas dan Administrasi Iuran Warga Digital dalam Genggaman",
      overview: "Solusi tata kelola administrasi dan pembayaran iuran warga lingkungan RT/RW digital. Menghilangkan pencatatan manual buku kas yang rentan tercecer dan mewujudkan transparansi keuangan lingkungan secara terbuka.",
      problem: "Pencatatan iuran warga konvensional menggunakan buku fisik sering menimbulkan selisih kas, sulit diaudit warga, dan menagih manual dari pintu ke pintu tidak efisien.",
      solution: "Membangun aplikasi mobile multi-role yang memudahkan warga membayar serta mengecek buku kas terbuka, sementara pengurus dapat mengelola tagihan dalam satu klik.",
      features: [
        "Digital Billing & Payment Status: Notifikasi tagihan iuran bulanan dan histori transaksi terverifikasi.",
        "Public Cashbook Transparency: Grafik pemasukan dan pengeluaran kas lingkungan yang dapat dipantau seluruh warga.",
        "Role-Based Access Control: Hak akses terpisah dan aman untuk Warga, Bendahara, dan Ketua RT/RW.",
        "Offline-First Data Sync: Tetap dapat mencatat data di lapangan walau sinyal minim dengan sinkronisasi otomatis."
      ],
      stack: ["Flutter", "Dart", "Firebase", "Supabase", "Figma Design System"]
    },
    siabsensi: {
      title: "SiAbsensi Karyawan",
      category: "Enterprise Desktop System",
      year: "2026",
      role: "Desktop Software Engineer & Database Architect",
      image: "assets/p-siabsensi.png",
      tagline: "Pencatatan Presensi Presisi & Otomatisasi Administrasi Kepegawaian",
      overview: "Sistem aplikasi desktop absensi karyawan berkecepatan tinggi yang dirancang untuk kantor dan operasional pabrik. Mampu menangani validasi jam kerja dinamis dan pembuatan slip rekapitulasi tanpa hambatan.",
      problem: "Sistem presensi manual rawan kecurangan (titip absen), lambat dalam rekapitulasi akhir bulan, dan rentan human-error saat penghitungan lembur.",
      solution: "Aplikasi desktop mandiri dengan database relasional terindeks, validasi waktu presisi, dan modul eksport laporan yang terintegrasi.",
      features: [
        "Precision Clock-In / Clock-Out: Validasi otomatis jam kerja normal, shift malam, dan jam lembur.",
        "PostgreSQL Relational DB: Struktur data pegawai yang rapi, aman, dan mendukung rekap ribuan data.",
        "Automated Payroll & Slip PDF: Pembuatan laporan rekapitulasi bulanan dan cetak slip via JasperReports.",
        "Intuitive Desktop GUI: Antarmuka Java Swing modern dengan navigasi cepat untuk staf HRD."
      ],
      stack: ["Java", "PostgreSQL", "Java Swing", "JasperReports"]
    },
    ourscontent: {
      title: "OursContent Management",
      category: "Creator Platform & Marketing Analytics",
      year: "2026",
      role: "Fullstack Developer & System Analyst",
      image: "assets/p-ourscontent.png",
      tagline: "Workflow Terpadu dari Ide, Produksi Konten, Hingga Analitik Performa",
      overview: "Sistem manajemen konten digital marketing dan agensi kreatif. Menyatukan kalender produksi konten multi-platform, analitik reach media sosial, dan laporan kinerja kampanye dalam satu dashboard terpusat.",
      problem: "Tim kreator sering kehilangan jejak deadline konten, koordinasi brief antar-anggota berantakan di chat, dan rekap metrik analitik ke klien memakan waktu.",
      solution: "Dashboard kolaboratif yang menggabungkan kanban/kalender editorial dengan integrasi pelaporan analitik performa.",
      features: [
        "Editorial Publishing Calendar: Manajemen jadwal konten lintas Instagram, TikTok, dan YouTube.",
        "KPI & Engagement Analytics: Visualisasi pertumbuhan followers, views, interaksi, dan reach kampanye.",
        "Collaborative Team Workflow: Pembagian tugas jelas antara Producer, Scriptwriter, dan Video Editor.",
        "Executive PDF Summary: Rekap performa siap unduh untuk presentasi rutin ke klien."
      ],
      stack: ["Java", "PostgreSQL", "JasperReports", "UI/UX Architecture"]
    },
    mobilku: {
      title: "Mobilku.id Auto System",
      category: "Automotive Dealership Platform",
      year: "2026",
      role: "Web Developer & UI Designer",
      image: "assets/p-mobilku.png",
      tagline: "Ekosistem Digital Transaksi Jual-Beli & Pembiayaan Mobil Bekas",
      overview: "Sistem informasi terintegrasi untuk dealer mobil bekas. Menyediakan katalog kendaraan interaktif bagi calon pembeli sekaligus sistem inventaris unit dan kalkulator simulasi kredit bagi staf penjualan.",
      problem: "Konsumen ragu membeli mobil bekas karena minimnya transparansi riwayat kendaraan, sementara dealer kesulitan menghitung simulasi angsuran secara cepat.",
      solution: "Web portal dengan kartu spesifikasi transparan, modul inspeksi mesin lengkap, dan kalkulator kredit otomatis.",
      features: [
        "Interactive Vehicle Showcase: Galeri foto detail, filter transmisi/tahun, dan status ketersediaan unit.",
        "Credit & Installment Simulator: Kalkulator otomatis estimasi DP, suku bunga, tenor, dan angsuran bulanan.",
        "Test Drive & Booking Integration: Formulir pemesanan online yang terhubung langsung ke tim sales WhatsApp.",
        "Dealer Inventory Dashboard: Manajemen keluar-masuk stok mobil dan pencatatan transaksi penjualan."
      ],
      stack: ["Web Platform", "PostgreSQL", "Tailwind CSS", "Figma"]
    }
  };

  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const backdrop = document.getElementById('modalBackdrop');
  const contactBtn = document.getElementById('modalContactBtn');

  const elCat = document.getElementById('modalCategory');
  const elYear = document.getElementById('modalYear');
  const elRole = document.getElementById('modalRole');
  const elTitle = document.getElementById('modalTitle');
  const elTagline = document.getElementById('modalTagline');
  const elImage = document.getElementById('modalImage');
  const elOverview = document.getElementById('modalOverview');
  const elProblem = document.getElementById('modalProblem');
  const elSolution = document.getElementById('modalSolution');
  const elFeatures = document.getElementById('modalFeatures');
  const elStack = document.getElementById('modalStack');

  function openModal(id) {
    const data = projectsData[id];
    if (!data || !modal) return;

    if (elCat) elCat.textContent = data.category;
    if (elYear) elYear.textContent = data.year;
    if (elRole) elRole.textContent = data.role;
    if (elTitle) elTitle.textContent = data.title;
    if (elTagline) elTagline.textContent = data.tagline;
    if (elImage) {
      elImage.src = data.image;
      elImage.alt = data.title;
    }
    if (elOverview) elOverview.textContent = data.overview;
    if (elProblem) elProblem.textContent = data.problem;
    if (elSolution) elSolution.textContent = data.solution;

    if (elFeatures) {
      elFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    }

    if (elStack) {
      elStack.innerHTML = data.stack.map(s => `<span>${s}</span>`).join('');
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Pause lenis if active
    if (lenis) lenis.stop();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Resume lenis
    if (lenis) lenis.start();
  }

  // Attach click listeners to cards and buttons
  document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const id = this.getAttribute('data-project');
      openModal(id);
    });
  });

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function (e) {
      // If clicking directly on a button or link inside card, let it handle
      if (e.target.closest('a') || e.target.closest('button')) return;
      const id = this.getAttribute('data-project');
      if (id) openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  if (contactBtn) {
    contactBtn.addEventListener('click', function () {
      closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();