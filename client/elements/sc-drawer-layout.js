import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { IronDropdownScrollManager } from '@polymer/iron-dropdown/iron-dropdown-scroll-manager.js';

import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-styles/shadow.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock/lib/bodyScrollLock.es6';
setPassiveTouchGestures(true);

import '../img/sc-svg-icons.js';
import '../img/sc-iron-icons.js';
import './sc-page-selector.js';
import './menus/navigation-menu/sc-navigation-menu.js';
import './menus/sc-settings-menu.js';
import './addons/sc-toasts.js';
import './styles/sc-utility-styles.js';
import './styles/sc-font-styles.js';
import './styles/sc-colors.js';

import { initSentry } from '../sentry.js';
initSentry();
import { LitLocalized } from '../elements/addons/localization-mixin';
import { store } from '../redux-store';
import './navigation/sc-linden-leaves.js';
import './addons/sc-top-sheet.js';

import './menus/sc-toolbar.js';

import '@material/mwc-icon';
import '@material/mwc-ripple';
import '@material/mwc-textfield';

import { throttle } from 'throttle-debounce';


class SCDrawerLayout extends LitLocalized(LitElement) {
  render() {
    return html`
      <style>
        :host {
          display: block;
        }

        .nav-logo-icon {
          margin-left: var(--sc-size-md);
          margin-right: var(--sc-size-md);
          vertical-align: text-bottom;
          width: var(--sc-size-lg);
          height: var(--sc-size-lg);
        }

        /* styles for the text dialogs: */

        .dialog {
          left: 0;
          background-color: var(--sc-secondary-background-color);
          white-space: initial;
          max-width: 630px;
          position: fixed;
          top: 50px;
          margin: 5% auto;
          right: 0;
        }

        @media screen and (max-width: 960px) {
          .dialog {
            left: 0;
          }
        }

        @media screen and (max-width: 480px) {
          #titlebarSitetitle {
            font-size: 2.25rem !important;
          }

          #titlebarSubtitle{
            font-size: 1.05rem !important;
          }

          #SCTitle {
            font-size: 1.5rem !important;
          }
        }

        .dialog-header {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-static-subtitle);
          font-weight: 400;
          line-height: 32px;
          padding: var(--sc-size-lg) 0;
          color: var(--sc-tertiary-text-color);
          margin: 0;
        }

        .buttons-bar {
          margin-top: 0;
          padding-right: 0;
          display: flex;
          justify-content: space-between;
        }

        .green-bg {
          background-color: var(--sc-primary-accent-color);
        }

        .scrollable-dialog {
          margin-bottom: var(--sc-size-lg);
          margin-top: 0;
          --divider-color: transparent;
        }

        .dialog-section {
          margin-top: var(--sc-size-lg);
          color: var(--sc-primary-text-color);
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-s);
          font-weight: 400;
          line-height: 20px;
        }

        .dialog-section p[lang="ev"] {
          font-family: var(--sc-tengwar-font);
        }

        p a, li a {
          color: inherit;
          text-decoration: underline;
          text-decoration-color: var(--sc-primary-color);
          text-decoration-skip-ink: auto;
        }

        p a:hover, li a:hover {
          color: var(--sc-primary-color);
        }

        p a:visited, li a:visited {
          text-decoration-color: var(--sc-primary-color-dark);
        }

        .close-dialog-icon {
          color: var(--sc-tertiary-text-color);
          margin: var(--sc-size-sm);
        }

        .navigation-menu {
          height: 100%;
        }

        #titlebar {
          /* display: flex !important; */
          display: flex;
          box-sizing: border-box;
          height: 8em; 
          margin: auto;
          padding-top: 1.8em;

          background-color: var(--sc-primary-color);

          /* align-items: center; */
          justify-content: center;
          transition: all 0.1s;
        }

        #titlebarSitetitle {
          font-size: 3rem;
          font-family: "skolar pe";
          font-variant-caps: small-caps;
          text-align: center;
          line-height: 0.9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          /* align-items: center; */
          justify-content: center;
        }

        #titlebarSubtitle{
          text-align: center;
          font-style: italic;
          font-size: 1.5rem;
          display: flex;
          /* align-items: center; */
          justify-content: center;
        }

        #topbar {
          color: white;
          position: sticky;
          /* position: relative; */ 
          top: 0;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05), 2px 2px 2px rgba(0, 0, 0, 0.05), 4px 4px 4px rgba(0, 0, 0, 0.05), 8px 8px 8px rgba(0, 0, 0, 0.05);
          z-index: 9999;
        }

        #titlebarCenter {
          transform: translateY(60px);
          min-width: 0;
        }

        #titlebarSitetitle {
          transform: scale(1);
        }

        #titlebarSubtitle {
          opacity: 1;
          transform: scale(1);
        }

        .hover-underline-animation {
          display: inline-block;
          position: relative;
          /* color: #0087ca; */
        }

        .hover-underline-animation:after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: gold;
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }

        .hover-underline-animation:hover:after {
          transform: scaleX(1);
          transform-origin: bottom left;
        } 

        nav {
          height: 64px;
          display: flex;
          background-color: var(--sc-primary-color);
          padding: 0 2%;
        }

        nav span:first-child {
          margin-right: auto;
        }

        #toolbarTitle {
          font-weight: normal;
          display: flex;
          align-items: center;

          

          font-family: var(--sc-sans-font);
          font-size: var(--app-toolbar-font-size, 20px);
          color: var(--sc-tertiary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: calc(80%);
          text-transform: capitalize;
        }

        #SCTitle {
          align-items: center;
          font-size: 1.9rem;
          font-variant-caps: small-caps;
          /* font-family: var(--sc-sans-font); */
          font-family: "skolar pe";
          line-height: 0.9;
          color: var(--sc-tertiary-text-color);
          text-overflow: ellipsis;
          width: calc(80%);
          display: none;
        }

        #titlebarCenter span a {
          color: var(--sc-tertiary-text-color);
          text-decoration: none;
        }

        header {
          background-color: var(--sc-primary-color);
        }

        @media screen and (max-width: 600px) {
          #toolbar_title {
            font-size: var(--sc-skolar-font-size-md);
          }
        }

        @media print {
          #topbar, header {
            display: none;
          }
        }
      </style>

      <div id="topbar">
        <sc-linden-leaves id="breadCrumb"></sc-linden-leaves>
          <nav>
            <span id="toolbarTitle">${this.toolbarTitle}</span>
            <span id="SCTitle">SuttaCentral</span>
            <sc-toolbar id="sc_toolbar"></sc-toolbar>
          </nav>
          <sc-top-sheet id="setting_Menu"></sc-top-sheet>
      </div>

      <header>
        <div id="titlebar">
          <span id="titlebarCenter">
            <span id="titlebarSitetitle"><a href="/">SuttaCentral</a></span>
            <span id="titlebarSubtitle"><a href="/">Early Buddhist texts, translations, and parallels</a></span>
          </span>
        </div>
      </header>

      <sc-page-selector id="page_selector" .isNarrowScreen="${this.isNarrowScreen}"></sc-page-selector>

      <sc-toasts></sc-toasts>

      <!--
        The dialogs for the sutta text view:
      -->

      <paper-dialog id="settings_dialog" name="settings_dialog" class="dialog" with-backdrop="" entry-animation="fade-in-animation" exit-animation="fade-out-animation">
        <div class="buttons-bar green-bg">
          <h2 class="dialog-header green-bg">${this.localize('textSettings')}</h2>
          <paper-icon-button class="close-dialog-icon" icon="sc-iron-icons:close" dialog-confirm=""></paper-icon-button>
        </div>
        <paper-dialog-scrollable class="scrollable-dialog">
          <sc-settings-menu></sc-settings-menu>
        </paper-dialog-scrollable>
      </paper-dialog>

      <paper-dialog id="info_dialog" name="info_dialog" class="dialog" with-backdrop="true" .data="${this.infoDialogMetaArea}" entry-animation="fade-in-animation" exit-animation="fade-out-animation">
        <div class="buttons-bar green-bg">
          <h2 class="dialog-header green-bg">${this.localize('publicationDetails')}</h2>
          <paper-icon-button class="close-dialog-icon" icon="sc-iron-icons:close" dialog-confirm=""></paper-icon-button>
        </div>
        <paper-dialog-scrollable class="scrollable-dialog">
          <div class="dialog-section">
            <div>${unsafeHTML(this.infoDialogMetaArea)}</div>
          </div>
        </paper-dialog-scrollable>
      </paper-dialog>`;
  }

