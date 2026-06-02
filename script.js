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
