import { html, css, LitElement } from 'lit';
import { create, search, insertMultiple } from '@orama/orama';
import '@material/web/textfield/filled-text-field';
import '@material/web/iconbutton/icon-button';
import '@material/web/button/text-button';

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
      color: var(--sc-on-primary-secondary-text-color);
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
  `;

  static properties = {
    items: { type: Array },
    siteLanguage: { type: String },
  };

  constructor() {
    super();
    this.items = [];
    this.priorityAuthors = new Map([['en', 'sujato']]);
    this.searchQuery = store.getState().searchQuery || '';
    this.siteLanguage = store.getState().siteLanguage;
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
    } catch (error) {
      console.error(error);
    }
  }

  firstUpdated() {
    this.shadowRoot.getElementById('search_input').focus();
    this.#initInstantSearchData();
    const ulELem = this.shadowRoot.querySelector('ul');

    document.addEventListener('keydown', event => {
      const currentSelectedItem = this.shadowRoot.querySelector('.selected');

      if (!currentSelectedItem) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();

        if (currentSelectedItem) {
          currentSelectedItem.classList.remove('selected');
          currentSelectedItem.tabIndex = -1;

          const nextItem = currentSelectedItem.nextElementSibling;
          if (nextItem) {
            nextItem.classList.add('selected');
            nextItem.tabIndex = 0;
            nextItem.focus();
          } else {
            const firstItem = ulELem.querySelector('li:first-child');
            if (firstItem) {
              firstItem.classList.add('selected');
              firstItem.tabIndex = 0;
              firstItem.focus();
            }
          }
        } else {
          const firstItem = ulELem.querySelector('li:first-child');
          if (firstItem) {
            firstItem.classList.add('selected');
            firstItem.tabIndex = 0;
            firstItem.focus();
          }
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();

        if (currentSelectedItem) {
          currentSelectedItem.classList.remove('selected');
          currentSelectedItem.tabIndex = -1;

          const previousItem = currentSelectedItem.previousElementSibling;
          if (previousItem) {
            previousItem.classList.add('selected');
            previousItem.tabIndex = 0;
            previousItem.focus();
          } else {
            const lastItem = ulELem.querySelector('li:last-child');
            if (lastItem) {
              lastItem.classList.add('selected');
              lastItem.tabIndex = 0;
              lastItem.focus();
            }
          }
        } else {
          const lastItem = ulELem.querySelector('li:last-child');
          if (lastItem) {
            lastItem.classList.add('selected');
            lastItem.tabIndex = 0;
            lastItem.focus();
          }
        }
      }
    });

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

  render() {
    return html`${this.#suggestionsTemplate()}`;
  }

  #openSearchTip() {
    this.#hide();
    dispatchCustomEvent(this, 'sc-navigate', { pathname: '/search-filter' });
  }

  #gotoSearch(event, uid, searchQuery) {
    if (event.type === 'click' || event.key === 'Enter') {
      this.#hide();
      const searchTerm = uid ? `${uid} ${searchQuery}` : searchQuery;
      const link = `/search?query=${searchTerm}`;
      dispatchCustomEvent(this, 'sc-navigate', { pathname: link });
    }
  }

  #hide() {
    this.style.display = 'none';
  }

  #menuHasChildren() {
    return (
      this.currentMenuData?.[0]?.children?.some(child => child.node_type === 'branch') || false
    );
  }

  async #fetchMenuData(uid) {
    try {
      return await (await fetch(this.#computeMenuApiUrl(uid))).json();
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  #computeMenuApiUrl(uid) {
    return `${API_ROOT}/menu/${uid}?language=${store.getState().siteLanguage || 'en'}`;
  }

  async #selectItem(item) {
    const siteLang = store.getState().siteLanguage;
    this.currentMenuData = await this.#fetchMenuData(item);

    let link = `/${item}`;
    if (!this.#menuHasChildren() && this.priorityAuthors?.get(siteLang)) {
      link = `/${item}/${siteLang}/${this.priorityAuthors.get(siteLang)}`;
    }
    dispatchCustomEvent(this, 'sc-navigate', { pathname: link });
    this.#hide();
  }

  #keyDownHandler(event, index, uid) {
    if (event.key === 'Enter') {
      this.#selectItem(uid);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = Math.min(this.items.length - 1, this.selectedIndex + 1);
    }
    this.requestUpdate();
  }

  #mouseOverHandler(event, index) {
    const currentSelectedItem = this.shadowRoot.querySelector('.selected');
    if (currentSelectedItem) {
      currentSelectedItem.classList.remove('selected');
      currentSelectedItem.tabIndex = -1;
    }

    this.selectedIndex = index;
    event.target.classList.toggle('selected');
    event.target.tabIndex = 0;
    event.target.focus();
  }

  #suggestionsTemplate() {
    const tipitakas = [
      { uid: 'in:ebt', title: 'Early Buddhist Texts' },
      { uid: 'in:dn', title: 'Dīgha Nikāya' },
      { uid: 'in:mn', title: 'Majjhima Nikāya' },
      { uid: 'in:sn', title: 'Saṁyutta Nikāya' },
      { uid: 'in:an', title: 'Aṅguttara Nikāya' },
      { uid: '', title: 'All Texts' },
    ];

    return html`
      <div id="instant_search_dialog" class="search-suggestions">
        <div class="ss-header">
          <md-filled-text-field
            id="search_input"
            type="search"
            label="Input search term"
            @keyup=${e => this.#keyupHandler(e)}
            @keypress=${this.#keypressHandler}
          >
            <md-icon slot="trailingicon" @click=${this.#startSearch}> ${icon.search} </md-icon>
          </md-filled-text-field>
        </div>
        <div class="ss-list">
          <ul id="ss-items">
            ${this.searchQuery &&
            tipitakas.map(
              (item, i) => html`
                <li
                  @click=${e => this.#gotoSearch(e, item.uid, this.searchQuery)}
                  @keydown=${e => this.#gotoSearch(e, item.uid, this.searchQuery)}
                >
                  <span class="suggestion-item">
                    <span class="search-icon">${icon.search_gray}</span>
                    <span class="search-entry"
                      ><span class="search-filter">in:${item.uid}</span>
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
                html`<li
                  tabindex=${i === this.selectedIndex ? '0' : '-1'}
                  @click=${() => this.#selectItem(item.uid)}
                  @keydown=${e => this.#keyDownHandler(e, i, item.uid)}
                  @mouseover=${e => this.#mouseOverHandler(e, i)}
                  class=${i === 0 ? 'selected' : ''}
                >
                  <span class="suggestion-item-description">
                    <span class="ss-item-uid">
                      <span class="ss-item-uid-icon">${icon.leaves}</span>
                      <span class="ss-item-uid-text">${item.uid}</span>
                      <span class="ss-item-title">${item.title}</span>
                    </span>
                  </span>
                  <span>${icon.gotolink}</span>
                  <md-ripple></md-ripple>
                </li>`
            )}
            <hr />
          </ul>
        </div>

        <div id="openSearchTip">
          <span id="opensearchtip-left">
            <md-icon-button aria-label="Tips for search syntax" @click=${this.#openSearchTip}>
              ${icon.info}
            </md-icon-button>
            <span>Tips for search syntax</span>
          </span>
          <md-icon-button @click=${this.#hide}>${icon.close}</md-icon-button>
        </div>
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
      this.#hide();
      dispatchCustomEvent(this, 'sc-navigate', { pathname: `/search?query=${searchQuery}` });
    }
  }

  async #keyupHandler(e) {
    if (e.key === 'Enter') {
      return;
    }
    this.searchQuery = e.target.value;
    if (this.searchQuery.length >= 2) {
      const searchResult = await search(suttaDB, {
        term: this.searchQuery,
        properties: '*',
        tolerance: 1,
        limit: 7,
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
