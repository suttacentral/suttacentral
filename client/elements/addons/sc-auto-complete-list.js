import { html, LitElement, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {until} from 'lit/directives/until.js';
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
import { SCAutoCompleteListStyles } from '../styles/sc-auto-complete-list-styles';

const algoliaClient = algoliasearch('6P1QMGK4ZX', '91894dd5d8c89a8491d39f2903124373');
const algoliaSegmentedTextIndex = algoliaClient.initIndex('sc_text_contents');

let suttaDB = await create({
  schema: {
    uid: 'string',
    rootTitle: 'string',
    translationTitle: 'string',
  },
});

let timeoutId = null;

export class SCAutoCompleteList extends LitLocalized(LitElement) {
  static styles = [SCAutoCompleteListStyles];

  static properties = {
    items: { type: Array },
    siteLanguage: { type: String },
    loadingData: { type: Boolean },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
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
        label="${this.localize('search:searchInAllText')}"
        @keyup=${e => {
            if (timeoutId !== null) {
              clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
              this.#keyupHandler(e);
            }, 1000);
        }}
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
                  <span class="search-suggestion-tip">${this.localize('autocomplete:filterSearch')}</span>
                  <span class="search-suggestion-filter">${item.uid}</span>
                  <span class="search-suggestion-query">${this.searchQuery}</span>
                </span>

                <span class="search-suggestion-prompt">${icon.search}</span>
                <md-ripple></md-ripple>
              </a>
            </li>
          `
        )}
        ${until(this.#generateNavigationLinks(this.searchQuery), html``)}
        <hr />
        <div class="instant-nav-description-text">
          ${this.localize('autocomplete:goto')} ${icon.open_book}
          ${this.localize('autocomplete:textOr')} ${icon.network_node} ${this.localize('autocomplete:collection')}
        </div>
        ${this.items.map(
          item =>
            html` <li
              @click=${this.hide}
              class=${item.segmented_uid ? 'nav-segmented-text' : 'nav-title'}
            >
              <a class="instant-nav-link" target="_blank" href=${this.#generateURL(item)}>
                <span class="instant-nav">
                  ${item.nodeType === 'branch' ? icon.network_node : icon.open_book}
                  <span class="instant-nav-uid-title-wrap">
                    <span class="instant-nav-uid"
                      >${unsafeHTML(item.acronym || item.highlight_uid || item.uid)}
                      ${unsafeHTML(item.name ? ` – ${item.name}` : '')}
                      ${item.author ? ` – ${item.author}` : ''}</span
                    >
                    <span class=${item.segmented_uid ? 'instant-nav-text' : 'instant-nav-title'}>
                      ${item.segmented_uid ? html`
                        <span class="reference" title="SuttaCentral segment number">${item.segmented_uid}</span>
                      ` : ''}
                      ${unsafeHTML(item.title)}
                    </span>
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

  async #generateNavigationLinks(uid) {
    const api = `${API_ROOT}/navigation_data/${uid}?language=${this.language || 'en'}`;
    const menuData = await (await fetch(api)).json();
    const lastIndex = menuData.length - 1;
    if (menuData.length === 0) {
      return '';
    }
    return html`
      <hr />
      <li class="navigation-links">${menuData.map((item, i) => html`
        <a target="_blank" href=${item.url}>${item.title || item.uid}</a> ${i < lastIndex ? '>' : ''} `)}
      </li>
    `;
  }

  #footerTemplate() {
    return html`
      <span id="opensearchtip-left">
        Search By
        <a target="_blank" href="https://algolia.com">
          <img style="margin-top: 5px;"
            src="/img/Algolia-logo-blue.png"
            height="15px"
            width="80px"
          />
        </a>
        <md-icon-button
          aria-label="${this.localize('interface:tipsForSearchSyntax')}"
          href="/search-filter"
          @click=${this.hide}
        >
          ${icon.info}
        </md-icon-button>
        <span>${this.localize('interface:tipsForSearchSyntax')}</span>
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

    if (this.loadingData) {
      return;
    }

    this.searchQuery = this.shadowRoot.getElementById('search_input')?.value?.trim();

    if (!this.searchQuery || this.searchQuery.length < 2) {
      return;
    }

    if (!/[\u4e00-\u9fa5]/.test(this.searchQuery) && this.searchQuery.length < 3) {
      return;
    }

    if (/volpage:|author:|title:|list authors|in:/.test(this.searchQuery)) {
      return;
    }

    if (this.searchQuery.length > 512) {
      this.searchQuery = this.searchQuery.substring(0, 500);
    }

    this.searchResult.length = 0;
    this.items.length = 0;

    this.loadingData = true;
    try {
      if (/\d/.test(this.searchQuery)) {
        await this.#searchByOrama();
        this.items = [...this.searchResult];
      } else {
        this.#instantSearch();
      }
    } finally {
      this.loadingData = false;
    }
  }

  async #instantSearch() {
    if (this.searchQuery?.length >= 2) {
      this.#fulltextSearchByAlgolia();
    } else {
      this.items = [];
    }
  }

  async #searchByOrama() {
    if (suttaDB?.data?.docs?.count === 0) {
      await this.#initInstantSearchData();
    }

    const searchParams = [
      {
        term: this.searchQuery,
        properties: '*',
        limit: 15,
        boost: {
          uid: 2,
          translationTitle: 1.5,
          rootTitle: 1.4,
        },
        threshold: 0.4,
      },
      {
        term: this.searchQuery,
        properties: '*',
        tolerance: 1,
        limit: 20,
        boost: {
          uid: 2,
          rootTitle: 1.5,
          translationTitle: 1.4,
        },
      },
    ];

    let hits = [];

    for (const params of searchParams) {
      const searchResult = await search(suttaDB, params);
      hits = searchResult.hits;
      if (hits.length > 0) {
        break;
      }
    }

    const copiedHits = JSON.parse(JSON.stringify(hits));
    this.searchResult = copiedHits.map(hit => hit.document);
    for (const item of this.searchResult) {
      item.highlight_uid = this.#highlight(item.uid, this.searchQuery);
      item.title = this.#highlight(item.title, this.searchQuery);
    }
  }

  #fulltextSearchByAlgolia() {
    const langFilters = this.#computeAlgoliaSearchLangFilter();
    algoliaSegmentedTextIndex
      .search(this.searchQuery, {
        filters: `(${langFilters} OR is_root:true) AND is_ebs:true`,
        restrictSearchableAttributes: ['uid', 'name', 'segmented_text'],
      })
      .then(({ hits }) => {
        const ebsNameHits = hits.filter(item => item.is_ebs_name);
        let segmentedTextHits = hits.filter(item => !item.is_ebs_name);
        segmentedTextHits = segmentedTextHits.filter(item => {
          if (item._highlightResult.name.matchLevel === 'full'
                && item._highlightResult.segmented_text.matchLevel === 'none') {
            return false;
          }
          return true;
        });
        const formattedHit = [];
        for (const hit of ebsNameHits) {
          formattedHit.push({
            uid: hit.uid,
            highlight_uid: hit._highlightResult?.uid?.value || hit.uid,
            isRoot: hit.is_root,
            nodeType: hit.node_type,
            title: hit._highlightResult?.name?.value,
            lang: hit.lang,
            author_uid: '',
          });
        }
        this.searchResult = this.#mergedResultByUid(formattedHit);

        for (const hit of segmentedTextHits) {
          let { segmented_text, segmented_uid } = this.#extractSegmentedInfo(hit);
          this.searchResult.push({
            uid: hit.uid,
            highlight_uid: hit._highlightResult?.uid?.value || hit.uid,
            acronym: hit.acronym,
            isRoot: hit.is_root,
            nodeType: hit.node_type || 'leaf',
            title:
              segmented_text ||
              hit._highlightResult?.name?.value ||
              hit.segmented_text,
            lang: hit.lang,
            author: hit.author,
            author_uid: hit.author_uid,
            segmented_uid: segmented_uid,
            name: hit._highlightResult?.name?.value || hit.name,
          });
        }
        this.items = this.searchResult;
        if (this.items.length === 0) {
          this.searchResult.length = 0;
          this.#searchByOrama();
          this.#fulltextSearchByArangoSearch();
        }
        this.loadingData = false;
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  #computeAlgoliaSearchLangFilter() {
    let selectedLangs = store
      .getState()
      .searchOptions.displayedLanguages.filter(item => item.checked);
    selectedLangs = selectedLangs.map(item => item.uid);
    let langFilters = selectedLangs.map(lang => `lang:${lang}`).join(' OR ');
    if (selectedLangs.length === 0 || !langFilters) {
      langFilters = `lang:${this.siteLanguage}`;
    }
    return langFilters;
  }

  #extractSegmentedInfo(hit) {
    let { segmented_uid } = hit;
    segmented_uid = segmented_uid?.split(':')[1] || segmented_uid;
    let segmented_text = hit._highlightResult?.segmented_text?.value;
    const segmentedTexts = hit._highlightResult?.segmented_text?.value?.split('\n\n');
    for (const text of segmentedTexts) {
      if (text.includes('class="highlight"')) {
        const parts = text.split(':');
        if (parts.length >= 2) {
          segmented_uid = parts[0];
          segmented_text = parts[1];

          if (segmented_uid.includes('class="highlight"')) {
            segmented_uid = '';
          }
        }
        break;
      }
    }
    return { segmented_text, segmented_uid };
  }

  async #fulltextSearchByArangoSearch() {
    if (!this.searchQuery) {
      return;
    }
    const segmentedTextData = await (
      await fetch(`${API_ROOT}/fulltextsearch/${this.searchQuery}`)
    ).json();
    for (const hit of segmentedTextData) {
      this.searchResult.push({
        uid: hit.uid,
        acronym: hit.acronym,
        isRoot: hit.is_root,
        nodeType: 'leaf',
        title: this.#highlight(hit.segmented_text, this.searchQuery),
        lang: hit.lang,
        author: hit.author,
        author_uid: hit.author_uid,
        segmented_uid: hit.segmented_uid?.split(':')[1] || hit.segmented_uid,
        name: hit.name,
      });
    }
    this.items = [...this.searchResult]
  }

  #highlight(text, searchTerm) {
    if (!text || !searchTerm) {
      return '';
    }
    const regex = new RegExp(searchTerm, 'gi');
    return text.replace(regex, match => `<strong class="highlight">${match}</strong>`);
  }

  #mergedResultByUid(hits) {
    return Object.values(
          hits.reduce((acc, curr) => {
            if (acc[curr.uid]) {
              if (acc[curr.uid].isRoot !== curr.isRoot) {
                if (curr.isRoot) {
                  acc[curr.uid].title = `${curr.title} – ${acc[curr.uid].title}`;
                } else {
                  acc[curr.uid].title += ` – ${curr.title}`;
                  acc[curr.uid].lang = curr.lang;
                  acc[curr.uid].nodeType = curr.nodeType;
                }
              }
            } else {
              acc[curr.uid] = curr;
            }
            return acc;
          }, {})
        );
  }
}

customElements.define('sc-auto-complete-list', SCAutoCompleteList);
