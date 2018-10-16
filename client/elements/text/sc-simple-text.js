import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

import { SCTextPage } from "./sc-text-page.js";
import './sc-text-options.js';
import { textStyles } from '../styles/sc-text-styles.js';
import { textHeadingStyles } from '../styles/sc-text-heading-styles.js';
import { textParagraphNumStyles } from '../styles/sc-text-paragraph-num-styles.js';
import '../lookups/sc-pli.js';
import '../lookups/sc-lzh2en.js';
import { lookupStyles } from '../lookups/sc-lookup-styles.js';
import { Transliterator } from './transliterator.js';

class SCSimpleText extends SCTextPage {
  static get template() {
    return html`
    ${textStyles}
    ${textHeadingStyles}
    ${textParagraphNumStyles}
    ${lookupStyles}
    <style>
      :host {
        --iron-icon-fill-color: var(--sc-disabled-text-color);
        --iron-icon-height: calc(var(--sc-size-sm) * 1.5);
        --iron-icon-width: calc(var(--sc-size-sm) * 1.5);
      }

      .image-link {
        cursor: pointer;
      }

      .image-book-link {
        margin-bottom: .5em;
        margin-left: .2em;
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

      .highlight {
        background-color: var(--sc-disabled-text-color-opaque);
      }

      article p,
      .word,
      .translated-text,
      .original-text {
        transition: background-color 300ms ease-in;
      }

    </style>

    <iron-a11y-keys id="a11y" keys="alt+m" on-keys-pressed="deathToTheBeast"></iron-a11y-keys>

    <div id="simple_text_content" class="html-text-content" inner-h-t-m-l="[[_extractSuttaText(sutta.text)]]" hidden$="[[isTextViewHidden]]"></div>

    <sc-pali-lookup id="pali_lookup"></sc-pali-lookup>
    <sc-chinese-lookup id="chinese_lookup"></sc-chinese-lookup>`;
  }

