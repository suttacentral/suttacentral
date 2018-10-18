import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "@polymer/iron-location/iron-location.js";

import { ReduxMixin } from '../../redux-store.js';
import { Localized } from '../addons/localization-mixin.js';
import { staticStyles } from '../styles/static-styles.old.js';

class SCDonationSuccessPage extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    ${staticStyles}
    <style>
      .bolded {
        font-weight: bold;
      }

      .italic {
        font-style: italic;
      }
    </style>

    <iron-location path="{{path}}"></iron-location>

    <div id="page-wrap">
      <main>
        <section>
          <template is="dom-if" if="{{donationSuccessData.amount}}">
            <div>{{localize('Acknowledge')}}</div><br>
            <div>{{localize('Description')}}</div><br>
            <template is="dom-if" if="{{donationSuccessData.name}}">
              <div>{{localize('Donor')}}: <span class="bolded">{{donationSuccessData.name}}</span></div>
            </template>
            <div>{{localize('Donation')}}: 
              <span class="bolded">{{donationSuccessData.amount}} {{donationSuccessData.currency}}</span>
            </div>
            <div>{{localize('PaidTo')}}: <span class="bolded">SuttaCentral Development Trust</span></div>
            <div>{{localize('PaymentService')}}: <span class="bolded">Stripe</span></div>
            <div>{{localize('TimeOfPayment')}}: <span class="bolded">{{donationSuccessData.dateTime}} UTC</span></div>
            <div>{{localize('TypeOfPayment')}}: 
              <span class="bolded">{{_getSubscriptionName(donationSuccessData.subscription, localize)}}</span>
            </div><br>
            <div>{{localize('Contact')}} 
              <a href="mailto:suttacentraldevelopmenttrust@gmail.com" target="_top"> 
                  suttacentraldevelopmenttrust@gmail.com
              </a>.
            </div><br>
            <div>
              {{localize('SuttaCentralDevelopmentTrustDescription')}}
            </div><br>
            <div class="cursive">Sadhu! Sadhu! Sadhu!</div>
          </template>
        </section>
      </main>
    </div>`;
  }

  static get properties() {
    return {
      path: {
        type: String
      },
      donationSuccessData: {
        type: Object,
        statePath: 'donationSuccessData',
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-donation-success-page'
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

  detached() {
    super.detached();
    this.dispatch('setDonationSuccessData', {});
  }

  _getSubscriptionName(subscription, localize) {
    return subscription ? localize('MonthlySubscription') : localize('OneTimeDonation');
  }

}

customElements.define('sc-donation-success-page', SCDonationSuccessPage);
