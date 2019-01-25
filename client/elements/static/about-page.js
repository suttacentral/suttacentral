import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';


class SCAboutPage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${this.localize('55d139c73398413f27c7e15a4cad3a59')}
            </h1>
            <p>
              ${this.localize('81f99fc63b1b99385e27080e5c8a93fc')}
            </p>
            <p>
              ${this.localize('0e5c6c307a41274b2d6770164f0a82cb')}
            </p>
            <p>
              ${this.localize('472d2708a4d2c1bb61927b952d555f6c')}
            </p>
            <p>
              ${this.localize('2923d6f291c43d749c0476a7f1c6ab34')}
            </p>
            <p>
              ${unsafeHTML(this.localize('0b7d30e53b1e5443951598ca356322cd'))}
            </p>
            <h2>
              ${this.localize('7d7ecfc5a78d4287f72b459e973c472c')}
            </h2>
            <p>
              ${this.localize('cf6137f06caf2b738caa0cd89612f3ec')}
            </p>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_about-page';
  }
}

customElements.define('sc-about-page', SCAboutPage);