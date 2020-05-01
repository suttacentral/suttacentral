import { LitElement, html } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/iron-location/iron-location.js';
import '@polymer/neon-animation/animations/slide-from-right-animation.js';

import './sc-more-menu.js';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin'
import { throttle } from 'throttle-debounce';

/*
Base toolbar that appears on the top right in the header of every page. This toolbar is called from the page-selector.
*/

class SCToolbar extends LitLocalized(LitElement) {
  render() {
    return html`
    <style>
      .white-icon {
        color: var(--sc-tertiary-text-color);
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
    line-height: 24px;
        --paper-input-container: {
          padding: 0;
        };
        --paper-input-container-color: var(--sc-tertiary-text-color);
        --paper-input-container-focus-color: var(--sc-tertiary-text-color);
        --paper-input-container-label: {
          color: var(--sc-tertiary-text-color);
          opacity: 0.6;
        };
        --paper-input-container-input: {
          color: var(--sc-tertiary-text-color);
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

      .hidebutton {
        display: none;
      }

      .toolbar-link {
        text-decoration: none;
      }

      .search-open #discourse_button, .search-open > #more_vert_button,
      .search-open #suttaplex_switch_button {
        display: none;
      }

      .more-menu-list {
        background-color: var(--sc-secondary-background-color);
      }

      .absolute-position {
        position: absolute;
      }

      .discourses-link {
        position: relative;
      }

      .toolbar-link, .toolbar-paper-button {
        /* margin: 0 var(--sc-size-sm); */
        margin: 0;
      }

      .smallScreenMargin {
        margin: 0;
      }

      #tools_menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #more_vert_button {
        margin: 0;
      }
    </style>

    <iron-location id="pageLocation" path="${this.path}" query="${this.query}"></iron-location>

    <div id="tools_menu">
      <!-- Search field. iron-a11y-keys fires when the enter-key is pressed-->
      <iron-a11y-keys
        target=${this.search_input}
        keys="enter"
        @keys-pressed="${this._startSearch}">
      </iron-a11y-keys>

      <paper-icon-button
        icon="sc-iron-icons:search"
        title="${this.localize('searchTooltip')}"
        class="white-icon toolbar-paper-button"
        @tap="${this.openSearch}">
      </paper-icon-button>

      <paper-input
        class="toolbar-input"
        label="${this.localize('Search')}"
        no-label-float=""
        id="search_input">
      </paper-input>

      <paper-icon-button
        icon="sc-iron-icons:close"
        class="white-icon toolbar-paper-button"
        id="close_button"
        @tap="${this._closeSearch}">
      </paper-icon-button>

      <!-- Menu for more options like language and other static pages -->
      <paper-menu-button
        class="toolbar-paper-button"
        horizontal-align="right"
        .openAnimationConfig=${this.paperMenuButtonAnimations}
        ignore-select=""
        id="more_vert_button"
        vertical-align="auto">
        <paper-icon-button icon="sc-iron-icons:more-vert" class="white-icon" slot="dropdown-trigger" alt="menu"></paper-icon-button>
        <paper-listbox class="more-menu-list" slot="dropdown-content" tabindex="0">
          <sc-more-menu id="more_menu"></sc-more-menu>
        </paper-listbox>
      </paper-menu-button>
    </div>`;
  }

  static get properties() {
    return {
      path: { type: String },
      suttaplexDisplay: { type: Boolean },
      suttaplexListEnabled: { type: Boolean },
      query: { type: String },
      mode: { type: String },
      localizedStringsPath: { type: String },
      search_input: { type: Object },
      searchKeyword: { type: String },
      paperMenuButtonAnimations: { type: Object }
    }
  }

  constructor() {
    super();
    this.path = '';
    this.suttaplexDisplay = '';
    this.suttaplexListEnabled = store.getState().suttaplexListDisplay;
    this.query = '';
    this.mode = store.getState().toolbarOptions.mode;
    this.localizedStringsPath = '/localization/elements/sc-toolbar';
    this.searchKeyword = store.getState().searchQuery;
    this.search_input = this.shadowRoot.getElementById('search_input');
    this.paperMenuButtonAnimations =  [
      {name: 'fade-in-animation', timing: {delay: 100, duration: 200}},
      {
        name: 'paper-menu-grow-width-animation',
        timing: {
          delay: 100,
          duration: 150,
          easing: 'cubic-bezier(.3,.95,.5,1)'
        }
      },
      {
        name: 'slide-from-right-animation',
        timing: {
          delay: 100,
          duration: 150,
          easing: 'cubic-bezier(.3,.95,.5,1)',
        }
      },
      {
        name: 'paper-menu-grow-height-animation',
        timing: {
          delay: 100,
          duration: 275,
          easing: 'cubic-bezier(.3,.95,.5,1)'
        }
      }
    ];

    //window.addEventListener('resize', throttle(300, () => {
      //const searchInputElement = this.shadowRoot.getElementById('search_input');
      //if (searchInputElement && searchInputElement.classList.contains('opened')) {
        //this._closeSearch();
      //}
    //}));
  }

