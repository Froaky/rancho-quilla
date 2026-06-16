/**
 * Navbar component
 * Manages mobile drawer toggle, active states, and smooth scrolling navigation.
 */
export class Navbar {
  constructor() {
    this.burger = document.getElementById('burger-toggle');
    this.menu = document.getElementById('nav-menu');
    this.links = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section, .phrase-section');

    if (!this.burger || !this.menu) {
      console.warn('Navbar: Missing elements.');
      return;
    }

    this.init();
  }

  init() {
    // Hamburger click event
    this.burger.addEventListener('click', () => this.toggleMenu());

    // Close menu when clicking link
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        this.closeMenu();
        this.handleSmoothScroll(e, link);
      });
    });

    // Active link highlighting on scroll (using IntersectionObserver)
    this.setupActiveStateObserver();
  }

  toggleMenu() {
    const isOpen = this.menu.classList.toggle('open');
    this.burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menu.classList.remove('open');
    this.burger.classList.remove('open');
    document.body.style.overflow = '';
  }

  handleSmoothScroll(e, link) {
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  setupActiveStateObserver() {
    const options = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Highlights as sections scroll through the middle
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.links.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, options);

    this.sections.forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });
  }
}
