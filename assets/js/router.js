// assets/js/router.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intercept all clicks on the page
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        
        // Only intercept internal links (same website)
        // And ignore links that open in new tab or are just anchors (#)
        if (link && 
            link.href.startsWith(window.location.origin) && 
            link.target !== '_blank' && 
            !link.getAttribute('href').startsWith('#')) {
            
            e.preventDefault(); // STOP the browser from reloading
            navigateTo(link.href);
        }
    });

    // 2. Handle Browser Back/Forward Buttons
    window.addEventListener('popstate', () => {
        loadPage(window.location.href, false);
    });

    // 3. Highlight the correct sidebar link on initial load
    updateSidebarActiveState(window.location.href);
});

// THE MAGIC FUNCTION
async function navigateTo(url) {
    history.pushState(null, null, url); // Update URL bar without reloading
    await loadPage(url);
}

async function loadPage(url) {
    const mainContent = document.querySelector('.main-content');
    
    // Optional: Add a fade-out effect here if you want
    mainContent.style.opacity = '0.5'; 

    try {
        // Fetch the new HTML file
        const response = await fetch(url);
        const html = await response.text();
        
        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Get the new content
        const newContent = doc.querySelector('.main-content').innerHTML;
        
        // Swap it in!
        mainContent.innerHTML = newContent;
        
        // Update Title
        document.title = doc.title;
        
        // Update Sidebar Active Icon
        updateSidebarActiveState(url);
        
        // Restore opacity
        mainContent.style.opacity = '1';
        
        // IMPORTANT: If you have page-specific scripts (like the Contact Form Datepicker),
        // You need to re-initialize them here.
        reinitializeScripts();

    } catch (error) {
        console.error('Error loading page:', error);
        window.location.href = url; // Fallback to normal reload if error
    }
}

function updateSidebarActiveState(currentUrl) {
    // Remove active class from all
    document.querySelectorAll('.nav-links a, .mobile-item').forEach(link => {
        link.classList.remove('active');
        
        // Add active class if this link matches current URL
        if (link.href === currentUrl || (currentUrl.endsWith('/') && link.href.includes('index.html'))) {
            link.classList.add('active');
        }
    });
}

// Function to re-run scripts that might break after swapping content
function reinitializeScripts() {
    // If you are on the contact page, restart the Datepicker
    if (document.querySelector('.datepicker') && window.flatpickr) {
        flatpickr(".datepicker", {
            dateFormat: "F j, Y",
            minDate: "today",
            disableMobile: "true"
        });
    }
    // Scroll to top
    window.scrollTo(0, 0);
}