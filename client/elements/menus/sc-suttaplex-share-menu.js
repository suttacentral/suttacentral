import { LitElement, html } from 'lit-element';

import { LitLocalized } from '../addons/localization-mixin'
import { API_ROOT } from '../../constants.js';
import copyToClipboard from '../../utils/copy.js'
import { volPagesToString } from '../../utils/suttaplex';
import '@material/mwc-icon';
import { icon } from '../../img/sc-icon';

/*
Menu on top of the suttaplex parallel's list for copying information from parallels to clipboard.
*/

class SCSuttaplexShareMenu extends LitLocalized(LitElement) {
  render() {
    return html`
    <style>
      .button-text {
        color: var(--sc-primary-text-color);
      }

      .button-text:hover {
        background-color: var(--sc-tertiary-background-color);
        cursor: pointer;
      }

      .table-element {
        white-space: nowrap;
        height: 48px;
        padding: 0 16px;
        display: flex;
        align-items: center;
      }

      .table-element[disabled] {
        color: var(--sc-disabled-text-color);
      }

      mwc-icon {
        margin-right: var(--sc-size-md);
        fill: var(--sc-disabled-text-color);
      }


    </style>

    <li class="table-element button-text" @tap=${this._copyLink} title="${this._computeLink(this.item)}">
      <mwc-icon id="link">${icon.link}</mwc-icon>
      ${this.localize('copyLink')}
    </li>
    <li class="table-element button-text" @tap=${this._copyContent} ?disabled="${this._setAreParallelsAvailable(this.loadingParallels)}">
      <mwc-icon id="content_copy">${icon.content_copy}</mwc-icon>
      ${this.localize('copyTable')}
    </li>
    <li class="table-element button-text" @tap=${this._copyCite} ?disabled="${this._setAreParallelsAvailable(this.loadingParallels)}">
      <mwc-icon id="format_quote">${icon.format_quote}</mwc-icon>
      ${this.localize('cite')}
    </li>`;
  }

  static get properties() {
    return {
      item: { type: Object },
      parallels: { type: Object },
      loadingParallels: { type: Boolean },
      areParallelsAvailable: { type: Boolean },
      localizedStringsPath: { type: String }
    }
  }

  constructor() {
    super();
    this.item = [];
    this.parallels = [];
    this.loadingParallels = false;
    this.areParallelsAvailable = false;
    this.localizedStringsPath = '/localization/elements/sc-suttaplex-share-menu';
  }

  firstUpdated() {
    this._fetchParallels();
  }

  async _fetchParallels() {
    this.loadingParallels = true;
    this.parallels = await (await fetch(this._getAPIEndpoint(this.item))).json();
    this.loadingParallels = false;
  }

  _notifyCopy(message, success) {
    this.dispatchEvent(new CustomEvent('par-menu-copied', {
      detail: { message: message, success: success },
      bubbles: true,
      composed: true
    }))
  }

  _sendRequest() {
    if (this.parallels) {
      return;
    }
  }

  // copy the parallels-table in html-string
  _copyContent() {
    try {
      const table = this._computeCopyTable();
      copyToClipboard(table);
      this._notifyCopy(this.localize('tableCopied'), true);
    } catch (err) {
      this._notifyCopy(this.localize('error'), false);
      console.error(err);
    }
  }

  _setAreParallelsAvailable(loadingParallels) {
    if (this.parallels === undefined || this.parallels === null) {
      return false;
    }
    return loadingParallels || (Object.keys(this.parallels).length === 0 && typeof this.parallels === 'object');
  }

  _computeLink() {
    const url = window.location;
    const baseUrl = url.protocol + '//' + url.host;
    try {
      return `${baseUrl}/${this.item.uid}`;
    } catch (err) {
      this._notifyCopy(this.localize('error'), false);
    }
  }

  // Copy the link to the suttaplex page
  _copyLink() {
    try {
      const link = this._computeLink();
      copyToClipboard(link);
      this._notifyCopy(this.localize('linkCopied'), true);
    } catch (err) {
      this._notifyCopy(this.localize('error'), false);
      console.error(err);
    }
  }

  //  copy cite-information about parallels and bibliography.
  _copyCite() {
    this._computeCiteData();
    try {
      const cite = this._computeCiteData();
      copyToClipboard(cite);
      this._notifyCopy(this.localize('citeCopied'), true);
    } catch (err) {
      this._notifyCopy(this.localize('error'), false);
      console.error(err);
    }
  }

  _computeIcon(parallel) {
    switch (parallel.type) {
      case 'full':
        if (parallel.resembling) {
          return '≈';
        }
        return '⮀';
      case 'retelling':
        return '🔃';
      case 'mention':
        return '❞';
      default:
        return '';
    }
  }

  // creates a parallels-table in html-string
  _computeCopyTable() {
    const head = `<!DOCTYPE>\n<html>\n<head>\n  <title>${this.item.uid} ${this.item.original_title}</title>\n</head>\n`;
    let body = `<body>\n<table>\n  <caption>${this.item.original_title}</caption>\n`;
    for (let section of Object.keys(this.parallels)) {
      let tbody = '<tbody>\n';
      let size = this.parallels[section].length;
      let first = true;
      let tr = '';
      for (let parallel of this.parallels[section]) {
        tr = '  <tr>\n';
        if (first) {
          tr += `    <td rowspan=${size}>${section}</td>\n`;
          first = false;
        }
        tr += `    <td>${this._computeIcon(parallel)}</td>\n`;
        tr += `    <td>${parallel.to.to}</td>\n`;
        tr += `    <td>${parallel.to.original_title}</td>\n`;
        tbody += `${tr}  </tr>\n`;
      }

      body += `${tbody}</tbody>\n`;
    }
    body += '</table>\n</body>\n</html>';
    return head + body;
  }

  _computeCiteData() {
    let result = '';
    for (let section of Object.keys(this.parallels)) {
      let acronymUid = this._generateAcronymUid(this.item.acronym, section)
      result += `Parallels for ${acronymUid} ${this.item.original_title} `;
      let volpages = volPagesToString(this.item.volpages);
      result += volpages ? `(${volpages})` : '';
      result = this._strip(result, ' ');
      result += ': ';
      for (let parallel of this.parallels[section]) {
        result += this._generateAcronymUid(parallel.to.acronym, parallel.to.to);
        result += ' ';
        let parallelVolpages = volPagesToString(parallel.to.volpages);
        result += parallelVolpages ? `(${parallelVolpages}) ` : '';
        if (parallel.to.biblio) {
          result += this._getTextFromHtml(parallel.to.biblio);
        }
        result = this._strip(result, ' ');
        result += '; ';
      }
      result = this._strip(result, ' ');
      result = this._strip(result, ';');
      result += '\n';
    }
    result += `Retrieved from ${window.location.href} on ${new Date()}.`
    return result;
  }

  _strip(s, toStrip) {
    if (s[s.length - 1] === toStrip) {
      return s.substring(0, s.length - 1);
    }
    return s;
  }

  _generateAcronymUid(acronym, uid) {
    if (acronym) {
      let paragraph = uid.split(/#(.+)/)[1];
      if (paragraph) {
        acronym += `#${paragraph}`;
      }
      return acronym;
    } else {
      return uid;
    }
  }

  _getTextFromHtml(htmlString) {
    let tmp = document.createElement('div');
    tmp.innerHTML = htmlString;
    return tmp.textContent;
  }

  _getAPIEndpoint(item) {
    return `${API_ROOT}/parallels/${item.uid}`;
  }
}

customElements.define('sc-suttaplex-share-menu', SCSuttaplexShareMenu);
