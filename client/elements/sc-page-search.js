import { LitElement, html, svg } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '@material/mwc-button';
import '@polymer/iron-location/iron-location.js';
import './menus/sc-search-filter-menu.js';
import './addons/sc-error-icon.js';
import './addons/sc-bouncing-loader';
import { icon } from '../img/sc-icon';
import { store } from '../redux-store';
import { LitLocalized } from './addons/localization-mixin';
import { API_ROOT } from '../constants.js';
import { navIndex } from './navigation/sc-navigation-common';
import { dictionarySimpleItemToHtml } from './sc-dictionary-common';

class SCPageSearch extends LitLocalized(LitElement) {
  render() {
    return html`
      <style>
        :host {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-md);
          font-weight: 400;
          line-height: 1.5;

          display: block;

          width: 100%;
          height: calc(100vh - var(--sc-size-xxl));

          color: var(--sc-primary-text-color);
        }

        h2 {
          line-height: 1.25;
        }

        #search_result_list {
          padding: var(--sc-size-xl) 0 var(--sc-size-md);
        }

        .search-results-container {
          margin: 0 3vw var(--sc-size-xxl) 3vw;
        }

        .search-results-main {
          max-width: 720px;
          margin: 0 auto;
          padding-bottom: 64px;
        }

        .search-result-head {
          display: flex;

          color: var(--sc-secondary-text-color);

          justify-content: space-between;
          flex-wrap: wrap;
        }

        .search-result-header {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-h1-md);
          font-weight: 400;
          line-height: 1.25;

          display: inline-block;

          margin: 0 1rem 1rem 0;
        }

        .search-result-term {
          font-family: var(--sc-serif-font);
          font-weight: bold;
        }

        aside {
          color: var(--sc-secondary-text-color);

          font-size: var(--sc-skolar-font-size-s);
        }

        .search-result-item {
          display: flex;
          flex-direction: column;

          border-bottom: var(--sc-border);
        }

        .search-result-item dl a {
          text-decoration: underline;

          color: inherit;

          text-decoration-color: var(--sc-primary-color);
        }

        .search-result-item dl a:hover {
          color: var(--sc-primary-color);
        }

        .search-result-item dl a:visited {
          text-decoration-color: var(--sc-primary-color-dark);
        }

        .search-result-item:focus {
          outline: 0;
        }

        .padded-container {
          display: flex;
          flex-direction: column;

          padding: 0;
        }

        .primary {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          height: 32px;
        }

        .search-result-title {
          font-family: var(--sc-serif-font);
          font-size: var(--sc-skolar-font-size-static-subtitle);
          font-weight: 400;

          overflow: hidden;

          margin: 0;

          white-space: nowrap;
          text-overflow: ellipsis;

          color: var(--sc-primary-accent-color);
        }

        .all-dictionaries {
          display: none;
        }

        .dictionary .all-dictionaries {
          display: inline-flex;
          color: var(--sc-secondary-text-color);
          font-size: var(--sc-skolar-font-size-s);

          flex-direction: row;
          align-items: center;
          gap: 0.5em;
        }
        .icon {
          fill: var(--sc-disabled-text-color);
          height: 20px;
          width: 20px;
        }

        .search-result-division {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-s);
          font-weight: 400;

          overflow: hidden;

          margin: 0;

          white-space: nowrap;
          text-overflow: ellipsis;

          color: var(--sc-secondary-text-color);

          height: 1.5rem;
        }

        .search-result-snippet {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-md);
          font-weight: 400;

          margin: 0 0 1rem 0;
        }

        .search-result-snippet dd {
          margin-left: 0;
        }

        .search-result-snippet dfn {
          font-weight: bold;
          font-style: normal;

          color: var(--sc-primary-color-dark);
        }

        .search-result-link {
          text-decoration: none;

          color: initial;

          padding: 12px 0 8px;
        }

        .search-result-link:hover {
          text-decoration: underline;

          text-decoration-color: var(--sc-primary-accent-color);
        }

        .dictionary {
          margin: 2rem 0;
          padding: 0 clamp(1rem, 3vw, 2rem);

          border-radius: var(--sc-size-sm);
          background-color: var(--sc-secondary-background-color);
          box-shadow: var(--sc-shadow-elevation-1dp);
        }

        .dictionary .search-result-division {
          display: none;
        }

        .dictionary .search-result-title {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-md);
          font-weight: 400;
          font-variant-caps: all-small-caps;
          letter-spacing: var(--sc-caps-letter-spacing);
        }

        .dictionary dfn {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-static-subtitle);
          font-weight: bold;

          color: var(--sc-primary-color-dark);
        }

        .dictionary dfn,
        .highlight,
        .search-result-term,
        .selected-terms-item > a {
          background-color: var(--sc-primary-color-light-transparent);
          color: var(--sc-primary-color-darkest);
        }

        .dictionary dd p {
          margin: 0 0 var(--sc-size-s) 0;
        }

        .dictionary .grammar {
          display: block;

          color: var(--sc-secondary-text-color);

          font-style: italic;
        }

        .dictionary .ref {
          font-family: var(--sc-sans-font);
          font-weight: 600;
          font-style: normal;

          padding: 0 4px;

          white-space: nowrap;
          letter-spacing: normal;

          color: var(--sc-secondary-text-color);
          border-radius: 8px;
          background-color: rgba(159, 158, 157, 0.15);

          font-variant-caps: normal;
        }

        dd ol,
        dd ul {
          margin: 0;
          padding: 0 0 0 1rem;
        }

        li {
          padding-left: clamp(0.25rem, 1vw, 1rem);
        }

        li::marker {
          font-family: var(--sc-sans-font);
          font-weight: bold;

          color: var(--sc-secondary-text-color);
        }

        p + ol,
        p + ul {
          margin: 0.5em 0 1em;
        }

        .google-maps {
          height: 480px;
          margin: var(--sc-size-md-larger) 0;
        }

        .google-maps iframe {
          width: 100%;
          height: 480px;

          border: none;
        }

        .d-none {
          display: none;
        }

        [hidden] {
          display: none !important;
        }

        .loading-indicator {
          font-size: var(--sc-skolar-font-size-s);

          height: 60px;
          margin-top: 25vh;

          text-align: center;
        }

        mwc-button {
          --mdc-theme-primary: var(--sc-primary-accent-color);
          --mdc-theme-on-primary: white;
        }

        #load-more {
          padding: 24px 0;
          display: flex;
          justify-content: center;
        }
      </style>

      ${this.displayDataLoadError} ${this.displayLoader} ${this.onlineTemplate}
      ${this.offLineTemplate} ${this._createMetaData()}
    `;
  }

