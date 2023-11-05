import { html, css, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import algoliasearch from 'algoliasearch/lite';
import { create, search, insertMultiple } from '@orama/orama';
import '@material/web/textfield/filled-text-field';
import '@material/web/iconbutton/icon-button';

import { LitLocalized } from './sc-localization-mixin';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { store } from '../../redux-store';
import { icon } from '../../img/sc-icon';
import { API_ROOT } from '../../constants';
import { reduxActions } from './sc-redux-actions';

const algoliaClient = algoliasearch('B3DSEV09M1', 'b3b5a4de4c16de7a500c7f324d77113b');
const algoliaIndex = algoliaClient.initIndex('sc_ebs_names');
const algoliaSegmentedTextIndex = algoliaClient.initIndex('sc_text_contents');

let suttaDB = await create({
  schema: {
    uid: 'string',
    rootTitle: 'string',
    translationTitle: 'string',
  },
});

let timeout = null;

class SCAutoCompleteList extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      font-size: var(--sc-font-size-md);

      position: absolute;
      z-index: 9999;
      top: var(--sc-size-sm);
      left: var(--sc-size-sm);

      display: none;

      width: calc(100% - var(--sc-size-sm) * 2);
      margin: auto;

      color: var(--sc-on-tertiary-primary-text-color);
      border-radius: var(--sc-mid-border-radius);
      background-color: var(--sc-tertiary-background-color);
      box-shadow: 0 0 0 2048px rgba(0, 0, 0, 0.8);

      --md-icon-button-icon-size: 24px;
      --md-sys-color-primary: var(--sc-primary-accent-color);
    }

    #instant_search_dialog {
      position: relative;

      padding: 8px;

      border-radius: var(--sc-mid-border-radius);
    }

    .ss-header {
      display: flex;

      padding: 0px;

      justify-content: center;
      align-items: center;
    }

    md-filled-text-field {
      width: 100%;
      padding: 0 10px;

      --md-sys-color-primary: var(--sc-primary-accent-color);
      --md-sys-color-on-primary: white;
      --md-filled-text-field-container-color: var(--sc-tertiary-background-color);
      --md-filled-text-field-focus-input-text-color: var(--sc-on-primary-primary-text-color);
      --md-filled-text-field-input-text-font: var(--sc-sans-font);
      --md-filled-text-field-input-text-size: var(--sc-size-md);
      --md-filled-text-field-input-text-color: var(--sc-on-primary-primary-text-color);
      --md-filled-text-field-hover-input-text-color: var(--sc-on-primary-primary-text-color);
      --md-filled-text-field-error-focus-supporting-text-color: var(--sc-primary-color);
      --md-filled-text-field-error-hover-supporting-text-color: var(--sc-primary-color);
      --md-filled-text-field-error-supporting-text-color: var(--sc-primary-color);
      --md-filled-text-field-error-label-text-color: var(--sc-primary-color);
      --md-filled-text-field-error-focus-label-text-color: var(--sc-primary-color);
      --md-filled-text-field-error-hover-label-text-color: var(--sc-primary-color);
    }

    .ss-list {
      overflow-y: auto;

      max-height: calc(100vh - 200px);
      padding: 0 4px;

      scrollbar-gutter: stable both-edges;
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background: var(--sc-icon-color);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #87817a;
    }
    ::-webkit-scrollbar-thumb:active {
      background: #79746d;
    }
    ::-webkit-scrollbar-track {
      border-radius: 6px;
      background: var(--sc-border-color);
    }
    ::-webkit-scrollbar-corner {
      background: transparent;
    }

    ul {
      margin: 0;
      padding: 8px 0 4px;

      list-style: none;
    }

    li {
      position: relative;

      margin-bottom: 0;
    }

    .search-suggestion-link {
      display: flex;

      height: 24px;
      padding: 24px 12px 8px 16px;

      cursor: pointer;
      transition: var(--sc-link-transition);
      text-decoration: none;

      color: inherit;
      border-radius: 4px 4px 0 0;
      background-color: inherit;

      align-items: center;
      justify-content: space-between;

      gap: 16px;
    }

    .search-suggestion-link:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }

    .search-suggestion-link:active {
      background-color: var(--sc-primary-color-light);
    }

    .search-suggestion-link:focus {
      background-color: var(--sc-primary-color-light-transparent);
    }

    .search-suggestion {
      display: flex;

      align-items: baseline;
      gap: 8px;

      scroll-snap-type: x mandatory;

      overflow-x: hidden;
    }

    .search-suggestion::before {
      position: absolute;
      top: 8px;

      display: block;

      content: 'Filter search to early Buddhist suttas';
    }

    .search-suggestion::before,
    .instant-nav-description-text {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-xs);

      color: var(--sc-icon-color);
    }

    .search-suggestion-filter {
      font-family: monospace;
      font-size: var(--sc-font-size-xs);

      position: relative;

      color: var(--sc-on-primary-secondary-text-color);
    }

    .search-suggestion-query {
      text-wrap: nowrap;
      scroll-snap-align: end;

      font-size: 16px;
    }

    .search-suggestion-prompt {
      display: inline-flex;

      height: 40px;
    }

    .instant-nav-description-text {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-xs);

      color: var(--sc-icon-color);

      display: none;

      margin: 16px 0 8px 16px;

      align-items: center;
    }

    .instant-nav-description-text .icon {
      width: 1em;
      min-width: 1em;
      height: 1em;
      margin: 0 0.25em 0 0.25em;
    }

    .instant-nav {
      display: flex;
      align-items: center;

      flex-direction: row;
      gap: 8px;
    }

    .instant-nav-link {
      display: flex;

      margin-bottom: 8px;
      padding: 4px 12px 4px 12px;

      cursor: pointer;
      transition: var(--sc-link-transition);
      text-decoration: none;

      color: var(--sc-on-primary-primary-text-color);
      border-radius: var(--sc-big-border-radius);
      background-color: var(--sc-primary-background-color);

      align-items: center;
      justify-content: space-between;
    }

    .instant-nav-link:hover {
      background-color: var(--sc-primary-color-light-transparent);
    }

    .instant-nav-link:active {
      background-color: var(--sc-primary-color-light);
    }

    .instant-nav-link:focus {
      background-color: var(--sc-primary-color-light-transparent);
    }

    .instant-nav-uid-title-wrap {
      display: flex;

      flex-direction: column;
    }

    .instant-nav-uid {
      font-size: var(--sc-font-size-xs);

      color: var(--sc-on-primary-secondary-text-color);
    }

    .instant-nav-title {
      font-family: var(--sc-serif-font);
    }

    .instant-nav-prompt {
      display: inline-flex;
    }

    #openSearchTip {
      font-size: var(--sc-font-size-s);

      display: flex;

      padding: 8px 16px 0px 16px;

      color: var(--sc-on-tertiary-secondary-text-color);
      border-top: 1px solid var(--sc-border-color);

      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    #opensearchtip-left {
      display: inline-flex;

      align-items: center;
    }

    ul li:last-child {
      margin-bottom: 0.5rem;
    }

    hr {
      display: none;

      margin: 0 0 8px;
    }

    li ~ hr,
    ul li:last-child + hr,
    li ~ .instant-nav-description-text {
      display: flex;
    }

    .icon {
      fill: var(--sc-icon-color);
      min-width: 24px;
    }

    md-icon {
      cursor: pointer;
    }

    .highlight {
      color: var(--sc-primary-color-dark);
      background-color: var(--sc-primary-color-light-transparent);
    }
  `;

  static properties = {
    items: { type: Array },
    siteLanguage: { type: String },
    loadingData: { type: Boolean },
  };

  constructor() {
    super();
    this.items = [];
    this.priorityAuthors = new Map([
      ['en', 'sujato'],
      ['de', 'sabbamitta'],
      ['zh', 'zhuang'],
    ]);
    this.searchQuery = store.getState().searchQuery || '';
    this.siteLanguage = store.getState().siteLanguage;
    this.loadingData = false;
    this.searchResult = [];
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this.#initInstantSearchData();
    }
  }

  async #initInstantSearchData() {
    try {
      this.loadingData = true;
      const { lastUpdatedDate } = store.getState().instantSearch;
      this.instant_search_data = store.getState().instantSearch?.data;
      const { siteLanguage } = store.getState();
      const { language } = store.getState().instantSearch;

      if (lastUpdatedDate) {
        const lastUpdatedDateObj = new Date(lastUpdatedDate);
        const today = new Date();
        const diffTime = Math.abs(today - lastUpdatedDateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 7 || language !== siteLanguage) {
          await this.#fetchInstantSearchData();
        }
      }

      if (!this.instant_search_data || this.instant_search_data?.length === 0) {
        await this.#fetchInstantSearchData();
      }

      if (this.instant_search_data?.length > 0) {
        this.instant_search_data = this.instant_search_data.map(item => {
          const [rootTitle, translationTitle] = item.title.split('-');
          return { ...item, rootTitle, translationTitle };
        });

        suttaDB = null;
        suttaDB = await create({
          schema: {
            uid: 'string',
            rootTitle: 'string',
            translationTitle: 'string',
          },
        });
        await insertMultiple(suttaDB, this.instant_search_data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingData = false;
    }
  }

  async #fetchInstantSearchData() {
    const today = new Date();
    const { siteLanguage } = store.getState();
    this.instant_search_data = await (
      await fetch(`${API_ROOT}/possible_names/${siteLanguage}`)
    ).json();
    reduxActions.setInstantSearchLastUpdatedDate(today);
    reduxActions.setInstantSearchDataLanguage(siteLanguage);
    reduxActions.setInstantSearchData(this.instant_search_data);
  }

  firstUpdated() {
    this.shadowRoot.getElementById('search_input').focus();

    this.addEventListener('keydown', event => {
      const currentSelectedItem = this.shadowRoot.querySelector('.selected');
      if (!currentSelectedItem) {
        return;
      }

      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Enter') {
        const scAutoCompleteInput = this.shadowRoot.querySelector('#search_input');
        scAutoCompleteInput?.focus();
      }
    });

    this.shadowRoot.querySelector('#search_input').addEventListener('keydown', event => {
      if (event.key === '/') {
        event.stopPropagation();
      }
    });
  }

  updated(changedProps) {
    if (changedProps.has('loadingData') && !this.loadingData && suttaDB?.data?.docs?.count !== 0) {
      this.searchQuery = this.shadowRoot.getElementById('search_input').value;
      this.#instantSearch();
    }
  }

  render() {
    return html`${this.#suggestionsTemplate()}`;
  }

  #gotoSearch(event, uid, searchQuery) {
    if (event.type === 'click' || event.key === 'Enter') {
      this.hide();
      const searchTerm = uid ? `${uid} ${searchQuery}` : searchQuery;
      const link = `/search?query=${searchTerm}`;
      dispatchCustomEvent(this, 'sc-navigate', { pathname: link });
    }
  }

  #generateSearchURL(uid, searchQuery) {
    const searchTerm = uid ? `${uid} ${searchQuery}` : searchQuery;
    return `/search?query=${searchTerm}`;
  }

  hide() {
    this.style.display = 'none';
  }

  #generateURL(item) {
    const siteLang = store.getState().siteLanguage;
    let link = `/${item.uid}`;
    if (item.nodeType === 'leaf' && (this.priorityAuthors?.get(siteLang) || item.author_uid)) {
      link = `/${item.uid}/${item.lang || siteLang}/${
        item.author_uid || this.priorityAuthors.get(siteLang)
      }${item.segmented_uid ? `#${item.segmented_uid}` : ''}`;
    }
    return link;
  }

  #suggestionsTemplate() {
    return html`
      <div id="instant_search_dialog" class="search-suggestions">
        <div class="ss-header">${this.#headerTemplate()}</div>
        <div class="ss-list">${this.#searchResultListTemplate()}</div>
        <div class="ss-footer" id="openSearchTip">${this.#footerTemplate()}</div>
      </div>
    `;
  }

  #headerTemplate() {
    return html`
      <md-filled-text-field
        id="search_input"
        type="search"
        label="Search in all texts"
        @keyup=${e => this.#keyupHandler(e)}
        @keypress=${this.#keypressHandler}
      >
        <md-icon slot="trailing-icon" @click=${this.#startSearch}>${icon.search}</md-icon>
      </md-filled-text-field>
    `;
  }

  #searchResultListTemplate() {
    const filters = [{ uid: 'in:ebs', title: 'Early Buddhist Suttas' }];
    return html`
      <ul id="instant-search-items">
        ${this.searchQuery &&
        filters.map(
          item => html`
            <li>
              <a
                class="search-suggestion-link"
                href=${this.#generateSearchURL(item.uid, this.searchQuery)}
                @click=${e => this.#gotoSearch(e, item.uid, this.searchQuery)}
              >
                <span class="search-suggestion">
                  <span class="search-suggestion-filter">${item.uid}</span>
                  <span class="search-suggestion-query">${this.searchQuery}</span>
                </span>

                <span class="search-suggestion-prompt">${icon.search}</span>
                <md-ripple></md-ripple>
              </a>
            </li>
          `
        )}
        <hr />
        <div class="instant-nav-description-text">
          Go to ${icon.open_book} text or ${icon.network_node} collection
        </div>
        ${this.items.map(
          item =>
            html` <li @click=${this.hide}>
              <a class="instant-nav-link" target="_blank" href=${this.#generateURL(item)}>
                <span class="instant-nav">
                  ${item.nodeType === 'branch' ? icon.network_node : icon.open_book}
                  <span class="instant-nav-uid-title-wrap">
                    <span class="instant-nav-uid"
                      >${unsafeHTML(item.acronym || item.uid)} ${item.name ? ` – ${item.name}` : ''}
                      ${item.author ? ` – ${item.author}` : ''}</span
                    >
                    <span class="instant-nav-title">${unsafeHTML(item.title)}</span>
                  </span>
                </span>

                <span class="instant-nav-prompt">${icon.arrow_right}</span>
                <md-ripple></md-ripple>
              </a>
            </li>`
        )}
      </ul>
    `;
  }

  #footerTemplate() {
    return html`
      <span id="opensearchtip-left">
        <img
          src="/img/Algolia-logo-blue.png"
          height="15px"
          width="80px"
        />
        <md-icon-button
          aria-label="Tips for search syntax"
          href="/search-filter"
          @click=${this.hide}
        >
          ${icon.info}
        </md-icon-button>
        <span>Tips for search syntax</span>
      </span>
      <sc-progress .active=${this.loadingData} .type=${'circular'}></sc-progress>
      <md-icon-button @click=${this.hide}>${icon.close}</md-icon-button>
    </div>
    `;
  }

  #keypressHandler({ key }) {
    if (key === 'Enter') {
      this.#startSearch();
    }
  }

  #startSearch() {
    const searchQuery = this.shadowRoot.getElementById('search_input')?.value;
    if (searchQuery) {
      this.hide();
      dispatchCustomEvent(this, 'sc-navigate', { pathname: `/search?query=${searchQuery}` });
    }
  }

  async #keyupHandler(e) {
    if (e.key === 'Enter') {
      return;
    }

    if (suttaDB?.data?.docs?.count === 0) {
      await this.#initInstantSearchData();
    }

    if (this.loadingData) {
      return;
    }

    this.searchQuery = e.target.value;
    this.searchResult.length = 0;
    this.items.length = 0;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      this.loadingData = true;
      this.#instantSearch();
      this.loadingData = false;
    }, 500);
  }

  async #instantSearch() {
    if (this.searchQuery?.length >= 2) {
      this.#searchByAlgolia();
      this.#fulltextSearchByAlgolia();
    } else {
      this.items = [];
    }
  }

  async #searchByOrama() {
    const searchResult = await search(suttaDB, {
      term: this.searchQuery,
      properties: '*',
      limit: 20,
      boost: {
        uid: 2,
        translationTitle: 1.5,
        rootTitle: 1.4,
      },
      threshold: 0.4,
    });

    let { hits } = searchResult;
    if (hits.length === 0) {
      const searchResultWithTypoTolerance = await search(suttaDB, {
        term: this.searchQuery,
        properties: '*',
        tolerance: 1,
        limit: 20,
        boost: {
          uid: 2,
          rootTitle: 1.5,
          translationTitle: 1.4,
        },
      });
      hits = searchResultWithTypoTolerance.hits;
    }
    const copiedHits = JSON.parse(JSON.stringify(hits));
    this.items = copiedHits.map(hit => hit.document);
  }

  #searchByAlgolia() {
    this.items = [];
    algoliaIndex
      .search(this.searchQuery, {
        filters: `lang:${this.siteLanguage} OR isRoot:true`,
      })
      .then(({ hits }) => {
        const formattedHit = [];
        for (const hit of hits) {
          formattedHit.push({
            uid: hit._highlightResult?.uid?.value || hit.uid,
            isRoot: hit.isRoot,
            nodeType: hit.nodeType,
            title: hit._highlightResult?.title?.value,
            lang: hit.lang,
            author_uid: '',
          });
        }
        this.searchResult = this.#mergedResultByUid(formattedHit);
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  #fulltextSearchByAlgolia() {
    algoliaSegmentedTextIndex
      .search(this.searchQuery, {
        filters: `lang:${this.siteLanguage}`,
        restrictSearchableAttributes: ['segmented_text'],
      })
      .then(({ hits }) => {
        for (const hit of hits) {
          this.searchResult.push({
            uid: hit._highlightResult?.uid?.value || hit.uid,
            acronym: hit.acronym,
            isRoot: hit.is_root,
            nodeType: 'leaf',
            title:
              hit._highlightResult?.segmented_text?.value ||
              hit._highlightResult?.title?.value ||
              hit.segmented_text,
            lang: hit.lang,
            author: hit.author,
            author_uid: hit.author_uid,
            segmented_uid: hit.segmented_uid?.split(':')[1] || hit.segmented_uid,
            name: hit.name,
          });
        }
        this.items = this.searchResult;
        if (this.items.length === 0) {
          this.#searchByOrama();
        }
        this.requestUpdate();
        this.loadingData = false;
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  #mergedResultByUid(hits) {
    const result = Object.values(
      hits.reduce((acc, curr) => {
        if (acc[curr.uid]) {
          if (acc[curr.uid].isRoot !== curr.isRoot) {
            if (curr.isRoot) {
              acc[curr.uid].title = `${curr.title} – ${acc[curr.uid].title}`;
            } else {
              acc[curr.uid].title += ` – ${curr.title}`;
            }
          }
        } else {
          acc[curr.uid] = curr;
        }
        return acc;
      }, {})
    );
    return result;
  }
}

customElements.define('sc-auto-complete-list', SCAutoCompleteList);