  static get properties() {
    return {
      inputLanguage: {type: String }, //notify: true
      infoDialogMetaArea: { type: String },
      item: { type: Object },
      colorsResponse: { type: Object },
      siteLanguage: { type: String }, //observer: '_setSiteLanguage'
      isNarrowScreen: { type: Boolean },
      appColorTheme: { type: String }, //observer: '_colorThemeChanged'
      localizedStringsPath: { type: String },
      changedRoute: { type: String }, //observer: '_routeChanged'
      displaySettingMenu: { type: Boolean },
      toolbarTitle: { type: String },
      displaySCSiteTitle: { type: Boolean },
    }
  }

  constructor() {
    super();
    let state = store.getState();
    this.inputLanguage = '';
    this.infoDialogMetaArea = state.suttaMetaText;
    this.item = {};
    this.colorsResponse = {};
    this.siteLanguage = state.siteLanguage;
    this.isNarrowScreen = false;
    this.appColorTheme = state.colorTheme;
    this._colorThemeChanged();
    this.localizedStringsPath = '/localization/elements/sc-drawer-layout';
    this.changedRoute = state.currentRoute;
    this.displaySettingMenu = state.displaySettingMenu;
    this.toolbarTitle = state.toolbarOptions.title;
    this.displaySCSiteTitle = state.displaySCSiteTitle;
  }