  static get properties() {
    return {
      // in simple texts, both root texts and translations are returned by the API in the translation object.
      sutta: {
        type: Object,
        observer: '_updateView'
      },
      // If true, shows the paragraph numbers on the right of the text.
      showParagraphs: {
        type: Boolean,
        statePath: 'textOptions.paragraphsEnabled',
        observer: '_computeParagraphs'
      },
      paliScript: {
        type: String,
        statePath: 'textOptions.script',
        observer: 'changeScript'
      },
      paragraphs: {
        type: Array,
        statePath: 'textOptions.paragraphDescriptions'
      },
      suttaTitle: {
        type: String
      },
      author: {
        type: String
      },
      error: {
        type: Object
      },
      lang: {
        type: String
      },
      isLoading: {
        type: Boolean,
        observer: '_loadingChanged'
      },
      isTextViewHidden: {
        type: Boolean,
        value: false
      },
      isPaliLookupEnabled: {
        type: Boolean,
        statePath: 'textOptions.paliLookupActivated',
        observer: '_paliLookupStateChanged'
      },
      tooltipCount: {
        type: Number,
        value: 0
      },
      spansForWordsGenerated: {
        type: Boolean,
        value: false
      },
      spansForGraphsGenerated: {
        type: Boolean,
        value: false
      },
      isChineseLookupEnabled: {
        type: Boolean,
        statePath: 'textOptions.chineseLookupActivated',
        observer: '_chineseLookupStateChanged'
      },
      textualInfoClassTitles: {
        type: Object,
        value: {
          'gloss': 'Definition of term.',
          'add': 'Text added by the editor or translator for clarification',
          'supplied': 'Text hypothetically reconstructed by the editor or translator.',
          'supplied2': 'Text hypothetically reconstructed by the editor or translator.',
          'expanded': 'Text expanded by editor or translator although elided in original.',
          'surplus': 'Text present in the source which the editor believes to be superfluous or redundant.',
          'del': 'Text deleted by the editor as superfluous',
          'del-scribe': 'Text deleted by the scribe as superfluous',
          'corrected': 'Corrected reading.'
        }
      },
      classTitles: {
        type: Object,
        value: {
          'gap': 'Gap in the manuscript.',
          't-gaiji': 'Chinese characters not in Unicode.',
          'term': 'Defined term.',
          'pe': 'Instructions for expanding text supplied by the editor or translator.',
          'unclear': 'Unclear reading.',
          'scribe': 'Note of attribution by the scribe of the manuscript.',
          'suppliedmetre': 'Metre reconstructed by the editor.'
        }
      },
      editionsExpansionData: {
        type: Object,
        value: {
          'sī1': 'Buddhajayantītripiṭakagranthamālā 2501–2531 (1957–1989)',
          'c-a': 'Chaṭṭhasaṅgīti Piṭakaṃ Atthakathā',
          'c1': 'Chaṭṭhasaṅgīti Piṭakaṃ 2496–2499 (1952–1955)',
          'c2': 'Chaṭṭhasaṅgīti Piṭakaṃ 2nd ed. 2500–2506 (1956–1962)',
          'c3': 'Chaṭṭhasaṅgīti Piṭakaṃ (1997)',
          'cha1': 'Chaṭṭhasaṅgīti Piṭakaṃ 2496–2499 (1952–1955)',
          'cha2': 'Chaṭṭhasaṅgīti Piṭakaṃ 2nd ed. 2500–2506 (1956–1962)',
          'cha3': 'Chaṭṭhasaṅgīti Piṭakaṃ (1997)',
          'mr': 'Maramma Tipiṭaka 2541 (1997)',
          'ka-ma': 'Maramma Tipiṭaka 2541 (1997)',
          'si': 'Sinhala Tipiṭaka 2501 (1957)',
          'ka-sī': 'Sinhala Tipiṭaka 2501 (1957)',
          'km': 'Phratraipiṭakapāḷi 2501–2512 (1958–1969)',
          'maku': 'Mahāmakurājāvidyālai 2466 (1923)',
          'ms': 'Mūlasarvāstivādavinayavastu, part 1-4',
          'dutt': 'Mūlasarvāstivādavinayavastu, part 1-4, Dutt (1939-1959)',
          'divy': 'Divyāvadāna (1886)',
          'ms84': 'Mūlasarvāstivādavinayavastu, part 1-4, (1984)',
          'pts-a': 'Pali Text Society Atthakathā',
          'pts1': 'Pali Text Society 1st ed. 2424–2535 (1881–1992)',
          'pts2': 'Pali Text Society 2nd ed. 2517–2541 (1974–1998)',
          'pā1': 'Pali Text Society 1st ed. 2424–2535 (1881–1992)',
          'pā2': 'Pali Text Society 2nd ed. 2517–2541 (1974–1998)',
          's-a': 'Syāmaraṭṭhassa Tepiṭakaṃ Atthakathā',
          's1': 'Chulachomklao Pāḷi Tipiṭaka 2436 (1893)',
          's2': 'Syāmaraṭṭhassa Tepiṭakaṃ 2469–2471 (1926–1928)',
          's3': 'Syāmaraṭṭhassa Tepiṭakaṃ 2538 (1995)',
          's1-3': 'Chulachomklao Pāḷi Tipiṭaka 2436 (1893), Syāmaraṭṭhassa Tepiṭakaṃ 2469–2471 (1926–1928) & 2538 (1995)',
          'syā1-3': 'Chulachomklao Pāḷi Tipiṭaka 2436 (1893), Syāmaraṭṭhassa Tepiṭakaṃ 2469–2471 (1926–1928) & 2538 (1995)',
          'syā1': 'Chulachomklao Pāḷi Tipiṭaka 2436 (1893)',
          'syā2': 'Syāmaraṭṭhassa Tepiṭakaṃ 2469–2471 (1926–1928)',
          'syā3': 'Syāmaraṭṭhassa Tepiṭakaṃ 2538 (1995)',
          'bj': 'Buddhajayantītripiṭakagranthamālā 2501–2531 (1957–1989)',
          'bj-a': 'Buddhajayantītripiṭakagranthamālā Atthakathā)'
        },
        localizedStringsPath: {
          type: String,
          value: '/localization/elements/sc-text'
        },
        currentId: {
          type: String,
          value: ''
        },
        inputElement: {
          type: Object
        }
      }
    }
  }

