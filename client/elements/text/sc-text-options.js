import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-dropdown/iron-dropdown-scroll-manager.js';
import '@polymer/iron-collapse/iron-collapse.js';

import '../suttaplex/card/sc-suttaplex.js';
import { suttaplexStyles } from '../styles/sc-suttaplex-styles.js';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin'

/*
Pulls in one relevant suttaplex-card inside a collapse-item to display on top of each sutta text.
*/

class SCTextOptions extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      @media print {
        :host {
          display: none;
        }
      }

      .container {
        padding: var(--sc-size-lg) 5% 0 !important;
        margin: 0 auto;
        max-width: 720px;
        display: flex;
        flex-direction: column;
      }

      .heading {
        display: flex;
        justify-content: flex-end;
      }

      .heading paper-icon-button {
        margin-left: 16px;
      }

      .sutta-list {
        max-width: 720px;
        transition: margin-top 0.3s, margin-bottom 0.3s;
        margin: 0 auto var(--sc-size-xxl);
      }

    `;
  }

  render() {
    return html`
    ${suttaplexStyles}
    <div class="container">
      <div class="heading">
        ${this.textInfoButtonTemplate}
        <paper-icon-button id="text_settings_button" icon="sc-iron-icons:settings" @tap=${this._openSettingsDialog} aria-label="${this.localize('textSettings')}"></paper-icon-button>
          ${this.localize('textSettings')}
        </paper-tooltip>
        <paper-icon-button id="suttaplex_button" icon="${this._toggleIcon}" @tap=${this._toggleOpened} aria-label="${this.localize('viewParallels')}"></paper-icon-button>
          ${this.localize('viewParallels')}
        </paper-tooltip>
      </div>

      <iron-collapse .opened="${this.opened}">
        <div class="sutta-list">
          <sc-suttaplex .item=${this.suttaplexItem}></sc-suttaplex>
        </div>
      </iron-collapse>
    </div>`;
  }

  get textInfoButtonTemplate() {
    return this.metaArea ? html`
      <paper-icon-button id="text_info_button" icon="sc-iron-icons:info" @tap=${this._openInfoDialog} aria-label="${this.localize('information')}"></paper-icon-button>
    ` : '';
  }

  static get properties() {
    return {
      _toggleIcon: { type: String },
      suttaplexItem: { type: Object },
      opened: { type: Boolean },
      metaArea: { type: String },
      localizedStringsPath: { type: String }
    }
  }

  constructor() {
    super();
    this.suttaplexItem = [];
    this.opened = false;
    this.localizedStringsPath = '/localization/elements/sc-text-options';
    this._toggleIcon = this.opened ? 'sc-iron-icons:expand-less' : 'sc-iron-icons:expand-more';
  }

  firstUpdated() {
    this.metaArea = store.getState().suttaMetaText;
  }

  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('opened')) {
      this._toggleIcon = this._computeToggleIcon();
    }
  }

  _toggleOpened() {
    this.opened = !this.opened;
  }

  _closeSuttaplex() {
    this.opened = false;
  }

  _computeToggleIcon() {
    return this.opened ? 'sc-iron-icons:expand-less' : 'sc-iron-icons:expand-more';
  }

  _openSettingsDialog() {
    this.dispatchEvent(new CustomEvent('open-dialog', {
      detail: { id: 'settings_dialog' },
      composed: true,
      bubbles: true
    }));
  }

  _openInfoDialog() {
    this.dispatchEvent(new CustomEvent('open-dialog', {
      detail: { id: 'info_dialog' },
      composed: true,
      bubbles: true
    }));
  }
}

customElements.define('sc-text-options', SCTextOptions);