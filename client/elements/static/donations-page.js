import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '@polymer/paper-button/paper-button.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';


class SCDonationsPage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <style>
      .donate-button {
        background: var(--sc-primary-accent-color);
        color: var(--sc-tertiary-text-color);
        font-weight: bold;
        @apply --sc-all-caps;
      }


      .donate-link {
        background: none;
        margin: var(--sc-size-xxl) 0;
        text-decoration:none;
      }


      .donations-button {
        display: flex;
        justify-content: center;
      }


      .account-data td {
        padding-right: var(--sc-size-md);
      }
    </style>
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${this.localize('91aa88d8aaf128db44e4465b1926344d')}
            </h1>
            <p>
              ${this.localize('96b5b5e9b0ffe0d016284f045cd4ddd0')}
            </p>
            <div class="donations-button">
              ${unsafeHTML(this.localize('97d71c6585da8ff839b8b6f2c7e60cfc'))}
            </div>
            <h2>
              ${this.localize('89e1b8b5d1961ddedb63961b467c5756')}
            </h2>
            <ul>
              <li>
                ${this.localize('78eeb1032ef25936c2acb349178acb6d')}
              </li>
              <li>
                ${this.localize('0422c737cfc8dd12be260a60c051da9f')}
              </li>
              <li>
                ${this.localize('24c4a19a8fbe617a2806d6385f42d8f0')}
              </li>
              <li>
                ${this.localize('6311ae17c1ee52b36e68aaf4ad066387')}
              </li>
            </ul>
            <h2>
              ${this.localize('dc89e11e7951289a50d52f79eb3bec99')}
            </h2>
            <p>
              ${unsafeHTML(this.localize('391291e6ba69359522027cd2929a85c0'))}
            </p>
            <table class="account-data">
              <tr>
                <td>
                  ${this.localize('aa90c53280582695f3d4b8ac2ec17a8b')}
                </td>
                <td>
                  ${unsafeHTML(this.localize('acac21c523e18c3452147805c38cd1d3'))}
                </td>
              </tr>
              <tr>
                <td>
                  ${this.localize('984482eb9ff11e6310fef641d2268a2a')}
                </td>
                <td>
                  ${unsafeHTML(this.localize('e6d1e2b5899f1eb6c71be5d4780958ce'))}
                </td>
              </tr>
              <tr>
                <td>
                  ${this.localize('71a97b3fe90b01b307ae56f4a59e2dba')}
                </td>
                <td>
                  ${unsafeHTML(this.localize('30c5b44554155f7047c24da67135e88e'))}
                </td>
              </tr>
              <tr>
                <td>
                  ${this.localize('bce7114e8a26954326f6b566ab28ed38')}
                </td>
                <td>
                  ${unsafeHTML(this.localize('8000af2327cd2d89771e41e5195df4de'))}
                </td>
              </tr>
              <tr>
                <td>
                  ${this.localize('dd7bf230fde8d4836917806aff6a6b27')}
                </td>
                <td>
                  ${unsafeHTML(this.localize('5adc1be904a28f2329f96b7a645dcb23'))}
                </td>
              </tr>
              <tr>
                <td>
                  ${this.localize('9d70167863e5cb3e0f90f864a183e0c3')}
                </td>
                <td>
                  ${unsafeHTML(this.localize('c56cf716196a97aed0e781b9493d7a01'))}
                </td>
              </tr>
            </table>
            <p>
              ${this.localize('07ff6265d788cbc68fd4cd5f0a361abd')}
            </p>
            <h2>
              ${this.localize('c77979f688996d53dd7c4e152335d283')}
            </h2>
            <p>
              ${this.localize('12f7a47120262187200318d15e7cf9f9')}
            </p>
            <p>
              ${unsafeHTML(this.localize('84ecfacdbe8fafeabb91624cc78b3dd6'))}
            </p>
            <p>
              ${this.localize('adc0f2ba4b4715efdf170207895b8e13')}
            </p>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_donations-page';
  }
}

customElements.define('sc-donations-page', SCDonationsPage);