/**
 * ==========================================
 * NAVIGATION JAVASCRIPT - COMPLETE FILE
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==========================================
    // 1. STICKY HEADER
    // ==========================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ==========================================
    // 2. MOBILE HAMBURGER MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');

    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            
            const isExpanded = navList.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }

    // ==========================================
    // 3. MOBILE DROPDOWN TOGGLE
    // ==========================================
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        const link = dropdown.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.toggle('active');
                    }
                }
            });
        }
    });

    // ==========================================
    // 4. CLOSE MENU WHEN CLICKING OUTSIDE
    // ==========================================
    document.addEventListener('click', function(e) {
        const isMobile = window.innerWidth <= 992;
        if (!isMobile) return;
        
        const nav = document.getElementById('nav');
        const hamburger = document.getElementById('hamburger');
        
        if (nav && hamburger) {
            const isClickInsideNav = nav.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnHamburger) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ==========================================
    // 5. ACTIVE LINK HIGHLIGHTING
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 992 && navList.classList.contains('active')) {
                        navList.classList.remove('active');
                        hamburger.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // ==========================================
    // 7. WINDOW RESIZE HANDLER
    // ==========================================
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 992;
        const navList = document.getElementById('navList');
        const hamburger = document.getElementById('hamburger');
        
        if (!isMobile && navList && hamburger) {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            
            const dropdownMenus = document.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(function(menu) {
                menu.classList.remove('active');
            });
        }
    });

    console.log('Navigation initialized successfully!');
});