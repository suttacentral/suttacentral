import { LitElement, html, css } from 'lit';
import { icon } from '../../img/sc-icon';

export class SCTextContextMenu extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static properties = {
    keyword: { type: String },
  };

  constructor() {
    super();
    this.keyword = '';
  }

  render() {
    return html`
      <style>
        #context-menu {
          display: none;
          position: absolute;
          z-index: 1000;
          background-color: var(--sc-tertiary-background-color);
          border: 1px solid var(--sc-border-color);
          border-radius: 5px;
          padding: 5px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }

        #context-menu a {
          display: flex;
          color: var(--sc-primary-text-color);
          text-decoration: none;
        }

        #context-menu a strong {
          margin-left: 3px;
          margin-right: 3px;
        }

        #context-menu:hover {
          background-color: var(--sc-primary-color-light);
        }
      </style>

      <div id="context-menu"> 
        <a href='/search?query=${this.keyword}' target="_blank">
          ${icon.search}
          Search <strong> "${this.reduced_keyword}" </strong> In SuttaCentral
          <md-ripple></md-ripple>
        </a> 
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

  updated(changedProperties) {
    if (changedProperties.has('keyword')) {
      this.requestUpdate();
      this.reduced_keyword = this.keyword;
      if (this.keyword.length > 30) {
        this.reduced_keyword = this.keyword.slice(0, 30) + '...';
      }
    }
  }
}

customElements.define('sc-text-context-menu', SCTextContextMenu);
