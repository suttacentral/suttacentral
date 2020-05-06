import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-item/paper-item.js';
import '../addons/sc-bouncing-loader';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/iron-overlay-behavior/iron-overlay-backdrop.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

import { API_ROOT } from '../../constants.js';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin'

/*
Settings menu appears in the toolbar on text pages only. It has setting for textual-details (paragraph numbers),
type of view for segmented pages (showing pali next to translated text), lookup tools and publication details .
*/

class SCSettingsMenu extends LitLocalized(LitElement) {
  render() {
    return html`
    <style>
      :host {
        --primary-color: var(--sc-primary-color);
        --accent-color: var(--sc-primary-accent-color);
      }

      .paper-dialogue-container {
        max-width: 720px;
      }

      .dialog-header {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-xl);
        font-weight: 400;
        line-height: 28px;
        margin: 0;
      }

      #settingsbutton {
        color: var(--sc-tertiary-text-color);
      }

      .dialog-section {
        margin: var(--sc-size-md-larger) 0;
      }

      .nerdy-row {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: 400;
        line-height: 20px;
        color: var(--sc-secondary-text-color);
        margin: var(--sc-size-sm) 0;
      }

      .menu-item-title {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-xl);
        font-weight: 400;
        line-height: 28px;
        color: var(--sc-primary-text-color);
        margin: var(--sc-size-sm) 0;
      }

      .menu-option {
        --paper-radio-button-unchecked-color: var(--sc-disabled-text-color);
        --paper-radio-button-checked-color: var(--sc-primary-accent-color);
        --paper-radio-button-label-color: var(--sc-primary-text-color);
      }

      .menu-item .menu-icon {
        margin-right: var(--sc-size-xs);
      }

      .menu-icon {
        color: var(--sc-disabled-text-color);
      }

      .menu-item {
        font-size: var(--sc-skolar-font-size-md);
        color: var(--sc-primary-text-color);
        --paper-item-selected-weight: 500;
        cursor: pointer;
      }

      .menu-item:hover {
        background-color: var(--sc-tertiary-background-color);
      }

      .menu-dropdown, .menu-listbox {
        font-size: var(--sc-skolar-font-size-md);
        --paper-input-container-focus-color: var(--sc-primary-accent-color);
        --paper-dropdown-menu-icon: {
          color: var(--sc-disabled-text-color);
        };
        --paper-dropdown-menu-input: {
          --paper-input-container-input-color: var(--sc-primary-text-color);
          --paper-input-container-color: var(--sc-secondary-text-color);
        };
        --paper-menu-button-dropdown: {
          box-shadow: var(--sc-shadow-elevation-8dp);
          background-color: var(--sc-secondary-background-color);
        };
        background-color: var(--sc-secondary-background-color);
        width: 200px;
      }

      .menu-listbox {
        --paper-input-container-focus-color: var(--sc-primary-accent-color);
        --paper-input-container-color: var(--sc-secondary-text-color);
        --paper-input-container-input-color: var(--sc-secondary-text-color);
        --paper-dropdown-menu-icon: {
          color: var(--sc-disabled-text-color);
        };
        background-color: var(--sc-secondary-background-color);
      }

      .menu-toggle-button {
        --paper-toggle-button-unchecked-bar-color: var(--sc-secondary-text-color);
        --paper-toggle-button-checked-bar-color: var(--sc-primary-accent-color-light);
        --paper-toggle-button-checked-button-color: var(--sc-primary-accent-color);
        --paper-toggle-button-checked-ink-color: var(--sc-primary-accent-color-dark);
        margin-top: var(--sc-size-md);
      }

      @media screen and (max-width: 769px) {
        #sides {
          display: none;
        }
      }

      .loading-indicator {
        font-size: var(--sc-skolar-font-size-s);
        width: 90%;
        display: flex;
        text-align: center;
        position: absolute;
        height: inherit;
        justify-content: center;
        align-items: center;
      }
    </style>

    <div class="paper-dialogue-container">
      <div class="loading-indicator">
        <sc-bouncing-loader ?active=${this.showLoadingSpinner}></sc-bouncing-loader>
      </div>

      <div class="dialog-section">
        <h3 class="menu-item-title">${this.localize('viewTextualInfo')}</h3>
        <div class="nerdy-row">${this.localize('displaysInfo')}</div>
        <paper-toggle-button id="textual_info_toggle_button" class="menu-toggle-button"
          ?active=${this.textualInfoToggleEnabled} ?checked=${this.textualInfoToggleEnabled}></paper-toggle-button>
      </div>

      <div class="dialog-section">
        <h3 class="menu-item-title">${this.localize('viewOriginal')}</h3>
        <div class="nerdy-row">${this.localize('onlyWorks')}</div>
        <paper-radio-group id="text_view_menu" selected="${this.selectedTextView}">
          <paper-radio-button name="none" class="menu-option">
            ${this.localize('none')}
          </paper-radio-button>
          <paper-radio-button id="sides" name="sidebyside" class="menu-option">
            <iron-icon class="menu-icon" icon="sc-iron-icons:view-column"></iron-icon>
            ${this.localize('sideBySide')}
          </paper-radio-button>
          <paper-radio-button name="linebyline" class="menu-option">
            <iron-icon class="menu-icon" icon="sc-iron-icons:view-headline"></iron-icon>
            ${this.localize('lineByLine')}
          </paper-radio-button>
          <paper-radio-button name="popup" class="menu-option">
            <iron-icon class="menu-icon" icon="sc-iron-icons:insert-comment"></iron-icon>
            ${this.localize('popUp')}
          </paper-radio-button>
        </paper-radio-group>
      </div>

      <div class="dialog-section">
        <h3 class="menu-item-title">${this.localize('activatePaliLookup')}</h3>
        <div class="nerdy-row">
          ${this.localize('activatePaliDescription')}
        </div>
        <paper-dropdown-menu class="menu-dropdown" label="${this.localize('lookup')}" id="pali_lookup_menu" vertical-align="auto">
          <paper-listbox class="menu-listbox" slot="dropdown-content" selected="${this.paliLookupSelected}">
            ${this.paliLookupTemplate}
          </paper-listbox>
        </paper-dropdown-menu>
      </div>

      <div class="dialog-section">
        <h3 class="menu-item-title">${this.localize('activateChineseLookup')}</h3>
        <div class="nerdy-row">
          ${this.localize('activateChineseDescription')}
        </div>
        <paper-dropdown-menu class="menu-dropdown" label="${this.localize('lookup')}" id="chinese_lookup_menu" vertical-align="auto">
          <paper-listbox class="menu-listbox" slot="dropdown-content" selected="${this.chineseLookupSelected}">
            ${this.chineseLookupTemplate}
          </paper-listbox>
        </paper-dropdown-menu>
      </div>

      <div class="dialog-section">
        <h3 class="menu-item-title">${this.localize('changePaliScript')}</h3>
        <div class="nerdy-row">${this.localize('changePaliScriptDescription')}</div>
        <paper-dropdown-menu class="menu-dropdown" label="${this.localize('changePaliScriptLabel')}" id="pali_script_menu" vertical-align="auto">
          <paper-listbox class="menu-listbox" slot="dropdown-content" selected="${this.paliScriptSelected}">
            ${this.paliScriptsTemplate}
          </paper-listbox>
        </paper-dropdown-menu>
      </div>

      <div class="dialog-section">
        <h3 class="menu-item-title">${this.localize('rememberSettings')}</h3>
        <div class="nerdy-row">${this.localize('rememberSettingsDescription')}</div>
        <paper-toggle-button id="remember_settings_button" class="menu-toggle-button" noink="" ?checked=${this.rememberSettings} ?active=${this.rememberSettings}></paper-toggle-button>
      </div>

    </div>

    <app-localstorage-document key="rememberTextSettings" .data="${this.rememberSettings}"></app-localstorage-document>`;
  }

