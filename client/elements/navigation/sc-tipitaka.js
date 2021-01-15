import { LitElement, html, css } from 'lit-element';
import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';
import { navigationNormalModeStyles, navigationCompactModeStyles } from './sc-navigation-styles.js';
import { icons } from '../../img/sc-icons';
import '@material/mwc-icon';

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
    };
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.isCompactMode !== state.suttaplexListDisplay) {
      this.isCompactMode = state.suttaplexListDisplay;
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
    this._appViewModeChanged();
    this._fetchMainMenu();
    this.tipitakaGuide = new Map([
      ['sutta', '/discourses'],
      ['vinaya', '/vinaya'],
      ['abhidhamma', '/abhidhamma'],
    ]);
    this.tipitakaBlurb = new Map([
      [
        'sutta',
        'The Buddha’s teachings on meditation, morality, the nature of the world, and the path to freedom. These scriptures are our primary sources for the historical Buddha’s life and practice. They depict the Buddha and his students in lively conversation with a diverse range of people.',
      ],
      [
        'vinaya',
        'The texts on Monastic Law (vinaya) detail the lifestyle, rules, and procedures for Buddhist monks and nuns. They provide the guidelines for Buddhist monastics to this day, and in addition, paint a detailed and vivid picture of everyday life in ancient India.',
      ],
      [
        'abhidhamma',
        'Abhidhamma texts are systematic summaries and analyses of the teachings drawn from the earlier discourses. The Abhidhamma (spelled abhidharma in Sanskrit) is intended for advanced students who have mastered the teachings of the discourses.',
      ],
    ]);
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    this.localizedStringsPath = '/localization/elements/sc-navigation';
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
        await fetch(`${API_ROOT}/menu?language=${this.language || 'en'}`)
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
                        <span class="title" lang="${this.language}">
                          ${item.translated_name || item.root_name}
                        </span>
                        <div class="navigation-nerdy-row">
                          <span class="subTitle" lang="pi">${item.root_name}</span>
                        </div>
                      </span>
                      <span class="header-right">
                        <span class="number"></span>
                        <mwc-icon>${icons['tick']}</mwc-icon>
                        <span class="number-translated">${this.fullSiteLanguageName}</span>
                      </span>
                    </header>
                  </a>
                  <div class="nav-card-content">
                    <div class="blurb" id="${item.root_name}_blurb">
                      ${this.tipitakaBlurb.get(item.uid)}
                    </div>
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
    return html`
      ${this.currentStyles} ${this.compactStyles} ${this.tipitakaCardTemplate}
    `;
  }
}

customElements.define('sc-tipitaka', SCTipitaka);
