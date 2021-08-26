import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html';
import { API_ROOT } from '../../constants';
import { navigationNormalModeStyles, navigationCompactModeStyles } from './sc-navigation-styles';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { shortcuts, pitakaGuide, RefreshNavNew } from './sc-navigation-common';
import { dispatchCustomEvent } from '../../utils/customEvent';

export class SCNavigationNew extends LitLocalized(LitElement) {
  @state() isCompactMode = store.getState().suttaplexListDisplay;
  @state() compactStyles = {};
  @state() localizedStringsPath = '/localization/elements/sc-navigation';
  @state() routePath = store.getState().currentRoute.path;
  // @state() currentNavPosition = store.getState().currentNavPosition;
  @state() siteLanguage = store.getState().siteLanguage;
  @state() fullSiteLanguageName = store.getState().fullSiteLanguageName;
  @state() tipitakaUids = ['sutta', 'vinaya', 'abhidhamma'];
  @state() lastSelectedItemRootLangISO = '';
  @state() currentMenuData = [];
  @state() currentUid = this._getRoutePathLastItem();

  constructor() {
    super();
    this.currentUid = this._getRoutePathLastItem();
    this._verifyURL();
    this._viewModeChanged();
    this._parseURL();
  }

  _viewModeChanged() {
    this.compactStyles = this.isCompactMode ? navigationCompactModeStyles : null;
  }

  async _parseURL() {
    // 只需要读取url最后的一项
    this.currentUid = this._getRoutePathLastItem();
    if (this.currentUid) {
      this.currentMenuData = await this._fetchMenuData(this.currentUid);
      RefreshNavNew(this.currentUid, true);
    }
  }

  _verifyURL() {
    // 只需要读取url最后的一项
    this.currentUid = this._getRoutePathLastItem();
    // 获取suttafullpath, 然后跟当前的routePath比较
    fetch(`${API_ROOT}/suttafullpath/${this.currentUid}`)
      .then(r => r.json())
      .then(suttaFullPath => {
        if (!suttaFullPath || !suttaFullPath.full_path) {
          dispatchCustomEvent(this, 'sc-navigate', { pathname: '/pitaka/sutta' });
        }
        console.log(`${suttaFullPath.full_path}/${this.currentUid}`);
        console.log(this.routePath);
        if (`${suttaFullPath.full_path}/${this.currentUid}` !== this.routePath) {
          console.log('路径不一致');
          dispatchCustomEvent(this, 'sc-navigate', { pathname: '/pitaka/sutta' });
        } else {
          return true;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  _getRoutePathLastItem() {
    try {
      if (!this.routePath) {
        this.routePath = store.getState().currentRoute.path;
      }
      return this.routePath.split('/')[this.routePath.split('/').length - 1];
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  get cardContentTemplate() {
    return this.currentMenuData && this.currentMenuData[0]?.children
      ? html`
          ${this.currentMenuData[0].children.map(
            child => html`
              <section class="card">
                <a
                  class="header-link"
                  href="${this._genCurrentURL(child.uid)}"
                  @click=${() =>
                    this._onCardClick({
                      childId: child.uid,
                      childName: child.acronym || child.translated_name || child.root_name,
                      dispatchState: true,
                    })}
                >
                  <header>
                    <span class="header-left">
                      <span class="title">
                        ${child.translated_name || child.root_name || child.uid}
                      </span>
                      <div class="navigation-nerdy-row">
                        <span
                          class="subTitle ${child.root_lang_iso ? 'show-root-language' : ''}"
                          lang="${child.root_lang_iso || this.lastSelectedItemRootLangISO}"
                          translate="no"
                        >
                          ${child.root_name}
                        </span>
                        <span class="acronym">${child.child_range}</span>
                      </div>
                    </span>
                    ${child.yellow_brick_road
                      ? html`
                          <span class="header-right">
                            <span class="number-translated">
                              <span class="number">${child.yellow_brick_road_count}</span>
                              ${this.fullSiteLanguageName}
                            </span>
                          </span>
                        `
                      : ''}
                  </header>
                </a>
                ${child.blurb
                  ? html`
                      <div class="blurb blurbShrink" id="${child.uid}_blurb">
                        ${unsafeHTML(child.blurb)}
                      </div>
                    `
                  : ''}
                ${pitakaGuide.get(child.uid)
                  ? html`
                      <a href="/${pitakaGuide.get(child.uid)}" class="essay-link">
                        <div class="essay" id="${child.uid}_essay">
                          ${this.localize(`${child.uid}_essayTitle`)}
                        </div>
                      </a>
                    `
                  : ''}
                ${shortcuts?.includes(child.uid)
                  ? html`
                      <div class="shortcut">
                        <a href="/${child.uid}" class="shortcut-link">
                          ${this.localize('shortcutToFullList')}
                        </a>
                      </div>
                    `
                  : ''}
              </section>
            `
          )}
        `
      : '';
  }

  async _onCardClick(params) {
    const url = `${API_ROOT}/menu/${params.childId}?language=${this.siteLanguage || 'en'}`;
    fetch(url)
      .then(r => r.json())
      .then(menuData => {
        this.currentMenuData = menuData;
        const hasChildren =
          this.currentMenuData[0] &&
          this.currentMenuData[0].children &&
          this.currentMenuData[0].children.some(child => ['branch'].includes(child.node_type));

        this._updateLastSelectedItemRootLangISO(this.currentMenuData[0].root_lang_iso);

        if (params.dispatchState) {
          const toolbarTitle =
            this.currentMenuData[0].translated_name ||
            this.currentMenuData[0].root_name ||
            this.currentMenuData[0].uid;
          this.actions.changeToolbarTitle(toolbarTitle);
          if (!hasChildren) {
            dispatchCustomEvent(this, 'sc-navigate', { pathname: `/${params.childId}` });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  get actions() {
    return {
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
    if (this.isCompactMode !== state.suttaplexListDisplay) {
      this.isCompactMode = state.suttaplexListDisplay;
      this._viewModeChanged();
    }
    if (this.routePath !== state.currentRoute.path) {
      this.routePath = state.currentRoute.path;
      this._parseURL();
    }
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._parseURL();
    }
  }

  _updateLastSelectedItemRootLangISO(rootLangISO) {
    if (rootLangISO && this.lastSelectedItemRootLangISO !== rootLangISO) {
      this.lastSelectedItemRootLangISO = rootLangISO;
    }
  }

  _genCurrentURL(lastPath) {
    if (!lastPath) {
      return;
    }
    const currentURL = window.location.href;
    let cleanURL = '';
    if (currentURL.indexOf(`/${lastPath}`) === -1) {
      cleanURL = `${currentURL.split('?')[0]}/${lastPath}`;
    }
    return cleanURL || currentURL;
  }

  async _fetchMenuData(childId) {
    const url = `${API_ROOT}/menu/${childId}?language=${this.siteLanguage || 'en'}`;
    try {
      const childrenData = await (await fetch(url)).json();
      return childrenData;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  render() {
    return html`
      ${navigationNormalModeStyles} ${this.compactStyles}
      <main>${this.cardContentTemplate}</main>
    `;
  }
}

customElements.define('sc-navigation-new', SCNavigationNew);
