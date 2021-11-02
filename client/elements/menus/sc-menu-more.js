import { LitElement, html, css } from 'lit';
import { store } from '../../redux-store';
import './sc-menu-language-base';
import { LitLocalized } from '../addons/sc-localization-mixin';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import { icon } from '../../img/sc-icon';
import { dispatchCustomEvent } from '../../utils/customEvent';

/*
Basic more-vert menu on the main toolbar for choice of language and for choosing static pages
*/

class SCMenuMore extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        font-family: var(--sc-sans-font);
        font-weight: 550;
        --mdc-typography-subtitle1-font-family: var(--sc-sans-font);
        --mdc-typography-subtitle1-font-weight: 550;
        --mdc-list-side-padding: 0px;
        --mdc-theme-secondary: var(--sc-primary-accent-color);
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
        --mdc-checkbox-unchecked-color: var(--sc-icon-color);
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
    this.localizedStringsPath = '/localization/elements/build/interface';
    this.languageListResponse = [];
    this.routeName = store.getState().currentRoute.name;
    this.alwaysShowUniversalToolbar = store.getState().alwaysShowUniversalToolbar;
    this.languageIsVisible = store.getState().languageMenuVisibility;
    this.suttaId = store.getState().currentRoute.params.suttaId;
  }

  get actions() {
    return {
      changeAppTheme(theme) {
        store.dispatch({
          type: 'CHANGE_COLOR_THEME',
          theme,
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

  stateChanged(state) {
    super.stateChanged(state);
    if (this.routeName !== state.currentRoute.name) {
      this.routeName = state.currentRoute.name;
    }
    if (this.routeName === 'sutta' && this.suttaId !== state.currentRoute.params.suttaId) {
      this.suttaId = state.currentRoute.params.suttaId;
      this.requestUpdate();
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
    if (routeName === 'sutta') {
      const suttaId = window.location.pathname.split('/')[1];
      return `https://discourse.suttacentral.net/search?q="${suttaId}%20"`;
    }
    return 'https://discourse.suttacentral.net';
  }

  getDiscourseTitle(routeName) {
    const title = routeName === 'sutta' ? 'joinDiscussion' : 'discussSuttas';
    return this.localize(`interface:${title}`);
  }

  updated() {
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

  _onThemeChanged(e) {
    const chk = e.currentTarget.shadowRoot.querySelector('mwc-checkbox');
    this.actions.changeAppTheme(chk.checked ? 'dark' : 'light');
  }

  _onToolbarDisplayModeChanged(e) {
    const chk = e.currentTarget.shadowRoot.querySelector('mwc-checkbox');
    this.actions.changeAlwaysShowToolbarState(chk.checked);
  }

  _showLanguageMenu() {
    this.actions.changeLanguageMenuVisibility(true);
  }

  _displayCurrentSiteLanguage() {
    return `${this.localize('interface:languageLabel')}: ${this.fullSiteLanguageName}`;
  }

  _renderMoreMenu() {
    return html`
      <mwc-list multi>
        <mwc-list-item
          class="more-menu-mwc-list-item language-choice-box"
          @click=${this._showLanguageMenu}
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
            <div class="menu-item-wrapper">
              ${icon.pray} ${this.localize('interface:donations')}
            </div>
          </mwc-list-item>
        </a>
        <a class="more-menu-link" href="/offline">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.offline_bolt} ${this.localize('interface:useOffline')}
            </div>
          </mwc-list-item>
        </a>
        <a class="more-menu-link" href="/downloads">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.file_download} ${this.localize('interface:downloads')}
            </div>
          </mwc-list-item>
        </a>
        <mwc-check-list-item
          class="more-menu-mwc-list-item"
          id="theme_toggler"
          left
          ?selected=${this.darkThemeChosen}
          @request-selected=${this._onThemeChanged}
        >
          ${this.localize('interface:darkTheme')}
        </mwc-check-list-item>
        <mwc-check-list-item
          class="more-menu-mwc-list-item"
          id="alwaysShowToolbar_toggler"
          left
          ?selected=${this.alwaysShowUniversalToolbar}
          @request-selected=${this._onToolbarDisplayModeChanged}
        >
          ${this.localize('interface:alwaysShowToolbar')}
        </mwc-check-list-item>
        <li divider role="separator"></li>
        <a class="more-menu-link" href="/languages">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.translate} ${this.localize('interface:languages')}
            </div>
          </mwc-list-item>
        </a>
        <a class="more-menu-link" href="/numbering">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.format_list_numbered} ${this.localize('interface:numbering')}
            </div>
          </mwc-list-item>
        </a>
        <a class="more-menu-link" href="/abbreviations">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.abbreviations} ${this.localize('interface:abbreviations')}
            </div>
          </mwc-list-item>
        </a>
        <a class="more-menu-link" href="/methodology">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.school} ${this.localize('interface:methodology')}
            </div>
          </mwc-list-item>
        </a>
        <a class="more-menu-link" href="/acknowledgments">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.people} ${this.localize('interface:acknowledgments')}
            </div>
          </mwc-list-item>
        </a>
        <a class="more-menu-link" href="/licensing">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.copyright} ${this.localize('interface:licensing')}
            </div>
          </mwc-list-item>
        </a>
        <a class="more-menu-link" href="/about">
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">
              ${icon.info_outline} ${this.localize('interface:about')}
            </div>
          </mwc-list-item>
        </a>
        <li divider role="separator"></li>
        <a
          class="more-menu-link"
          href=${this.getDiscourseUrl(this.routeName)}
          title=${this.getDiscourseTitle(this.routeName)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <mwc-list-item class="more-menu-mwc-list-item">
            <div class="menu-item-wrapper">${icon.forum} ${this.localize('interface:discuss')}</div>
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
            <div class="menu-item-wrapper">${icon.speaker} ${this.localize('interface:voice')}</div>
          </mwc-list-item>
        </a>
      </mwc-list>
    `;
  }

  _renderLanguageBaseMenu() {
    return html` <sc-menu-language-base ?noroot=${true}></sc-menu-language-base> `;
  }

  render() {
    if (this.languageIsVisible) return this._renderLanguageBaseMenu();
    return this._renderMoreMenu();
  }
}

customElements.define('sc-menu-more', SCMenuMore);
