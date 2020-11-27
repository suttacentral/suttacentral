import { LitElement, html } from 'lit-element';
import '@moduware/morph-ripple';
import '@material/mwc-icon';
import { icons } from '../../img/sc-icons';

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
          overflow: hidden;

          height: 100px;
          margin: 0;

          background-color: var(--sc-secondary-text-color);
        }

        .button {
          width: 100%;
        }

        .button-container {
          position: relative;

          width: 50%;
          height: 100%;
          margin: 0;
        }

        .button {
          width: 100%;
          height: 100%;
        }

        .action {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-md);

          opacity: .55;
          color: var(--sc-paper-tooltip-text-color);
        }

        .text-title {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-l);

          overflow: hidden;

          white-space: nowrap;
          text-overflow: ellipsis;

          color: var(--sc-paper-tooltip-text-color);
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
          display: flex;

          margin: auto 0;
        }

        .text-element {
          display: inline-grid;

          text-overflow: ellipsis;
        }

        .text-element-right {
          text-align: end;
        }

        .arrow {
          font-size: var(--sc-skolar-font-size-l);

          width: var(--sc-size-md-larger);
          min-width: var(--sc-size-md-larger);
          margin-top: 1em;
          margin-right: .5em;
          margin-left: .5em;

          color: var(--sc-paper-tooltip-text-color);
        }

        .separator {
          width: 10%;
        }

        @media (min-width: 1280px) {
          .button-right {
            width: 80%;
            margin-right: 20%;
          }

          .button-left {
            width: 80%;
            margin-left: 20%;
          }

          .arrow-right {
            margin-left: 1em;
          }

          .arrow-left {
            margin-right: 1em;
          }
        }

        morph-ripple {
          --ripple-color: var(--sc-primary-color);
        }
      </style>

      <div class="bar">
        <div class="button-container">
          ${this.previous && this.previous.uid ? html`
            <a href="${this._getUrl(this.previous)}" class="link">
              <div class="button button-left">
                <div class="text">
                  <mwc-icon class="arrow arrow-left">${icons['arrow_left']}</mwc-icon>
                  <div class="text-element">
                    <span class="action">Previous</span>
                    <span class="text-title">${this.previous.name}</span>
                  </div>
                </div>
              </div>
              <morph-ripple></morph-ripple>
            </a>
          ` : ''}
        </div>

        <div class="separator"></div>

        <div class="button-container">
          ${this.next && this.next.uid ? html`
            <a href="${this._getUrl(this.next)}" class="link">
              <div class="button button-right">
                <div class="text">
                  <div class="text-element text-element-right">
                    <span class="action">Next</span>
                    <span class="text-title">${this.next.name}</span>
                  </div>
                  <mwc-icon class="arrow arrow-right">${icons['arrow_right']}</mwc-icon>
                </div>
              </div>
              <morph-ripple></morph-ripple>
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
