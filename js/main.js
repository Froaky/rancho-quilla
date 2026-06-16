/**
 * Rancho Quilla - Main JavaScript Entrypoint
 */

import { ScrollAnimator } from './utils/scroll-animator.js';
import { RevealOnScroll } from './utils/reveal-on-scroll.js';
import { Navbar } from './components/navbar.js';
import { Carousel } from './components/carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
  new ScrollAnimator();
  new Carousel();
  new RevealOnScroll();
});
