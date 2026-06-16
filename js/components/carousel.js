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
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.autoplaySpeed = 3500; // ms
    
    // Touch gesture state
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.isDragging = false;
    
    this.init();
  }

  init() {
    // Generate navigation dots
    this.setupDots();
    
    // Button triggers
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    
    // Autoplay & Hover pause listeners
    this.startAutoplay();
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());
    
    // Touch gestures for mobile swipe
    this.setupTouchGestures();
    
    // Responsive update on resize
    window.addEventListener('resize', () => this.updateLayout());
    this.updateLayout();
  }

  setupDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    this.items.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goTo(index));
      this.dotsContainer.appendChild(dot);
    });
    this.dots = Array.from(this.dotsContainer.children);
  }

  updateLayout() {
    this.slideWidth = this.items[0].getBoundingClientRect().width + 24; // Width + Margin
    this.goTo(this.currentIndex);
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => this.next(), this.autoplaySpeed);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  goTo(index) {
    this.currentIndex = index;
    
    // Loop boundary check
    if (this.currentIndex >= this.items.length) this.currentIndex = 0;
    if (this.currentIndex < 0) this.currentIndex = this.items.length - 1;
    
    const translateAmount = -this.currentIndex * this.slideWidth;
    this.track.style.transform = `translateX(${translateAmount}px)`;
    this.prevTranslate = translateAmount;
    
    // Update dots active class
    if (this.dots) {
      this.dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
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

    wrapper.addEventListener('touchstart', (e) => this.touchStart(e));
    wrapper.addEventListener('touchmove', (e) => this.touchMove(e));
    wrapper.addEventListener('touchend', () => this.touchEnd());
  }

  touchStart(e) {
    this.isDragging = true;
    this.startX = e.touches[0].clientX;
    this.stopAutoplay();
    this.track.style.transition = 'none'; // Disable smooth anims while dragging
  }

  touchMove(e) {
    if (!this.isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - this.startX;
    this.currentTranslate = this.prevTranslate + diffX;
    this.track.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  touchEnd() {
    this.isDragging = false;
    const movedBy = this.currentTranslate - this.prevTranslate;
    
    this.track.style.transition = ''; // Restore smooth CSS animations
    
    // Swipe threshold to change slide (50px)
    if (movedBy < -50 && this.currentIndex < this.items.length - 1) {
      this.next();
    } else if (movedBy > 50 && this.currentIndex > 0) {
      this.prev();
    } else {
      this.goTo(this.currentIndex);
    }
    
    this.startAutoplay();
  }
}
