import { LitElement, html, css } from 'lit';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import '../menus/sc-action-items-universal';
import { icon } from '../../img/sc-icon';
import { dispatchCustomEvent } from '../../utils/customEvent';

export class SCNavigationLindenLeaves extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      display: block;
      background-color: var(--sc-darker-fixed-background-color);
      position: relative;
      z-index: 200;
    }

    nav {

      display: flex;
      flex-direction: row;

      box-sizing: border-box;

      padding: 0px 8px;


      justify-content: space-between;

    }

    .breadcrumbs-wrapper{
      scroll-snap-type: x mandatory;
      overflow: auto hidden;
      box-sizing: border-box;
      scrollbar-gutter: stable both-edges;
      scroll-behavior: smooth;

      display: flex;
      flex-direction: row;
      height: 48px;
      padding: 8px 0px;
      margin: 0 0 0 0;
      
    }

    ul {
      display: flex;

      margin: 0px 10px 0px 40px;

      padding: 0px;

      justify-content: flex-end;
      flex-direction: row;

      height: 32px;

      

      position: relative;

      scroll-snap-align: end;

      border-radius: 16px;


      background-color: var(--sc-dark-fixed-background-color);
    }

    li {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-s);
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

      padding: 8px 12px;

      box-sizing: border-box;
      height: 100%;

      text-decoration: none;

      opacity: 0.8;
      color: white;

      align-items: center;

      border-radius: 16px;

      transition: var(--sc-link-transition);
    }

    li a:hover {
      cursor: pointer;

      opacity: 1;

      transition: var(--sc-link-transition);
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

    .home-link {
      padding: 0 12px 0 12px;
      display: flex;
          align-items: center;


      position: fixed;

      left: 0px;
      top: 0px;

      width: fit-content;
      height: 48px;

      background-color: var(--sc-darker-fixed-background-color);

      z-index: 1000;

    }

    .home-link svg{
      fill: white;
    }

    li > a {
      position: relative;
    }

    li .icon {
      fill: var(--sc-icon-color);
      margin: 0 -8px
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
      <div class='breadcrumbs-wrapper'>
      <a class='home-link' href='/'>${icon.home}</a>
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
        ${navArray.map((nav, i) => html`
          ${nav?.title && html`
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
        `)}
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
