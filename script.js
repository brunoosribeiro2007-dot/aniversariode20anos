document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const bokehContainer = document.getElementById('bokeh-container');
    const photoFrame = document.getElementById('photoFrame');
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

    // Preload all photos
    photos.forEach(src => { const img = new Image(); img.src = src; });

    // --- Background Heart Particles ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤️';
        const size = Math.random() * 20 + 10 + 'px';
        const left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 5 + 5 + 's';
        const delay = Math.random() * 5 + 's';
        heart.style.fontSize = size;
        heart.style.left = left;
        heart.style.animationDuration = duration;
        heart.style.animationDelay = delay;
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), (parseFloat(duration) + parseFloat(delay)) * 1000);
    }
    setInterval(createHeart, 300);

    // --- Photo Frame Heart Burst ---
    function burstHeartsFromPhoto() {
        if (!photoFrame) return;
        const rect = photoFrame.getBoundingClientRect();
        const emojis = ['❤️', '💕', '💖', '💗', '🌹'];
        const count = 14;

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const h = document.createElement('div');
                h.classList.add('frame-heart');
                h.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

                // Spawn positions: top edge, left edge, right edge
                const side = Math.floor(Math.random() * 3); // 0=top, 1=left, 2=right
                let startX, startY, endX, endY;

                if (side === 0) { // top
                    startX = rect.left + Math.random() * rect.width;
                    startY = rect.top;
                    endX = startX + (Math.random() - 0.5) * 120;
                    endY = startY - 80 - Math.random() * 80;
                } else if (side === 1) { // left
                    startX = rect.left;
                    startY = rect.top + Math.random() * rect.height * 0.7;
                    endX = startX - 60 - Math.random() * 60;
                    endY = startY - 40 - Math.random() * 60;
                } else { // right
                    startX = rect.right;
                    startY = rect.top + Math.random() * rect.height * 0.7;
                    endX = startX + 60 + Math.random() * 60;
                    endY = startY - 40 - Math.random() * 60;
                }

                const size = Math.random() * 14 + 12;
                h.style.cssText = `
                    position: fixed;
                    left: ${startX}px;
                    top: ${startY}px;
                    font-size: ${size}px;
                    pointer-events: none;
                    z-index: 200;
                    opacity: 1;
                    transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                `;
                document.body.appendChild(h);

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        h.style.left = endX + 'px';
                        h.style.top = endY + 'px';
                        h.style.opacity = '0';
                        h.style.transform = `scale(${0.4 + Math.random()}) rotate(${Math.random() * 40 - 20}deg)`;
                    });
                });

                setTimeout(() => h.remove(), 1300);
            }, i * 60);
        }
    }

    // --- Carousel Logic (smooth cross-fade with Ken Burns) ---
    function advanceCarousel() {
        // Fade out current
        userPhoto.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        userPhoto.style.opacity = '0';
        userPhoto.style.transform = 'scale(1.08)';

        // Burst hearts from photo frame
        burstHeartsFromPhoto();

        setTimeout(() => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            userPhoto.src = photos[currentPhotoIndex];
            userPhoto.style.transition = 'none';
            userPhoto.style.transform = 'scale(1)';

            userPhoto.onload = () => {
                userPhoto.style.transition = 'opacity 0.7s ease, transform 6s ease';
                userPhoto.style.opacity = '1';
                userPhoto.style.transform = 'scale(1.06)'; // Ken Burns subtle zoom
            };
            // Fallback in case onload doesn't fire (cached image)
            if (userPhoto.complete) {
                userPhoto.style.transition = 'opacity 0.7s ease, transform 6s ease';
                userPhoto.style.opacity = '1';
                userPhoto.style.transform = 'scale(1.06)';
            }
        }, 650);
    }

    function startCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
        // Start Ken Burns on first image
        userPhoto.style.transition = 'transform 6s ease';
        userPhoto.style.transform = 'scale(1.06)';
        carouselInterval = setInterval(advanceCarousel, 4000);
    }

    // --- Button Actions ---
    openCardBtn.addEventListener('click', () => {
        for (let i = 0; i < 80; i++) {
            setTimeout(createHeart, i * 20);
        }
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
        document.body.style.transition = 'background 2s ease';
        document.body.style.background = theme.bg;
    }

    // --- Bokeh Background ---
    function createBokeh() {
        for (let i = 0; i < 15; i++) {
            const bokeh = document.createElement('div');
            bokeh.classList.add('bokeh');
            const size = Math.random() * 150 + 50 + 'px';
            bokeh.style.width = size;
            bokeh.style.height = size;
            bokeh.style.top = Math.random() * 100 + 'vh';
            bokeh.style.left = Math.random() * 100 + 'vw';
            bokeh.style.animationDuration = Math.random() * 10 + 10 + 's';
            bokeh.style.animationDelay = Math.random() * 5 + 's';
            bokehContainer.appendChild(bokeh);
        }
    }
    createBokeh();

    // Start auto-animations
    startCarousel();
    setInterval(rotateTheme, 6000);
});
