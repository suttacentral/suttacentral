import { LitElement, html, css } from 'lit-element';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';

import { navigationNormaModelStyles } from './sc-navigation-styles.js';

class SCLindenLeaves extends LitLocalized(LitElement) {

  static get styles() {
    return css`
      :host {
        display: block;
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
    this.localizedStringsPath = '/localization/elements/sc-linden-leaves';
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
      ${navigationNormaModelStyles}
      <nav>
        <ul>
          ${this.navArray ? this.navArray.map(nav => html`
            ${nav.title ? html`
              <li><a href='#' data-position='${nav.position}' @click=${() => this._navClick(nav)}>${nav.title}</a></li>
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