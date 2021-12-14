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
  'home',
  'abbreviations',
  'abhidhamma',
  'about',
  'acknowledgments',
  'aNewBeginning',
  'anGuideSujato',
  'anIntroductionBodhi',
  'discourses',
  'dnGuideSujato',
  'donateNow',
  'donations',
  'donationSuccess',
  'downloads',
  'generalGuideSujato',
  'introduction',
  'languages',
  'licensing',
  'methodology',
  'mnGuideSujato',
  'names',
  'numbering',
  'offline',
  'similes',
  'snGuideSujato',
  'start',
  'subjects',
  'terminology',
  'vinaya',
];

// prettier-ignore
const routes = {
  'home': {
    path: '/',
    content: html`<sc-static-home />`,
    loader: () => import('./static/sc-static-home.js'),
  },
  'search': {
    path: '/search',
    content: html`<sc-page-search />`,
    loader: () => import('./sc-page-search.js'),
  },
  'define': {
    path: '/define/:word',
    content: html`<sc-page-dictionary />`,
    loader: () => import('./sc-page-dictionary.js')
  },
  'navigation': {
    path: '/pitaka/:ids(.+)',
    content: html`<sc-navigation-new />`,
    loader: () => import('./navigation/sc-navigation-new.js'),
  },
  'abbreviations': {
    path: '/abbreviations',
    content: html`<sc-static-abbreviations />`,
    loader: () => import('./static/sc-static-abbreviations.js'),
  },
  'abhidhamma': {
    path: '/abhidhamma-guide-sujato',
    content: html`<sc-static-abhidhamma />`,
    loader: () => import('./static/sc-static-abhidhamma.js')
  },
  'about': {
    path: '/about',
    content: html`<sc-static-about />`,
    loader: () => import('./static/sc-static-about.js'),
  },
  'acknowledgments': {
    path: '/acknowledgments',
    content: html`<sc-static-acknowledgments />`,
    loader: () => import('./static/sc-static-acknowledgments.js'),
  },
  'aNewBeginning': {
    path: '/a-new-beginning',
    content: html`<sc-static-a-new-beginning />`,
    loader: () => import('./static/sc-static-a-new-beginning.js')
  },
  'anGuideSujato': {
    path: '/an-guide-sujato',
    content: html`<sc-static-an-guide-sujato />`,
    loader: () => import('./static/sc-static-an-guide-sujato.js')
  },
  'anIntroductionBodhi': {
    path: '/an-introduction-bodhi',
    content: html`<sc-static-an-introduction-bodhi />`,
    loader: () => import('./static/sc-static-an-introduction-bodhi.js')
  },
  'discourses': {
    path: '/discourses-guide-sujato',
    content: html`<sc-static-discourses />`,
    loader: () => import('./static/sc-static-discourses.js')
  },
  'dnGuideSujato': {
    path: '/dn-guide-sujato',
    content: html`<sc-static-dn-guide-sujato />`,
    loader: () => import('./static/sc-static-dn-guide-sujato.js')
  },
  'donateNow': {
    path: '/donate-now',
    content: html`<sc-static-donate-now />`,
    loader: () => import('./static/sc-static-donate-now.js'),
  },
  'donations': {
    path: '/donations',
    content: html`<sc-static-donations />`,
    loader: () => import('./static/sc-static-donations.js'),
  },
  'donationSuccess': {
    path: '/donation-success',
    content: html`<sc-static-donation-success/>`,
    loader: () => import('./static/sc-static-donation-success.js')
  },
  'downloads': {
    path: '/downloads',
    content: html`<sc-static-downloads />`,
    loader: () => import('./static/sc-static-downloads.js'),
  },
  'generalGuideSujato': {
    path: '/general-guide-sujato',
    content: html`<sc-static-general-guide-sujato />`,
    loader: () => import('./static/sc-static-general-guide-sujato.js')
  },
  'introduction': {
    path: '/introduction',
    content: html`<sc-static-introduction />`,
    loader: () => import('./static/sc-static-introduction.js'),
  },
  'languages': {
    path: '/languages',
    content: html`<sc-static-languages />`,
    loader: () => import('./static/sc-static-languages.js')
  },
  'LANGUAGES-DETAIL': {
    path: '/languages/:langIsoCode',
    content: html`<sc-static-languages />`,
    loader: () => import('./static/sc-static-languages.js')
  },
  'licensing': {
    path: '/licensing',
    content: html`<sc-static-licensing />`,
    loader: () => import('./static/sc-static-licensing.js'),
  },
  'methodology': {
    path: '/methodology',
    content: html`<sc-static-methodology />`,
    loader: () => import('./static/sc-static-methodology.js'),
  },
  'mnGuideSujato': {
    path: '/mn-guide-sujato',
    content: html`<sc-static-mn-guide-sujato />`,
    loader: () => import('./static/sc-static-mn-guide-sujato.js')
  },
  'names': {
    path: '/names',
    content: html`<sc-static-names />`,
    loader: () => import('./static/sc-static-names.js')
  },
  'numbering': {
    path: '/numbering',
    content: html`<sc-static-numbering />`,
    loader: () => import('./static/sc-static-numbering.js'),
  },
  'offline': {
    path: '/offline',
    content: html`<sc-static-offline />`,
    loader: () => import('./static/sc-static-offline.js'),
  },
  'similes': {
    path: '/similes',
    content: html`<sc-static-similes />`,
    loader: () => import('./static/sc-static-similes.js')
  },
  'snGuideSujato': {
    path: '/sn-guide-sujato',
    content: html`<sc-static-sn-guide-sujato />`,
    loader: () => import('./static/sc-static-sn-guide-sujato.js')
  },
  'start': {
    path: '/start',
    content: html`<sc-static-start />`,
    loader: () => import('./static/sc-static-start.js'),
  },
  'subjects': {
    path: '/subjects',
    content: html`<sc-static-subjects />`,
    loader: () => import('./static/sc-static-subjects.js')
  },
  'terminology': {
    path: '/terminology',
    content: html`<sc-static-terminology />`,
    loader: () => import('./static/sc-static-terminology.js'),
  },
  'vinaya': {
    path: '/vinaya-guide-brahmali',
    content: html`<sc-static-vinaya />`,
    loader: () => import('./static/sc-static-vinaya.js')
  },
  'sutta': {
    path: '/:suttaId/:langIsoCode/:authorUid',
    loader: () => import('./text/sc-text-page-selector.js'),
    content: html`<sc-text-page-selector />`
  },
  'suttaplex': {
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
    this.localizedStringsPath = '/localization/elements/interface';
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
    if (this.currentRoute.name !== 'home') {
      const scSiteLayout = document.querySelector('sc-site-layout');
      const scActionItems = scSiteLayout?.querySelector('#action_items');
      if (!scActionItems) {
        import(
          /* webpackMode: "lazy" */
          /* webpackPrefetch: true */
          './menus/sc-action-items'
        )
          .then(module => {
            const contextToolbar = scSiteLayout?.querySelector('#context_toolbar');
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
    if (this.currentRoute.name !== 'home') {
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
        const topSheet = scSiteLayout?.querySelector(`#${key}`);
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
    const universalToolbar = scSiteLayout?.querySelector('#universal_toolbar');
    const navMenu = scSiteLayout?.querySelector('#static_pages_nav_menu');
    const newTopSheet = document.createElement(topSheetTagName);
    newTopSheet.id = topSheetId;
    universalToolbar.insertBefore(newTopSheet, navMenu);
  }

  updated() {
    if (this.currentRoute.name !== 'SUTTA') {
      this._createMetaData();
    }
    this._updateNav();
    this._setVisibleToolbar();
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
      ? html`
          <style>
            .container {
              padding-top: 64px;
              padding-bottom: 64px;
            }

            .link-anchor {
              position: absolute;
              width: calc(100% + 20px);
              height: 100%;
            }
          </style>
          <div class="container">${this.routeDefinition.content}</div>
        `
      : html`
          <div class="page-not-found-container">
            <h2>${this.localize('error:error404')}</h2>
            <h3>${this.localize('interface:pageNotFound')}</h3>
          </div>
        `;
  }

  createRenderRoot() {
    return this;
  }

  _changeRoute(location) {
    const [route, params] = this.router.match(location.pathname);
    if (params.categoryId) {
      params.categoryId = params?.categoryId.toLowerCase();
    }
    if (params.langIsoCode) {
      params.langIsoCode = params?.langIsoCode.toLowerCase();
    }
    if (params.authorUid) {
      params.authorUid = params?.authorUid.toLowerCase();
    }
    if (params.suttaId) {
      params.suttaId = params?.suttaId.toLowerCase();
    }
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
    const description = this.localize('interface:metaDescriptionText');
    const pageName = this.tryLocalize(
      `interface:${this.currentRoute.name || 'NOT-FOUND'}`,
      this.currentRoute.name
    );
    dispatchCustomEvent(document, 'metadata', {
      pageTitle: `SuttaCentral—${pageName.toLowerCase()}`,
      title: `SuttaCentral—${pageName.toLowerCase()}`,
      description,
    });

    dispatchCustomEvent(document, 'keyword-metadata', {
      keywords: this.localize('interface:metaKeywords'),
    });
  }

  _setVisibleToolbar() {
    this.shouldShowSecondToolbar = ['subjects', 'similes', 'names', 'terminology'].includes(
      this.currentRoute.name
    );
    this.shouldShowTipitakaToolbar = ['discourses', 'vinaya', 'abhidhamma'].includes(
      this.currentRoute.name
    );
    this.shouldShowAcademicToolbar = ['numbering', 'abbreviations', 'methodology'].includes(
      this.currentRoute.name
    );
    this.shouldShowOrganizationalToolbar = ['acknowledgments', 'licensing', 'about'].includes(
      this.currentRoute.name
    );
    this.shouldShowGuidesToolbar = [
      'generalGuideSujato',
      'dnGuideSujato',
      'mnGuideSujato',
      'snGuideSujato',
      'anGuideSujato',
      'anIntroductionBodhi',
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
      case 'search':
        this.actions.changeToolbarTitle(this.localize('interface:searchResults'));
        break;
      case 'define':
        this.actions.changeToolbarTitle(this.localize('interface:dictionaryResults'));
        break;
      case 'home':
        this.actions.changeToolbarTitle('SuttaCentral');
        break;
      case 'navigation':
        return;
      case 'suttaplex':
        return;
      case 'sutta':
        return;
      default:
        const key = `interface:${this.currentRoute.name}Title`;
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
      const pageName = this.currentRoute.name;
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
    this.actions.changeDisplayToolButtonState(this.currentRoute.name === 'sutta');
    this.actions.changeDisplayInfoButtonState(this.currentRoute.name === 'sutta');

    const contextToolbar = this.parentNode.querySelector('#context_toolbar');
    const expandClass = 'contextToolbarExpand';
    this.currentRoute.name === 'sutta'
      ? contextToolbar.classList.add(expandClass)
      : contextToolbar.classList.remove(expandClass);

    this.parentNode.querySelector('#static_pages_nav_menu').style.display = [
      'search',
      'navigation',
      'sutta',
      'suttaplex',
    ].includes(this.currentRoute.name)
      ? 'none'
      : 'block';

    this._setViewModeButtonDisplayState();
    this._setActionItemsDisplayState();
    this._setTitleState();
  }

  _setTitleState() {
    if (this.currentRoute.name === 'home') {
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
      scActionItems.style.display = this.currentRoute.name === 'home' ? 'none' : 'flex';
    }
  }

  _setViewModeButtonDisplayState() {
    this.actions.changeDisplayViewModeButtonState(
      ['home', 'suttaplex', 'navigation'].includes(this.currentRoute.name)
    );
  }
}

customElements.define('sc-page-selector', SCPageSelector);
