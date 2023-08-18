import { LitElement, html } from 'lit';
import { BrowserMicroSentryClient } from '@micro-sentry/browser';

import { icon } from '../img/sc-icon';
import './sc-page-selector';
import './navigation/sc-navigation-linden-leaves';
import './addons/sc-linear-progress';
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

const microSentryClient = new BrowserMicroSentryClient({
  dsn: 'https://c7d8c1d86423434b8965874d954ba735@sentry.io/358981',
});

export class SCSiteLayout extends LitLocalized(LitElement) {
  static properties = {
    inputLanguage: { type: String },
    infoDialogMetaArea: { type: String },
    item: { type: Object },
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
    const state = store.getState();
    this.inputLanguage = '';
    this.infoDialogMetaArea = state.suttaMetaText;
    this.item = {};
    this.colorsResponse = {};
    this.siteLanguage = state.siteLanguage;
    this.appColorTheme = state.colorTheme;
    this.localizedStringsPath = '/localization/elements/interface';
    this.changedRoute = state.currentRoute;
    this.displaySettingMenu = state.displaySettingMenu;
    this.toolbarTitle = state.toolbarOptions.title;
    this.shouldShowFirstToolbar = true;
    this.linearProgressActive = false;
    this.toolbarPosition = state.toolbarPosition;
    this.pageLoaded = false;
    if (this.getUrlLangParam !== store.getState().siteLanguage) {
      this.changeSiteLanguage(this.getUrlLangParam);
    }
  }

  async changeSiteLanguage(lang) {
    await this._fetchLanguageList();
    if (!this.languageListResponse || this.languageListResponse.length === 0) {
      return;
    }
    try {
      const chosenLanguage = this.languageListResponse.find(x => x.iso_code === lang);
      if (chosenLanguage) {
        reduxActions.changeLanguage(chosenLanguage.iso_code, chosenLanguage.name);
      }
    } catch (e) {
      console.error(e);
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
              <span>${this.toolbarTitle}</span>
            </div>
            <div id="subTitle">${this.localize('interface:pageSubtitle')}</div>
          </div>
        </div>

        <sc-linear-progress .active=${this.linearProgressActive}></sc-linear-progress>
        <sc-menu-static-pages-nav id="static_pages_nav_menu"></sc-menu-static-pages-nav>
      </div>

      <sc-page-selector id="page_selector"></sc-page-selector>
      <sc-site-footer id="site_footer"></sc-site-footer>
    `;
  }

  firstUpdated() {
    this._colorThemeChanged();
    this.removeAttribute('unresolved');

    ['load', 'online', 'offline'].forEach(eventName => {
      window.addEventListener(eventName, () => {
        this.actions.setOnlineStatus(navigator.onLine);
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
          document.getElementById('universal_toolbar').style.transition =
            'transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms, opacity 0ms ease 300ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';
          universalToolbarEl.style.transform = `translateY(0)`;
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

    this._initNavigation();
    this._setToolbarPosition();

    window.addEventListener('error', e => {
      microSentryClient.report(e);
    });

    document.addEventListener('click', () => {
      document
        .querySelector('sc-navigation-linden-leaves')
        .shadowRoot.querySelector('sc-action-items-universal')
        .shadowRoot.querySelector('sc-auto-complete-list').style.display = 'none';
    });
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('appColorTheme')) {
      this._colorThemeChanged();
    }
    if (changedProps.has('changedRoute')) {
      this._routeChanged();
    }
    if (changedProps.has('toolbarPosition')) {
      this._setToolbarPosition();
    }
  }

  get actions() {
    return {
      setOnlineStatus(isOnline) {
        store.dispatch({
          type: 'SET_ONLINE_STATUS',
          isOnline,
        });
      },
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display,
        });
      },
      setNavigation(navArray) {
        store.dispatch({
          type: 'SET_NAVIGATION',
          navigationArray: navArray,
        });
      },
      changeDisplaySuttaParallelsState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SUTTA_PARALLELS_STATE',
          displaySuttaParallels: displayState,
        });
      },
      changeDisplaySuttaToCState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SUTTA_TOC_STATE',
          displaySuttaToC: displayState,
        });
      },
      changeDisplaySuttaInfoState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SUTTA_INFO_STATE',
          displaySuttaInfo: displayState,
        });
      },
    };
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.displaySettingMenu !== state.displaySettingMenu) {
      this.displaySettingMenu = state.displaySettingMenu;
    }
    if (this.displayToolButton !== state.displayToolButton) {
      this.displayToolButton = state.displayToolButton;
    }
    if (this.infoDialogMetaArea !== state.suttaMetaText) {
      this.infoDialogMetaArea = state.suttaMetaText;
    }
    if (this.toolbarTitle !== state.toolbarOptions.title) {
      this.toolbarTitle = state.toolbarOptions.title;
    }
    if (this.appColorTheme !== state.colorTheme) {
      this.appColorTheme = state.colorTheme;
    }
    if (this.changedRoute !== state.currentRoute) {
      this.changedRoute = state.currentRoute;
      this._updateUrlParams();
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
    const transitionStyle = 'transform 300ms cubic-bezier(0.4, 0, 0.6, 1) 0ms';
    document.getElementById('universal_toolbar').style.transition = transitionStyle;
    document.getElementById('breadCrumb').style.transition = transitionStyle;
    document.getElementById('mainTitle').style.transition = transitionStyle;
    document.getElementById('subTitle').style.transition = transitionStyle;
  }

  _universalToolbarTransform() {
    document.getElementById('universal_toolbar').style.transform = 'translateY(-120px) ';
    document.getElementById('universal_toolbar').style.boxShadow = 'var(--sc-shadow-elevation-16dp)';
    document.getElementById('breadCrumb').style.transform = 'translateY(120px)';
    document.getElementById('mainTitle').style.transform = 'translateY(74px) scale(0.667)';
    document.getElementById('subTitle').style.opacity = '0';
    document.getElementById('subTitle').style.transform = 'scale(0)';
    if (window.innerWidth < 480) {
      document.getElementById('mainTitle').style.transform = 'translateY(70px) scale(0.667)';
    }
  }

  _resetUniversalToolbar() {
    document.getElementById('universal_toolbar').style.transform = 'none';
    document.getElementById('universal_toolbar').style.boxShadow = 'none';
    document.getElementById('breadCrumb').style.transform = 'none';
    document.getElementById('mainTitle').style.transform = 'scale(1)';
    document.getElementById('subTitle').style.opacity = '1';
    document.getElementById('subTitle').style.transform = 'scale(1)';
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
      this.actions.setNavigation(this.navArray);
    }
  }

  _routeChanged() {
    this.querySelector('#sutta-info')?.hide?.();
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
    // main_menu_root is defined in index.html
    if (this.isSupportedLanguage(this.siteLanguage)) {
      document.getElementById('main_html_root').lang = this.siteLanguage;
    } else {
      document.getElementById('main_html_root').lang = this.fallbackLanguage();
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
}

customElements.define('sc-site-layout', SCSiteLayout);
