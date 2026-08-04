# Rancho Quilla — Contexto del Proyecto

Landing de **Rancho Quilla**: tres casas de campo independientes, de alquiler
temporario, a la orilla del **Dique Cabra Corral, Salta**.

## Objetivo

Atraer búsquedas locales y convertir visitas en consultas por WhatsApp.

Keywords principales:

- alquiler de casa en Dique Cabra Corral
- alquiler de cabañas en Salta
- cabaña en Cabra Corral
- casa con pileta en Salta
- precios alquiler Cabra Corral

## Dirección de diseño

La página sigue la dirección **«El Cuaderno del Rancho»**, documentada en
`DIRECCION-DE-DISENO.md`. **Leerla antes de agregar cualquier componente**,
porque tiene reglas que no son obvias:

- Ningún bloque de contenido se convierte en tarjeta. El contenido apoya sobre
  filetes de 1px.
- Un solo radio de borde: `0`. La única excepción declarada es el visor de fotos.
- El verde (`--verde`) significa **"se puede tocar"**. Nada que no sea accionable
  puede ser verde.
- La tinta de la marca es `#47240b`, medida del archivo `logo.png`. Es el único
  negro del sitio.
- Firma visual: el filete de 2px interrumpido por un número de dos dígitos.

## Datos comerciales

### Precios — FUENTE DE VERDAD

| Casa              | Máximo      | Por día  |
| ----------------- | ----------- | -------- |
| La Casa Grande    | 12 personas | $250.000 |
| La Cabaña         | 6 personas  | $120.000 |
| La Cabaña chica   | 2 personas  | $50.000  |
| Persona excedente | —           | $20.000  |

- El excedente se cobra **por persona y por día**, por encima del máximo de cada casa.
- **Vigencia: hasta el 31 de agosto de 2026.**

Cuando cambien los precios hay que tocar **seis lugares**:

1. La tabla `.tarifas` en `index.html` (sección `#precios`).
2. El renglón "Desde" de la portada.
3. La respuesta 01 del FAQ (`#antes`).
4. Los dos bloques JSON-LD del `<head>`: `priceRange`, `makesOffer[].price`,
   `makesOffer[].priceValidUntil` y el texto de la primera pregunta del `FAQPage`.
5. El sello de vigencia: `.vigencia` en `#precios` y `.footer__copy`.
6. Si cambia el depósito de garantía: pregunta 07 del FAQ y el `FAQPage` del JSON-LD.

### Qué incluye

- Tres casas independientes entre sí. Se alquila la casa entera, nunca una habitación.
- Quincho grande con mesa larga.
- Pileta y piletín para chicos.
- Cocina equipada, heladera, freezer y utensilios.
- Ropa de cama incluida.
- TV de 50 pulgadas con DIRECTV. Metegol, pool y ping pong.
- Dos kayaks o un bote doble, sin cargo, para pesca o navegación.
- Horno de barro, asadores y patio de cancana para costillar a la estaca.
- Hogar a leña. Muelle propio.
- Mascotas bienvenidas (avisando al consultar).
- Caseros viviendo en el predio todo el año.

### La Cabaña chica (2 personas) — ficha propia

Datos tomados de la ficha del dueño (`Ranchito.pdf`, agosto 2026):

- Cama matrimonial con ropa de cama incluida.
- Agua caliente con **termotanque a leña**.
- Heladera, microondas y pava eléctrica.
- Horno de barro y asador. **Conviene traer leña.**
- Piletón propio al lado de la cabaña.
- DirecTV, con la **recarga a cargo del huésped**.
- Estacionamiento al lado de la cabaña.
- Acceso independiente al dique. Espacio 100% privado.
- **Depósito de garantía $20.000**, se devuelve 48 h después de terminar la estadía.
- Se aceptan **dólares a la mejor cotización**.

⚠️ El depósito de garantía de $20.000 y el adicional de $20.000 por persona
excedente son **dos cosas distintas** que coinciden en el monto. No unificarlas.
El depósito está documentado sólo para La Cabaña chica; falta confirmar si
aplica a las otras dos.

### Condiciones (de la ficha del dueño)

- No se responde por inclemencias del tiempo.
- No se responde por cortes de agua o de luz de la empresa distribuidora.
- Cada persona es responsable de sus cuidados al ingresar a la pileta y al dique.

### Reglas de la estadía

- Ingreso 12:00, salida 11:00.
- **El huésped lleva sus toallas y su papel higiénico.**