  static get actions() {
    return {
      changeSuttaMetaText(metaText) {
        return {
          type: 'CHANGE_SUTTA_META_TEXT',
          metaText: metaText
        }
      }
    }
  }

  ready() {
    super.ready();

    
    this.addEventListener('click', () => {
      setTimeout(() => {
        this._scrollToSection(window.location.hash.substr(1), true, 0);
      });
    });
    window.addEventListener('hashchange', () => {
      setTimeout(() => {
        this._scrollToSection(window.location.hash.substr(1), true, 0);
      });
    });
    this.inputElement = this.$.simple_text_content;
    this.$.a11y.target = document.querySelector('body');
  }

  _updateView() {
    this._applyFirefoxShadyDomFix();
    this._setAttributes();
    this._computeParagraphs();
    this.currentId = '';
    this.spansForWordsGenerated = false;
    this.spansForGraphsGenerated = false;
    this._paliLookupStateChanged();
    this._chineseLookupStateChanged();
    // Scroll to the section after the hash sign in the url:
    setTimeout(() => {
      this._scrollToSection(window.location.hash.substr(1), false, 500);
    }, 0);
    this.dispatch('changeSuttaMetaText', this._computeMeta());
  }

  _setAttributes() {
    if (!this.sutta) {
      return;
    }
    this.author = this.sutta.author;
    this.lang = this.sutta.lang;
    this.suttaTitle = this.sutta.title;
  }

  _extractSuttaText(suttaText) {
    if (suttaText) {
      return suttaText.replace(/<head>((.|\n)*)<\/head>/, '');
    }
  }

