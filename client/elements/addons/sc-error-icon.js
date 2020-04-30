import { LitElement, html } from "lit-element";

import { LitLocalized } from './localization-mixin';

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
        icon: '/img/nonetwork.svg',
        title: 'networkError',
        message: 'offline'
      },
      "general-error": {
        icon: '/img/generalerror.svg',
        title: 'generalError',
        message: 'generalError'
      },
      "page-no-found": {
        icon: '/img/pagenofound.svg',
        title: 'pageNoFound',
        message: 'pageNoFound'
      },
      "data-load-error": {
        icon: '/img/dataloaderror.svg',
        title: 'dataLoadError',
        message: 'dataLoadError'
      },
      "connect-to-internet": {
        icon: '/img/connecttointernet.svg',
        title: 'connectToInternet',
        message: 'connectToInternet'
      }
    };
  }

  render() {
    const { icon, title, message } = this.messages[this.type];

    return html`
      <style>
        .error {
                  position: absolute;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
        <iron-icon src="${icon}" class="icon" title="${this.localize(title)}"></iron-icon>
        <div>${this.localize(message)}</div>
      </div>
    `;
  }
}

customElements.define('sc-error-icon', SCErrorIcon);
