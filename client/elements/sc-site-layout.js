import { LitElement, html, css } from 'lit';

import { BrowserMicroSentryClient } from '@micro-sentry/browser';

import { throttle } from 'throttle-debounce';
import { icon } from '../img/sc-icon';

import './sc-page-selector';
import './navigation/sc-navigation-linden-leaves';
import './addons/sc-linear-progress';

import { LitLocalized } from './addons/sc-localization-mixin';
import { store } from '../redux-store';

import { SCSiteLayoutStyles } from './styles/sc-site-layout-styles';
import { SCUtilityStyles } from './styles/sc-utility-styles';
import { SCFontStyles } from './styles/sc-font-styles';
import { SCColors } from './styles/sc-colors';

const microSentryClient = new BrowserMicroSentryClient({
  dsn: 'https://c7d8c1d86423434b8965874d954ba735@sentry.io/358981',
});

class SCSiteLayout extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${SCSiteLayoutStyles}
    `;
  }

  render() {
    return html`
      <div id="universal_toolbar">
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
        <sc-linear-progress .active="${this.linearProgressActive}"></sc-linear-progress>

        <div id="static_pages_nav_menu">
          <nav>
            <ul>
              ${this.toolbarSelectedTemplate} ${this.shouldShowSecondToolbarTemplate}
              ${this.shouldShowTipitakaToolbarTemplate} ${this.shouldShowAcademicToolbarTemplate}
              ${this.shouldShowOrganizationalToolbarTemplate}
              ${this.shouldShowGuidesToolbarTemplate}
            </ul>
          </nav>
        </div>
      </div>

      <sc-page-selector id="page_selector"></sc-page-selector>
    `;
  }

  get toolbarSelectedTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState &&
      this.staticPagesToolbarDisplayState.displayFirstToolbar
        ? html`
            <li>
              <a href="/introduction">${this.localize('interface:introduction')}</a>
            </li>
            <li>
              <a href="/donations">${this.localize('interface:donations')}</a>
            </li>
            <li>
              <a href="/offline">${this.localize('interface:useOffline')}</a>
            </li>
            <li>
              <a
                href="https://discourse.suttacentral.net/c/meta/updates"
                class="external"
                title="See updates on SuttaCentral forum"
                target="_blank"
                rel="noopener"
              >
                ${this.localize('interface:whatsnew')}
              </a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowSecondToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState &&
      this.staticPagesToolbarDisplayState.displaySecondToolbar
        ? html`
            <li>
              <a href="/subjects">${this.localize('interface:subjects')}</a>
            </li>
            <li>
              <a href="/similes">${this.localize('interface:similes')}</a>
            </li>
            <li>
              <a href="/names">${this.localize('interface:names')}</a>
            </li>
            <li>
              <a href="/terminology">${this.localize('interface:terminology')}</a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowTipitakaToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState &&
      this.staticPagesToolbarDisplayState.displayTipitakaToolbar
        ? html`
            <li>
              <a href="/discourses-guide-sujato">${this.localize('interface:discourses')}</a>
            </li>
            <li>
              <a href="/vinaya-guide-brahmali">${this.localize('interface:vinaya')}</a>
            </li>
            <li>
              <a href="/abhidhamma-guide-sujato">${this.localize('interface:abhidhamma')}</a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowAcademicToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState &&
      this.staticPagesToolbarDisplayState.displayAcademicToolbar
        ? html`
            <li>
              <a href="/numbering">${this.localize('interface:numbering')}</a>
            </li>
            <li>
              <a href="/abbreviations">${this.localize('interface:abbreviations')}</a>
            </li>
            <li>
              <a href="/methodology">${this.localize('interface:methodology')}</a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowOrganizationalToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState &&
      this.staticPagesToolbarDisplayState.displayOrganizationalToolbar
        ? html`
            <li>
              <a href="/acknowledgments">${this.localize('interface:acknowledgments')}</a>
            </li>
            <li>
              <a href="/licensing">${this.localize('interface:licensing')}</a>
            </li>
            <li>
              <a href="/about">${this.localize('interface:about')}</a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowGuidesToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState &&
      this.staticPagesToolbarDisplayState.displayGuidesToolbar
        ? html`
            <li>
              <a href="/general-guide-sujato">${this.localize('interface:general')}</a>
            </li>
            <li>
              <a href="/dn-guide-sujato">${this.localize('interface:long')}</a>
            </li>
            <li>
              <a href="/mn-guide-sujato">${this.localize('interface:middle')}</a>
            </li>
            <li>
              <a href="/sn-guide-sujato">${this.localize('interface:linked')}</a>
            </li>
            <li>
              <a href="/an-guide-sujato">${this.localize('interface:numbered')}</a>
            </li>
          `
        : ''}
    `;
  }

  _removeSelectedClass() {
    this.shadowRoot.querySelectorAll('.staticPageSelected').forEach(e => {
      e.classList.remove('staticPageSelected');
    });
  }

  _addSelectedClass(e) {
    e.classList.add('staticPageSelected');
  }

  _addStaticPageLinkEventListener() {
    this.shadowRoot.querySelectorAll('#static_pages_nav_menu nav li a').forEach(element => {
      element.addEventListener('click', e => {
        this._removeSelectedClass();
        this._addSelectedClass(element);
      });
    });
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
      staticPagesToolbarDisplayState: { type: Object },
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
    this.staticPagesToolbarDisplayState = state.staticPagesToolbarDisplayState;
    if (!this.staticPagesToolbarDisplayState) {
      this.staticPagesToolbarDisplayState = {
        displayFirstToolbar: true,
        displaySecondToolbar: false,
        displayTipitakaToolbar: false,
        displayAcademicToolbar: false,
        displayOrganizationalToolbar: false,
        displayGuidesToolbar: false,
      };
    }
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
      setStaticPagesToolbarDisplayState(toolbarDisplayState) {
        store.dispatch({
          type: 'CHANGE_STATIC_PAGES_TOOLBAR_DISPLAY_STATE',
          staticPagesToolbarDisplayState: toolbarDisplayState,
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
    if (this.staticPagesToolbarDisplayState !== state.staticPagesToolbarDisplayState) {
      this.staticPagesToolbarDisplayState = state.staticPagesToolbarDisplayState;
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
    this._createGlobalStylesheet(SCColors);
    this._calculateScrollbarWidth();
  }

  _calculateScrollbarWidth() {
    const setScrollbarWidth = () =>
      document.body.style.setProperty(
        '--scrollbar-width',
        window.innerWidth - document.documentElement.clientWidth + 'px'
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

    this.addEventListener('hide-sc-top-sheet', e => {
      this.shadowRoot.querySelector('#setting_menu')?.hide();
      this.actions.changeDisplaySettingMenuState(false);
    });

    this.addEventListener('show-sc-top-sheet', e => {
      this.shadowRoot.querySelector('#setting_menu')?.show();
    });

    this.addEventListener('hide-sc-sutta-parallels', e => {
      this.shadowRoot.querySelector('#sutta_parallels')?.hide();
      this.actions.changeDisplaySuttaParallelsState(false);
    });

    this.addEventListener('show-sc-sutta-parallels', e => {
      this.shadowRoot.querySelector('#sutta_parallels')?.show();
    });

    this.addEventListener('bind-data-to-sc-sutta-parallels', e => {
      this.shadowRoot.querySelector('#sutta_parallels').suttaplexItem = e.detail.suttaplexItem;
    });

    this.addEventListener('hide-sc-sutta-toc', e => {
      this.shadowRoot.querySelector('#sutta_toc')?.hide();
      this.actions.changeDisplaySuttaToCState(false);
    });

    this.addEventListener('show-sc-sutta-toc', e => {
      this.shadowRoot.querySelector('#sutta_toc')?.show();
    });

    this.addEventListener('show-sc-sutta-info', e => {
      if (e.detail.isSegmentedText) {
        this.shadowRoot.querySelector('#bilara-sutta-info')?.show();
      } else {
        this.shadowRoot.querySelector('#sutta-info')?.show();
      }
    });

    this.addEventListener('hide-sc-sutta-info', e => {
      this.shadowRoot.querySelector('#sutta-info')?.hide();
      const pubInfo = this.shadowRoot.querySelector('#bilara-sutta-info');
      if (pubInfo && pubInfo.hide) {
        pubInfo.hide();
      }
      this.actions.changeDisplaySuttaInfoState(false);
    });
    const rootDOM = this.shadowRoot;
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
        const { displaySettingMenu, displaySuttaParallels, displaySuttaToC, displaySuttaInfo } = store.getState();
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
            rootDOM.getElementById(
              'universal_toolbar'
            ).style.transform = `translateY(-${universalToolbarHeight}px)`;
          }
          lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
        }
      })
    );

    window.addEventListener('resize', () => {
      rootDOM.getElementById('universal_toolbar').style.transition = '';
      rootDOM.getElementById('breadCrumb').style.transition = '';
      rootDOM.getElementById('mainTitle').style.transition = '';
      rootDOM.getElementById('subTitle').style.transition = '';
    });

    this._initNavigation();
    this._initStaticPagesToolbarDisplayState();
    this._addStaticPageLinkEventListener();
    this._setStaticPageMenuItemSelected();
    this._setToolbarPosition();

    window.addEventListener('error', e => {
      microSentryClient.report(e);
    });
  }

  _setUniversalToolbarTransformStyles() {
    const transitionStyle = 'transform 200ms ease-in-out';
    this.shadowRoot.getElementById('universal_toolbar').style.transition = transitionStyle;
    this.shadowRoot.getElementById('breadCrumb').style.transition = transitionStyle;
    this.shadowRoot.getElementById('mainTitle').style.transition = transitionStyle;
    this.shadowRoot.getElementById('subTitle').style.transition = 'transform 300ms ease-in-out';
  }

  _universalToolbarTransform() {
    this.shadowRoot.getElementById('universal_toolbar').style.transform = 'translateY(-120px)';
    this.shadowRoot.getElementById('breadCrumb').style.transform = 'translateY(120px)';
    this.shadowRoot.getElementById('mainTitle').style.transform = 'translateY(74px) scale(0.667)';
    this.shadowRoot.getElementById('subTitle').style.opacity = '0';
    this.shadowRoot.getElementById('subTitle').style.transform = 'scale(0)';
    if (window.innerWidth < 480) {
      this.shadowRoot.getElementById('mainTitle').style.transform = 'translateY(70px) scale(0.667)';
    }
  }

  _resetUniversalToolbar() {
    this.shadowRoot.getElementById('universal_toolbar').style.transform = 'none';
    this.shadowRoot.getElementById('breadCrumb').style.transform = 'none';
    this.shadowRoot.getElementById('mainTitle').style.transform = 'scale(1)';
    this.shadowRoot.getElementById('subTitle').style.opacity = '1';
    this.shadowRoot.getElementById('subTitle').style.transform = 'scale(1)';
  }

  _setStaticPageMenuItemSelected() {
    this._removeSelectedClass();
    const element = this.shadowRoot.querySelector(`nav a[href="${this.changedRoute.path}"]`);
    if (element) {
      element.classList.add('staticPageSelected');
    }
  }

  _initNavigation() {
    this.navArray = store.getState().navigationArray;
    if (!this.navArray) {
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

  _initStaticPagesToolbarDisplayState() {
    this.actions.setStaticPagesToolbarDisplayState({
      displayFirstToolbar: true,
      displaySecondToolbar: false,
      displayTipitakaToolbar: false,
      displayAcademicToolbar: false,
      displayOrganizationalToolbar: false,
      displayGuidesToolbar: false,
    });
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
      this._setStaticPageMenuItemSelected();
    }
    if (changedProps.has('staticPagesToolbarDisplayState')) {
      this._addStaticPageLinkEventListener();
      this._setStaticPageMenuItemSelected();
    }
    if (changedProps.has('toolbarPosition')) {
      this._setToolbarPosition();
    }
  }

  _routeChanged() {
    this.shadowRoot.querySelector('#sutta-info')?.hide();
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
    const universalToolbar = this.shadowRoot.querySelector('#universal_toolbar');
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
}

customElements.define('sc-site-layout', SCSiteLayout);
