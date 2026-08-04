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

Cuando cambien los precios hay que tocar **cinco lugares**:

1. La tabla `.tarifas` en `index.html` (sección `#precios`).
2. El renglón "Desde" de la portada.
3. La respuesta 01 del FAQ (`#antes`).
4. Los dos bloques JSON-LD del `<head>`: `priceRange`, `makesOffer[].price`,
   `makesOffer[].priceValidUntil` y el texto de la primera pregunta del `FAQPage`.
5. El sello de vigencia: `.vigencia` en `#precios` y `.footer__copy`.

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

### Reglas de la estadía

- Ingreso 12:00, salida 11:00.
- **El huésped lleva sus toallas y su papel higiénico.**

## Pendientes

- WhatsApp de reservas: `5493874830580` (+54 9 3874 83-0580). Aparece en **4**
  enlaces de `index.html`; si cambia, buscar el número y reemplazar en todos.
- Cuando exista dominio definitivo: `canonical`, `og:url`, `og:image` absoluta,
  `sitemap.xml` y alta en Google Search Console.
- Sumar reseñas **reales** cuando existan. No inventar ninguna: hoy la página no
  tiene sección de testimonios y eso es deliberado.
- Confirmar si pileta y quincho son de uso exclusivo por casa o compartidos
  cuando hay más de una casa ocupada. Hoy la página afirma sólo lo verificable:
  "cada casa es independiente" y "alquilás la casa entera".
- No hay foto identificada de La Cabaña ni de La Cabaña chica. La galería
  presenta el predio en general; sólo se atribuye
  `casa-rustica-frente-rancho-quilla.webp` a La Casa Grande.

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
