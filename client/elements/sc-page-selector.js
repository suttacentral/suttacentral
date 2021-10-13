/* eslint-disable indent */
import { css, html, LitElement } from 'lit';
import { LitLocalized } from './addons/sc-localization-mixin';
import RoutingService from '../utils/routingService';
import { store } from '../redux-store';
import { dispatchCustomEvent } from '../utils/customEvent';

// prettier-ignore
const isoCodes = [
  'af', 'ar', 'ca', 'cs', 'lzh', 'de', 'en', 'es', 'fa', 'fr', 'pgd',
  'he', 'id', 'it', 'la', 'hu', 'nl', 'no', 'ot', 'pli', 'pl', 'pt',
  'pra', 'ro', 'san', 'sr', 'fi', 'sv', 'xct', 'xto', 'vn', 'uig',
  'ru', 'mr', 'hi', 'ta', 'si', 'th', 'my', 'kho', 'ko', 'jp', 'zh',
  'bo', 'pi', 'ug', 'gr', 'pr', 'skt', 'sl', 'jpn', 'vi', 'bn', 'zz'
];

const staticPages = [
  'HOME',
  'ABBREVIATIONS',
  'ABHIDHAMMA',
  'ABOUT',
  'ACKNOWLEDGMENTS',
  'A-NEW-BEGINNING',
  'AN-GUIDE-SUJATO',
  'AN-INTRODUCTION-BODHI',
  'DISCOURSES',
  'DN-GUIDE-SUJATO',
  'DONATE-NOW',
  'DONATIONS',
  'DONATION-SUCCESS',
  'DOWNLOADS',
  'GENERAL-GUIDE-SUJATO',
  'INTRODUCTION',
  'LANGUAGES',
  'LICENSING',
  'METHODOLOGY',
  'MN-GUIDE-SUJATO',
  'NAMES',
  'NUMBERING',
  'OFFLINE',
  'SIMILES',
  'SN-GUIDE-SUJATO',
  'START',
  'SUBJECTS',
  'TERMINOLOGY',
  'VINAYA',
];

