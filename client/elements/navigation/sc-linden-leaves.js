import { LitElement, html, css } from 'lit-element';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';

import { navigationNormaModelStyles } from './sc-navigation-styles.js';

import '@material/mwc-icon';
import '@moduware/morph-ripple';

class SCLindenLeaves extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      nav {
        display: flex;
        overflow-x: auto;
        flex-direction: row;
        height: 46px;

        box-sizing: border-box;
        padding: 0 calc(2% - 8px);

        white-space: nowrap;

        background-color: rgb(75, 74, 74);

        justify-content: space-between;
      }

      nav ul {
        display: flex;

        width: 100%;
        margin: 0;
        padding: 0;
      }

      nav li {
        font-size: var(--sc-skolar-font-size-xs);
        font-weight: 500;

        display: flex;

        list-style-type: none;

        align-items: center;
      }

      nav li a {
        position: relative;

        display: inline-block;

        padding: 14px 8px 10px 8px;

        text-decoration: none;

        opacity: .8;
        color: white;
        border-bottom: 4px solid rgba(0,0,0,0);
      }

      nav li a:hover {
        cursor: pointer;

        border-bottom: 4px solid var(--sc-primary-color-light);

        opacity: 1;
      }

      nav li:last-child {
        font-weight: 800;

        padding: 14px 8px 10px 8px;

        border-bottom: 4px solid var(--sc-primary-color-light);
      }

      nav li:last-child a:hover {
        cursor: default;

        color: white;
        border-bottom: none;
      }

      nav li:last-child a {
        cursor: default;

        opacity: 1;
      }

      nav li:first-of-type {
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
    //this.localizedStringsPath = '/localization/elements/sc-linden-leaves';
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
                  <mwc-icon>chevron_right</mwc-icon>
                </li>` : html`<li>${this.localize(nav.title)}</li>`}
              ` : ''}
          `) : ''}
        </ul>
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