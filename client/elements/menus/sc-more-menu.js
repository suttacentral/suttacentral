import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import { store } from '../../redux-store.js';
import './sc-language-base-menu.js';
import { LitLocalized } from '../addons/localization-mixin.js'

/*
Basic more-vert menu on the main toolbar for choice of language and for choosing static pages
*/

class SCMoreMenu extends LitLocalized(LitElement) {
  render() {
    return html`
      <style>
        .more-menu-link {
          text-decoration: none;
          color: inherit;
        }

        .more-menu-paper-item .more-menu-icon {
          margin-right: var(--sc-size-md);
          color: var(--sc-disabled-text-color);
        }

        .more-menu-paper-item {
          color: var(--sc-primary-text-color);
        }

        .more-menu-paper-item:hover {
          background-color: var(--sc-tertiary-background-color);
        }

        .more-menu-paper-item.language-choice-box:hover {
          background-color: unset;
        }

        #language_menu:after {
          content: "   ";
        }

        .pwa-icon {
          fill: var(--sc-primary-color);
        }

        .separator {
          @apply --sc-separator;
        }

        .toggle-button {
          --paper-toggle-button-unchecked-bar-color: var(--sc-secondary-text-color);
          --paper-toggle-button-checked-bar-color: var(--sc-primary-accent-color-light);
          --paper-toggle-button-checked-button-color: var(--sc-primary-accent-color);
          --paper-toggle-button-checked-ink-color: var(--sc-primary-accent-color-dark);
          margin-left: calc(var(--sc-size-xs) * -1);
        }
      </style>

      <paper-item class="more-menu-paper-item language-choice-box">
        <iron-icon class="more-menu-icon" icon="sc-iron-icons:language"></iron-icon>
        <sc-language-base-menu id="language_menu" noRoot="true"></sc-language-base-menu>
      </paper-item>

      <a class="more-menu-link" href="/donations">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-svg-icons:pray"></iron-icon>
          ${this.localize('Donations')}
        </paper-item>
      </a>
      <a class="more-menu-link" href="/offline">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon pwa-icon" icon="sc-svg-icons:pwa"></iron-icon>
          ${this.localize('UseOffline')}
        </paper-item>
      </a>
      <paper-item class="more-menu-paper-item">
        <paper-toggle-button id="theme_toggler" class="toggle-button" ?checked="${this.darkThemeChosen}"></paper-toggle-button>
        ${this.localize('DarkTheme')}
      </paper-item>
      <paper-item class="more-menu-paper-item">
        <paper-toggle-button id="view_toggler" class="toggle-button" ?checked="${this.compactViewChosen}"></paper-toggle-button>
        ${this.localize('SuttaplexCompactView')}
      </paper-item>
      <a class="more-menu-link" href="/downloads">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:file-download"></iron-icon>
          ${this.localize('Downloads')}
        </paper-item>
      </a>
      <a class="more-menu-link" href="/languages">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:translate"></iron-icon>
          ${this.localize('Languages')}
        </paper-item>
      </a>
      <div class="separator"></div>
      <a class="more-menu-link" href="/numbering">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:format-list-numbered"></iron-icon>
          ${this.localize('Numbering')}
        </paper-item>
      </a>
      <a class="more-menu-link" href="/abbreviations">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-svg-icons:abbreviations"></iron-icon>
          ${this.localize('Abbreviations')}
        </paper-item>
      </a>
      <a class="more-menu-link" href="/methodology">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-svg-icons:school"></iron-icon>
          ${this.localize('Methodology')}
        </paper-item>
      </a>
      <div class="separator"></div>
      <a class="more-menu-link" href="/acknowledgments">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-svg-icons:people"></iron-icon>
          ${this.localize('Acknowledgments')}
        </paper-item>
      </a>
      <a class="more-menu-link" href="/licensing">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:copyright"></iron-icon>
          ${this.localize('Licensing')}
        </paper-item>
      </a>
      <a class="more-menu-link" href="/about">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:info-outline"></iron-icon>
          ${this.localize('About')}
        </paper-item>
      </a>
      <a class="more-menu-link" href="${this.getDiscourseUrl(this.routeName)}"
        title="${this.getDiscourseTitle(this.routeName)}" target="_blank" rel="noopener noreferrer">
        <paper-item class="more-menu-paper-item">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:forum"></iron-icon>
          ${this.localize('Discuss')}
        </paper-item>
      </a>
    `;
  }

  static get properties() {
    return {
      menuCreated: { type: Boolean },
      localizedStringsPath: { type: String },
      appTheme: { type: String },
      darkThemeChosen: { type: Boolean },
      compactViewChosen: { type: Boolean },
      appView: { type: Boolean },
      routeName: { type: String },
    };
  }

  constructor() {
    super();
    this.menuCreated = false;
    this.localizedStringsPath = '/localization/elements/sc-more-menu';
    this.appTheme = store.getState().colorTheme;
    this.appView = store.getState().suttaplexListDisplay;
    this.routeName = store.getState().currentRoute.name;
    this.darkThemeChosen = this.appTheme === 'dark';
    this.compactViewChosen = this.appView === true;
  }

  get actions() {
    return {
      changeAppTheme(theme) {
        store.dispatch({
          type: 'CHANGE_COLOR_THEME',
          theme: theme
        })
      },
      toggleSuttaplexDisplay(view) {
        store.dispatch({
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay: view
        })
      }
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);

    if (this.appTheme !== state.colorTheme) {
      this.appTheme = state.colorTheme;
      this.darkThemeChosen = this.appTheme === 'dark';
    }

    if (this.appView !== state.suttaplexListDisplay) {
      this.appView = state.suttaplexListDisplay;
      this.compactViewChosen = this.appView === true;
    }

    if (this.routeName !== state.currentRoute.name) {
      this.routeName = state.currentRoute.name;
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
    const title = (routeName === 'SUTTA' ? 'joinDiscussion' : 'discussSuttas');
    return this.localize(title);
  }

  firstUpdated() {
    this._initializeListeners();
  }

  _initializeListeners() {
    const themeTogglerElement = this.shadowRoot.getElementById('theme_toggler');
    if (themeTogglerElement) {
      themeTogglerElement.addEventListener('checked-changed', () => {
        const newTheme = this.darkThemeChosen ? 'light' : 'dark';
        this.actions.changeAppTheme(newTheme);
      });
    }

    const viewTogglerElement = this.shadowRoot.getElementById('view_toggler');
    if (viewTogglerElement) {
      viewTogglerElement.addEventListener('checked-changed', () => {
        const newView = this.compactViewChosen ? false : true;
        this.actions.toggleSuttaplexDisplay(newView);
      });
    }

    this.shadowRoot.querySelectorAll('.more-menu-link').forEach((e) => {
      e.addEventListener('click', (e) => {
        this._dispatchItemSelectedEvent();
      });
    });

    const languageMenuElement = this.shadowRoot.getElementById('language_menu');
    if (languageMenuElement) {
      languageMenuElement.addEventListener('iron-select', (e) => {
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

  _isDarkThemeChosen() {
    return this.appTheme === 'dark';
  }

  _isCompactViewChosen() {
    return this.appView === true;
  }
}

customElements.define('sc-more-menu', SCMoreMenu);
