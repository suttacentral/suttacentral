import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { API_ROOT } from '../../constants';
import {
  navigationNormalModeStyles,
  navigationCompactModeStyles,
  navigationPublicationInfoStyles,
} from './sc-navigation-styles';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { shortcuts, pitakaGuide, RefreshNavNew } from './sc-navigation-common';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { allEditions, coverImage, creatorBio } from '../publication/sc-publication-common';

export class SCNavigationNew extends LitLocalized(LitElement) {
  static properties = {
    isCompactMode: { type: String, state: true },
    compactStyles: { type: Object, state: true },
    localizedStringsPath: { type: String, state: true },
    routePath: { type: String, state: true },
    siteLanguage: { type: String, state: true },
    fullSiteLanguageName: { type: String, state: true },
    lastSelectedItemRootLangISO: { type: String, state: true },
    currentMenuData: { type: Array, state: true },
    currentUid: { type: String, state: true },
    creatorOfPublications: { type: Object, state: true },
  };

  constructor() {
    super();
    this.isCompactMode = store.getState().suttaplexListDisplay;
    this.compactStyles = {};
    this.localizedStringsPath = '/localization/elements/interface';
    this.routePath = store.getState().currentRoute.path;
    this.siteLanguage = store.getState().siteLanguage;
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;
    this.lastSelectedItemRootLangISO = '';
    this.currentMenuData = [];
    this.currentUid = this._getRoutePathLastItem();
    this.creatorOfPublications = new Map();

    // this.#extractUidsFromEditions();
    // this._verifyURL();
    // this._viewModeChanged();
    // this._parseURL();
  }

  firstUpdated() {
    this.#extractUidsFromEditions();
    this._verifyURL();
    this._viewModeChanged();
    this._parseURL();
  }

  _viewModeChanged() {
    this.compactStyles = this.isCompactMode ? navigationCompactModeStyles : null;
  }

  async _parseURL() {
    this.currentUid = this._getRoutePathLastItem();
    if (this.currentUid) {
      this.currentMenuData = await this._fetchMenuData(this.currentUid);
      this.#childrenExists();
      if (!this._menuHasChildren() || this._isPatimokkha(this.currentMenuData[0]?.uid)) {
        dispatchCustomEvent(this, 'sc-navigate', { pathname: `/${this.currentUid}` });
        return;
      }
      this._setToolbarTitle();
      this._createMetaData();
      RefreshNavNew(this.currentUid, true);
    }
  }

  _menuHasChildren() {
    if (!this.currentMenuData || this.currentMenuData.length === 0) {
      return false;
    }
    return (
      this.currentMenuData[0] &&
      this.currentMenuData[0].children &&
      this.currentMenuData[0].children.some(child => ['branch'].includes(child.node_type))
    );
  }

