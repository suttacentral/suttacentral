import { html, css, LitElement } from 'lit';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { store } from '../../redux-store';
import { icon } from '../../img/sc-icon';
import { API_ROOT } from '../../constants';

import '@material/web/textfield/filled-text-field';
import { create, search, insert, insertMultiple } from '@orama/orama';

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
      top: 1px;
      left: 5%;
      width: 89.4%;
      z-index: 9999;
      background-color: var(--sc-primary-background-color);
      display: none;
    }

    .search-suggestions {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 0 0.25rem 0.25rem rgba(0, 0, 0, 0.48);
    }

    .suggestion-item {
      display: grid;
      grid-template-columns: max-content minmax(0, auto) max-content;
      grid-template-areas: 'title title title' 'subtitle subtitle subtitle';
      user-select: unset;
      font-size: 18px;
    }

    .ss-item-uid {
      color: var(--sc-primary-text-color);
      font-size: 18px;
    }

    .ss-item-title {
      color: var(--sc-on-primary-secondary-text-color);
    }

    .suggestion-item-description {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      grid-area: label;
    }

    ul {
      list-style: none;
      padding: 0.5rem 0.5rem 0.25rem;
      margin: 0;
      overflow-y: auto;
    }

    ul:before {
      content: 'search';
      position: absolute;
      top: -16px;
      right: 72px;
      font-size: var(--sc-skolar-font-size-xxs);
      font-weight: 600;
      font-stretch: condensed;
      color: var(--sc-tertiary-text-color);
    }

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      border-radius: 0.25rem;
      margin-bottom: 0.25rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      color: var(--sc-on-primary-primary-text-color);
    }

    li:hover {
      background-color: var(--sc-primary-color-light);
    }

    li:active {
      background-color: var(--sc-primary-color-light);
    }

    li:focus {
      background-color: var(--sc-primary-color-light);
    }

    md-filled-text-field {
      --md-filled-text-field-container-color: var(--sc-tertiary-background-color);
      margin: 10px 0px 2px 9px;
      width: 98%;
      --md-sys-color-primary: var(--sc-primary-accent-color);
      --md-sys-color-on-primary: white;
      --md-filled-button-label-text-type: 600 var(--sc-size-md) var(--sc-sans-font);
    }

    md-icon {
      cursor: pointer;
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
      { uid: 'in:ebt', title: 'Early Buddhist texts' },
      { uid: 'in:dn', title: 'Dīgha Nikāya' },
      { uid: 'in:mn', title: 'Majjhima Nikāya' },
      { uid: 'in:sn', title: 'Saṁyutta Nikāya' },
      { uid: 'in:an', title: 'Aṅguttara Nikāya' },
      { uid: '', title: 'All Texts' },
    ];

    return html`
      <div class="search-suggestions">
        <md-filled-text-field
          id="search_input"
          type="search"
          label="Input search term"
          @keyup=${e => this.keyupHandler(e)}
          @keypress=${this.keypressHandler}
        >
          <md-icon slot="trailingicon" @click=${this.#startSearch}> ${icon.search} </md-icon>
        </md-filled-text-field>
        <div class="ss-list">
          <ul id="ss-items">
            ${this.searchQuery &&
            tipitakas.map(
              (item, i) => html`
                <li
                  @click=${(e) => this.#gotoSearch(e, item.uid, this.searchQuery)}
                  @keydown=${(e) => this.#gotoSearch(e, item.uid, this.searchQuery)}
                >
                  <span class="suggestion-item">
                    <span>${icon.search_gray}</span>
                    <span>${item.uid} ${this.searchQuery}</span>
                  </span>
                  <span>Search in ${item.title}</span>
                </li>
              `
            )}
            <md-divider></md-divider>
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
                    <span class="ss-item-uid"><span>${icon.leaves}</span>${item.uid}</span>
                    <span class="ss-item-title">${item.title}</span>
                  </span>
                  <span>${icon.gotolink}</span>
                </li>`
            )}
            <md-divider></md-divider>
            <li @click=${() => this.#openSearchTip()} class="ss-footer">
              <span>${icon.tip}</span><span>Search syntax tips</span>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  keypressHandler({ key }) {
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

  async keyupHandler(e) {
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
