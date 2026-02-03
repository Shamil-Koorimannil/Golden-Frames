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