  // returns the meta-data from the loaded sutta text
  _computeMeta() {
    let metaText = '';
    let matches = [];
    if (this.sutta && this.sutta.text) {
      matches = this.sutta.text.match(/<aside id="metaarea">((.|\n)*)<\/aside>/);
    }
    try {
      if (matches.length > 0) {
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
      this.paragraphs.forEach((paragraph) => {
        const refs = this.$.simple_text_content.querySelectorAll(`.${paragraph.uid}`);
        Array.from(refs).forEach((item) => {
          if (this._shouldDisplayBookIcon(divisionId, item.id)) {
            this._processVolPageInfo(item, divisionId, paragraph);
          } else {
            this._addParagraphData(item, paragraph);
          }
        });
      });
    }
    setTimeout(() => {
      this._applyQuoteHanger();
    });
  }

  _shouldDisplayBookIcon(divisionId, itemId) {
    let divisionIdMatch = (divisionId === 'tha' || divisionId === 'thi');
    let secondEdition = itemId.includes('2ed');
    let correctId = (itemId.startsWith('pts-vp-pli') || itemId.match(/pts[1-9]/));
    return (!divisionIdMatch && !secondEdition && correctId);
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
                                <span class="${prefix}" title="${paragraph.description}">${displayText}</span>
                                <iron-icon title="${this.localize('viewImage')}" class="image-book-link" icon="sc-svg-icons:book">
                                </iron-icon>
                            </span>
                        `;
      item.classList.add('image-book-link');
      item.classList.add('textual-info-paragraph');
      item.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('show-image', {
          detail: { vol: vol, division: divisionId, pageNumber: pageNumber },
          bubbles: true,
          composed: true
        }));
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
    const textElement = this.$.simple_text_content;
    if (textElement) {
      visible ? textElement.classList.add('infomode') : textElement.classList.remove('infomode');
      for (let key in this.classTitles) {
        const classRefs = textElement.querySelectorAll(`.${key}`);
        Array.from(classRefs).forEach(item => item.title = this.classTitles[key]);
      }
      for (let key in this.textualInfoClassTitles) {
        const textualInfoClassRefs = textElement.querySelectorAll(`.${key}`);
        if (visible) {
          Array.from(textualInfoClassRefs).forEach(item => item.title = this.textualInfoClassTitles[key]);
        } else {
          Array.from(textualInfoClassRefs).forEach(item => item.title = '');
        }
      }
      const varElements = textElement.querySelectorAll('.var');
      if (varElements[0] && varElements[0].innerHTML.indexOf('class="varnote"') === -1) {
        Array.from(varElements).forEach((item) => {
          item.innerHTML = this._markupVarNote(item.title, item.innerHTML);
          item.title = '';
        });
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

  _processHighlightAndScroll(sectionId) {
    let [idFrom, idTo] = sectionId.split('--');
    let firstSection = this.shadowRoot.getElementById(idFrom);
    if (!firstSection) {
      return;
    }
    firstSection = this._getElementToHighlight(firstSection);
    let section = firstSection;
    let toSection = this.shadowRoot.getElementById(idTo);
    let last = true;
    if (toSection) {
      last = false;
    }
    this._processSections(section, idTo, last);
    return firstSection;
  }

  _processSections(section, idTo, last) {
    while (section) {
      section.classList.add('highlight');
      if (section.tagName !== 'HR') {
        this._changeMarginToPadding(section);
      }
      let nextSection = section.nextElementSibling;
      if (!nextSection) {
        break;
      }
      let sectionLink = nextSection.querySelector('.textual-info-paragraph');
      if (sectionLink) {
        if (last) {
          break;
        } else if (sectionLink.id === idTo) {
          last = true;
        }
      }
      section = nextSection;
    }
  }

  _changePaddingToMargin(section) {
    const margin = window.getComputedStyle(section).padding;
    requestAnimationFrame(() => {
      section.style.margin = margin;
      section.style.padding = '0';
    })
  }

  _changeMarginToPadding(section) {
    for (let pos of ['Top', 'Bottom', 'Left', 'Right']) {
      const margin = window.getComputedStyle(section)[`margin${pos}`];
      const padding = window.getComputedStyle(section)[`padding${pos}`];
      section.style[`margin${pos}`] = '0';
      section.style[`padding${pos}`] = this._getBigger(margin, padding);
    }
  }

  _getBigger(a, b) {
    return parseFloat(a) > parseFloat(b) ? a : b;
  }

  _removeHighlights() {
    this.shadowRoot.querySelectorAll('.highlight').forEach(v => {
      v.classList.remove('highlight');
      v.classList.remove('last-highlight');
    })
  }

  _getElementToHighlight(element) {
    if (element.id.includes('inline') && !element.id.includes('.')) {
      element = element.parentNode;
    }
    return element.parentNode;
  }

  // Scrolls to the chosen section
  _scrollToSection(sectionId, isSmooth, delay) {
    if (!sectionId || this.currentId === sectionId) return;
    try {
      this._removeHighlights();
      setTimeout(() => {
        const firstSection = this._processHighlightAndScroll(sectionId);
        if (firstSection) {
          firstSection.scrollIntoView({
            behavior: isSmooth ? 'smooth' : 'instant',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, delay);
      this.currentId = sectionId;
    } catch (e) {
      console.error(e);
    }
  }

  changeScript(paliScript) {
    if (!this.sutta || this.sutta.lang !== 'pli') {
      return;
    }
    const tooltips = this.shadowRoot.querySelectorAll('paper-tooltip');
    this._resetScript();
    switch (paliScript) {
      case 'latin':
        this.$.simple_text_content.classList.add('latin-script');
        break;
      case 'sinhala':
        this._setScript('sinhala', tooltips);
        break;
      case 'devanagari':
        this._setScript('devanagari', tooltips);
        break;
      case 'thai':
        this._setScript('thai', tooltips);
        break;
      case 'myanmar':
        this._setScript('myanmar', tooltips);
        break;
    }
    this._computeParagraphs();
  }

  _resetScript() {
    this.$.simple_text_content.classList
      .remove('latin-script', 'sinhala-script', 'devanagari-script', 'thai-script', 'myanmar-script');
    let words = this.$.simple_text_content.querySelectorAll('.word');
    Array.from(words).forEach(word => word.innerHTML = word.dataset.latin_text || word.innerHTML);
  }

  _setScript(scriptName, tooltips) {
    this.$.simple_text_content.classList.add(`${scriptName}-script`);
    const t = new Transliterator();
    const scriptFunctionName = `to${this._capitalize(scriptName)}`;
    this._ensureSpansExist();
    const textElement = this.shadowRoot.querySelector('#text').querySelector('article');
    this.setSimpleTextContentScript(textElement, t, scriptFunctionName);
    Array.from(tooltips).forEach(item => item.innerHTML = t[scriptFunctionName](item.innerHTML));
  }

  _ensureSpansExist() {
    if (!this.spansForWordsGenerated) {
      this._conditionallyPutIntoSpans('pli');
    }
  }

  setSimpleTextContentScript(elem, transliterator, scriptFunctionName) {
    Array.from(elem.querySelectorAll('.word')).forEach(word => {
      word.dataset.latin_text = word.innerHTML;
      word.innerHTML = transliterator[scriptFunctionName](word.innerHTML);
    })
  }

  _capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
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
    this.shadowRoot.querySelectorAll('.textual-info-paragraph').forEach(item => {
      item.addEventListener('click', () => {
        this._scrollToSection(item.id, true, 0);
      });
    });
  }

  _putSegmentIntoSpans(segment, unit, that) {
    const text = segment.innerHTML;
    let div = document.createElement('div');
    div.innerHTML = text;
    that._recurseDomChildren(div, true, unit);
    segment.innerHTML = div.innerHTML.replace(/%spfrnt%/g, `<span class="word">`)
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
    for (let i = 0; i < strArr.length; i++) if (strArr[i]) {
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
      if (!('，,!！?？;；:：（()）[]【 】。「」﹁﹂"、‧《》〈〉﹏—『』'.includes(graph))) {
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
    textContainer.querySelectorAll('.lookup_element').forEach((element) => {
      this._addTooltipToElement(that, element, lang, lookup);
    })
  }

  _addTooltipToElement(that, word, lang, lookup) {
    let tooltip = document.createElement('paper-tooltip');
    this._setTooltipOptions(tooltip, lang);
    let states = {
      isWordHovered: false,
      isTooltipHovered: false,
      isTooltipShown: false
    };
    word.addEventListener('mouseover', (e) => {
      if ((this.isPaliLookupEnabled && lang === 'pli') || (this.isChineseLookupEnabled && lang === 'lzh')) {
        word.style.color = this._getAccentColor(); // It can not be in class because of some strange bug in some cases.
        states.isWordHovered = true;
        that._addTooltip(word, tooltip, lookup, states, e, lang);
      }
    });
    word.addEventListener('mouseout', (e) => {
      states.isWordHovered = false;
      setTimeout(() => {
        if (!states.isTooltipHovered) {
          word.style.color = '';
        }
      }, 0);
      that._removeTooltip(word, tooltip, states, e);
    });
    tooltip.addEventListener('mouseover', (e) => {
      states.isTooltipHovered = true;
    });
    tooltip.addEventListener('mouseout', (e) => {
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

  _applyFirefoxShadyDomFix() {
    if (navigator.userAgent.indexOf('Firefox') !== -1) {
      this.isTextViewHidden = true;
      setTimeout(() => {
        this.$.simple_text_content.innerHTML = this.$.simple_text_content.innerHTML;
        this.isTextViewHidden = false;
      }, 0);
    }
  }

  _markupVarNote(noteData, referenceText) {
    const noteItems = noteData.split(/ \| /);
    let noteText = `
                        ${referenceText}
                      <paper-tooltip class="varnote" fit-to-visible-bounds><table><tbody>
                     `;
    let out = '';

    for (let item in noteItems) {
      let m = noteItems[item].match(/^(\(.*?\)|[^\(]+)(.*)/),
        variant = m[1],
        comment = m[2];
      if (variant && !comment) {
        // In some cases there is no variant, it's simply a comment
        // In this case, the comment takes the entire line.
        out = `
                    <tr><td colspan=2>
                      ${this._markupComment(variant)}
                    </td></tr>
                  `;
      } else {
        // The normal case is a variant and a comment or qualification
        // pertaining to that variant reading.
        out = `
                  <tr><td>
                    ${variant}
                  </td><td>
                    ${this._markupComment(comment)}
                  </td></tr>
                 `;
      }
      noteText += out;
    }
    return `
                ${noteText}
              </tbody></table></paper-tooltip>
             `;
  }

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
