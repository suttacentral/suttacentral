import { css, html, LitElement } from 'lit';
import { LitLocalized } from './addons/localization-mixin';
import RoutingService from '../utils/routingService';
import { store } from '../redux-store';
import { dispatchCustomEvent } from '../utils/customEvent';

// prettier-ignore
const isoCodes = [
  'af', 'ar', 'ca', 'cs', 'lzh', 'de', 'en', 'es', 'fa', 'fr', 'pgd',
  'he', 'id', 'it', 'la', 'hu', 'nl', 'no', 'ot', 'pli', 'pl', 'pt',
  'pra', 'ro', 'san', 'sr', 'fi', 'sv', 'xct', 'xto', 'vn', 'uig',
  'ru', 'mr', 'hi', 'ta', 'si', 'th', 'my', 'kho', 'ko', 'jp', 'zh',
  'bo', 'pi', 'ug', 'gr', 'pr', 'skt', 'sl'
]

// prettier-ignore
const routes = {
  'HOME': {
    path: '/',
    content: html`<home-page />`,
    loader: () => import('./static/home-page.js'),
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
    content: html`<sc-navigation />`,
    loader: () => import('./navigation/sc-navigation.js'),
  },
  'ABBREVIATIONS': {
    path: '/abbreviations',
    content: html`<sc-abbreviations-page />`,
    loader: () => import('./static/abbreviations-page.js'),
  },
  'ABHIDHAMMA': {
    path: '/abhidhamma',
    content: html`<sc-abhidhamma />`,
    loader: () => import('./static/abhidhamma-page.js')
  },
  'ABOUT': {
    path: '/about',
    content: html`<sc-about-page />`,
    loader: () => import('./static/about-page.js'),
  },
  'ACKNOWLEDGMENTS': {
    path: '/acknowledgments',
    content: html`<sc-acknowledgments-page />`,
    loader: () => import('./static/acknowledgments-page.js'),
  },
  'A-NEW-BEGINNING': {
    path: '/a-new-beginning',
    content: html`<sc-a-new-beginning />`,
    loader: () => import('./static/a-new-beginning-page.js')
  },
  'AN-GUIDE-SUJATO': {
    path: '/an-guide-sujato',
    content: html`<sc-an-guide />`,
    loader: () => import('./static/an-guide-sujato-page.js')
  },
  'AN-INTRODUCTION-BODHI': {
    path: '/an-introduction-bodhi',
    content: html`<sc-an-introduction />`,
    loader: () => import('./static/an-introduction-bodhi-page.js')
  },
  'DISCOURSES': {
    path: '/discourses',
    content: html`<sc-discourses />`,
    loader: () => import('./static/discourses-page.js')
  },
  'DN-GUIDE-SUJATO': {
    path: '/dn-guide-sujato',
    content: html`<sc-dn-guide />`,
    loader: () => import('./static/dn-guide-sujato-page.js')
  },
  'DONATE-NOW': {
    path: '/donate-now',
    content: html`<sc-donate-now-page />`,
    loader: () => import('./static/donate-now-page.js'),
  },
  'DONATIONS': {
    path: '/donations',
    content: html`<sc-donations-page />`,
    loader: () => import('./static/donations-page.js'),
  },
  'DONATION-SUCCESS': {
    path: '/donation-success',
    content: html`<sc-donation-success-page />`,
    loader: () => import('./static/donation-success-page.js')
  },
  'DOWNLOADS': {
    path: '/downloads',
    content: html`<sc-downloads-page />`,
    loader: () => import('./static/downloads-page.js'),
  },
  'GENERAL-GUIDE-SUJATO': {
    path: '/general-guide-sujato',
    content: html`<sc-general-guide />`,
    loader: () => import('./static/general-guide-sujato-page.js')
  },
  'INTRODUCTION': {
    path: '/introduction',
    content: html`<sc-introduction />`,
    loader: () => import('./static/introduction-page.js'),
  },
  'LANGUAGES': {
    path: '/languages',
    content: html`<sc-languages-page />`,
    loader: () => import('./static/languages-page.js')
  },
  'LICENSING': {
    path: '/licensing',
    content: html`<sc-licensing-page />`,
    loader: () => import('./static/licensing-page.js'),
  },
  'METHODOLOGY': {
    path: '/methodology',
    content: html`<sc-methodology-page />`,
    loader: () => import('./static/methodology-page.js'),
  },
  'MN-GUIDE-SUJATO': {
    path: '/mn-guide-sujato',
    content: html`<sc-mn-guide />`,
    loader: () => import('./static/mn-guide-sujato-page.js')
  },
  'NAMES': {
    path: '/names',
    content: html`<sc-names-page />`,
    loader: () => import('./static/names-page.js')
  },
  'NUMBERING': {
    path: '/numbering',
    content: html`<sc-numbering-page />`,
    loader: () => import('./static/numbering-page.js'),
  },
  'OFFLINE': {
    path: '/offline',
    content: html`<sc-offline-page />`,
    loader: () => import('./static/offline-page.js'),
  },
  'SIMILES': {
    path: '/similes',
    content: html`<sc-similes-page />`,
    loader: () => import('./static/similes-page.js')
  },
  'SN-GUIDE-SUJATO': {
    path: '/sn-guide-sujato',
    content: html`<sc-sn-guide />`,
    loader: () => import('./static/sn-guide-sujato-page.js')
  },
  'START': {
    path: '/start',
    content: html`<sc-start />`,
    loader: () => import('./static/start-page.js'),
  },
  'SUBJECTS': {
    path: '/subjects',
    content: html`<sc-subjects-page />`,
    loader: () => import('./static/subjects-page.js')
  },
  'TERMINOLOGY': {
    path: '/terminology',
    content: html`<sc-terminology-page />`,
    loader: () => import('./static/terminology-page.js'),
  },
  'VINAYA': {
    path: '/vinaya',
    content: html`<sc-vinaya />`,
    loader: () => import('./static/vinaya-page.js')
  },
  'SUTTA': {
    /* TODO: Maybe we don't need iso codes checked here? */
    path: `/:suttaId/:langIsoCode(${isoCodes.join('|')})/:authorUid`,
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
      setCurrentNavPosition(position) {
        store.dispatch({
          type: 'CHANGE_CURRENT_NAV_POSITION_STATE',
          currentNavPosition: position,
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
          title: title,
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

  updated() {
    this._createMetaData();
    this._updateNav();
    this._changeToolbarTitle();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._stopListening();
  }

  _stateChanged(state) {
    super._stateChanged(state);
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
          <div class="container">${this.routeDefinition.content}</div>
        `
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
    let parts = this.router.location.pathname.split('/');
    let partsNewIsoCode = parts.map(x => x.replace('pi-', 'pli-').replace('skt-', 'san-'));
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
      toastType: toastType,
      message: text,
    });
  }

  _createMetaData() {
    const description = this.localize('metaDescriptionText');
    const pageName = this.localize(`${this.currentRoute.name || 'NOT-FOUND'}`);
    dispatchCustomEvent(document, 'metadata', {
      pageTitle: `SuttaCentral—${pageName.toLowerCase()}`,
      title: `SuttaCentral—${pageName.toLowerCase()}`,
      description: description,
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
    const navArray = store.getState().navigationArray;
    const currentPath = this.currentRoute.path;
    navArray.length = 1;
    const pageName = this.localize(`${this.currentRoute.name}`);
    if (currentPath !== '/' && (!navArray[1] || navArray[1].type !== 'staticPage')) {
      navArray.push({
        title: pageName,
        url: currentPath,
        type: 'staticPage',
      });
      this.actions.setNavigation(navArray);
      this.actions.setCurrentNavPosition(1);
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
    this.parentNode.querySelector('#action_items').style.display =
      this.currentRoute.name === 'HOME' ? 'none' : 'flex';
  }

  _setViewModeButtonDisplayState() {
    this.actions.changeDisplayViewModeButtonState(
      ['HOME', 'SUTTAPLEX', 'NAVIGATION'].includes(this.currentRoute.name)
    );
  }
}

customElements.define('sc-page-selector', SCPageSelector);
