import { LitElement, html } from "@polymer/lit-element";

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
      }
    };
  }

  render() {
    const { icon, title, message } = this.messages[this.type];

    return html`
      <style>
        .error {
          @apply --center;
          @apply --sc-sans-font;
          @apply --sc-skolar-font-size-static-subtitle;
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
