import { LitElement, html, css } from 'lit';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

class ScPublicationAn extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${SCPublicationStyles}
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {};
  }

  // constructor() {
  //   super();
  // }

  firstUpdated() {
    this._updateNav();
    reduxActions.changeToolbarTitle('Publications-Numbered Discourses');
  }

  _updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 2;
    navArray.push({
      title: 'Publications-Numbered Discourses',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  render() {
    return html`
      <header></header>
      <main>
        <article>
          <header class="page-header">
            <h1>Numbered Discourses</h1>
            <p class="subtitle">A translation of the Aṅguttara Nikāya</p>
            <p class="author">Bhikkhu Sujato</p>
          </header>
          <figure class="book-pic">
            <img src="/img/publication-pages/bibliotheca.jpg" alt="" width="300" height="300" />
            <figcaption>What they look like printed. Probably!</figcaption>
          </figure>
          <nav class="toc">
            <ol>
              <li><a href="#heading1">This translation</a></li>
              <li><a href="#heading2">The Aṅguttara Nikāya</a></li>
              <li><a href="#heading3">The Author</a></li>
              <li><a href="#heading4">Available editions</a></li>
              <li><a href="#heading5">Publication details</a></li>
            </ol>
          </nav>
          <section class="description">
            <h2><a id="heading1">This translation</a></h2>

            <p>
              This translation was part of a project to translate the four Pali Nikāyas with the
              following aims:
            </p>
            <ul>
              <li>plain, approachable English;</li>
              <li>consistent terminology;</li>
              <li>accurate rendition of the Pali;</li>
              <li>free of copyright.</li>
            </ul>
            <p>It was made during 2016–2018 while Bhikkhu Sujato was staying in Qimei, Tawian.</p>
            <h2><a id="heading2">The Aṅguttara Nikāya</a></h2>
            <p class="blurb">
              The “Numbered” or “Numerical” Discourses are usually known as Aṅguttara Nikāya in
              Pali, abbreviated AN. However, the Pali tradition also knows the form Ekottara
              (“one-up” or “incremental”), and this is the form usually found in the northern
              collections. These collections organize texts in numbered sets, from one to eleven.
              Compared to the other <i>nikāyas</i>, they are more oriented to the lay community. The
              Ekottarikāgama (EA) in Chinese is a highly unusual text, which features a range of
              variations within itself when it comes even to basic doctrines. It shares considerably
              less in common with the Pali Aṅguttara than the other collections do with their
              counterparts. In addition, there is a partial Ekottarikāgama in Chinese, as well as a
              variety of individual discourses and fragments in Chinese and Sanskrit.</p>
            <h2><a id="heading3">The Author</a></h2>
            <figure class="author-pic">
              <img
                src="/img/publication-pages/sujato.jpg"
                alt="Bhikkhu Sujato"
                width="300"
                height="300"
              />
              <figcaption>Bhikkhu Sujato at Lokanta Vihara, 2019</figcaption>
            </figure>
            <p>
              Bhikkhu Sujato (Anthony Aidan Best) was born in Perth on 4/11/1966. In his early life
              he studied philosophy at UWA and pursued a music career with the band Martha’s
              Vineyard. He was also active in the animal liberation movement. In 1992 he went to
              Thailand where he encountered Buddhism, doing several intensive meditation retreats at
              at Wat Ram Poeng in Chieng Mai. In 1994, while staying at Wat Pan Nanachat in
              north-east Thailand, he took higher ordination in the Mahā Nikāya order in the
              tradition of Ajahn Chah. In 1997 he went to Bodhinyana Monastery in Perth, where he
              stayed for several years with Ajahn Brahm as his teacher. From 2003 to 2012 he ran
              Santi Forest Monastery in Bundanoon, New South Wales. During this time he wrote
              several books of often ground-breaking research into matters pertaining to early
              Buddhism. He was a strong supporter of the successful revival of the bhikkhuni order
              of fully ordained nuns.
            </p>
            <p>
              In 2004 he founded SuttaCentral together with Rod Bucknell and John Kelly. Seeing the
              lack of a consistent, accurate, and freely available translation of the Pali suttas,
              in 2015 he embarked on the project to translate the entire four Nikāyas from Pali,
              which he completed in 2018. He live in Sydney at the Lokanta Vihara, the “Monastery at
              the End of the World”.
            </p>
          </section>
          <section>
            <h2><a id="heading4">Available editions</a></h2>
            <table>
              <caption></caption>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Publisher</th>
                <th></th>
              </tr>
              <tr>
                <td class="web">Web</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='' class='internal'>Read on SuttaCentral</a></td>
              </tr>
              <tr>
                <td class='book'>Book, softcover</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='' class='external'>Print on demand</a></td>
              </tr>
              <tr>
                <td class='book'>Book, hardback</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='' class='external'>Print on demand</a></td>
              </tr>
              <tr>
                <td class='epub'>Epub</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='' class='download'>Download</a></td>
              </tr>
              <tr>
                <td class='pdf'>Pdf</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='' class='download'>Download</a></td>
              </tr>
            </table>
          </section>

          <section>
            <h2><a id="heading5">Publication details</a></h2>
            <dl class="publication">
              <dt class="publication_number">SuttaCentral publication number</dt>
              <dd>scpub5</dd>
              <dt class="source_url">Source</dt>
              <dd>
                https://github.com/suttacentral/bilara-data/tree/master/translation/en/sujato/an
              </dd>
              <dt class="text_uid">Text ID</dt>
              <dd>AN</dd>
              <dt class="publication_status">Publication Status</dt>
              <dd>Completed, revision is ongoing.</dd>
              <dt class="license">License</dt>
              <dd>
                <p>
                  This translation is an expression of an ancient spiritual text that has been
                  passed down by the Buddhist tradition for the benefit of all sentient beings. It
                  is dedicated to the public domain via Creative Commons Zero (CC0). You are
                  encouraged to copy, reproduce, adapt, alter, or otherwise make use of this
                  translation. The translator respectfully requests that any use be in accordance
                  with the values and principles of the Buddhist community.
                </p>
                <a rel="license" href="https://creativecommons.org/publicdomain/zero/1.0/">
                  <p
                    xmlns:dct="https://purl.org/dc/terms/"
                    xmlns:vcard="https://www.w3.org/2001/vcard-rdf/3.0#"
                      <img src='/img/publication-pages/cc-zero.svg' alt='CC0' /><span><strong>CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
                      </strong><br>To the extent possible under law, <span property='dct:title'>Bhikkhu Sujato</span> has
                      waived all copyright and related or neighboring rights to <span property='dct:title'>Numbered
                        Discourses</span>. This work is published from: <span property='vcard:Country'
                        datatype='dct:ISO3166' content='AU' about='https://suttacentral.net/an'> Australia</span>.</span>
                  </p>
                </a>
              </dd>
            </dl>
          </section>
        </article>
      </main>
      <footer>
        <a class='prev'></a>
        <a class='next' href='preface.html'>Preface</a>
      </footer>
    `;
  }
}

customElements.define('sc-publication-an', ScPublicationAn);