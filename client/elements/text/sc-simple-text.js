import { LitElement, html, css, svg } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { SCLitTextPage } from './sc-lit-text-page.js';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles.js';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles.js';
import { typographyLegacyStyles } from '../styles/sc-typography-legacy-styles.js';
import { typographyI18nStyles } from '../styles/sc-typography-i18n-styles.js';
import '../lookups/sc-pli.js';
import '../lookups/sc-lzh2en.js';
import { lookupStyles } from '../lookups/sc-lookup-styles.js';
import { store } from '../../redux-store';

import { icon } from '../../img/sc-icon';

class SCSimpleText extends SCLitTextPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
          ${typographyCommonStyles}
          ${typographyLegacyStyles}
          ${typographyI18nStyles}
          ${lookupStyles}

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

      <sc-pali-lookup id="pali_lookup"></sc-pali-lookup>
      <sc-chinese-lookup id="chinese_lookup"></sc-chinese-lookup>
    `;
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
      isPaliLookupEnabled: { type: Boolean },
      tooltipCount: { type: Number },
      spansForWordsGenerated: { type: Boolean },
      spansForGraphsGenerated: { type: Boolean },
      isChineseLookupEnabled: { type: Boolean },
      textualInfoClassTitles: { type: Object },
      classTitles: { type: Object },
      editionsExpansionData: { type: Object },
      localizedStringsPath: { type: String },
      currentId: { type: String },
      inputElement: { type: Object },
      showHighlighting: { type: Boolean },
      chosenReferenceDisplayType: { type: String },
      navItems: { type: Array },
    };
  }

  constructor() {
    super();
    let textOptionsState = store.getState().textOptions;
    this.sutta = {};
    this.showParagraphs = false;
    this.paragraphs = textOptionsState.paragraphDescriptions;
    this.suttaTitle = '';
    this.author = '';
    this.lang = '';
    this.isLoading = false;
    this.isTextViewHidden = false;
    this.isPaliLookupEnabled = textOptionsState.paliLookupActivated;
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
    this.localizedStringsPath = '/localization/elements/sc-text';
    this.currentId = '';
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
          metaText: metaText,
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

  firstUpdated() {
    // location-changed event is added by iron-location component.
    // iron-location disables default behavior of hash-links and re-emits a different event.
    // hashchange can still fire, but only due to browser back & forward buttons.
    // TODO: In case iron-location is removed, this will break, but it's not possible to bypass it now
    window.addEventListener('location-changed', this._hashChangeHandler);
    window.addEventListener('hashchange', this._hashChangeHandler);
    this.addEventListener('click', () => {
      this._hideTopSheets();
      this.actions.changeDisplaySettingMenuState(false);
    });
    this._updateView();
    this.inputElement = this.shadowRoot.querySelector('#simple_text_content');
    this.shadowRoot.querySelector('#a11y').target = document.querySelector('body');
  }

  _hideTopSheets() {
    const scActionItems = document
      .querySelector('sc-site-layout')
      .shadowRoot.querySelector('#action_items');
    scActionItems.hideItems();
  }

  disconnectedCallback() {
    window.removeEventListener('location-changed', this._hashChangeHandler);
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
    if (changedProps.has('isPaliLookupEnabled')) {
      this._paliLookupStateChanged();
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
    return this.shadowRoot.querySelectorAll('article');
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
    if (this.chosenReferenceDisplayType === 'main') {
      this._articleElement().forEach(article => {
        article.classList.add('legacy-reference');
      });
    } else {
      this._articleElement().forEach(article => {
        article.classList.remove('legacy-reference');
      });
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
    const textOptionsState = state.textOptions;
    if (this.showParagraphs !== textOptionsState.paragraphsEnabled) {
      this.showParagraphs = textOptionsState.paragraphsEnabled;
    }
    if (this.isPaliLookupEnabled !== textOptionsState.paliLookupActivated) {
      this.isPaliLookupEnabled = textOptionsState.paliLookupActivated;
    }
    if (this.isChineseLookupEnabled !== textOptionsState.chineseLookupActivated) {
      this.isChineseLookupEnabled = textOptionsState.chineseLookupActivated;
    }
    if (this.showHighlighting !== textOptionsState.showHighlighting) {
      this.showHighlighting = textOptionsState.showHighlighting;
    }
    if (this.chosenReferenceDisplayType !== textOptionsState.referenceDisplayType) {
      this.chosenReferenceDisplayType = textOptionsState.referenceDisplayType;
    }
  }

  _updateView() {
    this._setAttributes();
    this._computeParagraphs();
    this.currentId = '';
    this.spansForWordsGenerated = false;
    this.spansForGraphsGenerated = false;
    this._paliLookupStateChanged();
    this._chineseLookupStateChanged();
    this.actions.changeSuttaMetaText(this._computeMeta());
    this._loadingChanged();
    this._showHighlightingChanged();
    this._referenceDisplayTypeChanged();
    this.navItems = this._prepareNavigation();
    setTimeout(() => {
      this._hashChangeHandler();
    }, 100);
  }

  _prepareNavigation() {
    const sutta = this.sutta['text'];
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
        const refs = this.shadowRoot
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
    let divisionIdMatch = divisionId === 'tha' || divisionId === 'thi';
    let secondEdition = itemId.includes('2ed');
    let correctId = itemId.startsWith('pts-vp-pli') || itemId.match(/pts[1-9]/);
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
            title="${this.localize('viewImage')}" class="image-book-link">
            ${icon.book}
            </span>
        </span>
      `;
      item.classList.add('image-book-link');
      item.classList.add('textual-info-paragraph');
      item.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('show-image', {
            detail: { vol: vol, division: divisionId, pageNumber: pageNumber },
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
    const textElement = this.shadowRoot.querySelector('#simple_text_content');
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
      const targetElement = this.shadowRoot.querySelector(
        `h3:nth-of-type(${location.hash.substr(1)})`
      );
      if (targetElement) {
        targetElement.scrollIntoView();
        window.scrollTo(0, window.scrollY - margin);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Lookup word start
  _putGraphsIntoSpans(selector, lang) {
    this._startGeneratingSpans(selector, 'graph', lang);
  }

  _putWordsIntoSpans(selector, lang) {
    this._startGeneratingSpans(selector, 'word', lang);
  }

  _startGeneratingSpans(selector, unit, lang) {
    let segments = this.shadowRoot.querySelectorAll(selector);
    segments = Array.from(segments);
    let empty = true;
    while (segments.length > 0) {
      const segment = segments.shift();
      if (!segment) {
        return;
      }
      empty = false;
      this._putSegmentIntoSpans(segment, unit, this);
      this._addLookupTooltips(segment, lang, this);
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
    let div = document.createElement('div');
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

  _addTooltip(v, tooltip, lookup, states, e, lang) {
    if (lang === 'pli') {
      let lookupResult = lookup.lookupWord(v.dataset.latin_text || v.textContent);
      tooltip.innerHTML = lookupResult.html;
    } else if (lang === 'lzh') {
      this._addLzhTooltip(v, lookup, tooltip);
    }
    v.parentNode.insertBefore(tooltip, v.nextSibling);
    setTimeout(() => {
      if (states.isWordHovered && !states.isTooltipShown) {
        v.id = `lookup_target${this.tooltipCount}`;
        tooltip.for = `lookup_target${this.tooltipCount}`;
        this.tooltipCount++;
        tooltip.show();
        states.isTooltipShown = true;
      }
    }, 10);
  }

  _addLzhTooltip(v, lookup, tooltip) {
    let graphs = v.textContent;
    let lastNode = v;
    for (let i = 0; i < 10; i++) {
      let next = lastNode.nextElementSibling;
      lastNode = next;
      if (next !== null) {
        if (!next.classList.contains('lookup_element')) {
          i--;
          continue;
        }
        graphs += next.textContent;
      } else {
        break;
      }
    }
    let lookupResult = lookup.lookupWord(graphs);
    tooltip.innerHTML = lookupResult.html;
    if (lookupResult.length) {
      setTimeout(() => {
        this._colorSelectedSibling(v, lookupResult);
      }, 5);
    }
    tooltip.elementCount = lookupResult.length;
  }

  _colorSelectedSibling(v, lookupResult) {
    let lastElement = v;
    for (let i = 0; i < lookupResult.length - 1; i++) {
      let nextElement = lastElement.nextElementSibling;
      if (!nextElement) {
        break;
      }
      lastElement = nextElement;
      if (!nextElement.classList.contains('lookup_element')) {
        i--;
        continue;
      }
      nextElement.classList.add('green-color');
    }
  }

  _removeTooltip(v, tooltip, states) {
    setTimeout(() => {
      if (!states.isWordHovered && !states.isTooltipHovered) {
        v.style.color = '';
        v.removeAttribute('id');
        tooltip.hide();
        states.isTooltipShown = false;
        let lastElement = v;
        for (let i = 0; i < tooltip.elementCount; i++) {
          let nextElement = lastElement.nextElementSibling;
          if (!nextElement) {
            break;
          }
          lastElement = nextElement;
          if (!nextElement.classList.contains('lookup_element')) {
            i--;
            continue;
          }
          if (!nextElement.id) {
            nextElement.classList.remove('green-color');
          }
        }
      }
    }, 10);
  }

  _addLookupTooltips(textContainer, lang, that) {
    that = that || this;
    let lookupId;
    if (lang === 'lzh') {
      lookupId = 'chinese_lookup';
    } else if (lang === 'pli') {
      lookupId = 'pali_lookup';
    }
    let lookup = that.shadowRoot.querySelector(`#${lookupId}`);
    textContainer.querySelectorAll('.lookup_element').forEach(element => {
      this._addTooltipToElement(that, element, lang, lookup);
    });
  }

  _addTooltipToElement(that, word, lang, lookup) {
    let tooltip = document.createElement('paper-tooltip');
    this._setTooltipOptions(tooltip, lang);
    let states = {
      isWordHovered: false,
      isTooltipHovered: false,
      isTooltipShown: false,
    };
    word.addEventListener('mouseover', e => {
      if (
        (this.isPaliLookupEnabled && lang === 'pli') ||
        (this.isChineseLookupEnabled && lang === 'lzh')
      ) {
        word.style.color = this._getAccentColor(); // It can not be in class because of some strange bug in some cases.
        states.isWordHovered = true;
        that._addTooltip(word, tooltip, lookup, states, e, lang);
      }
    });
    word.addEventListener('mouseout', e => {
      states.isWordHovered = false;
      setTimeout(() => {
        if (!states.isTooltipHovered) {
          word.style.color = '';
        }
      }, 0);
      that._removeTooltip(word, tooltip, states, e);
    });
    tooltip.addEventListener('mouseover', e => {
      states.isTooltipHovered = true;
    });
    tooltip.addEventListener('mouseout', e => {
      states.isTooltipHovered = false;
      that._removeTooltip(word, tooltip, states, e);
    });
  }

  _setTooltipOptions(tooltip) {
    tooltip.classList.add('lookup-tooltip');
    tooltip.animationDelay = 0;
    tooltip.position = 'top';
    tooltip.manualMode = true;
    tooltip.fitToVisibleBounds = true;
    tooltip.offset = 0;
    tooltip.style['padding-bottom'] = '.2em';
  }

  _getAccentColor() {
    const bodyStyle = window.getComputedStyle(document.body);
    return bodyStyle.getPropertyValue('--sc-primary-accent-color');
  }

  _conditionallyPutIntoSpans(lang) {
    if (this.sutta && this.sutta.lang === lang) {
      this._putIntoSpans('.sutta', lang);
    }
  }

  _putIntoSpans(selector, lang) {
    if (lang === 'pli') {
      this._putWordsIntoSpans(selector, lang);
    } else if (lang === 'lzh') {
      this._putGraphsIntoSpans(selector, lang);
    }
  }

  _paliLookupStateChanged() {
    if (this.hidden) {
      return;
    }
    if (this.isPaliLookupEnabled) {
      if (!this.spansForWordsGenerated) {
        this._conditionallyPutIntoSpans('pli');
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

  // Lookup word end

  _markupComment(comment) {
    comment = comment.replace('(', '').replace(')', '');
    const commentParts = comment.split(/,/);
    let commentText = '';
    for (let item in commentParts) {
      const checkItem = this.editionsExpansionData[commentParts[item].replace(' ', '')];
      if (checkItem) {
        commentText += `${checkItem}<br>`;
      } else {
        commentText += `${commentParts[item]}<br>`;
      }
    }
    return commentText;
  }

  _markupCorrComment(comment, referenceText) {
    comment = comment.replace('[', '').replace(']', '');
    const commentParts = comment.split(/→/);
    let tooltipText = '';
    if (commentParts[1]) {
      tooltipText = `
        ${commentParts[0]}
        has&nbsp;been&nbsp;corrected&nbsp;to
        ${commentParts[1]}
      `;
    } else {
      tooltipText = commentParts[0];
    }
    return `
      ${referenceText}
      <paper-tooltip fit-to-visible-bounds class="corrnote">
        ${tooltipText}
      </paper-tooltip>
    `;
  }
}

customElements.define('sc-simple-text', SCSimpleText);
