import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

export class SCStaticLicensing extends SCStaticPage {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/licensing';
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('licensing:1'))}</h1>
          <p>${unsafeHTML(this.localize('licensing:2'))}</p>
          <p>${unsafeHTML(this.localize('licensing:3'))}</p>
          <p>${unsafeHTML(this.localize('licensing:4'))}</p>
          <h3>${unsafeHTML(this.localize('licensing:5'))}</h3>
          <p>${unsafeHTML(this.localize('licensing:6'))}</p>
          <p>${unsafeHTML(this.localize('licensing:7'))}</p>
          <p>${unsafeHTML(this.localize('licensing:8'))}</p>
          <p>${unsafeHTML(this.localize('licensing:9'))}</p>
          <ul>
            <li>${unsafeHTML(this.localize('licensing:10'))}</li>
            <li>${unsafeHTML(this.localize('licensing:11'))}</li>
          </ul>
          <p>${unsafeHTML(this.localize('licensing:12'))}</p>
          <h3>${unsafeHTML(this.localize('licensing:13'))}</h3>
          <p>${unsafeHTML(this.localize('licensing:14'))}</p>
          <p>${unsafeHTML(this.localize('licensing:15'))}</p>
          <ul>
            <li>
              ${unsafeHTML(this.localize('licensing:16'))}
              <a
                href="https://creativecommons.org/licenses/by/3.0/us/"
                tager="_blank"
                rel="noopener noreferrer"
              >
                Creative Commons Attribution (CC BY 3.0 US)
              </a>
              ${unsafeHTML(this.localize('licensing:18'))}
              <ul>
                <li>${unsafeHTML(this.localize('licensing:19'))}</li>
                <li>${unsafeHTML(this.localize('licensing:20'))}</li>
                <li>${unsafeHTML(this.localize('licensing:21'))}</li>
              </ul>
            </li>
          </ul>
          <h3>${unsafeHTML(this.localize('licensing:23'))}</h3>
          <p>${unsafeHTML(this.localize('licensing:24'))}</p>
          <p>${unsafeHTML(this.localize('licensing:25'))}</p>
          <h3>AI</h3>
          <p>SuttaCentral does not make use of artifically-generated data. We politely request that our content not be scraped or used in any way for the creation of datasets for generative AI or similar. This request applies to those who create applications directly, and those who build apps downstream of AI models that have scraped SuttaCentral’s data. </p>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-licensing', SCStaticLicensing);
