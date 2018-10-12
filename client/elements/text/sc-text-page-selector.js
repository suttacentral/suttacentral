import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/iron-icon/iron-icon.js';

import './sc-segmented-text.js';
import './sc-simple-text.js';
import './sc-stepper.js';
import './sc-text-image.js';
import { ReduxMixin } from '/redux-store.js';
import { Localized } from '../addons/localization-mixin.js';
import { textHeadingStyles } from '../styles/sc-text-heading-styles.js';
import { API_ROOT } from '../../constants.js';

/*
  This element makes a server request for a sutta text, dispatches it to the redux store and subsequently shows
  either the simple sutta text view or the segmented view.
*/

class SCTextPageSelector extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    ${textHeadingStyles}
    <style>
      .loading-indicator {
        @apply --sc-skolar-font-size-s;
        text-align: center;
        height: 60px;
        margin-top: 25vh;
      }

      .text-options {
        padding: var(--sc-size-lg);
      }

      .wrapper {
        min-height: calc(100% - var(--sc-size-xxl) * 2.5);
      }

      .text-error {
        @apply --center;
        @apply --sc-sans-font;
        text-align: center;
        color: var(--sc-secondary-text-color);
      }

      .network-error-icon {
        width: var(--sc-size-xxl);
        height: var(--sc-size-xxl);
      }
    </style>

    <iron-ajax id="sutta_text_ajax" url="[[_getSuttaTextUrl()]]" debounce-duration="500" handle-as="json" loading="{{isLoading}}" last-error="{{lastError}}" last-response="{{responseData}}"></iron-ajax>

    <iron-ajax id="uid_expansion_ajax" url="[[_getExpansionUrl()]]" handle-as="json" last-response="{{expansionReturns}}"></iron-ajax>

    <div class="wrapper">
      <template is="dom-if" if="[[!_shouldDisplayError(rootSutta, translatedSutta, lastError)]]">
        <sc-text-options id="sutta_text_options" class="text-options" suttaplex-item="[[suttaplex]]"></sc-text-options>
      </template>

      <div class="loading-indicator" hidden\$="[[!isLoading]]">
        <paper-spinner-lite active="[[isLoading]]"></paper-spinner-lite>
      </div>

      <template is="dom-if" if="[[!_shouldHideSimpleText(isSegmentedText, isLoading)]]">
        <sc-simple-text id="simple_text" sutta="[[translatedSutta]]" is-loading="{{isLoading}}" error="[[lastError]]" hidden\$="[[_shouldHideSimpleText(isSegmentedText, isLoading)]]">
        </sc-simple-text>
      </template>

      <template is="dom-if" if="[[!_shouldHideSegmentedText(isSegmentedText, isLoading)]]" restamp="">
        <sc-segmented-text id="segmented_text" root-sutta="[[rootSutta]]" markup="[[markup]]" translated-sutta="[[translatedSutta]]" root-lang="[[responseData.root_text.lang]]" is-loading="{{isLoading}}" error="[[lastError]]" hidden\$="[[_shouldHideSegmentedText(isSegmentedText, isLoading)]]">
        </sc-segmented-text>
      </template>

      <template is="dom-if" if="[[_shouldDisplayError(rootSutta, translatedSutta, lastError)]]">
        <div class="text-error">
          <iron-icon class="network-error-icon" src="/img/nonetwork.svg"></iron-icon>
          <h2>Network Error</h2>
          <h3>[[lastError.statusText]]</h3>
        </div>
      </template>

    </div>

    <template is="dom-if" if="[[_shouldDisplayStepper(isLoading, next, previous)]]">
      <sc-stepper next="[[next]]" previous="[[previous]]" lang="[[langIsoCode]]"></sc-stepper>
    </template>

    <sc-text-image id="sc_text_image"></sc-text-image>
    [[_createMetaData(responseData, expansionReturns, localize)]]
    `;
  }

  static get properties() {
    return {
      responseData: {
        type: Object,
        observer: '_onResponse'
      },
      lastError: {
        type: Object
      },
      author: {
        type: String
      },
      suttaId: {
        type: String
      },
      langIsoCode: {
        type: String
      },
      stopRequests: {
        type: Boolean
      },
      isSegmentedText: {
        type: Boolean
      },
      suttaplex: {
        type: Object
      },
      translatedSutta: {
        type: Object
      },
      rootSutta: {
        type: Object
      },
      markup: {
        type: String
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-text'
      },
      authorUid: {
        type: String
      },
      authorShort: {
        type: String
      },
      next: {
        type: Object
      },
      previous: {
        type: Object
      },
      expansionReturns: {
        type: Array
      }
    }
  }

  static get observers() {
    return ['_paramChanged(authorUid, suttaId, langIsoCode)'];
  }

  static get actions() {
    return {
      downloadSuttaText(text) {
        return {
          type: 'DOWNLOAD_SUTTA_TEXT',
          text: text
        }
      },
      changeToolbarTitle(title) {
        return {
          type: 'CHANGE_TOOLBAR_TITLE',
          title: title
        };
      },
    }
  }

  ready() {
    super.ready();
    this.addEventListener('show-image', e => {
      this.$.sc_text_image.showImage(e.detail);
    });
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
    this.dispatch('downloadSuttaText', this.responseData);
  }

  _getExpansionUrl() {
    return `${API_ROOT}/expansion`;
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
  }

  _paramChanged() {
    // The stopRequests variable exists so that we don't make 3 consequent requests in case the
    // author, suttaId and the langIsoCode all change at the same time.
    if (!this.stopRequests) {
      this.stopRequests = true;
      // wait 50ms until all route parameters are changed
      setTimeout(() => {
        this.$.sutta_text_ajax.url = this._getSuttaTextUrl();
        this.$.sutta_text_ajax.generateRequest();
        this.$.uid_expansion_ajax.url = this._getExpansionUrl();
        this.$.uid_expansion_ajax.generateRequest();
        this.stopRequests = false;
      }, 50);
    }
  }

  _shouldHideSimpleText(isSegmentedText, isLoading) {
    return (isSegmentedText || isLoading);
  }

  _shouldHideSegmentedText(isSegmentedText, isLoading) {
    return (!isSegmentedText || isLoading);
  }

  _getSuttaTextUrl() {
    if (this.authorUid) {
      return `${API_ROOT}/suttas/${this.suttaId}/${this.authorUid}?lang=${this.langIsoCode}`;
    } else {
      return `${API_ROOT}/suttas/${this.suttaId}?lang=${this.langIsoCode}`;
    }
  }

  _shouldDisplayStepper(isLoading, next, previous) {
    return !isLoading && (next || previous);
  }

  _shouldDisplayError(rootSutta, translatedSutta, networkError) {
    return (!rootSutta && !translatedSutta) || networkError;
  }

  _updateToolbar(title) {
    this.dispatch('changeToolbarTitle', title);
  }

  _createMetaData(responseData, expansionReturns, localize) {
    if (!responseData) {
      return;
    }
    // The localization on this page does not work.
    // There is a bug report for this so in the mean time I use English.
    // let description = localize('metaDescriptionText');
    let description = "Early Buddhist texts and modern translations. Suttas (sutras) from the Tipitaka (Tripitaka) in Pali, Chinese, Sanskrit, and Tibetan with the Buddha's teachings on mindfulness, insight, wisdom, and meditation."
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
        bubbles: true,
        composed: true
      }
    }));

    this._updateToolbar(`${title}—${author}`);
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
}

customElements.define('sc-text-page-selector', SCTextPageSelector);
