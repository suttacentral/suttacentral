import { LitElement, html } from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';

import './sc-bilara-segmented-text.js';
import './sc-simple-text.js';
import './sc-stepper.js';
import './sc-text-image.js';
import '../addons/sc-error-icon.js';
import '../addons/sc-bouncing-loader';

import { store } from '../../redux-store';
import { LitLocalized } from '../../elements/addons/localization-mixin';
import { API_ROOT } from '../../constants.js';

import { navIndex } from '../navigation/sc-navigation-common.js'
/*
  This element makes a server request for a sutta text, dispatches it to the redux store and subsequently shows
  either the simple sutta text view or the segmented view.
*/

class SCTextPageSelector extends LitLocalized(LitElement) {
  render() {
    return html`
      <style>
        .loading-indicator {
          font-size: var(--sc-skolar-font-size-s);
          text-align: center;
          height: 60px;
          margin-top: 25vh;
        }

        .text-options {
          padding: var(--sc-size-lg);
        }

        .wrapper {
          flex: 1;
        }

        .sutta-list {
          max-width: 720px;
          transition: margin-top 0.3s, margin-bottom 0.3s;
          margin: 0 auto var(--sc-size-xxl);
        }
      </style>

      <div class="wrapper">
        ${this.displaySCTextOptions}
        <div class="loading-indicator" ?hidden=${!this.isLoading}>
          <sc-bouncing-loader></sc-bouncing-loader>
        </div>
        ${this.displaySimpleTextTemplate}
        ${this.displaySegmentedTextTemplate}
        ${this.displayError}
      </div>
      ${this.displayStepper}
      <sc-text-image id="sc_text_image"></sc-text-image>

      ${this._createMetaData(this.responseData, this.expansionReturns)}
    `;
  }

  get displayStepper() {
    return this._shouldDisplayStepper() ? html`
      <sc-stepper .next=${this.next} .previous=${this.previous} .lang="${this.langIsoCode}"></sc-stepper>
    ` : '';
  }

  get displayError() {
    return this._shouldDisplayError() ? html`
      <sc-error-icon type="data-load-error"></sc-error-icon>
    ` : '';
  }

  get displaySCTextOptions() {
    return !this._shouldDisplayError() && this.displayTextOptions ? html`
      <!-- <sc-text-options id="sutta_text_options" class="text-options" .suttaplexItem=${this.suttaplex}></sc-text-options> -->
      <br/>
      <div class="sutta-list" id="suttaList">
        <sc-suttaplex .item=${this.suttaplex}></sc-suttaplex>
      </div>
    ` : '';
  }

  get displaySimpleTextTemplate() {
    return !this._shouldHideSimpleText() ? html`
      <sc-simple-text
        id="simple_text"
        .sutta=${this.translatedSutta}
        .isLoading=${this.isLoading}
        .error=${this.lastError}
        ?hidden=${this._shouldHideSimpleText()}>
      </sc-simple-text>
    ` : '';
  }

  get displaySegmentedTextTemplate() {
    if (!this.responseData || !this.responseData.root_text) {
      return '';
    }
    return !this._shouldHideSegmentedText() ? html`
      <sc-bilara-segmented-text
        id="segmented_text"
        .rootSutta=${this.rootSutta}
        .bilaraRootSutta=${this.bilaraRootSutta}
        .markup="${this.suttaMarkup}"
        .translatedSutta=${this.translatedSutta}
        .bilaraTranslatedSutta=${this.bilaraTranslatedSutta}
        .suttaComment=${this.suttaComment}
        .suttaReference=${this.suttaReference}
        .suttaVariant=${this.suttaVariant}
        .isLoading=${this.isLoading}
        .error=${this.lastError}>
      </sc-bilara-segmented-text>
    ` : '';
  }

