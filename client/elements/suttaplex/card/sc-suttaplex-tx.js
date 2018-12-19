import '@polymer/iron-icon/iron-icon.js';
import { html, LitElement } from '@polymer/lit-element';
import '../../../img/sc-svg-icons.js';
import '../../menus/sc-suttaplex-share-menu.js';
import { suttaplexTxCss } from './sc-suttaplex-css';


class SCSuttaplexTx extends LitElement {
  static get properties() {
    return {
      item: Object,
      translation: Object,
      className: String,
    }
  }

  get colorClass() {
    switch (this.className) {
      case 'accent':
        return 'sc-primary-accent-color';
      case 'primary':
      default:
        return 'sc-primary-color';
    }
  }

  get translationUrl() {
    return `/${this.item.uid}/${this.translation.lang}/${this.translation.author_uid}`;
  }

  render() {
    return html`
      ${suttaplexTxCss}
      
      <a href="${this.translationUrl}" class="tx ${this.colorClass}">
        <paper-ripple></paper-ripple>
        <div class="tx-icon">
          <iron-icon icon="sc-svg-icons:translation"></iron-icon>
        </div>
        <div class="tx-details">
          <span class="tx-creator">${this.translation.author}</span>
          <span class="tx-publication">${this.translation.lang_name}</span>
        </div>
      </a>`;
  }
}

customElements.define('sc-suttaplex-tx', SCSuttaplexTx);
