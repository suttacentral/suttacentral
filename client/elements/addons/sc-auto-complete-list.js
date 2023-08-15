import { html, css, LitElement } from 'lit';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { store } from '../../redux-store';

class SCAutoCompleteList extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 48px;
      left: 0;
      width: 100%;
      z-index: 9999;
      background-color: var(--sc-primary-background-color);
      color: var(--sc-primary-text-color);
      display: none;
    }

    ul {
      list-style: none;
      padding: .5rem .5rem .25rem;
      margin: 0;
      overflow-y: auto;
      width: 100%;
      box-shadow: var(--sc-shadow-elevation-4dp);

    }

      ul:before{
    content: "search";
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
      border-radius: .25rem;
      margin-bottom: .25rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

    }

    li:focus:after{
      content: "go to ⏎";
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

  `;

  static properties = {
    items: { type: Array },
  };

  constructor() {
    super();
    this.items = [];
    this.priorityAuthors = new Map([['en', 'sujato']]);
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
    return html`
      <ul>
        ${this.items.map(
          (item, i) =>
            html`<li
              tabindex=${i === this.selectedIndex ? '0' : '-1'}
              @click=${() => this.selectItem(item.uid)}
              @keydown=${e => this.handleKeyDown(e, i, item.uid)}
              @mouseover=${e => this.handleMouseOver(e, i)}
              class=${i === 0 ? 'selected' : ''}
            >
              ${item.uid} — ${item.title}
            </li>`
        )}
      </ul>
    `;
  }

  selectItem(item) {
    const siteLang = store.getState().siteLanguage;
    let link = `/${item}`;
    if (this.priorityAuthors.get(siteLang)) {
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
}

customElements.define('sc-auto-complete-list', SCAutoCompleteList);
