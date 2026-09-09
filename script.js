const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

document.querySelector('#year').textContent = new Date().getFullYear();

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

const updateNavigation = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
  const current = sections.reduce((active, section) => {
    return window.scrollY >= section.offsetTop - 180 ? section.id : active;
  }, 'home');

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();
