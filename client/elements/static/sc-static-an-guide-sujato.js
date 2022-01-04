import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticANGuideSujato extends SCStaticPage {
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
          <h1>${unsafeHTML(this.localize('an-guide-sujato:1'))}</h1>
          <p class="byline">${unsafeHTML(this.localize('an-guide-sujato:2'))}</p>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('an-guide-sujato:3'))}</li>
              <li>${unsafeHTML(this.localize('an-guide-sujato:4'))}</li>
              <li>${unsafeHTML(this.localize('an-guide-sujato:5'))}</li>
              <li>${unsafeHTML(this.localize('an-guide-sujato:6'))}</li>
              <li>${unsafeHTML(this.localize('an-guide-sujato:7'))}</li>
            </ol>
          </nav>
          <p>${unsafeHTML(this.localize('an-guide-sujato:8'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:9'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:10'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:11'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:12'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:13'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:14'))}</p>
          <h2 id="item1">${unsafeHTML(this.localize('an-guide-sujato:15'))}</h2>
          <p>${unsafeHTML(this.localize('an-guide-sujato:16'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:17'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:18'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:19'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:20'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:21'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:22'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:23'))}</p>
          <ol>
            <li>${unsafeHTML(this.localize('an-guide-sujato:24'))}</li>
            <li>${unsafeHTML(this.localize('an-guide-sujato:25'))}</li>
            <li>${unsafeHTML(this.localize('an-guide-sujato:26'))}</li>
          </ol>
          <p>${unsafeHTML(this.localize('an-guide-sujato:27'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:28'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:29'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:30'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:31'))}</p>
          <h3>${unsafeHTML(this.localize('an-guide-sujato:32'))}</h3>
          <p>${unsafeHTML(this.localize('an-guide-sujato:33'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:34'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:35'))}</p>
          <dl>
            <dt>${unsafeHTML(this.localize('an-guide-sujato:36'))}</dt>
            <dd>${unsafeHTML(this.localize('an-guide-sujato:37'))}</dd>
            <dt>${unsafeHTML(this.localize('an-guide-sujato:38'))}</dt>
            <dd>${unsafeHTML(this.localize('an-guide-sujato:39'))}</dd>
            <dt>${unsafeHTML(this.localize('an-guide-sujato:40'))}</dt>
            <dd>${unsafeHTML(this.localize('an-guide-sujato:41'))}</dd>
            <dt>${unsafeHTML(this.localize('an-guide-sujato:42'))}</dt>
            <dd>${unsafeHTML(this.localize('an-guide-sujato:43'))}</dd>
            <dt>${unsafeHTML(this.localize('an-guide-sujato:44'))}</dt>
            <dd>${unsafeHTML(this.localize('an-guide-sujato:45'))}</dd>
            <dt>${unsafeHTML(this.localize('an-guide-sujato:46'))}</dt>
            <dd>${unsafeHTML(this.localize('an-guide-sujato:47'))}</dd>
            <dt>${unsafeHTML(this.localize('an-guide-sujato:48'))}</dt>
            <dd>${unsafeHTML(this.localize('an-guide-sujato:49'))}</dd>
          </dl>
          <p>${unsafeHTML(this.localize('an-guide-sujato:50'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:51'))}</p>
          <h3>${unsafeHTML(this.localize('an-guide-sujato:52'))}</h3>
          <p>${unsafeHTML(this.localize('an-guide-sujato:53'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:54'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:55'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:56'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:57'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:58'))}</p>
          <h3>${unsafeHTML(this.localize('an-guide-sujato:59'))}</h3>
          <p>${unsafeHTML(this.localize('an-guide-sujato:60'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:61'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:62'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:63'))}</p>
          <h2 id="item2">${unsafeHTML(this.localize('an-guide-sujato:64'))}</h2>
          <p>${unsafeHTML(this.localize('an-guide-sujato:65'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:66'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:67'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:68'))}</p>
          <ul>
            <li>${unsafeHTML(this.localize('an-guide-sujato:69'))}</li>
            <li>${unsafeHTML(this.localize('an-guide-sujato:70'))}</li>
            <li>${unsafeHTML(this.localize('an-guide-sujato:71'))}</li>
            <li>${unsafeHTML(this.localize('an-guide-sujato:72'))}</li>
            <li>${unsafeHTML(this.localize('an-guide-sujato:73'))}</li>
            <li>${unsafeHTML(this.localize('an-guide-sujato:74'))}</li>
          </ul>
          <p>${unsafeHTML(this.localize('an-guide-sujato:75'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:76'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:77'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:78'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:79'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:80'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:81'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:82'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:83'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:84'))}</p>
          <h2 id="item3">${unsafeHTML(this.localize('an-guide-sujato:85'))}</h2>
          <p>${unsafeHTML(this.localize('an-guide-sujato:86'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:87'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:88'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:89'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:90'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:91'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:92'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:93'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:94'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:95'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:96'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:97'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:98'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:99'))}</p>
          <h2 id="item4">${unsafeHTML(this.localize('an-guide-sujato:100'))}</h2>
          <p>${unsafeHTML(this.localize('an-guide-sujato:101'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:102'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:103'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:104'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:105'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:106'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:107'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:108'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:109'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:110'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:111'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:112'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:113'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:114'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:115'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:116'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:117'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:118'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:119'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:120'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:121'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:122'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:123'))}</p>
          <h2 id="item5">${unsafeHTML(this.localize('an-guide-sujato:124'))}</h2>
          <p>${unsafeHTML(this.localize('an-guide-sujato:125'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:126'))}</p>
          <p>${unsafeHTML(this.localize('an-guide-sujato:127'))}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/an-guide-sujato';
  }
}

customElements.define('sc-static-an-guide-sujato', SCStaticANGuideSujato);
