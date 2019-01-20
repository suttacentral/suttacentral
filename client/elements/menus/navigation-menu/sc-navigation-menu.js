import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import { html, LitElement } from '@polymer/lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import { API_ROOT } from '../../../constants';

import '../../../img/sc-language-icons.js';
import { LitLocalized } from '../../addons/localization-mixin';
import { scNavigationMenuCss } from './sc-navigation-menu-css';

const childMenuCache = {};

const MAIN_MENU = 'Main Menu';
const CHILD_MENU = 'Child Menu';


class SCNavigationMenu extends LitLocalized(LitElement) {
  static get properties() {
    return {
      opened: Boolean,
      loading: Boolean,
      subMenuId: String,
      headerTitle: String,
      headerHref: String,
      parentId: String,
      currentlySelectedMenu: String,
      selectedItemId: String,
    }
  }

  constructor() {
    super();
    this.mainMenuData = [];
    this.childMenuData = [];
    this.subMenuId = '';
    this.headerTitle = 'Division title';
    this.headerHref = '#';
    this.parentId = '';
    this.currentlySelectedMenu = MAIN_MENU;
    this.localizedStringsPath = '/localization/elements/sc-navigation-menu';
    this.unclickableMenuItems = ['sn', 'sa', 'an', 'ea', 'kn', 'dharmapadas', 'minor-lzh', 'other-san', 'other-xct']
  }

