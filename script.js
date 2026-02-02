/* ================================
   PULSE DENGUE - JavaScript
   MIT Solve Future Health Challenge
   ================================ */

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Elements to animate
const animateElements = document.querySelectorAll(
    '.problem-card, .comparison-card, .layer, .timeline-item, .metric, .team-card, .cta-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const end = parseInt(target);
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = start;
        if (start === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number, .metric-value');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            // Only animate if it's a simple number
            if (/^\d+$/.test(text.replace(/[+%MK$]/g, ''))) {
                // Stats are already displaying, we'll add pulse effect instead
                entry.target.style.animation = 'statPulse 0.5s ease';
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => statsObserver.observe(stat));

document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes statPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    </style>
`);

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (in real app, would send to server)
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00E676 0%, #00C853 100%)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Add floating particles effect
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 10 + 10;
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 217, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        left: ${startX}px;
        bottom: -20px;
        animation: floatUp ${duration}s linear infinite;
    `;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Add float up animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    </style>
`);

// Create particles periodically
setInterval(createParticle, 2000);

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Dashboard animation - simulate live updates
function simulateDashboardUpdates() {
    const alertItems = document.querySelectorAll('.alert-item');
    
    setInterval(() => {
        alertItems.forEach(item => {
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = 'alertPulse 0.5s ease';
        });
    }, 5000);
}

document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes alertPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
            100% { transform: scale(1); }
        }
    </style>
`);

simulateDashboardUpdates();

// Zone pulse animation enhancement
const zones = document.querySelectorAll('.zone');
zones.forEach((zone, index) => {
    zone.style.animationDelay = `${index * 0.5}s`;
});

// Mobile menu toggle (if needed)
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.cssText = `
        display: none;
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    `;
    
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
    }
    
    window.addEventListener('resize', () => {
        menuToggle.style.display = window.innerWidth <= 768 ? 'block' : 'none';
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
    
    console.log('🦟 PULSE DENGUE - Protecting communities through prediction');
    console.log('📊 MIT Solve Future Health Challenge 2026');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
