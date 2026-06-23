document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect for terminal
    const terminalText = `const developer = {
  name: "Fikri Bintang Purnomo",
  role: "Informatics Engineering Student",
  skills: ["Flutter", "Java", "HTML", "CSS", "JavaScript", "SQL"],
  location: "Cikupa, Tangerang Kabupaten",
  education: "Global Institute of Technology and Business"
};

console.log("Status: Ready to learn and build");`;

    const typewriterEl = document.getElementById('typewriter');
    let i = 0;
    const speed = 30; // ms

    function typeWriter() {
        if (i < terminalText.length) {
            typewriterEl.innerHTML += terminalText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 1000);

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
            description: `
                <p><strong>JURNAL KU</strong> is a high-performance academic library search engine designed to streamline research and literature reviews.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Intelligent full-text and metadata searching across thousands of academic entries</li>
                    <li>Categorized digital journal archiving with easy-to-use directory structure</li>
                    <li>Fast citation generation and exporting tools for various referencing formats</li>
                    <li>Clean, user-friendly interface optimized for reading and long study sessions</li>
                </ul>
            `,
            link: 'https://dejurnal.vercel.app/',
            images: ['images/project1.png']
        },
        'kiise-coffee': {
            title: 'KIISE COFFEE',
            tags: ['HTML', 'CSS', 'JavaScript'],
            description: `
                <p><strong>KIISE COFFEE</strong> is a modern e-commerce application built for artisanal coffee brands with a highly custom, bold Neo-Brutalist design language.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Responsive interactive product catalog with high-contrast UI components</li>
                    <li>Dynamic shopping cart with real-time recalculations and instant checkout flow</li>
                    <li>Interactive promotional banners and special discount manager</li>
                    <li>Custom micro-animations and physics-based transitions matching the brand's premium identity</li>
                </ul>
            `,
            link: 'https://kiisecoff.ti24se1.my.id/',
            images: ['images/project2.png']
        },
        'marimacha': {
            title: 'MARIMACHA',
            tags: ['CodeIgniter 3', 'Supabase', 'MySQL'],
            description: `
                <p><strong>MARIMACHA</strong> is a premium e-commerce storefront for matcha products, utilizing CodeIgniter 3 for backend routing and Supabase for cloud integration.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Automated payment verification system utilizing Xendit API integration</li>
                    <li>Rich administrator dashboard tracking real-time order states and inventory thresholds</li>
                    <li>Secure proof-of-payment uploads handled directly via Supabase Storage buckets</li>
                    <li>User review & rating system with interactive stars</li>
                </ul>
            `,
            link: 'https://macha-two.vercel.app',
            images: ['images/project3.png']
        },
        'fkkmbt': {
            title: 'FKKMBT',
            tags: ['PHP', 'MySQL', 'Bootstrap'],
            description: `
                <p><strong>FKKMBT</strong> is a citizen coordination and residential services portal built specifically for the Bukit Tiara community.</p>
                <p>Key features of the system include:</p>
                <ul>
                    <li>Digital citizen registration, profile management, and administrative tracking</li>
                    <li>Residential maintenance fee billing, payment submission, and financial auditing</li>
                    <li>Digital notice board for neighborhood announcements and urgent notifications</li>
                    <li>Admin dashboard for managing residential files and coordinates</li>
                </ul>
            `,
            link: 'https://fkkmbt.ti24se1.my.id/',
            images: ['images/project4.png']
        },
        'mobilku': {
            title: 'MOBILKU',
            tags: ['CodeIgniter 3', 'MySQL', 'Bootstrap'],
            description: `
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
            description: `
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
                
                modalDescription.innerHTML = data.description;
                
                modalLink.href = data.link;
                if (data.link === '#' || data.link.includes('github.com')) {
                    modalLink.innerText = '[ VIEW SOURCE ON GITHUB ]';
                } else {
                    modalLink.innerText = '[ VISIT LIVE SITE ]';
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
