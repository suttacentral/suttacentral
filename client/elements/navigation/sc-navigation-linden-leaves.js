import { LitElement, html, css } from 'lit';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';

import { navigationNormalModeStyles } from './sc-navigation-styles';

import '../menus/sc-action-items-universal';
import { icon } from '../../img/sc-icon';

import { dispatchCustomEvent } from '../../utils/customEvent';

class SCNavigationLindenLeaves extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;

        height: 48px;

        background-color: rgb(75, 74, 73);

        position: relative;
        z-index: 200;
      }

      nav {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        flex-direction: row;

        box-sizing: border-box;
        height: 48px;
        padding: 0 8px 0 16px;

        background-color: rgb(75, 74, 73);

        justify-content: space-between;
      }

      ul {
        display: flex;

        margin: 0 12px 0 0;
        padding: 0;
      }

      li {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-xs);
        font-weight: 500;
        font-stretch: condensed;

        display: flex;

        list-style-type: none;

        color: white;

        align-items: center;

        white-space: nowrap;
      }

      li a {
        position: relative;

        display: flex;

        box-sizing: border-box;
        height: 100%;
        padding: 4px 2px 0;

        text-decoration: none;

        opacity: 0.8;
        color: white;
        border-bottom: 4px solid rgba(0, 0, 0, 0);

        align-items: center;

        transition: all 200ms ease;
      }

      li a:hover {
        cursor: pointer;

        opacity: 1;
        border-bottom: 4px solid var(--sc-primary-color-light);

        transition: all 200ms ease;
      }

      li a:active {
        background-color: var(--sc-primary-color-light-transparent);

        transition: background-color 200ms ease;
      }

      li:last-child {
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

      .icon {
        fill: var(--sc-icon-color);
      }
    `;
  }

  static get properties() {
    return {
      localizedStringsPath: { type: String },
      isCompactMode: { type: Boolean },
      currentStyles: { type: Object },
      navArray: { type: Array },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-navigation';
  }

  get actions() {
    return {
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
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title,
        });
      },
    };
  }

  stateChanged(state) {
    super.stateChanged(state);
    this.requestUpdate();
    if (this.navArray !== state.navigationArray) {
      this.navArray = state.navigationArray;
      this.navArray = this.navArray.filter(function (e) {
        return e;
      });
    }
  }

  render() {
    return html`
      <nav>
        <ul>
          ${this.navArray
            ? this.navArray.map(
                (nav, i) => html`
                  ${nav && nav.title
                    ? html`
                        ${this.navArray.length !== i + 1
                          ? html`
                              <li @click=${() => this._navClick(nav)}>
                                <a href="${nav.url}">${this.localize(nav.title)}</a>
                                ${icon.chevron_right}
                              </li>
                            `
                          : html` <li>${this.localize(nav.title)}</li> `}
                      `
                    : ''}
                `
              )
            : ''}
        </ul>
        <sc-action-items-universal></sc-action-items-universal>
      </nav>
    `;
  }

  _getPathParamNumber(routePath, number) {
    try {
      return routePath.split('/')[number];
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  _navClick(nav) {
    this._hideTopSheets();
    // this.actions.setCurrentNavPosition(nav.position);
    if (nav.type === 'home') {
      this.navArray.length = 1;
      this.actions.setNavigation(this.navArray);
      dispatchCustomEvent(this, 'sc-navigate', { pathname: nav.url });
    }

    const routePath = store.getState().currentRoute.path;
    this.actions.changeToolbarTitle(nav.title);
    this.navArray.length = nav.index + 1 || 1;
    this.actions.setNavigation(this.navArray);
    this.requestUpdate();

    if (this._getPathParamNumber(routePath, 1) !== 'pitaka') {
      dispatchCustomEvent(this, 'sc-navigate', { pathname: nav.url });
    }
  }

  _hideTopSheets() {
    const scActionItems = document
      .querySelector('sc-site-layout')
      .shadowRoot.querySelector('#action_items');
    scActionItems?.hideItems();
  }
}

customElements.define('sc-navigation-linden-leaves', SCNavigationLindenLeaves);