  shouldUpdate(prevProps) {
    if (prevProps.has('opened') && this.opened && !this.mainMenuData.length) {
      this._fetchMainMenu();
    }

    return super.shouldUpdate();
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.selectedItemId !== state.selectedNavigationMenuItemId) {
      this.selectedItemId = state.selectedNavigationMenuItemId;
      if (this.currentlySelectedMenu !== CHILD_MENU) {
        this.parentId = '';
      }
    }
  }

  toggleOpenDropdownMenu(e) {
    const icon = e.composedPath()[0];
    const container = e.composedPath()[1];
    const childMenu = container.querySelector('ul');

    if (!childMenu) {
      return;
    }

    if (childMenu.classList.contains('open')) {
      childMenu.classList.remove('open');
      childMenu.classList.add('closed');
      icon.classList.remove('open');
    } else if (childMenu.classList.contains('closed')) {
      childMenu.classList.remove('closed');
      childMenu.classList.add('open');
      icon.classList.add('open');
    }
  }

  openChildMenu(item) {
    this.headerTitle = item.name;
    this.subMenuId = item.id;
    this.headerHref = this.getSuttaplexUrl(item.id);
    this.currentlySelectedMenu = CHILD_MENU;

    this._fetchChildMenu(item);
  }

  getMaxHeightStyle(element) {
    // The max-height property is calculated here to achieve a smooth dropdown animation.
    // This only works for elements that have no grandchildren, and therefore no embedded dropdowns of their own.
    // Otherwise a more generally universal, but not as smooth dropdown animation is used.

    const hasGrandchildren = element.children && element.children.some(child => child.children && child.children.length > 0);
    if (element.children && !hasGrandchildren) {
      const elemHeight = 39;
      const elemMaxHeight = elemHeight * element.children.length;
      return `max-height: ${elemMaxHeight}px; transition: max-height ease-out 225ms;`;
    } else {
      return '';
    }
  }

  calculateSubmenuChildrenStyle(menuLevel) {
    const paddingSizePx = getComputedStyle(this).getPropertyValue('--sc-size-md');
    // rule: the first child item should not have any padding (the font-weight acts as a visual contrast)
    const calculatedMenuLevel = menuLevel > 1 ? menuLevel : 1;
    return `padding-left: ${calculatedMenuLevel * parseInt(paddingSizePx)}px`;
  }

  get isMainMenu() {
    return this.currentlySelectedMenu === MAIN_MENU;
  }

  get isChildMenu() {
    return this.currentlySelectedMenu === CHILD_MENU;
  }

  hasError() {
    if (this.currentlySelectedMenu === MAIN_MENU) {
      return !!this.mainMenuError;
    } else if (this.currentlySelectedMenu === CHILD_MENU) {
      return !!this.childMenuError;
    } else {
      return true;
    }
  }

  closeChildMenu() {
    this.currentlySelectedMenu = MAIN_MENU;
  }

  getSuttaplexUrl(uid) {
    return (this.unclickableMenuItems.indexOf(uid) === -1) ? `/${uid}` : '';
  }

  getLanguageIconName(isoCode) {
    return `sc-language-icons:${isoCode}`;
  }

  getPrefixedItemName(name, num) {
    return num ? `${num}. ${name}` : name;
  }

  selectChildItem(item) {
    this.parentId = item.id;
  }

  render() {
    return html`
      ${scNavigationMenuCss}

      <div id="container" class="nav-list-container">
        ${this.loading ? this.spinnerTemplate : ''}
        ${this.hasError() ? this.errorTemplate : ''}

        <nav class="sc-nav">
          <div id="sub_navigation_header" class="nav-back-button swap-section up ${this.isChildMenu ? 'active' : ''}" title="${this.localize('goBack')}">
            <paper-icon-button id="back_arrow" icon="arrow-back" @click="${this.closeChildMenu}"></paper-icon-button>
            <a class="nav-back-title" href="${this.headerHref}">${this.headerTitle}</a>
          </div>

          <div id="sub_navigation" class="sub-nav-container swap-section right ${this.isChildMenu ? 'active' : ''}" data-menuid="${this.subMenuId}">
            ${this.isChildMenu && this.childMenuData.length ? this.getChildMenuTemplate(this.childMenuData[0], 0) : ''}
          </div>
          <div id="main_menu_container">${this.mainMenuTemplate}</div>
        </nav>
      </div>
    `;
  }

  get errorTemplate() {
    return html`<div class="network-error">
      <iron-icon class="network-error-icon" title="${this.localize('networkError')}" src="/img/nonetwork.svg"></iron-icon>
      <div>${this.localize('networkError')}</div>
    </div>`
  }

  get spinnerTemplate() {
    return html`<div class="loading-indicator">
      <paper-spinner-lite class="paper-spinner" active="${this.loading}"></paper-spinner-lite>
    </div>`;
  }

  get expandMoreButtonTemplate() {
    return html`<paper-icon-button icon="expand-more" class="menu-dropdown-icon closed" @click="${this.toggleOpenDropdownMenu}"></paper-icon-button>`;
  }

  get mainMenuTemplate() {
    return this.mainMenuData.length ? html`
      <ul id="main_navigation" class="nav-list sc-scrollbar swap-section left ${this.isMainMenu ? 'active' : ''}">
        ${this.mainMenuData.map(topLevelItem => html`
          <li class="nav-menu-item top-menu-item">
            <span class="nav-link-container">${topLevelItem.name}</span>
            ${this.expandMoreButtonTemplate}
            <ul class="nav-secondary closed">
              ${topLevelItem.children.map(groupingLevelItem => html`
                <li class="nav-menu-item">
                <span class="nav-link-container">${groupingLevelItem.name}</span>
  
                ${groupingLevelItem.lang_iso ? html`
                  <iron-icon class="iso-code-image" slot="item-icon" title="${groupingLevelItem.lang_name}"
                    icon="${this.getLanguageIconName(groupingLevelItem.lang_iso)}">
                  </iron-icon>
                ` : ''}
                
                ${groupingLevelItem.children.length > 0 ? html`
                  ${this.expandMoreButtonTemplate}
                  ${this.deepMainMenuLevelsTemplate(groupingLevelItem, (topLevelItem.name === 'Sutta'))}
                ` : ''}
                </li>
              `)}
            </ul>
          </li>
        `)}
      </ul>
    ` : '';
  }

  deepMainMenuLevelsTemplate(item) {
    if (item.children) {
      const listType = item.children && item.children.some(child => ['div', 'division'].indexOf(child.type) !== -1) ?
        'nav-tertiary' : 'nav-secondary';

      return html`
        <ul class="${listType} closed" style="${this.getMaxHeightStyle(item)}">
          ${item.children.map(childItem => html`
            <li class="nav-menu-item ${this.selectedItemId === childItem.id || this.parentId === childItem.id ? 'selected' : ''}">
            ${listType === 'nav-secondary' ? html`
              <span class="nav-link-container">${childItem.name}</span>
              ${childItem.lang_iso ? html`
                <iron-icon class="iso-code-image" slot="item-icon" title="${childItem.lang_name}"
                  icon="${this.getLanguageIconName(childItem.lang_iso)}"></iron-icon>
              ` : ''}
            ` : html`
              <div class="nav-link-container link-text-ellipsis" title="${childItem.name}">
                <a class="nav-link" href="${this.getSuttaplexUrl(childItem.id)}">${childItem.name}</a>
              </div>
              ${childItem.lang_iso ? html`
                <iron-icon class="iso-code-image" slot="item-icon" title="${childItem.lang_name}"
                  icon="${this.getLanguageIconName(childItem.lang_iso)}"></iron-icon>
              ` : ''}
            `}
            
            ${childItem.children && childItem.children.length > 0 ? html`
              ${this.expandMoreButtonTemplate}
              ${this.deepMainMenuLevelsTemplate(childItem, false)}
            ` : childItem.has_children ? html`
              <paper-icon-button icon="arrow-forward" class="menu-dropdown-icon" @click="${() => this.openChildMenu(childItem)}"></paper-icon-button>
            ` : ''}
            </li>
          `)}
        </ul>
      `;
    }
  }

  getChildMenuTemplate(menuItem, menuLevel) {
    const isRootElement = menuLevel === 0;

    return menuItem.children ? html`
      <ul class="nav-tertiary ${isRootElement ? 'sub-nav sc-scrollbar open' : 'sub-nav-child closed'}"
        style="${isRootElement ? '' : this.getMaxHeightStyle(menuItem)}">
        ${menuItem.children.map(childItem => html`
          <li class="nav-menu-item ${isRootElement ? 'top-menu-item' : ''} ${childItem.id === this.selectedItemId ? 'selected' : ''}"
              @click="${this.selectChildItem(menuItem)}"
          >
            ${childItem.lang_iso ? html`
              <iron-icon class="iso-code-image" slot="item-icon"
                title="${childItem.lang_name}" icon="${this.getLanguageIconName(childItem.lang_iso)}">
              </iron-icon>
            ` : ''}

            <div class="nav-link-container link-text-ellipsis" title="${childItem.name}" style="${this.calculateSubmenuChildrenStyle(menuLevel)}">
              <a class="nav-link" href="${this.getSuttaplexUrl(childItem.id)}">
                ${this.getPrefixedItemName(childItem.name, childItem.display_num)}
              </a>
            </div>

            ${childItem.children && childItem.children.length > 0 ? html`
              ${this.expandMoreButtonTemplate}
              ${this.getChildMenuTemplate(childItem, menuLevel + 1)}
            ` : ''}
          </li>
        `)}
      </ul>
      ` : '';
  }

  async _fetchMainMenu() {
    this.loading = true;
    try {
      this.mainMenuData = await (await fetch(`${API_ROOT}/menu?language=${this.language}`)).json();
    } catch (err) {
      this.mainMenuError = err;
    }
    this.loading = false;
  }

  async _fetchChildMenu(item) {
    this.loading = true;
    const url = `${API_ROOT}/menu/${item.id}?language=${this.language}`;

    if (!(url in childMenuCache)) {
      childMenuCache[url] = fetch(url).then(r => r.json());
    }

    try {
      this.childMenuData = await childMenuCache[url];
    } catch (err) {
      this.childMenuError = err;
    }
    this.loading = false;
  }
}

customElements.define('sc-navigation-menu', SCNavigationMenu);
