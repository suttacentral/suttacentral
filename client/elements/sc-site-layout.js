import { LitElement, html, css, svg } from 'lit-element';

import { icon } from '../img/sc-icon';
import { throttle } from 'throttle-debounce';

import './sc-page-selector.js';
import './menus/sc-action-items.js';
import './addons/sc-top-sheet-views.js';
import './addons/sc-top-sheet-parallels';
import './addons/sc-top-sheet-publication-legacy';
import './addons/sc-top-sheet-toc';
import './addons/sc-toasts.js';
import './navigation/sc-linden-leaves.js';

import { LitLocalized } from './addons/localization-mixin';
import { store } from '../redux-store';

import { SCSiteLayoutStyles } from './styles/sc-site-layout-styles.js';

import { SCUtilityStyles } from './styles/sc-utility-styles.js';
import { SCFontStyles } from './styles/sc-font-styles.js';
import { SCColors } from './styles/sc-colors.js';

class SCSiteLayout extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${SCSiteLayoutStyles}
    `;
  }

  render() {
    return html`
      <div id="universal_toolbar">
        <sc-linden-leaves id="breadCrumb"></sc-linden-leaves>

        <div id="context_toolbar">
          <div id="title">
            <div id="mainTitle">
              ${icon.sc_logo}
              <span>${this.toolbarTitle}</span>
            </div>
            <div id="subTitle">${this.localize('pageSubtitle')}</div>
          </div>
          <sc-action-items id="action_items"></sc-action-items>
        </div>

        <sc-top-sheet-views id="setting_menu"></sc-top-sheet-views>
        <sc-top-sheet-parallels id="sutta_parallels"></sc-top-sheet-parallels>
        <sc-top-sheet-toc id="sutta_toc"></sc-top-sheet-toc>
        <sc-top-sheet-publication-legacy id="sutta-info"></sc-top-sheet-publication-legacy>

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
      <sc-toasts></sc-toasts>
    `;
  }

  get toolbarSelectedTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState &&
      this.staticPagesToolbarDisplayState.displayFirstToolbar
        ? html`
            <li>
              <a href="/introduction">${this.localize('INTRODUCTION')}</a>
            </li>
            <li>
              <a href="/donations">${this.localize('DONATIONS')}</a>
            </li>
            <li>
              <a href="/offline">${this.localize('USEOFFLINE')}</a>
            </li>
            <li>
              <a
                href="https://discourse.suttacentral.net/c/meta/updates"
                class="external"
                title="See updates on SuttaCentral forum"
                target="_blank"
                rel="noopener"
              >
                ${this.localize('WHATSNEW')}${icon.external}
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
              <a href="/subjects">${this.localize('SUBJECTS')}</a>
            </li>
            <li>
              <a href="/similes">${this.localize('SIMILES')}</a>
            </li>
            <li>
              <a href="/names">${this.localize('NAMES')}</a>
            </li>
            <li>
              <a href="/terminology">${this.localize('TERMINOLOGY')}</a>
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
              <a href="/discourses">${this.localize('DISCOURSES')}</a>
            </li>
            <li>
              <a href="/vinaya">${this.localize('VINAYA')}</a>
            </li>
            <li>
              <a href="/abhidhamma">${this.localize('ABHIDHAMMA')}</a>
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
              <a href="/numbering">${this.localize('NUMBERING')}</a>
            </li>
            <li>
              <a href="/abbreviations">${this.localize('ABBREVIATIONS')}</a>
            </li>
            <li>
              <a href="/methodology">${this.localize('METHODOLOGY')}</a>
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
              <a href="/acknowledgments">${this.localize('ACKNOWLEDGMENTS')}</a>
            </li>
            <li>
              <a href="/licensing">${this.localize('LICENSING')}</a>
            </li>
            <li>
              <a href="/about">${this.localize('ABOUT')}</a>
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
              <a href="/general-guide-sujato">${this.localize('GENERAL')}</a>
            </li>
            <li>
              <a href="/dn-guide-sujato">${this.localize('LONG')}</a>
            </li>
            <li>
              <a href="/mn-guide-sujato">${this.localize('MIDDLE')}</a>
            </li>
            <li>
              <a href="/sn-guide-sujato">${this.localize('LINKED')}</a>
            </li>
            <li>
              <a href="/an-guide-sujato">${this.localize('NUMBERED')}</a>
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
    };
  }

  constructor() {
    super();
    let state = store.getState();
    this.inputLanguage = '';
    this.infoDialogMetaArea = state.suttaMetaText;
    this.item = {};
    this.colorsResponse = {};
    this.siteLanguage = state.siteLanguage;
    this.appColorTheme = state.colorTheme;
    this._colorThemeChanged();
    this.localizedStringsPath = '/localization/elements/sc-site-layout';
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
    };
  }

  _stateChanged(state) {
    super._stateChanged(state);
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
      this.shadowRoot.querySelector('#setting_menu').hide();
    });

    this.addEventListener('show-sc-top-sheet', e => {
      this.shadowRoot.querySelector('#setting_menu').show();
    });

    this.addEventListener('hide-sc-sutta-parallels', e => {
      this.shadowRoot.querySelector('#sutta_parallels').hide();
    });

    this.addEventListener('show-sc-sutta-parallels', e => {
      this.shadowRoot.querySelector('#sutta_parallels').show();
    });

    this.addEventListener('bind-data-to-sc-sutta-parallels', e => {
      this.shadowRoot.querySelector('#sutta_parallels').suttaplexItem = e.detail.suttaplexItem;
    });

    this.addEventListener('hide-sc-sutta-toc', e => {
      this.shadowRoot.querySelector('#sutta_toc').hide();
    });

    this.addEventListener('show-sc-sutta-toc', e => {
      this.shadowRoot.querySelector('#sutta_toc').show();
    });

    this.addEventListener('show-sc-sutta-info', e => {
      this.shadowRoot.querySelector('#sutta-info').show();
    });

    this.addEventListener('hide-sc-sutta-info', e => {
      this.shadowRoot.querySelector('#sutta-info').hide();
    });
    const rootDOM = this.shadowRoot;
    addEventListener(
      'scroll',
      throttle(500, () => {
        let transitionStyle = 'transform 200ms ease-in-out';
        rootDOM.getElementById('universal_toolbar').style.transition = transitionStyle;
        rootDOM.getElementById('breadCrumb').style.transition = transitionStyle;
        rootDOM.getElementById('mainTitle').style.transition = transitionStyle;
        rootDOM.getElementById('subTitle').style.transition = 'transform 300ms ease-in-out';

        if (
          this.changedRoute.path === '/' &&
          (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
        ) {
          rootDOM.getElementById('universal_toolbar').style.transform = 'translateY(-120px)';
          rootDOM.getElementById('breadCrumb').style.transform = 'translateY(120px)';
          rootDOM.getElementById('mainTitle').style.transform = 'translateY(74px) scale(0.667)';
          rootDOM.getElementById('subTitle').style.opacity = '0';
          rootDOM.getElementById('subTitle').style.transform = 'scale(0)';
          if (window.innerWidth < 480) {
            rootDOM.getElementById('mainTitle').style.transform = 'translateY(70px) scale(0.667)';
          }
        } else {
          rootDOM.getElementById('universal_toolbar').style.transform = 'none';
          rootDOM.getElementById('breadCrumb').style.transform = 'none';
          rootDOM.getElementById('mainTitle').style.transform = 'scale(1)';
          rootDOM.getElementById('subTitle').style.opacity = '1';
          rootDOM.getElementById('subTitle').style.transform = 'scale(1)';
        }
      })
    );

    let lastScrollTop = 0;
    addEventListener(
      'scroll',
      throttle(500, () => {
        let alwaysShowUniversalToolbar = store.getState().alwaysShowUniversalToolbar;
        if (alwaysShowUniversalToolbar) {
          return;
        }
        let displaySettingMenu = store.getState().displaySettingMenu;
        let displaySuttaParallels = store.getState().displaySuttaParallels;
        let displaySuttaToC = store.getState().displaySuttaToC;
        const displaySuttaInfo = store.getState().displaySuttaInfo;
        if (
          this.changedRoute.path !== '/' &&
          !displaySettingMenu &&
          !displaySuttaParallels &&
          !displaySuttaInfo &&
          !displaySuttaToC
        ) {
          let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
  }

  _setStaticPageMenuItemSelected() {
    this._removeSelectedClass();
    let element = this.shadowRoot.querySelector(`nav a[href="${this.changedRoute.path}"]`);
    if (element) {
      element.classList.add('staticPageSelected');
    }
  }

  _initNavigation() {
    this.navArray = store.getState().navigationArray;
    this.currentNavPosition = store.getState().currentNavPosition;
    if (!this.navArray) {
      this.navArray = [
        {
          title: 'Home',
          url: '/',
          type: 'home',
          position: 0,
          navigationArrayLength: 1,
        },
      ];
      this.actions.setNavigation(this.navArray);
    }

    if (!this.currentNavPosition) {
      this.actions.setCurrentNavPosition(0);
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
    //super.updated(changedProps);
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
  }

  _routeChanged() {
    this.shadowRoot.querySelector('#sutta-info').hide();
  }

  _colorThemeChanged(newVal, oldVal) {
    if (oldVal === undefined && newVal === 'light') {
      return;
    }
    let colorThemeUrl = `/elements/styles/sc-colors-${this.appColorTheme}.json`;
    fetch(colorThemeUrl)
      .then(r => r.json())
      .then(response => {
        this.colorsResponse = response;
        this._colorsResponseReceived();
      });
  }

  _colorsResponseReceived() {
    // set the css color variables:
    for (const key in this.colorsResponse) {
      if (!this.colorsResponse.hasOwnProperty(key)) continue;
      document.body.style.setProperty(key, this.colorsResponse[key]);
    }
  }

  _setSiteLanguage() {
    // main_menu_root is defined in index.html
    document.getElementById('main_html_root').lang = this.siteLanguage;
  }
}

customElements.define('sc-site-layout', SCSiteLayout);
