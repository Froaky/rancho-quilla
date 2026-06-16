/**
 * ScrollAnimator
 * Handles the scroll-linked logo animation.
 * Moves the logo image from the center of the Hero to the top-right slot in the Navbar.
 */
export class ScrollAnimator {
  constructor() {
    this.logo = document.getElementById('animated-logo');
    this.logoImg = document.getElementById('logo-img');
    this.target = document.getElementById('logo-target');
    this.header = document.getElementById('main-header');
    this.navbarLogo = document.getElementById('navbar-logo');
    this.scrollIndicator = document.querySelector('.scroll-indicator');

    if (!this.logo || !this.target || !this.header) {
      console.warn('ScrollAnimator: Missing elements.');
      return;
    }

    // Configuration
    this.animationRange = 430; // Pixels of scroll over which the animation occurs
    this.endScale = 0.31;      // Target scale factor (tuned for the image logo)
    this.dockThreshold = 0.94;  // When reached, the real navbar logo stays visible

    // Bindings
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);

    // Throttle flag
    this.ticking = false;

    this.init();
  }

  init() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    // Initial run
    this.animate(window.scrollY);
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.animate(window.scrollY);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  onResize() {
    this.animate(window.scrollY);
  }

  /**
   * Easing function for smoother transitions.
   * Applies a cubic ease-out curve to the scroll ratio.
   */
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Core animation method.
   * Calculates interpolated position and scale based on scroll progress.
   */
  animate(scrollTop) {
    // Calculate scroll ratio (0 to 1) with easing
    const rawRatio = Math.min(Math.max(scrollTop / this.animationRange, 0), 1);
    const ratio = this.easeOutCubic(rawRatio);

    // Calculate viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Starting position (center of viewport)
    const xStart = viewportWidth / 2;
    const yStart = viewportHeight * 0.33;

    // Ending position (center of the navbar target slot)
    const targetRect = this.target.getBoundingClientRect();
    const xEnd = targetRect.left + targetRect.width / 2;
    const yEnd = targetRect.top + targetRect.height / 2;

    // Interpolate positions
    const currentX = xStart + (xEnd - xStart) * ratio;
    const currentY = yStart + (yEnd - yStart) * ratio;

    // Scale interpolation (starts at 1.0, ends at endScale)
    const targetEndScale = viewportWidth < 768 ? 0.33 : this.endScale;
    const currentScale = 1 + (targetEndScale - 1) * ratio;

    // Apply transform using translate3d for GPU acceleration
    this.logo.style.left = '0px';
    this.logo.style.top = '0px';
    this.logo.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${currentScale})`;

    // Logo image filter transition: white on hero, natural brown in navbar
    this.updateLogoAppearance(ratio, rawRatio);

    // Fade out scroll indicator as user scrolls
    this.updateScrollIndicator(rawRatio);
  }

  /**
   * Updates the logo image filter based on animation progress.
   * At ratio < 0.7: white inverted logo for dark hero background.
   * At ratio >= 0.7: gradually transitions to natural brown color.
   */
  updateLogoAppearance(ratio, rawRatio) {
    if (!this.logoImg) return;

    const isDocked = rawRatio >= this.dockThreshold;
    this.header.classList.toggle('logo-docked', isDocked);
    this.logo.style.opacity = isDocked ? '0' : '1';

    if (ratio >= 0.8) {
      this.header.classList.add('scrolled');
      this.logoImg.style.filter = 'none';
    } else if (ratio >= 0.5) {
      // Gradual transition zone between white and brown
      this.header.classList.add('scrolled');
      const transitionProgress = (ratio - 0.5) / 0.3; // 0 to 1 within 0.5-0.8 range
      const invertAmount = 1 - transitionProgress;
      this.logoImg.style.filter = `brightness(${transitionProgress + invertAmount * 0}) invert(${invertAmount}) drop-shadow(0 4px 16px rgba(20, 26, 22, ${0.4 * invertAmount}))`;
    } else {
      this.header.classList.remove('scrolled');
      this.logoImg.style.filter = 'brightness(0) invert(1) drop-shadow(0 4px 24px rgba(20, 26, 22, 0.5))';
    }
  }

  /**
   * Fades out the scroll indicator as the user begins scrolling.
   */
  updateScrollIndicator(rawRatio) {
    if (!this.scrollIndicator) return;
    const indicatorOpacity = Math.max(1 - rawRatio * 4, 0);
    this.scrollIndicator.style.opacity = indicatorOpacity;
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
}