  _verifyURL() {
    this.currentUid = this._getRoutePathLastItem();
    fetch(`${API_ROOT}/suttafullpath/${this.currentUid}`)
      .then(r => r.json())
      .then(suttaFullPath => {
        if (!suttaFullPath || !suttaFullPath.full_path) {
          dispatchCustomEvent(this, 'sc-navigate', { pathname: '/pitaka/sutta' });
        }
        if (`${suttaFullPath.full_path}/${this.currentUid}` !== this.routePath) {
          dispatchCustomEvent(this, 'sc-navigate', { pathname: '/pitaka/sutta' });
        } else {
          return true;
        }
      })
      .catch(error => {
        console.error(error);
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
                  href=${this._genCurrentURL(child.uid, child.has_children)}
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
                          lang=${child.root_lang_iso || this.lastSelectedItemRootLangISO}
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
                          ${this.localize(`interface:${child.uid}EssayTitle`)}
                        </div>
                      </a>
                    `
                  : ''}
                ${this.#relatedPublicationExists(child.uid)
                  ? this.#publicationInfoTemplate(child)
                  : ''}
                ${shortcuts?.includes(child.uid)
                  ? html`
                      <div class="shortcut">
                        <a href="/${child.uid}" class="shortcut-link">
                          ${this.localize('interface:shortcutToFullList')}
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
    fetch(this._computeMenuApiUrl(params.childId))
      .then(r => r.json())
      .then(menuData => {
        this.currentMenuData = menuData;
        this.#childrenExists();
        this._updateLastSelectedItemRootLangISO(this.currentMenuData[0].root_lang_iso);
        if (params.dispatchState) {
          this._setToolbarTitle();
          this._createMetaData();
          if (!this._menuHasChildren() || this._isPatimokkha(this.currentMenuData[0]?.uid)) {
            dispatchCustomEvent(this, 'sc-navigate', {
              pathname: `/${params.childId}`,
            });
          }
        }
        return true;
      })
      .catch(error => {
        console.error(error);
      });
  }

  _setToolbarTitle() {
    if (!this.currentMenuData || this.currentMenuData.length === 0) {
      return;
    }
    this.actions.changeToolbarTitle(this._getTitle());
  }

  _getTitle() {
    return (
      this.currentMenuData[0].root_name ||
      this.currentMenuData[0].translated_name ||
      this.currentMenuData[0].uid
    );
  }

  _createMetaData() {
    if (!this.currentMenuData || this.currentMenuData.length === 0) {
      return;
    }
    const description = this.localize('interface:metaDescriptionText');
    document.dispatchEvent(
      new CustomEvent('metadata', {
        detail: {
          pageTitle: `${this._getTitle()}—navigation`,
          title: `${this._getTitle()}—navigation`,
          description,
        },
      })
    );
  }

  _isPatimokkha(uid) {
    return uid.endsWith('-pm');
  }

  _computeMenuApiUrl(uid) {
    return `${API_ROOT}/menu/${uid}?language=${this.siteLanguage || 'en'}`;
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
      this.#relatedPublicationExists();
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

  _genCurrentURL(lastPath, hasChildren) {
    if (!lastPath) {
      return '';
    }
    if ((typeof hasChildren !== 'undefined' && !hasChildren) || this._isPatimokkha(lastPath)) {
      const { suttaplexListDisplay } = store.getState();
      const urlParams = `?view=${suttaplexListDisplay ? 'dense' : 'normal'}`;
      return `/${lastPath}${urlParams}`;
    }
    const currentURL = window.location.href;
    let cleanURL = '';
    if (currentURL.indexOf(`/${lastPath}`) === -1) {
      cleanURL = `${currentURL.split('?')[0]}/${lastPath}`;
    }
    return cleanURL || currentURL;
  }

  async _fetchMenuData(childId) {
    try {
      const childrenData = await (await fetch(this._computeMenuApiUrl(childId))).json();
      return childrenData;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  render() {
    return html`
      ${navigationNormalModeStyles} ${this.compactStyles}
      <main>${this.cardContentTemplate}</main>
    `;
  }

  updated() {
    this.#addBlurbsClickEvent();
  }

  async #childrenExists() {
    if (!this.currentMenuData || this.currentMenuData.length === 0) {
      return;
    }
    for (const child of this.currentMenuData[0].children) {
      const childrenData = await this._fetchMenuData(child.uid);
      if (
        childrenData[0] &&
        childrenData[0].children &&
        childrenData[0].children.some(item => ['branch'].includes(item.node_type))
      ) {
        const foundChild = this.currentMenuData[0].children.find(x => x.uid === child.uid);
        if (foundChild) {
          foundChild.has_children = true;
        }
      } else {
        const foundChild = this.currentMenuData[0].children.find(x => x.uid === child.uid);
        if (foundChild) {
          foundChild.has_children = false;
        }
        this.requestUpdate();
      }
    }
  }

  #addBlurbsClickEvent() {
    this.shadowRoot.querySelectorAll('.blurb').forEach(element => {
      // eslint-disable-next-line no-param-reassign
      element.onclick = () => {
        element.classList.toggle('blurbShrink');
      };
    });
  }

  #relatedPublicationExists(uid) {
    const isExists = this.allPublicationUid.includes(uid);
    let relatedLanguagePublicationExists = false;
    if (isExists) {
      this.#fetchCreatorInfo(uid);
      relatedLanguagePublicationExists = this.#relatedLanguagePublicationExists(uid);
    }
    return isExists && relatedLanguagePublicationExists;
  }

  #relatedLanguagePublicationExists(uid) {
    const editionId = this.#fetchEditionId(uid);
    return editionId.includes(`-${this.siteLanguage}-`);
  }

  #fetchEditionId(uid) {
    return allEditions.find(edition => edition.uid === uid && edition.edition_id.includes('web'))
      ?.edition_id;
  }

  #fetchCreatorInfo(uid) {
    const editionId = this.#fetchEditionId(uid);
    if (editionId) {
      const creator = editionId.split('-')[2].split('_')[0];
      const creatorInfo = creatorBio.find(item => item.creator_uid === creator);
      const creatorFullName = this.#parseCreatorFullName(creatorInfo);
      this.creatorOfPublications.set(uid, creatorFullName);
    }
  }

  #parseCreatorFullName(creatorInfo) {
    if (!creatorInfo) {
      return '';
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(creatorInfo?.creator_biography, 'text/html');
    const span = doc?.querySelector('span[property="dc:creator"]');
    return span?.textContent;
  }

  #extractUidsFromEditions() {
    this.allPublicationUid = [];
    allEditions.forEach(edition => {
      this.allPublicationUid.push(edition.uid);
    });
    this.allPublicationUid = [...new Set(this.allPublicationUid)];
  }

  #publicationInfoTemplate(leaf) {
    if (this.isCompactMode) {
      return ``;
    }
    return html`
      <style>
        ${navigationPublicationInfoStyles}
      </style>
      <a
        href="https://suttacentral.net/edition/${leaf.uid}/en/sujato"
        class="editions-nav-notice-link"
      >
        <section class="editions-nav-notice">
          <img
            src="/img/publication-pages/${coverImage.get(leaf.uid)}"
            height="160px"
            width="120px"
          />
          <div class="editions-nav-notice-text">
            <div class="editions-nav-notice-lead">
              <cite class="edition-title">${leaf.translated_name?.replace('Collection', '')}</cite>
              <span class="editions-nav-notice-by">by</span>
              <span class="creator">${this.creatorOfPublications.get(leaf.uid)}</span>
            </div>
            <div class="editions-nav-notice-banner">A SuttaCentral Edition</div>
            <div class="editions-nav-notice-description">
              <span class="translation_subtitle"
                >A faithful translation of the ${leaf.root_name}.</span
              >
              <span class="availability"
                >Available in print and multiple digital formats for offline reading.</span
              >
            </div>
          </div>
        </section>
      </a>
    `;
  }
}

customElements.define('sc-navigation-new', SCNavigationNew);
