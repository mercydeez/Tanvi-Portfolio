/* =============================================
   TANVI PORTFOLIO - JAVASCRIPT
   Smooth interactions and animations
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // NAVIGATION
    // =========================================
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavScroll);
    
    // Active nav link on scroll
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // =========================================
    // SCROLL ANIMATIONS
    // =========================================
    
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.about-text, .about-stats, .stat-card, .media-card, .gallery-item, .contact-form'
    );
    
    // Add animation class to elements
    animatedElements.forEach(function(el) {
        el.classList.add('animate-on-scroll');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
    
    // =========================================
    // SMOOTH SCROLL
    // =========================================
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========================================
    // CONTACT FORM
    // =========================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form will be handled by Formspree
            // Add any custom validation or animations here
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Note: Formspree will handle the actual submission
            // This is just for UX enhancement
            
            // Reset button after a delay (for demo purposes)
            // In production, this would be handled by the form response
            setTimeout(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // =========================================
    // HERO PARALLAX (subtle)
    // =========================================
    
    const heroImage = document.querySelector('.hero-image-wrapper');
    
    function handleHeroParallax() {
        if (window.innerWidth > 768 && heroImage) {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.15;
            heroImage.style.transform = 'translateY(' + rate + 'px)';
        }
    }
    
    window.addEventListener('scroll', handleHeroParallax);
    
    // =========================================
    // MEDIA CARD HOVER EFFECT
    // =========================================
    
    const mediaCards = document.querySelectorAll('.media-card');
    
    mediaCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // =========================================
    // GALLERY ITEM INTERACTIONS
    // =========================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(function(item) {
        // Add ripple effect on click (for future lightbox implementation)
        item.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.style.cssText = 
                'position: absolute;' +
                'background: rgba(255, 255, 255, 0.4);' +
                'border-radius: 50%;' +
                'pointer-events: none;' +
                'transform: scale(0);' +
                'animation: ripple 0.6s ease-out;';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = 
        '@keyframes ripple {' +
        '  to {' +
        '    transform: scale(4);' +
        '    opacity: 0;' +
        '  }' +
        '}';
    document.head.appendChild(style);
    
    // =========================================
    // PRELOADER (optional enhancement)
    // =========================================
    
    // Ensure hero image is loaded before showing animations
    const heroImageEl = document.querySelector('.hero-image');
    
    if (heroImageEl) {
        if (heroImageEl.complete) {
            document.body.classList.add('loaded');
        } else {
            heroImageEl.addEventListener('load', function() {
                document.body.classList.add('loaded');
            });
            
            // Fallback in case image fails to load
            heroImageEl.addEventListener('error', function() {
                document.body.classList.add('loaded');
            });
        }
    } else {
        document.body.classList.add('loaded');
    }
    
    // =========================================
    // STATS COUNTER ANIMATION
    // =========================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateStats() {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            hasAnimated = true;
            
            statNumbers.forEach(function(stat) {
                const target = parseInt(stat.textContent);
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                let current = 0;
                const increment = target / 50;
                const duration = 1500;
                const stepTime = duration / 50;
                
                const counter = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + suffix;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load
    
    // =========================================
    // KEYBOARD NAVIGATION ENHANCEMENT
    // =========================================
    
    // Focus visible polyfill behavior
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // =========================================
    // CONSOLE GREETING (Easter egg)
    // =========================================
    
    console.log(
        '%c✦ Tanvi Portfolio ✦',
        'color: #C4A35A; font-size: 24px; font-weight: bold;'
    );
    console.log(
        '%cSinger • Anchor • TV Host',
        'color: #6B6560; font-size: 14px;'
    );
    
});
