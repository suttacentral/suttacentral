import { LitElement, html, css } from 'lit-element';

import './sc-more-menu.js';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin'

import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/iron-location/iron-location.js';

import { icons } from '../../img/sc-icons';

class SCUniversalActionItems extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .white-icon {
        color: white;
      }

      .toolbar-paper-button {
        --paper-menu-button-dropdown: {
          max-width: 100%;
        };
        --paper-menu-button-content: {
          box-shadow: var(--sc-shadow-elevation-8dp);
        };
      }

      .toolbar-input {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-md);
        font-weight: 400;
        line-height: 20px;
        --primary-text-color: white;
        --paper-input-container: {
          padding: 0;
        };
        --paper-input-container-color: rgba(255,255,255,0.5);
        --paper-input-container-focus-color: white;
        --paper-input-container-label: {
          color: white;
          opacity: 0.6;
        };
        --paper-input-container-input: {
          color: white;
        };
        display: inline-block;
        vertical-align: text-bottom;
      }

      #close_button {
        display: none;
      }

      #search_input {
        width: 0;
        transition: width .2s linear;
      }

      #more_menu:focus {
        outline: none;
      }

      .more-menu-list {
        background-color: var(--sc-secondary-background-color);
      }

      #more-menu {
        z-index: 999;
      }

      .toolbar-paper-button {
        margin: 0;
      }

      #more_vert_button {
        margin: 0;
        padding: 0;
      }
    `;
  }

  static get properties() {
    return {
      path: { type: String },
      query: { type: String },
      mode: { type: String },
      localizedStringsPath: { type: String },
      search_input: { type: Object },
      searchKeyword: { type: String },
    };
  }

  constructor() {
    super();
    this.path = '';
    this.query = '';
    this.mode = store.getState().toolbarOptions.mode;
    this.localizedStringsPath = '/localization/elements/sc-universal-action-items';
    this.searchKeyword = store.getState().searchQuery;
    this.search_input = this.shadowRoot.getElementById('search_input');
  }

  get actions() {
    return {
      toggleChangeSearchQuery(searchKeyword) {
        store.dispatch({
          type: 'CHANGE_SEARCH_QUERY',
          searchKeyword: searchKeyword
        })
      },
    }
  }

  firstUpdated() {
    const moreMenuElement = this.shadowRoot.getElementById('more_menu');
    if (moreMenuElement) {
      moreMenuElement.addEventListener('item-selected', () => {
        const moreVertButtonElement = this.shadowRoot.getElementById('more_vert_button');
        moreVertButtonElement.close();
      });
    }

    const moreVertButtonElement = this.shadowRoot.getElementById('more_vert_button');
    if (moreVertButtonElement) {
      moreVertButtonElement.addEventListener('click', () => {
        const scActionItems = document.querySelector('sc-site-layout').shadowRoot.querySelector('#action_items');
        scActionItems.hideTopSheets();
      });
    }

    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement && this.searchKeyword.length !== 0) {
      searchInputElement.value = this.searchKeyword;
      this.openSearch();
    }
  }

  openSearch() {
    let wideWindowInnerWidth = 840;
    if (window.innerWidth < wideWindowInnerWidth) {
      this.parentNode.querySelector('ul').style.display = 'none';
      this.shadowRoot.getElementById('more_vert_button').style.display = 'none';
    }
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement.classList.contains('opened')) {
      this._startSearch();
    } else {
      searchInputElement.classList.add('opened');
      this.shadowRoot.getElementById('close_button').style.display = 'inline-block';
      this.calcSearchInputWidth();
      searchInputElement.focus();
      searchInputElement.value = '';
    }
  }

  calcSearchInputWidth() {
    const wideWindowInnerWidth = 840;
    let iconsWidth = 100;
    let searchInputWidth = `${window.innerWidth - iconsWidth}px`;
    if (window.innerWidth > wideWindowInnerWidth) {
      searchInputWidth = '300px';
    }
    this.shadowRoot.querySelector('.opened').style.width = searchInputWidth;
  }

  // Closes the searchbox and resets original values.
  _closeSearch() {
    let wideWindowInnerWidth = 840;
    if (window.innerWidth < wideWindowInnerWidth) {
      this.parentNode.querySelector('ul').style.display = 'inherit';
      this.shadowRoot.getElementById('more_vert_button').style.display = 'inherit';
    }
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement && searchInputElement.classList.contains('opened')) {
      searchInputElement.value = '';
      this.actions.toggleChangeSearchQuery('');

      searchInputElement.classList.remove('opened');
      searchInputElement.removeAttribute('style', 'width');

      this.shadowRoot.getElementById('close_button').style.display = 'none';
    }
  }

  _startSearch() {
    const searchQuery = this.shadowRoot.getElementById('search_input').value;
    this.actions.toggleChangeSearchQuery(searchQuery);
    this.path = '/search';
    this.query = `query=${searchQuery}`;
    const pageLocationElement = this.shadowRoot.getElementById('pageLocation');
    pageLocationElement.path = this.path;
    pageLocationElement.query = this.query;
  }

  render() {
    return html`
      <iron-location id="pageLocation" path="${this.path}" query="${this.query}"></iron-location>
        <iron-a11y-keys
          target=${this.search_input}
          keys="enter"
          @keys-pressed="${this._startSearch}">
        </iron-a11y-keys>

        <mwc-icon-button
          title="${this.localize('searchTooltip')}"
          label="search"
          class="white-icon toolbar-paper-button"
          @click="${this.openSearch}">
          ${icons['search']}
        </mwc-icon-button>

        <paper-input
          class="toolbar-input"
          label="${this.localize('Search')}"
          no-label-float=""
          id="search_input">
        </paper-input>

        <mwc-icon-button
          label="close"
          class="white-icon toolbar-paper-button"
          id="close_button"
          @click="${this._closeSearch}">
          ${icons['close']}
        </mwc-icon-button>

        <paper-menu-button
          class="toolbar-paper-button"
          horizontal-align="right"
          ignore-select=""
          id="more_vert_button"
          vertical-align="auto">
          <mwc-icon-button 
            label="menu"
            class="white-icon toolbar-paper-button" 
            slot="dropdown-trigger" 
            alt="menu">
            ${icons['more_vert']}
          </mwc-icon-button>
          <paper-listbox class="more-menu-list" slot="dropdown-content" tabindex="0">
            <sc-more-menu id="more_menu"></sc-more-menu>
          </paper-listbox>
        </paper-menu-button>
    `;
  }
}

customElements.define('sc-universal-action-items', SCUniversalActionItems);