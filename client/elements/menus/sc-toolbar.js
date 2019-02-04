import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/iron-location/iron-location.js';

import './sc-more-menu.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { Localized } from '../addons/localization-mixin.js';
import { ReduxMixin } from '../../redux-store.js';

/*
Base toolbar that appears on the top right in the header of every page. This toolbar is called from the page-selector.
*/

class SCToolbar extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
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
          @apply --shadow-elevation-8dp;
        };
      }

      .toolbar-input {
        @apply --sc-paper-font-body;
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
        transition: width .2s cubic-bezier(.4, 0, .2, 1);
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
        margin: 0 var(--sc-size-sm);
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

    <iron-location path="{{path}}" query="{{query}}"></iron-location>

    <div id="tools_menu">
      <!-- Search field. iron-a11y-keys fires when the enter-key is pressed-->
      <iron-a11y-keys target="[[search_input]]" keys="enter" on-keys-pressed="_startSearch"></iron-a11y-keys>
      <paper-icon-button icon="sc-iron-icons:search" title="{{localize('searchTooltip')}}" class="white-icon toolbar-paper-button" on-tap="openSearch"></paper-icon-button>
      <paper-input class="toolbar-input" label="{{localize('Search')}}" no-label-float="" id="search_input"></paper-input>
      <paper-icon-button icon="sc-iron-icons:close" class="white-icon toolbar-paper-button" id="close_button" on-tap="_closeSearch"></paper-icon-button>

      <!-- Menu for more options like language and other static pages -->
      <paper-menu-button class="toolbar-paper-button" horizontal-align="right" ignore-select="" id="more_vert_button" vertical-align="auto">
        <paper-icon-button icon="sc-iron-icons:more-vert" class="white-icon" slot="dropdown-trigger" alt="menu"></paper-icon-button>
        <paper-listbox class="more-menu-list" slot="dropdown-content" tabindex="0">
          <sc-more-menu id="more_menu"></sc-more-menu>
        </paper-listbox>
      </paper-menu-button>
    </div>`;
  }

  static get properties() {
    return {
      path: {
        type: String
      },
      suttaplexDisplay: {
        type: Boolean
      },
      suttaplexListEnabled: {
        type: Boolean,
        statePath: 'suttaplexListDisplay'
      },
      query: {
        type: String
      },
      mode: {
        type: String,
        statePath: 'toolbarOptions.mode'
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-toolbar'
      },
      // Polymer lint fails if you don't include this:
      search_input: Object
    }
  }

  static get actions() {
    return {
      toggleSuttaplexDisplay(suttaplexdisplay) {
        return {
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay: suttaplexdisplay
        }
      }
    }
  }

  ready() {
    super.ready();
    this.$.more_menu.addEventListener('item-selected', (e) => {
      this.$.more_vert_button.close();
    });
  }

  // When looking-glass icon is clicked, determines if the searchbox is already open and if so, starts the search.
  // If not, it opens the search box and moves other elements out of the way depending on the width of the screen.
  openSearch() {
    if (this.$.search_input.classList.contains('opened')) {
      this._startSearch();
    } else {
      this.$.search_input.classList.add('opened');
      this.$.search_input.focus();
      this.$.close_button.style.display = 'inline-block';
      this.$.search_input.value = '';
      let searchSize = 500;
      if (window.innerWidth < 1040) {
        dom(this.root.host.offsetParent).querySelector('#toolbar_title_box')
          .setAttribute('style', 'visibility:hidden')
      }
      let searchWidth;
      if (window.innerWidth > 840) {
        searchWidth = window.innerWidth - searchSize;
      } else if (window.innerWidth > 480) {
        searchWidth = window.innerWidth - (searchSize - 210);
      } else {
        this.$.tools_menu.classList.add('search-open');
        searchWidth = window.innerWidth - (searchSize - 320);
      }
      if (searchWidth > 360) {
        searchWidth = 360
      }
      this.shadowRoot.querySelector('.opened').style.width = `${searchWidth}px`;
    }
  }

  // Closes the searchbox and resets original values.
  _closeSearch() {
    if (this.$.search_input.classList.contains('opened')) {
      this.$.search_input.classList.remove('opened');
      this.$.search_input.removeAttribute('style', 'width');
      this.$.close_button.style.display = 'none';
      this.$.tools_menu.classList.remove('search-open');
      dom(this.root.host.offsetParent).querySelector('#toolbar_title_box')
        .removeAttribute('style', 'display');
    }
  }

  // Initiates the search function.
  _startSearch() {
    const searchQuery = this.$.search_input.value;
    this.set('path', '/search');
    this.set('query', `query=${searchQuery}`);
  }
}

customElements.define('sc-toolbar', SCToolbar);
