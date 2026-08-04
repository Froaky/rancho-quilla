/**
 * Rancho Quilla · punto de entrada
 *
 * Cuatro módulos, ninguna dependencia externa. Cada uno se degrada
 * solo: si el navegador no soporta algo, el contenido sigue accesible.
 */

import { initNav } from './modules/nav.js';
import { initLogoDock } from './modules/logo-dock.js';
import { initLightbox } from './modules/lightbox.js';
import { initReveal } from './modules/reveal.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

const boot = () => {
  initNav();
  initLogoDock({ reduced });
  initLightbox();
  initReveal({ reduced });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
