import '@polymer/iron-ajax/iron-ajax.js';
import { html, LitElement } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import { API_ROOT } from '../../../constants.js';
import { getParagraphRange, transformId } from '../../../utils/suttaplex';
import { LitLocalized } from '../../addons/localization-mixin';

import './sc-parallel-item.js';
import { parallelsListCss } from './sc-suttaplex-css';

class SCParallels extends LitLocalized(LitElement) {
  static get properties() {
    return {
      itemUid: String,
      rootKeys: Array,
      originalLanguage: String,
      inputLanguage: String,
      inputUrl: String,
      loadingResults: Boolean,
      rootLang: String,
      responseData: Boolean,
      error: Boolean,
      rootText: Object,
      localizedStringsPath: String,
      expansionData: Array
    }
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-parallel-list';
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('itemUid')) {
      this._loadData();
    }

    return super.shouldUpdate();
  }

  getFirstParallelItem(rootId) {
    return this._getItemAtIndex(rootId, 0).to;
  }

  getFirstParallelRemark(rootId) {
    return this._getItemAtIndex(rootId, 0).remark;
  }

  getFirstParallelIcon(rootId) {
    return this.getParallelIcon(this._getItemAtIndex(rootId, 0));
  }

  getRowspan(rootId) {
    return this._getRelations(rootId).length;
  }

  getParallelIcon(item) {
    switch (item.type) {
      case 'full':
        if (item.resembling) {
          return 'sc-iron-icons:compare-arrows';
        }
        return 'sc-iron-icons:swap-horiz';
      case 'retelling':
        return 'sc-iron-icons:cached';
      case 'mention':
        return 'sc-iron-icons:format-quote';
      default:
        return '';
    }
  }

  computeIconTitle(item) {
    if (!item) {
      return;
    }
    switch (item.type) {
      case 'full':
        if (item.resembling) {
          return this.localize('ResemblingParallel');
        }
        return this.localize('FullParallel');
      case 'retelling':
        return this.localize('RetellingParallel');
      case 'mention':
        return this.localize('Mention');
    }
  }

  getFirstParallelIconTitle(rootId) {
    return this.computeIconTitle(this._getItemAtIndex(rootId, 0), this.localize);
  }

  getOtherParallels(rootId) {
    const parallels = [];
    for (let i = 1; i < this._getRelations(rootId).length; i++) {
      parallels.push(this._getItemAtIndex(rootId, i));
    }
    return parallels;
  }

  computeUrl(rootId) {
    const authorUid = (this.rootText || {}).author_uid || '';
    return `/${this.itemUid}/${this.rootLang}/${authorUid}${getParagraphRange(rootId, true)}`;
  }

  render() {
    return html`
    ${parallelsListCss}
    <div>
      ${this.loadingResults ? html`
        <paper-spinner-lite class="paper-spinner" .active="${this.loadingResults}"></paper-spinner-lite>
      ` : ''}

      ${this.rootKeys ? html`
        <table class="parallels-table">
          ${this.rootKeys.map(rootId => html`
            <tbody class="parallels-table-body">
              <tr class="parallels-row">
                <td class="parallels-root-cell parallels-table-cell paper-lift" rowspan="${this.getRowspan(rootId)}">
                  <a class="root-link" href="${this.computeUrl(rootId)}">
                    <paper-ripple></paper-ripple>
                    <div class="parallels-root-id root" title="${this.localize('suttaCentralID')}">
                      ${transformId(rootId, this.expansionData)}
                    </div>
                  </a>
                </td>
                <td class="parallels-relation-cell">
                  <iron-icon class="grey-icon" .icon="${this.getFirstParallelIcon(rootId)}" title="${this.getFirstParallelIconTitle(rootId)}"></iron-icon>
                </td>
                <td class="parallels-parallel-cell paper-lift">
                  <sc-parallel-item 
                    .parallelItem="${this.getFirstParallelItem(rootId)}" 
                    .remark="${this.getFirstParallelRemark(rootId)}" 
                    .expansionData="${this.expansionData}"
                  ></sc-parallel-item>
                </td>
              </tr>
    
              ${this.getOtherParallels(rootId).map(item => html`
                <tr>
                  <td class="parallels-relation-cell">
                    <iron-icon class="grey-icon" .icon="${this.getParallelIcon(item)}" title="${this.computeIconTitle(item)}"></iron-icon>
                  </td>
                  <td class="parallels-parallel-cell paper-lift">
                    <sc-parallel-item .parallelItem="${item.to}" .remark="${item.remark}" .expansionData="${this.expansionData}"></sc-parallel-item>
                  </td>
                </tr>
              `)}
            </tbody>
          `)}
        </table>
      ` : ''}
    </div>`;
  }

  async _loadData() {
    this.loadingResults = true;
    this.responseData = await (await fetch(this._getAPIEndpoint(this.itemUid))).json();
    await this._didRespond();
    this.loadingResults = false;
  }

  _didRespond() {
    const compareArray = (a, b) => {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      if (a[0] === b[0]) {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
      }
      return 0;
    };

    let rootKeys = Object.keys(this.responseData);
    if (rootKeys[0].substring(0, 3) === "sag") {
      this.rootKeys = rootKeys.map(item => item.match(/\d{1,4}/g).map(Number))
        .sort(compareArray)
        .map(item => {
          if (item.length === 1) {
            return `sag#${item[0].toString()}`;
          } else if (item.length === 2) {
            return `sag#${item[0].toString()}.${item[1].toString()}`;
          } else {
            return `sag#${item[0].toString()}.${item[1].toString()}-#${item[2].toString()}.${item[3].toString()}`;
          }
        });
    } else if (rootKeys[0].match(/dhp/)) {
      this.rootKeys = rootKeys.map(item => {
        const dhpNumber = this.responseData[item][0].enumber;

        return [dhpNumber, item];
      })
        .sort(compareArray)
        .map(item => item[1]);
    } else {
      this.rootKeys = rootKeys;
    }
  }

  _getRelations(rootId) {
    return this.responseData[rootId];
  }

  _getItemAtIndex(rootId, index) {
    return this._getRelations(rootId)[index];
  }

  _getAPIEndpoint(itemUrl) {
    return `${API_ROOT}/parallels/${itemUrl}`;
  }
}

customElements.define('sc-parallel-list', SCParallels);
