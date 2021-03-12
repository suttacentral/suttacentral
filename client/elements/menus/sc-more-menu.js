import { LitElement, html, css, svg } from 'lit-element';
import { store } from '../../redux-store.js';
import './sc-language-base-menu.js';
import { LitLocalized } from '../addons/localization-mixin.js';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item.js';
import { icon } from '../../img/sc-icon';
import { dispatchCustomEvent } from '../../utils/customEvent';

/*
Basic more-vert menu on the main toolbar for choice of language and for choosing static pages
*/

class SCMoreMenu extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        font-family: var(--sc-sans-font);
        font-weight: 500;
        --mdc-list-side-padding: 0px;
      }

      .more-menu-link {
        text-decoration: none;
        color: inherit;
      }

      .icon {
        margin-right: var(--sc-size-md);
        fill: var(--sc-icon-color);
      }

      .more-menu-mwc-list-item {
        color: var(--sc-primary-text-color);
      }

      mwc-check-list-item {
        --mdc-list-side-padding: 8px;
        --mdc-list-item-graphic-margin: 8px;
      }

      #language_menu:after {
        content: '   ';
      }

      [role='separator'] {
        background-color: var(--sc-border-color);
        width: 100%;
        overflow: hidden;
        height: 1px;
        margin-top: var(--sc-size-xxs);
        margin-bottom: var(--sc-size-xxs);
      }

      .chevron_right {
        display: inline-flex;
        margin-right: 0;
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
        display: flex;
        align-items: end;
        padding: 100% 16px;
      }
    `;
  }

  static get properties() {
    return {
      localizedStringsPath: { type: String },
      compactViewChosen: { type: Boolean },
      routeName: { type: String },
      languageIsVisible: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-more-menu';
    this.languageListResponse = [];
    this.routeName = store.getState().currentRoute.name;
    this.alwaysShowUniversalToolbar = store.getState().alwaysShowUniversalToolbar;
    this.languageIsVisible = store.getState().languageMenuVisibility;
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
      changeLanguageMenuVisibility(visibility) {
        store.dispatch({
          type: 'CHANGE_LANGUAGE_MENU_VISIBILITY_STATE',
          languageMenuVisibility: visibility,
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

  connectedCallback() {
    super.connectedCallback();
    if (!this.languageIsVisible) {
      this._initializeListeners();
    }
  }

  _initializeListeners() {
    this.shadowRoot.querySelectorAll('.more-menu-link').forEach(e => {
      e.addEventListener('click', () => {
        dispatchCustomEvent(this, 'item-selected');
      });
    });
  }

  _onThemeChanged() {
    const newTheme = this.darkThemeChosen ? 'light' : 'dark';
    this.actions.changeAppTheme(newTheme);
  }

  _onToolbarDisplayModeChanged(e) {
    this.actions.changeAlwaysShowToolbarState(!e.target.selected);
  }

  _showLanguageMenu() {
    this.actions.changeLanguageMenuVisibility(true);
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
          ${icon.language}
          <div id="language-wrapper">
            <span id="language-text-wrapper">${this._displayCurrentSiteLanguage()}</span>
            ${icon.chevron_right}
          </div>
        </div>
      </mwc-list-item>
      <a class="more-menu-link" href="/donations">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.pray} ${this.localize('Donations')}</div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/offline">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.offline_bolt} ${this.localize('UseOffline')}</div>
        </mwc-list-item>
      </a>
      <mwc-check-list-item
        class="more-menu-mwc-list-item"
        id="theme_toggler"
        left
        ?selected="${this.darkThemeChosen}"
        @request-selected="${this._onThemeChanged}"
      >
        ${this.localize('DarkTheme')}
      </mwc-check-list-item>
      <mwc-check-list-item
        class="more-menu-mwc-list-item"
        id="alwaysShowToolbar_toggler"
        left
        ?selected="${this.alwaysShowUniversalToolbar}"
        @request-selected="${this._onToolbarDisplayModeChanged}"
      >
        ${this.localize('AlwaysShowToolbar')}
      </mwc-check-list-item>
      <a class="more-menu-link" href="/downloads">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.file_download} ${this.localize('Downloads')}</div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/languages">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.translate} ${this.localize('Languages')}</div>
        </mwc-list-item>
      </a>
      <li divider role="separator"></li>
      <a class="more-menu-link" href="/numbering">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            ${icon.format_list_numbered} ${this.localize('Numbering')}
          </div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/abbreviations">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">
            ${icon.abbreviations} ${this.localize('Abbreviations')}
          </div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/methodology">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.school} ${this.localize('Methodology')}</div>
        </mwc-list-item>
      </a>
      <li divider role="separator"></li>
      <a class="more-menu-link" href="/acknowledgments">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.people} ${this.localize('Acknowledgments')}</div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/licensing">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.copyright} ${this.localize('Licensing')}</div>
        </mwc-list-item>
      </a>
      <a class="more-menu-link" href="/about">
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.info_outline} ${this.localize('About')}</div>
        </mwc-list-item>
      </a>
      <li divider role="separator"></li>
      <a
        class="more-menu-link"
        href="${this.getDiscourseUrl(this.routeName)}"
        title="${this.getDiscourseTitle(this.routeName)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.forum} ${this.localize('Discuss')}</div>
        </mwc-list-item>
      </a>
      <a
        class="more-menu-link"
        href="https://voice.suttacentral.net/scv/index.html#/sutta${this.routeName}"
        title="Listen to suttas"
        target="_blank"
        rel="noopener noreferrer"
      >
        <mwc-list-item class="more-menu-mwc-list-item">
          <div class="menu-item-wrapper">${icon.speaker} ${this.localize('Voice')}</div>
        </mwc-list-item>
      </a>
    `;
  }

  _renderLanguageBaseMenu() {
    return html` <sc-language-base-menu noRoot="true"></sc-language-base-menu> `;
  }

  render() {
    if (this.languageIsVisible) return this._renderLanguageBaseMenu();
    return this._renderMoreMenu();
  }
}

customElements.define('sc-more-menu', SCMoreMenu);
