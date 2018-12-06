import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/lib/elements/dom-if.js';

import '../addons/sc-sutta-note.js';
import { ReduxMixin } from '/redux-store.js';
import { Localized } from '../addons/localization-mixin.js';
import { suttaplexStyles } from '../styles/sc-suttaplex-styles.js';


/*
This element loads additional info for each relevant parallel sutta, which is then used in sc-parallel-list.html.
It is in effect a miniature version of the suttaplex-card
*/

class SCParallelItem extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    ${suttaplexStyles}
    <style>
      a {
        color: inherit;
        text-decoration: inherit;
        position: relative;
        display: block;
      }

      .parallel-item-main-info-container {
        width: 100%;
        padding: var(--sc-size-xs) var(--sc-size-sm);
      }

      .parallel-item-title {
        @apply --sc-skolar-font-size-sm;
        @apply --sc-serif-font;
        word-wrap: normal;
      }

      .parallel-item-biblio-info {
        @apply --paper-font-body1;
        @apply --shadow-elevation-3dp;
        border-top: var(--sc-border);
        position: absolute;
        z-index: 200;
        background-color: var(--sc-secondary-background-color);
        padding: 12px;
        margin: 0 var(--sc-size-xl) 0 0;
        white-space: normal;
      }

      .parallel-item-biblio-summary::-webkit-details-marker {
        color: var(--sc-disabled-text-color);
      }

      .parallel-item-details {
        @apply --paper-font-body2;
        color: var(--sc-secondary-text-color);
        overflow: hidden;
      }

      .d-block {
        display: inline-block;
      }

      .scrollable-dialog {
        margin: 0;
      }

      .vertical-margin-xs {
        margin-top: var(--sc-size-xs);
        margin-bottom: var(--sc-size-xs);
      }

      .d-flex {
        display: flex;
      }

      .justify-content-space-between {
        justify-content: space-between;
      }

      .align-items-center {
        align-items: center;
      }

      .parallel-item-volpages-container {
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
      }
      
      .parallel-item-volpages-container > div:not(:last-of-type) {
        margin-right: var(--sc-size-md);
      }

      .parallel-item {
        flex-wrap: wrap;
      }

      .hide-element {
        display: none;
      }

      .nerdy-row-summary {
          overflow: hidden;
      }
      
      paper-ripple {
          color: var(--sc-primary-color-medium);
      }
      
      [hidden] {
        display: none;
      }
    </style>

    <a href="[[_computeParallelUrl()]]">
      <paper-ripple hidden$="[[!_computeParallelUrl()]]"></paper-ripple>
      <div class="parallel-item d-flex justify-content-space-between">
        <div class="parallel-item-main-info-container">
          <div class="parallel-item-title vertical-margin-xs" title="[[_getHeadingTitle(parallelItem, localize)]]">
            [[_computeTitle(parallelItem)]]
          </div>
  
          <div class="parallel-item-details d-flex align-items-center vertical-margin-xs">
            <div class="parallel-item-volpages-container">
              <div title="{{localize('originalTitle')}}" class$="nerdy-row-element [[_computeHideOriginalTitle(parallelItem)]]">
                [[_getTitleWithoutSuttaText(parallelItem.original_title)]]
              </div>
              <div class$="nerdy-row-element [[_computeHideUID(parallelItem)]]" title="[[_getAcronymTitle(parallelItem, localize)]]">
                [[_getAcronymOrUid(parallelItem, expansionData)]]
              </div>
              <template is="dom-if" if="[[_volpagesAvailable()]]">
                <div class="nerdy-row-summary">
                  <template is="dom-if" if="[[parallelItem.biblio]]">
                    <details class="d-block">
                      <summary class="parallel-item-biblio-summary">
                        <span class="book scrollable-dialog">
                          <iron-icon icon="book"></iron-icon>
                        </span>
                        <span class="vol-page" title="[[_getVolPageTitle(parallelItem.volpages, localize)]]">
                          [[_computeVolPage(parallelItem.volpages)]]
                        </span>
                      </summary>
                      <p class="parallel-item-biblio-info" inner-h-t-m-l="[[parallelItem.biblio]]"></p>
                    </details>
                  </template>
                  <template is="dom-if" if="[[!parallelItem.biblio]]">
                    <span class="book scrollable-dialog" title="{{localize('volAndPageNum')}}">
                      <iron-icon icon="book"></iron-icon>
                    </span>
                    <span class="vol-page" title="[[_getVolPageTitle(parallelItem.volpages, localize)]]">
                      [[_computeVolPage(parallelItem.volpages)]]
                    </span>
                  </template>
                </div>
              </template>
              <template is="dom-if" if="[[remark]]">
                <div class="sutta-remark">
                  <sc-sutta-note note-data="[[remark]]"></sc-sutta-note>
                </div>
              </template>
            </div>
  
            <div class="parallel-item-note">
              <template is="dom-if" if="[[parallelItem.note]]">
                <sc-sutta-note note-data="[[parallelItem.note]]"></sc-sutta-note>
              </template>
            </div>
          </div>
        </div>
      </div>
    </a>`;
  }

  static get properties() {
    return {
      // The parallel item to be displayed
      parallelItem: {
        type: Object
      },
      remark: {
        type: String
      },
      rootLangMappings: {
        type: Object,
        value: {
          'pli': 'Pali',
          'lzh': 'Chinese',
          'san': 'Sanskrit',
          'xct': 'Tibetan',
          'pra': 'Prakrit',
          'pgd': 'Gandhari',
          'uig': 'Uighur',
          'xto': 'TocharianA',
          'kho': 'Khotanese'
        }
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-parallel-item'
      },
      expansionData: {
        type: Array
      }
    }
  }

  // returns the relevant header, either the title in the translated language,
  // otherwise in pali or otherwise just the ID.
  _computeTitle(item) {
    const uidLanguage = item.uid.substring(0, 3);
    if (Object.keys(this.rootLangMappings).indexOf(uidLanguage) !== -1) {
      return this._transformId(item.to, this.expansionData, 1);
    } else if (item.translated_title) {
      return item.translated_title;
    } else if (item.original_title) {
      return item.original_title;
    } else {
      return this._getAcronymOrUid(item, this.expansionData);
    }
  }

  _getHeadingTitle(item, localize) {
    if (!item || item.translated_title || item.original_title) {
      return '';
    } else {
      return this._getAcronymTitle(item, localize);
    }
  }

  _computeHideUID(item) {
    return (item.translated_title || item.original_title) ? '' : 'hide-element';
  }

  _computeHideOriginalTitle(item) {
    return item.translated_title && item.original_title ? '' : 'hide-element';
  }

  _getTitleWithoutSuttaText(item) {
    return item.replace(' Sutta', '');
  }

  _computeParallelUrl() {
    const translation = this.parallelItem.translations[0];

    if (translation) {
      return `/${this.parallelItem.uid}/${translation.lang}` +
        `/${translation.author_uid}${this._getParagraphRange(this.parallelItem.uid)}`;
    } else {
      return '';
    }
  }

  _getParagraphRange() {
    if (!this.parallelItem.to) {
      return '';
    }

    const toParallel = this.parallelItem.to;
    if (toParallel.match(/dhp/g)) {
      const ids = toParallel.substring(toParallel.indexOf('dhp') + 3);
      if (ids.includes('-')) {
        const [id1, id2] = ids.split('-');
        return `#${id1}--${id2}`;
      }
      return `#${ids}`;
    } else {
      const ids = toParallel.split(/#(.*)/)[1];
      if (!ids) {
        return '';
      }
      if (ids.includes('-')) {
        const [id1, id2] = ids.split('-#');
        return `#${id1}--${id2}`;
      }
      return `#${ids}`;
    }
  }

  _volpagesAvailable() {
    return !!this.parallelItem.volpages;
  }

  _computeFullLangName(isoCode) {
    return this.rootLangMappings[isoCode];
  }

  _getAcronymTitle(item, localize) {
    let scAcronymTitle = localize('suttaCentralID');
    if (item.acronym) {
      const altNumber = item.acronym.split('//')[1];
      if (altNumber) {
        let book = '';
        (altNumber[0] === 'T') ? book = 'Taishō' : book = 'PTS';
        scAcronymTitle += `\n${localize('alternateText', 'book', book)} ${altNumber}`;
      }
    }
    return scAcronymTitle;
  }

  _getParagraphRange(rootId) {
    const ids = rootId.split(/#(.*)/)[1];
    if (!ids) {
      return '';
    }
    if (ids.includes('-')) {
      const [id1, id2] = ids.split('-#');
      return `#${id1}–${id2}`;
    }
    return `#${ids}`;
  }

  _getAcronymOrUid(item, expansionData) {
    let scAcronym = '';
    if (item.acronym) {
      scAcronym = item.acronym.split('//')[0];
      const rootId = item.to.replace('~', '');
      const idPart = this._getParagraphRange(rootId).replace('-', '–');
      return `${scAcronym}${idPart}`;
    } else {
      scAcronym = this._transformId(item.to, expansionData, 0);
    }
    return scAcronym;
  }

  // This function parses the input uid of the parallel and splits it into
  // it's main document part (rootPart) and the id (paragraphs) within the document (idPart)
  // The rootPart is then split into it's various elements which are then expanded
  // according to the data in the expansion-table.
  // So f.i. 'an3.4#23-#25' becomes 'AN 3.4 #23-25' and 'lzh-sarv-bi-vb-np1' becomes
  // 'Lzh Sarv Bi Vb NP 1'
  _transformId(rootId, expansionData, idOrName) {
    if (!rootId || !expansionData) {
      return '';
    }
    rootId = rootId.replace('~', '');
    if (rootId.substring(0, 5) === 'g3dhp') {
      const idNumbers = rootId.substring(5);
      return `G-3 Dhp ${idNumbers}`;
    }
    const idPart = this._getParagraphRange(rootId).replace('-', '–');
    let scAcronym = '';
    const rootPart = rootId.split('#')[0];
    const uidParts = rootPart.split('-');
    let tail = '';
    uidParts.forEach(item => {
      if (!expansionData[0][item]) {
        const tailMatch = item.match(/\d+.*/g);
        tailMatch ? tail = tailMatch[0] + '–' : tail;
        const itemMatch = item.match(/[a-z]*/g);
        itemMatch ? item = itemMatch[0] : item;
      }
      if (item && expansionData[0][item]) {
        scAcronym += `${expansionData[0][item][idOrName]} ${tail}`
      } else {
        scAcronym += tail;
      }
    });
    scAcronym = scAcronym.replace(/–\s*$/, '');
    return `${scAcronym}${idPart}`;
  }

  _computeVolPage(volPage) {
    let volPages;
    if (volPage) {
      volPages = volPage.split('//');
    }
    return (volPages && volPages[1]) ? volPages[1] : volPage;
  }

  _getVolPageTitle(volPage, localize) {
    if (!volPage) {
      return;
    };
    const volPages = volPage.split('//');
    if (volPages[1] && (volPages[0] !== volPages[1])) {
      return localize('volumeAndPagePTS1', 'pts1', volPages[0], 'pts2', volPages[1]);
    } else {
      return localize('volumeAndPage');
    }
  }
}

customElements.define('sc-parallel-item', SCParallelItem);
