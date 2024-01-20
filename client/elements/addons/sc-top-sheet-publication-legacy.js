import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import SCTopSheetCommon from './sc-top-sheet-common';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles.js';

export class SCTopSheetPublicationLegacy extends SCTopSheetCommon {
  static styles = [
    super.styles,
    typographyCommonStyles,
    css`
      :host {
        font-family: var(--sc-sans-font);
        line-height: 1.333;
      }

      h2 {
        font-family: var(--sc-serif-font);
        color: var(--sc-on-primary-primary-text-color);
      }
    `,
  ];

  static properties = {
    infoDialogMetaArea: { type: String },
    localizedStringsPath: { type: String },
  };

  constructor() {
    super();
    this.infoDialogMetaArea = '';
    this.localizedStringsPath = '/localization/elements/publication';
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.infoDialogMetaArea !== state.suttaMetaText) {
      this.infoDialogMetaArea = state.suttaMetaText;
    }
  }

  render() {
    return html`
      <section>
        <h2>${this.localize('interface:publicationDetails')}</h2>
        ${unsafeHTML(this.infoDialogMetaArea)}
      </section>
    `;
  }
}

customElements.define('sc-top-sheet-publication-legacy', SCTopSheetPublicationLegacy);
