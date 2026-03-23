document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const bokehContainer = document.getElementById('bokeh-container');
    const userPhoto = document.getElementById('userPhoto');
    const openCardBtn = document.getElementById('openCardBtn');

    // --- Carousel Data ---
    const photos = [
        "img/WhatsApp Image 2026-03-23 at 10.50.43.jpeg",
        "img/WhatsApp Image 2026-03-23 at 11.07.06.jpeg",
        "img/WhatsApp Image 2026-03-23 at 11.07.07 (1).jpeg",
        "img/WhatsApp Image 2026-03-23 at 11.07.07.jpeg",
        "img/WhatsApp Image 2026-03-23 at 11.22.43.jpeg",
        "img/WhatsApp Image 2026-03-23 at 11.22.44 (1).jpeg",
        "img/WhatsApp Image 2026-03-23 at 11.22.44 (2).jpeg",
        "img/WhatsApp Image 2026-03-23 at 11.22.44.jpeg"
    ];
    let currentPhotoIndex = 0;
    let carouselInterval = null;

    // --- Particle System (Hearts) ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤️';
        
        // Random properties
        const size = Math.random() * 20 + 10 + 'px';
        const left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 5 + 5 + 's';
        const delay = Math.random() * 5 + 's';
        
        heart.style.fontSize = size;
        heart.style.left = left;
        heart.style.animationDuration = duration;
        heart.style.animationDelay = delay;
        
        heartContainer.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, parseFloat(duration) * 1000 + parseFloat(delay) * 1000);
    }

    // Spawn hearts periodically
    setInterval(createHeart, 300);

    // --- Bokeh Background ---
    function createBokeh() {
        for (let i = 0; i < 15; i++) {
            const bokeh = document.createElement('div');
            bokeh.classList.add('bokeh');
            
            const size = Math.random() * 150 + 50 + 'px';
            const top = Math.random() * 100 + 'vh';
            const left = Math.random() * 100 + 'vw';
            const duration = Math.random() * 10 + 10 + 's';
            const delay = Math.random() * 5 + 's';
            
            bokeh.style.width = size;
            bokeh.style.height = size;
            bokeh.style.top = top;
            bokeh.style.left = left;
            bokeh.style.animationDuration = duration;
            bokeh.style.animationDelay = delay;
            
            bokehContainer.appendChild(bokeh);
        }
    }
    createBokeh();

    // --- Carousel Logic ---
    function startCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            userPhoto.style.opacity = '0';
            setTimeout(() => {
                userPhoto.src = photos[currentPhotoIndex];
                userPhoto.style.opacity = '1';
            }, 500);
        }, 3000);
    }

    // --- Button Actions ---
    openCardBtn.addEventListener('click', () => {
        // Heart Burst
        for(let i=0; i<80; i++) {
            setTimeout(createHeart, i * 20);
        }

        // Show Surprise Modal after a small delay
        setTimeout(() => {
            document.getElementById('surpriseOverlay').classList.add('active');
        }, 1000);
    });

    document.getElementById('closeSurpriseBtn').addEventListener('click', () => {
        document.getElementById('surpriseOverlay').classList.remove('active');
    });

    // --- Auto Theme Rotation ---
    let currentThemeIndex = 0;
    const themes = [
        { primary: '#ffccd5', bg: 'linear-gradient(135deg, #fff0f3 0%, #ffccd5 100%)' },
        { primary: '#fbc4ab', bg: 'linear-gradient(135deg, #fdf0d5 0%, #fbc4ab 100%)' },
        { primary: '#cdb4db', bg: 'linear-gradient(135deg, #f2e9e4 0%, #cdb4db 100%)' },
        { primary: '#bde0fe', bg: 'linear-gradient(135deg, #edf2fb 0%, #bde0fe 100%)' }
    ];

    function rotateTheme() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const theme = themes[currentThemeIndex];
        document.documentElement.style.setProperty('--primary-rose', theme.primary);
        document.body.style.background = theme.bg;
    }

    // Start auto-animations
    startCarousel();
    setInterval(rotateTheme, 6000); // Change theme every 6 seconds
});
