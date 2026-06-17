/**
 * Carousel component
 * Handles sliding, autoplay, pause-on-hover, and mobile touch gestures.
 */
export class Carousel {
  constructor() {
    this.container = document.getElementById('experience-carousel');
    this.track = document.getElementById('carousel-track');
    this.prevBtn = document.getElementById('carousel-prev');
    this.nextBtn = document.getElementById('carousel-next');
    this.dotsContainer = document.getElementById('carousel-dots');

    if (!this.container || !this.track) {
      console.warn('Carousel: Missing elements.');
      return;
    }

    this.items = Array.from(this.track.children);
    if (!this.items.length) return;

    this.originalItems = this.items;
    this.originalCount = this.originalItems.length;
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.autoplaySpeed = 4200;
    this.resetTimer = null;

    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.isDragging = false;

    this.init();
  }

  init() {
    this.setupLoop();
    this.setupDots();

    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    this.startAutoplay();
    this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
    this.container.addEventListener('focusin', () => this.pauseAutoplay());
    this.container.addEventListener('focusout', (event) => {
      if (!this.container.contains(event.relatedTarget)) this.resumeAutoplay();
    });

    this.setupTouchGestures();
    window.addEventListener('resize', () => this.updateLayout());
    this.updateLayout();
  }

  setupLoop() {
    this.originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add('carousel-item-clone');
      clone.setAttribute('aria-hidden', 'true');
      this.track.appendChild(clone);
    });
    this.items = Array.from(this.track.children);
  }

  setupDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    this.originalItems.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Ir a la foto ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goTo(index));
      this.dotsContainer.appendChild(dot);
    });
    this.dots = Array.from(this.dotsContainer.children);
  }

  updateLayout() {
    const firstItem = this.items[0];
    const computed = window.getComputedStyle(firstItem);
    const marginRight = parseFloat(computed.marginRight) || 0;
    this.slideWidth = firstItem.getBoundingClientRect().width + marginRight;
    this.goTo(this.currentIndex, { animate: false });
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => this.next(), this.autoplaySpeed);
  }

  stopAutoplay() {
    if (!this.autoplayInterval) return;
    clearInterval(this.autoplayInterval);
    this.autoplayInterval = null;
  }

  pauseAutoplay() {
    this.container.classList.add('is-paused');
    this.stopAutoplay();
  }

  resumeAutoplay() {
    this.container.classList.remove('is-paused');
    this.startAutoplay();
  }

  goTo(index, options = {}) {
    const { animate = true } = options;
    clearTimeout(this.resetTimer);
    this.currentIndex = index;
    if (this.currentIndex < 0) this.currentIndex = this.originalCount - 1;

    this.track.style.transition = animate ? '' : 'none';
    const translateAmount = -this.currentIndex * this.slideWidth;
    this.track.style.transform = `translateX(${translateAmount}px)`;
    this.prevTranslate = translateAmount;
    this.currentTranslate = translateAmount;

    if (this.dots) {
      const activeIndex = this.currentIndex % this.originalCount;
      this.dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }

    if (this.currentIndex >= this.originalCount) {
      this.resetTimer = setTimeout(() => {
        this.goTo(0, { animate: false });
      }, 660);
    }

    if (!animate) {
      requestAnimationFrame(() => {
        this.track.style.transition = '';
      });
    }
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  setupTouchGestures() {
    const wrapper = document.getElementById('carousel-wrapper');
    if (!wrapper) return;

    wrapper.addEventListener('touchstart', (event) => this.touchStart(event), { passive: true });
    wrapper.addEventListener('touchmove', (event) => this.touchMove(event), { passive: true });
    wrapper.addEventListener('touchend', () => this.touchEnd());
  }

  touchStart(event) {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.pauseAutoplay();
    this.track.style.transition = 'none';
  }

  touchMove(event) {
    if (!this.isDragging) return;
    const currentX = event.touches[0].clientX;
    const diffX = currentX - this.startX;
    this.currentTranslate = this.prevTranslate + diffX;
    this.track.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  touchEnd() {
    this.isDragging = false;
    const movedBy = this.currentTranslate - this.prevTranslate;
    this.track.style.transition = '';

    if (movedBy < -50) {
      this.next();
    } else if (movedBy > 50) {
      this.prev();
    } else {
      this.goTo(this.currentIndex);
    }

    this.resumeAutoplay();
  }
}
