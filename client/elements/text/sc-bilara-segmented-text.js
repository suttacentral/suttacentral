import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { store } from '../../redux-store';

import '../addons/sc-nav-contents';
import { SCLitTextPage } from "./sc-lit-text-page.js";
import './sc-text-options.js';
import '../lookups/sc-pli.js';
import '../lookups/sc-lzh2en.js';
import { Transliterator } from './transliterator.js';

//import '../addons/sc-super-title'
import '../addons/sc-bottom-sheet';
import {
  commonStyles,
  plainStyles,
  plainPlusStyles,
  sideBySideStyles,
  sideBySidePlusStyles,
  lineByLineStyles,
  lineByLinePlusStyles,
  allInlineReferenceStyles,
  mainInlineReferenceStyles
} from '../styles/sc-bilara-segmented-text-styles.js';

class SCBilaraSegmentedText extends SCLitTextPage {
  static get properties() {
    return {
      navItems: { type: Array },
      rootSutta: { type: Object },
      bilaraRootSutta: { type: Object },
      translatedSutta: { type: Object },
      bilaraTranslatedSutta: { type: Object },
      showParagraphs: { type: Boolean },
      paragraphs: { type: Array },
      paragraphTitles: { type: Object },
      rootAuthor: { type: String },
      rootLang: { type: String },
      rootTitle: { type: String },
      translationAuthor: { type: String },
      translationLang: { type: String },
      translatedTitle: { type: String },
      suttaReference: { type: Object },
      suttaComment: { type: Object },
      suttaVariant: { type: Object },
      isLoading: { type: Boolean },
      error: { type: Object },
      isTextViewHidden: { type: Boolean },
      hidden: { type: Boolean },
      chosenTextView: { type: String },
      chosenReferenceDisplayType: { type: String },
      chosenNoteDisplayType: { type: String },
      paliScript: { type: String },
      markup: { type: String },
      isPaliLookupEnabled: { type: Boolean },
      spansForWordsGenerated: { type: Boolean },
      spansForGraphsGenerated: { type: Boolean },
      isChineseLookupEnabled: { type: Boolean },
      scriptIsoCodes: { type: Object },
      segmentedIDsAdded: { type: Boolean },
      hasScriptBeenChanged: { type: Boolean },
      localizedStringsPath: { type: String },
      currentId: { type: String },
      currentSutta: { type: Object },
      currentStyles: { type: Object }
    }
  }

