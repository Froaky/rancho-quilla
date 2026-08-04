/**
 * Índice / navegación
 *
 * - Cajón lateral en mobile, con foco atrapado y Escape para cerrar.
 * - Marca la sección activa con aria-current (no sólo con color).
 * - Muestra el WhatsApp fijo recién al salir de la portada, para no
 *   tapar la primera pantalla.
 */

export function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('nav-burger');
  const index = document.getElementById('nav-index');
  const waFloat = document.getElementById('wa-float');
  const portada = document.getElementById('portada');

  if (!nav || !burger || !index) return;

  const links = Array.from(index.querySelectorAll('.nav__link'));

  /* ---------------------------------------------------------------
     Cajón lateral
     --------------------------------------------------------------- */

  const isDrawer = () => window.matchMedia('(max-width: 60rem)').matches;

  let lastFocused = null;

  const openDrawer = () => {
    lastFocused = document.activeElement;
    index.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Cerrar el índice');
    document.body.style.overflow = 'hidden';
    links[0]?.focus();
  };

  const closeDrawer = ({ restoreFocus = false } = {}) => {
    if (!index.classList.contains('is-open')) return;
    index.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir el índice');
    document.body.style.overflow = '';
    if (restoreFocus) (lastFocused instanceof HTMLElement ? lastFocused : burger).focus();
  };

  burger.addEventListener('click', () => {
    index.classList.contains('is-open') ? closeDrawer({ restoreFocus: true }) : openDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer({ restoreFocus: true });

    // Foco atrapado mientras el cajón está abierto.
    if (e.key === 'Tab' && index.classList.contains('is-open')) {
      const focusables = [burger, ...links];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Al pasar a desktop, el cajón deja de existir: hay que limpiar
  // el overflow del body o la página queda trabada.
  window.matchMedia('(max-width: 60rem)').addEventListener('change', () => closeDrawer());

  /* ---------------------------------------------------------------
     Navegación a la sección
     Se deja que el navegador haga el scroll (html tiene
     scroll-behavior y scroll-padding-top), así respeta
     prefers-reduced-motion sin código extra.
     --------------------------------------------------------------- */

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (isDrawer()) closeDrawer();
    });
  });

  /* ---------------------------------------------------------------
     Sección activa
     --------------------------------------------------------------- */

  const targets = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((link) => {
      const on = link.getAttribute('href') === `#${id}`;
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window && targets.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        // Se toma la entrada visible más cercana al tope de la
        // ventana, para que no "pelee" cuando dos secciones se
        // solapan en pantallas altas.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    targets.forEach((t) => spy.observe(t));
  }

  /* ---------------------------------------------------------------
     WhatsApp fijo: aparece al salir de la portada.
     (El estado `is-docked` del índice lo maneja logo-dock.js, que
     necesita sincronizarlo con el aterrizaje del logo. Un mismo
     estado con dos dueños es un error de sincronía esperando.)
     --------------------------------------------------------------- */

  if (!waFloat) return;

  if (!portada || !('IntersectionObserver' in window)) {
    waFloat.classList.add('is-shown');
    return;
  }

  const portadaWatch = new IntersectionObserver(
    ([entry]) => waFloat.classList.toggle('is-shown', !entry.isIntersecting),
    { threshold: 0.12 }
  );

  portadaWatch.observe(portada);
}
