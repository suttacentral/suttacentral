import { PolymerElement, html } from '@polymer/polymer';
import { IronDropdownScrollManager } from '@polymer/iron-dropdown/iron-dropdown-scroll-manager.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
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

import { ReduxMixin } from '../redux-store.js';
import { Localized } from './addons/localization-mixin.js';
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


class SCDrawerLayout extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    <style>
      :host {
        --app-drawer-width: 300px;
        --app-drawer-layout-content-transition: margin-left 200ms;
      }

      .nav-logo-icon {
        margin-left: var(--sc-size-md);
        margin-right: var(--sc-size-md);
        vertical-align: text-bottom;
        width: var(--sc-size-lg);
        height: var(--sc-size-lg);
      }

      .nav-home-title {
        @apply --sc-serif-font;
        @apply --sc-mixed-small-caps;
        @apply --sc-skolar-font-size-static-subtitle;
        position: relative;
        z-index: 100;
        background-color: var(--sc-secondary-text-color);
        padding-bottom: var(--sc-size-xs);
        font-weight: normal;
        margin: 0;
        white-space: nowrap;
        height: 60px;
        line-height: 1.4;
        transition: opacity .5s;
      }

      .nav-home-title-text {
        margin-top: 3px;
      }

      .nav-home-link {
        text-decoration: none;
        background: none;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: var(--sc-tertiary-text-color);
      }

      .nav-home-link:hover {
        background: none;
      }

      .nav-home-link:focus {
        outline: none;
      }

      .nav-drawer-box {
        @apply --shadow-elevation-16dp;
        background-color: var(--sc-secondary-background-color);
        overflow: hidden;
        z-index: 60;
        height: 100%;
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

      .dialog-header {
        @apply --paper-font-headline;
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
        @apply --paper-font-body1;
      }

      .dialog-section p[lang="ev"] {
        @apply --sc-tengwar-font;
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

      #drawer_layout {
        height: 100%;
      }
    </style>

    <iron-ajax id="colors_ajax" handle-as="json" last-response="{{colorsResponse}}" on-response="_colorsResponseReceived"></iron-ajax>

    <app-drawer-layout id="drawer_layout" responsive-width="960px" _drawer-position="hidden" narrow="{{isNarrowScreen}}">

      <app-drawer class="sc-app-drawer sc-scrollbar" slot="drawer" persistent="[[false]]" opened="{{isDrawerOpened}}" swipe-open>
        <div class="nav-drawer-box sc-scrollbar">
          <div class="nav-home-title">
            <a class="nav-home-link" href="/">
              <iron-icon class="nav-logo-icon" icon="sc-svg-icons:sc-logo-bw"></iron-icon>
              <span class="nav-home-title-text">SuttaCentral</span>
            </a>
          </div>
          <sc-navigation-menu class="navigation-menu" opened="[[isDrawerOpened]]"></sc-navigation-menu>
        </div>
      </app-drawer>

      <sc-page-selector id="page_selector" is-drawer-open="[[isDrawerOpened]]" is-narrow-screen="[[isNarrowScreen]]"></sc-page-selector>

    </app-drawer-layout>

    <sc-toasts></sc-toasts>

    <!--
      The dialogs for the sutta text view:
    -->

    <paper-dialog id="settings_dialog" name="settings_dialog" class="dialog" with-backdrop="" entry-animation="fade-in-animation" exit-animation="fade-out-animation">
      <div class="buttons-bar green-bg">
        <h2 class="dialog-header green-bg">{{localize('textSettings')}}</h2>
        <paper-icon-button class="close-dialog-icon" icon="close" dialog-confirm=""></paper-icon-button>
      </div>
      <paper-dialog-scrollable class="scrollable-dialog">
        <sc-settings-menu></sc-settings-menu>
      </paper-dialog-scrollable>
    </paper-dialog>

    <paper-dialog id="info_dialog" name="info_dialog" class="dialog" with-backdrop="true" data="{{infoDialogMetaArea}}" entry-animation="fade-in-animation" exit-animation="fade-out-animation">
      <div class="buttons-bar green-bg">
        <h2 class="dialog-header green-bg">{{localize('publicationDetails')}}</h2>
        <paper-icon-button class="close-dialog-icon" icon="close" dialog-confirm=""></paper-icon-button>
      </div>
      <paper-dialog-scrollable class="scrollable-dialog">
        <div class="dialog-section">
          <div inner-h-t-m-l="[[infoDialogMetaArea]]">
          </div>
        </div>
      </paper-dialog-scrollable>
    </paper-dialog>`;
  }

  static get properties() {
    return {
      inputLanguage: {
        type: String,
        notify: true
      },
      infoDialogMetaArea: {
        type: String,
        statePath: 'suttaMetaText'
      },
      item: {
        type: Object
      },
      colorsResponse: {
        type: Object
      },
      siteLanguage: {
        type: String,
        statePath: 'siteLanguage',
        observer: '_setSiteLanguage'
      },
      isDrawerOpened: {
        type: Boolean
      },
      isNarrowScreen: {
        type: Boolean,
      },
      appColorTheme: {
        type: String,
        statePath: 'colorTheme',
        observer: '_colorThemeChanged'
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-drawer-layout'
      },
      originalDrawerZIndex: {
        type: String
      },
      changedRoute: {
        type: String,
        statePath: 'currentRoute',
        observer: '_routeChanged'
      }
    }
  }

  static get actions() {
    return {
      setOnlineStatus(isOnline) {
        return {
          type: 'SET_ONLINE_STATUS',
          isOnline
        };
      }
    };
  }

  ready() {
    super.ready();
    this.removeAttribute('unresolved');
    // triggered when the menu button in the toolbar is pressed when the app-drawer is not visible
    this.addEventListener('toggleDrawer', (e) => this._toggleDrawer(e));
    this.addEventListener('closeDrawer', () => this._closeDrawer());
    this.addEventListener('app-drawer-transitioned', () => this._trapScroll());
    // Lock scroll for the text dialogs:
    this._addScrollLockListeners();
    this.addEventListener('webkitfullscreenchange', e => {
      let drawer = this.shadowRoot.querySelector('.sc-app-drawer');
      const currentZIndex = drawer.style.zIndex;
      if (currentZIndex === '-1') {
        drawer.style.zIndex = this.originalDrawerZIndex;
      } else {
        this.originalDrawerZIndex = currentZIndex;
        drawer.style.zIndex = -1;
      }
    });
    this.addEventListener('open-dialog', e => this._openDialog(e));

    ['load', 'online', 'offline'].forEach(eventName => {
      window.addEventListener(eventName, () => {
        this.dispatch('setOnlineStatus', navigator.onLine);
      });
    });
  }

  _routeChanged() {
    this.$.settings_dialog.close();
    this.$.info_dialog.close();
  }

  _openDialog(event) {
    this.$[event.detail.id].open();
  }

  // traps a scroll when app-drawer is opened (fix necessary for iOS devices)
  _trapScroll() {
    const appDrawer = this.shadowRoot.querySelector('.sc-app-drawer');
    if (this.isNarrowScreen) {
      if (appDrawer.hasAttribute('opened')) {
        document.body.style.overflow = 'auto';
        disableBodyScroll(this);
      } else {
        enableBodyScroll(this);
      }
    }
  }

  _closeDrawer() {
    const appDrawer = this.shadowRoot.querySelector('.sc-app-drawer');
    if(!this.isNarrowScreen) {
      const contentContainer = this.$.drawer_layout.shadowRoot.querySelector('#contentContainer');
      contentContainer.removeAttribute('drawer-position');
    }
    appDrawer.close();
  }

  // opens the app-drawer when it is not visible.
  _toggleDrawer(e) {
    const drawerLayout = this.shadowRoot.querySelector('#drawer_layout');
    const contentContainer = drawerLayout.shadowRoot.querySelector('#contentContainer');
    const appDrawer = this.shadowRoot.querySelector('.sc-app-drawer');
    requestAnimationFrame(() => {
      if (e.detail.largeScreenOnly === true && this.isNarrowScreen) {
        return;
      }
      if (e.detail.largeScreenOnly === false && !this.isNarrowScreen) {
        return;
      }
      if (!this.isNarrowScreen) {
        if (appDrawer.hasAttribute('opened')) {
          // hide drawer
          contentContainer.removeAttribute('drawer-position');
        } else {
          // show drawer
          contentContainer.setAttribute('drawer-position', 'left');
        }
      }
      appDrawer.toggle();
    });
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
    let settingsDialog = this.$.settings_dialog;
    let infoDialog = this.$.info_dialog;
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
    this.$.colors_ajax.url = `/elements/styles/sc-colors-${this.appColorTheme}.json`;
    this.$.colors_ajax.generateRequest();
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
