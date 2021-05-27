/* eslint-disable indent */
import { LitElement, html, css } from 'lit-element';
import { LitLocalized } from '../addons/sc-localization-mixin';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import '@material/mwc-radio';
import '@material/mwc-formfield';

import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { API_ROOT } from '../../constants';
import { icon } from '../../img/sc-icon';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { loadStripe } from '@stripe/stripe-js';

class SCStaticDonateNow extends LitLocalized(LitElement) {
  static get properties() {
    return {
      currencies: {
        type: Array,
      },
      defaultCurrencyIndex: {
        type: Number,
      },
      localizedStringsPath: {
        type: String,
      },
      isError: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-donate-now-page';
    this.isError = false;
  }

  static get styles() {
    return css`
      ${layoutSimpleStyles}
      ${typographyCommonStyles}
            /* allow mwc-select to drop below container */
          article {
        content-visibility: visible;
        height: 100vh;
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

      mwc-textfield,
      mwc-select {
        --mdc-typography-subtitle1-font-family: var(--sc-sans-font);
        --mdc-theme-primary: var(--sc-primary-color);
        --mdc-theme-primary: var(--sc-primary-accent-color);
      }

      mwc-formfield {
        --mdc-typography-body2-font-family: var(--sc-sans-font);
        --mdc-theme-text-primary-on-background: var(--sc-primary-text-color);
      }

      mwc-radio {
        --mdc-theme-secondary: var(--sc-primary-color);
        --mdc-radio-unchecked-color: var(--sc-icon-color);
      }

      mwc-textfield {
        flex-grow: 1;
        --mdc-text-field-fill-color: var(--sc-tertiary-background-color);
        --mdc-text-field-ink-color: var(--sc-primary-text-color);
        --mdc-text-field-label-ink-color: var(--sc-secondary-text-color);
      }

      mwc-select {
        margin-right: 20px;
        width: 120px;
        --mdc-theme-primary: var(--sc-primary-accent-color);
        --mdc-select-fill-color: var(--sc-tertiary-background-color);
        --mdc-typography-font-family: var(--sc-sans-font);
        --mdc-theme-surface: var(--sc-secondary-background-color);
        --mdc-select-ink-color: var(--sc-primary-text-color);
        --mdc-select-label-ink-color: var(--sc-secondary-text-color);
        --mdc-select-dropdown-icon-color: var(--sc-icon-color);
      }

      mwc-list-item {
        color: var(--sc-primary-text-color);
      }

      mwc-select + mwc-textfield {
        max-width: 240px;
      }

      mwc-button {
        --mdc-theme-primary: var(--sc-primary-accent-color);

        --mdc-typography-button-font-family: var(--sc-sans-font);
        --mdc-typography-button-font-weight: 600;
      }

      aside {
        font-family: var(--sc-sans-font);

        margin-top: 64px;
      }

      .icon {
        vertical-align: text-bottom;

        fill: var(--sc-icon-color);
      }
    `;
  }

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
    const isValid = this.shadowRoot.querySelector('mwc-textfield').reportValidity();
    if (isValid) {
      this.processPayment().catch(() => (this.isError = true));
    }
  }

  async processPayment() {
    const currency = this.shadowRoot.querySelector('mwc-select').value;
    // API takes values for instance in cents but we want to to have dollars
    const selectedAmount = this.shadowRoot.querySelector('mwc-textfield').value * 100;
    const amount = Number.isNaN(selectedAmount) ? 0 : selectedAmount;
    const frequency = Array.from(this.shadowRoot.querySelectorAll('#frequency-checkbox mwc-radio'))
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

    if (result.error) this.isError = true;
  }

  renderForm() {
    return html`
      <main>
        <article>
          <h1>${this.localize('donateNow')}</h1>
          <form @submit="${this.onSubmit}">
            <div class="row">
              <mwc-select label="${this.localize('currency')}">
                ${this.currencies &&
                this.currencies.map(
                  ({ symbol }, index) => html`
                    <mwc-list-item
                      ?selected="${index === this.defaultCurrencyIndex}"
                      value="${symbol}"
                    >
                      ${symbol}
                    </mwc-list-item>
                  `
                )}
              </mwc-select>
              <mwc-textfield
                pattern="^[+]?(\\d+[.,]?\\d{0,2})$"
                type="number"
                label="${this.localize('amount')}"
                autoValidate
                required
                validationMessage="${this.localize('invalidValue')}"
                maxlength="20"
              ></mwc-textfield>
            </div>
            <div class="row">
              <p>${this.localize('chooseFrequency')}</p>
            </div>
            <div id="frequency-checkbox" class="row">
              <mwc-formfield label="${this.localize('oneTime')}">
                <mwc-radio name="frequency" checked value="oneTime"></mwc-radio>
              </mwc-formfield>
              <mwc-formfield label="${this.localize('monthly')}">
                <mwc-radio name="frequency" value="monthly"></mwc-radio>
              </mwc-formfield>
            </div>
            <div id="submit-row" class="row margin-top">
              <mwc-button
                raised
                label="${this.localize('payWithCard')}"
                @click="${({ target }) => {
                  const form = target.closest('form');
                  form.requestSubmit();
                  if (form.requestSubmit) {
                    form.requestSubmit();
                  } else {
                    form.submit();
                  }
                }}"
              ></mwc-button>
            </div>
          </form>
          <aside>
            <p>${icon.info} ${unsafeHTML(this.localize('storageDisclaimer'))}</p>
            <p>${icon.info} ${this.localize('feeDisclaimer')}</p>
          </aside>
        </article>
      </main>
    `;
  }

  renderErrorMessage() {
    return html` <p id="error-message">${this.localize('errorMessage')}</p> `;
  }

  render() {
    return this.isError ? this.renderErrorMessage() : this.renderForm();
  }
}

customElements.define('sc-static-donate-now', SCStaticDonateNow);
