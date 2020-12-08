import {LitElement, css} from 'lit-element';
import '../../suttaplex/card/sc-suttaplex.js';
import {LitLocalized} from '../../addons/localization-mixin'

export default class SCSuttaTopSheetCommon extends LitLocalized(LitElement) {

    static get styles() {
        return css`
          :host
            {
                position: absolute;
                z-index: 1000;
            
                display: none;
                overflow-y: auto;;
            
                width: 100%;
                max-height: 80vw;
            
                color: var(--sc-primary-text-color);
                border-bottom: 1px solid #ccc;
                background-color: var(--sc-secondary-background-color);
                box-shadow: var(--sc-shadow-elevation-4dp);
            }
    `;
    }

    show() {
        this.style.display = 'block';
    }

    hide() {
        this.style.display = 'none';
    }

}