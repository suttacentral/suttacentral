import { PolymerElement, html } from '@polymer/polymer';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-route/app-location.js';

import './menus/sc-toolbar.js';
import './text/sc-simple-text.js';
import './text/sc-segmented-text.js';
import { ReduxMixin } from '../redux-store.js';
import { Localized } from './addons/localization-mixin.js';

/*
The page-selector loads the top header-bar and the toolbar within that. Depending on the selected page,
the header will have a different appearance and different items in the toolbar.

The page-selector also parses the input-data and loads one of 5 possible page-views depending on the input given:
    - static pages:       <sc-static-page-selector>
    - search page:        <sc-page-search>
    - dictionary page:    <sc-page-dictionary>
    - sutta text pages:   <sc-text-page-selector>
    - suttaplex list:     <sc-suttaplex-list>
*/

class SCPageSelector extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    <style>
      :host {
        --app-toolbar-font-size: calc(20px * var(--sc-skolar-font-scale));
        display: block;
        box-sizing: border-box;
        height: 100%;
      }

      .container {
        position: relative;
      }

      .toolbar-header, #sc_toolbar {
        background-color: var(--sc-primary-color);
        white-space: nowrap;
      }

      [mode="search-mode"] #sc_toolbar,
      [mode="search-mode"] .toolbar-header,
      [mode="dictionary-mode"] #sc_toolbar,
      [mode="dictionary-mode"] .toolbar-header,
      [mode="list-mode"] #sc_toolbar,
      [mode="list-mode"] .toolbar-header {
        background-color: var(--sc-primary-accent-color);
      }

      #toolbar_title_box {
        width: 1px;
        z-index: -10;
      }

      #toolbar_title {
        @apply --paper-font-common-base;
        color: var(--sc-tertiary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #drawertoggle {
        z-index: 1;
        color: var(--sc-tertiary-text-color);
        margin-right: var(--sc-size-md);
      }

      #to_home_button {
        color: var(--sc-tertiary-text-color);
        z-index: 1;
        padding: 0;
        width: var(--sc-size-lg);
        height: var(--sc-size-lg);
        margin-right: var(--sc-size-sm);
      }

      #header {
        transition: all 200ms !important;
      }

      @media screen and (min-width: 840px) {
        #header.drawer-closed {
          left: 0 !important;
        }

        #header {
          left: var(--app-drawer-width) !important;
        }
      }

      @media screen and (max-width: 600px) {
        #toolbar_title {
          @apply --sc-skolar-font-size-md;
        }
      }

      .hidebutton {
        display: none;
      }
    </style>

    <app-location route="{{route}}"></app-location>

    <div class="container">
      <app-header-layout>

        <app-header id="header" class="drawer-closed" condenses="" reveals="" effects="waterfall" slot="header" mode$="[[toolbarMode]]">
          <app-toolbar class="toolbar-header">
            <a href="/" class$="[[_shouldHideHomeButton(isDrawerOpen, shouldShowStaticPage)]]">
              <paper-icon-button icon="sc-svg-icons:sc-logo-bw" id="to_home_button" title="{{localize('goHome')}}"></paper-icon-button>
            </a>
            <paper-icon-button icon="menu" id="drawertoggle" on-tap="_toggleDrawer" title="{{localize('menu')}}"></paper-icon-button>

            <div main-title="" id="toolbar_title_box">
              <p id="toolbar_title">{{_getToolbarTitle(toolbarTitle, localize)}}</p>
            </div>

            <sc-toolbar id="sc_toolbar" suttaplex-display="[[shouldShowSuttaplexListPage]]"></sc-toolbar>
          </app-toolbar>
        </app-header>

        [[_createMetaData(localize)]]

        <template is="dom-if" if="[[shouldShowStaticPage]]" restamp="">
          <sc-static-page-selector></sc-static-page-selector>
        </template>

        <template is="dom-if" if="[[shouldShowSuttaplexListPage]]" restamp="">
          <sc-suttaplex-list></sc-suttaplex-list>
        </template>

        <template is="dom-if" if="[[shouldShowSearchPage]]" restamp="">
          <sc-page-search></sc-page-search>
        </template>

        <template is="dom-if" if="[[shouldShowSuttaTextPage]]" restamp="">
          <sc-text-page-selector author-uid="[[suttaAuthor]]" sutta-id="[[suttaId]]" lang-iso-code="[[langIsoCode]]"></sc-text-page-selector>
        </template>

        <template is="dom-if" if="[[shouldShowDictionaryPage]]" restamp="">
          <sc-page-dictionary dictionary-word="[[dictionaryWord]]"></sc-page-dictionary>
        </template>

      </app-header-layout>

    </div>`;
  }

  static get properties() {
    return {
      route: {
        type: Object
      },
      dictionaryWord: {
        type: String
      },
      queryParams: {
        type: Object,
        notify: true
      },
      // Defines all the available static pate routes.
      // See <sc-static-page-selector>
      staticPages: {
        type: Array,
        value: ['HOME', 'DONATIONS', 'PEOPLE', 'DOWNLOADS', 'DONATE-NOW', 'OFFLINE', 'ABOUT',
          'NUMBERING', 'ABBREVIATIONS', 'METHODOLOGY', 'ACKNOWLEDGMENTS', 'LICENSING', 'INTRODUCTION',
          'START', 'DISCOURSES', 'VINAYA', 'ABHIDHAMMA', 'A-NEW-BEGINNING', 'SUBJECTS', 'SIMILES',
          'NAMES', 'TERMINOLOGY', 'ABBREVIATIONS', 'NOT-FOUND', 'DONATION-SUCCESS']
      },
      allIsoCodes: {
        type: Array,
        value: ['af', 'ar', 'ca', 'cs', 'lzh', 'de', 'en', 'es', 'fa', 'fr', 'pgd', 'he', 'id', 'it',
          'la', 'hu', 'nl', 'no', 'ot', 'pli', 'pl', 'pt', 'pra', 'ro', 'san', 'sr', 'fi', 'sv', 'xct',
          'xto', 'vn', 'uig', 'ru', 'mr', 'hi', 'ta', 'si', 'th', 'my', 'kho', 'ko', 'jp', 'zh',
          'bo', 'pi', 'ug', 'gr', 'pr', 'skt', 'sl']
      },
      selectedPage: {
        type: String,
        statePath: 'currentRoute.name',
        observer: '_recalculateView'
      },
      currentPath: {
        type: String,
        statePath: 'currentRoute.path'
      },
      // Class set on the class on the header depending on the chosen page.
      toolbarMode: {
        type: String,
        statePath: 'toolbarOptions.mode'
      },
      toolbarTitle: {
        type: String,
        statePath: 'toolbarOptions.title'
      },
      suttaId: {
        type: String
      },
      suttaAuthor: {
        type: String
      },
      langIsoCode: {
        type: String
      },
      // Variables that control the <dom-if> elements in the template:
      shouldShowStaticPage: {
        type: Boolean
      },
      shouldShowSuttaplexListPage: {
        type: Boolean
      },
      shouldShowSearchPage: {
        type: Boolean
      },
      shouldShowSuttaTextPage: {
        type: Boolean
      },
      shouldShowDictionaryPage: {
        type: Boolean
      },
      isDrawerOpen: {
        type: Boolean,
        observer: '_drawerOpenStateChanged'
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-page-selector'
      },
      originalDrawerZIndex: {
        type: String
      }
    }
  }

  static get observers() {
    return [
      '_scrollToTop(route)',
      '_changeView(route)',
      '_handleRouteChange(route.*)'
    ];
  }

  static get actions() {
    return {
      changeRoute(route) {
        return {
          type: 'CHANGE_ROUTE',
          route: route
        };
      },
      changeToolbarTitle(title) {
        return {
          type: 'CHANGE_TOOLBAR_TITLE',
          title: title
        };
      },
      changeToolbarMode(mode) {
        return {
          type: 'CHANGE_TOOLBAR_MODE',
          mode: mode
        };
      },
      selectNavigationMenuItem(id) {
        return {
          type: 'SELECT_NAVIGATION_MENU_ITEM',
          id: id
        }
      }
    }
  }

  ready() {
    super.ready();
    const lowerCaseRoute = this.route.path.toLowerCase();
    this.set('route.path', lowerCaseRoute);
    if (this._shouldRedirect()) {
      this._redirectFromLegacyLink();
    }
    this.addEventListener('par-menu-copied', (e) => {
      let success = '';
      if (e.detail.success) {
        success = 'success';
      } else {
        success = 'error';
      }
      this._showToast(success, e.detail.message);
    });
    this.addEventListener('webkitfullscreenchange', e => {
      const currentZIndex = this.$.header.style.zIndex;
      if (currentZIndex === '-1') {
        this.$.header.style.zIndex = this.originalDrawerZIndex;
      } else {
        this.originalDrawerZIndex = currentZIndex;
        this.$.header.style.zIndex = -1;
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    // Hide drawer
    afterNextRender(this, () => {
      if (!this.shouldShowStaticPage) {
        this._toggleDrawer(true);
      }
    });
  }

  _redirectFromLegacyLink() {
    let parts = this.route.path.split('/');
    let partsNewIsoCode = parts.map(x => x.replace('pi-', 'pli-').replace('skt-', 'san-'));
    partsNewIsoCode.forEach(item => {
      if (this.allIsoCodes.indexOf(item) !== -1) {
        partsNewIsoCode.splice(partsNewIsoCode.indexOf(item), 1);
      }
    });
    this.set('route.path', partsNewIsoCode.join('/'));
  }

  _shouldRedirect() {
    const langReg = this.allIsoCodes.join('|');
    const legacyLinkReg = new RegExp(`\/(${langReg})\/.*[0-9]`);
    const legacyLinkReg2 = new RegExp(`\/.*[0-9]\/(${langReg})`);
    const legacyLinkReg3 = this.route.path.startsWith("/pi-") || this.route.path.startsWith("/skt-");
    const newLinkReg = new RegExp(`\/.*[0-9]\/(${langReg})\/[a-z\d]+`);
    return (legacyLinkReg.test(this.route.path) || legacyLinkReg2.test(this.route.path) || legacyLinkReg3) && !newLinkReg.test(this.route.path);
  }

  _getToolbarTitle(title, localize) {
    if (title === null) {
      return 'Page not found';
    }
    else if (['searchResults', 'dictionaryResults'].indexOf(title) !== -1) {
      return localize(title);
    }
    else {
      return title;
    }
  }

  _createMetaData(localize) {
    const keywords = localize('metaKeywords');
    document.dispatchEvent(new CustomEvent('keyword-metadata', {
      detail: {
        keywords: keywords,
        bubbles: true,
        composed: true
      }
    }));
  }

  _recalculateView() {
    this.shouldShowStaticPage = this._isStaticPage(this.selectedPage);
    this.shouldShowSuttaplexListPage = this._isSuttaplexListPage();
    this.shouldShowSearchPage = this._isSearchPage();
    this.shouldShowSuttaTextPage = this._isSuttaTextPage();
    this.shouldShowDictionaryPage = this._isDictionaryPage();
    this._resolveImports();
  }

  // Lazy loading for site elements
  _resolveImports() {
    if (this.shouldShowStaticPage) {
      import('./sc-static-page-selector.js');
    }
    else if (this.shouldShowSuttaplexListPage) {
      import('./suttaplex/sc-suttaplex-list.js');
    }
    else if (this.shouldShowSearchPage) {
      import('./sc-page-search.js');
    }
    else if (this.shouldShowDictionaryPage) {
      import('./sc-page-dictionary.js');
    }
    else if (this.shouldShowSuttaTextPage) {
      import('./text/sc-text-page-selector.js');
    }
  }

  // Dispatches the CHANGE_ROUTE action and sets the toolbar attributes.
  _handleRouteChange() {
    const routeName = this._getBaseRouteName();
    if (routeName === '') {
      this.dispatch('changeToolbarTitle', '');
      this.dispatch('changeToolbarMode', '');
      this.dispatch('changeRoute', Object.assign({}, this.route, { name: 'HOME' }));
    }
    else if (this._isStaticPage(routeName)) {
      this.dispatch('changeToolbarMode', '');
      this.dispatch('changeToolbarTitle', '');
      this.dispatch('changeRoute', Object.assign({}, this.route, { name: routeName }));
    }
    else if (this._isSearchPage()) {
      this.dispatch('changeToolbarTitle', 'searchResults');
      this.dispatch('changeToolbarMode', 'search-mode');
      this.dispatch('changeRoute', Object.assign({}, this.route, { name: routeName }));
    }
    else if (this._isDictionaryPage()) {
      this.set('dictionaryWord', this._getDictionaryParams());
      this.dispatch('changeToolbarMode', 'dictionary-mode');
      this.dispatch('changeToolbarTitle', 'dictionaryResults');
      this.dispatch('changeRoute', Object.assign({}, this.route, { name: routeName }));
    }
    else if (this._isSuttaplexListPage()) {
      this.dispatch('changeToolbarMode', 'list-mode');
      this.dispatch('selectNavigationMenuItem', this._getPathParamNumber(1));
      this.dispatch('changeRoute', Object.assign({}, this.route, this._getSuttaplexRouteParams()));
      this._toggleDrawer(false);
    }
    else if (this._isSuttaTextPage()) {
      const suttaRouteParams = this._getSuttaRouteParams();
      this.set('suttaId', suttaRouteParams.suttaId);
      this.set('langIsoCode', suttaRouteParams.langIsoCode);
      this.set('suttaAuthor', suttaRouteParams.authorName);
      this.dispatch('changeToolbarMode', 'text-mode');
      this.dispatch('changeRoute', Object.assign({}, this.route, suttaRouteParams));
    }
    else {
      this.dispatch('changeRoute', Object.assign({}, this.route, { name: 'NOT-FOUND' }));
    }
  }

  _isStaticPage(pageName) {
    if (!pageName) {
      return false;
    }
    if (this.route.path.split('/').length !== 2 && pageName !== 'NOT-FOUND') {
      return false;
    }
    return this.staticPages.includes(pageName.toUpperCase());
  }

  _isSearchPage() {
    return (this.route.path === '/search');
  }

  _isDictionaryPage() {
    const path = this.route.path.split('/');
    return (path.length === 3 && path[1] === 'define');
  }

  // if the URL only contains an ID, this is a suttaplex page (either a list or a single item).
  _isSuttaplexListPage() {
    const idParam = this._getPathParamNumber(1);
    // Static sites and the search page also only has one path parameter, so we need additional checks here:
    if (this._isStaticPage(idParam) || this._isSearchPage()) {
      return false;
    }
    return idParam && !this._getPathParamNumber(2);
  }

  // returns true if the path has three path parameters or - (for suttas with no author) if the second param
  // is an iso code
  _isSuttaTextPage() {
    // The sutta text endpoint has 4 parts (eg. http://host/dn1/en/sujato)
    if (this.route.path.split('/').length !== 4) {
      return false;
    }
    if (this._isStaticPage(this._getPathParamNumber(1))) {
      return false;
    }
    const pathIsoCode = this._getPathParamNumber(2);
    const pathAuthor = this._getPathParamNumber(3);
    return (!!(pathIsoCode && pathAuthor) || this.allIsoCodes.indexOf(pathIsoCode) !== -1);
  }

  _getSuttaplexRouteParams() {
    return {
      name: 'SUTTAPLEX',
      categoryId: this._getPathParamNumber(1)
    };
  }

  _getSuttaRouteParams() {
    return {
      name: 'SUTTA',
      suttaId: this._getPathParamNumber(1),
      langIsoCode: this._getPathParamNumber(2),
      authorName: this._getPathParamNumber(3)
    };
  }

  _getDictionaryParams() {
    return this.route.path.split('/')[2];
  }

  // Returns the main path category (first path param). Normalized by converting to upper case.
  _getBaseRouteName() {
    return this.route.path.split('\/')[1].toUpperCase();
  }

  // Returns a nested path parameter.
  // Example:
  // if path = "http://suttacentral.net/sutta/dn1/sujato", _getPathParamNumber(1) returns "dn1".
  _getPathParamNumber(number) {
    try {
      return this.route.path.split('\/')[number];
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  // runs when a new page is chosen. Closes the toolbar-searchbar and resets the header.
  _changeView() {
    this.$.sc_toolbar._closeSearch();
  }

  // when the navbar is not visible on small screens, a menu item appears and this fires when tapped.
  _toggleDrawer(largeScreenOnly) {
    this.dispatchEvent(new CustomEvent('toggleDrawer', {
      detail: { largeScreenOnly: largeScreenOnly },
      composed: true,
      bubbles: true
    }));
  }

  _shouldHideHomeButton(isDrawerOpen, shouldShowStaticPage) {
    return (isDrawerOpen || shouldShowStaticPage) ? 'hidebutton' : '';
  }

  _drawerOpenStateChanged() {
    if (this.isDrawerOpen) {
      this.$.header.classList.remove('drawer-closed');
    } else {
      this.$.header.classList.add('drawer-closed');
    }
  }

  _scrollToTop() {
    window.scroll(0, 0);
  }

  _showToast(toastType, text) {
    this.dispatchEvent(new CustomEvent('show-sc-toast', {
      detail: {
        toastType: toastType,
        message: text
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('sc-page-selector', SCPageSelector);
