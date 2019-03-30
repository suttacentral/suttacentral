import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import { html, LitElement } from '@polymer/lit-element';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-listbox/paper-listbox.js';

import { API_ROOT } from '../../constants.js';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';
import { languageBaseMenuCss } from './sc-language-base-menu-css';

class LanguageBaseMenu extends LitLocalized(LitElement) {
  static get properties() {
    return {
      languageListResponse: Array,
      selectedLanguageNum: Number,
      localizedStringsPath: String,
      cloneName: String, // pass a unique name here to use in the language change event identifier.
      noRoot: Boolean, // If true, no root languages will be displayed.
      disabled: Boolean
    };
  }

  get actions() {
    return {
      changeLanguage(language, fullName) {
        store.dispatch({
          type: 'CHANGE_SITE_LANGUAGE',
          language: language,
          fullName: fullName
        })
      }
    }
  }

  get apiUrl() {
    return `${API_ROOT}/languages?all=true`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-language-base-menu';
    this.languageListResponse = [];
  }

  connectedCallback() {
    super.connectedCallback();

    this._fetchLanguageList();
  }

  render() {
    return html`
    ${languageBaseMenuCss}

    <paper-dropdown-menu class="language-menu-dropdown" 
      label="${this.localize('languageLabel')}" 
      ?disabled="${this.disabled}" 
      title="${this.localize('browseTooltip')}" 
      vertical-align="auto"
    >
      <paper-listbox class="language-menu-list" slot="dropdown-content" selected="${this.selectedLanguageNum}" @iron-select="${this._selectedLanguageNumChanged}">
        ${this.languageListResponse.map((language) => this.languageTemplate(language))}
      </paper-listbox>
    </paper-dropdown-menu>`;
  }

  languageTemplate(language) {
    return html`
      <paper-icon-item class="language-menu-paper-item" id="${language.uid}">
        <paper-item-body>
          <div class="language-name">${language.name}</div>
        </paper-item-body>
      </paper-icon-item>`;
  }

  _selectedLanguageNumChanged(event) {
    if (!this.languageListResponse || this.languageListResponse.length === 0) {
      return;
    }
    if (!this.selectedLanguageNum && this.selectedLanguageNum !== 0) {
      return;
    }

    try {
      this.selectedLanguageNum = this._findChosenLanguageIndex(event.detail.item.id);
      const chosenLanguage = this.languageListResponse[this.selectedLanguageNum];
      // If it's not a main language change menu (but a clone), dispatch an event
      if (this.cloneName) {
        dispatchEvent(new CustomEvent(`${this.cloneName}-language-changed`, {
          detail: { isoCode: chosenLanguage.iso_code, name: chosenLanguage.name },
          composed: true,
          bubbles: true
        }));
      } else {
        this.actions.changeLanguage(chosenLanguage.iso_code, chosenLanguage.name);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async _fetchLanguageList() {
    this.languageListResponse = await (await fetch(this.apiUrl)).json();

    if (this.noRoot) {
      this.languageListResponse = this.languageListResponse.filter(lang => !lang.is_root);
    }

    this.selectedLanguageNum = this._findChosenLanguageIndex(this.language);
  }

  _findChosenLanguageIndex(chosenLang) {
    try {
      return this.languageListResponse.findIndex((language) => language.iso_code === chosenLang);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
}

customElements.define('sc-language-base-menu', LanguageBaseMenu);
