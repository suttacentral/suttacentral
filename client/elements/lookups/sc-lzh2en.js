import { LitElement, html } from 'lit-element';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin';
import { API_ROOT } from '../../constants';

class SCChineseLookup extends LitLocalized(LitElement) {
  static get properties() {
    return {
      loadedLanguage: { type: String },
      toLang: { type: String },
      dictData: { type: Object },
      loadingDict: { type: Boolean },
      loadingFallbackDictData: { type: Boolean },
      fallbackDictData: { type: Object },
    };
  }

  constructor() {
    super();
    this.loadedLanguage = '';
    this.toLang = store.getState().textOptions.chineseLookupTargetLanguage;
    this.dictData = {};
    this.loadingDict = true;
    this.loadFallbackLanguage = true;
    this.fallbackDictData = {};
  }

  firstUpdated() {
    this.getNewDict();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('toLang')) {
      this._targetLanguageChanged();
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
    const targetLanguage = state.textOptions.chineseLookupTargetLanguage;
    if (this.toLang !== targetLanguage) {
      this.toLang = targetLanguage;
    }
  }

  async getNewDict() {
    if (!this.toLang) return;
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

    for(let graph of graphs) {
      const result = this._lookupWord(graph);
      queriedGraphs.push(graph);
      if (result) {
        definition.push(result);
      }
    }

    const terms = [];
    for (let i = 0; i < graphs.length; i++) {
      for (let j = 1; j <= graphs.length; j++) {
        terms.push(graphs.slice(i, j));
      }
    }

    for(let term of terms) {
      const result = this._lookupWord(term);
      if (queriedGraphs.includes(term)) {
        continue;
      }
      if (result) {
        definition.push(result);
      }
    }

    return { html: definition };
  }

  _lookupWord(graph) {
    if (!this.dictData) {
      return;
    }

    graph = graph.replace(/\u2060/, '');
    let target = this.dictData.find(x => x.entry === graph);
    if (typeof target === 'object') {
      return this._constructDictEntry(graph, target);
    }

    target = this.fallbackDictData.find(x => x.entry === graph);
    if (typeof target === 'object') {
      return this._constructFallbackEntry(graph, target);
    }

    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  _constructDictEntry(graph, dictItem) {
    const href = `http://www.buddhism-dict.net/cgi-bin/xpr-ddb.pl?q=${encodeURI(graph)}`;
    return html`
      <dl>
        <dt>
          <dfn class="entry" lang="pi" translate="no">
            <a href="${href}" target="_blank" rel="noopener" class="lookup-link"> ${graph} </a>
          </dfn>
        </dt>

        ${dictItem.definition
          ? html`
              <ol class="definition">
                <li>${dictItem.definition}</li>
              </ol>
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
            <a href="${href}" target="_blank" rel="noopener" class="lookup-link"> ${graph} </a>
          </dfn>
        </dt>

        ${dictItem.definition
          ? html`
              <ol class="definition">
                <li>${dictItem.definition}</li>
              </ol>
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
      this.getNewDict();
    }
  }
}

customElements.define('sc-chinese-lookup', SCChineseLookup);
