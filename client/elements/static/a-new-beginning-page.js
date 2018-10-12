import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';


class SCANewBeginning extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${this.localize('4e1776b6d0f3ec62485bd2f61ea7f101')}
            </h1>
            <p>
              ${this.localize('d04a1161f90ab33fc1f301fa1fe2f85c')}
            </p>
            <p>
              ${unsafeHTML(this.localize('94cae36a49869be9cc7bb9cdd92ba73b'))}
            </p>
            <p>
              ${this.localize('26f2fbece49f2a97c5d3818f1089e712')}
            </p>
            <p>
              ${this.localize('f7a8b54d80948e2d0b95703fa810fc18')}
            </p>
            <p>
              ${this.localize('5b4c3bd7aa6c0dc3a01c86aa0d5be994')}
            </p>
            <ul>
              <li>
                ${this.localize('20f5a30c59046da15a178ce024e48b84')}
              </li>
              <li>
                ${this.localize('a5157f7df058f3ff412e73e57b70baf4')}
              </li>
              <li>
                ${this.localize('d161d993274c6deb56f610e4807720f6')}
              </li>
              <li>
                ${this.localize('f287e4ad21bbff30cc2fdb99aa1b347a')}
              </li>
              <li>
                ${this.localize('252cec6fcbf59527091c13bf0dd03de3')}
              </li>
              <li>
                ${this.localize('d211abc376662619d2f8ac2c1d4747ab')}
              </li>
              <li>
                ${this.localize('0ad269886bf0c5502cc62a8c26b34926')}
              </li>
              <li>
                ${this.localize('d9917dbac2969d0ea8cc86298619c927')}
              </li>
              <li>
                ${this.localize('6576c009a48d554c33f85a6fd2405e8f')}
              </li>
            </ul>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_a-new-beginning-page';
  }
}

customElements.define('sc-a-new-beginning', SCANewBeginning);