# Rancho Quilla — Contexto del Proyecto

Landing de **Rancho Quilla**: tres casas de campo independientes, de alquiler
temporario, a la orilla del **Dique Cabra Corral, Salta**.

## Las tres casas y sus nombres

| Nombre | Capacidad | Por día | Ancla | Prefijo de sus fotos |
| --- | --- | --- | --- | --- |
| **Rancho Quilla** | 12 personas | $250.000 | `#rancho-quilla-casa` | *(sin prefijo)* |
| **Mate Luna** | 6 personas | $120.000 | `#mate-luna` | `mate-luna-` |
| **Ranchito** | 2 personas | $50.000 | `#ranchito` | `ranchito-` |

⚠️ **«Rancho Quilla» es a la vez el predio entero y la casa grande.** No es un
error: la casa grande le da el nombre al lugar. Pero la página tiene que
desambiguarlo siempre, y lo hace en tres lugares: el texto de la sección 01 lo
dice con nombre y apellido, la ficha lleva el subtítulo *"la casa grande, la que
le da el nombre al predio"* (`.casa-head__sub`), y el ancla es
`#rancho-quilla-casa`, no `#rancho-quilla`.

Si se toca alguno de esos tres, la ambigüedad vuelve.

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
| Rancho Quilla     | 12 personas | $250.000 |
| Mate Luna         | 6 personas  | $120.000 |
| Ranchito          | 2 personas  | $50.000  |
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

- Tres casas independientes entre sí (Rancho Quilla, Mate Luna, Ranchito). Se
  alquila la casa entera, nunca una habitación.
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

### Mate Luna (6 personas) — ficha propia

Datos de la ficha del dueño (`Mate Luna.pdf`, agosto 2026):

- Camas para seis, con ropa de cama incluida.
- Agua caliente con **termotanque a leña**.
- Heladerita, freezer, **anafe de dos hornallas**, microondas y pava eléctrica.
- Utensilios de cocina completos para 6 personas.
- Quincho con horno de barro y asador. **Conviene traer leña.**
- Comedor vidriado con ventanales al dique. Tiene planta alta.
- **Juego de sapo.**
- Televisor con DirecTV, **recarga a cargo del huésped**.
- Kayak doble o **bote a remo para 2 personas**, sin cargo.
- Estacionamiento junto a la cabaña. Espacio totalmente privado.
- **Depósito de garantía $20.000**, se devuelve 48 h después de la estadía.
- Se aceptan dólares a la mejor cotización.
- Aclaración de horarios: **pasado el horario de salida empieza a contarse un
  día adicional.**

### Ranchito (2 personas) — ficha propia

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
El depósito está documentado para **Mate Luna y Ranchito**. Falta confirmar si
aplica también a Rancho Quilla, la casa grande.

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

Los nombres de archivo son la atribución. No mezclar:

- `assets/images/rancho/*` sin prefijo → **Rancho Quilla**, la casa grande (17 fotos).
- `mate-luna-*` → **Mate Luna**, la de 6 personas (12 fotos).
- `ranchito-*` → **Ranchito**, la de 2 (8 fotos).
- `muelle-*`, `bote-*`, `kayak-*`, `atardecer-pesca-*` → **el dique**, común a las
  tres (4 fotos).
- Todas a máximo **1200px** de ancho y **WebP q80, en un solo encode**. El visor
  las muestra a ~1000px como máximo y la pared a ~450, así que subir de 1200
  sólo agrega peso.

⚠️ **Nunca reprocesar un WebP que ya está en el repo.** Cada encode con pérdida
apila artefactos sobre los anteriores: la galería estuvo un rato comprimida dos
veces (q80 y después q78) y las del PDF tres, y eso se veía como ruido en el
cielo del atardecer. Si hay que cambiar tamaño o calidad, se rehace **desde la
fuente pristina**: el blob de git en `b1c97a1` para las fotos que ya estaban en
el repo, o el PDF del dueño para las de Mate Luna y Ranchito. El script que lo
hace quedó documentado en el commit correspondiente.

