import { css, html, LitElement, render } from 'lit';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { API_ROOT } from '../../constants';
import copyToClipboard from '../../utils/copy';
import { formatVolPages } from '../../utils/suttaplex';
import { icon } from '../../img/sc-icon';

/*
Menu on top of the suttaplex parallel's list for copying information from parallels to clipboard.
*/

export class SCMenuSuttaplexShare extends LitLocalized(LitElement) {
  static properties = {
    item: { type: Object },
    parallels: { type: Object },
    loadingParallels: { type: Boolean },
    areParallelsAvailable: { type: Boolean },
    localizedStringsPath: { type: String },
  };

  constructor() {
    super();
    this.item = [];
    this.parallels = [];
    this.loadingParallels = false;
    this.areParallelsAvailable = false;
    this.localizedStringsPath = '/localization/elements/share';
  }

  static styles = css`
    :host {
      outline: none;
    }

    .button-text {
      color: var(--sc-on-secondary-primary-text-color);
      font-weight: 500;
    }

    .button-text:hover {
      background-color: var(--sc-tertiary-background-color);
      transition: background-color 0.2s ease;
      cursor: pointer;
    }

    .button-text:active {
      background-color: var(--sc-darker-fixed-background-color);
      transition: background-color 0.2s ease;
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
      color: var(--sc-icon-color);
    }

    .icon {
      margin-right: var(--sc-size-md);
      fill: var(--sc-icon-color);
    }

    .disabled {
      pointer-events: none;
      opacity: 0.6;
    }

    #parallelsTable {
      display: none;
    }
  `;

  render() {
    return html`
      <li
        id="btnCopyLink"
        class="table-element button-text"
        @click=${this.#copyLink}
        title=${this.#computeLink(this.item)}
      >
        ${icon.link} ${this.localize('share:copyLink')}
      </li>
      <li id="btnCopyContent" class="table-element button-text" @click=${this.#copyContent}>
        ${icon.content_copy} ${this.localize('share:copyTable')}
      </li>
      <li id="btnCopyCite" class="table-element button-text" @click=${this.#copyCite}>
        ${icon.format_quote} ${this.localize('share:cite')}
      </li>
      <div id="parallelsTable"></div>
    `;
  }

  async #fetchParallels() {
    this.loadingParallels = true;
    this.parallels = await (await fetch(this.#getAPIEndpoint(this.item))).json();
    this.loadingParallels = false;
    this.#didRespond();
  }

  #didRespond() {
    if (this.parallels) {
      this.shadowRoot.querySelector('#btnCopyContent').classList.remove('disabled');
      this.shadowRoot.querySelector('#btnCopyCite').classList.remove('disabled');
    } else {
      this.shadowRoot.querySelector('#btnCopyContent').classList.add('disabled');
      this.shadowRoot.querySelector('#btnCopyCite').classList.add('disabled');
    }
  }

  #notifyCopy(message, success) {
    this.dispatchEvent(
      new CustomEvent('par-menu-copied', {
        detail: { message, success },
        bubbles: true,
        composed: true,
      })
    );
  }

  // copy the parallels-table in html-string
  async #copyContent() {
    try {
      const table = await this.#computeCopyTable();
      copyToClipboard(table);
      this.#notifyCopy(this.localize('share:tableCopied'), true);
    } catch (err) {
      this.#notifyCopy(this.localize('share:error'), false);
      console.error(err);
    }
  }

  #computeLink() {
    const url = window.location;
    const baseUrl = `${url.protocol}//${url.host}`;
    try {
      return `${baseUrl}/${this.item.uid}`;
    } catch (err) {
      this.#notifyCopy(this.localize('share:error'), false);
    }
  }

  // Copy the link to the suttaplex page
  #copyLink() {
    try {
      const link = this.#computeLink();
      copyToClipboard(link);
      this.#notifyCopy(this.localize('share:linkCopied'), true);
    } catch (err) {
      this.#notifyCopy(this.localize('share:error'), false);
      console.error(err);
    }
  }

  //  copy cite-information about parallels and bibliography.
  async #copyCite() {
    await this.#fetchParallels();
    this.#computeCiteData();
    try {
      const cite = this.#computeCiteData();
      copyToClipboard(cite);
      this.#notifyCopy(this.localize('share:citeCopied'), true);
    } catch (err) {
      this.#notifyCopy(this.localize('share:error'), false);
      console.error(err);
    }
  }

  #computeIcon(parallel) {
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
  async #computeCopyTable() {
    const suttaplexList = document.querySelector('sc-suttaplex-list');
    if (suttaplexList) {
      await suttaplexList.initTableView();
      const parallelsLite = [...suttaplexList.parallelsLite];
      for (let i = parallelsLite.length - 1; i >= 0; i--) {
        if (parallelsLite[i].uid !== this.item.uid) {
          parallelsLite.splice(i, 1);
        }
      }
      const parallelsTable = suttaplexList.tableViewTemplate(parallelsLite);
      render(parallelsTable, this.shadowRoot.querySelector('#parallelsTable'));
      const table = this.shadowRoot.querySelector('#parallelsTable').innerHTML;
      return table.replace(/<!--[\s\S]*?-->/g, '');
    }
    return '';
  }

  #computeCiteData() {
    let result = '';
    for (const section of Object.keys(this.parallels)) {
      const acronymUid = this.#generateAcronymUid(this.item.acronym, section);
      result += `Parallels for ${acronymUid} ${this.item.translated_title} `;
      const volpages = this.#ltrim(this.#briefVolPage(this.item.volpages));
      result += volpages ? `(${volpages})` : '';
      result = this.#strip(result, ' ');
      result += ': ';
      for (const parallel of this.parallels[section]) {
        result += this.#generateAcronymUid(parallel.to.acronym, parallel.to.to);
        result += ' ';
        result += parallel.to.volpages ? `(${this.#ltrim(this.#briefVolPage(parallel.to.volpages))}) ` : '';
        if (parallel.to.biblio) {
          result += this.#getTextFromHtml(parallel.to.biblio);
        }
        result = this.#strip(result, ' ');
        result += '; ';
      }
      result = this.#strip(result, ' ');
      result = this.#strip(result, ';');
      result += '\n';
    }
    result += `Retrieved from ${window.location.href} on ${new Date()}.`;
    return result;
  }

  #briefVolPage(volpageList) {
    const volpages = volpageList.split(',');
    if (volpageList && volpages.length > 1) {
      const volPagesEnd = formatVolPages(volpages[volpages.length - 1]);
      return `${volpages[0]}–${volPagesEnd.trim()}`;
    }
    return volpageList;
  }

  #ltrim(volpages) {
    return volpages.replace(/^\s+|\s+$/g, '');
  }

  #strip(s, toStrip) {
    if (s[s.length - 1] === toStrip) {
      return s.substring(0, s.length - 1);
    }
    return s;
  }

  #generateAcronymUid(acronym, uid) {
    if (acronym) {
      const paragraph = uid.split(/#(.+)/)[1];
      if (paragraph) {
        acronym += `#${paragraph}`;
      }
      return acronym;
    }
    return uid;
  }

  #getTextFromHtml(htmlString) {
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlString;
    return tmp.textContent;
  }

  #getAPIEndpoint(item) {
    return `${API_ROOT}/parallels/${item.uid}`;
  }
}

customElements.define('sc-menu-suttaplex-share', SCMenuSuttaplexShare);
