import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { API_ROOT } from '../../constants';
import { navigationNormaModelStyles, navigationCompactModeStyles } from './sc-navigation-styles';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';

import { pitakaGuide, navIndex } from './sc-navigation-common';
import "@alangdm/block-link";

const childMenuCache = {};

class SCNavigation extends LitLocalized(LitElement) {

  static get properties() {
    return {
      mainMenuData: { type: Array },
      childMenuData: { type: Array},
      isCompactMode: { type: Boolean },
      compactStyles: { type: Boolean },
      pitakaName: { type: String },
      pitakaData: { type: Object },
      parallelsData: { type: Object },
      vaggasData: { type: Object },
      localizedStringsPath: { type: String },
      parallelsName: { type: String },
      vaggasId: { type: String },
      languageCountData: { type: Object },
      navArray: { type: Array },
      routePath: { type: String },
      currentNavPosition: { type: Number },
      languages: { type: Object },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-navigation';
    this.compactStyles = {};
    this.isCompactMode = store.getState().suttaplexListDisplay;
    this.navArray = store.getState().navigationArray;
    this.currentNavPosition = store.getState().currentNavPosition;
    this._appViewModeChanged();
    this.childMenuData = [];

    let currentNavState = this.navArray[this.currentNavPosition];
    if (currentNavState) {
      if (currentNavState.type === 'vaggas') {
        this.vaggasId = currentNavState.vaggasId;
        this._onParallelsCardClick(this.vaggasId, currentNavState.vaggasName);
      }
      if (currentNavState.type === 'parallels') {
        this.parallelsName = currentNavState.parallelsName;
      }
    }

    this._fetchMainMenuData();
    this.routePath = store.getState().currentRoute.path;
    let navType = 'pitaka';
    let navIndexesOfType = navIndex.get(navType);
    if (!this.navArray[navIndexesOfType.index]) {
      this.navArray[navIndexesOfType.index] = {
        title: `${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}`,
        url: `/pitaka/${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}`,
        type: navType,
        displayPitaka: true,
        displayParallels: false,
        displayVaggas: false,
        position: navIndexesOfType.position,
        navigationArrayLength: navIndexesOfType.navArrayLength
      };
      this.actions.setNavigation(this.navArray);
      this.actions.setCurrentNavPosition(navIndexesOfType.position);
      this.actions.changeToolbarTitle(this._getPathParamNumber(navIndexesOfType.pathParamIndex));
    }
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.isCompactMode !== state.suttaplexListDisplay) {
      this.isCompactMode = state.suttaplexListDisplay;
    }
    if (this.currentNavPosition !== state.currentNavPosition) {
      this.currentNavPosition = state.currentNavPosition
    }
    //this.requestUpdate();
  }
  
  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('isCompactMode')) {
      this._appViewModeChanged();
    }
    if (changedProps.has('shouldShowPitakaParallelsContent')) {
      this._fetchMainMenuData();
      this._attachLanguageCount();
    }
    if (changedProps.has('shouldShowVaggasContent')) {
      this._fetchChildMenuData()
    }
    if (changedProps.has('navArray')) {
      this.actions.setNavigation(this.navArray);
    }
    if (changedProps.has('currentNavPosition')) {
      this._fetchMainMenuData();
      this._attachLanguageCount();

      let currentNavState = this.navArray[this.currentNavPosition];
      if (currentNavState) {
        if (currentNavState.type === 'vaggas') {
          this.vaggasId = currentNavState.vaggasId;
          this._onParallelsCardClick(this.vaggasId, currentNavState.vaggasName);
        }
        if (currentNavState.type === 'parallels') {
          this.parallelsName = currentNavState.parallelsName;
        }
      }
    }
  }

  get actions() {
    return {
      setNavigation(navArray) {
        store.dispatch({
          type: 'SET_NAVIGATION',
          navigationArray: navArray
        })
      },
      setCurrentNavPosition(position) {
        store.dispatch({
          type: 'CHANGE_CURRENT_NAV_POSITION_STATE',
          currentNavPosition: position
        })
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: "CHANGE_TOOLBAR_TITLE",
          title: title
        })
      },
    }
  }

  _getPathParamNumber(number) {
    try {
      if (!this.routePath) {
        this.routePath = store.getState().currentRoute.path;
      }
      return this.routePath.split('\/')[number];
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  _appViewModeChanged() {
    this.compactStyles = this.isCompactMode ? navigationCompactModeStyles : null;
  }

  async _fetchMainMenuData() {
    try {
      this.mainMenuData = await (await fetch(`${API_ROOT}/menu?language=${this.language}`)).json();
      this.pitakaData = this.mainMenuData.find(x => {
        return x.uid === `pitaka/${this.pitakaName}`
      });
      this.parallelsData = this.pitakaData.children.find(x => {
        return x.name === `${this.parallelsName}`
      });
    } catch (err) {
      this.mainMenuError = err;
    }
  }

  async _fetchPitakaData() {
    try {
      if (!this.mainMenuData) {
        this._fetchMainMenuData();
      }
      this.pitakaData = this.mainMenuData.find(x => {
        return x.uid === `pitaka/${this.pitakaName}`
      });
    } catch (err) {
      this.mainMenuError = err;
    }
  }

  async _attachLanguageCount() {
    this.languageCountData = undefined;
    this.languageCountData = await (await fetch(`${API_ROOT}/translation_count/${this.language}`)).json();
    this.languageCountData.division.map(lang => {
      let langNumSpan = this.shadowRoot.querySelector(`#${lang.uid}_number`);
      if (langNumSpan) {
        langNumSpan.innerText = lang.total.toString();
      }
    });
  }

  _displayGuideLink() {
    pitakaGuide.forEach((value, key) => {
      let essaySpan = this.shadowRoot.querySelector(`#${key}_essay`);
      if (essaySpan) {
        essaySpan.removeAttribute('hidden');
      }
    });
  }

  async _fetchChildMenuData() {
    const url = `${API_ROOT}/menu/${this.vaggasId}?language=${this.language}`;

    if (!(url in childMenuCache)) {
      childMenuCache[url] = fetch(url).then(r => r.json());
    }

    try {
      this.vaggasData = await childMenuCache[url];
    } catch (err) {
      this.childMenuError = err;
    }
  }

  render() {
    return html`
      ${navigationNormaModelStyles}
      ${this.compactStyles}
      <main>
        ${this.pitakaContentTemplate}
        ${this.parallelsContentTemplate}
        ${this.vaggasContentTemplate}
      </main>
    `;
  }

  get pitakaContentTemplate() {
    return this.navArray[this.currentNavPosition].displayPitaka && this.pitakaData ? html`
      ${this.pitakaData.children.map(child => html`
        <section class='card nav-card' @click=${() => this._onPitakaCardClick(child.name)}>
          <header>
            <span class='header-left'>
              <span class='title' lang='${this.language}'>
                Collections of ${child.name} ${this.pitakaName}
              </span>
              <span class='subTitle' lang='pli'>
                ${child.name}
              </span>
            </span>

            ${child.yellow_brick_road ? html`
              <span class='header-right'>
                <span class='number'></span>
                <span class='number-translated'>${this.fullSiteLanguageName}</span>
              </span>
            ` : ''}
          </header>


          <div class='blurb'>
            Collections of ${child.name} discourses in Pali and Chinese.
          </div>

          <div class="essay" id="${child.name}_essay" hidden>
            <block-link>
              <a href="${pitakaGuide.get(child.name)}">Introduction to the ${child.name}.</a>
            </block-link>
          </div>
        </section>
      `)}` : '';
  }
  
  _onPitakaCardClick(childName) {
    let navType = 'parallels';
    let navIndexesOfType = navIndex.get(navType);
    this.parallelsName = childName;
    this.navArray[navIndexesOfType.index] = {
        title: childName,
        url: `/pitaka/${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}`,
        type: navType,
        displayPitaka: false,
        displayParallels: true,
        displayVaggas: false,
        parallelsName: childName,
        position: navIndexesOfType.position,
        navigationArrayLength: navIndexesOfType.navArrayLength
    };
    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
    this.actions.changeToolbarTitle(childName);
  }

  firstUpdated() {
    this._fetchMainMenuData();
    this._attachLanguageCount();
    this._displayGuideLink();
  }

  get parallelsContentTemplate() {
    return this.navArray[this.currentNavPosition].displayParallels && this.parallelsData ? html`
      ${this.parallelsData.children.map(child => html`
        <section class='card nav-card' @click=${() => this._onParallelsCardClick(child.id.toLowerCase(), child.name)}>
          <header>
            <span class='header-left'>
              <span class='title' lang='${child.lang_iso}'>
                ${child.name} ${this.pitakaName}
              </span>
              <span class='subTitle' lang='pli'>
                ${child.name}
              </span>
            </span>

            ${child.yellow_brick_road ? html`
              <span class='header-right'>
                <span class='number' id="${child.id}_number"></span>
                <span class='number-translated'>${this.fullSiteLanguageName}</span>
              </span>
            ` : ''}
          </header>

          <div class='blurb' id="${child.id}_blurb">

          </div>

          <!-- <a href='https://en.wikipedia.org/wiki/Rickrolling'>
            <div class='essay'>Reader’s Guide to the ${child.name}.</div>
          </a> -->

              <div class='shortcut'>
          <block-link>
        <a href="/dn" class='shortcut-link'>Shortcut to full list</a>
        </block-link>
        </div>

        </section>
      `)}`: '';
  }

  _onParallelsCardClick(childId, childName) {
    this.vaggasId = childId;
    this._fetchChildMenuData();

    let navType = 'vaggas';
    let navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: childName,
      url: `/pitaka/${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}`,
      type: navType,
      displayPitaka: false,
      displayParallels: false,
      displayVaggas: true,
      vaggasId: childId,
      vaggasName: childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength
    };

    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
    this.actions.changeToolbarTitle(childName);
    this.requestUpdate();
  }

  get vaggasContentTemplate() {
    return this.navArray[this.currentNavPosition].displayVaggas && this.vaggasData ? html`
     
        ${this.vaggasData[0].children.map(child => html`
          <section class='card nav-card' @click=${() => this._onVaggasCardClick(child.id.toLowerCase(), child.name)}>
            <header>
              <span class='header-left'>
                <span class='title' lang='en'>
                  ${child.name} ${this.parallelName}
                </span>
                <span class='subTitle' lang='pli'>
                  ${child.name}
                </span>
              </span>

              ${child.yellow_brick_road ? html`
                <span class='header-right'>
                  <span class='number' id="${child.id}_number"></span>
                  <span class='number-translated'>${this.fullSiteLanguageName}</span>
                </span>
            ` : ''}
            </header>

            <div class='blurb' id="${child.id}_blurb">
            
            </div>

          </section>
        `)}` : '';
  }

  _onVaggasCardClick(childId, childName) {
    let navType = 'vagga';
    let navIndexesOfType = navIndex.get(navType);
    this.navArray.push({
      title: childName,
      url: `/${childId}`,
      type: navType,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength
    });

    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
    this.actions.changeToolbarTitle(childName);
    this.requestUpdate();

    window.location.href = `/${childId}`;
  }
}

customElements.define('sc-navigation', SCNavigation);