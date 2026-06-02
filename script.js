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
   DRAGGABLE ASSET
========================= */

const draggable = document.getElementById('draggable-statue');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

if (draggable) {
    draggable.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);

    // Touch support for mobile
    draggable.addEventListener('touchstart', dragStart, {passive: false});
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('touchmove', drag, {passive: false});
}

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === draggable) {
        isDragging = true;
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

        draggable.style.transform = `translate(${currentX}px, ${currentY}px) translateY(-50%)`;
    }
}
