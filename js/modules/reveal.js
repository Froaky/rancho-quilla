/**
 * Entrada al viewport
 *
 * Un desplazamiento de 10px y opacidad, una sola vez por elemento.
 * Sin escalas, sin rebotes y sin retardos escalonados: el original
 * encadenaba hasta 6 elementos con 55ms de retraso cada uno, lo que
 * en mobile se sentía como que la página cargaba de a pedazos.
 */

export function initReveal({ reduced }) {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  // Sin IntersectionObserver o con menos movimiento pedido: se muestra
  // todo de una y no se observa nada.
  if (reduced.matches || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
  );

  els.forEach((el) => io.observe(el));

  // Si el usuario cambia la preferencia con la página abierta, se
  // deja todo visible.
  reduced.addEventListener('change', (e) => {
    if (e.matches) els.forEach((el) => el.classList.add('is-in'));
  });
}