  get paliLookupTemplate() {
    return this.paliLookupArray ? this.paliLookupArray.map(dictLanguage => html`
      <paper-item class="menu-item">${dictLanguage.language}</paper-item>
    `) : '';
  }

  get chineseLookupTemplate() {
    return this.chineseLookupArray ? this.chineseLookupArray.map(dictLanguage => html`
      <paper-item class="menu-item">${dictLanguage.language}</paper-item>
    `) : '';
  }

  get paliScriptsTemplate() {
    return this.paliScripts ? this.paliScripts.map(script => html`
      <paper-item class="menu-item">${script.language}</paper-item>
    `) : '';
  }

  static get properties() {
    return {
      // Selected type of view for segmented-text pages.
      selectedTextView: { type: String },
      paliLookupArray: { type: Array },
      paliLookupLanguage: { type: String },
      // pali to language lookup selected number.
      paliLookupSelected: { type: Number },
      // possible values for the chinese to language lookup.
      chineseLookupArray: { type: Array },
      chineseLookupLanguage: { type: String },
      // chinese to language lookup selected number.
      chineseLookupSelected: { type: Number },
      // possible values for the script chooser for pali.
      paliScripts: { type: Array },
      // pali script selected number.
      paliScriptSelected: { type: Number },
      paliScript: { type: String },
      // The state of the textual info paper-toggle-button
      textualInfoToggleEnabled: { type: Boolean },
      textualInfoResponse: { type: Object },
      textualParagraphs: { type: Object },
      // Boolean that remembers settings on this page.
      rememberSettings: { type: Boolean },
      showLoadingSpinner: { type: Boolean },
      paliSelectedItemChanged: { type: Boolean },
      chineseSelectedItemChanged: { type: Boolean },
      paliScriptItemChanged: { type: Boolean },
      textViewItemChanged: { type: Boolean },
      localizedStringsPath: { type: String }
    }
  }