  get offLineTemplate() {
    return !this.isOnline
      ? html`
          <sc-error-icon type="connect-to-internet"></sc-error-icon>
        `
      : '';
  }

  get displayLoader() {
    return this.loadingResults
      ? html`
          <div class="loading-indicator">
            <sc-bouncing-loader></sc-bouncing-loader>
          </div>
        `
      : '';
  }

  get displayDataLoadError() {
    return this.lastError
      ? html`
          <sc-error-icon type="data-load-error"></sc-error-icon>
        `
      : '';
  }

  get onlineTemplate() {
    return this.isOnline && !this.lastError
      ? html`
          <div class="search-results-container">
            <main class="search-results-main">${this.searchResultTemplate}</main>
          </div>
        `
      : '';
  }

  get searchResultTemplate() {
    return !this.loadingResults
      ? html`
          <div class="search-result-head">
            <h1 class="search-result-header">
              <span class="search-result-number">
                ${this._calculateResultCount(this.resultCount)}
              </span>
              <span class="search-result-description">${this.localize('resultsFor')}</span>
              <span class="search-result-term">${this.searchQuery}</span>
            </h1>
            <sc-search-filter-menu
              class="search-result-filter-menu"
              id="filter_menu"
            ></sc-search-filter-menu>
          </div>
          <aside>Hint: Search e.g. mn34 or sn3.2 to go straight to that sutta.</aside>

          ${this.searchResultListTemplate}
          ${!this._areAllItemsLoaded()
            ? html`
                <div id="load-more">
                  <mwc-button
                    @click="${this._loadMoreData}"
                    unelevated
                    label="${this.localize('loadMore')}"
                  ></mwc-button>
                </div>
              `
            : ''}
        `
      : '';
  }

  get searchResultListTemplate() {
    return this.visibleSearchResults
      ? this.visibleSearchResults.map(
          item => html`
            <div
              class="search-result-item ${this._calculateItemCategory(item)}"
              tabindex="${this.tabIndex}"
            >
              <div class="padded-container">
                <a class="search-result-link" href="${this._calculateLink(item)}">
                  <div class="primary">
                    <h2 class="search-result-title">${this._calculateTitle(item)}</h2>
                    <div class="all-dictionaries">
                      <span>All dictionaries</span>
                      ${icon.arrow_right}
                    </div>
                  </div>
                  <div class="secondary">
                    <p class="search-result-division">
                      ${unsafeHTML(this._calculateDivision(item))}
                    </p>
                  </div>
                </a>
                <div class="secondary">
                  <p class="search-result-snippet">
                    ${unsafeHTML(this._calculateSnippetContent(item.highlight.content))}
                  </p>
                </div>
              </div>
            </div>
          `
        )
      : '';
  }