// prettier-ignore
const routes = {
  'HOME': {
    path: '/',
    content: html`<sc-static-home />`,
    loader: () => import('./static/sc-static-home.js'),
  },
  'SEARCH': {
    path: '/search',
    content: html`<sc-page-search />`,
    loader: () => import('./sc-page-search.js'),
  },
  'DEFINE': {
    path: '/define/:word',
    content: html`<sc-page-dictionary />`,
    loader: () => import('./sc-page-dictionary.js')
  },
  'NAVIGATION': {
    path: '/pitaka/:ids(.+)',
    content: html`<sc-navigation-new />`,
    loader: () => import('./navigation/sc-navigation-new.js'),
  },
  'ABBREVIATIONS': {
    path: '/abbreviations',
    content: html`<sc-static-abbreviations />`,
    loader: () => import('./static/sc-static-abbreviations.js'),
  },
  'ABHIDHAMMA': {
    path: '/abhidhamma-guide-sujato',
    content: html`<sc-static-abhidhamma />`,
    loader: () => import('./static/sc-static-abhidhamma.js')
  },
  'ABOUT': {
    path: '/about',
    content: html`<sc-static-about />`,
    loader: () => import('./static/sc-static-about.js'),
  },
  'ACKNOWLEDGMENTS': {
    path: '/acknowledgments',
    content: html`<sc-static-acknowledgments />`,
    loader: () => import('./static/sc-static-acknowledgments.js'),
  },
  'A-NEW-BEGINNING': {
    path: '/a-new-beginning',
    content: html`<sc-static-a-new-beginning />`,
    loader: () => import('./static/sc-static-a-new-beginning.js')
  },
  'AN-GUIDE-SUJATO': {
    path: '/an-guide-sujato',
    content: html`<sc-static-an-guide-sujato />`,
    loader: () => import('./static/sc-static-an-guide-sujato.js')
  },
  'AN-INTRODUCTION-BODHI': {
    path: '/an-introduction-bodhi',
    content: html`<sc-static-an-introduction-bodhi />`,
    loader: () => import('./static/sc-static-an-introduction-bodhi.js')
  },
  'DISCOURSES': {
    path: '/discourses-guide-sujato',
    content: html`<sc-static-discourses />`,
    loader: () => import('./static/sc-static-discourses.js')
  },
  'DN-GUIDE-SUJATO': {
    path: '/dn-guide-sujato',
    content: html`<sc-static-dn-guide-sujato />`,
    loader: () => import('./static/sc-static-dn-guide-sujato.js')
  },
  'DONATE-NOW': {
    path: '/donate-now',
    content: html`<sc-static-donate-now />`,
    loader: () => import('./static/sc-static-donate-now.js'),
  },
  'DONATIONS': {
    path: '/donations',
    content: html`<sc-static-donations />`,
    loader: () => import('./static/sc-static-donations.js'),
  },
  'DONATION-SUCCESS': {
    path: '/donation-success',
    content: html`<sc-static-donation-success/>`,
    loader: () => import('./static/sc-static-donation-success.js')
  },
  'DOWNLOADS': {
    path: '/downloads',
    content: html`<sc-static-downloads />`,
    loader: () => import('./static/sc-static-downloads.js'),
  },
  'GENERAL-GUIDE-SUJATO': {
    path: '/general-guide-sujato',
    content: html`<sc-static-general-guide-sujato />`,
    loader: () => import('./static/sc-static-general-guide-sujato.js')
  },
  'INTRODUCTION': {
    path: '/introduction',
    content: html`<sc-static-introduction />`,
    loader: () => import('./static/sc-static-introduction.js'),
  },
  'LANGUAGES': {
    path: '/languages',
    content: html`<sc-static-languages />`,
    loader: () => import('./static/sc-static-languages.js')
  },
  'LANGUAGES-DETAIL': {
    path: '/languages/:langIsoCode',
    content: html`<sc-static-languages />`,
    loader: () => import('./static/sc-static-languages.js')
  },
  'LICENSING': {
    path: '/licensing',
    content: html`<sc-static-licensing />`,
    loader: () => import('./static/sc-static-licensing.js'),
  },
  'METHODOLOGY': {
    path: '/methodology',
    content: html`<sc-static-methodology />`,
    loader: () => import('./static/sc-static-methodology.js'),
  },
  'MN-GUIDE-SUJATO': {
    path: '/mn-guide-sujato',
    content: html`<sc-static-mn-guide-sujato />`,
    loader: () => import('./static/sc-static-mn-guide-sujato.js')
  },
  'NAMES': {
    path: '/names',
    content: html`<sc-static-names />`,
    loader: () => import('./static/sc-static-names.js')
  },
  'NUMBERING': {
    path: '/numbering',
    content: html`<sc-static-numbering />`,
    loader: () => import('./static/sc-static-numbering.js'),
  },
  'OFFLINE': {
    path: '/offline',
    content: html`<sc-static-offline />`,
    loader: () => import('./static/sc-static-offline.js'),
  },
  'SIMILES': {
    path: '/similes',
    content: html`<sc-static-similes />`,
    loader: () => import('./static/sc-static-similes.js')
  },
  'SN-GUIDE-SUJATO': {
    path: '/sn-guide-sujato',
    content: html`<sc-static-sn-guide-sujato />`,
    loader: () => import('./static/sc-static-sn-guide-sujato.js')
  },
  'START': {
    path: '/start',
    content: html`<sc-static-start />`,
    loader: () => import('./static/sc-static-start.js'),
  },
  'SUBJECTS': {
    path: '/subjects',
    content: html`<sc-static-subjects />`,
    loader: () => import('./static/sc-static-subjects.js')
  },
  'TERMINOLOGY': {
    path: '/terminology',
    content: html`<sc-static-terminology />`,
    loader: () => import('./static/sc-static-terminology.js'),
  },
  'VINAYA': {
    path: '/vinaya-guide-brahmali',
    content: html`<sc-static-vinaya />`,
    loader: () => import('./static/sc-static-vinaya.js')
  },
  'SUTTA': {
    path: '/:suttaId/:langIsoCode/:authorUid',
    loader: () => import('./text/sc-text-page-selector.js'),
    content: html`<sc-text-page-selector />`
  },
  'SUTTAPLEX': {
    path: '/:categoryId',
    content: html`<sc-suttaplex-list />`,
    loader: () => import('./suttaplex/sc-suttaplex-list.js')
  },
};

