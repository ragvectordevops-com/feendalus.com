'use strict';

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

const updateHeader = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

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

const demoQueries = [
  '“minimal travel backpack that fits a 16-inch laptop”',
  '“skin-safe gift set for a first-time customer under ₹2,500”',
  '“waterproof trail shoes for wide feet and monsoon weather”'
];
const queryElement = document.querySelector('[data-demo-query]');
let queryIndex = 0;
if (queryElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    queryIndex = (queryIndex + 1) % demoQueries.length;
    queryElement.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350 });
    queryElement.textContent = demoQueries[queryIndex];
  }, 4200);
}

const developerContent = {
  build: {
    title: 'Context-aware application development',
    text: 'Generate GraphQL queries, Shopify Functions, Liquid sections, Hydrogen components, UI extensions and app scaffolding from current documentation and project context.'
  },
  validate: {
    title: 'Schema and platform validation',
    text: 'Check GraphQL operations, Liquid, UI extension targets and component structures against supported Shopify schemas before code review and deployment.'
  },
  operate: {
    title: 'Approved store operations',
    text: 'Prepare scoped reads and writes, show the proposed change as a diff, validate access scopes and require explicit authorization before any store mutation.'
  }
};

const devTabs = document.querySelectorAll('[data-dev-tab]');
const devContent = document.querySelector('[data-dev-content]');
devTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.devTab;
    const content = developerContent[key];
    if (!content || !devContent) return;
    devTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    devContent.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
  });
});

const architectureContent = {
  chunk: {
    title: 'Structure-aware chunking',
    text: 'Split manuals, policies, buying guides and FAQs by headings, sections and semantic boundaries. Preserve product IDs, markets, language, taxonomy and permissions as metadata.'
  },
  retrieve: {
    title: 'Hybrid retrieval with live filters',
    text: 'Combine semantic vectors with lexical matching, taxonomy, market, availability and business rules. Fetch volatile price, inventory and order facts live from Shopify.'
  },
  act: {
    title: 'Governed actions through Shopify tools',
    text: 'Use structured tool calls for GraphQL, Functions, webhooks, MCP or internal services. Validate every parameter and require approval for consequential writes.'
  }
};

const architectureTabs = document.querySelectorAll('[data-arch-tab]');
const architecturePanel = document.querySelector('[data-arch-content]');
architectureTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.archTab;
    const content = architectureContent[key];
    if (!content || !architecturePanel) return;
    architectureTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    architecturePanel.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
  });
});

const faqItems = document.querySelectorAll('.faq-item');
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