  constructor() {
    super();
    let textOptions = store.getState().textOptions;
    this.showParagraphs = textOptions.paragraphsEnabled;
    this.paragraphs = textOptions.paragraphDescriptions;
    this.isLoading = false;
    this.isTextViewHidden = false;
    this.hidden = false;
    this.chosenTextView = textOptions.segmentedSuttaTextView;
    this.chosenReferenceDisplayType = textOptions.referenceDisplayType;
    this.chosenNoteDisplayType = textOptions.noteDisplayType;
    this.paliScript = textOptions.script;
    this.isPaliLookupEnabled = textOptions.paliLookupActivated;
    this.spansForWordsGenerated = false;
    this.spansForGraphsGenerated = false;
    this.isChineseLookupEnabled = textOptions.chineseLookupActivated;
    this.scriptIsoCodes = {
      'latin': 'Latn',
      'sinhala': 'Sinh',
      'devanagari': 'Deva',
      'thai': 'Thai',
      'myanmar': 'Mymr'
    };
    this.segmentedIDsAdded = false;
    this.hasScriptBeenChanged = false;
    this.localizedStringsPath = '/localization/elements/sc-text';
    this.currentId = '';
    this.currentSutta = {};
    this.translationTextSelector = '.translation .text';
    this.rootTextSelector = '.root .text';
    this.commentSpanRectInfo = new Map();
    this.variantSpanRectInfo = new Map();
    this.mapTypeOfNeedToRecalculate = new Map([
      ['.comment', this.commentSpanRectInfo],
      ['.variant', this.variantSpanRectInfo]
    ]);
    // Return the corresponding style sheet according to different combinations of text viewing options.
    this.mapStyle = new Map([
      ['none_none_plain', plainStyles],
      ['main_none_plain', mainInlineReferenceStyles],
      ['all_none_plain', allInlineReferenceStyles],
      ['none_asterisk_plain', plainStyles],
      ['main_asterisk_plain', mainInlineReferenceStyles],
      ['all_asterisk_plain', allInlineReferenceStyles],
      ['none_sidenotes_plain', plainPlusStyles],
      ['main_sidenotes_plain', plainPlusStyles],
      ['all_sidenotes_plain', plainPlusStyles], 
      ['none_none_sidebyside', sideBySideStyles],
      ['main_none_sidebyside', sideBySideStyles],
      ['all_none_sidebyside', sideBySideStyles],
      ['none_asterisk_sidebyside', sideBySideStyles],
      ['main_asterisk_sidebyside', sideBySideStyles],
      ['all_asterisk_sidebyside', sideBySideStyles],
      ['none_sidenotes_sidebyside', sideBySidePlusStyles],
      ['all_sidenotes_sidebyside', sideBySidePlusStyles],
      ['main_sidenotes_sidebyside', sideBySidePlusStyles],
      ['none_none_linebyline', lineByLineStyles],
      ['all_none_linebyline', lineByLineStyles],
      ['main_none_linebyline', lineByLineStyles],
      ['none_asterisk_linebyline', lineByLineStyles],
      ['all_asterisk_linebyline', lineByLineStyles],
      ['main_asterisk_linebyline', lineByLineStyles],
      ['none_sidenotes_linebyline', lineByLinePlusStyles],
      ['all_sidenotes_linebyline', lineByLinePlusStyles],
      ['main_sidenotes_linebyline', lineByLinePlusStyles],
    ]);
  }

  render() {
    return html`
      <style>${commonStyles}</style>
      ${this.currentStyles}

      <sc-nav-contents .items="${this.navItems}"></sc-nav-contents>
      <main>
        <div id="segmented_text_content" class="html-text-content" ?hidden="${this.isTextViewHidden}">
          <!-- <sc-super-title></sc-super-title> -->
          ${unsafeHTML(this.markup)}
        </div>
      </main>

      <sc-pali-lookup id="pali_lookup"></sc-pali-lookup>
      <sc-chinese-lookup id="chinese_lookup"></sc-chinese-lookup>
      <sc-bottom-sheet></sc-bottom-sheet>
    `;
  }

  firstUpdated() {
    this._updateView();
    this.addEventListener('click', () => { this._hideSettingMenu() });
  }

  _hideSettingMenu() {
    this.dispatchEvent(new CustomEvent('hide-sc-top-sheet', {
      bubbles: true,
      composed: true
    }));
  }

  _updateView() {
    setTimeout(() => {
      this._addTranslationText();
      this._addRootText();
      this._initReference();
      this._addReferenceText();
      //this._addCommentText();
      this._addVariantText();
      //this._addCommentSpanId();
      if (this.isPaliLookupEnabled) {
        this._initPaliLookup();
      }
    }, 100);
    //this.navItems = this._prepareNavigation();
    this.currentSutta = this.translatedSutta ? this.translatedSutta : this.rootSutta;

    setTimeout(() => {
      //this._recalculateCommentSpanHeight();
      this._changeTextView();
    }, 0);
  }
  
  _segmentedTextContentElement() {
    return this.shadowRoot.querySelector('#segmented_text_content');
  }

  _articleElement() {
    return this.shadowRoot.querySelector('article');
  }

  _shouldShowLoadingIndicator() {
    return ((!this.error && this.loading) || this.isTextViewHidden);
  }

