import { css, html, LitElement } from 'lit';

import './sc-menu-more';
import '../addons/sc-auto-complete-list';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { store } from '../../redux-store';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@material/mwc-button';
import '@material/mwc-icon-button';

import { icon } from '../../img/sc-icon';

export class SCActionItemsUniversal extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--sc-darker-fixed-background-color);
      --mdc-theme-surface: var(--sc-secondary-background-color);

      z-index: 100;
    }

    #sc-menu-more:focus {
      outline: none;
    }

    .more-menu-list {
      background-color: var(--sc-secondary-background-color);
    }

    mwc-icon-button {
      color: white;
    }

    #more-menu {
      --mdc-menu-min-width: 275px;
      --mdc-menu-max-width: 290px;
    }

    option::before {
      content: 'Jump To ';
    }
  `;

  static properties = {
    localizedStringsPath: { type: String },
    moreMenu: { type: Object },
    siteLanguage: { type: String },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.siteLanguage = store.getState().siteLanguage;
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
    }
  }

  firstUpdated() {
    this.moreMenu = this.shadowRoot.querySelector('#more-menu');
    this.moreMenu.anchor = this.shadowRoot.querySelector('#more-menu-button');

    this.moreMenu?.addEventListener('item-selected', () => {
      this.moreMenu.close();
    });

    this.moreMenu?.anchor.addEventListener('click', () => {
      this.#hideTopSheets();
    });
  }

  #hideTopSheets() {
    const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    scActionItems?.hideTopSheets();
  }

  openMoreMenu() {
    (this.moreMenu || {}).show?.();
  }

  openInstantSearch() {
    this.#hideTopSheets();
    this.#showAutoCompleteList();
  }

  #showAutoCompleteList() {
    this.shadowRoot.querySelector('sc-auto-complete-list').style.display = 'block';
    this.shadowRoot
      .querySelector('sc-auto-complete-list')
      .shadowRoot.querySelector('#search_input')
      .focus();
  }

  render() {
    return html`
      <mwc-icon-button
        id="search_glass"
        title=${this.localize('search:searchTooltip')}
        label="search"
        @click=${this.openInstantSearch}
        aria-label="Search"
      >
        ${icon.search}
      </mwc-icon-button>
      <sc-auto-complete-list></sc-auto-complete-list>
      <mwc-icon-button
        label="menu"
        id="more-menu-button"
        @click=${this.openMoreMenu}
        alt="menu"
        aria-label="Menu"
      >
        ${icon.more_vert}
      </mwc-icon-button>
      <mwc-menu corner="BOTTOM_LEFT" id="more-menu" activatable>
        <sc-menu-more id="sc-menu-more"></sc-menu-more>
      </mwc-menu>
    `;
  }
}

customElements.define('sc-action-items-universal', SCActionItemsUniversal);