  get actions() {
    return {
      toggleSuttaplexDisplay(suttaplexdisplay) {
        store.dispatch({
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay: suttaplexdisplay
        })
      },
      toggleChangeSearchQuery(searchKeyword) {
        store.dispatch({
          type: 'CHANGE_SEARCH_QUERY',
          searchKeyword: searchKeyword
        })
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: "CHANGE_TOOLBAR_TITLE",
          title: title
        })
      },
      saveToolbarTitle(title) {
        store.dispatch({
          type: "SAVE_TOOLBAR_TITLE",
          toolbarTitle: title
        })
      }
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

    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement && this.searchKeyword.length !== 0) {
      searchInputElement.value = this.searchKeyword;
      this.openSearch();
    }
  }

  // When looking-glass icon is clicked, determines if the searchbox is already open and if so, starts the search.
  // If not, it opens the search box and moves other elements out of the way depending on the width of the screen.
  openSearch() {
    this.actions.saveToolbarTitle(this.parentNode.querySelector('#toolbar_title').innerText);
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    let largeWindowInnerWidth = 1040;
    let mediumWindowInnerWidth = 480;
    if (searchInputElement.classList.contains('opened')) {
      this._startSearch();
    } else {
      searchInputElement.classList.add('opened');
      this.shadowRoot.getElementById('close_button').style.display = 'inline-block';

      if (window.innerWidth < largeWindowInnerWidth) {
        this.parentNode.querySelector('#toolbar_title_box').setAttribute('style', 'visibility:hidden');
      }
      if (window.innerWidth < mediumWindowInnerWidth) {
        this.parentNode.querySelector('#toolbar_title_box').setAttribute('style', 'display:none');
        this.parentNode.querySelector('#drawertoggle').setAttribute('style', 'display:none');
      }
      this.setSearchInputWidth();

      searchInputElement.focus();
      searchInputElement.value = '';
    }
  }

  setSearchInputWidth() {
    const searchSize = 500;
    const wideWindowInnerWidth = 840;
    const mediumWindowInnerWidth = 480;
    const searchInputMaxWidth = 360;
    let searchInputWidth;
    if (window.innerWidth > wideWindowInnerWidth) {
      searchInputWidth = window.innerWidth - searchSize;
    }
    else if (window.innerWidth > mediumWindowInnerWidth) {
      this.actions.changeToolbarTitle('');
      searchInputWidth = window.innerWidth - (searchSize - 210);
    }
    else {
      this.shadowRoot.getElementById('tools_menu').classList.add('search-open');
      searchInputWidth = window.innerWidth - (searchSize - 420);
    }

    if (searchInputWidth > searchInputMaxWidth) {
      searchInputWidth = searchInputMaxWidth;
    }
    this.shadowRoot.querySelector('.opened').style.width = `${searchInputWidth}px`;
  }

  // Closes the searchbox and resets original values.
  _closeSearch() {
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement && searchInputElement.classList.contains('opened')) {
      searchInputElement.value = '';
      this.actions.toggleChangeSearchQuery('');

      searchInputElement.classList.remove('opened');
      searchInputElement.removeAttribute('style', 'width');

      this.shadowRoot.getElementById('close_button').style.display = 'none';
      this.shadowRoot.getElementById('tools_menu').classList.remove('search-open');
      this.parentNode.querySelector('#toolbar_title_box').removeAttribute('style', 'display');
      this.parentNode.querySelector('#drawertoggle').removeAttribute('style', 'display');
      this.actions.changeToolbarTitle(store.getState().toolbarTitle);
    }
  }

  // Initiates the search function.
  _startSearch() {
    const searchQuery = this.shadowRoot.getElementById('search_input').value;
    this.actions.toggleChangeSearchQuery(searchQuery);
    this.path = '/search';
    this.query = `query=${searchQuery}`;
    const pageLocationElement = this.shadowRoot.getElementById('pageLocation');
    pageLocationElement.path = this.path;
    pageLocationElement.query = this.query;
  }
}

customElements.define('sc-toolbar', SCToolbar);
