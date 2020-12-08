import {html, css, LitElement} from 'lit-element';
import '../../suttaplex/card/sc-suttaplex.js';
import {unsafeHTML} from "lit-html/directives/unsafe-html";
import SCSuttaTopSheetCommon from './sc-top-sheet-common';

class SCSuttaInfo extends SCSuttaTopSheetCommon {

    constructor() {
        super();
        this.infoDialogMetaArea = '';
        this.localizedStringsPath = '/localization/elements/sc-site-layout';
    }

    static get styles() {
        return [
            super.styles,
            css`
                * {
                    color: rgb(33, 33, 33);
                    font-family: var(--sc-sans-font);
                    -webkit-font-smoothing: antialiased;
                    font-size: var(--sc-skolar-font-size-s);
                    line-height: 20px;
                }
                
                section {
                    margin: var(--sc-size-xl) auto;
                    max-width: 60vw;
                }
                
                h2 {
                    font-family: var(--sc-sans-font);
                    font-size: var(--sc-skolar-font-size-xl);
                    font-weight: 400;
                    line-height: 28px;
                }
                
                p a {
                    text-decoration-color: var(--sc-primary-color);
                }
                
                p a:visited {
                    text-decoration-color: var(--sc-primary-color-dark);
                }
                
                p a:hover {
                    color: var(--sc-primary-color);
                }
            `];
    }

    static get properties() {
        return {
            infoDialogMetaArea: {type: String},
            localizedStringsPath: {type: String},
        };
    }

    _stateChanged(state) {
        super._stateChanged(state);
        if (this.infoDialogMetaArea !== state.suttaMetaText) {
            this.infoDialogMetaArea = state.suttaMetaText;
        }

    }

    render() {
        return html`
            <section>
                <h2>
                    ${this.localize('publicationDetails')}
                </h2>
                <p>
                    ${unsafeHTML(this.infoDialogMetaArea)}
                </p>
            </section>
        `;
    }
}

customElements.define('sc-sutta-info', SCSuttaInfo);