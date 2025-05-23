import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BrowserMicroSentryClient } from '@micro-sentry/browser';

import { icon } from '../img/sc-icon';
import './sc-page-selector';
import './navigation/sc-navigation-linden-leaves';
import './addons/sc-progress';
import './addons/sc-site-footer';
import './menus/sc-menu-static-pages-nav';
import { LitLocalized } from './addons/sc-localization-mixin';
import { store } from '../redux-store';

import { SCSiteLayoutStyles } from './styles/sc-site-layout-styles';
import { SCUtilityStyles } from './styles/sc-utility-styles';
import { SCFontStyles } from './styles/sc-font-styles';
import rafThrottle from '../utils/rafThrottle';
import { getURLParam } from './addons/sc-functions-miscellaneous';
import { reduxActions } from './addons/sc-redux-actions';
import { API_ROOT } from '../constants';

import { typographyI18nStyles } from './styles/sc-typography-i18n-styles';

const microSentryClient = new BrowserMicroSentryClient({
  dsn: 'https://c7d8c1d86423434b8965874d954ba735@sentry.io/358981',
});

export class SCSiteLayout extends LitLocalized(LitElement) {
  static properties = {
    inputLanguage: { type: String },
    colorsResponse: { type: Object },
    siteLanguage: { type: String },
    appColorTheme: { type: String },
    localizedStringsPath: { type: String },
    changedRoute: { type: Object },
    displaySettingMenu: { type: Boolean },
    toolbarTitle: { type: String },
    linearProgressActive: { type: Boolean },
    toolbarPosition: { type: Object },
  };

  constructor() {
    super();
    const storeState = store.getState();
    this.inputLanguage = '';
    this.colorsResponse = {};
    this.siteLanguage = storeState.siteLanguage;
    this.appColorTheme = storeState.colorTheme;
    this.localizedStringsPath = '/localization/elements/interface';
    this.changedRoute = storeState.currentRoute;
    this.displaySettingMenu = storeState.displaySettingMenu;
    this.toolbarTitle = storeState.toolbarOptions.title;
    this.shouldShowFirstToolbar = true;
    this.linearProgressActive = false;
    this.toolbarPosition = storeState.toolbarPosition;
    this.pageLoaded = false;
    this.#checkAndChangeSiteLanguage();
  }

