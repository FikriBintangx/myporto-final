// ============ INITIALIZE UNIFIED GSAP & LENIS SYSTEM ============
let lenis = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

if (prefersReducedMotion) {
  if (typeof gsap !== 'undefined') {
    gsap.set('[data-reveal], [data-reveal-meta], .word-inner', { clearProps: 'all', opacity: 1 });
  }
} else if (typeof Lenis !== 'undefined') {
  // Mobile / Touch devices use native 120Hz momentum scrolling for zero-jank
  lenis = isTouchDevice
    ? null
    : new Lenis({
        duration: 0.9,
        wheelMultiplier: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });

  if (lenis && typeof ScrollTrigger !== 'undefined') {
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
        y: -18,
        opacity: 0,
        scale: 0.97,
        filter: 'blur(8px)',
        duration: 0.20,
        ease: 'power2.in',
        onComplete: () => {
          greetingEl.textContent = item.text;
          if (langEl) langEl.textContent = item.lang;

          gsap.fromTo(
            greetingEl,
            { y: 18, opacity: 0, scale: 0.97, filter: 'blur(8px)' },
            { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.36, ease: 'power3.out' }
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
            scale: 1.05,
            opacity: 0,
            filter: 'blur(12px)',
            duration: 0.45,
            ease: 'power2.inOut',
          });
        }

        setTimeout(() => {
          loader.classList.add('done');
          document.body.style.overflow = '';
          setTimeout(() => {
            loader.remove();
          }, 900);
        }, 220);
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
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.6,
    ease: 'elastic.out(1, 0.6)',
    scrollTrigger: {
      trigger: '.works-head',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

    // 3. Stacking Cards Depth Effect (Desktop only — Mobile uses natural feed flow)
  if (window.innerWidth > 900) {
    const cardWrappers = gsap.utils.toArray('.card-sticky-wrapper');
    const totalCards = cardWrappers.length;

    cardWrappers.forEach((wrapper, i) => {
      const card = wrapper.querySelector('.card');
      if (!card) return;

      // Card yang di bawah memiliki z-index LEBIH TINGGI agar MENIMPA card di atasnya
      wrapper.style.zIndex = i + 1;

      // Keep cards centered in viewport
      card.style.top = '0px';

      // Ketika card berikutnya (di bawah) naik, card sebelumnya HANYA sedikit scaling (0.97)
      if (i < totalCards - 1) {
        const nextWrapper = cardWrappers[i + 1];

        gsap.to(card, {
          scale: 0.97,
          ease: 'none',
          scrollTrigger: {
            trigger: nextWrapper,
            start: 'top 85%',
            end: 'top 25%',
            scrub: true,
          },
        });
      }
    });
  }

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function (e) {
      // If clicking directly on a button or link inside card, let it handle
      if (e.target.closest('a') || e.target.closest('button')) return;
      const id = this.getAttribute('data-project');
      if (id) openModal(id);
    });
  });

  // Modal listeners managed safely below
})();
// ============ PROJECT MODAL CONTROLLER ============
const modal = document.getElementById('projectModal');
const backdrop = document.getElementById('modalBackdrop');
const closeBtn = document.getElementById('modalCloseBtn');
const contactBtn = document.getElementById('modalContactBtn');
const liveBtn = document.getElementById('modalLiveBtn');

