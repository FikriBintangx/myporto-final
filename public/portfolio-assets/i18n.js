// ============ BILINGUAL (ID / EN) TRANSLATION ENGINE ============
const translations = {
  id: {
    // Navigation
    nav_karya: "Karya",
    nav_jurnal: "Jurnal ✦",
    nav_proses: "Proses",
    nav_tentang: "Tentang",
    nav_kontak: "Kontak",
    nav_back_home: "← Beranda Portofolio",
    nav_research: "Publikasi Ilmiah",
    badge_work_current: "Kerjaan Saat Ini : Internship",

    // Hero
    hero_badge: "Portfolio — 2026",
    hero_desc: "Backend Developer yang membangun arsitektur API berkinerja tinggi, sistem database presisi, dan layanan server yang tangguh di bawah beban tinggi.",
    hero_explore: "Eksplorasi Karya",
    hero_cv: "Unduh CV ↗",
    hero_jurnal_cta: "Buka Jurnal Ilmiah ↗",

    // Research Callout Banner on Home
    research_banner_badge: "✦ RISET AKADEMIK & PUBLIKASI ILMIAH",
    research_banner_title: "Kajian Ketahanan Siber Perbankan Nasional",
    research_banner_desc: "Studi mendalam post-mortem analisis celah ransomware perbankan (LockBit 3.0 / Conti), eksploitasi Active Directory & ESXi, trojan mobile banking, serta perancangan Zero Trust Architecture (POJK 11/2022 & NIST CSF v2.0).",
    research_banner_btn: "Baca Jurnal & Unduh Manuskrip ↗",
    research_banner_drive_btn: "Buka Halaman Riset ↗",

    // Section Works
    works_title_1: "Karya",
    works_title_2: "Pilihan",
    receipt_title: "Observatorium",
    receipt_order: "Daftar Proyek & Sistem · 2026",
    receipt_total: "Total Sistem",

    // Process
    process_badge: "02 / METODOLOGI",
    process_title: "Proses Rekayasa Backend",
    process_step1_title: "Analisis & Arsitektur",
    process_step1_desc: "Membedah kebutuhan bisnis, merancang kontrak API (REST/gRPC), pemodelan relasi database, dan spesifikasi skalabilitas sistem.",
    process_step2_title: "Schema & Data Modeling",
    process_step2_desc: "Menyusun skema PostgreSQL terindeks, strategi caching Redis, antrean worker asinkron, dan jaminan integritas data.",
    process_step3_title: "Implementasi & Security",
    process_step3_desc: "Menulis layanan backend bersih di Go, Python, atau Node.js dengan autentikasi ketat, validasi input, dan rate limiting.",

    // About
    about_badge: "03 / PROFIL",
    about_title: "Tentang Fikri Bintang",
    about_lead: "Membangun arsitektur backend berthroughput tinggi, optimasi database, dan ketahanan sistem digital skala produksi.",
    about_p1: "Saya adalah Backend Developer berbasis di Tangerang, Indonesia. Memiliki spesialisasi dalam membangun API berkinerja tinggi (Go, Python, Node.js), optimasi PostgreSQL & Redis, serta riset keamanan siber perbankan.",
    about_p2: "Berpengalaman membangun layanan backend berskala nyata mulai dari benchmark gRPC/REST 10k+ req/s, pipeline semantic search pgvector, gateway autentikasi Redis, hingga REST API korporat dan publikasi ilmiah.",

    // Dynamic Stats
    stat_ipk_label: "Indeks Prestasi Kumulatif",
    stat_projects_label: "Proyek Terverifikasi",
    stat_experience_label: "Pengalaman Kerja & Magang",

    // Contact
    contact_badge: "04 / KOLABORASI",
    contact_title_1: "Mari Membangun",
    contact_title_2: "Sesuatu yang Hebat.",
    contact_desc: "Punya ide produk baru, kebutuhan transformasi sistem digital, atau ingin berdiskusi mengenai riset keamanan siber?",
    contact_wa: "WhatsApp Langsung →",

    // Footer
    footer_thanks: "Terima kasih sudah berkunjung",
    footer_desc: "Backend Developer & Systems Engineer dari Indonesia. Membangun layanan API, arsitektur database, dan sistem backend yang cepat, aman, serta tangguh untuk skala produksi.",
    footer_networks: "Jejaring",
    footer_contact: "Kontak",
    footer_files: "Berkas",
    footer_cv: "Unduh CV (PDF) ↓",
    footer_porto: "Unduh Portofolio (PDF) ↗",
    footer_paper: "Manuskrip Jurnal Riset (Drive) ↗",
    footer_top: "Ke Atas ↑",

    // Jurnal Page
    jurnal_kicker_text: "PUBLIKASI ILMIAH & ARSIP RISET · 2026",
    jurnal_badge: "ARSIP RISET AKADEMIK & PUBLIKASI ILMIAH · 2026",
    jurnal_page_title: "JURNAL KU",
    jurnal_page_subtitle: "Kumpulan manuskrip ilmiah, hasil benchmark empiris, dan peer-reviewed papers oleh Fikri Bintang Purnomo. Tersedia lengkap dalam format berkas PDF, dokumen naskah DOCX, dan sitasi BibTeX.",
    jurnal_card_badge: "MANUSKRIP ILMIAH PEER-REVIEWED",
    jurnal_card_cat: "CYBERSECURITY & FINANCIAL TECHNOLOGY",
    jurnal_meta_author: "Penulis Utama",
    jurnal_meta_date: "Tahun Publikasi",
    jurnal_meta_framework: "Standar Regulasi",
    jurnal_tab_en: "Abstract (English)",
    jurnal_tab_id: "Abstrak (Bahasa Indonesia)",
    jurnal_btn_preview: "Buka di Google Drive ↗",
    jurnal_btn_download: "Unduh Manuskrip (.docx) ↓",
    jurnal_btn_copy_bib: "Salin Sitasi BibTeX 📋",
    jurnal_btn_bib_file: "Unduh Berkas .bib ↓",
    jurnal_bib_copied: "Sitasi Berhasil Disalin! ✓",
    jurnal_drive_stream: "Penampil Dokumen Google Drive (Live Stream)",
    jurnal_drive_fullscreen: "Buka Layar Penuh ↗",
    jurnal_references_title: "Daftar Rujukan & Bibliografi Utama",
  },
  en: {
    // Navigation
    nav_karya: "Works",
    nav_jurnal: "Paper ✦",
    nav_proses: "Process",
    nav_tentang: "About",
    nav_kontak: "Contact",
    nav_back_home: "← Portfolio Home",
    nav_research: "Academic Research",
    badge_work_current: "Current Role : Internship",

    // Hero
    hero_badge: "Portfolio — 2026",
    hero_desc: "Backend Developer building high-throughput APIs, precision database architectures, and resilient server systems that stay fast under load.",
    hero_explore: "Explore Works",
    hero_cv: "Download CV ↗",
    hero_jurnal_cta: "View Research Papers ↗",

    // Research Callout Banner on Home
    research_banner_badge: "✦ ACADEMIC RESEARCH & PUBLICATIONS",
    research_banner_title: "Commercial Banking Cyber Resilience Framework",
    research_banner_desc: "In-depth post-mortem investigation into systemic banking ransomware attack vectors (LockBit 3.0 / Conti), Active Directory & ESXi exploitation, mobile banking trojans, and Zero Trust Architecture formulation (POJK 11/2022 & NIST CSF v2.0).",
    research_banner_btn: "Read Journal & Download Manuscript ↗",
    research_banner_drive_btn: "Buka Halaman Riset ↗",

    // Section Works
    works_title_1: "Selected",
    works_title_2: "Works",
    receipt_title: "Observatory",
    receipt_order: "System & Project Registry · 2026",
    receipt_total: "Total Systems",

    // Process
    process_badge: "02 / METHODOLOGY",
    process_title: "Backend Engineering Process",
    process_step1_title: "Analysis & Architecture",
    process_step1_desc: "Deconstructing business requirements, designing REST/gRPC API contracts, relational schema modeling, and scalability specifications.",
    process_step2_title: "Schema & Data Modeling",
    process_step2_desc: "Structuring indexed PostgreSQL schemas, Redis caching strategies, async worker queues, and strict data integrity guarantees.",
    process_step3_title: "Implementation & Security",
    process_step3_desc: "Writing clean backend services in Go, Python, or Node.js with hardened authentication, input validation, and sliding-window rate limiting.",

    // About
    about_badge: "03 / PROFILE",
    about_title: "About Fikri Bintang",
    about_lead: "Engineering high-throughput backend architectures, PostgreSQL performance, and mission-critical system resilience.",
    about_p1: "I am a Backend Developer based in Tangerang, Indonesia. Specializing in high-performance APIs (Go, Python, Node.js), PostgreSQL & Redis optimization, and banking cybersecurity research.",
    about_p2: "Experienced in building production-grade backend systems ranging from 10k+ req/s gRPC vs REST benchmarks and pgvector semantic search pipelines to Redis auth gateways and enterprise APIs.",

    // Dynamic Stats
    stat_ipk_label: "Cumulative GPA",
    stat_projects_label: "Verified Systems & Projects",
    stat_experience_label: "Work Experience & Internships",

    // Contact
    contact_badge: "04 / COLLABORATION",
    contact_title_1: "Let's Build",
    contact_title_2: "Something Resilient.",
    contact_desc: "Have a new product concept, enterprise digital revamp, or interested in discussing cybersecurity research?",
    contact_wa: "Direct WhatsApp →",

    // Footer
    footer_thanks: "Thank you for visiting",
    footer_desc: "Backend Developer & Systems Engineer from Indonesia. Building fast, secure, and production-grade APIs, database architectures, and distributed services.",
    footer_networks: "Networks",
    footer_contact: "Contact",
    footer_files: "Documents",
    footer_cv: "Download CV (PDF) ↓",
    footer_porto: "Download Portfolio (PDF) ↗",
    footer_paper: "Research Paper Manuscript (Drive) ↗",
    footer_top: "Back to Top ↑",

    // Jurnal Page
    jurnal_kicker_text: "ACADEMIC PUBLICATIONS & RESEARCH ARCHIVE · 2026",
    jurnal_badge: "ACADEMIC RESEARCH REPOSITORY & PUBLICATIONS · 2026",
    jurnal_page_title: "JURNAL KU",
    jurnal_page_subtitle: "Collection of peer-reviewed manuscripts, empirical benchmarks, and scientific papers by Fikri Bintang Purnomo. Available in full PDF, DOCX manuscript, and BibTeX citation formats.",
    jurnal_card_badge: "PEER-REVIEWED ACADEMIC MANUSCRIPT",
    jurnal_card_cat: "CYBERSECURITY & FINANCIAL TECHNOLOGY",
    jurnal_meta_author: "Lead Author",
    jurnal_meta_date: "Publication Year",
    jurnal_meta_framework: "Regulatory Standard",
    jurnal_tab_en: "Abstract (English)",
    jurnal_tab_id: "Abstract (Bahasa Indonesia)",
    jurnal_btn_preview: "Open in Google Drive ↗",
    jurnal_btn_download: "Download Manuscript (.docx) ↓",
    jurnal_btn_copy_bib: "Copy BibTeX Citation 📋",
    jurnal_btn_bib_file: "Download .bib File ↓",
    jurnal_bib_copied: "Citation Copied to Clipboard! ✓",
    jurnal_drive_stream: "Google Drive Live Document Stream",
    jurnal_drive_fullscreen: "Open Fullscreen ↗",
    jurnal_references_title: "Core Peer-Reviewed Bibliography",
  }
};

