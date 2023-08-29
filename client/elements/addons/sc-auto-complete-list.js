import { html, css, LitElement } from 'lit';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { store } from '../../redux-store';
import { icon } from '../../img/sc-icon';
import { API_ROOT } from '../../constants';

class SCAutoCompleteList extends LitElement {
  static styles = css`
    :host
{
    position: absolute;
    z-index: 9999;
    top: 49px;
    left: var(--sc-size-sm);

    width: calc(100% - var(--sc-size-sm) * 2);

    display: none;

    color: var(--sc-on-primary-primary-text-color);
    border-radius: var(--sc-mid-border-radius);
    background-color: var(--sc-tertiary-background-color);
    box-shadow: var(--sc-shadow-elevation-24dp);
}

.search-suggestions
{
    width: 100%;
}

.suggestion-item
{
    font-size: 18px;

    display: grid;

    user-select: unset;

    grid-template-columns: max-content minmax(0, auto) max-content;
    grid-template-areas: 'title title title' 'subtitle subtitle subtitle';
}

.ss-item-uid
{
    font-size: var(--sc-font-size-md);

    display: flex;

    align-items: center;
    gap: 1rem;
}

.ss-item-title
{
    color: var(--sc-on-primary-primary-text-color);
}

.suggestion-item-description
{
    display: flex;
    flex-direction: row;

    gap: .25rem;
    grid-area: label;
}

ul
{
    overflow-y: auto;

    margin: 0;
    padding: .5rem .5rem .25rem;

    list-style: none;
}

li
{
    display: flex;

    margin-bottom: .25rem;
    padding: .5rem 1rem;

    cursor: pointer;
    transition: var(--sc-link-transition);

    border-radius: var(--sc-big-border-radius);
    background-color: var(--sc-secondary-background-color);

    align-items: center;
    justify-content: space-between;
}

li:focus:after
{
    font-size: var(--sc-font-size-s);
    font-weight: 600;
    font-stretch: condensed;

    content: 'go to ⏎';

    color: var(--sc-primary-accent-color);
}

li:hover
{
    background-color: var(--sc-primary-color-light-transparent);
}

li:active
{
    background-color: var(--sc-primary-color-light);
}

li:focus
{
    background-color: var(--sc-primary-accent-color-light-transparent);
}

.search-in
{
    font-size: var(--sc-font-size-s);
    font-stretch: condensed;

    color: var(--sc-on-primary-secondary-text-color);
}

.search-filter
{
    font-family: monospace;
    font-size: var(--sc-font-size-s);
}

.ss-footer
{
    color: var(--sc-on-tertiary-secondary-text-color);
    border-top: var(--sc-border);
    background-color: var(--sc-tertiary-background-color);
}

.ss-item-bottom
{
    border-bottom: var(--sc-border);
}

li a
{
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
                    <span class='search-icon'>${icon.search_gray}</span>
                    <span class='search-entry'><span class='search-filter'>in:${item.uid}</span> <span class='search-query'>${searchQuery}</span></span>
                  </span>
                  <span class='search-in'>Search in ${item.title}</span>
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
                    <span class="ss-item-uid"><span class="ss-item-uid-icon">${icon.leaves}</span><span class='ss-item-uid-text'>${item.uid}</span>
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
