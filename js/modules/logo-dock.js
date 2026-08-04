/**
 * Logo en vuelo
 *
 * Se conserva del sitio original: era lo único propio que tenía.
 * El logo arranca en su hueco de la portada y aterriza en la ranura
 * del índice.
 *
 * Qué se corrigió respecto de la versión anterior:
 *  - Antes la portada reservaba `margin-top: 210px` fijo para dejarle
 *    lugar, lo que dejaba el 40% de la primera pantalla vacío y
 *    empujaba el título y el CTA fuera de la vista. Ahora el punto de
 *    partida se mide sobre un hueco real (.portada__logo-slot), así
 *    que no hay espacio muerto.
 *  - La posición de salida se calculaba con fracciones del viewport
 *    (`innerHeight * 0.33`); ahora se lee del layout, y por eso no se
 *    descoloca en pantallas raras ni al rotar el teléfono.
 *  - Este módulo es el único dueño de `is-docked` / `is-landed`.
 */

export function initLogoDock({ reduced }) {
  const flight = document.getElementById('logo-flight');
  const slot = document.querySelector('.portada__logo-slot');
  const target = document.querySelector('.nav__slot');
  const nav = document.getElementById('nav');

  if (!flight || !nav) return;

  /* Si el usuario pidió menos movimiento, o falta alguna pieza, no hay
     vuelo: el logo del índice queda visible y el de la portada se va.
     El índice se apoya en papel en cuanto se sale de la portada. */
  const land = () => {
    flight.style.display = 'none';
    nav.classList.add('is-docked', 'is-landed');
  };

  if (!slot || !target) {
    land();
    return;
  }

  if (reduced.matches) {
    land();
    // Aun sin vuelo hay que decidir cuándo el índice pasa a papel.
    const plain = () => {
      const out = window.scrollY > slot.offsetTop;
      nav.classList.toggle('is-docked', out);
    };
    plain();
    window.addEventListener('scroll', plain, { passive: true });
    return;
  }

  /* --------------------------------------------------------------- */

  let from = null;   // rectángulo de partida, en coordenadas de documento
  let to = null;     // rectángulo de llegada (el índice es fixed)
  let range = 380;   // px de scroll que dura el vuelo
  let ticking = false;

  const measure = () => {
    const s = slot.getBoundingClientRect();
    const t = target.getBoundingClientRect();

    from = { x: s.left + window.scrollX, y: s.top + window.scrollY, w: s.width, h: s.height };
    to = { x: t.left, y: t.top, w: t.width, h: t.height };

    // El vuelo dura lo que tarda el hueco en llegar al índice, con un
    // mínimo cómodo para que no se sienta abrupto en pantallas chicas.
    range = Math.max(300, Math.min(560, from.y + s.height * 0.5));

    // El logo en vuelo mide lo mismo que su hueco.
    flight.style.width = `${s.width}px`;
  };

  // Curva de salida: arranca rápido y frena al aterrizar.
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const draw = () => {
    if (!from || !to) return;

    const scrolled = window.scrollY;
    const raw = Math.min(Math.max(scrolled / range, 0), 1);
    const p = ease(raw);

    /* Escala final: el logo tiene que entrar en la ranura por los DOS
       lados. Limitándolo sólo por el ancho, el logo (proporción
       1.86:1) queda 25px más alto que la ranura y se derrama fuera
       del índice. */
    const endScale = Math.min(to.w / from.w, to.h / from.h, 1);
    const scale = 1 + (endScale - 1) * p;

    // Punto de partida en coordenadas de ventana (el logo es fixed).
    const startX = from.x;
    const startY = from.y - scrolled;

    // Punto de llegada: centrado en la ranura, en los dos ejes.
    const endX = to.x + (to.w - from.w * endScale) / 2;
    const endY = to.y + (to.h - from.h * endScale) / 2;

    const x = startX + (endX - startX) * p;
    const y = startY + (endY - startY) * p;

    flight.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

    /* Tinta del logo e índice, sincronizados.
       A mitad de camino el logo pasa de papel a tinta y el índice se
       apoya en papel opaco. Si estas dos cosas se desincronizan queda
       un logo blanco sobre fondo blanco: por eso las decide el mismo
       módulo, en la misma línea. */
    const onPaper = raw >= 0.5;
    flight.classList.toggle('logo-flight--invert', !onPaper);
    nav.classList.toggle('is-docked', onPaper);

    // Aterrizado: se apaga el logo en vuelo y se enciende el del índice.
    const landed = raw >= 0.995;
    nav.classList.toggle('is-landed', landed);
    flight.style.opacity = landed ? '0' : '1';
    flight.style.visibility = landed ? 'hidden' : 'visible';
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      draw();
      ticking = false;
    });
  };

  const onResize = () => {
    measure();
    draw();
  };

  // El vuelo depende de dónde cae el hueco, y eso cambia cuando entran
  // las tipografías (el título se recompone y todo se corre).
  measure();
  draw();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize);

  if (document.fonts?.ready) document.fonts.ready.then(onResize);

  // El logo del sprite puede cargar después del primer cálculo.
  const img = flight.querySelector('img');
  if (img && !img.complete) img.addEventListener('load', onResize, { once: true });
}
