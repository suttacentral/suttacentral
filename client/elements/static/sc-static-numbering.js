import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticNumbering extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <style>
        .pre {
          font-family: var(--sc-monospace-font);
          margin: var(--sc-size-xxl) var(--sc-size-md);
        }
      </style>
      <main>
        <article>
          <h1>${this.localize('numbering:1')}</h1>
          <p>${this.localize('numbering:2')}</p>
          <p>${this.localize('numbering:3')}</p>
          <p>${this.localize('numbering:4')}</p>
          <ul>
            <li>${this.localize('numbering:5')}</li>
            <li>${this.localize('numbering:6')}</li>
            <li>${this.localize('numbering:7')}</li>
            <li>${this.localize('numbering:8')}</li>
            <li>${this.localize('numbering:9')}</li>
          </ul>
          <h2>${this.localize('numbering:10')}</h2>
          <p>${this.localize('numbering:11')}</p>
          <p>${this.localize('numbering:12')}</p>
          <p>${this.localize('numbering:13')}</p>
          <div class="pre">${unsafeHTML(this.localize('numbering:14'))}</div>
          <p>${this.localize('numbering:15')}</p>
          <h2>${this.localize('numbering:16')}</h2>
          <p>${this.localize('numbering:17')}</p>
          <p>${this.localize('numbering:18')}</p>
          <h3>${this.localize('numbering:19')}</h3>
          <p>${unsafeHTML(this.localize('numbering:20'))}</p>
          <ul>
            <li>${this.localize('numbering:21')}</li>
            <li>${this.localize('numbering:22')}</li>
            <li>${this.localize('numbering:23')}</li>
          </ul>
          <p>${this.localize('numbering:24')}</p>
          <h3>${this.localize('numbering:25')}</h3>
          <p>${this.localize('numbering:26')}</p>
          <h3>${this.localize('numbering:27')}</h3>
          <p>${this.localize('numbering:28')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('numbering:29'))}</li>
            <li>${unsafeHTML(this.localize('numbering:30'))}</li>
            <li>${unsafeHTML(this.localize('numbering:31'))}</li>
            <li>${unsafeHTML(this.localize('numbering:32'))}</li>
            <li>${unsafeHTML(this.localize('numbering:33'))}</li>
            <li>${unsafeHTML(this.localize('numbering:34'))}</li>
            <li>${unsafeHTML(this.localize('numbering:35'))}</li>
            <li>${unsafeHTML(this.localize('numbering:36'))}</li>
            <li>${unsafeHTML(this.localize('numbering:37'))}</li>
            <li>${unsafeHTML(this.localize('numbering:38'))}</li>
          </ul>
          <p>${this.localize('numbering:39')}</p>
          <h3>${this.localize('numbering:40')}</h3>
          <p>${this.localize('numbering:41')}</p>
          <p>${this.localize('numbering:42')}</p>
          <h3>${this.localize('numbering:43')}</h3>
          <p>${this.localize('numbering:44')}</p>
          <p>${this.localize('numbering:45')}</p>
          <h2>${this.localize('numbering:46')}</h2>
          <p>${unsafeHTML(this.localize('numbering:47'))}</p>
          <p>${this.localize('numbering:48')}</p>
          <ul>
            <li>${this.localize('numbering:49')}</li>
            <li>${this.localize('numbering:50')}</li>
            <li>${unsafeHTML(this.localize('numbering:51'))}</li>
          </ul>
          <h2>${this.localize('numbering:52')}</h2>
          <p>${this.localize('numbering:53')}</p>
          <h2>${this.localize('numbering:54')}</h2>
          <p>${this.localize('numbering:55')}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/build/numbering';
  }
}

customElements.define('sc-static-numbering', SCStaticNumbering);
