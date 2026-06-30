document.addEventListener('DOMContentLoaded', () => {
    // Localization translations dictionary
    const translations = {
        en: {
            'nav-home': 'HOME',
            'nav-about': 'ABOUT',
            'nav-projects': 'PROJECTS',
            'nav-skills': 'SKILLS',
            'hero-badge': 'FULL STACK DEVELOPER • AI ENTHUSIAST',
            'hero-desc': 'Building scalable systems, AI-powered applications, and modern web experiences.<br>Informatics Engineering student focused on enterprise software and experimental UI.',
            'btn-projects': '[ View Projects ]',
            'btn-print': '[ Print Portfolio ]',
            'btn-contact': '[ Contact Me ]',
            'about-header': 'SEE IT IN ACTION',
            'terminal-title': 'ABOUT ME',
            'projects-header': 'PROJECTS',
            'btn-view-project': 'VIEW PROJECT ↗',
            'skills-header': 'SKILLS & EXPERIENCE',
            'skill-prog-title': 'PROGRAMMING & DEV',
            'skill-prog-desc': 'Flutter, Java, HTML, CSS, JavaScript, REST API Integration',
            'skill-db-title': 'DATABASES & TOOLS',
            'skill-db-desc': 'MySQL, MariaDB, PostgreSQL, Git & GitHub, Figma',
            'skill-soft-title': 'SOFT SKILLS',
            'skill-soft-desc': 'Problem Solving, Crisis Management, Creative Thinking, Data Analysis, Strategic Planning',
            'skill-job1-desc': 'Delivery Administration Staff (2022 - 2024). Managed shipment data, tracking information, and monitored delivery operations.',
            'skill-job2-desc': 'Machine Operator (2024 - 2025). Operated manufacturing machines, ensured product quality, and maintained workplace safety.',
            'skill-job3-desc': 'Customer Service & Operations (2025 - 2026). Assisted in food preparation, customer service, and maintained cleanliness.',
            'footer-cv': 'PRINT CV ↗',
            'footer-porto': 'PORTFOLIO ↗',
            'proj-1-desc': 'A comprehensive digital library and journal search engine designed for academics and researchers to discover peer-reviewed publications efficiently.',
            'proj-2-desc': 'A modern e-commerce platform for an artisanal cafe, featuring an intuitive online ordering system and interactive menu for coffee enthusiasts.',
            'proj-3-desc': 'A specialized online storefront for premium matcha products, highlighting seamless checkout and visually appealing product displays.',
            'proj-4-desc': 'A robust community management system for Bukit Tiara residents, streamlining data administration, announcements, and residential services.',
            'proj-5-desc': 'An integrated web-based platform for buying and selling cars, featuring an interactive vehicle catalog, customer offering system, delivery monitoring, and a comprehensive admin panel for transactions and report generation.',
            'proj-6-desc': 'A content management system (CMS) and creator performance dashboard built for a Semester 4 Object-Oriented Programming (PBO) project, enabling account administration, platform metrics, and reporting.'
        },
        id: {
            'nav-home': 'BERANDA',
            'nav-about': 'TENTANG',
            'nav-projects': 'PROYEK',
            'nav-skills': 'KEAHLIAN',
            'hero-badge': 'PENGEMBANG FULL STACK • ANTUSIAS AI',
            'hero-desc': 'Membangun sistem yang scalable, aplikasi berbasis AI, dan pengalaman web modern.<br>Mahasiswa Teknik Informatika yang berfokus pada perangkat lunak perusahaan dan UI eksperimental.',
            'btn-projects': '[ Lihat Proyek ]',
            'btn-print': '[ Cetak Portofolio ]',
            'btn-contact': '[ Hubungi Saya ]',
            'about-header': 'LIHAT AKSI NYA',
            'terminal-title': 'TENTANG SAYA',
            'projects-header': 'PROYEK',
            'btn-view-project': 'LIHAT PROYEK ↗',
            'skills-header': 'KEAHLIAN & PENGALAMAN',
            'skill-prog-title': 'PEMROGRAMAN & PENGEMBANGAN',
            'skill-prog-desc': 'Flutter, Java, HTML, CSS, JavaScript, Integrasi REST API',
            'skill-db-title': 'DATABASE & TOOLS',
            'skill-db-desc': 'MySQL, MariaDB, PostgreSQL, Git & GitHub, Figma',
            'skill-soft-title': 'KEMAMPUAN INTERPERSONAL',
            'skill-soft-desc': 'Pemecahan Masalah, Manajemen Krisis, Berpikir Kreatif, Analisis Data, Perencanaan Strategis',
            'skill-job1-desc': 'Staf Administrasi Pengiriman (2022 - 2024). Mengelola data pengiriman, informasi pelacakan, dan memantau operasional pengiriman.',
            'skill-job2-desc': 'Operator Mesin (2024 - 2025). Mengoperasikan mesin manufaktur, memastikan kualitas produk, dan menjaga keselamatan kerja.',
            'skill-job3-desc': 'Layanan Pelanggan & Operasional (2025 - 2026). Membantu persiapan makanan, layanan pelanggan, dan menjaga kebersihan.',
            'footer-cv': 'CETAK CV ↗',
            'footer-porto': 'PORTOFOLIO ↗',
            'proj-1-desc': 'Mesin pencari perpustakaan akademik dan jurnal digital komprehensif yang dirancang bagi akademisi dan peneliti untuk menemukan publikasi ilmiah secara efisien.',
            'proj-2-desc': 'Platform e-commerce modern untuk kafe artisan, menampilkan sistem pemesanan online yang intuitif dan menu interaktif bagi pecinta kopi.',
            'proj-3-desc': 'Toko online khusus untuk produk matcha premium, menyoroti alur checkout yang mulus dan tampilan produk yang menarik secara visual.',
            'proj-4-desc': 'Sistem manajemen komunitas yang kuat bagi warga Bukit Tiara, menyederhanakan administrasi data, pengumuman, dan layanan residensial.',
            'proj-5-desc': 'Platform web terintegrasi untuk pembelian dan penjualan mobil, menampilkan katalog kendaraan interaktif, sistem penawaran pelanggan, pemantauan pengiriman, dan panel admin komprehensif untuk transaksi serta pembuatan laporan.',
            'proj-6-desc': 'Sistem manajemen konten (CMS) dan dasbor kinerja kreator yang dibuat untuk proyek Pemrograman Berorientasi Objek (PBO) Semester 4, memungkinkan administrasi akun, metrik platform, dan pelaporan.'
        }
    };

    // Terminal Texts
    const terminalTextEn = `const developer = {
  name: "Fikri Bintang Purnomo",
  role: "Informatics Engineering Student",
  skills: ["Flutter", "Java", "HTML", "CSS", "JavaScript", "SQL"],
  location: "Cikupa, Tangerang Kabupaten",
  education: "Global Institute of Technology and Business"
};

console.log("Status: Ready to learn and build");`;

    const terminalTextId = `const pengembang = {
  nama: "Fikri Bintang Purnomo",
  peran: "Mahasiswa Teknik Informatika",
  keahlian: ["Flutter", "Java", "HTML", "CSS", "JavaScript", "SQL"],
  lokasi: "Cikupa, Kabupaten Tangerang",
  pendidikan: "Global Institute of Technology and Business"
};

console.log("Status: Siap belajar dan membangun");`;

    const typewriterEl = document.getElementById('typewriter');
    let typewriterTimeout = null;

    function startTypewriter(lang) {
        if (typewriterTimeout) {
            clearTimeout(typewriterTimeout);
        }
        typewriterEl.innerHTML = '';
        const text = lang === 'id' ? terminalTextId : terminalTextEn;
        let charIndex = 0;
        const speed = 30; // ms

        function type() {
            if (charIndex < text.length) {
                typewriterEl.innerHTML += text.charAt(charIndex);
                charIndex++;
                typewriterTimeout = setTimeout(type, speed);
            }
        }
        type();
    }

    // Language Toggle logic
    function updateLanguage(lang) {
        localStorage.setItem('portfolio-lang', lang);
        
        // Update language buttons active class
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update all elements with data-translate
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            if (translations[lang] && translations[lang][key] !== undefined) {
                if (el.classList.contains('nav-glitch')) {
                    el.dataset.text = translations[lang][key];
                    el.innerHTML = `${translations[lang][key]} <span class="blink cursor"></span>`;
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
        
        // Update terminal text
        startTypewriter(lang);
    }

    // Initialize Language (Default to Indonesian as requested by user "pastiin aktif bahasa indonesia")
    const initialLang = localStorage.getItem('portfolio-lang') || 'id';
    
    // Add Event Listeners for Language Switcher Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.dataset.lang);
        });
    });

    // Run initial localization
    updateLanguage(initialLang);

    // Copy to clipboard functionality
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const codeBlock = e.target.parentElement.nextElementSibling.querySelector('code');
            navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                const originalText = e.target.innerText;
                e.target.innerText = 'COPIED!';
                setTimeout(() => {
                    e.target.innerText = originalText;
                }, 2000);
            });
        });
    });

    // Active menu and smooth scroll (ScrollSpy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Add smooth scrolling to all links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if(targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Setup IntersectionObserver for active state
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if(activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => observer.observe(section));

    // Mouse tracking for glitch effect
    const glitchWrappers = document.querySelectorAll('.glitch-wrapper');
    glitchWrappers.forEach(wrapper => {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            // Calculate mouse position relative to center of the wrapper (-1 to 1)
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; 
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            
            // Set custom properties for CSS
            wrapper.style.setProperty('--mx', x);
            wrapper.style.setProperty('--my', y);
        });

        // Reset when mouse leaves
        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.setProperty('--mx', 1);
            wrapper.style.setProperty('--my', 0);
        });
    });

    // Text Scramble Effect for Nav Links
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ*:@!#%^&";
    const glitchLinks = document.querySelectorAll('.nav-glitch');

    glitchLinks.forEach(link => {
        link.addEventListener('mouseenter', e => {
            let iterations = 0;
            const originalText = link.dataset.text;
            
            clearInterval(link.glitchInterval);

            link.glitchInterval = setInterval(() => {
                const scrambled = originalText.split("").map((letter, index) => {
                    if(index < iterations) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                }).join("");

                link.innerHTML = `${scrambled} <span class="blink cursor"></span>`;

                if(iterations >= originalText.length) {
                    clearInterval(link.glitchInterval);
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    });

    // Project slider controls and wheel horizontal scroll
    const sliderContainer = document.querySelector('.projects-slider-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (sliderContainer) {
        // Handle wheel scrolling: convert vertical wheel scroll to horizontal
        sliderContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                sliderContainer.scrollBy({
                    left: e.deltaY * 1.5,
                    behavior: 'auto'
                });
            }
        }, { passive: false });

        // Handle Prev/Next buttons
        if (prevBtn && nextBtn) {
            const scrollAmount = 420; // 380px (card) + 40px (gap)
            prevBtn.addEventListener('click', () => {
                sliderContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', () => {
                sliderContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ==========================================
    // PROJECT DETAIL MODAL LOGIC
    // ==========================================
    const projectData = {
        'jurnal-ku': {
            title: 'JURNAL KU',
            tags: ['React', 'Node.js', 'Vercel'],
            descriptionEn: `
                <p><strong>JURNAL KU</strong> is a high-performance academic library search engine designed to streamline research and literature reviews.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Intelligent full-text and metadata searching across thousands of academic entries</li>
                    <li>Categorized digital journal archiving with easy-to-use directory structure</li>
                    <li>Fast citation generation and exporting tools for various referencing formats</li>
                    <li>Clean, user-friendly interface optimized for reading and long study sessions</li>
                </ul>
            `,
            descriptionId: `
                <p><strong>JURNAL KU</strong> adalah mesin pencari perpustakaan akademik berkinerja tinggi yang dirancang untuk menyederhanakan penelitian dan tinjauan literatur ilmiah.</p>
                <p>Fitur utama dari sistem ini meliputi:</p>
                <ul>
                    <li>Pencarian teks lengkap dan metadata yang cerdas di ribuan entri akademik</li>
                    <li>Pengarsipan jurnal digital yang dikategorikan dengan struktur direktori yang mudah digunakan</li>
                    <li>Pembuatan kutipan cepat dan alat pengekspor untuk berbagai format referensi</li>
                    <li>Antarmuka bersih dan ramah pengguna yang dioptimalkan untuk kenyamanan membaca</li>
                </ul>
            `,
            link: 'https://dejurnal.vercel.app/',
            images: ['images/project1.png']
        },
        'kiise-coffee': {
            title: 'KIISE COFFEE',
            tags: ['HTML', 'CSS', 'JavaScript'],
            descriptionEn: `
                <p><strong>KIISE COFFEE</strong> is a modern e-commerce application built for artisanal coffee brands with a highly custom, bold Neo-Brutalist design language.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Responsive interactive product catalog with high-contrast UI components</li>
                    <li>Dynamic shopping cart with real-time recalculations and instant checkout flow</li>
                    <li>Interactive promotional banners and special discount manager</li>
                    <li>Custom micro-animations and physics-based transitions matching the brand's premium identity</li>
                </ul>
            `,
            descriptionId: `
                <p><strong>KIISE COFFEE</strong> adalah aplikasi e-commerce modern yang dirancang untuk merek kopi artisan dengan bahasa desain Neo-Brutalist yang kustom dan berani.</p>
                <p>Fitur utama dari sistem ini meliputi:</p>
                <ul>
                    <li>Katalog produk interaktif yang responsif dengan komponen UI kontras tinggi</li>
                    <li>Keranjang belanja dinamis dengan kalkulasi ulang real-time dan alur pembayaran instan</li>
                    <li>Banner promosi interaktif dan pengelola diskon khusus</li>
                    <li>Mikro-animasi kustom dan transisi berbasis fisika yang mencerminkan identitas premium merek</li>
                </ul>
            `,
            link: 'https://kiisecoff.ti24se1.my.id/',
            images: ['images/project2.png']
        },
        'marimacha': {
            title: 'MARIMACHA',
            tags: ['CodeIgniter 3', 'Supabase', 'MySQL'],
            descriptionEn: `
                <p><strong>MARIMACHA</strong> is a premium e-commerce storefront for matcha products, utilizing CodeIgniter 3 for backend routing and Supabase for cloud integration.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Automated payment verification system utilizing Xendit API integration</li>
                    <li>Rich administrator dashboard tracking real-time order states and inventory thresholds</li>
                    <li>Secure proof-of-payment uploads handled directly via Supabase Storage buckets</li>
                    <li>User review & rating system with interactive stars</li>
                </ul>
            `,
            descriptionId: `
                <p><strong>MARIMACHA</strong> adalah toko online premium untuk produk matcha, memanfaatkan CodeIgniter 3 untuk perutean backend dan Supabase untuk integrasi cloud.</p>
                <p>Fitur utama dari sistem ini meliputi:</p>
                <ul>
                    <li>Sistem verifikasi pembayaran otomatis yang memanfaatkan integrasi API Xendit</li>
                    <li>Dasbor administrator yang kaya untuk memantau status pesanan real-time dan ambang batas inventaris</li>
                    <li>Unggah bukti pembayaran yang aman yang ditangani langsung melalui bucket Supabase Storage</li>
                    <li>Sistem ulasan & penilaian pengguna dengan bintang interaktif</li>
                </ul>
            `,
            link: 'https://marimatcha.vercel.app/',
            images: ['images/project3.png']
        },
        'fkkmbt': {
            title: 'FKKMBT',
            tags: ['PHP', 'MySQL', 'Bootstrap'],
            descriptionEn: `
                <p><strong>FKKMBT</strong> is a citizen coordination and residential services portal built specifically for the Bukit Tiara community.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Digital citizen registration, profile management, and administrative tracking</li>
                    <li>Residential maintenance fee billing, payment submission, and financial auditing</li>
                    <li>Digital notice board for neighborhood announcements and urgent notifications</li>
                    <li>Admin dashboard for managing residential files and coordinates</li>
                </ul>
            `,
            descriptionId: `
                <p><strong>FKKMBT</strong> adalah portal koordinasi warga dan layanan perumahan yang dibangun khusus untuk komunitas Bukit Tiara.</p>
                <p>Fitur utama dari sistem ini meliputi:</p>
                <ul>
                    <li>Pendaftaran warga digital, manajemen profil, dan pelacakan administratif</li>
                    <li>Penagihan iuran pemeliharaan lingkungan, pengiriman pembayaran, dan audit keuangan</li>
                    <li>Papan pengumuman digital untuk informasi lingkungan dan pemberitahuan penting</li>
                    <li>Dasbor admin untuk mengelola berkas dan koordinat perumahan warga</li>
                </ul>
            `,
            link: 'https://fkkmbt.ti24se1.my.id/',
            images: ['images/project4.png']
        },
        'mobilku': {
            title: 'MOBILKU',
            tags: ['CodeIgniter 3', 'MySQL', 'Bootstrap'],
            descriptionEn: `
                <p><strong>MOBILKU</strong> is an end-to-end web application facilitating automotive buying, selling, and status tracking.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Advanced car catalog filter matching make, model, price, and booking availability</li>
                    <li>Customer valuation request form for trading in existing vehicles</li>
                    <li>Official print-ready invoice and payment receipt generation</li>
                    <li>Multi-step transaction flow tracking: Booking Fee, Down Payment, and Final Payment</li>
                    <li>Real-time shipment tracking with courier assignments and status logs</li>
                </ul>
            `,
            descriptionId: `
                <p><strong>MOBILKU</strong> adalah aplikasi web end-to-end yang memfasilitasi transaksi jual beli mobil serta pelacakan status pesanan.</p>
                <p>Fitur utama dari sistem ini meliputi:</p>
                <ul>
                    <li>Filter katalog mobil canggih yang mencocokkan merek, model, harga, dan ketersediaan pemesanan</li>
                    <li>Formulir permintaan penilaian pelanggan untuk tukar tambah kendaraan</li>
                    <li>Pembuatan faktur dan tanda terima pembayaran resmi siap cetak</li>
                    <li>Pelacakan alur transaksi multi-tahap: Biaya Pemesanan, Uang Muka, dan Pembayaran Akhir</li>
                    <li>Pelacakan pengiriman real-time dengan penugasan kurir dan catatan status</li>
                </ul>
            `,
            link: 'https://github.com/FikriBintangx',
            images: [
                'images/project_mobilku.png',
                'images/screenshots/mobilku_1.png',
                'images/screenshots/mobilku_2.png',
                'images/screenshots/mobilku_3.png',
                'images/screenshots/mobilku_4.png'
            ]
        },
        'ourscontent': {
            title: 'OURSCONTENT',
            tags: ['Java Swing', 'FlatLaf', 'PostgreSQL'],
            descriptionEn: `
                <p><strong>OURSCONTENT</strong> is a desktop creator portal and content management application built with Java Swing and PostgreSQL.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Modern FlatLaf dark-mode styling with a premium user experience</li>
                    <li>Centralized content tracker for multi-platform planning (YouTube, TikTok, etc.)</li>
                    <li>Performance metrics logger showing user analytics over time</li>
                    <li>Custom PDF reports generation utilizing JasperReports integration</li>
                    <li>Secure role-based authentication and user account management</li>
                </ul>
            `,
            descriptionId: `
                <p><strong>OURSCONTENT</strong> adalah aplikasi portal pembuat konten desktop dan manajemen konten yang dibangun dengan Java Swing dan PostgreSQL.</p>
                <p>Fitur utama dari sistem ini meliputi:</p>
                <ul>
                    <li>Gaya mode gelap FlatLaf modern dengan pengalaman pengguna yang premium</li>
                    <li>Pelacak konten terpusat untuk perencanaan multi-platform (YouTube, TikTok, dll.)</li>
                    <li>Pencatat metrik kinerja yang menampilkan analitik pengguna dari waktu ke waktu</li>
                    <li>Pembuatan laporan PDF khusus menggunakan integrasi JasperReports</li>
                    <li>Autentikasi aman berbasis peran dan manajemen akun pengguna</li>
                </ul>
            `,
            link: 'https://github.com/FikriBintangx',
            images: [
                'images/project_ourscontent.png',
                'images/screenshots/ourscontent_1.png',
                'images/screenshots/ourscontent_2.png',
                'images/screenshots/ourscontent_3.png',
                'images/screenshots/ourscontent_4.png'
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDescription = document.getElementById('modal-description');
    const modalGallery = document.getElementById('modal-gallery');
    const modalLink = document.getElementById('modal-link');

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-btn')) {
                e.preventDefault();
            }
            
            const projectId = card.dataset.project;
            const data = projectData[projectId];
            if (data) {
                modalTitle.innerText = data.title;
                
                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const tagEl = document.createElement('span');
                    tagEl.className = 'project-tag';
                    tagEl.innerText = tag;
                    modalTags.appendChild(tagEl);
                });
                
                const lang = localStorage.getItem('portfolio-lang') || 'id';
                modalDescription.innerHTML = lang === 'id' ? data.descriptionId : data.descriptionEn;
                
                modalLink.href = data.link;
                if (data.link === '#' || data.link.includes('github.com')) {
                    modalLink.innerText = lang === 'id' ? '[ LIHAT SOURCE CODE DI GITHUB ]' : '[ VIEW SOURCE ON GITHUB ]';
                } else {
                    modalLink.innerText = lang === 'id' ? '[ KUNJUNGI WEBSITE ]' : '[ VISIT LIVE SITE ]';
                }

                modalGallery.innerHTML = '';
                data.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${data.title} Screenshot`;
                    modalGallery.appendChild(img);
                });

                modal.classList.add('show');
                scramble(modalTitle);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    '.reveal,.reveal-left,.reveal-right'
);

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }

    });
},{
    threshold:0.15
});

revealElements.forEach(el=>{
    revealObserver.observe(el);
});


/* =========================
   PROJECT STAGGER
========================= */

const cards = document.querySelectorAll('.project-card');

const cardObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            cards.forEach((card,index)=>{

                setTimeout(()=>{

                    card.classList.add('show');

                }, index * 180);

            });

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>{
    cardObserver.observe(card);
});


/* =========================
   SCRAMBLE TEXT ON SCROLL
========================= */

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function scramble(element){

    const finalText = element.innerText;

    let iteration = 0;

    const interval = setInterval(()=>{

        element.innerText = finalText
        .split("")
        .map((letter,index)=>{

            if(index < iteration){
                return finalText[index];
            }

            return chars[
                Math.floor(
                    Math.random()*chars.length
                )
            ];

        })
        .join("");

        if(iteration >= finalText.length){
            clearInterval(interval);
        }

        iteration += 0.4;

    },30);

}

const scrambleTargets =
document.querySelectorAll('.scramble');

const scrambleObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            scramble(entry.target);

            scrambleObserver.unobserve(
                entry.target
            );

        }

    });

},{
    threshold:0.5
});

scrambleTargets.forEach(el=>{
    scrambleObserver.observe(el);
});


/* =========================
   PARALLAX BACKGROUND
========================= */

window.addEventListener('scroll',()=>{

    const bg = document.querySelector('.bg-image');
    const y = window.scrollY;

    // Use backgroundPosition to allow infinite repeating without gaps
    bg.style.backgroundPositionY = `${y * 0.15}px`;

});

/* =========================
   DRAGGABLE ASSETS
========================= */

const draggables = document.querySelectorAll('.draggable-wrapper');

draggables.forEach(draggable => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    draggable.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);

    // Touch support for mobile
    draggable.addEventListener('touchstart', dragStart, {passive: false});
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('touchmove', drag, {passive: false});

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        // Only start dragging if we target the wrapper or its children
        if (draggable.contains(e.target)) {
            isDragging = true;
            // Bring to front
            draggables.forEach(d => d.style.zIndex = 100);
            draggable.style.zIndex = 101;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
        
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            draggable.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }
});
