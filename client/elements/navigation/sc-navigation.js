import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { API_ROOT } from '../../constants';
import { navigationNormalModeStyles, navigationCompactModeStyles } from './sc-navigation-styles';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';
import { pitakaGuide, navIndex, shortcuts } from './sc-navigation-common';
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
    this.suttasBlurb = new Map(Object.entries(store.getState().suttasBlurb || {}));

    this._verifyURL();
    this._appViewModeChanged();
    this._fetchMainData();
    this._fetchExpansion();
    this._initPitakaCards({dispatchState: true});
    this._parseURL();
  }

  // Check whether the URL item is valid, 
  // check from the last level, crop the URL item if it is not valid, 
  // and if valid so, check that the parent contains it, and if not, crop the URL item.
  async _verifyURL() {
    if (!['pitaka/sutta', 'pitaka/vinaya', 'pitaka/abhidhamma'].includes(this.pitakaUid)) {
      window.location.href = '/pitaka/sutta';
    }

    let navArray = this.routePath.split('/');
    if (navArray.length >= 3) {
      //0='', 1='pitaka' 2='sutta,vinaya,ahbdidama', Do not need to be process, so delete it.
      navArray.splice(0, 3);
    }
    if (navArray.length === 0) {
      return;
    }

    for (let i = navArray.length - 1; i >= 0; i--) {
      if (navArray.length > 1 && i !== 0) {
        // index !== 0, Data needs to be obtained from ‘/api/menu/[suttaUid]?language=en’
        let navData = await this._fetchChildrenData(navArray[i]);
        if (!navData) {
          window.location.href = this._cutURL(navArray[i]);
        } else {
          if (i-1 === 0) {
            await this._fetchParallels(navArray[i-1]);
            if (!this.parallelsData) {
              window.location.href = `/${this.pitakaUid}`;
            } else {
              let childData = this.parallelsData.children.find(x => {
                return x.id === navArray[i]
              }); 
              if (!childData) {
                window.location.href = this._cutURL(navArray[i]);
              }
            }
          } else {
            let navData = await this._fetchChildrenData(navArray[i-1]);
            if (!navData) {
              let URL = this._cutURL(navArray[i]);
              URL = this._cutURL(navArray[i-1], URL);
              window.location.href = URL;
            } else {
              let childData = navData[0].children.find(x => {
                return x.id === navArray[i]
              });
              if (!childData) {
                window.location.href = this._cutURL(navArray[i]);
              }
            }
          }
        }
      } else {
        // index = 0, Data needs to be obtained from ‘/api/menu?language=en’
        await this._fetchParallels(navArray[i]);
        if (!this.parallelsData) {
          window.location.href = `/${this.pitakaUid}`;
        }
      }
    }
  }

  _cutURL(navItem, currentURL = '') {
    let newURL = currentURL || this.routePath;
    let regex = new RegExp(`/${navItem}`, 'g');
    newURL = newURL.replace(regex, '');
    return newURL;
  }

  async _fetchParallels(navItem) {
    let formattedParallelsUid = this._formatParallelsUid(navItem);
    this.parallelsUid = this._formatParallelsUid(navItem).uid;
    await this._fetchParallelsData({
      childId: this.parallelsUid,
      langIso: formattedParallelsUid.langIso,
    });
  }

  _formatParallelsUid(navItem) {
    let formattedUid = {
      uid: navItem,
      langIso: ''
    };
    if (this.pitakaUid === 'pitaka/sutta' && !navItem.includes('grouping')) {
      if (navItem !== 'other') {
        formattedUid.uid = `grouping/${navItem}`;
      } else {
        formattedUid.uid = `grouping/${navItem}-group`;
      }
    }
    if (['pitaka/vinaya', 'pitaka/abhidhamma'].includes(this.pitakaUid) && !navItem.includes('sect')) {
      if (navItem.includes('-')) {
        let sect = navItem.split('-');
        if (sect.length === 2) {
          formattedUid.uid  = sect[0];
          formattedUid.langIso = sect[1];
        }
      }
      formattedUid.uid = this._getUidByName(formattedUid.uid);
    }
    return formattedUid;
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
      updateSuttasBlurb(blurbs) {
        store.dispatch({
          type: "UPDATE_BLURBS",
          suttasBlurb: blurbs
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
      this.lastError = e;
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
      this.lastError = e;
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
    } catch (e) {
      this.lastError = e;
    }
  }

  render() {
    return html`
      ${navigationNormalModeStyles}
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
          <section class="card">
            <a class="header-link" href="${this._genPitakaURL(child)}" 
              @click=${() => this._onPitakaCardClick({childId: child.uid, childName: child.name, langIso: child.lang_iso, dispatchState: true})}>
                <header>
                  <span class="header-left">
                    <span class="title" lang="${child.lang_iso}">
                      ${this.localizeEx('CollectionOf', 'sutta', this.localize(this.pitakaName), 'pitaka', this.localize(child.name))}
                    </span>
                    <div class="navigation-nerdy-row">
                    <span class="subTitle" lang="${child.lang_iso}" translate="no">${child.name}</span>
                    </div>
                  </span>
                  ${child.yellow_brick_road ? html`
                    <span class="header-right">
                      <mwc-icon>${icons['tick']}</mwc-icon>
                      <span class="number-translated"><span class="number"></span> ${this.fullSiteLanguageName}</span>
                    </span>
                  ` : ''}
                </header>
              </a>
            <div class="blurb blurbShrink">
              ${this.localizeEx('CollectionOf', 'sutta', this.localize(this.pitakaName), 'pitaka', this.localize(child.name))} 
                in ${child.lang_name ? html`<span>${child.lang_name}</span>` : 'Pali and Chinese.'}.
            </div>
          </section>
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
      if (params.childId !== 'other') {
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

    if (this.parallelsData.children) {
      await this._attachBlurbs(params.childId, this.parallelsData.children);
    }

    if (!params.childName) {
      params.childName = this.parallelsData.name;
    }

    let navURL = `/pitaka/${this._getPathParamNumber(navIndexesOfType.pathParamIndex)}/${params.childName.toLowerCase()}`;
    if (params.langIso) {
      navURL = `${navURL}-${params.langIso}`;
    }

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

  updated() {
    this._addBlurbsClickEvent();
  }

  get parallelsContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displayParallels && this.parallelsData ? html`
      ${this.parallelsData.children.map(child => html`
        <section class="card">
          <a class="header-link" href="${this._genCurrentURL(child.id)}" 
            @click=${() => this._onParallelsCardClick({childId: child.id, childName: child.name, dispatchState: true})}>
            <header>
              <span class="header-left">
                <span class="title" lang="${child.lang_iso}">
                  ${this.localize(this.pitakaName)} ${this.localize(child.name)}
                </span>
                <div class="navigation-nerdy-row">
                <span class="subTitle" lang="${child.lang_iso}" translate="no">${child.name}</span>
                </div>
              </span>
              ${child.yellow_brick_road ? html`
                <span class="header-right">
                  <mwc-icon>${icons['tick']}</mwc-icon>
                  <span class="number-translated"><span class="number" id="${child.id}_number"></span> ${this.fullSiteLanguageName}</span>
                </span>
              ` : ''}
            </header>
          </a>

          <div class="blurb blurbShrink" id="${child.id}_blurb">${unsafeHTML(child.blurb || '')}</div>

          ${pitakaGuide.get(child.id) ? html`
            <a href="${pitakaGuide.get(child.id)}" class="essay-link">
            <div class="essay" id="${child.id}_essay">
              ${this.localize(`${child.id}_essayTitle`)}
            </div>
            </a>
          ` : ''}

          ${shortcuts.includes(child.id) ? html`
            <div class="shortcut">
              <a href="/${child.id}" class='shortcut-link'>${this.localize('shortcutToFullList')}</a>
            </div>
          ` : ''}
        </section>
      `)}`: '';
  }

  async _attachBlurbs(categoryId, children) {
    if (!categoryId || !children) {
      return;
    }
    
    if (!this.suttasBlurb) {
      this.suttasBlurb = new Map(Object.entries(store.getState().suttasBlurb || {}));
    }
    this.shouldUpdateBlurb = false;
    if (!this.suttasBlurb.has(categoryId)) {
      await this._fetchSuttaPlex(categoryId);
      if (this.suttaplexData) {
        this.suttasBlurb.set(categoryId, this.suttaplexData[0]['blurb']);
        this.shouldUpdateBlurb = true;
      }
    }

    for (let child of children) {
      await this._addBlurbToChild(categoryId, child);
    }
    
    if (this.shouldUpdateBlurb) {
      this.actions.updateSuttasBlurb(Object.fromEntries(this.suttasBlurb));
    } 
  }

  async _addBlurbToChild(categoryId, child) {
    if (this.suttasBlurb.has(child.id)) {
      child.blurb = this.suttasBlurb.get(child.id);
    } else {
      await this._fetchSuttaPlex(child.id);
      if (this.suttaplexData) {
        let suttaPlex = this.suttaplexData.find(x => {
          return x.uid === child.id;
        });
        child.blurb = (suttaPlex && suttaPlex.blurb) ? suttaPlex.blurb : '';
        if (!this.suttasBlurb.has(child.id) && child.blurb) {
          this.suttasBlurb.set(child.id, child.blurb);
          this.shouldUpdateBlurb = true;
        }
      }
    }
  }

  _addBlurbsClickEvent() {
    this.shadowRoot.querySelectorAll('.blurb').forEach((element) => {
      element.onclick = (e) => {
        element.classList.contains('blurbShrink') ? element.classList.remove('blurbShrink') : element.classList.add('blurbShrink');
      };
    });
  }

  async _onParallelsCardClick(params) {
    this.vaggasData = await this._fetchChildrenData(params.childId);

    const showVaggas = this.vaggasData[0] && this.vaggasData[0].children &&
      this.vaggasData[0].children.some(child => ['div', 'division', 'subdivision'].includes(child.type)); 

    if (showVaggas) {
      await this._attachBlurbs(params.childId, this.vaggasData[0].children);
    }

    if (!params.childName) {
      params.childName = this.vaggasData[0].name;
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
    const uidAcro = await this._getAcronym(params.childId);
    this.navArray[navIndexesOfType.index] = {
      title: uidAcro || params.childName,
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
      this._setCurrentURL(params.childId);
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
        <section class="card">
          <a class="header-link" href="${this._genCurrentURL(child.id)}" 
            @click=${() => this._onVaggasCardClick({childId: child.id, childName: child.name, dispatchState: true})}>
            <header>
              <span class="header-left">
                <span class="title">
                  ${child.name ? this.localize(child.name) : child.id} ${this.parallelName}
                </span>
                <div class="navigation-nerdy-row">
                  <span class="subTitle" lang="${child.lang_iso}" translate="no">${child.name ? child.name : child.id}</span>
                  <span class="acronym">${this.navArray[this.currentNavPosition].title} ${child.display_num}</span>
                </div>
              </span>
              ${child.yellow_brick_road ? html`
                <span class="header-right">
                  <mwc-icon>${icons['tick']}</mwc-icon>
                  <span class="number-translated"><span class="number" id="${child.id}_number"></span> ${this.fullSiteLanguageName}</span>
                </span>
              ` : ''}
            </header>
          </a>

          <div class="blurb blurbShrink" id="${child.id}_blurb">${unsafeHTML(child.blurb || '')}</div>

          ${shortcuts.includes(child.id) ? html`
            <div class="shortcut">
              <a href="/${child.id}" class='shortcut-link'>${this.localize('shortcutToFullList')}</a>
            </div>
          ` : ''}
        </section>
      `)}` : '';
  }

  async _onVaggasCardClick(params) {
    this.vaggasData = await this._fetchChildrenData(params.childId);
    this.vaggaChildren = this.vaggasData[0].children;

    const showVaggaChildren = this.vaggaChildren && 
      this.vaggaChildren.some(child => ['div', 'division', 'subdivision'].includes(child.type)); 

    if (showVaggaChildren) {
      await this._attachBlurbs(params.childId, this.vaggaChildren);
    }

    if (!params.childName) {
      params.childName = this.vaggasData[0].name;
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
    const uidAcro = await this._getAcronym(params.childId);
    this.navArray[navIndexesOfType.index] = {
      title: uidAcro || params.childName,
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
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      if (!showVaggaChildren) {
        window.location.href = `/${params.childId}`;
      }
    }
  }

  get vaggaChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displayVaggaChildren && this.vaggaChildren ? html`
      ${this.vaggaChildren && this.vaggaChildren.map(child => html`
        <section class="card">
          <a class="header-link" href="${this._genCurrentURL(child.id)}" 
            @click=${() => this._onVaggaChildrenCardClick({childId: child.id, childName: child.name, dispatchState: true})}>
            <header>
              <span class="header-left">
                <span class="title">
                  ${child.name ? this.localize(child.name) : child.id} ${this.parallelName}
                </span>
                <div class="navigation-nerdy-row">
                  <span class="subTitle" lang="${child.lang_iso}" translate="no">${child.name ? child.name : child.id}</span>
                  <span class="acronym">${this.navArray[this.currentNavPosition].title} ${child.display_num}</span>
                </div>
              </span>
              ${child.yellow_brick_road ? html`
                <span class="header-right">
                  <mwc-icon>${icons['tick']}</mwc-icon>
                  <span class="number-translated"><span class="number" id="${child.id}_number"></span> ${this.fullSiteLanguageName}</span>
                </span>
              ` : ''}
            </header>
          </a>

          <div class="blurb blurbShrink" id="${child.id}_blurb">${unsafeHTML(child.blurb || '')}</div>

          ${shortcuts.includes(child.id) ? html`
            <div class="shortcut">
              <a href="/${child.id}" class='shortcut-link'>${this.localize('shortcutToFullList')}</a>
            </div>
          ` : ''}
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
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(params.childName));
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      if (!showVaggaChildrenChildren) {
        window.location.href = `/${params.childId}`;
      }
    }
  }

  get vaggaChildrenChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displayVaggaChildrenChildren && this.vaggaChildrenChildren ? html`
      ${this.navArray[this.currentNavPosition].displayVaggaChildrenChildren && this.vaggaChildrenChildren[0].children.map(child => html`
        <section class="card">
          <a class="header-link" href="${this._genCurrentURL(child.id)}"
            @click=${() => this._onVaggaChildrenChildrenCardClick({childId: child.id, childName: child.name, dispatchState: true})}>
            <header>
              <span class="header-left">
                <span class="title">
                  ${this.localize(child.name)} ${this.parallelName}
                </span>
                <div class="navigation-nerdy-row">
                  <span class="subTitle" lang="${child.lang_iso}" translate="no">${child.name ? child.name : child.id}</span>
                  <span class="acronym">${child.display_num}</span>
                </div>
              </span>
              ${child.yellow_brick_road ? html`
                <span class="header-right">
                  <mwc-icon>${icons['tick']}</mwc-icon>
                  <span class="number-translated"><span class="number" id="${child.id}_number"></span> ${this.fullSiteLanguageName}</span>
                </span>
              ` : ''}
            </header>
          </a>

          <div class="blurb blurbShrink" id="${child.id}_blurb"></div>

          ${shortcuts.includes(child.id) ? html`
            <div class="shortcut">
              <a href="/${child.id}" class='shortcut-link'>${this.localize('shortcutToFullList')}</a>
            </div>
          ` : ''}
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
      this._dispatchNavState(this.navArray, navIndexesOfType.position, this.localize(params.childName));
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      if (!showSakaChildren) {
        window.location.href = `/${params.childId}`;
      }
    }
  }

  get sakaChildrenContentTemplate() {
    return this.navArray[this.currentNavPosition] && this.navArray[this.currentNavPosition].displaySakaChildren && this.sakaChildren ? html`
      ${this.navArray[this.currentNavPosition].displaySakaChildren && this.sakaChildren.map(child => html`
        <section class="card">
          <a class="header-link" href="/${child.id}"
            @click=${() => this._onSakaChildrenCardClick({childId: child.id, childName: child.name, dispatchState: true})}>
            <header>
              <span class="header-left">
                <span class="title">${this.localize(child.name)} ${this.parallelName}</span>
                <div class="navigation-nerdy-row">
                  <span class="subTitle" lang="${child.lang_iso}" translate="no">${child.name ? child.name : child.id}</span>
                  <span class="acronym">${child.display_num}</span>
                </div>
              </span>
              ${child.yellow_brick_road ? html`
                <span class="header-right">
                  <span class="number" id="${child.id}_number"></span>
                  <mwc-icon>${icons['tick']}</mwc-icon>
                  <span class="number-translated">${this.fullSiteLanguageName}</span>
                </span>
              ` : ''}
            </header>
          </a>
          <div class="blurb blurbShrink" id="${child.id}_blurb"></div>
        </section>
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
      this._setCurrentURL(params.childId);
      this.requestUpdate();
      window.location.href = `/${params.childId}`;
    }
  }

  _getExpansionUrl() {
    return `${API_ROOT}/expansion`;
  }

  async _fetchExpansion() {
    try {
      this.expansionReturns = await (await fetch(this._getExpansionUrl())).json();  
    } catch (e) {
      this.lastError = e;
    }
  }

  async _getAcronym(uid) {
    if (!this.expansionReturns) {
      await this._fetchExpansion();
    }
    const uidExpansion = this.expansionReturns[0][uid];
    return uidExpansion ? uidExpansion[0] : '';
  }

  _getSuttaPlexApiUrl(categoryId) {
    return `${API_ROOT}/suttaplex/${categoryId}?language=${this.language}`;
  };

  async _fetchSuttaPlex(categoryId) {
    if (!categoryId) {
      return;
    }
    this.loading = true;
    try {
      this.suttaplexData = await fetch(this._getSuttaPlexApiUrl(categoryId)).then(r => r.json());
    } catch (e) {
      this.lastError = e;
    }
    this.loading = false;
  }
}

customElements.define('sc-navigation', SCNavigation);