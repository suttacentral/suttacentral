import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import '@material/mwc-formfield';
import '@material/mwc-radio';
import '@material/mwc-checkbox';
import '@material/mwc-switch';
import '@material/mwc-button';

import '../addons/sc-bouncing-loader';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin'

class SCTopSheet extends LitLocalized(LitElement) {

  static get properties() {
    return {
      selectedTextView: { type: String },
      selectedReferenceDisplayType: { type: String },
      selectedNoteDisplayType: { type: String },
      paliLookupArray: { type: Array },
      paliLookupLanguage: { type: String },
      chineseLookupArray: { type: Array },
      chineseLookupLanguage: { type: String },
      paliScripts: { type: Array },
      paliScript: { type: String },
      textualInfoToggleEnabled: { type: Boolean },
      textualInfoResponse: { type: Object },
      textualParagraphs: { type: Object },
      rememberSettings: { type: Boolean },
      localizedStringsPath: { type: String },
      referenceDisplayTypeArray: { type: Array },
      noteDisplayTypeArray: { type: Array },
      textViewArray: { type: Array },
    };
  }

  constructor() {
    super();
    let textOptions = store.getState().textOptions;
    this.selectedTextView = textOptions.segmentedSuttaTextView;
    this.paliLookupArray = [
      {
        'dict': 'none',
        'language': 'None'
      },
      {
        'dict': 'pli2en',
        'language': 'English'
      },
      {
        'dict': 'pli2es',
        'language': 'Español'
      },
      {
        'dict': 'pli2zh',
        'language': '汉语'
      },
      {
        'dict': 'pli2pt',
        'language': 'Português'
      },
      {
        'dict': 'pli2id',
        'language': 'Indonesia'
      },
      {
        'dict': 'pli2nl',
        'language': 'Nederlands'
      }
    ];
    this.paliLookupLanguage = textOptions.paliLookupTargetDictRepr;    
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
    this.chineseLookupLanguage = textOptions.chineseLookupTargetDictRepr;
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
    ];
    this.referenceDisplayTypeArray = [
      {
        'displayTypeLabel': 'None',
        'displayType': 'none'
      },
      {
        'displayTypeLabel': 'Main',
        'displayType': 'main'
      },
      {
        'displayTypeLabel': 'ms',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'pts',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'vri',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'mr',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'si',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'km',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'lv',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'maku',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'ndp',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'cck',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'sya',
        'displayType': 'all'
      },
      {
        'displayTypeLabel': 'bj',
        'displayType': 'all'
      },
    ];
    this.noteDisplayTypeArray = [
      {
        'displayTypeLabel': 'None',
        'displayType': 'none'
      },
      {
        'displayTypeLabel': 'Asterisk',
        'displayType': 'asterisk'
      },
      {
        'displayTypeLabel': 'Sidenotes',
        'displayType': 'sidenotes'
      },
    ];
    this.textViewArray = [
      {
        'textViewLabel': 'plain',
        'textView': 'plain'
      },
      {
        'textViewLabel': 'sideBySide',
        'textView': 'sidebyside'
      },
      {
        'textViewLabel': 'lineByLine',
        'textView': 'linebyline'
      },
    ];
    this.paliScript = textOptions.script;
    this.textualInfoToggleEnabled = textOptions.paragraphsEnabled;
    this.textualInfoResponse = {};
    this.textualParagraphs = textOptions.paragraphDescriptions;
    this.rememberSettings = localStorage.getItem('rememberTextSettings') === 'true';
    this.localizedStringsPath = '/localization/elements/sc-top-sheet';
    this.selectedReferenceDisplayType = textOptions.referenceDisplayType;
    this.selectedNoteDisplayType = textOptions.noteDisplayType;
    this.showHighlighting = textOptions.showHighlighting;
  }

  static get styles() {
    return css`
      :host {
        display: none;
        --mdc-theme-secondary: var(--sc-primary-color);
        --mdc-typography-font-family: var(--sc-sans-font);
        --mdc-theme-text-primary-on-background: var(--sc-primary-text-color);
        --mdc-radio-unchecked-color: var(--sc-disabled-text-color);
      }

      section {
        border-bottom: 1px solid #ccc;
        width: 100%;
        display: grid;
        grid-template-columns: 360px 360px 360px 360px 360px 720px 360px;
        height: 260px;
        overflow-y: scroll;
        overflow-x: scroll;
        padding: 16px 16px 8px 16px;
        z-index: 1000;
        font-family: var(--sc-sans-font);
        position: absolute;
        box-shadow: var(--sc-shadow-elevation-4dp)
      }

      .tools {
        padding: 8px;
        position: relative;
      }

      details{
        background-color: var(--sc-secondary-background-color);
        position: absolute;
        margin: 0 0 0.5em 0;
        padding: 8px;
        border-radius: 2px;
        z-index: 10;
        box-sizing: border-box;
      }

      details[open]{
        width: 340px;
        box-shadow: var(--sc-shadow-elevation-8dp);
        border: 1px solid var(--sc-border-color);
      }

      details p {
        padding: 8px;
        margin: 0.5em 0 0 0;
        color: var(--sc-secondary-text-color);
      }

      summary{
        font-weight: 600;
        cursor: pointer;
      }

      .form-controls{
        margin-top: 48px;
      }

      .two-column{
        column-count: 2;
        margin-right: 48px;
      }

      .three-column{
        column-count: 3;
        margin-right: 48px;
      }
      mwc-formfield{
      	height: 36px;
      }

      section::-webkit-scrollbar {
        height: 10px;
      }
      
      section::-webkit-scrollbar-track {
        background: #ccc;
      }
      
      section::-webkit-scrollbar-thumb {
        background: var(--sc-primary-color);
      }
    `;
  }

  render() {
    return html`
      <style>
        :host {
          --mdc-theme-secondary: var(--sc-primary-color);
        }

        section {
          background-color: var(--sc-secondary-background-color);
        }

        mwc-formfield {
          line-height: 2;
          color: var(--sc-tertiary-text-color);
          display: block
        }
      </style>
      <div class="container">
        <section>
          ${this.noteDisplayTypeTemplate}
          ${this.textViewTemplate}
          ${this.paliLookupTemplate}
          ${this.chineseLookupTemplate}
          ${this.paliScriptsTemplate}
          ${this.showHighlightingTemplate}
          ${this.referenceDisplayTypeTemplate}
          ${this.rememberSettingsTemplate}
        </section>
      </div>
    `;
  }
  
  get textViewTemplate() {
    return this.textViewArray.length ? html`
      <div class="tools">
        <details><summary>${this.localize('viewOriginal')}</summary>
        <p>${unsafeHTML(this.localize('textViewDescription'))}</p></details>
        <div class="form-controls">
          ${this.textViewArray.map(item => html`
            <mwc-formfield label="${this.localize(item.textViewLabel)}">
              <mwc-radio
                name="textView"
                value="${item.textView}"
                ?checked="${this.selectedTextView === item.textView ? true : false}"
                @change="${this._onTextViewChanged}">
              </mwc-radio>
            </mwc-formfield>
          `)}
        </div></div>` : '';
  }

  get paliLookupTemplate() {
    return this.paliLookupArray.length ? html` 
      <div class="tools">
        <details><summary>${this.localize('activatePaliLookup')}</summary>
        <p>${this.localize('activatePaliDescription')}</p></details>
        <div class="form-controls two-column">
          ${this.paliLookupArray.map(dictLanguage => html`
            <mwc-formfield label="${dictLanguage.language}">
              <mwc-radio 
                name="paliLookup"
                value="${dictLanguage.dict}"
                data-language="${dictLanguage.language}"
                ?checked="${this.paliLookupLanguage === dictLanguage.language ? true : false}"
                @change="${this._onPaliLookupChanged}">
              </mwc-radio>
            </mwc-formfield>
          `)}
        </div></div>` : '';
  }

  get chineseLookupTemplate() {
    return this.chineseLookupArray.length ? html`
      <div class="tools">
        <details><summary>${this.localize('activateChineseLookup')}</summary>
        <p>${this.localize('activateChineseDescription')}</p></details>
        <div class="form-controls">
          ${this.chineseLookupArray.map(dictLanguage => html`
            <mwc-formfield label="${dictLanguage.language}">
              <mwc-radio 
                name="chineseLookup" 
                value="${dictLanguage.dict}" 
                data-language="${dictLanguage.language}"
                ?checked="${this.chineseLookupLanguage === dictLanguage.language ? true : false}"
                @change="${this._onChineseLookupChanged}">
              </mwc-radio>
            </mwc-formfield>
          `)}
        </div></div>` : '';
  }

  get paliScriptsTemplate() {
    return this.paliScripts.length ? html`
      <div class="tools">
        <details><summary>${this.localize('changePaliScript')}</summary>
        <p>${this.localize('changePaliScriptDescription')}</p></details>
        <div class="form-controls two-column">
          ${this.paliScripts.map(script => html`
            <mwc-formfield label="${script.language}">
              <mwc-radio 
                name="paliScript" 
                value="${script.script}" 
                data-language="${script.language}"
                ?checked="${this.paliScript === script.script ? true : false}"
                @change="${this._onPaliScriptChanged}">
              </mwc-radio>
            </mwc-formfield>
          `)}
        </div></div>` : '';
  }

    get referenceDisplayTypeTemplate() {
    return this.referenceDisplayTypeArray.length ? html`
      <div class="tools">
        <details><summary>${this.localize('reference')}</summary>
        <p>${this.localize('referenceDescription')}</p></details>
        <div class="form-controls three-column">
          ${this.referenceDisplayTypeArray.map(item => html`
            <mwc-formfield label="${this.localize(`referenceDisplayType_${item.displayTypeLabel}`)}">
              <mwc-checkbox
                name="referenceDisplayType"
                value="${item.displayType}"
                ?checked="${this.selectedReferenceDisplayType === item.displayType ? true : false}"
                @change="${this._onReferenceDisplayTypeChanged}">
              </mwc-checkbox>
            </mwc-formfield>
          `)}
        </div></div>` : '';
  }

  get rememberSettingsTemplate() {
    return html`
      <div class="tools">
        <details><summary>${this.localize('rememberSettings')}</summary>
        <p>Check this to remember your settings next session.</p></details>
        <div class="form-controls">
          <mwc-switch 
            ?checked="${this.rememberSettings}"
            @change="${this._onRememberSettingsChanged}">
          </mwc-switch>
        </div>
    `;
  }

  get showHighlightingTemplate() {
    return html`
        <div class="tools">
        <details><summary>${this.localize('showHighlighting')}</summary>
        <p>${this.localize('showHighlightingDescription')}</p></details>
        <div class="form-controls">
          <mwc-switch 
            ?checked="${this.showHighlighting}"
            @change="${this._onShowHighlightingChanged}">
          </mwc-switch>
        </div>
    `;
  }

  _onReferenceDisplayTypeChanged(e) {
    this.selectedReferenceDisplayType = e.target.value;
    this.actions.setReferenceDisplayType(this.selectedReferenceDisplayType);
  }

  _onNoteDisplayTypeChanged(e) {
    this.selectedNoteDisplayType = e.target.value;
    this.actions.setNoteDisplayType(this.selectedNoteDisplayType);
  }

  _onTextViewChanged(e) {
    this.selectedTextView = e.target.value;
    this.actions.chooseSegmentedSuttaTextView(this.selectedTextView);
  }

  _onPaliLookupChanged(e) {
    this.paliLookupLanguage = e.target.dataset.language;
    const targetLanguage = e.target.value.split('2')[1];
    let isActive = this.paliLookupLanguage !== 'None';
    this.actions.activatePaliLookup(isActive, targetLanguage, this.paliLookupLanguage);
  }

  _onChineseLookupChanged(e) {
    this.chineseLookupLanguage = e.target.dataset.language;
    const targetLanguage = e.target.value.split('2')[1];
    let isActive = this.chineseLookupLanguage !== 'None';
    this.actions.activateChineseLookup(isActive, targetLanguage, this.chineseLookupLanguage);
  }

  _onPaliScriptChanged(e) {
    this.paliScript = e.target.value;
    this.actions.choosePaliTextScript(e.target.value);
  }

  _onRememberSettingsChanged(e) {
    localStorage.setItem('rememberTextSettings', e.target.checked.toString());
  }

  _onShowHighlightingChanged(e) {
    this.showHighlighting = e.target.checked;
    this.actions.setShowHighlighting(e.target.checked);
  }

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
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
      },
      setReferenceDisplayType(displayType) {
        store.dispatch({
          type: 'SET_REFERENCE_DISPLAY_TYPE',
          referenceDisplayType: displayType
        })
      },
      setNoteDisplayType(displayType) {
        store.dispatch({
          type: 'SET_NOTE_DISPLAY_TYPE',
          noteDisplayType: displayType
        })
      },
      setShowHighlighting(showHighlighting) {
        store.dispatch({
          type: 'SET_SHOW_HIGHLIGHTING',
          showHighlighting: showHighlighting
        })
      }
    }
  }
}

customElements.define('sc-top-sheet', SCTopSheet);
