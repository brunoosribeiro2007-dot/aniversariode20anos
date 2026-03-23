document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const bokehContainer = document.getElementById('bokeh-container');
    const userPhoto = document.getElementById('userPhoto');
    const openCardBtn = document.getElementById('openCardBtn');
    const changeThemeBtn = document.getElementById('changeThemeBtn');

    // --- Carousel Data ---
    const photos = [
        "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516589174184-c685eb32162e?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511733351957-2cdd9f9a9992?q=80&w=800&auto=format&fit=crop"
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
        // Animation effect
        document.querySelector('.card-wrapper').style.transform = 'scale(0.95)';
        setTimeout(() => {
            document.querySelector('.card-wrapper').style.transform = 'scale(1)';
            startCarousel();
        }, 150);
        
        // Intensify hearts
        for(let i=0; i<30; i++) {
            setTimeout(createHeart, i * 30);
        }
    });

    changeThemeBtn.addEventListener('click', () => {
        const themes = [
            { primary: '#da2c38', bg: 'linear-gradient(135deg, #590d22 0%, #da2c38 100%)' },
            { primary: '#7b2cbf', bg: 'linear-gradient(135deg, #240046 0%, #7b2cbf 100%)' },
            { primary: '#ff4d6d', bg: 'linear-gradient(135deg, #800f2f 0%, #ff4d6d 100%)' },
            { primary: '#fb8500', bg: 'linear-gradient(135deg, #023047 0%, #fb8500 100%)' }
        ];
        
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        document.documentElement.style.setProperty('--primary-red', randomTheme.primary);
        document.body.style.background = randomTheme.bg;
    });
});
