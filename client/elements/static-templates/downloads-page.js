import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCDownloadsPage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <style>
      img {
        float: right;
        width: 50%;
      }
    </style>
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`Downloads`}
            </h1>
            <h2>${_`Download EPUBs`}</h2>
            <p>${_`The latest version of key translations on SuttaCentral.</p>`}
            <ul>
            <li><a href="/api/ebook/dn_en_sujato.epub" download target="_blank"><cite class="text-translated">Long Discourses</cite> (<cite class="text-root">Dīgha Nikāya</cite>), <span class="author">Bhikkhu Sujato</span></a></li>
            <li><a href="/api/ebook/mn_en_sujato.epub" download target="_blank"><cite class="text-translated">Middle Discourses</cite> (<cite class="text-root">Majjhima Nikāya</cite>), <span class="author">Bhikkhu Sujato</span></a></li>
            <li><a href="/api/ebook/sn_en_sujato.epub" download target="_blank"><cite class="text-translated">Linked Discourses</cite> (<cite class="text-root">Saṁyutta Nikāya</cite>), <span class="author">Bhikkhu Sujato</span></a></li>
            <li><a href="/api/ebook/an_en_sujato.epub" download target="_blank"><cite class="text-translated">Numbered Discourses</cite> (<cite class="text-root">Aṅguttara Nikāya</cite>), <span class="author">Bhikkhu Sujato</span></a></li>
            <li><a href="/api/ebook/thag_en_sujato.epub" download target="_blank"><cite class="text-translated">Verses of the Senior Monks</cite> (<cite class="text-root">Theragāthā</cite>), <span class="author">Bhikkhu Sujato</span></a></li>
            <li><a href="/api/ebook/thig_en_sujato.epub" download target="_blank"><cite class="text-translated">Verses of the Senior Nuns</cite> (<cite class="text-root">Therīgāthā</cite>), <span class="author">Bhikkhu Sujato</span></a></li>
            </ul>
            <h2>
              ${_`Raw Data and Texts`}
            </h2>
            <p>
              ${_`All the raw SuttaCentral data (<code>json</code>, <code>html</code>, etc.) is <a href="https://github.com/suttacentral/" rel="noopener" target="_blank">available on our GitHub repository</a>.`}
            </p>
            <h2>
              ${_`The Book of the Discipline`}
            </h2>
            <p>
              ${_`SuttaCentral is proud to offer the full text of <span class="author">I.B. Horner</span>’s translation of the Pali Vinaya in six volumes. This is the first time that this classic of 20th century Buddhist scholarship has been made available in a true digital edition. We are able to do this because the <a href="http://www.palitext.com/" rel="noopener" target="_blank">Pali Text Society</a>, holders of the copyright, kindly released the text under a <a href="http://creativecommons.org/licenses/by-nc/3.0/" rel="noopener" target="_blank">Creative Commons Attribution-NonCommercial 3.0</a> licence.`}
            </p>
            <p>
              ${_`SuttaCentral exists to present the Buddhist texts, not people’s opinions about the texts, so our policy is to exclude introductions, footnotes, and the like. On SuttaCentral, therefore, we have only the translated text itself. However, in this case we felt that the scholarly apparatus was valuable enough to put the considerable effort into creating a proper digital edition of the entire text. This is what we offer in these downloads. These are, of course, covered by the same Creative Commons Attribution-NonCommercial 3.0 licence. The text is presented in a number of formats, which are explained below.`}
            </p>
            <p>
              ${_`Further details on the process of creating these texts and on relevant changes are included in the Preface to the SuttaCentral edition. All versions include such enhancements as clickable links for over 12,000 internal references, detailed tables of contents, and revised reference system.`}
            </p>
            <table>
              <tr>
                <td>
                  ${_`<a class="file" href="https://github.com/suttacentral/suttacentral-files/blob/master/Book_of_the_Discipline.pdf?raw=true">PDF</a> (9.8mb)`}
                </td>
                <td>
                  ${_`This is the entire six volumes in one <span class="smallcaps">pdf</span> file. The file was created in LaTeX, and is a high quality <span class="smallcaps">pdf</span> suitable for all devices as well as for printing. Under the licence terms it is permissible to publish a print edition for free distribution. If you are interested to do this, please contact us and we can help tailor the <span class="smallcaps">pdf</span> file to your needs.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`<a class="file" href="https://github.com/suttacentral/suttacentral-files/blob/master/Book_of_the_Discipline.epub?raw=true">EPUB</a> (3.0mb)<br/> <a class="file" href="https://github.com/suttacentral/suttacentral-files/blob/master/Book_of_the_Discipline.mobi?raw=true">MOBI</a> (5.6mb)`}
                </td>
                <td>
                  ${_`E-book version suitable for use with e-readers. Mobi (Kindle) and ePub are the most common e-book formats, the Calibre software can convert to other formats.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`<a class="file" href="https://github.com/suttacentral/suttacentral-files/blob/master/Book_of_the_Discipline_source.zip?raw=true">ZIP</a> (3.6mb)`}
                </td>
                <td>
                  ${_`Source archive, contains the <span class="smallcaps">tex</span> source file suitable for compiling with LuaLatex, and the entire six volumes as one large <span class="smallcaps">html</span> file. These are the base files from which the other formats were derived.`}
                </td>
              </tr>
            </table>
            <h2>
              ${_`Sutta Nipāta by Laurence Mills`}
            </h2>
            <p>
              ${_`The Sutta Nipāta is a well known and well loved early Buddhist text. It is a compilation of poems that inspire, educate, and admonish. Touching devotion, profound philosophy, pragmatic ethics, and insights into early Buddhist culture all find their place here. This translation expresses these teachings in a poetic voice. The primary translator and commentator is the experienced Pali scholar Laurence Khantipalo Mills, with portions by others including Bhikkhu Ñānamoli and Bhikkhu Sujato. Download the <a class="file" href="https://github.com/suttacentral/suttacentral-files/blob/master/snp.pdf?raw=true">PDF</a> (0.8mb) here or you can order the paperback on Lulu.com.`}
            </p>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_downloads-page';
  }
}


customElements.define('sc-downloads-page', SCDownloadsPage);
