document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero') || document.querySelector('.page-header');

    if (heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom - 100) { // Trigger slightly before leaving hero
                header.classList.add('scrolled');
                header.classList.remove('transparent');
            } else {
                header.classList.add('transparent');
                header.classList.remove('scrolled');
            }
        });

        // Initial check
        if (window.scrollY > 0) {
            header.classList.add('transparent'); // Default start
        } else {
            header.classList.add('transparent');
        }
    } else {
        // No hero section, ensure header is solid (scrolled style)
        header.classList.add('scrolled');
        header.classList.remove('transparent');
    }

    // Service Cards Animation
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the card is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });
});
