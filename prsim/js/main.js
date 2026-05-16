'use strict';

const CONTACT_EMAIL = 'Prism.contact.pro@proton.me';
const FORMSUBMIT_ACTION = `https://formsubmit.co/${encodeURIComponent(CONTACT_EMAIL)}`;

function initTheme() {
  const saved = localStorage.getItem('prsim-theme') || 'violet';
  document.documentElement.setAttribute('data-theme', saved === 'violet' ? '' : saved);

  document.querySelectorAll('.theme-btn').forEach((btn) => {
    const theme = btn.dataset.theme;
    const active = theme === saved || (saved === 'violet' && theme === 'violet');
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
    btn.addEventListener('click', () => {
      localStorage.setItem('prsim-theme', theme);
      document.documentElement.setAttribute('data-theme', theme === 'violet' ? '' : theme);
      document.querySelectorAll('.theme-btn').forEach((b) => {
        const isActive = b.dataset.theme === theme;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
    });
  });
}

function initNav() {
  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.nav__burger');
  const mobile = document.querySelector('.nav__mobile');
  const path = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav__link[data-page]').forEach((link) => {
    if (link.dataset.page === path || (path === '' && link.dataset.page === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });

  burger?.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    mobile?.classList.toggle('is-open', !open);
    mobile?.setAttribute('aria-hidden', String(open));
  });

  mobile?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      burger?.setAttribute('aria-expanded', 'false');
      mobile?.classList.remove('is-open');
      mobile?.setAttribute('aria-hidden', 'true');
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  els.forEach((el) => io.observe(el));
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.setAttribute('action', FORMSUBMIT_ACTION);

  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') === '1') {
    const success = document.getElementById('form-success');
    if (success) {
      success.hidden = false;
      form.reset();
    }
  }

  form.addEventListener('submit', (e) => {
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    let valid = true;

    const setErr = (id, msg) => {
      const el = document.getElementById(id);
      if (el) el.textContent = msg;
    };

    setErr('err-name', '');
    setErr('err-email', '');
    setErr('err-message', '');

    if (!name?.value.trim()) {
      setErr('err-name', 'Indiquez votre nom.');
      valid = false;
    }
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setErr('err-email', 'Email invalide.');
      valid = false;
    }
    if (!message?.value.trim()) {
      setErr('err-message', 'Décrivez votre projet.');
      valid = false;
    }

    if (!valid) e.preventDefault();
  });
}

function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initReveal();
  initContactForm();
  initYear();
});
