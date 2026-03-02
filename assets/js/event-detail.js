import { mockData } from './gallery.js';

document.addEventListener('DOMContentLoaded', initEventDetail);
window.addEventListener('popstate', initEventDetail);
window.initEventDetail = initEventDetail; 

function initEventDetail() {
    const container = document.getElementById('carousel-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    const eventData = mockData.find(item => item.id === eventId);

    if (!eventData) {
        document.getElementById('event-title').innerText = "Event Not Found";
        return;
    }

    document.getElementById('event-title').innerText = eventData.title;
    document.getElementById('event-category').innerText = eventData.category;
    container.innerHTML = '';
    
    // 1. Build the Carousel with Anchors
    eventData.galleryImages.forEach((imgUrl, index) => {
        // The Anchor never transforms, ensuring perfect math
        const anchor = document.createElement('div');
        anchor.className = 'slide-anchor';

        const wrapper = document.createElement('div');
        wrapper.className = 'slide-wrapper';

        const img = document.createElement('img');
        img.src = imgUrl;
        img.className = 'carousel-slide';
        img.alt = `${eventData.title} image ${index + 1}`;
        
        // Click Logic
        img.addEventListener('click', function() {
            const containerCenter = container.scrollLeft + (container.clientWidth / 2);
            const anchorCenter = anchor.offsetLeft + (anchor.offsetWidth / 2);
            const distance = Math.abs(containerCenter - anchorCenter);
            
            if (distance < 50) {
                openModal(this.src); // Expand if centered
            } else {
                // Smooth scroll anchor to center
                anchor.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        });

        img.onerror = () => anchor.style.display = 'none';

        wrapper.appendChild(img);
        anchor.appendChild(wrapper);
        container.appendChild(anchor);
    });

    // 2. MODAL LOGIC
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    function openModal(src) {
        modalImg.src = src;
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => modalImg.src = '', 300);
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // 3. BULLETPROOF 3D MATH
    const anchors = document.querySelectorAll('.slide-anchor');
    let isScrolling = false;

    function updateCoverflow() {
        const containerCenter = container.scrollLeft + (container.clientWidth / 2);
        
        let closestImg = null;
        let minDistance = Infinity;

        anchors.forEach(anchor => {
            const wrapper = anchor.querySelector('.slide-wrapper');
            const img = anchor.querySelector('img');
            
            // Raw physical math based on the anchor
            const anchorCenter = anchor.offsetLeft + (anchor.offsetWidth / 2);
            const distance = containerCenter - anchorCenter;
            const absDistance = Math.abs(distance);
            
            if (absDistance < minDistance) {
                minDistance = absDistance;
                closestImg = img;
            }

            // Normalization
            const normalize = Math.max(-1, Math.min(1, distance / (anchor.offsetWidth * 1.5)));
            
            const rotateY = normalize * 45; 
            const scale = 1 - Math.abs(normalize) * 0.2;
            const translateZ = -Math.abs(normalize) * 200;

            wrapper.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
            wrapper.style.zIndex = Math.round(100 - absDistance);
            
            img.classList.remove('center-glow');
        });

        if (closestImg) {
            closestImg.classList.add('center-glow');
        }
        
        isScrolling = false;
    }

    container.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(updateCoverflow);
            isScrolling = true;
        }
    });
    
    setTimeout(updateCoverflow, 50);

    // 4. BUTTON LOGIC (Fixed to avoid bouncing)
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn && nextBtn && container && anchors.length > 0) {
        // Scroll exactly one anchor width + margin
        const scrollAmount = anchors[0].offsetWidth + 30; 

        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // GSAP Intro
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(".slide-anchor", 
            { x: window.innerWidth, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", onUpdate: updateCoverflow }
        );
    }
}