import { html } from 'lit';

import { SCStaticPage } from '../addons/sc-static-page';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';

export class SCStaticPirivenasProject extends SCStaticPage {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        .link-button {
          color: white;
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
          <h1>SuttaCentral Translations For Pirivenas</h1>
          <figure>
            <picture>
              <source srcset="/img/static-pages/pirivena-monks-walking.avif" type="image/avif">
              <img class="image-home-full" src="/img/static-pages/pirivena-monks-walking.jpg"
                width="100%" alt="Buddhist monk walking in forest with novice students holding textbooks">
            </picture>
            <figcaption>Buddhist Monk Teacher With Students. Sri Lanka. Photo by Hugh Sitton</figcaption>
          </figure>
          <p>SuttaCentral, in conjunction with the Amarapura–Rāmañña and Siam Nikāyas, is pleased to launch the printing of
            English translations of the Suttas and Vinaya and their distribution through monastic education centers (Pirivena)
            of Sri Lanka.</p>
          <p>The goal of the project is to ensure that all monastics in Sri Lanka have ready access to modern, accurate, and
            readable translations of the most important works of the Tipiṭaka (Buddhist scripture). </p>
          <p>Leaders of the Sri Lankan Nikāyas have agreed to support this project after detailed discussions. Before agreeing,
            they extensively reviewed SuttaCentral’s translations to assure their accuracy and suitability. </p>
          <p>Our aim is to print 1,000 sets of the Sutta and Vinaya translations by Venerables Sujato and Brahmali. </p>
          <p>Each set consists of:</p>
          <ul>
            <li>Vinayapiṭaka — 6 volumes</li>
            <li>Dīghanikāya — 3 volumes</li>
            <li>Majjhimanikāya — 3 volumes</li>
            <li>Saṁyuttanikāya — 5 volumes</li>
            <li>Aṅguttaranikāya — 5 volumes</li>
            <li>Khuddakanikāya — Dhammapada, Udāna, Itivuttaka, Suttanipāta, Theragāthā, Therīgāthā; 1 volume each</li>
          </ul>
          <p>This totals 28 volumes, so the entire printing run will be 28,000 books in 1,000 sets. </p>
          <p>The books will be printed in excellent quality hard cover with sewn bindings. The printing will be handled by the
            premier Lake House printers of Sri Lanka. </p>
          <p>We can only bring this worthy project to completion with your help. If you would like to donate to support the
            costs of printing, please visit our fundraising page on Raisely.</p>
          <p>For any questions, please contact our financial officer, Deepika Weerakoon
            (suttacentraldevelopmenttrust@gmail.com).</p>
          <div class="donate-button-container">
            <a class="link-button block-link" href="https://suttacentral-pirivena-pitaka.raiselysite.com/">
              Support this Project
            </a>
          </div>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-pirivenas-project', SCStaticPirivenasProject);
