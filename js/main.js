document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header & Smooth Scroll ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Simple animation for hamburger can be added in CSS or here
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.feature-card, .product-card, .section-header, .why-list li, .stat-item, .cta-section');

    // Add 'reveal' class initially to elements we want to animate
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.count');
    let countersStarted = false;

    const startCounters = () => {
        if (countersStarted) return;

        const section = document.querySelector('.stats-counter');
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / 50; // Speed adjustment

                const updateCount = () => {
                    const count = +counter.innerText;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    };

    window.addEventListener('scroll', startCounters);

    // --- Testimonial Slider ---
    const track = document.querySelector('.testimonial-track');
    const slides = Array.from(track ? track.children : []);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (track && slides.length > 0) {
        let currentSlideIndex = 0;

        const updateSlide = (index) => {
            // Remove active class from all
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.position = 'absolute';
                slide.style.opacity = '0';
            });

            // Add active class to current
            slides[index].classList.add('active');
            slides[index].style.position = 'relative';
            slides[index].style.opacity = '1';
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                updateSlide(currentSlideIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
                updateSlide(currentSlideIndex);
            });
        }
    }

    // --- Particles Background (Simple Implementation) ---
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        // Create canvas
        const canvas = document.createElement('canvas');
        particlesContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(0, 243, 255, ${Math.random() * 0.5})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }

    console.log('ZeerakAI Scripts Loaded');
});
