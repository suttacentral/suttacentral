import { LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-ripple/paper-ripple.js';

class SCStepper extends LitElement {
  render() {
    return html`
    <style>
      @media print {
        :host {
          display: none;
        }
      }

      .bar {
        display: flex;
        width: 100%;
        height: calc(var(--sc-size-xxl) * 1.5);
        background-color: var(--sc-primary-color);
        overflow: hidden
      }

      .button {
        width: 100%;
      }

      .button-container {
        position: relative;
        margin: 0;
        height: 100%;
        width: 50%;
      }

      .button {
        width: 100%;
        height: 100%;
      }

      .action {
        @apply --paper-font-common-base;
        @apply --sc-skolar-font-size-md;
        color: var(--sc-paper-tooltip-text-color);
        opacity: .55;
      }

      .text-title {
        @apply --paper-font-common-base;
        @apply --sc-skolar-font-size-l;
        color: var(--sc-paper-tooltip-text-color);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .link {
        text-decoration: none;
        color: inherit;
      }

      .button {
        display: flex;
        height: 100%;
      }

      .button-right {
        justify-content: flex-end;
      }

      .text {
        margin: auto 0;
        display: flex;
      }

      .text-element {
        display: inline-grid;
        text-overflow: ellipsis;
      }

      .text-element-right {
        text-align: end;
      }

      .arrow {
        @apply --sc-skolar-font-size-l;
        width: var(--sc-size-md-larger);
        min-width: var(--sc-size-md-larger);
        color: var(--sc-paper-tooltip-text-color);
        margin-top: 1em;
        margin-left: .5em;
        margin-right: .5em;
      }

      .separator {
        width: 10%;
      }

      @media (min-width: 1280px) {
        .button-right {
          margin-right: 20%;
          width: 80%;
        }

        .button-left {
          margin-left: 20%;
          width: 80%;
        }

        .arrow-right {
          margin-left: 1em;
        }

        .arrow-left {
          margin-right: 1em;
        }
      }
    </style>

    <div class="bar">
      <div class="button-container">        
        ${this.previous && this.previous.uid ? html`
          <paper-ripple></paper-ripple>
          <a href="${this._getUrl(this.previous)}" class="link">
            <div class="button button-left">
              <div class="text">
                <iron-icon icon="sc-iron-icons:arrow-back" class="arrow arrow-left"></iron-icon>
                <div class="text-element">
                  <span class="action">Previous</span>
                  <span class="text-title">${this.previous.name}</span>
                </div>
              </div>
            </div>
          </a>        
        ` : ''}
      </div>

      <div class="separator"></div>

      <div class="button-container">        
        ${this.next && this.next.uid ? html`
          <paper-ripple></paper-ripple>
          <a href="${this._getUrl(this.next)}" class="link">
            <div class="button button-right">
              <div class="text">
                <div class="text-element text-element-right">
                  <span class="action">Next</span>
                  <span class="text-title">${this.next.name}</span>
                </div>
                <iron-icon icon="sc-iron-icons:arrow-forward" class="arrow arrow-right"></iron-icon>
              </div>
            </div>
          </a>
          ` : ''}
      </div>

    </div>`;
  }

  static get properties() {
    return {
      next: { type: Object },
      previous: { type: Object },
      lang: { type: String }
    }
  }

  _getUrl(object) {
    const author = object.author_uid;
    const uid = object.uid;
    const lang = object.lang;
    return `/${uid}/${lang}/${author}`;
  }
}

customElements.define('sc-stepper', SCStepper);
