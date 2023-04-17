import { LitElement, html, css } from 'lit';
import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { navigationNormalModeStyles } from './sc-navigation-styles';

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
    this.navArray = store.getState().navigationArray;
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    this.siteLanguage = store.getState().siteLanguage;
    this.localizedStringsPath = '/localization/elements/interface';
    this.pitakaGuide = new Map([
      ['sutta', 'discourses-guide-sujato'],
      ['vinaya', 'vinaya-guide-brahmali'],
      ['abhidhamma', 'abhidhamma-guide-sujato'],
    ]);
    this._fetchMainMenu();
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._fetchMainMenu();
    }
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('navArray')) {
      this.actions.setNavigation(this.navArray);
    }
  }

  firstUpdated() {
    // this._fetchMainMenu();
  }

  async _fetchMainMenu() {
    try {
      this.mainMenuData = await (
        await fetch(`${API_ROOT}/tipitaka_menu?language=${this.siteLanguage || 'en'}`)
      ).json();
      const sortedUids = ['sutta', 'vinaya', 'abhidhamma'];
      this.mainMenuData.sort((a, b) => sortedUids.indexOf(a.uid) - sortedUids.indexOf(b.uid));
    } catch (err) {
      this.mainMenuError = err;
    }
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
                    <a class="essay-link" href=${this.pitakaGuide.get(item.uid)}>
                      <div class="essay">${this.localize(`interface:${item.uid}EssayTitle`)}</div>
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
    return html` ${navigationNormalModeStyles} ${this.tipitakaCardTemplate} `;
  }
}

customElements.define('sc-navigation-tipitaka', SCNavigationTipitaka);
