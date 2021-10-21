/* eslint-disable indent */
import { html, LitElement } from 'lit';
import { icon } from '../../../img/sc-icon';
import {
  getParagraphRange,
  transformId,
  pickVolPage,
  hasTwoPTSEditions,
  formatVolPages,
} from '../../../utils/suttaplex';
import { LitLocalized } from '../../addons/sc-localization-mixin';
import { parallelItemCss } from './sc-suttaplex-css';

const stopPropagation = e => e.stopPropagation();

class SCParallelItem extends LitLocalized(LitElement) {
  static get properties() {
    return {
      parallelItem: Object,
      remark: String,
      rootLangMappings: Object,
      localizedStringsPath: String,
      expansionData: Array,
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.rootLangMappings = {
      pli: 'Pali',
      lzh: 'Chinese',
      san: 'Sanskrit',
      xct: 'Tibetan',
      pra: 'Prakrit',
      pgd: 'Gandhari',
      uig: 'Uighur',
      xto: 'TocharianA',
      kho: 'Khotanese',
    };
  }

  get heading() {
    const uidLanguage = this.parallelItem?.uid?.substring(0, 3);
    if (Object.keys(this.rootLangMappings).includes(uidLanguage)) {
      return transformId(this.parallelItem.to, this.expansionData, 1);
    } else if (this.parallelItem.translated_title) {
      return this.parallelItem.translated_title;
    } else if (this.parallelItem.original_title) {
      return this.parallelItem.original_title;
    } else {
      return this.acronymOrUid;
    }
  }

  get headingTitle() {
    if (
      !this.parallelItem ||
      this.parallelItem.translated_title ||
      this.parallelItem.original_title
    ) {
      return '';
    } else {
      return this.acronymTitle;
    }
  }

  get titleWithoutSuttaText() {
    return this.parallelItem.original_title.replace(' Sutta', '');
  }

  get parallelUrl() {
    const translation = this.parallelItem.translations[0];

    if (translation) {
      return (
        `/${this.parallelItem.uid}/${translation.lang}` +
        `/${translation.author_uid}${getParagraphRange(this.parallelItem.to, true)}`
      );
    } else {
      return '';
    }
  }

  get volpagesAvailable() {
    return !!this.parallelItem.volpages;
  }

  get acronymTitle() {
    let scAcronymTitle = this.localize('suttaplex:suttaCentralID');
    if (this.parallelItem.acronym) {
      const altNumber = this.parallelItem.acronym.split('//')[1];
      if (altNumber) {
        let book = '';
        altNumber[0] === 'T' ? (book = 'Taishō') : (book = 'PTS');
        scAcronymTitle += `\n${this.localize('suttaplex:alternateText', 'book', book)} ${altNumber}`;
      }
    }
    return scAcronymTitle;
  }

  get acronymOrUid() {
    let scAcronym = '';
    if (this.parallelItem.acronym) {
      scAcronym = this.parallelItem.acronym.split('//')[0];
      const rootId = this.parallelItem.to.replace('~', '');
      const idPart = getParagraphRange(rootId)
        .replace('--', '–')
        .replace('#', ': ')
        .replace(/[a-z]+/g, '');
      return `${scAcronym}${idPart}`;
    } else {
      scAcronym = transformId(this.parallelItem.to, this.expansionData, 0);
    }
    return scAcronym;
  }

  get volPage() {
    return pickVolPage(this.parallelItem.volpages);
  }

  get briefVolPage() {
    const volpages = this.parallelItem.volpages.split(',');
    if (this.parallelItem.volpages && volpages.length > 1) {
      const volPagesEnd = formatVolPages(volpages[volpages.length - 1]);
      return `${volpages[0]}–${volPagesEnd.trim()}`;
    }
    return this.parallelItem.volpages;
  }

  get altVolPage() {
    return pickVolPage(this.parallelItem.alt_volpages);
  }

  get briefAltVolPage() {
    const volpages = this.parallelItem.alt_volpages.split(',');
    if (this.parallelItem.alt_volpages && volpages.length > 1) {
      const volPagesEnd = formatVolPages(volpages[volpages.length - 1]);
      return `${volpages[0]}–${volPagesEnd.trim()}`;
    }
    return this.parallelItem.alt_volpages;
  }

  get volPageTitle() {
    return hasTwoPTSEditions(this.parallelItem.volpages)
      ? this.localize('suttaplex:volumeAndPagePTS1', this.parallelItem.volpages)
      : this.localize('suttaplex:volumeAndPage');
  }

  get volPageTemplate() {
    return html`
      <span class="volPage-row" title="${this.localize('suttaplex:volumeAndPage')}">
        ${icon.book}
        <span class="vol-page"> ${this.briefVolPage} </span>
      </span>
      ${this.altVolPage && this.altVolPage !== this.volPage
        ? html`
            <span class="volPage-row" title="${this.localize('suttaplex:volumeAndPage')}">
              ${icon.book}
              <span class="vol-page"> ${this.briefAltVolPage} </span>
            </span>
          `
        : ''}
    `;
  }

  normalViewTemplate() {
    return html`
      <a href="${this.parallelUrl}" class="${this.parallelUrl ? '' : 'disabled'}">
        <div class="parallel-item">
          <div class="parallel-item-main-info-container">
            <div class="parallel-item-title" title="${this.headingTitle}">${this.heading}</div>

            <div class="parallel-item-nerdy-row">
              ${this.parallelItem.translated_title && this.parallelItem.original_title
                ? html`
                    <div
                      title="${this.localize('suttaplex:originalTitle')}"
                      class="nerdy-row-element"
                    >
                      ${this.titleWithoutSuttaText}
                    </div>
                  `
                : ''}
              ${this.parallelItem.translated_title || this.parallelItem.original_title
                ? html`
                    <div class="nerdy-row-element" title="${this.acronymTitle}">
                      ${this.acronymOrUid}
                    </div>
                  `
                : ''}
              ${this.volpagesAvailable
                ? html`
                    <div
                      class="nerdy-row-element"
                      @click=${stopPropagation}
                      @tap="${stopPropagation}"
                      @mousedown="${stopPropagation}"
                    >
                      ${this.parallelItem.biblio &&
                      html`
                        <details>
                          <summary>${this.volPageTemplate}</summary>
                          <p
                            class="parallel-item-biblio-info"
                            .innerHTML="${this.parallelItem.biblio}"
                          ></p>
                        </details>
                      `}
                      ${!this.parallelItem.biblio ? this.volPageTemplate : ''}
                    </div>
                  `
                : ''}
              ${this.remark &&
              html`
                <div "nerdy-row-element" @click=${stopPropagation} @tap="${stopPropagation}" @mousedown="${stopPropagation}">
                  <details>
                    <summary>
                      ${icon.info}
                    </summary>
                    <p class="parallel-item-biblio-info" .innerHTML="${this.remark}"></p>
                  </details>
                </div>
              `}
            </div>
            ${this.parallelItem.note &&
            html`
              <div "nerdy-row-element" @click=${stopPropagation} @tap="${stopPropagation}" @mousedown="${stopPropagation}">
                <details>
                  <summary>
                    ${icon.info}
                  </summary>
                  <p class="parallel-item-biblio-info" .innerHTML="${this.parallelItem.not}"></p>
                </details>
              </div>
            `}
          </div>
        </div>
      </a>
    `;
  }

  render() {
    return html` ${parallelItemCss} ${this.normalViewTemplate()} `;
  }
}

customElements.define('sc-parallel-item', SCParallelItem);
