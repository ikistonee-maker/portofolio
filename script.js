/* ============================================
   CYBERPUNK NEON CV - APP.JS
   ============================================ */

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const percent = document.querySelector('.loader-percent');
  let p = 0;
  const interval = setInterval(() => {
    p += Math.random() * 15;
    if (p >= 100) {
      p = 100;
      clearInterval(interval);
      setTimeout(() => loader.classList.add('hidden'), 400);
    }
    percent.textContent = Math.floor(p) + '%';
  }, 120);
});

/* ===== CURSOR GLOW ===== */
const cursorGlow = document.querySelector('.cursor-glow');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
document.querySelectorAll('a,button,input,textarea,.glass,.portfolio-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorDot.style.background = 'var(--neon-pink)';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorDot.style.background = 'var(--neon-cyan)';
  });
});

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    const colors = ['#00f0ff', '#b026ff', '#ff2bd6', '#00fff7'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random() * 0.6 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
}

function initParticles() {
  particles = [];
  const count = window.innerWidth < 768 ? 40 : 90;
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = particles[a].color;
        ctx.globalAlpha = (1 - dist / 120) * 0.2;
        ctx.lineWidth = 0.5;
        ctx.shadowBlur = 5;
        ctx.shadowColor = particles[a].color;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===== TYPING ANIMATION ===== */
const typingTexts = [
  'FRONTEND DEVELOPER',
  'HACKER SEJATI',
  'BAJAK AKUN EPEP',
  'SUKA NGODING',
  'SUKA HACK AKUN EPEP'
];
let textIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const current = typingTexts[textIdx];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) {
      isDeleting = false;
      textIdx = (textIdx + 1) % typingTexts.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 40);
  } else {
    typingEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 90);
  }
}
setTimeout(typeEffect, 1000);

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  
  // Active link based on scroll
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-col')) {
        entry.target.querySelectorAll('.skill-fill').forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + '%';
          }, i * 150);
        });
      }
      
      // Animate language circles
      if (entry.target.classList.contains('languages')) {
        entry.target.querySelectorAll('.lang-circle').forEach((circle, i) => {
          setTimeout(() => {
            const pct = circle.dataset.pct;
            const offset = 283 - (283 * pct / 100);
            circle.querySelector('.lang-prog').style.strokeDashoffset = offset;
          }, i * 200);
        });
      }
      
      // Animate stat counters
      if (entry.target.classList.contains('about-text')) {
        entry.target.querySelectorAll('.stat-num').forEach(num => {
          animateCounter(num);
        });
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 30);
}

/* ===== MUSIC TOGGLE ===== */
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
    musicBtn.classList.remove('playing');
  } else {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {
      alert('Taruh file music.mp3 di folder assets/ untuk mengaktifkan musik.');
    });
    musicBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
    musicBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const btn = e.target.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>MENGIRIM...</span>';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i><span>TERKIRIM!</span>';
    btn.style.background = 'linear-gradient(135deg,#25d366,#128c7e)';
    setTimeout(() => {
      alert(`Terima kasih ${name}! Pesan Anda telah diterima. Saya akan segera membalas.`);
      e.target.reset();
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
    }, 1000);
  }, 1500);
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== PARALLAX EFFECT ON HERO ===== */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / window.innerHeight;
  }
});

/* ===== TILT EFFECT ON CARDS ===== */
document.querySelectorAll('.portfolio-card,.cert-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== KONAMI CODE EASTER EGG ===== */
let konamiCode = [];
const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    document.body.style.animation = 'rainbow 2s infinite';
    const style = document.createElement('style');
    style.textContent = '@keyframes rainbow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}';
    document.head.appendChild(style);
    setTimeout(() => { document.body.style.animation = ''; style.remove(); }, 5000);
  }
});

/* ===== CONSOLE WELCOME ===== */
console.log('%c🚀 NEON CV', 'font-size:40px;font-weight:bold;background:linear-gradient(135deg,#00f0ff,#b026ff,#ff2bd6);-webkit-background-clip:text;color:transparent;');
console.log('%cDesigned & Built with ♥ by Andi Pratama', 'color:#00f0ff;font-size:14px');
console.log('%c⚡ System Status: ONLINE', 'color:#25d366;font-family:monospace');
