import { html, LitElement } from 'lit';

class SCSuttaplexSectionTitle extends LitElement {
  static properties = {
    inputTitle: { type: String },
    inputType: { type: String },
    originalTitle: { type: String },
    isPatimokkhaRuleCategory: { type: Boolean },
  };

  get titleClass() {
    return this.inputType === 'grouping' ? 'node-top-heading' : 'node-secondary-heading';
  }

  render() {
    return html`
      <div class="node-head-container">
        <div class=${this.titleClass} style="font-size: var(--sc-font-size-l)">
          ${this.inputTitle}${this.isPatimokkhaRuleCategory &&
          this.inputTitle !== this.originalTitle
            ? `—${this.originalTitle}`
            : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('sc-suttaplex-section-title', SCSuttaplexSectionTitle);
