import { html, css, LitElement, svg } from 'lit-element';
import { API_ROOT, SUTTACENTRAL_VOICE_URL } from '../../../constants';
import { icon } from '../../../img/sc-icon';
import {
  transformId,
  pickVolPage,
  hasTwoPTSEditions
} from '../../../utils/suttaplex';
import { LitLocalized } from '../../addons/localization-mixin';
import '../../menus/sc-suttaplex-share-menu.js';
import './sc-parallel-list.js';
import { suttaplexCss } from './sc-suttaplex-css';
import './sc-suttaplex-tx.js';

let expansionDataCache;

class SCSuttaplex extends LitLocalized(LitElement) {
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
    }
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-suttaplex';
  }

  connectedCallback() {
    super.connectedCallback();

    this._fetchExpansionData();

    setTimeout(() => {
      const copyMenu = this.shadowRoot.querySelector('#copy-menu');
      if (copyMenu) {
        this.addEventListener('par-menu-copied', () => {
          copyMenuOpened = false;
        });

        copyMenu.addEventListener('opened-changed', (e) => {
          const open = e.detail.value;
          if (open) {
            this.shadowRoot.querySelector('#suttaplex_share_menu')._sendRequest();
          }
        })
      }
    }, 1000);
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('item') || changedProperties.has('language')) {
      const translations = (this.item || {}).translations || [];
      const lang = this.language;
      this._translationsInUserLanguage = translations.filter(item => item.lang === lang);
      this.translationsInModernLanguages = translations.filter(item => !item.is_root && item.lang !== lang);
      this.rootTexts = translations.filter(item => item.is_root);
      this.hasSegmentedTexts = translations.filter(item => item.segmented).length > 0;
    }

    return super.shouldUpdate();
  }

  toggleCompact() {
    this.compactToggle = !this.compactToggle;
  }

  get translationsInUserLanguage() {
    return this.isCompact ? this._translationsInUserLanguage.slice(0, 1) : this._translationsInUserLanguage
  }

  get difficultyLevelIconName() {
    return `icon.${this.difficulty}`;
  }

  get areParallelsAvailable() {
    return this.item.parallel_count && this.parallelsOpened;
  }

  get mainHeading() {
    if (!this.item) {
      return '';
    }

    if (this.item.translated_title) {
      return this.item.translated_title;
    } else if (this.item.original_title) {
      return this.item.original_title;
    } else {
      return this.acronymOrUid;
    }
  }

  get mainHeadingTitle() {
    if (!this.item || this.item.translated_title || this.item.original_title) {
      return '';
    } else {
      return this.acronymTitle;
    }
  }

  get acronymOrUid() {
    if (this.item.acronym) {
      return this.item.acronym.split('//')[0];
    } else {
      return transformId(this.item.uid, this.expansionData);
    }
  }

  get acronymTitle() {
    let scAcronymTitle = this.localize('suttaCentralID');
    if (this.item && this.item.acronym) {
      const altNumber = this.item.acronym.split('//')[1];
      if (altNumber) {
        const book = (altNumber[0] === 'T') ? 'Taishō' : 'PTS';
        scAcronymTitle += `\n${this.localize('alternateText', 'book', book)} ${altNumber}`;
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

  get volPageTitle() {
    return hasTwoPTSEditions(this.item.volpages) ?
      this.localize('volumeAndPagePTS1', this.item.volpages) :
      this.localize('volumeAndPage');
  }

  revealHiddenNerdyRowContent() {
    const detailsElement = this.shadowRoot.querySelector('.volpage-biblio-info');
    const nerdyRow = this.shadowRoot.querySelector('.suttaplex-nerdy-row');
    const popup = this.shadowRoot.querySelector('#hidden-nerdy-row');
    const widthReduction = 16;

    if (nerdyRow.clientWidth < nerdyRow.scrollWidth) {
      popup.classList.toggle("show");
      popup.style.width = nerdyRow.clientWidth - widthReduction;
      popup.style.marginLeft = `-${nerdyRow.scrollWidth}px`;
      if (detailsElement) {
        detailsElement.style.display = 'none';
      }
    } else if (detailsElement) {
      detailsElement.style.display = null;
    }
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
      
      <article class="suttaplex ${this.suttaplexListStyle}" id="${this.item.uid}">
        <div>
          <div class="top-row">
            <h1 class="${this.suttaplexListStyle}" title="${this.mainHeadingTitle}" @click="${this.toggleCompact}">
              ${this.mainHeading}
            </h1>
    
            ${this.topRowIconsTemplate}
          </div>
    
          ${this.nerdyRowTemplate}
        </div>

        ${!this.isCompact ? html`
          ${this.item.blurb && html`<div class="blurb" title="${this.localize('blurb')}" .innerHTML="${this.item.blurb}"/>`}
        ` : ''}

        ${this.userLanguageTranslationsTemplate}

        ${!this.isCompact ? html`
          ${this.rootTextsTemplate}
          ${this.modernLanguageTranslationsTemplate}
          ${this.parallelsTemplate}
        ` : ''}
      </article>`;
  }

  get topRowIconsTemplate() {
    return html`
      <div class="top-row-icons">
        ${this.difficulty ? html` 
          <span title="${this.localize(this.difficulty)}">${this.difficultyLevelIconName}</span>
        ` : ''}

      ${this.hasSegmentedTexts ? html`
        <a class="top-menu-button"
        href="${this.listenUrl}" 
        target="_blank"
        title="Listen to this sutta"  
        aria-label="${this.localize('listenSutta')}"
        rel="noopener noreferrer">
          ${icon.speaker}             
        </a>
      ` : ''}

      <details 
      id="copy-menu" 
      class="top-menu-button"
      title="Share this sutta">
        <summary class="ripple">
        ${icon.share}
  </summary>
        <ul class="suttaplex-share-menu-list">
          <sc-suttaplex-share-menu id="suttaplex_share_menu" tabindex="0" .item="${this.item}"></sc-suttaplex-share-menu>
        </ul>
      </details>
      </div>`;
  }

  get nerdyRowTemplate() {
    return html`
      <div class="suttaplex-nerdy-row" @tap="${this.revealHiddenNerdyRowContent}">
        ${this.item.translated_title && this.item.original_title && html`
          <span title="${this.localize('originalTitle')}" class="nerdy-row-element subTitle">
            ${this.item.original_title}
          </span>
        `}

        ${(this.item.translated_title || this.item.original_title) && html`
          <span title="${this.acronymTitle}" class="nerdy-row-element">${this.acronymOrUid}</span>
        `}

        ${this.item.volpages && html`
          ${!this.item.biblio ? html`
            
            <span class="vol-page nerdy-row-element" title="${this.volPageTitle}">
            ${icon.book}
              ${this.volPage}
            </span>
          ` : ''}

          ${this.item.biblio && html`
            <details class="suttaplex-details">
              <summary>
                
                <span class="vol-page nerdy-row-element" title="${this.volPageTitle}">
                ${icon.book}
                  ${this.volPage}
                </span>
              </summary>
              <p class="volpage-biblio-info" .innerHTML="${this.item.biblio}"></p>
            </details>
          `}
        `}

        <span class="popuptext" id="hidden-nerdy-row">
          ${this.item.translated_title && this.item.original_title && html`
            <span title="${this.localize('originalTitle')}" class="nerdy-row-element">
              ${this.item.original_title}<br>
            </span>
          `}
          ${(this.item.translated_title || this.item.original_title) && html`
            <span title="${this.acronymTitle}" class="nerdy-row-element">
              ${this.acronymOrUid}<br>
            </span>
          `}

          ${this.item.volpages && html`
            <span class="book no-margin">
              ${icon.book}
            </span>
            <span class="vol-page nerdy-row-element" title="${this.volPageTitle}">
              ${this.volPage}
            </span>
          `}
        </span>
      </div>`;
  }

  get userLanguageTranslationsTemplate() {
    const translationKey = this.translationsInUserLanguage.length === 1 ? 'translationIn' : 'translationsIn';
    return html`
      <div class="section-details main-translations">
        ${!this.isCompact ? html`<h3>
            <b>
               ${this.translationsInUserLanguage.length} ${this.localize(translationKey, { lang: this.fullSiteLanguageName })}
            </b>${this.localize('inYourLanguage')}
          </h3>
        ` : ''}
        <div>
          ${this.translationsInUserLanguage.map((translation) => html`
            <sc-suttaplex-tx .item="${this.item}" .translation="${translation}" .isCompact="${this.isCompact}"></sc-suttaplex-tx>
          `)}
        </div>
      </div>
    `;
  }

  get rootTextsTemplate() {
    const translationKey = this.rootTexts.length === 1 ? 'edition' : 'editions';
    return html`
      <div class="section-details">
        ${!this.isCompact ? html`<h3>
            <b>
               ${this.rootTexts.length} ${this.localize(translationKey)}
            </b>${this.localize('ofRootText')}
          </h3>
        ` : ''}
        <div>
          ${this.rootTexts.map((translation) => html`
             <sc-suttaplex-tx .item="${this.item}" .translation="${translation}"></sc-suttaplex-tx>
          `)}
        </div>
      </div>
    `;
  }

    get modernLanguageTranslationsTemplate() {
    const translationKey = this.translationsInModernLanguages.length === 1 ? 'translation' : 'translations';

    return html`
      <details 
        class="section-details"
        ?open="${this.translationsOpened}"
        @toggle="${(e) => this.translationsOpened = e.target.open}"
      >
        <summary>
          <h3>
            <b>${this.translationsInModernLanguages.length} ${this.localize(translationKey)}</b>
            ${this.localize('inModernLanguages')}
          </h3>
        </summary>
        ${this.translationsOpened ? this.translationsInModernLanguages.map((translation) => html`
          <sc-suttaplex-tx .item="${this.item}" .translation="${translation}"></sc-suttaplex-tx>
        `) : ''}
      </details>
    `;
  }

  get parallelsTemplate() {
    const translationKey = this.item.parallel_count === 1 ? 'countParallel' : 'countParallels';

    return html`
      <details
        class="section-details" 
        ?open="${this.parallelsOpened}"
        @toggle="${(e) => this.parallelsOpened = e.target.open}"
      >
        <summary>
          <h3>
            <b>${this.localize(translationKey, { count: this.item.parallel_count })}</b> 
            ${this.localize('inAncientTexts')}
          </h3>
        </summary>
        
        ${this.areParallelsAvailable ? html`
          <sc-parallel-list 
            .rootLang="${this.item.root_lang}" 
            .itemUid="${this.item.uid}" 
            .rootText="${this.rootLangText}" 
            .expansionData="${this.expansionData}"
          >
          </sc-parallel-list>
        ` : ''}
        
        ${!this.item.parallel_count ? html`<h3>${this.localize('hasNoParallels')}</h3>` : ''}
        </template>
      </details>
    `;
  }

  async _fetchExpansionData() {
    if (!expansionDataCache) {
      expansionDataCache = fetch(`${API_ROOT}/expansion`).then((r) => r.json());
    }

    this.expansionData = await expansionDataCache;
  }
}

customElements.define('sc-suttaplex', SCSuttaplex);
