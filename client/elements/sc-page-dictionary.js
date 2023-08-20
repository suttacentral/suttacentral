import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { API_ROOT } from '../constants';
import { dictStyles } from './styles/sc-dict-styles';

import { LitLocalized } from './addons/sc-localization-mixin';
import { dictionarySimpleItemToHtml } from './sc-dictionary-common';
import { store } from '../redux-store';

import(
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  './sc-map.js'
);

export class SCPageDictionary extends LitLocalized(LitElement) {
  static properties = {
    dictionaryResults: { type: Array, state: true },
    dictionaryReturns: { type: Array, state: true },
    glossaryReturns: { type: Array, state: true },
    adjacentReturns: { type: Array, state: true },
    similarReturns: { type: Array, state: true },
    dictionaryWord: { type: String, state: true },
    localizedStringsPath: { type: String, state: true },
    dictionaryTitles: { type: Object, state: true },
    adjacent: { type: Boolean, state: true },
    dictionaryAdjacent: { type: Array, state: true },
    dictionarySimilar: { type: Array, state: true },
  };

  constructor() {
    super();
    this.dictionaryResults = [];
    this.dictionaryReturns = [];
    this.glossaryReturns = [];
    this.adjacentReturns = [];
    this.similarReturns = [];
    this.dictionaryWord = store.getState().currentRoute.params.word;
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
    this._fetchGlossary();
    if (this.dictionaryWord) {
      this._loadNewResult();
    }
  }

  static styles = css`
    ${dictStyles}

    .dictionary-results-container {
      margin: 0 3vw var(--sc-size-xxl) 3vw;
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

      font-weight: 400;

      display: inline-block;

      margin: 0 0 0 -2px;

      color: var(--sc-on-primary-secondary-text-color);
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
      font-size: var(--sc-font-size-s);
      font-weight: bold;

      margin: 1em 0 0 0;

      color: var(--sc-on-primary-secondary-text-color);
    }

    .dictionary-entries {
      margin: var(--sc-size-xl) 0 var(--sc-size-md);
    }

    .grammar {
      display: block;
      font-family: var(--sc-sans-font);

      color: var(--sc-on-primary-secondary-text-color);

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
      color: var(--sc-on-primary-secondary-text-color);
    }

    .dictionary-source {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-s);
      font-weight: 400;
      font-variant-caps: all-small-caps;
      letter-spacing: var(--sc-caps-letter-spacing);

      margin: var(--sc-size-md) 0;

      color: var(--sc-on-primary-secondary-text-color);
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
      color: var(--sc-primary-color-dark);
    }
  `;

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
              <li class=${this._calculateClass(dicSimilarItem.glossWord)}>
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
              <li class=${this._calculateClass(dicAdjacentItem.glossWord)}>
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

  stateChanged(state) {
    super.stateChanged(state);
    if (this.dictionaryWord !== state.currentRoute.params.word) {
      this.dictionaryWord = state.currentRoute.params.word;
    }
  }

  updated(changedProps) {
    super.update(changedProps);
    if (changedProps.has('dictionaryWord')) {
      this._loadNewResult();
    }
  }

  async _loadNewResult() {
    await this._fetchAdjacent();
    await this._fetchSimilar();
    this._fetchDictionary();
  }

  async _fetchGlossary() {
    if (this.glossaryReturns?.length === 0) {
      this.glossaryReturns = await (await fetch('/api/glossary')).json();
    }
  }

  async _fetchDictionary() {
    fetch(this._computeUrl())
      .then(r => r.json())
      .then(response => {
        this.dictionaryReturns = response;
        this._didRespond();
        if (this.similarReturns.length !== 0) {
          this._getGlossaryItems(this.glossaryReturns, this.similarReturns);
        }
        if (this.adjacentReturns.length !== 0) {
          this._getGlossaryItems(this.glossaryReturns, this.adjacentReturns, this.adjacent);
        }
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

  _didRespond() {
    this.dictionaryReturns.forEach(dicItem => {
      if (!dicItem.text) {
        dicItem.text = dictionarySimpleItemToHtml(dicItem);
      }
    });

    let dictsUsed = {};
    const finalResults = [];
    // eslint-disable-next-line guard-for-in
    for (const key in this.dictionaryTitles) {
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

  // Adding Similar Terms
  _computeSimilarUrl() {
    return `${API_ROOT}/dictionary_full/similar/${this.dictionaryWord}`;
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
      if (glossaryReturns && glossaryReturns[0] && inputArray[0]) {
        // eslint-disable-next-line guard-for-in
        for (const glossWord in inputArray[0]) {
          const glossLookup = inputArray[0][glossWord];
          glossText = `<a href="/define/${glossLookup}">${glossLookup}`;
          const glossaryLookupItem = glossaryReturns[0][glossLookup];
          if (glossaryLookupItem) {
            glossText += `<i> (${glossaryLookupItem})</i></a>`;
          }
          glossaryObject = { glossWord: glossLookup, glossText };
          glossary.push(glossaryObject);
        }
        if (adjacent) {
          this.dictionaryAdjacent = glossary;
        } else {
          this.dictionarySimilar = glossary;
        }
      }
    }
  }

  _createMetaData() {
    if (!this.localize) {
      return;
    }
    const description = this.localize('interface:metaDescriptionText');
    const dictionaryResultsText = this.localize('dictionary:dictionaryResultsText');
    const defineFor = this.localize('dictionary:definitionsFor');

    document.dispatchEvent(
      new CustomEvent('metadata', {
        detail: {
          pageTitle: `${defineFor}: ${this.dictionaryWord}`,
          title: `${dictionaryResultsText} ${this.dictionaryWord}`,
          description,
          bubbles: true,
          composed: true,
        },
      })
    );
  }
}

customElements.define('sc-page-dictionary', SCPageDictionary);