const PROJECTS_DATA = {
  marimatcha: {
    title: "MariMatcha E-Commerce",
    tagline: "Artisan Matcha & Organic Tea Shopping Platform",
    category: "Web Platform · E-Commerce",
    year: "2026",
    role: "Fullstack Developer & UI/UX Designer",
    image: "./assets/p-marimatcha.png",
    overview: "MariMatcha adalah platform belanja digital terkurasi khusus teh hijau matcha premium. Menawarkan antarmuka yang elegan, katalog interaktif dengan filter citarasa, cart checkout instan, dan integrasi operasional inventaris.",
    overview_en: "MariMatcha is a curated digital commerce platform designed for ceremonial matcha and artisanal green tea. Featuring bespoke visual hierarchy, flavor profile filtering, streamlined cart mechanics, and operational inventory management.",
    problem: "Pasar matcha premium membutuhkan representasi visual yang tenang, segar, dan berkelas, namun toko konvensional seringkali terasa generik dengan checkout yang lambat.",
    problem_en: "Artisanal matcha requires mindful, tranquil, and high-tier visual branding. Legacy merchant platforms suffered from sluggish checkout friction and generic layouts.",
    solution: "Merancang antarmuka bernuansa earthy-green dengan micro-interactions lembut, arsitektur CodeIgniter 3 / Laravel yang ringan, dan alur pembayaran satu klik.",
    solution_en: "Crafted an earthy-green design system with fluid micro-interactions, low-latency PHP MVC architecture, and friction-free payment flows.",
    features: [
      "Katalog Citarasa Matcha Interaktif dengan filter grade kuliner & ceremonial",
      "Cart & Checkout responsif dengan estimasi ongkir otomatis",
      "Panel Manajemen Produk & Pesanan untuk pemilik toko",
      "Mobile-First Responsive layout dengan fluid scroll"
    ],
    features_en: [
      "Interactive Flavor Grading Filter (Ceremonial vs Culinary)",
      "Instant Cart & Checkout with automated logistics calculator",
      "Integrated Merchant Dashboard for real-time inventory monitoring",
      "Mobile-First Fluid UI tuned for 60 FPS transitions"
    ],
    stack: ["CodeIgniter 3", "Laravel", "PHP", "MySQL", "CSS3 / Sass", "Figma Design System"],
    liveUrl: "https://marimatcha.vercel.app"
  },
  jurnalku: {
    title: "JurnalKu AI Platform",
    tagline: "Academic Research & Literature Intelligence Suite",
    category: "AI Web Application",
    year: "2026",
    role: "AI Engineer & Frontend Architect",
    image: "./assets/p-jurnalku.png",
    overview: "Platform riset akademik berbasis AI yang membantu peneliti, dosen, dan mahasiswa menemukan, mensintesis, dan mengekstrak temuan inti dari ratusan jurnal ilmiah dalam hitungan detik.",
    overview_en: "An intelligent academic literature workspace enabling researchers, faculty, and students to discover, cross-synthesize, and extract core empirical findings from scholarly papers in seconds.",
    problem: "Peneliti menghabiskan puluhan jam membaca manual ribuan halaman jurnal hanya untuk menyusun matriks literatur dan menemukan research gap.",
    problem_en: "Researchers waste dozens of hours manually sifting through PDFs to formulate literature review matrices and identify unexplored research gaps.",
    solution: "Mengintegrasikan Retrieval-Augmented Generation (RAG) dengan vector embeddings Supabase, sitasi interaktif langsung ke halaman PDF, dan ekstraksi otomatis metodologi.",
    solution_en: "Engineered a dense RAG pipeline with Supabase vector embeddings, interactive citation highlighting on PDF sources, and automated methodology extraction.",
    features: [
      "Multi-document comparative analysis & synthesis matrix generator",
      "PDF In-line visual citation highlighter",
      "Export to BibTeX, Mendeley, and APA 7th Edition format",
      "AI semantic search across peer-reviewed databases"
    ],
    features_en: [
      "Multi-document comparative analysis & synthesis matrix generator",
      "PDF In-line visual citation highlighter",
      "Export to BibTeX, Mendeley, and APA 7th Edition format",
      "AI semantic search across peer-reviewed databases"
    ],
    stack: ["Next.js 14", "Python", "Supabase Vector", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://dejurnal.vercel.app"
  },
  prepmaster: {
    title: "PrepMaster AI",
    tagline: "STAR Rubric Adaptive Mock Interview Engine",
    category: "AI Career Tech",
    year: "2026",
    role: "Fullstack & Voice AI Engineer",
    image: "./assets/p-prepmaster.png",
    overview: "Simulasi wawancara kerja adaptif berbasis STAR rubric dari unggahan CV PDF dengan input suara waveform real-time, evaluasi instan, dan ekspor debrief PDF komprehensif.",
    overview_en: "Adaptive technical and behavioral mock interview simulator evaluated against the STAR rubric with real-time waveform voice streaming and instant PDF debrief exports.",
    problem: "Pelamar kerja sering gagal dalam interview karena kurang latihan dengan feedback terstruktur dan obyektif.",
    problem_en: "Job candidates struggle during high-stakes interviews due to a lack of structured, quantitative feedback on their answer delivery.",
    solution: "Membangun voice pipeline interaktif dengan Web Speech API dan evaluasi bertingkat berdasarkan rubrik Situation, Task, Action, Result.",
    solution_en: "Built a low-latency voice pipeline utilizing the Web Speech API and calibrated grading algorithms evaluating depth, clarity, and metrics.",
    features: [
      "Pengekstrakan profil dan keahlian dari PDF resume",
      "Interaksi suara waveform dinamis dua arah",
      "Skor kuantitatif dan rekomendasi perbaikan jawaban",
      "Unduh laporan evaluasi wawancara format PDF"
    ],
    features_en: [
      "Instant resume parsing and question generation",
      "Bi-directional real-time audio waveform interface",
      "Quantitative competency scoring and structural debrief",
      "Automated PDF candidate feedback report generation"
    ],
    stack: ["Next.js 14", "Web Speech API", "Recharts", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://prepmaster-ai-sandy.vercel.app"
  },
  notesbrain: {
    title: "NotesBrain RAG",
    tagline: "Grounded Multi-Document Study Workspace",
    category: "AI Research & RAG",
    year: "2026",
    role: "Fullstack Developer",
    image: "./assets/p-notesbrain.png",
    overview: "Workspace studi multi-dokumen dengan grounded RAG, sitasi visual yang menyorot teks PDF secara halus, dan generator 3D flashcard spaced repetition.",
    overview_en: "Multi-document knowledge workspace featuring grounded RAG, live visual PDF citation highlighting, and spaced-repetition memory cards.",
    problem: "Materi belajar yang terpecah-pecah di berbagai PDF sulit diingat dan sering memicu halusinasi pada chatbot umum.",
    problem_en: "Scattered study materials across disparate PDFs lead to fragmented retention and frequent hallucinations in conventional LLMs.",
    solution: "Menerapkan chunking cerdas dengan pgvector dan algoritma SuperMemo-2 untuk jadwal pengulangan flashcard optimal.",
    solution_en: "Implemented deterministic chunking with pgvector embeddings and the SuperMemo-2 algorithm for optimized active recall scheduling.",
    features: [
      "Grounded document Q&A tanpa halusinasi",
      "Visual page citation jumper pada dokumen",
      "3D Spaced-repetition flashcard generator",
      "Sinkronisasi catatan offline dengan IndexedDB"
    ],
    features_en: [
      "Strictly grounded document Q&A with zero hallucinations",
      "Visual document coordinates jump-to-citation",
      "3D Spaced-repetition flashcard engine",
      "Offline-first client persistence with IndexedDB"
    ],
    stack: ["Next.js 14", "pgvector", "TypeScript", "SuperMemo-2", "Tailwind CSS"],
    liveUrl: "https://02-notesbrain.vercel.app"
  },
  pantrychef: {
    title: "PantryChef Vision PWA",
    tagline: "Zero-Waste Smart Kitchen & Recipe Assistant",
    category: "Culinary AI PWA",
    year: "2026",
    role: "Mobile PWA Architect",
    image: "./assets/p-pantrychef.png",
    overview: "PWA asisten dapur zero-waste: scan foto isi kulkas, rekomendasikan menu sisa bahan, dan pandu masak step-by-step dengan audio timer chime.",
    overview_en: "Zero-waste culinary PWA: scan refrigerator ingredients, compute recipe pairings, and guide preparation via hands-free voice timers.",
    problem: "Pemborosan bahan makanan rumah tangga tinggi karena ketidaktahuan cara mengolah bahan yang tersisa di kulkas.",
    problem_en: "Household food waste peaks when consumers cannot figure out creative culinary pairings for perishable leftovers.",
    solution: "Sistem computer vision pengenal bahan makanan dengan resep adaptif dan mode hands-free memasak.",
    solution_en: "Designed computer vision food ingredient classification paired with dynamic recipe synthesis and audio-guided cooking timers.",
    features: [
      "Scan bahan kulkas dengan kamera ponsel",
      "Kalkulasi nutrisi dan kalori otomatis",
      "Audio timer bertingkat untuk setiap tahap memasak",
      "Dapat diinstall sebagai Progressive Web App (PWA)"
    ],
    features_en: [
      "On-device camera ingredient identification",
      "Automated macronutrient and caloric computation",
      "Hands-free multi-stage culinary audio timers",
      "Installable offline-capable Progressive Web App"
    ],
    stack: ["Next.js 14", "IndexedDB", "Web Audio API", "PWA", "Tailwind CSS"],
    liveUrl: "https://03-pantrychef.vercel.app"
  },
  estatemate: {
    title: "EstateMate PropTech",
    tagline: "Commercial Property Valuation & Tour Suite",
    category: "PropTech Web",
    year: "2026",
    role: "Fullstack Engineer",
    image: "./assets/p-estatemate.png",
    overview: "Platform listing properti residensial & komersial dengan estimasi hipotek dinamis, perbandingan unit side-by-side, dan penjadwalan inspeksi.",
    overview_en: "Commercial & residential property listing engine with real-time mortgage amortization, comparative unit analytics, and inspection booking.",
    problem: "Calon pembeli properti kesulitan membandingkan yield investasi dan simulasi angsuran secara transparan di satu tempat.",
    problem_en: "Prospective buyers struggle to benchmark investment cap rates, tax amortization, and comparative property specifications in a unified portal.",
    solution: "Menyediakan kalkulator simulasi KPR interaktif dengan visualisasi amortisasi dan tur visual resolusi tinggi.",
    solution_en: "Engineered real-time financial amortization calculators with interactive payoff schedules and high-fidelity property showcases.",
    features: [
      "Kalkulator simulasi KPR interaktif dengan breakdown suku bunga",
      "Perbandingan multi-properti matriks",
      "Sistem janji temu survei langsung",
      "Integrasi peta lokasi interaktif"
    ],
    features_en: [
      "Real-time interactive mortgage & interest amortization breakdown",
      "Side-by-side multi-unit investment benchmarking",
      "Direct agent inspection scheduling interface",
      "Interactive geo-location mapping with amenity metrics"
    ],
    stack: ["React", "Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    liveUrl: "https://04-estatemate.vercel.app"
  },
  spendsense: {
    title: "SpendSense Fintech",
    tagline: "Personal Finance & Smart Cashflow Tracker",
    category: "Fintech Platform",
    year: "2026",
    role: "Frontend Developer & UI/UX",
    image: "./assets/p-spendsense.png",
    overview: "Pencatat keuangan harian berbasis web yang membantu pengguna melacak cashflow, menetapkan anggaran bulanan, dan memvisualisasikan tren pengeluaran.",
    overview_en: "Intuitive personal finance dashboard enabling users to track multi-account cashflows, enforce category budgets, and visualize spending velocities.",
    problem: "Banyak orang kesulitan mengontrol pengeluaran harian karena aplikasi keuangan yang terlalu rumit dan membingungkan.",
    problem_en: "Consumers abandon financial tracking when apps are cluttered with confusing charts and high data-entry friction.",
    solution: "Antarmuka minimalis dengan visualisasi grafik yang mudah dipahami dan input transaksi kilat kurang dari 5 detik.",
    solution_en: "Built a minimalist, high-contrast dashboard with instant 5-second transaction logging and clean visual cashflow breakdowns.",
    features: [
      "Visualisasi alur kas bulanan dengan grafik interaktif",
      "Kategori pengeluaran kustom dengan batas budget",
      "Ekspor laporan keuangan ke format Excel / CSV",
      "Keamanan data lokal terenkripsi"
    ],
    features_en: [
      "Interactive monthly cashflow and category distribution charts",
      "Customizable expense taxonomies with proactive overspend alerts",
      "One-click financial statement exports to CSV / Excel",
      "Encrypted client-side data persistence"
    ],
    stack: ["React", "Chart.js", "JavaScript", "CSS3", "Figma"],
    liveUrl: "https://05-spendsense.vercel.app"
  },
  tiarafinn: {
    title: "TiaraFinn RT/RW Suite",
    tagline: "Community Billing & Neighborhood Administration",
    category: "Community Tech",
    year: "2026",
    role: "Fullstack Developer",
    image: "./assets/p-tiarafinn.png",
    overview: "Sistem informasi pengelolaan iuran kas, pendataan warga, dan transparansi laporan keuangan lingkungan RT/RW secara terpadu dan akuntabel.",
    overview_en: "Integrated civic administration suite for neighborhood treasurers: automated monthly dues billing, citizen census, and public ledger transparency.",
    problem: "Pencatatan kas lingkungan warga yang masih manual di buku besar rawan salah hitung, hilang, dan memicu ketidakpercayaan antar warga.",
    problem_en: "Manual paper ledger bookkeeping for neighborhood dues results in accounting discrepancies, lost records, and mistrust among residents.",
    solution: "Platform digital terpusat dengan kwitansi digital otomatis, broadcast notifikasi WhatsApp, dan rekap keuangan real-time.",
    solution_en: "Digitized community operations with automated payment receipts, WhatsApp notification integrations, and publicly verifiable cashflow ledgers.",
    features: [
      "Pencatatan iuran sampah, keamanan, dan kas RT otomatis",
      "Generator kwitansi digital langsung ke WhatsApp warga",
      "Laporan arus kas masuk dan keluar yang dapat diakses publik",
      "Manajemen data kependudukan per blok rumah"
    ],
    features_en: [
      "Automated monthly utility, security, and communal dues billing",
      "Digital payment receipt generation with instant WhatsApp dispatch",
      "Publicly auditable real-time income and expense ledgers",
      "Household census and demographic census management"
    ],
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap 5", "Figma"],
    liveUrl: "https://tiarafin-portfolio.vercel.app"
  },
  siabsensi: {
    title: "SiAbsensi Desktop HRMS",
    tagline: "Enterprise Biometric Attendance & Payroll Sync",
    category: "Desktop HRMS",
    year: "2026",
    role: "Desktop Software Engineer",
    image: "./assets/p-siabsensi.png",
    overview: "Aplikasi desktop manajemen presensi karyawan dengan integrasi mesin fingerprint, rekap cuti otomatis, dan kalkulasi uang lembur terintegrasi.",
    overview_en: "Desktop enterprise attendance and payroll reconciliation suite with hardware biometric syncing, leave tracking, and overtime calculation.",
    problem: "Sinkronisasi log mesin fingerprint ke lembar gaji manual di HR sering memakan waktu berhari-hari pada akhir bulan.",
    problem_en: "Extracting hardware biometric device logs and computing end-of-month overtime spreadsheets was tedious and error-prone.",
    solution: "Aplikasi desktop performa tinggi yang menarik log mesin absensi secara otomatis dan mengkalkulasi jam kerja secara instan.",
    solution_en: "Engineered a low-overhead desktop solution that polls biometric device sockets and automatically generates verified payroll tables.",
    features: [
      "Koneksi langsung ke mesin absensi fingerprint via LAN",
      "Perhitungan jam kerja reguler, keterlambatan, dan lembur",
      "Manajemen permohonan cuti dan izin kerja",
      "Ekspor rekap kehadiran siap cetak untuk divisi HR & Finance"
    ],
    features_en: [
      "Direct hardware socket polling via local LAN",
      "Automated shift computation, late penalty rules, and overtime formulas",
      "Employee leave accrual and approval workflows",
      "One-click audit report exports for payroll reconciliation"
    ],
    stack: ["Java", "JavaFX", "MySQL", "JasperReports", "SceneBuilder"],
    liveUrl: "https://fikribintang.web.id"
  },
  ourscontent: {
    title: "OursContent Media System",
    tagline: "Editorial Publishing & Digital Asset Manager",
    category: "Content Management",
    year: "2026",
    role: "Fullstack Engineer",
    image: "./assets/p-ourscontent.png",
    overview: "Sistem publikasi konten digital multi-penulis dengan editor rich-text, pipeline moderasi artikel, manajemen aset gambar, dan analisis pembaca.",
    overview_en: "Multi-author digital editorial publication suite featuring rich markdown editors, review workflows, digital asset pipelines, and telemetry.",
    problem: "Tim redaksi media membutuhkan alur persetujuan artikel yang teratur sebelum rilis ke publik tanpa ketergantungan plugin pihak ketiga.",
    problem_en: "Editorial teams require structured multi-stage approval staging before publishing articles, free from bloated legacy CMS dependencies.",
    solution: "Membangun CMS kustom yang ringan, aman, dengan role-based access control (RBAC) antara penulis, editor, dan pimpinan redaksi.",
    solution_en: "Built a bespoke, lightweight, and secure CMS with fine-grained RBAC separating contributors, copy editors, and chief publishers.",
    features: [
      "Editor artikel interaktif dengan preview instan",
      "Sistem alur kerja moderasi (Draft → Review → Publish)",
      "Optimasi gambar otomatis saat diunggah",
      "Analitik jumlah pembaca dan topik populer"
    ],
    features_en: [
      "Live side-by-side rich article composer",
      "Multi-stage editorial workflow (Draft → Staged → Published)",
      "Automated image compression and WebP conversion pipeline",
      "Real-time article view counters and trend metrics"
    ],
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Tailwind CSS"],
    liveUrl: "https://alargenbackoffice.vercel.app"
  },
  mobilku: {
    title: "Mobilku.id Auto Marketplace",
    tagline: "Automotive Vehicle Catalog & Dealership CRM",
    category: "Web Platform · Automotive",
    year: "2026",
    role: "Fullstack Developer & UI/UX",
    image: "./assets/p-mobilku.png",
    overview: "Platform katalog jual beli mobil bekas terintegrasi dengan filter spesifikasi detail, kalkulator simulasi kredit kendaraan, dan integrasi WhatsApp sales.",
    overview_en: "Used automobile marketplace and dealership showroom featuring granular specification filters, financing calculators, and sales CRM links.",
    problem: "Pembeli mobil bekas sering ragu karena informasi kondisi unit yang tidak lengkap dan simulasi cicilan yang tidak transparan.",
    problem_en: "Automobile buyers experience hesitation due to vague inspection histories and opaque dealership financing structures.",
    solution: "Menampilkan lembar inspeksi kendaraan transparan, kalkulator DP & cicilan fleksibel, dan tombol konsultasi sales 1-klik.",
    solution_en: "Designed transparent condition inspection scorecards, flexible down-payment calculators, and direct dealership WhatsApp channels.",
    features: [
      "Pencarian kendaraan berdasarkan merek, tahun, transmisi, dan harga",
      "Kalkulator simulasi uang muka (DP) dan angsuran bulanan",
      "Galeri foto resolusi tinggi 360 derajat eksterior & interior",
      "Hubungi konsultan penjualan via WhatsApp dengan detail unit terisi otomatis"
    ],
    features_en: [
      "Granular vehicle filtering by make, model year, transmission, and price",
      "Down-payment and monthly installment amortization simulation",
      "High-resolution exterior and interior photo showcases",
      "One-click WhatsApp sales lead generation with pre-populated vehicle SKU"
    ],
    stack: ["Laravel", "PostgreSQL", "JavaScript", "Bootstrap 5", "Figma"],
    liveUrl: "https://october-app.vercel.app"
  }
};

function openModal(id) {
  const p = PROJECTS_DATA[id];
  if (!p || !modal) return;

  const isEn = (localStorage.getItem('fb_portfolio_lang') === 'en');

  // Fill modal fields
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalTagline').textContent = p.tagline;
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalYear').textContent = p.year;
  document.getElementById('modalRole').textContent = p.role;
  document.getElementById('modalImage').src = p.image;
  document.getElementById('modalImage').alt = p.title;

  document.getElementById('modalOverview').textContent = isEn ? (p.overview_en || p.overview) : p.overview;
  document.getElementById('modalProblem').textContent = isEn ? (p.problem_en || p.problem) : p.problem;
  document.getElementById('modalSolution').textContent = isEn ? (p.solution_en || p.solution) : p.solution;

  // Features list
  const featList = document.getElementById('modalFeatures');
  featList.innerHTML = '';
  const features = isEn ? (p.features_en || p.features) : p.features;
  features.forEach(feat => {
    const li = document.createElement('li');
    li.textContent = feat;
    featList.appendChild(li);
  });

  // Stack pills
  const stackWrap = document.getElementById('modalStack');
  stackWrap.innerHTML = '';
  p.stack.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'pill';
    span.textContent = tech;
    stackWrap.appendChild(span);
  });

  // Live link
  if (liveBtn) {
    if (p.liveUrl) {
      liveBtn.href = p.liveUrl;
      liveBtn.style.display = 'block';
      liveBtn.textContent = isEn ? 'Open Live App ↗' : 'Buka Live App ↗';
    } else {
      liveBtn.style.display = 'none';
    }
  }

  // Open modal animation
  if (typeof lenis !== 'undefined' && lenis) {
    try { lenis.stop(); } catch(e){}
  }
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  
  // Ensure modal scroll body is at top on open
  const sb = modal.querySelector('.modal-scroll-body');
  if (sb) {
    sb.scrollTop = 0;
  }
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (typeof lenis !== 'undefined' && lenis) {
    try { lenis.start(); } catch(e){}
  }
}

// Bind modal listeners
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (backdrop) backdrop.addEventListener('click', closeModal);
if (contactBtn) contactBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
    closeModal();
  }
});

