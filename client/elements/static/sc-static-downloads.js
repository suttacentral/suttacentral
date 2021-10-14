import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticDownloadsPage extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <style>
        img {
          float: right;
          width: 50%;
        }
      </style>
      <main>
        <article>
          <h1>${this.localize('downloads:1')}</h1>
          <h2>${this.localize('downloads:2')}</h2>
          <p>${unsafeHTML(this.localize('downloads:3'))}</p>
          <ul>
            <li>
              <a href="/api/ebook/dn_en_sujato.epub" download target="_blank">
                <cite class="text-translated">Long Discourses</cite>
                (
                <cite class="text-root">Dīgha Nikāya</cite>
                ),
                <span class="author">Bhikkhu Sujato</span>
              </a>
            </li>
            <li>
              <a href="/api/ebook/mn_en_sujato.epub" download target="_blank">
                <cite class="text-translated">Middle Discourses</cite>
                (
                <cite class="text-root">Majjhima Nikāya</cite>
                ),
                <span class="author">Bhikkhu Sujato</span>
              </a>
            </li>
            <li>
              <a href="/api/ebook/sn_en_sujato.epub" download target="_blank">
                <cite class="text-translated">Linked Discourses</cite>
                (
                <cite class="text-root">Saṁyutta Nikāya</cite>
                ),
                <span class="author">Bhikkhu Sujato</span>
              </a>
            </li>
            <li>
              <a href="/api/ebook/an_en_sujato.epub" download target="_blank">
                <cite class="text-translated">Numbered Discourses</cite>
                (
                <cite class="text-root">Aṅguttara Nikāya</cite>
                ),
                <span class="author">Bhikkhu Sujato</span>
              </a>
            </li>
            <li>
              <a href="/api/ebook/thag_en_sujato.epub" download target="_blank">
                <cite class="text-translated">Verses of the Senior Monks</cite>
                (
                <cite class="text-root">Theragāthā</cite>
                ),
                <span class="author">Bhikkhu Sujato</span>
              </a>
            </li>
            <li>
              <a href="/api/ebook/thig_en_sujato.epub" download target="_blank">
                <cite class="text-translated">Verses of the Senior Nuns</cite>
                (
                <cite class="text-root">Therīgāthā</cite>
                ),
                <span class="author">Bhikkhu Sujato</span>
              </a>
            </li>
          </ul>
          <h2>${this.localize('downloads:4')}</h2>
          <p>${unsafeHTML(this.localize('downloads:5'))}</p>
          <h2>${this.localize('downloads:6')}</h2>
          <p>${unsafeHTML(this.localize('downloads:7'))}</p>
          <p>${this.localize('downloads:8')}</p>
          <p>${this.localize('downloads:9')}</p>
          <table>
            <tr>
              <td>${unsafeHTML(this.localize('downloads:10'))}</td>
              <td>${unsafeHTML(this.localize('downloads:11'))}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('downloads:12'))}</td>
              <td>${this.localize('downloads:13')}</td>
            </tr>
            <tr>
              <td>${unsafeHTML(this.localize('downloads:14'))}</td>
              <td>${unsafeHTML(this.localize('downloads:15'))}</td>
            </tr>
          </table>
          <h2>${this.localize('downloads:16')}</h2>
          <p>${unsafeHTML(this.localize('downloads:17'))}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/downloads';
  }
}

customElements.define('sc-static-downloads', SCStaticDownloadsPage);
