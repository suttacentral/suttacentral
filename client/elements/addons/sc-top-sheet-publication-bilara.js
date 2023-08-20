import { LitElement, html, css } from 'lit';
import { API_ROOT } from '../../constants';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import SCTopSheetCommon from './sc-top-sheet-common';
import { store } from '../../redux-store';

export class SCTopSheetPublicationBilara extends SCTopSheetCommon {
  static properties = {
    translationTitle: { type: String },
    translationSubtitle: { type: String },
    translationLanguage: { type: String },
    rootTitle: { type: String },
    rootLanguage: { type: String },
    authorName: { type: String },
    collaborator: { type: Object },
    translationDescription: { type: String },
    translationProcess: { type: String },
    textUID: { type: String },
    sourceURL: { type: String },
    publicationStatus: { type: String },
    publicationNumber: { type: Number },
    editionNumber: { type: Number },
    publicationDate: { type: String },
    publisher: { type: String },
    editionURL: { type: String },
    publicationType: { type: String },
    numberOfVolumes: { type: String },
    licenseType: { type: String },
    licenseAbbreviation: { type: String },
    licenseStatement: { type: String },
    authorUID: { type: String },
    isPublished: { type: Boolean },
    publicationInfo: { type: Object },
  };

  static styles = [
    super.styles,
    typographyCommonStyles,
    css`
      section > section {
        font-family: var(--sc-sans-font);

        margin: 0;
        padding: 0;
      }

      dl {
        margin: 1em 0;
        padding: 0 1rem 1rem 1rem;

        border: var(--sc-border);
        border-radius: 8px;
      }

      .main-details,
      .translation-details,
      .edition {
        display: grid;

        grid-template-columns: 1fr 3fr;
        align-items: baseline;
        gap: 0 1em;
      }

      dt {
        font-weight: 600;
        font-style: italic;

        color: var(--sc-on-primary-secondary-text-color);
      }

      dd {
        margin-left: 0;
      }

      dd.translation-title {
        font-weight: 800;
      }

      dd.translation-subtitle {
        font-weight: 600;
      }

      dd.author-name {
        font-variant-caps: small-caps;
      }

      dd.edition-url,
      dd.source-url,
      dd.publication-number {
        font-family: mono;
        font-size: var(--sc-font-size-s);
      }

      .number-of_volumes,
      .text-uid {
        display: none;
      }

      .license {
        padding: 0 1rem 1rem 1rem;

        color: var(--sc-on-primary-secondary-text-color);
        border: var(--sc-border);
        border-radius: 16px;
        background: var(--sc-tertiary-background-color);
      }

      .license-type {
        font-weight: 700;
      }

      dd a {
        overflow-wrap: break-word;
      }

      a img {
        display: block;

        margin: 0 0 0.75em 0;
      }

      [property='vcard:Country'] {
        font-weight: 700;
      }
    `,
  ];

