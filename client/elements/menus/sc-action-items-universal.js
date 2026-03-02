import { css, html, LitElement } from 'lit';

import '@material/web/iconbutton/icon-button';
import '@material/web/menu/menu';
import '@material/web/menu/menu-item';
import '@material/web/button/filled-button';

import './sc-menu-more';
import '../addons/sc-auto-complete-list';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { store } from '../../redux-store';
import { icon } from '../../img/sc-icon';
import { ignorableKeydownEvent } from '../sc-keyboard-shortcuts';

export class SCActionItemsUniversal extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      --md-icon-button-icon-color: white;
      --md-sys-color-on-surface-variant: var(--sc-icon-color);

      z-index: 100;

      --md-menu-container-shape: 12px;
    }

    #sc-menu-more:focus {
      outline: none;
    }

    .more-menu-list {
      background-color: var(--sc-secondary-background-color);
    }

    .button-theme {
      padding: 0 3px 0 3px;
      border-radius: 50%;
      background-color: var(--sc-darker-fixed-background-color);
    }

    .button-theme svg {
      fill: white;
    }

    md-menu {
      --md-menu-container-color: var(--sc-secondary-background-color);
      --md-menu-container-elevation: 0;
      max-height: 1024px;
      min-width: 275px;
      max-width: 290px;
      display: none;
    }

    md-menu::part(elevation) {
      box-shadow: var(--sc-shadow-elevation-24dp);
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

  firstUpdated() {
    document.addEventListener('keydown', this._handleKeydown.bind(this));
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
    }
  }

  _handleKeydown(event) {
    if (ignorableKeydownEvent(event)) return;
    switch (event.key) {
      case 's':
      case 'S':
        this.openInstantSearchDialog();
        event.preventDefault();
        break;
    }
  }

  #hideTopSheets() {
    const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    scActionItems?.hideTopSheets();
  }

  #showAutoCompleteList() {
    this.shadowRoot.querySelector('sc-auto-complete-list').style.display = 'block';
    this.shadowRoot
      .querySelector('sc-auto-complete-list')
      .shadowRoot.querySelector('#search_input')
      ?.focus();
  }

  openInstantSearchDialog() {
    this.#hideTopSheets();
    this.#showAutoCompleteList();
  }

  #openMoreMenu() {
    this.#hideTopSheets();
    this.moreMenu = this.shadowRoot.querySelector('#more-menu');
    this.moreMenu.open = !this.moreMenu.open;
    this.moreMenu.style.display = this.moreMenu.open ? 'initial' : 'none';
  }

  render() {
    return html`
      <md-icon-button
        class="button-theme"
        id="search_glass"
        @click=${this.openInstantSearchDialog}
      >
        ${icon.search}
      </md-icon-button>

      <sc-auto-complete-list></sc-auto-complete-list>

      <span style="position: relative">
        <md-icon-button
          class="button-theme"
          id="more-menu-button"
          alt="menu"
          @click=${this.#openMoreMenu}
        >
          ${icon.more_vert}
        </md-icon-button>

        <md-menu
          id="more-menu"
          anchor="more-menu-button"
          .quick=${true}
          .stayOpenOnOutsideClick=${true}
          .stayOpenOnFocusout=${true}
        >
          <div class="shadow-div">
            <sc-menu-more id="sc-menu-more"></sc-menu-more>
          </div>
        </md-menu>
      </span>
    `;
  }
}

customElements.define('sc-action-items-universal', SCActionItemsUniversal);
