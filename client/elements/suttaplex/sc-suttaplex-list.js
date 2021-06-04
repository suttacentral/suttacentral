import { html, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';
import { partitionAsync } from '../../utils/partitionAsync';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { suttaplexListCss } from './sc-suttaplex-list.css.js';
import './sc-suttaplex-section-title';
import '../addons/sc-error-icon';
import('./card/sc-suttaplex.js');
import {
  navIndex,
  RefreshNav,
  setNavigation,
  setCurrentNavPosition,
} from '../navigation/sc-navigation-common';

class SCSuttaplexList extends LitLocalized(LitElement) {
  static get properties() {
    return {
      localizedStringsPath: String,
      categoryId: String,
      suttaplexListDisplay: String,
      suttaplexData: Array,
      networkError: Object,
    };
  }

  get actions() {
    return {
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title: title,
        });
      },
      changeLinearProgressActiveState(active) {
        store.dispatch({
          type: 'CHANGE_LINEAR_PROGRESS_ACTIVE_STATE',
          linearProgressActive: active,
        });
      },
    };
  }

  get apiUrl() {
    return `${API_ROOT}/suttaplex/${this.categoryId}?language=${this.language}`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-navigation-menu';
    this.siteLanguage = store.getState().siteLanguage;
  }

  isSuttaplex(item) {
    return item.type === 'leaf';
  }

  shouldExpandAll() {
    return this.suttaplexData.length <= 3;
  }

  hasError() {
    return this.networkError || (this.suttaplexData && this.suttaplexData.length === 0);
  }

  calculateClass(itemType) {
    return itemType === 'grouping' ? 'node' : 'vagga-node';
  }

  // Close parallels when navigating to new page
  areParallelsOpen() {
    return this.suttaplexData.length === 1;
  }

  computeItemDifficulty(difficulty) {
    if (!difficulty) return;
    if (difficulty.name) {
      return difficulty.name;
    } else {
      const levels = { 1: 'beginner', 2: 'intermediate', 3: 'advanced' };
      return levels[difficulty];
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (
      this.categoryId !== state.currentRoute.params.categoryId ||
      this.siteLanguage !== state.siteLanguage
    ) {
      this.categoryId = state.currentRoute.params.categoryId;
      this.siteLanguage = state.siteLanguage;
      if (this.categoryId && state.siteLanguage) {
        this._fetchCategory();
      }

      let forceRefresh = false;
      if (this.siteLanguage !== state.siteLanguage) {
        this.siteLanguage = state.siteLanguage;
        forceRefresh = true;
      }

      RefreshNav(this.categoryId, true);
    }

    if (this.suttaplexListDisplay !== state.suttaplexListDisplay) {
      this.suttaplexListDisplay = state.suttaplexListDisplay;
    }
  }

  async _fetchCategory() {
    this.suttaplexLoading = true;
    this.actions.changeLinearProgressActiveState(this.suttaplexLoading);
    this.networkError = null;

    try {
      const responseData = await fetch(this.apiUrl).then(r => r.json());

      this.suttaplexData = [];
      partitionAsync(
        responseData,
        part => (this.suttaplexData = [...this.suttaplexData, ...part]),
        15,
        100
      ).then(() => this._updateMetaData());
    } catch (e) {
      this.networkError = e;
    }

    this.suttaplexLoading = false;
    this.actions.changeLinearProgressActiveState(this.suttaplexLoading);
  }

  _updateMetaData() {
    if (this.suttaplexData && this.suttaplexData.length) {
      this.actions.changeToolbarTitle(this.suttaplexData[0].original_title);

      let description = this.localize('metaDescriptionText');
      if (this.suttaplexData[0].blurb) {
        description = this.suttaplexData[0].blurb;
      }

      const navArray = store.getState().navigationArray;
      const currentNav = navArray.find(x => x !== null && x.groupId === this.suttaplexData[0].uid);
      if (this.suttaplexData[0].type === 'leaf' || !currentNav) {
        this._updateNav();
      }

      document.dispatchEvent(
        new CustomEvent('metadata', {
          detail: {
            pageTitle: `${this.suttaplexData[0].original_title}—Suttas and Parallels`,
            title: `${this.suttaplexData[0].original_title}—Suttas and Parallels`,
            description: description,
            bubbles: true,
            composed: true,
          },
        })
      );
    }
  }

  _updateNav() {
    const navIndexesOfType = navIndex.get('sutta');
    const navArray = store.getState().navigationArray;
    navArray[navIndexesOfType.index] = {
      title:
        this.suttaplexData[0].acronym ||
        this.suttaplexData[0].translated_title ||
        this.suttaplexData[0].original_title,
      url: store.getState().currentRoute.path,
      type: navIndexesOfType.type,
    };
    setNavigation(navArray);
    setCurrentNavPosition(navIndexesOfType.position);
  }

  suttaplexTemplate(item) {
    return html`
      <sc-suttaplex
        .item="${item}"
        .parallelsOpened="${this.areParallelsOpen(item)}"
        .difficulty="${this.computeItemDifficulty(item.difficulty)}"
        .suttaplexListStyle="${this.suttaplexListDisplay ? 'compact' : ''}"
      ></sc-suttaplex>
    `;
  }

  sectionTemplate(item) {
    return html`
      <section class="${this.calculateClass(item.type)}">
        <sc-suttaplex-section-title
          .inputTitle="${item.translated_title || item.original_title}"
          .inputText="${item.blurb}"
          .inputType="${item.type}"
          .label="${this.localize('expandSection')}"
          .opened="${this.shouldExpandAll()}"
        ></sc-suttaplex-section-title>
      </section>
    `;
  }

  render() {
    return html`
      ${suttaplexListCss}

      <div class="division-content main">
        ${this.hasError() ? html` <sc-error-icon type="no-network"></sc-error-icon> ` : ''}
        ${this.suttaplexData &&
        repeat(
          this.suttaplexData,
          item => item.key,
          item =>
            this.isSuttaplex(item) ? this.suttaplexTemplate(item) : this.sectionTemplate(item)
        )}
      </div>
    `;
  }
}

customElements.define('sc-suttaplex-list', SCSuttaplexList);
