import { LitElement, html, css, svg } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { icon } from '../../img/sc-icon';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';
import { API_ROOT } from '../../constants';
import { setNavigation } from '../navigation/sc-navigation-common';
import {
  coverImage,
  creatorBio,
  allEditions,
  collectionURL,
  editionsGithubUrl,
  publicationLastGeneratedDate,
  publicationLastGeneratedFormattedDate,
} from './sc-publication-common';

export class SCPublicationEdition extends LitLocalized(LitElement) {
  static properties = {
    currentUid: { type: String },
    editionDetail: { type: Object },
    editionId: { type: String },
    coverImage: { type: String },
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
    this.editionUid = store.getState().currentRoute.params.editionUid;
    this.langIsoCode = store.getState().currentRoute.params.langIsoCode;
    this.#fetchAllEditions();
    this.#loadNewResult();
  }

  firstUpdated() {
    document.querySelector('sc-site-layout')?.showATB();
  }

  updated(changedProps) {
    super.updated(changedProps);

    this.volumesMenu = this.querySelector('#volumes-menu');
    if (this.volumesMenu) {
      this.volumesMenu.anchor = this.querySelector('#volumes-menu-button');
    }

    if (changedProps.has('editionId')) {
      if (this.editionId) {
        this.#loadNewResult();
      }
    }
    if (changedProps.has('volumesInfoForDownloadMenu')) {
      this.requestUpdate();
    }
    this.#updateNav();
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.currentRoute !== state.currentRoute) {
      this.currentRoute = state.currentRoute;
      if (this.currentRoute.path.includes('/edition/') && this.editionId) {
        this.#loadNewResult();
        this.#updateNav();
      }
    }
  }

  async #loadNewResult() {
    await this.#fetchEditionDetails();
    await this.#fetchEditionInfo();
    this.#fetchCreatorDetail();
    this.requestUpdate();
  }

  #updateNav() {
    if (!this.editionDetail || !this.editionDetail[0]) {
      return;
    }
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: 'Editions',
      url: `/editions`,
      type: 'PublicationPage',
    });
    navArray.push({
      title: `${this.editionDetail[0]?.translated_name?.replace('Collection', '') || 'edition'}`,
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  async #fetchEditionDetails() {
    try {
      try {
        this.editionDetail = await (await fetch(`${API_ROOT}/menu/${this.editionUid}`)).json();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  #fetchAllEditions() {
    setTimeout(() => {
      this.allEditions = allEditions;
      this.editionId = allEditions.find(
        x => x.uid === this.editionUid && x.edition_id?.includes('web')
      )?.edition_id;
      if (this.editionId) {
        reduxActions.changeCurrentEditionId(this.editionId);
        this.requestUpdate();
      }
    }, 100);
  }

  async #fetchEditionInfo() {
    try {
      this.editionInfo = await (
        await fetch(`${API_ROOT}/publication/edition/${this.editionId}`)
      ).json();
      if (this.editionDetail && this.editionDetail.length !== 0) {
        reduxActions.changeToolbarTitle(
          `${this.editionDetail[0].root_name} — ${this.editionInfo.publication?.creator_name}`
        );

        reduxActions.changeCurrentEditionHomeInfo({
          title: this.editionDetail[0]?.translated_name?.replace('Collection', ''),
          url: `/edition/${this.editionUid}/${this.currentRoute.params.langIsoCode}/${this.currentRoute.params.authorUid}`,
          root_title: this.editionDetail[0].root_name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  #fetchCreatorDetail() {
    try {
      for (const creator of creatorBio) {
        if (this.editionId?.includes(creator.creator_uid)) {
          this.creatorInfo = creator;
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  #computeFileUrlByType(publicationType) {
    const discoursesName = this.editionDetail[0].translated_name
      ?.replace('Collection', '')
      .trim()
      .replace(/\s+/g, '-');
    const { authorUid, langIsoCode } = this.currentRoute.params;

    if (publicationType === 'tex') {
      return `${editionsGithubUrl}/${langIsoCode}/${authorUid}/${this.editionUid}/paperback/${discoursesName}-${authorUid}-${publicationLastGeneratedFormattedDate}-${publicationType}.zip`;
    }

    if (publicationType === 'pdf') {
      return `${editionsGithubUrl}/${langIsoCode}/${authorUid}/${this.editionUid}/paperback/${discoursesName}-${authorUid}-${publicationLastGeneratedFormattedDate}.zip`;
    }

    return `${editionsGithubUrl}/${langIsoCode}/${authorUid}/${this.editionUid}/${publicationType}/${discoursesName}-${authorUid}-${publicationLastGeneratedFormattedDate}.${publicationType}`;
  }

  createRenderRoot() {
    return this;
  }

  #publicationDetailTemplate() {
    return this.editionInfo && this.editionInfo.publication
      ? html`
      <h2>Publication details</h2>
        <dl class="publication">
          <dt class="publication_number">SuttaCentral publication number</dt>
          <dd>${this.editionInfo.publication.publication_number}</dd>
          <dt class="source_url">Source</dt>
          <dd>${this.editionInfo.publication.source_url}</dd>
          <dt class="text_uid">Text ID</dt>
          <dd>${this.editionInfo.publication.text_uid.toUpperCase()}</dd>
          <dt class="publication_status">Publication Status</dt>
          <dd>${this.editionInfo.publication.publication_status}</dd>
          <dt class="license">License</dt>
          <dd>
            <p>${this.editionInfo.publication.license_statement}</p>
            <a rel="license" href=${this.editionInfo.publication.license_url}>
              <p xmlns:dct="https://purl.org/dc/terms/" xmlns:vcard="https://www.w3.org/2001/vcard-rdf/3.0#">
                  <img src='/img/publication-pages/cc-zero.svg' alt='CC0' />
                  <span>
                    <strong>CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.</strong>
                    <br>To the extent possible under law,
                    <span property='dct:title'>${
                      this.editionInfo.publication.creator_name
                    }</span> has waived all copyright and related or neighboring rights to <span property='dct:title'>${this.editionDetail[0].translated_name.replace('Collection','')}</span>. 
                    This work is published from: <span property='vcard:Country' datatype='dct:ISO3166' content='AU' about='https://suttacentral.net/${
                      this.editionUid
                    }'> Australia</span>.
                  </span>
              </p>
            </a>
            </a>
          </dd>
        </dl>
    `
      : '';
  }

  #hgroupTemplate() {
    return html`
      <hgroup class="page-header">
        <h1 class="translation_title">
          ${this.editionDetail[0].translated_name.replace('Collection', '')}
        </h1>
        <p class="translation_subtitle">${this.editionInfo?.publication?.translation_subtitle}</p>
        <p class="creator_name">${this.editionInfo?.publication?.creator_name}</p>
      </hgroup>
    `;
  }

  #bookCoverPictureTemplate() {
    return html`
      <figure class="book-pic">
        <img
          src="/img/publication-pages/${coverImage.get(this.editionInfo?.publication?.text_uid)}"
          alt="Cover art for ${this.editionDetail[0].translated_name.replace('Collection', '')}"
        />
        <figcaption>Paperback edition of ${this.editionDetail[0].translated_name.replace('Collection', '')}</figcaption>
      </figure>
    `;
  }

  #bookIntroductionTemplate() {
    return html`
      <h2>This translation</h2>
      <p>
        This translation was part of a project to translate the four Pali Nikāyas with the following
        aims:
      </p>
      <ul>
        <li>plain, approachable English;</li>
        <li>consistent terminology;</li>
        <li>accurate rendition of the Pali;</li>
        <li>free of copyright.</li>
      </ul>
      <p>It was made during 2016–2018 while Bhikkhu Sujato was staying in Qimei, Taiwan.</p>
    `;
  }

  #editionDetailTemplate() {
    return html`
      <h2>The ${this.editionDetail[0].root_name}</h2>
      <p class="blurb">${unsafeHTML(this.editionDetail[0].blurb)}</p>
    `;
  }

  #bookAuthorBiographyTemplate() {
    return html`
      <h2>The Author</h2>
      <figure class="author-pic">
        <img
          src="/img/publication-pages/${this.creatorInfo.creator_uid}.jpg"
          alt=${this.creatorInfo.creator_uid}
        />
        <figcaption>${this.creatorInfo.creator_uid}</figcaption>
      </figure>
      ${unsafeHTML(this.creatorInfo.creator_biography)}
    `;
  }

  #printOnDemandTemplate() {
    return html`
      <tr>
        <td>${icon.paperback} Book, paperback</td>
        <td>
          <a href="https://github.com/suttacentral/editions" class="external"
            >${icon.external} Print on demand</a
          >
        </td>
      </tr>
    `;
  }

  #epubDownloadTemplate() {
    return html`
      <tr>
        <td>${icon.epub} Epub</td>
        <td>
          <a href=${this.#computeFileUrlByType('epub')} class="download">
            ${icon.file_download} Download
          </a>
        </td>
      </tr>
    `;
  }

  #pdfDownloadTemplate() {
    return html`
      <tr>
        <td>${icon.pdf} Pdf</td>
        <td>
          <a href=${this.#computeFileUrlByType('pdf')} class="download">
            ${icon.file_download} Download
          </a>
        </td>
      </tr>
    `;
  }

  #rawHtmlDownloadTemplate() {
    return html`
      <tr>
        <td>${icon.html} Raw HTML file</td>
        <td>
          <a href=${this.#computeFileUrlByType('html')} class="download">
            ${icon.file_download} Download
          </a>
        </td>
      </tr>
    `;
  }

  #rawTexDownloadTemplate() {
    return html`
      <tr>
        <td>${icon.latex} Raw TeX file</td>
        <td>
          <a href=${this.#computeFileUrlByType('tex')} class="download">
            ${icon.file_download} Download
          </a>
        </td>
      </tr>
    `;
  }

  readOnSuttaCentralTemplate() {
    return html`
      <tr>
        <td>${icon.web} Web</td>
        <td>
          <a href=${ifDefined(collectionURL.get(this.editionUid))} class="internal">
            ${icon.translation} Read on SuttaCentral
          </a>
        </td>
      </tr>
    `;
  }

  render() {
    if (
      !this.editionDetail ||
      this.editionDetail.length === 0 ||
      !this.editionInfo ||
      !this.creatorInfo
    ) {
      return html``;
    }
    return html`
      <style>
        mwc-button {
          --mdc-theme-primary: var(--sc-primary-accent-color);
          --mdc-theme-on-primary: white;
        }
        ${typographyCommonStyles}
        ${typographyStaticStyles}
        ${SCPublicationStyles}
      </style>
      <header></header>
      <main>
        <article>
          ${this.#hgroupTemplate()}
          <section>${this.#bookCoverPictureTemplate()} ${this.#bookIntroductionTemplate()}</section>
          <section>
            <table>
              <caption>
                Available editions
              </caption>
              <tbody>
                ${this.#printOnDemandTemplate()} ${this.#epubDownloadTemplate()}
                ${this.#pdfDownloadTemplate()} ${this.#rawHtmlDownloadTemplate()}
                ${this.#rawTexDownloadTemplate()} ${this.readOnSuttaCentralTemplate()}
              </tbody>
              <tfoot>
                <tr>
                  <td>Updated ${publicationLastGeneratedDate}</td>
                </tr>
              </tfoot>
            </table>
          </section>
          ${this.#editionDetailTemplate()} ${this.#bookAuthorBiographyTemplate()}
          <section>${this.#publicationDetailTemplate()}</section>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-publication-edition', SCPublicationEdition);
