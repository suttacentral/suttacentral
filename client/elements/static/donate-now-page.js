import { LitElement, html, css } from 'lit-element';
import { LitLocalized } from '../addons/localization-mixin.js';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import '@material/mwc-radio';
import '@material/mwc-formfield';
import '@material/mwc-textarea';
import '@material/mwc-icon';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { API_ROOT } from '../../constants.js';
import { icons } from '../../img/sc-icons';

class SCDonateNow extends LitLocalized(LitElement) {
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
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-donate-now-page';
  }

  static get styles() {
    return css`
      #form-wrapper {
        display: flex;
        justify-content: center;
      }

      #submit-row {
        justify-content: flex-end;
      }

      .flex-wrap {
        flex-wrap: wrap;
      }

      .row {
        width: 60vw;
        display: flex;
      }

      .margin-top {
        margin-top: 15px;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      mwc-select,
      mwc-textfield,
      mwc-textarea {
        flex-grow: 1;
      }

      mwc-select {
        margin-right: 20px;
      }

      mwc-icon {
        color: var(--sc-disabled-text-color);
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
      .catch(e => console.error(e));
  }

  render() {
    return html`
      <div id="form-wrapper" class="flex-wrap">
        <form>
          <div class="row">
            <h1>${this.localize('donateNow')}</h1>
          </div>
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
              label="${this.localize('amount')}"
              autoValidate
              required
              maxlength="20"
            ></mwc-textfield>
          </div>
          <div class="row">
            <p class="explanation">${this.localize('chooseFrequency')}</p>
          </div>
          <div class="row">
            <mwc-formfield label="${this.localize('oneTime')}">
              <mwc-radio name="frequency" checked></mwc-radio>
            </mwc-formfield>
            <mwc-formfield label="${this.localize('monthly')}">
              <mwc-radio name="frequency"></mwc-radio>
            </mwc-formfield>
          </div>
          <div class="row margin-top">
            <mwc-textfield
              label="${this.localize('Name (optional)')}"
              maxlength="200"
            ></mwc-textfield>
          </div>
          <div class="row margin-top">
            <mwc-textfield
              type="email"
              validationMessage="${this.localize('invalidEmail')}"
              maxlength="200"
              autoValidate
              label="${this.localize('email')}"
            ></mwc-textfield>
          </div>
          <div class="row">
            <mwc-textarea
              label="${this.localize('message')}"
              rows="2"
              maxlength="200"
              charCounter
            ></mwc-textarea>
          </div>
          <div id="submit-row" class="row margin-top">
            <mwc-button raised label="${this.localize('payWithCard')}"></mwc-button>
          </div>
        </form>
        <div class="row flex-wrap">
          <p>
            <mwc-icon>${icons['info']}</mwc-icon>
            ${unsafeHTML(this.localize('storageDisclaimer'))}
          </p>
          <p>${icons['info']} ${this.localize('feeDisclaimer')}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('sc-donate-now-page', SCDonateNow);
