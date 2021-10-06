import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticVinaya extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('vinaya:1')}</h1>
          <p class="byline">${this.localize('vinaya:2')}</p>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('vinaya:3'))}</li>
              <li>${unsafeHTML(this.localize('vinaya:4'))}</li>
              <li>${unsafeHTML(this.localize('vinaya:5'))}</li>
              <li>${unsafeHTML(this.localize('vinaya:6'))}</li>
              <li>${unsafeHTML(this.localize('vinaya:7'))}</li>
              <li>${unsafeHTML(this.localize('vinaya:8'))}</li>
            </ol>
          </nav>
          <p>${unsafeHTML(this.localize('vinaya:9'))}</p>
          <h2 id="item1">${this.localize('vinaya:10')}</h2>
          <p>${unsafeHTML(this.localize('vinaya:11'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:12'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:13'))}</p>
          <p>${this.localize('vinaya:14')}</p>
          <p>${this.localize('vinaya:15')}</p>
          <h2 id="item2">${this.localize('vinaya:16')}</h2>
          <p>${this.localize('vinaya:17')}</p>
          <p>${this.localize('vinaya:18')}</p>
          <p>${this.localize('vinaya:19')}</p>
          <p>${this.localize('vinaya:20')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('vinaya:21'))}</li>
            <li>${this.localize('vinaya:22')}</li>
            <li>${this.localize('vinaya:23')}</li>
            <li>${this.localize('vinaya:24')}</li>
            <li>${this.localize('vinaya:25')}</li>
            <li>${unsafeHTML(this.localize('vinaya:26'))}</li>
          </ul>
          <h2 id="item3">${this.localize('vinaya:27')}</h2>
          <p>${this.localize('vinaya:28')}</p>
          <h3>${this.localize('vinaya:29')}</h3>
          <p>${unsafeHTML(this.localize('vinaya:30'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:31'))}</p>
          <p>${this.localize('vinaya:32')}</p>
          <p>${unsafeHTML(this.localize('vinaya:33'))}</p>
          <p>${this.localize('vinaya:34')}</p>
          <p>${this.localize('vinaya:35')}</p>
          <p>${unsafeHTML(this.localize('vinaya:36'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:37'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:38'))}</p>
          <h3>${this.localize('vinaya:39')}</h3>
          <p>${this.localize('vinaya:40')}</p>
          <p>${unsafeHTML(this.localize('vinaya:41'))}</p>
          <p>${this.localize('vinaya:42')}</p>
          <p>${unsafeHTML(this.localize('vinaya:43'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:44'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:45'))}</p>
          <p>${this.localize('vinaya:46')}</p>
          <p>${this.localize('vinaya:47')}</p>
          <p>${unsafeHTML(this.localize('vinaya:48'))}</p>
          <h3>${this.localize('vinaya:49')}</h3>
          <p>${this.localize('vinaya:50')}</p>
          <p>${this.localize('vinaya:51')}</p>
          <h2 id="item4">${this.localize('vinaya:52')}</h2>
          <p>${this.localize('vinaya:53')}</p>
          <p>${unsafeHTML(this.localize('vinaya:54'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:55'))}</p>
          <h2 id="item5">${this.localize('vinaya:56')}</h2>
          <p>${this.localize('vinaya:57')}</p>
          <p>${unsafeHTML(this.localize('vinaya:58'))}</p>
          <p>${unsafeHTML(this.localize('vinaya:59'))}</p>
          <p>${this.localize('vinaya:60')}</p>
          <p>${unsafeHTML(this.localize('vinaya:61'))}</p>
          <h2 id="item6">${this.localize('vinaya:62')}</h2>
          <ul>
            <li>${unsafeHTML(this.localize('vinaya:63'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:64'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:65'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:66'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:67'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:68'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:69'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:70'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:71'))}</li>
            <li>${unsafeHTML(this.localize('vinaya:72'))}</li>
          </ul>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_vinaya-page';
  }
}

customElements.define('sc-static-vinaya', SCStaticVinaya);
