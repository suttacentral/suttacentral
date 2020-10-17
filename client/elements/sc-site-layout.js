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
import '@material/mwc-icon';
import { throttle } from 'throttle-debounce';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock/lib/bodyScrollLock.es6';
setPassiveTouchGestures(true);

import '../img/sc-svg-icons.js';
import '../img/sc-iron-icons.js';

import './sc-page-selector.js';
import './menus/sc-settings-menu.js';
import './menus/sc-action-items.js';
import './addons/sc-top-sheet.js';
import './addons/sc-toasts.js';
import './navigation/sc-linden-leaves.js';

import './styles/sc-utility-styles.js';
import './styles/sc-font-styles.js';
import './styles/sc-colors.js';

import { initSentry } from '../sentry.js';
initSentry();
import { LitLocalized } from './addons/localization-mixin';
import { store } from '../redux-store';

import { SCSiteLayoutStyles} from './styles/sc-site-layout-styles.js';

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
              <iron-icon class="title-logo-icon" icon="sc-svg-icons:sc-logo"></iron-icon>
              <span>${this.toolbarTitle}</span>
            </div>
            <div id="subTitle">${this.localize('pageSubtitle')}</div>
          </div>

          <sc-action-items id="action_items"></sc-action-items>
        </div>

        <sc-top-sheet id="setting_menu"></sc-top-sheet>

        <div id="static_pages_nav_menu">
          <nav>
            <ul>
              ${this.toolbarSelectedTemplate}
              ${this.shouldShowSecondToolbarTemplate}
              ${this.shouldShowTipitakaToolbarTemplate}
              ${this.shouldShowAcademicToolbarTemplate}
              ${this.shouldShowOrganizationalToolbarTemplate}
              ${this.shouldShowGuidesToolbarTemplate}
            </ul>
          </nav>
        </div>
      </div>

      <sc-page-selector id="page_selector"></sc-page-selector>
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

  get toolbarSelectedTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState && this.staticPagesToolbarDisplayState.displayFirstToolbar ? html`
        <li><a href="/introduction">${this.localize('INTRODUCTION')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/donations">${this.localize('DONATIONS')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/offline">${this.localize('USEOFFLINE')}<morph-ripple></morph-ripple></a></li>
        <li><a href="https://discourse.suttacentral.net/c/meta/updates">${this.localize('WHATSNEW')}<morph-ripple></morph-ripple></a></li>
      ` : ''}
    `;
  }

  get shouldShowSecondToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState && this.staticPagesToolbarDisplayState.displaySecondToolbar ? html`
        <li><a href="/subjects">${this.localize('SUBJECTS')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/similes">${this.localize('SIMILES')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/names">${this.localize('NAMES')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/terminology">${this.localize('TERMINOLOGY')}<morph-ripple></morph-ripple></a></li>
      ` : ''}
    `;
  }

  get shouldShowTipitakaToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState && this.staticPagesToolbarDisplayState.displayTipitakaToolbar ? html`
        <li><a href="/discourses">${this.localize('DISCOURSES')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/vinaya">${this.localize('VINAYA')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/abhidhamma">${this.localize('ABHIDHAMMA')}<morph-ripple></morph-ripple></a></li>
      ` : ''}
    `;
  }

  get shouldShowAcademicToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState && this.staticPagesToolbarDisplayState.displayAcademicToolbar ? html`
        <li><a href="/numbering">${this.localize('NUMBERING')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/abbreviations">${this.localize('ABBREVIATIONS')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/methodology">${this.localize('METHODOLOGY')}<morph-ripple></morph-ripple></a></li>
      ` : ''}
    `;
  }

  get shouldShowOrganizationalToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState && this.staticPagesToolbarDisplayState.displayOrganizationalToolbar ? html`
        <li><a href="/acknowledgments">${this.localize('ACKNOWLEDGMENTS')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/licensing">${this.localize('LICENSING')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/about">${this.localize('ABOUT')}<morph-ripple></morph-ripple></a></li>
      ` : ''}
    `;
  }

  get shouldShowGuidesToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState && this.staticPagesToolbarDisplayState.displayGuidesToolbar ? html`
        <li><a href="/general-guide-sujato">${this.localize('GENERAL')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/dn-guide-sujato">${this.localize('LONG')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/mn-guide-sujato">${this.localize('MIDDLE')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/sn-guide-sujato">${this.localize('LINKED')}<morph-ripple></morph-ripple></a></li>
        <li><a href="/an-guide-sujato">${this.localize('NUMBERED')}<morph-ripple></morph-ripple></a></li>
      ` : ''}
    `;
  }

  _removeSelectedClass() {
    this.shadowRoot.querySelectorAll('.staticPageSelected').forEach((e) => {
      e.classList.remove('staticPageSelected');
    });
  }

  _addSelectedClass(e) {
    e.classList.add('staticPageSelected');
  }

  _addStaticPageLinkEventListener() {
    this.shadowRoot.querySelectorAll('#static_pages_nav_menu nav li a').forEach((element) => {
      element.addEventListener('click', (e) => {
        this._removeSelectedClass();
        this._addSelectedClass(element);
      });
    });
  }

  static get properties() {
    return {
      inputLanguage: {type: String },
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
        displayGuidesToolbar: false
      };
    }
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
      setStaticPagesToolbarDisplayState(toolbarDisplayState) {
        store.dispatch({
          type: 'CHANGE_STATIC_PAGES_TOOLBAR_DISPLAY_STATE',
          staticPagesToolbarDisplayState: toolbarDisplayState
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
    if (this.staticPagesToolbarDisplayState !== state.staticPagesToolbarDisplayState) {
      this.staticPagesToolbarDisplayState = state.staticPagesToolbarDisplayState;
    }
    if (this.changedRoute !== state.currentRoute) {
      this.changedRoute = state.currentRoute;
    }
  }

  firstUpdated() {
    this.removeAttribute('unresolved');

    // Lock scroll for the text dialogs:
    this._addScrollLockListeners();
    
    this.addEventListener('open-dialog', e => this._openDialog(e));

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

    this.addEventListener('show-info-dialog', e => { 
      const dialogElement = this.shadowRoot.querySelector('#info_dialog');
      if (dialogElement) {
        dialogElement.open();
      }
    });

    let rootDOM = this.shadowRoot;
    addEventListener('scroll', throttle(300, () => {
      let transitionStyle = 'transform 200ms ease-in-out';
      rootDOM.getElementById('universal_toolbar').style.transition = transitionStyle;
      rootDOM.getElementById('breadCrumb').style.transition = transitionStyle;
      rootDOM.getElementById('mainTitle').style.transition = transitionStyle;
      rootDOM.getElementById('subTitle').style.transition = transitionStyle;

      if (this.changedRoute.path === '/' && (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)) {
        rootDOM.getElementById('universal_toolbar').style.transform = 'translateY(-90px)';
        rootDOM.getElementById('breadCrumb').style.transform = 'translateY(90px)';
        rootDOM.getElementById('mainTitle').style.transform = 'translateY(58px) scale(0.667)';
        rootDOM.getElementById('subTitle').style.opacity = '0';
        rootDOM.getElementById('subTitle').style.transform = 'scale(0)';
        if (window.innerWidth < 480) {
          rootDOM.getElementById('mainTitle').style.transform = 'translateY(55px) scale(0.667)';
        }
      } else {
        rootDOM.getElementById('universal_toolbar').style.transform = 'none';
        rootDOM.getElementById('breadCrumb').style.transform = 'none';
        rootDOM.getElementById('mainTitle').style.transform = 'scale(1)';
        rootDOM.getElementById('subTitle').style.opacity = '1';
        rootDOM.getElementById('subTitle').style.transform = 'scale(1)';
      }
    }));

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
          navigationArrayLength: 1
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
      displayGuidesToolbar: false
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

customElements.define('sc-site-layout', SCSiteLayout);
