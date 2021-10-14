/* eslint-disable indent */
import { html, LitElement } from 'lit';
import { API_ROOT, SUTTACENTRAL_VOICE_URL } from '../../../constants';
import { icon } from '../../../img/sc-icon';
import {
  transformId,
  pickVolPage,
  hasTwoPTSEditions,
  formatVolPages,
} from '../../../utils/suttaplex';
import { LitLocalized } from '../../addons/sc-localization-mixin';
import '../../menus/sc-menu-suttaplex-share';
import './sc-parallel-list';
import { suttaplexCss } from './sc-suttaplex-css';
import './sc-suttaplex-tx';

let expansionDataCache;

// eslint-disable-next-line import/prefer-default-export
export class SCSuttaplex extends LitLocalized(LitElement) {
  static get properties() {
    return {
      suttaplexListStyle: String,
      item: Object,
      localizedStringsPath: String,
      difficulty: String,
      expansionData: Array,
      parallelsOpened: Boolean,
      translationsOpened: Boolean,
      rootTextsOpened: Boolean,
      compactToggle: Boolean,
      hasVoice: Boolean,
      isPatimokkha: Boolean,
      isPatimokkhaDetails: Boolean,
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.hasVoice = false;
  }

  connectedCallback() {
    super.connectedCallback();

    this._fetchExpansionData();
    this._fetchAvailableVoice();

    setTimeout(() => {
      const copyMenu = this.shadowRoot.querySelector('#copy-menu');
      if (copyMenu) {
        this.addEventListener('par-menu-copied', () => {
          copyMenu.open = '';
        });
      }
    }, 1000);
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('item') || changedProperties.has('language')) {
      const translations = (this.item || {}).translations || [];
      const lang = this.language;
      this._translationsInUserLanguage = translations.filter(item => item.lang === lang);
      this.translationsInModernLanguages = translations.filter(
        item => !item.is_root && item.lang !== lang
      );
      this.rootTexts = translations.filter(item => item.is_root);
      this.hasSegmentedTexts = translations.filter(item => item.segmented).length > 0;
    }

    return super.shouldUpdate();
  }

  toggleCompact() {
    this.compactToggle = !this.compactToggle;
  }

  get translationsInUserLanguage() {
    return this.isCompact
      ? this._translationsInUserLanguage.slice(0, 1)
      : this._translationsInUserLanguage;
  }

  get difficultyLevelIconName() {
    return icon[this.difficulty];
  }

  get areParallelsAvailable() {
    return this.item.parallel_count && this.parallelsOpened;
  }

  get mainHeading() {
    if (!this.item) {
      return '';
    }
    return this.item.translated_title || this.item.original_title || this.acronymOrUid;
  }

  get mainHeadingTitle() {
    if (!this.item || this.item.translated_title || this.item.original_title) {
      return '';
    }
    return this.acronymTitle;
  }

  get acronymOrUid() {
    if (this.item.acronym) {
      return this.item.acronym.split('//')[0];
    }
    return transformId(this.item.uid, this.expansionData);
  }

  get acronymTitle() {
    let scAcronymTitle = this.localize('suttaplex:suttaCentralID');
    if (this.item && this.item.acronym) {
      const altNumber = this.item.acronym.split('//')[1];
      if (altNumber) {
        const book = altNumber[0] === 'T' ? 'Taishō' : 'PTS';
        scAcronymTitle += `\n${this.localize('parallel:alternateText', 'book', book)} ${altNumber}`;
      }
    }
    return scAcronymTitle;
  }

  get rootLangText() {
    return this.item.translations.find(translation => translation.lang === this.item.root_lang);
  }

  get volPage() {
    return pickVolPage(this.item.volpages);
  }

  get briefVolPage() {
    const volpages = this.item.volpages.split(',');
    if (this.item.volpages && volpages.length > 1) {
      const volPagesEnd = formatVolPages(volpages[volpages.length - 1]);
      return `${volpages[0]}–${volPagesEnd.trim()}`;
    }
    return this.item.volpages;
  }

  get altVolPage() {
    if (this.item.alt_volpages === this.item.volpages) {
      return '';
    }
    return pickVolPage(this.item.alt_volpages);
  }

  get briefAltVolPage() {
    const volpages = this.item.alt_volpages.split(',');
    if (this.item.alt_volpages && volpages.length > 1) {
      const volPagesEnd = formatVolPages(volpages[volpages.length - 1]);
      return `${volpages[0]}–${volPagesEnd.trim()}`;
    }
    return this.item.alt_volpages;
  }

