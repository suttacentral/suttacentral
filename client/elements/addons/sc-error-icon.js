import { LitElement, html} from "lit-element";

import { LitLocalized } from './localization-mixin';

import { icon } from '../../img/sc-icon';

export class SCErrorIcon extends LitLocalized(LitElement) {
  static get properties() {
    return {
      type: String
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-error-icon';

    this.messages = {
      "no-network": {
        image: 'nonetwork',
        title: 'networkError',
        message: 'offline'
      },
      "general-error": {
        image: 'generalerror',
        title: 'generalError',
        message: 'generalError'
      },
      "page-no-found": {
        image: 'pagenotfound',
        title: 'pageNoFound',
        message: 'pageNoFound'
      },
      "data-load-error": {
        image: 'dataloaderror',
        title: 'dataLoadError',
        message: 'dataLoadError'
      },
      "connect-to-internet": {
        image: 'connecttointernet',
        title: 'connectToInternet',
        message: 'connectToInternet'
      }
    };
  }

  render() {
    const { image, title, message } = this.messages[this.type];

    return html`
      <style>
        .error {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 50vw;
          font-family: var(--sc-sans-font);
          font-size: var(--sc-skolar-font-size-static-subtitle);
          color: var(--sc-secondary-text-color);
          text-align: center;
        }

        .icon {
          width: var(--sc-size-xxl);
          height: var(--sc-size-xxl);
        }
      </style>

      <div class="error">
        ${icon[image]}
        <div>${this.localize(message)}</div>
      </div>
    `;
  }
}

customElements.define('sc-error-icon', SCErrorIcon);
