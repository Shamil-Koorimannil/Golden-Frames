document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Load the Sidebar/Nav
    fetch('assets/components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            
            // 2. Highlight the Active Link (After the nav is loaded)
            highlightActiveLink();
        });

});

function highlightActiveLink() {
    // Get current page filename (e.g., "about.html")
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Select all links in the injected nav
    const links = document.querySelectorAll('.nav-links a, .mobile-item');

    links.forEach(link => {
        // If the link's href matches the current page
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INJECT THE VEIL
    const veil = document.createElement('div');
    veil.id = 'transition-veil';
    document.body.appendChild(veil);

    // 2. PLAY "ENTER" ANIMATION (Fade Out)
    if (typeof gsap !== 'undefined') {
        gsap.to(veil, {
            opacity: 0,
            duration: 0.8,      // Smooth, slow fade
            ease: "power2.out", // Natural easing
            onComplete: () => {
                veil.style.pointerEvents = "none"; // Allow clicking again
            }
        });
    } else {
        // Fallback if GSAP fails
        veil.style.opacity = 0;
        veil.style.pointerEvents = "none";
    }

    // 3. LOAD SIDEBAR
    fetch('assets/components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('nav-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
                highlightActiveLink();
                setupLinkTransitions();
            }
        });

    setupLinkTransitions();
});


/* --- HELPER FUNCTIONS --- */

function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-links a, .mobile-item');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function setupLinkTransitions() {
    // Select all internal links
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    
    links.forEach(link => {
        if (link.dataset.transitionAttached) return;
        link.dataset.transitionAttached = "true";

        link.addEventListener('click', (e) => {
            const targetUrl = link.href;
            if (link.href === window.location.href) return;

            e.preventDefault();

            // PLAY "EXIT" ANIMATION (Fade to Black)
            const veil = document.getElementById('transition-veil');
            
            if (veil && typeof gsap !== 'undefined') {
                veil.style.pointerEvents = "all"; // Block clicks immediately
                
                gsap.to(veil, {
                    opacity: 1,
                    duration: 0.4, // Faster exit feels snappier
                    ease: "power2.in",
                    onComplete: () => {
                        window.location = targetUrl;
                    }
                });
            } else {
                window.location = targetUrl;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Automatically inject the cursor HTML into every page
    if (window.innerWidth > 1024 && !document.querySelector('.cursor-dot')) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);
    }

    // 2. Setup the GSAP Tracking
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    
    // Only run if on desktop and GSAP is loaded
    if (dot && ring && typeof gsap !== 'undefined') {
        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let ringX = mouseX, ringY = mouseY;

        // Track mouse
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            gsap.set(dot, { x: mouseX, y: mouseY });
        });

        // Smooth delay for the ring
        gsap.ticker.add(() => {
            ringX += (mouseX - ringX) * 0.15; 
            ringY += (mouseY - ringY) * 0.15;
            gsap.set(ring, { x: ringX, y: ringY });
        });

        // 3. Global Hover Effect (Router-Safe)
        // We use document-level listeners so it works even after router.js swaps pages!
        document.addEventListener('mouseover', (e) => {
            // If the mouse touches ANY link, button, or specific class on the whole site
            if (e.target.closest('a, button, .faq-question, .magnetic-btn, .cta-icon-btn')) {
                ring.classList.add('hovered');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .faq-question, .magnetic-btn, .cta-icon-btn')) {
                ring.classList.remove('hovered');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. AUTOMATICALLY INJECT GLOBAL BACKGROUND
    if (!document.getElementById('global-interactive-bg')) {
        const bgDiv = document.createElement('div');
        bgDiv.id = 'global-interactive-bg';
        bgDiv.innerHTML = `
            <div class="ambient-glow"></div>
            <div class="bokeh bokeh-1"></div>
            <div class="bokeh bokeh-2"></div>
            <div class="bokeh bokeh-3"></div>
        `;
        document.body.insertBefore(bgDiv, document.body.firstChild);
    }

    // 2. AUTOMATICALLY INJECT LUXURY CURSOR
    if (window.innerWidth > 1024 && !document.querySelector('.cursor-dot')) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);
    }

    // 3. GLOBAL GSAP TRACKING (For Cursor and Background)
    if (typeof gsap !== 'undefined') {
        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');
        const glow = document.querySelector('.ambient-glow');
        const bokeh1 = document.querySelector('.bokeh-1');
        const bokeh2 = document.querySelector('.bokeh-2');
        const bokeh3 = document.querySelector('.bokeh-3');

        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let ringX = mouseX, ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            
            if (dot) gsap.set(dot, { x: mouseX, y: mouseY });

            // Ambient Parallax Background Logic (Desktop only)
            if (window.innerWidth > 1024 && glow) {
                gsap.to(glow, {
                    x: mouseX - window.innerWidth / 2,
                    y: mouseY - window.innerHeight / 2,
                    duration: 1.5, ease: "power2.out"
                });

                const xNorm = (mouseX / window.innerWidth - 0.5);
                const yNorm = (mouseY / window.innerHeight - 0.5);
                
                if(bokeh1) gsap.to(bokeh1, { x: xNorm * -60, y: yNorm * -60, duration: 2 });
                if(bokeh2) gsap.to(bokeh2, { x: xNorm * 80, y: yNorm * 80, duration: 2 });
                if(bokeh3) gsap.to(bokeh3, { x: xNorm * -40, y: yNorm * 40, duration: 2 });
            }
        });

        if (ring) {
            gsap.ticker.add(() => {
                ringX += (mouseX - ringX) * 0.15; 
                ringY += (mouseY - ringY) * 0.15;
                gsap.set(ring, { x: ringX, y: ringY });
            });


                document.addEventListener('mouseover', (e) => {
                    if (e.target.closest('a, button, .faq-question, .magnetic-btn, .cta-icon-btn, .mobile-item')) {
                        ring.classList.add('hovered');
                    }



            // Universal hover effect
            document.addEventListener('mouseover', (e) => {
                if (e.target.closest('a, button, .faq-question, .magnetic-btn, .cta-icon-btn, .mobile-item')) {
                    ring.classList.add('hovered');
                }
            });
            document.addEventListener('mouseout', (e) => {
                if (e.target.closest('a, button, .faq-question, .magnetic-btn, .cta-icon-btn, .mobile-item')) {
                    ring.classList.remove('hovered');
                }
            });
        }
    }
});