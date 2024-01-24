import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

export class SCStaticDonations extends SCStaticPage {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/donations';
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
      <style>
        .donate-button-container {
          display: flex;

          margin: 2em auto;

          justify-content: center;
        }

        .link-button {
          color: white;
          border: none;
          background-color: var(--sc-primary-accent-color);
        }

        .link-button:hover {
          background-color: var(--sc-primary-accent-color-light);
        }

        .account-data td {
          padding-right: var(--sc-size-md);
        }
      </style>
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('donations:1'))}</h1>
          <p>${unsafeHTML(this.localize('donations:2'))}</p>

          <div class="donate-button-container">
            <a class="link-button block-link" href="/donate-now">
              ${unsafeHTML(this.localize('donations:3'))}
            </a>
          </div>

          <h2>${unsafeHTML(this.localize('donations:4'))}</h2>
          <ul>
            <li>${unsafeHTML(this.localize('donations:5'))}</li>
            <li>${unsafeHTML(this.localize('donations:6'))}</li>
            <li>${unsafeHTML(this.localize('donations:7'))}</li>
            <li>${unsafeHTML(this.localize('donations:8'))}</li>
          </ul>
          <h2>${unsafeHTML(this.localize('donations:9'))}</h2>
          <p>${unsafeHTML(this.localize('donations:10'))}</p>
          <table class="account-data">
            <tr>
              <td>${unsafeHTML(this.localize('donations:11'))}</td>
              <td>${unsafeHTML(this.localize('donations:12'))}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('donations:13'))}</td>
              <td>${unsafeHTML(this.localize('donations:14'))}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('donations:15'))}</td>
              <td>${unsafeHTML(this.localize('donations:16'))}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('donations:17'))}</td>
              <td>${unsafeHTML(this.localize('donations:18'))}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('donations:19'))}</td>
              <td>${unsafeHTML(this.localize('donations:20'))}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('donations:21'))}</td>
              <td>${unsafeHTML(this.localize('donations:22'))}</td>
            </tr>
          </table>
          <p>${unsafeHTML(this.localize('donations:23'))}</p>
          <h2>${unsafeHTML(this.localize('donations:24'))}</h2>
          <p>${unsafeHTML(this.localize('donations:25'))}</p>
          <p>${unsafeHTML(this.localize('donations:26'))}</p>
          <p>${unsafeHTML(this.localize('donations:27'))}</p>
        </article>
      </main>
    `;
  }

  _donateNow() {
    window.location.href = '/donate-now';
  }
}

customElements.define('sc-static-donations', SCStaticDonations);
