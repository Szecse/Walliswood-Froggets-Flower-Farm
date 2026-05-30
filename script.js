// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile nav toggle
const toggle = document.getElementById('mobile-nav-toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
});

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -150px 0px' /* Később indul el: az elemnek mélyebbre kell érnie a képernyőn */
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Fade in the section
            entry.target.classList.add('fade-in-section');
            
            // Fade in cards within the section
            const cards = entry.target.querySelectorAll('.product-card, .experience-card, .gallery-item, .testimonial-card, .img-col-1, .img-col-2, .learning-content');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`; /* Lassabb, komótosabb lépcsőzetes megjelenés */
                card.classList.add('fade-in-card');
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.about-section, .collections-section, .experience-section, .learning-section, .gallery-section, .testimonials-section, .subscribe-section').forEach(section => {
    observer.observe(section);
});

// Gallery Slider Logic
const galleryTrack = document.querySelector('.gallery-grid');
const prevBtn = document.getElementById('gallery-prev');
const nextBtn = document.getElementById('gallery-next');

if (galleryTrack && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        const itemWidth = galleryTrack.querySelector('.gallery-item').offsetWidth + 35; // 35px gap
        galleryTrack.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const itemWidth = galleryTrack.querySelector('.gallery-item').offsetWidth + 35; // 35px gap
        galleryTrack.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });
}