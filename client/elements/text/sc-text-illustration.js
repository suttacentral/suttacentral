import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class SCTextIllustration extends LitElement {
  static properties = {
    filename: { type: String },
    alt: { type: String },
    caption: { type: String },
    imageUrl: { type: String },
    width: { type: String },
    height: { type: String },
    position: { type: String }, // 'left', 'right', 'center', 'full'
    isLoading: { type: Boolean },
    hasError: { type: Boolean },
    errorMessage: { type: String },
    lazyLoad: { type: Boolean },
    _imageLoaded: { type: Boolean, state: true },
    _showControls: { type: Boolean, state: true }, // 新增：控制符号显示
    creator: { type: String },
    creationDate: { type: String },
  };

  constructor() {
    super();
    this.caption = '';
    this.alt = '';
    this.imageUrl = '';
    this.width = '';
    this.height = '';
    this.position = 'center';
    this.isLoading = false;
    this.hasError = false;
    this.errorMessage = '';
    this.showCaption = true;
    this.lazyLoad = true;
    this._imageLoaded = false;
    this._showControls = false;
    this.creator = '';
    this.creationDate = '';
  }

  static styles = css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    .illustration-container {
      position: relative;
      transition: opacity 0.3s ease;
    }

    .illustration-container.loading {
      opacity: 0.7;
    }

    .illustration-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background: var(--sc-secondary-background-color, #f8f9fa);
    }

    .illustration-image {
      width: 100%;
      height: auto;
      display: block;
      transition: opacity 0.3s ease;
      cursor: pointer;
    }

    .illustration-image:hover {
      opacity: 0.9;
    }

    .illustration-image.loading {
      opacity: 0;
    }

    .illustration-image.loaded {
      opacity: 1;
    }

    .illustration-controls {
      position: absolute;
      top: 8px;
      right: 8px;
      opacity: 0;
      transform: translateY(-4px);
      transition: all 0.2s ease-in-out;
      pointer-events: none;
      z-index: 10;
    }

    .illustration-wrapper:hover .illustration-controls,
    .illustration-wrapper:focus-within .illustration-controls {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    @media (hover: none) and (pointer: coarse) {
      .illustration-controls {
        opacity: 0.7;
        pointer-events: auto;
        transform: translateY(0);
      }

      .illustration-wrapper:hover .illustration-controls,
      .illustration-wrapper:focus-within .illustration-controls {
        opacity: 1;
      }
    }

    .control-symbol {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      transition: all 0.2s ease;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    .control-symbol:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.05);
    }

    .control-symbol:focus {
      outline: 2px solid var(--sc-primary-color, #1976d2);
      outline-offset: 2px;
    }

    .control-symbol:active {
      transform: scale(0.95);
    }

    @media (max-width: 768px) {
      .control-symbol {
        width: 36px;
        height: 36px;
        font-size: 18px;
      }

      .illustration-controls {
        top: 12px;
        right: 12px;
      }
    }

    .illustration-skeleton {
      width: 100%;
      height: 200px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 8px;
    }

    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .illustration-caption {
      padding: 0.75rem;
      font-size: var(--sc-font-size-xs);
      color: var(--sc-secondary-text-color);
      line-height: 1.4;
      background: var(--sc-tertiary-background-color, #fff);
      border-top: 1px solid var(--sc-border-color, #e0e0e0);
    }

    .illustration-error {
      padding: 1rem;
      text-align: center;
      color: var(--sc-error-color, #d32f2f);
      background: var(--sc-error-background-color, #ffebee);
      border-radius: 8px;
      font-size: var(--sc-font-size-xs);
    }

    .illustration-error-icon {
      margin-bottom: 0.5rem;
      opacity: 0.7;
    }

    :host([position="left"]) {
      float: left;
      margin-right: 1.5rem;
      margin-bottom: 1rem;
      max-width: 40%;
    }

    :host([position="right"]) {
      float: right;
      margin-left: 1.5rem;
      margin-bottom: 1rem;
      max-width: 40%;
    }

    :host([position="center"]) {
      margin: 2rem auto;
      text-align: center;
      max-width: 80%;
    }

    :host([position="full"]) {
      margin: 2rem 0;
      width: 100%;
    }

    @media (max-width: 768px) {
      :host([position="left"]),
      :host([position="right"]) {
        float: none;
        margin: 1rem 0;
        max-width: 100%;
      }
    }

    .illustration-image:focus {
      outline: 2px solid var(--sc-primary-color, #1976d2);
      outline-offset: 2px;
    }

    .illustration-wrapper figure {
      margin: 0;
      padding: 0;
    }

    .illustration-wrapper picture {
      display: block;
      margin: 0;
      padding: 0;
    }

    @media print {
      .illustration-container {
        break-inside: avoid;
      }

      .illustration-controls {
        display: none !important;
      }
    }

    figcaption {
      margin: 0;
      padding: 0.75rem;
      font-size: var(--sc-font-size-xs, 0.875rem);
      color: var(--sc-secondary-text-color, #666);
      line-height: 1.4;
      background: var(--sc-tertiary-background-color, #fff);
      border-top: 1px solid var(--sc-border-color, #e0e0e0);

      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;

      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
    }

    figcaption .creator {
      font-weight: 500;
      color: var(--sc-primary-text-color, #333);
    }

    figcaption .creation_date {
      color: var(--sc-tertiary-text-color, #888);
      font-style: italic;
    }

    figcaption * {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    .illustration-controls {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
  `;

  willUpdate(changedProperties) {
    if (changedProperties.has('filename')) {
      this.imageUrl = "/img/illustrations/" + this.filename + '.avif';
      this.caption = this.alt || this.caption || '';
    }
  }

  render() {
    return html`
      <div class="illustration-container ${this.isLoading ? 'loading' : ''}">
        ${this.hasError ? this._renderError() : this._renderIllustration()}
      </div>
    `;
  }

  _renderIllustration() {
    if (this.isLoading && !this._imageLoaded) {
      return this._renderSkeleton();
    }

    return html`
      <div class="illustration-wrapper">
        <figure>
          <picture>
            <img
              type="image/avif"
              class="illustration-image ${this._imageLoaded ? 'loaded' : 'loading'}"
              src="${this.imageUrl}"
              alt="${this.alt || this.caption || 'Illustration'}"
              width="${this.width || ''}"
              height="${this.height || ''}"
              loading="${this.lazyLoad ? 'lazy' : 'eager'}"
              @load="${this._onImageLoad}"
              @error="${this._onImageError}"
              tabindex="0"
              @keydown="${this._onImageKeydown}"
            />
          </picture>
          <div class="illustration-controls">
            <button 
              class="control-symbol"
              @click="${this._onControlClick}"
              @touchstart="${this._onControlTouch}"
              title="Image options"
              aria-label="Image options"
            >
              ⛒
            </button>
          </div>

          ${this.showCaption && this.caption ? html`
            <figcaption>
              <span class='creator'>${this.creator}</span>
              <span class='creation_date'>${this.creationDate}</span>
            </figcaption>
          ` : ''}
        </figure>
      </div>
    `;
  }

  _renderSkeleton() {
    return html`
      <div class="illustration-skeleton"></div>
      ${this.showCaption && this.caption ? html`
        <div class="illustration-caption">
          ${unsafeHTML(this.caption)}
        </div>
      ` : ''}
    `;
  }

  _renderError() {
    return html`
      <div class="illustration-error">
        <div class="illustration-error-icon">🖼️</div>
        <div>
          ${this.errorMessage || 'Failed to load illustration'}
        </div>
        ${this.caption ? html`
          <div style="margin-top: 0.5rem; font-style: italic;">
            ${unsafeHTML(this.caption)}
          </div>
        ` : ''}
      </div>
    `;
  }

  _onControlClick(e) {
    e.stopPropagation();
    this.style.display = 'none';
    this.dispatchEvent(new CustomEvent('illustration-control-click', {
      detail: { 
        filename: this.filename,
        imageUrl: this.imageUrl
      },
      bubbles: true,
      composed: true
    }));
  }

  _onControlTouch(e) {
    e.preventDefault();
    e.stopPropagation();
    this._showControls = true;
    clearTimeout(this._hideControlsTimeout);
    this._hideControlsTimeout = setTimeout(() => {
      this._showControls = false;
    }, 3000);
  }

  _onImageKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._onControlClick(e);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._hideControlsTimeout) {
      clearTimeout(this._hideControlsTimeout);
    }
  }

  _onImageLoad() {
    this._imageLoaded = true;
    this.isLoading = false;
    this.hasError = false;
    this.dispatchEvent(new CustomEvent('illustration-loaded', {
      detail: { illustrationId: this.segmentedId },
      bubbles: true
    }));
  }

  _onImageError() {
    this.hasError = true;
    this.isLoading = false;
    this.errorMessage = 'Failed to load image';
    this.dispatchEvent(new CustomEvent('illustration-error', {
      detail: {
        illustrationId: this.segmentedId,
        error: 'Image load failed'
      },
      bubbles: true
    }));
  }
}

customElements.define('sc-text-illustration', SCTextIllustration);