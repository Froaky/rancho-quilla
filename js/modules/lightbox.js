/**
 * Visor de fotos
 *
 * Se abre al hacer click o con Enter/Espacio, no al pasar el mouse.
 * El visor anterior se abría en `mouseenter`: se disparaba sin
 * intención, era imposible de usar con teclado y en táctil no había
 * forma de dispararlo ni de cerrarlo.
 *
 * Las fotos están agrupadas por casa (una pared por casa). El visor
 * respeta ese agrupamiento: las flechas recorren las fotos de LA
 * MISMA casa y no se van a la de al lado. Si estoy mirando La Cabaña,
 * quiero ver La Cabaña.
 *
 * - Flechas ← → para recorrer, Escape para cerrar.
 * - Foco atrapado mientras está abierto y devuelto al cerrar.
 * - El visor se arma una sola vez y se reutiliza para todos los grupos.
 */

export function initLightbox() {
  const walls = Array.from(document.querySelectorAll('.wall'));
  if (!walls.length) return;

  /* Nombre del grupo: se toma del encabezado que precede a la pared,
     así el visor puede decir de qué casa es la foto que se está
     mirando sin que haya que repetirlo en cada figura. */
  const nombreDeGrupo = (wall) => {
    const seccion = wall.closest('section');
    const propio = wall.previousElementSibling?.querySelector('h3');
    if (propio) return propio.textContent.trim();
    const h2 = seccion?.querySelector('h2');
    return h2 ? h2.textContent.trim() : '';
  };

  const grupos = walls
    .map((wall) => {
      const nombre = nombreDeGrupo(wall);
      const fotos = Array.from(wall.querySelectorAll('.plate'))
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
            texto: ficha?.querySelector('span:last-child')?.textContent?.trim() || ''
          };
        })
        .filter(Boolean);
      return { nombre, fotos };
    })
    .filter((g) => g.fotos.length);

  if (!grupos.length) return;

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
  const botones = Array.from(box.querySelectorAll('.lightbox__btn'));

  let grupo = grupos[0];
  let i = 0;
  let opener = null;

  const mostrar = (idx) => {
    const fotos = grupo.fotos;
    i = (idx + fotos.length) % fotos.length;
    const f = fotos[i];
    elImg.src = f.src;
    elImg.alt = f.alt;
    elN.textContent = f.n;
    elText.textContent = f.texto;
    // El contador dice de qué casa es y en qué foto de esa casa estamos.
    elCount.textContent = grupo.nombre
      ? `${grupo.nombre} · ${i + 1} / ${fotos.length}`
      : `${i + 1} / ${fotos.length}`;
    // Con una sola foto en el grupo, las flechas no tienen sentido.
    botones
      .filter((b) => b.dataset.act === 'prev' || b.dataset.act === 'next')
      .forEach((b) => { b.hidden = fotos.length < 2; });
  };

  const abrir = (g, idx, trigger) => {
    grupo = g;
    opener = trigger;
    mostrar(idx);
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

  const cerrar = () => {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    const listo = () => {
      box.hidden = true;
      box.removeEventListener('transitionend', listo);
    };
    box.addEventListener('transitionend', listo);
    // Red de seguridad si no hay transición (reduced motion).
    setTimeout(listo, 400);
    if (opener instanceof HTMLElement) opener.focus();
  };

  /* --- Disparadores ---------------------------------------------- */

  grupos.forEach((g) => {
    g.fotos.forEach((f, idx) => {
      f.trigger.addEventListener('click', () => abrir(g, idx, f.trigger));
    });
  });

  box.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'next') return mostrar(i + 1);
    if (act === 'prev') return mostrar(i - 1);
    if (act === 'close') return cerrar();
    // Click en el fondo cierra; click en la foto o la barra, no.
    if (!e.target.closest('.lightbox__frame')) cerrar();
  });

  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;

    if (e.key === 'Escape') return cerrar();
    if (e.key === 'ArrowRight') return mostrar(i + 1);
    if (e.key === 'ArrowLeft') return mostrar(i - 1);

    // Foco atrapado: mientras el visor está abierto el tabulador no
    // se escapa al fondo de la página.
    if (e.key === 'Tab') {
      const visibles = botones.filter((b) => !b.hidden);
      const primero = visibles[0];
      const ultimo = visibles[visibles.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    }
  });
}
