import { LitElement, html, css } from 'lit';

import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { navigationNormalModeStyles } from './sc-navigation-styles';
import { isMobileBrowser } from '../addons/sc-functions-miscellaneous';

export class SCNavigationTipitaka extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    mainMenuData: { type: Array },
    siteLanguage: { type: String },
  };

  constructor() {
    super();
    this.mainMenuData = [];
    this.localizedStringsPath = '/localization/elements/interface';
    this.pitakaGuide = new Map([
      ['sutta', 'discourses-guide-sujato'],
      ['vinaya', 'vinaya-guide-brahmali'],
      ['abhidhamma', 'abhidhamma-guide-sujato'],
    ]);
    this.siteLanguage = store.getState().siteLanguage;
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._fetchMainMenu();
    }
  }

  async _fetchMainMenu() {
    try {
      this.mainMenuData = await (
        await fetch(`${API_ROOT}/tipitaka_menu?language=${this.siteLanguage || 'en'}`)
      ).json();
      const sortedUids = ['sutta', 'vinaya', 'abhidhamma'];
      this.mainMenuData.sort((a, b) => sortedUids.indexOf(a.uid) - sortedUids.indexOf(b.uid));
    } catch (err) {
      console.error(err);
    }
  }

  get tipitakaCardTemplate() {
    if (!this.mainMenuData || this.mainMenuData.length === 0) {
      return '';
    }

    return html`
      <div class="main-nav">
        ${this.mainMenuData.map(item => html`
          <section class="card home-card">
            <a
              class="header-link"
              title=${item.translated_name || item.root_name}
              href="/pitaka/${item.uid}"
            >
              <header>
                <span class="header-left">
                  <span class="title" lang=${this.siteLanguage}>
                    ${item.translated_name || item.root_name}
                  </span>
                  <div class="navigation-nerdy-row">
                    <span class="subTitle" lang="pi" translate="no">${item.root_name}</span>
                  </div>
                </span>
                ${this.yellowBrickRoadInfoTemplate(item)}
              </header>
              <md-ripple></md-ripple>
            </a>
            <div class="nav-card-content">
              ${this.blurbTemplate(item)}
              <a class="essay-link" href=${this.pitakaGuide.get(item.uid)}>
                <div class="essay">${this.localize(`interface:${item.uid}EssayTitle`)}</div>
              </a>
            </div>
          </section>`
        )}
      </div>`;
  }

  yellowBrickRoadInfoTemplate(menuItem) {
    return menuItem.yellow_brick_road
      ? html`
          <span class="header-right">
            <span class="number-translated">
              <span class="number">${menuItem.yellow_brick_road_count}</span>
              ${this.fullSiteLanguageName}
            </span>
          </span>
        `
      : '';
  }

  blurbTemplate(menuItem) {
    return isMobileBrowser()
      ? ''
      : html` <div class="blurb" id="${menuItem.root_name}_blurb">${menuItem.blurb}</div> `;
  }

  render() {
    return html` ${navigationNormalModeStyles} ${this.tipitakaCardTemplate} `;
  }
}

customElements.define('sc-navigation-tipitaka', SCNavigationTipitaka);
