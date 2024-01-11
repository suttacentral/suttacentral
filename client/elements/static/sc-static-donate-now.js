import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { loadStripe } from '@stripe/stripe-js';

import '@material/web/textfield/filled-text-field';
import '@material/web/radio/radio';
import '@material/web/button/filled-button';
import '@material/web/select/filled-select';
import '@material/web/select/select-option';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { API_ROOT } from '../../constants';
import { icon } from '../../img/sc-icon';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';

export class SCStaticDonateNow extends LitLocalized(LitElement) {
  static properties = {
    currencies: { type: Array },
    defaultCurrencyIndex: { type: Number },
    localizedStringsPath: { type: String },
    isError: { type: Boolean },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.isError = false;
  }

  static styles = [
    layoutSimpleStyles,
    typographyCommonStyles,
    css`
      :host {
        --md-filled-button-label-text-font: var(--sc-serif-font);
        --md-filled-button-label-text-size: var(--sc-font-size-s);
      }

      #error-message {
        text-align: center;
      }

      form {
        display: flex;
        flex-direction: column;

        margin-top: 16px;
      }

      .row {
        display: flex;

        margin-top: 16px;
      }

      .first-optional {
        margin: 64px 0 18px;
      }

      md-radio {
        --md-sys-color-primary: var(--sc-primary-accent-color);
        --md-sys-color-on-primary: white;
        --md-radio-icon-color: var(--sc-opposite-background-color);
        --md-radio-selected-icon-color: var(--sc-primary-accent-color);
        --md-radio-hover-icon-color: var(--sc-primary-accent-color);
        --md-radio-focus-icon-color: var(--sc-primary-accent-color);
        --md-radio-pressed-icon-color: var(--sc-primary-accent-color);
        margin-right: 5px;
      }

      md-filled-text-field {
        --md-filled-text-field-container-color: var(--sc-tertiary-background-color);
        --md-filled-text-field-input-text-font: var(--sc-sans-font);
        --md-filled-text-field-input-text-size: var(--sc-size-md);
        --md-filled-text-field-focus-input-text-color: var(--sc-on-primary-primary-text-color);
        --md-filled-text-field-input-text-color: var(--sc-on-primary-primary-text-color);
        --md-filled-text-field-hover-input-text-color: var(--sc-on-primary-primary-text-color);
        --md-filled-text-field-label-text-color:  var(--sc-on-primary-secondary-text-color);
        --md-filled-text-field-supporting-text-color: var(--sc-on-primary-secondary-text-color);
      }

      md-filled-select {
        --md-sys-color-primary: var(--sc-primary-accent-color);
        --md-filled-select-text-field-container-color: var(--sc-tertiary-background-color);
        --md-filled-select-text-field-input-text-font: var(--sc-sans-font);
        --md-filled-select-text-field-input-text-color: var(--sc-on-primary-primary-text-color);
        --md-filled-select-text-field-focus-input-text-color: var(
          --sc-on-primary-primary-text-color
        );
        margin-right: 10px;
        min-width: 120px;
      }

      md-filled-select + md-filled-text-field {
        max-width: 240px;
      }

      md-filled-button,
      md-filled-text-field {
        --md-sys-color-primary: var(--sc-primary-accent-color);
        --md-sys-color-on-primary: white;
      }

      aside {
        font-family: var(--sc-sans-font);

        margin-top: 64px;
      }

      aside p a {
        color: var(--sc-primary-accent-color);
      }

      .icon {
        vertical-align: text-bottom;

        fill: var(--sc-icon-color);
      }

      label {
        margin-right: 20px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    fetch(`${API_ROOT}/currencies?language=${this.language}`)
      .then(r => r.json())
      .then(({ currencies, default_currency_index }) => {
        this.currencies = currencies;
        this.defaultCurrencyIndex = default_currency_index;
      })
      .catch(() => (this.isError = true));
  }

  onSubmit(e) {
    e.preventDefault();
    const isValid = this.shadowRoot.querySelector('md-filled-text-field').reportValidity();
    if (isValid) {
      this.processPayment().catch(() => (this.isError = true));
    }
  }

  async processPayment() {
    const currency = this.shadowRoot.querySelector('md-filled-select').value;
    // API takes values for instance in cents but we want to to have dollars
    const selectedAmount = this.shadowRoot.querySelector('md-filled-text-field').value * 100;
    const amount = Number.isNaN(selectedAmount) ? 0 : selectedAmount;
    const frequency = Array.from(this.shadowRoot.querySelectorAll('#frequency-checkbox md-radio'))
      .filter(el => el.checked)
      .map(el => el.value)[0];
    const config = await fetch(`${API_ROOT}/stripe_public_key`);
    const { public_key } = await config.json();
    const stripePromise = loadStripe(public_key);
    const stripe = await stripePromise;
    const response = await fetch(`${API_ROOT}/donate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency,
        amount,
        frequency,
      }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      this.isError = true;
    }
  }

  renderForm() {
    return html`
      <main>
        <article>
          <h1>${this.localize('donate:donateNow')}</h1>
          <form @submit="${this.onSubmit}">
            <div class="row">
              <md-filled-select required>
                <md-select-option selected value="USD">
                  <div slot="headline">USD</div>
                </md-select-option>
                ${this.currencies?.map(
                  ({ symbol }, index) => html`
                    <md-select-option
                      ?selected=${index === this.defaultCurrencyIndex}
                      value=${symbol}
                    >
                      <div slot="headline">${symbol}</div>
                    </md-select-option>
                  `
                )}
              </md-filled-select>

              <md-filled-text-field
                pattern="^[+]?(\\d+[.,]?\\d{0,2})$"
                type="number"
                label=${this.localize('donate:amount')}
                autoValidate
                required
                validationMessage=${this.localize('donate:invalidValue')}
                maxLength="20"
              ></md-filled-text-field>
            </div>
            <div class="row">
              <p>${this.localize('donate:chooseFrequency')}</p>
            </div>
            <div id="frequency-checkbox" class="row">
              <md-radio id="radioOneTime" name="frequency" checked value="oneTime"></md-radio>
              <label for="radioOneTime">${this.localize('donate:oneTime')}</label>

              <md-radio id="radioMonthly" name="frequency" value="monthly"></md-radio>
              <label for="radioMonthly">${this.localize('donate:monthly')}</label>
            </div>
            <div id="submit-row" class="row margin-top">
              <md-filled-button
                @click="${({ target }) => {
                  const form = target.closest('form');
                  if (form.requestSubmit) {
                    form.requestSubmit();
                  } else {
                    const button = document.createElement('input');
                    button.type = 'submit';
                    form.append(button);
                    button.click();
                    button.remove();
                  }
                }}"
                >${this.localize('donate:payWithCard')}</md-filled-button
              >
            </div>
          </form>
          <aside>
            <p>${icon.info} ${unsafeHTML(this.localize('donate:storageDisclaimer'))}</p>
            <p>${icon.info} ${this.localize('donate:feeDisclaimer')}</p>
          </aside>
        </article>
      </main>
    `;
  }

  renderErrorMessage() {
    return html` <p id="error-message">${this.localize('donate:errorMessage')}</p> `;
  }

  render() {
    return this.isError ? this.renderErrorMessage() : this.renderForm();
  }
}

customElements.define('sc-static-donate-now', SCStaticDonateNow);