class SCPageSelector extends LitLocalized(LitElement) {
  static get properties() {
    return {
      currentRoute: { type: Object },
      shouldShowSecondToolbar: { type: Object },
      shouldShowTipitakaToolbar: { type: Object },
      shouldShowAcademicToolbar: { type: Object },
      shouldShowOrganizationalToolbar: { type: Object },
      shouldShowGuidesToolbar: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        height: 100%;
      }

      .container {
        padding-top: 64px;
        padding-bottom: 64px;
      }

      .link-anchor {
        position: absolute;
        width: calc(100% + 20px);
        height: 100%;
      }
    `;
  }

  get actions() {
    return {
      changeRoute(name, params, path) {
        store.dispatch({
          type: 'CHANGE_ROUTE',
          payload: { name, params, path },
        });
      },
      setNavigation(navArray) {
        store.dispatch({
          type: 'SET_NAVIGATION',
          navigationArray: navArray,
        });
      },
      setStaticPagesToolbarDisplayState(toolbarDisplayState) {
        store.dispatch({
          type: 'CHANGE_STATIC_PAGES_TOOLBAR_DISPLAY_STATE',
          staticPagesToolbarDisplayState: toolbarDisplayState,
        });
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title,
        });
      },
      changeDisplayToolButtonState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_TOOL_BUTTON_STATE',
          displayToolButton: display,
        });
      },
      changeDisplayInfoButtonState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_INFO_BUTTON_STATE',
          displayInfoButton: display,
        });
      },
      changeDisplayViewModeButtonState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_VIEW_MODE_BUTTON_STATE',
          displayViewModeButton: display,
        });
      },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-page-selector';
    this.router = new RoutingService();
    this.router.addRoutes(routes);
    this._stopListening = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    this._createMetaData();

    this._changeRoute(this.router.location);
    this._stopListening = this.router.listen(({ location }) => {
      this._changeRoute(location);
    }, document.body);

    this.addEventListener('par-menu-copied', e => {
      const success = e.detail.success ? 'success' : 'error';
      this._showToast(success, e.detail.message);
    });

    if (this._shouldRedirect()) {
      this._redirectFromLegacyLink();
    }
  }

  _loadScActionItems() {
    if (this.currentRoute.name !== 'HOME') {
      const scSiteLayout = document.querySelector('sc-site-layout');
      const scActionItems = scSiteLayout?.shadowRoot.querySelector('#action_items');
      if (!scActionItems) {
        import(
          /* webpackMode: "lazy" */
          /* webpackPrefetch: true */
          './menus/sc-action-items'
        )
          .then(module => {
            const contextToolbar = scSiteLayout?.shadowRoot.querySelector('#context_toolbar');
            const newScActionItems = document.createElement('sc-action-items');
            newScActionItems.id = 'action_items';
            contextToolbar.appendChild(newScActionItems);
            this._setActionItemsDisplayState();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  _loadTopSheets() {
    if (this.currentRoute.name !== 'HOME') {
      const topSheets = new Map([
        ['setting_menu', 'sc-top-sheet-views'],
        ['sutta_parallels', 'sc-top-sheet-parallels'],
        ['sutta_toc', 'sc-top-sheet-toc'],
        ['sutta-info', 'sc-top-sheet-publication-legacy'],
        ['bilara-sutta-info', 'sc-top-sheet-publication-bilara'],
      ]);
      let needToLoadTopSheets = false;
      const scSiteLayout = document.querySelector('sc-site-layout');
      // eslint-disable-next-line no-restricted-syntax
      for (const key of topSheets.keys()) {
        const topSheet = scSiteLayout?.shadowRoot.querySelector(`#${key}`);
        if (!topSheet) {
          needToLoadTopSheets = true;
          break;
        }
      }
      if (needToLoadTopSheets) {
        import(/* webpackMode: "lazy" */ './addons/sc-top-sheet-views');
        import(/* webpackMode: "lazy" */ './addons/sc-top-sheet-toc');
        import(/* webpackMode: "lazy" */ './addons/sc-top-sheet-parallels');
        import(/* webpackMode: "lazy" */ './addons/sc-top-sheet-publication-legacy');
        import(/* webpackMode: "lazy" */ './addons/sc-top-sheet-publication-bilara');
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of topSheets) {
          this._appendTopSheet(key, value, scSiteLayout);
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _appendTopSheet(topSheetId, topSheetTagName, scSiteLayout) {
    const universalToolbar = scSiteLayout?.shadowRoot.querySelector('#universal_toolbar');
    const navMenu = scSiteLayout?.shadowRoot.querySelector('#static_pages_nav_menu');
    const newTopSheet = document.createElement(topSheetTagName);
    newTopSheet.id = topSheetId;
    universalToolbar.insertBefore(newTopSheet, navMenu);
  }

  updated() {
    if (this.currentRoute.name !== 'SUTTA') {
      this._createMetaData();
    }
    this._updateNav();
    this._changeToolbarTitle();
    this._loadScActionItems();
    this._loadTopSheets();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._stopListening();
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.currentRoute !== state.currentRoute) {
      this.currentRoute = state.currentRoute;
      if (this.routeDefinition) {
        this.routeDefinition.loader();
        this._scrollToTop();
        this._setVisibleToolbar();
        this._recalculateView();
      }
    }
  }