  static get properties() {
    return {
      // The query to search for
      searchQuery: {
        type: String,
        hasChanged(newVal) {
          if (newVal) {
            return true;
          }
        },
      },
      // The actual query parameters of the search
      searchParams: { type: Object },
      lastSearchResults: { type: Array },
      allSearchResults: { type: Array },
      visibleSearchResults: { type: Array },
      resultCount: { type: Number },
      resultsPerLoad: { type: Number },
      currentPage: { type: Number },
      currentFilter: { type: String },
      searchResultElemHeight: { type: Number },
      localizedStringsPath: { type: String },
      totalLoadedResults: { type: Number },
      isOnline: { type: Boolean },
      dictionaryTitles: { type: Object },
      expansionReturns: { type: Array },
      waitTimeAfterNewWordExpired: { type: Boolean },
      loadingResults: { type: Boolean },
      lastError: { type: Object },
    };
  }

  constructor() {
    super();
    this.searchQuery = store.getState().currentRoute.params.query;
    this.searchParams = store.getState().searchParams;
    this.lastSearchResults = [];
    this.allSearchResults = [];
    this.visibleSearchResults = [];
    this.resultCount = 0;
    this.resultsPerLoad = 20;
    this.currentPage = 0;
    this.currentFilter = 'all';
    this.searchResultElemHeight = 170;
    this.localizedStringsPath = '/localization/elements/sc-page-search';
    this.totalLoadedResults = 0;
    this.isOnline = store.getState().isOnline;
    this.dictionaryTitles = {
      ncped: 'New Concise Pali English Dictionary',
      cped: 'Concise Pali English Dictionary',
      dhammika: 'Nature and the Environment in Early Buddhism by S. Dhammika',
      dppn: 'Dictionary of Pali Proper Names',
      pts: 'PTS Pali English Dictionary',
    };
    this.waitTimeAfterNewWordExpired = true;
    this.loadingResults = true;
    this._updateNav();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('search-filter-changed', this._calculateCurrentFilter);
  }

