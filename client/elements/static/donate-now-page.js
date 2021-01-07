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

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles.js';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles.js';

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
        ${layoutSimpleStyles}
        ${typographyCommonStyles}

form
{
    display: flex;
    flex-direction: column;

    margin-top: 16px;
}

.row
{
    display: flex;

    margin-top: 16px;
}

.first-optional
{
    margin: 64px 0 18px
}

mwc-textfield,
mwc-textarea,
mwc-select
{
    --mdc-typography-subtitle1-font-family: var(--sc-sans-font);
    --mdc-theme-primary: var(--sc-primary-color);
}

mwc-formfield
{
    --mdc-typography-body2-font-family: var(--sc-sans-font);
}

mwc-radio
{
      --mdc-theme-secondary: var(--sc-primary-color);
}

mwc-textfield,
mwc-textarea
{
    flex-grow: 1;
}

mwc-select
{
    margin-right: 20px;
    width: 120px;
}

mwc-select + mwc-textfield
{
  max-width: 240px
}

 #submit-row
{
    justify-content: flex-end;
}

  mwc-button
  {
        --mdc-theme-primary: var(--sc-primary-accent-color);

        --mdc-typography-button-font-family: var(--sc-sans-font);
        --mdc-typography-button-font-weight: 600;
  }

aside
{
    font-family: var(--sc-sans-font);

    margin-top: 64px;
}

mwc-icon
{
    vertical-align: middle;

    fill: var(--sc-disabled-text-color);
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
      <main>
      <article>
        

            <h1>${this.localize('donateNow')}</h1>
<form>
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
          <div class="row">
            <mwc-formfield label="${this.localize('oneTime')}">
              <mwc-radio name="frequency" checked></mwc-radio>
            </mwc-formfield>
            <mwc-formfield label="${this.localize('monthly')}">
              <mwc-radio name="frequency"></mwc-radio>
            </mwc-formfield>
          </div>
          <div class="row first-optional">
            <mwc-textfield
              label="${this.localize('Name (optional)')}"
              maxlength="200"
            ></mwc-textfield>
          </div>
          <div class="row">
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
        <aside>
          <p>
            <mwc-icon>${icons['info']}</mwc-icon>
            ${unsafeHTML(this.localize('storageDisclaimer'))}
          </p>
          <p>
          <mwc-icon>${icons['info']}</mwc-icon> 
          ${this.localize('feeDisclaimer')}
          </p>
        </aside>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-donate-now-page', SCDonateNow);
