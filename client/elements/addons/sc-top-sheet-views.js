import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import '@material/web/radio/radio';
import '@material/web/checkbox/checkbox';

import { scriptIdentifiers, paliScriptsStyles } from './sc-aksharamukha-converter';
import { store } from '../../redux-store';
import { LitLocalized } from './sc-localization-mixin';
import { API_ROOT } from '../../constants';
import { ignorableKeydownEvent } from '../sc-keyboard-shortcuts';

const DEFAULT_REFERENCE_OPTION = [
  {
    name: 'None',
    edition_set: 'none',
    checked: false,
  },
  {
    name: 'Main',
    edition_set: 'main',
    checked: false,
  },
];

export class SCTopSheetViews extends LitLocalized(LitElement) {
  static properties = {
    selectedTextView: { type: String },
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
    references: { type: Array },
    noteDisplayTypeArray: { type: Array },
    textViewArray: { type: Array },
  };

  static styles = [
    paliScriptsStyles,
    css`
      :host {
        display: none;
      }

      section {
        font-family: var(--sc-sans-font);

        position: absolute;

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

        color: var(--sc-on-primary-primary-text-color);
        border: 1px solid var(--sc-border-color);
        border-radius: 8px;
        background-color: var(--sc-tertiary-background-color);
        box-shadow: var(--sc-shadow-elevation-4dp);
      }

      summary {
        font-weight: 600;

        padding: 8px;

        cursor: pointer;

        color: var(--sc-on-primary-primary-text-color);
        outline-color: var(--sc-border-color);

        align-items: baseline;
      }

      summary::marker {
        color: var(--sc-icon-color);
      }

      summary::-webkit-details-marker {
        display: none;
      }

      label {
        display: block;
        margin-top: 24px;
        margin-left: 15px;
      }

      .two-column {
        margin-right: 8px;

        column-count: 2;
      }

      .four-column {
        margin-right: 8px;

        column-count: 4;
      }

      md-checkbox,
      md-radio {
        --md-sys-color-primary: var(--sc-primary-accent-color);
        --md-sys-color-on-primary: white;
      }

      md-radio {
        --md-radio-icon-color: var(--sc-opposite-background-color);
        --md-radio-selected-icon-color: var(--sc-primary-accent-color);
        --md-radio-hover-icon-color: var(--sc-primary-accent-color);
        --md-radio-focus-icon-color: var(--sc-primary-accent-color);
        --md-radio-pressed-icon-color: var(--sc-primary-accent-color);
      }

      section::-webkit-scrollbar {
        height: 10px;
      }

      section::-webkit-scrollbar-track {
        background: #ccc;
      }

      section::-webkit-scrollbar-thumb {
        background: var(--sc-icon-color);
      }

      select {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-font-size-sm);
        color: var(--sc-on-primary-primary-text-color);
        padding: 8px;
        width: 100%;
        margin: 4px 0 0 0;
        border: 2px solid var(--sc-border-color);
        border-radius: var(--sc-size-sm);
        background-color: var(--sc-secondary-background-color);
      }

      label {
        color: var(--sc-on-tertiary-primary-text-color);
      }
      
      kbd {
        padding: 3px 6px 2px;
        background-color: gray;
        color: white;
        border-radius: 3px;
        margin: 5px;
      }
    `,
  ];

