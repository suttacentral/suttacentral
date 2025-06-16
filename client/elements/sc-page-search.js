import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';
import '@material/web/button/filled-button';
import '@material/web/iconbutton/icon-button';
import '@material/web/iconbutton/filled-tonal-icon-button';
import '@material/web/textfield/filled-text-field';
import '@material/web/switch/switch';

import './addons/sc-error-icon';
import './addons/sc-progress';
import { icon } from '../img/sc-icon';
import { store } from '../redux-store';
import { LitLocalized } from './addons/sc-localization-mixin';
import { API_ROOT } from '../constants';
import { dictionarySimpleItemToHtml } from './sc-dictionary-common';
import { SCPageSearchStyles, searchResultTableViewStyles } from './styles/sc-page-search-styles';
import { SCUtilityStyles } from './styles/sc-utility-styles';
import { dispatchCustomEvent } from '../utils/customEvent';
import { reduxActions } from './addons/sc-redux-actions';
import { extractSelectedLangsName } from './addons/sc-functions-miscellaneous';

import(
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  './suttaplex/card/sc-suttaplex.js'
);

import(
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  './sc-map.js'
);

export class SCPageSearch extends LitLocalized(LitElement) {
  static properties = {
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
    originLastSearchResults: { type: Array },
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
    suttaplex: { type: Array },
    expansionReturns: { type: Array },
    waitTimeAfterNewWordExpired: { type: Boolean },
    loadingResults: { type: Boolean },
    lastError: { type: Object },
    displayedLanguages: { type: Array },
    displayHintOfNoResultInSelectedLanguages: { type: Boolean },
    languagesOfFoundResult: { type: String },
    matchPartial: { type: Boolean },
    priorityAuthors: { type: Object },
    isCompactMode: { type: String },
  };

  constructor() {
    super();
    this.searchQuery = store.getState().currentRoute.params.query;
    this.searchParams = store.getState().searchParams;
    this.lastSearchResults = [];
    this.originLastSearchResults = [];
    this.allSearchResults = [];
    this.visibleSearchResults = [];
    this.resultCount = 0;
    this.resultsPerLoad = 50;
    this.currentPage = 0;
    this.currentFilter = 'all';
    this.searchResultElemHeight = 170;
    this.localizedStringsPath = '/localization/elements/search';
    this.totalLoadedResults = 0;
    this.isOnline = store.getState().isOnline;
    this.dictionaryTitles = {
      ncped: 'New Concise Pali English Dictionary',
      cped: 'Concise Pali English Dictionary',
      dhammika: 'Nature and the Environment in Early Buddhism by S. Dhammika',
      dppn: 'Dictionary of Pali Proper Names',
      pts: 'PTS Pali English Dictionary',
      dpd: 'Digital Pāḷi Dictionary',
      ddb: 'Digital Dictionary of Buddhism'
    };
    this.suttaplex = [];
    this.expansionReturns = [];
    this.waitTimeAfterNewWordExpired = true;
    this.loadingResults = true;
    this.displayedLanguages = store.getState().searchOptions.displayedLanguages;
    this.displayHintOfNoResultInSelectedLanguages = false;
    this.matchPartial = store.getState().searchOptions.matchPartial;
    this.siteLanguage = store.getState().siteLanguage;
    this.fullSiteLanguageName = store.getState().fullSiteLanguageName;

    this.addEventListener('click', e => {
      this.#hideRelatedTopSheets();
    });

    reduxActions.changeLinearProgressActiveState(this.loadingResults);
    this.priorityAuthors = new Map([['en', 'sujato'], ['de', 'sabbamitta']]);
    this.isCompactMode = store.getState().suttaplexListDisplay;
    this.matchPartial = store.getState().searchOptions.matchPartial;

    this._fetchLanguageIsoCodes();
  }

