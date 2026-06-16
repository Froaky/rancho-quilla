/**
 * Rancho Quilla - Main JavaScript Entrypoint
 */

import { ScrollAnimator } from './utils/scroll-animator.js';
import { Navbar } from './components/navbar.js';
import { Carousel } from './components/carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation component
  const navbar = new Navbar();
  
  // Initialize scroll-linked logo animator
  const scrollAnimator = new ScrollAnimator();
  
  // Initialize interactive slider
  const carousel = new Carousel();
  
  console.log('Rancho Quilla site successfully initialized.');
});
