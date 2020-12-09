import {html, css} from 'lit-element';
import '../../suttaplex/card/sc-suttaplex.js';
import { suttaplexStyles } from '../../styles/sc-suttaplex-styles.js';
import SCSuttaTopSheetCommon from "./sc-top-sheet-common";

class SCSuttaParallels extends SCSuttaTopSheetCommon {

  static get styles() {
    return [
            super.styles,
            css`

:host
{
    --sc-suttaplex-shadow: var(--sc-shadow-elevation-0dp);
}

section
{
    max-width: 720px;
    margin: var(--sc-size-xl) auto;
    padding: 0 3vw;
}

    `];
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
    <section>
          <sc-suttaplex .item=${this.suttaplexItem} .clearBorderRadius="${true}"></sc-suttaplex>
    </section>
    `;
  }
}

customElements.define('sc-sutta-parallels', SCSuttaParallels);