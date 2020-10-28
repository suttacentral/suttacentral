import { LitElement, html, css } from 'lit-element';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';

import { navigationNormaModelStyles } from './sc-navigation-styles.js';

import '@material/mwc-icon';
import '@moduware/morph-ripple';

import '../menus/sc-universal-action-items.js';
import { icons } from '../../img/sc-icons';

class SCLindenLeaves extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      
        height: 40px;
      
        background-color: rgb(75, 74, 74);
      }
      
      nav {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        flex-direction: row;
      
        box-sizing: border-box;
        height: 40px;
        padding: 0 calc(2% - 2px);
      
        white-space: nowrap;
      
        background-color: rgb(75, 74, 74);
      
        justify-content: space-between;
      }
      
      ul {
        display: flex;

        margin: 0;
        padding: 0;
      }
      
      li {
        font-family: 'Skolar Sans PE Compressed', var(--sc-traditional-chinese-font);
        font-size: var(--sc-skolar-font-size-xs);
        font-weight: 500;
      
        display: flex;
      
        list-style-type: none;
      
        color: white;
      
        align-items: center;
      }
      
      li a {
        position: relative;
      
        display: flex;
      
        box-sizing: border-box;
        height: 100%;
        padding: 4px 2px 0;
      
        text-decoration: none;
      
        opacity: .8;
        color: white;
        border-bottom: 4px solid rgba(0, 0, 0, 0);
      
        align-items: center;
      }
      
      li a:hover {
        cursor: pointer;
      
        opacity: 1;
        border-bottom: 4px solid var(--sc-primary-color-light);
      }
      
      li:last-child {
        font-weight: 700;
      
        box-sizing: border-box;
        height: 100%;
        padding: 4px 2px 0;
      
        border-bottom: 4px solid var(--sc-primary-color-light);
      }
      
      li:last-child a:hover {
        cursor: default;
      
        color: white;
        border-bottom: none;
      }
      
      nav li:last-child a {
        cursor: default;
      
        opacity: 1;
      }
      
      li:first-of-type {
        margin-left: 0;
      }
      
      mwc-icon {
        color: var(--sc-disabled-text-color);
      }
      
      morph-ripple {
        --ripple-color: var(--sc-primary-color);
      }
    `;
  }

  static get properties() {
    return {
      localizedStringsPath: { type: String },
      isCompactMode: { type: Boolean },
      currentStyles: { type: Object },
      navArray: { type: Array }
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-navigation';
    this.navArray = store.getState().navigationArray;
  }

  get actions() {
    return {
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
      changeToolbarTitle(title) {
        store.dispatch({
          type: "CHANGE_TOOLBAR_TITLE",
          title: title
        })
      },
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
    this.requestUpdate();
    if (this.navArray !== state.navigationArray) {
      this.navArray = state.navigationArray;
    }
  }

  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('navArray')) {
      //
    }
  }

  render() {
    return html`
      <nav>
        <ul>
          ${this.navArray ? this.navArray.map((nav, i) => html`
            ${nav && nav.title ? html`
              ${this.navArray.length !== i + 1 ? html`
                <li @click=${() => this._navClick(nav)}>
                  <a href='${nav.url}'>${this.localize(nav.title)}<morph-ripple></morph-ripple></a>
                  <mwc-icon>${icons['chevron_right']}</mwc-icon>
                </li>` : html`<li>${this.localize(nav.title)}</li>`}
              ` : ''}
          `) : ''}
        </ul>
        <sc-universal-action-items></sc-universal-action-items>
      </nav>
    `;
  }

  _getPathParamNumber(routePath, number) {
    try {
      return routePath.split('\/')[number];
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  _navClick(nav) {
    this.actions.setCurrentNavPosition(nav.position);
    if (nav.type === 'home') {
      this.navArray.length = 1;
      this.actions.setNavigation(this.navArray); 
      window.location.href = nav.url;
    }

    let routePath = store.getState().currentRoute.path;
    
    this.actions.changeToolbarTitle(nav.title);
    this.navArray.length = nav.position + 1 || 1;
    this.actions.setNavigation(this.navArray);
    this.requestUpdate();

    if (this._getPathParamNumber(routePath, 1) !== 'pitaka') {
      window.location.href = nav.url;
    }
  }
}

customElements.define('sc-linden-leaves', SCLindenLeaves);