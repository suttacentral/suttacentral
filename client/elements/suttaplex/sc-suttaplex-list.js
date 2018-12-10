import '@polymer/iron-ajax/iron-ajax.js';
import { html, LitElement } from '@polymer/lit-element';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import { API_ROOT } from '../../constants.js';
import { store } from '../../redux-store';
import { partitionAsync } from '../../utils/partitionAsync';
import { LitLocalized } from '../addons/localization-mixin';
import './card/sc-suttaplex.js';
import { suttaplexListCss } from './sc-suttaplex-list.css.js';
import './sc-suttaplex-section-title.js';

let expansionDataCache;

class SCSuttaplexList extends LitLocalized(LitElement) {
  static get properties() {
    return {
      localizedStringsPath: String,
      categoryId: String,
      suttaplexListDisplay: String,
      expansionData: Array,
      suttaplexData: Array,
      networkError: Object,
    }
  }

  get actions() {
    return {
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title: title
        });
      }
    };
  };

  get apiUrl() {
    return `${API_ROOT}/suttaplex/${this.categoryId}?language=${this.language}`;
  };

  get expansionApiUrl() {
    return `${API_ROOT}/expansion`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-navigation-menu';
  }

  isSuttaplex(item) {
    return item.type === 'text';
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
    }
    else {
      const levels = { 1: 'beginner', 2: 'intermediate', 3: 'advanced' };
      return levels[difficulty];
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.categoryId !== state.currentRoute.categoryId) {
      this.categoryId = state.currentRoute.categoryId;
      if (this.categoryId && state.siteLanguage) {
        this._fetchCategory();
      }
    }

    if (this.suttaplexListDisplay !== state.suttaplexListDisplay) {
      this.suttaplexListDisplay = state.suttaplexListDisplay;
    }
  }

  async _fetchCategory() {
    this.suttaplexLoading = true;
    this.networkError = null;

    try {
      let responseData;

      [responseData, this.expansionData] = await Promise.all([
        fetch(this.apiUrl).then(r => r.json()),
        this._fetchExpansionData()
      ]);

      this.suttaplexData = [];
      partitionAsync(responseData, (part) => this.suttaplexData = [...this.suttaplexData, ...part], 15, 100)
        .then(() => this._updateMetaData());
    } catch (e) {
      this.networkError = e;
    }

    this.suttaplexLoading = false;
  }

  async _fetchExpansionData() {
    if (!expansionDataCache) {
      expansionDataCache = await (await fetch(this.expansionApiUrl)).json();
    }

    return expansionDataCache;
  }

  _updateMetaData() {
    if (this.suttaplexData && this.suttaplexData.length) {
      this.actions.changeToolbarTitle(this.suttaplexData[0].original_title);

      let description = this.localize('metaDescriptionText');
      if (this.suttaplexData[0].blurb) {
        description = this.suttaplexData[0].blurb;
      }

      document.dispatchEvent(new CustomEvent('metadata', {
        detail: {
          pageTitle: `${this.suttaplexData[0].original_title}—Suttas and Parallels`,
          title: `${this.suttaplexData[0].original_title}—Suttas and Parallels`,
          description: description,
          bubbles: true,
          composed: true
        }
      }));
    }
  }

  get errorTemplate() {
    return html`
    <div class="network-error">
      <iron-icon class="network-error-icon" title="${this.localize('networkError')}" src="/img/nonetwork.svg"></iron-icon>
      <div>${this.localize('networkError')}</div>
    </div>`;
  }

  suttaplexTemplate(item) {
    return html`
      <sc-suttaplex
        .item="${item}"
        .parallelsOpened="${this.areParallelsOpen(item)}"
        .difficulty="${this.computeItemDifficulty(item.difficulty)}"
        .expansionData="${this.expansionData}"
        .suttaplexListStyle="${this.suttaplexListDisplay ? 'compact' : ''}">
      </sc-suttaplex>`;
  }

  sectionTemplate(item) {
    return html`
      <section class="${this.calculateClass(item.type)}">
        <sc-suttaplex-section-title
          .inputTitle="${item.original_title}"
          .inputText="${item.blurb}"
          .inputType="${item.type}"
          .opened="${this.shouldExpandAll()}">
        </sc-suttaplex-section-title>
      </section>`;
  }

  render() {
    return html`
    ${suttaplexListCss}

    <div class="division-content main">
      <div class="loading-indicator">
        <paper-spinner-lite class="loading-spinner" .active="${this.suttaplexLoading}"></paper-spinner-lite>
      </div>

      ${this.hasError() ? this.errorTemplate : ''}

      ${(this.suttaplexData && this.suttaplexData.map((item) => 
          this.isSuttaplex(item) 
            ? this.suttaplexTemplate(item) 
            : this.sectionTemplate(item))
      )}
    </div>
    `;
  }
}

customElements.define('sc-suttaplex-list', SCSuttaplexList);