  #hideRelatedTopSheets() {
    const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    scActionItems?.hideTopSheets();
  }

  static styles = [searchResultTableViewStyles, SCPageSearchStyles, SCUtilityStyles];

  render() {
    return html`
      ${this.displayDataLoadError} ${this.offLineTemplate} ${this.#searchResultByAuthorTemplate()}
      ${this.#searchResultByVolpageTemplate()} ${this.#searchResultByCollectionTemplate()}
      ${this.#searchResultByListAuthorsTemplate()} ${this.generalSearchResultTemplate}
      ${this.#searchResultByReferenceTemplate()} ${this.#searchResultByListLanguageTemplate()}
    `;
  }

  noResultTemplate() {
    if (this.resultCount !== 0) {
      return '';
    }
    const { displayedLanguages } = store.getState().searchOptions;
    const selectedLangs = displayedLanguages.filter(item => item.checked);
    if (!selectedLangs.some(item => item.uid === this.siteLanguage)) {

      return html`
        <p>
          <a class="search-result-link search-again-link" @click=${this.handleClickEvent}>Search again including ${this.fullSiteLanguageName}.</a>
          <br>Or consider adding root languages
        </p>
      `;
    }

    return html`<p class="no-result-prompt">${unsafeHTML(this.localizeEx('search:noResult', 'searchTerm', this.searchQuery))}</p>`;
  }

  handleClickEvent() {
    this.enableSiteLanguageInSearch(this.siteLanguage);
    this._startSearch();
  }

  enableSiteLanguageInSearch(langUid) {
    this.displayedLanguages.forEach(item => {
      if (item.uid === langUid) {
        item.checked = true;
      }
    });
    reduxActions.setSearchDisplayLanguage(this.displayedLanguages);
  }

  get offLineTemplate() {
    return this.isOnline ? '' : html` <sc-error-icon type="connect-to-internet"></sc-error-icon> `;
  }

  get displayDataLoadError() {
    return this.lastError ? html` <sc-error-icon type="data-load-error"></sc-error-icon> ` : '';
  }

  get searchResultHeadTemplate() {
    return html`
      <md-filled-text-field
        id="search_input"
        type="search"
        label="${this.localize('search:inputSearchTerm')}"
        minlength="2"
        maxlength="100"
        @keypress=${this.#keypressHandler}
      >
        <md-icon slot="trailing-icon" @click=${this._startSearch}> ${icon.search} </md-icon>
      </md-filled-text-field>
      ${
        extractSelectedLangsName(
          store.getState().searchOptions.displayedLanguages,
          this.localize('autocomplete:change'),
          true
        )
      }
      ${this.#searchOptionsTemplate()}
    `;
  }

  #isSpecialSearch() {
    return this.#isSearchByAuthor() ||
      this.#isSearchByVolpage() ||
      this.#isSearchByCollection() ||
      this.#isSearchByListAuthors() ||
      this.#isSearchByReference() ||
      this.#isSearchByListLanguage();
  }

  #searchOptionsTemplate() {
    return html`
      <div class="search-options">
        <label>
          ${this.localize('search:matchPartial')}
          <md-switch
            ?selected=${this.matchPartial}
            @change=${this.#onMatchTypeChanged}
            ?icons=${true}
          >
          </md-switch>
        </label>
      </div>
    `;
  }

  #onMatchTypeChanged(e) {
    reduxActions.setSearchMatchType(e.target.selected);
    window.location.reload();
  }

  #keypressHandler({ key }) {
    const approved = this.shadowRoot.getElementById('search_input')?.reportValidity();
    if (key === 'Enter' && approved) {
      this._startSearch();
    }
  }

  _startSearch() {
    let searchQuery = this.shadowRoot.getElementById('search_input').value;
    if (searchQuery) {
      searchQuery = searchQuery.replace(/ /g, '+')
      dispatchCustomEvent(this, 'sc-navigate', { pathname: `/search?query=${searchQuery}`});
      this.searchQuery = searchQuery;
      this.#startNewSearch();
    }
  }

  get loadMoreButtonTemplate() {
    return this.resultCount === 0 || this.resultCount <= this.resultsPerLoad || this.#areAllItemsLoaded()
      ? ''
      : html`
          <div id="load-more">
            <md-filled-button @click=${this.#loadMoreData}>
              ${this.localize('search:loadMore')}
            </md-filled-button>
          </div>
          <div id="load-more-progress">
            <sc-progress
              .type=${'circular'}
              .active=${this.loadMoreButtonClicked}
            ></sc-progress>
          </div>
        `;
  }

  get suttaplexTemplate() {
    return html`
      <div class="dictionary-snippet-card suttaplex">
        ${this.suttaplex?.map(
          item => html`
            <sc-suttaplex
              .item=${item}
              .suttaplexListStyle=${this.isCompactMode ? 'compact' : ''}
              .parallels-opened=${false}
              .difficulty=${this.#computeItemDifficulty(item?.difficulty ? item.difficulty : '')}
              .expansion-data=${this.expansionReturns}
            ></sc-suttaplex>
          `
        )}
      </div>
    `;
  }

  get generalSearchResultTemplate() {
    return this.isOnline &&
      !this.lastError &&
      !this.#isSearchByAuthor() &&
      !this.#isSearchByVolpage() &&
      !this.#isSearchByCollection() &&
      !this.#isSearchByListAuthors() &&
      !this.#isSearchByReference() &&
      !this.#isSearchByListLanguage()
      ? html`
          <div class="search-results-container">
            <main class="search-results-main">${this.searchResultTemplate}</main>
          </div>
        `
      : '';
  }

  get searchResultTemplate() {
    return this.loadingResults
      ? ''
      : html`
          <section class="search-result-head">${this.searchResultHeadTemplate}${this.#searchFilterErrorTemplate()}${this.noResultTemplate()}</section>
          <div class="all-search-results">
            <section class="primary-search-results">
              ${this.searchResultListTemplate} ${this.loadMoreButtonTemplate}
            </section>
            <section class="additional-search-results">
              ${this.dictionaryTemplate} ${this.fuzzyDictionaryTemplate} ${this.suttaplexTemplate}
            </section>
          </div>
        `;
  }

  get searchResultListTemplate() {
    if (this.#isSearchByInTitle()) {
      return '';
    }
    return this.visibleSearchResults
      ? this.visibleSearchResults.map(
          item => html`
            ${this.#calculateItemCategory(item) !== 'dictionary'
              ? html` ${this.#searchResultItemGeneralTemplate(item)} `
              : ''}
          `
        )
      : '';
  }

  get dictionaryTemplate() {
    const dictionaryItem = this.visibleSearchResults.find(item => item.category === 'dictionary');
    if (!dictionaryItem) {
      return '';
    }
    return html` ${this.#searchResultItemGeneralTemplate(dictionaryItem)} `;
  }

  get fuzzyDictionaryTemplate() {
    if (!this.fuzzyDictionary) {
      return '';
    }
    const dictionaryItem = this.visibleSearchResults.find(item => item.category === 'dictionary');
    if (dictionaryItem) {
      return '';
    }
    for (const entry of this.fuzzyDictionary) {
      this.#touchUpDictionaryEntry(entry);
    }
    return html`
        ${this.fuzzyDictionary?.map(
          item => html`
            ${this.#searchResultItemGeneralTemplate(item)}
          `
        )}
    `;
  }

  #touchUpDictionaryEntry(entry) {
    if (
      entry?.highlight?.content[0] &&
      typeof entry.highlight.content[0] === 'string' &&
      !entry.highlight.content[0].includes('<dfn')
    ) {
      entry.highlight.content[0] = `
        <dl id="${entry.highlight.detail[0].word}">
          <dt><dfn>${entry.highlight.detail[0].word}</dfn></dt>
          <dd><p>${entry.highlight.content[0]}</p></dd>
        </dl>
      `;
    }
  }

  #searchResultItemGeneralTemplate(item) {
    return html`
      <div
        class="search-result-item ${this.#calculateItemCategory(item)}"
        tabindex=${this.tabIndex}
      >
        <div class="item-head">
          <div class="sutta-info">
            <a class="search-result-link" href=${this._calculateLink(item)}>
              <div class="primary">
                <div class="sutta-title">
                  <h2 class="search-result-title">${unsafeHTML(this.#calculateTitle(item))}</h2>
                  <div class="badges">
                    ${this.badgeTemplate(item)}
                  </div>
                </div>
                <div class="all-dictionaries">
                  <span>All dictionaries</span>
                  ${icon.arrow_right}
                </div>
              </div>
              <div class="secondary">
                <p class="search-result-division">${unsafeHTML(this.#calculateDivision(item))}</p>
              </div>
            </a>
            <div class="navigation-links">
              ${until(this.#generateNavigationLinks(item.uid), html`Loading...`)}
            </div>
          </div>
          <div class="search-result-action-items">
            ${this.#parallelsButtonTemplate(item)}
          </div>
        </div>
        <div class="secondary">
          <p class="search-result-snippet">
            ${unsafeHTML(this.#calculateSnippetContent(item.highlight?.content))}
          </p>
        </div>
      </div>
    `;
  }

  async #generateNavigationLinks(uid) {
    if (!uid) {
      return '';
    }
    const api = `${API_ROOT}/navigation_data/${uid}?language=${this.language || 'en'}`;
    const menuData = await (await fetch(api)).json();
    const lastIndex = menuData.length - 1;
    return html`${menuData.map((item, i) => html`
      <a target="_blank" rel="noopener noreferrer" href=${item.url}>
        ${item.title || item.uid}
      </a> ${i < lastIndex ? '>' : ''} `)
    }`;
  }

  badgeTemplate(item) {
    if (item.is_article || item.category === 'dictionary') {
      return '';
    }
    const badgeText = item.is_bilara_text || item.is_segmented ? 'aligned' : 'legacy';
    const RootLang = this.expansionReturns[0][item.root_lang]?.[1];
    return html`
      <a><sc-badge text="Root language: ${RootLang || item.root_lang}" color="gray"></sc-badge></a>
      <a><sc-badge text=${badgeText} color="gray" visible=${item.is_root ? 'false' : 'true'}></sc-badge></a>
    `;
  }

  #parallelsButtonTemplate(item) {
    if (item.is_article) {
      return '';
    }
    if (item.category === 'dictionary') {
      return '';
    }
    return html`
      <md-filled-tonal-icon-button
        href=${this.#calculateParallelsLink(item)}
      >
        ${icon.parallels}
      </md-filled-tonal-icon-button>
    `;
  }

  #searchResultByAuthorTemplate() {
    if (
      !this.visibleSearchResults ||
      this.visibleSearchResults.length === 0 ||
      !this.#isSearchByAuthor()
    ) {
      return ``;
    }
    const searchResultByAuthor = this.visibleSearchResults;
    if (searchResultByAuthor[0].category) {
      searchResultByAuthor.shift();
    }
    return searchResultByAuthor
      ? html`
          <div class="search-results-container">
            <main class="search-results-main">
              ${this.searchResultHeadTemplate}
              <div class="search-results-table">
                <div class="search-results-table-header">
                  <div class="search-results-table-column font-weight-bold">SuttaID</div>
                  <div class="search-results-table-column font-weight-bold">Name</div>
                </div>
                ${searchResultByAuthor.map(
                  item => html`
                    <a class="uid" href=${item.url}>
                      <div class="search-results-table-item">
                        <div class="search-results-table-column">
                          ${item.acronym || item.uid}
                        </div>
                        <div class="search-results-table-column">${item.heading?.title ? item.heading.title : ''}</div>
                      </div>
                    </a>
                  `
                )}
              </div>
              ${this.loadMoreButtonTemplate}
            </main>
          </div>
        `
      : '';
  }

  #searchResultByVolpageTemplate() {
    if (!this.#isSearchByVolpage()) {
      return ``;
    }
    const searchResultByVolpage = this.visibleSearchResults;

    this.#processVolpageData(searchResultByVolpage);

    const priorityAuthor = this.priorityAuthors.get(this.language);
    const linkParamPart =
      'layout=plain&reference=main/pts&notes=asterisk&highlight=false&script=latin#';
    const linkTemplate = `/${priorityAuthor ? this.language : 'pli'}/${
      priorityAuthor || 'ms'
    }?${linkParamPart}`;

    const formatRef = function(ref) {
      if (typeof ref !== 'string' || !ref.includes('pts-vp-pli')) {
        return '';
      }

      const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
      const volpage = ref.replace(/pts-vp-pli/,"");
      const [vol, page] = volpage.split(".");

      if (vol < 1 || vol > 8) {
        return ref;
      }

      return `${romanNumerals[vol-1]} ${page}`;
    };

    const getBook = function(acronym) {
      if (typeof acronym !== 'string' || !acronym.includes(' ')) {
        return '';
      }
      const [book, number] = acronym.split(" ");
      return book;
    };

    return searchResultByVolpage
      ? html`
          <div class="search-results-container">
            <main class="search-results-main">
            ${this.searchResultHeadTemplate}
            <div class="volpage-search-results">
                ${searchResultByVolpage.map(
                  item => html`
                    <div class="volpage-search-result-item">
                      <div class="sutta_title">
                        <a class="uid" href=${item.url}>
                          <div>
                            <p class="sutta_name">${item.name}</p>
                            <div class="sutta_info">
                              ${item.acronym || item.uid}  <p class="highlight">${icon.book}  ${item.volpage}</p>
                            </div>
                          </div>
                        </a>
                      </div>

                      <div class="references">
                        ${item.filteredReferences && Array.isArray(item.filteredReferences)
                          ? item.filteredReferences?.map(
                              ref =>
                                html`<a
                                    class="pts_reference"
                                    href="/${item.uid}${linkTemplate}${ref.replace(/(^\s*)/g, '')}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >${getBook(item.acronym)} ${formatRef(ref.replace(/(^\s*)/g, ''))}</a
                                  >, `
                            )
                          : ''}
                      </div>
                    </div>
                  `
                )}
              </div>
            ${this.loadMoreButtonTemplate}
            </main>
          </div>
        `
      : '';
  }

  #processVolpageData(searchResultByVolpage) {
    for (const element of searchResultByVolpage) {
      const item = element;
      const { all_reference: allReference, volpage } = item;
      if (allReference && typeof allReference === 'string') {
        const references = allReference?.split(',');
        const filteredReferences = [];
        if (references) {
          for (const ref of references) {
            if (ref.includes('pts-vp-pli')) {
              filteredReferences.push(ref);
            }
          }
          item.filteredReferences = filteredReferences;
        }
      } else {
        item.filteredReferences = [];
      }

      const volpages = volpage?.split(',');
      if (volpages && volpages.length > 1) {
        const lastVolpage =
          volpages[volpages.length - 1].split('.')[1] || volpages[volpages.length - 1];
        item.volpage = `${volpages[0]}–${lastVolpage}`;
      }
    }
  }

  #searchResultByReferenceTemplate() {
    if (
      !this.visibleSearchResults ||
      this.visibleSearchResults.length === 0 ||
      !this.#isSearchByReference()
    ) {
      return ``;
    }
    const searchResultByReference = this.visibleSearchResults;
    const query = this.searchQuery?.split(':')[1].trim();
    this.#processReferenceData(searchResultByReference);

    const priorityAuthor = this.priorityAuthors.get(this.language);
    const linkParamPart =
      'layout=plain&reference=main/pts&notes=asterisk&highlight=false&script=latin#';
    const linkTemplate = `/${priorityAuthor ? this.language : 'pli'}/${
      priorityAuthor || 'ms'
    }?${linkParamPart}`;

    return searchResultByReference
      ? html`
          <div class="search-results-container">
            ${this.searchResultHeadTemplate}
            <div class="search-results-table">
              ${searchResultByReference.map(
                item => html`
                  <div class="search-results-table-item ref-filter-results">
                    <div class="search-results-table-column">
                      <a class="uid" href=${item.url}>${item.acronym || item.uid} — ${item.name}</a>
                    </div>
                    <div class="search-results-table-column">
                      <div class="refs">
                      ${item.filteredReferences && Array.isArray(item.filteredReferences)
                        ? item.filteredReferences?.map(
                            ref =>
                              html`<a
                                  class="pts_reference"
                                  href="/${item.uid}${linkTemplate}${ref.replace(/(^\s*)/g, '')}"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  >${ref.replace(/(^\s*)/g, '') === query
                                    ? this.#addHighlighting(ref.replace(/(^\s*)/g, ''))
                                    : ref.replace(/(^\s*)/g, '')}</a
                                >, `
                          )
                        : ''}
                      </div>
                    </div>
                  </div>
                `
              )}
            </div>
            ${this.loadMoreButtonTemplate}
          </div>
        `
      : '';
  }

  #processReferenceData(searchResultByReference) {
    for (const element of searchResultByReference) {
      const item = element;
      const { all_reference: allReference } = item;
      if (allReference && typeof allReference === 'string') {
        const references = allReference?.split(',');
        const filteredReferences = [];
        if (references) {
          for (const ref of references) {
            if (ref.includes('pts-vp-pli')) {
              filteredReferences.push(ref);
            }
          }
          item.filteredReferences = filteredReferences;
        }
      } else {
        item.filteredReferences = [];
      }
    }
  }

  #searchResultByCollectionTemplate() {
    if (
      !this.visibleSearchResults ||
      this.visibleSearchResults.length === 0 ||
      !this.#isSearchByCollection()
    ) {
      return ``;
    }
    const searchResultByCollection = this.visibleSearchResults;
    // delete dictionary result
    if (searchResultByCollection[0].category) {
      searchResultByCollection.shift();
    }
    return searchResultByCollection
      ? html`
          <div class="search-results-container">
            <main class="search-results-main">
              ${this.searchResultHeadTemplate}
              <div class="search-results-table">
                <div class="search-results-table-header">
                  <div class="search-results-table-column font-weight-bold">SuttaID</div>
                  <div class="search-results-table-column font-weight-bold">Name</div>
                  <div class="search-results-table-column font-weight-bold">Author</div>
                  <div class="search-results-table-column font-weight-bold">Language</div>
                </div>
                ${searchResultByCollection.map(
                  item => html`
                    <a class="uid" href=${item.url}>
                      <div class="search-results-table-item">
                        <div class="search-results-table-column">
                          ${item.acronym || item.uid}
                        </div>
                        <div class="search-results-table-column">${item.name || item.heading?.title}</div>
                        <div class="search-results-table-column">${item.author || item.author_uid}</div>
                        <div class="search-results-table-column">${item.full_lang}</div>
                      </div>
                    </a>
                  `
                )}
              </div>
              ${this.loadMoreButtonTemplate}
            </main>
          </div>
        `
      : '';
  }

  #searchResultByListAuthorsTemplate() {
    if (
      !this.visibleSearchResults ||
      this.visibleSearchResults.length === 0 ||
      !this.#isSearchByListAuthors()
    ) {
      return ``;
    }
    const searchResultByListAuthors = this.visibleSearchResults;
    return searchResultByListAuthors
      ? html`
          <div class="search-results-container">
            <main class="search-results-main">
              ${this.searchResultHeadTemplate}
              <p>Click the Author ID below to see all texts by a single author. Or use the ID to limit search results to a single author, e.g. <code>author:sujato</code></p>
              <div class="search-results-table listauthorsResult">
                <div class="search-results-table-header">
                  <div class="search-results-table-column font-weight-bold">Author ID</div>
                  <div class="search-results-table-column font-weight-bold">Author name</div>
                </div>
                ${searchResultByListAuthors.map(
                  item => html`
                    <a
                      class="uid"
                      href="/search?query=author:${item.author_uid}"
                      @click=${() => this.#onAuthorNameClick(item.author_uid)}
                    >
                      <div class="search-results-table-item authorInfo">
                        <div class="search-results-table-column">
                          ${item.author_uid}
                        </div>
                        <div class="search-results-table-column">
                          ${item.author}
                        </div>
                      </div>
                    </a>
                  `
                )}
              </div>
              ${this.loadMoreButtonTemplate}
            </main>
          </div>
        `
      : '';
  }

  #searchResultByListLanguageTemplate() {
    if (
      !this.visibleSearchResults ||
      this.visibleSearchResults.length === 0 ||
      !this.#isSearchByListLanguage()
    ) {
      return ``;
    }
    const searchResultByListLanguage = this.visibleSearchResults;
    return searchResultByListLanguage
      ? html`
          <div class="search-results-container">
            <main class="search-results-main">
              ${this.searchResultHeadTemplate}
              <p>Click the Sutta ID below to see the text. </p>
              <div class="search-results-table listauthorsResult">
                <div class="search-results-table-header">
                  <div class="search-results-table-column font-weight-bold">Sutta ID</div>
                  <div class="search-results-table-column font-weight-bold">Sutta Title</div>
                  <div class="search-results-table-column font-weight-bold">Author</div>
                </div>
                ${searchResultByListLanguage.map(
                  item => html`
                    <a
                      class="uid"
                      href="/${item.uid}/${item.lang}/${item.author_uid}"
                    >
                      <div class="search-results-table-item authorInfo">
                        <div class="search-results-table-column">
                          ${item.uid}
                        </div>
                        <div class="search-results-table-column">
                          ${item.name}
                        </div>
                        <div class="search-results-table-column">
                          ${item.author}
                        </div>
                      </div>
                    </a>
                  `
                )}
              </div>
              ${this.loadMoreButtonTemplate}
            </main>
          </div>
        `
      : '';
  }

  #searchFilterErrorTemplate() {
    if (!this.searchResultError) {
      return '';
    }
    return html`
        <div class="search-error">
            <h4>Search format error</h4>
            <p>${this.searchResultError.message}</p>
            <div class="suggestions">
                <h5>suggestion:</h5>
                <ul>
                    ${unsafeHTML(this.searchResultError.suggestions.map(s => `<li>${s}</li>`).join(''))}
                </ul>
            </div>
        </div>
    `;
  }

  #onAuthorNameClick(authorUid) {
    dispatchCustomEvent(this, 'sc-navigate', { pathname: `/search?query=author:${authorUid}` });
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('search-filter-changed', this.#calculateCurrentFilter);
  }

  shouldUpdate(prevProps) {
    if (prevProps.has('searchQuery')) {
      this.#startNewSearchWithNewWord();
    }
    if (prevProps.has('lastSearchResults')) {
      this.#populateList();
    }
    return true;
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.searchQuery !== state.currentRoute.params.query) {
      this.searchQuery = state.currentRoute.params.query;
      this.visibleSearchResults = [];
    }
    if (this.searchParams !== state.searchParams) {
      this.searchParams = state.searchParams;
    }
    if (this.displayedLanguages !== state.searchOptions.displayedLanguages) {
      this.displayedLanguages = state.searchOptions.displayedLanguages;
      this.requestUpdate();
    }
    if (this.isCompactMode !== state.suttaplexListDisplay) {
      this.isCompactMode = state.suttaplexListDisplay;
    }
  }

  // Saves the fetched search results to be displayed in the list.
  #populateList() {
    if (!this.loadMoreButtonClicked) {
      this.visibleSearchResults = [];
    }
    const items = this.lastSearchResults;
    if (items.length === 0) {
      return;
    }
    items.forEach(item => {
      if (!item) {
        return;
      }
      this.totalLoadedResults += 1;
      this.allSearchResults.push(item);
      // If the filter fits, add to visible items
      if (this.#belongsToFilterScope(item)) {
        this.visibleSearchResults.push(item);
      }
    });
  }

  #loadMoreData() {
    this.loadMoreButtonClicked = true;
    this.#loadNextPage();
  }

  #loadNextPage() {
    this.currentPage += 1;
    reduxActions.initiateSearch({
      limit: this.resultsPerLoad,
      offset: this.currentPage * this.resultsPerLoad,
      query: this.searchQuery,
      language: this.language,
      restrict: this.currentFilter,
      matchpartial: this.matchPartial,
    });
    this.#generateRequest();
  }

  // generates a new search request after a new search-word was typed.
  #startNewSearchWithNewWord() {
    if (!this.isOnline || !this.searchQuery) {
      return;
    }
    this.loadingResults = true;
    this.waitTimeAfterNewWordExpired = false;
    this.currentFilter = 'all';
    this.#startNewSearch();
  }

  // generates a new search request.
  #startNewSearch() {
    if (!this.isOnline || !this.searchQuery) {
      return;
    }
    this.clearSearchPage();
    reduxActions.initiateSearch({
      limit: this.resultsPerLoad,
      query: this.searchQuery,
      language: this.language,
      restrict: this.currentFilter,
      matchpartial: this.matchPartial,
    });
    this.#generateRequest();
  }

  #updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: this.localize('search:search'),
      url: `${currentPath}?query=${this.searchQuery}`,
      type: 'searchPage',
    });
    reduxActions.setNavigation(navArray);
  }

  // Clears search result arrays, resets variables
  clearSearchPage() {
    this.visibleSearchResults.splice(0, this.visibleSearchResults.length);
    this.allSearchResults.splice(0, this.allSearchResults.length);
    this.currentPage = 0;
    this.totalLoadedResults = 0;
  }

  // Checks if the item's category fits in the current filter.
  #belongsToFilterScope(item) {
    return this.#calculateItemCategory(item) === this.currentFilter || this.currentFilter === 'all';
  }

  // Formats the search result description snippet
  #calculateSnippetContent(description) {
    return description?.join(' ');
  }

  // Calls the input results when page is loaded
  #generateRequest() {
    if (!this.searchParams || !this.searchQuery || this.#areAllItemsLoaded()) {
      return;
    }
    reduxActions.changeLinearProgressActiveState(true);
    this.#fetchExpansion();
    this.#fetchSearchResult();
    this.#updateNav();
  }

  async #fetchExpansion() {
    try {
      this.expansionReturns = await (await fetch(this.#getExpansionUrl())).json();
    } catch (error) {
      this.lastError = error;
      console.error(error);
    }
  }

  async #fetchSearchResult() {
    let requestUrl = this.#getUrl() || '';
    const bindingChar = requestUrl.indexOf('?') >= 0 ? '&' : '?';
    requestUrl = requestUrl + bindingChar + this.#getQueryString();
    try {
      let selectedLangs = store
        .getState()
        .searchOptions.displayedLanguages.filter(item => item.checked);
      selectedLangs = selectedLangs.map(item => item.uid);
      const searchResult = await (
        await fetch(requestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedLangs),
        })
      ).json();
      this.searchResultError = searchResult.error;
      this.#didRespond(searchResult);
      this.#setProperties(searchResult);
    } catch (error) {
      this.lastError = error;
      console.error(error);
    }
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('lastSearchResults')) {
      this.requestUpdate();
      this.#createMetaData();
    }
    const searchInput = this.shadowRoot.querySelector('#search_input');
    if (searchInput?.value === '') {
      searchInput.value = this.searchQuery;
    }

    this.#changeSearchResultsLayout();
  }

  #didRespond(searchResult) {
    const dicResult = searchResult.hits.find(item => item.category === 'dictionary');
    if (this.loadMoreButtonClicked && dicResult) {
      searchResult.hits.splice(searchResult.hits.indexOf(dicResult), 1);
    }
    if (dicResult && dicResult.highlight.content[0] === '' && dicResult.highlight.detail) {
      dicResult.highlight.content[0] = dictionarySimpleItemToHtml(dicResult.highlight.detail[0]);
    }
  }

  #setProperties(searchResult) {
    this.suttaplex = searchResult.suttaplex;
    this.fuzzyDictionary = searchResult.fuzzy_dictionary;
    this.lastSearchResults = searchResult.hits;
    this.originLastSearchResults = searchResult.hits;
    this.resultCount = searchResult.total;
    if (searchResult.hits.length === 0 || (searchResult.hits.length === 1 && searchResult.hits[0]?.category === 'dictionary')) {
      this.resultCount = searchResult.suttaplex.length;
    }
    this.waitTimeAfterNewWordExpired = true;
    this.updateComplete.then(() => {
      this.loadingResults = false;
      this.loadMoreButtonClicked = false;
      reduxActions.changeLinearProgressActiveState(this.loadingResults);
    });
  }

  #getQueryString() {
    const queryParts = [];
    let param;
    let value;
    for (param in this.searchParams) {
      value = this.searchParams[param];
      param = window.encodeURIComponent(param);

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          queryParts.push(`${param}=${window.encodeURIComponent(value[i])}`);
        }
      } else if (value !== null) {
        queryParts.push(`${param}=${window.encodeURIComponent(value)}`);
      } else {
        queryParts.push(param);
      }
    }
    return queryParts.join('&');
  }

  // listens to the search-menu and changes the items to be displayed accordingly to "all", "root texts",
  // "translations" or "dictionaries"
  #calculateCurrentFilter(event) {
    if (!this.waitTimeAfterNewWordExpired) {
      return;
    }
    this.currentFilter = event.detail.searchView;
    this.#startNewSearch();
  }

  // The endless scroll is dependant on a scroll event, but if there's less then 1 item
  // on a search result page, it won't trigger loading more, hence this function:
  #loadMoreIfMinimumNotReached() {
    if (this.visibleSearchResults.length < 1 && !this.#areAllItemsLoaded()) {
      this.#loadNextPage();
    }
  }

  #areAllItemsLoaded() {
    return (
      (this.resultCount === 0 && this.currentPage > 0) ||
      (this.totalLoadedResults !== 0 && this.totalLoadedResults >= this.resultCount)
    );
  }

  #calculateItemCategory(item) {
    if (item.category === 'dictionary') {
      return item.category;
    }
    if (item.is_root) {
      return 'root-text';
    }
    return 'translation';
  }

  // Determines the number of search results that have been found.
  #calculateResultCount(data) {
    return data || 0;
  }

  // If there is no title in the database, the division is the title
  #calculateTitle(item) {
    if (item.category === 'dictionary') {
      return this.dictionaryTitles[item.heading.division];
    }
    return item.heading?.title ? item.heading.title : this.#getDivision(item);
  }

  // If there is a title, the division is the subtitle
