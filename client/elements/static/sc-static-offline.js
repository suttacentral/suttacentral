import { LitElement, html, css } from 'lit';
import { queue } from 'd3-queue';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LitLocalized } from '../addons/sc-localization-mixin';
import '@material/web/checkbox/checkbox';
import '@material/web/button/filled-button';
import '@material/web/button/outlined-button';
import '@material/web/field/filled-field';
import '@material/web/progress/linear-progress';
import { icon } from '../../img/sc-icon';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { SCUtilityStyles } from '../styles/sc-utility-styles';
import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';

export class SCStaticOffline extends LitLocalized(LitElement) {
  static properties = {
    isCanceled: { type: Boolean },
    isPWASupport: { type: Boolean },
    isDownloadButtonDisabled: { type: Boolean },
    defaultPaliDictToLang: { type: Object },
    paliLookupLanguages: { type: Array },
    chineseLookupLanguages: { type: Array },
    cacheDownloadInProgress: { type: Boolean },
    shouldDownloadParallels: { typo: Boolean },
    shouldDownloadRootTexts: { typo: Boolean },
    isDownloadPaused: { type: Boolean },
    downloadSize: { type: Number },
    downloadSizeFromComputed: { type: Number },
    PWASizes: { type: Object },
    chosenLanguageNativeName: { type: String },
    downloadProgressPercentage: { type: Number },
    previousDownloadedUrls: { type: Object },
    downloadedUrls: { type: Object },
    currentDownloadingUrl: { type: String },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/offline';
    this.paliLookupLanguages = [
      {
        name: 'English',
        isoCode: 'en',
        enabled: false,
      },
      {
        name: 'Español',
        isoCode: 'es',
        enabled: false,
      },
      {
        name: 'Deutsch',
        isoCode: 'de',
        enabled: false,
      },
      {
        name: '汉语',
        isoCode: 'zh',
        enabled: false,
      },
      {
        name: 'Português',
        isoCode: 'pt',
        enabled: false,
      },
      {
        name: 'Bahasa Indonesia',
        isoCode: 'id',
        enabled: false,
      },
      {
        name: 'Nederlands',
        isoCode: 'nl',
        enabled: false,
      },
    ];
    this.chineseLookupLanguages = [
      {
        name: 'English',
        isoCode: 'en',
        enabled: false,
      },
    ];
    this.cacheDownloadInProgress = false;
    this.shouldDownloadParallels = true;
    this.shouldDownloadRootTexts = true;
    this.isPWASupport = 'serviceWorker' in navigator;
    this.isDownloadButtonDisabled = !this.isPWASupport || this.cacheDownloadInProgress;
    this.isDownloadPaused = false;
    this.downloadProgressPercentage = 0;
    this.downloadedUrls = store.getState().downloadedUrls;
    this.isCanceled = false;
    this.siteLanguage = store.getState().siteLanguage;
  }

