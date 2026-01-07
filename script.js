document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero') || document.querySelector('.page-header');

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

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

    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init("_WA82jXCJEH8sWNSq");

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_lc45de1', 'template_5nysx88', this)
                .then(function() {
                    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                    contactForm.reset();
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }, function(error) {
                    alert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente o contáctanos por WhatsApp.');
                    console.error('FAILED...', error);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
