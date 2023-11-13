import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
        border-radius: var(--sc-mid-border-radius);
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
    this.localizedStringsPath = '/localization/elements/interface';
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
          <h2>${this.localize('publication:title')}</h2>

          <section class="text-metadata" about=${this.sourceURL}>
            <p>${this.localize('publication:titleDescription')}</p>
            <dl class="main-details">
              <dt class="translation-title">${this.localize('publication:translationTitle')}</dt>
              <dd class="translation-title" property="dc:title">${this.translationTitle}</dd>
              <dt class="translation-subtitle">${this.localize('publication:translationSubTitle')}</dt>
              <dd class="translation-subtitle" property="dc:title">${this.translationSubtitle}</dd>
              ${this.authorName
                ? html`
                    <dt class="author-name">${this.localize('publication:translator')}</dt>
                    <dd class="author-name" property="dc:creator">${this.authorName}</dd>
                  `
                : ''}
              ${this.collaborator
                ? html`
                    <dt class="author-name">${this.localize('publication:translator')}</dt>
                    <dd class="author-name" property="dc:creator">${this.collaborator}</dd>
                  `
                : ''}
            </dl>
            <dl class="translation-details">
              <dt class="root-title">${this.localize('publication:rootTitle')}</dt>
              <dd class="root-title" property="dc:title">${this.rootTitle}</dd>
              <dt class="translation-language">${this.localize('publication:translationLanguage')}</dt>
              <dd class="translation-language" property="dc:language">
                ${this.translationLanguage}
              </dd>
              <dt class="root-language">${this.localize('publication:rootLanguage')}</dt>
              <dd class="root-language">${this.rootLanguage}</dd>
            </dl>
            <dl class="descriptive-details">
              <dt class="translation-description">${this.localize('publication:translationDescription')}</dt>
              <dd class="translation-description" property="dc:description">
                ${this.translationDescription}
              </dd>
              <dt class="translation-process">${this.localize('publication:translationProcess')}</dt>
              <dd class="translation-process" property="dc:description">
                ${this.translationProcess}
              </dd>
              <dt class="publication-status">${this.localize('publication:publicationStatus')}</dt>
              <dd class="publication-status">${this.publicationStatus}</dd>
            </dl>
            <dl class="edition">
              <dt class="edition-number">${this.localize('publication:edition')}</dt>
              <dd class="edition-number">${this.editionNumber}</dd>
              <dt class="publication-date">${this.localize('publication:publicationDate')}</dt>
              <dd class="publication-date" property="dc:date">${this.publicationDate}</dd>
              <dt class="publisher">${this.localize('publication:publisher')}</dt>
              <dd class="publisher" property="dc:publisher">${this.publisher}</dd>
              <dt class="publication-type">${this.localize('publication:publicationType')}</dt>
              <dd class="publication-type" property="dc:format">${this.publicationType}</dd>
              <dt class="number-of_volumes">${this.localize('publication:numberOfVolumes')}</dt>
              <dd class="number-of_volumes">${this.numberOfVolumes}</dd>
            </dl>
            <dl class="metadata-details">
              <dt class="text-uid">${this.localize('publication:textUid')}</dt>
              <dd class="text-uid" property="dc:identifier">${this.textUID}</dd>
              <dt class="edition-url">URL</dt>
              <dd class="edition-url">
                <a href=${this.editionURL} target="_blank" rel="noopener">${this.editionURL}</a>
              </dd>
              <dt class="source-url">${this.localize('publication:source')}</dt>
              <dd class="source-url">
                <a href=${this.sourceURL} target="_blank" rel="noopener">${this.sourceURL}</a>
              </dd>
              <dt class="publication-number">${this.localize('publication:suttaCentralPublicationNumber')}</dt>
              <dd class="publication-number" property="dc:identifier">${this.publicationNumber}</dd>
            </dl>
          </section>
          <section class="license">
            <h3>${this.localize('publication:license')}</h3>
            <p class="license-type" property="dc:rights">
              ${this.licenseType} (
              <span class="license-abbreviation">${this.licenseAbbreviation}</span>
              )
            </p>
            <p class="creative-commons">
              <a
                class="block-link"
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
              ${unsafeHTML(this.localizeEx('publication:licenseDescription', 'authorName', this.authorName, 'translationTitle', this.translationTitle))}
            </p>
            <h3>${this.localize('publication:aboutThisLicense')}</h3>
            <p class="license-statement">${this.licenseStatement}</p>
          </section>
        </section>
      `;
  }
}

customElements.define('sc-top-sheet-publication-bilara', SCTopSheetPublicationBilara);
