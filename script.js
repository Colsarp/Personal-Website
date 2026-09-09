const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navigationItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealElements = document.querySelectorAll('.reveal');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navigationItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navigationItems.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => revealObserver.observe(element));

document.getElementById('current-year').textContent = new Date().getFullYear();
