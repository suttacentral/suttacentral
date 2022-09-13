import { html, LitElement } from 'lit';
import { icon } from '../../../img/sc-icon';
import '../../menus/sc-menu-suttaplex-share';
import { suttaplexTxCss } from './sc-suttaplex-css';

export class SCSuttaplexTx extends LitElement {
  static properties = {
    item: { type: Object },
    translation: { type: Object },
    isCompact: { type: Boolean },
    isRoot: { type: Boolean },
    isSuttaInRangeSutta: { type: Boolean },
    inRangeSuttaId: { type: String },
  };

  get translationUrl() {
    if (this.isSuttaInRangeSutta && this.translation.segmented && this.inRangeSuttaId) {
      return `/${this.inRangeSuttaId}/${this.translation.lang}/${this.translation.author_uid}`;
    }
    return `/${this.item.uid}/${this.translation.lang}/${this.translation.author_uid}`;
  }

  static styles = [suttaplexTxCss];

  render() {
    return html`
      <a href=${this.translationUrl} class="tx ${this.isCompact ? 'compact' : ''}">
        ${icon.translation}
        <div class="tx-details">
          <span class="tx-creator">${this.translation.author}</span>
          <span class="tx-publication">
            ${this.isRoot ? this.item.root_lang_name : ''}
            ${!this.isRoot && this.translation.segmented
              ? `${this.translation.lang_name} & ${this.item.root_lang_name}`
              : ''}
            ${!this.isRoot && !this.translation.segmented ? this.translation.lang_name : ''}
            ${this.translation.publication_date ? this.translation.publication_date : ''}
          </span>
        </div>
      </a>
    `;
  }
}

customElements.define('sc-suttaplex-tx', SCSuttaplexTx);
