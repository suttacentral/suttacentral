import { html, css, LitElement } from 'lit';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { store } from '../../redux-store';
import { icon } from '../../img/sc-icon';
import { API_ROOT } from '../../constants';

class SCAutoCompleteList extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 49px;
      left: 28px;
      width: 90%;
      z-index: 9999;
      background-color: var(--sc-primary-background-color);
      color: var(--sc-primary-text-color);
      display: none;
    }

    .search-suggestions {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
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
      color: var(--sc-secondary-text-color);
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
      padding: 10px;
      background-color: var(--sc-tertiary-background-color);
      border-radius: 0.25rem;
      margin-bottom: 0.25rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    li:focus:after {
      content: 'go to ⏎';
      color: var(--sc-primary-accent-color);
      font-size: var(--sc-skolar-font-size-xs);
      font-weight: 600;
      font-stretch: condensed;
    }

    li:hover {
      background-color: var(--sc-primary-accent-color-light-transparent);
    }

    li:active {
      background-color: var(--sc-primary-accent-color-light);
    }

    li:focus {
      background-color: var(--sc-primary-accent-color-light-transparent);
    }

    .ss-footer {
      border-top: 1px solid var(--sc-border-color);
    }

    .ss-item-bottom {
      border-bottom: 1px solid var(--sc-border-color);
    }

    li a {
      text-decoration: none;
      color: var(--sc-primary-accent-color);
    }
  `;

  static properties = {
    items: { type: Array },
  };

  constructor() {
    super();
    this.items = [];
    this.priorityAuthors = new Map([['en', 'sujato']]);
    this.searchQuery = store.getState().searchQuery || '';
  }

  firstUpdated() {
    const ulELem = document
      .querySelector('sc-navigation-linden-leaves')
      .shadowRoot.querySelector('sc-action-items-universal')
      .shadowRoot.querySelector('sc-auto-complete-list')
      .shadowRoot.querySelector('ul');

    document.addEventListener('keydown', event => {
      const currentSelectedItem = document
        .querySelector('sc-navigation-linden-leaves')
        .shadowRoot.querySelector('sc-action-items-universal')
        .shadowRoot.querySelector('sc-auto-complete-list')
        .shadowRoot.querySelector('.selected');

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
  }

  render() {
    return html`${this.#suggestionsTemplate()}`;
  }

  openSearchTip() {
    dispatchCustomEvent(this, 'sc-navigate', { pathname: '/search-filter' });
  }

  gotoSearch(event, uid, searchQuery) {
    if (event.type === 'click' || event.key === 'Enter') {
      this.style.display = 'none';
      const link = `/search?query=in:${uid} ${searchQuery}`;
      dispatchCustomEvent(this, 'sc-navigate', { pathname: link });
    }
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

  async selectItem(item) {
    const siteLang = store.getState().siteLanguage;
    this.currentMenuData = await this.#fetchMenuData(item);

    let link = `/${item}`;
    if (!this.#menuHasChildren() && this.priorityAuthors.get(siteLang)) {
      link = `/${item}/${siteLang}/${this.priorityAuthors.get(siteLang)}`;
    }
    dispatchCustomEvent(this, 'sc-navigate', { pathname: link });
    document
      .querySelector('sc-navigation-linden-leaves')
      .shadowRoot.querySelector('sc-action-items-universal')
      .shadowRoot.querySelector('#search_input').value = item;
    this.style.display = 'none';
  }

  handleKeyDown(event, index, uid) {
    if (event.key === 'Enter') {
      this.selectItem(uid);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = Math.min(this.items.length - 1, this.selectedIndex + 1);
    }
    this.requestUpdate();
  }

  handleMouseOver(event, index) {
    const autoCompleteList = document
      .querySelector('sc-navigation-linden-leaves')
      .shadowRoot.querySelector('sc-action-items-universal')
      .shadowRoot.querySelector('sc-auto-complete-list').shadowRoot;

    const currentSelectedItem = autoCompleteList.querySelector('.selected');
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
    const searchQuery = document
      .querySelector('sc-navigation-linden-leaves')
      .shadowRoot.querySelector('sc-action-items-universal')
      .shadowRoot.querySelector('#search_input').value;

    const tipitakas = [
      { uid: 'ebt', title: 'Early Buddhist texts' },
      { uid: 'dn', title: 'Dīgha Nikāya' },
      { uid: 'mn', title: 'Majjhima Nikāya' },
      { uid: 'sn', title: 'Saṁyutta Nikāya' },
      { uid: 'an', title: 'Aṅguttara Nikāya' },
    ];

    return html`
      <div class="search-suggestions">
        <div class="ss-list">
          <ul id="ss-items">
            ${searchQuery &&
            tipitakas.map(
              (item, i) => html`
                <li
                  class=${i === tipitakas.length - 1 ? 'ss-item-bottom' : ''}
                  @click=${(e) => this.gotoSearch(e, item.uid, searchQuery)}
                  @keydown=${(e) => this.gotoSearch(e, item.uid, searchQuery)}
                >
                  <span class="suggestion-item">
                    <span>${icon.search_gray}</span>
                    <span>in:${item.uid} ${searchQuery}</span>
                  </span>
                  <span>Search in ${item.title}</span>
                </li>
              `
            )}
            ${this.items.map(
              (item, i) =>
                html`<li
                  tabindex=${i === this.selectedIndex ? '0' : '-1'}
                  @click=${() => this.selectItem(item.uid)}
                  @keydown=${e => this.handleKeyDown(e, i, item.uid)}
                  @mouseover=${e => this.handleMouseOver(e, i)}
                  class=${i === 0 ? 'selected' : ''}
                >
                  <span class="suggestion-item-description">
                    <span class="ss-item-uid"><span>${icon.leaves}</span>${item.uid}</span>
                    <span class="ss-item-title">${item.title}</span>
                  </span>
                </li>`
            )}

            <li @click=${() => this.openSearchTip()} class="ss-footer">
              <span>${icon.tip}</span><span>Search syntax tips</span>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('sc-auto-complete-list', SCAutoCompleteList);
