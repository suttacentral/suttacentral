import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import '@material/mwc-formfield';
import '@material/mwc-radio';
import '@material/mwc-checkbox';
import '@material/mwc-switch';
import '@material/mwc-list/mwc-list-item';

import '../addons/sc-toasts';

import { scriptIdentifiers } from './sc-aksharamukha-converter';

import { store } from '../../redux-store';
import { LitLocalized } from './localization-mixin';

class SCTopSheetViews extends LitLocalized(LitElement) {
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
        dict: 'none',
        language: 'None',
      },
      {
        dict: 'pli2en',
        language: 'English',
      },
      {
        dict: 'pli2es',
        language: 'Español',
      },
      {
        dict: 'pli2zh',
        language: '汉语',
      },
      {
        dict: 'pli2pt',
        language: 'Português',
      },
      {
        dict: 'pli2id',
        language: 'Indonesia',
      },
      {
        dict: 'pli2nl',
        language: 'Nederlands',
      },
    ];
    this.paliLookupLanguage = textOptions.paliLookupTargetDictRepr;
    this.chineseLookupArray = [
      {
        dict: 'none',
        language: 'None',
      },
      {
        dict: 'lzh2en',
        language: '汉语 → English',
      },
    ];
    this.chineseLookupLanguage = textOptions.chineseLookupTargetDictRepr;
    this.referenceDisplayTypeArray = [
      {
        displayTypeLabel: 'None',
        displayType: 'none',
      },
      {
        displayTypeLabel: 'Main',
        displayType: 'main',
      },
      {
        displayTypeLabel: 'ms',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'pts',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'vri',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'mr',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'si',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'km',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'lv',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'maku',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'ndp',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'cck',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'sya',
        displayType: 'all',
      },
      {
        displayTypeLabel: 'bj',
        displayType: 'all',
      },
    ];
    this.noteDisplayTypeArray = [
      {
        displayTypeLabel: 'None',
        displayType: 'none',
      },
      {
        displayTypeLabel: 'Asterisk',
        displayType: 'asterisk',
      },
      {
        displayTypeLabel: 'Sidenotes',
        displayType: 'sidenotes',
      },
    ];
    this.textViewArray = [
      {
        textViewLabel: 'plain',
        textView: 'plain',
      },
      {
        textViewLabel: 'sideBySide',
        textView: 'sidebyside',
      },
      {
        textViewLabel: 'lineByLine',
        textView: 'linebyline',
      },
    ];
    this.paliScript = textOptions.script;
    this.textualInfoToggleEnabled = textOptions.paragraphsEnabled;
    this.textualInfoResponse = {};
    this.textualParagraphs = textOptions.paragraphDescriptions;
    this.localizedStringsPath = '/localization/elements/sc-top-sheet';
    this.selectedReferenceDisplayType = textOptions.referenceDisplayType;
    this.selectedNoteDisplayType = textOptions.noteDisplayType;
    this.showHighlighting = textOptions.showHighlighting;
  }

  static get styles() {
    return css`
      :host {
        display: none;

        --mdc-theme-secondary: var(--sc-primary-accent-color);
        --mdc-typography-font-family: var(--sc-sans-font);
        --mdc-theme-text-primary-on-background: var(--sc-primary-text-color);
      }

      section {
        font-family: var(--sc-sans-font);

        position: absolute;
        z-index: 1000;

        display: grid;
        overflow-x: scroll;
        overflow-y: none;

        width: 100%;
        padding: 0;

        border-bottom: 1px solid #ccc;
        background-color: var(--sc-secondary-background-color);
        box-shadow: var(--sc-shadow-elevation-4dp);

        grid-template-columns: 240px 240px 360px 240px 240px 240px 780px 360px;
      }

      .tools {
        padding: 8px;

        border-right: 1px solid var(--sc-border-color);
      }

      .tools:first-of-type {
        margin-left: 8px;
      }

      .tools:last-of-type {
        border-right: none;
      }

      details {
        position: relative;

        box-sizing: border-box;
        margin: 0 0 0 4px;
      }

      details p {
        position: absolute;
        z-index: 10;

        max-width: 360px;
        margin: 4px 0 0 0;
        padding: 8px 12px;

        color: var(--sc-primary-text-color);
        border: 1px solid var(--sc-border-color);
        border-radius: 8px;
        background-color: var(--sc-tertiary-background-color);
        box-shadow: var(--sc-shadow-elevation-4dp);
      }

      summary {
        font-weight: 600;

        display: flex;

        padding: 8px;

        cursor: pointer;

        color: var(--sc-primary-text-color);
        outline-color: var(--sc-border-color);

        align-items: baseline;
      }

      summary::-webkit-details-marker {
        color: var(--sc-disabled-text-color);
      }

      mwc-formfield {
        display: block;
      }

      .two-column {
        margin-right: 8px;

        column-count: 2;
      }

      .four-column {
        margin-right: 8px;

        column-count: 4;
      }

      mwc-switch {
        padding: 12px;

        --mdc-theme-surface: var(--sc-tertiary-background-color);
      }

      mwc-checkbox {
        --mdc-checkbox-unchecked-color: var(--sc-disabled-text-color);
      }

      mwc-radio {
        --mdc-radio-unchecked-color: var(--sc-disabled-text-color);
      }

      section::-webkit-scrollbar {
        height: 10px;
      }

      section::-webkit-scrollbar-track {
        background: #ccc;
      }

      section::-webkit-scrollbar-thumb {
        background: var(--sc-disabled-text-color);
      }

      mwc-button {
        --mdc-theme-primary: var(--sc-primary-color);
        --mdc-theme-on-primary: white;
      }

select {
  font-family: var(--sc-sans-font);
  font-size: var(--sc-skolar-font-size-sm);
  color: var(--sc-primary-text-color);
  padding: 8px;
  width: 100%;
  margin: 4px 0 0 0;
  border: 1px solid var(--sc-border-color);
  border-radius: var(--sc-size-sm);
  background-color: var(--sc-primary-background-color);
}


    `;
  }

  render() {
    return html`
      <section>
        ${this.noteDisplayTypeTemplate} ${this.textViewTemplate} ${this.paliLookupTemplate}
        ${this.chineseLookupTemplate} ${this.paliScriptsTemplate} ${this.showHighlightingTemplate}
        ${this.referenceDisplayTypeTemplate}
      </section>
    `;
  }

  get textViewTemplate() {
    return this.textViewArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('viewRoot')}</summary>
              <p>${unsafeHTML(this.localize('textViewDescription'))}</p>
            </details>
            <div class="form-controls">
              ${this.textViewArray.map(
                item => html`
                  <mwc-formfield label="${this.localize(item.textViewLabel)}">
                    <mwc-radio
                      name="textView"
                      value="${item.textView}"
                      data-type="${item.textViewLabel}"
                      ?checked="${this.selectedTextView === item.textView ? true : false}"
                      @change="${this._onTextViewChanged}"
                    ></mwc-radio>
                  </mwc-formfield>
                `
              )}
            </div>
          </div>
        `
      : '';
  }

  _onTextViewChanged(e) {
    this.selectedTextView = e.target.value;
    this.actions.chooseSegmentedSuttaTextView(this.selectedTextView);
    this._showToast(
      this.localizeEx('textViewEnabled', 'textView', this.localize(e.target.dataset.type))
    );
  }

  get noteDisplayTypeTemplate() {
    return this.noteDisplayTypeArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('noteSummary')}</summary>
              <p>${unsafeHTML(this.localize('noteDescription'))}</p>
            </details>
            <div class="form-controls">
              ${this.noteDisplayTypeArray.map(
                ({ displayType, displayTypeLabel }) => html`
                  <mwc-formfield label="${this.localize(displayType)}">
                    <mwc-radio
                      name="noteDisplayType"
                      value="${displayType}"
                      data-type="${displayTypeLabel}"
                      ?checked="${this.selectedNoteDisplayType === displayType}"
                      @change="${this._onNoteDisplayTypeChanged}"
                    ></mwc-radio>
                  </mwc-formfield>
                `
              )}
            </div>
          </div>
        `
      : '';
  }

  get paliLookupTemplate() {
    return this.paliLookupArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('activatePaliLookup')}</summary>
              <p>${this.localize('activatePaliDescription')}</p>
            </details>
            <div class="form-controls two-column">
              ${this.paliLookupArray.map(
                dictLanguage => html`
                  <mwc-formfield label="${dictLanguage.language}">
                    <mwc-radio
                      name="paliLookup"
                      value="${dictLanguage.dict}"
                      data-language="${dictLanguage.language}"
                      ?checked="${this.paliLookupLanguage === dictLanguage.language ? true : false}"
                      @change="${this._onPaliLookupChanged}"
                    ></mwc-radio>
                  </mwc-formfield>
                `
              )}
            </div>
          </div>
        `
      : '';
  }

  _onPaliLookupChanged(e) {
    this.paliLookupLanguage = e.target.dataset.language;
    const targetLanguage = e.target.value.split('2')[1];
    let isActive = this.paliLookupLanguage !== 'None';
    this.actions.activatePaliLookup(isActive, targetLanguage, this.paliLookupLanguage);

    if (isActive) {
      const dictChangeMessage = this.localizeEx(
        'lookupDictionaryEnabled',
        'lookupDictionary',
        this.paliLookupLanguage
      );
      this._showToast(dictChangeMessage);
    } else {
      this._showToast(this.localize('paliLookupDictionaryDisabled'));
    }
  }

  get chineseLookupTemplate() {
    return this.chineseLookupArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('activateChineseLookup')}</summary>
              <p>${this.localize('activateChineseDescription')}</p>
            </details>
            <div class="form-controls">
              ${this.chineseLookupArray.map(
                dictLanguage => html`
                  <mwc-formfield label="${dictLanguage.language}">
                    <mwc-radio
                      name="chineseLookup"
                      value="${dictLanguage.dict}"
                      data-language="${dictLanguage.language}"
                      ?checked="${this.chineseLookupLanguage === dictLanguage.language
                        ? true
                        : false}"
                      @change="${this._onChineseLookupChanged}"
                    ></mwc-radio>
                  </mwc-formfield>
                `
              )}
            </div>
          </div>
        `
      : '';
  }

  _onChineseLookupChanged(e) {
    this.chineseLookupLanguage = e.target.dataset.language;
    const targetLanguage = e.target.value.split('2')[1];
    let isActive = this.chineseLookupLanguage !== 'None';
    this.actions.activateChineseLookup(isActive, targetLanguage, this.chineseLookupLanguage);

    if (isActive) {
      const dictChangeMessage = this.localizeEx(
        'lookupDictionaryEnabled',
        'lookupDictionary',
        this.chineseLookupLanguage
      );
      this._showToast(dictChangeMessage);
    } else {
      this._showToast(this.localize('chineseLookupDictionaryDisabled'));
    }
  }

  get paliScriptsTemplate() {
    return scriptIdentifiers.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('changePaliScript')}</summary>
              <p>${this.localize('changePaliScriptDescription')}</p>
            </details>
            <div class="form-controls">
              <select @selected="${this._onPaliScriptChanged}">
                ${scriptIdentifiers.map(
                  script => html`
                    <option value="${script.language}">${script.language}</option>
                  `
                )}
              </select>
            </div>
          </div>
        `
      : '';
  }

  _onPaliScriptChanged(e) {
    console.log(scriptIdentifiers[e.detail.index].script);
    this.actions.choosePaliTextScript(scriptIdentifiers[e.detail.index].script);
    const scriptChangeMessage = this.localizeEx(
      'scriptChanged',
      'paliScript',
      scriptIdentifiers[e.detail.index].script
    );
    this._showToast(scriptChangeMessage);
  }

  get referenceDisplayTypeTemplate() {
    return this.referenceDisplayTypeArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('reference')}</summary>
              <p>${this.localize('referenceDescription')}</p>
            </details>
            <div class="form-controls four-column">
              ${this.referenceDisplayTypeArray.map(
                item => html`
                  <mwc-formfield
                    label="${this.localize(`referenceDisplayType_${item.displayTypeLabel}`)}"
                  >
                    <mwc-checkbox
                      name="referenceDisplayType"
                      value="${item.displayType}"
                      data-type="${item.displayTypeLabel}"
                      ?checked="${this.selectedReferenceDisplayType === item.displayType
                        ? true
                        : false}"
                      @change="${this._onReferenceDisplayTypeChanged}"
                    ></mwc-checkbox>
                  </mwc-formfield>
                `
              )}
            </div>
          </div>
        `
      : '';
  }

  _onReferenceDisplayTypeChanged(e) {
    this.selectedReferenceDisplayType = e.target.checked ? e.target.value : 'none';
    this.actions.setReferenceDisplayType(this.selectedReferenceDisplayType);
    if (this.selectedReferenceDisplayType === 'none') {
      this._showToast(this.localize('textualInformationDisabled'));
    } else {
      let refType = e.target.dataset.type.toLowerCase() === 'main' ? 'Main' : 'All';
      this._showToast(
        this.localize(`referenceDisplayType_${refType}`) +
          ' ' +
          this.localize('textualInformationEnabled')
      );
    }
  }

  get showHighlightingTemplate() {
    return html`
      <div class="tools">
        <details>
          <summary>${this.localize('showHighlighting')}</summary>
          <p>${this.localize('showHighlightingDescription')}</p>
        </details>
        <div class="form-controls">
          <mwc-switch
            ?checked="${this.showHighlighting}"
            @change="${this._onShowHighlightingChanged}"
          ></mwc-switch>
        </div>
      </div>
    `;
  }

  _onShowHighlightingChanged(e) {
    this.showHighlighting = e.target.checked;
    this.actions.setShowHighlighting(e.target.checked);
    let msg = this.showHighlighting ? 'showHighlightingEnabled' : 'showHighlightingDisabled';
    this._showToast(this.localize(msg));
  }

  _onNoteDisplayTypeChanged(e) {
    this.selectedNoteDisplayType = e.target.value;
    this.actions.setNoteDisplayType(this.selectedNoteDisplayType);
  }

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
  }

  _showToast(inputMessage) {
    this.dispatchEvent(
      new CustomEvent('show-sc-toast', {
        detail: {
          toastType: 'info',
          message: inputMessage,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  get actions() {
    return {
      toggleTextualInfo(enabled) {
        store.dispatch({
          type: 'TOGGLE_TEXTUAL_INFORMATION_ENABLED',
          enabled: enabled,
        });
      },
      downloadParagraphs(data) {
        store.dispatch({
          type: 'DOWNLOAD_PARAGRAPH_DESCRIPTIONS',
          descriptions: data,
        });
      },
      chooseSegmentedSuttaTextView(view) {
        store.dispatch({
          type: 'CHOOSE_SEGMENTED_SUTTA_TEXT_VIEW',
          view: view,
        });
      },
      choosePaliTextScript(script) {
        store.dispatch({
          type: 'CHOOSE_PALI_TEXT_SCRIPT',
          script: script,
        });
      },
      activatePaliLookup(activated, targetLanguage, targetDictRepr) {
        store.dispatch({
          type: 'ACTIVATE_PALI_LOOKUP',
          paliLookupTargetLanguage: targetLanguage,
          paliLookupActivated: activated,
          paliLookupTargetDictRepr: targetDictRepr,
        });
      },
      activateChineseLookup(activated, targetLanguage, targetDictRepr) {
        store.dispatch({
          type: 'ACTIVATE_CHINESE_LOOKUP',
          chineseLookupTargetLanguage: targetLanguage,
          chineseLookupActivated: activated,
          chineseLookupTargetDictRepr: targetDictRepr,
        });
      },
      setReferenceDisplayType(displayType) {
        store.dispatch({
          type: 'SET_REFERENCE_DISPLAY_TYPE',
          referenceDisplayType: displayType,
        });
      },
      setNoteDisplayType(displayType) {
        store.dispatch({
          type: 'SET_NOTE_DISPLAY_TYPE',
          noteDisplayType: displayType,
        });
      },
      setShowHighlighting(showHighlighting) {
        store.dispatch({
          type: 'SET_SHOW_HIGHLIGHTING',
          showHighlighting: showHighlighting,
        });
      },
    };
  }
}

customElements.define('sc-top-sheet-views', SCTopSheetViews);
