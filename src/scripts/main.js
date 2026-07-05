document.addEventListener('DOMContentLoaded', () => {
    // Localization translations dictionary
    const translations = {
        en: {
            'nav-home': 'HOME',
            'nav-about': 'ABOUT',
            'nav-projects': 'PROJECTS',
            'nav-skills': 'SKILLS',
            'hero-badge': 'FULL STACK DEVELOPER â€¢ AI ENTHUSIAST',
            'hero-desc': 'Building scalable systems, AI-powered applications, and modern web experiences.<br>Informatics Engineering student focused on enterprise software and experimental UI.',
            'btn-projects': '[ View Projects ]',
            'btn-print': '[ Print Portfolio ]',
            'btn-contact': '[ Contact Me ]',
            'about-header': 'SEE IT IN ACTION',
            'terminal-title': 'ABOUT ME',
            'projects-header': 'PROJECTS',
            'btn-view-project': 'VIEW PROJECT â†—',
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
            'footer-cv': 'PRINT CV â†—',
            'footer-porto': 'PORTFOLIO â†—',
            'proj-1-desc': 'A comprehensive digital library and journal search engine designed for academics and researchers to discover peer-reviewed publications efficiently.',
            'proj-2-desc': 'A modern e-commerce platform for an artisanal cafe, featuring an intuitive online ordering system and interactive menu for coffee enthusiasts.',
            'proj-3-desc': 'A specialized online storefront for premium matcha products, highlighting seamless checkout and visually appealing product displays.',
            'proj-4-desc': 'A robust community management system for Bukit Tiara residents, streamlining data administration, announcements, and residential services.',
            'proj-5-desc': 'An integrated web-based platform for buying and selling cars, featuring an interactive vehicle catalog, customer offering system, delivery monitoring, and a comprehensive admin panel for transactions and report generation.',
            'proj-6-desc': 'A content management system (CMS) and creator performance dashboard built for a Semester 4 Object-Oriented Programming (PBO) project, enabling account administration, platform metrics, and reporting.',
            'term-tab-intro': 'INTRO',
            'term-tab-qa': 'Q&A CLI',
            'term-tab-activity': 'ACTIVITY',
            'activity-desc': '> Fetching GitHub contribution history...',
            'activity-title': 'CONTRIBUTIONS',
            'activity-contribs': 'Contributions in the last year',
            'activity-less': 'Less',
            'activity-more': 'More',
            'qa-welcome': 'Welcome to Fikri\'s Q&A CLI. Type your question or click a suggestion below! Type "help" for commands.',
            'qa-input-placeholder': 'Type a question or "help"...',
            'pdf-viewer-title': 'PDF VIEWER',
            'pdf-download': '[ DOWNLOAD PDF ]'
        },
        id: {
            'nav-home': 'BERANDA',
            'nav-about': 'TENTANG',
            'nav-projects': 'PROYEK',
            'nav-skills': 'KEAHLIAN',
            'hero-badge': 'PENGEMBANG FULL STACK â€¢ ANTUSIAS AI',
            'hero-desc': 'Membangun sistem yang scalable, aplikasi berbasis AI, dan pengalaman web modern.<br>Mahasiswa Teknik Informatika yang berfokus pada perangkat lunak perusahaan dan UI eksperimental.',
            'btn-projects': '[ Lihat Proyek ]',
            'btn-print': '[ Cetak Portofolio ]',
            'btn-contact': '[ Hubungi Saya ]',
            'about-header': 'LIHAT AKSI NYA',
            'terminal-title': 'TENTANG SAYA',
            'projects-header': 'PROYEK',
            'btn-view-project': 'LIHAT PROYEK â†—',
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
            'footer-cv': 'CETAK CV â†—',
            'footer-porto': 'PORTOFOLIO â†—',
            'proj-1-desc': 'Mesin pencari perpustakaan akademik dan jurnal digital komprehensif yang dirancang bagi akademisi dan peneliti untuk menemukan publikasi ilmiah secara efisien.',
            'proj-2-desc': 'Platform e-commerce modern untuk kafe artisan, menampilkan sistem pemesanan online yang intuitif dan menu interaktif bagi pecinta kopi.',
            'proj-3-desc': 'Toko online khusus untuk produk matcha premium, menyoroti alur checkout yang mulus dan tampilan produk yang menarik secara visual.',
            'proj-4-desc': 'Sistem manajemen komunitas yang kuat bagi warga Bukit Tiara, menyederhanakan administrasi data, pengumuman, dan layanan residensial.',
            'proj-5-desc': 'Platform web terintegrasi untuk pembelian dan penjualan mobil, menampilkan katalog kendaraan interaktif, sistem penawaran pelanggan, pemantauan pengiriman, dan panel admin komprehensif untuk transaksi serta pembuatan laporan.',
            'proj-6-desc': 'Sistem manajemen konten (CMS) dan dasbor kinerja kreator yang dibuat untuk proyek Pemrograman Berorientasi Objek (PBO) Semester 4, memungkinkan administrasi akun, metrik platform, dan pelaporan.',
            'term-tab-intro': 'INTRO',
            'term-tab-qa': 'TANYA JAWAB',
            'term-tab-activity': 'AKTIVITAS',
            'activity-desc': '> Mengambil riwayat kontribusi GitHub...',
            'activity-title': 'KONTRIBUSI',
            'activity-contribs': 'Kontribusi dalam setahun terakhir',
            'activity-less': 'Sedikit',
            'activity-more': 'Banyak',
            'qa-welcome': 'Selamat datang di Q&A CLI Fikri. Ketik pertanyaan Anda atau klik saran di bawah! Ketik "help" untuk perintah.',
            'qa-input-placeholder': 'Ketik pertanyaan atau "help"...',
            'pdf-viewer-title': 'PRATINJAU PDF',
            'pdf-download': '[ UNDUH PDF ]'
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
                if (key === 'activity-contribs') {
                    const yearFilter = document.getElementById('heatmap-year-filter');
                    const year = yearFilter ? yearFilter.value : '';
                    if (year) {
                        el.innerHTML = lang === 'id' ? `Kontribusi pada tahun ${year}` : `Contributions in ${year}`;
                    } else {
                        el.innerHTML = translations[lang][key];
                    }
                } else if (el.classList.contains('nav-glitch')) {
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

    // ==========================================
    // INTERACTIVE Q&A TERMINAL LOGIC
    // ==========================================
    const qaQuestions = [
        // Category: personal (10 Q&A)
        {
            id: 'who-is-fikri',
            category: 'personal',
            keywords: ['who', 'siapa', 'fikri', 'bintang', 'purnomo', 'profile', 'profil'],
            en: { q: 'Who is Fikri Bintang Purnomo?', a: 'Fikri Bintang Purnomo is an Informatics Engineering student, a developer specializing in mobile (Flutter) and web development, and an AI enthusiast based in Tangerang, Indonesia.' },
            id: { q: 'Siapa itu Fikri Bintang Purnomo?', a: 'Fikri Bintang Purnomo adalah mahasiswa Teknik Informatika, pengembang perangkat lunak yang berfokus pada pengembangan mobile (Flutter) dan web, serta peminat AI yang tinggal di Tangerang, Indonesia.' }
        },
        {
            id: 'nick-name',
            category: 'personal',
            keywords: ['name', 'nama', 'panggilan', 'nickname', 'call'],
            en: { q: 'What is your nickname?', a: 'You can call me Fikri or Bintang!' },
            id: { q: 'Apa nama panggilan Anda?', a: 'Anda bisa memanggil saya Fikri atau Bintang!' }
        },
        {
            id: 'where-live',
            category: 'personal',
            keywords: ['live', 'tinggal', 'lokasi', 'alamat', 'address', 'location', 'tangerang', 'cikupa'],
            en: { q: 'Where do you live?', a: 'I live in Cikupa, Kabupaten Tangerang, Banten, Indonesia.' },
            id: { q: 'Di mana Anda tinggal?', a: 'Saya tinggal di Cikupa, Kabupaten Tangerang, Banten, Indonesia.' }
        },
        {
            id: 'hobbies',
            category: 'personal',
            keywords: ['hobby', 'hobbies', 'hobi', 'interest', 'free', 'suka', 'game', 'coding'],
            en: { q: 'What are your hobbies?', a: 'My hobbies include programming, exploring new web technologies, UI/UX designing, reading about AI developments, and gaming.' },
            id: { q: 'Apa hobi Anda?', a: 'Hobi saya meliputi pemrograman, mengeksplorasi teknologi web baru, mendesain UI/UX, membaca perkembangan AI, dan bermain game.' }
        },
        {
            id: 'languages-spoken',
            category: 'personal',
            keywords: ['speak', 'language', 'bahasa', 'english', 'indonesia', 'komunikasi'],
            en: { q: 'What languages do you speak?', a: 'I speak Indonesian (Native) and English (Professional working proficiency).' },
            id: { q: 'Bahasa apa saja yang Anda kuasai?', a: 'Saya menguasai Bahasa Indonesia (Penutur asli) dan Bahasa Inggris (Tingkat profesional kerja).' }
        },
        {
            id: 'birth-date',
            category: 'personal',
            keywords: ['birth', 'birthday', 'lahir', 'umur', 'age', 'lahir'],
            en: { q: 'When is your birthday?', a: 'I was born on October 1, 2005. I am currently 20 years old.' },
            id: { q: 'Kapan hari lahir Anda?', a: 'Saya lahir pada 1 Oktober 2005. Saat ini saya berusia 20 tahun.' }
        },
        {
            id: 'personality',
            category: 'personal',
            keywords: ['personality', 'kepribadian', 'character', 'sifat', 'orang', 'mbti'],
            en: { q: 'How would you describe your personality?', a: 'I am a highly motivated, detail-oriented, and analytical person who loves solving logical problems and collaborating on new software challenges.' },
            id: { q: 'Bagaimana kepribadian Anda?', a: 'Saya adalah orang yang bermotivasi tinggi, berorientasi detail, analitis, menyukai pemecahan masalah logis, dan senang berkolaborasi dalam tantangan software baru.' }
        },
        {
            id: 'how-old',
            category: 'personal',
            keywords: ['age', 'umur', 'berapa', 'old', 'years'],
            en: { q: 'How old are you?', a: 'I am 20 years old.' },
            id: { q: 'Berapa umur Anda?', a: 'Saya berumur 20 tahun.' }
        },
        {
            id: 'motto',
            category: 'personal',
            keywords: ['motto', 'prinsip', 'quote', 'life', 'hidup'],
            en: { q: 'What is your life motto?', a: '"Continuous learning is the key to building impactful solutions." I believe software should solve real human problems.' },
            id: { q: 'Apa motto hidup Anda?', a: '"Belajar terus-menerus adalah kunci membangun solusi yang berdampak." Saya percaya perangkat lunak harus memecahkan masalah nyata manusia.' }
        },
        {
            id: 'interests',
            category: 'personal',
            keywords: ['interests', 'minat', 'focus', 'fokus', 'passion'],
            en: { q: 'What are your core interests?', a: 'My core interests are mobile development, scalable backend services, cloud integration, UI/UX aesthetics, and applying AI to enhance workflows.' },
            id: { q: 'Apa minat utama Anda?', a: 'Minat utama saya adalah pengembangan mobile, backend service yang scalable, integrasi cloud, estetika UI/UX, dan penerapan AI untuk meningkatkan workflow.' }
        },
        // Category: education (10 Q&A)
        {
            id: 'campus',
            category: 'education',
            keywords: ['university', 'college', 'kampus', 'kuliah', 'global', 'institute'],
            en: { q: 'Which campus do you attend?', a: 'I study at Global Institute of Technology and Business.' },
            id: { q: 'Di mana kampus tempat Anda kuliah?', a: 'Saya berkuliah di Global Institute of Technology and Business.' }
        },
        {
            id: 'major',
            category: 'education',
            keywords: ['major', 'study', 'jurusan', 'prodi', 'informatika', 'engineering'],
            en: { q: 'What major are you taking?', a: 'I am majoring in Informatics Engineering (Teknik Informatika).' },
            id: { q: 'Apa jurusan yang Anda ambil?', a: 'Saya mengambil jurusan Teknik Informatika.' }
        },
        {
            id: 'semester',
            category: 'education',
            keywords: ['semester', 'class', 'angkatan', 'tingkat'],
            en: { q: 'What is your current semester?', a: 'I am currently in my 4th Semester.' },
            id: { q: 'Semester berapa Anda saat ini?', a: 'Saat ini saya sedang menempuh Semester 4.' }
        },
        {
            id: 'gpa',
            category: 'education',
            keywords: ['gpa', 'ipk', 'grade', 'academic', 'prestasi'],
            en: { q: 'What is your GPA?', a: 'My GPA is consistently maintained above 3.5, reflecting a strong academic commitment alongside self-study.' },
            id: { q: 'Berapa IPK Anda?', a: 'IPK saya konsisten terjaga di atas 3.5, menunjukkan komitmen akademik yang kuat di samping belajar mandiri.' }
        },
        {
            id: 'education-history',
            category: 'education',
            keywords: ['school', 'sekolah', 'sd', 'smp', 'sma', 'smk', 'riwayat', 'history'],
            en: { q: 'What is your educational history?', a: 'I completed my primary education in Tangerang and am currently pursuing my Bachelor of Informatics Engineering degree at Global Institute (2024 - Present).' },
            id: { q: 'Bagaimana riwayat pendidikan Anda?', a: 'Saya menyelesaikan sekolah dasar hingga menengah di Tangerang dan saat ini sedang menempuh gelar Sarjana Teknik Informatika di Global Institute (2024 - Sekarang).' }
        },
        {
            id: 'favorite-subject',
            category: 'education',
            keywords: ['subject', 'course', 'favorit', 'matkul', 'pelajaran', 'pbo', 'database'],
            en: { q: 'What is your favorite subject in college?', a: 'My favorite subjects are Object-Oriented Programming (PBO), Database Systems, and Mobile Application Development.' },
            id: { q: 'Apa mata kuliah favorit Anda di kampus?', a: 'Mata kuliah favorit saya adalah Pemrograman Berorientasi Objek (PBO), Sistem Database, dan Pengembangan Aplikasi Mobile.' }
        },
        {
            id: 'why-informatics',
            category: 'education',
            keywords: ['why', 'alasan', 'mengapa', 'informatics', 'alasan', 'sebab'],
            en: { q: 'Why did you choose Informatics Engineering?', a: 'I love writing code to create functional tools. Computers provide infinite possibilities to design and build anything from scratch.' },
            id: { q: 'Mengapa memilih Teknik Informatika?', a: 'Saya suka menulis kode untuk membuat alat yang fungsional. Komputer memberikan kemungkinan tak terbatas untuk merancang dan membangun apa pun dari awal.' }
        },
        {
            id: 'organization',
            category: 'education',
            keywords: ['organization', 'organisasi', 'himpunan', 'ukm', 'kegiatan', 'active'],
            en: { q: 'Are you active in any organizations?', a: 'I focus heavily on technical self-studies and coding communities. I participate in team-based group projects at campus to simulate industry workloads.' },
            id: { q: 'Apakah Anda aktif berorganisasi?', a: 'Saya lebih fokus pada studi mandiri teknis dan komunitas pemrograman. Saya berpartisipasi dalam proyek kelompok di kampus untuk mensimulasikan beban kerja industri.' }
        },
        {
            id: 'study-method',
            category: 'education',
            keywords: ['study', 'belajar', 'learn', 'metode', 'cara', 'practice'],
            en: { q: 'What is your study method?', a: 'I believe in project-based learning. I learn theory briefly, then immediately build real applications to understand the practical challenges.' },
            id: { q: 'Bagaimana metode belajar Anda?', a: 'Saya percaya pada pembelajaran berbasis proyek. Saya mempelajari teori secara singkat, lalu segera membangun aplikasi nyata untuk memahami tantangan praktisnya.' }
        },
        {
            id: 'academic-goal',
            category: 'education',
            keywords: ['academic', 'goal', 'target', 'lulus', 'wisuda', 'graduate'],
            en: { q: 'What is your academic goal?', a: 'My goal is to graduate with honors and apply my engineering thesis to solve a real-world enterprise problem using mobile or web technology.' },
            id: { q: 'Apa target akademik Anda?', a: 'Target saya adalah lulus dengan predikat kehormatan (cumlaude) dan menerapkan skripsi teknik saya untuk memecahkan masalah enterprise nyata menggunakan teknologi mobile atau web.' }
        },
        // Category: skills (10 Q&A)
        {
            id: 'programming-languages',
            category: 'skills',
            keywords: ['language', 'programming', 'bahasa', 'pemrograman', 'java', 'js', 'dart'],
            en: { q: 'What programming languages do you know?', a: 'I am proficient in Dart (Flutter), Java, JavaScript (ES6+), HTML5/CSS3, and SQL (MySQL, PostgreSQL).' },
            id: { q: 'Bahasa pemrograman apa saja yang dikuasai?', a: 'Saya mahir dalam Dart (Flutter), Java, JavaScript (ES6+), HTML5/CSS3, dan SQL (MySQL, PostgreSQL).' }
        },
        {
            id: 'web-tech',
            category: 'skills',
            keywords: ['web', 'frontend', 'backend', 'teknologi', 'html', 'css', 'react', 'codeigniter'],
            en: { q: 'What web technologies do you use?', a: 'I use React.js, Node.js, CodeIgniter 3, PHP, Bootstrap, and TailwindCSS for modern web application development.' },
            id: { q: 'Teknologi web apa saja yang Anda kuasai?', a: 'Saya menggunakan React.js, Node.js, CodeIgniter 3, PHP, Bootstrap, dan TailwindCSS untuk pengembangan aplikasi web modern.' }
        },
        {
            id: 'databases',
            category: 'skills',
            keywords: ['database', 'db', 'sql', 'mysql', 'postgresql', 'supabase', 'mariadb'],
            en: { q: 'What databases do you work with?', a: 'I work with MySQL, PostgreSQL, MariaDB, and cloud integration platforms like Supabase for authentication and storage.' },
            id: { q: 'Database apa saja yang biasa Anda gunakan?', a: 'Saya terbiasa bekerja dengan MySQL, PostgreSQL, MariaDB, dan platform integrasi cloud seperti Supabase untuk autentikasi dan penyimpanan.' }
        },
        {
            id: 'mobile-dev',
            category: 'skills',
            keywords: ['mobile', 'android', 'ios', 'flutter', 'aplikasi', 'dart'],
            en: { q: 'Can you build mobile applications?', a: 'Yes! Mobile development with Flutter and Dart is one of my primary skills. I build responsive, cross-platform apps.' },
            id: { q: 'Apakah Anda bisa mobile development?', a: 'Ya! Pengembangan mobile dengan Flutter dan Dart adalah salah satu keahlian utama saya. Saya membangun aplikasi lintas platform yang responsif.' }
        },
        {
            id: 'frameworks',
            category: 'skills',
            keywords: ['framework', 'lib', 'library', 'react', 'ci', 'bootstrap', 'flutter'],
            en: { q: 'What frameworks are you familiar with?', a: 'I work with Flutter (Mobile), React.js (Web), and CodeIgniter 3 (PHP Backend).' },
            id: { q: 'Framework apa saja yang Anda kuasai?', a: 'Saya bekerja dengan Flutter (Mobile), React.js (Web), dan CodeIgniter 3 (PHP Backend).' }
        },
        {
            id: 'version-control',
            category: 'skills',
            keywords: ['git', 'github', 'version', 'repo', 'repository'],
            en: { q: 'Do you use Git/GitHub?', a: 'Yes, version control is essential. I use Git and GitHub for tracking code changes, collaboration, and repository management.' },
            id: { q: 'Apakah Anda menggunakan Git/GitHub?', a: 'Ya, kontrol versi sangat penting. Saya menggunakan Git dan GitHub untuk melacak perubahan kode, kolaborasi, dan pengelolaan repositori.' }
        },
        {
            id: 'ide-tools',
            category: 'skills',
            keywords: ['vscode', 'android studio', 'tools', 'editor', 'ide', 'figma'],
            en: { q: 'What tools and IDEs do you use?', a: 'I use Visual Studio Code, Android Studio, IntelliJ IDEA, Figma (for UI designs), and Postman (for API testing).' },
            id: { q: 'Tools dan IDE apa saja yang sering digunakan?', a: 'Saya menggunakan Visual Studio Code, Android Studio, IntelliJ IDEA, Figma (untuk desain UI), dan Postman (untuk pengujian API).' }
        },
        {
            id: 'ai-skills',
            category: 'skills',
            keywords: ['ai', 'artificial', 'intelligence', 'chatgpt', 'gemini', 'api'],
            en: { q: 'Do you have skills in AI integration?', a: 'Yes, I integrate generative AI models (like Gemini and OpenAI APIs) into web and mobile projects to build smart, automated applications.' },
            id: { q: 'Apakah Anda memiliki keahlian dalam integrasi AI?', a: 'Ya, saya mengintegrasikan model AI generatif (seperti API Gemini dan OpenAI) ke dalam proyek web dan mobile untuk membangun aplikasi yang cerdas dan otomatis.' }
        },
        {
            id: 'design-skills',
            category: 'skills',
            keywords: ['design', 'ui', 'ux', 'uiux', 'figma', 'tampilan'],
            en: { q: 'Can you design UI/UX?', a: 'Yes, I design modern and clean interfaces in Figma, keeping user experience, accessibility, and clean layouts in mind before starting to code.' },
            id: { q: 'Apakah Anda bisa mendesain UI/UX?', a: 'Ya, saya mendesain antarmuka modern dan bersih di Figma dengan mempertimbangkan pengalaman pengguna, aksesibilitas, dan tata letak sebelum mulai menulis kode.' }
        },
        {
            id: 'soft-skills',
            category: 'skills',
            keywords: ['soft', 'communication', 'problem', 'solving', 'kemampuan', 'interpersonal', 'kritis'],
            en: { q: 'What are your main soft skills?', a: 'My main soft skills are Analytical Problem Solving, Critical Thinking, Self-Discipline, Adaptability, and strong team communication.' },
            id: { q: 'Apa soft skills utama Anda?', a: 'Soft skills utama saya adalah Pemecahan Masalah Analitis, Berpikir Kritis, Kedisiplinan Mandiri, Adaptabilitas, dan komunikasi tim yang baik.' }
        },
        // Category: projects (10 Q&A)
        {
            id: 'total-projects',
            category: 'projects',
            keywords: ['how many', 'jumlah', 'proyek', 'banyak', 'total', 'projects'],
            en: { q: 'How many projects have you built?', a: 'I have built over 6+ major projects, including e-commerce sites, library portals, community systems, desktop CMS platforms, and dynamic portfolios.' },
            id: { q: 'Berapa banyak proyek yang telah Anda buat?', a: 'Saya telah membangun lebih dari 6 proyek utama, termasuk situs e-commerce, portal perpustakaan, sistem komunitas, platform CMS desktop, dan portofolio dinamis.' }
        },
        {
            id: 'jurnal-ku-project',
            category: 'projects',
            keywords: ['jurnal', 'ku', 'jurnalku', 'perpustakaan', 'library', 'academic'],
            en: { q: 'Can you tell me about the Jurnal Ku project?', a: 'Jurnal Ku is a React & Node.js academic journal search engine featuring fast full-text searching, categorized digital archives, and citations exporter.' },
            id: { q: 'Ceritakan tentang proyek Jurnal Ku.', a: 'Jurnal Ku adalah mesin pencari jurnal akademik berbasis React & Node.js yang menampilkan pencarian teks lengkap yang cepat, pengarsipan digital, dan pengekspor kutipan.' }
        },
        {
            id: 'kiise-coffee-project',
            category: 'projects',
            keywords: ['kiise', 'coffee', 'kopi', 'kafe', 'cafe', 'ecommerce'],
            en: { q: 'What is the Kiise Coffee project?', a: 'Kiise Coffee is a modern e-commerce storefront for an artisanal coffee shop, with a bold Neo-Brutalist design and dynamic shopping cart.' },
            id: { q: 'Apa itu proyek Kiise Coffee?', a: 'Kiise Coffee adalah kedai kopi e-commerce modern dengan keranjang belanja dinamis dan katalog interaktif.' }
        },
        {
            id: 'marimacha-project',
            category: 'projects',
            keywords: ['marimacha', 'macha', 'matcha', 'supabase', 'ci3'],
            en: { q: 'Can you explain the Mari Matcha project?', a: 'Mari Matcha is a premium matcha e-commerce site built on CodeIgniter 3 and Supabase, integrated with automated Xendit payment verification.' },
            id: { q: 'Bisa jelaskan tentang proyek Mari Matcha?', a: 'Mari Matcha adalah situs e-commerce matcha premium yang dibangun dengan CodeIgniter 3 dan Supabase, terintegrasi dengan verifikasi pembayaran otomatis Xendit.' }
        },
        {
            id: 'fkkmbt-project',
            category: 'projects',
            keywords: ['fkkmbt', 'bukit', 'tiara', 'warga', 'citizen', 'portal'],
            en: { q: 'What is FKKMBT?', a: 'FKKMBT is a residential portal for Bukit Tiara community built on PHP and Bootstrap, managing citizen registrations, notifications, and monthly dues.' },
            id: { q: 'Apa itu FKKMBT?', a: 'FKKMBT adalah portal perumahan warga Bukit Tiara yang dibangun dengan PHP dan Bootstrap, mengelola registrasi warga, pengumuman, dan iuran bulanan.' }
        },
        {
            id: 'mobilku-project',
            category: 'projects',
            keywords: ['mobilku', 'mobil', 'car', 'dealership', 'invoice'],
            en: { q: 'Can you describe the Mobilku project?', a: 'Mobilku is a CodeIgniter 3 automotive dealership application featuring advanced filtering, invoice generation, transaction flows, and shipment tracking.' },
            id: { q: 'Bisa deskripsikan tentang proyek Mobilku?', a: 'Mobilku adalah aplikasi dealer otomotif berbasis CodeIgniter 3 yang memiliki fitur filter canggih, pembuatan invoice, alur transaksi, dan pelacakan pengiriman.' }
        },
        {
            id: 'ourscontent-project',
            category: 'projects',
            keywords: ['ourscontent', 'java', 'swing', 'desktop', 'pbo'],
            en: { q: 'What is Ourscontent?', a: 'Ourscontent is a Java Swing desktop application for creators, managing content plans and platform metrics, styled in dark mode with FlatLaf.' },
            id: { q: 'Apa itu Ourscontent?', a: 'Ourscontent adalah aplikasi desktop Java Swing untuk kreator, mengelola rencana konten dan metrik platform, yang dirancang dalam mode gelap menggunakan FlatLaf.' }
        },
        {
            id: 'best-project',
            category: 'projects',
            keywords: ['best', 'terbaik', 'utama', 'favorite', 'proyek'],
            en: { q: 'What is your best project?', a: 'Mari Matcha is one of my best works because it integrates CodeIgniter 3 with a modern serverless backend (Supabase) and real-time payment gateway automation.' },
            id: { q: 'Apa proyek terbaik Anda?', a: 'Mari Matcha adalah salah satu karya terbaik saya karena mengintegrasikan CodeIgniter 3 dengan backend serverless modern (Supabase) dan otomatisasi payment gateway secara real-time.' }
        },
        {
            id: 'current-project',
            category: 'projects',
            keywords: ['current', 'sekarang', 'sedang', 'build', 'development'],
            en: { q: 'What are you working on right now?', a: 'I am currently designing a Flutter-based mobile dashboard for student productivity and optimizing my portfolio with interactive elements.' },
            id: { q: 'Apa proyek yang sedang dikerjakan sekarang?', a: 'Saat ini saya sedang merancang dasbor mobile berbasis Flutter untuk produktivitas mahasiswa dan mengoptimalkan portofolio saya dengan elemen-elemen interaktif.' }
        },
        {
            id: 'team-vs-solo',
            category: 'projects',
            keywords: ['team', 'solo', 'sendiri', 'tim', 'kerja', 'collaborate'],
            en: { q: 'Do you prefer working in a team or solo?', a: 'I work comfortably in both. Solo projects let me understand full-stack architecture, while team projects teach me coordination and git merge conflicts management.' },
            id: { q: 'Apakah Anda lebih suka bekerja dalam tim atau sendiri?', a: 'Saya nyaman bekerja di keduanya. Proyek solo melatih saya memahami arsitektur full-stack, sedangkan proyek tim melatih koordinasi dan manajemen git conflict.' }
        },
        // Category: career (10 Q&A)
        {
            id: 'career-goal',
            category: 'career',
            keywords: ['career', 'karir', 'goal', 'tujuan', 'future', 'kerja', 'work'],
            en: { q: 'What is your long-term career goal?', a: 'My goal is to become a Senior Software Engineer specializing in cross-platform mobile apps and cloud architectures that process enterprise-scale data.' },
            id: { q: 'Apa tujuan karir jangka panjang Anda?', a: 'Tujuan saya adalah menjadi Senior Software Engineer yang berspesialisasi dalam aplikasi mobile lintas platform dan arsitektur cloud yang memproses data skala perusahaan.' }
        },
        {
            id: 'job-interests',
            category: 'career',
            keywords: ['job', 'interest', 'minat', 'peran', 'role', 'developer', 'engineer'],
            en: { q: 'What job roles are you interested in?', a: 'I am highly interested in Mobile Developer (Flutter), Frontend Developer (React), and Full-Stack Web Developer roles.' },
            id: { q: 'Peran pekerjaan apa yang paling Anda minati?', a: 'Saya sangat tertarik dengan peran Mobile Developer (Flutter), Frontend Developer (React), dan Full-Stack Web Developer.' }
        },
        {
            id: 'internship',
            category: 'career',
            keywords: ['internship', 'magang', 'lowongan', 'intern', 'part-time', 'apply'],
            en: { q: 'Are you open to internships?', a: 'Yes! I am actively looking for internship opportunities where I can apply my skills to real engineering teams and gain corporate experience.' },
            id: { q: 'Apakah Anda bersedia menerima tawaran magang?', a: 'Ya! Saya aktif mencari peluang magang di mana saya dapat menerapkan keterampilan saya ke dalam tim pengembangan nyata dan mendapatkan pengalaman korporat.' }
        },
        {
            id: 'work-location',
            category: 'career',
            keywords: ['remote', 'onsite', 'lokasi', 'wfh', 'wfo', 'banten', 'jakarta', 'tangerang'],
            en: { q: 'Are you looking for remote or on-site work?', a: 'I am open to both. Remote work is efficient, but I am also ready to work on-site in Tangerang, Jakarta, or nearby areas.' },
            id: { q: 'Apakah Anda bersedia bekerja remote atau on-site?', a: 'Saya terbuka untuk keduanya. Bekerja secara remote sangat efisien, namun saya juga siap bekerja on-site di Tangerang, Jakarta, atau area sekitarnya.' }
        },
        {
            id: 'five-years',
            category: 'career',
            keywords: ['5 years', 'tahun', 'depan', 'future', 'position'],
            en: { q: 'Where do you see yourself in 5 years?', a: 'In 5 years, I see myself graduating successfully and leading a technical development team as a Software Architect, designing robust systems.' },
            id: { q: 'Di mana Anda melihat diri Anda dalam 5 tahun?', a: 'Dalam 5 tahun, saya melihat diri saya telah lulus kuliah dengan sukses dan memimpin tim pengembangan teknis sebagai Software Architect.' }
        },
        {
            id: 'motivation',
            category: 'career',
            keywords: ['motivation', 'motivasi', 'semangat', 'drive', 'inspirasi'],
            en: { q: 'What motivates you to code?', a: 'Seeing code turn into a functional tool that solves someone\'s problem is incredibly satisfying. Clean code is an art form.' },
            id: { q: 'Apa yang memotivasi Anda menulis kode?', a: 'Melihat baris kode berubah menjadi alat fungsional yang memecahkan masalah seseorang adalah kepuasan luar biasa. Kode yang bersih adalah sebuah karya seni.' }
        },
        {
            id: 'industry-views',
            category: 'career',
            keywords: ['future', 'pandangan', 'industry', 'ai', 'impact', 'developer'],
            en: { q: 'How do you view AI\'s impact on developers?', a: 'I see AI as a powerful copilot. It speeds up boilerplate generation, letting developers focus on architecture, logic, and solving complex business problems.' },
            id: { q: 'Bagaimana pandangan Anda tentang dampak AI bagi pengembang?', a: 'Saya melihat AI sebagai copilot yang sangat kuat. Ini mempercepat pembuatan kode standar, sehingga developer dapat fokus pada arsitektur, logika, dan pemecahan masalah bisnis.' }
        },
        {
            id: 'work-ethic',
            category: 'career',
            keywords: ['ethic', 'etos', 'prinsip', 'kerja', 'disiplin', 'diligent'],
            en: { q: 'How would you describe your work ethic?', a: 'I value discipline and clear documentation. I comment my code well, organize git branches properly, and focus on delivering readable code on time.' },
            id: { q: 'Bagaimana etos kerja Anda?', a: 'Saya menghargai disiplin dan dokumentasi yang jelas. Saya memberikan komentar kode dengan baik, mengatur branch git dengan benar, dan fokus pada pengiriman kode yang mudah dibaca tepat waktu.' }
        },
        {
            id: 'freelance',
            category: 'career',
            keywords: ['freelance', 'proyek', 'jasa', 'website', 'contract'],
            en: { q: 'Do you accept freelance projects?', a: 'Yes! I accept freelance projects for landing pages, e-commerce storefronts, and cross-platform mobile app development. Contact me via email!' },
            id: { q: 'Apakah Anda menerima proyek freelance?', a: 'Ya! Saya menerima proyek freelance untuk landing page, e-commerce, dan pengembangan aplikasi mobile lintas platform. Hubungi saya via email!' }
        },
        {
            id: 'contact',
            category: 'career',
            keywords: ['contact', 'email', 'hubungi', 'bintang01', 'business', 'hire'],
            en: { q: 'How can companies contact you?', a: 'You can email me directly at fikbintang01@gmail.com, view my projects on GitHub (github.com/FikriBintangx), or send a message to my LinkedIn.' },
            id: { q: 'Bagaimana cara perusahaan menghubungi Anda?', a: 'Anda dapat mengirim email langsung ke fikbintang01@gmail.com, melihat proyek saya di GitHub (github.com/FikriBintangx), atau mengirim pesan lewat LinkedIn.' }
        }
    ];

    const tabButtons = document.querySelectorAll('.terminal-tab');
    const introBody = document.getElementById('terminal-body-intro');
    const qaBody = document.getElementById('terminal-body-qa');
    const termInput = document.getElementById('terminal-input');
    const termHistory = document.getElementById('terminal-history');
    const termSuggestions = document.getElementById('terminal-suggestions');
    const activityBody = document.getElementById('terminal-body-activity');

    // Categories list for suggestions header
    const categories = ['personal', 'education', 'skills', 'projects', 'career'];
    let currentCategory = 'personal';

    // Tabs switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const mode = btn.dataset.mode;
            if (mode === 'intro') {
                introBody.style.display = 'block';
                qaBody.style.display = 'none';
                activityBody.style.display = 'none';
            } else if (mode === 'activity') {
                introBody.style.display = 'none';
                qaBody.style.display = 'none';
                activityBody.style.display = 'block';
            } else {
                introBody.style.display = 'none';
                qaBody.style.display = 'flex';
                activityBody.style.display = 'none';
                renderSuggestions();
                termInput.focus();
            }
        });
    });

    // Suggestion tags rendering
    function renderSuggestions() {
        termSuggestions.innerHTML = '';
        const lang = localStorage.getItem('portfolio-lang') || 'id';

        // Add Category Filters header inside suggestions block
        const filterHeader = document.createElement('div');
        filterHeader.style.width = '100%';
        filterHeader.style.display = 'flex';
        filterHeader.style.gap = '0.5rem';
        filterHeader.style.marginBottom = '0.5rem';
        filterHeader.style.flexWrap = 'wrap';
        
        categories.forEach(cat => {
            const catBtn = document.createElement('button');
            catBtn.className = 'suggestion-tag';
            if (cat === currentCategory) {
                catBtn.style.backgroundColor = 'var(--text-primary)';
                catBtn.style.color = 'var(--bg-color)';
            }
            catBtn.innerText = cat.toUpperCase();
            catBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentCategory = cat;
                renderSuggestions();
                termInput.focus();
            });
            filterHeader.appendChild(catBtn);
        });
        termSuggestions.appendChild(filterHeader);

        // Render matching Qs
        const filteredQs = qaQuestions.filter(q => q.category === currentCategory);
        filteredQs.forEach(q => {
            const tag = document.createElement('span');
            tag.className = 'suggestion-tag';
            tag.innerText = q[lang].q;
            tag.addEventListener('click', () => {
                executeQALogic(q[lang].q, q[lang].a);
            });
            termSuggestions.appendChild(tag);
        });
    }

    let qaTypewriterTimeout = null;

    function executeQALogic(questionText, answerText) {
        if (qaTypewriterTimeout) {
            clearTimeout(qaTypewriterTimeout);
        }

        // Add User Input entry
        const userLine = document.createElement('p');
        userLine.className = 'terminal-user-entry';
        userLine.innerText = `guest@fikribintang:~$ ${questionText}`;
        termHistory.appendChild(userLine);

        // Add placeholder Response box
        const responseBox = document.createElement('div');
        responseBox.className = 'terminal-response';
        termHistory.appendChild(responseBox);

        // Scroll to bottom
        termHistory.scrollTop = termHistory.scrollHeight;

        // Typewriter response content
        let charIdx = 0;
        function typeResponse() {
            if (charIdx < answerText.length) {
                responseBox.innerHTML += answerText.charAt(charIdx);
                charIdx++;
                termHistory.scrollTop = termHistory.scrollHeight;
                qaTypewriterTimeout = setTimeout(typeResponse, 15);
            }
        }
        typeResponse();
        termInput.value = '';
    }

    // CLI Input handling
    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const value = termInput.value.trim();
                if (!value) return;

                const lang = localStorage.getItem('portfolio-lang') || 'id';

                if (value.toLowerCase() === 'clear') {
                    termHistory.innerHTML = '';
                    termInput.value = '';
                    return;
                }

                if (value.toLowerCase() === 'help') {
                    const helpText = lang === 'id' 
                        ? 'Ketik kata kunci (misal: "hobi", "ipk", "magang", "kontak") atau klik tombol saran kategori di atas untuk melihat pertanyaan.'
                        : 'Type keywords (e.g., "hobbies", "gpa", "internship", "contact") or click the category tags above to see suggested questions.';
                    executeQALogic('help', helpText);
                    return;
                }

                // Keyword match search
                const queryWords = value.toLowerCase().split(/\s+/);
                let bestMatch = null;
                let maxScore = 0;

                qaQuestions.forEach(q => {
                    let score = 0;
                    queryWords.forEach(word => {
                        // Exact or partial match in keywords
                        if (q.keywords.some(kw => kw.includes(word) || word.includes(kw))) {
                            score++;
                        }
                    });
                    if (score > maxScore) {
                        maxScore = score;
                        bestMatch = q;
                    }
                });

                if (bestMatch && maxScore > 0) {
                    executeQALogic(bestMatch[lang].q, bestMatch[lang].a);
                } else {
                    const errText = lang === 'id'
                        ? `Perintah/pertanyaan tidak dikenal. Coba gunakan kata kunci lain (seperti "kampus", "ci3", "keahlian") atau ketik "help".`
                        : `Command/question not recognized. Try other keywords (like "campus", "ci3", "skills") or type "help".`;
                    executeQALogic(value, errText);
                }
            }
        });

        // Click focus terminal body
        qaBody.addEventListener('click', () => {
            termInput.focus();
        });
    }

    // ==========================================
    // PDF MODAL VIEWER LOGIC
    // ==========================================
    const pdfModal = document.getElementById('pdf-modal');
    const pdfClose = document.querySelector('.pdf-modal-close');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfDownloadBtn = document.getElementById('pdf-download-btn');

    // Attach listener to all PDF links
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfUrl = link.getAttribute('href');
            
            // Set source
            pdfIframe.src = pdfUrl;
            pdfDownloadBtn.href = pdfUrl;

            // Update modal title depending on file name
            const modalTitleEl = document.getElementById('pdf-modal-title');
            const lang = localStorage.getItem('portfolio-lang') || 'id';
            
            if (pdfUrl.toLowerCase().includes('cv')) {
                modalTitleEl.innerText = lang === 'id' ? 'PRATINJAU CV' : 'CV PREVIEW';
            } else {
                modalTitleEl.innerText = lang === 'id' ? 'PRATINJAU PORTOFOLIO' : 'PORTFOLIO PREVIEW';
            }

            // Show modal
            pdfModal.classList.add('show');
        });
    });

    if (pdfClose) {
        pdfClose.addEventListener('click', () => {
            pdfModal.classList.remove('show');
            pdfIframe.src = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            pdfModal.classList.remove('show');
            pdfIframe.src = '';
        }
    });

    // ==========================================
    // HEATMAP GENERATOR
    // ==========================================
    async function generateHeatmap(year = '') {
        const heatmapGrid = document.getElementById('heatmap-grid');
        if (!heatmapGrid) return;
        
        heatmapGrid.innerHTML = '';
        
        // Setup custom tooltip
        let tooltip = document.getElementById('heatmap-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'heatmap-tooltip';
            document.body.appendChild(tooltip);
        }
        
        try {
            // Ubah text description saat loading
            const descEl = document.querySelector('[data-translate="activity-desc"]');
            const originalText = descEl ? descEl.textContent : '';
            if (descEl) descEl.textContent = '> Mengambil riwayat kontribusi GitHub...';
            
            // Fetch real data from our new local Astro API
            // This API will handle token logic, fallback, and year filtering on the server
            const apiUrl = year ? `/api/github?year=${year}` : '/api/github';
            const response = await fetch(apiUrl);
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            
            // Hapus teks loading jika berhasil
            if (descEl) descEl.textContent = '';
            
            // Update the total contributions text
            const totalTextEl = document.getElementById('total-contributions-text');
            if (totalTextEl && data.totalContributions !== undefined) {
                totalTextEl.textContent = data.totalContributions;
            }

            // data.contributions is an array of weeks, each week is an array of days
            const weeks = data.contributions;
            
            weeks.forEach(week => {
                week.forEach(day => {
                    const square = document.createElement('div');
                    square.className = 'heatmap-square';
                    
                    // Map GitHub's contributionLevel to our 0-4 scale
                    let level = 0;
                    switch (day.contributionLevel) {
                        case 'NONE': level = 0; break;
                        case 'FIRST_QUARTILE': level = 1; break;
                        case 'SECOND_QUARTILE': level = 2; break;
                        case 'THIRD_QUARTILE': level = 3; break;
                        case 'FOURTH_QUARTILE': level = 4; break;
                        default: level = 0;
                    }
                    
                    square.dataset.level = level;
                    
                    // Format the tooltip data
                    const dateObj = new Date(day.date);
                    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const tooltipText = `${day.contributionCount === 0 ? 'No' : day.contributionCount} contributions on ${dateStr}`;
                    
                    // Remove default title
                    square.removeAttribute('title');
                    
                    // Add interactivity
                    square.addEventListener('mouseenter', (e) => {
                        tooltip.textContent = tooltipText;
                        tooltip.classList.add('show');
                        tooltip.style.left = e.clientX + 'px';
                        tooltip.style.top = e.clientY + 'px';
                    });
                    square.addEventListener('mousemove', (e) => {
                        tooltip.style.left = e.clientX + 'px';
                        tooltip.style.top = e.clientY + 'px';
                    });
                    square.addEventListener('mouseleave', () => {
                        tooltip.classList.remove('show');
                    });
                    
                    heatmapGrid.appendChild(square);
                });
            });
            
        } catch (error) {
            console.error('Failed to fetch GitHub contributions:', error);
            // Fallback to empty squares or basic error state if API fails
            for (let i = 0; i < 52 * 7; i++) {
                const square = document.createElement('div');
                square.className = 'heatmap-square';
                square.dataset.level = 0;
                square.title = 'Data unavailable';
                heatmapGrid.appendChild(square);
            }
        }
        
        // Ensure we scroll to the end (most recent activity)
        setTimeout(() => {
            const scrollContainer = document.querySelector('.heatmap-scroll');
            if (scrollContainer) {
                scrollContainer.scrollLeft = scrollContainer.scrollWidth;
            }
        }, 100);
    }
    
    // Call the generator once on load
    generateHeatmap();

    // Add event listener for year filter
    const yearFilter = document.getElementById('heatmap-year-filter');
    if (yearFilter) {
        yearFilter.addEventListener('change', (e) => {
            generateHeatmap(e.target.value);
            updateActivityText(e.target.value);
        });
    }

    function updateActivityText(year) {
        const lang = localStorage.getItem('portfolio-lang') || 'id';
        const contribTextEl = document.querySelector('[data-translate="activity-contribs"]');
        if (contribTextEl) {
            if (year) {
                contribTextEl.textContent = lang === 'id' ? `Kontribusi pada tahun ${year}` : `Contributions in ${year}`;
            } else {
                contribTextEl.textContent = lang === 'id' ? 'Kontribusi dalam setahun terakhir' : 'Contributions in the last year';
            }
        }
    }
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

    // ==========================================
    // LEAFLET MAP INTEGRATION (NO API KEY REQUIRED)
    // ==========================================
    if (document.getElementById('map-container')) {
        // Safeguard to prevent Map container is already initialized error
        if (window.mapInstance) {
            window.mapInstance.remove();
        }

        // Inisialisasi map dengan Leaflet, set ke Cikupa, Tangerang
        const map = L.map('map-container', {
            center: [-6.2361, 106.5186], // [latitude, longitude] untuk Leaflet
            zoom: 12,
            zoomControl: false, // Kita bikin custom zoom control di posisi lain biar estetik
            attributionControl: false // Menyembunyikan tulisan watermark Leaflet di pojok bawah
        });
        
        window.mapInstance = map;

        // Pakai CartoDB Dark Matter (gratis, tanpa API key, tampilan dark mode elegan)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Pindahkan zoom control ke kanan atas
        L.control.zoom({
            position: 'topright'
        }).addTo(map);

        // Custom Marker (Pakai divIcon Leaflet untuk styling pakai CSS)
        const customIcon = L.divIcon({
            className: 'custom-leaflet-marker',
            html: '<div class="pulse-dot" style="background-color: var(--text-primary); border: 2px solid var(--bg-color); width: 14px; height: 14px; margin-left: -7px; margin-top: -7px; box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);"></div>',
            iconSize: [0, 0] // Center
        });

        // Tambahkan marker ke map
        const marker = L.marker([-6.2361, 106.5186], { icon: customIcon }).addTo(map);

        // Tambahkan popup kecil
        marker.bindPopup('<h4 style="font-family: var(--font-mono); margin:0; font-size:14px; color: var(--text-primary);">FIKRI\'S BASE</h4><p style="margin:0; font-size:12px; color: var(--text-secondary);">Cikupa, Tangerang</p>', {
            offset: [0, -10],
            closeButton: false,
            className: 'custom-leaflet-popup'
        });
    }

});

