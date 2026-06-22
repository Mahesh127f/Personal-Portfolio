/* ============================================
   ALEX.DEV — Portfolio JavaScript
   ============================================ */

// ─── TYPEWRITER ──────────────────────────────
const words = ['Developer', 'Engineer', 'Designer'];
let wIndex = 0, cIndex = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const word = words[wIndex];
  if (deleting) {
    typeEl.textContent = word.slice(0, --cIndex);
  } else {
    typeEl.textContent = word.slice(0, ++cIndex);
  }

  if (!deleting && cIndex === word.length) {
    setTimeout(() => deleting = true, 1800);
    setTimeout(type, 2000);
    return;
  }
  if (deleting && cIndex === 0) {
    deleting = false;
    wIndex = (wIndex + 1) % words.length;
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

// ─── NAVBAR SCROLL ───────────────────────────
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  scrollTopBtn.classList.toggle('visible', y > 400);
  runCounters();
  revealOnScroll();
  animateBars();
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── MOBILE NAV ──────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── COUNTER ANIMATION ───────────────────────
let countersDone = false;
function runCounters() {
  if (countersDone) return;
  const section = document.querySelector('.about__stats');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    countersDone = true;
    document.querySelectorAll('.stat__num').forEach(el => {
      const target = parseInt(el.dataset.target);
      let cur = 0;
      const step = Math.ceil(target / 40);
      const id = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(id);
      }, 40);
    });
  }
}

// ─── SKILL BARS ──────────────────────────────
let barsDone = false;
function animateBars() {
  if (barsDone) return;
  const section = document.querySelector('.skills__grid');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    barsDone = true;
    document.querySelectorAll('.bar__fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }
}

// ─── SCROLL REVEAL ───────────────────────────
document.querySelectorAll('.section__title, .project-card, .skills__category, .about__card, .contact__form, .contact__info')
  .forEach(el => el.classList.add('reveal'));

function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

// ─── PROJECT FILTER ──────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── CONTACT FORM ────────────────────────────
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function validate(id, errId, check, msg) {
  const el = document.getElementById(id);
  const err = document.getElementById(errId);
  if (!check(el.value.trim())) {
    err.textContent = msg;
    el.style.borderColor = '#ff6b6b';
    return false;
  }
  err.textContent = '';
  el.style.borderColor = '';
  return true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const ok = [
    validate('name', 'nameError', v => v.length >= 2, 'Please enter your name'),
    validate('email', 'emailError', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email'),
    validate('message', 'messageError', v => v.length >= 10, 'Message too short (min 10 chars)')
  ].every(Boolean);

  if (!ok) return;

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Sending...';

  // Simulate sending (replace with real API call when backend is ready)
  await new Promise(r => setTimeout(r, 1500));

  successMsg.classList.add('show');
  form.reset();
  btn.disabled = false;
  btn.querySelector('span').textContent = 'Send Message';

  setTimeout(() => successMsg.classList.remove('show'), 5000);
});

// Clear errors on input
['name', 'email', 'message'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    const errEl = document.getElementById(id + 'Error');
    if (errEl) errEl.textContent = '';
    document.getElementById(id).style.borderColor = '';
  });
});

// ─── INITIAL TRIGGER ─────────────────────────
window.dispatchEvent(new Event('scroll'));
setTimeout(revealOnScroll, 100);

// Live IST Clock
function updateTime() {
  const now = new Date();
  const ist = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  const el = document.getElementById('liveTime');
  if (el) el.textContent = ist;
}

updateTime();
setInterval(updateTime, 1000);