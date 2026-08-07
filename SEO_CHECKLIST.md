# Rancho Quilla — Checklist SEO y conversión

## Pendientes antes de publicar

1. Verificar que el WhatsApp siga apuntando a `5493874830580` (+54 9 3874 83-0580).
   Está en **5** enlaces de `index.html`.
2. **Revisar la vigencia de los precios.** Hoy dicen "hasta el 31 de agosto de
   2026" en tres lugares del HTML y en `priceValidUntil` del JSON-LD. Un precio
   sin fecha, o con fecha vencida, es peor que no publicar precio.
3. ~~Cuando exista dominio definitivo~~ — **hecho**. El dominio es
   `www.ranchoquilla.com.ar` y es la canónica: está en `canonical`, `og:url`,
   en las URLs absolutas de `og:image` / `twitter:image`, en `url` e `image`
   del `LodgingBusiness`, en `sitemap.xml` y en `robots.txt`. El apex
   `ranchoquilla.com.ar` redirige con 301 a `www` desde Cloudflare, así que
   **no hay que publicar links al apex**: cuestan un salto extra.
4. Cargar el sitio en Google Search Console. Dar de alta la propiedad como
   dominio (`ranchoquilla.com.ar`), no como prefijo de URL, para que cubra las
   dos variantes de una.
5. Crear o completar Google Business Profile para la zona del Dique Cabra Corral.
6. Pedir reseñas reales a huéspedes. **No inventar ninguna.**
7. Comprimir nuevas fotos en WebP antes de subirlas, con nombre descriptivo.
8. Mantener la keyword principal en:
   - Title: *Alquiler de casa en Dique Cabra Corral*.
   - H1: *Tres casas de campo a la orilla del Dique Cabra Corral*.
   - Textos: alquiler de cabañas en Salta, casa/cabaña en Cabra Corral, casa con
     pileta en Salta.

## Qué se optimizó en esta versión

- **Precios publicados.** Es el dato que la competencia no publica y el que más
  se busca. Están en el HTML, en el FAQ y en `makesOffer` del JSON-LD con
  `priceValidUntil`.
- Las tres unidades declaradas en `containsPlace` con su `occupancy`, más
  `priceRange` y `currenciesAccepted` en el `LodgingBusiness`.
- `FAQPage` ampliado: la primera pregunta ahora es "¿Cuánto sale?".
- H1 orientado a búsqueda local, con la ubicación en la primera línea.
- Meta description con los tres tamaños de casa y el precio de entrada.
- Open Graph con `og:site_name` y `og:image:alt`.
- Fotos reales, WebP, nombres con keywords, `width`/`height` explícitos y
  `loading="lazy"` fuera de la primera pantalla.
- **Las tres casas tienen nombre propio**: Rancho Quilla (12), Mate Luna (6) y
  Ranchito (2). Son términos de marca buscables, mucho mejores que un tamaño.
  Están en el title de cada ficha, en el `alt` de sus fotos, en los nombres de
  archivo, en `containsPlace`, en `alternateName` y en las keywords.
- **Una ficha por casa**, con su propio `id`, `h2`, precio, inventario y pared de
  fotos: `#rancho-quilla-casa`, `#mate-luna`, `#ranchito`. Son URLs compartibles,
  que es lo que hace falta para mandar "mirá esta" por WhatsApp.
- **41 fotos atribuidas por casa** (17 Rancho Quilla, 12 Mate Luna, 8 Ranchito,
  4 del dique), cada una con `alt` y nombre de archivo que nombran la casa.
- Referencia geográfica real en el texto y en el JSON-LD: *a minutos de Los
  Mayuatos, antes de Coronel Moldes*. Ayuda a quien busca por esa zona.
- `containsPlace` con `amenityFeature` y `bed` por unidad, no sólo la capacidad.
- `FAQPage` con 10 preguntas, una por casa ("¿Qué incluye Mate Luna...?").
- Todas las imágenes a máximo 1200px y WebP q80 **en un solo encode**, rehechas
  desde la fuente pristina. Antes tenían dos pasadas de compresión encima (y las
  de los PDF, tres), que es lo que producía el ruido visible en los cielos.

## Rendimiento y accesibilidad corregidos en el rebranding

Todos estos números están medidos en el navegador, antes y después:

| | Antes | Ahora |
| --- | --- | --- |
| Contraste del CTA principal | **1.98:1** (falla AA) | **6.49:1** |
| Peticiones de CSS en serie antes de la 1.ª letra | 3 saltos (`@import` anidado) | 1, en paralelo |
| Valores distintos de `border-radius` | 13 | 1 |
| `backdrop-filter` | 8 | 0 |
| Gradientes | 15 | 1 (textura de la portada) |
| `box-shadow` | 37 | 1 |
| CTA visible en la primera pantalla | No (hero de 975px en viewport de 720) | Sí |
| Animaciones infinitas | 2 (halo del WhatsApp, carrusel) | 0 |
| Galería usable con teclado | No (se abría en `mouseenter`) | Sí (click, flechas, Escape, foco atrapado) |
| Área táctil del menú móvil | 34×34 | 44×44 |
| CSS muerto enviado al cliente | ~150 líneas (`cards.css`, `reviews.css` huérfano) | 0 |

Contraste verificado en los 22 pares de texto/fondo del sitio, y revalidado en
escala de grises para confirmar que la jerarquía no depende del color.
