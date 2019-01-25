import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCANewBeginning extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`SuttaCentral 2018`}
            </h1>
            <p>
              ${_`Welcome to the next generation of SuttaCentral! Our site has gone through a lot of changes since our humble beginnings in 2005. Here’s what’s new.`}
            </p>
            <p>
              ${_`The new site features a new translation of the four Pali <i>nikāyas</i>, prepared for SuttaCentral by Bhante Sujato. It’s a warm and lucid text, with an emphasis on accuracy and clarity. We believe it’s the first ever complete, consistent, and unified translation of the four <i>nikāyas</i> in any European language. SuttaCentral is proud to make it freely available without any copyright restrictions.`}
            </p>
            <p>
              ${_`The sutta translations are accompanied by an ongoing translation of the Pali Vinaya by Bhante Brahmali. The classic Vinaya translation by I.B. Horner has long been in need of an update. Bhante Brahmali’s new translation is clear and accessible, and stems from his long experience not only with Pali and the texts, but with living in a community that runs according to the Vinaya. This new translation is being progressively introduced to the site.`}
            </p>
            <p>
              ${_`Both these new translations are being implemented on a segmented basis. That means that each segment of the Pali text is matched with the corresponding translation. This allows us to display the original texts with translation segment by segment. It also gives us a way of reliably and consistently referencing the Pali text at a granular level, something that has never before been possible. These segmented texts use a software called Pootle which is designed to make translator’s jobs easier. They’re intended, not just as stand-alone translations, but as the basis for a new generation of translations into other languages.`}
            </p>
            <p>
              ${_`We’ve also completely rebuilt the site. All the old features are still here, but there’s lots that’s new.`}
            </p>
            <ul>
              <li>
                ${_`Open and inviting design, based on clear, considered, and familiar patterns.`}
              </li>
              <li>
                ${_`Side menu offers more detailed and flexible navigation. For the first time, our site navigation accurately reflects the traditional hierarchical structure of the texts.`}
              </li>
              <li>
                ${_`Descriptive summaries explain the texts and categories.`}
              </li>
              <li>
                ${_`Parallels show the relationships between texts more clearly.`}
              </li>
              <li>
                ${_`Thousands more parallels and connections.`}
              </li>
              <li>
                ${_`We now support multiple translations in the same language.`}
              </li>
              <li>
                ${_`The site is internationalized, so you can view it in a variety of languages. We’ll support more languages over time.`}
              </li>
              <li>
                ${_`Cutting-edge Progressive Web App technologies make the site available offline on supported systems. This is ideal for people out of internet range, or who have limited data plans.`}
              </li>
              <li>
                ${_`The translation software is integrated with the site, making it not just a place for presenting texts, but a publishing platform for translating suttas.`}
              </li>
            </ul>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_a-new-beginning-page';
  }
}


customElements.define('sc-a-new-beginning', SCANewBeginning);
