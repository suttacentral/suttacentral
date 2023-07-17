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
  `;

  static properties = {
    items: { type: Array },
  };

  constructor() {
    super();
    this.items = [];
  }

  render() {
    return html`
      <ul>
        ${this.items.map(
          item =>
            html`<li @click=${() => this.selectItem(item.uid)}>${item.uid} – ${item.title}</li>`
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
}

customElements.define('sc-auto-complete-list', SCAutoCompleteList);
