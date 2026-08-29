/**
 * ==========================================
 * MAIN JAVASCRIPT - COMPLETE FILE
 * ==========================================
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==========================================
    // 1. HERO PARTICLES
    // ==========================================
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 3 + 2) + 'px';
            particle.style.height = particle.style.width;
            
            const duration = Math.random() * 7 + 5;
            particle.style.animationDuration = duration + 's';
            
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // ==========================================
    // 2. TYPING EFFECT
    // ==========================================
    function typingEffect() {
        const typingElement = document.querySelector('.hero-typing-text');
        if (!typingElement) return;
        
        const phrases = [
            'AI Solutions for Business Growth',
            'Custom Software Development',
            'Digital Transformation Strategies',
            'Data Analytics & Automation',
            'Intelligent Business Systems',
            'Future-Ready Technology'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                currentText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typingElement.textContent = currentText;
            
            let speed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                speed = 2000;
                isDeleting = true;
            } 
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 500;
            }
            
            setTimeout(type, speed);
        }
        
        type();
    }
    
    typingEffect();

    // ==========================================
    // 3. COUNTER ANIMATION
    // ==========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (isNaN(target)) return;
            
            const duration = 2000;
            const stepTime = 16;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            
            function updateCounter() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    animateCounters();

    // ==========================================
    // 4. SCROLL REVEAL
    // ==========================================
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if (reveals.length === 0) return;
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    }
    
    initScrollReveal();

    // ==========================================
    // 5. SMOOTH SCROLL FOR NAVIGATION LINKS (NEW)
    // ==========================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    initSmoothScroll();

    // ==========================================
    // 6. MOBILE NAVIGATION TOGGLE (NEW)
    // ==========================================
    function initMobileNav() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
            });
            
            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                    }
                });
            });
        }
    }
    
    initMobileNav();

    // ==========================================
    // 7. ACTIVE NAVIGATION LINK HIGHLIGHT (NEW)
    // ==========================================
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    initActiveNavLink();

    // ==========================================
    // 8. PORTFOLIO FILTERING (NEW)
    // ==========================================
    function initPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    initPortfolioFilter();

    // ==========================================
    // 9. FAQ ACCORDION (NEW)
    // ==========================================
    function initAccordion() {
        const accBtns = document.querySelectorAll('.faq-question');

        accBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    }
    initAccordion();

    // ==========================================
    // 10. PORTFOLIO MODALS (NEW)
    // ==========================================
    function initPortfolioModals() {
        const modalBtns = document.querySelectorAll('.open-modal-btn');
        const closeBtns = document.querySelectorAll('.close-modal');
        const modals = document.querySelectorAll('.project-modal');

        // Open modal
        modalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const targetModal = document.getElementById(targetId);
                if (targetModal) {
                    targetModal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        // Close modal via (X) button
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.project-modal').classList.remove('show');
                document.body.style.overflow = 'auto'; // Restore scrolling
            });
        });

        // Close modal by clicking outside the modal content
        window.addEventListener('click', (e) => {
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
    initPortfolioModals();

    console.log('Main JavaScript initialized successfully with all features!');
});