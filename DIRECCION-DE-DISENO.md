# Rancho Quilla — «El Cuaderno del Rancho»

Documento de dirección de arte. Leer antes de tocar el diseño o de agregar
componentes.

---

## Tesis visual

> Esta página se siente como **el cuaderno donde el dueño anotó todo lo que hay
> en la casa**, porque ayuda a las personas a **saber exactamente qué van a
> encontrar, y cuánto sale, antes de tener que preguntar**.

De dónde sale: el contenido real de este proyecto no es aspiracional, es
obsesivamente concreto — 12 personas, dos kayaks *o* un bote doble, TV de 50
pulgadas con DIRECTV, ingreso 12:00, traé tus toallas, $250.000 por día. La
forma honesta de eso no es una tarjeta con un ícono: es **un asiento de
cuaderno**.

Todas las decisiones que siguen responden a esa tesis.

---

## De dónde salió cada decisión

Nada de esto se eligió por tendencia. Cada cosa tiene un origen físico en el
material real del proyecto.

| Decisión | Origen |
| --- | --- |
| Tinta `#47240b` | Medida sobre `logo.png`: es el único color del archivo (3,4 M de px de una sola tinta). |
| Serif de alto contraste | El wordmark del logo es una serif de contraste alto con terminales de gota. |
| Monoespaciada para datos | Un libro de cuentas se escribe a máquina, y los dígitos tienen que alinear en columna. |
| Verde `#1b6b45` | La pintura real del sulky, la bomba de agua y el arado del jardín (`casa-rustica-frente-rancho-quilla.webp`). |
| Terracota `#9c4a2a` | El ladrillo a la vista del quincho. |
| Papel `#f4eee2` (nunca blanco) | Evita que la maqueta de filetes caiga en "editorial genérico blanco y negro". |
| Numeración `01–05`, con `02.1/02.2/02.3` | La página es un inventario; un inventario se numera. Las tres casas son sub-entradas de la misma cuenta. |
| El numeral de capacidad (`12`, `6`, `2`) en grande | Es lo que distingue una casa de otra de un vistazo. No hay que inventar un ícono: el número ya lo dice. |
| Nombre propio por casa | Rancho Quilla, Mate Luna, Ranchito. Son los nombres reales que usa el dueño, y un nombre se recuerda y se recomienda; un tamaño no. |
| Paspartú + ficha en las fotos | La pared del quincho está cubierta de cuadros. Y resuelve un problema real: las fotos son de teléfono a pleno sol, y un marco las vuelve intencionales. |
| Desfase de medio módulo | Aparejo de ladrillo del quincho. |
| Capítulos dentro de una pared larga | Un álbum de veinte fotos se hojea por temas, no de corrido. Y once de las veinte de Rancho Quilla comparten proporción exacta: sin cortes se leen como una hilera. |
| Radio de borde `0` | El papel no tiene esquinas redondeadas. |
| Sin overlay en las fotos | Las fotos honestas son el activo que no se puede falsificar. La versión anterior las tapaba con negro al 86%. |

---

## Reglas que no son obvias

1. **Ningún bloque de contenido se convierte en tarjeta.** El contenido apoya
   sobre filetes. Los únicos elementos enmarcados son los que representan algo
   físicamente enmarcado: las fotos y el visor.
2. **El verde significa "se puede tocar".** Es la única regla de color de la
   interfaz. Nada que no sea accionable puede ser verde — ni un ícono, ni un
   título, ni un borde decorativo.
3. **La terracota nunca va en un botón.** Marca secciones y números. No se toca.
4. **El celeste sólo aparece en datos de agua** (pileta, kayaks, bote, muelle).
5. **Un solo radio: `0`.** Excepción declarada y única: `--radius-lens` (2px) en
   el visor de fotos.
6. **Un solo grosor de filete** (`--rule`) y un solo filete fuerte
   (`--rule-bold`) para cerrar bloques y marcar estado activo.
7. **Ningún estado se comunica sólo con color.** El activo del índice lleva
   `aria-current` + filete. El FAQ abierto rota una marca. El aviso lleva la
   palabra "Importante".
8. **No hay animación permanente.** El movimiento sólo explica estado, causa o
   relación.
9. **Las secciones no comparten maqueta.** Cada una tiene la suya, a propósito.
10. **Una pared de más de ~15 fotos se parte en capítulos.** Con el mismo filete
    y etiqueta de los grupos del inventario, y la primera lámina de cada
    capítulo a doble ancho. Sigue siendo **una sola** `.wall` para que el visor
    recorra la casa entera. Se aplica sólo donde hace falta: Rancho Quilla (20)
    sí, Mate Luna (12) y Ranchito (8) no.
    Ojo: en una pared con capítulos el desfase alternado se desactiva
    (`.wall:not(.wall--agrupada)`), porque el `nth-child` cuenta también los
    encabezados y el escalonado sale al azar.

---

## Sistema

### Color

Ver `css/tokens.css`; cada token lleva su función anotada. Resumen:

