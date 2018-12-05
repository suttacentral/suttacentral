import { ReduxMixin } from '/redux-store.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/paper-toast/paper-toast.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import '../../img/sc-svg-icons.js';
import { Localized } from '../addons/localization-mixin.js';
import '../addons/sc-badge.js';
import '../addons/sc-collapsible.js';
import '../addons/sc-sutta-note.js';
import '../menus/sc-suttaplex-share-menu.js';
import { suttaplexStyles } from '../styles/sc-suttaplex-styles.js';
import './sc-parallel-list.js';


class SCSuttaplex extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
      ${suttaplexStyles}
      <style>
        :host {
          --paper-card-background-color: var(--sc-secondary-background-color);
        }

        .menu-listbox {
            --paper-input-container-focus-color: var(--sc-primary-accent-color);
            --paper-input-container-color: var(--sc-secondary-text-color);
            --paper-input-container-input-color: var(--sc-secondary-text-color);
            --paper-dropdown-menu-icon_-_color: var(--sc-disabled-text-color);
            background-color: var(--sc-secondary-background-color);
        }

        h1 {
          @apply --paper-font-headline;
          @apply --sc-serif-font;
          @apply --sc-skolar-font-size-xl;
          margin: 0;
        }
      
        h2 {
          @apply --paper-font-headline;
          @apply --sc-sans-font;
          color: var(--sc-secondary-text-color);
        }
        
        a {
          color: inherit;
          text-decoration: inherit;
        }
      
        .hide-element {
          display: none;
        }
      
        .suttaplex {
          display: block;
          padding: var(--sc-size-md);
          margin-bottom: var(--sc-size-md);
        }
      
        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          --iron-icon-height: 20px;
          --iron-icon-width: 20px;
        }
      
        .tx-level-icon {
          --iron-icon-height: 24px;
          --iron-icon-width: 24px;
          margin: 0 var(--sc-size-sm);
        }
      
        .sc-tooltip {
          --paper-tooltip-opacity: 0.98;
          --paper-tooltip-background: var(--sc-paper-tooltip-color);
          --paper-tooltip-text-color: var(--sc-paper-tooltip-text-color);
          --paper-tooltip: {
            @apply --sc-skolar-font-size-xs;
            white-space: nowrap;
            line-height: var(--sc-size-md);
            padding: var(--sc-size-sm) var(--sc-size-md);
            text-shadow: 0 0 var(--sc-secondary-background-color);
            max-width: 100% !important;
          };
        }
      
        .top-menu-button {
          padding: 0;
          --paper-menu-button-dropdown: {
            @apply --shadow-elevation-8dp;
          };
        }
      
        .top-menu-button .btn-share, .top-menu-button .btn-speaker {
          align-self: flex-end;
          width: var(--sc-size-lg);
          height: var(--sc-size-lg);
        }
      
        .btn-speaker {
          --paper-icon-button: {
            padding: 5px;
          }
        }
      
        .btn-share {
          --paper-icon-button: {
            padding: 7px;
          }
        }
       
        .suttaplex-nerdy-row {
          @apply --paper-font-body2;
          color: var(--sc-secondary-text-color);
          font-weight: normal;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-top: -4px;
        }
      
        .popuptext {
          overflow: visible;
          display: none;
        }

        .popuptext.show {
           display: unset;
        }
        
        .nerdy-row-element {
          margin-right: var(--sc-size-md-larger);
        }
      
        .nerdy-vol-page:before {
          content: "📕";
          margin-right: 4px;
        }
      
        .volpage-biblio-info, .suttaplex-nerdy-row .popuptext {
          @apply --paper-font-body1;
          position: absolute;
          z-index: 200;
          background-color: var(--sc-tertiary-background-color);
          padding: 12px;
          border-top: var(--sc-border);
          margin: 0 var(--sc-size-xl) 0 0;
          box-shadow: var(--paper-material-elevation-2_-_box-shadow);
          white-space: normal;
        }
      
        .suttaplex-details {
          display: inline-block;
        }
      
        .blurb {
          margin: var(--sc-size-sm) 0;
        }
      
        .tx {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          cursor: pointer;
          padding: 0 var(--sc-size-sm);
          margin: var(--sc-size-sm) 0;
          border-radius: var(--sc-size-sm);
        }
      
        .tx:first-child {
          margin-top: 0;
        }
      
        .tx:last-child {
          margin-bottom: 0;
        }
      
        .tx:after {
          content: "➔";
          font-size: 32px;
          color: white;
          margin-left: auto
        }
      
        .tx,
        .tx:hover,
        .tx:active {
          transition: all 0.2s ease;
        }
      
        .primary-accent-icon {
          color: var(--sc-primary-accent-color);
          stroke: var(--sc-primary-accent-color);
        }
      
        .sc-primary-color:hover {
          background-color: var(--sc-primary-color-light);
        }
      
        .sc-primary-color paper-ripple {
          color: var(--sc-primary-color-medium);
        }
      
        a {
          position: relative;
          overflow: hidden;
        }
      
        .sc-primary-accent-color:hover {
          background-color: var(--sc-tertiary-color-light);
        }
      
        .sc-primary-accent-color paper-ripple  {
          color: var(--sc-tertiary-color-medium);
        }
      
        .tx-icon {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          --iron-icon-width: 18px;
          --iron-icon-height: 18px;
        }
      
        .sc-primary-color .tx-icon {
          --iron-icon-fill-color: var(--sc-primary-color);
          border: 2px solid var(--sc-primary-color);
        }
      
        .sc-primary-accent-color .tx-icon {
          --iron-icon-fill-color: var(--sc-tertiary-color-dark);
          border: 2px solid var(--sc-tertiary-color-dark);
        }
      
        .tx-details {
          padding: var(--sc-size-sm) var(--sc-size-md);
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: baseline
        }
      
        .tx-creator {
          @apply --sc-serif-font;
          margin-right: var(--sc-size-md);
        }
      
        .tx-publication {
          color: var(--sc-secondary-text-color);
          @apply --sc-skolar-font-size-s;
        }
      
        .section-details h3 {
          height: 23px;
          margin: var(--sc-size-sm) 0;
          @apply --sc-skolar-font-size-md;
          font-weight: normal;
          font-style: italic;
          color: var(--sc-secondary-text-color);
          display: inline-block;
        }
        
        .top-row-icons {
          align-items: center;
          display: flex;
        }

        #more_par_menu {
          outline: none;
        }
      </style>
      
      <template is="dom-if" if="[[item.uid]]">
        <paper-card class$="suttaplex [[suttaplexListStyle]]" id="[[item.uid]]" elevation="1">
          <div class="compact">
            <div class="top-row">
              <h1 title="[[_getMainHeadingTitle(item, localize)]]">
                [[_computeMainHeading(item)]]
              </h1>
      
              <div class="top-row-icons">
                <iron-icon id="difficulty-icon" class="tx-level-icon primary-accent-icon"
                           icon="[[_computeDifficultyLevelIconName(item.difficulty)]]"></iron-icon>
                <paper-tooltip for="difficulty-icon" offset="0" fit-to-visible-bounds="" class="sc-tooltip">
                  {{localize(difficulty)}}
                </paper-tooltip>
      
                <paper-menu-button class="top-menu-button" horizontal-align="right" role="group" aria-haspopup="true"
                                   aria-disabled="false" vertical-align="auto" title="Listen to this sutta">
                  <paper-icon-button class="btn-speaker grey-icon" slot="dropdown-trigger"
                                     icon="icons:sc-svg-icons:speaker" role="button" tabindex="0" aria-disabled="false">
                  </paper-icon-button>
                </paper-menu-button>
      
                <paper-menu-button id="copy_menu" class="top-menu-button" horizontal-align="right" role="group"
                                   aria-haspopup="true" aria-disabled="false" vertical-align="auto">
                  <paper-icon-button class="btn-share grey-icon" slot="dropdown-trigger"
                                     icon="icons:sc-svg-icons:share" role="button" tabindex="0" aria-disabled="false">
                  </paper-icon-button>
      
                  <paper-listbox class="more-par-listbox menu-listbox" slot="dropdown-content" tabindex="0" role="listbox">
                    <sc-suttaplex-share-menu id="more_par_menu" tabindex="0" item="[[item]]"></sc-suttaplex-share-menu>
                  </paper-listbox>
                </paper-menu-button>
              </div>
            </div>
      
            <div class="suttaplex-nerdy-row" on-tap="revealHiddenNerdyRowContent">
              <span title="{{localize('originalTitle')}}" class$="[[_computeHideOriginalTitle(item)]] nerdy-row-element">
                [[item.original_title]]
              </span>
              <span title="[[_get AcronymTitle(item, localize)]]" class$="[[_computeHideUID(item)]] nerdy-row-element">
                [[_getAcronymOrUid(item, expansionData)]]
              </span>
              <template is="dom-if" if="[[item.volpages]]">
                <template is="dom-if" if="[[!item.biblio]]">
                  <span class="book no-margin">
                    <iron-icon class="grey-icon small-icon" icon="book"></iron-icon>
                  </span>
                  <span class="vol-page nerdy-row-element" title="[[_getVolPageTitle(item.volpages, localize)]]">
                    [[_computeVolPage(item.volpages)]]
                  </span>
                </template>

                <template is="dom-if" if="[[item.biblio]]">
                  <span>
                    <sc-collapsible class="suttaplex-details">
                      <span slot="summary">
                        <iron-icon class="grey-icon" icon="book"></iron-icon>
                        <span class="vol-page nerdy-row-element" title="[[_getVolPageTitle(item.volpages, localize)]]">
                          [[_computeVolPage(item.volpages)]]
                        </span>
                      </span>
                      <p class="volpage-biblio-info" inner-h-t-m-l="[[item.biblio]]"></p>
                    </sc-collapsible>
                  </span>
                </template>
              </template>

              <span class="popuptext" id="hidden-nerdy-row">
                <span title="{{localize('originalTitle')}}" class$="[[_computeHideOriginalTitle(item)]] nerdy-row-element">
                  [[item.original_title]]<br>
              </span>
              <span title="[[_getAcronymTitle(item, localize)]]" class$="[[_computeHideUID(item)]] nerdy-row-element">
                [[_getAcronymOrUid(item, expansionData)]]<br>
              </span>
              
              <template is="dom-if" if="[[item.volpages]]">
                <span class="book no-margin">
                  <iron-icon class="grey-icon small-icon" icon="book"></iron-icon>
                </span>
                <span class="vol-page nerdy-row-element" title="[[_getVolPageTitle(item.volpages, localize)]]">
                  [[_computeVolPage(item.volpages)]]
                </span>
              </template>
              </span>
            </div>
          </div>
      
          <div class$="blurb [[_computeHide(item.blurb)]]" title="{{localize('blurb')}}" inner-h-t-m-l="[[item.blurb]]">
          </div>
      
          <template is="dom-if" if="[[translationsInUserLanguage.length]]">
            <div class="section-details main-translations">
              <h3>
                <b>
                   [[translationsInUserLanguage.length]] [[localize('translationsIn', 'lang', userLanguageName)]]
                </b>
              </h3>
              <div>
                <template is="dom-repeat" items="[[translationsInUserLanguage]]" as="translation" restamp="true">
                  <a href="/[[item.uid]]/[[translation.lang]]/[[translation.author_uid]][[_getParagraphRange()]]" class="tx sc-primary-color">
                    <paper-ripple></paper-ripple>
                    <div class="tx-icon">
                      <iron-icon icon="sc-svg-icons:translation"></iron-icon>
                    </div>
                    <div class="tx-details">
                      <span class="tx-creator">{{translation.author}}</span>
                      <span class="tx-publication">{{translation.lang_name}}</span>
                    </div>
                  </a>
                </template>
              </div>
            </div>
          </template>
      
          <template is="dom-if" if="[[translationsInModernLanguages.length]]">
            <sc-collapsible class="section-details">
                <span slot="summary">
                  <h3>
                    <b>[[translationsInModernLanguages.length]] [[localize('moreTranslations')]]</b> 
                    [[localize('inModernLanguages')]]
                  </h3>
                </span>
              <div>
                <template is="dom-repeat" items="[[translationsInModernLanguages]]" as="translation" restamp="true">
                  <a href="/[[item.uid]]/[[translation.lang]]/[[translation.author_uid]][[_getParagraphRange()]]" class="tx sc-primary-color">
                    <paper-ripple></paper-ripple>
                    <div class="tx-icon">
                      <iron-icon icon="sc-svg-icons:translation"></iron-icon>
                    </div>
                    <div class="tx-details">
                        <span class="tx-creator">{{translation.author}}</span>
                        <span class="tx-publication">{{translation.lang_name}}</span>
                    </div>
                  </a>
                </template>
              </div>
            </sc-collapsible>
          </template>
      
      
          <template is="dom-if" if="[[rootTexts.length]]" restamp="true">
            <sc-collapsible class="section-details">
              <span slot="summary">
                <h3><b>{{rootTexts.length}} {{localize('editions')}}</b> {{localize('ofRootText')}}</h3>
              </span>
  
              <div>
                <template is="dom-repeat" items="[[rootTexts]]" as="translation">
                  <a href="/[[item.uid]]/[[translation.lang]]/[[translation.author_uid]][[_getParagraphRange()]]" class="tx sc-primary-accent-color">
                    <paper-ripple></paper-ripple>
                    <div class="tx-icon">
                      <iron-icon icon="sc-svg-icons:translation"></iron-icon>
                    </div>
                    <div class="tx-details">
                        <span class="tx-creator">{{translation.author}}</span>
                        <span class="tx-publication">{{translation.lang_name}}</span>
                    </div>
                  </div>
                </template>
              </div>
            </sc-collapsible>
          </template>

          <sc-collapsible class="section-details" opened="{{parallelsOpened}}">
            <span slot="summary">
              <h3><b>[[localize('countParallels', 'count', item.parallel_count)]]</b> [[localize('inAncientTexts')]]</h3>
            </span>
            <template is="dom-if" if="[[_parallelsAvailable(item, parallelsOpened)]]">
              <sc-parallel-list root-lang="[[item.root_lang]]"
                                item-uid="[[item.uid]]" root-text="[[_getRootText(item.*)]]" expansion-data="[[expansionData]]">
              </sc-parallel-list>
            </template>
            <template is="dom-if" if="[[!item.parallel_count]]">
              <h3>[[localize('hasNoParallels')]]</h3>
            </template>
          </sc-collapsible>
        </paper-card>
      </template>`;
  }

  static get properties() {
    return {
      suttaplexListStyle: {
        type: String
      },
      item: {
        type: Object
      },
      translationsInUserLanguage: {
        type: Array,
        computed: '_getUserLanguageTranslations(item.translations, language)'
      },
      userLanguageName: {
        type: Array,
        computed: '_getUserLanguageName(item.translations, language)'
      },
      translationsInModernLanguages: {
        type: Array,
        computed: '_getOtherLanguageTranslations(item.translations, language)'
      },
      rootTexts: {
        type: Array,
        computed: '_getRootTexts(item.translations)'
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-suttaplex'
      },
      difficulty: {
        type: String
      },
      expansionData: {
        type: Array
      },
      parallelsOpened: {
        type: Boolean
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      const copy_menu = this.shadowRoot.querySelector('#copy_menu');
      if (copy_menu) {
        this.addEventListener('par-menu-copied', () => {
          copy_menu.opened = false;
        });

        copy_menu.addEventListener('opened-changed', (e) => {
          const open = e.detail.value;
          if (open) {
            this.shadowRoot.querySelector('#more_par_menu')._sendRequest();
          }
        })
      }
    }, 1000);
  }

  _computeHide(checkText) {
    return (!checkText) ? 'hide-element' : '';
  }

  _computeHideUID(item) {
    return this._computeHide(item.translated_title || item.original_title);
  }

  _computeHideOriginalTitle(item) {
    return this._computeHide(item.translated_title && item.original_title);
  }

  _computeDifficultyLevelIconName() {
    return `sc-svg-icons:${this.difficulty}`;
  }

  // Computes API endpoint URL for given translation
  _getSuttaTextUrl(uid, lang, author_uid) {
    const url = window.location;
    const baseUrl = url.protocol + '//' + url.host;
    return `${baseUrl}/${uid}/${lang}/${author_uid}`;
  }

  _getUserLanguageName(items, language) {
    return ((items || []).find(item => item.lang === language) || {}).lang_name;
  }

  _getUserLanguageTranslations(items, language) {
    return (items || []).filter(item => item.lang === language);
  }

  _getOtherLanguageTranslations(items, language) {
    return (items || []).filter(item => item.lang.length === 2 && item.lang !== language);
  }

  _getRootTexts(items) {
    return (items || []).filter(item => item.lang.length === 3);
  }

  _parallelsAvailable(item, parallelsOpened) {
    return item.parallel_count && parallelsOpened;
  }

  _computeMainHeading(item) {
    if (!item) {
      return '';
    }
    if (item.translated_title) {
      return item.translated_title;
    } else if (item.original_title) {
      return item.original_title;
    } else {
      return this._getAcronymOrUid(item, this.expansionData);
    }
  }

  _getMainHeadingTitle(item, localize) {
    if (!item || item.translated_title || item.original_title) {
      return '';
    } else {
      return this._getAcronymTitle(item, localize);
    }
  }

  _getAcronymOrUid(item, expansionData) {
    let scAcronym = '';
    if (item.acronym) {
      scAcronym = item.acronym.split('//')[0];
    } else {
      scAcronym = this._transformId(item.uid, expansionData);
    }
    return scAcronym;
  }

  // This function parses the input uid of the parallel
  // It is then split into it's various elements which are then expanded
  // according to the data in the expansion-table.
  // So f.i. 'an3.4' becomes 'AN 3.4' and 'lzh-sarv-bi-vb-np1' becomes
  // 'Lzh Sarv Bi Vb NP 1'
  _transformId(rootId, expansionData) {
    if (!rootId || !expansionData) {
      return '';
    }
    if (rootId.substring(0, 5) === 'g3dhp') {
      const idNumbers = rootId.substring(5);
      return `G-3 Dhp ${idNumbers}`;
    }
    let scAcronym = '';
    const rootPart = rootId.split('#')[0];
    const uidParts = rootPart.split('-');
    let tail = '';
    try {
      uidParts.forEach(item => {
        if (!expansionData[0][item]) {
          const tailMatch = item.match(/\d+.*/g);
          if (tailMatch) tail = tailMatch[0] + '–';
          const itemMatch = item.match(/[a-z]*/g);
          if (itemMatch) item = itemMatch[0];
        }
        if (item && expansionData[0][item]) {
          scAcronym += `${expansionData[0][item][0]} ${tail}`
        } else {
          scAcronym += tail;
        }
      });
      return scAcronym.replace(/–\s*$/, '');
    } catch (e) {
      console.error(e);
      return rootId;
    }
  }

  _getAcronymTitle(item, localize) {
    if (!localize) return;
    let scAcronymTitle = localize('suttaCentralID');
    if (item && item.acronym) {
      const altNumber = item.acronym.split('//')[1];
      if (altNumber) {
        let book = '';
        (altNumber[0] === 'T') ? book = 'Taishō' : book = 'PTS';
        scAcronymTitle += `\n${localize('alternateText', 'book', book)} ${altNumber}`;
      }
    }
    return scAcronymTitle;
  }

  _getRootText() {
    return this.item.translations.find(translation => translation.lang === this.item.root_lang);
  }

  _computeVolPage(volPage) {
    const volPages = volPage.split('//');
    return volPages[1] ? volPages[1] : volPage;
  }

  _getVolPageTitle(volPage, localize) {
    if (!localize) return;
    const volPages = volPage.split('//');
    if (volPages[1] && (volPages[0] !== volPages[1])) {
      return localize('volumeAndPagePTS1', 'pts1', volPages[0], 'pts2', volPages[1]);
    } else {
      return localize('volumeAndPage');
    }
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
}

customElements.define('sc-suttaplex', SCSuttaplex);
