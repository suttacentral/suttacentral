import { LitElement, html } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/iron-location/iron-location.js';
//import '@polymer/neon-animation/animations/slide-from-right-animation.js';

import '@material/mwc-icon';
import '@material/mwc-icon-button';

import './sc-more-menu.js';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin'
import { throttle } from 'throttle-debounce';

/*
Base toolbar that appears on the top right in the header of every page.
*/

class SCActionItems extends LitLocalized(LitElement) {
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

      /* [hidden] {
        display: none !important;
      } */

      .invisible {
        display: none;
      }

#btnLightTheme,
#btnDarkTheme,
#btnViewCompact,
#btnViewComfy
{
    position: relative;
}

#btnLightTheme:after,
#btnDarkTheme:after,
#btnViewCompact:after,
#btnViewComfy:after
{
    font-size: var(--sc-skolar-font-size-xxs);;

    position: absolute;
    bottom: -4px;

    width: 100%;

    text-align: center;
}

#btnLightTheme:after
{
    content: 'colors';
}

#btnDarkTheme:after
{
    content: 'colors';
}

#btnViewCompact:after
{
    content: 'spacing';
}

#btnViewComfy:after
{
    content: 'spacing';
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

      <mwc-icon-button 
        icon="wb_sunny" 
        class="white-icon toolButtons" 
        id="btnLightTheme" 
        title="Light theme"  
        @click="${this._onBtnLightThemeClick}" 
        slot="actionItems" 
        ?hidden="${this.displayLightThemeButton}">
      </mwc-icon-button>

      <mwc-icon-button icon="bedtime"
        class="white-icon toolButtons" 
        id="btnDarkTheme" 
        title="Dark theme" 
        @click="${this._onBtnDarkThemeClick}" 
        slot="actionItems" 
        ?hidden="${this.displayDarkThemeButton}">
      </mwc-icon-button>

      <mwc-icon-button 
        icon="view_compact" 
        class="white-icon toolButtons" 
        id="btnViewCompact" 
        title="Compact mode" 
        @click="${this._onBtnViewCompactClick}" 
        slot="actionItems" 
        ?hidden="${this.displayCompactButton}">
      </mwc-icon-button>

      <mwc-icon-button 
        icon="view_comfy" 
        class="white-icon toolButtons" 
        id="btnViewComfy" 
        title="Comfy mode" 
        @click="${this._onBtnViewCompactClick}" 
        slot="actionItems" 
        ?hidden="${this.displayComfyButton}">
      </mwc-icon-button>

      <mwc-icon-button 
        icon="info" 
        class="white-icon toolButtons" 
        id="btnInfo" 
        title="Text info" 
        @click="${this._onBtnInfoClick}" 
        slot="actionItems" 
        ?hidden="${this.displayInfoButton}">
      </mwc-icon-button>
      
      <mwc-icon-button 
        icon="settings" 
        class="white-icon toolButtons" 
        id="btnTools" 
        title="Text options" 
        @click="${this._onBtnToolsClick}" 
        slot="actionItems" 
        ?hidden="${this.displayToolButton}">
      </mwc-icon-button>

      <mwc-icon-button icon="search"
        title="${this.localize('searchTooltip')}"
        class="white-icon toolbar-paper-button"
        @click="${this.openSearch}">
      </mwc-icon-button>

      <paper-input
        class="toolbar-input"
        label="${this.localize('Search')}"
        no-label-float=""
        id="search_input">
      </paper-input>

      <mwc-icon-button
        icon="close"
        class="white-icon toolbar-paper-button"
        id="close_button"
        @click="${this._closeSearch}">
      </mwc-icon-button>

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
      paperMenuButtonAnimations: { type: Object },
      displaySettingMenu: { type: Boolean },
      displayToolButton: { type: Boolean },
      displayInfoButton: { type: Boolean },
      displayCompactButton: { type: Boolean},
      displayComfyButton: { type: Boolean},
      displayLightThemeButton: { type: Boolean },
      displayDarkThemeButton: { type: Boolean },
      displayViewModeButton: { type: Boolean},
      colorTheme: { type: String },
      suttaMetaText: { type: String }
    }
  }

  constructor() {
    super();
    this.path = '';
    this.suttaplexDisplay = '';
    this.suttaplexListEnabled = store.getState().suttaplexListDisplay;
    this.colorTheme = store.getState().colorTheme;
    //this._colorThemeChanged();
    this.query = '';
    this.mode = store.getState().toolbarOptions.mode;
    this.localizedStringsPath = '/localization/elements/sc-action-items';
    this.searchKeyword = store.getState().searchQuery;
    this.search_input = this.shadowRoot.getElementById('search_input');
    this.displaySettingMenu = store.getState().displaySettingMenu;
    this.displayToolButton = store.getState().displayToolButton;
    this.displayInfoButton = store.getState().displayInfoButton;
    this.displayViewModeButton = store.getState().displayViewModeButton;
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
      },
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display
        })
      },
      changeDisplayToolButtonState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_TOOL_BUTTON_STATE',
          displayToolButton: display
        })
      },
      toggleSuttaplexDisplay(view) {
        store.dispatch({
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay: view
        })
      },
      changeAppTheme(theme) {
        store.dispatch({
          type: 'CHANGE_COLOR_THEME',
          theme: theme
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

    const searchInputElement = this.shadowRoot.getElementById('search_input');
    if (searchInputElement && this.searchKeyword.length !== 0) {
      searchInputElement.value = this.searchKeyword;
      this.openSearch();
    }

    this._displayToolButtonStateChange();
    this._colorThemeChanged();
    this._viewModeChanged();
  }

  _onBtnLightThemeClick() {
    this.actions.changeAppTheme('light');
  }

  _onBtnDarkThemeClick() {
    this.actions.changeAppTheme('dark');
  }

  _onBtnInfoClick(e) {
    this.dispatchEvent(new CustomEvent('show-info-dialog', {
      bubbles: true,
      composed: true
    }));
  }

  _onBtnViewCompactClick(e) {
    this.actions.toggleSuttaplexDisplay(e.currentTarget.id === 'btnViewCompact' ? true : false);
    this._viewModeChanged();
  }

  _viewModeChanged() {
    let isCompactView = store.getState().suttaplexListDisplay;
    if (isCompactView) {
      this.displayCompactButton = false;
      this.displayComfyButton = true;
      this.shadowRoot.querySelector('#btnViewCompact').style.display = 'none';
      this.shadowRoot.querySelector('#btnViewComfy').style.display = 'inherit';
    } else {
      this.displayCompactButton = true;
      this.displayComfyButton = false;
      this.shadowRoot.querySelector('#btnViewCompact').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnViewComfy').style.display = 'none';
    }
    this.requestUpdate();
  }

  _onBtnToolsClick(e) {
    this.displaySettingMenu = store.getState().displaySettingMenu;
    if (!this.displaySettingMenu) {
      this.actions.changeDisplaySettingMenuState(true);
      this._showSettingMenu();
    } else {
      this.actions.changeDisplaySettingMenuState(false);
      this._hideSettingMenu();
    }
  }

  _hideSettingMenu() {
    this.dispatchEvent(new CustomEvent('hide-sc-top-sheet', {
      bubbles: true,
      composed: true
    }));
  }

  _showSettingMenu() {
    this.dispatchEvent(new CustomEvent('show-sc-top-sheet', {
      bubbles: true,
      composed: true
    }));
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.displaySettingMenu !== state.displaySettingMenu) {
      this.displaySettingMenu = state.displaySettingMenu;
    }
    if (this.displayToolButton !== state.displayToolButton) {
      this.displayToolButton = state.displayToolButton;
    }
    if (this.displayViewModeButton !== state.displayViewModeButton) {
      this.displayViewModeButton = state.displayViewModeButton;
    }
    if (this.colorTheme !== state.colorTheme) {
      this.colorTheme = state.colorTheme;
    }
    if (this.suttaMetaText !== state.suttaMetaText) {
      this.suttaMetaText = state.suttaMetaText;
    }
  }

  updated(changedProps) {
    if (changedProps.has('displayToolButton')) {
      this._displayToolButtonStateChange();
    }
    if (changedProps.has('displayViewModeButton')) {
      this._displayViewModeButtonStateChange();
    }
    if (changedProps.has('colorTheme')) {
      this._colorThemeChanged();
    }
    if (changedProps.has('suttaplexListEnabled')) {
      this._viewModeChanged();
    }
    if (changedProps.has('suttaMetaText')) {
    this._suttaMetaTextChanged();
    }
  }

  _suttaMetaTextChanged() {
    let displayStyle = this.suttaMetaText ? 'inherit' : 'none';
    this.shadowRoot.querySelector('#btnInfo').style.display = displayStyle;
  }

  _colorThemeChanged() {
    this.displayLightThemeButton = this.colorTheme === 'light' ? true : false;
    this.displayDarkThemeButton = !this.displayLightThemeButton;

    if (this.displayLightThemeButton) {
      this.shadowRoot.querySelector('#btnLightTheme').style.display = 'none';
      this.shadowRoot.querySelector('#btnDarkTheme').style.display = 'inherit';
    } else {
      this.shadowRoot.querySelector('#btnLightTheme').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnDarkTheme').style.display = 'none';
    }
  }

  _displayViewModeButtonStateChange() {
    if (this.displayViewModeButton) {
      this.shadowRoot.querySelector('#btnViewCompact').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnViewComfy').style.display = 'inherit';
    } else {
      this.shadowRoot.querySelector('#btnViewCompact').style.display = 'none';
      this.shadowRoot.querySelector('#btnViewComfy').style.display = 'none';
    }
  }

  _displayToolButtonStateChange() {
    if (this.displayToolButton) {
      this.shadowRoot.querySelector('#btnTools').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnInfo').style.display = 'inherit';
      this._suttaMetaTextChanged();
    } else {
      this.shadowRoot.querySelector('#btnTools').style.display = 'none';
      this.shadowRoot.querySelector('#btnInfo').style.display = 'none';
    }
  }

  // When looking-glass icon is clicked, determines if the searchbox is already open and if so, starts the search.
  // If not, it opens the search box and moves other elements out of the way depending on the width of the screen.
  openSearch() {
    this.actions.saveToolbarTitle(this.parentNode.querySelector('#toolbarTitle').innerText);
    const searchInputElement = this.shadowRoot.getElementById('search_input');
    let largeWindowInnerWidth = 1040;
    let mediumWindowInnerWidth = 480;
    if (searchInputElement.classList.contains('opened')) {
      this._startSearch();
    } else {
      searchInputElement.classList.add('opened');
      this.shadowRoot.getElementById('close_button').style.display = 'inline-block';

      if (window.innerWidth < largeWindowInnerWidth) {

      }
      if (window.innerWidth < mediumWindowInnerWidth) {

      }
      this.calcSearchInputWidth();

      searchInputElement.focus();
      searchInputElement.value = '';
    }
  }

  calcSearchInputWidth() {
    const wideWindowInnerWidth = 840;
    const mediumWindowInnerWidth = 480;
    const minWindowInnerWidth = 280;
    const searchInputMaxWidth = 20;
    let searchInputWidth = 8;
    if (window.innerWidth > wideWindowInnerWidth) {
      searchInputWidth = 30;
    } else if (window.innerWidth > mediumWindowInnerWidth) {
      this.actions.changeToolbarTitle('');
      this._setToolButtonsVisible(false);
      searchInputWidth = 20;
    } else if (window.innerWidth > minWindowInnerWidth) {
      this.actions.changeToolbarTitle('');
      this._setToolButtonsVisible(false);
      searchInputWidth = 10;
    } else {
      this.actions.changeToolbarTitle('');
      this.shadowRoot.getElementById('tools_menu').classList.add('search-open');
      this._setToolButtonsVisible(false);
      searchInputWidth = 8;
    }

    if (searchInputWidth > searchInputMaxWidth) {
      searchInputWidth = searchInputMaxWidth;
    }
    this.shadowRoot.querySelector('.opened').style.width = `${searchInputWidth}em`;
  }

  _setToolButtonsVisible(visible) {
    this.shadowRoot.querySelectorAll('.toolButtons').forEach((e) => {
      if (e.style.display !== 'none') {
        if (visible) {
          e.classList.remove('invisible');
        } else {
          e.classList.add('invisible');
        }
      }
    });
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
      this.actions.changeToolbarTitle(store.getState().toolbarTitle);
      this._setToolButtonsVisible(true);
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

customElements.define('sc-action-items', SCActionItems);