#calculateDivision(item) {
  const division = this.#getDivision(item);

  if (item.is_article) {
    return 'Static page';
  }

  if (this.searchQuery?.includes('volpage:')) {
    return `${division} — ${item.name} — ${this.#addHighlighting(item.volpage)}`;
  }

  if (!division && !item.author) {
    return ``;
  }

  if (item.author) {
    return `${division} ${item.root_name || ''} — ${item.full_lang} — ${item.author}`;
  }

  if (item.name) {
    return `${division} — ${item.name}`;
  }

  return division;
}

  #addHighlighting(text) {
    return html`<strong class="highlight">${text}</strong>`;
  }

  #highlightKeyword(word, text) {
    return text.replace(new RegExp(word, 'g'), `<strong class="highlight">${word}</strong>`);
  }

  #getDivision(item) {
    return item.acronym ? this.#convertAcronym(item.acronym) : this.#transformId(item.uid);
  }

  #convertAcronym(acronym) {
    if (acronym.match(/\/\//)) {
      return `${acronym.replace(/\/\//, ' (')})`;
    }
    return acronym;
  }

  #transformId(rootId) {
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
          if (tailMatch) {
            tail = `${tailMatch[0]}–`;
          }
          const itemMatch = item.match(/[a-z]*/g);
          if (itemMatch) {
            item = itemMatch[0];
          }
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
    const urlMap = {
      'discourses': '/discourses-guide-sujato',
      'vinaya': '/vinaya-guide-brahmali',
      'abhidhamma': '/abhidhamma-guide-sujato'
    };

    return urlMap[item.uid] || item.url;
  }

  #calculateParallelsLink(item) {
    return `${item.uid}?view=normal`;
  }

  #getUrl() {
    return `${API_ROOT}/search/instant`;
  }

  #getExpansionUrl() {
    return `${API_ROOT}/expansion`;
  }

  #createMetaData() {
    const description = this.localize('search:metaDescriptionText');
    const searchResultsText = this.localize('search:searchResultsText');
    const pageTitle = `${this.#calculateResultCount(this.resultCount)} ${this.localize(
      'search:resultsFor'
    )} ${this.searchQuery}`;

    const toolbarTitle = `${this.#calculateResultCount(this.resultCount)} ${this.localize(
      'search:resultsFor'
    )} <strong class="highlightTitle">${this.searchQuery}</strong>`;

    document.dispatchEvent(
      new CustomEvent('metadata', {
        detail: {
          pageTitle,
          title: `${searchResultsText} ${this.searchQuery}`,
          description,
          bubbles: true,
          composed: true,
        },
      })
    );
    reduxActions.changeToolbarTitle(toolbarTitle);
    this.#updateNav();
  }

  #computeItemDifficulty(difficulty) {
    if (!difficulty) {
      return;
    }
    if (difficulty.name) {
      return difficulty.name;
    }
    const levels = { 1: 'beginner', 2: 'intermediate', 3: 'advanced' };
    return levels[difficulty];
  }

  #isSearchByAuthor() {
    return (
      this.searchQuery?.includes('author:') &&
      !this.searchQuery?.includes('in:') &&
      !this.searchQuery?.includes(' ')
    );
  }

  #isSearchByVolpage() {
    return this.searchQuery?.includes('volpage:');
  }

  #isSearchByCollection() {
    return (
      this.searchQuery?.includes('in:') &&
      !this.searchQuery?.includes('author:') &&
      !this.searchQuery?.includes(' ')
    );
  }

  #isSearchByListAuthors() {
    return this.searchQuery === 'list authors';
  }

  #isSearchByListLanguage() {
    const param = this.searchQuery?.split(" ");
    return (param?.length > 1 && param[0] === 'list' && this.languageIsoCodes?.includes(param[1]));
  }

  async _fetchLanguageIsoCodes() {
    try {
      const languageListResponse = await (await fetch(`${API_ROOT}/languages?all=true`)).json();
      this.languageIsoCodes = languageListResponse.map(item => item.iso_code);
    } catch (e) {
      console.error(e);
    }
  }

  #isSearchByInTitle() {
    return this.searchQuery?.includes('title:');
  }

  #isSearchByReference() {
    return this.searchQuery?.includes('ref:');
  }

  #changeSearchResultsLayout() {
    const allSearchResults = this.shadowRoot.querySelector('.all-search-results');
    const additionalSearchResults = this.shadowRoot.querySelector('.additional-search-results');
    if (!additionalSearchResults || !allSearchResults) {
      return;
    }
    if (this.#isSearchByInTitle()) {
      allSearchResults.style.flexDirection = 'column';
      additionalSearchResults.style.maxWidth = '50%';
    } else {
      allSearchResults.style.flexDirection = 'row';
      additionalSearchResults.style.maxWidth = '40%';
    }
  }
}

customElements.define('sc-page-search', SCPageSearch);