// Bind all open buttons
document.querySelectorAll('.btn-open-modal').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    const id = this.getAttribute('data-project');
    if (id) openModal(id);
  });
});


// ==========================================================================
// ARTCRAFT VERTICAL RULER SCROLL SYNC
// ==========================================================================
function initArtCraftRuler() {
  return; // Retired in favor of editorial-ruler.js
  const ruler = document.getElementById("artcraftRuler");
  if (!ruler) return;

  const track = document.getElementById('rulerTrack');
  const cursor = document.getElementById('rulerCursor');
  const badge = document.getElementById('rulerCursorBadge');
  const secLinks = document.querySelectorAll('.ruler-sec-item');

  function updateRuler() {
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    if (cursor) {
      cursor.style.top = (progress * 100) + '%';
    }

    // Determine Active Section Name (Dynamic Page Recognition)
    const sections = [
      { id: 'kontak', name: 'KONTAK' },
      { id: 'tentang', name: 'TENTANG' },
      { id: 'proses', name: 'PROSES' },
      { id: 'publikasi', name: 'RISET' },
      { id: 'karya', name: 'KARYA' },
    ];

    let currentName = 'HERO';
    let currentSecId = 'top';
    const viewportOffset = window.innerHeight * 0.42;

    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportOffset) {
          currentName = sec.name;
          currentSecId = sec.id;
          break;
        }
      }
    }

    if (badge) {
      badge.textContent = currentName;
    }

    secLinks.forEach(link => {
      if (link.getAttribute('data-sec') === currentSecId) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  // Click on ruler track to smooth-scroll
  if (track) {
    track.addEventListener('click', (e) => {
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const ratio = Math.min(1, Math.max(0, clickY / rect.height));
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({
        top: ratio * maxScroll,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('scroll', updateRuler, { passive: true });
  window.addEventListener('resize', updateRuler, { passive: true });
  updateRuler();
}

document.addEventListener('DOMContentLoaded', initArtCraftRuler);

// ============ SCROLLTRIGGER ACTIVE NAV SYNC ============
(function() {
  if (typeof ScrollTrigger === 'undefined') return;

  function setActiveNav(id) {
    document.querySelectorAll('.nav-menu a, .ruler-sec-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + id || (id === 'top' && (href === '#top' || href === '#'))) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  const navSections = [
    
    { id: 'karya', trigger: '#karya' },
    { id: 'proses', trigger: '#proses' },
    { id: 'tentang', trigger: '#tentang' },
    { id: 'kontak', trigger: '#kontak' }
  ];

  navSections.forEach(sec => {
    const el = document.querySelector(sec.trigger);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => setActiveNav(sec.id),
      onEnterBack: () => setActiveNav(sec.id),
    });
  });
})();

// Modal scroll and touch isolation
(function() {
  const sb = document.querySelector('.modal-scroll-body');
  if (sb) {
    sb.addEventListener('wheel', function(e) {
      e.stopPropagation();
    }, { passive: true });
    sb.addEventListener('touchmove', function(e) {
      e.stopPropagation();
    }, { passive: true });
  }
})();


// ==========================================================================
// CLAUDE GSAP INTERACTION SYSTEM (P1 - P7)
// ==========================================================================
function initClaudeGSAPSystem() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (prefersReducedMotion) return;

  // ------------------------------------------------------------------------
  // 1. Text Reveal: Manual Split & Line-Mask Reveal
  // ------------------------------------------------------------------------
  function splitWords(el) {
    if (!el) return [];
    const childSpans = el.querySelectorAll(':scope > span');
    if (childSpans.length > 0) {
      const allInners = [];
      childSpans.forEach(span => {
        const words = span.textContent.trim().split(/\s+/);
        span.innerHTML = words
          .map((w) => `<span class="word"><span class="word-inner">${w}</span></span>`)
          .join(' ');
        allInners.push(...span.querySelectorAll('.word-inner'));
      });
      return allInners;
    }
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map((w) => `<span class="word"><span class="word-inner">${w}</span></span>`)
      .join(' ');
    return Array.from(el.querySelectorAll('.word-inner'));
  }

  // Hero Heading Reveal on Load (Above the fold)
  const heroSpans = document.querySelectorAll('.hero-title > span');
  if (heroSpans.length > 0) {
    const allHeroInners = [];
    heroSpans.forEach(span => {
      const words = span.textContent.trim().split(/\s+/);
      span.innerHTML = words
        .map(w => `<span class="word"><span class="word-inner">${w}</span></span>`)
        .join(' ');
      allHeroInners.push(...span.querySelectorAll('.word-inner'));
    });
    gsap.set(allHeroInners, { yPercent: 110 });
    gsap.to(allHeroInners, {
      yPercent: 0,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.04,
      delay: 0.2,
    });
  }

  // Section Headings Reveal on Scroll
  document.querySelectorAll('[data-reveal-heading]').forEach((heading) => {
    const words = splitWords(heading);
    if (!words.length) return;
    gsap.set(words, { yPercent: 110 });
    gsap.to(words, {
      yPercent: 0,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.03,
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ------------------------------------------------------------------------
  // 2. ZENITH & SCALE Readout (Driven by Real Scroll Progress)
  // ------------------------------------------------------------------------
  const scalarEls = document.querySelectorAll('[data-scroll-percent]:not(#rulerCursorBadge)');
  const zenithEl = document.querySelector('[data-zenith-degree]');
  let lastPct = -1;

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const pct = Math.round(self.progress * 100);
      if (pct === lastPct) return;
      lastPct = pct;
      scalarEls.forEach((el) => {
        el.textContent = `${String(pct).padStart(3, '0')}%`;
      });
      if (zenithEl) {
        const degree = Math.round(self.progress * 360);
        zenithEl.textContent = `${String(degree).padStart(3, '0')}° ZENITH`;
      }
    },
  });

  // ------------------------------------------------------------------------
  // 3. Project Card Curtain Reveal & Metadata Settle
  // ------------------------------------------------------------------------
  gsap.utils.toArray('.card').forEach((card) => {
    const mask = card.querySelector('.project-cover-mask, .polaroid-img-wrap');
    const img = mask ? mask.querySelector('img') : null;
    const meta = card.querySelectorAll('[data-reveal-meta]');

    if (mask && img) {
      gsap.set(mask, { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(img, { scale: 1.08 });
    }
    if (meta.length > 0) {
      gsap.set(meta, { opacity: 0, y: 16 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });

    if (mask && img) {
      tl.to(mask, { clipPath: 'inset(0% 0 0 0)', duration: 0.95, ease: 'power4.inOut' })
        .to(img, { scale: 1, duration: 1.05, ease: 'power3.out' }, '<');
    }
    if (meta.length > 0) {
      tl.to(meta, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out' }, '-=0.55');
    }
  });

  // ------------------------------------------------------------------------
  // 4. Nav Active State (Scroll-Spy)
  // ------------------------------------------------------------------------
  const sections = gsap.utils.toArray('section[id],  footer');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  sections.forEach((section) => {
    if (!section.id) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        if (!self.isActive) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${section.id}`);
        });
      },
    });
  });

  // ------------------------------------------------------------------------
  // 5. Dynamic Stats Calculation & Animated Count-Up
  // ------------------------------------------------------------------------
  function initDynamicStats() {
    // 1. Dynamic Projects Count: Count actual project cards in DOM or dataset
    const projectCards = document.querySelectorAll('.cards-stack-wrapper .card');
    const dynamicProjectsCount = projectCards.length > 0 ? projectCards.length : (typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA.length : 11);

    const statProjects = document.getElementById('statProjects');
    if (statProjects) {
      statProjects.setAttribute('data-count-to', dynamicProjectsCount);
      statProjects.setAttribute('data-decimals', '0');
    }

    // Also sync observatory receipt total
    const receiptTotal = document.querySelector('.receipt-total [data-count-to]');
    if (receiptTotal) {
      receiptTotal.setAttribute('data-count-to', dynamicProjectsCount);
    }

    // 2. Dynamic Experience Count: Count work experience items in right column
    const workItems = document.querySelectorAll('.career-matrix .career-col:last-child .career-items .career-item');
    const dynamicExpCount = workItems.length > 0 ? workItems.length : 4;

    const statExperience = document.getElementById('statExperience');
    if (statExperience) {
      statExperience.setAttribute('data-count-to', dynamicExpCount);
      statExperience.setAttribute('data-suffix', '+');
      statExperience.setAttribute('data-decimals', '0');
    }

    // 3. Dynamic IPK Value: Read from academic badge or default 3.34
    const ipkBadgeVal = document.querySelector('.ipk-badge [data-count-to]');
    const dynamicIpk = ipkBadgeVal ? parseFloat(ipkBadgeVal.getAttribute('data-count-to')) : 3.34;

    const statIpk = document.getElementById('statIpk');
    if (statIpk) {
      statIpk.setAttribute('data-count-to', dynamicIpk);
      statIpk.setAttribute('data-decimals', '2');
    }

    // 4. Initialize Count-Up Animation for all [data-count-to]
    document.querySelectorAll('[data-count-to]').forEach((el) => {
      const raw = el.getAttribute('data-count-to') || el.dataset.countTo;
      const target = parseFloat(raw);
      if (isNaN(target)) return;

      const decimals = el.getAttribute('data-decimals') !== null
        ? parseInt(el.getAttribute('data-decimals'), 10)
        : (raw.includes('.') ? raw.split('.')[1].length : 0);

      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const counter = { value: 0 };

      // Set initial state before animation kicks in
      el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;

      const runCountUp = () => {
        if (el.hasAttribute('data-counted')) return;
        el.setAttribute('data-counted', 'true');
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
          },
          onComplete: () => {
            el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
          }
        });
      };

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: runCountUp,
        });
      } else {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCountUp();
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(el);
      }
    });
  }

  initDynamicStats();

  // ------------------------------------------------------------------------
  // 6. Marquee Velocity-Reactive Speed Boost
  // ------------------------------------------------------------------------
  const marqueeTrack = document.querySelector('.marquee-track');
  let marqueeTween = null;

  if (marqueeTrack) {
    marqueeTween = gsap.to(marqueeTrack, {
      xPercent: -50,
      duration: 26,
      ease: 'none',
      repeat: -1,
    });
  }

  if (lenis && marqueeTween) {
    lenis.on('scroll', ({ velocity }) => {
      const boost = gsap.utils.clamp(0.5, 3.5, 1 + Math.abs(velocity) * 0.15);
      gsap.to(marqueeTween, {
        timeScale: boost,
        duration: 0.35,
        overwrite: true,
        ease: 'power1.out',
      });
    });
  } else if (!lenis && marqueeTween) {
    // Mobile native touch scroll velocity ticker
    let lastY = window.scrollY;
    let lastT = Date.now();
    window.addEventListener('scroll', () => {
      const now = Date.now();
      const dt = Math.max(1, now - lastT);
      const dy = Math.abs(window.scrollY - lastY);
      const speed = dy / dt;
      lastY = window.scrollY;
      lastT = now;
      const boost = gsap.utils.clamp(0.5, 3.2, 1 + speed * 0.85);
      gsap.to(marqueeTween, {
        timeScale: boost,
        duration: 0.35,
        overwrite: true,
        ease: 'power1.out',
      });
    }, { passive: true });
  }

  // ------------------------------------------------------------------------
  // 7. Career Timeline: Growing Vertical Line
  // ------------------------------------------------------------------------
  document.querySelectorAll('.career-items').forEach((wrapper) => {
    let line = wrapper.querySelector('.timeline-line');
    if (!line) {
      line = document.createElement('div');
      line.className = 'timeline-line';
      wrapper.prepend(line);
    }
    gsap.to(line, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 75%',
        end: 'bottom 75%',
        scrub: 0.5,
      },
    });
  });
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initClaudeGSAPSystem);
} else {
  initClaudeGSAPSystem();
}


// ============ CLEAN HASH ROUTING & REMOVE #top ============
(function() {
  if (window.location.hash === '#top') {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // Intercept logo and any remaining top links to scroll smoothly without hash
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href="#top"], .nav-logo');
    if (!link) return;
    
    // If it is nav-logo and on another page, let normal navigation happen
    if (link.classList.contains('nav-logo') && window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html')) {
      return;
    }

    e.preventDefault();
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.scrollTo(0, { duration: 0.85 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  });
})();


// ==========================================================================
// KINETIC TEXT RANDOMIZE / SCRAMBLE HOVER EFFECT FOR NAVBAR
// ==========================================================================
function initNavRandomizeHover() {
  const GLYPHS = '01#%&/<>_~*+?!X$';
  const navLinks = document.querySelectorAll('.nav-link, .nav-menu a');

  navLinks.forEach(link => {
    const targetSpan = link.querySelector('span[data-i18n]') || link.querySelector('.nav-link-box') || link.querySelector('span') || link;
    let animFrame = null;
    let iteration = 0;

    link.addEventListener('mouseenter', () => {
      const originalText = targetSpan.textContent.trim();
      cancelAnimationFrame(animFrame);
      iteration = 0;
      const totalChars = originalText.length;

      function scramble() {
        targetSpan.textContent = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '✦') return char;
            if (index < iteration) return originalText[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');

        if (iteration < totalChars) {
          iteration += 1 / 2.2;
          animFrame = requestAnimationFrame(scramble);
        } else {
          targetSpan.textContent = originalText;
        }
      }

      scramble();
    });

    link.addEventListener('mouseleave', () => {
      cancelAnimationFrame(animFrame);
      const originalText = link.getAttribute('data-original-text') || targetSpan.textContent.trim();
      targetSpan.textContent = originalText;
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavRandomizeHover);
} else {
  initNavRandomizeHover();
}
