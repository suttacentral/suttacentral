import { LitElement, html, css } from 'lit-element';
import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { navigationNormalModeStyles } from './sc-navigation-styles';
import { pitakaGuide } from './sc-navigation-common';

class SCNavigationTipitaka extends LitLocalized(LitElement) {
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
      loading: { type: Boolean },
      siteLanguage: { type: String },
    };
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._fetchMainMenu();
    }
  }

  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('navArray')) {
      this.actions.setNavigation(this.navArray);
    }
  }

  constructor() {
    super();
    this.loading = false;
    this.mainMenuData = [];
    this.currentStyles = navigationNormalModeStyles;
    this.navArray = store.getState().navigationArray;
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    this.siteLanguage = store.getState().siteLanguage;
    this.localizedStringsPath = '/localization/elements/sc-navigation';
    this._fetchMainMenu();
  }

  async _fetchMainMenu() {
    this.loading = true;
    try {
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
                    <a class="essay-link" href="${pitakaGuide.get(item.uid)}">
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
    return html` ${this.currentStyles} ${this.tipitakaCardTemplate} `;
  }
}

customElements.define('sc-navigation-tipitaka', SCNavigationTipitaka);
