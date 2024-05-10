import { LitElement, html } from 'lit';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { API_ROOT } from '../../constants';

export class SCChineseLookup extends LitLocalized(LitElement) {
  static properties = {
    loadedLanguage: { type: String },
    toLang: { type: String },
    dictData: { type: Object },
    loadingDict: { type: Boolean },
    loadingFallbackDictData: { type: Boolean },
    fallbackDictData: { type: Object },
  };

  constructor() {
    super();
    this.loadedLanguage = '';
    const { textOptions } = store.getState();
    this.isChineseLookupEnabled = textOptions.chineseLookupActivated;
    this.toLang = textOptions.chineseLookupTargetLanguage;
    this.dictData = {};
    this.loadingDict = true;
    this.loadFallbackLanguage = true;
    this.fallbackDictData = {};
    this.hanziVariants = new Map([
      ['説', '說'],
      ['縁', '緣'],
      ['録', '錄'],
    ]);
  }

  firstUpdated() {
    this.fetchDictionary();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('toLang')) {
      this._targetLanguageChanged();
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
    const targetLanguage = state.textOptions.chineseLookupTargetLanguage;
    if (this.toLang !== targetLanguage) {
      this.toLang = targetLanguage;
    }
    if (this.isChineseLookupEnabled !== state.textOptions.chineseLookupActivated) {
      this.isChineseLookupEnabled = state.textOptions.chineseLookupActivated;
      this.fetchDictionary();
    }
  }

  async fetchDictionary() {
    if (!this.toLang || !this.isChineseLookupEnabled) {
      return;
    }
    this.loadingDict = true;
    this.loadedLanguage = this.toLang;
    if (this.toLang === 'en') {
      this.loadingFallbackDictData = true;
      this.fallbackDictData = await (await fetch(this._computeUrl(true))).json();
      this.loadingFallbackDictData = false;
    }
    this.dictData = await (await fetch(this._computeUrl())).json();
    this.loadingDict = false;
  }

  lookupWord(graphs) {
    const definition = [];
    const queriedGraphs = [];

    let terms = [];
    for (let i = 0; i < graphs.length; i++) {
      for (let j = 1; j <= graphs.length; j++) {
        terms.push(graphs.slice(i, j));
      }
    }
    terms = terms.filter(x => x !== '');
    terms = terms.sort((a, b) => b.length - a.length);

    for (const term of terms) {
      const result = this._lookupWord(term);
      if (!queriedGraphs.includes(term)) {
        queriedGraphs.push(term);
        if (result) {
          definition.push(result);
        }
      }
    }

    for (const graph of graphs) {
      const result = this._lookupWord(graph);
      if (!queriedGraphs.includes(graph)) {
        queriedGraphs.push(graph);
        if (result) {
          definition.push(result);
        }
      }
    }

    return { html: definition };
  }

  _lookupWord(graph) {
    if (!this.dictData) {
      return;
    }

    graph = this._variantsReplace(graph);
    graph = graph.replace(/\u2060/, '');
    let target = this.dictData?.find?.(x => x.entry === graph);
    if (typeof target === 'object') {
      return this._constructDictEntry(graph, target);
    }

    target = this.fallbackDictData?.find?.(x => x.entry === graph);
    if (typeof target === 'object') {
      return this._constructFallbackEntry(graph, target);
    }

    return '';
  }

  _variantsReplace(graph) {
    graph = this.hanziVariants.get(graph) ?? graph;
    for (const word of graph) {
      if (this.hanziVariants.has(word)) {
        graph = graph.replace(new RegExp(word, 'g'), this.hanziVariants.get(word));
      }
    }
    return graph;
  }

  // eslint-disable-next-line class-methods-use-this
  _constructDictEntry(graph, dictItem) {
    const href = `http://www.buddhism-dict.net/cgi-bin/xpr-ddb.pl?q=${encodeURI(graph)}`;
    return html`
      <dl>
        <dt>
          <dfn class="entry" lang="pi" translate="no">
            <a href=${href} target="_blank" rel="noopener noreferrer" class="lookup-link"> ${graph} </a>
          </dfn>
        </dt>

        ${dictItem.definition
          ? html`
              <ol class="definition">
                <li>${dictItem.definition}</li>
              </ol>
            `
          : ''}
        ${dictItem.pronunciation
          ? html`
              <ul class="pronunciation">
                <li>${dictItem.pronunciation}</li>
              </ul>
            `
          : ''}
      </dl>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _constructFallbackEntry(graph, dictItem) {
    const href = `http://www.buddhism-dict.net/cgi-bin/dealt-lookup?q=${encodeURI(graph)}`;
    return html`
      <dl>
        <dt>
          <dfn class="entry" lang="pi" translate="no">
            <a href=${href} target="_blank" rel="noopener noreferrer" class="lookup-link"> ${graph} </a>
          </dfn>
        </dt>

        ${dictItem.definition
          ? html`
              <ol class="definition">
                <li>${dictItem.definition}</li>
              </ol>
            `
          : ''}
        ${dictItem.pronunciation
          ? html`
              <ul class="pronunciation">
                <li>${dictItem.pronunciation}</li>
              </ul>
            `
          : ''}
      </dl>
    `;
  }

  _computeUrl(fallback) {
    fallback = fallback || false;
    return `${API_ROOT}/dictionaries/lookup?from=lzh&to=${this.toLang}&fallback=${fallback}`;
  }

  _targetLanguageChanged() {
    if (!this.toLang) {
      return;
    }
    if (typeof this.toLang !== 'undefined' && this.toLang !== this.loadedLanguage) {
      this.fetchDictionary();
    }
  }
}

customElements.define('sc-chinese-lookup', SCChineseLookup);
