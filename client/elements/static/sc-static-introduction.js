import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticIntroduction extends SCStaticPage {
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
          <h1>${unsafeHTML(this.localize('introduction:1'))}</h1>
          <h2>${unsafeHTML(this.localize('introduction:2'))}</h2>
          <p>${unsafeHTML(this.localize('introduction:3'))}</p>
          <p>${unsafeHTML(this.localize('introduction:4'))}</p>
          <p>${unsafeHTML(this.localize('introduction:5'))}</p>
          <picture>
            <source
              srcset="/img/static-pages/Life_of_Buddha_Burmese_Manuscript_22_Volume_1_Wellcom.avif"
              type="image/avif"
            />
            <img
              alt="${this.localize('introduction:6')}"
              class="image-home-full"
              src="/img/static-pages/Life_of_Buddha_Burmese_Manuscript_22_Volume_1_Wellcom.jpg"
              title="${this.localize('introduction:7')}"
              width="640px"
            />
          </picture>
          <h2>${unsafeHTML(this.localize('introduction:8'))}</h2>
          <p>${unsafeHTML(this.localize('introduction:9'))}</p>
          <p>${unsafeHTML(this.localize('introduction:10'))}</p>
          <p>${unsafeHTML(this.localize('introduction:11'))}</p>
          <h2>${unsafeHTML(this.localize('introduction:12'))}</h2>
          <p>
            <picture>
              <source srcset="/img/static-pages/birchbark_w400.avif" type="image/avif" />
              <img
                alt="${this.localize('introduction:13')}"
                class="image-home"
                src="/img/static-pages/birchbark_w400.jpg"
                title="${this.localize('introduction:14')}"
              />
            </picture>
            ${unsafeHTML(this.localize('introduction:15'))}
            <i lang="pi">${unsafeHTML(this.localize('introduction:16'))}</i>
            ${unsafeHTML(this.localize('introduction:17'))}
            <i lang="san">${unsafeHTML(this.localize('introduction:18'))}</i>
            ${unsafeHTML(this.localize('introduction:19'))}
          </p>
          <ul>
            <li>${unsafeHTML(this.localize('introduction:20'))}</li>
            <li>${unsafeHTML(this.localize('introduction:21'))}</li>
            <li>${unsafeHTML(this.localize('introduction:22'))}</li>
          </ul>
          <p>${unsafeHTML(this.localize('introduction:23'))}</p>
          <p>${unsafeHTML(this.localize('introduction:24'))}</p>
          <p>${unsafeHTML(this.localize('introduction:25'))}</p>
          <ul>
            <li>
              <strong>${unsafeHTML(this.localize('introduction:26'))}</strong>
              ${unsafeHTML(this.localize('introduction:27'))}
              <ul>
                <li>${unsafeHTML(this.localize('introduction:28'))}</li>
                <li>${unsafeHTML(this.localize('introduction:29'))}</li>
                <li>${unsafeHTML(this.localize('introduction:30'))}</li>
                <li>${unsafeHTML(this.localize('introduction:31'))}</li>
              </ul>
            </li>
            <li>${unsafeHTML(this.localize('introduction:32'))}</li>
            <li>${unsafeHTML(this.localize('introduction:33'))}</li>
          </ul>
          <h2>${unsafeHTML(this.localize('introduction:34'))}</h2>
          <p>
            <picture>
              <source srcset="/img/static-pages/dn20.avif" type="image/avif" />
              <img
                alt="${this.localize('introduction:35')}"
                class="image-home"
                src="/img/static-pages/dn20.jpg"
                title="${this.localize('introduction:36')}"
                width="640px"
              />
            </picture>
            ${unsafeHTML(this.localize('introduction:37'))}
          </p>
          <p>${unsafeHTML(this.localize('introduction:38'))}</p>
          <p>${unsafeHTML(this.localize('introduction:39'))}</p>
          <h2>${unsafeHTML(this.localize('introduction:40'))}</h2>
          <p>${unsafeHTML(this.localize('introduction:41'))}</p>
          <h3>${unsafeHTML(this.localize('introduction:42'))}</h3>
          <p>${unsafeHTML(this.localize('introduction:43'))}</p>
          <h4>${unsafeHTML(this.localize('introduction:44'))}</h4>
          <p>${unsafeHTML(this.localize('introduction:45'))}</p>
          <p>${unsafeHTML(this.localize('introduction:46'))}</p>
          <h4>${unsafeHTML(this.localize('introduction:47'))}</h4>
          <p>${unsafeHTML(this.localize('introduction:48'))}</p>
          <h4>${unsafeHTML(this.localize('introduction:49'))}</h4>
          <p>${unsafeHTML(this.localize('introduction:50'))}</p>
          <h3>${unsafeHTML(this.localize('introduction:51'))}</h3>
          <p>${unsafeHTML(this.localize('introduction:52'))}</p>
          <h4>${unsafeHTML(this.localize('introduction:53'))}</h4>
          <p>${unsafeHTML(this.localize('introduction:54'))}</p>
          <p>${unsafeHTML(this.localize('introduction:55'))}</p>
          <p>${unsafeHTML(this.localize('introduction:56'))}</p>
          <h4>${unsafeHTML(this.localize('introduction:57'))}</h4>
          <p>${unsafeHTML(this.localize('introduction:58'))}</p>
          <p>${unsafeHTML(this.localize('introduction:59'))}</p>
          <ul>
            <li>${unsafeHTML(this.localize('introduction:60'))}</li>
            <li>${unsafeHTML(this.localize('introduction:61'))}</li>
            <li>${unsafeHTML(this.localize('introduction:62'))}</li>
          </ul>
          <p>${unsafeHTML(this.localize('introduction:63'))}</p>
          <h4>${unsafeHTML(this.localize('introduction:64'))}</h4>
          <p>${unsafeHTML(this.localize('introduction:65'))}</p>
          <h3>${unsafeHTML(this.localize('introduction:66'))}</h3>
          <p>${unsafeHTML(this.localize('introduction:67'))}</p>
          <p>${unsafeHTML(this.localize('introduction:68'))}</p>
          <h3>${unsafeHTML(this.localize('introduction:69'))}</h3>
          <p>${unsafeHTML(this.localize('introduction:70'))}</p>
          <p>${unsafeHTML(this.localize('introduction:71'))}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/introduction';
  }
}

customElements.define('sc-static-introduction', SCStaticIntroduction);
