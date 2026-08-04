/**
 * Visor de fotos
 *
 * Se abre al hacer click o con Enter/Espacio, no al pasar el mouse.
 * El visor anterior se abría en `mouseenter`: se disparaba sin
 * intención, era imposible de usar con teclado y en táctil no había
 * forma de dispararlo ni de cerrarlo.
 *
 * - Flechas ← → para recorrer, Escape para cerrar.
 * - Foco atrapado mientras está abierto y devuelto al cerrar.
 * - El visor se arma una sola vez y se reutiliza.
 */

export function initLightbox() {
  /* La galería está dividida en grupos (una casa por grupo), cada uno
     con su propia pared. El visor recorre las tres como un solo
     conjunto, y por eso la numeración de las fichas es continua:
     así el número de la ficha y el contador del visor coinciden. */
  const galeria = document.getElementById('galeria');
  if (!galeria) return;

  const figures = Array.from(galeria.querySelectorAll('.plate'));
  const items = figures
    .map((fig) => {
      const img = fig.querySelector('img');
      const trigger = fig.querySelector('[data-zoom]');
      const ficha = fig.querySelector('.plate__ficha');
      if (!img || !trigger) return null;
      return {
        trigger,
        src: img.currentSrc || img.src,
        alt: img.alt || '',
        n: ficha?.querySelector('.plate__n')?.textContent?.trim() || '',
        text: ficha?.querySelector('span:last-child')?.textContent?.trim() || ''
      };
    })
    .filter(Boolean);

  if (!items.length) return;

  /* --- Se arma el visor una sola vez ----------------------------- */

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Foto ampliada');
  box.hidden = true;
  box.innerHTML = `
    <div class="lightbox__frame">
      <img class="lightbox__img" alt="">
      <div class="lightbox__bar">
        <div class="lightbox__ficha">
          <b class="lightbox__n"></b>
          <span class="lightbox__text"></span>
        </div>
        <div class="lightbox__nav">
          <span class="lightbox__count" aria-live="polite"></span>
          <button class="lightbox__btn" type="button" data-act="prev" aria-label="Foto anterior">
            <svg class="icon" aria-hidden="true"><use href="#i-prev"></use></svg>
          </button>
          <button class="lightbox__btn" type="button" data-act="next" aria-label="Foto siguiente">
            <svg class="icon" aria-hidden="true"><use href="#i-next"></use></svg>
          </button>
          <button class="lightbox__btn" type="button" data-act="close" aria-label="Cerrar el visor">
            <svg class="icon" aria-hidden="true"><use href="#i-close"></use></svg>
          </button>
        </div>
      </div>
    </div>`;

  document.body.appendChild(box);

  const elImg = box.querySelector('.lightbox__img');
  const elN = box.querySelector('.lightbox__n');
  const elText = box.querySelector('.lightbox__text');
  const elCount = box.querySelector('.lightbox__count');
  const btnClose = box.querySelector('[data-act="close"]');
  const buttons = Array.from(box.querySelectorAll('.lightbox__btn'));

  let current = 0;
  let opener = null;

  const show = (i) => {
    current = (i + items.length) % items.length;
    const it = items[current];
    elImg.src = it.src;
    elImg.alt = it.alt;
    elN.textContent = it.n;
    elText.textContent = it.text;
    elCount.textContent = `${current + 1} / ${items.length}`;
  };

  const open = (i, trigger) => {
    opener = trigger;
    show(i);
    box.hidden = false;
    /* Primer reflow: fija el estado de partida (opacity 0) para que la
       transición tenga de dónde salir. Con requestAnimationFrame no
       alcanza — en una pestaña que no compone, rAF puede no dispararse
       nunca y el visor queda abierto pero invisible, tapando la
       página. Leer offsetWidth es sincrónico y siempre funciona. */
    void box.offsetWidth;
    box.classList.add('is-open');
    /* Segundo reflow: deja aplicado el estado final ANTES de mover el
       foco. Sin esto, el foco puede caer en un elemento que el motor
       todavía considera no renderizado, y el teclado se queda atrás
       en la página de fondo. */
    void box.offsetWidth;
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  };

  const close = () => {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    const done = () => {
      box.hidden = true;
      box.removeEventListener('transitionend', done);
    };
    box.addEventListener('transitionend', done);
    // Red de seguridad si no hay transición (reduced motion).
    setTimeout(done, 400);
    if (opener instanceof HTMLElement) opener.focus();
  };

  /* --- Disparadores ---------------------------------------------- */

  items.forEach((it, i) => {
    it.trigger.addEventListener('click', () => open(i, it.trigger));
  });

  box.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'next') return show(current + 1);
    if (act === 'prev') return show(current - 1);
    if (act === 'close') return close();
    // Click en el fondo cierra; click en la foto o la barra, no.
    if (!e.target.closest('.lightbox__frame')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;

    if (e.key === 'Escape') return close();
    if (e.key === 'ArrowRight') return show(current + 1);
    if (e.key === 'ArrowLeft') return show(current - 1);

    // Foco atrapado: mientras el visor está abierto el tabulador no
    // se escapa al fondo de la página.
    if (e.key === 'Tab') {
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
