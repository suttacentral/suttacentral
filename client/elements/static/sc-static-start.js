import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticStart extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('start:1')}</h1>
          <p>${this.localize('start:2')}</p>
          <blockquote class="gatha">
            <p>${unsafeHTML(this.localize('start:3'))}</p>
          </blockquote>
          <p>${this.localize('start:4')}</p>
          <h2>${this.localize('start:5')}</h2>
          <p>${this.localize('start:6')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('start:7'))}</li>
            <li>${unsafeHTML(this.localize('start:8'))}</li>
            <li>${unsafeHTML(this.localize('start:9'))}</li>
            <li>${unsafeHTML(this.localize('start:10'))}</li>
          </ul>
          <h2>${this.localize('start:11')}</h2>
          <p>${this.localize('start:12')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('start:13'))}</li>
            <li>${unsafeHTML(this.localize('start:14'))}</li>
            <li>${unsafeHTML(this.localize('start:15'))}</li>
            <li>${unsafeHTML(this.localize('start:16'))}</li>
          </ul>
          <h2>${this.localize('start:17')}</h2>
          <p>${this.localize('start:18')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('start:19'))}</li>
            <li>${unsafeHTML(this.localize('start:20'))}</li>
            <li>${unsafeHTML(this.localize('start:21'))}</li>
          </ul>
          <h2>${this.localize('start:22')}</h2>
          <p>${this.localize('start:23')}</p>
          <p>${this.localize('start:24')}</p>
          <h2>${this.localize('start:25')}</h2>
          <p>${unsafeHTML(this.localize('start:26'))}</p>
          <h2>${this.localize('start:27')}</h2>
          <p>${this.localize('start:28')}</p>
          <p>${this.localize('start:29')}</p>
          <h2>${this.localize('start:30')}</h2>
          <p>${unsafeHTML(this.localize('start:31'))}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/start';
  }
}

customElements.define('sc-static-start', SCStaticStart);
