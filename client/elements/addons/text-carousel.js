import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import { html, LitElement } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { LitLocalized } from './localization-mixin';
import { textCarouselStyles } from './text-carousel.css';

class SCTextCarousel extends LitLocalized(LitElement) {
  static get properties() {
    return {
      elements: Array,
      link: Boolean,
      selectedItemIndex: Number,
      timer: Number,
      previousWidth: Number,
      elementsUrl: String
    }
  }

  get url() {
    if (!this.elements) {
      return '';
    }

    if (this.link) {
      let uid = this.elements[this.selectedItemIndex].uid;
      return `/${uid}`;
    } else {
      return 'https://discourse.suttacentral.net/t/why-we-read-tell-us-why-you-read-suttas/6747';
    }
  }

  get buttonText() {
    if (this.link) {
      return this.localize('readSutta');
    } else {
      return this.localize('whyYouRead');
    }
  }

  get selectedItem() {
    if (this.elements) {
      return this.elements[this.selectedItemIndex].epigraph || this.elements[this.selectedItemIndex];
    }
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/text-carousel';
  }

  shouldUpdate() {
    return true;
  }

  connectedCallback() {
    super.connectedCallback();

    this.selectedItemIndex = 0;
    this._setInterval();
    this._resizeContainerOnWindowResize();
    this.loading = true;
    fetch(this.elementsUrl).then(r => r.json()).then((response) => {
      this.elements = response;
      this._setContainerHeight();
      this.loading = false;
    });
  }

  loadNextItem(e) {
    this._selectNewIndex(1);
    this._resetInterval();
    e.preventDefault();
  }

  loadPreviousItem(e) {
    this._selectNewIndex(-1);
    this._resetInterval();
    e.preventDefault();
  }

  render() {
    return html`
    ${textCarouselStyles}

    <div id="container" class="container">
      ${this.loading ? html`<paper-spinner-lite active class="spinner"></paper-spinner-lite>` : ''}

      <button id="previous_button" class="chevron previous" @tap="${this.loadPreviousItem}" type="button" aria-label="${this.localize('previous')}">
        <paper-ripple></paper-ripple>
        <iron-icon icon="sc-iron-icons:chevron-left"></iron-icon>
      </button>

      <div id="text" class="text">${unsafeHTML(this.selectedItem)}</div>
      <a class="button-link" href="${this.url}">
        <paper-button class="button card-button-middle" raised>${this.buttonText}</paper-button>
      </a>

      <button id="next_button" class="chevron next" @tap="${this.loadNextItem}" aria-label="${this.localize('next')}">
        <paper-ripple></paper-ripple>
        <iron-icon icon="sc-iron-icons:chevron-right"></iron-icon>
      </button>
    </div>`;
  }

  _resizeContainerOnWindowResize() {
    window.addEventListener('resize', e => {
      this._debouncer = Debouncer.debounce(
        this._debouncer,
        timeOut.after(200),
        () => {
          const newWidth = window.innerWidth;
          if (this.previousWidth !== newWidth) {
            this.previousWidth = newWidth;
            this._setContainerHeight(this.selectedItemIndex);
          }
        }
      )
    });
  }

  _setInterval() {
    this.timer = setInterval(() => this._selectNewIndex(1), 30000);
  }

  _resetInterval() {
    clearInterval(this.timer);
    this._setInterval();
  }

  _selectNewIndex(delta) {
    const index = this.selectedItemIndex + delta;
    const length = this.elements ? this.elements.length : 0;

    this._applyItemChange(index >= 0 ? index % length : length - (-index));
  }

  _setContainerHeight() {
    const lastIndex = this.selectedItemIndex;
    this.selectedItemIndex = this._getLongestItemIndex();
    const container = this.shadowRoot.querySelector('#container');

    container.style.height = 'unset';
    requestAnimationFrame(() => {
      const height = window.getComputedStyle(container).height;
      container.style.height = `calc(${height} + 32px)`;
      this.selectedItemIndex = lastIndex;
    });
  }

  _getLongestItemIndex() {
    const item = this.elements.reduce((a, b) => a.length > b.length ? a : b);

    return this.elements.indexOf(item);
  }

  _applyItemChange(index) {
    const textNode = this.shadowRoot.querySelector('#text');
    if (!textNode.classList.contains('transparent')) {
      textNode.classList.add('transparent');
      setTimeout(() => {
        textNode.classList.remove('transparent');
        this.selectedItemIndex = index;
      }, 400);
    }
  }
}

customElements.define('sc-text-carousel', SCTextCarousel);