  constructor() {
    super();
    let state = store.getState().textOptions;
    this.selectedTextView = state.segmentedSuttaTextView;
    this.paliLookupArray = [
      {
        'dict': 'none',
        'language': 'None'
      },
      {
        'dict': 'pli2en',
        'language': 'Pāli → English'
      },
      {
        'dict': 'pli2es',
        'language': 'Pāli → Español'
      },
      {
        'dict': 'pli2zh',
        'language': 'Pāli → 汉语'
      },
      {
        'dict': 'pli2pt',
        'language': 'Pāli → Português'
      },
      {
        'dict': 'pli2id',
        'language': 'Pāli → Bahasa Indonesia'
      },
      {
        'dict': 'pli2nl',
        'language': 'Pāli → Nederlands'
      }
    ];
    this.paliLookupLanguage = state.paliLookupTargetDictRepr;
    this.paliLookupSelected = this._findPaliLookupLanguageIndex(this.paliLookupLanguage);
    this.chineseLookupArray = [
      {
        'dict': 'none',
        'language': 'None'
      },
      {
        'dict': 'lzh2en',
        'language': '汉语 → English'
      }
    ];
    this.chineseLookupLanguage = state.chineseLookupTargetDictRepr;
    this.chineseLookupSelected = this._findChineseLookupLanguageIndex(this.chineseLookupLanguage);
    this.paliScripts = [
      {
        'script': 'latin',
        'language': 'Latin'
      },
      {
        'script': 'sinhala',
        'language': 'සිංහල'
      },
      {
        'script': 'devanagari',
        'language': 'नागरी'
      },
      {
        'script': 'thai',
        'language': 'ไทย'
      },
      {
        'script': 'myanmar',
        'language': 'မြန်မာဘာသာ'
      }
    ]
    this.paliScript = state.script;
    this.paliScriptSelected = this._findPaliScriptIndex(this.paliScript);
    this.textualInfoToggleEnabled = state.paragraphsEnabled;
    this.textualInfoResponse = {};
    this.textualParagraphs = state.paragraphDescriptions;
    this.rememberSettings = localStorage.getItem('rememberTextSettings') === 'true';
    this.showLoadingSpinner = false;
    this.paliSelectedItemChanged = false;
    this.chineseSelectedItemChanged = false;
    this.paliScriptItemChanged = false;
    this.textViewItemChanged = false;
    this.localizedStringsPath = '/localization/elements/sc-settings-menu';
  }

