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
      background-color: var(--sc-dark-fixed-background-color);
      position: relative;
      z-index: 200;
    }

    nav {

       height: 48px;

      display: flex;

      overflow: hidden;
      flex-direction: row;

      box-sizing: border-box;

      padding: 0px 8px;

      background-color: var(--sc-dark-fixed-background-color);

      justify-content: space-between;


    }

    ul {
      display: flex;

      margin: 0;

      padding: 0;

     justify-content: flex-end;
    flex-direction: row;

    max-width: calc(100vw - 144px);

      position: relative;
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

      box-sizing: border-box;
      height: 100%;
      padding: 4px 2px 0;

      text-decoration: none;

      opacity: 0.8;
      color: white;
      border-bottom: 4px solid rgba(0, 0, 0, 0);

      align-items: center;

      transition: var(--sc-link-transition);
    }

    li a:hover {
      cursor: pointer;

      opacity: 1;
      border-bottom: 4px solid var(--sc-primary-color-light);

      transition: var(--sc-link-transition);
    }

    li a:active {
      background-color: var(--sc-primary-color-light-transparent);
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
      padding-left: 14px;


      position: fixed;

      left: 0px;
      top: 0px;

      width: fit-content;
      height: 48px;

      background-color: var(--sc-dark-fixed-background-color);

      z-index: 1000;
      box-shadow: 8px -8px 8px 0px var(--sc-dark-fixed-background-color);
    }

 li:first-of-type:before{
  position: absolute;
      content: "";
      background-color: var(--sc-dark-fixed-background-color);
    width: 12px;
    height: 48px;
    left: 0;
    top: 0
    }

    li:first-of-type .icon{
      margin: 0 -10px 0 0
    }

    li:first-of-type+li {
      margin-left: 68px;
    }

    .icon {
      fill: var(--sc-icon-color);
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
        ${this.#lindenLeavesTemplate()}
        <sc-action-items-universal></sc-action-items-universal>
      </nav>
    `;
  }

  #lindenLeavesTemplate() {
    return html`
      <ul>
        ${this.navArray
          ? this.navArray.map(
              (nav, i) => html`
                ${nav && nav.title
                  ? html`
                      ${this.navArray.length !== i + 1
                        ? html`
                            <li @click=${() => this._navClick(nav)}>
                              <a href=${nav.url}
                                >${nav.type === 'navigation'
                                  ? nav.title
                                  : this.tryLocalize(`interface:${nav.title}`, nav.title)}</a
                              >
                              ${icon.chevron_right}
                            </li>
                          `
                        : html`
                            <li>
                              ${nav.type === 'navigation'
                                ? nav.title
                                : this.tryLocalize(`interface:${nav.title}`, nav.title)}
                            </li>
                          `}
                    `
                  : ''}
              `
            )
          : ''}
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
