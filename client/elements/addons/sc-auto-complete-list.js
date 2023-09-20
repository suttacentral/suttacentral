import { html, css, LitElement } from 'lit';
import { create, search, insertMultiple } from '@orama/orama';
import '@material/web/textfield/filled-text-field';
import '@material/web/iconbutton/icon-button';

import { LitLocalized } from './sc-localization-mixin';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { store } from '../../redux-store';
import { icon } from '../../img/sc-icon';
import { API_ROOT } from '../../constants';

const suttaDB = await create({
  schema: {
    uid: 'string',
    title: 'string',
  },
});

class SCAutoCompleteList extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      position: absolute;
      z-index: 9999;
      top: var(--sc-size-sm);
      left: var(--sc-size-sm);
      width: calc(100% - var(--sc-size-sm) * 2);
      display: none;
      margin: auto;
      color: var(--sc-on-tertiary-primary-text-color);
      border-radius: var(--sc-mid-border-radius);
      background-color: var(--sc-tertiary-background-color);
      box-shadow: 0 0 0 2048px rgba(0, 0, 0, 0.8);

      --md-icon-button-icon-size: 32px;
      --md-sys-color-primary: var(--sc-primary-accent-color);
    }

    .ss-list {
      overflow-y: auto;
    }

    .search-suggestions {
      position: relative;
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 0 0.25rem 0.25rem rgba(0, 0, 0, 0.48);
    }

    .suggestion-item {
      font-size: 18px;
      display: grid;
      user-select: unset;
      grid-template-columns: max-content minmax(0, auto) max-content;
      grid-template-areas: 'title title title' 'subtitle subtitle subtitle';
    }

    .ss-item-uid {
      font-size: var(--sc-font-size-md);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .ss-item-title {
      color: var(--sc-on-primary-primary-text-color);
    }

    .suggestion-item-description {
      display: flex;
      flex-direction: row;
      gap: 0.25rem;
      grid-area: label;
    }

    .ss-list {
      max-height: 90vh;
    }

    ul {
      margin: 0;
      padding: 0.5rem 0.5rem 0.25rem;
      list-style: none;
    }

    li {
      position: relative;
      display: flex;
      margin-bottom: 0.25rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: var(--sc-link-transition);
      border-radius: var(--sc-big-border-radius);
      background-color: var(--sc-secondary-background-color);
      align-items: center;
      justify-content: space-between;
    }

    li:hover {
      background-color: var(--sc-primary-color-light-transparent);
    }

    li:active {
      background-color: var(--sc-primary-color-light);
    }

    li:focus {
      background-color: var(--sc-primary-color-light);
    }

    .search-in {
      font-size: var(--sc-font-size-s);
      font-stretch: condensed;
      color: var(--sc-on-primary-secondary-text-color);
    }

    .search-filter {
      font-family: monospace;
      font-size: var(--sc-font-size-s);
    }

    .ss-header {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    md-filled-text-field {
      width: 99%;
      margin-top: 8px;

      --md-filled-text-field-container-color: var(--sc-tertiary-background-color);
      --md-sys-color-primary: var(--sc-primary-accent-color);
      --md-sys-color-on-primary: white;
      --md-filled-button-label-text-type: 600 var(--sc-size-md) var(--sc-sans-font);
    }

    .icon {
      fill: var(--sc-icon-color);
    }

    md-icon {
      cursor: pointer;
    }

    #openSearchTip {
      font-size: var(--sc-font-size-s);
      display: flex;
      padding: 0 16px 8px 16px;
      color: var(--sc-on-tertiary-secondary-text-color);
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
      margin: 8px 0;
    }

    li ~ hr,
    ul li:last-child + hr {
      display: flex;
    }

    .search-result-link {
      text-decoration: none;
      color: inherit;
      width: 90%;
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
    this.priorityAuthors = new Map([['en', 'sujato']]);
    this.searchQuery = store.getState().searchQuery || '';
    this.siteLanguage = store.getState().siteLanguage;
    this.loadingData = false;
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
      const { siteLanguage } = store.getState();
      this.instant_search_data = await (
        await fetch(`${API_ROOT}/possible_names/${siteLanguage}`)
      ).json();
      if (this.instant_search_data?.length < 1) {
        return;
      }
      await insertMultiple(suttaDB, this.instant_search_data);
      this.loadingData = false;
    } catch (error) {
      console.error(error);
    }
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
  }

  updated(changedProps) {
    if (changedProps.has('loadingData') && !this.loadingData && suttaDB.data.docs.count !== 0) {
      this.searchQuery = this.shadowRoot.getElementById('search_input').value;
      this.instantSearch();
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

  hide() {
    this.style.display = 'none';
  }

  #generateURL(item) {
    const siteLang = store.getState().siteLanguage;
    let link = `/${item.uid}`;
    if (item.nodeType === 'leaf' && this.priorityAuthors?.get(siteLang)) {
      link = `/${item.uid}/${siteLang}/${this.priorityAuthors.get(siteLang)}`;
    }
    return link;
  }

  #suggestionsTemplate() {
    return html`
      <div id="instant_search_dialog" class="search-suggestions">
        <div class="ss-header">${this.#headerTemplate()}</div>
        <div class="ss-list">${this.#searchResultListTemplate()}</div>
        <div id="openSearchTip">${this.#footerTemplate()}</div>
      </div>
    `;
  }

  #headerTemplate() {
    return html`
      <md-filled-text-field
        id="search_input"
        type="search"
        label="Input search term"
        @keyup=${e => this.#keyupHandler(e)}
        @keypress=${this.#keypressHandler}
        supporting-text="Search in all texts"
      >
        <md-icon slot="trailingicon" @click=${this.#startSearch}> ${icon.search} </md-icon>
      </md-filled-text-field>
    `;
  }

  #searchResultListTemplate() {
    const filters = [{ uid: 'in:ebs', title: 'Early Buddhist Suttas' }];
    return html`
      <ul id="ss-items">
        ${this.searchQuery &&
        filters.map(
          item => html`
            <li @click=${e => this.#gotoSearch(e, item.uid, this.searchQuery)}>
              <span class="suggestion-item">
                <span class="search-icon">${icon.search_gray}</span>
                <span class="search-entry"
                  ><span class="search-filter">${item.uid}</span>
                  <span class="search-query">${this.searchQuery}</span></span
                >
              </span>
              <span class="search-in">Search in ${item.title}</span>
              <md-ripple></md-ripple>
            </li>
          `
        )}
        <hr />
        ${this.items.map(
          (item, i) =>
            html`<li class=${i === 0 ? 'selected' : ''} @click=${this.hide}>
              <a class="search-result-link" href=${this.#generateURL(item)}>
                <span class="suggestion-item-description">
                  <span class="ss-item-uid">
                    <span class="ss-item-uid-icon"
                      >${item.nodeType === 'branch' ? icon.network_node : icon.open_book}</span
                    >
                    <span class="ss-item-uid-text">${item.uid}</span>
                    <span class="ss-item-title">${item.title}</span>
                  </span>
                </span>
              </a>
              <span>${icon.gotolink}</span>
              <md-ripple></md-ripple>
            </li>`
        )}
        <hr />
      </ul>
    `;
  }

  #footerTemplate() {
    return html`
      <span id="opensearchtip-left">
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
    const searchQuery = this.shadowRoot.getElementById('search_input').value;
    if (searchQuery) {
      this.hide();
      dispatchCustomEvent(this, 'sc-navigate', { pathname: `/search?query=${searchQuery}` });
    }
  }

  async #keyupHandler(e) {
    if (e.key === 'Enter') {
      return;
    }
    if (suttaDB.data.docs.count === 0) {
      this.loadingData = true;
      this.#initInstantSearchData();
    }

    if (this.loadingData) {
      return;
    }

    this.searchQuery = e.target.value;
    await this.instantSearch();
  }

  async instantSearch() {
    if (this.searchQuery.length >= 2) {
      const searchResult = await search(suttaDB, {
        term: this.searchQuery,
        properties: '*',
        tolerance: 1,
        limit: 20,
      });

      const { hits } = searchResult;
      const copiedHits = JSON.parse(JSON.stringify(hits));

      this.items = [];
      for (const hit of copiedHits) {
        this.items.push(hit.document);
      }
      this.#mergedResultByUid();
    } else {
      this.items = [];
    }
  }

  #mergedResultByUid() {
    const result = Object.values(
      this.items.reduce((acc, curr) => {
        if (acc[curr.uid]) {
          if (acc[curr.uid].isRoot !== curr.isRoot) {
            acc[curr.uid].title += ` – ${curr.title}`;
          }
        } else {
          acc[curr.uid] = curr;
        }
        return acc;
      }, {})
    );

    this.items = result;
  }
}

customElements.define('sc-auto-complete-list', SCAutoCompleteList);
