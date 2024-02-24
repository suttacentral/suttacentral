import { LitElement, html, css } from 'lit';
import { icon } from '../../img/sc-icon';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class SCTextStepper extends LitLocalized(LitElement) {
  static properties = {
    next: { type: Object },
    previous: { type: Object },
    lang: { type: String },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
  }

  static styles = css`
    @media print {
      :host {
        display: none;
      }
    }

    .bar {
      display: flex;
      overflow: hidden;

      margin: 0 2%;
      padding: 0;

      border-radius: 48px;

      gap: 4%;
      justify-content: space-around;
    }

    @media only screen and (max-width: 600px) {
      .bar {
        flex-direction: column;
        ;

        height: 13rem;
      }
    }

    a {
      text-decoration: none;
    }

    .button {
      display: flex;

      width: 100%;
      min-width: 10rem;
      height: 6rem;

      border-radius: 48px;
      background-color: var(--sc-tertiary-background-color);
    }

    .button:hover {
      transition: var(--sc-link-transition);
      text-decoration: none;

      background-color: var(--sc-primary-color-light-transparent);
    }

    button:active {
      background-color: var(--sc-primary-color-light);
    }



    .button-right {
      justify-content: flex-end;
    }

    .button-right .text-title {
      padding-left: 1em;
    }

    .button-left .text-title {
      padding-right: 1em;
    }

    .action {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-s);
      font-stretch: expanded;

      opacity: .55;
      color: var(--sc-on-primary-primary-text-color);

      font-variant-caps: all-small-caps;
    }

    .text-title {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-l);
      font-stretch: condensed;

      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--sc-on-tertiary-primary-text-color);
    }

    .link .text-title {
      box-sizing: border-box;

      transition: var(--sc-link-transition);
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
      font-size: var(--sc-font-size-l);

      width: var(--sc-size-md-larger);
      min-width: var(--sc-size-md-larger);
      margin-top: 1em;
      margin-right: .5em;
      margin-left: .5em;

      fill: var(--sc-icon-color);
    }

    @media (min-width: 1280px) {
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
          ${this.previous?.uid
            ? html`
                <a href=${this._getUrl(this.previous)}>
                  <div class="button button-left">
                    <div class="text">
                      ${icon.arrow_left}
                      <div class="text-element">
                        <span class="action">${unsafeHTML(this.localize('interface:previous'))}</span>
                        <span class="text-title">${this.previous.name}</span>
                      </div>
                    </div>
                    <md-ripple></md-ripple>
                  </div>
                </a>
              `
            : ''}
        </div>

        <div class="button-container">
          ${this.next?.uid
            ? html`
                <a href=${this._getUrl(this.next)}>
                  <div class="button button-right">
                    <div class="text">
                      <div class="text-element text-element-right">
                        <span class="action">${unsafeHTML(this.localize('interface:next'))}</span>
                        <span class="text-title">${this.next.name}</span>
                      </div>
                      ${icon.arrow_right}
                    </div>
                    <md-ripple></md-ripple>
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
