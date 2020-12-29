import { LitElement, html, css } from 'lit-element';
import { store } from '../../redux-store.js';
import './sc-language-base-menu.js';
import { LitLocalized } from '../addons/localization-mixin.js';

import '@material/mwc-switch';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import { icons } from '../../img/sc-icons';

/*
Basic more-vert menu on the main toolbar for choice of language and for choosing static pages
*/

class SCMoreMenu extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        font-family: var(--sc-sans-font);
      }

      .more-menu-link {
        text-decoration: none;
        color: inherit;
      }

      .more-menu-mwc-list-item .more-menu-icon {
        margin-right: var(--sc-size-md);
        color: var(--sc-disabled-text-color);
      }

      .more-menu-mwc-list-item {
        color: var(--sc-primary-text-color);
      }

      .more-menu-mwc-list-item:hover {
        background-color: var(--sc-tertiary-background-color);
      }

      .more-menu-mwc-list-item.language-choice-box:hover {
        background-color: unset;
      }

      #language_menu:after {
        content: '   ';
      }

      .separator {
        background-color: var(--sc-border-color);
        width: 100%;
        overflow: hidden;
        height: 1px;
        margin-top: var(--sc-size-xxs);
        margin-bottom: var(--sc-size-xxs);
      }

      mwc-switch {
        padding: 4px;
        margin: 0 4px 0 1px;
        --mdc-theme-surface: var(--sc-tertiary-background-color);
      }

      .switch-item {
        padding-left: calc(var(--mdc-list-side-padding, 16px) - 4px);
      }

      .chevron-right {
        display: inline-flex;
      }

      #language-wrapper {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        min-width: 175px;
        max-width: 185px;
      }

      #language-text-wrapper {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .menu-item-wrapper {
        display: inline-flex;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      menuCreated: { type: Boolean },
      localizedStringsPath: { type: String },
      compactViewChosen: { type: Boolean },
      routeName: { type: String },
      languageIsVisible: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.menuCreated = false;
    this.localizedStringsPath = '/localization/elements/sc-more-menu';
    this.languageListResponse = [];
    this.routeName = store.getState().currentRoute.name;
    this.alwaysShowUniversalToolbar = store.getState().alwaysShowUniversalToolbar;
    this.languageIsVisible = store.getState().languageMenuVisibility;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get actions() {
    return {
      changeAppTheme(theme) {
        store.dispatch({
          type: 'CHANGE_COLOR_THEME',
          theme: theme,
        });
      },
      changeAlwaysShowToolbarState(state) {
        store.dispatch({
          type: 'CHANGE_ALWAYS_SHOW_UNIVERSAL_TOOLBAR_STATE',
          alwaysShowUniversalToolbar: state,
        });
      },
    };
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.routeName !== state.currentRoute.name) {
      this.routeName = state.currentRoute.name;
    }
    if (this.appTheme !== state.colorTheme) {
      this.appTheme = state.colorTheme;
      this.darkThemeChosen = this.appTheme === 'dark';
    }
    if (this.alwaysShowUniversalToolbar !== state.alwaysShowUniversalToolbar) {
      this.alwaysShowUniversalToolbar = state.alwaysShowUniversalToolbar;
    }
    if (this.languageIsVisible !== state.languageMenuVisibility) {
      this.languageIsVisible = state.languageMenuVisibility;
    }
  }

  getDiscourseUrl(routeName) {
    if (routeName === 'SUTTA') {
      const sutta_id = window.location.pathname.split('/')[1];
      return `https://discourse.suttacentral.net/search?q="${sutta_id}%20"`;
    } else {
      return 'https://discourse.suttacentral.net';
    }
  }

  getDiscourseTitle(routeName) {
    const title = routeName === 'SUTTA' ? 'joinDiscussion' : 'discussSuttas';
    return this.localize(title);
  }

  firstUpdated() {
    this._initializeListeners();
  }

  _initializeListeners() {
    const themeTogglerElement = this.shadowRoot.getElementById('theme_toggler');
    if (themeTogglerElement) {
      themeTogglerElement.addEventListener('change', () => {
        const newTheme = this.darkThemeChosen ? 'light' : 'dark';
        this.actions.changeAppTheme(newTheme);
      });
    }

    const alwaysShowToolbarTogglerElement = this.shadowRoot.getElementById(
      'alwaysShowToolbar_toggler'
    );
    if (alwaysShowToolbarTogglerElement) {
      alwaysShowToolbarTogglerElement.addEventListener('change', () => {
        this.actions.changeAlwaysShowToolbarState(alwaysShowToolbarTogglerElement.checked);
      });
    }

    this.shadowRoot.querySelectorAll('.more-menu-link').forEach(e => {
      e.addEventListener('click', e => {
        this._dispatchItemSelectedEvent();
      });
    });

    const languageMenuElement = this.shadowRoot.getElementById('language_menu');
    if (languageMenuElement) {
      languageMenuElement.addEventListener('iron-select', e => {
        if (this.menuCreated) {
          this._dispatchItemSelectedEvent();
        }
        this.menuCreated = true;
      });
    }
  }

  _dispatchItemSelectedEvent() {
    this.dispatchEvent(new CustomEvent('item-selected'));
  }

  _showLanguageMenu() {
    this.languageIsVisible = true;
  }

  _displayCurrentSiteLanguage() {
    return `${this.localize('languageLabel')}: ${this.fullSiteLanguageName}`;
  }

  _renderMoreMenu() {
    return html`
      <mwc-list-item
        class="more-menu-mwc-list-item language-choice-box"
        @click="${this._showLanguageMenu}"
      >
        <div class="menu-item-wrapper">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:language"></iron-icon>
          <div id="language-wrapper">
            <span id="language-text-wrapper">${this._displayCurrentSiteLanguage()}</span>
            <mwc-icon class="chevron-right">${icons['chevron_right']}</mwc-icon>
          </div>
        </div>
      </mwc-list-item>
      <a class="more-menu-link" href="/donations">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-svg-icons:pray"></iron-icon>
            ${this.localize('Donations')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/offline">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon pwa-icon" icon="sc-svg-icons:pwa"></iron-icon>
            ${this.localize('UseOffline')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <mwc-list-item class="more-menu-mwc-list-item switch-item ">
        <div class="menu-item-wrapper">
          <mwc-switch id="theme_toggler" ?checked="${this.darkThemeChosen}"></mwc-switch>
          ${this.localize('DarkTheme')}
        </div>
      </mwc-list-item>
      <mwc-list-item class="more-menu-mwc-list-item switch-item ">
        <div class="menu-item-wrapper">
          <mwc-switch
            id="alwaysShowToolbar_toggler"
            ?checked="${this.alwaysShowUniversalToolbar}"
          ></mwc-switch>
          ${this.localize('AlwaysShowToolbar')}
        </div>
      </mwc-list-item>
      <a class="more-menu-link" href="/downloads">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-iron-icons:file-download"></iron-icon>
            ${this.localize('Downloads')}
          </div>
          <morph-ripple></morph-ripple>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/languages">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-iron-icons:translate"></iron-icon>
            ${this.localize('Languages')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <div class="separator"></div>
      <a class="more-menu-link" href="/numbering">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-iron-icons:format-list-numbered"></iron-icon>
            ${this.localize('Numbering')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/abbreviations">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-svg-icons:abbreviations"></iron-icon>
            ${this.localize('Abbreviations')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/methodology">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-svg-icons:school"></iron-icon>
            ${this.localize('Methodology')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <div class="separator"></div>
      <a class="more-menu-link" href="/acknowledgments">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-svg-icons:people"></iron-icon>
            ${this.localize('Acknowledgments')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/licensing">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-iron-icons:copyright"></iron-icon>
            ${this.localize('Licensing')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/about">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-iron-icons:info-outline"></iron-icon>
            ${this.localize('About')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
      <a
        class="more-menu-link"
        href="${this.getDiscourseUrl(this.routeName)}"
        title="${this.getDiscourseTitle(this.routeName)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            <iron-icon class="more-menu-icon" icon="sc-iron-icons:forum"></iron-icon>
            ${this.localize('Discuss')}
            <morph-ripple></morph-ripple>
          </div>
        </mwc-list-item>
      </a>
    `;
  }

  _renderLanguageBaseMenu() {
    return html`
      <sc-language-base-menu noRoot="true"></sc-language-base-menu>
    `;
  }

  render() {
    if (this.languageIsVisible) return this._renderLanguageBaseMenu();
    return this._renderMoreMenu();
  }
}

customElements.define('sc-more-menu', SCMoreMenu);
