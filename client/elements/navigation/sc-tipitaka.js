import { LitElement, html, css } from 'lit-element';

import { API_ROOT } from '../../constants';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';

import { navigationNormaModelStyles, navigationCompactModeStyles } from './sc-navigation-styles.js';

import '@alangdm/block-link';
import '../addons/sc-bouncing-loader';
import '@polymer/paper-ripple/paper-ripple.js';

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
    this.currentStyles = navigationNormaModelStyles;
    this.compactStyles = {};
    this.isCompactMode = store.getState().suttaplexListDisplay;
    this.navArray = store.getState().navigationArray;
    this._appViewModeChanged();
    this._fetchMainMenu();
    this.tipitakaGuide = new Map([
      ['Sutta', '/discourses'],
      ['Vinaya', '/vinaya'],
      ['Abhidhamma', '/abhidhamma'],
    ]);
    this.tipitakaBlurb = new Map([
      ['Sutta', 'These are our primary sources for understanding what the Buddha taught. They record the Buddha’s teachings and conversations on specific occasions with a diverse range of people. Discourses are called sutta in Pali, which is spelled sūtra in Sanskrit.'],
      ['Vinaya', 'The texts on Monastic Law (vinaya) detail the lifestyle, rules, and procedures for Buddhist monks and nuns. They provide the guidelines for Buddhist monastics to this day, and in addition, paint a detailed and vivid picture of everyday life in ancient India.'],
      ['Abhidhamma', 'Abhidhamma texts are systematic summaries and analyses of the teachings drawn from the earlier discourses. The Abhidhamma (spelled abhidharma in Sanskrit) is somewhat later than the Discourses and Vinaya.'],
    ]);
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    this.localizedStringsPath = '/localization/elements/sc-navigation';
  }

  async _fetchMainMenu() {
    this.loading = true;
    try {
      this.mainMenuData = await (await fetch(`${API_ROOT}/menu?language=${this.language}`)).json();
    } catch (err) {
      this.mainMenuError = err;
    }
    this.loading = false;
  }

  get tipitakaCardTemplate() {
    return this.mainMenuData.length
      ? html`
          <div class="main-nav">
            ${this.mainMenuData.map((item) => html`
              <section class="card home-card" @click=${() => this._onTipitakaCardClick(item.uid)}>

                <header>
                  <span class="header-left">
                    <span class="title" lang="${this.language}">
                      ${this.localize(item.name.toLowerCase())}
                    </span>
                    <span class="subTitle" lang="pli">
                      ${item.name}
                    </span>
                  </span>
                  <span class="header-right">
                    <span class="number"></span>
                    <span class="number-translated">${this.fullSiteLanguageName}</span>
                  </span>
                </header>
                <div class='nav-card-content'>
                <div class="blurb">
                  ${this.tipitakaBlurb.get(item.name)}
                </div>
                <div class="essay">
                  <block-link>
                    <a href="${this.tipitakaGuide.get(item.name)}">${this.localizeEx('introduction', 'pitaka', this.localize(item.name.toLowerCase()))}</a>
                  </block-link>
                </div>
                </div>
                <paper-ripple></paper-ripple>
              </section>`
            )}
          </div>
        `
      : `${this.mainMenuData.length}`; 
  }

  _onTipitakaCardClick(childUid) {
    window.location.href = `/${childUid}`;
  }

  render() {
    return html`
      ${this.currentStyles}
      ${this.compactStyles}
      <div class="loading-indicator">
        <sc-bouncing-loader class="loading-spinner" ?active="${this.loading}"></sc-bouncing-loader>
      </div>
      ${this.tipitakaCardTemplate}
    `;
  }
}

customElements.define('sc-tipitaka', SCTipitaka);