  get volPageTitle() {
    return hasTwoPTSEditions(this.item.volpages)
      ? this.localize('parallel:volumeAndPagePTS1', this.item.volpages)
      : this.localize('suttaplex:volumeAndPage');
  }

  get isCompact() {
    return this.suttaplexListStyle === 'compact' && !this.compactToggle;
  }

  get listenUrl() {
    return `${SUTTACENTRAL_VOICE_URL}scv/#/?search=${this.item.uid}&lang=${this.language}`;
  }

  render() {
    if (!this.item || !this.item.uid) {
      return '';
    }

    return html`
      ${suttaplexCss}

      <article class="suttaplex ${this.suttaplexListStyle}" id=${this.item.uid}>
        <div>
          <div class="top-row">
            <h1
              class=${this.suttaplexListStyle}
              title=${this.mainHeadingTitle}
              @click=${this.toggleCompact}
            >
              ${this.mainHeading}
            </h1>

            ${this.topRowIconsTemplate}
          </div>

          ${this.nerdyRowTemplate}
        </div>

        ${!this.isCompact
          ? html`
              ${this.item.blurb &&
              html`
                <div
                  class="blurb"
                  title=${this.localize('suttaplex:blurb')}
                  .innerHTML=${this.item.blurb}
                ></div>
              `}
            `
          : ''}
        ${!this.isPatimokkhaDetails ? this.userLanguageTranslationsTemplate : ''}
        ${!this.isCompact
          ? html`
              ${!this.isPatimokkhaDetails ? this.rootTextsTemplate : ''}
              ${!this.isPatimokkhaDetails ? this.modernLanguageTranslationsTemplate : ''}
              ${this.isPatimokkha && !this.isPatimokkhaDetails ? '' : this.parallelsTemplate}
            `
          : ''}
      </article>
    `;
  }

  get topRowIconsTemplate() {
    return html`
      <div class="top-row-icons">
        ${this.difficulty
          ? html`
              <span class="difficulty_icon" title=${this.localize(this.difficulty)}>
                ${this.difficultyLevelIconName}
              </span>
            `
          : ''}
        ${this.hasSegmentedTexts && this.hasVoice
          ? html`
              <a
                class="top-menu-button"
                href=${this.listenUrl}
                target="_blank"
                title="Listen to this sutta"
                aria-label=${this.localize('suttaplex:listenSutta')}
                rel="noopener noreferrer"
              >
                ${icon.speaker}
              </a>
            `
          : ''}

        <details id="copy-menu" class="top-menu-button" title="Share this sutta">
          <summary class="ripple">${icon.share}</summary>
          <ul class="suttaplex-share-menu-list">
            <sc-menu-suttaplex-share
              id="suttaplex_share_menu"
              tabIndex="0"
              .item=${this.item}
            ></sc-menu-suttaplex-share>
          </ul>
        </details>
      </div>
    `;
  }

  get volPageTemplate() {
    return html`
      <span class="vol-page nerdy-row-element" title=${this.volPageTitle}>
        ${icon.book}
        <span class="visible">${this.briefVolPage}</span>
        <span class="hidden" aria-hidden="true">${this.volPage}</span>
      </span>
      ${this.altVolPage && this.altVolPage !== this.volPage
        ? html`
            <span class="vol-page nerdy-row-element" title=${this.volPageTitle}>
              ${icon.book}
              <span class="visible">${this.briefAltVolPage}</span>
              <span class="hidden" aria-hidden="true">${this.altVolPage}</span>
            </span>
          `
        : ''}
    `;
  }

  get nerdyRowTemplate() {
    return html`
      <div class="suttaplex-nerdy-row">
        ${this.item.translated_title &&
        this.item.original_title &&
        html`
          <span title=${this.localize('parallel:originalTitle')} class="nerdy-row-element subTitle">
            ${this.item.original_title}
          </span>
        `}
        ${(this.item.translated_title || this.item.original_title) &&
        html`
          <span title=${this.acronymTitle} class="nerdy-row-element">${this.acronymOrUid}</span>
        `}
        ${this.item.volpages &&
        html`
          ${!this.item.biblio ? this.volPageTemplate : ''}
          ${this.item.biblio &&
          html`
            <details class="suttaplex-details">
              <summary>${this.volPageTemplate}</summary>
              <p class="volpage-biblio-info" .innerHTML=${this.item.biblio}></p>
            </details>
          `}
        `}
      </div>
    `;
  }

