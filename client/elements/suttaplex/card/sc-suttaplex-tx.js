import { html, LitElement } from 'lit';
import { icon } from '../../../img/sc-icon';
import '../../menus/sc-menu-suttaplex-share';
import { suttaplexTxCss } from './sc-suttaplex-css';
import '../../addons/sc-badge';

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
    return `/${this.item.uid}/${this.translation?.lang || 'en'}/${this.translation?.author_uid}`;
  }

  static styles = [suttaplexTxCss];

  render() {
    return this.translation
      ? html`
          <a
            href=${this.translationUrl}
            class="tx ${this.isCompact ? 'compact' : ''}"
            @click=${this.#hideTopSheets}
          >
            ${icon.open_book}
            <div class="tx-details">
              <span class="tx-creator">${this.translation?.author}</span>
              <span class="tx-publication"> ${this.publicationInfoTemplate()} </span>
              <span class="badges"> ${this.badgeTemplate()} </span>
              <md-ripple></md-ripple>
            </div>
          </a>
        `
      : '';
  }

  #hideTopSheets() {
    const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
    scActionItems?.hideTopSheets();
  }

  publicationInfoTemplate() {
    return html`
      ${this.isRoot ? this.item.root_lang_name : ''}
      ${!this.isRoot && this.translation?.segmented
        ? `${this.translation?.lang_name} & ${this.item.root_lang_name}`
        : ''}
      ${!this.isRoot && !this.translation?.segmented ? this.translation?.lang_name : ''}
      ${this.translation?.publication_date || ''}
    `;
  }

  badgeTemplate() {
    return html`
      ${!this.isRoot && this.translation?.segmented ? this.alignedBadgeTemplate() : ''}
      ${!this.isRoot && this.translation?.segmented && this.translation?.has_comment
        ? this.annotatedBadgeTemplate()
        : ''}
      ${!this.isRoot && !this.translation?.segmented ? this.legacyBadgeTemplate() : ''}
    `;
  }

  alignedBadgeTemplate() {
    return html`<sc-badge text="aligned" color="gray"></sc-badge>`;
  }

  annotatedBadgeTemplate() {
    return html`<sc-badge text="annotated" color="gray"></sc-badge>`;
  }

  legacyBadgeTemplate() {
    return html`<sc-badge text="legacy" color="gray"></sc-badge>`;
  }
}

customElements.define('sc-suttaplex-tx', SCSuttaplexTx);
