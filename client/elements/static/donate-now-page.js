import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-input/paper-textarea.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/social-icons.js";
import "@polymer/iron-ajax/iron-ajax.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-item-body.js";
import "@polymer/iron-form/iron-form.js";
import "@polymer/paper-spinner/paper-spinner.js";
import "@polymer/iron-location/iron-location.js";
import "@polymer/paper-toast/paper-toast.js";

import '../addons/stripe-card.js';
import '../addons/sc-error-icon.js';
import { ReduxMixin } from '../../redux-store.js';
import { Localized } from "../addons/localization-mixin.js";
import { staticStyles } from '../styles/static-styles.old.js';
import { API_ROOT } from '../../constants.js';

class SCDonateNow extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    ${staticStyles}
    <style>
      .flex-row {
        display: flex;
      }

      .data-input {
        --paper-input-container-focus-color: var(--sc-primary-accent-color);
      }

      .currency-dropdown {
        --paper-menu-button-content: {
          display: flex;
          @apply --shadow-elevation-8dp;
        };
        --paper-input-container-focus-color: var(--sc-primary-accent-color);
        --paper-dropdown-menu-icon: {
          color: var(--sc-disabled-text-color);
        };
        --paper-dropdown-menu-input: {
          --paper-input-container-input-color: var(--sc-primary-text-color);
          --paper-input-container-color: var(--sc-secondary-text-color);
        };
        width: 6em;
        margin-right: var(--sc-size-md);
      }

      .currency-menu-listbox {
        width: 6em;
        background-color: var(--sc-secondary-background-color);
      }

      .currency-menu-item {
        color: var(--sc-primary-text-color);
        background-color: var(--sc-secondary-background-color);
      }

      .currency-menu-item:hover {
        background-color: var(--sc-tertiary-background-color);
        cursor: pointer;
      }

      .frequency-checkbox {
        --paper-checkbox-checked-color: var(--sc-primary-accent-color);
        --paper-checkbox-unchecked-color: var(--sc-disabled-text-color);
        --paper-checkbox-label-color: var(--sc-secondary-text-color);
        --paper-checkbox-label-checked-color: var(--sc-primary-text-color);
        margin-right: 1em;
      }

      .explanation {
        color: var(--sc-secondary-text-color);
        margin-bottom: 8px;
      }

      .legal-information {
        color: var(--sc-secondary-text-color);
        margin-top: 3em;
        padding-bottom: 1em;
      }

      .submit {
        width: 100%;
        justify-content: flex-end;
        margin-top: 1.5em;
      }

      .submit-button {
        background: var(--sc-primary-accent-color);
        color: var(--sc-tertiary-text-color);
        font-weight: bold;
        @apply --sc-all-caps;
      }

      .submit-button[disabled] {
        background: var(--sc-disabled-text-color);
      }

      .card-row {
        margin-top: 1.5em;
      }

      .spinner {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 101;
      }

      .blocker {
        top: 0;
        left: 0;
        opacity: 1;
        width: 100%;
        height: 100%;
        z-index: 100;
        position: fixed;
      }

      .data-input {
        --paper-input-container-input: {
          color: var(--sc-primary-text-color);
        };
        --paper-input-container-color: var(--sc-secondary-text-color);
        padding-bottom: var(--sc-size-md);
      }

      .form-prefix {
        color: var(--sc-disabled-text-color);
        margin-right: 0.5em;
      }

      .sc-tooltip {
        --paper-tooltip-opacity: 0.98;
        --paper-tooltip-background: var(--sc-paper-tooltip-color);
        --paper-tooltip: {
          @apply --sc-skolar-font-size-xs;
          line-height: var(--sc-size-md);
          padding: var(--sc-size-sm) var(--sc-size-md);
          text-shadow: 0 0 var(--sc-secondary-background-color);
          white-space: normal;
        }
      }

      .margin-bottom-md {
        margin-bottom: var(--sc-size-md);
      }
    </style>

    <iron-ajax
        auto
        id='currency_ajax'
        url="[[_computeCurrencyUrl(language)]]"
        handle-as="json"
        last-response="{{responseData}}"
        on-response="_handleResponse"></iron-ajax>

    <iron-ajax
        auto
        id='stripe_key_ajax'
        url="[[_computeStripeKeyUrl()]]"
        handle-as="json"
        last-response="{{stripePublicKey}}"></iron-ajax>

    <iron-ajax
        class="make-donation-ajax"
        url="/api/donate"
        handle-as="json"
        method="post"
        body="{{formData}}"
        last-response="{{donationResponseData}}"
        last-error="{{donationResponseError}}"
        on-error="_paymentError"
        on-response="_paymentFinished"></iron-ajax>

    <iron-location path="{{path}}"></iron-location>

    <template is="dom-if" if="[[isOnline]]">
      <div id="page-wrap">
        <main>
          <section>
            <h1 class="margin-bottom-md">{{localize('donateNow')}}</h1>
            <iron-form id="donation_form" class="payment-iron-form">
              <form class="payment-form">
                <div class="flex-row">
                  <paper-dropdown-menu class="currency-dropdown data-input" aria-label="Select currency"
                                      label="{{localize('currency')}}" always-float-label>
                    <paper-listbox slot="dropdown-content" class="currency-menu-listbox"
                                  selected="[[default_currency_index]]">
                      <template is="dom-repeat" items="[[currencies]]">
                        <paper-item id$="[[item.symbol]]" class="currency-menu-item">
                          [[item.symbol]]
                        </paper-item>
                      </template>
                    </paper-listbox>
                  </paper-dropdown-menu>

                  <template is="dom-repeat" items="[[currencies]]">
                    <paper-tooltip for="[[item.symbol]]" position="right" class="sc-tooltip" animation-delay="100">
                      [[item.name]]
                    </paper-tooltip>
                  </template>

                  <paper-input label="{{localize('amount')}}" class="data-input amount-input" auto-validate
                              pattern="^[+]?(\\d+[.,]?\\d{0,2})$" allowed-pattern="[0-9.,]" required maxlength=20></paper-input>
                </div>

                <p class="explanation">{{localize('chooseFrequency')}}</p>
                <div class="flex-row">
                  <paper-checkbox class="frequency-checkbox one-time-donation" checked>{{localize('oneTime')}}
                  </paper-checkbox>
                  <paper-checkbox class="frequency-checkbox monthly-donation">{{localize('monthly')}}
                  </paper-checkbox>
                </div>

                <stripe-card id="stripe_card" class="card-row" publishable-key="{{stripePublicKey}}"
                            token="{{stripeResponse}}"
                            hide-zip hide-submit></stripe-card>

                <paper-input label="{{localize('Name (optional)')}}" class="data-input name-input" maxlength=200>
                  <iron-icon icon="social:person" slot="prefix" class="form-prefix"></iron-icon>
                </paper-input>

                <paper-input label="{{localize('email')}}" class="data-input email-input" auto-validate
                            pattern="^\\S+@\\S+\\.\\S+$"
                            error-message="{{localize('invalidEmail')}}" maxlength=200>
                  <iron-icon icon="icons:mail" slot="prefix" class="form-prefix"></iron-icon>
                </paper-input>

                <paper-textarea label="{{localize('message')}}" class="data-input message-input" rows=2 maxlength=200
                                char-counter>
                </paper-textarea>

                <div class="flex-row submit">
                  <paper-button id="submit_button" on-tap="_makeDonation" class="submit-button" raised>
                    <div>{{localize('payWithCard')}}</div>
                  </paper-button>
                </div>
              </form>
            </iron-form>

            <div class="legal-information">
              <iron-icon icon="icons:info-outline" class="form-prefix"></iron-icon>
              <p inner-h-t-m-l="{{localize('storageDisclaimer')}}"></p>
              <p>{{localize('feeDisclaimer')}}</p>
            </div>
          </section>
        </main>
      </div>
      <template is="dom-if" if="[[processingPayment]]">
        <div class="blocker"></div>
        <div class="spinner">
          <paper-spinner active></paper-spinner>
        </div>
      </template>
    </template>

    <template is="dom-if" if="[[!isOnline]]">
      <sc-error-icon type="no-network"></sc-error-icon>
    </template>`;
  }

  static get properties() {
    return {
      responseData: {
        type: Object
      },
      stripeResponse: {
        type: String
      },
      currencies: {
        type: Array
      },
      default_currency_index: {
        type: Number
      },
      data: {
        type: Object
      },
      donationResponse: {
        type: Object
      },
      path: {
        type: String
      },
      formData: {
        type: String
      },
      donationResponseData: {
        type: Object
      },
      donationResponseError: {
        type: Object
      },
      processingPayment: {
        type: Boolean
      },
      isStripeValid: {
        type: Boolean,
        value: false
      },
      errorMessages: {
        type: Object,
        value: {
          0: 'UnknownError',
          1: 'AmountCannotBeLessThan',
          2: 'StripeLimitations',
          3: 'cardDeclined'
        }
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-donate-now-page'
      },
      donationSuccessData: {
        type: Object,
        statePath: 'donationSuccessData'
      },
      fallbackLanguage: {
        type: String,
        value: 'en'
      },
      isOnline: {
        type: Boolean,
        statePath: 'isOnline'
      },
      stripePublicKey: {
        type: String
      }
    }
  }

  static get actions() {
    return {
      setDonationSuccessData(donationSuccessData) {
        return {
          type: 'CHANGE_DONATION_SUCCESS',
          donationSuccessData: donationSuccessData
        }
      }
    }
  }

  ready() {
    super.ready();
    setTimeout(() => {
      this._addEventListeners();
    });
  }

  _addEventListeners() {
    let oneTimeDonation = this.shadowRoot.querySelector('.one-time-donation');
    let monthly = this.shadowRoot.querySelector('.monthly-donation');
    let amountInput = this.shadowRoot.querySelector('.amount-input');

    if (oneTimeDonation) {
      oneTimeDonation.addEventListener('click', (e) => {
        oneTimeDonation.checked = true;
        monthly.checked = false;
      });
    }

    if (monthly) {
      monthly.addEventListener('click', (e) => {
        oneTimeDonation.checked = false;
        monthly.checked = true;
      });
    }

    if (amountInput) {
      amountInput.onpaste = (e) => {  // Don't allow pasting text data.
        let pastedText = '';
        if (window.clipboardData && window.clipboardData.getData) { // IE
          pastedText = window.clipboardData.getData('Text');
        } else if (e.clipboardData && e.clipboardData.getData) {
          pastedText = e.clipboardData.getData('text/plain');
        }
        if (!/^[+]?(\d+[.,]?\d{0,2})$/.test(pastedText)) {
          return false;
        }
      };

      amountInput.addEventListener('keydown', (e) => {
        if (e.key === ',') {
          let position = amountInput.$.nativeInput.selectionStart;
          amountInput.value = amountInput.value.slice(0, position) + '.' + amountInput.value.slice(position);
          e.preventDefault();
        }
      });
    }
  }

  _handleResponse() {
    this.currencies = this.responseData.currencies;
    this.default_currency_index = this.responseData.default_currency_index;
  }

  _makeDonation(e) {
    const ironForm = this.shadowRoot.querySelector('.payment-iron-form');
    const stripeCard = this.shadowRoot.querySelector('#stripe_card');
    if (!stripeCard.$.form.validate() || !ironForm.validate()) {
      return;
    }
    stripeCard.createToken().then(v => {
      let data = this._getFormData();
      this.processingPayment = true;
      this.shadowRoot.querySelector('#submit_button').disabled = true;
      data.stripe = this.stripeResponse;
      this.formData = JSON.stringify(data);
      let ironAjax = this.shadowRoot.querySelector('.make-donation-ajax');
      ironAjax.generateRequest();
    }).catch(e => {
      console.error(e);
      this._showToast('error', 'UnknownError');
    });
  }

  _paymentFinished() {
    this.processingPayment = false;
    this.dispatch('setDonationSuccessData', this.donationResponseData);
    setTimeout(() => {
      this.shadowRoot.querySelector('#submit_button').disabled = false;
      this.resetForm();
      this.set('path', '/donation-success');
    }, 0);
  }

  _paymentError() {
    this.shadowRoot.querySelector('#submit_button').disabled = false;
    let errCode = this.donationResponseError.response['err_code'];
    this.processingPayment = false;
    this._showToast('error', this.errorMessages[errCode]);
  }

  _getFormData() {
    let form = this.shadowRoot.querySelector('.payment-form');

    let data = {};

    let currency = form.querySelector('.currency-menu-listbox').selected;
    data.currency = this.currencies[currency].symbol;

    data.amount = parseFloat(form.querySelector('.amount-input').value);
    data.oneTimeDonation = form.querySelector('.one-time-donation').checked;
    data.monthlyDonation = form.querySelector('.monthly-donation').checked;
    data.name = form.querySelector('.name-input').value;
    data.email = form.querySelector('.email-input').value;
    data.message = form.querySelector('.message-input').value;
    return data;
  }

  resetForm() {
    const donationForm = this.shadowRoot.querySelector('#donation_form');
    if (!donationForm) {
      return;
    }
    donationForm.reset();
    this.shadowRoot.querySelector('.amount-input').value = undefined;
    this.shadowRoot.querySelector('.one-time-donation').checked = true;
    this.shadowRoot.querySelector('.monthly-donation').checked = false;
    this.shadowRoot.querySelector('.name-input').value = undefined;
    this.shadowRoot.querySelector('.email-input').value = undefined;
    this.shadowRoot.querySelector('.message-input').value = undefined;
  }

  _computeCurrencyUrl(language) {
    return `${API_ROOT}/currencies?language=${language}`;
  }

  _computeStripeKeyUrl() {
    return `${API_ROOT}/stripe_public_key`;
  }

  _showToast(toastType, text) {
    const localizedText = this.localize(text);
    this.dispatchEvent(new CustomEvent('show-sc-toast', {
      detail: {
        toastType: toastType,
        message: localizedText ? localizedText : text
      },
      bubbles: true,
      composed: true
    }));
  }

}

customElements.define('sc-donate-now-page', SCDonateNow);
