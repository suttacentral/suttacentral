import {html, css} from 'lit-element';
import '../suttaplex/card/sc-suttaplex.js';
import { suttaplexStyles } from '../styles/sc-suttaplex-styles.js';
import SCTopSheetCommon from "./sc-top-sheet-common";

class SCTopSheetParallels extends SCTopSheetCommon {

  static get styles() {
    return css`
      :host {
        position: absolute;
        z-index: 1000;

        display: none;
        overflow-y: auto;;

        width: 100%;
        max-height: 80vh;

        color: var(--sc-primary-text-color);
        border-bottom: 1px solid #ccc;
        background-color: var(--sc-secondary-background-color);
        box-shadow: var(--sc-shadow-elevation-4dp);
      }

      .sutta-list {
        max-width: 720px;
        margin: var(--sc-size-xl) auto ;

        transition: margin-top .3s, margin-bottom .3s;
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

customElements.define('sc-top-sheet-parallels', SCTopSheetParallels);