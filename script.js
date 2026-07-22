(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const productCards = document.querySelectorAll('[data-category]');
  const faqItems = document.querySelectorAll('.faq-item');
  const year = document.querySelector('[data-year]');

  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      productCards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  faqItems.forEach((item) => {
    const button = item.querySelector('button');
    if (!button) return;

    button.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');

      faqItems.forEach((other) => {
        other.classList.remove('open');
        const otherButton = other.querySelector('button');
        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  if (year) year.textContent = String(new Date().getFullYear());
})();
