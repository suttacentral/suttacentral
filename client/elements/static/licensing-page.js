import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';


class SCLicensingPage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${this.localize('0b9c6eef4e3d3a222eb04e910d252339')}
            </h1>
            <p>
              ${this.localize('b9756d43cd24f56b971b483e912485e8')}
            </p>
            <p>
              ${unsafeHTML(this.localize('7c7877c957502663fbc8b3c6d86364a2'))}
            </p>
            <p>
              ${unsafeHTML(this.localize('062d111caade8703c2b1ef38fd70b46a'))}
            </p>
            <h3>
              ${this.localize('c5b65db1204f647d44c40b7dc64c63b8')}
            </h3>
            <p>
              ${unsafeHTML(this.localize('8adaacf928c18c5dd1626d74c6cb792e'))}
            </p>
            <p>
              ${this.localize('61925437a72b1d27717902963eff5d83')}
            </p>
            <p>
              ${this.localize('5e5f1292cc80dcc512c42d3201267d63')}
            </p>
            <p>
              ${this.localize('539df51ca922f6e74de018f757410c72')}
            </p>
            <ul>
              <li>
                ${this.localize('2006f5728de9f671d25c8a9080b91f39')}
              </li>
              <li>
                ${this.localize('60888b80238e8d91b31952387d0c3dbf')}
              </li>
            </ul>
            <p>
              ${this.localize('84866c7e3410ef37a0d70dea7c5027ea')}
            </p>
            <h3>
              ${this.localize('f6ac6c11c4a856d8596d313afa81983b')}
            </h3>
            <p>
              ${this.localize('b58f8d6733ebb56f580e91ce24cf785b')}
            </p>
            <p>
              ${this.localize('d040f99945565462590bef401b6cf179')}
            </p>
            <ul>
              <li>
                ${this.localize('0ccc3aca0a6fbf46603f7e2c5f706a40')}
                <a href="https://creativecommons.org/licenses/by/3.0/us/" tager="_blank" title="${this.localize('665063a57ffd400e00f47f27806088b1')}">
                  Creative Commons Attribution (CC BY 3.0 US)
                </a>
                ${this.localize('5058f1af8388633f609cadb75a75dc9d')}
                <ul>
                  <li>
                    ${unsafeHTML(this.localize('6df082212b6e863f22b098a734fa0e9d'))}
                  </li>
                  <li>
                    ${unsafeHTML(this.localize('79bdd241d17505c2dc2c26c2750e547c'))}
                  </li>
                  <li>
                    ${this.localize('e4d3921cc9d86eb541c67d1fcf1bbe37')}
                  </li>
                </ul>
              </li>
              <li>
                ${unsafeHTML(this.localize('f84d6a7afcaf5f5450f909f914db0afd'))}
              </li>
            </ul>
            <h3>
              ${this.localize('40c3ddd7137dc7ca82ecb89fdf7415e1')}
            </h3>
            <p>
              ${unsafeHTML(this.localize('0aaaf927d5fa2aeb1971c4c2b17039bf'))}
            </p>
            <p>
              ${this.localize('fb869e822a73d682c5b013f5338b95dd')}
            </p>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_licensing-page';
  }
}

customElements.define('sc-licensing-page', SCLicensingPage);