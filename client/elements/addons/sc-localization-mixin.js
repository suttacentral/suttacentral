import { connect } from 'pwa-helpers';
import { store } from '../../redux-store';

const FALLBACK_LANGUAGE = 'en';

// I don't want to make call for /api/languages
// because it would block the rendering
const SUPPORTED_TRANSLATIONS = [
  'en',
  'de',
  'pl',
  'pt',
  'zh',
  'fr',
  'vi',
  'es',
  'it',
  'si',
  'ru',
  'fi',
  'sl',
  'nl',
  'th',
  'no'
];
const USE_PRODUCTION_LOCALIZATION = true;

const localizationCache = {};

export const LitLocalized = base =>
  class extends connect(store)(base) {
    static properties = {
      language: { type: String },
      localizedStringsPath: { type: String },
      _languageLoaded: { type: Boolean },
    };

    constructor() {
      super();
      this.__resources = {};
    }

    shouldUpdate() {
      return this._languageLoaded;
    }

    localize(key, params, tryLocalize) {
      const string = this.__resources && this.__resources[key] ? this.__resources[key] : '';

      if (!string && this._languageLoaded && !tryLocalize) {
        console.warn('missing translation key', key);
      }

      if (params) {
        return string.replace(/\{([a-z][a-z0-9-]*)\}/gi, (match, group) =>
          undefined !== params[group] ? params[group] : group
        );
      }

      return string || key;
    }

    localizeEx(key, ...params) {
      const string = this.__resources && this.__resources[key] ? this.__resources[key] : '';

      if (!string && this._languageLoaded) {
        console.warn('missing translation key', key);
      }

      if (params.length) {
        return string.replace(/\{([a-z][a-z0-9-]*)\}/gi, (match, group) =>
          undefined !== params[params.indexOf(group) + 1]
            ? params[params.indexOf(group) + 1]
            : group
        );
      }

      return string || key;
    }

    tryLocalize(key, fallback) {
      /* In a few legacy cases we WANT to display the localization key
         if it hasn't been localized */

      const result = this.localize(key, null, true);
      if (result === key) {
        return fallback;
      }
      return result;
    }

    stateChanged(state) {
      if (this.language !== state.siteLanguage) {
        this.language = state.siteLanguage;
        this.fullSiteLanguageName = state.fullSiteLanguageName;
        this.__siteLanguageChanged(this.language);
      }
    }

    async __siteLanguageChanged(lang) {
      this._languageLoaded = false;
      this.__resources = {
        ...(await this.__loadLanguage(FALLBACK_LANGUAGE)),
        ...(await this.__loadLanguage(lang)),
      };
      this._languageLoaded = true;
    }

    async __loadLanguage(lang) {
      if (SUPPORTED_TRANSLATIONS.includes(lang)) {
        if (!this.localizedStringsPath) {
          return;
        }
        if (!USE_PRODUCTION_LOCALIZATION && !this.localizedStringsPath.includes('build')) {
          this.localizedStringsPath = this.localizedStringsPath.replace(
            '/localization/elements',
            '/localization/elements/build'
          );
        }
        const path = `${this.localizedStringsPath}_${lang}.json`;

        if (path in localizationCache) {
          return localizationCache[path];
        }

        localizationCache[path] = fetch(path)
          .then(r => r.json())
          .catch(() => ({}));

        return localizationCache[path];
      }
      return Promise.resolve({});
    }

    loadFallbackLanguage() {
      this.__siteLanguageChanged(FALLBACK_LANGUAGE);
    }

    isSupportedLanguage(lang) {
      return SUPPORTED_TRANSLATIONS.includes(lang);
    }

    fallbackLanguage() {
      return FALLBACK_LANGUAGE;
    }

    loadTemporaryLocalization(lang) {
      this.__siteLanguageChanged(lang);
    }
  };
