/**
 * Carousel component
 * Creates a continuous photo belt and opens a large preview on hover/focus.
 */
export class Carousel {
  constructor() {
    this.container = document.getElementById('experience-carousel');
    this.track = document.getElementById('carousel-track');

    if (!this.container || !this.track) {
      console.warn('Carousel: Missing elements.');
      return;
    }

    this.originalItems = Array.from(this.track.children);
    if (!this.originalItems.length) return;

    this.preview = null;
    this.previewImage = null;
    this.previewCaption = null;
    this.closePreview = this.closePreview.bind(this);

    this.init();
  }

  init() {
    this.setupContinuousTrack();
    this.setupPreview();
    this.bindPreviewEvents();
  }

  setupContinuousTrack() {
    this.originalItems.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add('carousel-item-clone');
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      this.track.appendChild(clone);
    });

    this.track.style.setProperty('--carousel-duration', `${this.originalItems.length * 4.5}s`);
  }

  setupPreview() {
    this.preview = document.createElement('div');
    this.preview.className = 'carousel-preview';
    this.preview.setAttribute('aria-hidden', 'true');
    this.preview.innerHTML = `
      <div class="carousel-preview-backdrop"></div>
      <figure class="carousel-preview-card">
        <img class="carousel-preview-image" alt="">
        <figcaption class="carousel-preview-caption"></figcaption>
      </figure>
    `;

    document.body.appendChild(this.preview);
    this.previewImage = this.preview.querySelector('.carousel-preview-image');
    this.previewCaption = this.preview.querySelector('.carousel-preview-caption');
  }

  bindPreviewEvents() {
    Array.from(this.track.children).forEach((item) => {
      if (!item.classList.contains('carousel-item-clone')) item.tabIndex = 0;
      item.addEventListener('mouseenter', () => this.openPreview(item));
      item.addEventListener('focus', () => this.openPreview(item));
      item.addEventListener('mouseleave', this.closePreview);
      item.addEventListener('blur', this.closePreview);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.closePreview();
    });
  }

  openPreview(item) {
    const image = item.querySelector('img');
    const caption = item.querySelector('figcaption');
    if (!image || !this.previewImage || !this.previewCaption) return;

    this.previewImage.src = image.currentSrc || image.src;
    this.previewImage.alt = image.alt || '';
    this.previewCaption.textContent = caption ? caption.textContent : '';
    this.pauseBelt();
    this.preview.classList.add('is-visible');
    this.preview.setAttribute('aria-hidden', 'false');
  }

  closePreview() {
    this.preview.classList.remove('is-visible');
    this.preview.setAttribute('aria-hidden', 'true');
    this.resumeBelt();
  }

  pauseBelt() {
    this.container.classList.add('is-paused');
  }

  resumeBelt() {
    this.container.classList.remove('is-paused');
  }
}
