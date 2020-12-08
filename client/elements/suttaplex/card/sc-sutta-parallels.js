import {html, css} from 'lit-element';
import '../../suttaplex/card/sc-suttaplex.js';
import {suttaplexStyles} from '../../styles/sc-suttaplex-styles.js';

import SCSuttaTopSheetCommon from "./sc-top-sheet-common";

class SCSuttaParallels extends SCSuttaTopSheetCommon {

    constructor() {
        super();
        this.suttaplexItem = [];
    }

    static get styles() {
        return [
            super.styles,
            css`
      .sutta-list
      {
          max-width: 720px;
          margin: var(--sc-size-xl) auto ;
      
          transition: margin-top .3s, margin-bottom .3s;
      }
    `];
    }

    static get properties() {
        return {
            suttaplexItem: {type: Object},
        };
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