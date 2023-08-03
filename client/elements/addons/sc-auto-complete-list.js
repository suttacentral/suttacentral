import { html, css, LitElement } from 'lit';
import { dispatchCustomEvent } from '../../utils/customEvent';

class SCAutoCompleteList extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 48px;
      left: 0;
      width: 100%;
      z-index: 9999;
      background-color: white;
      color: black;
      display: none;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      border: 2px solid rgb(67, 160, 71);
      border-top: 0;
      overflow-y: auto;
      width: 100%;
    }

    li {
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 5px;
      margin-bottom: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    li:hover {
      background-color: var(--sc-primary-color);
    }

    li.selected {
      background-color: var(--sc-primary-color);
    }
  `;

  static properties = {
    items: { type: Array },
  };

  constructor() {
    super();
    this.items = [];
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
              ${item.uid} – ${item.title}
            </li>`
        )}
      </ul>
    `;
  }

  selectItem(item) {
    dispatchCustomEvent(this, 'sc-navigate', { pathname: `/${item}` });
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
