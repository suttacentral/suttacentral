import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCLicensingPage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`Licensing`}
            </h1>
            <p>
              ${_`The Buddhist texts, whether in original languages or translation, are regarded by the Buddhist traditions as “the Buddha’s words”. They are a spiritual heritage of humanity, not belonging to any individual. At SuttaCentral we continue this tradition by making the texts available to everyone free of charge. Our work would not be possible if it were not for the freely given contributions of countless people, and we hope to repay this kindness in some small way by contributing our work for free.`}
            </p>
            <p>
              ${_`Our source files are freely available on <a href="https://github.com/suttacentral" rel="noopener" target="_blank" title="SuttaCentral on Github">SuttaCentral’s Github repository</a>. SuttaCentral is proud to be part of the open source community.`}
            </p>
            <p>
              ${_`Material on SuttaCentral falls in three distinct categories in relation to copyright, which are detailed below. If you wish to assert copyright over any material on SuttaCentral, or wish to discuss copyright on SuttaCentral, please do not hesitate to contact us <a href="https://discourse.suttacentral.net/" rel="noopener" target="_blank">on our forum</a>.`}
            </p>
            <h3>
              ${_`1. Original material created by SuttaCentral`}
            </h3>
            <p>
              ${_`All original material created by SuttaCentral is dedicated to the Public Domain by means of <a href="http://creativecommons.org/publicdomain/zero/1.0/" rel="noopener" target="_blank">Creative Commons Zero (CC0 1.0 Universal)</a>.`}
            </p>
            <p>
              ${_`This includes all text, design, software, and images created by SuttaCentral or persons working for SuttaCentral, on the domain suttacentral.net, or any domains or subdomains owned or managed by SuttaCentral, unless otherwise specified.`}
            </p>
            <p>
              ${_`You are invited to copy, alter, redistribute, present, perform, convey, or make use of any or all of this material in any way you wish.`}
            </p>
            <p>
              ${_`If you make use of any of our material, even though you are under no legal obligations, we respectfully request that you:`}
            </p>
            <ul>
              <li>
                ${_`Provide a notice of attribution.`}
              </li>
              <li>
                ${_`Maintain the spirit of the Buddhist tradition.`}
              </li>
            </ul>
            <p>
              ${_`Please let us know if you would like any assistance in making use of our materials.`}
            </p>
            <h3>
              ${_`2. Material created by others and made available for SuttaCentral`}
            </h3>
            <p>
              ${_`For certain of the material on SuttaCentral the copyright has been asserted by third parties. This includes most of the translated texts. In such cases the terms of the copyright are specified by the copyright asserter, who is usually the translator or original publisher. Such material is used in accord with the license, or by permission. The relevant copyright notices as specified by the asserter of copyright are included with the material.`}
            </p>
            <p>
              ${_`In addition, please note licenses for the following assets used by SuttaCentral. We gratefully acknowledge the creators for their work and generosity.`}
            </p>
            <ul>
              <li>
                ${_`We use several icons from the Noun Project, kindly released via `}
                <a href="https://creativecommons.org/licenses/by/3.0/us/" tager="_blank" title="${_`Creative Commons license`}">
                  Creative Commons Attribution (CC BY 3.0 US)
                </a>
                ${_`.`}
                <ul>
                  <li>
                    ${_`“Difficulty” icons created by <a href="https://thenounproject.com/iconwar/" rel="noopener" target="_blank" title="Alena Artemova on the Noun Project">Alena Artemova</a>.`}
                  </li>
                  <li>
                    ${_`“Language” ISO icons by Krzysiek Woźniak based on a design by <a href="https://thenounproject.com/ralts01/" rel="noopener" target="_blank" title="Jonathan Coutiño on the Noun Project">Jonathan Coutiño</a>`}
                  </li>
                  <li>
                    ${_`“Disconnected cloud icon” by Bernar Novalyi.`}
                  </li>
                </ul>
              </li>
              <li>
                ${_`The paintings on the Home page are by the Australian artist Kim Hoa Tram, and are used by kind permission of the artist and the National Gallery of Victoria. These and other works by Kim Hoa Tram may be seen at the <a href="https://www.ngv.vic.gov.au/explore/collection/artist/11810/" rel="noopener" target="_blank" title="Kim Hoa Tram at the National Gallery of Victoria">National Gallery of Victoria website</a>.`}
              </li>
            </ul>
            <h3>
              ${_`3. Public domain material`}
            </h3>
            <p>
              ${_`The original texts of Buddhism in Pali, Chinese, Sanskrit, Tibetan, and other languages are in the <a href="http://creativecommons.org/publicdomain/mark/1.0/" rel="noopener" target="_blank">public domain</a>. Such material does not fall within the scope of copyright.`}
            </p>
            <p>
              ${_`In addition, the reference data, including information on parallels, is not an “original creation” and as such does not fall within the scope of copyright.`}
            </p>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_licensing-page';
  }
}


customElements.define('sc-licensing-page', SCLicensingPage);
