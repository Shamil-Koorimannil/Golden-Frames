/* // 1. SANITY CLIENT (Commented Out)
import { createClient } from 'https://esm.sh/@sanity/client'
const client = createClient({
  projectId: 'wj8tking',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})
*/

// 2. DEMO DATA (Expanded to 12 Mixed-Size Images)
const mockData = [
    {
        title: "Royal Wedding",
        category: "Le Meridien",
        // Tall
        imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Elegant Decor",
        category: "Floral Setup",
        // Wide
        imageUrl: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Corporate Gala",
        category: "Annual Meet",
        // Square
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Beachside Vows",
        category: "Destination",
        // Tall
        imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Luxury Dining",
        category: "Table Setting",
        // Tall
        imageUrl: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Concert Stage",
        category: "Live Events",
        // Wide
        imageUrl: "https://images.unsplash.com/photo-1459749411177-3a269496a607?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Bride Portrait",
        category: "Photography",
        // Tall
        imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Evening Reception",
        category: "Outdoor",
        // Wide
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Floral Arch",
        category: "Decor",
        // Tall
        imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Birthday Bash",
        category: "Private Party",
        // Square
        imageUrl: "https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Cake Detail",
        category: "Catering",
        // Square
        imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Grand Entrance",
        category: "Venue",
        // Wide
        imageUrl: "https://images.unsplash.com/photo-1561489404-4348d34978bb?q=80&w=800&auto=format&fit=crop"
    }
];

// 3. RENDER FUNCTION
function loadGallery() {
    const container = document.getElementById('gallery-container');
    
    if(container) {
        container.innerHTML = '';

        mockData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gallery-item';

            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">
                <div class="overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            `;

            container.appendChild(card);
        });

        // GSAP Animation
        if (typeof gsap !== 'undefined') {
            gsap.from(".gallery-item", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    }
}

loadGallery();