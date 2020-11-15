import { LitElement, html, css } from 'lit-element';
import { API_ROOT } from '../../constants';
import { navigationNormaModelStyles, navigationCompactModeStyles } from './sc-navigation-styles';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';
import { pitakaGuide, navIndex } from './sc-navigation-common';
import '@alangdm/block-link';
import '../addons/sc-bouncing-loader';
import { icons } from '../../img/sc-icons';
import '@material/mwc-icon';

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
    this.pitakaUid = `pitaka/${this._getPathParamNumber(2)}`;
    this.pitakaName = this._getPathParamNumber(2);
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    this._appViewModeChanged();
    this._fetchMainData();
    this._initPitakaCards({dispatchState: true});
    this._parseURL();
  }

  async _parseURL() {
    let navArray = this.routePath.split('/');
    this.navArray.length = 1;
    this.currentURL = '/pitaka';
    let self = this;
    navArray.forEach((navItem, index) => {
      if (index > 1) {
        let cardEvent = this._getEventByNavIndex(index);
        this.currentURL = this.currentURL + '/' + navItem;
        let params = {
          childId: navItem, 
          childName: '', 
          dispatchState: index !== navArray.length - 1 ? false : true,
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
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(this.pitakaName));
    }
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
  }

  _currentNavPosChanged() {
    this._fetchMainData();
    this._attachLanguageCount();
    let currentNavState = this.navArray[this.currentNavPosition];
    if (currentNavState) {
      let params = {
        childId: currentNavState.groupId,
        childName: currentNavState.groupName,
        langIso: currentNavState.langIso,
        dispatchState: true,
      };
      let cardEvent = this._getEventByNavType(currentNavState.type);
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

  async _fetchMainData() {
    this.loading = true;
    await this._fetchTipitakaData();
    await this._fetchPitakaData();
    this.loading = false;
  }

  async _fetchTipitakaData() {
    try {
      this.tipitakaData = await (await fetch(`${API_ROOT}/menu?language=${this.language}`)).json();
    } catch (e) {
      this.errors = e;
    }
  }

  async _fetchPitakaData(params) {
    if (!this.tipitakaData) {
      await this._fetchTipitakaData();
    }
    this.pitakaData = this.tipitakaData.find(x => {
      return x.uid === this.pitakaUid
    });
  }

  async _fetchParallelsData(params) {
    if (!this.pitakaData) {
      await this._fetchPitakaData();
    }
    if (['pitaka/vinaya', 'pitaka/abhidhamma'].includes(this.pitakaUid) && params.langIso !== undefined) {
      this.parallelsData = this.pitakaData.children.find(x => {
        return x.uid === this.parallelsUid && x.lang_iso === params.langIso
      });
    } else {
      this.parallelsData = this.pitakaData.children.find(x => {
        return x.uid === this.parallelsUid
      });
    }
  }

  _getUidByName(name) {
    const mapSectarian = new Map([
      ['theravāda',        'sect/tv'],
      ['mahāsaṅghika',     'sect/mg'],
      ['lokuttaravāda',    'sect/lo'],
      ['mahīśāsaka',       'sect/mi'],
      ['dharmaguptaka',    'sect/dg'],
      ['sarvāstivāda',     'sect/sarv'],
      ['mūlasarvāstivāda', 'sect/mu'],
      ['other',            'sect/other'],
    ]);
    return mapSectarian.get(name);
  }

  async _fetchChildrenData(childId) {
    const lang = this.language ? this.language : 'en';
    const url = `${API_ROOT}/menu/${childId}?language=${lang}`;
    try {
      const childrenData = await (await fetch(url)).json();
      return childrenData;
    } catch (e) {
      this.errors = e;
    }
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
      this.errors = err;
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
        ${this.vaggaChildrenContentTemplate}
        ${this.vaggaChildrenChildrenContentTemplate}
        ${this.sakaChildrenContentTemplate}
      </main>
    `;
  }

  get pitakaContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displayPitaka && this.pitakaData ? html`
      ${this.pitakaData.children.map(child => html`
        <a href="${this._genPitakaURL(child)}" 
          @click=${() => this._onPitakaCardClick({childId: child.uid, childName: child.name, langIso: child.lang_iso, dispatchState: true})}>
          <section class="card pitaka">
            <header>
              <span class="header-left">
                <span class="title" lang="${child.lang_iso}">
                  ${this.localizeEx('CollectionOf', 'sutta', this.localize(this.pitakaName), 'pitaka', this.localize(child.name))}
                </span>
                <span class="subTitle">${child.name}</span>
              </span>
              ${child.yellow_brick_road ? html`
                <span class="header-right">
                  <span class="number"></span>
                  <mwc-icon>${icons['tick']}</mwc-icon>
                  <span class="number-translated">${this.fullSiteLanguageName}</span>
                </span>
              ` : ''}
            </header>
            <div class="blurb">
              ${this.localizeEx('CollectionOf', 'sutta', this.localize(this.pitakaName), 'pitaka', this.localize(child.name))} 
                in ${child.lang_name ? html`<span>${child.lang_name}</span>` : 'Pali and Chinese.'}.
            </div>
            <morph-ripple></morph-ripple>
          </section>
        </a>
      `)}` : '';
  }

  _genPitakaURL(child) {
    if (['pitaka/vinaya', 'pitaka/abhidhamma'].includes(this.pitakaUid) && child.lang_iso !== undefined) {
      return `/pitaka/${this._getPathParamNumber(navIndex.get('pitaka').pathParamIndex)}/${child.name.toLowerCase()}-${child.lang_iso}`;
    } else {
      return `/pitaka/${this._getPathParamNumber(navIndex.get('pitaka').pathParamIndex)}/${child.name.toLowerCase()}`;
    }
  }
  
  async _onPitakaCardClick(params) {
    const navType = 'parallels';
    const navIndexesOfType = navIndex.get(navType);
    if (this.pitakaUid === 'pitaka/sutta' && !params.childId.includes('grouping')) {
      if (params.childId.toLowerCase() !== 'other') {
        params.childId = `grouping/${params.childId}`;
      } else {
        params.childId = `grouping/${params.childId}-group`;
      }
    }
    if (['pitaka/vinaya', 'pitaka/abhidhamma'].includes(this.pitakaUid) && !params.childId.includes('sect')) {
      if (params.childId.includes('-')) {
        let sect = params.childId.split('-');
        if (sect.length === 2) {
          params.childId  = sect[0];
          params.langIso = sect[1];
        }
      }
      params.childId = this._getUidByName(params.childId);
    }
    this.parallelsUid = params.childId

    await this._fetchParallelsData(params);

    if (!params.childName) {
      params.childName = this.parallelsData.name;
    }
    this.navArray[navIndexesOfType.index] = {
      title: params.childName,
      url: `/pitaka/${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}/${params.childName.toLowerCase()}`,
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
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(params.childName));
      this._setCurrentURL(params.childName.toLowerCase());
    }
  }

  _dispatchNavState(navArray, navPos, toolbarTitle) {
    this.actions.setNavigation(navArray);
    this.actions.setCurrentNavPosition(navPos);
    this.actions.changeToolbarTitle(toolbarTitle);
  }

  firstUpdated() {
    if (!this.fullSiteLanguageName) {
      this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    }
  }

  get parallelsContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displayParallels && this.parallelsData ? html`
      ${this.parallelsData.children.map(child => html`
        <section class="card parallels" 
          @click=${() => this._onParallelsCardClick({childId: child.id.toLowerCase(), childName: child.name, dispatchState: true})}>
          <header>
            <span class="header-left">
              <span class="title" lang="${child.lang_iso}">
                <block-link>
                  <a href="${this._genCurrentURL(child.id.toLowerCase())}">
                    ${this.localize(this.pitakaName)} ${this.localize(child.name)}
                  </a>
                </block-link>
              </span>
              <span class="subTitle">${child.name}</span>
            </span>
            ${child.yellow_brick_road ? html`
              <span class="header-right">
                <span class="number" id="${child.id}_number"></span>
                <mwc-icon>${icons['tick']}</mwc-icon>
                <span class="number-translated">${this.fullSiteLanguageName}</span>
              </span>
            ` : ''}
          </header>

          <div class="blurb" id="${child.id}_blurb"></div>

          ${pitakaGuide.get(child.id) ? html`
            <div class="essay" id="${child.id}_essay">
              <block-link>
                <a href="${pitakaGuide.get(child.id)}">${this.localize(`${child.id}_essayTitle`)}</a>
              </block-link>
            </div>
          ` : ''}

          <div class="shortcut">
            <block-link>
              <a href="/${child.id.toLowerCase()}" class='shortcut-link'>${this.localize('shortcutToFullList')}</a>
            </block-link>
          </div>

          <paper-ripple></paper-ripple>
        </section>
      `)}`: '';
  }

  async _onParallelsCardClick(params) {
    this.vaggasData = await this._fetchChildrenData(params.childId);

    const showVaggas = this.vaggasData[0] && this.vaggasData[0].children &&
      this.vaggasData[0].children.some(child => ['div', 'division', 'subdivision'].includes(child.type)); 

    if (!params.childName) {
      params.childName = this.vaggasData[0].name;
    }

    let currentUrl = `/${params.childId}`;
    if (showVaggas) {
      currentUrl = this._genCurrentURL(params.childId.toLowerCase());
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
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(params.childName));
      this._setCurrentURL(params.childId.toLowerCase());
      this.requestUpdate();
      if (!showVaggas) {
        window.location.href = `/${params.childId}`;
      }
    }
  }

  _setCurrentURL(lastPath) {
    if (!lastPath) { return; }
    lastPath = encodeURI(lastPath);
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
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displayVaggas && this.vaggasData ? html`
      ${this.vaggasData[0].children.map(child => html`
        <section class="card vaggas" 
          @click=${() => this._onVaggasCardClick({childId: child.id.toLowerCase(), childName: child.name, dispatchState: true})}>
          <header>
            <span class="header-left">
              <span class="title" lang="en">
                <block-link>
                  <a href="${this._genCurrentURL(child.id.toLowerCase())}">
                    ${this.localize(child.name ? child.name : child.id)} ${this.parallelName}
                  </a>
                </block-link>
              </span>
              <span class="subTitle">${child.name ? child.name : child.id}</span>
            </span>
            ${child.yellow_brick_road ? html`
              <span class="header-right">
                <span class="number" id="${child.id}_number"></span>
                <mwc-icon>${icons['tick']}</mwc-icon>
                <span class="number-translated">${this.fullSiteLanguageName}</span>
              </span>
            ` : ''}
          </header>

          <div class="blurb" id="${child.id}_blurb"></div>

          <div class="shortcut">
            <block-link>
              <a href="/${child.id.toLowerCase()}" class='shortcut-link'>${this.localize('shortcutToFullList')}</a>
            </block-link>
          </div>

          <paper-ripple></paper-ripple>
        </section>
      `)}` : '';
  }

  async _onVaggasCardClick(params) {
    this.vaggasData = await this._fetchChildrenData(params.childId);
    this.vaggaChildren = this.vaggasData[0].children;

    const showVaggaChildren = this.vaggaChildren && 
      this.vaggaChildren.some(child => ['div', 'division', 'subdivision'].includes(child.type)); 

    if (!params.childName) {
      params.childName = this.vaggasData[0].name;
    }

    let currentUrl = `/${params.childId}`;
    if (showVaggaChildren) {
      currentUrl = this._genCurrentURL(params.childId.toLowerCase());
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
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(params.childName));
      this._setCurrentURL(params.childId.toLowerCase());
      this.requestUpdate();
      if (!showVaggaChildren) {
        window.location.href = `/${params.childId}`;
      }
    }
  }

  get vaggaChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displayVaggaChildren && this.vaggaChildren ? html`
      ${this.vaggaChildren && this.vaggaChildren.map(child => html`
        <section class="card vaggaChildren" @click=${() => this._onVaggaChildrenCardClick({childId: child.id.toLowerCase(), childName: child.name, dispatchState: true})}>
          <header>
            <span class="header-left">
              <span class="title" lang="en">
                <block-link>
                  <a href="${this._genCurrentURL(child.id.toLowerCase())}">
                    ${this.localize(child.name ? child.name : child.id)} ${this.parallelName}
                  </a>
                </block-link>
              </span>
              <span class="subTitle">${child.name ? child.name : child.id}</span>
            </span>
            ${child.yellow_brick_road ? html`
              <span class="header-right">
                <span class="number" id="${child.id}_number"></span>
                <mwc-icon>${icons['tick']}</mwc-icon>
                <span class="number-translated">${this.fullSiteLanguageName}</span>
              </span>
            ` : ''}
          </header>

          <div class="blurb" id="${child.id}_blurb"></div>

          <div class="shortcut">
            <block-link>
              <a href="/${child.id.toLowerCase()}" class='shortcut-link'>${this.localize('shortcutToFullList')}</a>
            </block-link>
          </div>

          <paper-ripple></paper-ripple>
        </section>
      `)}` : '';
  }

  async _onVaggaChildrenCardClick(params) {
    this.vaggaChildrenChildren = await this._fetchChildrenData(params.childId);

    const showVaggaChildrenChildren = this.vaggaChildrenChildren && 
      this.vaggaChildrenChildren[0].children.some(child => ['div', 'division', 'subdivision'].includes(child.type));

    if (!params.childName) {
      params.childName = this.vaggaChildrenChildren[0].name;
    }

    let currentUrl = `/${params.childId}`;
    if (showVaggaChildrenChildren) {
      currentUrl = this._genCurrentURL(params.childId.toLowerCase());
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
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(params.childName));
      this._setCurrentURL(params.childId.toLowerCase());
      this.requestUpdate();
      if (!showVaggaChildrenChildren) {
        window.location.href = `/${params.childId}`;
      }
    }
  }

  get vaggaChildrenChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displayVaggaChildrenChildren && this.vaggaChildrenChildren ? html`
      ${this.navArray[this.currentNavPosition].displayVaggaChildrenChildren && this.vaggaChildrenChildren[0].children.map(child => html`
        <section class="card vaggaChildrenChildren" 
          @click=${() => this._onVaggaChildrenChildrenCardClick({childId: child.id.toLowerCase(), childName: child.name, dispatchState: true})}>
          <header>
            <span class="header-left">
              <span class="title" lang="en">
                <block-link>
                  <a href="${this._genCurrentURL(child.id.toLowerCase())}">
                    ${this.localize(child.name)} ${this.parallelName}
                  </a>
                </block-link>
              </span>
              <span class="subTitle">${child.name}</span>
            </span>
            ${child.yellow_brick_road ? html`
              <span class="header-right">
                <span class="number" id="${child.id}_number"></span>
                <mwc-icon>${icons['tick']}</mwc-icon>
                <span class="number-translated">${this.fullSiteLanguageName}</span>
              </span>
            ` : ''}
          </header>

          <div class="blurb" id="${child.id}_blurb"></div>

          <div class="shortcut">
            <block-link>
              <a href="/${child.id.toLowerCase()}" class='shortcut-link'>${this.localize('shortcutToFullList')}</a>
            </block-link>
          </div>

          <paper-ripple></paper-ripple>
        </section>
      `)}` : '';
  }

  async _onVaggaChildrenChildrenCardClick(params) {
    this.sakaData = await this._fetchChildrenData(params.childId);
    this.sakaChildren = this.sakaData[0].children;

    const showSakaChildren = this.sakaChildren && 
      this.sakaChildren.some(child => ['div', 'division', 'subdivision'].includes(child.type));

    if (!params.childName) {
      params.childName = this.sakaData[0].name;
    }

    let currentUrl = `/${params.childId}`;
    if (showSakaChildren) {
      currentUrl = this._genCurrentURL(params.childId.toLowerCase());
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
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(params.childName));
      this._setCurrentURL(params.childId.toLowerCase());
      this.requestUpdate();
      if (!showSakaChildren) {
        window.location.href = `/${params.childId}`;
      }
    }
  }

  get sakaChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displaySakaChildren && this.sakaChildren ? html`
      ${this.navArray[this.currentNavPosition].displaySakaChildren && this.sakaChildren.map(child => html`
        <a href="/${child.id.toLowerCase()}">
          <section class="card sakaChildren" @click=${() => this._onSakaChildrenCardClick({childId: child.id.toLowerCase(), childName: child.name, dispatchState: true})}>
            <header>
              <span class="header-left">
                <span class="title" lang="en">${this.localize(child.name)} ${this.parallelName}</span>
                <span class="subTitle">${child.name}</span>
              </span>
              ${child.yellow_brick_road ? html`
                <span class="header-right">
                  <span class="number" id="${child.id}_number"></span>
                  <mwc-icon>${icons['tick']}</mwc-icon>
                  <span class="number-translated">${this.fullSiteLanguageName}</span>
                </span>
              ` : ''}
            </header>
            <div class="blurb" id="${child.id}_blurb"></div>
            <morph-ripple></morph-ripple>
          </section>
        </a>
      `)}` : '';
  }

  _onSakaChildrenCardClick(params) {
    let currentUrl = `/${params.childId}`;
    const navType = 'sakaChildren';
    const navIndexesOfType = navIndex.get(navType);
    this.navArray[navIndexesOfType.index] = {
      title: params.childName,
      url: currentUrl,
      type: navType,
      groupId: params.childId,
      groupName: params.childName,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };
    if (params.dispatchState) {
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(params.childName));
      this._setCurrentURL(params.childId.toLowerCase());
      this.requestUpdate();
      window.location.href = `/${params.childId}`;
    }
  }
}

customElements.define('sc-navigation', SCNavigation);