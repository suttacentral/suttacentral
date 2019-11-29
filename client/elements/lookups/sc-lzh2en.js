import { LitElement, html } from 'lit-element';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin'
import { API_ROOT } from '../../constants.js';

class SCChineseLookup extends LitLocalized(LitElement) {
  render() {
    return html``;
  }

  static get properties() {
    return {
      loadedLanguage: { type: String },
      toLang: { type: String },
      dictData: { type: Object },
      loadingDict: { type: Boolean },
      loadingFallbackDictData: { type: Boolean },
      fallbackDictData: { type: Object }
    }
  }

  constructor() {
    super();
    this.loadedLanguage = '';
    this.toLang = store.getState().textOptions.chineseLookupTargetLanguage;
    this.dictData = {}
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
    let targetLanguage = state.textOptions.chineseLookupTargetLanguage;
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
    let definition = '';
    let length = 1;
    for (let i = graphs.length; i > 0; i--) {
      let snip = graphs.slice(0, i);
      definition += this._lookupWord(snip);
      if (definition && i > length) {
        length = i;
      }
    }
    return { html: definition, length: length };
  }

  _lookupWord(graph) {
    if (!this.dictData || !this.dictData.dictionary) {
      return;
    }
    graph = graph.replace(/\u2060/, '');
    if (this.dictData.dictionary[graph]) {
      return this._constructDictEntry(graph);
    } else if (this.fallbackDictData.dictionary[graph]) {
      return this._constructFallbackEntry(graph);
    }
    return '';
  }

  _constructDictEntry(graph) {
    const href = `http://www.buddhism-dict.net/cgi-bin/xpr-ddb.pl?q=${encodeURI(graph)}`;
    return `<div class="definition">
              <span class="ideograph">
                <a title="Go to full entry at the DDB. Login with user name ‘guest’" 
                    href="${href}" target="_blank" rel="noopener" class="lookup-link">${graph}</a>
              </span>
              <span class="meaning"> 
                ${this.dictData.dictionary[graph][0]}: ${this.dictData.dictionary[graph][1]}
              </span>
              <hr class="separator">
            </div>`;
  }

  _constructFallbackEntry(graph) {
    const href = `http://www.buddhism-dict.net/cgi-bin/dealt-lookup?q=${encodeURI(graph)}`;
    return `<div class="fallback definition">
              <span class="ideograph">
                <a title="Go to full entry at the CJKV. Login with user name ‘guest’"
                    href="${href}" target="_blank" rel="noopener" class="lookup-link">${graph}</a>
              </span>
              <span class="meaning">
                ${this.fallbackDictData.dictionary[graph][0]}: ${this.fallbackDictData.dictionary[graph][1]} [modern chinese]
              </span>
              <hr class="separator">
            </div>`
  }

  _computeUrl(fallback) {
    fallback = fallback || false;
    return `${API_ROOT}/dictionaries/lookup?from=lzh&to=${this.toLang}&fallback=${fallback}`;
  }

  _targetLanguageChanged() {
    if (!this.toLang) {
      return
    }
    if (typeof this.toLang !== 'undefined' && this.toLang !== this.loadedLanguage) {
      this.getNewDict();
    }
  }
}

customElements.define('sc-chinese-lookup', SCChineseLookup);
