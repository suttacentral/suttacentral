import { LitElement, html, css } from 'lit';
import { icon } from '../../img/sc-icon';

export class SCTextStepper extends LitElement {
  static properties = {
    next: { type: Object },
    previous: { type: Object },
    lang: { type: String },
  };

  static styles = css`
    @media print {
      :host {
        display: none;
      }
    }

    .bar {
      display: flex;
      overflow: hidden;

      height: 100px;
      margin: 0 0 -64px 0;

    border-top: 1px solid var(--sc-border-color);;
    background-color: var(--sc-secondary-background-color);
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

      opacity: 0.55;
      color: var(--sc-secondary-text-color);
    }

    .text-title {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-skolar-font-size-l);

      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--sc-primary-text-color);
    }

    .link {
      text-decoration: none;

      color: inherit;
    }

    .link .text-title {
      opacity: 0.8;

      box-sizing: border-box;

      border-bottom: 4px solid rgba(0, 0, 0, 0);

      transition: all 200ms ease;
    }

    .link:hover .text-title {
      opacity: 1;

      border-bottom: 4px solid var(--sc-primary-color-light);

      transition: all 200ms ease;
    }

    .link:active .text-title {
      background-color: var(--sc-primary-color-light-transparent);

      transition: background-color 200ms ease;
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

    .icon {
      font-size: var(--sc-skolar-font-size-l);

      width: var(--sc-size-md-larger);
      min-width: var(--sc-size-md-larger);
      margin-top: 1em;
      margin-right: 0.5em;
      margin-left: 0.5em;

      fill: var(--sc-icon-color);
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

      .arrow_right {
        margin-left: 1em;
      }

      .arrow_left {
        margin-right: 1em;
      }
    }
  `;

  render() {
    return html`
      <div class="bar">
        <div class="button-container">
          ${this.previous && this.previous.uid
            ? html`
                <a href=${this._getUrl(this.previous)} class="link">
                  <div class="button button-left">
                    <div class="text">
                      ${icon.arrow_left}
                      <div class="text-element">
                        <span class="action">Previous</span>
                        <span class="text-title">${this.previous.name}</span>
                      </div>
                    </div>
                  </div>
                </a>
              `
            : ''}
        </div>

        <div class="separator"></div>

        <div class="button-container">
          ${this.next && this.next.uid
            ? html`
                <a href=${this._getUrl(this.next)} class="link">
                  <div class="button button-right">
                    <div class="text">
                      <div class="text-element text-element-right">
                        <span class="action">Next</span>
                        <span class="text-title">${this.next.name}</span>
                      </div>
                      ${icon.arrow_right}
                    </div>
                  </div>
                </a>
              `
            : ''}
        </div>
      </div>
    `;
  }

  _getUrl(object) {
    const { author_uid: author, uid, lang } = object;
    return `/${uid}/${lang}/${author}`;
  }
}

customElements.define('sc-text-stepper', SCTextStepper);