  _recalculateCommentSpanHeight() {
    let gutterWidth = 5;
    this.commentSpanRectInfo.clear();
    const Comments = this.shadowRoot.querySelectorAll('.comment');
    Comments.forEach(element => {
      let rect = element.getBoundingClientRect();
      let elementNoId = element.id.slice(8); //id:comment_1 => get: 1
      let nextComment = this.shadowRoot.querySelector(`#comment_${parseInt(elementNoId) + 1}`);
      if (nextComment) {
        let nextCommentTop = nextComment.getBoundingClientRect().top;
        if (rect.top + rect.height > nextCommentTop) {
          element.style.height = nextCommentTop - rect.top - gutterWidth + 'px';
          element.style.overflow = 'scroll';
        }
      } else {
        if (rect.top + rect.height > this.parentNode.clientHeight) {
          element.style.height = this.parentNode.clientHeight - rect.top + 'px';
          element.style.overflow = 'scroll';
        }
      }
      this.commentSpanRectInfo.set(element.id, element.style.height);
    });
    this._addCommentSpanMouseEvent();
  }

  _resetCommentSpan() {
    const Comments = this.shadowRoot.querySelectorAll('.comment');
    Comments.forEach(element => {
      element.removeAttribute('style');
      element.onmouseover = null;
      element.onmouseleave = null;
    });
  }

  _getCommentSpanRectInfo() {
    this.commentSpanRectInfo.clear();
    const Comments = this.shadowRoot.querySelectorAll('.comment');
    Comments.forEach(element => {
      this.commentSpanRectInfo.set(element.id, element.getBoundingClientRect());
    });
  }

  _addCommentSpanId() {
    let wordIdSeed = 0;
    this.shadowRoot.querySelectorAll('span.comment').forEach((word) => {
      word.id = `comment_${wordIdSeed}`;
      wordIdSeed++;
    });
  }

  _addCommentSpanMouseEvent() {
    const Comments = this.shadowRoot.querySelectorAll('.comment');
    Comments.forEach(element => {
      element.onmouseover = (e) => {
        e.currentTarget.style.overflow = 'auto';
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.zIndex = '1100';
      };
      element.onmouseleave = (e) => {
        e.currentTarget.style.overflow = 'auto';
        e.currentTarget.style.height = this.commentSpanRectInfo.get(e.currentTarget.id);
        e.currentTarget.style.zIndex = '1';
      };
    });
  }

  updated(changedProps) {
    if (changedProps.has('showParagraphs')) {
      //this._computeParagraphs();
    }
    if (changedProps.has('isLoading')) {
      //this._loadingChanged();
    }
    if (changedProps.has('chosenTextView')) {
      this._changeTextView();
    }
    if (changedProps.has('paliScript')) {
      this._changeScript();
    }
    if (changedProps.has('isPaliLookupEnabled')) {
      this._paliLookupStateChanged();
    }
    if (changedProps.has('isChineseLookupEnabled')) {
      //this._chineseLookupStateChanged();
    }
    if (changedProps.has('currentStyles')) {
      if (this._isPlusStyle()) {
        //this._recalculateCommentSpanHeight();
      } else {
        //this._resetCommentSpan();
      }
    }
    if (changedProps.has('markup')) {
      this._updateView();
    }
    if (changedProps.has('chosenReferenceDisplayType')) {
      this._changeTextView();
    }
    if (changedProps.has('chosenNoteDisplayType')) {
      this._changeTextView();
    }
  }

  _isPlusStyle() {
    return this.currentStyles === plainPlusStyles
            || this.currentStyles === sideBySidePlusStyles
              || this.currentStyles === lineByLinePlusStyles;
  }

  _paliLookupStateChanged() {
    if (this.hidden) {
      return;
    }
    if (this.isPaliLookupEnabled) {
      if (!this.spansForWordsGenerated) {
        //this._conditionallyPutWordsIntoSpans();
        this._initPaliLookup();
      }
    }
  }

  _chineseLookupStateChanged() {
    if (this.hidden) {
      return;
    }
    if (this.isChineseLookupEnabled) {
      if (!this.spansForGraphsGenerated) {
        this._conditionallyPutIntoSpans('lzh');
      }
    }
  }

  _conditionallyPutIntoSpans(lang) {
    if (this.translatedSutta && this.translatedSutta.lang === lang) {
      this._putIntoSpans('.translation', lang);
    } else if (this.rootSutta.lang === lang) {
      if (this.shadowRoot.querySelector('.root')) {
        this._putIntoSpans('.root', lang);
      }
    }
  }

