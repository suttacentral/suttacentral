import { LitElement, html, css } from 'lit';
import { cache } from 'lit/directives/cache.js';
import { store } from '../../redux-store';
import { reduxActions } from '../addons/sc-redux-actions';
import './sc-menu-language-base';
import { LitLocalized } from '../addons/sc-localization-mixin';

import '@material/web/divider/divider';
import '@material/web/menu/menu-item';
import '@material/web/checkbox/checkbox';
import '@material/web/radio/radio';

import { icon } from '../../img/sc-icon';
import { dispatchCustomEvent } from '../../utils/customEvent';

/*
Basic more-vert menu on the main toolbar for choice of language and for choosing static pages
*/

export class SCMenuMore extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      font-family: var(--sc-sans-font);
      font-weight: 550;
      --md-sys-color-primary: var(--sc-primary-accent-color);

      --md-menu-item-top-space: 8px;
      --md-menu-item-bottom-space: 8px;

      --md-menu-item-one-line-container-height: 48px;
    }

    .shadow::before {
      box-shadow: var(--sc-shadow-elevation-24dp);
    }

    .icon {
      margin-right: var(--sc-size-md);

      fill: var(--sc-icon-color);
    }

    .more-menu-md-menu-item {
      color: var(--sc-on-primary-primary-text-color);
    }

    .chevron_right {
      display: inline-flex;

      margin-right: 0;
    }

    #language-wrapper {
      display: inline-flex;

      min-width: 175px;
      max-width: 185px;

      justify-content: space-between;
      align-items: center;
    }

    #language-text-wrapper {
      overflow: hidden;

      max-width: 150px;

      white-space: nowrap;
      text-overflow: ellipsis;
    }

    label {
      background-color: var(--sc-secondary-background-color);
    }

    md-menu-item md-checkbox {
      margin-left: 2px;
      padding: 0;
    }

    .menu-item-wrapper {
      display: flex;
      flex-direction: row;

      align-items: end;
    }

    md-menu-item div {
      display: flex;
      flex-direction: row;

      color: var(--sc-on-primary-primary-text-color);

      align-items: end;
    }

    md-checkbox {
      margin-bottom: 18px;
    }

    md-menu-item label {
      display: flex;
      flex-direction: row;

      align-items: end;
    }

    md-menu-item {
      margin: 4px 8px;

      transition: var(--sc-link-transition);

      color: var(--sc-on-primary-primary-text-color);
      border-radius: 28px;
      background-color: var(--sc-secondary-background-color);

      --md-menu-item-label-text-font: var(--sc-sans-font);
      --md-menu-item-label-text-weight: 500;
      --md-menu-item-hover-state-layer-color: var(--sc-primary-color);
    }

    md-menu-item::part(focus-ring) {
      border-radius: 28px;
    }

    .menu-checkbox-item-title {
      line-height: 1.2;

      margin-bottom: 16px;
      margin-left: 4px;

      color: var(--sc-on-primary-primary-text-color);
    }

    .menu-radio-item-title {
      line-height: 1.2;

      margin-left: 18px;

      color: var(--sc-on-primary-primary-text-color);
    }

    #menu-checkbox-item {
      height: 48px;
    }
  `;

  static properties = {
    localizedStringsPath: { type: String },
    compactViewChosen: { type: Boolean },
    routeName: { type: String },
    languageIsVisible: { type: Boolean },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.languageListResponse = [];
    this.routeName = store.getState().currentRoute.name;
    this.alwaysShowUniversalToolbar = store.getState().alwaysShowUniversalToolbar;
    this.languageIsVisible = store.getState().languageMenuVisibility;
    this.suttaId = store.getState().currentRoute.params?.suttaId;
    this.toolbarPosition = store.getState().toolbarPosition;
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
    if (this.toolbarPosition !== state.toolbarPosition) {
      this.toolbarPosition = state.toolbarPosition;
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

  #onThemeChanged() {
    const chk = this.shadowRoot.querySelector('#theme_toggler');
    this.actions.changeAppTheme(chk.checked ? 'dark' : 'light');
  }

  _onToolbarDisplayModeChanged(e) {
    const chk = e.currentTarget.shadowRoot.querySelector('md-checkbox');
    this.actions.changeAlwaysShowToolbarState(chk.checked);
  }

  _onToolbarPositionChanged(e) {
    const toolbarPosition = {};
    if (e.currentTarget.id === 'radioScrollForToolbar' && e.currentTarget.checked) {
      toolbarPosition.scrollForToolbar = true;
      toolbarPosition.fixedToolbar = false;
      toolbarPosition.toolbarAtTop = false;
    }
    if (e.currentTarget.id === 'radioFixedToolbar' && e.currentTarget.checked) {
      toolbarPosition.scrollForToolbar = false;
      toolbarPosition.fixedToolbar = true;
      toolbarPosition.toolbarAtTop = false;
    }
    if (e.currentTarget.id === 'radioToolbarAtTop' && e.currentTarget.checked) {
      toolbarPosition.scrollForToolbar = false;
      toolbarPosition.fixedToolbar = false;
      toolbarPosition.toolbarAtTop = true;
    }
    if (JSON.stringify(toolbarPosition) !== '{}') {
      reduxActions.changeToolbarPosition(toolbarPosition);
    }
    this.requestUpdate();
  }

  _showLanguageMenu() {
    this.actions.changeLanguageMenuVisibility(true);
  }

  _displayCurrentSiteLanguage() {
    return `${this.localize('interface:languageLabel')}: ${this.fullSiteLanguageName}`;
  }

  _renderMoreMenu() {
    return html`
      <md-menu-item
        class="more-menu-md-menu-item language-choice-box"
        @click=${this._showLanguageMenu}
        .keepOpen=${true}
      >
        <div slot="headline">
          ${icon.language}
          <div id="language-wrapper">
            <span id="language-text-wrapper">${this._displayCurrentSiteLanguage()}</span>
            ${icon.chevron_right}
          </div>
        </div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/donations">
        <div slot="headline">${icon.pray} ${this.localize('interface:donations')}</div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/offline">
        <div slot="headline">${icon.offline_bolt} ${this.localize('interface:useOffline')}</div>
      </md-menu-item>

      <md-menu-item .keepOpen=${true} id="menu-checkbox-item">
        <label>
          <md-checkbox
            touch-target="wrapper"
            id="theme_toggler"
            left
            ?checked=${this.darkThemeChosen}
            @change=${this.#onThemeChanged}
          ></md-checkbox>
          <span class="menu-checkbox-item-title">${this.localize('interface:darkTheme')}</span>
        </label>
      </md-menu-item>

      <md-divider></md-divider>

      <div role="radiogroup"></div>
        <md-menu-item .keepOpen=${true}>
          <label>
            <md-radio
              class="more-menu-md-menu-item"
              left
              group="toolbarPosition"
              ?checked=${this.toolbarPosition.scrollForToolbar}
              id="radioScrollForToolbar"
              @change=${e => this._onToolbarPositionChanged(e)}
            ></md-radio>
            <span class="menu-radio-item-title">${this.localize(
              'interface:scrollForToolbar'
            )}</span>
          </label>
        </md-menu-item>

        <md-menu-item .keepOpen=${true}>
          <label>
            <md-radio
              class="more-menu-md-menu-item"
              left
              group="toolbarPosition"
              ?checked=${this.toolbarPosition.fixedToolbar}
              @change=${e => this._onToolbarPositionChanged(e)}
              id="radioFixedToolbar"
            ></md-radio>
            <span class="menu-radio-item-title">${this.localize('interface:fixedToolbar')}</span>
          </label>
        </md-menu-item>

        <md-menu-item .keepOpen=${true}>
          <label>
            <md-radio
              class="more-menu-md-menu-item"
              left
              group="toolbarPosition"
              ?checked=${this.toolbarPosition.toolbarAtTop}
              @change=${e => this._onToolbarPositionChanged(e)}
              id="radioToolbarAtTop"
            ></md-radio>
            <span class="menu-radio-item-title">${this.localize('interface:toolbarAtTop')}</span>
          </label>
        </md-menu-item>
      </div>

      <md-divider></md-divider>

      <md-menu-item class="more-menu-md-menu-item" href="/languages">
        <div slot="headline">${icon.translate} ${this.localize('interface:languages')}</div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/numbering">
        <div slot="headline">
          ${icon.format_list_numbered} ${this.localize('interface:numbering')}
        </div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/abbreviations">
        <div slot="headline">${icon.abbreviations} ${this.localize('interface:abbreviations')}</div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/map">
        <div slot="headline">${icon.map} ${this.localize('interface:map')}</div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/methodology">
        <div slot="headline">${icon.school} ${this.localize('interface:methodology')}</div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/acknowledgments">
        <div slot="headline">${icon.people} ${this.localize('interface:acknowledgments')}</div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/licensing">
        <div slot="headline">${icon.copyright} ${this.localize('interface:licensing')}</div>
      </md-menu-item>

      <md-menu-item class="more-menu-md-menu-item" href="/about">
        <div slot="headline">${icon.info} ${this.localize('interface:about')}</div>
      </md-menu-item>

      <md-divider></md-divider>

      <md-menu-item
        class="more-menu-md-menu-item"
        href=${this.getDiscourseUrl(this.routeName)}
        title=${this.getDiscourseTitle(this.routeName)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div slot="headline">${icon.forum} ${this.localize('interface:discuss')}</div>
      </md-menu-item>

      <md-menu-item
        class="more-menu-md-menu-item"
        href="https://voice.suttacentral.net/scv/index.html#/sutta${this.routeName}"
        title="Listen to suttas"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div slot="headline">${icon.speaker} ${this.localize('interface:voice')}</div>
      </md-menu-item>
    `;
  }

  _renderLanguageBaseMenu() {
    return html` <sc-menu-language-base ?noroot=${true}></sc-menu-language-base> `;
  }

  render() {
    return html`${cache(
      this.languageIsVisible ? this._renderLanguageBaseMenu() : this._renderMoreMenu()
    )}`;
  }
}

customElements.define('sc-menu-more', SCMenuMore);