  constructor() {
    super();
    this.isPublished = false;
    this.lang = store.getState().siteLanguage;
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.publicationData !== state.suttaPublicationInfo) {
      this.publicationData = state.suttaPublicationInfo;
      if (this.publicationData !== null && this.publicationData.uid !== null) {
        this.textUID = this.publicationData.uid;
        this.lang = this.publicationData.lang;
        this.authorUID = this.publicationData.authorUid;
        this.fetchPublications();
      }
    }
  }

  get actions() {
    return {
      changeSuttaPublicationInfo(publicationInfo) {
        store.dispatch({
          type: 'CHANGE_SUTTA_PUBLICATION_INFO',
          suttaPublicationInfo: publicationInfo,
        });
      },
    };
  }

  fetchPublications() {
    if (!this.textUID || !this.lang || !this.authorUID) {
      this.actions.changeSuttaPublicationInfo(null);
      return;
    }
    fetch(`${API_ROOT}/publication_info/${this.textUID}/${this.lang}/${this.authorUID}`)
      .then(r => r.json())
      .then(data => this.setPublicationInfo(data[0]))
      .catch(e => console.error(e));
  }

  setPublicationInfo(data) {
    if (data && data.is_published === true) {
      this.isPublished = true;
      this.translationTitle = data.translation_title;
      this.translationSubtitle = data.translation_subtitle;
      this.translationLanguage = data.translation_lang_name;
      this.rootTitle = data.root_title;
      this.rootLanguage = data.root_lang_name;
      this.authorName = data.author_name;
      this.collaborator = data.collaborator?.map(author => author.author_name)?.join(', ');
      this.translationDescription = data.translation_description;
      this.translationProcess = data.translation_process;
      this.sourceURL = data.source_url;
      this.publicationStatus = data.publication_status;
      this.publicationNumber = data.publication_number;
      this.editionNumber = this.getEditionAttribute(data, 'edition_number');
      this.publicationDate = this.getEditionAttribute(data, 'publication_date');
      this.publisher = this.getEditionAttribute(data, 'publisher');
      this.editionURL = this.getEditionAttribute(data, 'edition_url');
      this.publicationType = this.getEditionAttribute(data, 'publication_type');
      this.numberOfVolumes = data.number_of_volumes;
      this.licenseType = this.getLicenseAttribute(data, 'license_type');
      this.licenseAbbreviation = this.getLicenseAttribute(data, 'license_abbreviation');
      this.licenseStatement = this.getLicenseAttribute(data, 'license_statement');
    }
  }

  getEditionAttribute({ edition }, attribute) {
    return Array.isArray(edition) && edition[0] ? edition[0][attribute] : '';
  }

  getLicenseAttribute({ license }, attribute) {
    return license ? license[attribute] : '';
  }

  render() {
    if (this.isPublished)
      return html`
        <section>
          <h2>Publication details</h2>

          <section class="text-metadata" about=${this.sourceURL}>
            <p>This text is included in the following publication.</p>
            <dl class="main-details">
              <dt class="translation-title">Translation title</dt>
              <dd class="translation-title" property="dc:title">${this.translationTitle}</dd>
              <dt class="translation-subtitle">Translation subtitle</dt>
              <dd class="translation-subtitle" property="dc:title">${this.translationSubtitle}</dd>
              ${this.authorName
                ? html`
                    <dt class="author-name">Translator</dt>
                    <dd class="author-name" property="dc:creator">${this.authorName}</dd>
                  `
                : ''}
              ${this.collaborator
                ? html`
                    <dt class="author-name">Translator</dt>
                    <dd class="author-name" property="dc:creator">${this.collaborator}</dd>
                  `
                : ''}
            </dl>
            <dl class="translation-details">
              <dt class="root-title">Root title</dt>
              <dd class="root-title" property="dc:title">${this.rootTitle}</dd>
              <dt class="translation-language">Translation language</dt>
              <dd class="translation-language" property="dc:language">
                ${this.translationLanguage}
              </dd>
              <dt class="root-language">Root language</dt>
              <dd class="root-language">${this.rootLanguage}</dd>
            </dl>
            <dl class="descriptive-details">
              <dt class="translation-description">Translation description</dt>
              <dd class="translation-description" property="dc:description">
                ${this.translationDescription}
              </dd>
              <dt class="translation-process">Translation process</dt>
              <dd class="translation-process" property="dc:description">
                ${this.translationProcess}
              </dd>
              <dt class="publication-status">Publication status</dt>
              <dd class="publication-status">${this.publicationStatus}</dd>
            </dl>
            <dl class="edition">
              <dt class="edition-number">Edition</dt>
              <dd class="edition-number">${this.editionNumber}</dd>
              <dt class="publication-date">Publication date</dt>
              <dd class="publication-date" property="dc:date">${this.publicationDate}</dd>
              <dt class="publisher">Publisher</dt>
              <dd class="publisher" property="dc:publisher">${this.publisher}</dd>
              <dt class="publication-type">Publication type</dt>
              <dd class="publication-type" property="dc:format">${this.publicationType}</dd>
              <dt class="number-of_volumes">Number of volumes</dt>
              <dd class="number-of_volumes">${this.numberOfVolumes}</dd>
            </dl>
            <dl class="metadata-details">
              <dt class="text-uid">Text identifier (UID)</dt>
              <dd class="text-uid" property="dc:identifier">${this.textUID}</dd>
              <dt class="edition-url">URL</dt>
              <dd class="edition-url">
                <a href=${this.editionURL} target="_blank" rel="noopener">${this.editionURL}</a>
              </dd>
              <dt class="source-url">Source</dt>
              <dd class="source-url">
                <a href=${this.sourceURL} target="_blank" rel="noopener">${this.sourceURL}</a>
              </dd>
              <dt class="publication-number">SuttaCentral publication number</dt>
              <dd class="publication-number" property="dc:identifier">${this.publicationNumber}</dd>
            </dl>
          </section>
          <section class="license">
            <h3>License</h3>
            <p class="license-type" property="dc:rights">
              ${this.licenseType} (
              <span class="license-abbreviation">${this.licenseAbbreviation}</span>
              )
            </p>
            <p class="creative-commons">
              <a
                rel="license"
                href="https://creativecommons.org/publicdomain/zero/1.0/legalcode"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="https://i.creativecommons.org/p/zero/1.0/88x31.png"
                  style="border-style: none;"
                  alt="CC0"
                />
              </a>
              To the extent possible under law,
              <a rel="dct:publisher" href="https://suttacentral.net/">
                <span property="dct:title">${this.authorName}</span>
              </a>
              has waived all copyright and related or neighboring rights to
              <cite property="dct:title">${this.translationTitle}</cite>. This work is published
              from
              <span
                property="vcard:Country"
                datatype="dct:ISO3166"
                content="AU"
                about="https://suttacentral.net/licensing"
              >
                Australia </span
              >.
            </p>
            <h3>About this license</h3>
            <p class="license-statement">${this.licenseStatement}</p>
          </section>
        </section>
      `;
  }
}

customElements.define('sc-top-sheet-publication-bilara', SCTopSheetPublicationBilara);
