const FALLBACK_LANGUAGE = 'en';

// I don't want to make call for /api/languages
// because it would block the rendering
const SUPPORTED_TRANSLATIONS = ['en', 'pl', 'pt', 'zh'];

const localizationCache = {};

/**
 * @polymer
 * @mixinFunction
 */
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
    return function (key, ...params) {
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
    if (SUPPORTED_TRANSLATIONS.includes(lang)) {
      const path = `${this.localizedStringsPath}/${lang}.json`;

      if (!this.localizedStringsPath) console.log(this);

      if (path in localizationCache) {
        return localizationCache[path];
      }

      localizationCache[path] = fetch(path)
        .then(r => r.json())
        .then(data => data[lang])
        .catch(() => ({}));

      return localizationCache[path];
    } else {
      return Promise.resolve({});
    }
  }
};

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../redux-store.js';

export const LitLocalized = base => class extends connect(store)(base) {
  static get properties() {
    return {
      language: String,
      localizedStringsPath: String,
      _languageLoaded: Boolean,
    }
  }

  constructor() {
    super();
    this.__resources = {};
  }

  shouldUpdate() {
    return this._languageLoaded;
  }

  localize(key, params) {
    const string = (this.__resources && this.__resources[key]) ? this.__resources[key] : '';

    if (!string && this._languageLoaded) {
      console.warn('missing translation key', key);
    }

    if (params) {
      return string.replace(
        /\{([a-z]+)\}/gi,
        (match, group) => undefined !== params[group] ? params[group] : group
      );
    }

    return string;
  }

  _stateChanged(state) {
    if (this.language !== state.siteLanguage) {
      this.language = state.siteLanguage;
      this.fullSiteLanguageName = state.fullSiteLanguageName;
      this.__siteLanguageChanged(this.language);
    }
  }

  async __siteLanguageChanged(lang) {
    this._languageLoaded = false;
    this.__resources = Object.assign(
      {},
      await this.__loadLanguage(FALLBACK_LANGUAGE),
      await this.__loadLanguage(lang)
    );
    this._languageLoaded = true;
  }

  async __loadLanguage(lang) {
    if (SUPPORTED_TRANSLATIONS.includes(lang)) {
      const path = `${this.localizedStringsPath}/${lang}.json`;

      if (path in localizationCache) {
        return localizationCache[path];
      }

      localizationCache[path] = fetch(path)
        .then(r => r.json())
        .then(data => data[lang])
        .catch(() => ({}));

      return localizationCache[path];
    } else {
      return Promise.resolve({});
    }
  }
};
