(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (navToggle && nav) {
    const closeNav = () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('open', !isOpen);
      document.body.classList.toggle('nav-open', !isOpen);
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
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const aiCopy = {
    analyse: {
      title: 'Build a matter brief in minutes',
      body: 'Extract parties, dates, obligations, disputed issues, evidence, risks and open questions. Generate chronologies and compare positions with links back to the underlying pages.'
    },
    draft: {
      title: 'Start from trusted matter context',
      body: 'Prepare letters, memos, motions, summaries and client communications using approved templates, matter facts and firm knowledge—then route the draft for professional review.'
    },
    automate: {
      title: 'Turn findings into governed work',
      body: 'Create tasks, populate records, generate checklists and trigger internal workflows through approved functions. Consequential actions remain behind explicit human approval gates.'
    }
  };

  const tabs = document.querySelectorAll('[data-ai-tab]');
  const content = document.querySelector('[data-ai-content]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      const selected = aiCopy[tab.dataset.aiTab];
      if (content && selected) {
        content.innerHTML = `<h3>${selected.title}</h3><p>${selected.body}</p>`;
      }
    });
  });

  const demoQuestion = document.querySelector('[data-demo-question]');
  const questions = [
    'Summarise the key indemnity disputes and cite the supporting clauses.',
    'Build a chronology of the notice events and link every source.',
    'Compare this draft against our approved commercial playbook.'
  ];

  if (demoQuestion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % questions.length;
      demoQuestion.animate(
        [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-5px)' }],
        { duration: 180, fill: 'forwards' }
      ).finished.then(() => {
        demoQuestion.textContent = questions[index];
        demoQuestion.animate(
          [{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 260, fill: 'forwards' }
        );
      });
    }, 4200);
  }
})();
