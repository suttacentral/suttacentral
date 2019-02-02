import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-progress/paper-progress.js';
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
import "@polymer/iron-ajax/iron-ajax.js";
import { queue } from 'd3-queue';

import '../menus/sc-language-base-menu.js';
import { ReduxMixin } from '../../redux-store.js';
import { Localized } from "../addons/localization-mixin.js";
import { legacyStaticStyles } from '../styles/static-styles.js';
import { API_ROOT } from '../../constants.js';

class SCOfflinePage extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    ${legacyStaticStyles}
    <style>
      .button {
        @apply --sc-skolar-font-size-s;
        background-color: var(--sc-primary-accent-color);
        color: var(--sc-tertiary-text-color);
        font-weight: bold;
        text-align: center;
        margin-bottom: var(--sc-size-md-larger);
        height: var(--sc-size-xxl);
        letter-spacing: var(--sc-all-caps_-_letter-spacing);
      }

      .button[disabled] {
        background-color: var(--sc-paper-tooltip-color);
      }

      .icon {
        margin: var(--sc-size-sm);
      }

      .success-icon {
        color: var(--sc-toast-success-color);
      }

      .failure-icon {
        color: var(--sc-toast-error-color);
      }

      #download_controller {
        width: 100%;
        will-change: opacity;
        transition: opacity cubic-bezier(0.4, 0.0, 0.2, 1) 300ms;
        margin: var(--sc-size-md) 0;
        background-color: var(--sc-secondary-background-color);
      }

      #cache_progress {
        --paper-progress-active-color: var(--sc-primary-accent-color);
        --paper-progress-container-color: var(--sc-primary-background-color);
        width: 100%;
      }

      .download-progress-percentage {
        @apply --sc-sans-font;
        @apply --sc-skolar-font-size-s;
        margin: var(--sc-size-md);
        text-align: right;
      }

      .download-current-url {
        @apply --sc-sans-font;
        @apply --sc-skolar-font-size-s;
        margin: var(--sc-size-md);
      }

      .control-button-row {
        display: flex;
        justify-content: center;
        color: var(--sc-disabled-text-color);
      }

      .control-button {
        width: var(--sc-size-xl);
        height: var(--sc-size-xl);
      }

      .download-info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .tooltip {
        --paper-tooltip-opacity: 0.98;
        --paper-tooltip-background: var(--sc-paper-tooltip-color);
        --paper-tooltip: {
          @apply --sc-sans-font;
          @apply --sc-skolar-font-size-xs;
          line-height: var(--sc-size-md);
          padding: var(--sc-size-sm) var(--sc-size-md);
          text-shadow: 0 0 var(--sc-secondary-background-color);
          white-space: normal;
          max-width: 100% !important;
        }
      }

      .options-section {
        margin: var(--sc-size-md-larger) 0;
      }

      .option-title {
        @apply --paper-font-title;
        color: var(--sc-primary-text-color);
        margin: var(--sc-size-sm) 0;
      }

      .option-description {
        @apply --paper-font-body1;
        color: var(--sc-secondary-text-color);
        margin: var(--sc-size-sm) 0;
      }

      .toggle-button {
        --paper-toggle-button-unchecked-bar-color: var(--sc-secondary-text-color);
        --paper-toggle-button-checked-bar-color: var(--sc-primary-accent-color-light);
        --paper-toggle-button-checked-button-color: var(--sc-primary-accent-color);
        --paper-toggle-button-checked-ink-color: var(--sc-primary-accent-color-dark);
        margin: var(--sc-size-md);
      }

      .option-multi-select-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }

      @media screen and (min-width: 600px) {
        .option-multi-select-container {
          max-height: 240px;
        }
      }

      .option-checkbox {
        --paper-checkbox-checked-color: var(--sc-primary-accent-color);
        --paper-checkbox-unchecked-color: var(--sc-disabled-text-color);
        --paper-checkbox-label-color: var(--sc-secondary-text-color);
        --paper-checkbox-label-checked-color: var(--sc-primary-text-color);
        margin: var(--sc-size-md);
      }

      #pwa_language_menu {
        margin-left: var(--sc-size-sm);
        margin-bottom: var(--sc-size-sm);
      }

      #lookups_container {
        max-height: 0;
        overflow: hidden;
        transition: max-height 400ms ease-in-out;
      }

      #lookups_container.open {
        max-height: 800px;
      }

      #toggle_lookup_display_button {
        padding: 0;
        margin: 0;
        min-width: unset;
      }

      .separator {
        @apply --sc-separator;
        margin-top: var(--sc-size-md);
      }

      .no-margin {
        color: var(--sc-toast-error-color);
        margin-top: 0;
        margin-bottom: 0;
      }
      
      [hidden] {
        display: none;
      }

      @media screen and (max-width: 600px) {
        .no-phone-top-margin {
          margin-top: 0;
        }
      }
    </style>

    <iron-ajax id="ajax" reject-with-request="true"></iron-ajax>

    <iron-ajax
        auto
        id='sizes_ajax'
        url="[[_computeSizesUrl()]]"
        handle-as="json"
        last-response="{{PWASizes}}"></iron-ajax>

    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>{{localize('usingOffline')}}</h1>
            <div class="button-info">
              <p class="no-phone-top-margin">
                <template is="dom-if" if="[[browserSupportsPWA]]">
                  <span>{{localize('supportsPWAs')}}</span>
                  <iron-icon icon="sc-iron-icons:check-box" class="icon success-icon"></iron-icon>
                </template>
                <template is="dom-if" if="[[!browserSupportsPWA]]">
                  <span>{{localize('doesntSupportPWAs')}}</span>
                  <iron-icon class="no-margin" icon="sc-iron-icons:error" class="icon failure-icon"></iron-icon>
                  <br>
                </template>
              </p>
            </div>
            <p inner-h-t-m-l="{{localize('pwaDescription')}}"></p>
            <p>{{localize('additionalInfo')}}</p>
            <p>{{localize('newTech')}}</p>
            <ul>
              <li>{{localize('suttasOnly')}}</li>
              <li>{{localize('oneLang')}}</li>
              <li>{{localize('certainFunctions')}}</li>
            </ul>
            <p>{{localize('extraFeatures')}}</p>

            <div class="separator"></div>

            <div class="options-section">

              <h3 class="option-title">{{localize('language')}}</h3>
              <div class="option-description">{{localize('selectDifferentLang')}}</div>
              <sc-language-base-menu id="pwa_language_menu" cloneName="pwa" noRoot="true"
                                     disabled="[[_isDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress)]]">
              </sc-language-base-menu>

              <h3 class="option-title">{{localize('downloadParallels')}}</h3>
              <div class="option-description">{{localize('downloadParallelsDescription')}}</div>
              <paper-toggle-button id="download_parallels_button" class="toggle-button" noink
                                   disabled="[[_isDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress)]]"
                                   active="{{shouldDownloadParallels}}"></paper-toggle-button>

              <h3 class="option-title">{{localize('downloadRootTexts')}}</h3>
              <div class="option-description">{{localize('downloadRootTextsDescription', 'toLang',
                defaultPaliDictToLang.name)}}
                <paper-button id="toggle_lookup_display_button"><b>{{localize('here')}}</b></paper-button>.
              </div>
              <paper-toggle-button id="download_root_texts_button" class="toggle-button" noink
                                   disabled="[[_isDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress)]]"
                                   active="{{shouldDownloadRootTexts}}"></paper-toggle-button>

              <div id="lookups_container">

                <h3 class="option-title">{{localize('paliLookups')}}</h3>
                <div class="option-description">{{localize('paliLookupsDescription')}}</div>
                <div class="option-multi-select-container">
                  <template is="dom-repeat" items="[[paliLookupLanguages]]" as="lang">
                    <paper-checkbox class="option-checkbox pali-checkbox" data-isoCode$="[[lang.isoCode]]"
                                    on-change="_togglePaliCheckbox"
                                    disabled="[[_isDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress)]]">
                      [[lang.name]]
                    </paper-checkbox>
                  </template>
                </div>

                <h3 class="option-title">{{localize('chineseLookups')}}</h3>
                <div class="option-description">{{localize('chineseLookupsDescription')}}</div>
                <div class="option-multi-select-container">
                  <template is="dom-repeat" items="[[chineseLookupLanguages]]" as="lang">
                    <paper-checkbox class="option-checkbox" on-change="_toggleChineseCheckbox"
                                    disabled="[[_isDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress)]]">
                      [[lang.name]]
                    </paper-checkbox>
                  </template>
                </div>

              </div>

            </div>

            <paper-button id='make_offline_button' class="button" raised
                          disabled="[[_isPrimaryDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress, shouldButtonBeActive)]]"
                          title="[[_getDownloadButtonTitle(browserSupportsPWA, cacheDownloadInProgress, shouldButtonBeActive, localize)]]">
              [[_getDownloadButtonText(browserSupportsPWA, cacheDownloadInProgress, shouldButtonBeActive, localize,
              downloadSize, chosenLanguageNativeName, isDownloadPaused)]]
            </paper-button>

            <paper-button id='reset_history_button' class="button" raised
                          disabled="[[_isDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress)]]">
              {{localize('resetButton')}}
            </paper-button>
            <paper-button id='add_to_homescreen_button' class="button" raised hidden$="[[!canBeAddedToHomeScreen]]">
                {{localize('addToHomeScreen')}}
            </paper-button>
            <paper-card id="download_controller">
              <div class="download-info-row">
                <div class="download-current-url">{{localize('downloading')}}: [[currentDownloadingUrl]]</div>
                <div class="control-button-row">
                  <paper-icon-button id="play_button" class="control-button" icon="av:play-arrow"></paper-icon-button>
                  <paper-tooltip for="play_button" class="tooltip">
                    [[_getPlayButtonTooltip(isDownloadPaused, localize)]]
                  </paper-tooltip>
                  <paper-icon-button id="stop_button" class="control-button" icon="av:stop"></paper-icon-button>
                  <paper-tooltip for="stop_button" class="tooltip">
                    {{localize('stop')}}
                  </paper-tooltip>
                </div>
              </div>
              <paper-progress id="cache_progress"></paper-progress>
              <template is="dom-if" if="[[cacheDownloadInProgress]]">
                <div class="download-progress-percentage">
                  [[downloadProgressPercentage]]%
                </div>
              </template>
            </paper-card>
          </article>
        </section>
      </main>
    </div>`;
  }

  static get properties() {
    return {
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-offline-page'
      },
      browserSupportsPWA: {
        type: Boolean,
        computed: '_doesBrowserSupportPWA()'
      },
      canBeAddedToHomeScreen: {
        type: Boolean,
        computed: '_canBeAddedToHomeScreen()'
      },
      chosenLanguageNativeName: {
        type: String
      },
      chosenLanguageIsoCode: {
        type: String
      },
      cacheDownloadInProgress: {
        type: Boolean,
        observer: '_downloadInProgressChanged',
        value: false
      },
      downloadProgressPercentage: {
        type: Number,
        value: 0
      },
      currentDownloadingUrl: {
        type: String
      },
      isDownloadPaused: {
        type: Boolean,
        observer: '_downloadPausedChanged',
        value: false
      },
      shouldDownloadParallels: {
        type: Boolean,
        value: false
      },
      shouldDownloadRootTexts: {
        type: Boolean,
        value: false
      },
      isDownloadPausedBecauseOffline: {
        type: Boolean
      },
      paliLookupLanguages: {
        type: Array,
        value: [
          {
            name: 'English',
            isoCode: 'en',
            enabled: false
          },
          {
            name: 'Español',
            isoCode: 'es',
            enabled: false
          },
          {
            name: 'Deutsch',
            isoCode: 'de',
            enabled: false
          },
          {
            name: '汉语',
            isoCode: 'zh',
            enabled: false
          },
          {
            name: 'Português',
            isoCode: 'pt',
            enabled: false
          },
          {
            name: 'Bahasa Indonesia',
            isoCode: 'id',
            enabled: false
          },
          {
            name: 'Nederlands',
            isoCode: 'nl',
            enabled: false
          }
        ]
      },
      chineseLookupLanguages: {
        type: Array,
        value: [
          {
            name: 'English',
            isoCode: 'en',
            enabled: false
          }
        ]
      },
      shouldDisplayLookupList: {
        type: Boolean
      },
      siteLangFullName: {
        type: String,
        statePath: 'fullSiteLanguageName'
      },
      // This property stores the default Pali lookup dictionary language.
      // If there is no lookup dictionary available in the user language,
      // we default to English.
      defaultPaliDictToLang: {
        type: Object,
        computed: '_getDefaultPaliLookupDictionaryLang(chosenLanguageIsoCode)',
        observer: '_activatePaliDictToLang'
      },
      PWASizes: {
        type: Object
      },
      downloadSizeFromComputed: {
        type: Number,
        computed: '_calculateTotalDownloadSize(PWASizes, chosenLanguageIsoCode, shouldDownloadParallels, shouldDownloadRootTexts)',
        observer: '_setDownloadSize'
      },
      downloadSizeFromLookups: {
        type: Number,
        observer: '_setDownloadSize'
      },
      downloadSize: {
        type: Number
      },
      previousDownloadedUrls: {
        type: Object,
        statePath: 'downloadedUrls'
      },
      downloadedUrls: {
        type: Object,
        value: {}
      },
      downloadedPWASettings: {
        type: Object,
        statePath: 'downloadedPWASettings'
      },
      shouldButtonBeActive: {
        type: Boolean,
        computed: '_setShouldButtonBeActive(chosenLanguageIsoCode, shouldDownloadParallels, shouldDownloadRootTexts, downloadedPWASettings)'
      }
    }
  }

  static get actions() {
    return {
      saveDownloadedUrls(downloadedUrls) {
        return {
          type: 'SAVE_DOWNLOADED_URLS',
          downloadedUrls: downloadedUrls
        }
      },
      saveDownloadedPWASettings(downloadedPWASettings) {
        return {
          type: 'SAVE_DOWNLOADED_PWA_SETTINGS',
          downloadedPWASettings: downloadedPWASettings
        }
      }
    }
  }

  _hasToDownloadParallels() {
    if (!this.shouldDownloadParallels) {
      return false;
    }
    if (!this.downloadedPWASettings.languages[this.chosenLanguageIsoCode].parallels) {
      return true;
    }
    if (this.shouldDownloadRootTexts && !this.downloadedPWASettings.languages.root.parallels) {
      return true;
    }
    return false;
  }

  _hasToDownloadLookups() {
    if (!this.shouldDownloadRootTexts) {
      return false;
    }
    for (let l of this.paliLookupLanguages) {
      if (l.enabled && !this.downloadedPWASettings.lookups.pali[l.isoCode]) {
        return true;
      }
    }
    for (let l of this.chineseLookupLanguages) {
      if (l.enabled && !this.downloadedPWASettings.lookups.chinese[l.isoCode]) {
        return true;
      }
    }
    return false;
  }

  _setShouldButtonBeActive() {
    if (!this.downloadedPWASettings) {
      return true;
    }
    if (!this.downloadedPWASettings.languages[this.chosenLanguageIsoCode]) {
      return true;
    } else if (this.shouldDownloadRootTexts && !this.downloadedPWASettings.languages.root) {
      return true;
    } else if (this._hasToDownloadParallels()) {
      return true;
    } else if (this._hasToDownloadLookups()) {
      return true;
    } else return false;
  }

  _getDownloadButtonTitle(browserSupportsPWA, cacheDownloadInProgress, shouldButtonBeActive, localize) {
    if (this._isPrimaryDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress, shouldButtonBeActive)) {
      return localize('alreadyDownloaded');
    } else {
      return localize('ClickToDownload');
    }
  }

  _getDownloadButtonText(browserSupportsPWA, cacheDownloadInProgress, shouldButtonBeActive,
    localize, downloadSize, chosenLanguageNativeName, isDownloadPaused) {
    console.log(isDownloadPaused);
    if (this.isDownloadPaused) {
      return localize('downloadPaused');
    } else if (this.cacheDownloadInProgress) {
      return localize('downloadInProgress');
    } else if (this._isPrimaryDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress, shouldButtonBeActive)) {
      return localize('alreadyDownloaded');
    } else {
      return `${localize('downloadButton', 'languageName', chosenLanguageNativeName)} ${this._showDownloadSize(downloadSize)}`;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const offlineButton = this.$.make_offline_button;
    if (offlineButton) {
      offlineButton.addEventListener('click', () => { this.makeOffline() });
    }
    this.$.reset_history_button.addEventListener('click', () => { this._resetDownloadHistory() });
    this.$.add_to_homescreen_button.addEventListener('click', () => { this._showAddToHomeScreenPrompt() });
    this.$.play_button.addEventListener('click', () => { this._resumeOrPauseDownload() });
    this.$.stop_button.addEventListener('click', () => { this._stopDownload() });
    this.$.toggle_lookup_display_button.addEventListener('click', () => { this._toggleLookupsOpen() });
    addEventListener('pwa-language-changed', (e) => {
      this.chosenLanguageNativeName = e.detail.name;
      this.chosenLanguageIsoCode = e.detail.isoCode;
      this.paliLookupLanguages.forEach(lang => lang.enabled = lang.isoCode === e.detail.isoCode);
      const checkboxes = this.shadowRoot.querySelectorAll('.pali-checkbox');
      Array.from(checkboxes).forEach(checkbox => {
        checkbox.checked = checkbox.dataset.isocode === e.detail.isoCode;
      })
    });
    this._handleNetworkLoss();
  }

  _handleNetworkLoss() {
    window.addEventListener('offline', () => {
      if (!this.D3queue || this.isDownloadPaused) return;
      this._pauseDownload();
      this.isDownloadPaused = true;
      this.isDownloadPausedBecauseOffline = true;
      this._showToast('info', this.localize('networkLost'));
    });
    window.addEventListener('online', () => {
      if (!this.D3queue || !this.isDownloadPausedBecauseOffline) return;
      this._resumeDownload();
      this.cacheDownloadInProgress = true;
      this.isDownloadPaused = false;
      this.isDownloadPausedBecauseOffline = false;
      this._showToast('info', this.localize('networkRecovered'));
    });
  }

  makeOffline() {
    this.$.ajax.url = this._getCollectionUrl('sutta');
    this._showToast('info', this.localize('downloadStarted'));
    this.cacheDownloadInProgress = true;
    this.$.ajax.generateRequest().completes.then((request) => {
      this.downloadProgressPercentage = 0;
      const response = request.__data.response;
      this.allURLs = this._buildUrlList(response);
      this._cacheAllItems();
    }, (error) => {
      this._showToast('error', this.localize('networkError'));
      this.cacheDownloadInProgress = false;
      console.error(error.error);
    });
  }

  _cacheAllItems() {
    let failed = 0;
    let passed = 0;
    let interval = 0;
    const progressBar = this.$.cache_progress;
    progressBar.value = 0;
    this.isDownloadPaused = false;

    const originalLength = this.allURLs.length;
    this.allURLs = this.allURLs.filter(v => this.previousDownloadedUrls[v.url] !== true);
    this.D3queue = queue(20);
    this.allURLs.forEach(input => {
      if (input.done) {
        passed++;
        progressBar.value++;
        return;
      }
      this.D3queue.defer((input, callback) => {
        fetch(input.url)
          .then(this._handleErrors)
          .then(() => {
            passed++;
            this._updateUi(progressBar, input.url);
            input.done = true;
            this.downloadedUrls[input.url] = true;
            interval++;
            if (interval === 50) {
              interval = 0;
              this.dispatch('saveDownloadedUrls', Object.assign({}, this.downloadedUrls, this.previousDownloadedUrls));
              this.downloadedUrls = {};
            }
            callback(null);
          })
          .catch((err) => {
            failed++;
            console.error(err);
            callback(null);
          })
      }, input);
    });
    this.D3queue.await((e) => {
      if (this.isDownloadPaused) {
        return;
      }
      this.cacheDownloadInProgress = false;
      if (failed === 0) {
        this._saveDownloadedSettings();
        this._showToast('success',
          this.localize('downloadComplete', 'lang', this.chosenLanguageNativeName));
      } else if (failed > 0 && passed > 0) {
        this._showToast('error',
          this.localize('downloadErrored', 'failed', failed, 'total', passed + failed));
      } else {
        this._showToast('error', this.localize('networkError'));
      }
    });

    progressBar.max = this.allURLs.length;
    progressBar.value = originalLength - this.allURLs.length;
  }

  _resetDownloadHistory() {
    this.dispatch('saveDownloadedUrls', {});
    this.dispatch('saveDownloadedPWASettings', {
      languages: {},
      lookups: {
        pali: {},
        chinese: {}
      }
    });
  }

  _updateUi(progressBar, currentUrl) {
    progressBar.value++;
    this.downloadProgressPercentage = Math.round(progressBar.value / progressBar.max * 100);
    this.currentDownloadingUrl = currentUrl.slice(currentUrl.indexOf('api') + 4);
  }

  _downloadPausedChanged() {
    this.$.play_button.icon = this.isDownloadPaused ? 'av:play-arrow' : 'av:pause';
  }

  _downloadInProgressChanged() {
    this.$.download_controller.style.opacity = this.cacheDownloadInProgress ? 1 : 0;
  }

  _saveDownloadedSettings() {
    let downloadedPWASettings = Object.assign({}, this.downloadedPWASettings);
    if (this.shouldDownloadRootTexts &&
      (!downloadedPWASettings.languages.root || !downloadedPWASettings.languages.root.parallels)) {
      downloadedPWASettings.languages.root = { parallels: this.shouldDownloadParallels };
    }
    if (!downloadedPWASettings.languages[this.chosenLanguageIsoCode] ||
      !downloadedPWASettings.languages[this.chosenLanguageIsoCode].parallels) {
      downloadedPWASettings.languages[this.chosenLanguageIsoCode] = { parallels: this.shouldDownloadParallels };
    }
    this.paliLookupLanguages.forEach((l) => {
      downloadedPWASettings.lookups.pali[l.isoCode] = !!(l.enabled || downloadedPWASettings.lookups.pali[l.isoCode]);
    });
    this.chineseLookupLanguages.forEach((l) => {
      downloadedPWASettings.lookups.chinese[l.isoCode] = !!(l.enabled || downloadedPWASettings.lookups.chinese[l.isoCode]);
    });
    this.dispatch('saveDownloadedPWASettings', downloadedPWASettings);
  }

  _buildUrlList(response) {
    const menuURLs = response.menu.map(menuId => this._getMenuUrl(menuId));
    const suttaplexURLs = response.suttaplex.map(suttaplexId => this._getSuttaplexUrl(suttaplexId));
    const suttaTextURLs = this._buildSuttaTextUrlList(response);
    const parallelURLs = this.shouldDownloadParallels ? response.texts.map(text => this._getParallelUrl(text.uid)) : [];
    const paragraphURLs = this._getParagraphUrls();
    const lookupURLs = this._buildLookupUrlList(this.paliLookupLanguages, this.chineseLookupLanguages);

    return menuURLs.concat(suttaplexURLs).concat(suttaTextURLs).concat(parallelURLs)
      .concat(paragraphURLs).concat(lookupURLs).map(url => ({ url: url, done: false }));
  }

  _buildSuttaTextUrlList(response) {
    const suttaTextURLs = [];
    response.texts.forEach((text) => {
      text.translations.forEach((translation) => {
        translation.authors.forEach((author) => {
          suttaTextURLs.push(this._getSuttaTextUrl(text.uid, author, translation.lang));
        })
      })
    });
    return suttaTextURLs;
  }

  _buildLookupUrlList(paliLookups, chineseLookups) {
    const paliUrls = paliLookups
      .filter(item => item.enabled)
      .map(item => this._getLookupUrl('pli', item.isoCode));
    const chineseUrls = chineseLookups
      .filter(item => item.enabled)
      .map(item => [
        this._getChineseLookupUrl('lzh', item.isoCode, true),
        this._getChineseLookupUrl('lzh', item.isoCode, false),
      ])
      .reduce((item, acc) => [...acc, ...item], []);
    return paliUrls.concat(chineseUrls);
  }

  _handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  _getCollectionUrl(collection) {
    return `${API_ROOT}/pwa/collection/${collection}?languages=${this.chosenLanguageIsoCode}&root_lang=${this.shouldDownloadRootTexts}`;
  }

  _getMenuUrl(menuItemId) {
    return `${API_ROOT}/menu/${menuItemId}?language=${this.chosenLanguageIsoCode}`;
  }

  _getSuttaplexUrl(suttaplexId) {
    return `${API_ROOT}/suttaplex/${suttaplexId}?language=${this.chosenLanguageIsoCode}`;
  }

  _getParallelUrl(parallelId) {
    return `${API_ROOT}/parallels/${parallelId}`;
  }

  _getSuttaTextUrl(suttaId, authorId, langIsoCode) {
    return `${API_ROOT}/suttas/${suttaId}/${authorId}?lang=${langIsoCode}`;
  }

  _getLookupUrl(fromLang, toLang) {
    return `${API_ROOT}/dictionaries/lookup?from=${fromLang}&to=${toLang}`;
  }

  _getChineseLookupUrl(fromLang, toLang, fallback) {
    return `${API_ROOT}/dictionaries/lookup?from=${fromLang}&to=${toLang}&fallback=${fallback}`;
  }

  _getParagraphUrls() {
    return `${API_ROOT}/paragraphs`;
  }

  _doesBrowserSupportPWA() {
    // Found it somewhere and it works.
    let ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return false;
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return false;
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

    // Check if it is supported browser
    return M[0].toLowerCase() === 'chrome' && parseInt(M[1]) >= 65;
  }

  _canBeAddedToHomeScreen() {
    return this._doesBrowserSupportPWA() && !!window.deferredPWAInstallPrompt;
  }

  _isDownloadButtonDisabled(browserSupportsPWAs, cacheDownloadInProgress) {
    return !browserSupportsPWAs || cacheDownloadInProgress;
  }

  _isPrimaryDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress, shouldButtonBeActive) {
    return !shouldButtonBeActive || this._isDownloadButtonDisabled(browserSupportsPWA, cacheDownloadInProgress);
  }

  _getPlayButtonTooltip(isDownloadPaused, localize) {
    return isDownloadPaused ? localize('resume') : localize('pause');
  }

  _togglePaliCheckbox(e) {
    const langName = e.target.textContent.trim();
    const langObj = this.paliLookupLanguages.find(item => item.name === langName);
    langObj.enabled = !langObj.enabled;
    this._setShouldButtonBeActive();
    this._changeLookupsDownloadSize();
  }

  _toggleChineseCheckbox(e) {
    const langName = e.target.textContent.trim();
    const langObj = this.chineseLookupLanguages.find(item => item.name === langName);
    langObj.enabled = !langObj.enabled;
    this._setShouldButtonBeActive();
    this._changeLookupsDownloadSize();
  }

  _resumeOrPauseDownload() {
    this.isDownloadPaused = !this.isDownloadPaused;
    this.isDownloadPaused ? this._pauseDownload() : this._resumeDownload();
  }

  _resumeDownload() {
    this._cacheAllItems();
    this.isDownloadPaused = false;
  }

  _pauseDownload() {
    this.D3queue.abort();
    this.isDownloadPaused = true;
  }

  _stopDownload() {
    this.D3queue.abort();
    delete this.D3queue;
    this.cacheDownloadInProgress = false;
    this._showToast('info', this.localize('canceled'));
  }

  _toggleLookupsOpen() {
    const lookupsContainer = this.shadowRoot.querySelector('#lookups_container');
    lookupsContainer.classList.toggle('open');
  }

  _getDefaultPaliLookupDictionaryLang(siteLangIsoCode) {
    const lookupLang = this.paliLookupLanguages.filter(language => language.isoCode === siteLangIsoCode);
    if (lookupLang && lookupLang.length > 0) {
      return lookupLang[0];
    }
    else return { name: 'English', isoCode: 'en' };
  }

  _showAddToHomeScreenPrompt() {
    window.deferredPWAInstallPrompt.prompt();
  }

  _showToast(type, inputMessage) {
    this.dispatchEvent(new CustomEvent('show-sc-toast', {
      detail: {
        toastType: type,
        message: inputMessage
      },
      bubbles: true,
      composed: true
    }));
  }

  _computeSizesUrl() {
    return `${API_ROOT}/pwa/sizes`;
  }

  _activatePaliDictToLang(defaultPaliDictToLang, oldValue) {
    let changed = false;
    this.paliLookupLanguages.forEach(lang => {
      if (lang.isoCode === defaultPaliDictToLang.isoCode) {
        lang.enabled = true;
        changed = true;
      } else if (oldValue && lang.isoCode === oldValue.isoCode) {
        lang.enabled = false;
        changed = true;
      }
    });
    if (changed) {
      this._changeLookupsDownloadSize();
    }
  }

  _calculateLookupSizes() {
    if (!(this.PWASizes && this.paliLookupLanguages && this.chineseLookupLanguages)) {
      return;
    }
    let size = 0;
    [this.paliLookupLanguages, this.chineseLookupLanguages].forEach(lookupLanguages => {
      lookupLanguages.forEach(lang => {
        if (lang.enabled) {
          size += this.PWASizes.root.lookup.pli[lang.isoCode];
        }
      });
    });
    return size;
  }

  _calculateTotalDownloadSize() {
    if (!(this.PWASizes && this.chosenLanguageIsoCode)) {
      return;
    }
    let size = 0;
    size += this.PWASizes[this.chosenLanguageIsoCode].base;

    if (this.shouldDownloadRootTexts) {
      size += this.PWASizes.root.base;
      if (this.shouldDownloadParallels) {
        size += this.PWASizes.root.parallels;
      }

    } else {
      if (this.shouldDownloadParallels) {
        size += this.PWASizes[this.chosenLanguageIsoCode].parallels;
      }
    }
    return size;
  }

  _changeLookupsDownloadSize() {
    this.downloadSizeFromLookups = this._calculateLookupSizes();
  }

  _setDownloadSize() {
    this.downloadSize = this.downloadSizeFromComputed + this.downloadSizeFromLookups;
  }

  _showDownloadSize(size) {
    if (size) {
      const size_in_MB = size / 1024 / 1024;
      return `[~${size_in_MB.toFixed(2)} MB]`;
    } else {
      return '';
    }
  }
}

customElements.define('sc-offline-page', SCOfflinePage);
