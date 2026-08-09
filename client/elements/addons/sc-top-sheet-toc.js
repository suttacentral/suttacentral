import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { reduxActions } from './sc-redux-actions';
import SCTopSheetCommon from './sc-top-sheet-common';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';

export class SCTopSheetToC extends SCTopSheetCommon {
  static styles = [
    super.styles,
    typographyCommonStyles,
    css`
.contents
{
    margin: 1em 0 2em;
}

figcaption
{
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-l);

    color: var(--sc-on-primary-secondary-text-color);
}

.unordered-ol
{
    list-style-type: none;
}

      `
  ];

  static properties = {
    items: { type: Object },
    disableToCListStyle: { type: Boolean },
  };

  constructor() {
    super();
    this.items = [];
    this.disableToCListStyle = false;
  }

  stateChanged(state) {
    super.stateChanged(state);
    this.items = state.tableOfContents.items;
    this.disableToCListStyle = state.tableOfContents.disableToCListStyle;
  }

  render() {
    return html`
      <section>
      <figure>
      <figcaption>Table of Contents</figcaption>
        <nav class="contents">
          <ol class=${this.disableToCListStyle ? 'unordered-ol' : ''}>
            ${this.items
              ? this.items.map(
                  item =>
                    html`
                      <li>
                        <a @click=${this._hideMenu} href=${`#${item.link}`}
                          >${unsafeHTML(item.name)}</a
                        >
                      </li>
                    `
                )
              : ''}
          </ol>
        </nav>
        </figure>
      </section>
    `;
  }

  _hideMenu() {
    const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    scActionItems?.hideTopSheets();

    reduxActions.changeDisplaySettingMenuState(false);
    reduxActions.changeDisplaySuttaToCState(false);
  }
}

customElements.define('sc-top-sheet-toc', SCTopSheetToC);
