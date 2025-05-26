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
import { reduxActions } from '../addons/sc-redux-actions';

export class SCNavigation extends LitLocalized(LitElement) {
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
  }

  connectedCallback() {
    super.connectedCallback();
    this._viewModeChanged();
  }

  firstUpdated() {
    this.#extractUidsFromEditionsInfo();
    if (document.referrer === '') {
      this._verifyURL();
    }
    this._parseURL();
  }

  _viewModeChanged() {
    this.compactStyles = this.isCompactMode ? navigationCompactModeStyles : null;
  }

  async _parseURL() {
    this.currentUid = this._getRoutePathLastItem();
    if (!this.currentUid) {
      return;
    }
    this.currentMenuData = await this._fetchMenuData(this.currentUid);
    this.#markMenuItemsWithChildren();
    if (!this._menuHasChildren() || this._isPatimokkha(this.currentMenuData?.[0]?.uid)) {
      const pathname = ['sutta', 'vinaya', 'abhidhamma'].includes(this.currentUid)
        ? `/pitaka/${this.currentUid}`
        : `/${this.currentUid}`;
      dispatchCustomEvent(this, 'sc-navigate', { pathname });
      return;
    }
    this._setToolbarTitle();
    this._createMetaData();
    RefreshNavNew(this.currentUid);
  }

  _menuHasChildren() {
    return (
      this.currentMenuData?.[0]?.children?.some(child => child.node_type === 'branch') || false
    );
  }

  _verifyURL() {
    this.currentUid = this._getRoutePathLastItem();
    fetch(`${API_ROOT}/suttafullpath/${this.currentUid}`)
      .then(r => r.json())
      .then(suttaFullPath => {
        if (
          !suttaFullPath?.full_path ||
          `${suttaFullPath.full_path}/${this.currentUid}` !== this.routePath
        ) {
          dispatchCustomEvent(this, 'sc-navigate', { pathname: '/pitaka/sutta' });
          return false;
        }
        return true;
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
    if (!this.currentMenuData?.[0]?.children) {
      return '';
    }

    return html`
      ${this.currentMenuData[0].children.map(
        child => html`
          <section class="card">
            <a
              class="header-link"
              href=${this._genCurrentURL(child.uid, child.has_children)}
              @click=${(e) =>
                this._onCardClick(e, {
                  childId: child.uid,
                  childName: child.acronym || child.translated_name || child.root_name,
                  dispatchState: true,
                })}
            >
              <header>${this.#headerTemplate(child)}</header>
              <md-ripple></md-ripple>
            </a>
            ${this.#blurbTemplate(child)} ${this.#pitakaGuideTemplate(child)}
            ${this.#checkForPublication(child.uid) ? this.#publicationInfoTemplate(child) : ''}
            ${this.#shortcutsTemplate(child)}
          </section>
        `
      )}
    `;
  }

  #headerTemplate(child) {
    return html`
      <span class="header-left">
        <span class="title"> ${child.translated_name || child.root_name || child.uid} </span>
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
      ${this.#yellowBrickRoadCountTemplate(child)}
    `;
  }

  #yellowBrickRoadCountTemplate(child) {
    return child.yellow_brick_road
      ? html`
          <span class="header-right">
            <span class="number-translated">
              <span class="number">${child.yellow_brick_road_count}</span>
              ${this.fullSiteLanguageName}
            </span>
          </span>
        `
      : '';
  }

  #blurbTemplate(child) {
    return child.blurb
      ? html`
          <div class="blurb blurbShrink" id="${child.uid}_blurb">${unsafeHTML(child.blurb)}</div>
        `
      : '';
  }

  #pitakaGuideTemplate(child) {
    return pitakaGuide.get(child.uid)
      ? html`
          <a href="/${pitakaGuide.get(child.uid)}" class="essay-link">
            <div class="essay" id="${child.uid}_essay">
              ${this.localize(`interface:${child.uid}EssayTitle`)}
            </div>
          </a>
        `
      : '';
  }

  #shortcutsTemplate(child) {
    return shortcuts?.includes(child.uid)
      ? html`
          <div class="shortcut">
            <a href="/${child.uid}" class="shortcut-link">
              ${this.localize('interface:shortcutToFullList')}
            </a>
          </div>
        `
      : '';
  }

  async _onCardClick(e, params) {
    if (!this._shouldInterceptClick(e)) {
      return;
    }
    reduxActions.changeLinearProgressActiveState(true);
    fetch(this._computeMenuApiUrl(params.childId))
      .then(r => r.json())
      .then(menuData => {
        this.currentMenuData = menuData;
        this.#markMenuItemsWithChildren();
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
    reduxActions.changeLinearProgressActiveState(false);
  }

  _shouldInterceptClick(e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return false;
    }

    if (e.button !== 0) {
      return false;
    }

    if (e.type !== 'click') {
      return false;
    }

    return true;
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
          pageTitle: `${this._getTitle()}—${this.localize('interface:navigationTitle')}`,
          title: `${this._getTitle()}—${this.localize('interface:navigationTitle')}`,
          description,
        },
      })
    );
  }

  _isPatimokkha(uid) {
    return uid.endsWith('-pm');
  }

  _computeMenuApiUrl(uid) {
    if (!uid) {
      return '';
    }
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
      this.#checkForPublication();
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
      return await (await fetch(this._computeMenuApiUrl(childId))).json();
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

  async #markMenuItemsWithChildren() {
    if (!this.currentMenuData || this.currentMenuData.length === 0) {
      return;
    }
    for (const child of this.currentMenuData[0].children) {
      const childrenData = await this._fetchMenuData(child.uid);
      const hasChildren = childrenData[0]?.children?.some(item => item.node_type === 'branch');
      if (hasChildren) {
        const foundChild = this.currentMenuData[0].children.find(x => x.uid === child.uid);
        if (foundChild) {
          foundChild.has_children = true;
        }
      } else {
        const foundChild = this.currentMenuData[0]?.children?.find(x => x.uid === child.uid);
        if (foundChild) {
          foundChild.has_children = false;
        }
        this.requestUpdate();
      }
    }
  }

  #addBlurbsClickEvent() {
    this.shadowRoot.querySelectorAll('.blurb').forEach(element => {
      element.onclick = () => {
        element.classList.toggle('blurbShrink');
      };
    });
  }

  #checkForPublication(uid) {
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
      const match = editionId.match(/-(\w+)_/);
      if (match) {
        const creator = match[1];
        const creatorInfo = creatorBio.find(item => item.creator_uid === creator);
        const creatorFullName = this.#parseCreatorFullName(creatorInfo);
        const langIso = editionId.split('_')[0]?.split('-')?.reverse()[1];
        this.creatorOfPublications.set(uid, { creatorUid: creator, creatorFullName, langIso });
      }
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

  #extractUidsFromEditionsInfo() {
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
        href="/edition/${leaf.uid}/${this.creatorOfPublications.get(leaf.uid)?.langIso ||
        'en'}/${this.creatorOfPublications.get(leaf.uid)?.creatorUid}"
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
              <span class="creator"
                >${this.creatorOfPublications.get(leaf.uid)?.creatorFullName}</span
              >
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

customElements.define('sc-navigation', SCNavigation);
