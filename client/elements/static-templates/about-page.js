import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCAboutPage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`About SuttaCentral`}
            </h1>
            <p>
              ${_`SuttaCentral is a website run by a small team, originally based in Australia. We have no institutional affiliation, but are just a group of friends interested in the Suttas. The founders are Rod Bucknell, John Kelly, and Bhante Sujato. As of 2017 the main developers are Bhante Sujato, Ayya Vimala, and Blake Walsh. Financial support for the site comes the SuttaCentral Development Trust, a non-profit charity incorporated in Australia.`}
            </p>
            <p>
              ${_`SuttaCentral aims at facilitating the study of Buddhist texts from comparative and historical perspectives. It focuses on the texts that represent “Early Buddhism”, texts preserved not only in the Pali Sutta and Vinaya Piṭakas but also in Chinese and Tibetan translations and in fragmentary remains in Sanskrit and other languages.`}
            </p>
            <p>
              ${_`SuttaCentral offers a gateway to this material by enabling users to quickly identify the Chinese, Tibetan, and/or Sanskrit parallels of any given Pali discourse, or vice versa. Having found that information, one can consult the actual texts or view available translations.`}
            </p>
            <p>
              ${_`While the website is our main focus, we also publish some texts in book form.`}
            </p>
            <p>
              ${_`SuttaCentral is under constant development and updates are made regularly. To keep up with what’s new, <a href="https://discourse.suttacentral.net/c/meta/updates" rel="noopener" target="_blank">check the Updates category in our forum</a>.`}
            </p>
            <h2>
              ${_`Privacy and security`}
            </h2>
            <p>
              ${_`SuttaCentral does not, and never will, serve advertising or tracking. We do not collect any personal data on users without your knowledge and consent. All our pages are served over secure, encrypted connections.`}
            </p>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_about-page';
  }
}


customElements.define('sc-about-page', SCAboutPage);
