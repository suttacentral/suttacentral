import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticAbhidhamma extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('abhidhamma:1')}</h1>
          <p class="byline">${this.localize('abhidhamma:2')}</p>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('abhidhamma:3'))}</li>
              <li>${unsafeHTML(this.localize('abhidhamma:4'))}</li>
              <li>${unsafeHTML(this.localize('abhidhamma:5'))}</li>
              <li>${unsafeHTML(this.localize('abhidhamma:6'))}</li>
              <li>${unsafeHTML(this.localize('abhidhamma:7'))}</li>
              <li>${unsafeHTML(this.localize('abhidhamma:8'))}</li>
            </ol>
          </nav>
          <p>${unsafeHTML(this.localize('abhidhamma:9'))}</p>
          <p>${this.localize('abhidhamma:10')}</p>
          <p>${unsafeHTML(this.localize('abhidhamma:11'))}</p>
          <p>${this.localize('abhidhamma:12')}</p>
          <h2 id="item1">${this.localize('abhidhamma:13')}</h2>
          <p>${unsafeHTML(this.localize('abhidhamma:14'))}</p>
          <p>${unsafeHTML(this.localize('abhidhamma:15'))}</p>
          <p>${this.localize('abhidhamma:16')}</p>
          <p>${this.localize('abhidhamma:17')}</p>
          <h2 id="item2">${this.localize('abhidhamma:18')}</h2>
          <p>${this.localize('abhidhamma:19')}</p>
          <p>${unsafeHTML(this.localize('abhidhamma:20'))}</p>
          <h3>${this.localize('abhidhamma:21')}</h3>
          <p>${unsafeHTML(this.localize('abhidhamma:22'))}</p>
          <p>${this.localize('abhidhamma:23')}</p>
          <h3>${this.localize('abhidhamma:24')}</h3>
          <p>${this.localize('abhidhamma:25')}</p>
          <ol>
            <li>${this.localize('abhidhamma:26')}</li>
            <li>${this.localize('abhidhamma:27')}</li>
            <li>${this.localize('abhidhamma:28')}</li>
          </ol>
          <p>${this.localize('abhidhamma:29')}</p>
          <h3>${this.localize('abhidhamma:30')}</h3>
          <p>${unsafeHTML(this.localize('abhidhamma:31'))}</p>
          <h3>${this.localize('abhidhamma:32')}</h3>
          <p>${unsafeHTML(this.localize('abhidhamma:33'))}</p>
          <h3>${this.localize('abhidhamma:34')}</h3>
          <p>${this.localize('abhidhamma:35')}</p>
          <p>${this.localize('abhidhamma:36')}</p>
          <p>${this.localize('abhidhamma:37')}</p>
          <h3>${this.localize('abhidhamma:38')}</h3>
          <p>${unsafeHTML(this.localize('abhidhamma:39'))}</p>
          <h3>${this.localize('abhidhamma:40')}</h3>
          <p>${unsafeHTML(this.localize('abhidhamma:41'))}</p>
          <p>${this.localize('abhidhamma:42')}</p>
          <h2 id="item3">${this.localize('abhidhamma:43')}</h2>
          <p>${unsafeHTML(this.localize('abhidhamma:44'))}</p>
          <p>${this.localize('abhidhamma:45')}</p>
          <h3>${this.localize('abhidhamma:46')}</h3>
          <p>${this.localize('abhidhamma:47')}</p>
          <h3>${this.localize('abhidhamma:48')}</h3>
          <p>${this.localize('abhidhamma:49')}</p>
          <h3>${this.localize('abhidhamma:50')}</h3>
          <p>${unsafeHTML(this.localize('abhidhamma:51'))}</p>
          <h3>${this.localize('abhidhamma:52')}</h3>
          <p>${unsafeHTML(this.localize('abhidhamma:53'))}</p>
          <h3>${this.localize('abhidhamma:54')}</h3>
          <p>${this.localize('abhidhamma:55')}</p>
          <h3>${this.localize('abhidhamma:56')}</h3>
          <p>${this.localize('abhidhamma:57')}</p>
          <h3>${this.localize('abhidhamma:58')}</h3>
          <p>${this.localize('abhidhamma:59')}</p>
          <h2 id="item4">${this.localize('abhidhamma:60')}</h2>
          <p>${this.localize('abhidhamma:61')}</p>
          <h2 id="item5">${this.localize('abhidhamma:62')}</h2>
          <p>${this.localize('abhidhamma:63')}</p>
          <p>${this.localize('abhidhamma:64')}</p>
          <p>${unsafeHTML(this.localize('abhidhamma:65'))}</p>
          <h2 id="item6">${this.localize('abhidhamma:66')}</h2>
          <p>${this.localize('abhidhamma:67')}</p>
          <p>${this.localize('abhidhamma:68')}</p>
          <p>${this.localize('abhidhamma:69')}</p>
          <p>${this.localize('abhidhamma:70')}</p>
          <p>${this.localize('abhidhamma:71')}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/build/abhidhamma';
  }
}

customElements.define('sc-static-abhidhamma', SCStaticAbhidhamma);
