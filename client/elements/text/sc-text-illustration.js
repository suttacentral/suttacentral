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
    creator: { type: String },
    creationDate: { type: String },
    _isPrintMode: { type: Boolean, state: true }
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
    this.creator = '';
    this.creationDate = '';
    this._isPrintMode = false;
  }

  static styles = css`
    :host {
      display: block;
      margin: 0;
    }

    .illustration-container {
      position: relative;
      transition: opacity 0.3s ease;
    }

    .illustration-container.loading {
      opacity: 0.7;
    }

    .illustration-container {
      position: relative;
      display: flex;
      justify-content: center;
    }

    figure {
      margin: 1.5rem 0;
      width: fit-content;
    }

    .illustration-image {
      width: auto;
      height: auto;
      max-height: 480px;
      max-width: calc(100% + 2rem);
      margin: 0 -1rem;
      display: block;
      transition: opacity 0.3s ease;
    }

    .illustration-image.loading {
      opacity: 0;
    }

    .illustration-image.loaded {
      opacity: 1;
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

    @media print {
      .illustration-container {
        break-inside: avoid;
      }

      .illustration-image {
        opacity: 1 !important;
        max-width: 100% !important;
        height: auto !important;
        page-break-inside: avoid;
      }

      .illustration-skeleton {
        display: none !important;
      }
    }

    figcaption {
      margin: 0;
      padding: .25rem 0.75rem;
      text-align: center;
      font-size: var(--sc-font-size-xs);
      font-family: var(--sc-sans-font);
      color: var(--sc-on-primary-secondary-text-color);

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
    }

    figcaption .creation_date {
      font-style: italic;
    }

    figcaption .creation_date::before {
      content: '• ';
      color: var(--sc-on-primary-tertiary-text-color);
    }

    figcaption * {
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
      <figure>
        <picture>
          <img
            type="image/avif"
            class="illustration-image ${this._imageLoaded ? 'loaded' : 'loading'}"
            src="${this.imageUrl}"
            alt="${this.alt || this.caption || 'Illustration'}"
            width="${this.width || ''}"
            height="${this.height || ''}"
            loading="${this._shouldUseLazyLoading ? 'lazy' : 'eager'}"
            @load="${this._onImageLoad}"
            @error="${this._onImageError}"
            tabindex="0"
          />
        </picture>

        ${this.showCaption && this.caption ? html`
          <figcaption>
            <span class='creator'>${this.creator}</span>
            <span class='creation_date'>${this.creationDate}</span>
          </figcaption>
        ` : ''}
      </figure>
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

  connectedCallback() {
    super.connectedCallback();
    this._handleBeforePrint = this._handleBeforePrint.bind(this);
    this._handleAfterPrint = this._handleAfterPrint.bind(this);

    window.addEventListener('beforeprint', this._handleBeforePrint);
    window.addEventListener('afterprint', this._handleAfterPrint);

    this._printMediaQuery = window.matchMedia('print');
    this._printMediaQuery.addListener(this._handlePrintMediaChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('beforeprint', this._handleBeforePrint);
    window.removeEventListener('afterprint', this._handleAfterPrint);
    if (this._printMediaQuery) {
      this._printMediaQuery.removeListener(this._handlePrintMediaChange.bind(this));
    }
  }

  _handleBeforePrint() {
    this._isPrintMode = true;
    this.requestUpdate();
  }

  _handleAfterPrint() {
    this._isPrintMode = false;
    this.requestUpdate();
  }

  _handlePrintMediaChange(e) {
    this._isPrintMode = e.matches;
    this.requestUpdate();
  }

  get _shouldUseLazyLoading() {
    return this.lazyLoad && !this._isPrintMode;
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