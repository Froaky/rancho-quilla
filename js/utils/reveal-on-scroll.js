/**
 * RevealOnScroll
 * Adds subtle entrance animations to sections and cards.
 */
export class RevealOnScroll {
  constructor() {
    this.elements = document.querySelectorAll('[data-reveal]');

    if (!this.elements.length) return;
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      this.elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    this.elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
      observer.observe(element);
    });
  }
}
