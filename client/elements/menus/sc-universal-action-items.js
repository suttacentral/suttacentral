import { css, html, LitElement } from 'lit';

import './sc-more-menu.js';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@material/mwc-button';

import { icon } from '../../img/sc-icon';
import { dispatchCustomEvent } from '../../utils/customEvent';

class SCUniversalActionItems extends LitLocalized(LitElement) {
  static get styles() {
    return css`
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
        padding: 0 116px 0 2vw;
        outline: none;
        border: none;
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

      #search_glass {
        z-index: 101;
        background-color: rgb(75, 74, 73);
        padding: 0 4px;
      }

      #sc-more-menu:focus {
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
    `;
  }

  static get properties() {
    return {
      mode: { type: String },
      localizedStringsPath: { type: String },
      search_input: { type: Object },
      searchKeyword: { type: String },
      moreMenu: { type: Object },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-universal-action-items';
    this.search_input = this.shadowRoot.getElementById('search_input');
  }

  _stateChanged(state) {
    super._stateChanged(state);
    this.searchKeyword = state.searchQuery || '';
    this.mode = state.toolbarOptions.mode;
  }

  firstUpdated() {
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement && this.searchKeyword.length !== 0) {
      searchInputElement.value = this.searchKeyword;
      this.openSearch();
    }
    this.moreMenu = this.shadowRoot.querySelector('#more-menu');
    this.moreMenu.anchor = this.shadowRoot.querySelector('#more-menu-button');

    this.moreMenu.addEventListener('item-selected', () => {
      this.moreMenu.close();
    });

    this.moreMenu.anchor.addEventListener('click', () => {
      const scActionItems = document
        .querySelector('sc-site-layout')
        .shadowRoot.querySelector('#action_items');
      scActionItems.hideTopSheets();
    });
  }

  openMoreMenu() {
    (this.moreMenu || {}).show();
  }

  openSearch() {
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
      this._startSearch();
    }
  }

  render() {
    return html`
      <mwc-icon-button
        id="search_glass"
        title="${this.localize('searchTooltip')}"
        label="search"
        @click="${this.openSearch}"
      >
        ${icon.search}
      </mwc-icon-button>
      <input 
        id="search_input"
        name="q"
        type="search"
        style="height: 48px"
        spellcheck=true
        placeholder="${this.localize('Search')}"
        @keypress="${this.keypressHandler}"
        aria-label="Search through site content"
      ></input>
      <mwc-icon-button 
      label="close" 
      id="close_button" 
      title="Close search bar"
      @click="${this._closeSearch}">
        ${icon.close}
      </mwc-icon-button>
      <mwc-icon-button label="menu" id="more-menu-button" @click="${this.openMoreMenu}" alt="menu">
        ${icon.more_vert}
      </mwc-icon-button>
      <mwc-menu corner="BOTTOM_LEFT" id="more-menu">
        <sc-more-menu id="sc-more-menu"></sc-more-menu>
      </mwc-menu>
    `;
  }
}

customElements.define('sc-universal-action-items', SCUniversalActionItems);
