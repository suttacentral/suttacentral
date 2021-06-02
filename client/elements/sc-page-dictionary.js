import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { API_ROOT } from '../constants';
import { dictStyles } from './styles/sc-dict-styles';

import { LitLocalized } from './addons/sc-localization-mixin';
import { dictionarySimpleItemToHtml } from './sc-dictionary-common';
import { store } from '../redux-store';

class SCPageDictionary extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${dictStyles}

      .dictionary-results-container {
        margin: 0 0 var(--sc-size-xxl) 0;
      }

      .dictionary-results-main {
        max-width: 720px;
        margin: 0 auto;
      }

      .dictionary-results-head {
        display: flex;

        padding: 0;

        justify-content: space-between;
      }

      h1 {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-h1-md);
        font-weight: 400;
        line-height: 40px;

        display: inline-block;

        margin: 0 0 0 -2px;

        color: var(--sc-secondary-text-color);
      }

      .dictionary-results-term {
        font-family: var(--sc-serif-font);
        font-weight: bold;

        color: var(--sc-primary-accent-color);
      }

      .related-terms ul {
        display: block;

        margin: 0;
        padding: 0;

        list-style: none;
      }

      .related-terms h3 {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: bold;

        margin: 1em 0 0 0;

        color: var(--sc-secondary-text-color);
      }

      .dictionary-entries {
        margin: var(--sc-size-xl) 0 var(--sc-size-md);
      }

      .grammar {
        display: block;
        font-family: var(--sc-sans-font);

        color: var(--sc-secondary-text-color);

        font-style: italic;
      }

      .related-terms li {
        display: inline-block;

        margin: 0.5rem 1rem 0 0;
        padding: 0;
      }

      .related-terms a {
        display: inline-block;

        text-decoration: none;

        color: var(--sc-primary-accent-color);
        border-bottom: 4px solid rgba(0, 0, 0, 0);
        border-radius: 4px;

        transition: all 200ms ease;
      }

      .related-terms a:hover {
        text-decoration: underline;

        text-decoration-thickness: 0.15em;
        text-underline-offset: 0.06em;

        color: var(--sc-primary-color);

        transition: all 200ms ease;
      }

      .related-terms i {
        color: var(--sc-secondary-text-color);
      }

      .dictionary-source {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: 400;
        font-variant-caps: all-small-caps;
        letter-spacing: var(--sc-caps-letter-spacing);

        margin: var(--sc-size-md) 0;

        color: var(--sc-secondary-text-color);
      }

      .dictionary-book-entry {
        border-bottom: var(--sc-border);
      }

      .selected-terms-item > a {
        font-weight: bold;
      }

      .selected-terms-item > a:hover {
        cursor: default;
        text-decoration: none;
      }

      .dictionary-results-term,
      .selected-terms-item > a,
      .selected-terms-item > a:hover,
      dfn {
        background-color: var(--sc-primary-color-light-transparent);
        color: var(--sc-primary-color-darkest);
      }
    `;
  }

  _stateChanged(state) {
    super._stateChanged(state);
    this.dictionaryWord = state.currentRoute.params.word;
  }

  render() {
    return html`
      <div class="dictionary-results-container">
        <main class="dictionary-results-main">
          <div class="dictionary-results-head">
            <h1>
              <span class="dictionary-results-description"
                >${this.localize('dictionary:definitionsFor')}</span
              >
              <span class="dictionary-results-term">${this.dictionaryWord}</span>
            </h1>
          </div>

          <div class="dictionary-entries">${this.dictionaryEntriesTemplate}</div>

          <div class="related-terms">
            <h3>${this.localize('dictionary:adjacentTerms')}</h3>
            <ul class="near-terms">
              ${this.dictionaryAdjacentTemplate}
            </ul>
            <h3>${this.localize('dictionary:similarSpelling')}</h3>
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
      ${this.dictionarySimilar
        ? this.dictionarySimilar.map(
            dicSimilarItem => html`
              <li class="${this._calculateClass(dicSimilarItem.glossWord)}">
                ${unsafeHTML(dicSimilarItem.glossText)}
              </li>
            `
          )
        : ''}
    `;
  }

  get dictionaryAdjacentTemplate() {
    return html`
      ${this.dictionaryAdjacent
        ? this.dictionaryAdjacent.map(
            dicAdjacentItem => html`
              <li class="${this._calculateClass(dicAdjacentItem.glossWord)}">
                ${unsafeHTML(dicAdjacentItem.glossText)}
              </li>
            `
          )
        : ''}
    `;
  }

  get dictionaryEntriesTemplate() {
    return html`
      ${this.dictionaryResults
        ? this.dictionaryResults.map(
            dicItem => html`
              ${dicItem.text
                ? html`
                    <div class="dictionary-book-entry">
                      <div class="dictionary-source">
                        ${this._getDictionaryTitle(dicItem.dictname)}
                      </div>
                      <div class="dictionary-text">${unsafeHTML(dicItem.text)}</div>
                    </div>
                  `
                : ''}
            `
          )
        : ''}
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
    };
  }

  constructor() {
    super();
    this.dictionaryResults = [];
    this.dictionaryReturns = [];
    this.glossaryReturns = [];
    this.adjacentReturns = [];
    this.similarReturns = [];
    this.dictionaryWord = '';
    this.localizedStringsPath = '/localization/elements/interface';
    this.dictionaryTitles = {
      ncped: 'New Concise Pali English Dictionary',
      cped: 'Concise Pali English Dictionary',
      dhammika: 'Nature and the Environment in Early Buddhism by S. Dhammika',
      dppn: 'Dictionary of Pali Proper Names',
      pts: 'PTS Pali English Dictionary',
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
    if (
      changedProps.has('glossaryReturns') ||
      changedProps.has('similarReturns') ||
      changedProps.has('adjacent')
    ) {
      this._getGlossaryItems(this.glossaryReturns, this.adjacentReturns, this.adjacent);
    }
  }

  async _fetchGlossary() {
    this.glossaryReturns = await (await fetch('/api/glossary')).json();
  }

  async _fetchDictionary() {
    fetch(this._computeUrl())
      .then(r => r.json())
      .then(response => {
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
    return `${API_ROOT}/dictionary_full/${this.dictionaryWord}?language=${
      store.getState().siteLanguage || 'en'
    }`;
  }

  _loadNewResult() {
    this._loadAdjacent();
    this._loadSimilar();
    this._fetchDictionary();
  }

  _didRespond() {
    this.dictionaryReturns.forEach(dicItem => {
      if (!dicItem.text) {
        dicItem.text = dictionarySimpleItemToHtml(dicItem);
      }
    });

    let dictsUsed = {};
    const finalResults = [];
    for (let key in this.dictionaryTitles) {
      dictsUsed = this._sortDictionaryResults(key);
      if (dictsUsed) {
        finalResults.push(dictsUsed);
      }
    }
    this.dictionaryResults = finalResults;
  }

  _sortDictionaryResults(dictionary) {
    return this.dictionaryReturns.find(x => x.dictname === dictionary);
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
    return item === this.dictionaryWord ? 'selected-terms-item' : '';
  }

  _getGlossaryItems(glossaryReturns, inputArray, adjacent = false) {
    if (inputArray) {
      const glossary = [];
      let glossaryObject = {};
      let glossText = '';
      if (glossaryReturns) {
        for (let glossWord in inputArray[0]) {
          let glossLookup = inputArray[0][glossWord];
          glossText = `<a href="/define/${glossLookup}">${glossLookup}`;
          if (glossaryReturns[0][glossLookup]) {
            glossText += `<i> (${glossaryReturns[0][glossLookup]})</i></a>`;
          }
          glossaryObject = { glossWord: glossLookup, glossText: glossText };
          glossary.push(glossaryObject);
        }
        if (adjacent) {
          return (this.dictionaryAdjacent = glossary);
        } else {
          return (this.dictionarySimilar = glossary);
        }
      }
    }
  }

  _createMetaData() {
    if (!this.localize) return;
    const description = this.localize('dictionary:metaDescriptionText');
    const dictionaryResultsText = this.localize('dictionary:dictionaryResultsText');
    const defineFor = this.localize('dictionary:definitionsFor');

    document.dispatchEvent(
      new CustomEvent('metadata', {
        detail: {
          pageTitle: `${defineFor}: ${this.dictionaryWord}`,
          title: `${dictionaryResultsText} ${this.dictionaryWord}`,
          description: description,
          bubbles: true,
          composed: true,
        },
      })
    );
  }
}

customElements.define('sc-page-dictionary', SCPageDictionary);
