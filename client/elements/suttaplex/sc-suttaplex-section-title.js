import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-styles/typography.js';


class SCSuttaplexSectionTitle extends PolymerElement {
  static get template() {
    return html`
    <style>
      .node-head-container {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      .node-top-heading {
        @apply --paper-font-headline;
        display: flex;
        justify-content: space-between;
        border-top: 0;
        margin:0;
      }

      .node-secondary-heading {
        @apply --paper-font-title;
        margin:0;
      }

      .node-description {
        @apply --paper-font-body1;
      }

      .grey-icon {
        color: var(--sc-disabled-text-color);
      }
    </style>

    <div class="node-head-container">
      <h1 class$=".no-margin [[_calculateTitleClass(inputType)]]">[[inputTitle]]</h1>
      <div>
        <template is="dom-if" if="[[inputText]]">
          <paper-icon-button class="grey-icon" icon="[[toggleIcon]]" on-tap="_toggleOpened"></paper-icon-button>
        </template>
      </div>
    </div>

    <template is="dom-if" if="[[inputText]]">
      <iron-collapse no-animation="" id="collapse" opened="{{opened}}">
        <div class="node-description" inner-h-t-m-l="[[inputTextToHtml]]"></div>
      </iron-collapse>
    </template>`;
  }

  static get properties() {
    return {
      inputTitle: String,
      inputText: String,
      inputType: String,
      opened: {
        type: Boolean,
        value: false,
        notify: true
      },
      toggleIcon: {
        type: String,
        computed: '_computeToggleIcon(opened)'
      },
      inputTextToHtml: {
        type: Array,
        computed: '_splitText(inputText)'
      }
    }
  }

  _computeToggleIcon() {
    return this.opened ? 'icons:expand-less' : 'icons:expand-more';
  }

  _toggleOpened(e) {
    this.opened = !this.opened;
  }

  _calculateTitleClass(inputType) {
    return inputType === 'grouping' ? 'node-top-heading' : 'node-secondary-heading';
  }

  _splitText(text) {
    if (!text) { return ''; }
    return `<p>${text.split('\n').join('</p><p>')}</p>`;
  }
}

customElements.define('sc-suttaplex-section-title', SCSuttaplexSectionTitle);