  shouldUpdate(prevProps) {
    if (prevProps.has('searchQuery')) {
      this._startNewSearchWithNewWord();
    }
    if (prevProps.has('lastSearchResults')) {
      this._populateList();
    }
    return true;
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.searchQuery !== state.currentRoute.params.query) {
      this.searchQuery = state.currentRoute.params.query;
    }
    if (this.searchParams !== state.searchParams) {
      this.searchParams = state.searchParams;
    }
  }

  get actions() {
    return {
      initiateSearch(params) {
        store.dispatch({
          type: 'INITIATE_SEARCH',
          params: params,
        });
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title: title,
        });
      },
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
    };
  }

  // Saves the fetched search results to be displayed in the list.
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
      this.allSearchResults.push(items[i]);
      // If the filter fits, add to visible items
      if (this._belongsToFilterScope(items[i])) {
        this.visibleSearchResults.push(items[i]);
      }
    }
  }

  _loadMoreData() {
    this._loadNextPage();
  }

  _loadNextPage() {
    this.currentPage++;
    this.actions.initiateSearch({
      limit: this.resultsPerLoad,
      offset: this.currentPage * this.resultsPerLoad,
      query: this.searchQuery,
      language: this.language,
      restrict: this.currentFilter,
    });
    this._generateRequest();
  }

  // generates a new search request after a new search-word was typed.
  _startNewSearchWithNewWord() {
    if (!this.isOnline || !this.searchQuery) {
      return;
    }
    this.loadingResults = true;
    this.waitTimeAfterNewWordExpired = false;
    this.currentFilter = 'all';
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
    this.actions.initiateSearch({
      limit: this.resultsPerLoad,
      query: this.searchQuery,
      language: this.language,
      restrict: this.currentFilter,
    });
    this._generateRequest();
  }

  _updateNav() {
    const navIndexesOfType = navIndex.get('searchPage');
    let navArray = store.getState().navigationArray;
    let currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: this.localize('Search'),
      url: `${currentPath}?query=${this.searchQuery}`,
      type: 'searchPage',
    });
    this.actions.setNavigation(navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
  }

  // Clears search result arrays, resets variables
  clearSearchPage() {
    this.visibleSearchResults.splice(0, this.visibleSearchResults.length);
    this.allSearchResults.splice(0, this.allSearchResults.length);
    this.currentPage = 0;
    this.totalLoadedResults = 0;
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
    this._fetchExpansion();
    this._fetchSearchResult();
    this._updateNav();
  }

  async _fetchExpansion() {
    try {
      this.expansionReturns = await (await fetch(this._getExpansionUrl())).json();
    } catch (error) {
      this.lastError = error;
      console.error(error);
    }
  }

  async _fetchSearchResult() {
    let requestUrl = this._getUrl() || '';
    const bindingChar = requestUrl.indexOf('?') >= 0 ? '&' : '?';
    requestUrl = requestUrl + bindingChar + this._getQueryString();
    try {
      const searchResult = await (await fetch(requestUrl)).json();
      this._didRespond(searchResult);
      this._setProperties(searchResult);
    } catch (error) {
      this.lastError = error;
      console.error(error);
    }
  }

  _didRespond(searchResult) {
    const dicResult = searchResult.hits.find(item => item.category === 'dictionary');
    if (dicResult && dicResult.highlight.content[0] === '' && dicResult.highlight.detail) {
      dicResult.highlight.content[0] = dictionarySimpleItemToHtml(dicResult.highlight.detail[0]);
    }
  }

  _setProperties(searchResult) {
    this.lastSearchResults = searchResult.hits;
    this.resultCount = searchResult.total;
    this.waitTimeAfterNewWordExpired = true;
    this.updateComplete.then(() => {
      this.loadingResults = false;
    });
  }

  _getQueryString() {
    const queryParts = [];
    let param;
    let value;

    for (param in this.searchParams) {
      value = this.searchParams[param];
      param = window.encodeURIComponent(param);

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          queryParts.push(param + '=' + window.encodeURIComponent(value[i]));
        }
      } else if (value !== null) {
        queryParts.push(param + '=' + window.encodeURIComponent(value));
      } else {
        queryParts.push(param);
      }
    }
    return queryParts.join('&');
  }

  // listens to the search-menu and changes the items to be displayed accordingly to "all", "root texts",
  // "translations" or "dictionaries"
  _calculateCurrentFilter(event) {
    if (!this.waitTimeAfterNewWordExpired) {
      return;
    }
    this.currentFilter = event.detail.searchView;
    this._startNewSearch();
  }

  // The endless scroll is dependant on a scroll event, but if there's less then 1 item
  // on a search result page, it won't trigger loading more, hence this function:
  _loadMoreIfMinimumNotReached() {
    if (this.visibleSearchResults.length < 1 && !this._areAllItemsLoaded()) {
      this._loadNextPage();
    }
  }

  _areAllItemsLoaded() {
    return (
      (this.resultCount === 0 && this.currentPage > 0) ||
      (this.totalLoadedResults !== 0 && this.totalLoadedResults >= this.resultCount)
    );
  }

  _calculateItemCategory(item) {
    if (item.category === 'dictionary') {
      return item.category;
    }
    if (item.is_root) {
      return 'root-text';
    } else return 'translation';
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
      return acronym.replace(/\/\//, ' (') + ')';
    } else {
      return acronym;
    }
  }

  _transformId(rootId) {
    if (!rootId || !this.expansionReturns || !this.expansionReturns[0]) {
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
          scAcronym += `${expansionData[0][item][0]} ${tail}`;
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

  _getUrl() {
    return `${API_ROOT}/search`;
  }

  _getExpansionUrl() {
    return `${API_ROOT}/expansion`;
  }

  _createMetaData() {
    const description = this.localize('metaDescriptionText');
    const searchResultsText = this.localize('searchResultsText');
    const toolbarTitle = `${this.localize('Search')}: ${this.searchQuery}`;
    document.dispatchEvent(
      new CustomEvent('metadata', {
        detail: {
          pageTitle: toolbarTitle,
          title: `${searchResultsText} ${this.searchQuery}`,
          description: description,
          bubbles: true,
          composed: true,
        },
      })
    );
    this.actions.changeToolbarTitle(toolbarTitle);
  }

  _computeItemDifficulty(difficulty) {
    if (!difficulty) return;
    if (difficulty.name) {
      return difficulty.name;
    } else {
      const levels = { 1: 'beginner', 2: 'intermediate', 3: 'advanced' };
      return levels[difficulty];
    }
  }
}

customElements.define('sc-page-search', SCPageSearch);
