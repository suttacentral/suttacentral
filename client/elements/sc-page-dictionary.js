import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { API_ROOT } from '../constants.js';
import { dictStyles } from './styles/sc-dict-styles.js';
import { icons } from '../img/sc-icons';

import { LitLocalized } from './addons/localization-mixin'

class SCPageDictionary extends LitLocalized(LitElement) {
  render() {
    return html`
    ${dictStyles}
    <style>
      .dictionary-results-container {
        
      }

      .dictionary-results-main {
        max-width: 720px;
        margin: 0 auto;
      }

      @media (max-width: 740px) {
        .dictionary-results-main {
          padding: 0 5%;
        }
      }

      .dictionary-results-head {
        display: flex;
        justify-content: space-between;
        padding: 0;
        margin-bottom:
      }

      h1 {
        font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-h1-md);
    font-weight: 400;
    line-height: 40px;
        color: var(--sc-secondary-text-color);
        display: inline-block;
        margin: 0 0 0 -2px;
      }

      .dictionary-results-term {
        font-family: var(--sc-serif-font);
        font-weight: bold;
        color: var(--sc-primary-accent-color);
      }

      .related-terms {

        }

      .related-terms ul {
        margin: 0;
        display: block;
        list-style: none;
        padding: 0;
      }

      .related-terms h3 {
        margin: 1em 0 0 0;
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        color: var(--sc-secondary-text-color);
        font-weight: bold;
      }

      .dictionary-entries {
        padding: var(--sc-size-xl) 0 var(--sc-size-md);
      }

      .related-terms li {
        padding: 0;
    margin: 0.5rem 1rem 0 0;
    display: inline-block;
    

      }

      .related-terms a {
        color: var(--sc-primary-accent-color);        
        text-decoration: none;
        display: inline-block;
        border-radius: 4px;
        border-bottom: 4px solid rgba(0,0,0,0);
      }

      .related-terms a:hover{
        
        text-decoration: underline;
        color: var(--sc-primary-color);
      }

      .related-terms i {
        color: var(--sc-secondary-text-color);
      }

      .dictionary-source {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: 400;
        line-height: 20px;
        color: var(--sc-secondary-text-color);
        margin: var(--sc-size-sm) 0 var(--sc-size-md);
        font-weight: bold;
        font-family: var(--sc-serif-font);
      }

      .dictionary-book-entry {
        border-bottom: var(--sc-border);
      }

      #drawer {
        --app-drawer-content-container: {
          overflow-y: scroll;
          background-color: var(--sc-secondary-background-color);
        }
      }

      .selected-terms-item > a {
          color: var(--sc-primary-color);
          font-weight: bold
      }
      .selected-terms-item > a:hover{
        text-decoration: none;
        cursor: default;
      }
    </style>

    <div class="dictionary-results-container">
      <main class="dictionary-results-main">
        <div class="dictionary-results-head">
          <h1><span class="dictionary-results-description">${this.localize('definitionsFor')}</span> <span class="dictionary-results-term">${this.dictionaryWord}</span></h1>
        </div>
        <div class="dictionary-entries">
          ${this.dictionaryEntriesTemplate}
        </div>

   
          <div class="related-terms">
            <h3>${this.localize('adjacentTerms')}</h3>
            <ul class="near-terms">
              ${this.dictionaryAdjacentTemplate}
            </ul>
            <h3>${this.localize('similarSpelling')}</h3>
            <ul class="fuzzy-terms">
              ${this.dictionarySimilarTemplate}
            </ul>
          </div>
   

      </main>
    </div>
    ${this._createMetaData()}
    `;
  }

  get dictionarySimilarTemplate() {
    return html`
      ${this.dictionarySimilar ? this.dictionarySimilar.map(dicSimilarItem => html`
        <li class="${this._calculateClass(dicSimilarItem.glossWord)}">${unsafeHTML(dicSimilarItem.glossText)}</li>
      `) : ''}
    `;
  }

  get dictionaryAdjacentTemplate() {
    return html`
      ${this.dictionaryAdjacent ? this.dictionaryAdjacent.map(dicAdjacentItem => html`
        <li class="${this._calculateClass(dicAdjacentItem.glossWord)}">${unsafeHTML(dicAdjacentItem.glossText)}</li>
      `) : ''}
    `;
  }

  get dictionaryEntriesTemplate() {
    return html`
      ${this.dictionaryResults ? this.dictionaryResults.map(dicItem => html`
        <div class="dictionary-book-entry">
          <div class="dictionary-source">${this._getDictionaryTitle(dicItem.dictname)}</div>
          <div class="dictionary-text">${unsafeHTML(dicItem.text)}</div>
        </div>
      `) : ''}
    `;
  }

  static get properties() {
    return {
      dictionaryResults: { type: Array },
      dictionaryReturns: { type: Array },
      glossaryReturns: { type: Array },
      adjacentReturns: { type: Array },
      similarReturns: { type: Array },
      dictionaryWord: { type: String },
      localizedStringsPath: { type: String },
      dictionaryTitles: { type: Object },
      adjacent: { type: Boolean },
      dictionaryAdjacent: { type: Array },
      dictionarySimilar: { type: Array },
    }
  }

