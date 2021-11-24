import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticDNGuideSujato extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('dn-guide-sujato:1'))}</h1>
          <p class="byline">${unsafeHTML(this.localize('dn-guide-sujato:2'))}</p>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('dn-guide-sujato:3'))}</li>
              <li>${unsafeHTML(this.localize('dn-guide-sujato:4'))}</li>
              <li>${unsafeHTML(this.localize('dn-guide-sujato:5'))}</li>
              <li>${unsafeHTML(this.localize('dn-guide-sujato:6'))}</li>
              <li>${unsafeHTML(this.localize('dn-guide-sujato:7'))}</li>
            </ol>
          </nav>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:8'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:9'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:10'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:11'))}</p>
          <h2 id="item1">${unsafeHTML(this.localize('dn-guide-sujato:12'))}</h2>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:13'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:14'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:15'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:16'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:17'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:18'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:19'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:20'))}</p>
          <h2 id="item2">${unsafeHTML(this.localize('dn-guide-sujato:21'))}</h2>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:22'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:23'))}</p>
          <ul>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:24'))}</li>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:25'))}</li>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:26'))}</li>
          </ul>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:27'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:28'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:29'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:30'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:31'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:32'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:33'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:34'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:35'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:36'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:37'))}</p>
          <dl>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:38'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:39'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:40'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:41'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:42'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:43'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:44'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:45'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:46'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:47'))}</dd>
          </dl>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:48'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:49'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:50'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:51'))}</p>
          <ol>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:52'))}</li>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:53'))}</li>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:54'))}</li>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:55'))}</li>
          </ol>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:56'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:57'))}</p>
          <h2 id="item3">${unsafeHTML(this.localize('dn-guide-sujato:58'))}</h2>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:59'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:60'))}</p>
          <h3>${unsafeHTML(this.localize('dn-guide-sujato:61'))}</h3>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:62'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:63'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:64'))}</p>
          <h3>${unsafeHTML(this.localize('dn-guide-sujato:65'))}</h3>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:66'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:67'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:68'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:69'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:70'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:71'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:72'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:73'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:74'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:75'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:76'))}</p>
          <h3>${unsafeHTML(this.localize('dn-guide-sujato:77'))}</h3>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:78'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:79'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:80'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:81'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:82'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:83'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:84'))}</p>
          <h2 id="item4">${unsafeHTML(this.localize('dn-guide-sujato:85'))}</h2>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:86'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:87'))}</p>
          <dl>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:88'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:89'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:90'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:91'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:92'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:93'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:94'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:95'))}</dd>
          </dl>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:96'))}</p>
          <dl>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:97'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:98'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:99'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:100'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:101'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:102'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:103'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:104'))}</dd>
            <dt>${unsafeHTML(this.localize('dn-guide-sujato:105'))}</dt>
            <dd>${unsafeHTML(this.localize('dn-guide-sujato:106'))}</dd>
          </dl>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:107'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:108'))}</p>
          <h2 id="item5">${unsafeHTML(this.localize('dn-guide-sujato:109'))}</h2>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:110'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:111'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:112'))}</p>
          <p>${unsafeHTML(this.localize('dn-guide-sujato:113'))}</p>
          <ul>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:114'))}</li>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:115'))}</li>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:116'))}</li>
            <li>${unsafeHTML(this.localize('dn-guide-sujato:117'))}</li>
          </ul>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/dn-guide-sujato';
  }
}

customElements.define('sc-static-dn-guide-sujato', SCStaticDNGuideSujato);
