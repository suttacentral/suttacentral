import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticDiscourses extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('discourses:1')}</h1>
          <p class="byline">${this.localize('discourses:2')}</p>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('discourses:3'))}</li>
              <li>${unsafeHTML(this.localize('discourses:4'))}</li>
              <li>${unsafeHTML(this.localize('discourses:5'))}</li>
              <li>${unsafeHTML(this.localize('discourses:6'))}</li>
              <li>${unsafeHTML(this.localize('discourses:7'))}</li>
              <li>${unsafeHTML(this.localize('discourses:8'))}</li>
              <li>${unsafeHTML(this.localize('discourses:9'))}</li>
              <li>${unsafeHTML(this.localize('discourses:10'))}</li>
            </ol>
          </nav>
          <p>${this.localize('discourses:11')}</p>
          <p>${unsafeHTML(this.localize('discourses:12'))}</p>
          <p>${this.localize('discourses:13')}</p>
          <p>${this.localize('discourses:14')}</p>
          <h2 id="item1">${this.localize('discourses:15')}</h2>
          <p>${this.localize('discourses:16')}</p>
          <p>${unsafeHTML(this.localize('discourses:17'))}</p>
          <p>${this.localize('discourses:18')}</p>
          <h2 id="item2">${this.localize('discourses:19')}</h2>
          <p>${this.localize('discourses:20')}</p>
          <p>${this.localize('discourses:21')}</p>
          <p>${this.localize('discourses:22')}</p>
          <p>${this.localize('discourses:23')}</p>
          <p>${this.localize('discourses:24')}</p>
          <p>${this.localize('discourses:25')}</p>
          <p>${this.localize('discourses:26')}</p>
          <h2 id="item3">${this.localize('discourses:27')}</h2>
          <p>${this.localize('discourses:28')}</p>
          <p>${this.localize('discourses:29')}</p>
          <p>${this.localize('discourses:30')}</p>
          <p>${this.localize('discourses:31')}</p>
          <p>${this.localize('discourses:32')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('discourses:33'))}</li>
            <li>${unsafeHTML(this.localize('discourses:34'))}</li>
            <li>${unsafeHTML(this.localize('discourses:35'))}</li>
            <li>${unsafeHTML(this.localize('discourses:36'))}</li>
          </ul>
          <p>${this.localize('discourses:37')}</p>
          <p>${this.localize('discourses:38')}</p>
          <p>${this.localize('discourses:39')}</p>
          <h2 id="item4">${this.localize('discourses:40')}</h2>
          <p>${unsafeHTML(this.localize('discourses:41'))}</p>
          <p>${unsafeHTML(this.localize('discourses:42'))}</p>
          <p>${unsafeHTML(this.localize('discourses:43'))}</p>
          <p>${unsafeHTML(this.localize('discourses:44'))}</p>
          <ul>
            <li>${unsafeHTML(this.localize('discourses:45'))}</li>
            <li>${unsafeHTML(this.localize('discourses:46'))}</li>
            <li>${unsafeHTML(this.localize('discourses:47'))}</li>
            <li>${unsafeHTML(this.localize('discourses:48'))}</li>
          </ul>
          <p>${unsafeHTML(this.localize('discourses:49'))}</p>
          <p>${unsafeHTML(this.localize('discourses:50'))}</p>
          <ul>
            <li>${this.localize('discourses:51')}</li>
            <li>${this.localize('discourses:52')}</li>
            <li>${this.localize('discourses:53')}</li>
            <li>${this.localize('discourses:54')}</li>
            <li>${this.localize('discourses:55')}</li>
            <li>${this.localize('discourses:56')}</li>
          </ul>
          <p>${unsafeHTML(this.localize('discourses:57'))}</p>
          <p>${this.localize('discourses:58')}</p>
          <p>${this.localize('discourses:59')}</p>
          <p>${this.localize('discourses:60')}</p>
          <h2 id="item5">${this.localize('discourses:61')}</h2>
          <p>${this.localize('discourses:62')}</p>
          <p>${unsafeHTML(this.localize('discourses:63'))}</p>
          <p>${this.localize('discourses:64')}</p>
          <h2 id="item6">${this.localize('discourses:65')}</h2>
          <p>${this.localize('discourses:66')}</p>
          <p>${this.localize('discourses:67')}</p>
          <p>${unsafeHTML(this.localize('discourses:68'))}</p>
          <p>${this.localize('discourses:69')}</p>
          <p>${unsafeHTML(this.localize('discourses:70'))}</p>
          <p>${unsafeHTML(this.localize('discourses:71'))}</p>
          <h2 id="item7">${this.localize('discourses:72')}</h2>
          <p>${this.localize('discourses:73')}</p>
          <p>${this.localize('discourses:74')}</p>
          <ul>
            <li>${this.localize('discourses:75')}</li>
            <li>${this.localize('discourses:76')}</li>
            <li>${this.localize('discourses:77')}</li>
            <li>${this.localize('discourses:78')}</li>
            <li>${this.localize('discourses:79')}</li>
            <li>${this.localize('discourses:80')}</li>
          </ul>
          <p>${this.localize('discourses:81')}</p>
          <ul>
            <li>${this.localize('discourses:82')}</li>
            <li>${this.localize('discourses:83')}</li>
            <li>${this.localize('discourses:84')}</li>
            <li>${unsafeHTML(this.localize('discourses:85'))}</li>
            <li>${unsafeHTML(this.localize('discourses:86'))}</li>
            <li>${this.localize('discourses:87')}</li>
          </ul>
          <p>${this.localize('discourses:88')}</p>
          <p>${this.localize('discourses:89')}</p>
          <h2 id="item8">${this.localize('discourses:90')}</h2>
          <p>${this.localize('discourses:91')}</p>
          <p>${this.localize('discourses:92')}</p>
          <p>${this.localize('discourses:93')}</p>
          <p>${this.localize('discourses:94')}</p>
          <p>${this.localize('discourses:95')}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/discourses';
  }
}

customElements.define('sc-static-discourses', SCStaticDiscourses);