  constructor() {
    super();
    this.dictionaryResults = [];
    this.dictionaryReturns = [];
    this.glossaryReturns = [];
    this.adjacentReturns = [];
    this.similarReturns = [];
    this.dictionaryWord = '';
    this.localizedStringsPath = '/localization/elements/sc-page-dictionary';
    this.dictionaryTitles = {
      'ncped': 'New Concise Pali English Dictionary',
      'cped': 'Concise Pali English Dictionary',
      'dhammika': 'Nature and the Environment in Early Buddhism by S. Dhammika',
      'dppn': 'Dictionary of Pali Proper Names',
      'pts': 'PTS Pali English Dictionary'
    };
    this.adjacent = true;
    this.dictionaryAdjacent = [];
    this.dictionarySimilar = [];
  }

  firstUpdated() {
    this._fetchGlossary();
    this._loadNewResult();
  }

  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('dictionaryWord')) {
      this._loadNewResult();
    }
    if (changedProps.has('glossaryReturns') || changedProps.has('similarReturns')) {
      this._getGlossaryItems(this.glossaryReturns, this.similarReturns);
    }
    if (changedProps.has('glossaryReturns') || changedProps.has('similarReturns') || changedProps.has('adjacent') ) {
      this._getGlossaryItems(this.glossaryReturns, this.adjacentReturns, this.adjacent);
    }
  }

  async _fetchGlossary() {
    this.glossaryReturns = await (await fetch('/api/glossary')).json();
  }

  async _fetchDictionary() {
    fetch(this._computeUrl()).then(r => r.json()).then((response) => {
      this.dictionaryReturns = response;
      this._didRespond();
    });
  }

  async _fetchAdjacent() {
    this.adjacentReturns = await (await fetch(this._computeAdjacentUrl())).json();
  }

  async _fetchSimilar() {
    this.similarReturns = await (await fetch(this._computeSimilarUrl())).json();
  }

  _computeUrl() {
    return `${API_ROOT}/dictionary_full/${this.dictionaryWord}`;
  }

  _loadNewResult() {
    this._loadAdjacent();
    this._loadSimilar();
    this._fetchDictionary();
  }

  _didRespond() {
    let dictsUsed = {};
    let finalResults = [];
    for (let key in this.dictionaryTitles) {
      dictsUsed = this._sortDictionaryResults(key);
      if (dictsUsed) {
        finalResults.push(dictsUsed);
      }
    }
    this.dictionaryResults = finalResults;
  }

  _sortDictionaryResults(dictionary) {
    for (let item in this.dictionaryReturns) {
      if (this.dictionaryReturns[item].dictname == dictionary) {
        return this.dictionaryReturns[item];
      }
    }
  }

  _getDictionaryTitle(dictname) {
    return this.dictionaryTitles[dictname];
  }

  // Adding Adjacent Terms
  _computeAdjacentUrl() {
    return `${API_ROOT}/dictionary_full/adjacent/${this.dictionaryWord}`;
  }

  _loadAdjacent() {
    this._fetchAdjacent();
  }

  // Adding Similar Terms
  _computeSimilarUrl() {
    return `${API_ROOT}/dictionary_full/similar/${this.dictionaryWord}`;
  }

  _loadSimilar() {
    this._fetchSimilar();
  }

  // Calculating if the current item is selected
  _calculateClass(item) {
    return (item === this.dictionaryWord) ? 'selected-terms-item' : '';
  }

  _getGlossaryItems(glossaryReturns, inputArray, adjacent = false) {
    if (inputArray) {
      let glossary = [];
      let glossaryObject = {};
      let glossText = '';
      if (glossaryReturns) {
        for (let glossWord in inputArray[0]) {
          let glossLookup = inputArray[0][glossWord];
          glossText = `<a href="/define/${glossLookup}">${glossLookup}`;
          if (glossaryReturns[0][glossLookup]) {
            glossText += `<i> (${glossaryReturns[0][glossLookup]})</i></a>`
          }
          glossaryObject = { "glossWord": glossLookup, "glossText": glossText };
          glossary.push(glossaryObject);
        }
        if (adjacent) {
          return this.dictionaryAdjacent = glossary;
        } else {
          return this.dictionarySimilar = glossary;
        }
      }
    }
  }

  // toggles the drawer on the right to show the related/similar items.
  _toggleDrawer() {
    this.shadowRoot.getElementById('drawer').toggle();
  }

  _createMetaData() {
    if (!this.localize) return;
    const description = this.localize('metaDescriptionText');
    const dictionaryResultsText = this.localize('dictionaryResultsText');
    const defineFor = this.localize('definitionsFor');

    document.dispatchEvent(new CustomEvent('metadata', {
      detail: {
        pageTitle: `${defineFor}: ${this.dictionaryWord}`,
        title: `${dictionaryResultsText} ${this.dictionaryWord}`,
        description: description,
        bubbles: true,
        composed: true
      }
    }));
  }
}

customElements.define('sc-page-dictionary', SCPageDictionary);