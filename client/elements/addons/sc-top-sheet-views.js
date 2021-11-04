import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import '@material/mwc-formfield';
import '@material/mwc-radio';
import '@material/mwc-checkbox';
import '@material/mwc-list/mwc-list-item';

import { scriptIdentifiers, paliScriptsStyles } from './sc-aksharamukha-converter';

import { store } from '../../redux-store';
import { LitLocalized } from './sc-localization-mixin';
import { API_ROOT } from '../../constants';

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

class SCTopSheetViews extends LitLocalized(LitElement) {
  static get properties() {
    return {
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
  }

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
    this.localizedStringsPath = '/localization/elements/interface';
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
          if (reference) reference.checked = true;
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

  static get styles() {
    return [
      paliScriptsStyles,
      css`
        :host {
          display: none;

          --mdc-theme-secondary: var(--sc-primary-accent-color);
          --mdc-typography-font-family: var(--sc-sans-font);
          --mdc-theme-text-primary-on-background: var(--sc-primary-text-color);
          --mdc-typography-body2-font-weight: 500;
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

          color: var(--sc-primary-text-color);
          border: 1px solid var(--sc-border-color);
          border-radius: 8px;
          background-color: var(--sc-tertiary-background-color);
          box-shadow: var(--sc-shadow-elevation-4dp);
        }

        summary {
          font-weight: 600;

          padding: 8px;

          cursor: pointer;

          color: var(--sc-primary-text-color);
          outline-color: var(--sc-border-color);

          align-items: baseline;
        }

        summary::marker {
          color: var(--sc-icon-color);
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

        mwc-checkbox {
          --mdc-checkbox-unchecked-color: var(--sc-icon-color);
        }

        mwc-radio {
          --mdc-radio-unchecked-color: var(--sc-icon-color);
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
          border: 2px solid var(--sc-border-color);
          border-radius: var(--sc-size-sm);
          background-color: var(--sc-secondary-background-color);
        }
      `,
    ];
  }

  _loadScToasts() {
    const scSiteLayout = document.querySelector('sc-site-layout');
    const scToasts = scSiteLayout?.shadowRoot.querySelector('sc-toasts');
    if (!scToasts) {
      import('../addons/sc-toasts');
      const newScToasts = document.createElement('sc-toasts');
      scSiteLayout.shadowRoot.appendChild(newScToasts);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadScToasts();
    this._fetchReferenceDisplayType();
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
              <summary>${this.localize('dictionary:viewRoot')}</summary>
              <p>${unsafeHTML(this.localize('dictionary:textViewDescription'))}</p>
            </details>
            <div class="form-controls">
              ${this.textViewArray.map(
                item => html`
                  <mwc-formfield label="${this.localize(`dictionary:${item.textViewLabel}`)}">
                    <mwc-radio
                      name="textView"
                      value="${item.textView}"
                      data-type="${item.textViewLabel}"
                      ?checked="${this.selectedTextView === item.textView}"
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
      this.localizeEx(
        'dictionary:textViewEnabled',
        'textView',
        this.localize(`dictionary:${e.target.dataset.type}`)
      )
    );
  }

  get noteDisplayTypeTemplate() {
    return this.noteDisplayTypeArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('dictionary:noteSummary')}</summary>
              <p>${unsafeHTML(this.localize('dictionary:noteDescription'))}</p>
            </details>
            <div class="form-controls">
              ${this.noteDisplayTypeArray.map(
                ({ displayType, displayTypeLabel }) => html`
                  <mwc-formfield label="${this.localize(`dictionary:${displayType}`)}">
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
              <summary>${this.localize('dictionary:activatePaliLookup')}</summary>
              <p>${this.localize('dictionary:activatePaliDescription')}</p>
            </details>
            <div class="form-controls two-column">
              ${this.paliLookupArray.map(
                dictLanguage => html`
                  <mwc-formfield label="${dictLanguage.language}">
                    <mwc-radio
                      name="paliLookup"
                      value="${dictLanguage.dict}"
                      data-language="${dictLanguage.language}"
                      ?checked="${this.paliLookupLanguage === dictLanguage.language}"
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
    const isActive = this.paliLookupLanguage !== 'None';
    this.actions.activatePaliLookup(isActive, targetLanguage, this.paliLookupLanguage);

    if (isActive) {
      const dictChangeMessage = this.localizeEx(
        'dictionary:lookupDictionaryEnabled',
        'lookupDictionary',
        this.paliLookupLanguage
      );
      this._showToast(dictChangeMessage);
    } else {
      this._showToast(this.localize('dictionary:paliLookupDictionaryDisabled'));
    }
  }

  get chineseLookupTemplate() {
    return this.chineseLookupArray.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('dictionary:activateChineseLookup')}</summary>
              <p>${this.localize('dictionary:activateChineseDescription')}</p>
            </details>
            <div class="form-controls">
              ${this.chineseLookupArray.map(
                dictLanguage => html`
                  <mwc-formfield label="${dictLanguage.language}">
                    <mwc-radio
                      name="chineseLookup"
                      value="${dictLanguage.dict}"
                      data-language="${dictLanguage.language}"
                      ?checked="${this.chineseLookupLanguage === dictLanguage.language}"
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
    const isActive = this.chineseLookupLanguage !== 'None';
    this.actions.activateChineseLookup(isActive, targetLanguage, this.chineseLookupLanguage);

    if (isActive) {
      const dictChangeMessage = this.localizeEx(
        'dictionary:lookupDictionaryEnabled',
        'lookupDictionary',
        this.chineseLookupLanguage
      );
      this._showToast(dictChangeMessage);
    } else {
      this._showToast(this.localize('dictionary:chineseLookupDictionaryDisabled'));
    }
  }

  get paliScriptsTemplate() {
    return scriptIdentifiers.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('dictionary:changePaliScript')}</summary>
              <p>${this.localize('dictionary:changePaliScriptDescription')}</p>
            </details>
            <div class="form-controls">
              <select id="selPaliScripts">
                ${scriptIdentifiers.map(
                  script => html`
                    <option value="${script.script}" title="${script.language}">
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
    const scTopsheetViews = document
      .querySelector('sc-site-layout')
      .shadowRoot.querySelector('#setting_menu');
    const selectedScript = scriptIdentifiers[e.currentTarget.selectedIndex].script;
    const selPaliScriptsElement = scTopsheetViews.shadowRoot.querySelector('#selPaliScripts');
    selPaliScriptsElement.classList.remove(...this.classList);
    selPaliScriptsElement.classList.add(`${selectedScript.toLowerCase()}-script`);
    scTopsheetViews.actions.choosePaliTextScript(selectedScript);
    const scriptChangeMessage = scTopsheetViews.localizeEx(
      'dictionary:scriptChanged',
      'paliScript',
      selectedScript
    );
    scTopsheetViews._showToast(scriptChangeMessage);
  }

  get referenceDisplayTypeTemplate() {
    return this.references.length
      ? html`
          <div class="tools">
            <details>
              <summary>${this.localize('dictionary:reference')}</summary>
              <p>${this.localize('dictionary:referenceDescription')}</p>
            </details>
            <div class="form-controls four-column">
              ${this.references.map(
                item => html`
                  <mwc-formfield label="${item.name}">
                    <mwc-checkbox
                      name="${item.edition_set}"
                      value="${item.edition_set}"
                      data-type="${item.name}"
                      ?checked="${item.checked}"
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
    this.actions.setDisplayedReferences(
      this.references.filter(({ checked }) => checked).map(({ edition_set }) => edition_set)
    );
  }

  get showHighlightingTemplate() {
    return html`
      <div class="tools">
        <details>
          <summary>${this.localize('dictionary:showHighlighting')}</summary>
          <p>${this.localize('dictionary:showHighlightingDescription')}</p>
        </details>
        <div class="form-controls">
          <mwc-formfield label="Show Highlighting">
            <mwc-checkbox
              ?checked="${this.showHighlighting}"
              @change="${this._onShowHighlightingChanged}"
            ></mwc-checkbox>
          </mwc-formfield>
        </div>
      </div>
    `;
  }

  _onShowHighlightingChanged(e) {
    this.actions.setShowHighlighting(e.target.checked);
    const msg = e.target.checked ? 'showHighlightingEnabled' : 'showHighlightingDisabled';
    this._showToast(this.localize(`dictionary:${msg}`));
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
      setDisplayedReferences(displayedReferences) {
        store.dispatch({
          type: 'SET_REFERENCE_DISPLAY_TYPE_ARRAY',
          displayedReferences: displayedReferences,
        });
      },
    };
  }

  firstUpdated() {
    this.shadowRoot
      .querySelector('#selPaliScripts')
      .addEventListener('change', this._onPaliScriptChanged);
    this.#setPaliScriptSelected();
  }

  #setPaliScriptSelected() {
    const paliScriptSelect = this.shadowRoot.querySelector('#selPaliScripts');
    for (const option of paliScriptSelect?.options) {
      if (option.value === this.paliScript) {
        option.selected = true;
        break;
      }
    }
  }
}

customElements.define('sc-top-sheet-views', SCTopSheetViews);
