// main.js - Vanilla JS Logic Placeholder

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect & Mobile Toggle
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            navbar.classList.toggle('menu-open');
            navbar.classList.toggle('toggle');
        });
    }

    if (navLinksItems) {
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                navbar.classList.remove('menu-open');
                navbar.classList.remove('toggle');
            });
        });
    }

    // 2. Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide

    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // 3. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const portfolioTriggers = document.querySelectorAll('.lightbox-trigger');

    if (portfolioTriggers) {
        portfolioTriggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const imgSrc = e.target.closest('.portfolio-item').querySelector('img').src;
                if (lightboxImg) lightboxImg.src = imgSrc;
                if (lightbox) {
                    lightbox.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 4. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 5. Testimonial Carousel Logic
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (testimonials.length > 0 && dotsContainer) {
        let currentTestimonial = 0;
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const showTestimonial = (index) => {
            testimonials[currentTestimonial].classList.remove('active');
            dots[currentTestimonial].classList.remove('active');
            
            currentTestimonial = index;
            
            testimonials[currentTestimonial].classList.add('active');
            dots[currentTestimonial].classList.add('active');
        };

        // Auto advance
        setInterval(() => {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 6000);
    }

    // 6. Contact Form Prevent Default
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.classList.add('btn-outline');
                btn.classList.remove('btn-primary');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('btn-outline');
                    btn.classList.add('btn-primary');
                }, 3000);
            }, 1500);
        });
    }
});
