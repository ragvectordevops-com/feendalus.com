(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (navToggle && nav) {
    const closeNav = () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      document.body.classList.toggle('nav-open', !open);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const architectureCopy = {
    chunk: {
      title: 'Structure-aware chunking',
      body: 'Split manuals, policies, FAQs and guides by headings and semantic boundaries. Keep short product fields structured. Attach product IDs, categories, attributes, language, stock state and permissions as metadata.'
    },
    retrieve: {
      title: 'Hybrid retrieval and reranking',
      body: 'Blend vector similarity with keyword relevance, product filters and business rules. Rerank the candidate set so availability, price, compatibility and intent all influence the final result.'
    },
    act: {
      title: 'Controlled commerce actions',
      body: 'Pass validated parameters to approved WooCommerce or internal functions. Read-only actions can be automatic; pricing, refunds, stock changes and outbound communication can require explicit review.'
    }
  };

  const architectureTabs = document.querySelectorAll('[data-arch-tab]');
  const architectureContent = document.querySelector('[data-arch-content]');
  architectureTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      architectureTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      const selected = architectureCopy[tab.dataset.archTab];
      if (architectureContent && selected) {
        architectureContent.innerHTML = `<h3>${selected.title}</h3><p>${selected.body}</p>`;
      }
    });
  });

  document.querySelectorAll('[data-accordion] .faq-item').forEach((item) => {
    const button = item.querySelector('button');
    if (!button) return;
    button.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const demoQuery = document.querySelector('[data-demo-query]');
  const demoQueries = [
    '“gift for a runner under ₹3,000”',
    '“quiet blender for a small apartment”',
    '“skin-safe watch strap for daily workouts”',
    '“beginner camera for travel videos”'
  ];

  if (demoQuery && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % demoQueries.length;
      demoQuery.animate(
        [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-4px)' }],
        { duration: 170, fill: 'forwards' }
      ).finished.then(() => {
        demoQuery.textContent = demoQueries[index];
        demoQuery.animate(
          [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 230, fill: 'forwards' }
        );
      });
    }, 4000);
  }
})();
