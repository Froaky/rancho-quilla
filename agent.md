# Rancho Quilla - Contexto del Proyecto (Agent Context)

Este archivo contiene el contexto funcional y técnico para la landing page de **Rancho Quilla**, un complejo de alquiler de cabañas en el dique.

## Información del Proyecto

* **Nombre de la marca:** Rancho Quilla
* **Objetivo de la landing:** Atraer a clientes interesados en alquilar cabañas y derivarlos de manera directa y optimizada a realizar una reserva a través de **WhatsApp**.
* **Esencia de marca:** Naturaleza, calidez, descanso, exclusividad, confort premium y desconexión en un entorno natural cerca del dique.
* **Paleta de Colores (Diseño Premium y Natural):**
  - Verdes orgánicos / Bosque (`#2c5e43`, `#1b3d2b`)
  - Tonos tierra / Madera (`#8c6239`, `#b89065`)
  - Arena / Beige (`#f7f5f0`, `#e8e3d9`)
  - Acentos oscuros / Elegantes (`#1c201d`)

---

## Estructura de Secciones de la Landing

1. **Hero Inicial con Experiencia de Marca:**
   - Contiene la animación del logo real (imagen PNG) de "Rancho Quilla".
   - En el hero, el logo se muestra invertido a blanco (CSS `filter: brightness(0) invert(1)`).
   - Fondo dinámico/diagonal con composiciones visuales de naturaleza/cabañas.
2. **Frase Destacada:** "UN ESPACIO ÚNICO PARA RELAJARTE"
3. **Cabaña Principal (Rancho Quilla):** Sección premium con mayor jerarquía, detalles, amenities, fotos destacadas y botón de reservas.
4. **Otras Cabañas:** Sección complementaria con dos cabañas adicionales en formato tarjeta (menor jerarquía visual).
5. **Galería de Fotos / Carrusel:** Slider infinito con movimiento automático, pausa al hacer hover y zoom suave de imágenes.
6. **Experiencia y Beneficios:** Cuadrícula de sensaciones (desconexión, vista al dique, atardeceres, tranquilidad).
7. **Reseñas de Huéspedes:** Testimonios en tarjetas elegantes con estrellas de calificación.
8. **Ubicación:** Mapa interactivo o representativo (con referencias cercanas) y descripción del dique.
9. **Contacto & CTA Final:** Bloque llamativo con número y botón de WhatsApp.
10. **Botón Flotante de WhatsApp:** Visible en todo momento, con animación de pulso sutil y texto descriptivo en desktop.

---

## Animación del Logo (Scroll-Linked Animation)

* **Comportamiento:**
  - Al cargar la página, el logo (imagen `assets/images/logo.png`) se posiciona centrado en el Hero con tamaño grande (`max-width: 380px`). Se muestra invertido a blanco con CSS filters para contraste sobre el fondo oscuro.
  - Al hacer scroll, se calcula la proporción de desplazamiento (`scrollRatio`) con curva de easing `easeOutCubic` para suavidad.
  - El logo se desplaza dinámicamente y se reduce de tamaño de forma proporcional al scroll, hasta ubicarse en la **parte superior derecha** del header/navbar.
  - A medida que el scroll supera el 50%, el filtro CSS transiciona gradualmente de blanco invertido a color original (marrón del logo real).
  - La animación está vinculada directamente al progreso del scroll mediante JavaScript (no es una animación automática de CSS).
  - El header/navbar aparece progresivamente (su fondo glassmorphism y otros enlaces se desvanecen hacia visible) a medida que el logo se acerca a su posición final.
  - El indicador de scroll (mouse icon) se desvanece al comenzar a desplazarse.

---

## Decisiones Técnicas y Estructura de Carpetas

Se respeta de forma estricta la separación de responsabilidades y modularidad (SOLID):

```
rancho-quilla/
├── index.html
├── agent.md
├── assets/
│   ├── images/      <- Imágenes de cabañas, naturaleza, dique
│   └── icons/       <- SVGs de WhatsApp, estrellas, utilidades
├── css/
│   ├── main.css     <- Importador central de estilos
│   ├── base/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   └── typography.css
│   ├── components/
│   │   ├── navbar.css
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── carousel.css
│   │   └── whatsapp.css
│   └── sections/
│       ├── hero.css
│       ├── phrase.css
│       ├── rancho-quilla.css
│       ├── other-cabins.css
│       ├── benefits.css
│       ├── reviews.css
│       ├── location.css
│       └── contact.css
└── js/
    ├── main.js      <- Bootstrap de scripts
    ├── utils/
    │   └── scroll-animator.js  <- Lógica de animación del logo
    └── components/
        ├── navbar.js           <- Menú mobile y navegación
        └── carousel.js         <- Slider interactivo
```

---

## Datos Temporales y Pendientes (Placeholders)

> [!NOTE]
> Estos datos deben ser fáciles de reemplazar en el futuro:
>
> 1. **Logo Principal:** ✅ INTEGRADO — Imagen real del logo en `assets/images/logo.png` (marrón con sombrero y mate). Usado en `#animated-logo` (hero/navbar) y en el footer. Para cambiar el logo, reemplazar el archivo PNG.
> 2. **Enlace de WhatsApp:** Actualmente apunta a un enlace genérico (ej. `https://wa.me/5491112345678`). Buscar `5491112345678` en `index.html` para reemplazar.
> 3. **Imágenes de cabañas:** Guardadas en `assets/images/` generadas con IA. Reemplazar con fotos reales.
> 4. **Reseñas:** Textos ficticios de prueba en `index.html`, sección `#resenas`.
> 5. **Mapa de Ubicación:** Iframe de Google Maps de ejemplo (zona Dique San Roque). Actualizar coordenadas en el iframe de `#ubicacion`.

