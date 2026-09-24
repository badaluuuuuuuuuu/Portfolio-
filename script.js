// BADAL_ Portfolio — interactions
// Particles background, cursor glow, scroll reveal, mobile menu, theme toggle

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Particle background ---------- */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const COUNT = 70;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function makeParticles() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.5 + 0.15
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#2dff9d';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(step);
    }

    window.addEventListener('resize', () => { resize(); makeParticles(); });
    resize();
    makeParticles();
    step();
  }

  /* ---------- Cursor glow ---------- */
  const glow = document.querySelector('.cursor-glow');
  if (glow) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
    let tx = gx, ty = gy;

    window.addEventListener('mousemove', e => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function animateGlow() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.textContent = '☰';
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('#navLinks a');
  if (sections.length && navAnchors.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const match = document.querySelector(`#navLinks a[href="#${entry.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(sec => navObserver.observe(sec));
  }

  /* ---------- Theme toggle (dark / light) ---------- */
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    const stored = null; // no persistent storage available client-side by default
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-theme');
      themeBtn.textContent = isLight ? '☀' : '☾';
    });
  }
});
