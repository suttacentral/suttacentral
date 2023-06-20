import { css, html, LitElement } from 'lit';

import './sc-menu-more';
import { LitLocalized } from '../addons/sc-localization-mixin';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@material/web/iconbutton/standard-icon-button';

import { icon } from '../../img/sc-icon';
import { dispatchCustomEvent } from '../../utils/customEvent';

export class SCActionItemsUniversal extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgb(75, 74, 73);
      --mdc-theme-surface: var(--sc-secondary-background-color);
    }

    #close_button {
      position: absolute;
      right: 0px;
      padding: 0 4px 0 4px;
      z-index: -1;
      color: white;
      background-color: rgb(75, 74, 73);
    }

    #search_input {
      visibility: hidden;
      box-sizing: border-box;
      padding: 0 116px 0 16px;
      outline: none;
      border: 2px solid rgba(0, 0, 0, 0);
      height: 48px;
      width: 100%;
      position: absolute;
      left: 0;
      transform: scaleX(0);
      transition: transform 200ms ease;
      z-index: 100;
      background-color: rgb(244, 243, 242);
      font-family: var(--sc-sans-font);
      font-size: var(--sc-skolar-font-size-md);
      color: rgb(34, 33, 32);
    }

    #search_input.opened {
      visibility: visible;
      transform: scaleX(1);
    }

    #search_input.opened:focus {
      border: 2px solid rgb(67, 160, 71);
    }

    #search_glass {
      z-index: 101;
      background-color: rgb(75, 74, 73);
      padding: 0 4px;
    }

    #sc-menu-more:focus {
      outline: none;
    }

    .more-menu-list {
      background-color: var(--sc-secondary-background-color);
    }

    .icon {
      fill: var(--sc-tertiary-text-color);
    }

    #more-menu {
      z-index: 102;
      --mdc-menu-min-width: 275px;
      --mdc-menu-max-width: 290px;
    }
  `;

  static properties = {
    mode: { type: String },
    localizedStringsPath: { type: String },
    search_input: { type: Object },
    searchKeyword: { type: String },
    moreMenu: { type: Object },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.search_input = this.shadowRoot?.getElementById('search_input');
  }

  stateChanged(state) {
    super.stateChanged(state);
    this.searchKeyword = state.searchQuery || '';
    this.mode = state.toolbarOptions.mode;
  }

  firstUpdated() {
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement && this.searchKeyword && this.searchKeyword?.length !== 0) {
      searchInputElement.value = this.searchKeyword;
      this.openSearch();
    }
    this.moreMenu = this.shadowRoot.querySelector('#more-menu');
    this.moreMenu.anchor = this.shadowRoot.querySelector('#more-menu-button');

    this.moreMenu.addEventListener('item-selected', () => {
      this.moreMenu.close();
    });

    this.moreMenu.anchor.addEventListener('click', () => {
      this.#hideTopSheets();
    });
  }

  #hideTopSheets() {
    const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    scActionItems?.hideTopSheets();
  }

  openMoreMenu() {
    (this.moreMenu || {}).show();
  }

  openSearch() {
    this.#hideTopSheets();
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement.classList.contains('opened')) {
      this._startSearch();
    } else {
      searchInputElement.classList.add('opened');
      this.shadowRoot.getElementById('close_button').style.zIndex = '101';
      this.shadowRoot.getElementById('search_glass').style.backgroundColor = 'rgb(67, 160, 71)';
      searchInputElement.focus();
      searchInputElement.value = '';
    }
  }

  // Closes the searchbox and resets original values.
  _closeSearch() {
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement && searchInputElement.classList.contains('opened')) {
      searchInputElement.value = '';

      searchInputElement.classList.remove('opened');
      searchInputElement.removeAttribute('style', 'width');

      this.shadowRoot.getElementById('close_button').style.zIndex = '-1';
      this.shadowRoot.getElementById('search_glass').style.backgroundColor = 'inherit';
    }
  }

  _startSearch() {
    const searchQuery = this.shadowRoot.getElementById('search_input').value;
    dispatchCustomEvent(this, 'sc-navigate', { pathname: `/search?query=${searchQuery}` });
  }

  keypressHandler({ key }) {
    if (key === 'Enter') {
      this.#hideTopSheets();
      this._startSearch();
    }
  }

  render() {
    return html`
      <md-standard-icon-button
        id="search_glass"
        title=${this.localize('search:searchTooltip')}
        label="search"
        @click=${this.openSearch}
        aria-label="Search"
      >
        ${icon.search}
      </md-standard-icon-button>
      <input
        id="search_input"
        name="q"
        type="search"
        style="height: 48px"
        spellcheck=true
        placeholder=${this.localize('search:search')}
        @keypress=${this.keypressHandler}
        aria-label="Search through site content"
      ></input>
      <md-standard-icon-button
      label="close"
      id="close_button"
      title="Close search bar"
      aria-label="Close search bar"
      @click=${this._closeSearch}>
        ${icon.close}
      </md-standard-icon-button>
      <md-standard-icon-button
        label="menu"
        id="more-menu-button"
        @click=${this.openMoreMenu}
        alt="menu"
        aria-label="Menu"
      >
        ${icon.more_vert}
      </md-standard-icon-button>
      <mwc-menu corner="BOTTOM_LEFT" id="more-menu" activatable>
        <sc-menu-more id="sc-menu-more"></sc-menu-more>
      </mwc-menu>
    `;
  }
}

customElements.define('sc-action-items-universal', SCActionItemsUniversal);
