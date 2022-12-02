import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { icon } from '../../img/sc-icon';
import { SCPublicationEditionsStyles } from '../styles/sc-publication-editions-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';
import { API_ROOT } from '../../constants';
// import { getCoverPictures } from '../publication/sc-publication-common';

class ScPublicationEditions extends LitLocalized(LitElement) {
  static properties = {
    webEditionInfo: { type: Array },
  };

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  constructor() {
    super();
    this.currentRoute = store.getState().currentRoute;
    this.webEditionInfo = [];
    this.editionBlurbs = [];
    this.coverImage = new Map([
      ['dn', 'dn-book.jpg'],
      ['mn', 'mn-book.jpg'],
      ['sn', 'sn-book.jpg'],
      ['an', 'an-book.jpg'],
      ['dhp', 'snp-book.jpg'],
      ['ud', 'snp-book.jpg'],
      ['iti', 'snp-book.jpg'],
      ['snp', 'snp-book.jpg'],
      ['thag', 'snp-book.jpg'],
      ['thig', 'snp-book.jpg'],
      ['pli-tv-vi', 'snp-book.jpg'],
    ]);
  }

  firstUpdated() {
    this.#updateNav();
    reduxActions.changeToolbarTitle('Editions');
    document.querySelector('sc-site-layout')?.hideATB();
    this._loadData();
  }

  async _loadData() {
    await this._getWebEditionIds();
  }

  async _getWebEditionIds() {
    try {
      this.allEditions = await (await fetch(`${API_ROOT}/publication/editions`)).json();
      if (!this.allEditions) {
        return;
      }
      this.webEditionIds = [];
      this.webEditionInfo = [];
      for (const edition of this.allEditions) {
        if (edition.edition_id.includes('-web_')) {
          this.webEditionIds.push(edition.edition_id);
        }
      }
      for (const editionId of this.webEditionIds) {
        this._fetchEditionInfo(editionId);
      }
      await this._fetchEditionBlurbs('en');
      this.requestUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  #sortWebEditionInfoByUid() {
    this.webEditionInfo.sort((start, next) => {
      const order = [
        'dn',
        'mn',
        'sn',
        'an',
        'dhp',
        'ud',
        'iti',
        'snp',
        'thag',
        'thig',
        'pli-tv-vi',
      ];
      return order.indexOf(start.edition.text_uid) - order.indexOf(next.edition.text_uid);
    });
  }

  async _fetchEditionInfo(editionId) {
    try {
      this.editionInfo = await (await fetch(`${API_ROOT}/publication/edition/${editionId}`)).json();
      this.webEditionInfo.push(this.editionInfo);
    } catch (error) {
      console.log(error);
    }
  }

  async _fetchEditionBlurbs(lang) {
    try {
      this.editionBlurbs = await (
        await fetch(`${API_ROOT}/publication/edition/blurbs/${lang}`)
      ).json();
    } catch (error) {
      console.log(error);
    }
  }

  #updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: 'Editions',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  createRenderRoot() {
    return this;
  }

  #allEditionsTemplate() {
    return html`
      ${this.webEditionInfo?.map(
        edition => html`
          <section class="project">
            <a
              class="header-link"
              href="/edition/${edition.publication.text_uid}/${edition.publication
                .translation_lang_iso}/${edition.publication.creator_uid}"
            >
              <hgroup>
                <h2 class="translation_title">${edition.publication.translation_title}</h2>
                <span class="translation_subtitle"
                  >${edition.publication.translation_subtitle}</span
                >
              </hgroup>
            </a>
            <p class="creator_name">${edition.publication.creator_name}</p>
            <p class="publication_blurb">
              <img
                src="/img/publication-pages/${this.coverImage.get(edition.publication.text_uid)}"
                alt="Cover art for ${edition.publication.translation_title}"
              />
              ${unsafeHTML(
                this.editionBlurbs.find(x => x.uid === edition.publication.text_uid)?.blurb
              )}
            </p>
          </section>
        `
      )}
    `;
  }

  render() {
    this.#sortWebEditionInfoByUid();
    return html`
      <style>
        ${typographyCommonStyles}
        ${typographyStaticStyles}
        ${SCPublicationEditionsStyles}
      </style>
      <main>
        <article>
          <hgroup class="page-header">
            <h1>SuttaCentral Editions</h1>
            <p class="subtitle">Selected translations as books in multiple formats</p>
          </hgroup>
          <p>
            Since 2005 SuttaCentral has provided access to the texts, translations, and parallels of
            early Buddhist texts. In 2018 we started creating and publishing our own translations of
            these seminal spiritual classics. The “Editions” series now makes selected translations
            available as books in various formats, including print, PDF, and EPUB.
          </p>
          <p>
            Editions are selected from our most complete, well-crafted, and reliable translations.
            They aim to bring these texts to a wider audience in forms that reward mindful reading.
            Care is taken with every detail of the production, and we aim to meet or exceed
            professional best standards in every way. These are the core scriptures underlying the
            entire Buddhist tradition, and we believe that they deserve to be preserved and made
            available in highest quality without compromise.
          </p>

          <section class="down-all">
            <ul>
              <li>
                ${icon.translation} Order a printed copy from the individual edition pages below.
              </li>
              <li>
                ${icon.file_download}
                <a href="https://github.com/suttacentral/editions/archive/refs/heads/main.zip"
                  >Download digital editions in all file types (zip).
                </a>
              </li>
              <li>
                ${icon.external}
                <a href="https://github.com/suttacentral/editions">Go to the source on Github.</a>
              </li>
            </ul>
          </section>
          ${this.#allEditionsTemplate()}
        </article>
      </main>
    `;
  }
}

customElements.define('sc-publication-editions', ScPublicationEditions);