  get actions() {
    return {
      saveDownloadedUrls(downloadedUrls) {
        return store.dispatch({
          type: 'SAVE_DOWNLOADED_URLS',
          downloadedUrls,
        });
      },
      saveDownloadedPWASettings(downloadedPWASettings) {
        return store.dispatch({
          type: 'SAVE_DOWNLOADED_PWA_SETTINGS',
          downloadedPWASettings,
        });
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    fetch(`${API_ROOT}/pwa/sizes`)
      .then(r => r.json())
      .then(data => {
        this.PWASizes = data;
      });
    this.defaultPaliDictToLang = this._getDefaultPaliLookupDictionaryLang();
    this.chosenLanguageNativeName = this.fullSiteLanguageName;
    this.chosenLanguageIsoCode = this.language;
    this.downloadSizeFromLookups = this._calculateLookupSizes();
    this.downloadSizeFromComputed = this._calculateTotalDownloadSize();
    this.downloadSize = this._setDownloadSize();
    this._handleNetworkLoss();
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this.chosenLanguageNativeName = this.fullSiteLanguageName;
    }
  }

  _handleNetworkLoss() {
    window.addEventListener('offline', () => {
      if (!this.D3queue || this.isDownloadPaused) return;
      this._pauseDownload();
      this.isDownloadPaused = true;
      this.isDownloadPausedBecauseOffline = true;
      this._showToast('info', this.localize('offline:networkLost'));
    });
    window.addEventListener('online', () => {
      if (!this.D3queue || !this.isDownloadPausedBecauseOffline) return;
      this._resumeDownload();
      this.cacheDownloadInProgress = true;
      this.isDownloadPaused = false;
      this.isDownloadPausedBecauseOffline = false;
      this._showToast('info', this.localize('offline:networkRecovered'));
    });
  }

  _getDefaultPaliLookupDictionaryLang() {
    const siteIsoCode = this.language;
    const siteLookupLang = this.paliLookupLanguages.find(
      language => language.isoCode === siteIsoCode
    );
    const lookupLang =
      siteLookupLang || this.paliLookupLanguages.find(language => language.isoCode === 'en');
    lookupLang.enabled = true;
    return lookupLang;
  }

  _setPaliLookup({ target }) {
    const isoCode = target.value;
    const lang = this.paliLookupLanguages.find(item => item.isoCode === isoCode);
    lang.enabled = !lang.enabled;
    this._changeLookupsDownloadSize();
  }

  _setChineseLookup({ target }) {
    const isoCode = target.value;
    const lang = this.paliLookupLanguages.find(item => item.isoCode === isoCode);
    lang.enabled = !lang.enabled;
    this._changeLookupsDownloadSize();
  }

  _changeLookupsDownloadSize() {
    this.downloadSizeFromLookups = this._calculateLookupSizes();
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

  _setDownloadSize() {
    this.downloadSize = this.downloadSizeFromComputed + this.downloadSizeFromLookups;
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
    } else if (this.shouldDownloadParallels) {
      size += this.PWASizes[this.chosenLanguageIsoCode].parallels;
    }
    return size;
  }

  _getDownloadButtonText() {
    if (this.isDownloadPaused) {
      return this.localize('offline:downloadPaused');
    }
    if (this.cacheDownloadInProgress) {
      return this.localize('offline:downloadInProgress');
    }
    if (this.isDownloadButtonDisabled) {
      return this.localize('offline:alreadyDownloaded');
    }
    return `${this.localizeEx(
      'offline:downloadButton',
      'languageName',
      this.chosenLanguageNativeName
    )} ${this._showDownloadSize(this.downloadSize)}`;
  }

  _showDownloadSize(size) {
    if (size) {
      const size_in_MB = size / 1024 / 1024;
      return `[~${size_in_MB.toFixed(2)} MB]`;
    }
    return '';
  }

  makeOffline() {
    this._showToast('info', this.localize('offline:downloadStarted'));
    this.cacheDownloadInProgress = true;
    fetch(this._getCollectionUrl('sutta'))
      .then(r => r.json())
      .then(data => {
        this.downloadProgressPercentage = 0;
        this.allURLs = this._buildUrlList(data);
        this._cacheAllItems();
      })
      .catch(error => {
        this._showToast('error', this.localize('offline:networkError'));
        this.cacheDownloadInProgress = false;
        console.error(error.error);
      });
  }

  _calculateCurrentProgress() {
    const progressAmountPerOneCall = this.allURLs.length / 100;
    const actualLength = this.allURLs.filter(v => this.downloadedUrls[v.url]).length;
    return Math.floor(actualLength / progressAmountPerOneCall);
  }

  _cacheAllItems() {
    let failed = 0;
    let passed = 0;
    let interval = 0;
    const progressBar = this.shadowRoot.querySelector('md-linear-progress');
    this.isDownloadPaused = false;
    this.D3queue = queue(20);
    const filteredUrls = this.allURLs.filter(v => !this.downloadedUrls[v.url]);
    filteredUrls.forEach(input => {
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
              this.actions.saveDownloadedUrls(this.downloadedUrls);
            }
            callback(null);
          })
          .catch(err => {
            failed++;
            console.error(err);
            callback(null);
          });
      }, input);
    });
    this.D3queue.await(e => {
      if (this.isDownloadPaused) {
        return;
      }
      this.cacheDownloadInProgress = false;
      if (this.isCanceled) {
        this.isCanceled = false;
        this._showToast('info', this.localize('offline:canceled'));
        return;
      }
      if (failed === 0) {
        this._saveDownloadedSettings();
        this._showToast(
          'success',
          this.localize('offline:downloadComplete', 'lang', this.chosenLanguageNativeName)
        );
      } else if (failed > 0 && passed > 0) {
        this._showToast(
          'error',
          this.localizeEx('offline:downloadErrored', 'failed', failed, 'total', passed + failed)
        );
      } else {
        this._showToast('error', this.localize('offline:networkError'));
      }
    });
  }

  _saveDownloadedSettings() {
    const downloadedPWASettings = { ...this.downloadedPWASettings };
    if ('languages' in downloadedPWASettings) {
      if (
        !downloadedPWASettings.languages.root ||
        !downloadedPWASettings.languages.root.parallels
      ) {
        downloadedPWASettings.languages.root = { parallels: this.shouldDownloadParallels };
      }
      if (
        !downloadedPWASettings.languages[this.chosenLanguageIsoCode] ||
        !downloadedPWASettings.languages[this.chosenLanguageIsoCode].parallels
      ) {
        downloadedPWASettings.languages[this.chosenLanguageIsoCode] = {
          parallels: this.shouldDownloadParallels,
        };
      }
    }
    if ('lookups' in downloadedPWASettings) {
      this.paliLookupLanguages.forEach(l => {
        downloadedPWASettings.lookups.pali[l.isoCode] = !!(
          l.enabled || downloadedPWASettings.lookups.pali[l.isoCode]
        );
      });
      this.chineseLookupLanguages.forEach(l => {
        downloadedPWASettings.lookups.chinese[l.isoCode] = !!(
          l.enabled || downloadedPWASettings.lookups.chinese[l.isoCode]
        );
      });
    }
    this.actions.saveDownloadedPWASettings(downloadedPWASettings);
  }

  _updateUi(progressBar, currentUrl) {
    progressBar.buffer = this._calculateCurrentProgress();
    this.downloadProgressPercentage = progressBar.buffer;
    this.currentDownloadingUrl = currentUrl.slice(currentUrl.indexOf('api') + 4);
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

  _buildUrlList(response) {
    const menuURLs = response.menu.map(menuId => this._getMenuUrl(menuId));
    const suttaFullPathURLs = response.menu.map(menuId => this.#getSuttaFullPath(menuId));
    const suttaplexURLs = response.suttaplex.map(suttaplexId => this._getSuttaplexUrl(suttaplexId));
    const suttaTextURLs = this._buildSuttaTextUrlList(response);
    const parallelURLs = this.shouldDownloadParallels
      ? response.texts.map(text => this._getParallelUrl(text.uid))
      : [];
    const paragraphURLs = this._getParagraphUrls();
    const expansionURL = this.#getExpansionUrl();
    const rootEditionURL = this.#getRootEdition();
    const lookupURLs = this._buildLookupUrlList(
      this.paliLookupLanguages,
      this.chineseLookupLanguages
    );

    return menuURLs
      .concat(suttaFullPathURLs)
      .concat(suttaplexURLs)
      .concat(suttaTextURLs)
      .concat(parallelURLs)
      .concat(paragraphURLs)
      .concat(expansionURL)
      .concat(rootEditionURL)
      .concat(lookupURLs)
      .map(url => ({ url, done: false }));
  }

  _buildSuttaTextUrlList(response) {
    const suttaTextURLs = [];
    response.texts.forEach(text => {
      text.translations.forEach(translation => {
        translation.authors.forEach(author => {
          suttaTextURLs.push(this._getSuttaTextUrl(text.uid, author, translation.lang));
          suttaTextURLs.push(this._getBilaraSuttaTextUrl(text.uid, author, translation.lang));
        });
      });
    });
    return suttaTextURLs;
  }

  _getMenuUrl(menuItemId) {
    return `${API_ROOT}/menu/${menuItemId}?language=${this.chosenLanguageIsoCode}`;
  }

  #getSuttaFullPath(menuItemId) {
    return `${API_ROOT}/suttafullpath/${menuItemId}`;
  }

  _getSuttaplexUrl(suttaplexId) {
    return `${API_ROOT}/suttaplex/${suttaplexId}?language=${this.chosenLanguageIsoCode}`;
  }

  _getParallelUrl(parallelId) {
    return `${API_ROOT}/parallels/${parallelId}`;
  }

  _getParagraphUrls() {
    return `${API_ROOT}/paragraphs`;
  }

  #getExpansionUrl() {
    return `${API_ROOT}/expansion`;
  }

  #getRootEdition() {
    return `${API_ROOT}/root_edition`;
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

  _getLookupUrl(fromLang, toLang) {
    return `${API_ROOT}/dictionaries/lookup?from=${fromLang}&to=${toLang}`;
  }

  _getChineseLookupUrl(fromLang, toLang, fallback) {
    return `${API_ROOT}/dictionaries/lookup?from=${fromLang}&to=${toLang}&fallback=${fallback}`;
  }

  _getSuttaTextUrl(suttaId, authorId, langIsoCode) {
    return `${API_ROOT}/suttas/${suttaId}/${authorId}?lang=${langIsoCode}&siteLanguage=${this.siteLanguage}`;
  }

  _getBilaraSuttaTextUrl(suttaId, authorId, langIsoCode) {
    return `${API_ROOT}/bilarasuttas/${suttaId}/${authorId}?lang=${langIsoCode}`;
  }

  _showToast(type, inputMessage) {
    this.dispatchEvent(
      new CustomEvent('show-sc-toast', {
        detail: {
          toastType: type,
          message: inputMessage,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = [
    layoutSimpleStyles,
    typographyCommonStyles,
    SCUtilityStyles,
    css`
      md-filled-button,
      md-outlined-button {
        --md-sys-color-primary: var(--sc-primary-accent-color);
        --md-sys-color-on-primary: white;
        --md-outlined-button-label-text-font: var(--sc-sans-font);
        --md-outlined-button-label-text-size: var(--sc-size-md);
      }

      .option-multi-select {
        display: flex;
        flex-direction: column;
        padding-top: 1em;
      }

      .option-multi-select > * {
        margin-bottom: 15px;
      }

      md-checkbox,
      md-linear-progress {
        --md-sys-color-primary: var(--sc-primary-accent-color);
        --md-sys-color-on-primary: white;
      }

      md-linear-progress {
        width: 100%;
      }

      md-checkbox {
        margin-right: 0.5em;
      }

      md-filled-button {
        width: 100%;
        --md-filled-button-label-text-font: var(--sc-sans-font);
        --md-filled-button-label-text-size: var(--sc-size-md);
      }

      h3 + div {
        margin-top: 0.75em;
      }

      .button-row {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;
        margin-bottom: 2em;
      }

      #pwa-support-info {
        display: inline-flex;
        align-items: center;
      }

      .card {
        font-family: var(--sc-sans-font);
        margin-bottom: 120px;
        background-color: var(--sc-tertiary-background-color);
        background-clip: border-box;
        border: 1px solid var(--sc-border-color);
        border-radius: 0.25rem;
      }

      .card-header {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .card-header,
      .card-body,
      .card-footer {
        margin: 1em;
      }

      .pointer {
        cursor: pointer;
      }

      .check_circle_outline {
        fill: var(--sc-primary-accent-color);
        margin-left: 0.5em;
      }

      .highlight_off {
        fill: var(--sc-toast-error-color);
        margin-left: 0.5em;
      }

      .play_arrow,
      .stop {
        fill: var(--sc-icon-color);
      }

      label {
        gap: 0;
      }

      @media (max-width: 680px) {
        .card {
          width: 300px;
        }
      }
    `,
  ];

  _resetDownloadHistory() {
    this.actions.saveDownloadedUrls({});
    this.actions.saveDownloadedPWASettings({
      languages: {},
      lookups: {
        pali: {},
        chinese: {},
      },
    });
    this.downloadedUrls = store.getState().downloadedUrls;
    this._showToast('info', this.localize('offline:resetComplete'));
  }

  _showAddToHomeScreenPrompt() {
    if (window.deferredPWAInstallPrompt) {
      window.deferredPWAInstallPrompt.prompt();
    }
  }

  _resumeOrPauseDownload() {
    if (this.cacheDownloadInProgress) {
      this.isDownloadPaused = !this.isDownloadPaused;
      this.isDownloadPaused ? this._pauseDownload() : this._resumeDownload();
    }
  }

  _stopDownload() {
    if ('D3queue' in this) {
      this.isCanceled = true;
      this.D3queue.abort();
      delete this.D3queue;
    }
  }

  _resumeDownload() {
    this._cacheAllItems();
    this.isDownloadPaused = false;
  }

  _pauseDownload() {
    this.D3queue.abort();
    this.isDownloadPaused = true;
  }

  render() {
    return html`
      <main>
        <article class="row">
          <h1>${this.localize('offline:usingOffline')}</h1>
          <p id="pwa-support-info">
            ${this.isPWASupport
              ? html` ${this.localize('offline:supportsPWAs')} ${icon.check_circle_outline} `
              : html` ${this.localize('offline:doesntSupportPWAs')} ${icon.highlight_off} `}
          </p>
          <p>${unsafeHTML(this.localize('offline:pwaDescription'))}</p>
          <p>${this.localize('offline:additionalInfo')}</p>
          <p>${this.localize('offline:newTech')}</p>
          <ul>
            <li>${this.localize('offline:suttasOnly')}</li>
            <li>${this.localize('offline:oneLang')}</li>
            <li>${this.localize('offline:certainFunctions')}</li>
          </ul>
          <p>${this.localize('offline:extraFeatures')}</p>
          <hr />
          <div class="row">
            <h3>${this.localize('offline:language')}</h3>
            <p>${this.localize('offline:selectDifferentLang')}</p>
            <h3>${this.localize('offline:downloadParallels')}</h3>
            <div>
              <label>
                <md-checkbox
                  ?checked=${this.shouldDownloadParallels}
                  ?disabled=${this.isDownloadButtonDisabled}
                  @change=${() => (this.shouldDownloadParallels = !this.shouldDownloadParallels)}
                ></md-checkbox>
                ${this.localize('offline:downloadParallelsDescription')}
              </label>
            </div>
          </div>
          <div class="row">
            <h3>${this.localize('offline:downloadRootTexts')}</h3>
            <div>
              <label>
                <md-checkbox
                  ?checked=${this.shouldDownloadRootTexts}
                  ?disabled=${this.isDownloadButtonDisabled}
                  @change=${() => (this.shouldDownloadRootTexts = !this.shouldDownloadRootTexts)}
                ></md-checkbox>
                ${this.localizeEx(
                  'offline:downloadRootTextsDescription',
                  'toLang',
                  this.defaultPaliDictToLang.name
                )}
              </label>
            </div>
          </div>
          <div class="row">
            <h3>${this.localize('offline:paliLookups')}</h3>
            <p>${this.localize('offline:paliLookupsDescription')}</p>
            <div class="option-multi-select">
              ${this.paliLookupLanguages.map(
                lang => html`
                  <label>
                    <md-checkbox
                      value=${lang.isoCode}
                      ?checked=${lang.enabled}
                      ?disabled=${this.isDownloadButtonDisabled}
                      @change=${this._setPaliLookup}
                    ></md-checkbox>
                    ${lang.name}
                  </label>
                `
              )}
            </div>
          </div>
          <div class="row">
            <h3>${this.localize('offline:chineseLookups')}</h3>
            <p>${this.localize('offline:chineseLookupsDescription')}</p>
            <div class="option-multi-select">
              ${this.chineseLookupLanguages.map(
                lang => html`
                  <label>
                    <md-checkbox
                      value=${lang.isoCode}
                      ?checked=${lang.enabled}
                      ?disabled=${this.isDownloadButtonDisabled}
                      @change=${this._setChineseLookup}
                    ></md-checkbox>
                    ${lang.name}
                  </label>
                `
              )}
            </div>
          </div>
          <hr />
          <div class="row button-row">
            <md-filled-button @click=${this.makeOffline}
              >${this._getDownloadButtonText()}</md-filled-button
            >
          </div>
          <div class="row button-row">
            <md-outlined-button @click=${this._showAddToHomeScreenPrompt}
              >${this.localize('offline:addToHomeScreen')}</md-outlined-button
            >
            <md-outlined-button @click=${this._resetDownloadHistory}
              >${this.localize('offline:resetButton')}</md-outlined-button
            >
          </div>
          ${this.cacheDownloadInProgress
            ? html`
                <div class="row">
                  <div class="card">
                    <div class="card-header">
                      ${this.localize('offline:downloading')}: ${this.currentDownloadingUrl}
                    </div>
                    <div class="card-body">
                      <span class="pointer" @click=${this._resumeOrPauseDownload}>
                        ${icon.play_arrow}
                      </span>
                      <span class="pointer" @click=${this._stopDownload}>${icon.stop}</span>
                    </div>
                    <div class="card-footer">
                      <md-linear-progress indeterminate></md-linear-progress>
                      <div class="download-progress-percentage">
                        ${this.downloadProgressPercentage}%
                      </div>
                    </div>
                  </div>
                </div>
              `
            : ''}
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-offline', SCStaticOffline);