  get userLanguageTranslationsTemplate() {
    const translationKey =
      this.translationsInUserLanguage.length === 1 ? 'translationIn' : 'translationsIn';
    return html`
      <div class="section-details main-translations">
        ${!this.isCompact
          ? html`
              <h3>
                <b>
                  ${this.translationsInUserLanguage.length}
                  ${this.localize(translationKey, { lang: this.fullSiteLanguageName })}
                </b>
                ${this.localize('suttaplex:inYourLanguage')}
              </h3>
            `
          : ''}
        <div>
          ${this.translationsInUserLanguage.map(
            translation => html`
              <sc-suttaplex-tx
                .item=${this.item}
                .translation=${translation}
                .isCompact=${this.isCompact}
              ></sc-suttaplex-tx>
            `
          )}
        </div>
      </div>
    `;
  }

  get rootTextsTemplate() {
    const translationKey = this.rootTexts.length === 1 ? 'edition' : 'editions';
    return html`
      <div class="section-details">
        ${!this.isCompact
          ? html`
              <h3>
                <b>${this.rootTexts.length} ${this.localize(translationKey)}</b>
                ${this.localize('suttaplex:ofRootText')}
              </h3>
            `
          : ''}
        <div>
          ${this.rootTexts.map(
            translation => html`
              <sc-suttaplex-tx
                .item=${this.item}
                .translation=${translation}
                .isRoot=${true}
              ></sc-suttaplex-tx>
            `
          )}
        </div>
      </div>
    `;
  }

  get modernLanguageTranslationsTemplate() {
    const translationKey =
      this.translationsInModernLanguages.length === 1 ? 'translation' : 'translations';

    return html`
      <details
        class="section-details"
        ?open=${this.translationsOpened}
        @toggle=${e => (this.translationsOpened = e.target.open)}
      >
        <summary>
          <h3>
            <b>${this.translationsInModernLanguages.length} ${this.localize(translationKey)}</b>
            ${this.localize('suttaplex:inModernLanguages')}
          </h3>
        </summary>
        ${this.translationsOpened
          ? this.translationsInModernLanguages.map(
              translation => html`
                <sc-suttaplex-tx .item=${this.item} .translation=${translation}></sc-suttaplex-tx>
              `
            )
          : ''}
      </details>
    `;
  }

  get parallelsTemplate() {
    const translationKey = this.item.parallel_count === 1 ? 'countParallel' : 'countParallels';

    return html`
      <details
        class="section-details"
        ?open=${this.parallelsOpened}
        @toggle=${e => (this.parallelsOpened = e.target.open)}
      >
        <summary>
          <h3>
            <b>${this.localize(translationKey, { count: this.item.parallel_count })}</b>
            ${this.localize('suttaplex:inAncientTexts')}
          </h3>
        </summary>

        ${this.areParallelsAvailable
          ? html`
              <sc-parallel-list
                .rootLang=${this.item.root_lang}
                .itemUid=${this.item.uid}
                .rootText=${this.rootLangText}
                .expansionData=${this.expansionData}
              ></sc-parallel-list>
            `
          : ''}
        ${!this.item.parallel_count
          ? html` <h3>${this.localize('suttaplex:hasNoParallels')}</h3> `
          : ''}
      </details>
    `;
  }

  async _fetchExpansionData() {
    if (this.expansionData) {
      return;
    }
    if (!expansionDataCache) {
      expansionDataCache = fetch(`${API_ROOT}/expansion`).then(r => r.json());
    }

    this.expansionData = await expansionDataCache;
  }

  async _fetchAvailableVoice() {
    if (!this.item?.uid) {
      return;
    }
    const voiceApi = `${API_ROOT}/available_voices/${this.item?.uid}`;
    const availableVoice = fetch(voiceApi).then(r => r.json());
    const voices = await availableVoice;
    if (voices?.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const voice of Object.keys(voices[0].voices)) {
        const voiceInfo = voice.split('/');
        if (!voiceInfo.includes('root') && !voiceInfo.includes('vinaya')) {
          this.hasVoice = voice.split('/').includes(this.language);
        }
      }
    }
  }
}

customElements.define('sc-suttaplex', SCSuttaplex);
