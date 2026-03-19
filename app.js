/* app.js — Virginie Labat website interactions */

(function () {
  'use strict';

  /* ========================================
     DARK MODE TOGGLE
     ======================================== */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;

  // Detect system preference
  let currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);

  function updateToggleIcon() {
    if (!themeToggle) return;
    if (currentTheme === 'dark') {
      themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
      themeToggle.setAttribute('aria-label', 'Passer en mode clair');
    } else {
      themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      themeToggle.setAttribute('aria-label', 'Passer en mode sombre');
    }
  }

  updateToggleIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon();
    });
  }

  /* ========================================
     MOBILE NAV TOGGLE
     ======================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('is-open');
      if (isOpen) {
        mobileNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Ouvrir le menu');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('is-open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.setAttribute('aria-label', 'Fermer le menu');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Ouvrir le menu');
        document.body.style.overflow = '';
      });
    });
  }

  /* ========================================
     HEADER SCROLL STATE
     ======================================== */
  const header = document.querySelector('.header');
  let lastScrollY = 0;

  if (header) {
    function onScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 40) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ========================================
     SCROLL REVEAL (Intersection Observer)
     ======================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ========================================
     SMOOTH SCROLL for anchor links
     ======================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
