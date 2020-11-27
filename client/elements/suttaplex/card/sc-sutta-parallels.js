import { LitElement, html, css } from 'lit-element';
import '../../suttaplex/card/sc-suttaplex.js';
import { suttaplexStyles } from '../../styles/sc-suttaplex-styles.js';

import { store } from '../../../redux-store';
import { LitLocalized } from '../../addons/localization-mixin'

class SCSuttaParallels extends LitLocalized(LitElement) {

  static get styles() {
    return css`
      :host {
        display: none;
        z-index: 2;
        color: var(--sc-primary-text-color);
      }

      .sutta-list {
        transition: margin-top 0.3s, margin-bottom 0.3s;
        margin: 0 auto var(--sc-size-xxl);
      }
    `;
  }

  static get properties() {
    return {
      suttaplexItem: { type: Object },
    };
  }

  constructor() {
    super();
    this.suttaplexItem = [];
  }

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
  }

  render() {
    return html`
      ${suttaplexStyles}
      <div class="container">
        <div class="sutta-list">
          <sc-suttaplex .item=${this.suttaplexItem} .clearBorderRadius="${true}"></sc-suttaplex>
        </div>
      </div>
    `;
  }
}

customElements.define('sc-sutta-parallels', SCSuttaParallels);