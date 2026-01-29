// ==================== NAVIGATION ====================

// ==================== SMOOTH SCROLL POLYFILL FOR EDGE ====================
function smoothScrollTo(to, duration) {
    const start = window.pageYOffset || document.documentElement.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    function animateScroll() {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    }
    
    animateScroll();
}

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            // Animate hamburger icon
            const icon = this.querySelector('.nav__toggle-icon');
            if (navMenu.classList.contains('show')) {
                icon.style.background = 'transparent';
            } else {
                icon.style.background = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('.nav__toggle-icon');
                if (icon) {
                    icon.style.background = '';
                }
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('.nav__toggle-icon');
                if (icon) {
                    icon.style.background = '';
                }
            });
        });
    }
    
    // ==================== HEADER SCROLL ====================
    function handleScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to header on scroll
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // ==================== SCROLL TO TOP ====================
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            // Check if smooth scroll is supported
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for Edge and older browsers
                smoothScrollTo(0, 600);
            }
        });
    }
    
    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    // Check if smooth scroll is supported
                    if ('scrollBehavior' in document.documentElement.style) {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Fallback for Edge and older browsers
                        smoothScrollTo(targetPosition, 600);
                    }
                }
            }
        });
    });
    
    // ==================== ANIMATE SKILL BARS ====================
    const skillBars = document.querySelectorAll('.skill-item__progress');
    
    function animateSkillBars() {
        skillBars.forEach(function(bar) {
            const barPosition = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barPosition < windowHeight - 100) {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(function() {
                    bar.style.width = width;
                }, 100);
            }
        });
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    let skillAnimated = false;
    window.addEventListener('scroll', function() {
        if (!skillAnimated) {
            animateSkillBars();
            skillAnimated = true;
        }
    });
    
    // ==================== AUTO-DISMISS MESSAGES ====================
    const messages = document.querySelectorAll('.message');
    messages.forEach(function(message) {
        setTimeout(function() {
            message.style.animation = 'slideOut 0.3s ease-in-out';
            setTimeout(function() {
                message.remove();
            }, 300);
        }, 5000);
    });
    
    // ==================== FOOTER YEAR ====================
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    
    // ==================== LAZY LOADING IMAGES ====================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function(img) {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// ==================== SLIDE OUT ANIMATION ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
