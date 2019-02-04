import '@polymer/iron-collapse/iron-collapse.js';
import { html, LitElement } from '@polymer/lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/typography.js';
import { suttaplexSectionTitleCss } from './sc-suttaplex-section-title-css';

class SCSuttaplexSectionTitle extends LitElement {
  static get properties() {
    return {
      inputTitle: String,
      inputText: String,
      inputType: String,
      opened: Boolean,
      label: String,
    }
  }

  get toggleIcon() {
    return this.opened ? 'sc-iron-icons:expand-less' : 'sc-iron-icons:expand-more';
  }


  get iconTemplate() {
    return html`<paper-icon-button class="grey-icon" .icon="${this.toggleIcon}" @tap="${this.toggleOpened}" aria-label="${this.label}"></paper-icon-button>`;
  }

  get titleClass() {
    return this.inputType === 'grouping' ? 'node-top-heading' : 'node-secondary-heading';
  }

  get textTemplate() {
    return html`
      <iron-collapse .noAnimation="${true}" id="collapse" .opened="${this.opened}" >
        <div class="node-description" .innerHTML="${this.inputTextToHtml()}"></div>
      </iron-collapse>
    `;
  }

  inputTextToHtml() {
    if (!this.inputText) {
      return '';
    }
    return `<p>${this.inputText.split('\n').join('</p><p>')}</p>`;
  }

  toggleOpened() {
    this.opened = !this.opened;
  }

  render() {
    return html`
      ${suttaplexSectionTitleCss}
  
      <div class="node-head-container">
        <h1 class="${this.titleClass}">${this.inputTitle}</h1>

        <div>${this.inputText && this.iconTemplate}</div>
      </div>
  
      ${this.inputText && this.textTemplate}
    `;
  }

}

customElements.define('sc-suttaplex-section-title', SCSuttaplexSectionTitle);
