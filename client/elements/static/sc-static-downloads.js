import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticDownloadsPage extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <style>
        img {
          float: right;
          width: 50%;
        }
      </style>
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('downloads:1'))}</h1>
          <h2>${unsafeHTML(this.localize('downloads:4'))}</h2>
          <p>${unsafeHTML(this.localize('downloads:5'))}</p>
          <h2>${unsafeHTML(this.localize('downloads:6'))}</h2>
          <p>${unsafeHTML(this.localize('downloads:7'))}</p>
          <p>${unsafeHTML(this.localize('downloads:8'))}</p>
          <p>${unsafeHTML(this.localize('downloads:9'))}</p>
          <table>
            <tr>
              <td>${unsafeHTML(this.localize('downloads:10'))}</td>
              <td>${unsafeHTML(this.localize('downloads:11'))}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('downloads:12'))}</td>
              <td>${unsafeHTML(this.localize('downloads:13'))}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('downloads:14'))}</td>
              <td>${unsafeHTML(this.localize('downloads:15'))}</td>
            </tr>
          </table>
          <h2>${unsafeHTML(this.localize('downloads:16'))}</h2>
          <p>${unsafeHTML(this.localize('downloads:17'))}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/downloads';
  }
}

customElements.define('sc-static-downloads', SCStaticDownloadsPage);