  _putIntoSpans(selector, lang) {
    if (lang === 'pli') {
      this._putWordsIntoSpans(selector, 'word');
    } else if (lang === 'lzh') {
      this._putGraphsIntoSpans(selector, 'graph');
    }
  }

  _changeTextView() {
    let viewCompose = `${this.chosenReferenceDisplayType}_${this.chosenNoteDisplayType}_${this.chosenTextView}`;
    this.currentStyles = this.mapStyle.get(viewCompose) ? this.mapStyle.get(viewCompose) : plainStyles;
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.chosenTextView !== state.textOptions.segmentedSuttaTextView) {
      this.chosenTextView = state.textOptions.segmentedSuttaTextView;
    }
    if (this.paliScript !== state.textOptions.script) {
      this.paliScript = state.textOptions.script;
    }
    if (this.isPaliLookupEnabled !== state.textOptions.paliLookupActivated) {
      this.isPaliLookupEnabled = state.textOptions.paliLookupActivated;
    }
    if (this.chosenReferenceDisplayType !== state.textOptions.referenceDisplayType) {
      this.chosenReferenceDisplayType = state.textOptions.referenceDisplayType;
    }
    if (this.chosenNoteDisplayType !== state.textOptions.noteDisplayType) {
      this.chosenNoteDisplayType = state.textOptions.noteDisplayType;
    }
  }

  async _getStyleByTextview() {
    let allStyles = await import('../styles/sc-bilara-segmented-text-styles.js');
  }

  _prepareNavigation() {
    let sutta = this.translatedSutta ? this.translatedSutta : this.rootSutta;
    if (!sutta) {
      return;
    }
    const dummyElement = document.createElement('template');
    dummyElement.innerHTML = this.markup.trim();
    let arrayTOC = Array.from(dummyElement.content.querySelectorAll('h2')).map(elem => {
      const id = elem.firstElementChild.id;
      if (sutta.strings[id]) {
        return { link: id, name: this._stripLeadingOrdering(sutta.strings[id]) };
      }
    });
    arrayTOC = arrayTOC.filter(Boolean);
    return arrayTOC;
  }

  _stripLeadingOrdering(name) {
    return name.replace(/^\d+\./, '').trim();
  }

  get actions() {
    return {
      changeSuttaMetaText(metaText) {
        store.dispatch({
          type: 'CHANGE_SUTTA_META_TEXT',
          metaText: metaText
        });
      },
      chooseSegmentedSuttaTextView(viewNumber) {
        store.dispatch({
          type: 'CHOOSE_SEGMENTED_SUTTA_TEXT_VIEW',
          view: viewNumber
        })
      }
    }
  }

  _addRootText() {
    if (!this.bilaraRootSutta) {
      return;
    }
    let articleElement = this._articleElement();
    let mapSutta = new Map(Object.entries(this.bilaraRootSutta));
    if (!mapSutta || !articleElement) {
      return;
    }

    this._deleteRootSuttaMarkup();
    this._addRootSuttaMarkup();

    mapSutta.forEach((value, key, mapSutta) => {
      let escapeKey = key.replace(/:/g, '\\\:').replace(/\./g, '\\\.');
      const spanElement = articleElement.querySelector(`#${escapeKey} .root .text`);
      if (spanElement) {
        spanElement.innerHTML = this._tweakText(value);
      }
    })
  }

  _deleteRootSuttaMarkup() {
    let articleElement = this._articleElement();
    const rootMarkup = articleElement.querySelectorAll('.root [lang=pli-Latn]');
    if (rootMarkup) {
      rootMarkup.forEach((element) => { element.parentNode.removeChild(element) });
    }
  }

  _deleteTranslatedSuttaMarkup() {
    let articleElement = this._articleElement();
    const translatedSuttaMarkup = articleElement.querySelectorAll('.translation');
    if (translatedSuttaMarkup) {
      translatedSuttaMarkup.forEach((element) => { element.parentNode.removeChild(element) });
    }
  }

  _addRootSuttaMarkup() {
    let articleElement = this._articleElement();
    let mapSutta = new Map(Object.entries(this.bilaraRootSutta));

    if (articleElement && mapSutta) {
      mapSutta.forEach((value, key, mapSutta) => {
        let escapeKey = key.replace(/:/g, '\\\:').replace(/\./g, '\\\.');
        const segmentElement = articleElement.querySelector(`#${escapeKey}`);
        if (segmentElement) {
          segmentElement.appendChild(this._addRootSuttaSpan());
        } else {
          let newSegmentElement = this._addSegmentSpan();
          newSegmentElement.appendChild(this._addRootSuttaSpan());
          articleElement.appendChild(newSegmentElement);
        }
      })
    }
  }

  _addTranslationSuttaMarkup() {
    let articleElement = this._articleElement();
    let mapSutta = new Map(Object.entries(this.bilaraTranslatedSutta));
    if (articleElement && mapSutta) {
      mapSutta.forEach((value, key, mapSutta) => {
        let escapeKey = key.replace(/:/g, '\\\:').replace(/\./g, '\\\.');
        const segmentElement = articleElement.querySelector(`#${escapeKey}`);
        if (segmentElement) {
          segmentElement.appendChild(this._addTranslationSuttaSpan());
        } else {
          //let newSegmentElement = this._addSegmentSpan();
          //newSegmentElement.appendChild(this._addTranslationSuttaSpan());
          //articleElement.appendChild(newSegmentElement);
        }
      })
    }
  }

  _addTranslationSuttaSpan() {
    let spanElement = document.createElement('span');
    spanElement.className = 'translation';
    spanElement.lang = 'en';//this.translatedSutta.lang;
    let textSpan = document.createElement('span');
    textSpan.className = 'text';
    spanElement.appendChild(textSpan);
    return spanElement;
  }

  _initReference() {
    if (!this.bilaraRootSutta) {
      return
    }

    let articleElement = this._articleElement();
    let mapSutta = new Map(Object.entries(this.bilaraRootSutta));
    if (articleElement && mapSutta) {
      mapSutta.forEach((value, key, mapSutta) => {
        let escapeKey = key.replace(/:/g, '\\\:').replace(/\./g, '\\\.');
        const segmentElement = articleElement.querySelector(`#${escapeKey}`);
        if (segmentElement) {
          let refSpan = this._addReferenceSpan();
          refSpan.appendChild(this._addDefaultReferenceAnchor(key));
          this._prependChild(segmentElement, refSpan);
          //segmentElement.appendChild(refSpan);
        }
      })
    }
  }

  _prependChild(parent, newChild) {
    if (parent.firstChild) {
      parent.insertBefore(newChild, parent.firstChild);
    } else {
      parent.appendChild(newChild);
    }
    return parent;
  }

  _addDefaultReferenceAnchor(key) {
    let subKey = key.substring(key.indexOf(':') + 1, key.length);
    let anchor = document.createElement('a');
    anchor.className = 'sc';
    anchor.id = subKey;
    anchor.href = `#${subKey}`;
    anchor.title = 'SuttaCentral segment number';
    let text = document.createTextNode(subKey);
    anchor.appendChild(text);
    return anchor;
  }

  _addCommentText() {
    if (!this.suttaComment) {
      return;
    }
    let articleElement = this._articleElement();
    let mapComment = new Map(Object.entries(this.suttaComment));
    if (articleElement && mapComment) {
      mapComment.forEach((value, key, mapComment) => {
        let escapeKey = key.replace(/:/g, '\\\:').replace(/\./g, '\\\.');
        const translationSpan = articleElement.querySelector(`#${escapeKey} .translation`);
        if (translationSpan) {
          translationSpan.appendChild(this._addCommentSpan(value));
        }
      })
    }
  }

  _addCommentSpan(value) {
    let span = document.createElement('span');
    span.className = 'comment';
    span.title = 'translator’s note';
    span.dataset.tooltip = value;
    let text = document.createTextNode(value);
    span.appendChild(text);
    return span;
  }

  _addVariantText() {
    if (!this.suttaVariant) {
      return;
    }
    let articleElement = this._articleElement();
    let mapVariant = new Map(Object.entries(this.suttaVariant));
    if (articleElement && mapVariant) {
      mapVariant.forEach((value, key, mapComment) => {
        let escapeKey = key.replace(/:/g, '\\\:').replace(/\./g, '\\\.');
        const rootSpan = articleElement.querySelector(`#${escapeKey} .root`);
        if (rootSpan) {
          rootSpan.appendChild(this._addVariantSpan(value));
        }
      })
    }
  }

  _addVariantSpan(value) {
    let span = document.createElement('span');
    span.className = 'variant';
    span.dataset.tooltip = value;
    span.appendChild(this._addVariantNoteWrapSpan(value));
    return span;
  }

  _addVariantNoteWrapSpan(value) {
    let span = document.createElement('span');
    span.className = 'note-wrap';
    let smallElement = document.createElement('small');
    let text = document.createTextNode('Variant reading');
    smallElement.appendChild(text);
    text = document.createTextNode(value);
    span.appendChild(smallElement);
    span.appendChild(text);
    return span;
  }

  _addSegmentSpan(key) {
    let span = document.createElement('span');
    span.className = 'segment';
    span.id = key;
    return span;
  }

  _addRootSuttaSpan() {
    let spanElement = document.createElement('span');
    spanElement.className = 'root';
    spanElement.lang = this.rootSutta.lang;
    let textSpan = document.createElement('span');
    textSpan.className = 'text';
    spanElement.appendChild(textSpan);
    return spanElement;
  }

  _addReferenceSpan() {
    let spanElement = document.createElement('span');
    spanElement.className = 'reference';
    return spanElement;
  }

  _addReferenceText() {
    if (!this.suttaReference) {
      return;
    }
    let articleElement = this._articleElement();
    let mapRef = new Map(Object.entries(this.suttaReference));
    if (articleElement && mapRef) {
      mapRef.forEach((value, key, mapRef) => {
        let escapeKey = key.replace(/:/g, '\\\:').replace(/\./g, '\\\.');
        const refElement = articleElement.querySelector(`#${escapeKey} .reference`);
        if (refElement) {
          this._addReferenceAnchor(value, refElement);
        }
      })
    }
  }

  _addReferenceAnchor(ref, refElement) {
    let arrayRef = ref.replace(/\s*/g,'').split(',');  //"pts1ed1.1, pts2ed1.1, sc1" or  "pts-cs1.1, pts-vp-pli1.1, sc1"
    if (arrayRef.length === 0) return;
    arrayRef.forEach(item => {
      // 1:pts????, 2:pts-?????
      if (item.length > 3 && (item.substring(0, 3).toLowerCase() === 'pts' || item.substring(0, 4).toLowerCase() === 'pts-')) {
        let anchor = document.createElement('a');
        anchor.className = 'pts';
        anchor.title = 'Pali Text Society vol/page number.';

        let refStr = '';
        if (item.substring(0, 4).toLowerCase() === 'pts-') {
          refStr = item.slice(4)
        } else if ((item.substring(0, 3).toLowerCase() === 'pts')) {
          refStr = item.slice(3)
        }
        if (refStr !== '') {
          this._initPtsReferenceAnchor(anchor, refStr);
          refElement.appendChild(anchor);
        }
      }
    });
  }

  //<a class="pts" id="2ed1.1" title="Pali Text Society vol/page number." href="#2ed1.1">2ed1.1</a> 
  _initPtsReferenceAnchor(anchor, refStr) {
    anchor.id = refStr;
    anchor.href = `#${refStr}`;
    let text = document.createTextNode(refStr);
    anchor.appendChild(text);
  }

  _addTranslationText() {
    if (!this.bilaraTranslatedSutta) {
      return;
    }
    let articleElement = this._articleElement();
    let mapSutta = new Map(Object.entries(this.bilaraTranslatedSutta));
    if (articleElement && mapSutta) {
      this._deleteTranslatedSuttaMarkup();
      this._addTranslationSuttaMarkup();

      mapSutta.forEach((value, key) => {
        let escapeKey = key.replace(/:/g, '\\\:').replace(/\./g, '\\\.');
        const spanElement = articleElement.querySelector(`#${escapeKey} .translation .text`);
        if (spanElement) {
          spanElement.innerHTML = this._tweakText(value);
        }
      })
    }
  }

  _tweakText(text) {
    return text + (text.match(/—$/) ? '' : ' ');
  }

  _putWordsIntoSpans(selector, unit) {
    this._startGeneratingSpans(selector, unit);
  }

  _startGeneratingSpans(selector, unit) {
    let segments = this.shadowRoot.querySelectorAll(selector);
    segments = Array.from(segments);
    let empty = true;
    while (segments.length > 0) {
      const segment = segments.shift();
      if (!segment) {
        return;
      }
      empty = false;
      this._putSegmentIntoSpans(segment, unit);
      //this._addLookupTooltips(segment);
    }
    if (empty) {
      return;
    }
    if (unit === 'word') {
      this.spansForWordsGenerated = true;
    } else if (unit === 'graph') {
      this.spansForGraphsGenerated = true;
    }
  }

  _putSegmentIntoSpans(segment, unit) {
    const text = segment.innerHTML;
    let div = document.createElement('div');
    div.innerHTML = text;
    this._recurseDomChildren(div, true, unit);
    segment.innerHTML = div.innerHTML.replace(/%spfrnt%/g, `<span class="word">`).replace(/%spback%/g, '</span>').replace(/—/g, '</span>—<span class="word">');
  }

  _recurseDomChildren(start, output, unit) {
    let nodes;
    if (start.childNodes) {
      nodes = start.childNodes;
      this._loopNodeChildren(nodes, output, unit);
    }
  }

  _loopNodeChildren(nodes, output, unit) {
    let node;
    for (let i = 0; i < nodes.length; i++) {
      node = nodes[i];
      this._addSpanToNode(node, unit);
      if (node.childNodes) {
        this._recurseDomChildren(node, output, unit);
      }
    }
  }

  _addSpanToNode(node, unit) {
    const NODE_TYPE_TEXT = 3;
    if (node.nodeType !== NODE_TYPE_TEXT) return;
    let tt = node.data;
    let strArr = tt.split(/\s+/g);
    let str = '';
    for (let i = 0; i < strArr.length; i++) if (strArr[i]) {
      if (unit === 'word') {
        str += `%spfrnt%${strArr[i]}%spback% `;
      } else if (unit === 'graph') {
        for (let graph of strArr[i]) {
          str += `%spfrnt%${graph}%spback%`;
        }
        str += ' ';
      }
    }
    node.data = str;
  }

  _addWordSpanId() {
    let wordIdSeed = 0;
    this.shadowRoot.querySelectorAll('span.word').forEach((word) => {
      word.id = `word_${wordIdSeed}`;
      wordIdSeed++;
    });
  }

  _addLookupEvent(selector) {
    let paliLookup = this.shadowRoot.querySelector('#pali_lookup');
    let allWordSpans = this.shadowRoot.querySelectorAll(selector);
    let arraySpans = Array.from(allWordSpans);
    arraySpans.forEach(word => {
      word.addEventListener('click', (e) => {
        if (!this.isPaliLookupEnabled) return;
        const scBottomSheet = this.shadowRoot.querySelector('sc-bottom-sheet');
        if (scBottomSheet) {
          this._removeDefineFocusedClass();
          this._addDefineFocusedClass(e.currentTarget);
          this._setSCBottomSheet(scBottomSheet, word, paliLookup, e.currentTarget);
        }
      });
    });
  }

  _addDefineFocusedClass(currentTarget) {
    currentTarget.classList.add('spanFocused');
  }

  _removeDefineFocusedClass() {
    this.shadowRoot.querySelectorAll('.spanFocused').forEach((dfElement) => {
      dfElement.classList.remove('spanFocused');
    });
  }

  _setSCBottomSheet(scBottomSheet, word, paliLookup, currentTarget) {
    scBottomSheet.currentDefine = word.textContent;
    let lookupResult = paliLookup.lookupWord(word.dataset.latin_text || word.textContent);
    scBottomSheet.currentDefineDetail = lookupResult.html;
    scBottomSheet.currentTarget = currentTarget;
    scBottomSheet.paliLookup = paliLookup;
    scBottomSheet.show();
  }

  _initPaliLookup() {
    this._putWordsIntoSpans('.root .text', 'word');
    this._addWordSpanId();
    this._addLookupEvent('.root .text .word');
  }

  _conditionallyPutWordsIntoSpans() {
    if (this.translatedSutta && (this.translatedSutta.lang === 'pli' || this.translatedSutta.lang === 'lzh')) {
      this._putWordsIntoSpans('.translation .text', 'word');
    } else if (this.rootSutta.lang === 'pli' || this.rootSutta.lang === 'lzh') {
      if (this.shadowRoot.querySelector('.root')) {
        this._initPaliLookup();
      }
    }
  }

  _changeScript() {
    if (!this.rootSutta || this.rootSutta.lang !== 'pli') {
      return;
    }

    const segments = this.shadowRoot.querySelectorAll('.root');
    const scriptNames = Object.keys(this.scriptIsoCodes);
    if (this.hasScriptBeenChanged) {
      this._resetScript(segments);
    }
    if (this.paliScript === 'latin') {
      this._segmentedTextContentElement().classList.add('latin-script');
      // set the latin text segment iso codes, if not set already
      if (!this._segmentedTextContentElement().querySelector(`.original-text[lang='pli-Latn']`)) {
        segments.forEach((item) => this._setScriptISOCode(item, this.rootLang));
      }
      this.hasScriptBeenChanged = false;
    } else if (scriptNames.includes(this.paliScript)) { // if the script name is valid:
      this._setScript(segments);
      this.hasScriptBeenChanged = true;
    }
    if (!this.translatedSutta) { // if we're in a segmented root text, set the top text div lang attribute:
      this._setScriptISOCode(this._segmentedTextContentElement(), this.rootLang);
    } else {
      this._segmentedTextContentElement().removeAttribute('lang');
    }
  }

  _setScriptISOCode(targetNode, langAttr) {
    if (langAttr === 'pli' && this.paliScript) {
      langAttr += `-${this.scriptIsoCodes[this.paliScript]}`;
    }
    targetNode.setAttribute('lang', langAttr);
  }

  _resetScript(segments) {
    Object.keys(this.scriptIsoCodes).forEach((scriptName) => {
      this._segmentedTextContentElement().classList.remove(`${scriptName}-script`);
    });
    Array.from(segments).forEach(item => {
      let words = item.querySelectorAll('.word');
      Array.from(words).forEach(word => word.innerHTML = word.dataset.latin_text || word.innerHTML);
    });
  }

  _setScript(segments) {
    this._segmentedTextContentElement().classList.add(`${this.paliScript}-script`);
    const transLiterator = new Transliterator();
    const scriptFunctionName = `to${this._scriptFunctionName()}`;
    this._ensureSpansExist();
    this._setScriptOfSegments(segments, scriptFunctionName, transLiterator);
  }

  _ensureSpansExist() {
    if (!this.spansForWordsGenerated) {
      this._conditionallyPutWordsIntoSpans();
    }
  }

  _setScriptOfSegments(segments, scriptFunctionName, t) {
    Array.from(segments).forEach(item => {
      this._setScriptISOCode(item, this.rootLang);
      let words = item.querySelectorAll('.word');
      Array.from(words).forEach(word => {
        word.dataset.latin_text = word.innerHTML;
        word.innerHTML = t[scriptFunctionName](word.innerHTML);
      })
    });
  }

  _scriptFunctionName() {
    return this.paliScript.charAt(0).toUpperCase() + this.paliScript.slice(1);
  }
}

customElements.define('sc-bilara-segmented-text', SCBilaraSegmentedText);