  #checkAndChangeSiteLanguage() {
    const { siteLanguage } = store.getState();
    const { getUrlLangParam } = this;
    if (getUrlLangParam !== siteLanguage) {
      reduxActions.changeTemporarySiteLanguage(getUrlLangParam);
    }
  }

  get getUrlLangParam() {
    return getURLParam('lang');
  }

  async _fetchLanguageList() {
    try {
      this.languageListResponse = await (await fetch(`${API_ROOT}/languages?all=true`)).json();
      this.languageListResponse = this.languageListResponse.filter(
        lang => !lang.is_root && lang.localized
      );
    } catch (e) {
      console.error(e);
    }
  }

  _updateUrlParams() {
    if (
      getURLParam('view') ||
      getURLParam('layout') ||
      getURLParam('reference') ||
      getURLParam('query') ||
      window.location.hash
    ) {
      return;
    }
    window.history.replaceState(null, null, `?lang=${store.getState().siteLanguage}`);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${SCSiteLayoutStyles}
        ${typographyI18nStyles}
      </style>

      <div id="universal_toolbar">
        <a class="skip-to-content-link" href="/discourses-guide-sujato">
          Skip to discourses guide
        </a>

        <sc-navigation-linden-leaves id="breadCrumb"></sc-navigation-linden-leaves>

        <div id="context_toolbar">
          <div id="title">
            <div id="mainTitle">
              ${icon.sc_logo}
              <span>${unsafeHTML(this.toolbarTitle)}</span>
            </div>
            <div id="subTitle" lang=${this.language}>${this.localize('interface:pageSubtitle')}</div>
          </div>
        </div>

        <sc-progress .active=${this.linearProgressActive}></sc-progress>
        <sc-menu-static-pages-nav id="static_pages_nav_menu"></sc-menu-static-pages-nav>
      </div>

      <sc-page-selector id="page_selector"></sc-page-selector>
      <sc-site-footer id="site_footer"></sc-site-footer>
    `;
  }

  firstUpdated() {
    this._setSiteLanguage();
    this._colorThemeChanged();
    this.removeAttribute('unresolved');
    this._addEventListeners();
    this._initNavigation();
    this._setToolbarPosition();
  }

  _addEventListeners() {
    ['load', 'online', 'offline'].forEach(eventName => {
      window.addEventListener(eventName, () => {
        reduxActions.setOnlineStatus(navigator.onLine);
      });
    });

    // handles scroll-based universal toolbar animation on home page
    document.addEventListener(
      'scroll',
      rafThrottle(() => {
        if (!this.pageLoaded) {
          return;
        }
        if (!this.toolbarPosition.scrollForToolbar || this.changedRoute.path !== '/') {
          return;
        }
        this._setUniversalToolbarTransformStyles();

        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          this._universalToolbarTransform();
        } else {
          this._resetUniversalToolbar();
        }
      })
    );

    let lastScrollTop = 0;
    // handles scroll-based universal toolbar animation on pages other than the homepage
    document.addEventListener(
      'scroll',
      rafThrottle(() => {
        // if settings specify that scrolling is not the basis for toolbar visibility
        // or if the current route is the home page return
        if (!this.toolbarPosition.scrollForToolbar || this.changedRoute.path === '/') {
          return;
        }
        if (!this.pageLoaded) {
          return;
        }
        const {
          displaySettingMenu,
          displaySuttaParallels,
          displaySuttaToC,
          displaySuttaInfo,
          alwaysShowUniversalToolbar,
        } = store.getState();

        if (displaySettingMenu || displaySuttaParallels || displaySuttaInfo || displaySuttaToC) {
          return;
        }

        if (alwaysShowUniversalToolbar) {
          return;
        }

        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const universalToolbarEl = document.getElementById('universal_toolbar');

        const isScrollingDown = currentScrollTop > lastScrollTop;
        if (isScrollingDown) {
          universalToolbarEl.style.transition =
            'transform 300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, opacity 0s ease 300ms';
          universalToolbarEl.style.transform = `translateY(-100%)`;
        } else if (currentScrollTop < 10) {
          this._resetUniversalToolbar();
        } else {
          universalToolbarEl.style.transition =
            'transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms, opacity 0ms ease 300ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';
          universalToolbarEl.style.transform = `translateY(0)`;
          universalToolbarEl.style.boxShadow = 'var(--sc-shadow-elevation-16dp)';
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
      })
    );

    window.addEventListener('resize', () => {
      if (!this.pageLoaded) {
        return;
      }
      document.getElementById('universal_toolbar').style.transition = '';
      document.getElementById('breadCrumb').style.transition = '';
      document.getElementById('mainTitle').style.transition = '';
      document.getElementById('subTitle').style.transition = '';
    });

    window.addEventListener('error', e => {
      microSentryClient.report(e);
    });

    const pageSelector = document.querySelector('#page_selector');
    const contextToolbar = document.querySelector('#context_toolbar');

    const hideAutoCompleteListAndMenu = () => {
      const autoCompleteList = document
        .querySelector('sc-navigation-linden-leaves')
        .shadowRoot.querySelector('sc-action-items-universal')
        .shadowRoot.querySelector('sc-auto-complete-list');
      autoCompleteList?.hide?.();

      const moreMenu = document
        .querySelector('sc-navigation-linden-leaves')
        .shadowRoot.querySelector('sc-action-items-universal')
        .shadowRoot.querySelector('#more-menu');
      moreMenu?.close?.();

      reduxActions.changeLanguageMenuVisibility(false);
    };

    pageSelector.addEventListener('click', hideAutoCompleteListAndMenu);
    contextToolbar.addEventListener('click', hideAutoCompleteListAndMenu);

    document.addEventListener('keydown', event => {
      if (event.key === '/') {
        document
          .querySelector('sc-navigation-linden-leaves')
          .shadowRoot.querySelector('sc-action-items-universal')
          .openInstantSearchDialog?.();
        event.preventDefault();
      } else if (event.key === 'Escape') {
        document
          .querySelector('sc-navigation-linden-leaves')
          .shadowRoot.querySelector('sc-action-items-universal')
          .shadowRoot.querySelector('sc-auto-complete-list')
          ?.hide?.();
      }
    });
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('appColorTheme')) {
      this._colorThemeChanged();
    }
    if (changedProps.has('changedRoute')) {
      this._routeChanged();
      this._updateUrlParams();
    }
    if (changedProps.has('toolbarPosition')) {
      this._setToolbarPosition();
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.displaySettingMenu !== state.displaySettingMenu) {
      this.displaySettingMenu = state.displaySettingMenu;
    }
    if (this.displayToolButton !== state.displayToolButton) {
      this.displayToolButton = state.displayToolButton;
    }
    if (this.toolbarTitle !== state.toolbarOptions.title) {
      this.toolbarTitle = state.toolbarOptions.title;
    }
    if (this.appColorTheme !== state.colorTheme) {
      this.appColorTheme = state.colorTheme;
    }
    if (this.changedRoute !== state.currentRoute) {
      this.changedRoute = state.currentRoute;
    }
    if (this.linearProgressActive !== state.linearProgressActive) {
      this.linearProgressActive = state.linearProgressActive;
    }
    if (this.toolbarPosition !== state.toolbarOptions) {
      this.toolbarPosition = state.toolbarPosition;
    }
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._setSiteLanguage();
      this._updateUrlParams();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('load', () => {
      this.pageLoaded = true;
      this._createGlobalStylesheet(SCUtilityStyles);
      this._createGlobalStylesheet(SCFontStyles);
      this._calculateScrollbarWidth();
    });
  }

  _calculateScrollbarWidth() {
    const setScrollbarWidth = () =>
      document.body.style.setProperty(
        '--scrollbar-width',
        `${window.innerWidth - document.documentElement.clientWidth}px`
      );

    window.addEventListener('resize', setScrollbarWidth, { passive: true });
    setScrollbarWidth();
  }

  _createGlobalStylesheet(rules) {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(rules));
    document.head.appendChild(style);
  }

  _setUniversalToolbarTransformStyles() {
    const transitionStyle = 'all 300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms';
    const elements = ['universal_toolbar', 'breadCrumb', 'mainTitle', 'subTitle'];

    elements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.transition = transitionStyle;
      }
    });
  }

  _universalToolbarTransform() {
    const universalToolbar = document.getElementById('universal_toolbar');
    const breadCrumb = document.getElementById('breadCrumb');
    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('subTitle');

    if (universalToolbar) {
      universalToolbar.style.transform = 'translateY(-120px)';
      universalToolbar.style.boxShadow = 'var(--sc-shadow-elevation-16dp)';
    }

    if (breadCrumb) {
      breadCrumb.style.transform = 'translateY(120px)';
    }

    if (mainTitle) {
      mainTitle.style.transform = 'translateY(62px) scale(0.8)';
    }

    if (subTitle) {
      subTitle.style.opacity = '0';
      subTitle.style.transform = 'scale(0)';
      subTitle.style.height = '0';
    }
  }

  _resetUniversalToolbar() {
    const universalToolbar = document.getElementById('universal_toolbar');
    const breadCrumb = document.getElementById('breadCrumb');
    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('subTitle');

    if (universalToolbar) {
      universalToolbar.style.transform = 'none';
      universalToolbar.style.boxShadow = 'none';
    }

    if (breadCrumb) {
      breadCrumb.style.transform = 'none';
    }

    if (mainTitle) {
      mainTitle.style.transform = 'scale(1)';
    }

    if (subTitle) {
      subTitle.style.opacity = '1';
      subTitle.style.transform = 'scale(1)';
      subTitle.style.height = '1em';
    }
  }

  _initNavigation() {
    this.navArray = store.getState().navigationArray;
    if (!this.navArray || this.navArray[0].uid !== 'home') {
      this.navArray = [
        {
          uid: 'home',
          title: 'home',
          url: '/',
          type: 'home',
          index: 0,
        },
      ];
      reduxActions.setNavigation(this.navArray);
    }
  }

  _routeChanged() {
    this.querySelector('#sutta-info')?.hide?.();
    reduxActions.changeLinearProgressActiveState(false);
  }

  _colorThemeChanged(newVal, oldVal) {
    if (oldVal === undefined && newVal === 'light') {
      return;
    }
    const colorThemeUrl = `/elements/styles/sc-colors-${this.appColorTheme}.json`;
    fetch(colorThemeUrl)
      .then(r => r.json())
      .then(response => {
        this.colorsResponse = response;
        this._colorsResponseReceived();
      })
      .catch(e => {
        console.error(e);
      });
  }

  _colorsResponseReceived() {
    // set the css color variables:
    for (const key in this.colorsResponse) {
      if (Object.hasOwn(this.colorsResponse, key)) {
        document.body.style.setProperty(key, this.colorsResponse[key]);
      }
    }
  }

  _setSiteLanguage() {
    const mainHtmlRoot = document.getElementById('main_html_root');
    if (mainHtmlRoot) {
      mainHtmlRoot.lang = this.isSupportedLanguage(this.language) ? this.language : this.fallbackLanguage();
    }
  }

  _setToolbarPosition() {
    const universalToolbar = this.querySelector('#universal_toolbar');
    if (!universalToolbar) {
      return;
    }
    if (this.toolbarPosition.toolbarAtTop) {
      this._resetUniversalToolbar();
      universalToolbar.style.position = 'relative';
    } else {
      universalToolbar.style.position = 'sticky';
    }
  }

  hideATB() {
    this.querySelector('#static_pages_nav_menu')?.classList.add('hidden');
  }

  showATB() {
    this.querySelector('#static_pages_nav_menu')?.classList.remove('hidden');
  }

  localizedStringById(localizeId) {
    return this.localize(localizeId);
  }
}

customElements.define('sc-site-layout', SCSiteLayout);
