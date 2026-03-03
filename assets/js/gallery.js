// assets/js/gallery.js

export const mockData = [
    {
        id: "royal-wedding-01",
        title: "Royal Wedding",
        category: "Le Meridien",
        heroImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
        // 25 Guaranteed Working Images for the Coverflow
        galleryImages: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800",
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800",
            "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=800",
            "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800",
            "https://images.unsplash.com/photo-1561489404-4348d34978bb?q=80&w=800",
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800",
            "https://images.unsplash.com/photo-1459749411177-3a269496a607?q=80&w=800",
            "https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=800",
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
            "https://images.unsplash.com/photo-1465495971151-46ce10bfed97?q=80&w=800",
            "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?q=80&w=800",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61629?q=80&w=800",
            "https://images.unsplash.com/photo-1482574362156-78cc12d1b824?q=80&w=800",
            "https://images.unsplash.com/photo-1475713228803-bfbc1460d3d4?q=80&w=800",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800",
            "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800",
            "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
            "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=800",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800",
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
            "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800"
        ]
    }
    // ... rest of your mock events
];

export function loadGallery() {
    const container = document.getElementById('gallery-container');
    if(container) {
        container.innerHTML = '';
        mockData.forEach(item => {
            const cardLink = document.createElement('a');
            cardLink.href = `event-detail.html?id=${item.id}`; 
            cardLink.className = 'gallery-item';
            cardLink.innerHTML = `
                <img src="${item.heroImage}" alt="${item.title}" loading="lazy">
                <div class="overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            `;
            container.appendChild(cardLink);
        });

        if (typeof gsap !== 'undefined') {
            gsap.from(".gallery-item", { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" });
        }
    }
}

if (document.getElementById('gallery-container')) {
    loadGallery();
}