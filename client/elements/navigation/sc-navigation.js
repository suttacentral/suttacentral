import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { API_ROOT } from '../../constants';
import { navigationNormaModelStyles, navigationCompactModeStyles } from './sc-navigation-styles';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';

import { pitakaGuide, navIndex } from './sc-navigation-common';
import '@alangdm/block-link';
import '../addons/sc-bouncing-loader';
import '@polymer/paper-ripple/paper-ripple.js';

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
      loading: { type: Boolean },
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

    this._fetchMainMenuData();

    let currentNavState = this.navArray[this.currentNavPosition];
    if (currentNavState) {
      this.vaggasId = currentNavState.vaggasId ? currentNavState.vaggasId : '';
    }
    if (currentNavState) {
      this.displayVaggaChildren = false;
      this.displayVaggaChildrenChildren = false;
      if (currentNavState.type === 'vaggas') {
        this._onParallelsCardClick(this.vaggasId, currentNavState.vaggasName);
      }
      if (currentNavState.type === 'parallels') {
        this.parallelsName = currentNavState.parallelsName;
      }
      if (currentNavState.type === 'vagga') {
        this._onVaggasCardClick(currentNavState.vaggaId, currentNavState.vaggaName);
      }
      if (currentNavState.type === 'vaggaChildren') {
        this._onVaggaChildrenCardClick(currentNavState.vaggaId, currentNavState.vaggaName);
      }
      if (currentNavState.type === 'vaggaChildrenChildren') {
        this._onVaggaChildrenChildrenCardClick(currentNavState.vaggasId, currentNavState.vaggasName);
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
    if (this.routePath !== state.currentRoute.path) {
      this.routePath = state.currentRoute.path
    }
    //this.requestUpdate();
  }
  
  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('isCompactMode')) {
      this._appViewModeChanged();
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
        if (currentNavState.type === 'vagga') {
          this.vaggasId = currentNavState.vaggasId;
          this._onVaggasCardClick(currentNavState.vaggaId, currentNavState.vaggaName);
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
    this.loading = true;
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
    this.loading = false;
  }

  async _fetchPitakaData() {
    this.loading = true;
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
    this.loading = false;
  }

  async _attachLanguageCount() {
    try {
      this.languageCountData = undefined;
      this.languageCountData = await (await fetch(`${API_ROOT}/translation_count/${this.language}`)).json();
      this.languageCountData.division.map(lang => {
        let langNumSpan = this.shadowRoot.querySelector(`#${lang.uid}_number`);
        if (langNumSpan) {
          langNumSpan.innerText = lang.total.toString();
        }
      });
    } catch (err) {
      this.mainMenuError = err;
    }
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
    let lang = this.language ? this.language : 'en';
    const url = `${API_ROOT}/menu/${this.vaggasId}?language=${lang}`;

    try {
      this.vaggasData = await (await fetch(url)).json();
    } catch (err) {
      this.childMenuError = err;
    }
  }

  render() {
    return html`
      ${navigationNormaModelStyles}
      ${this.compactStyles}
      <div class="loading-indicator">
        <sc-bouncing-loader class="loading-spinner" ?active="${this.loading}"></sc-bouncing-loader>
      </div>
      <main>
        ${this.pitakaContentTemplate}
        ${this.parallelsContentTemplate}
        ${this.vaggasContentTemplate}
        ${this.vaggaChildrenContentTemplate}
        ${this.vaggaChildrenChildrenContentTemplate}
      </main>
    `;
  }

  get pitakaContentTemplate() {
    return this.navArray[this.currentNavPosition].displayPitaka && this.pitakaData ? html`
      ${this.pitakaData.children.map(child => html`
        <section class='card pitaka' @click=${() => this._onPitakaCardClick(child.name)}>
          <header>
            <span class='header-left'>
              <span class='title' lang='${this.language}'>
                ${this.localizeEx('CollectionOf', 'sutta', this.localize(this.pitakaName), 'pitaka', this.localize(child.name))}
              </span>
              <span class='rootTitle' lang='pli'>
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
            ${this.localizeEx('CollectionOf', 'sutta', this.localize(this.pitakaName), 'pitaka', this.localize(child.name))} in Pali and Chinese.
          </div>

          <div class="essay" id="${child.name}_essay" hidden>
            <block-link>
              <a href="${pitakaGuide.get(child.name)}">${this.localizeEx('introduction', 'pitaka', this.localize(child.name))}</a>
            </block-link>
          </div>

          <paper-ripple></paper-ripple>
        </section>
      `)}` : '';
  }
  
  _onPitakaCardClick(childName) {
    let navType = 'parallels';
    let navIndexesOfType = navIndex.get(navType);
    this.parallelsName = childName;
    this.navArray[navIndexesOfType.index] = {
        title: childName,
        url: `/pitaka/${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}/${childName.toLowerCase()}`,
        type: navType,
        displayPitaka: false,
        displayParallels: true,
        displayVaggas: false,
        displayVaggaChildren: false,
        displayVaggaChildrenChildren: false, 
        parallelsName: childName,
        position: navIndexesOfType.position,
        navigationArrayLength: navIndexesOfType.navArrayLength
    };
    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
    this.actions.changeToolbarTitle(this.localize(childName));
    this._setCurrentURL(childName.toLowerCase());
  }

  firstUpdated() {
    this._fetchMainMenuData();
    this._attachLanguageCount();
    this._displayGuideLink();
    if (!this.fullSiteLanguageName) {
      this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    }
  }

  get parallelsContentTemplate() {
    return this.navArray[this.currentNavPosition].displayParallels && this.parallelsData ? html`
      ${this.parallelsData.children.map(child => html`
        <section class='card parallels' @click=${() => this._onParallelsCardClick(child.id.toLowerCase(), child.name)}>
          <header>
            <span class='header-left'>
              <span class='title' lang='${child.lang_iso}'>
                ${this.localize(this.pitakaName)} ${this.localize(child.name)}
              </span>
              <span class='rootTitle' lang='pli'>
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

          <div class='blurb' id="${child.id}_blurb"></div>

          <div class='shortcut'>
            <block-link>
              <a href="/${this.vaggasId}" class='shortcut-link'>Shortcut to full list</a>
            </block-link>
          </div>

          <paper-ripple></paper-ripple>
        </section>
      `)}`: '';
  }

  _onParallelsCardClick(childId, childName) {
    this.vaggasId = childId;
    this._fetchChildMenuData();

    let navType = 'vaggas';
    let navIndexesOfType = navIndex.get(navType);
    let currentUrl = this._genCurrentURL(childId.toLowerCase());
    this.navArray[navIndexesOfType.index] = {
      title: childName,
      url: currentUrl,
      type: navType,
      displayPitaka: false,
      displayParallels: false,
      displayVaggas: true,
      displayVaggaChildren: false,
      displayVaggaChildrenChildren: false, 
      vaggasId: childId,
      vaggasName: childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength
    };

    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
    this.actions.changeToolbarTitle(this.localize(childName));
    this._setCurrentURL(childId.toLowerCase());

    this.requestUpdate();
  }

  _setCurrentURL(lastPath) {
    if (!lastPath) { return; }
    let currentURL = window.location.href;
    if (currentURL.indexOf(`/${lastPath}`) === -1) {
      let cleanURL = currentURL.split('?')[0] + '/' + lastPath;
      window.history.pushState({}, 0 , cleanURL);
    }
  }

  _genCurrentURL(lastPath) {
    if (!lastPath) { return; }
    let currentURL = window.location.href;
    if (currentURL.indexOf(`/${lastPath}`) === -1) {
      let cleanURL = currentURL.split('?')[0] + '/' + lastPath;
      return cleanURL ? cleanURL : currentURL;
    } else {
      return currentURL;
    }
  }

  get vaggasContentTemplate() {
    return this.navArray[this.currentNavPosition].displayVaggas && this.vaggasData ? html`
      ${this.vaggasData[0].children.map(child => html`
        <section class='card vaggas' @click=${() => this._onVaggasCardClick(child.id.toLowerCase(), child.name)}>
            <header>
              <span class='header-left'>
                <span class='title' lang='en'>
                  ${this.localize(child.name ? child.name : child.id)} ${this.parallelName}
                </span>
                <span class='rootTitle' lang='pli'>
                  ${child.name ? child.name : child.id}
                </span>
              </span>

              ${child.yellow_brick_road ? html`
                <span class='header-right'>
                  <span class='number' id="${child.id}_number"></span>
                  <span class='number-translated'>${this.fullSiteLanguageName}</span>
                </span>
            ` : ''}
            </header>

            <div class='blurb' id="${child.id}_blurb"></div>
            <paper-ripple></paper-ripple>
        </section>
      `)}` : '';
  }

  async _onVaggasCardClick(childId, childName) {
    this.vaggasId = childId;
    //this._fetchChildMenuData();

    try {
      let url = `${API_ROOT}/menu/${this.vaggasId}?language=en`;
      this.vaggasData = await (await fetch(url)).json();
      this.vaggaChildren = this.vaggasData[0].children;
      this.displayVaggaChildren = this.vaggaChildren ? true : false;  
    } catch (error) {
      this.errors = error;
    }

    let currentUrl = `/${childId}`;
    if (this.displayVaggaChildren) {
      currentUrl = this._genCurrentURL(childId.toLowerCase());
    }

    let navType = 'vagga';
    let navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: childName,
      url: currentUrl,
      type: navType,
      displayPitaka: false,
      displayParallels: false,
      displayVaggas: false,
      displayVaggaChildren: this.displayVaggaChildren,
      displayVaggaChildrenChildren: false,
      vaggasId: this.vaggasId,
      vaggaId: childId,
      vaggaName: childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength
    };

    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
    this.actions.changeToolbarTitle(this.localize(childName));
    this._setCurrentURL(childId.toLowerCase());
    this.requestUpdate();

    if (!this.displayVaggaChildren) {
      window.location.href = `/${childId}`;
    }
  }

  get vaggaChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition].displayVaggaChildren && this.vaggaChildren ? html`
      ${this.vaggaChildren && this.vaggaChildren.map(child => html`
        <section class='card vaggaChildren' @click=${() => this._onVaggaChildrenCardClick(child.id.toLowerCase(), child.name)}>
          <header>
            <span class='header-left'>
              <span class='title' lang='en'>
                ${this.localize(child.name ? child.name : child.id)} ${this.parallelName}
              </span>
              <span class='rootTitle' lang='pli'>
                ${child.name ? child.name : child.id}
              </span>
            </span>

            ${child.yellow_brick_road ? html`
              <span class='header-right'>
                <span class='number' id="${child.id}_number"></span>
                <span class='number-translated'>${this.fullSiteLanguageName}</span>
              </span>
          ` : ''}
          </header>
          <div class='blurb' id="${child.id}_blurb"></div>
          <paper-ripple></paper-ripple>
        </section>
      `)}` : '';
  }

  async _onVaggaChildrenCardClick(childId, childName) {
    try {
      let url = `${API_ROOT}/menu/${this.vaggasId}?language=en`;
      this.vaggasData = await (await fetch(url)).json();
      this.vaggaChildren = this.vaggasData[0].children;
      this.vaggaChildrenChildren = this.vaggaChildren.find(x => {
        return x.id === childId
      });  
    } catch (error) {
      this.errors = error;
    }

    this.displayVaggaChildrenChildren = false;
    if (this.vaggaChildrenChildren && this.vaggaChildrenChildren.children) {
      this.displayVaggaChildrenChildren = true;
    }

    this.displayVaggaChildren = false;
    let currentUrl = `/${childId}`;
    if (this.displayVaggaChildrenChildren) {
      currentUrl = this._genCurrentURL(childId.toLowerCase());
    }

    let navType = 'vaggaChildren';
    let navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: childName,
      url: currentUrl,
      type: navType,
      displayPitaka: false,
      displayParallels: false,
      displayVaggas: false,
      displayVaggaChildren: false,
      displayVaggaChildrenChildren: this.displayVaggaChildrenChildren, 
      vaggaId: childId,
      vaggaName: childName,
      vaggasId: this.vaggasId,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength
    };

    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
    this.actions.changeToolbarTitle(this.localize(childName));
    this._setCurrentURL(childId.toLowerCase());

    this.requestUpdate();

    if (!this.displayVaggaChildrenChildren) {
      window.location.href = `/${childId}`;
    }
  }

  get vaggaChildrenChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition].displayVaggaChildrenChildren && this.vaggaChildrenChildren ? html`
      ${this.navArray[this.currentNavPosition].displayVaggaChildrenChildren && this.vaggaChildrenChildren.children.map(child => html`
        <section class='card vaggaChildrenChildren' @click=${() => this._onVaggaChildrenChildrenCardClick(child.id.toLowerCase(), child.name)}>
          <header>
            <span class='header-left'>
              <span class='title' lang='en'>
                ${this.localize(child.name)} ${this.parallelName}
              </span>
              <span class='rootTitle' lang='pli'>
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
          <div class='blurb' id="${child.id}_blurb"></div>
          <paper-ripple></paper-ripple>
        </section>
      `)}` : '';
  }

  _onVaggaChildrenChildrenCardClick(childId, childName) {
    let currentUrl = `/${childId}`;
    let navType = 'vaggaChildrenChildren';
    let navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: childName,
      url: currentUrl,
      type: navType,
      vaggaId: childId,
      vaggaName: childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength
    };

    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
    this.actions.changeToolbarTitle(this.localize(childName));

    this._setCurrentURL(childId.toLowerCase());
    this.requestUpdate();
    window.location.href = `/${childId}`;
  }
}

customElements.define('sc-navigation', SCNavigation);