- `--ink #47240b` — texto y filetes. Único negro del sitio.
- `--ink-70 #6b4a32` — texto secundario (6,9:1).
- `--ink-45 #8f7460` — **sólo** texto grande y marcas (3,8:1). Nunca cuerpo.
- `--ink-20 / --ink-10` — filetes.
- `--paper #f4eee2` / `--paper-2 #ebe1cf` / `--paper-3 #ded1b8`
- `--night #2a1607` — sólo portada, sección de consulta y pie.
- `--verde #1b6b45` — **sólo** acciones (6,5:1 con blanco).
- `--ladrillo #9c4a2a` — sólo secciones y números.
- `--agua #4d6c7b` — sólo datos de agua.
- `--alerta #8a3a1e` — avisos y excedentes.

### Tipografía

| Rol | Familia | Uso |
| --- | --- | --- |
| Display | Playfair Display | Títulos, nombres de casa, preguntas |
| Datos | IBM Plex Mono | Etiquetas, números, precios, botones, índice |
| Cuerpo | IBM Plex Serif | Párrafos, valores de renglón |

Escala corta a propósito (`--t-display` … `--t-label`): en un cuaderno la
jerarquía la marcan el filete y la sangría, no doce tamaños de letra.

`font-variant-numeric: tabular-nums` en todo el documento, para que los números
alineen.

### Espacio

- `--row: 1.5rem` es **la unidad del renglón**. Todo el ritmo vertical es
  múltiplo de ella.
- `--measure: 34rem` — ningún párrafo pasa de ahí (~68 caracteres).
- Ritmo entre secciones: **tres** densidades (`--band-dense`, `--band-open`,
  `--band-quiet`), aplicadas a mano. No hay un padding por defecto para todas.

---

## Firma visual

Tres, y las tres se reconocen sin logo y sin color:

1. **El filete de 2px interrumpido por un número de dos dígitos.** Abre cada
   sección. `.rule` + `.rule__n` + `.rule__label`.
2. **El paspartú con ficha numerada** en cada imagen. `.plate` + `.plate__mat` +
   `.plate__ficha`.
3. **El numeral de capacidad** al frente de cada ficha de casa: `12`, `6`, `2`
   en Playfair a 144px. `.casa-head__cap`. Es lo que distingue una casa de otra
   de un vistazo, y sale del único dato que de verdad las diferencia.

   Al lado va el **nombre propio** (Rancho Quilla, Mate Luna, Ranchito) y un
   subtítulo de una línea que dice cuál es cuál. Ese subtítulo no es decorativo:
   «Rancho Quilla» es a la vez el predio y la casa grande, y sin esa línea el
   visitante no sabe si está mirando el lugar o una de las tres casas.

Al tocar una lámina, se despega 2px del papel y aparece una sombra **dura**
(`4px 4px 0`), como algo que efectivamente está colgado. No es un blur difuso.

---

## Identidad verbal

**Voz:** la del dueño que atiende el teléfono. Enunciativa: dice qué hay, no cómo
te vas a sentir.

**Formalidad:** media-baja, voseo argentino. "Alquilás", "traé", "avisá",
"consultá".

**Titulares:** nombran cosas, no beneficios. Sustantivos concretos.
*"Ladrillo, piedra y una mesa larga"*, *"Qué hay, anotado"*, *"Antes de venir"*.

**Largo:** párrafos de 2 a 4 líneas. Ninguno más largo.

**Vocabulario propio** (del lugar, real): quincho, horno de barro, cancana,
costillar a la estaca, sobremesa, muelle, orilla, dique, laja, algarrobo,
piletín, piedra bola, caseros, predio, sulky.

**Llamadas a la acción:** verbo + objeto concreto. "Consultar disponibilidad",
"Escribir por WhatsApp", "Ver las tres casas".

**Cómo se presentan los servicios:** como inventario. Cantidad + cosa.
"TV de 50 pulgadas con DIRECTV", no "entretenimiento de primer nivel".

### Prohibido escribir

- "experiencia única", "rincón mágico", "escapada soñada", "desconectate"
- "el lugar ideal para", "vivilo", "el futuro de", "revolucioná"
- Cualquier superlativo sin dato que lo respalde.
- Cualquier frase que sirva igual para otro alojamiento del país.
- **Testimonios, métricas, premios o clientes inventados.** Nunca.

---

## Cómo se extiende

- **Página interna** (una casa): la ficha de Mate Luna o Ranchito se convierte en
  página propia sin
  cambiar nada de su anatomía — numeral de capacidad, nombre propio, subtítulo,
  precio, inventario, pared de fotos. Ya está diseñada como unidad autónoma.
- **Una casa nueva:** se agrega como `02.4` con su numeral y su pared. El sistema
  no necesita nada más.
- **Placa para redes:** tinta `#47240b` sobre papel, el filete de 2px con el
  número arriba, un dato grande en monoespaciada, la foto con paspartú abajo.
- **Miniatura:** el filete + el número alcanzan para reconocerla.
- **Mobile:** el cuaderno ya es una columna. La etiqueta pasa arriba del valor, y
  la pared de fotos conserva el desfase como sangría alternada.
