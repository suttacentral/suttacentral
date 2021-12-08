/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { SCTextCommon } from './sc-text-common';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyLegacyStyles } from '../styles/sc-typography-legacy-styles';
import { typographyI18nStyles } from '../styles/sc-typography-i18n-styles';
import '../lookups/sc-lookup-lzh2en';
import { store } from '../../redux-store';
import { icon } from '../../img/sc-icon';

class SCTextLegacy extends SCTextCommon {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
          ${typographyCommonStyles}
          ${typographyLegacyStyles}
          ${typographyI18nStyles}
          .image-link {
          cursor: pointer;
        }

        .image-book-link {
          margin-bottom: 0.5em;
          margin-left: 0.2em;
        }

        .image-book-link:before {
          display: none;
        }

        .text-center {
          text-align: center;
        }

        .margin-top-xl {
          margin-top: var(--sc-size-xl);
        }

        article p,
        .word,
        .translated-text,
        .original-text {
          transition: background-color 300ms ease-in;
        }

        p,
        li {
          hanging-punctuation: first last;
        }
      </style>

      <main id="simple_text_content" class="html-text-content" ?hidden="${this.isTextViewHidden}">
        ${unsafeHTML(this._extractSuttaText())}
      </main>

      <sc-chinese-lookup id="chinese_lookup"></sc-chinese-lookup>
      <sc-bottom-sheet></sc-bottom-sheet>
    `;
  }

  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      // in simple texts, both root texts and translations are returned by the API in the translation object.
      sutta: { type: Object },
      // If true, shows the paragraph numbers on the right of the text.
      showParagraphs: { type: Boolean },
      paragraphs: { type: Array },
      suttaTitle: { type: String },
      author: { type: String },
      error: { type: Object },
      lang: { type: String },
      isLoading: { type: Boolean },
      isTextViewHidden: { type: Boolean },
      tooltipCount: { type: Number },
      spansForWordsGenerated: { type: Boolean },
      spansForGraphsGenerated: { type: Boolean },
      isChineseLookupEnabled: { type: Boolean },
      textualInfoClassTitles: { type: Object },
      classTitles: { type: Object },
      editionsExpansionData: { type: Object },
      localizedStringsPath: { type: String },
      inputElement: { type: Object },
      showHighlighting: { type: Boolean },
      chosenReferenceDisplayType: { type: String },
      navItems: { type: Array },
    };
  }

  constructor() {
    super();
    const textOptionsState = store.getState().textOptions;
    this.sutta = {};
    this.showParagraphs = false;
    this.paragraphs = textOptionsState.paragraphDescriptions;
    this.suttaTitle = '';
    this.author = '';
    this.lang = '';
    this.isLoading = false;
    this.isTextViewHidden = false;
    this.tooltipCount = 0;
    this.spansForWordsGenerated = false;
    this.spansForGraphsGenerated = false;
    this.isChineseLookupEnabled = textOptionsState.chineseLookupActivated;
    this.showHighlighting = textOptionsState.showHighlighting;
    this.chosenReferenceDisplayType = textOptionsState.referenceDisplayType;
    this.textualInfoClassTitles = {
      gloss: 'Definition of term.',
      add: 'Text added by the editor or translator for clarification',
      supplied: 'Text hypothetically reconstructed by the editor or translator.',
      supplied2: 'Text hypothetically reconstructed by the editor or translator.',
      expanded: 'Text expanded by editor or translator although elided in original.',
      surplus:
        'Text present in the source which the editor believes to be superfluous or redundant.',
      del: 'Text deleted by the editor as superfluous',
      'del-scribe': 'Text deleted by the scribe as superfluous',
      corrected: 'Corrected reading.',
    };
    this.classTitles = {
      gap: 'Gap in the manuscript.',
      't-gaiji': 'Chinese characters not in Unicode.',
      term: 'Defined term.',
      pe: 'Instructions for expanding text supplied by the editor or translator.',
      unclear: 'Unclear reading.',
      scribe: 'Note of attribution by the scribe of the manuscript.',
      suppliedmetre: 'Metre reconstructed by the editor.',
    };
    this.editionsExpansionData = {
      ms: 'Mūlasarvāstivādavinayavastu, part 1-4',
      dutt: 'Mūlasarvāstivādavinayavastu, part 1-4, Dutt (1939-1959)',
      divy: 'Divyāvadāna (1886)',
      ms84: 'Mūlasarvāstivādavinayavastu, part 1-4, (1984)',
    };
    this.localizedStringsPath = '/localization/elements/interface';
    this.inputElement = {};
    this._hashChangeHandler = () => {
      setTimeout(() => {
        this._scrollToSection(window.location.hash.substr(1));
      }, 0);
    };
  }

  get actions() {
    return {
      changeSuttaMetaText(metaText) {
        store.dispatch({
          type: 'CHANGE_SUTTA_META_TEXT',
          metaText,
        });
      },
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display,
        });
      },
      showToc(tableOfContents) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_TOC_BUTTON_STATE',
          payload: {
            tableOfContents,
            disableToCListStyle: true,
          },
        });
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this._hashChangeHandler);
    this.addEventListener('click', () => {
      this._hideTopSheets();
      this.actions.changeDisplaySettingMenuState(false);
    });
    this.inputElement = this.querySelector('#simple_text_content');
  }

  firstUpdated() {
    this._updateView();
  }

  _hideTopSheets() {
    const scActionItems = document
      .querySelector('sc-site-layout')
      .querySelector('#action_items');
    scActionItems?.hideItems();
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this._hashChangeHandler);
  }

  _hideSettingMenu() {
    this.dispatchEvent(
      new CustomEvent('hide-sc-top-sheet', {
        bubbles: true,
        composed: true,
      })
    );
  }

  updated(changedProps) {
    if (changedProps.has('sutta')) {
      this._updateView();
    }
    if (changedProps.has('showParagraphs')) {
      this._computeParagraphs();
    }
    if (changedProps.has('isLoading')) {
      this._loadingChanged();
    }
    if (changedProps.has('isChineseLookupEnabled')) {
      this._chineseLookupStateChanged();
    }
    if (changedProps.has('showHighlighting')) {
      this._showHighlightingChanged();
    }
    if (changedProps.has('chosenReferenceDisplayType')) {
      this._referenceDisplayTypeChanged();
    }
  }

  _articleElement() {
    return this.querySelectorAll('article');
  }

  _showHighlightingChanged() {
    if (this.showHighlighting) {
      this._articleElement().forEach(article => {
        article.classList.add('highlight');
      });
    } else {
      this._articleElement().forEach(article => {
        article.classList.remove('highlight');
      });
    }
  }

  _referenceDisplayTypeChanged() {
    if (this.chosenReferenceDisplayType.includes('main')) {
      this._articleElement().forEach(article => {
        article.classList.add('legacy-reference');
      });
    } else {
      this._articleElement().forEach(article => {
        article.classList.remove('legacy-reference');
      });
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
    const textOptionsState = state.textOptions;
    if (this.showParagraphs !== textOptionsState.paragraphsEnabled) {
      this.showParagraphs = textOptionsState.paragraphsEnabled;
    }
    if (this.isChineseLookupEnabled !== textOptionsState.chineseLookupActivated) {
      this.isChineseLookupEnabled = textOptionsState.chineseLookupActivated;
    }
    if (this.showHighlighting !== textOptionsState.showHighlighting) {
      this.showHighlighting = textOptionsState.showHighlighting;
    }
    if (this.chosenReferenceDisplayType !== textOptionsState.displayedReferences) {
      this.chosenReferenceDisplayType = textOptionsState.displayedReferences;
    }
  }

  _updateView() {
    this._setAttributes();
    this.spansForWordsGenerated = false;
    this.spansForGraphsGenerated = false;
    this.actions.changeSuttaMetaText(this._computeMeta());
    this._loadingChanged();
    this._showHighlightingChanged();
    this._referenceDisplayTypeChanged();
    this._chineseLookupStateChanged();
    this.navItems = this._prepareNavigation();
    setTimeout(() => {
      this._hashChangeHandler();
    }, 100);
  }

  _prepareNavigation() {
    const sutta = this.sutta?.text;
    if (!sutta) {
      this.actions.showToc([]);
      return;
    }
    const dummyElement = document.createElement('template');
    dummyElement.innerHTML = sutta;
    let arrayTOC = Array.from(dummyElement.content.querySelectorAll('h2')).map((elem, index) => {
      const id = index + 1;
      return { link: id, name: elem.innerText };
    });
    arrayTOC = arrayTOC.filter(Boolean);
    this.actions.showToc(arrayTOC);
  }

  _setAttributes() {
    if (!this.sutta) {
      return;
    }
    this.author = this.sutta.author;
    this.lang = this.sutta.lang;
    this.suttaTitle = this.sutta.title;
  }

  _extractSuttaText() {
    if (this.sutta && this.sutta.text) {
      return this.sutta.text.replace(/<head>((.|\n)*)<\/head>/, '');
    }
    return '';
  }

  // returns the meta-data from the loaded sutta text
  _computeMeta() {
    let metaText = '';
    let matches = [];
    if (this.sutta && this.sutta.text) {
      matches = this.sutta.text.match(/<footer>((.|\n)*)<\/footer>/);
    }
    try {
      if (matches && matches.length > 0) {
        metaText = matches[1];
      }
    } catch (e) {
      console.error(e);
    }
    return metaText;
  }

  // After the paragraph list has been loaded, adds relevant data to the placeholders in the sutta text file.
  _computeParagraphs() {
    this._setTextualInformationVisible(this.showParagraphs);
    if (!this.sutta || !this.sutta.uid) {
      return;
    }
    let divisionId = /^[a-z]+/.exec(this.sutta.uid)[0];
    if (divisionId === 'pli') divisionId = 'vi';
    if (divisionId === 'iti') divisionId = 'it';
    if (this.paragraphs && this.showParagraphs) {
      this.paragraphs.forEach(paragraph => {
        const refs = this
          .querySelector('#simple_text_content')
          .querySelectorAll(`.${paragraph.uid}`);
        Array.from(refs).forEach(item => {
          if (this._shouldDisplayBookIcon(divisionId, item.id)) {
            this._processVolPageInfo(item, divisionId, paragraph);
          } else {
            this._addParagraphData(item, paragraph);
          }
        });
      });
    }
  }

  _shouldDisplayBookIcon(divisionId, itemId) {
    const divisionIdMatch = divisionId === 'tha' || divisionId === 'thi';
    const secondEdition = itemId.includes('2ed');
    const correctId = itemId.startsWith('pts-vp-pli') || itemId.match(/pts[1-9]/);
    return !divisionIdMatch && !secondEdition && correctId;
  }

  _processVolPageInfo(item, divisionId, paragraph) {
    let prefix = /[^\d]+/.exec(item.id)[0];
    const suffix = item.id.substring(prefix.length);
    let [vol, pageNumber] = suffix.split('.');
    if (vol.includes('ed')) {
      let ed;
      [ed, vol] = vol.split('ed');
      prefix += `${ed}ed`;
    }
    let displayText = `${vol}.${pageNumber}`;
    if (!pageNumber) {
      pageNumber = vol;
      vol = '1';
      displayText = `${pageNumber}`;
    }
    pageNumber = Number(pageNumber);
    vol = Number(vol);
    if (vol === 0) {
      displayText = `${pageNumber}`;
      vol = 1;
    }
    setTimeout(() => {
      item.innerHTML = `
        <span class="image-link">
            <span class="${prefix}" 
            title="${paragraph.description}">
            ${displayText}
            </span>
            <span 
            title="${this.localize('text:viewImage')}" class="image-book-link">
            ${icon.book}
            </span>
        </span>
      `;
      item.classList.add('image-book-link');
      item.classList.add('textual-info-paragraph');
      item.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('show-image', {
            detail: { vol, division: divisionId, pageNumber },
            bubbles: true,
            composed: true,
          })
        );
      });
    }, 500);
  }

  _addParagraphData(item, data) {
    item.innerHTML = item.id.replace(data.uid, '');
    item.title = data.description;
    item.href = `#${item.id}`;
    item.classList.add('textual-info-paragraph', 'latin');
  }

  // adds a class to the main container to either show or hide the textual info incl. paragraphs
  _setTextualInformationVisible(visible) {
    const textElement = this.querySelector('#simple_text_content');
    if (textElement) {
      visible ? textElement.classList.add('infomode') : textElement.classList.remove('infomode');
      for (let key in this.classTitles) {
        const classRefs = textElement.querySelectorAll(`.${key}`);
        Array.from(classRefs).forEach(item => (item.title = this.classTitles[key]));
      }
      for (let key in this.textualInfoClassTitles) {
        const textualInfoClassRefs = textElement.querySelectorAll(`.${key}`);
        if (visible) {
          Array.from(textualInfoClassRefs).forEach(
            item => (item.title = this.textualInfoClassTitles[key])
          );
        } else {
          Array.from(textualInfoClassRefs).forEach(item => (item.title = ''));
        }
      }
      const corrElements = textElement.querySelectorAll('.corr');
      for (let key in corrElements) {
        const item = corrElements[key];
        if (item.title) {
          item.innerHTML = this._markupCorrComment(item.title, item.innerHTML);
          item.title = '';
        }
      }
    }
  }

  _loadingChanged() {
    this.isTextViewHidden = this.isLoading || this._shouldDisplayError();
  }

  _shouldDisplayError() {
    return !(this.sutta && this.sutta.text) || this.error;
  }

  _scrollToSection(sectionId, margin = 120) {
    if (!sectionId) return;
    try {
      const targetElement = this.querySelector(
        `h2:nth-of-type(${location.hash.substr(1)})`
      );
      if (targetElement) {
        targetElement.scrollIntoView();
        window.scrollTo(0, window.scrollY - margin);
      }
    } catch (e) {
      console.error(e);
    }
  }

  _chineseLookupStateChanged() {
    if (this.isChineseLookupEnabled) {
      if (!this.spansForGraphsGenerated) {
        this._conditionallyPutIntoSpans('lzh');
      }
      this._addLookupEvent('article p .lookup_element');
    } else {
      this._disableLookup();
    }
  }

  _disableLookup() {
    const scBottomSheet = this.querySelector('sc-bottom-sheet');
    if (scBottomSheet) {
      scBottomSheet.hide();
    }
    this._removeDefineFocusedClass();
    this._removeLookupEvent('article p .word');
  }

  _conditionallyPutIntoSpans(lang) {
    const suttaLang = this.sutta?.lang;
    if (suttaLang === lang) {
      if (this.querySelector('article')) {
        this._putIntoSpans('article', lang);
        this._addWordSpanId();
      }
    }
  }

  _putIntoSpans(selector, lang) {
    if (lang === 'lzh') {
      this._putGraphsIntoSpans(selector, 'graph');
    }
  }

  _putGraphsIntoSpans(selector, lang) {
    this._startGeneratingSpans(selector, 'graph', lang);
  }

  _startGeneratingSpans(selector, unit, lang) {
    let segments = this.querySelectorAll(selector);
    segments = Array.from(segments);
    let empty = true;
    while (segments.length > 0) {
      const segment = segments.shift();
      if (!segment) {
        return;
      }
      empty = false;
      this._putSegmentIntoSpans(segment, unit, this);
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

  _putSegmentIntoSpans(segment, unit, that) {
    const text = segment.innerHTML;
    const div = document.createElement('div');
    div.innerHTML = text;
    that._recurseDomChildren(div, true, unit);
    segment.innerHTML = div.innerHTML
      .replace(/%spfrnt%/g, `<span class="word">`)
      .replace(/%spback%/g, '</span>')
      .replace(/%spfrnt_l%/g, `<span class="word lookup_element">`)
      .replace(/%spback_l%/g, '</span>')
      .replace(/%spfrnt_w%/g, '<span class="whitespace">');
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
      if (node.classList && node.classList.contains('image-link')) {
        continue;
      }
      if (unit === 'graph' && node.classList && node.classList.contains('latin')) {
        continue;
      }
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
    for (let i = 0; i < strArr.length; i++)
      if (strArr[i]) {
        if (unit === 'word') {
          str += `%spfrnt_l%${strArr[i]}%spback_l% `;
        } else if (unit === 'graph') {
          str = this._insertGraphsIntoMarkups(str, strArr[i]);
        }
      }
    node.data = str;
  }

  _insertGraphsIntoMarkups(str, graphs) {
    str += '%spfrnt%';
    for (let graph of graphs) {
      if (/^\s+$/.test(graph)) {
        str += `%spfrnt_w%graph%spback%`;
        continue;
      }
      if (!'，,!！?？;；:：（()）[]【 】。「」﹁﹂"、‧《》〈〉﹏—『』'.includes(graph)) {
        str += `%spfrnt_l%${graph}%spback_l%`;
      } else {
        str += `%spback%%spfrnt%${graph}%spback%%spfrnt%`;
      }
    }
    if (str.endsWith('%spfrnt%')) {
      str = str.substring(0, str.length - '%spfrnt%'.length) + ' ';
    } else {
      str += '%spback% ';
    }
    return str;
  }

  _addWordSpanId() {
    let wordIdSeed = 0;
    this.querySelectorAll('span.lookup_element:not(a span)').forEach(word => {
      word.id = `word_${wordIdSeed}`;
      wordIdSeed++;
    });
  }

  _addLookupEvent(selector) {
    const chineseLookup = this.querySelector('#chinese_lookup');
    const allWordSpans = this.querySelectorAll(selector);
    const arraySpans = Array.from(allWordSpans);
    arraySpans.forEach(word => {
      word.onclick = e => {
        if (!this.isChineseLookupEnabled) return;
        const scBottomSheet = this.querySelector('sc-bottom-sheet');
        if (scBottomSheet) {
          this._removeDefineFocusedClass();
          this._addDefineFocusedClass(e.currentTarget);
          this._setSCBottomSheet(scBottomSheet, word, chineseLookup, e.currentTarget);
        }
      };
    });
  }

  _addDefineFocusedClass(currentTarget) {
    currentTarget.classList.add('spanFocused');
  }

  _removeDefineFocusedClass() {
    this.querySelectorAll('.spanFocused').forEach(dfElement => {
      dfElement.classList.remove('spanFocused');
    });
  }

  _removeLookupEvent(selector) {
    const allWordSpans = this.querySelectorAll(selector);
    const arraySpans = Array.from(allWordSpans);
    arraySpans.forEach(word => {
      word.onclick = null;
    });
  }

  _setSCBottomSheet(scBottomSheet, word, chineseLookup, currentTarget) {
    scBottomSheet.currentTarget = currentTarget;
    const keyword = scBottomSheet.getSentenceText() || word.dataset.latin_text || word.textContent;
    scBottomSheet.currentDefine = keyword;
    const lookupResult = chineseLookup.lookupWord(keyword);
    scBottomSheet.currentDefineDetail = lookupResult.html;
    scBottomSheet.lookup = chineseLookup;
    scBottomSheet.show();
  }
}

customElements.define('sc-text-legacy', SCTextLegacy);