let currentLang = localStorage.getItem('fb_portfolio_lang') || 'id';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('fb_portfolio_lang', lang);
  document.documentElement.lang = lang;

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update HTML content elements with data-i18n-html
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update language toggle button states
  document.querySelectorAll('.lang-opt').forEach(opt => {
    if (opt.getAttribute('data-lang') === lang) {
      opt.classList.add('is-active');
    } else {
      opt.classList.remove('is-active');
    }
  });

  // Update rounded flag switcher capsule state
  document.querySelectorAll('.lang-switch-capsule').forEach(capsule => {
    if (lang === 'en') {
      capsule.classList.add('lang-en');
    } else {
      capsule.classList.remove('lang-en');
    }
    capsule.querySelectorAll('.lang-flag-item').forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  // Bind toggle buttons & flag capsule
  document.querySelectorAll('#langToggleBtn, .lang-switcher-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetOpt = e.target.closest('.lang-opt');
      if (targetOpt) {
        setLanguage(targetOpt.getAttribute('data-lang'));
      } else {
        setLanguage(currentLang === 'id' ? 'en' : 'id');
      }
    });
  });

  document.querySelectorAll('.lang-switch-capsule').forEach(capsule => {
    capsule.addEventListener('click', (e) => {
      const flagItem = e.target.closest('.lang-flag-item');
      if (flagItem) {
        setLanguage(flagItem.getAttribute('data-lang'));
      } else {
        setLanguage(currentLang === 'id' ? 'en' : 'id');
      }
    });
  });
});
