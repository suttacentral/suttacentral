import { LitLocalized } from '../addons/localization-mixin.js';
import { css, html, LitElement } from 'lit-element';

class SCDonationSuccessPage extends LitLocalized(LitElement) {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-donate-success-page';
  }

  static get styles() {
    return css``;
  }

  render() {
    return html`
      <p>Thank You</p>
    `;
  }
}

customElements.define('sc-donation-success-page', SCDonationSuccessPage);
