import './styles.css';

// ========================================
// Preloader
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1400);
});

// ========================================
// Theme toggle (dark / light)
// ========================================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ========================================
// Navbar scroll effect
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ========================================
// Mobile menu toggle
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// ========================================
// Typing effect
// ========================================
const typingEl = document.getElementById('typingText');
const phrases = [
    'Desarrollador Freelancer',
    'Disenador de Software',
    'Especialista en C# & .NET',
    'Creador de Soluciones Web'
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

const typeLoop = () => {
    const current = phrases[phraseIndex];

    if (!deleting) {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 2000);
            return;
        }
        setTimeout(typeLoop, 80);
    } else {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeLoop, 400);
            return;
        }
        setTimeout(typeLoop, 40);
    }
};

setTimeout(typeLoop, 1600);

// ========================================
// Parallax hero background
// ========================================
const heroBg = document.querySelector('.hero-bg-effect');

if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// ========================================
// Scroll reveal with stagger
// ========================================
const revealElements = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .contact-card, .about-text, .about-stats, .service-card, .process-step, .testimonial-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Stagger: find siblings with reveal class
            const parent = entry.target.parentElement;
            const siblings = parent.querySelectorAll('.reveal:not(.active)');
            siblings.forEach((sib, i) => {
                setTimeout(() => sib.classList.add('active'), i * 100);
            });
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ========================================
// Animated stat counters
// ========================================
const stats = document.querySelectorAll('.stat-number');
let statsCounted = false;

const countStats = () => {
    if (statsCounted) return;
    stats.forEach(stat => {
        const target = +stat.dataset.target;
        const duration = 1200;
        const start = performance.now();

        const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            stat.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    });
    statsCounted = true;
};

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) countStats();
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

// ========================================
// Smooth active nav link on scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// ========================================
// Contact form
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const message = contactForm.querySelector('#message').value;

    // Open mailto with form data
    const subject = encodeURIComponent(`Contacto desde portafolio - ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
    window.location.href = `mailto:padillajosueezequiel@gmail.com?subject=${subject}&body=${body}`;

    contactForm.reset();
});
