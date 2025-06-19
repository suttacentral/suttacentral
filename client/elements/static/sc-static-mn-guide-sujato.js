import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

export class SCStaticMNGuideSujato extends SCStaticPage {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/mn-guide-sujato';
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
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('mn-guide-sujato:1'))}</h1>
          <p class="byline">${unsafeHTML(this.localize('mn-guide-sujato:2'))}</p>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:3'))}</li>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:4'))}</li>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:5'))}</li>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:6'))}</li>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:7'))}</li>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:8'))}</li>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:9'))}</li>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:10'))}</li>
              <li>${unsafeHTML(this.localize('mn-guide-sujato:11'))}</li>
            </ol>
          </nav>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:12'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:13'))}</p>
          <blockquote>
            <p>${unsafeHTML(this.localize('mn-guide-sujato:14'))}</p>
          </blockquote>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:15'))}</p>
          <h2 id="item1">${unsafeHTML(this.localize('mn-guide-sujato:16'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:17'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:18'))}</p>
          <dl>
            <dt>${unsafeHTML(this.localize('mn-guide-sujato:19'))}</dt>
            <dd>${unsafeHTML(this.localize('mn-guide-sujato:20'))}</dd>
            <dt>${unsafeHTML(this.localize('mn-guide-sujato:21'))}</dt>
            <dd>${unsafeHTML(this.localize('mn-guide-sujato:22'))}</dd>
            <dt>${unsafeHTML(this.localize('mn-guide-sujato:23'))}</dt>
            <dd>${unsafeHTML(this.localize('mn-guide-sujato:24'))}</dd>
            <dt>${unsafeHTML(this.localize('mn-guide-sujato:25'))}</dt>
            <dd>${unsafeHTML(this.localize('mn-guide-sujato:26'))}</dd>
            <dt>${unsafeHTML(this.localize('mn-guide-sujato:27'))}</dt>
            <dd>${unsafeHTML(this.localize('mn-guide-sujato:28'))}</dd>
          </dl>
          <h2 id="item2">${unsafeHTML(this.localize('mn-guide-sujato:29'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:30'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:31'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:32'))}</p>
          <h2 id="item3">${unsafeHTML(this.localize('mn-guide-sujato:33'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:34'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:35'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:36'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:37'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:38'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:39'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:40'))}</p>
          <h2 id="item4">${unsafeHTML(this.localize('mn-guide-sujato:41'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:42'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:43'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:44'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:45'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:46'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:47'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:48'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:49'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:50'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:51'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:52'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:53'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:54'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:55'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:56'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:57'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:58'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:59'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:60'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:61'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:62'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:63'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:64'))}</p>
          <h2 id="item5">${unsafeHTML(this.localize('mn-guide-sujato:65'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:66'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:67'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:68'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:69'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:70'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:71'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:72'))}</p>
          <h2 id="item6">${unsafeHTML(this.localize('mn-guide-sujato:73'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:74'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:75'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:76'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:77'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:78'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:79'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:80'))}</p>
          <h2 id="item7">${unsafeHTML(this.localize('mn-guide-sujato:81'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:82'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:83'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:84'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:85'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:86'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:87'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:88'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:89'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:90'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:91'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:92'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:93'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:94'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:95'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:96'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:97'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:98'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:99'))}</p>
          <h2 id="item8">${unsafeHTML(this.localize('mn-guide-sujato:100'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:101'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:102'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:103'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:104'))}</p>
          <ol>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:105'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:106'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:107'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:108'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:109'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:110'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:111'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:112'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:113'))}</li>
            <li>${unsafeHTML(this.localize('mn-guide-sujato:114'))}</li>
          </ol>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:115'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:116'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:117'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:118'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:119'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:120'))}</p>
          <h2 id="item9">${unsafeHTML(this.localize('mn-guide-sujato:121'))}</h2>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:122'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:123'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:124'))}</p>
          <p>${unsafeHTML(this.localize('mn-guide-sujato:125'))}</p>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-mn-guide-sujato', SCStaticMNGuideSujato);