  render() {
    return this.routeDefinition
      ? html` <div class="container">${this.routeDefinition.content}</div> `
      : html`
          <div class="page-not-found-container">
            <h2>${this.localize('error404')}</h2>
            <h3>${this.localize('pageNotFound')}</h3>
          </div>
        `;
  }

  _changeRoute(location) {
    const [route, params] = this.router.match(location.pathname);
    this.actions.changeRoute(route, params, location.pathname);
  }

  get routeDefinition() {
    if (this.currentRoute && this.currentRoute.name) {
      return routes[this.currentRoute.name];
    }
  }

  _scrollToTop() {
    window.scroll(0, 0);
  }

  _redirectFromLegacyLink() {
    const parts = this.router.location.pathname.split('/');
    const partsNewIsoCode = parts.map(x => x.replace('pi-', 'pli-').replace('skt-', 'san-'));
    partsNewIsoCode.forEach(item => {
      if (isoCodes.indexOf(item) !== -1) {
        partsNewIsoCode.splice(partsNewIsoCode.indexOf(item), 1);
      }
    });
    this.router.push(partsNewIsoCode.join('/'));
  }

  _shouldRedirect() {
    const path = this.router.location.pathname;

    const langReg = isoCodes.join('|');
    const legacyLinkReg = new RegExp(`\/(${langReg})\/.*[0-9]`);
    const legacyLinkReg2 = new RegExp(`\/.*[0-9]\/(${langReg})`);
    const legacyLinkReg3 = path.startsWith('/pi-') || path.startsWith('/skt-');
    const newLinkReg = new RegExp(`\/.*[0-9]\/(${langReg})\/[a-z\d]+`);
    return (
      (legacyLinkReg.test(path) || legacyLinkReg2.test(path) || legacyLinkReg3) &&
      !newLinkReg.test(path)
    );
  }

  _showToast(toastType, text) {
    dispatchCustomEvent(document, 'show-sc-toast', {
      toastType,
      message: text,
    });
  }

  _createMetaData() {
    const description = this.localize('metaDescriptionText');
    const pageName = this.localize(`${this.currentRoute.name || 'NOT-FOUND'}`);
    dispatchCustomEvent(document, 'metadata', {
      pageTitle: `SuttaCentral—${pageName.toLowerCase()}`,
      title: `SuttaCentral—${pageName.toLowerCase()}`,
      description,
    });

    dispatchCustomEvent(document, 'keyword-metadata', { keywords: this.localize('metaKeywords') });
  }

  _setVisibleToolbar() {
    this.shouldShowSecondToolbar = ['SUBJECTS', 'SIMILES', 'NAMES', 'TERMINOLOGY'].includes(
      this.currentRoute.name
    );
    this.shouldShowTipitakaToolbar = ['DISCOURSES', 'VINAYA', 'ABHIDHAMMA'].includes(
      this.currentRoute.name
    );
    this.shouldShowAcademicToolbar = ['NUMBERING', 'ABBREVIATIONS', 'METHODOLOGY'].includes(
      this.currentRoute.name
    );
    this.shouldShowOrganizationalToolbar = ['ACKNOWLEDGMENTS', 'LICENSING', 'ABOUT'].includes(
      this.currentRoute.name
    );
    this.shouldShowGuidesToolbar = [
      'GENERAL-GUIDE-SUJATO',
      'DN-GUIDE-SUJATO',
      'MN-GUIDE-SUJATO',
      'SN-GUIDE-SUJATO',
      'AN-GUIDE-SUJATO',
      'AN-INTRODUCTION-BODHI',
    ].includes(this.currentRoute.name);

    const isToolbarSelected = !(
      this.shouldShowSecondToolbar ||
      this.shouldShowTipitakaToolbar ||
      this.shouldShowAcademicToolbar ||
      this.shouldShowOrganizationalToolbar ||
      this.shouldShowGuidesToolbar
    );

    this.actions.setStaticPagesToolbarDisplayState({
      displayFirstToolbar: isToolbarSelected,
      displaySecondToolbar: this.shouldShowSecondToolbar,
      displayTipitakaToolbar: this.shouldShowTipitakaToolbar,
      displayAcademicToolbar: this.shouldShowAcademicToolbar,
      displayOrganizationalToolbar: this.shouldShowOrganizationalToolbar,
      displayGuidesToolbar: this.shouldShowGuidesToolbar,
    });
  }