  constructor() {
    super();
    const { textOptions } = store.getState();
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
    this.references = [];
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
    this.localizedStringsPath = '/localization/elements/viewoption';
    this.selectedNoteDisplayType = textOptions.noteDisplayType;
    this.showHighlighting = textOptions.showHighlighting;
    this.displayedReferences = textOptions.displayedReferences;
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.selectedTextView !== state.textOptions.segmentedSuttaTextView) {
      this.selectedTextView = state.textOptions.segmentedSuttaTextView;
    }
    if (this.paliScript !== state.textOptions.script) {
      this.paliScript = state.textOptions.script;
      this.#setPaliScriptSelected();
    }
    const currentReferences = this.buildReferences(this.displayedReferences);
    const incomingReferences = this.buildReferences(state.textOptions.displayedReferences);
    if (currentReferences !== incomingReferences) {
      this.displayedReferences = state.textOptions.displayedReferences;
      if (this.displayedReferences?.length) {
        this.references.forEach(ref => {
          ref.checked = false;
        });
        this.displayedReferences.forEach(edition_set => {
          const reference = this.references.find(
            reference => reference.edition_set === edition_set
          );
          if (reference) {
            reference.checked = true;
          }
        });
      } else {
        const defaultDisplayedReference = this.references.find(
          reference => reference.edition_set === 'none'
        );
        defaultDisplayedReference.checked = true;
      }
      this.requestUpdate();
    }
    if (this.selectedNoteDisplayType !== state.textOptions.noteDisplayType) {
      this.selectedNoteDisplayType = state.textOptions.noteDisplayType;
    }
    if (this.showHighlighting !== state.textOptions.showHighlighting) {
      this.showHighlighting = state.textOptions.showHighlighting;
    }
  }

  buildReferences(refs) {
    return Array.isArray(refs) ? refs.reduce((acc, editionSet) => acc + editionSet, '') : '';
  }

  _loadScToasts() {
    const scSiteLayout = document.querySelector('sc-site-layout');
    const scToasts = scSiteLayout?.querySelector('sc-toasts');
    if (!scToasts) {
      import('./sc-toasts');
      const newScToasts = document.createElement('sc-toasts');
      scSiteLayout.appendChild(newScToasts);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadScToasts();
    this._fetchReferenceDisplayType();
  }

  // This componenet is _never_ disconnected the way the code is written today (2024-08-04)
  // Still, adding this in case some day this component is properly unloaded.
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeydown);
  }

  _handleKeydown(event) {
    if(ignorableKeydownEvent(event)) return;
    let idx = -1;
    switch (event.key) {
      case 'n':
      case 'N':
        idx = this.noteDisplayTypeArray.findIndex(item => item.displayType === this.selectedNoteDisplayType);
        if (idx >= 0) {
          idx = (idx + 1) % this.noteDisplayTypeArray.length;
          this.#setTextBilaraPageIsTextOptionsMismatchSavedSettingsState();
          this.changeNoteDisplayType(this.noteDisplayTypeArray[idx].displayType);
        }
        break;
      case 'v':
      case 'V':
        idx = this.textViewArray.findIndex(item => item.textView === this.selectedTextView);
        if (idx >= 0) {
          idx = (idx + 1) % this.textViewArray.length;
          this.#setTextBilaraPageIsTextOptionsMismatchSavedSettingsState();
          this._changeTextView(this.textViewArray[idx].textView);
        }
        break;
    }
  }

  _fetchReferenceDisplayType() {
    fetch(`${API_ROOT}/pali_reference_edition`)
      .then(r => r.json())
      .then(data => {
        this.references = DEFAULT_REFERENCE_OPTION.concat(data).map(item => {
          return item.checked ? item : { ...item, checked: false };
        });
        const {
          textOptions: { displayedReferences },
        } = store.getState();
        if (displayedReferences?.length) {
          displayedReferences.forEach(edition_set => {
            const reference = this.references.find(
              reference => reference.edition_set === edition_set
            );
            if (reference) reference.checked = true;
          });
        } else {
          const defaultDisplayedReference = this.references.find(
            reference => reference.edition_set === 'none'
          );
          defaultDisplayedReference.checked = true;
        }

        this.actions.setDisplayedReferences(
          this.references.filter(({ checked }) => checked).map(({ edition_set }) => edition_set)
        );
      })
      .catch(e => console.error(e));
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
              <summary>
                ${this.localize('viewoption:viewRoot')}
                <kbd>V</kbd>
              </summary>
              <p>${unsafeHTML(this.localize('viewoption:textViewDescription'))}</p>
            </details>
            <div class="form-controls">
              ${this.textViewArray.map(
                item => html`
                  <label>
                    <md-radio
                      name="textView"
                      value=${item.textView}
                      data-type=${item.textViewLabel}
                      ?checked=${this.selectedTextView === item.textView}
                      @change=${this._onTextViewChanged}
                    ></md-radio>
                    ${this.localize(`viewoption:${item.textViewLabel}`)}
                  </label>
                `
              )}
            </div>
          </div>
        `
      : '';
  }

  _onTextViewChanged(e) {
    this._changeTextView(e.target.value);
  }

  _changeTextView(newTextView) {
    this.selectedTextView = newTextView;
    this.actions.chooseSegmentedSuttaTextView(newTextView);
    const newType = this.textViewArray.find(item => item.textView === newTextView).textViewLabel;
    this._showToast(
      this.localizeEx(
        'viewoption:textViewEnabled',
        'textView',
        this.localize(`viewoption:${newType}`)
      )
    );
  }

  get noteDisplayTypeTemplate() {
    return this.noteDisplayTypeArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('viewoption:noteSummary')} <kbd>N</kbd></summary>
              <p>${unsafeHTML(this.localize('viewoption:noteDescription'))}</p>
            </details>
            <div class="form-controls">
              ${this.noteDisplayTypeArray.map(
                ({ displayType, displayTypeLabel }, i) => html`
                  <label for="radioNoteDisplayType${i}">
                    <md-radio
                      id="radioNoteDisplayType${i}"
                      name="noteDisplayType"
                      value=${displayType}
                      data-type=${displayTypeLabel}
                      ?checked=${this.selectedNoteDisplayType === displayType}
                      @change=${this._onNoteDisplayTypeChanged}
                    ></md-radio>
                    ${this.localize(`viewoption:${displayType}`)}
                  </label>
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
              <summary>${this.localize('viewoption:activatePaliLookup')}</summary>
              <p>${this.localize('viewoption:activatePaliDescription')}</p>
            </details>
            <div class="form-controls two-column">
              ${this.paliLookupArray.map(
                dictLanguage => html`
                  <label>
                    <md-radio
                      name="paliLookup"
                      value=${dictLanguage.dict}
                      data-language=${dictLanguage.language}
                      ?checked=${this.paliLookupLanguage === dictLanguage.language}
                      @change=${this._onPaliLookupChanged}
                    ></md-radio>
                    ${dictLanguage.language === 'None' ? this.localize('viewoption:none') : dictLanguage.language}
                  </label>
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
    const isActive = this.paliLookupLanguage !== 'None';
    this.actions.activatePaliLookup(isActive, targetLanguage, this.paliLookupLanguage);

    if (isActive) {
      const dictChangeMessage = this.localizeEx(
        'viewoption:lookupDictionaryEnabled',
        'lookupDictionary',
        this.paliLookupLanguage
      );
      this._showToast(dictChangeMessage);
    } else {
      this._showToast(this.localize('viewoption:paliLookupDictionaryDisabled'));
    }
  }

  get chineseLookupTemplate() {
    return this.chineseLookupArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('viewoption:activateChineseLookup')}</summary>
              <p>${this.localize('viewoption:activateChineseDescription')}</p>
            </details>
            <div class="form-controls">
              ${this.chineseLookupArray.map(
                dictLanguage => html`
                  <label>
                    <md-radio
                      name="chineseLookup"
                      value=${dictLanguage.dict}
                      data-language=${dictLanguage.language}
                      ?checked=${this.chineseLookupLanguage === dictLanguage.language}
                      @change=${this._onChineseLookupChanged}
                    ></md-radio>
                    ${dictLanguage.language === 'None' ? this.localize('viewoption:none') : dictLanguage.language}
                  </label>
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
    const isActive = this.chineseLookupLanguage !== 'None';
    this.actions.activateChineseLookup(isActive, targetLanguage, this.chineseLookupLanguage);

    if (isActive) {
      const dictChangeMessage = this.localizeEx(
        'viewoption:lookupDictionaryEnabled',
        'lookupDictionary',
        this.chineseLookupLanguage
      );
      this._showToast(dictChangeMessage);
    } else {
      this._showToast(this.localize('viewoption:chineseLookupDictionaryDisabled'));
    }
  }

  get paliScriptsTemplate() {
    return scriptIdentifiers.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('viewoption:changePaliScript')}</summary>
              <p>${this.localize('viewoption:changePaliScriptDescription')}</p>
            </details>
            <div class="form-controls">
              <select id="selPaliScripts">
                ${scriptIdentifiers.map(
                  script => html`
                    <option value=${script.script}>
                      ${script.language}
                    </option>
                  `
                )}
              </select>
            </div>
          </div>
        `
      : '';
  }

  _onPaliScriptChanged(e) {
    const scTopsheetViews = document.querySelector('sc-site-layout').querySelector('#setting_menu');
    const selectedScript = scriptIdentifiers[e.currentTarget.selectedIndex].script;
    const selectedLanguage = scriptIdentifiers[e.currentTarget.selectedIndex].language;
    const selPaliScriptsElement = scTopsheetViews.shadowRoot.querySelector('#selPaliScripts');
    selPaliScriptsElement.classList.remove(...this.classList);
    selPaliScriptsElement.classList.add(`${selectedScript.toLowerCase()}-script`);
    scTopsheetViews.actions.choosePaliTextScript(selectedScript);
    const scriptChangeMessage = scTopsheetViews.localizeEx(
      'viewoption:scriptChanged',
      'paliScript',
      selectedLanguage
    );
    scTopsheetViews._showToast(scriptChangeMessage);
  }

  get referenceDisplayTypeTemplate() {
    const nameMapping = {
      'Main': this.localize('viewoption:referenceDisplayTypeMain'),
      'None': this.localize('viewoption:referenceDisplayTypeNone')
    };

    return this.references.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('viewoption:reference')}</summary>
              <p>${this.localize('viewoption:referenceDescription')}</p>
            </details>
            <div class="form-controls four-column">
              ${this.references.map(
                item => html`
                  <label>
                    <md-checkbox
                      name=${item.edition_set}
                      value=${item.edition_set}
                      data-type=${item.name}
                      ?checked=${item.checked}
                      @change=${this._onReferenceDisplayTypeChanged}
                    ></md-checkbox>
                    ${nameMapping[item.name] || item.name}
                  </label>
                `
              )}
            </div>
          </div>
        `
      : '';
  }

  _onReferenceDisplayTypeChanged({ target: { checked, value: selectedReferenceDisplayType } }) {
    const selectedReference = this.references.find(
      reference => reference.edition_set === selectedReferenceDisplayType
    );
    selectedReference.checked = checked;
    if (selectedReference.edition_set === 'none' && selectedReference.checked) {
      this.references = this.references.map(item =>
        item.edition_set === 'none' ? item : { ...item, checked: false }
      );
    } else if (this.references.find(reference => reference.edition_set === 'none').checked) {
      this.references = this.references.map(item =>
        item.edition_set !== 'none' ? item : { ...item, checked: false }
      );
    }
    this.requestUpdate();
    const references = this.references.filter(({ checked }) => checked).map(({ edition_set }) => edition_set);
    if (references.length === 0 || (references.length === 1 && references[0] === 'none')) {
      this._showToast(this.localize('viewoption:allRefsDisabled'));
    }
    if (references.length === this.references.length - 1) {
      this._showToast(this.localize('viewoption:allRefsEnabled'));
    }
    if(selectedReferenceDisplayType === 'main') {
      if (checked) {
        this._showToast(this.localize('viewoption:mainRefsEnabled'));
      } else {
        this._showToast(this.localize('viewoption:mainRefsDisabled'));
      }
    }
    this.actions.setDisplayedReferences(references);
  }

  get showHighlightingTemplate() {
    return html`
      <div class="tools">
        <details>
          <summary>${this.localize('viewoption:showHighlighting')}</summary>
          <p>${this.localize('viewoption:showHighlightingDescription')}</p>
        </details>
        <div class="form-controls">
          <label>
            <md-checkbox
              ?checked=${this.showHighlighting}
              @change=${this._onShowHighlightingChanged}
            ></md-checkbox>
            ${this.localize('viewoption:showHighlightingTitle')}
          </label>
        </div>
      </div>
    `;
  }

  _onShowHighlightingChanged(e) {
    this.actions.setShowHighlighting(e.target.checked);
    const msg = e.target.checked ? 'showHighlightingEnabled' : 'showHighlightingDisabled';
    this._showToast(this.localize(`viewoption:${msg}`));
  }

  _onNoteDisplayTypeChanged(e) {
    this.changeNoteDisplayType(e.target.value);
  }

  changeNoteDisplayType(selectedNoteDisplayType) {
    this.selectedNoteDisplayType = selectedNoteDisplayType;
    this.actions.setNoteDisplayType(this.selectedNoteDisplayType);
    this._showToast(this.localize('viewoption:noteDisplayTypeToast' + 
      this.selectedNoteDisplayType.charAt(0).toUpperCase() + this.selectedNoteDisplayType.slice(1)
    ));
  }

  show() {
    this.style.display = 'block';
    this.#setTextBilaraPageIsTextOptionsMismatchSavedSettingsState();
  }

  #setTextBilaraPageIsTextOptionsMismatchSavedSettingsState() {
    const textBilara = document.querySelector('sc-text-bilara');
    if (textBilara) {
      textBilara.shouldRestoreUserSettings = true;
    }
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
          enabled,
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
          view,
        });
      },
      choosePaliTextScript(script) {
        store.dispatch({
          type: 'CHOOSE_PALI_TEXT_SCRIPT',
          script,
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
          showHighlighting,
        });
      },
      setDisplayedReferences(displayedReferences) {
        store.dispatch({
          type: 'SET_REFERENCE_DISPLAY_TYPE_ARRAY',
          displayedReferences,
        });
      },
    };
  }

  firstUpdated() {
    this.shadowRoot
      .querySelector('#selPaliScripts')
      .addEventListener('change', this._onPaliScriptChanged);
    this.#setPaliScriptSelected();
    document.addEventListener('keydown', this._handleKeydown.bind(this));
  }

  #setPaliScriptSelected() {
    const paliScriptSelect = this.shadowRoot.querySelector('#selPaliScripts');
    if (!paliScriptSelect) {
      return;
    }
    for (const option of paliScriptSelect.options) {
      if (option.value === this.paliScript) {
        option.selected = true;
        break;
      }
    }
  }
}

customElements.define('sc-top-sheet-views', SCTopSheetViews);