  get actions() {
    return {
      setOnlineStatus(isOnline) {
        store.dispatch({
          type: 'SET_ONLINE_STATUS',
          isOnline
        });
      },
      changeDisplayParallelsState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_PARALLELS_STATE',
          displayParallels: display
        })
      },
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display
        })
      },
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
    };
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.displaySettingMenu !== state.displaySettingMenu) {
      this.displaySettingMenu = state.displaySettingMenu;
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
    if (this.displaySCSiteTitle !== state.displaySCSiteTitle) {
      this.displaySCSiteTitle = state.displaySCSiteTitle;
    }
  }

  firstUpdated() {
    this.removeAttribute('unresolved');
    // triggered when the menu button in the toolbar is pressed when the app-drawer is not visible

    // Lock scroll for the text dialogs:
    this._addScrollLockListeners();
    
    this.addEventListener('open-dialog', e => this._openDialog(e));

    ['load', 'online', 'offline'].forEach(eventName => {
      window.addEventListener(eventName, () => {
        this.actions.setOnlineStatus(navigator.onLine);
      });
    });

    this.addEventListener('hide-sc-top-sheet', e => { 
      this.shadowRoot.querySelector('#setting_Menu').hide();
    });

    this.addEventListener('show-sc-top-sheet', e => { 
      this.shadowRoot.querySelector('#setting_Menu').show();
    });

    this.addEventListener('show-info-dialog', e => { 
      const dialogElement = this.shadowRoot.querySelector('#info_dialog');
      if (dialogElement) {
        dialogElement.open();
      }
    });

    let lastScrollTop = 0;
    addEventListener('scroll', throttle(300, () => {
      let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (currentScrollTop > lastScrollTop){
        // down scroll code
        //this.shadowRoot.querySelector('#topbar').style.position = 'relative';
        this.shadowRoot.querySelector('#titlebar').style.transform = 'scale(0)';
        this.shadowRoot.querySelector('#titlebar').style.height = '0em';
        if (this.displaySCSiteTitle) {
          this.shadowRoot.querySelector('#SCTitle').style.display = 'inherit';
        }
      } else {
        // up scroll code
        //this.shadowRoot.querySelector('#topbar').style.position = 'sticky';
        if (currentScrollTop === 0) {
          this.shadowRoot.querySelector('#titlebar').style.transform = 'scale(1)';
          this.shadowRoot.querySelector('#titlebar').style.height = '8em';
          this.shadowRoot.querySelector('#SCTitle').style.display = 'none';
        }
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    }));

    this._initNavigation();
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
          navigationArrayLength: 1
        },
      ];
      this.actions.setNavigation(this.navArray);
    }
    
    if (!this.currentNavPosition) {
      this.actions.setCurrentNavPosition(0);
    }
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
    }
  }

  _routeChanged() {
    this.shadowRoot.querySelector('#settings_dialog').close();
    this.shadowRoot.querySelector('#info_dialog').close();
  }

  _openDialog(event) {
    const dialogElement = this.shadowRoot.querySelector(`#${event.detail.id}`);
    if (dialogElement) {
      dialogElement.open();
    }
  }

  // Locks scroll on text dialogs:
  _addScrollLockListeners() {
    let scrollLockListener = (dialog) => {
      if (dialog.opened) {
        IronDropdownScrollManager.pushScrollLock(dialog);
      } else {
        IronDropdownScrollManager.removeScrollLock(dialog);
      }
    };
    let settingsDialog = this.shadowRoot.querySelector('#settings_dialog');
    let infoDialog = this.shadowRoot.querySelector('#info_dialog');
    settingsDialog.addEventListener('opened-changed', () => { scrollLockListener(settingsDialog) });
    infoDialog.addEventListener('opened-changed', () => { scrollLockListener(infoDialog) });
  }

  _getApiUrl() {
    let currentUrl = window.location;
    return `${currentUrl.protocol}//${currentUrl.host}/api`;
  }

  _colorThemeChanged(newVal, oldVal) {
    if (oldVal === undefined && newVal === 'light') {
      return;
    }
    let colorThemeUrl = `/elements/styles/sc-colors-${this.appColorTheme}.json`;
    fetch(colorThemeUrl).then(r => r.json()).then((response) => {
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

customElements.define('sc-drawer-layout', SCDrawerLayout);
