import { html } from 'lit';

import { SCStaticPage } from '../addons/sc-static-page';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';

export class SCStaticPirivenasProject extends SCStaticPage {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/pirivena';
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        .link-button {
          color: var(--sc-inverted-text-color);
          border: none;
          background-color: var(--sc-primary-accent-color);
        }

        .link-button:hover {
          background-color: var(--sc-primary-accent-color-light);
        }

        .donate-button-container {
          text-align: center;
          margin-top: 1em;
        }
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}

        article h1 {
          text-align: center;
        }
      </style>
      <main>
        <article>
          <h1>${this.localize('pirivenaPage:title')}</h1>
          <figure>
            <picture>
              <source srcset="/img/static-pages/pirivena-monks-walking.avif" type="image/avif">
              <img class="image-home-full" src="/img/static-pages/pirivena-monks-walking.jpg"
                width="100%" alt="${this.localize('pirivenaPage:imageAlt')}">
            </picture>
            <figcaption>${this.localize('pirivenaPage:photoCaption')}</figcaption>
          </figure>
          <p>${this.localize('pirivenaPage:1')}</p>
          <p>${this.localize('pirivenaPage:2')}</p>
          <p>${this.localize('pirivenaPage:3')}</p>
          <p>${this.localize('pirivenaPage:4')}</p>
          <p>${this.localize('pirivenaPage:5')}</p>
          <ul>
            <li>Vinayapiṭaka — 6 ${this.localize('pirivenaPage:volumes')}</li>
            <li>Dīghanikāya — 3 ${this.localize('pirivenaPage:volumes')}</li>
            <li>Majjhimanikāya — 3 ${this.localize('pirivenaPage:volumes')}</li>
            <li>Saṁyuttanikāya — 5 ${this.localize('pirivenaPage:volumes')}</li>
            <li>Aṅguttaranikāya — 5 ${this.localize('pirivenaPage:volumes')}</li>
            <li>Khuddakanikāya — Dhammapada, Udāna, Itivuttaka, Suttanipāta, Theragāthā, Therīgāthā; ${this.localize('pirivenaPage:1volume')}</li>
          </ul>
          <p>${this.localize('pirivenaPage:6')}</p>
          <p>${this.localize('pirivenaPage:7')}</p>
          <p>${this.localize('pirivenaPage:8')}</p>
          <p>${this.localize('pirivenaPage:contact')}: Deepika Weerakoon (suttacentraldevelopmenttrust@gmail.com).</p>
          <div class="donate-button-container">
            <a class="link-button block-link" href="https://suttacentral-pirivena-pitaka.raiselysite.com/">${this.localize('pirivenaPage:button')}</a>
          </div>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-pirivenas-project', SCStaticPirivenasProject);
