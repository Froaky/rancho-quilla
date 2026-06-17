# Rancho Quilla - Contexto del Proyecto

Landing page para **Rancho Quilla**, casa rústica privada de alquiler temporario en la zona del **Dique Cabra Corral, Salta**.

## Objetivo

Atraer búsquedas locales y convertir visitas en consultas por WhatsApp. Keywords principales:

- alquiler de casa en Dique Cabra Corral
- alquiler de cabañas en Salta
- cabaña en Cabra Corral
- casa con pileta en Salta
- alojamiento para 12 personas en Cabra Corral

## Propuesta comercial visible

- Casa rústica privada estilo campo.
- Capacidad hasta 12 personas.
- Quincho grande.
- Pileta y piletín para niños.
- Cocina equipada, heladera, freezer y utensilios.
- Ropa de cama incluida.
- TV 50 pulgadas con DIRECTV.
- Metegol, pool y ping pong.
- Dos kayaks o bote doble para pesca/navegación sin cargo.
- Horno de barro, asadores y patio de cancana para costillar a la estaca.
- Mascotas bienvenidas.
- Caseros en el predio para seguridad y contención.
- No se publica precio en la landing.

## Pendientes importantes

- WhatsApp de reservas configurado: `5493874830580` (+54 9 3874 83-0580).
- Cuando exista dominio definitivo, agregar canonical, og:url, imágenes absolutas para Open Graph, sitemap.xml y alta en Google Search Console.
- Sumar reseñas reales cuando estén disponibles.

## Estructura técnica

```
rancho-quilla-pro/
├── index.html
├── SEO_CHECKLIST.md
├── robots.txt
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   └── rancho/        # Fotos reales optimizadas y renombradas para SEO
│   └── videos/            # Recorridos del predio/casa
├── css/
│   ├── base/
│   ├── components/
│   └── sections/
└── js/
    ├── components/
    └── utils/
```

## Notas de implementación

- La animación del logo por scroll se mantiene: inicia centrado en el hero y queda fijo en el header a la derecha.
- Las imágenes se convirtieron a WebP y tienen nombres descriptivos con términos de búsqueda.
- La landing incluye JSON-LD para alojamiento y preguntas frecuentes.
- La galería usa carousel con autoplay, controles y swipe mobile.
- Los bloques con `data-reveal` se muestran con IntersectionObserver desde `js/main.js`.
