// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Mobile nav toggle
const toggle = document.getElementById('mobile-nav-toggle');
const menu = document.getElementById('nav-menu');
if (toggle && menu) {
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });
}

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (menu) menu.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -150px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-section');
            const cards = entry.target.querySelectorAll('.product-card, .experience-card, .gallery-item, .testimonial-card, .img-col-1, .img-col-2, .learning-content');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
                card.classList.add('fade-in-card');
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-section, .collections-section, .experience-section, .learning-section, .gallery-section, .testimonials-section, .subscribe-section').forEach(section => {
    observer.observe(section);
});

// Gallery Slider Logic
const galleryTrack = document.querySelector('.gallery-grid');
const prevBtn = document.getElementById('gallery-prev');
const nextBtn = document.getElementById('gallery-next');

if (galleryTrack && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        const itemWidth = galleryTrack.querySelector('.gallery-item').offsetWidth + 40;
        galleryTrack.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const itemWidth = galleryTrack.querySelector('.gallery-item').offsetWidth + 40;
        galleryTrack.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });
}

// Lightbox Logic - IMMÁR A HD KÉPEKRE HANGOLVA
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

if (lightbox && lightboxImg && lightboxClose && lightboxTriggers.length > 0) {
    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); 
            // Mostantól a link (a href) tartalmát (HD kép) olvassuk ki
            const hdImageUrl = trigger.getAttribute('href'); 
            lightboxImg.src = hdImageUrl;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}