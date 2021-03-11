import { LitElement, html, css } from 'lit-element';
import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';
import { navigationNormalModeStyles, navigationCompactModeStyles } from './sc-navigation-styles.js';

class SCTipitaka extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      mainMenuData: { type: Array },
      currentStyles: { type: Object },
      compactStyles: { type: Boolean },
      isCompactMode: { type: Boolean },
      loading: { type: Boolean },
      siteLanguage: { type: String },
    };
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.isCompactMode !== state.suttaplexListDisplay) {
      this.isCompactMode = state.suttaplexListDisplay;
    }
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._fetchMainMenu();
    }
  }

  _appViewModeChanged() {
    this.compactStyles = this.isCompactMode ? navigationCompactModeStyles : null;
  }

  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('isCompactMode')) {
      this._appViewModeChanged();
    }
    if (changedProps.has('navArray')) {
      this.actions.setNavigation(this.navArray);
    }
  }

  constructor() {
    super();
    this.loading = false;
    this.mainMenuData = [];
    this.currentStyles = navigationNormalModeStyles;
    this.compactStyles = {};
    this.isCompactMode = store.getState().suttaplexListDisplay;
    this.navArray = store.getState().navigationArray;
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    this.siteLanguage = store.getState().siteLanguage;
    this.localizedStringsPath = '/localization/elements/sc-navigation';
    this._appViewModeChanged();
    this._fetchMainMenu();
    this.tipitakaGuide = new Map([
      ['sutta', '/discourses'],
      ['vinaya', '/vinaya'],
      ['abhidhamma', '/abhidhamma'],
    ]);
    this.navDataCache = new Map(Object.entries(store.getState().navDataCache || {}));
  }

  async _fetchMainMenu() {
    this.loading = true;
    try {
      // if (!this.navDataCache) {
      //   this.navDataCache = new Map(Object.entries(store.getState().navDataCache || {}));
      // }
      // if (this.navDataCache.has('tipitakaData')) {
      //   this.mainMenuData = this.navDataCache.get('tipitakaData');
      // } else {
      //   this.mainMenuData = await (await fetch(`${API_ROOT}/menu?language=${this.language || 'en'}`)).json();
      // }
      this.mainMenuData = await (
        await fetch(`${API_ROOT}/menu?language=${this.siteLanguage || 'en'}`)
      ).json();
    } catch (err) {
      this.mainMenuError = err;
    }
    this.loading = false;
  }

  get tipitakaCardTemplate() {
    return this.mainMenuData.length
      ? html`
          <div class="main-nav">
            ${this.mainMenuData.map(
              item => html`
                <section class="card home-card">
                  <a
                    class="header-link"
                    title="${item.translated_name || item.root_name}"
                    href="/pitaka/${item.uid}"
                  >
                    <header>
                      <span class="header-left">
                        <span class="title" lang="${this.siteLanguage}">
                          ${item.translated_name || item.root_name}
                        </span>
                        <div class="navigation-nerdy-row">
                          <span class="subTitle" lang="pi" translate="no">${item.root_name}</span>
                        </div>
                      </span>
                      ${item.yellow_brick_road
                        ? html`
                            <span class="header-right">
                              <span class="number-translated">
                                <span class="number">${item.yellow_brick_road_count}</span>
                                ${this.fullSiteLanguageName}
                              </span>
                            </span>
                          `
                        : ''}
                    </header>
                  </a>
                  <div class="nav-card-content">
                    <div class="blurb" id="${item.root_name}_blurb">${item.blurb}</div>
                    <a class="essay-link" href="${this.tipitakaGuide.get(item.uid)}">
                      <div class="essay">${this.localize(`${item.uid}_essayTitle`)}</div>
                    </a>
                  </div>
                </section>
              `
            )}
          </div>
        `
      : '';
  }

  render() {
    return html` ${this.currentStyles} ${this.compactStyles} ${this.tipitakaCardTemplate} `;
  }
}

customElements.define('sc-tipitaka', SCTipitaka);
