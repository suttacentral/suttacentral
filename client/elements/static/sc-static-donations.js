import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticDonations extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <style>
        .donate-link {
          display: table;
          margin: 2em auto;
        }

        a.donate-link,
        a.donate-link:hover {
          text-decoration: none;
        }

        .link-button {
          background-color: var(--sc-primary-accent-color);
          border-radius: 4px;
          border: none;
          font-weight: 600;
          font-family: var(--sc-sans-font);

          text-decoration: none;

          color: white;
          box-shadow: var(--sc-shadow-elevation-2dp);
          transition: all 0.2s ease;
        }

        .link-button:hover {
          background-color: var(--sc-primary-accent-color);
          opacity: 0.9;
          box-shadow: var(--sc-shadow-elevation-4dp);
          transition: all 0.2s ease;
        }

        .link-button:active {
          opacity: 1;
          background-color: var(--sc-primary-accent-color-light);
          transition: all 0.2s ease;
        }

        .account-data td {
          padding-right: var(--sc-size-md);
        }
      </style>
      <main>
        <article>
          <h1>${this.localize('donations:1')}</h1>
          <p>${this.localize('donations:2')}</p>
          <a class="donate-link" href="/donate-now">
            <div class="link-button">${unsafeHTML(this.localize('donations:3'))}</div>
          </a>
          <h2>${this.localize('donations:4')}</h2>
          <ul>
            <li>${this.localize('donations:5')}</li>
            <li>${this.localize('donations:6')}</li>
            <li>${this.localize('donations:7')}</li>
            <li>${this.localize('donations:8')}</li>
          </ul>
          <h2>${this.localize('donations:9')}</h2>
          <p>${unsafeHTML(this.localize('donations:10'))}</p>
          <table class="account-data">
            <tr>
              <td>${this.localize('donations:11')}</td>
              <td>${unsafeHTML(this.localize('donations:12'))}</td>
            </tr>
            <tr>
              <td>${this.localize('donations:13')}</td>
              <td>${unsafeHTML(this.localize('donations:14'))}</td>
            </tr>
            <tr>
              <td>${this.localize('donations:15')}</td>
              <td>${unsafeHTML(this.localize('donations:16'))}</td>
            </tr>
            <tr>
              <td>${this.localize('donations:17')}</td>
              <td>${unsafeHTML(this.localize('donations:18'))}</td>
            </tr>
            <tr>
              <td>${this.localize('donations:19')}</td>
              <td>${unsafeHTML(this.localize('donations:20'))}</td>
            </tr>
            <tr>
              <td>${this.localize('donations:21')}</td>
              <td>${unsafeHTML(this.localize('donations:22'))}</td>
            </tr>
          </table>
          <p>${this.localize('donations:23')}</p>
          <h2>${this.localize('donations:24')}</h2>
          <p>${this.localize('donations:25')}</p>
          <p>${unsafeHTML(this.localize('donations:26'))}</p>
          <p>${this.localize('donations:27')}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/build/donations';
  }
}

customElements.define('sc-static-donations', SCStaticDonations);
