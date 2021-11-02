import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticLicensing extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('licensing:1')}</h1>
          <p>${this.localize('licensing:2')}</p>
          <p>${unsafeHTML(this.localize('licensing:3'))}</p>
          <p>${unsafeHTML(this.localize('licensing:4'))}</p>
          <h3>${this.localize('licensing:5')}</h3>
          <p>${unsafeHTML(this.localize('licensing:6'))}</p>
          <p>${this.localize('licensing:7')}</p>
          <p>${this.localize('licensing:8')}</p>
          <p>${this.localize('licensing:9')}</p>
          <ul>
            <li>${this.localize('licensing:10')}</li>
            <li>${this.localize('licensing:11')}</li>
          </ul>
          <p>${this.localize('licensing:12')}</p>
          <h3>${this.localize('licensing:13')}</h3>
          <p>${this.localize('licensing:14')}</p>
          <p>${this.localize('licensing:15')}</p>
          <ul>
            <li>
              ${this.localize('licensing:16')}
              <a
                href="https://creativecommons.org/licenses/by/3.0/us/"
                tager="_blank"
                title="${this.localize('licensing:17')}"
              >
                Creative Commons Attribution (CC BY 3.0 US)
              </a>
              ${this.localize('licensing:18')}
              <ul>
                <li>${unsafeHTML(this.localize('licensing:19'))}</li>
                <li>${unsafeHTML(this.localize('licensing:20'))}</li>
                <li>${this.localize('licensing:21')}</li>
              </ul>
            </li>
            <li>${unsafeHTML(this.localize('licensing:22'))}</li>
          </ul>
          <h3>${this.localize('licensing:23')}</h3>
          <p>${unsafeHTML(this.localize('licensing:24'))}</p>
          <p>${this.localize('licensing:25')}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/build/licensing';
  }
}

customElements.define('sc-static-licensing', SCStaticLicensing);
