import { html, css } from 'lit';
import SCTopSheetCommon from './sc-top-sheet-common';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles.js';

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
    };
  }

  constructor() {
    super();
    this.items = [];
    this.disableToCListStyle = false;
  }

  _stateChanged(state) {
    super._stateChanged(state);
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
                        <a @click=${this._hideMenu} href="${'#' + item.link}">${item.name}</a>
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
    const scActionItems = document
      .querySelector('sc-site-layout')
      .shadowRoot.querySelector('#action_items');
    scActionItems.hideItems();

    this.actions.changeDisplaySettingMenuState(false);
  }
}

customElements.define('sc-top-sheet-toc', SCTopSheetToC);
