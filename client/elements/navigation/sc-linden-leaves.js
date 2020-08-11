import { LitElement, html, css } from 'lit-element';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';

import { navigationNormaModelStyles } from './sc-navigation-styles.js';

class SCLindenLeaves extends LitLocalized(LitElement) {

  static get styles() {
    return css`
:host
{
    display: block;
}

nav
{
    display: flex;
    overflow-x: auto;
    flex-direction: row;

    box-sizing: border-box;
    padding: 0 2%;

    white-space: nowrap;

    background-color: rgb(75, 74, 74);

    justify-content: space-between;
}

nav ul
{
    display: flex;

    width: 100%;
    margin: 0;
    padding: 0;
}

nav li
{
    font-size: .8em;
    font-weight: 500;

    margin: 0 0 0 8px;

    list-style-type: none;
}

nav li a
{
    display: inline-block;

    padding: 14px 8px 10px 4px;

    color: white;

    text-decoration: none;

    opacity: 0.8
}

nav li a:hover
{
    cursor: pointer;

    border-bottom: 4px solid var(--sc-primary-color-light);
}

nav li:last-child
{
    font-weight: 800;

    border-bottom: 4px solid var(--sc-primary-color-light);

}

nav li:last-child a:hover
{
    cursor: default;

    color: white;
    border-bottom: none;
}

nav li:last-child a
{
    cursor: default;

    opacity: 1
}

nav li:after
{
    font-weight: 400;

    margin-left: 8px;

    content: '❭';

    color: white;

    opacity: 0,8;
}

nav li:last-of-type:after
{
    margin-left: 0;

    content: '';
}

nav li:first-of-type
{
    margin-left: 0;
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