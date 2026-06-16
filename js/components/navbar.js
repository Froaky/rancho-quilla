/**
 * Navbar component
 * Manages mobile drawer toggle, active states, and smooth scrolling navigation.
 */
export class Navbar {
  constructor() {
    this.burger = document.getElementById('burger-toggle');
    this.menu = document.getElementById('nav-menu');
    this.links = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('main section, .phrase-section');

    if (!this.burger || !this.menu) {
      console.warn('Navbar: Missing elements.');
      return;
    }

    this.init();
  }

  init() {
    this.burger.addEventListener('click', () => this.toggleMenu());

    this.links.forEach((link) => {
      link.addEventListener('click', (event) => {
        this.closeMenu();
        this.handleSmoothScroll(event, link);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.closeMenu();
    });

    this.setupActiveStateObserver();
  }

  toggleMenu() {
    const isOpen = this.menu.classList.toggle('open');
    this.burger.classList.toggle('open', isOpen);
    this.burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menu.classList.remove('open');
    this.burger.classList.remove('open');
    this.burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  handleSmoothScroll(event, link) {
    const targetId = link.getAttribute('href');
    if (!targetId || !targetId.startsWith('#')) return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();
    const headerOffset = 86;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  setupActiveStateObserver() {
    const options = {
      root: null,
      rootMargin: '-42% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute('id');
        this.links.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, options);

    this.sections.forEach((section) => {
      if (section.id) observer.observe(section);
    });
  }
}