  _changeToolbarTitle() {
    switch (this.currentRoute.name) {
      case 'SEARCH':
        this.actions.changeToolbarTitle(this.localize('searchResults'));
        break;
      case 'DEFINE':
        this.actions.changeToolbarTitle(this.localize('dictionaryResults'));
        break;
      case 'HOME':
        this.actions.changeToolbarTitle('SuttaCentral');
        break;
      case 'NAVIGATION':
        return;
      case 'SUTTAPLEX':
        return;
      case 'SUTTA':
        return;
      default:
        const key = `${this.currentRoute.name}-TITLE`;
        if (this.__resources[key]) {
          const pageNameTitle = this.localize(key);
          this.actions.changeToolbarTitle(pageNameTitle);
        } else {
          this.actions.changeToolbarTitle('');
        }
    }
  }

  _updateNav() {
    if (staticPages.includes(this.currentRoute.name)) {
      const navArray = store.getState().navigationArray;
      const currentPath = this.currentRoute.path;
      const pageName = this.localize(`${this.currentRoute.name}`);
      navArray.length = 1;
      if (currentPath !== '/' && (!navArray[1] || navArray[1].type !== 'staticPage')) {
        navArray.push({
          title: pageName,
          url: currentPath,
          type: 'staticPage',
        });
        this.actions.setNavigation(navArray);
      }
    }
  }

  _recalculateView() {
    this.actions.changeDisplayToolButtonState(this.currentRoute.name === 'SUTTA');
    this.actions.changeDisplayInfoButtonState(this.currentRoute.name === 'SUTTA');

    const contextToolbar = this.parentNode.querySelector('#context_toolbar');
    const expandClass = 'contextToolbarExpand';
    this.currentRoute.name === 'SUTTA'
      ? contextToolbar.classList.add(expandClass)
      : contextToolbar.classList.remove(expandClass);

    this.parentNode.querySelector('#static_pages_nav_menu').style.display = [
      'SEARCH',
      'NAVIGATION',
      'SUTTA',
      'SUTTAPLEX',
    ].includes(this.currentRoute.name)
      ? 'none'
      : 'block';

    this._setViewModeButtonDisplayState();
    this._setActionItemsDisplayState();
    this._setTitleState();
  }

  _setTitleState() {
    if (this.currentRoute.name === 'HOME') {
      this.parentNode.querySelector('#context_toolbar').style.height = '180px';
      this.parentNode.querySelector('.sc_logo').style.display = '';
      this.parentNode.querySelector('#title').classList.add('homeTitle');
      this.parentNode.querySelector('#title').classList.remove('generalTitle');
      this.parentNode.querySelector('#subTitle').style.display = 'initial';
    } else {
      this.parentNode.querySelector('#context_toolbar').style.height = '60px';
      this.parentNode.querySelector('.sc_logo').style.display = 'none';
      this.parentNode.querySelector('#title').classList.remove('homeTitle');
      this.parentNode.querySelector('#title').classList.add('generalTitle');
      this.parentNode.querySelector('#title').style.height = '';
      this.parentNode.querySelector('#subTitle').style.display = 'none';
    }
  }

  _setActionItemsDisplayState() {
    const scActionItems = this.parentNode.querySelector('#action_items');
    if (scActionItems) {
      scActionItems.style.display = this.currentRoute.name === 'HOME' ? 'none' : 'flex';
    }
  }

  _setViewModeButtonDisplayState() {
    this.actions.changeDisplayViewModeButtonState(
      ['HOME', 'SUTTAPLEX', 'NAVIGATION'].includes(this.currentRoute.name)
    );
  }
}

customElements.define('sc-page-selector', SCPageSelector);
