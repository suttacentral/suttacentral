import { LitElement, html, css } from 'lit';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import '../menus/sc-action-items-universal';
import { icon } from '../../img/sc-icon';
import { dispatchCustomEvent } from '../../utils/customEvent';

export class SCNavigationLindenLeaves extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      position: relative;
      z-index: 200;

      display: block;

      background-color: var(--sc-darker-fixed-background-color);
    }

    nav {
      display: flex;
      flex-direction: row;

      box-sizing: border-box;
      padding: 0 8px;

      justify-content: space-between;
    }

    .breadcrumbs-wrapper {
      display: flex;
      overflow: auto hidden;
      flex-direction: row;

      box-sizing: border-box;
      height: 48px;
      margin: 0 0 0 0;
      padding: 8px 0;

      scroll-snap-type: x mandatory;
      scrollbar-gutter: stable both-edges;
    }

    ul {
      position: relative;

      display: flex;
      flex-direction: row;

      height: 32px;
      margin: 0 10px 0 40px;
      padding: 0;

      border-radius: 16px;
      background-color: var(--sc-dark-fixed-background-color);

      justify-content: flex-end;
      scroll-snap-align: end;
    }

    li {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-s);
      font-weight: 500;
      font-stretch: condensed;

      display: flex;

      list-style-type: none;

      white-space: nowrap;

      color: white;

      align-items: center;
    }

    li a {
      position: relative;

      display: flex;

      box-sizing: border-box;
      height: 100%;
      padding: 8px 12px;

      transition: var(--sc-link-transition);
      text-decoration: none;

      opacity: 0.8;
      color: white;
      border-radius: 16px;

      align-items: center;
    }

    li a:hover {
      cursor: pointer;
      transition: var(--sc-link-transition);

      opacity: 1;
    }

    li a:active {
      background-color: var(--sc-primary-color-light-transparent);
    }

    li:last-child {
      box-sizing: border-box;
      height: 100%;
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

    .top-bar-home-link {
      position: fixed;
      z-index: 10;
      top: 0;
      left: 4px;

      display: flex;

      width: fit-content;
      height: 48px;

      background-color: var(--sc-darker-fixed-background-color);

      align-items: center;
    }

    .home-link {
      padding: 0 12px 0 12px;

      border-radius: 50%;
      background-color: var(--sc-darker-fixed-background-color);
    }

    .home-link svg {
      fill: white;
    }

    li > a {
      position: relative;
    }

    li .icon {
      margin: 0 -8px;

      fill: var(--sc-icon-color);
    }

    ul li:first-child {
      display: none;
    }
  `;

  static properties = {
    localizedStringsPath: { type: String },
    navArray: { type: Array },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
  }

  get actions() {
    return {
      setNavigation(navArray) {
        store.dispatch({
          type: 'SET_NAVIGATION',
          navigationArray: navArray,
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
    }
  }

  render() {
    return html`
      <nav>
        <div class="breadcrumbs-wrapper">
          <div class="top-bar-home-link">
            <a class="home-link" href="/">
              ${icon.home}
              <md-ripple></md-ripple>
            </a>
          </div>
          ${this.#lindenLeavesTemplate()}
        </div>
        <sc-action-items-universal></sc-action-items-universal>
      </nav>
    `;
  }

  #lindenLeavesTemplate() {
    const navArray = this.navArray || [];
    const { length } = navArray;
    return html`
      <ul>
        ${navArray.map(
          (nav, i) => html`
            ${nav?.title &&
            html`
              <li @click=${() => this._navClick(nav)}>
                <a href=${nav.url}>
                  ${nav.type === 'navigation'
                    ? nav.title
                    : this.tryLocalize(`interface:${nav.title}`, nav.title)}
                  <md-ripple></md-ripple>
                </a>
                ${i < length - 1 ? icon.chevron_right : ''}
              </li>
            `}
          `
        )}
      </ul>
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
    const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    scActionItems?.hideItems();
  }
}

customElements.define('sc-navigation-linden-leaves', SCNavigationLindenLeaves);