## Ubicación

Referencia de orientación real: **a minutos de Los Mayuatos** (la salida de los
catamaranes), **antes de llegar a Coronel Moldes**. La dirección exacta se pasa
al confirmar la reserva.

## Fotos

- `assets/images/rancho/*` sin prefijo → **La Casa Grande** (16 en la galería).
- `assets/images/rancho/cabania-chica-*` → **La Cabaña chica** (8 en la galería).
- `muelle-*`, `bote-*`, `kayak-*`, `atardecer-*` → **el dique**, comunes a las tres.
- **La Cabaña (6 personas) no tiene fotos.** La galería lo dice explícitamente en
  lugar de rellenar con fotos de las otras.
- Todas a máximo 1400px de ancho y WebP q80. El visor las muestra a ~1000px como
  máximo, así que subir de 1400 sólo agrega peso.
- `atardecer-pesca-dique-cabra-corral.webp` está recortada a propósito para
  quitar una botella de marca que había en el cuadro original.

⚠️ El PDF del dueño traía además un meme de un pug y una foto de comida bajada de
internet. **No se usaron**: la página sólo lleva fotos reales del lugar.

## Pendientes

- WhatsApp de reservas: `5493874830580` (+54 9 3874 83-0580). Aparece en **5**
  enlaces de `index.html`; si cambia, buscar el número y reemplazar en todos.
- Cuando exista dominio definitivo: `canonical`, `og:url`, `og:image` absoluta,
  `sitemap.xml` y alta en Google Search Console.
- Sumar reseñas **reales** cuando existan. No inventar ninguna: hoy la página no
  tiene sección de testimonios y eso es deliberado.
- Confirmar si el depósito de garantía de $20.000 aplica también a La Casa
  Grande y a La Cabaña, o sólo a La Cabaña chica.
- Conseguir fotos y ficha de **La Cabaña (6 personas)**: es la única de las tres
  que no tiene nada publicado.
- Confirmar si la referencia "a minutos de Los Mayuatos, antes de Coronel Moldes"
  vale para el predio entero o sólo para La Cabaña chica.

## Estructura técnica

Sitio estático. Sin build, sin dependencias, sin gestor de paquetes.

```
index.html
css/
  tokens.css       # variables: color, tipografía, espacio, trazo
  base.css         # reset, tipografía, accesibilidad, maqueta, firma visual
  components.css   # índice, botones, renglón, tarifas, lámina, visor
  sections.css     # una maqueta propia por sección
js/
  main.js
  modules/
    nav.js         # cajón móvil, sección activa, WhatsApp fijo
    logo-dock.js   # vuelo del logo (único dueño de is-docked / is-landed)
    lightbox.js    # visor de fotos
    reveal.js      # entrada al viewport
assets/
  images/rancho/   # fotos reales, WebP, nombres con keywords
  videos/          # recorridos
```

Las hojas de estilo se enlazan **en paralelo con `<link>`**. No usar `@import`:
la versión anterior encadenaba `link → main.css → @import → @import Google
Fonts`, tres saltos en serie antes de descargar una sola letra.

## Notas de implementación

Cosas que ya se rompieron una vez y no conviene volver a romper:

- El vuelo del logo mide su punto de partida sobre un hueco real
  (`.portada__logo-slot`), no con fracciones del viewport. La escala final está
  limitada **por ancho y por alto**: el logo tiene proporción 1.86:1, y
  limitándolo sólo por ancho se derrama 25px fuera del índice.
- `overflow-x: clip` va en `html`. No poner `overflow-x: hidden` en `body`:
  convierte al body en contenedor de scroll, rompe `position: sticky` (la
  columna de precios lo usa) y desincroniza `window.scrollY`.
- El visor de fotos **no** usa `visibility: hidden` para el estado cerrado: un
  elemento con `visibility: hidden` no puede recibir foco, y el `focus()` de
  apertura quedaba en no-op. El estado cerrado es el atributo `hidden`, y
  `.lightbox[hidden] { display: none }` es obligatorio porque `display: grid`
  le gana al `hidden` del navegador.
- `is-docked` / `is-landed` tienen **un solo dueño**: `logo-dock.js`. Si otro
  módulo los toca, el logo blanco puede quedar sobre fondo blanco.
- La galería no tiene autoplay. Las 12 fotos se muestran todas, en aparejo de
  ladrillo, y se amplían al **hacer click**, no al pasar el mouse.
