const FALLBACK_LANGUAGE = 'en';

const localizationCache = { };

export const Localized = base => class extends base {
  static get properties() {
    return {
      localize: {
        type: Object,
        computed: '__computeLocalize(resources)'
      },
      language: {
        type: String,
        statePath: 'siteLanguage',
        observer: '__siteLanguageChanged'
      },
      localizedStringsPath: {
        type: String
      },
      resources: {
        type: Object,
        value: {}
      }
    }
  }

  __computeLocalize(resources) {
    return function(key, ...params) {
      const string = (resources && resources[key]) ? resources[key] : '';

      if (params.length) {
        return string.replace(
          /\{([a-z]+)\}/gi,
          (match, group) => params[params.indexOf(group) + 1]
        );
      }

      return string;
    }
  }

  async __siteLanguageChanged(lang) {
    this.resources = Object.assign(
      {},
      await this.__loadLanguage(FALLBACK_LANGUAGE),
      await this.__loadLanguage(lang)
    );
  }

  async __loadLanguage(lang) {
    const path = `${this.localizedStringsPath}/${lang}.json`;

    if (!this.localizedStringsPath) console.log(this)

    if (path in localizationCache) {
      return localizationCache[path];
    }

    let resp = await fetch(path);
    let data = await resp.json();
    localizationCache[path] = data[lang];

    return data[lang];
  }
}

import { store } from '/redux-store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

export const LitLocalized = base => class extends connect(store)(base) {
  static get properties() {
    return {
      language: {
        type: String
      },
      localizedStringsPath: {
        type: String
      },
      resources: {
        type: Object
      }
    }
  }

  constructor() {
    super();
    this.__localizationCache = {};
  }

  localize(key) {
    if (!this.resources[key]) {
      console.warn('missing translation key', key)
    }
    return this.resources[key] || '';
  }

  _stateChanged(state) {
    if (this.language !== state.siteLanguage) {
      this.language = state.siteLanguage;
      this.__siteLanguageChanged(this.language);
    }
  }

  async __siteLanguageChanged(lang) {
    this.resources = Object.assign(
      {},
      await this.__loadLanguage(FALLBACK_LANGUAGE),
      await this.__loadLanguage(lang)
    );
  }

  async __loadLanguage(lang) {
    if (lang in this.__localizationCache) {
      return this.__localizationCache[lang];
    }

    let resp = await fetch(`${this.localizedStringsPath}/${lang}.json`);
    let data = await resp.json();
    this.__localizationCache[lang] = data[lang];

    return data[lang];
  }
}
