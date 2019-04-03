import { html, LitElement } from '@polymer/lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import { getParagraphRange, transformId } from '../../../utils/suttaplex';
import { LitLocalized } from '../../addons/localization-mixin';
import { parallelItemCss } from './sc-suttaplex-css';

const stopPropagation = (e) => e.stopPropagation();

class SCParallelItem extends LitLocalized(LitElement) {
  static get properties() {
    return {
      parallelItem: Object,
      remark: String,
      rootLangMappings: Object,
      localizedStringsPath: String,
      expansionData: Array
    }
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-parallel-item';
    this.rootLangMappings = {
      'pli': 'Pali',
      'lzh': 'Chinese',
      'san': 'Sanskrit',
      'xct': 'Tibetan',
      'pra': 'Prakrit',
      'pgd': 'Gandhari',
      'uig': 'Uighur',
      'xto': 'TocharianA',
      'kho': 'Khotanese'
    };
  }

  get heading() {
    const uidLanguage = this.parallelItem.uid.substring(0, 3);
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
    if (!this.parallelItem || this.parallelItem.translated_title || this.parallelItem.original_title) {
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
      return `/${this.parallelItem.uid}/${translation.lang}` +
        `/${translation.author_uid}${getParagraphRange(this.parallelItem.to, true)}`;
    } else {
      return '';
    }
  }

  get volpagesAvailable() {
    return !!this.parallelItem.volpages;
  }

  get acronymTitle() {
    let scAcronymTitle = this.localize('suttaCentralID');
    if (this.parallelItem.acronym) {
      const altNumber = this.parallelItem.acronym.split('//')[1];
      if (altNumber) {
        let book = '';
        (altNumber[0] === 'T') ? book = 'Taishō' : book = 'PTS';
        scAcronymTitle += `\n${this.localize('alternateText', 'book', book)} ${altNumber}`;
      }
    }
    return scAcronymTitle;
  }

  get acronymOrUid() {
    let scAcronym = '';
    if (this.parallelItem.acronym) {
      scAcronym = this.parallelItem.acronym.split('//')[0];
      const rootId = this.parallelItem.to.replace('~', '');
      const idPart = getParagraphRange(rootId).replace('--', '–').replace('#', ': ').replace(/[a-z]+/g,'');
      return `${scAcronym}${idPart}`;
    } else {
      scAcronym = transformId(this.parallelItem.to, this.expansionData, 0);
    }
    return scAcronym;
  }

  get volPage() {
    let volPages;
    if (this.parallelItem.volpages) {
      volPages = this.parallelItem.volpages.split('//');
    }
    return (volPages && volPages[1]) ? volPages[1] : this.parallelItem.volpages;
  }

  get volPageTitle() {
    if (!this.parallelItem.volpages) {
      return;
    }

    const volPages = this.parallelItem.volpages.split('//');
    if (volPages[1] && (volPages[0] !== volPages[1])) {
      return this.localize('volumeAndPagePTS1', 'pts1', volPages[0], 'pts2', volPages[1]);
    } else {
      return this.localize('volumeAndPage');
    }
  }

  render() {
    return html`
    ${parallelItemCss}

    <a href="${this.parallelUrl}" class="${this.parallelUrl ? '' : 'disabled'}">
      <paper-ripple></paper-ripple>
      <div class="parallel-item d-flex justify-content-space-between">
        <div class="parallel-item-main-info-container">
          <div class="parallel-item-title vertical-margin-xs" title="${this.headingTitle}">
            ${this.heading}
          </div>
  
          <div class="parallel-item-details d-flex align-items-center vertical-margin-xs">
            <div class="parallel-item-volpages-container">
              ${this.parallelItem.translated_title && this.parallelItem.original_title ? html`
                <div title="${this.localize('originalTitle')}" class="nerdy-row-element">
                  ${this.titleWithoutSuttaText}
                </div>
              ` : ''}

              ${this.parallelItem.translated_title || this.parallelItem.original_title ? html`
                <div class="nerdy-row-element" title="${this.acronymTitle}">
                  ${this.acronymOrUid}
                </div>
              ` : ''}

              ${this.volpagesAvailable ? html`
                <div class="nerdy-row-summary" @click=${stopPropagation} @tap="${stopPropagation}" @mousedown="${stopPropagation}">
                  ${this.parallelItem.biblio && html`
                    <details>
                      <summary>
                        <iron-icon icon="sc-iron-icons:book"></iron-icon>
                        <span class="vol-page" title="${this.volPageTitle}">
                          ${this.volPage}
                        </span>
                      </summary>
                      <p class="parallel-item-biblio-info" .innerHTML="${this.parallelItem.biblio}"></p>
                    </details>
                  `}
                  ${!this.parallelItem.biblio ? html`
                    <span class="book scrollable-dialog" title="${this.localize('volumeAndPage')}">
                      <iron-icon icon="sc-iron-icons:book"></iron-icon>
                    </span>
                    <span class="vol-page" title="${this.volPageTitle}">
                      ${this.volPage}
                    </span>
                  ` : ''}
                </div>
              ` : ''}
              ${this.remark && html`
                <div @click=${stopPropagation} @tap="${stopPropagation}" @mousedown="${stopPropagation}">
                  <details>
                    <summary>
                      <iron-icon class="icon-outline" icon="sc-iron-icons:info-outline"></iron-icon>
                    </summary>
                    <p class="parallel-item-biblio-info" .innerHTML="${this.remark}"></p>
                  </details>
                </div>
              `}
            </div>
            ${this.parallelItem.note && html`
              <div @click=${stopPropagation} @tap="${stopPropagation}" @mousedown="${stopPropagation}">
                <details>
                  <summary>
                    <iron-icon class="icon-outline" icon="sc-iron-icons:info-outline"></iron-icon>
                  </summary>
                  <p class="parallel-item-biblio-info" .innerHTML="${this.parallelItem.not}"></p>
                </details>
              </div>
            `}
          </div>
        </div>
      </div>
    </a>`;
  }
}

customElements.define('sc-parallel-item', SCParallelItem);