  static get properties() {
    return {
      responseData: { type: Object }, //observer: '_onResponse'
      lastError: { type: Object },
      author: { type: String },
      suttaId: { type: String },
      langIsoCode: { type: String },
      stopRequests: { type: Boolean },
      isSegmentedText: { type: Boolean },
      suttaplex: { type: Object },
      translatedSutta: { type: Object },
      rootSutta: { type: Object },
      bilaraRootSutta: { type: Object },
      bilaraTranslatedSutta: { type: Object },
      suttaReference: { type: Object },
      suttaComment: { type: Object },
      suttaVariant: { type: Object },
      suttaMarkup: { type: String },
      markup: { type: String },
      bilaraSuttaMarkup: { type: String },
      localizedStringsPath: { type: String }, //value: '/localization/elements/sc-text'
      authorUid: { type: String },
      authorShort: { type: String },
      next: { type: Object },
      previous: { type: Object },
      expansionReturns: { type: Array }, //observer: '_onResponseExpansionData'
      showedLanguagePrompt: { type: Boolean }, //statePath: 'showedLanguagePrompt'
      isLoading: { type: Boolean },
      haveBilaraSegmentedText: { type: Boolean },
      bilaraDataPath: { type: String },
      displayTextOptions: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-text';
    this.showedLanguagePrompt = store.getState().showedLanguagePrompt;
    this.isLoading = false;
    this.bilaraDataPath = '/files/bilara-data';
    this.displayTextOptions = store.getState().displayParallels;
  }

  get actions() {
    return {
      downloadSuttaText(text) {
        store.dispatch({
          type: 'DOWNLOAD_SUTTA_TEXT',
          text: text
        });
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title: title
        });
      },
      setShowedLanguagePrompt() {
        store.dispatch({
          type: 'SET_SHOWED_LANGUAGE_PROMPT',
          showedLanguagePrompt: true
        });
      },
      setNavigation(navArray) {
        store.dispatch({
          type: 'SET_NAVIGATION',
          navigationArray: navArray
        })
      }
    }
  }

  firstUpdated() {
    this._fetchExpansion();
    this.addEventListener('show-image', e => {
      let scTextImageElement = this.shadowRoot.querySelector('#sc_text_image');
      if (scTextImageElement) {
        scTextImageElement.showImage(e.detail);
      }
    });
  }
  
  _updateNav() {
    let navIndexesOfType = navIndex.get('sutta');
    let navArray = store.getState().navigationArray;
    let suttaTitle = this.responseData.translation ? this.responseData.translation.title : '';
    if (suttaTitle === '') {
      suttaTitle = this.responseData.suttaplex.translated_title ? this.responseData.suttaplex.translated_title : this.responseData.suttaplex.original_title;
    }
    navArray[navIndexesOfType.index] = {
      title: suttaTitle,
      url: store.getState().currentRoute.path,
      type: navIndexesOfType.type,
      position: navIndexesOfType.position,
      navigationArrayLength: navIndexesOfType.navArrayLength
    };
    this.actions.setNavigation(navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
  }

  updated(changedProps) {
    //super.updated(changedProps);
    if (changedProps.has('responseData')) {
      this._onResponse();
    }
    if (changedProps.has('expansionReturns')) {
      this._onResponseExpansionData();
    }
    if (changedProps.has('authorUid') || changedProps.has('suttaId') || changedProps.has('langIsoCode')) {
      this._paramChanged();
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.displayTextOptions !== state.displayParallels) {
      this.displayTextOptions = state.displayParallels;
    }
  }

  languageLoaded() {
    if (this.langIsoCode !== 'en' && !this.showedLanguagePrompt) {
      this.actions.setShowedLanguagePrompt();
      this._showLanguagePromptToast();
    }
  }

  _onResponse() {
    if (!this.responseData) {
      return;
    }
    this.setProperties();
    const textOptions = this.shadowRoot.querySelector('#sutta_text_options');
    if (textOptions) {
      textOptions._closeSuttaplex();
    }
    this.actions.downloadSuttaText(this.responseData);
  }

  _onResponseExpansionData() {
    this._fetchSuttaText();
  }

  setProperties() {
    if (this.responseData) {
      this.isSegmentedText = !!(this.responseData.segmented);
      this.suttaplex = this.responseData.suttaplex;
      this.translatedSutta = this.responseData.translation;
      this.rootSutta = this.responseData.root_text;
      this.markup = this.responseData.markup;
      if (this.responseData.translation) {
        this.authorUid = this.responseData.translation.author_uid;
      }
      if (this.translatedSutta) {
        this.next = this.translatedSutta.next;
        this.previous = this.translatedSutta.previous;
      } else if (this.rootSutta) {
        this.next = this.rootSutta.next;
        this.previous = this.rootSutta.previous;
      }
    }

    if (this.next && !this.next.name) {
      this.next.name = this._transformId(this.next.uid, this.expansionReturns);
    }
    if (this.previous && !this.previous.name) {
      this.previous.name = this._transformId(this.previous.uid, this.expansionReturns);
    }

    this._getBilaraText();
    this._updateNav();
  }

  _getSuttaTextUrl() {
    if (this.authorUid) {
      return `${API_ROOT}/suttas/${this.suttaId}/${this.authorUid}?lang=${this.langIsoCode}`;
    } else {
      return `${API_ROOT}/suttas/${this.suttaId}?lang=${this.langIsoCode}`;
    }
  }

  _getBilaraTextUrl() {
    if (this.authorUid) {
      return `${API_ROOT}/bilarasuttas/${this.suttaId}/${this.authorUid}?lang=${this.langIsoCode}`;
    } else {
      return `${API_ROOT}/bilarasuttas/${this.suttaId}?lang=${this.langIsoCode}`;
    }
  }

  async _fetchSuttaText() {
    this.isLoading = true;
    try {
      this.responseData = await (await fetch(this._getSuttaTextUrl())).json();
    } catch (error) {
      this.lastError = error;
    }
    this.isLoading = false;
  }

  async _fetchBilaraText() {
    this.isLoading = true;
    try {
      let bilaraData = await (await fetch(this._getBilaraTextUrl())).json();
      this.bilaraRootSutta = bilaraData.root_text;
      this.bilaraTranslatedSutta = bilaraData.translation_text;
      this.bilaraSuttaMarkup = bilaraData.html_text;
      this.suttaReference = bilaraData.reference_text;
      this.suttaComment = bilaraData.comment_text;
      this.suttaVariant = bilaraData.variant_text;
    } catch (error) {
      this.lastError = error;
    }
    this.isLoading = false;
  }

  _getBilaraText() {
    this._generateMarkup();
  }

  async _generateMarkup() {
    await this._fetchBilaraText();
    if (!this.bilaraSuttaMarkup) {
      return;
    }
    let mapSuttaMarkup = new Map(Object.entries(this.bilaraSuttaMarkup));
    if (!mapSuttaMarkup) {
      return;
    }
    let suttaMarkup = '';
    mapSuttaMarkup.forEach((value, key) => {
      if (key !== '~') {
        if (value.includes('{}')) {
          suttaMarkup += value.replace(/{}/, `<span class="segment" id="${key}"></span>`);
        } else {
          suttaMarkup += value + `<span class="segment" id="${key}"></span>`;
        }
      } else {
        suttaMarkup += value;
      }
    });
    suttaMarkup = suttaMarkup.replace(/<article>/, '<article><header>');
    suttaMarkup = suttaMarkup.replace(/<\/h1><\/div>/, '</h1></div></header>');
    suttaMarkup = suttaMarkup.replace(/{}/g, '');
    this.suttaMarkup = suttaMarkup;
  }

  _getExpansionUrl() {
    return `${API_ROOT}/expansion`;
  }

  async _fetchExpansion() {
    this.isLoading = true;
    try {
      this.expansionReturns = await (await fetch(this._getExpansionUrl())).json();
    } catch (error) {
      this.lastError = error;
    }
    this.isLoading = false;
  }

  _paramChanged() {
    // The stopRequests variable exists so that we don't make 3 consequent requests in case the
    // author, suttaId and the langIsoCode all change at the same time.
    if (!this.stopRequests) {
      this.stopRequests = true;
      // wait 50ms until all route parameters are changed
      setTimeout(() => {
        if (!this.expansionReturns) {
          this._fetchExpansion();
        } else {
          this._fetchSuttaText();
        }
        this.stopRequests = false;
      }, 50);
    }
  }

  _shouldHideSimpleText() {
    return (this.isSegmentedText || this.isLoading);
  }

  _shouldHideSegmentedText() {
    return (!this.isSegmentedText || this.isLoading);
  }

  _shouldDisplayStepper() {
    return !this.isLoading && (this.next || this.previous);
  }

  _shouldDisplayError() {
    if (this.isLoading) {
      return false;
    }
    return (!this.rootSutta && !this.translatedSutta) || this.lastError;
  }

  _createMetaData(responseData, expansionReturns) {
    if (!responseData || !responseData.translation || !responseData.root_text) {
      return;
    }
    let description = this.localize('metaDescriptionText');
    if (responseData.suttaplex.blurb) {
      description = responseData.suttaplex.blurb;
    }
    let title = responseData.translation ? responseData.translation.title : '';
    if (title === '') {
      title = responseData.suttaplex.original_title;
    }
    const author = responseData.translation ? responseData.translation.author : responseData.root_text.author;
    const acronym = responseData.suttaplex.acronym ? responseData.suttaplex.acronym.split(/\/\//)[0] : this._transformId(responseData.suttaplex.uid, expansionReturns);

    document.dispatchEvent(new CustomEvent('metadata', {
      detail: {
        pageTitle: `${acronym}: ${title}—${author}`,
        title: `${title}—${author}`,
        description: description,
        openGraphType: 'article',  // To conform to the twitter cards and pinterest specification, "og:type" must be equal to ‘article’
        bubbles: true,
        composed: true
      }
    }));

    if (!title) {
      title = this._transformId(this.suttaId, this.expansionReturns);
    }
    this.actions.changeToolbarTitle(`${title}— ${author}`);
  }

  _transformId(rootId, expansionReturns) {
    if (!rootId || !expansionReturns) {
      return '';
    }
    let scAcronym = '';
    const uidParts = rootId.split('-');
    let tail = '';
    try {
      uidParts.forEach(item => {
        if (!expansionReturns[0][item]) {
          const tailMatch = item.match(/\d+.*/g);
          if (tailMatch) tail = tailMatch[0] + '–';
          const itemMatch = item.match(/[a-z]*/g);
          if (itemMatch) item = itemMatch[0];
        }
        if (item && expansionReturns[0][item]) {
          scAcronym += `${expansionReturns[0][item][0]} ${tail}`
        } else {
          scAcronym += tail;
        }
      });
      return scAcronym.replace(/–\s*$/, '');
    } catch (e) {
      console.error(e);
      return rootId;
    }
  }

  _showLanguagePromptToast() {
    this.dispatchEvent(new CustomEvent('show-sc-toast', {
      detail: {
        toastType: 'info',
        message: this.localize('languagePromptMessage')
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('sc-text-page-selector', SCTextPageSelector);
