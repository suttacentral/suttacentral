import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import SCTopSheetCommon from './sc-top-sheet-common';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { store } from '../../redux-store';

const styles = css`
  .contents {
    margin: 1em 0 2em;
  }

  .unordered-ol {
    list-style-type: none;
  }
`;

class SCTopSheetToC extends SCTopSheetCommon {
  static get styles() {
    return [super.styles, typographyCommonStyles, styles];
  }

  static get properties() {
    return {
      items: {
        type: Object,
      },
      disableToCListStyle: {
        type: Boolean,
      },
    };
  }

  get actions() {
    return {
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display,
        });
      },
      changeDisplaySuttaToCState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SUTTA_TOC_STATE',
          displaySuttaToC: displayState,
        });
      },
    };
  }

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
        <h2>Table of Contents</h2>
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
      </section>
    `;
  }

  _hideMenu() {
    const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    scActionItems?.hideItems();

    this.actions.changeDisplaySettingMenuState(false);
    this.actions.changeDisplaySuttaToCState(false);
  }
}

customElements.define('sc-top-sheet-toc', SCTopSheetToC);
