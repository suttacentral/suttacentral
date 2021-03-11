import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { API_ROOT } from '../../constants';
import { navigationNormalModeStyles, navigationCompactModeStyles } from './sc-navigation-styles';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';
import { pitakaGuide, navIndex, shortcuts } from './sc-navigation-common';
import '../addons/sc-bouncing-loader';
import { dispatchCustomEvent } from '../../utils/customEvent';

class SCNavigation extends LitLocalized(LitElement) {
  static get properties() {
    return {
      isCompactMode: { type: Boolean },
      compactStyles: { type: Object },
      localizedStringsPath: { type: String },
      pitakaUid: { type: String },
      navArray: { type: Array },
      routePath: { type: String },
      currentNavPosition: { type: Number },
      loading: { type: Boolean },
      siteLanguage: { type: String },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-navigation';
    this.compactStyles = {};
    this.isCompactMode = store.getState().suttaplexListDisplay;
    this.navArray = store.getState().navigationArray;
    this.currentNavPosition = store.getState().currentNavPosition;
    this.routePath = store.getState().currentRoute.path;
    this.pitakaUid = this._getPathParamNumber(2);
    this.pitakaName = this._getPathParamNumber(2);
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    this.siteLanguage = store.getState().siteLanguage;
    this.navDataCache = new Map(Object.entries(store.getState().navDataCache || {}));
    this.tipitakaUids = ['sutta', 'vinaya', 'abhidhamma'];
    this.lastSelectedItemRootLangISO = '';
    this._verifyURL();
    this._appViewModeChanged();
    this._fetchMainData();
    this._initPitakaCards({ dispatchState: true });
    this._parseURL();
  }

  // Check whether the URL item is valid,
  // check from the last level, crop the URL item if it is not valid,
  // and if valid so, check that the parent contains it, and if not, crop the URL item.
  async _verifyURL() {
    if (!this.tipitakaUids.includes(this.pitakaUid)) {
      dispatchCustomEvent(this, 'sc-navigate', { pathname: '/pitaka/sutta' });
    }
    const navArray = this.routePath.split('/');
    if (navArray.length >= 3) {
      // 0='', 1='pitaka' 2='sutta,vinaya,ahbdidama', Do not need to be process, so delete it.
      navArray.splice(0, 3);
    }
    if (navArray.length === 0) {
      return;
    }
    for (let i = navArray.length - 1; i >= 0; i--) {
      if (navArray.length > 1 && i !== 0) {
        let navData = await this._fetchChildrenData(navArray[i]);
        if (!navData[0].uid) {
          dispatchCustomEvent(this, 'sc-navigate', { pathname: this._cutURL(navArray[i]) });
        } else {
          navData = await this._fetchChildrenData(navArray[i - 1]);
          if (!navData[0].uid) {
            let URL = this._cutURL(navArray[i]);
            URL = this._cutURL(navArray[i - 1], URL);
            dispatchCustomEvent(this, 'sc-navigate', { pathname: URL });
          } else {
            const childData = navData[0].children.find(x => x.uid === navArray[i]);
            if (!childData) {
              dispatchCustomEvent(this, 'sc-navigate', { pathname: this._cutURL(navArray[i]) });
            }
          }
        }
      } else {
        const navData = await this._fetchChildrenData(navArray[i]);
        if (!navData[0].uid) {
          dispatchCustomEvent(this, 'sc-navigate', { pathname: this._cutURL(navArray[i]) });
        }
      }
    }
  }

  _cutURL(navItem, currentURL = '') {
    let newURL = currentURL || this.routePath;
    const regex = new RegExp(`/${navItem}`, 'g');
    newURL = newURL.replace(regex, '');
    return newURL;
  }

  async _parseURL() {
    const navArray = this.routePath.split('/');
    this.navArray.length = 1;
    this.currentURL = '/pitaka';
    const self = this;
    navArray.forEach((navItem, index) => {
      if (index > 1) {
        const cardEvent = this._getEventByNavIndex(index);
        this.currentURL = `${this.currentURL}/${navItem}`;
        let params = {
          childId: navItem,
          childName: '',
          dispatchState: index === navArray.length - 1,
          currentURL: this.currentURL,
        };
        cardEvent.call(self, params);
      }
    });
  }

  _getEventByNavIndex(index) {
    const cardEvents = new Map([
      [2, this._initPitakaCards],
      [3, this._onPitakaCardClick],
      [4, this._onParallelsCardClick],
      [5, this._onVaggasCardClick],
      [6, this._onVaggaChildrenCardClick],
      [7, this._onVaggaChildrenChildrenCardClick],
    ]);
    return cardEvents.get(index);
  }

  _initPitakaCards(params) {
    const navType = 'pitaka';
    const navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: `${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}`,
      url: `/pitaka/${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}`,
      type: navType,
      displayPitaka: true,
      displayParallels: false,
      displayVaggas: false,
      groupId: this.pitakaUid,
      groupName: this.pitakaName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };
    if (params.dispatchState) {
      this._dispatchNavState(
        this.navArray,
        navIndexesOfType.position,
        this.localize(this.pitakaName)
      );
    }
    this.requestUpdate();
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.isCompactMode !== state.suttaplexListDisplay) {
      this.isCompactMode = state.suttaplexListDisplay;
      this._appViewModeChanged();
    }
    if (this.currentNavPosition !== state.currentNavPosition) {
      this.currentNavPosition = state.currentNavPosition;
      this._currentNavPosChanged();
    }
    if (this.routePath !== state.currentRoute.path) {
      this.routePath = state.currentRoute.path;
    }
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._currentNavPosChanged();
    }
  }

  _currentNavPosChanged() {
    this._fetchMainData();
    const currentNavState = this.navArray[this.currentNavPosition];
    if (currentNavState) {
      let params = {
        childId: currentNavState.groupId,
        childName: currentNavState.groupName,
        langIso: currentNavState.langIso,
        dispatchState: true,
      };
      const cardEvent = this._getEventByNavType(currentNavState.type);
      if (cardEvent) {
        cardEvent.call(this, params);
      }
    }
  }

  _getEventByNavType(navType) {
    const cardEvents = new Map([
      ['pitaka', this._initPitakaCards],
      ['parallels', this._onPitakaCardClick],
      ['vaggas', this._onParallelsCardClick],
      ['vagga', this._onVaggasCardClick],
      ['vaggaChildren', this._onVaggaChildrenCardClick],
      ['vaggaChildrenChildren', this._onVaggaChildrenChildrenCardClick],
    ]);
    return cardEvents.get(navType);
  }

  get actions() {
    return {
      setNavigation(navArray) {
        store.dispatch({
          type: 'SET_NAVIGATION',
          navigationArray: navArray,
        });
      },
      setCurrentNavPosition(position) {
        store.dispatch({
          type: 'CHANGE_CURRENT_NAV_POSITION_STATE',
          currentNavPosition: position,
        });
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title: title,
        });
      },
      updateNavDataCache(navData) {
        store.dispatch({
          type: 'UPDATE_NAV_DATA_CACHE',
          navDataCache: navData,
        });
      },
    };
  }

  _getPathParamNumber(number) {
    try {
      if (!this.routePath) {
        this.routePath = store.getState().currentRoute.path;
      }
      return this.routePath.split('/')[number];
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  _appViewModeChanged() {
    this.compactStyles = this.isCompactMode ? navigationCompactModeStyles : null;
  }

  async _fetchMainData() {
    this.loading = true;
    await this._fetchTipitakaData();
    this.loading = false;
  }

  async _fetchTipitakaData() {
    try {
      this.tipitakaData = await (
        await fetch(`${API_ROOT}/menu?language=${this.siteLanguage || 'en'}`)
      ).json();
      if (this.tipitakaData) {
        this.pitakaData = this.tipitakaData.find(x => x.uid === this.pitakaUid);
      }
    } catch (e) {
      this.lastError = e;
    }
  }

  async _fetchChildrenData(childId) {
    const url = `${API_ROOT}/menu/${childId}?language=${this.siteLanguage || 'en'}`;
    try {
      const childrenData = await (await fetch(url)).json();
      return childrenData;
    } catch (e) {
      this.lastError = e;
      return {};
    }
  }

  _updateNavDataCache(url, data) {
    if (!url || !data) {
      return;
    }
    if (!this.navDataCache) {
      this.navDataCache = new Map(Object.entries(store.getState().navDataCache || {}));
    }
    if (!this.navDataCache.has(url) && data) {
      this.navDataCache.set(url, data);
      this.actions.updateNavDataCache(Object.fromEntries(this.navDataCache));
    }
  }

  render() {
    return html`
      ${navigationNormalModeStyles} ${this.compactStyles}
      <main>
        ${this.pitakaContentTemplate} ${this.parallelsContentTemplate} ${this.vaggasContentTemplate}
        ${this.vaggaChildrenContentTemplate} ${this.vaggaChildrenChildrenContentTemplate}
        ${this.sakaChildrenContentTemplate}
      </main>
    `;
  }

  get pitakaContentTemplate() {
    return this.navArray[this.currentNavPosition] &&
      this.navArray[this.currentNavPosition].displayPitaka &&
      this.pitakaData
      ? html`
          ${this.pitakaData.children.map(
            child => html`
              <section class="card">
                <a
                  class="header-link"
                  href="${this._genPitakaURL(child)}"
                  @click=${() =>
                    this._onPitakaCardClick({
                      childId: child.uid,
                      childName: child.acronym || child.translated_name || child.root_name,
                      langIso: child.root_lang_iso,
                      dispatchState: true,
                    })}
                >
                  <header>
                    <span class="header-left">
                      <span class="title">
                        ${child.translated_name || child.root_name || child.uid}
                      </span>
                      <div class="navigation-nerdy-row">
                        <span
                          class="subTitle ${child.root_lang_iso ? 'show-root-language' : ''}"
                          lang="${child.root_lang_iso || this.lastSelectedItemRootLangISO}"
                          translate="no"
                        >
                          ${child.root_name}
                        </span>
                      </div>
                    </span>
                    ${child.yellow_brick_road
                      ? html`
                          <span class="header-right">
                            <span class="number-translated">
                              <span class="number">${child.yellow_brick_road_count}</span>
                              ${this.fullSiteLanguageName}
                            </span>
                          </span>
                        `
                      : ''}
                  </header>
                </a>
                ${child.blurb
                  ? html`
                      <div class="blurb blurbShrink" id="${child.uid}_blurb">
                        ${unsafeHTML(child.blurb)}
                      </div>
                    `
                  : ''}
              </section>
            `
          )}
        `
      : '';
  }

  _genPitakaURL(child) {
    return `/pitaka/${this._getPathParamNumber(navIndex.get('pitaka').pathParamIndex)}/${
      child.uid
    }`;
  }

  _updateLastSelectedItemRootLangISO(rootLangISO) {
    if (rootLangISO && this.lastSelectedItemRootLangISO !== rootLangISO) {
      this.lastSelectedItemRootLangISO = rootLangISO;
    }
  }

  async _onPitakaCardClick(params) {
    const navType = 'parallels';
    const navIndexesOfType = navIndex.get(navType);
    this.parallelsUid = params.childId;
    this.parallelsData = await this._fetchChildrenData(params.childId);

    this._updateLastSelectedItemRootLangISO(this.parallelsData[0].root_lang_iso);

    if (!params.childName) {
      params.childName =
        this.parallelsData[0].acronym ||
        this.parallelsData[0].translated_name ||
        this.parallelsData[0].root_name;
    }
    const navURL = `/pitaka/${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}/${
      params.childId
    }`;

    this.navArray[navIndexesOfType.index] = {
      title: params.childName,
      url: navURL,
      type: navType,
      displayPitaka: false,
      displayParallels: true,
      displayVaggas: false,
      displayVaggaChildren: false,
      displayVaggaChildrenChildren: false,
      groupId: params.childId,
      groupName: params.childName,
      position: navIndexesOfType.position,
      langIso: params.langIso,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };

    if (params.dispatchState) {
      const toolbarTitle =
        this.parallelsData[0].translated_name ||
        this.parallelsData[0].root_name ||
        this.parallelsData[0].uid;
      this._dispatchNavState(this.navArray, navIndexesOfType.position, toolbarTitle);
      this._setCurrentURL(params.childId);
      this.requestUpdate();
    }
  }

  _dispatchNavState(navArray, navPos, toolbarTitle) {
    this.actions.setNavigation(navArray);
    this.actions.setCurrentNavPosition(navPos);
    this.actions.changeToolbarTitle(toolbarTitle);
  }

  firstUpdated() {
    this._initPitakaCards({ dispatchState: true });
  }

  updated() {
    this._addBlurbsClickEvent();
  }

  get parallelsContentTemplate() {
    return this.navArray[this.currentNavPosition] &&
      this.navArray[this.currentNavPosition].displayParallels &&
      this.parallelsData
      ? html`
          ${this.parallelsData[0].children.map(
            child => html`
              <section class="card">
                <a
                  class="header-link"
                  href="${this._genCurrentURL(child.uid)}"
                  @click=${() =>
                    this._onParallelsCardClick({
                      childId: child.uid,
                      childName: child.acronym || child.translated_name || child.root_name,
                      dispatchState: true,
                    })}
                >
                  <header>
                    <span class="header-left">
                      <span class="title">
                        ${child.translated_name || child.root_name || child.uid}
                      </span>
                      <div class="navigation-nerdy-row">
                        <span
                          class="subTitle ${child.root_lang_iso ? 'show-root-language' : ''}"
                          lang="${child.root_lang_iso || this.lastSelectedItemRootLangISO}"
                          translate="no"
                        >
                          ${child.root_name}
                        </span>
                        <span class="acronym">${child.child_range}</span>
                      </div>
                    </span>
                    ${child.yellow_brick_road
                      ? html`
                          <span class="header-right">
                            <span class="number-translated">
                              <span class="number">${child.yellow_brick_road_count}</span>
                              ${this.fullSiteLanguageName}
                            </span>
                          </span>
                        `
                      : ''}
                  </header>
                </a>
                ${child.blurb
                  ? html`
                      <div class="blurb blurbShrink" id="${child.uid}_blurb">
                        ${unsafeHTML(child.blurb)}
                      </div>
                    `
                  : ''}
                ${pitakaGuide.get(child.uid)
                  ? html`
                      <a href="${pitakaGuide.get(child.uid)}" class="essay-link">
                        <div class="essay" id="${child.uid}_essay">
                          ${this.localize(`${child.uid}_essayTitle`)}
                        </div>
                      </a>
                    `
                  : ''}
                ${shortcuts.includes(child.uid)
                  ? html`
                      <div class="shortcut">
                        <a href="/${child.uid}" class="shortcut-link">
                          ${this.localize('shortcutToFullList')}
                        </a>
                      </div>
                    `
                  : ''}
              </section>
            `
          )}
        `
      : '';
  }

  _addBlurbsClickEvent() {
    this.shadowRoot.querySelectorAll('.blurb').forEach(element => {
      element.onclick = () => {
        element.classList.contains('blurbShrink')
          ? element.classList.remove('blurbShrink')
          : element.classList.add('blurbShrink');
      };
    });
  }

  async _onParallelsCardClick(params) {
    this.vaggasData = await this._fetchChildrenData(params.childId);

    const showVaggas =
      this.vaggasData[0] &&
      this.vaggasData[0].children &&
      this.vaggasData[0].children.some(child => ['branch'].includes(child.node_type));

    this._updateLastSelectedItemRootLangISO(this.vaggasData[0].root_lang_iso);

    if (!params.childName) {
      params.childName =
        this.vaggasData[0].acronym ||
        this.vaggasData[0].translated_name ||
        this.vaggasData[0].root_name;
    }

    if (params.childId === 'dharmapadas') {
      params.childName = this.vaggasData[0].root_name;
    }

    let currentUrl = `/${params.childId}`;
    if (showVaggas) {
      currentUrl = this._genCurrentURL(params.childId);
      if (params.currentURL) {
        currentUrl = params.currentURL;
      }
    }

    const navType = 'vaggas';
    const navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: params.childName,
      url: currentUrl,
      type: navType,
      displayPitaka: false,
      displayParallels: false,
      displayVaggas: showVaggas,
      displayVaggaChildren: false,
      displayVaggaChildrenChildren: false,
      groupId: params.childId,
      groupName: params.childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };

    if (params.dispatchState) {
      const toolbarTitle =
        this.vaggasData[0].translated_name ||
        this.vaggasData[0].root_name ||
        this.vaggasData[0].uid;
      this._dispatchNavState(this.navArray, navIndexesOfType.position, toolbarTitle);
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      if (!showVaggas) {
        dispatchCustomEvent(this, 'sc-navigate', { pathname: `/${params.childId}` });
      }
    }
  }

  _setCurrentURL(lastPath) {
    if (!lastPath) {
      return;
    }
    lastPath = encodeURI(lastPath);
    let currentURL = window.location.href;
    if (currentURL.indexOf(`/${lastPath}`) === -1) {
      let cleanURL = currentURL.split('?')[0] + '/' + lastPath;
      window.history.pushState({}, 0, cleanURL);
    }
  }

  _genCurrentURL(lastPath) {
    if (!lastPath) {
      return;
    }
    let currentURL = window.location.href;
    if (currentURL.indexOf(`/${lastPath}`) === -1) {
      let cleanURL = currentURL.split('?')[0] + '/' + lastPath;
      return cleanURL ? cleanURL : currentURL;
    } else {
      return currentURL;
    }
  }

  get vaggasContentTemplate() {
    return this.navArray[this.currentNavPosition] &&
      this.navArray[this.currentNavPosition].displayVaggas &&
      this.vaggasData
      ? html`
          ${this.vaggasData[0].children.map(
            child => html`
              <section class="card">
                <a
                  class="header-link"
                  href="${this._genCurrentURL(child.uid)}"
                  @click=${() =>
                    this._onVaggasCardClick({
                      childId: child.uid,
                      childName: child.acronym || child.translated_name || child.root_name,
                      dispatchState: true,
                    })}
                >
                  <header>
                    <span class="header-left">
                      <span class="title">
                        ${child.translated_name || child.root_name || child.uid}
                      </span>
                      <div class="navigation-nerdy-row">
                        <span
                         class="subTitle ${child.root_lang_iso ? 'show-root-language' : ''}""
                          lang="${child.root_lang_iso || this.lastSelectedItemRootLangISO}"
                          translate="no"
                        >
                          ${child.root_name || child.uid}
                        </span>
                        <span class="acronym">${child.acronym} ${child.child_range}</span>
                      </div>
                    </span>
                    ${
                      child.yellow_brick_road
                        ? html`
                            <span class="header-right">
                              <span class="number-translated">
                                <span class="number">${child.yellow_brick_road_count}</span>
                                ${this.fullSiteLanguageName}
                              </span>
                            </span>
                          `
                        : ''
                    }
                  </header>
                </a>
                ${
                  child.blurb
                    ? html`
                        <div class="blurb blurbShrink" id="${child.uid}_blurb">
                          ${unsafeHTML(child.blurb)}
                        </div>
                      `
                    : ''
                }
                ${
                  shortcuts.includes(child.uid)
                    ? html`
                        <div class="shortcut">
                          <a href="/${child.uid}" class="shortcut-link">
                            ${this.localize('shortcutToFullList')}
                          </a>
                        </div>
                      `
                    : ''
                }
              </section>
            `
          )}
        `
      : '';
  }

  async _onVaggasCardClick(params) {
    this.vaggasData = await this._fetchChildrenData(params.childId);
    this.vaggaChildren = this.vaggasData[0].children;

    const showVaggaChildren =
      this.vaggaChildren && this.vaggaChildren.some(child => ['branch'].includes(child.node_type));

    this._updateLastSelectedItemRootLangISO(this.vaggasData[0].root_lang_iso);

    if (!params.childName) {
      params.childName =
        this.vaggasData[0].acronym ||
        this.vaggasData[0].translated_name ||
        this.vaggasData[0].root_name;
    }

    let currentUrl = `/${params.childId}`;
    if (showVaggaChildren) {
      currentUrl = this._genCurrentURL(params.childId);
      if (params.currentURL) {
        currentUrl = params.currentURL;
      }
    }

    const navType = 'vagga';
    const navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: params.childName,
      url: currentUrl,
      type: navType,
      displayPitaka: false,
      displayParallels: false,
      displayVaggas: false,
      displayVaggaChildren: showVaggaChildren,
      displayVaggaChildrenChildren: false,
      groupId: params.childId,
      groupName: params.childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };

    if (params.dispatchState) {
      const toolbarTitle =
        this.vaggasData[0].translated_name ||
        this.vaggasData[0].root_name ||
        this.vaggasData[0].uid;
      this._dispatchNavState(this.navArray, navIndexesOfType.position, toolbarTitle);
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      if (!showVaggaChildren) {
        dispatchCustomEvent(this, 'sc-navigate', { pathname: `/${params.childId}` });
      }
    }
  }

  get vaggaChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] &&
      this.navArray[this.currentNavPosition].displayVaggaChildren &&
      this.vaggasData[0].children
      ? html`
          ${this.vaggasData[0].children &&
          this.vaggasData[0].children.map(
            child => html`
              <section class="card">
                <a
                  class="header-link"
                  href="${this._genCurrentURL(child.uid)}"
                  @click=${() =>
                    this._onVaggaChildrenCardClick({
                      childId: child.uid,
                      childName: child.acronym || child.translated_name || child.root_name,
                      dispatchState: true,
                    })}
                >
                  <header>
                    <span class="header-left">
                      <span class="title">
                        ${child.translated_name || child.root_name || child.uid}
                      </span>
                      <div class="navigation-nerdy-row">
                        <span
                          class="subTitle"
                          lang="${child.root_lang_iso || this.lastSelectedItemRootLangISO}"
                          translate="no"
                        >
                          ${child.root_name || child.uid}
                        </span>
                        <span class="acronym">${child.child_range}</span>
                      </div>
                    </span>
                    ${child.yellow_brick_road
                      ? html`
                          <span class="header-right">
                            <span class="number-translated">
                              <span class="number">${child.yellow_brick_road_count}</span>
                              ${this.fullSiteLanguageName}
                            </span>
                          </span>
                        `
                      : ''}
                  </header>
                </a>
                ${child.blurb
                  ? html`
                      <div class="blurb blurbShrink" id="${child.uid}_blurb">
                        ${unsafeHTML(child.blurb)}
                      </div>
                    `
                  : ''}
                ${shortcuts.includes(child.uid)
                  ? html`
                      <div class="shortcut">
                        <a href="/${child.uid}" class="shortcut-link">
                          ${this.localize('shortcutToFullList')}
                        </a>
                      </div>
                    `
                  : ''}
              </section>
            `
          )}
        `
      : '';
  }

  async _onVaggaChildrenCardClick(params) {
    this.vaggaChildrenChildren = await this._fetchChildrenData(params.childId);
    const showVaggaChildrenChildren =
      this.vaggaChildrenChildren &&
      this.vaggaChildrenChildren[0].children.some(child => ['branch'].includes(child.node_type));

    this._updateLastSelectedItemRootLangISO(this.vaggaChildrenChildren[0].root_lang_iso);

    if (!params.childName) {
      params.childName =
        this.vaggaChildrenChildren[0].acronym ||
        this.vaggaChildrenChildren[0].translated_name ||
        this.vaggaChildrenChildren[0].root_name;
    }

    let currentUrl = `/${params.childId}`;
    if (showVaggaChildrenChildren) {
      currentUrl = this._genCurrentURL(params.childId);
      if (params.currentURL) {
        currentUrl = params.currentURL;
      }
    }

    const navType = 'vaggaChildren';
    const navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: params.childName,
      url: currentUrl,
      type: navType,
      displayPitaka: false,
      displayParallels: false,
      displayVaggas: false,
      displayVaggaChildren: false,
      displayVaggaChildrenChildren: showVaggaChildrenChildren,
      groupId: params.childId,
      groupName: params.childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };

    if (params.dispatchState) {
      const toolbarTitle =
        this.vaggaChildrenChildren[0].translated_name ||
        this.vaggaChildrenChildren[0].root_name ||
        this.vaggaChildrenChildren[0].uid;
      this._dispatchNavState(this.navArray, navIndexesOfType.position, toolbarTitle);
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      if (!showVaggaChildrenChildren) {
        dispatchCustomEvent(this, 'sc-navigate', { pathname: `/${params.childId}` });
      }
    }
  }

  get vaggaChildrenChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] &&
      this.navArray[this.currentNavPosition].displayVaggaChildrenChildren &&
      this.vaggaChildrenChildren
      ? html`
          ${this.navArray[this.currentNavPosition].displayVaggaChildrenChildren &&
          this.vaggaChildrenChildren[0].children.map(
            child => html`
              <section class="card">
                <a
                  class="header-link"
                  href="${this._genCurrentURL(child.uid)}"
                  @click=${() =>
                    this._onVaggaChildrenChildrenCardClick({
                      childId: child.uid,
                      childName: child.acronym || child.translated_name || child.root_name,
                      dispatchState: true,
                    })}
                >
                  <header>
                    <span class="header-left">
                      <span class="title">
                        ${child.translated_name || child.root_name || child.uid}
                      </span>
                      <div class="navigation-nerdy-row">
                        <span
                          class="subTitle"
                          lang="${child.root_lang_iso || this.lastSelectedItemRootLangISO}"
                          translate="no"
                        >
                          ${child.root_name || child.acronym}
                        </span>
                        <span class="acronym">${child.child_range}</span>
                      </div>
                    </span>
                    ${child.yellow_brick_road
                      ? html`
                          <span class="header-right">
                            <span class="number-translated">
                              <span class="number">${child.yellow_brick_road_count}</span>
                              ${this.fullSiteLanguageName}
                            </span>
                          </span>
                        `
                      : ''}
                  </header>
                </a>
                ${child.blurb
                  ? html`
                      <div class="blurb blurbShrink" id="${child.uid}_blurb">
                        ${unsafeHTML(child.blurb)}
                      </div>
                    `
                  : ''}
                ${shortcuts.includes(child.uid)
                  ? html`
                      <div class="shortcut">
                        <a href="/${child.uid}" class="shortcut-link">
                          ${this.localize('shortcutToFullList')}
                        </a>
                      </div>
                    `
                  : ''}
              </section>
            `
          )}
        `
      : '';
  }

  async _onVaggaChildrenChildrenCardClick(params) {
    this.sakaData = await this._fetchChildrenData(params.childId);
    this.sakaChildren = this.sakaData[0].children;

    const showSakaChildren =
      this.sakaChildren && this.sakaChildren.some(child => ['branch'].includes(child.node_type));

    this._updateLastSelectedItemRootLangISO(this.sakaData[0].root_lang_iso);

    if (!params.childName) {
      params.childName =
        this.sakaData[0].acronym || this.sakaData[0].translated_name || this.sakaData[0].root_name;
    }

    let currentUrl = `/${params.childId}`;
    if (showSakaChildren) {
      currentUrl = this._genCurrentURL(params.childId);
      if (params.currentURL) {
        currentUrl = params.currentURL;
      }
    }

    const navType = 'vaggaChildrenChildren';
    const navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: params.childName,
      url: currentUrl,
      type: navType,
      displayPitaka: false,
      displayParallels: false,
      displayVaggas: false,
      displayVaggaChildren: false,
      displayVaggaChildrenChildren: false,
      displaySakaChildren: showSakaChildren,
      groupId: params.childId,
      groupName: params.childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };

    if (params.dispatchState) {
      const toolbarTitle =
        this.sakaChildren.translated_name || this.sakaChildren.root_name || this.sakaChildren.uid;
      this._dispatchNavState(this.navArray, navIndexesOfType.position, toolbarTitle);
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      if (!showSakaChildren) {
        dispatchCustomEvent(this, 'sc-navigate', { pathname: `/${params.childId}` });
      }
    }
  }

  get sakaChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] &&
      this.navArray[this.currentNavPosition].displaySakaChildren &&
      this.sakaChildren
      ? html`
          ${this.navArray[this.currentNavPosition].displaySakaChildren &&
          this.sakaChildren.map(
            child => html`
              <section class="card">
                <a
                  class="header-link"
                  href="/${child.uid}"
                  @click=${() =>
                    this._onSakaChildrenCardClick({
                      childId: child.uid,
                      childName: child.acronym || child.translated_name || child.root_name,
                      dispatchState: true,
                    })}
                >
                  <header>
                    <span class="header-left">
                      <span class="title">
                        ${child.translated_name || child.root_name || child.uid}
                      </span>
                      <div class="navigation-nerdy-row">
                        <span
                          class="subTitle"
                          lang="${child.root_lang_iso || this.lastSelectedItemRootLangISO}"
                          translate="no"
                        >
                          ${child.root_name || child.acronym}
                        </span>
                        <span class="acronym">${child.child_range}</span>
                      </div>
                    </span>
                    ${child.yellow_brick_road
                      ? html`
                          <span class="header-right">
                            <span class="number-translated">
                              <span class="number">${child.yellow_brick_road_count}</span>
                              ${this.fullSiteLanguageName}
                            </span>
                          </span>
                        `
                      : ''}
                  </header>
                </a>
                ${child.blurb
                  ? html`
                      <div class="blurb blurbShrink" id="${child.uid}_blurb">
                        ${unsafeHTML(child.blurb)}
                      </div>
                    `
                  : ''}
              </section>
            `
          )}
        `
      : '';
  }

  _onSakaChildrenCardClick(params) {
    const navType = 'sakaChildren';
    const navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: params.childName,
      url: `/${params.childId}`,
      type: navType,
      groupId: params.childId,
      groupName: params.childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };
    if (params.dispatchState) {
      this._dispatchNavState(this.navArray, navIndexesOfType.position, params.childName);
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      dispatchCustomEvent(this, 'sc-navigate', { pathname: `/${params.childId}` });
    }
  }
}

customElements.define('sc-navigation', SCNavigation);
