import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-location/iron-location.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-scroll-threshold/iron-scroll-threshold.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

import './menus/sc-search-filter-menu.js';
import './suttaplex/sc-suttaplex.js';
import { ReduxMixin } from '/redux-store.js';
import { Localized } from './addons/localization-mixin.js';
import { API_ROOT } from '../constants.js';

/*
The search page opens when a search string is typed into the search-input-box in the toolbar.

The loading is done within an iron-scroll-threshold in case there are very large numbers of results.

If the results are in more than one category of root texts, translations, and dictionaries, and there are more
than ten results in total, a dropdown selection menu appears at the top.
*/

class SCPageSearch extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        width: 100%;
        height: calc(100% - var(--sc-size-xxl));
      }

      #search_result_list {
        padding: var(--sc-size-xl) 0 var(--sc-size-md);
      }

      .suttaplex-item {
          margin-top: var(--sc-size-xl);
          margin-bottom: calc(-1 * var(--sc-size-md));
      }

      .search-results-container {
        padding: var(--sc-size-xxl) 0;
      }

      .search-results-main {
        max-width: 720px;
        margin: 0 auto;
      }

      .search-result-head {
        color: var(--sc-secondary-text-color);
        padding: 0 var(--sc-size-md);
        display: flex;
        justify-content: space-between;
      }

      .search-result-header {
        @apply --paper-font-display1;
        display: inline-block;
        margin: 0;
      }

      .search-result-term {
        @apply --sc-serif-font;
        font-weight: bold;
        color: var(--sc-primary-accent-color);
      }

      .search-result-item {
        border-bottom: var(--sc-border);
        @apply --layout-horizontal;
      }

      .search-result-item dl a {
        @apply --sc-inline-link;
      }

      .search-result-item dl a:hover {
        @apply --sc-inline-link-hover;
      }

      .search-result-item dl a:visited {
        @apply --sc-inline-link-visited;
      }

      .search-result-item:focus {
        outline: 0;
        background: linear-gradient(to right, var(--sc-primary-accent-color) 4px, transparent 4px);
      }

      .padded-container {
        @apply --layout-flex;
        @apply --layout-vertical;
        padding: 0 var(--sc-size-md);
      }

      .search-result-title {
        @apply --paper-font-headline;
        @apply --sc-serif-font;
        color: var(--sc-primary-accent-color);
        margin: 22px 0 0 0;
      }

      .search-result-division {
        @apply --paper-font-body2;
        color: var(--sc-secondary-text-color);
        margin: 0 0 var(--sc-size-md);
        white-space: nowrap;
        overflow: hidden;
      }

      .search-result-snippet {
        @apply --sc-paper-font-body;
        margin: 0 0 20px 0;
      }

      .search-result-snippet dd {
        margin-left: 0;
      }

      .search-result-snippet dfn {
        font-style: normal;
        font-weight: bold;
      }

      .search-result-filter-menu {
        margin-top: -20px;
      }

      .search-result-link {
        text-decoration: none;
        color: initial;
      }

      .dictionary {
        background-color: var(--sc-secondary-background-color);
        @apply --shadow-elevation-2dp;
        border-radius: var(--sc-size-xxs);
      }

      .dictionary .search-result-division {
        display: none;
      }

      .dictionary .search-result-title {
        @apply --paper-font-subhead;
      }

      .dictionary dfn {
       @apply --paper-font-headline;
       font-weight: bold;
      }

      .dictionary dd p {
        margin: 0 0 var(--sc-size-s) 0;
      }

      .dictionary .case {
        color: var(--sc-secondary-text-color);
        @apply --sc-all-small-caps;
        display: block;
      }

      .dictionary .ref {
        @apply --sc-skolar-font-size-s;
        color: var(--sc-secondary-text-color);
        background-color: var(--sc-textual-info-background-color);
        border-radius: var(--sc-size-xxs);
        padding: var(--sc-size-xs) var(--sc-size-sm) var(--sc-size-xxs);
        white-space: nowrap;
      }

      .paper-spinner {
        @apply --center;
        --paper-spinner-color: var(--sc-primary-color);
      }

      .google-maps {
        height: 480px;
        margin: var(--sc-size-md-larger) 0;
      }

      .google-maps iframe {
        height: 480px;
        width: 100%;
        border: none;
      }

      .d-none {
        display: none;
      }

      [hidden] {
        display: none !important;
      }

      .network-error {
        @apply --center;
        @apply --sc-sans-font;
        @apply --sc-skolar-font-size-static-subtitle;
        color: var(--sc-secondary-text-color);
        text-align: center;
      }

      .network-error-icon {
        width: var(--sc-size-xxl);
        height: var(--sc-size-xxl);
      }
    </style>

    <iron-ajax id="ajax" url="[[_getUrl()]]" params="[[searchParams]]" handle-as="json" loading="{{loadingResults}}" on-response="_didRespond"></iron-ajax>
    
    <iron-ajax id="uid_expansion_ajax" url="[[_getExpansionUrl()]]" handle-as="json" last-response="{{expansionReturns}}"></iron-ajax>

    <paper-spinner-lite class="paper-spinner" active="[[loadingResults]]"></paper-spinner-lite>

    <template is="dom-if" if="[[isOnline]]">
      <div class="search-results-container">
        <main class="search-results-main">
          <template is="dom-if" if="[[!loadingResults]]">
            <div class="search-result-head">
              <h1 class="search-result-header">
                <span class="search-result-number">[[_calculateResultCount(resultCount)]]</span>
                <span class="search-result-description">{{localize('resultsFor')}}</span>
                <span class="search-result-term">[[searchQuery]]</span>
              </h1>
                <sc-search-filter-menu class="search-result-filter-menu" id="filter_menu"></sc-search-filter-menu>
            </div>
          </template>

            <div class="suttaplex-item">
                <sc-suttaplex item="[[suttaplex]]" parallels-opened="[[false]]" difficulty="[[_computeItemDifficulty(suttaplex.difficulty)]]" expansion-data="[[expansionReturns]]">
                </sc-suttaplex>
            </div>

            <iron-scroll-threshold id="scroll_threshold" on-lower-threshold="_loadMoreData" scroll-target="document">

                <iron-list id="search_result_list" items="{{visibleSearchResults}}" as="item" scroll-target="document">
              <template>
                <div class$="search-result-item [[_calculateItemCategory(item)]]" tabindex$="[[tabIndex]]">
                  <div class="padded-container">
                    <a class="search-result-link" href="[[_calculateLink(item)]]">
                      <div class="primary">
                        <h2 class="search-result-title">[[_calculateTitle(item)]]</h2>
                      </div>
                      <div class="secondary">
                        <p class="search-result-division" inner-h-t-m-l="[[_calculateDivision(item)]]"></p>
                      </div>
                    </a>
                    <div class="secondary">
                      <p class="search-result-snippet" inner-h-t-m-l="{{_calculateSnippetContent(item.highlight.content)}}"></p>
                    </div>
                  </div>
                </div>
              </template>
            </iron-list>

          </iron-scroll-threshold>

        </main>
      </div>
    </template>

    <template is="dom-if" if="[[!isOnline]]">
      <div class="network-error">
        <iron-icon class="network-error-icon" title="{{localize('networkError')}}" src="/img/nonetwork.svg"></iron-icon>
        <div>{{localize('offline')}}</div>
      </div>
    </template>

    [[_createMetaData(searchQuery, localize)]]`;
  }

  static get properties() {
    return {
      // The query to search for
      searchQuery: {
        type: String,
        value: '',
        statePath: 'currentRoute.__queryParams.query',
        observer: '_startNewSearchWithNewWord'
      },
      // The actual query parameters of the search
      searchParams: {
        type: Object,
        statePath: 'searchParams'
      },
      lastSearchResults: {
        type: Array,
        value: [],
        observer: '_populateList'
      },
      allSearchResults: {
        type: Array,
        value: []
      },
      visibleSearchResults: {
        type: Array,
        value: []
      },
      resultCount: {
        type: Number,
        value: 0
      },
      // Number of items to be loaded each time the scroll threshold is reached
      resultsPerLoad: {
        type: Number,
        value: 20
      },
      currentPage: {
        type: Number,
        value: 0
      },
      currentFilter: {
        type: String,
        value: 'all'
      },
      searchResultElemHeight: {
        type: Number,
        value: 170
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-page-search'
      },
      totalLoadedResults: {
        type: Number
      },
      isOnline: {
        type: Boolean,
        value: true
      },
      dictionaryTitles: {
        type: Object,
        value: {
          'ncped': 'New Concise Pali English Dictionary',
          'cped': 'Concise Pali English Dictionary',
          'dhammika': 'Nature and the Environment in Early Buddhism by S. Dhammika',
          'dppn': 'Dictionary of Pali Proper Names',
          'pts': 'PTS Pali English Dictionary'
        }
      },
      suttaplex: {
        type: Array
      },
      expansionReturns: {
        type: Array
      },
      waitTimeAfterNewWordExpired: {
        type: Boolean,
        value: true
      }
    }
  }

  static get actions() {
    return {
      initiateSearch(params) {
        return {
          type: 'INITIATE_SEARCH',
          params: params
        };
      }
    }
  }

  ready() {
    super.ready();
    this.addEventListener('search-filter-changed', this._calculateCurrentFilter);
    window.addEventListener('load', this._updateOnlineStatus.bind(this));
    window.addEventListener('online', this._updateOnlineStatus.bind(this));
    window.addEventListener('offline', this._updateOnlineStatus.bind(this));
  }

  // After results have been loaded into memory, pushes items to an array.
  // After first load, the lastSearchResults is equal to all the items in the
  // search results and _populateList is called.
  _didRespond(e) {
    const results = e.detail.response;
    this.suttaplex = results.suttaplex;
    this.lastSearchResults = results.hits;
    this.resultCount = results.total;
    this.set('waitTimeAfterNewWordExpired', true);
  }

  // Saves the fetched search results to be displayed in the iron-list.
  // Automatically called after the lastSearchResults array is updated in _didRespond.
  _populateList() {
    const items = this.lastSearchResults;
    if (items.length === 0) {
      return;
    }
    for (let i = 0; i < items.length; i++) {
      if (!items[i]) {
        return;
      }
      this.totalLoadedResults++;
      this.push('allSearchResults', items[i]);
      // If the filter fits, add to visible items
      if (this._belongsToFilterScope(items[i])) {
        this.push('visibleSearchResults', items[i]);
      }
    }
  }

  // Determines how the iron-scroll-threshold pushes the items to the iron-list
  // depending on the number of items to be loaded and on previously set parameters.
  _loadMoreData() {
    this.shadowRoot.querySelector('#scroll_threshold').clearTriggers();
    // Don't load once all items have already been loaded.
    const searchListNode = this.shadowRoot.querySelector('#search_result_list');
    if (!searchListNode || searchListNode.items.length === this.resultCount) {
      return;
    }
    this._loadNextPage();
  }

  _loadNextPage() {
    this.currentPage++;
    this.dispatch('initiateSearch', {
      limit: this.resultsPerLoad,
      offset: (this.currentPage * this.resultsPerLoad),
      query: this.searchQuery,
      language: this.language,
      restrict: this.currentFilter
    });
    this._generateRequest();
  }

  // generates a new search request after a new search-word was typed.
  _startNewSearchWithNewWord() {
    if (!this.isOnline || !this.searchQuery) {
      return;
    }
    this.set('waitTimeAfterNewWordExpired', false);
    this.set('currentFilter', 'all');
    const filterMenu = this.shadowRoot.querySelector('#filter_menu');
    if (filterMenu) {
      filterMenu.resetFilter();
    }
    this._startNewSearch();
  }

  // generates a new search request.
  _startNewSearch() {
    if (!this.isOnline || !this.searchQuery) {
      return;
    }
    this.clearSearchPage();
    this.dispatch('initiateSearch', {
      limit: this.resultsPerLoad,
      query: this.searchQuery,
      language: this.language,
      restrict: this.currentFilter
    });
    this._generateRequest();
  }

  // Clears search result arrays, resets variables
  clearSearchPage() {
    this.splice('visibleSearchResults', 0, this.visibleSearchResults.length);
    this.splice('allSearchResults', 0, this.allSearchResults.length);
    this.set('currentPage', 0);
    this.set('totalLoadedResults', 0);
  }

  // Checks if the item's category fits in the current filter.
  _belongsToFilterScope(item) {
    return this._calculateItemCategory(item) === this.currentFilter || this.currentFilter === 'all';
  }

  // Formats the search result description snippet
  _calculateSnippetContent(description) {
    return description.join(' ... ');
  }

  // Calls the input results when page is loaded
  _generateRequest() {
    if (!this.searchParams || !this.searchQuery || this._areAllItemsLoaded()) {
      return;
    }
    this.$.uid_expansion_ajax.generateRequest();
    this.shadowRoot.querySelector('#ajax').generateRequest();
  }

  // listens to the search-menu and changes the items to be displayed accordingly to "all", "root texts",
  // "translations" or "dictionaries"
  _calculateCurrentFilter(event) {
    if (!this.waitTimeAfterNewWordExpired) {
      return;
    }
    let selectedView;
    switch (event.detail.searchView) {
      case 1:
        selectedView = 'root-text';
        break;
      case 2:
        selectedView = 'translation';
        break;
      case 3:
        selectedView = 'dictionary';
        break;
      default:
        selectedView = 'all';
    }
    this.currentFilter = selectedView;
    this._startNewSearch();
  }

  // The endless scroll is dependant on a scroll event, but if there's less then 1 item
  // on a search result page, it won't trigger loading more, hence this function:
  // TODO: perform new search on filter change
  _loadMoreIfMinimumNotReached() {
    if (this.visibleSearchResults.length < 1 && !this._areAllItemsLoaded()) {
      this._loadNextPage();
    }
  }

  _areAllItemsLoaded() {
    return (this.resultCount === 0 && this.currentPage > 0) ||
      (this.totalLoadedResults !== 0 && this.totalLoadedResults >= this.resultCount);
  }

  _calculateItemCategory(item) {
    if (item.category === 'dictionary') {
      return item.category;
    }
    if (item.is_root) {
      return 'root-text';
    }
    else return 'translation';
  }

  // Determines the number of search results that have been found.
  _calculateResultCount(data) {
    return data ? data : 0;
  }

  // If there is no title in the database, the division is the title
  _calculateTitle(item) {
    if (item.category === 'dictionary') {
      return this.dictionaryTitles[item.heading.division];
    }
    return item.heading.title ? item.heading.title : this._getDivision(item);
  }

  // If there is a title, the division is the subtitle
  _calculateDivision(item) {
    return `${this._getDivision(item)} — ${item.author}`;
  }

  _getDivision(item) {
    return item.acronym ? this._convertAcronym(item.acronym) : this._transformId(item.uid);
  }

  _convertAcronym(acronym) {
    if (acronym.match(/\/\//)) {
      return acronym.replace(/\/\//, " (") + ")";
    } else {
      return acronym;
    }
  }

  _transformId(rootId) {
    if (!rootId || !this.expansionReturns) {
      return '';
    }
    const expansionData = this.expansionReturns;
    let scAcronym = '';
    const uidParts = rootId.split('-');
    let tail = '';
    try {
      uidParts.forEach(item => {
        if (!expansionData[0][item]) {
          const tailMatch = item.match(/\d+.*/g);
          if (tailMatch) tail = tailMatch[0] + '–';
          const itemMatch = item.match(/[a-z]*/g);
          if (itemMatch) item = itemMatch[0];
        }
        if (item && expansionData[0][item]) {
          scAcronym += `${expansionData[0][item][0]} ${tail}`
        } else {
          scAcronym += tail;
        }
      });
      return scAcronym.replace(/–\s*$/, '');
    } catch (e) {
      console.error(e);
      return rootId;
    }
  }

  _calculateLink(item) {
    return item.url;
  }

  _updateOnlineStatus() {
    this.isOnline = navigator.onLine;
  }

  _getUrl() {
    return `${API_ROOT}/search`;
  }

  _getExpansionUrl() {
    return `${API_ROOT}/expansion`;
  }

  _createMetaData(searchWord, localize) {
    const description = localize('metaDescriptionText');
    const searchResultsText = localize('searchResultsText');

    document.dispatchEvent(new CustomEvent('metadata', {
      detail: {
        pageTitle: `Search: ${searchWord}`,
        title: `${searchResultsText} ${searchWord}`,
        description: description,
        bubbles: true,
        composed: true
      }
    }));
  }

  _computeItemDifficulty(difficulty) {
    if (!difficulty) return;
    if (difficulty.name) {
      return difficulty.name;
    }
    else {
      const levels = { 1: 'beginner', 2: 'intermediate', 3: 'advanced' };
      return levels[difficulty];
    }
  }
}

customElements.define('sc-page-search', SCPageSearch);