  get actions() {
    return {
      toggleTextualInfo(enabled) {
        store.dispatch({
          type: 'TOGGLE_TEXTUAL_INFORMATION_ENABLED',
          enabled: enabled
        })
      },
      downloadParagraphs(data) {
        store.dispatch({
          type: 'DOWNLOAD_PARAGRAPH_DESCRIPTIONS',
          descriptions: data
        })
      },
      chooseSegmentedSuttaTextView(view) {
        store.dispatch({
          type: 'CHOOSE_SEGMENTED_SUTTA_TEXT_VIEW',
          view: view
        })
      },
      choosePaliTextScript(script) {
        store.dispatch({
          type: 'CHOOSE_PALI_TEXT_SCRIPT',
          script: script
        })
      },
      activatePaliLookup(activated, targetLanguage, targetDictRepr) {
        store.dispatch({
          type: 'ACTIVATE_PALI_LOOKUP',
          paliLookupTargetLanguage: targetLanguage,
          paliLookupActivated: activated,
          paliLookupTargetDictRepr: targetDictRepr
        })
      },
      activateChineseLookup(activated, targetLanguage, targetDictRepr) {
        store.dispatch({
          type: 'ACTIVATE_CHINESE_LOOKUP',
          chineseLookupTargetLanguage: targetLanguage,
          chineseLookupActivated: activated,
          chineseLookupTargetDictRepr: targetDictRepr
        })
      }
    }
  }

