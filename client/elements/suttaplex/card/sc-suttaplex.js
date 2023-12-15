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

export class SCSuttaplex extends LitLocalized(LitElement) {
  static properties = {
    suttaplexListStyle: { type: String },
    item: { type: Object },
    localizedStringsPath: { type: String },
    difficulty: { type: String },
    expansionData: { type: Array },
    parallelsOpened: { type: Boolean },
    translationsOpened: { type: Boolean },
    rootTextsOpened: { type: Boolean },
    compactToggle: { type: Boolean },
    hasVoice: { type: Boolean },
    isPatimokkha: { type: Boolean },
    isPatimokkhaDetails: { type: Boolean },
    isSuttaInRangeSutta: { type: Boolean },
    inRangeSuttaId: { type: String },
    priorityAuthorUid: { type: String },
    isFallenLeaf: { type: Boolean },
  };

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

  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('item')) {
      this._fetchAvailableVoice();
    }
  }

  orderTranslationsByTranslator(translations) {
    if (this.priorityAuthorUid) {
      const priorityTranslationItemIndex = translations.findIndex(
        item =>
          item.author_uid === this.priorityAuthorUid ||
          this.priorityAuthorUid.includes(item.author_uid)
      );
      translations.unshift(translations.splice(priorityTranslationItemIndex, 1)[0]);
    }
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('item') || changedProperties.has('language')) {
      const translations = (this.item || {}).translations || [];
      const lang = this.language;
      this._translationsInUserLanguage = translations.filter(item => item.lang === lang);
      this.orderTranslationsByTranslator(this._translationsInUserLanguage);
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
    if (this.isSuttaInRangeSutta) {
      return (
        this.item.title ||
        this.item.translated_title ||
        this.item.original_title ||
        this.acronymOrUid
      );
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
    if (this.item?.acronym) {
      const altNumber = this.item.acronym.split('//')[1];
      if (altNumber) {
        const book = altNumber[0] === 'T' ? 'Taishō' : 'PTS';
        scAcronymTitle += `\n${this.localize(
          'suttaplex:alternateText',
          'book',
          book
        )} ${altNumber}`;
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
      ? this.localize('suttaplex:volumeAndPagePTS1', this.item.volpages)
      : this.localize('suttaplex:volumeAndPage');
  }

  get isCompact() {
    return this.suttaplexListStyle === 'compact' && !this.compactToggle;
  }

  get listenUrl() {
    return `${SUTTACENTRAL_VOICE_URL}scv/#/?search=${this.item.uid}&lang=${this.language}`;
  }

  static styles = [suttaplexCss];

  render() {
    if (!this.item?.uid) {
      return '';
    }

    return html`
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
          ${this.isSuttaInRangeSutta ? '' : this.nerdyRowTemplate}
        </div>
        ${this.#blurbTemplate()}
        ${this.#shouldShowUserLangTranslations() ? this.userLanguageTranslationsTemplate : ''}
        ${!this.isCompact
          ? html`
              ${this.rootTextsTemplate}
              ${this.modernLanguageTranslationsTemplate}
              ${this.parallelsTemplate}
            `
          : ''}
        ${this.isCompact && this.isFallenLeaf ? this.parallelsTemplate : ''}
      </article>
    `;
  }

  #blurbTemplate() {
    return !this.isCompact
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
      : '';
  }

  #isFallenLeafRangeSutta(uid, hasFallenLeaves) {
    const lastDash = uid.lastIndexOf('-');
    if (lastDash !== -1) {
      const lastDashLeft = uid.substring(lastDash - 1, lastDash);
      const lastDashRight = uid.substring(lastDash + 1, lastDash + 2);
      const isLastDashDigits = !isNaN(lastDashLeft) && !isNaN(lastDashRight);
      if (hasFallenLeaves && isLastDashDigits) {
        return true;
      }
    }
    return false;
  }

  #shouldShowUserLangTranslations() {
    return (
      !this.isPatimokkhaDetails && !this.isFallenLeaf
    );
  }

  #shouldShowRootTexts() {
    return !this.isPatimokkhaDetails && !this.isFallenLeaf && this.rootTexts.length > 0;
  }

  #shouldShowModernLangTranslations() {
    return (
      !this.isPatimokkhaDetails &&
      !this.isFallenLeaf &&
      this.translationsInModernLanguages.length > 0
    );
  }

  #shouldHideParallels() {
    return (
      (this.isPatimokkha && !this.isPatimokkhaDetails) ||
      this.isSuttaInRangeSutta ||
      this.#isFallenLeafRangeSutta(this.item.uid, this.item.hasFallenLeaves)
    );
  }

  get topRowIconsTemplate() {
    return html`
      <div class="top-row-icons">
        ${this.difficulty
          ? html`
              <span class="difficulty_icon" title=${this.localize(`suttaplex:${this.difficulty}`)}>
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
                title=${this.localize('suttaplex:listenSutta')}
                aria-label=${this.localize('suttaplex:listenSutta')}
                rel="noopener noreferrer"
              >
                ${icon.speaker}
              </a>
            `
          : ''}

        <details id="copy-menu" class="top-menu-button" title=${this.localize('suttaplex:shareThisSutta')}>
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
        ${this.#nerdyRowOriginalTitleTemplate()} ${this.#nerdyRowAcronymTemplate()}
        ${this.#nerdyRowVolpageTemplate()} ${this.#nerdyRowVerseTemplate()}
      </div>
    `;
  }

  #nerdyRowOriginalTitleTemplate() {
    return (
      this.item.translated_title &&
      this.item.original_title &&
      html`
        <span title=${this.localize('suttaplex:originalTitle')} class="nerdy-row-element subTitle">
          ${this.item.original_title}
        </span>
      `
    );
  }

  #nerdyRowAcronymTemplate() {
    return (
      (this.item.translated_title || this.item.original_title) &&
      html`<span title=${this.acronymTitle} class="nerdy-row-element">${this.acronymOrUid}</span>`
    );
  }

  #nerdyRowVolpageTemplate() {
    return (
      this.item.volpages &&
      html`
        ${this.item.biblio ? '' : this.volPageTemplate}
        ${this.item.biblio &&
        html`
          <details class="suttaplex-details">
            <summary>${this.volPageTemplate}</summary>
            <p class="volpage-biblio-info" .innerHTML=${this.item.biblio}></p>
          </details>
        `}
      `
    );
  }

  #nerdyRowVerseTemplate() {
    return html`
      <span title=${this.item.verseNo} class="nerdy-row-element">${this.item.verseNo}</span>
    `;
  }

  get userLanguageTranslationsTemplate() {
    const userLangTransCount = this.translationsInUserLanguage.length;
    const translationKey = userLangTransCount === 1 ? 'translationIn' : 'translationsIn';
    return html`
      <div class="section-details main-translations">
        ${!this.isCompact
          ? html`
              <details>
                <summary>
                  <h3>
                    <b>
                      ${this.localize(`suttaplex:${translationKey}`, {
                        lang: this.fullSiteLanguageName,
                      })}
                    </b>
                    ${this.localize('suttaplex:inYourLanguage')}
                    ${userLangTransCount === 0 ? html`<b>(${userLangTransCount})</b>` : ''}
                  </h3>
                </summary>
                <ul>
                  <li>
                    <b>${this.localize(`suttaplex:aligned`)}</b> ${this.localize(`suttaplex:alignedDescription`)}
                    <br /><small
                      ><i
                        >${this.localize(`suttaplex:alignedOperationGuide`)}</i
                      ></small
                    >
                  </li>
                  <li>
                    <b>${this.localize(`suttaplex:annotated`)}</b> ${this.localize(`suttaplex:annotatedDescription`)}
                    <br /><small
                      ><i
                        >${this.localize(`suttaplex:annotatedOperationGuide`)}</i
                      ></small
                    >
                  </li>
                  <li>
                    <b>${this.localize(`suttaplex:legacy`)}</b> ${this.localize(`suttaplex:legacyDescription`)}
                  </li>
                </ul>
              </details>
            `
          : ''}
        <div>
          ${this.translationsInUserLanguage.map(
            translation => html`
              <sc-suttaplex-tx
                .item=${this.item}
                .translation=${translation}
                .isCompact=${this.isCompact}
                .isSuttaInRangeSutta=${this.isSuttaInRangeSutta}
                .inRangeSuttaId=${this.inRangeSuttaId}
              ></sc-suttaplex-tx>
            `
          )}
        </div>
      </div>
    `;
  }


  get rootTextsTemplate() {
    if (!this.#shouldShowRootTexts()) {
      return '';
    }
    const translationKey = this.rootTexts.length === 1 ? 'edition' : 'editions';
    return html`
      <div class="section-details">
        ${!this.isCompact
          ? html`
              <h3>
                <b>${this.localize(`suttaplex:${translationKey}`)}</b>
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
    if (!this.#shouldShowModernLangTranslations()) {
      return '';
    }
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
            <b> ${this.localize(`suttaplex:${translationKey}`)}</b>
            ${this.localize('suttaplex:inModernLanguages')}
            <b>(${this.translationsInModernLanguages.length})</b>
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
    if (!this.#shouldHideParallels()) {
      return '';
    }
    const translationKey = this.item.parallel_count === 1 ? 'countParallel' : 'countParallels';
    return html`
      <details
        class="section-details"
        ?open=${this.parallelsOpened}
        @toggle=${e => (this.parallelsOpened = e.target.open)}
      >
        <summary>
          <h3>
            <b>${this.localize(`suttaplex:${translationKey}`, { count: '' })}</b>
            ${this.localize('suttaplex:inAncientTexts')}
            <b>(${this.item.parallel_count})</b>
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
        ${this.item.parallel_count
          ? ''
          : html` <h3>${this.localize('suttaplex:hasNoParallels')}</h3> `}
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
    this.hasVoice = false;
    const voiceApi = `${API_ROOT}/available_voices/${this.item?.uid}`;
    const availableVoice = fetch(voiceApi).then(r => r.json());
    const voices = await availableVoice;
    if (voices?.length > 0) {
      for (const voice of Object.keys(voices[0].voices)) {
        const voiceInfo = voice.split('/');
        if (!voiceInfo.includes('root') && !voiceInfo.includes('vinaya')) {
          this.hasVoice = voice.split('/').includes(this.language);
          if (this.hasVoice) {
            break;
          }
        }
      }
    }
  }
}

customElements.define('sc-suttaplex', SCSuttaplex);
