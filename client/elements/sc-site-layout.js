import { LitElement, html } from 'lit';

import { BrowserMicroSentryClient } from '@micro-sentry/browser';

import { throttle } from 'throttle-debounce';
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

const microSentryClient = new BrowserMicroSentryClient({
  dsn: 'https://c7d8c1d86423434b8965874d954ba735@sentry.io/358981',
});

class SCSiteLayout extends LitLocalized(LitElement) {
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

  static get properties() {
    return {
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
  }

  constructor() {
    super();
    const state = store.getState();
    this.inputLanguage = '';
    this.infoDialogMetaArea = state.suttaMetaText;
    this.item = {};
    this.colorsResponse = {};
    this.siteLanguage = state.siteLanguage;
    this.appColorTheme = state.colorTheme;
    this._colorThemeChanged();
    this.localizedStringsPath = '/localization/elements/interface';
    this.changedRoute = state.currentRoute;
    this.displaySettingMenu = state.displaySettingMenu;
    this.toolbarTitle = state.toolbarOptions.title;
    this.shouldShowFirstToolbar = true;
    this.linearProgressActive = false;
    this.toolbarPosition = state.toolbarPosition;
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
    }
    if (this.linearProgressActive !== state.linearProgressActive) {
      this.linearProgressActive = state.linearProgressActive;
    }
    if (this.toolbarPosition !== state.toolbarOptions) {
      this.toolbarPosition = state.toolbarPosition;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._createGlobalStylesheet(SCUtilityStyles);
    this._createGlobalStylesheet(SCFontStyles);
    this._calculateScrollbarWidth();
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

  firstUpdated() {
    this.removeAttribute('unresolved');

    ['load', 'online', 'offline'].forEach(eventName => {
      window.addEventListener(eventName, () => {
        this.actions.setOnlineStatus(navigator.onLine);
      });
    });

    this.addEventListener('hide-sc-top-sheet', () => {
      this.querySelector('#setting_menu')?.hide();
      this.actions.changeDisplaySettingMenuState(false);
    });

    this.addEventListener('show-sc-top-sheet', () => {
      this.querySelector('#setting_menu')?.show();
    });

    this.addEventListener('hide-sc-sutta-parallels', () => {
      this.querySelector('#sutta_parallels')?.hide();
      this.actions.changeDisplaySuttaParallelsState(false);
    });

    this.addEventListener('show-sc-sutta-parallels', () => {
      this.querySelector('#sutta_parallels')?.show();
    });

    this.addEventListener('bind-data-to-sc-sutta-parallels', e => {
      this.querySelector('#sutta_parallels').suttaplexItem = e.detail.suttaplexItem;
    });

    this.addEventListener('hide-sc-sutta-toc', () => {
      this.querySelector('#sutta_toc')?.hide();
      this.actions.changeDisplaySuttaToCState(false);
    });

    this.addEventListener('show-sc-sutta-toc', () => {
      this.querySelector('#sutta_toc')?.show();
    });

    this.addEventListener('show-sc-sutta-info', e => {
      if (e.detail.isSegmentedText) {
        this.querySelector('#bilara-sutta-info')?.show();
      } else {
        this.querySelector('#sutta-info')?.show();
      }
    });

    this.addEventListener('hide-sc-sutta-info', () => {
      this.querySelector('#sutta-info')?.hide();
      const pubInfo = this.querySelector('#bilara-sutta-info');
      if (pubInfo && pubInfo.hide) {
        pubInfo.hide();
      }
      this.actions.changeDisplaySuttaInfoState(false);
    });

    let scrollDistance = 0;
    document.addEventListener(
      'scroll',
      throttle(500, () => {
        if (!this.toolbarPosition.scrollForToolbar) {
          return;
        }
        const syntheticEvent = new WheelEvent('syntheticWheel', { deltaY: 4, deltaMode: 0 });
        scrollDistance += syntheticEvent.deltaY;
        if (this.changedRoute.path !== '/' && scrollDistance !== 20) {
          return;
        }
        scrollDistance = 0;
        this._setUniversalToolbarTransformStyles();

        if (
          this.changedRoute.path === '/' &&
          (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
        ) {
          this._universalToolbarTransform();
        } else {
          this._resetUniversalToolbar();
        }
      })
    );

    let lastScrollTop = 0;
    document.addEventListener(
      'scroll',
      throttle(500, () => {
        if (!this.toolbarPosition.scrollForToolbar) {
          return;
        }
        const { alwaysShowUniversalToolbar } = store.getState();
        if (alwaysShowUniversalToolbar) {
          return;
        }
        const { displaySettingMenu, displaySuttaParallels, displaySuttaToC, displaySuttaInfo } =
          store.getState();
        if (
          this.changedRoute.path !== '/' &&
          !displaySettingMenu &&
          !displaySuttaParallels &&
          !displaySuttaInfo &&
          !displaySuttaToC
        ) {
          const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if (currentScrollTop > lastScrollTop) {
            const universalToolbarHeight = 156;
            document.getElementById(
              'universal_toolbar'
            ).style.transform = `translateY(-${universalToolbarHeight}px)`;
          }
          if (currentScrollTop < 10) {
            this._resetUniversalToolbar();
          }
          lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
        }
      })
    );

    window.addEventListener('resize', () => {
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
  }

  _setUniversalToolbarTransformStyles() {
    const transitionStyle = 'transform 200ms ease-in-out';
    document.getElementById('universal_toolbar').style.transition = transitionStyle;
    document.getElementById('breadCrumb').style.transition = transitionStyle;
    document.getElementById('mainTitle').style.transition = transitionStyle;
    document.getElementById('subTitle').style.transition = 'transform 300ms ease-in-out';
  }

  _universalToolbarTransform() {
    document.getElementById('universal_toolbar').style.transform = 'translateY(-120px)';
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

  updated(changedProps) {
    if (changedProps.has('siteLanguage')) {
      this._setSiteLanguage();
    }
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

  _routeChanged() {
    this.querySelector('#sutta-info')?.hide();
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
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.colorsResponse) {
      if (!this.colorsResponse.hasOwnProperty(key)) continue;
      document.body.style.setProperty(key, this.colorsResponse[key]);
    }
  }

  _setSiteLanguage() {
    // main_menu_root is defined in index.html
    document.getElementById('main_html_root').lang = this.siteLanguage;
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
