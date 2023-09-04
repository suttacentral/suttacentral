import { LitElement, html, css } from 'lit';
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
  lastUpdatedDateOfCollections,
  publicationLastGeneratedDate,
} from './sc-publication-common';

export class SCPublicationEdition extends LitLocalized(LitElement) {
  static properties = {
    currentUid: { type: String },
    editionDetail: { type: Object },
    editionId: { type: String },
    editionPaperbackId: { type: String },
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
    this.lastUpdatedDateOfCollection = lastUpdatedDateOfCollections.get(this.editionUid);
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
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  #fetchAllEditions() {
    setTimeout(() => {
      this.allEditions = allEditions;
      this.editionId = allEditions.find(
        x => x.uid === this.editionUid && x.edition_id?.includes('web')
      )?.edition_id;

      this.editionPaperbackId = allEditions.find(
        x => x.uid === this.editionUid && x.edition_id?.includes('paperback')
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

      this.editionPaperbackInfo = await (
        await fetch(`${API_ROOT}/publication/edition/${this.editionPaperbackId}`)
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
      console.error(error);
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
      console.error(error);
    }
  }

  #computeFileUrlByType(publicationType) {
    const discoursesName = this.editionDetail[0].translated_name
      ?.replace('Collection', '')
      .trim()
      .replace(/\s+/g, '-');
    const { authorUid, langIsoCode } = this.currentRoute.params;

    if (publicationType === 'tex') {
      return `${editionsGithubUrl}/${langIsoCode}/${authorUid}/${this.editionUid}/paperback/${discoursesName}-${authorUid}-${this.lastUpdatedDateOfCollection}-${publicationType}.zip`;
    }

    if (publicationType === 'pdf') {
      return `${editionsGithubUrl}/${langIsoCode}/${authorUid}/${this.editionUid}/paperback/${discoursesName}-${authorUid}-${this.lastUpdatedDateOfCollection}.zip`;
    }

    return `${editionsGithubUrl}/${langIsoCode}/${authorUid}/${this.editionUid}/${publicationType}/${discoursesName}-${authorUid}-${this.lastUpdatedDateOfCollection}.${publicationType}`;
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
                    <span property='dct:title'>
                      ${this.editionInfo.publication.creator_name}
                    </span> has waived all copyright and related or neighboring rights to 
                    <span property='dct:title'>
                      ${this.editionDetail[0].translated_name.replace('Collection', '')}
                    </span>.
                    This work is published from: 
                    <span 
                      property='vcard:Country' 
                      datatype='dct:ISO3166' 
                      content='AU' 
                      about='https://suttacentral.net/${this.editionUid}'
                    >
                      Australia
                    </span>.
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
          src="/img/publication-pages/${this.editionUid}-book.jpg"
          alt="Cover art for ${this.editionDetail[0].translated_name.replace('Collection', '')}"
        />
        <figcaption>
          Paperback edition of ${this.editionDetail[0].translated_name.replace('Collection', '')}
        </figcaption>
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
        <td>
          ${icon.paperback}
          <span>
            <span>Paperback</span>
            <small>Order individual volumes</small>
          </span>
        </td>
        <td>
          ${this.editionPaperbackInfo?.edition?.volumes
            ? html` ${this.editionPaperbackInfo.edition.volumes.map(
                vol =>
                  html` <a class="link-button" href=${vol.volume_lulu_url} class="external"
                    >${icon.external}
                    ${vol.volume_number
                      ? `Buy Volume ${vol.volume_number.slice(3)} online`
                      : 'Print on demand'}
                  </a>`
              )}`
            : ''}
        </td>
      </tr>
    `;
  }

  #epubDownloadTemplate() {
    return html`
      <tr>
        <td>${icon.epub} <span>Epub</span></td>
        <td>
          <a class="link-button" href=${this.#computeFileUrlByType('epub')} class="download">
            ${icon.file_download} Download
          </a>
        </td>
      </tr>
    `;
  }

  #pdfDownloadTemplate() {
    return html`
      <tr>
        <td>${icon.pdf} <span>Pdf</span></td>
        <td>
          <a class="link-button" href=${this.#computeFileUrlByType('pdf')} class="download">
            ${icon.file_download} Download
          </a>
        </td>
      </tr>
    `;
  }

  #rawHtmlDownloadTemplate() {
    return html`
      <tr>
        <td>
          ${icon.html}
          <span>
            <span>HTML</span>
            <small>(right click → save)</small>
          </span>
        </td>
        <td>
          <a class="link-button" href=${this.#computeFileUrlByType('html')} class="download">
            ${icon.file_download} <span class="button-text"><span>Download</span> </span>
          </a>
        </td>
      </tr>
    `;
  }

  #rawTexDownloadTemplate() {
    return html`
      <tr>
        <td>${icon.latex} <span>TeX</span></td>
        <td>
          <a class="link-button" href=${this.#computeFileUrlByType('tex')} class="download">
            ${icon.file_download} Download
          </a>
        </td>
      </tr>
    `;
  }

  readOnSuttaCentralTemplate() {
    return html`
      <tr>
        <td>${icon.web} <span>Web</span></td>
        <td>
          <a class="link-button internal" href=${ifDefined(collectionURL.get(this.editionUid))}>
            ${icon.translation} <span class="button-text"><span>Read on SuttaCentral</span></span>
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
                Get this book in any of these formats
              </caption>
              <tbody>
                ${this.#printOnDemandTemplate()} ${this.#epubDownloadTemplate()}
                ${this.#pdfDownloadTemplate()} ${this.#rawHtmlDownloadTemplate()}
                ${this.#rawTexDownloadTemplate()} ${this.readOnSuttaCentralTemplate()}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2">Updated ${publicationLastGeneratedDate}</td>
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
