import { html, LitElement } from 'lit-element';

class SCSuttaplexSectionTitle extends LitElement {
  static get properties() {
    return {
      inputTitle: String,
      inputType: String,
    };
  }

  get titleClass() {
    return this.inputType === 'grouping' ? 'node-top-heading' : 'node-secondary-heading';
  }

  render() {
    return html`
      <div class="node-head-container">
        <div class="${this.titleClass}" style="font-size: 1.333em">${this.inputTitle}</div>
      </div>
    `;
  }
}

customElements.define('sc-suttaplex-section-title', SCSuttaplexSectionTitle);