Excepción de calidad: los dos atardeceres van a **q90**, no q80. Un cielo con
degradado necesita más bits que una pared de ladrillo, y son justo las fotos
donde el ruido se notaba.

El ancho de `.consultar__plate` (32rem) está atado a los pixeles reales de
`atardecer-pesca-dique-cabra-corral.webp`: su fuente es de 1280px y hay que
recortarle una botella de marca, así que quedan 768px útiles. A 40rem el
navegador la escalaba 1.2× y se veía blanda; a 32rem la escala es 1.6×.
Dos fotos están recortadas a propósito:

- `atardecer-pesca-dique-cabra-corral.webp`: se quitó una botella de marca que
  aparecía en el cuadro original.
- `mate-luna-atardecer-desde-la-galeria.webp`: se quitó una banda de texto
  sobreimpreso que además tenía una errata («Atardecer **en en** Dique»).

⚠️ Los dos PDF del dueño traen imágenes que **no son del lugar** y no se usaron:
un meme de un pug con «SI ME ACEPTAN!!», una foto de comida bajada de internet
(tiene el overlay de Google Lens encima) y capturas de video con el ícono de
altavoz. La página sólo lleva fotos reales del predio.

## Pendientes

- WhatsApp de reservas: `5493874830580` (+54 9 3874 83-0580). Aparece en **5**
  enlaces de `index.html`; si cambia, buscar el número y reemplazar en todos.
- Cuando exista dominio definitivo: `canonical`, `og:url`, `og:image` absoluta,
  `sitemap.xml` y alta en Google Search Console.
- Sumar reseñas **reales** cuando existan. No inventar ninguna: hoy la página no
  tiene sección de testimonios y eso es deliberado.
- Confirmar si el depósito de garantía de $20.000 aplica también a **Rancho
  Quilla**, la casa grande. Está documentado para Mate Luna y Ranchito.
- Los nombres propios están **confirmados por el dueño**: Rancho Quilla (12),
  Mate Luna (6) y Ranchito (2).

## Arquitectura de la página

Una **ficha por casa**, continua. Antes cada casa estaba repartida en tres
secciones distintas (precio en una, inventario en otra, fotos en otra) y había
que armar el rompecabezas para poder decidir.

```
00  Portada
01  El predio          <- lo que vale para las tres, dicho una sola vez
02  Las tres casas     <- tabla de decisión: capacidad, precio y enlace a cada ficha
02.1  Rancho Quilla    <- ficha: numeral 12 + precio + inventario + 17 fotos + 2 videos
02.2  Mate Luna        <- ficha: numeral 6  + precio + inventario + 12 fotos
02.3  Ranchito         <- ficha: numeral 2  + precio + inventario + 8 fotos
03  Dónde queda
04  Antes de venir
05  Consultar
```

La sub-numeración `02.1` / `02.2` / `02.3` es deliberada: dice que las tres son
lo mismo en distinto tamaño, y es un recurso de libro de cuentas.

**La marca de cada ficha es el numeral de capacidad** (`12`, `6`, `2`) en
Playfair a 144px. Es el dato que realmente distingue una casa de otra, así que es
lo que se ve primero y desde lejos. Funciona en monocromo y en una miniatura.

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
- La galería no tiene autoplay. Las fotos se muestran todas, en aparejo de
  ladrillo, y se amplían al **hacer click**, no al pasar el mouse.
- El visor está **acotado por casa**: cada `.wall` es un grupo y las flechas
  recorren sólo las fotos de esa casa. Si alguien está mirando Mate Luna, no
  tiene que terminar en Rancho Quilla sin haberlo pedido. El contador dice de
  qué casa es: «Mate Luna · 3 / 12».
- El enlace del nombre de casa en la tabla de tarifas agranda su área táctil con
  un `::after` absoluto, no con padding: con padding el subrayado se separa de la
  palabra. Su alto natural es 27px y el mínimo táctil es 44.
