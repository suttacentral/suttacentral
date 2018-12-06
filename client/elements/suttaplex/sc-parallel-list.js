import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import { suttaplexStyles} from '../styles/sc-suttaplex-styles.js';
import './sc-parallel-item.js';
import { ReduxMixin } from '/redux-store.js';
import { Localized } from '../addons/localization-mixin.js';
import { API_ROOT } from '../../constants.js';

/*
This is the outline of the parallels-table which is used in sc-suttaplex.
This parallels-table is further populated with the additional info for each relevant parallel sutta,
which is loaded from `../data/suttas` in sc-parallel-item.
*/

class SCParallels extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    ${suttaplexStyles}
    <style>
      a {
        position: relative;
      }

      .parallels-table {
        border-collapse: separate;
        border-spacing: 0 var(--sc-size-sm);
        margin: 0 auto;
        width: 95%;
      }

      .parallels-root-cell,
      .parallels-parallel-cell {
        border-radius: var(--sc-size-sm);
        background: var(--sc-tertiary-background-color);
      }

      .parallels-parallel-cell {
        width: 100%;
      }

      @media screen and (max-width: 600px) {
        .parallels-parallel-cell {
          max-width: 200px;
        }
      }

      .parallels-root-cell {
        text-align: center;
        min-width: 90px;
        height: 1px; /* Hack for anchor height. */
      }
      
      paper-ripple {
        color: var(--sc-tertiary-color-medium);
      }
      
      .parallels-root-id {
        @apply --sc-skolar-font-size-sm;
        @apply --sc-serif-font;
      }

      .paper-spinner {
        --paper-spinner-color: var(--sc-primary-color);
        margin: var(--sc-size-md) 0;
        left: 50%;
      }

      .parallels-table-body {
        display: block;
        margin-bottom: var(--sc-size-sm);
      }

      .grey-icon {
        color: var(--sc-disabled-text-color);
      }

      .root-link {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        letter-spacing: var(--sc-all-caps_-_letter-spacing);
        text-transform: var(--sc-all-caps_-_text-transform);
        color: inherit;
      }
    </style>

    <iron-ajax id="uid_expansion_ajax" url="/api/expansion" handle-as="json" last-response="{{expansionData}}"></iron-ajax>

    <iron-ajax id="ajax" url="[[_getAPIEndpoint(itemUid)]]" handle-as="json" loading="{{loadingResults}}" last-response="{{responseData}}" on-response="_didRespond"></iron-ajax>

    <div>

      <template is="dom-if" if="[[loadingResults]]">
        <paper-spinner-lite class="paper-spinner" active="{{loadingResults}}"></paper-spinner-lite>
      </template>

      <table class="parallels-table">
        <template is="dom-repeat" items="[[rootKeys]]" as="rootId">
          <tbody class="parallels-table-body">

          <tr class="parallels-row">
            <td class="parallels-root-cell parallels-table-cell paper-lift" rowspan$="[[_getRowspan(rootId)]]">
              <a class="root-link" href="[[_computeUrl(rootId)]]">
                <paper-ripple></paper-ripple>
                <div class="parallels-root-id root" title="{{localize('suttaCentralID')}}">
                  [[_transformId(rootId,expansionData)]]
                </div>
              </a>
            </td>
            <td class="parallels-relation-cell">
              <iron-icon class="grey-icon" icon$="[[_getFirstParallelIcon(rootId)]]" title$="[[_getFirstParallelIconTitle(rootId, localize)]]"></iron-icon>
            </td>
            <td class="parallels-parallel-cell paper-lift">
              <sc-parallel-item parallel-item="[[_getFirstParallelItem(rootId)]]" remark="[[_getFirstParallelRemark(rootId)]]" expansion-data="[[expansionData]]"></sc-parallel-item>
            </td>
          </tr>

          <template is="dom-repeat" items="[[_getOtherParallels(rootId)]]" as="item">
            <tr>
              <td class="parallels-relation-cell">
                <iron-icon class="grey-icon" icon="[[_getParallelIcon(item)]]" title="[[_computeIconTitle(item, localize)]]"></iron-icon>
              </td>
              <td class="parallels-parallel-cell paper-lift">
                <sc-parallel-item parallel-item="[[item.to]]" remark="[[item.remark]]" expansion-data="[[expansionData]]"></sc-parallel-item>
              </td>
            </tr>
          </template>

          </tbody>
        </template>
      </table>
    </div>`;
  }

  static get properties() {
    return {
      itemUid: {
        type: String,
        observer: '_itemUidChanged'
      },
      rootKeys: Array,
      originalLanguage: String,
      inputLanguage: String,
      inputUrl: String,
      loadingResults: {
        type: Boolean,
        notify: true
      },
      rootLang: String,
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
      responseData: {
        type: Object
      },
      error: Boolean,
      rootText: {
        type: Object
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-parallel-list'
      },
      expansionData: {
        type: Array
      }
    }
  }

  ready() {
    super.ready();
    if (!this.expansionData) {
      this.$.uid_expansion_ajax.generateRequest()
    }
  }

  _itemUidChanged() {
    if (!this.responseData) {
      return;
    }
    this.shadowRoot.querySelector('#ajax').generateRequest();
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('#ajax').generateRequest();
  }

  _didRespond() {
    let rootKeys = Object.keys(this.responseData);
    if (rootKeys[0].substring(0, 3) === "sag") {
      let numbersArray = [];
      rootKeys.forEach(item => {
        const sagNumbers = item.match(/\d{1,4}/g);
        numbersArray.push(sagNumbers.map(Number));
      });
      numbersArray = numbersArray.sort(this._compareArray);
      let rootKeysSorted = [];
      numbersArray.forEach(item => {
        if (item.length === 1) {
          rootKeysSorted.push(`sag#${item[0].toString()}`);
        } else if (item.length === 2) {
          rootKeysSorted.push(`sag#${item[0].toString()}.${item[1].toString()}`);
        } else {
          rootKeysSorted.push(`sag#${item[0].toString()}.${item[1].toString()}-#${item[2].toString()}.${item[3].toString()}`);
        }
      });
      this.rootKeys = rootKeysSorted;
    } else if (rootKeys[0].match(/dhp/)) {
      let rootKeysSorted = [];
      let numbersArray = [];
      rootKeys.forEach(item => {
        const dhpNumber = this.responseData[item][0].enumber;
        numbersArray.push([dhpNumber, item]);
      });
      numbersArray = numbersArray.sort(this._compareArray);
      numbersArray.forEach(item => {
        rootKeysSorted.push(item[1]);
      });
      this.rootKeys = rootKeysSorted;
    } else {
      this.rootKeys = rootKeys;
    }
  }

  _compareArray(a, b) {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    if (a[0] === b[0]) {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
    }
    return 0;
  }

  _getRelations(rootId) {
    return this.responseData[rootId];
  }

  _getItemAtIndex(rootId, index) {
    return this._getRelations(rootId)[index];
  }

  _getFirstParallelItem(rootId) {
    return this._getItemAtIndex(rootId, 0).to;
  }

  _getFirstParallelRemark(rootId) {
    return this._getItemAtIndex(rootId, 0).remark;
  }

  _getFirstParallelIcon(rootId) {
    return this._getParallelIcon(this._getItemAtIndex(rootId, 0));
  }

  // returns the rowspan needed for each parallel.
  _getRowspan(rootId) {
    return this._getRelations(rootId).length;
  }

  // returns the icon for the parallel with the given index.
  _getParallelIcon(item) {
    switch (item.type) {
      case 'full':
        if (item.resembling) {
          return 'icons:compare-arrows';
        }
        return 'swap-horiz';
      case 'retelling':
        return 'cached';
      case 'mention':
        return 'editor:format-quote';
      default:
        return '';
    }
  }

  // returns the correct title for each type of parallel.
  _computeIconTitle(item, localize) {
    if (!item) {
      return;
    }
    switch (item.type) {
      case 'full':
        if (item.resembling) {
          return localize('ResemblingParallel');
        }
        return localize('FullParallel');
      case 'retelling':
        return localize('RetellingParallel');
      case 'mention':
        return localize('Mention');
    }
  }

  // returns the title for the parallel icon with the given index.
  _getFirstParallelIconTitle(rootId, localize) {
    return this._computeIconTitle(this._getItemAtIndex(rootId, 0), localize);
  }

  // returns an array with the data for all other parallels than the first.
  _getOtherParallels(rootId) {
    const parallels = [];
    for (let i = 1; i < this._getRelations(rootId).length; i++) {
      parallels.push(this._getItemAtIndex(rootId, i));
    }
    return parallels;
  }

  _getAPIEndpoint(itemUrl) {
    return `${API_ROOT}/parallels/${itemUrl}`;
  }

  _computeFullLangName(isoCode) {
    return this.rootLangMappings[isoCode];
  }

  _computeUrl(rootId) {
    const authorUid = (this.rootText || {}).author_uid || '';
    return `/${this.itemUid}/${this.rootLang}/${authorUid}${this._getParagraphRange(rootId, true)}`;
  }

  _getParagraphRange(rootId, isUrl) {
    if (rootId.match(/dhp/g) && isUrl) {
      const ids = rootId.substring(rootId.indexOf('dhp') + 3);
      if (ids.includes('-')) {
        const [id1, id2] = ids.split('-');
        return `#${id1}--${id2}`;
      }
      return `#${ids}`;
    } else {
      const ids = rootId.split(/#(.*)/)[1];
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

  // This function parses the input uid of the parallel and splits it into
  // it's main document part (root_part) and the id (paragraphs) within the document (id_part)
  // The root_part is then split into it's various elements which are then expanded
  // according to the data in the expansion-table.
  // So f.i. 'an3.4#23-#25' becomes 'AN 3.4 #23-25' and 'lzh-sarv-bi-vb-np1' becomes
  // 'Lzh Sarv Bi Vb NP 1'
  _transformId(rootId, expansionData) {
    if (!rootId || !expansionData) {
      return '';
    }
    if (rootId.substring(0, 5) === 'g3dhp') {
      const idNumbers = rootId.substring(5);
      return `G-3 Dhp ${idNumbers}`;
    }
    const idPart = this._getParagraphRange(rootId, false).replace('--', '–');
    const rootPart = rootId.split('#')[0];
    const uidParts = rootPart.split('-');
    let scAcronym = '';
    let tail = '';
    uidParts.forEach(item => {
      if (!expansionData[0][item]) {
        let tailMatch = item.match(/\d+.*/g);
        if (tailMatch) tail = tailMatch[0] + '–';
        let itemMatch = item.match(/[a-z]*/g);
        if (itemMatch) item = itemMatch[0];
      }
      if (item && expansionData[0][item]) {
        scAcronym += `${expansionData[0][item][0]} ${tail}`
      } else {
        scAcronym += tail;
      }
    });
    scAcronym = scAcronym.replace(/–\s*$/, '');
    return `${scAcronym}${idPart}`;
  }
}

customElements.define('sc-parallel-list', SCParallels);