  firstUpdated() {
    this.shadowRoot.querySelector('#textual_info_toggle_button').addEventListener('active-changed', (e) => {
      this._textualInfoToggleStateChanged(e.detail.value);
    });
    this.shadowRoot.querySelector('#text_view_menu').addEventListener('selected-item-changed', (e) => {
      this.selectedTextView = e.currentTarget.selected;
      this.textViewItemChanged = true;
    });
    this.shadowRoot.querySelector('#pali_lookup_menu').addEventListener('value-changed', (e) => {
      this._paliLookupChanged(e.detail.value);
    });
    this.shadowRoot.querySelector('#chinese_lookup_menu').addEventListener('value-changed', (e) => {
      this._chineseLookupChanged(e.detail.value);
    });
    this.shadowRoot.querySelector('#pali_lookup_menu').addEventListener('selected-item-changed', () => {
      this.paliSelectedItemChanged = true;
    });
    this.shadowRoot.querySelector('#chinese_lookup_menu').addEventListener('selected-item-changed', () => {
      this.chineseSelectedItemChanged = true;
    });
    this.shadowRoot.querySelector('#pali_script_menu').addEventListener('value-changed', (e) => {
      this._changeScript(e.detail.value);
    });
    this.shadowRoot.querySelector('#pali_script_menu').addEventListener('selected-item-changed', () => {
      this.paliScriptItemChanged = true;
    });
    this.shadowRoot.querySelector('#remember_settings_button').addEventListener('active-changed', (e) => {
      this._rememberSettingsChanged(e.detail.value);
    });
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('selectedTextView')) {
      this._textViewChanged();
    }
    if (changedProps.has('textualInfoResponse')) {
      this._onParagraphsLoaded();
    }
    if (changedProps.has('paliLookupLanguage')) {
      this.paliLookupSelected = this._findPaliLookupLanguageIndex(this.paliLookupLanguage);
    }
    if (changedProps.has('chineseLookupLanguage')) {
      this.chineseLookupSelected = this._findChineseLookupLanguageIndex(this.chineseLookupLanguage);
    }
    if (changedProps.has('paliScript')) {
      this.paliScriptSelected = this._findPaliScriptIndex(this.paliScript);
    }
  }

  _textualInfoToggleStateChanged(toggleChecked) {
    if (this.textualParagraphs) {
      if (toggleChecked) {
        this.showLoadingSpinner = true;
        fetch(this._getParagraphsUrl()).then(r => r.json()).then((response) => {
          this.textualInfoResponse = response;
          this.actions.toggleTextualInfo(true);
          this.showLoadingSpinner = false;
        });

        this._showToast(this.localize('textualInformationEnabled'));
      } else {
        this.actions.toggleTextualInfo(false);
        this._showToast(this.localize('textualInformationDisabled'));
      }
    }
  }

  _onParagraphsLoaded() {
    if (this.textualInfoResponse) {
      if (!this.textualInfoDescriptions || this.textualInfoDescriptions.length === 0) {
        this.actions.downloadParagraphs(this.textualInfoResponse);
      } else {
        this.actions.toggleTextualInfo(true);
      }
    }
  }

  _paliLookupChanged(lookupLanguage) {
    if (!lookupLanguage) {
      return;
    }
    const langIndex = this._findPaliLookupLanguageIndex(lookupLanguage);
    const target = this.paliLookupArray[langIndex];
    const targetLanguage = target.dict.split('2')[1];
    const targetDictRepr = target.language;
    if (this.paliSelectedItemChanged) {
      this._showLookupToast(targetDictRepr, 'pli');
      this.paliSelectedItemChanged = false;
    }
    this.actions.activatePaliLookup(!!(langIndex), targetLanguage, targetDictRepr);
  }

  _findPaliLookupLanguageIndex(languageName) {
    return this.paliLookupArray.findIndex(i => i.language === languageName);
  }

  _chineseLookupChanged(lookupLanguage) {
    if (!lookupLanguage) {
      return;
    }
    const langIndex = this._findChineseLookupLanguageIndex(lookupLanguage);
    const target = this.chineseLookupArray[langIndex];
    const targetLanguage = target.dict.split('2')[1];
    const targetDictRepr = target.language;
    if (this.chineseSelectedItemChanged) {
      this._showLookupToast(targetDictRepr, 'lzh');
      this.chineseSelectedItemChanged = false;
    }
    this.actions.activateChineseLookup(!!(langIndex), targetLanguage, targetDictRepr);
  }

  _findChineseLookupLanguageIndex(languageName) {
    return this.chineseLookupArray.findIndex(i => i.language === languageName);
  }

  _textViewChanged() {
    this.showLoadingSpinner = true;
    if (this.textViewItemChanged) {
      if (this.selectedTextView !== 'none') {
        let textViewMessage = '';
        switch (this.selectedTextView) {
          case 'sidebyside':
            textViewMessage = this.localize('sideBySide');
            break;
          case 'linebyline':
            textViewMessage = this.localize('lineByLine');
            break;
          case 'popup':
            textViewMessage = this.localize('popUp');
            break;
        }
        this._showToast(this.localizeEx('textViewEnabled', 'textView', textViewMessage));
      } else {
        this._showToast(this.localize('textViewDisabled'));
      }
      this.textViewItemChanged = false;
    }
    setTimeout(() => {
      this.actions.chooseSegmentedSuttaTextView(this.selectedTextView);
      this.showLoadingSpinner = false;
    }, 0);
  }

  // Fires the choice of pali script to sc-page-selector.html and from there to the segmented text pages.
  _changeScript(language) {
    if (!language) {
      return;
    }
    if (this.paliScriptItemChanged) {
      const scriptChangeMessage = this.localizeEx('scriptChanged', 'paliScript', language);
      this._showToast(scriptChangeMessage);
      this.paliScriptItemChanged = false;
    }
    const script = this.paliScripts.find(i => i.language === language).script;
    this.showLoadingSpinner = true;
    setTimeout(() => {
      this.actions.choosePaliTextScript(script);
      this.showLoadingSpinner = false;
    }, 0);
  }

  _getParagraphsUrl() {
    return `${API_ROOT}/paragraphs`;
  }

  _findPaliScriptIndex(paliScript) {
    return this.paliScripts.findIndex(i => i.script === paliScript);
  }

  _rememberSettingsChanged(setting) {
    if (setting) {
      localStorage.setItem('rememberTextSettings', 'true');
      this._showToast(this.localize('rememberSettingsEnabled'));
    } else {
      localStorage.setItem('rememberTextSettings', 'false');
      this._showToast(this.localize('rememberSettingsDisabled'));
    }
  }

  _showLookupToast(dictName, lang) {
    if (dictName !== 'None') {
      const dictChangeMessage = this.localizeEx('lookupDictionaryEnabled', 'lookupDictionary', dictName);
      this._showToast(dictChangeMessage);
    } else {
      if (lang === 'pli') {
        this._showToast(this.localize('paliLookupDictionaryDisabled'));
      } else {
        this._showToast(this.localize('chineseLookupDictionaryDisabled'));
      }
    }
  }

  _showToast(inputMessage) {
    this.dispatchEvent(new CustomEvent('show-sc-toast', {
      detail: {
        toastType: 'info',
        message: inputMessage
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('sc-settings-menu', SCSettingsMenu);
