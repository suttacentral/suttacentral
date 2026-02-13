import { SCTextBilara } from '../../elements/text/sc-text-bilara.js';
import { expect } from '@esm-bundle/chai';
import sinon from '../../node_modules/sinon/pkg/sinon-esm.js';

describe('SCTextBilara', () => {
  let instance;

  beforeEach(() => {
    instance = new SCTextBilara();
  });

  afterEach(() => {
    sinon.restore();
  });

  // =========================================================================
  // _scriptFunctionName
  // =========================================================================
  describe('_scriptFunctionName', () => {
    it('should return "latin" when paliScript is null', () => {
      instance.paliScript = null;
      expect(instance._scriptFunctionName()).to.equal('latin');
    });

    it('should return "latin" when paliScript is undefined', () => {
      instance.paliScript = undefined;
      expect(instance._scriptFunctionName()).to.equal('latin');
    });

    it('should return "latin" when paliScript is empty string', () => {
      instance.paliScript = '';
      expect(instance._scriptFunctionName()).to.equal('latin');
    });

    it('should capitalize the first letter of paliScript', () => {
      instance.paliScript = 'sinhala';
      expect(instance._scriptFunctionName()).to.equal('Sinhala');
    });

    it('should handle single character paliScript', () => {
      instance.paliScript = 'a';
      expect(instance._scriptFunctionName()).to.equal('A');
    });

    it('should handle already capitalized paliScript', () => {
      instance.paliScript = 'Thai';
      expect(instance._scriptFunctionName()).to.equal('Thai');
    });
  });

  // =========================================================================
  // checkIfMultiSutta
  // =========================================================================
  describe('checkIfMultiSutta', () => {
    it('should return false for null suttaId', () => {
      expect(instance.checkIfMultiSutta(null)).to.be.false;
    });

    it('should return false for undefined suttaId', () => {
      expect(instance.checkIfMultiSutta(undefined)).to.be.false;
    });

    it('should return false for non-string suttaId', () => {
      expect(instance.checkIfMultiSutta(123)).to.be.false;
    });

    it('should return false for empty string suttaId', () => {
      expect(instance.checkIfMultiSutta('')).to.be.false;
    });

    it('should return false when suttaId has no dot separator', () => {
      expect(instance.checkIfMultiSutta('dn1')).to.be.false;
      expect(instance.checkIfMultiSutta('mn1')).to.be.false;
    });

    it('should return true for numeric range suttaId', () => {
      expect(instance.checkIfMultiSutta('test.1-10')).to.be.true;
      expect(instance.checkIfMultiSutta('an2.21-31')).to.be.true;
    });

    it('should return false for single numeric suttaId', () => {
      expect(instance.checkIfMultiSutta('test.1')).to.be.false;
      expect(instance.checkIfMultiSutta('sn1.1')).to.be.false;
    });

    it('should return false for non-numeric range parts', () => {
      expect(instance.checkIfMultiSutta('test.a-b')).to.be.false;
    });

    it('should return false for complex suttaId without range', () => {
      expect(instance.checkIfMultiSutta('pli-tv-vb2.1')).to.be.false;
    });

    it('should return false for malformed range with more than two parts', () => {
      expect(instance.checkIfMultiSutta('test.1-2-3')).to.be.false;
    });
  });

  // =========================================================================
  // _isBilingualView
  // =========================================================================
  describe('_isBilingualView', () => {
    it('should return true for linebyline view', () => {
      instance.chosenTextView = 'linebyline';
      expect(instance._isBilingualView()).to.be.true;
    });

    it('should return true for sidebyside view', () => {
      instance.chosenTextView = 'sidebyside';
      expect(instance._isBilingualView()).to.be.true;
    });

    it('should return false for plain view', () => {
      instance.chosenTextView = 'plain';
      expect(instance._isBilingualView()).to.be.false;
    });

    it('should return false for empty string', () => {
      instance.chosenTextView = '';
      expect(instance._isBilingualView()).to.be.false;
    });
  });

  // =========================================================================
  // _onlyRootTextVisible
  // =========================================================================
  describe('_onlyRootTextVisible', () => {
    it('should return true when no translated sutta but has root sutta', () => {
      instance.bilaraTranslatedSutta = null;
      instance.bilaraRootSutta = { 'dn1:0.1': 'Test' };
      expect(instance._onlyRootTextVisible()).to.be.ok;
    });

    it('should return false when both translated and root sutta exist', () => {
      instance.bilaraTranslatedSutta = { 'dn1:0.1': 'Translation' };
      instance.bilaraRootSutta = { 'dn1:0.1': 'Root' };
      expect(instance._onlyRootTextVisible()).to.be.false;
    });

    it('should return false when no root sutta', () => {
      instance.bilaraTranslatedSutta = null;
      instance.bilaraRootSutta = null;
      expect(instance._onlyRootTextVisible()).to.not.be.ok;
    });

    it('should return false when translated exists but no root', () => {
      instance.bilaraTranslatedSutta = { 'dn1:0.1': 'Translation' };
      instance.bilaraRootSutta = null;
      expect(instance._onlyRootTextVisible()).to.be.false;
    });
  });

  // =========================================================================
  // buildReferences
  // =========================================================================
  describe('buildReferences', () => {
    it('should concatenate array elements into a string', () => {
      expect(instance.buildReferences(['main', 'pts'])).to.equal('mainpts');
    });

    it('should return empty string for empty array', () => {
      expect(instance.buildReferences([])).to.equal('');
    });

    it('should return empty string for non-array input', () => {
      expect(instance.buildReferences(null)).to.equal('');
      expect(instance.buildReferences(undefined)).to.equal('');
      expect(instance.buildReferences('string')).to.equal('');
    });

    it('should handle single element array', () => {
      expect(instance.buildReferences(['none'])).to.equal('none');
    });
  });

  // =========================================================================
  // _stripLeadingOrdering
  // =========================================================================
  describe('_stripLeadingOrdering', () => {
    it('should remove leading number and dot', () => {
      expect(instance._stripLeadingOrdering('1.Introduction')).to.equal('Introduction');
    });

    it('should handle multi-digit leading numbers', () => {
      expect(instance._stripLeadingOrdering('12.Chapter')).to.equal('Chapter');
    });

    it('should return trimmed string when no leading number', () => {
      expect(instance._stripLeadingOrdering('Introduction')).to.equal('Introduction');
    });

    it('should handle string with only number and dot', () => {
      expect(instance._stripLeadingOrdering('1.')).to.equal('');
    });

    it('should not remove numbers that are not at the start', () => {
      expect(instance._stripLeadingOrdering('Chapter 1.2')).to.equal('Chapter 1.2');
    });

    it('should preserve spaces after removing ordering', () => {
      expect(instance._stripLeadingOrdering('1. Introduction')).to.equal('Introduction');
    });
  });

  // =========================================================================
  // _stripHTML
  // =========================================================================
  describe('_stripHTML', () => {
    it('should strip HTML tags and return text content', () => {
      expect(instance._stripHTML('<p>Hello</p>')).to.equal('Hello');
    });

    it('should handle nested HTML', () => {
      expect(instance._stripHTML('<div><p>Hello <strong>World</strong></p></div>')).to.equal('Hello World');
    });

    it('should return empty string for empty HTML', () => {
      expect(instance._stripHTML('')).to.equal('');
    });

    it('should return plain text unchanged', () => {
      expect(instance._stripHTML('Plain text')).to.equal('Plain text');
    });

    it('should handle HTML entities', () => {
      const result = instance._stripHTML('<p>Hello &amp; World</p>');
      expect(result).to.equal('Hello & World');
    });
  });

  // =========================================================================
  // _addCommentSpan
  // =========================================================================
  describe('_addCommentSpan', () => {
    it('should create a span with class "comment"', () => {
      const span = instance._addCommentSpan('Test comment');
      expect(span.tagName).to.equal('SPAN');
      expect(span.className).to.equal('comment');
    });

    it('should set innerHTML to the provided value', () => {
      const span = instance._addCommentSpan('Test <em>comment</em>');
      expect(span.innerHTML).to.equal('Test <em>comment</em>');
    });

    it('should handle empty string', () => {
      const span = instance._addCommentSpan('');
      expect(span.innerHTML).to.equal('');
      expect(span.className).to.equal('comment');
    });
  });

  // =========================================================================
  // _addVariantSpan
  // =========================================================================
  describe('_addVariantSpan', () => {
    it('should create a span with class "variant"', () => {
      const span = instance._addVariantSpan('some variant');
      expect(span.tagName).to.equal('SPAN');
      expect(span.className).to.equal('variant');
    });

    it('should prefix value with "Variant: "', () => {
      const span = instance._addVariantSpan('reading A');
      expect(span.textContent).to.equal('Variant: reading A');
    });

    it('should handle empty string', () => {
      const span = instance._addVariantSpan('');
      expect(span.textContent).to.equal('Variant: ');
    });
  });

  // =========================================================================
  // _addRootSuttaSpan
  // =========================================================================
  describe('_addRootSuttaSpan', () => {
    it('should create a span with class "root"', () => {
      instance.rootSutta = { lang: 'pli' };
      const span = instance._addRootSuttaSpan();
      expect(span.className).to.equal('root');
    });

    it('should set lang attribute from rootSutta', () => {
      instance.rootSutta = { lang: 'pli' };
      const span = instance._addRootSuttaSpan();
      expect(span.lang).to.equal('pli');
    });

    it('should set translate="no"', () => {
      instance.rootSutta = { lang: 'pli' };
      const span = instance._addRootSuttaSpan();
      expect(span.getAttribute('translate')).to.equal('no');
    });

    it('should contain a child span with class "text"', () => {
      instance.rootSutta = { lang: 'pli' };
      const span = instance._addRootSuttaSpan();
      const textSpan = span.querySelector('.text');
      expect(textSpan).to.not.be.null;
    });

    it('should set inner text span lang to "la" for Pali', () => {
      instance.rootSutta = { lang: 'pli' };
      const span = instance._addRootSuttaSpan();
      const textSpan = span.querySelector('.text');
      expect(textSpan.lang).to.equal('la');
    });

    it('should not set inner text span lang for non-Pali', () => {
      instance.rootSutta = { lang: 'lzh' };
      const span = instance._addRootSuttaSpan();
      const textSpan = span.querySelector('.text');
      expect(textSpan.lang).to.equal('');
    });
  });

  // =========================================================================
  // _addTranslationSuttaSpan
  // =========================================================================
  describe('_addTranslationSuttaSpan', () => {
    it('should create a span with class "translation"', () => {
      instance.translatedSutta = { lang: 'en' };
      const span = instance._addTranslationSuttaSpan();
      expect(span.className).to.equal('translation');
    });

    it('should set lang attribute from translatedSutta', () => {
      instance.translatedSutta = { lang: 'de' };
      const span = instance._addTranslationSuttaSpan();
      expect(span.lang).to.equal('de');
    });

    it('should contain a child span with class "text"', () => {
      instance.translatedSutta = { lang: 'en' };
      const span = instance._addTranslationSuttaSpan();
      const textSpan = span.querySelector('.text');
      expect(textSpan).to.not.be.null;
      expect(textSpan.className).to.equal('text');
    });
  });

  // =========================================================================
  // _addReferenceSpan
  // =========================================================================
  describe('_addReferenceSpan', () => {
    it('should create a span with class "reference"', () => {
      const span = instance._addReferenceSpan();
      expect(span.tagName).to.equal('SPAN');
      expect(span.className).to.equal('reference');
    });
  });

  // =========================================================================
  // _addSCReferenceAnchor
  // =========================================================================
  describe('_addSCReferenceAnchor', () => {
    beforeEach(() => {
      instance.isMultiSutta = false;
      instance.localize = sinon.stub().returns('Segment Number');
    });

    it('should create an anchor element with class "sc"', () => {
      const anchor = instance._addSCReferenceAnchor('dn1:0.1');
      expect(anchor.tagName).to.equal('A');
      expect(anchor.className).to.equal('sc');
    });

    it('should extract subKey after colon for id and href', () => {
      const anchor = instance._addSCReferenceAnchor('dn1:0.1');
      expect(anchor.id).to.equal('0.1');
      expect(anchor.href).to.include('#0.1');
    });

    it('should set text content from subKey', () => {
      const anchor = instance._addSCReferenceAnchor('dn1:0.1');
      expect(anchor.textContent).to.equal('0.1');
    });

    it('should use full key when isMultiSutta is true', () => {
      instance.isMultiSutta = true;
      const anchor = instance._addSCReferenceAnchor('an2.21:1.1');
      expect(anchor.id).to.equal('an2.21_1.1');
      expect(anchor.textContent).to.equal('an2.21:1.1');
    });

    it('should set title from localize', () => {
      const anchor = instance._addSCReferenceAnchor('dn1:0.1');
      expect(anchor.title).to.equal('Segment Number');
      expect(instance.localize.calledWith('text:segmentNumber')).to.be.true;
    });
  });

  // =========================================================================
  // _prependChild
  // =========================================================================
  describe('_prependChild', () => {
    it('should prepend child before existing children', () => {
      const parent = document.createElement('div');
      const existing = document.createElement('span');
      existing.textContent = 'existing';
      parent.appendChild(existing);

      const newChild = document.createElement('span');
      newChild.textContent = 'new';

      instance._prependChild(parent, newChild);
      expect(parent.firstChild.textContent).to.equal('new');
      expect(parent.children.length).to.equal(2);
    });

    it('should append child to empty parent', () => {
      const parent = document.createElement('div');
      const newChild = document.createElement('span');
      newChild.textContent = 'new';

      instance._prependChild(parent, newChild);
      expect(parent.firstChild.textContent).to.equal('new');
      expect(parent.children.length).to.equal(1);
    });

    it('should return the parent element', () => {
      const parent = document.createElement('div');
      const newChild = document.createElement('span');
      const result = instance._prependChild(parent, newChild);
      expect(result).to.equal(parent);
    });
  });

  // =========================================================================
  // _initPtsReferenceAnchor
  // =========================================================================
  describe('_initPtsReferenceAnchor', () => {
    it('should set id, href, and text on anchor', () => {
      const anchor = document.createElement('a');
      instance._initPtsReferenceAnchor(anchor, 'pts-cs1.1');
      expect(anchor.id).to.equal('pts-cs1.1');
      expect(anchor.href).to.include('#pts-cs1.1');
      expect(anchor.textContent).to.equal('pts-cs1.1');
    });
  });

  // =========================================================================
  // _getReferenceInfo
  // =========================================================================
  describe('_getReferenceInfo', () => {
    it('should find matching edition by substring', () => {
      instance.rootEdition = [
        { uid: 'pts-cs', long_name: 'PTS CS Edition' },
        { uid: 'sya-all', long_name: 'Syamattha Edition' },
      ];

      const result = instance._getReferenceInfo('pts-cs1.1');
      expect(result.uid).to.equal('pts-cs');
      expect(result.long_name).to.equal('PTS CS Edition');
    });

    it('should return sya-all for "sya" prefix', () => {
      instance.rootEdition = [
        { uid: 'sya-all', long_name: 'Syamattha Edition' },
      ];

      const result = instance._getReferenceInfo('sya1.1');
      expect(result.uid).to.equal('sya-all');
    });

    it('should return empty object when no match found', () => {
      instance.rootEdition = [];
      const result = instance._getReferenceInfo('unknown1.1');
      expect(result).to.deep.equal({});
    });
  });

  // =========================================================================
  // _addSCIllustrationElement
  // =========================================================================
  describe('_addSCIllustrationElement', () => {
    it('should create an sc-text-illustration element', () => {
      const illustration = {
        alt: 'test alt',
        filename: 'test.avif',
        creator: 'Test Creator',
        creation_date: '2024-01-01',
      };
      const el = instance._addSCIllustrationElement(illustration);
      expect(el.tagName.toLowerCase()).to.equal('sc-text-illustration');
      expect(el.className).to.equal('illustration');
    });

    it('should set properties from illustration object', () => {
      const illustration = {
        alt: 'test alt',
        filename: 'image.avif',
        creator: 'Artist',
        creation_date: '2024',
      };
      const el = instance._addSCIllustrationElement(illustration);
      expect(el.alt).to.equal('test alt');
      expect(el.filename).to.equal('image.avif');
      expect(el.creator).to.equal('Artist');
      expect(el.creationDate).to.equal('2024');
    });

    it('should default to empty strings for missing properties', () => {
      const el = instance._addSCIllustrationElement({});
      expect(el.alt).to.equal('');
      expect(el.filename).to.equal('');
      expect(el.creator).to.equal('');
      expect(el.creationDate).to.equal('');
    });
  });

  // =========================================================================
  // _isPlusStyle
  // =========================================================================
  describe('_isPlusStyle', () => {
    it('should return false when currentStyles is not a plus style', () => {
      instance.currentStyles = 'something';
      expect(instance._isPlusStyle()).to.be.false;
    });

    it('should return false when currentStyles is undefined', () => {
      instance.currentStyles = undefined;
      expect(instance._isPlusStyle()).to.be.false;
    });
  });

  // =========================================================================
  // _putSegmentIntoSpans
  // =========================================================================
  describe('_putSegmentIntoSpans', () => {
    it('should wrap words in span markers for "word" unit', () => {
      const segment = document.createElement('span');
      segment.innerHTML = 'hello world';
      instance._putSegmentIntoSpans(segment, 'word');
      expect(segment.innerHTML).to.include('<span class="word">hello</span>');
      expect(segment.innerHTML).to.include('<span class="word">world</span>');
    });

    it('should wrap graphs in span markers for "graph" unit', () => {
      const segment = document.createElement('span');
      segment.innerHTML = '你好';
      instance._putSegmentIntoSpans(segment, 'graph');
      expect(segment.innerHTML).to.include('<span class="word">你</span>');
      expect(segment.innerHTML).to.include('<span class="word">好</span>');
    });

    it('should handle em dash splitting', () => {
      const segment = document.createElement('span');
      segment.innerHTML = 'hello—world';
      instance._putSegmentIntoSpans(segment, 'word');
      expect(segment.innerHTML).to.include('</span>—<span class="word">');
    });

    it('should handle empty segment', () => {
      const segment = document.createElement('span');
      segment.innerHTML = '';
      instance._putSegmentIntoSpans(segment, 'word');
      expect(segment.innerHTML).to.equal('');
    });
  });

  // =========================================================================
  // _addSpanToNode
  // =========================================================================
  describe('_addSpanToNode', () => {
    it('should add span markers to text nodes for word unit', () => {
      const textNode = document.createTextNode('hello world');
      instance._addSpanToNode(textNode, 'word');
      expect(textNode.data).to.include('%spfrnt%hello%spback%');
      expect(textNode.data).to.include('%spfrnt%world%spback%');
    });

    it('should add span markers for graph unit', () => {
      const textNode = document.createTextNode('AB');
      instance._addSpanToNode(textNode, 'graph');
      expect(textNode.data).to.include('%spfrnt%A%spback%');
      expect(textNode.data).to.include('%spfrnt%B%spback%');
    });

    it('should skip non-text nodes', () => {
      const element = document.createElement('span');
      element.textContent = 'test';
      instance._addSpanToNode(element, 'word');
      expect(element.textContent).to.equal('test');
    });

    it('should handle text with multiple spaces', () => {
      const textNode = document.createTextNode('hello    world');
      instance._addSpanToNode(textNode, 'word');
      expect(textNode.data).to.include('%spfrnt%hello%spback%');
      expect(textNode.data).to.include('%spfrnt%world%spback%');
    });
  });

  // =========================================================================
  // _addDefineFocusedClass
  // =========================================================================
  describe('_addDefineFocusedClass', () => {
    it('should add "spanFocused" class to target', () => {
      const el = document.createElement('span');
      instance._addDefineFocusedClass(el);
      expect(el.classList.contains('spanFocused')).to.be.true;
    });
  });

  // =========================================================================
  // _showChineseConverterButton
  // =========================================================================
  describe('_showChineseConverterButton', () => {
    it('should not throw for lzh translatedSutta', () => {
      instance.translatedSutta = { lang: 'lzh' };
      instance.rootSutta = { lang: 'pli' };
      expect(() => instance._showChineseConverterButton()).to.not.throw();
    });

    it('should not throw for zh rootSutta', () => {
      instance.translatedSutta = { lang: 'en' };
      instance.rootSutta = { lang: 'zh' };
      expect(() => instance._showChineseConverterButton()).to.not.throw();
    });

    it('should not throw for non-Chinese languages', () => {
      instance.translatedSutta = { lang: 'en' };
      instance.rootSutta = { lang: 'pli' };
      expect(() => instance._showChineseConverterButton()).to.not.throw();
    });
  });

  // =========================================================================
  // _scrollToSection
  // =========================================================================
  describe('_scrollToSection', () => {
    it('should return early for empty sectionId', () => {
      expect(() => instance._scrollToSection('')).to.not.throw();
      expect(() => instance._scrollToSection(null)).to.not.throw();
      expect(() => instance._scrollToSection(undefined)).to.not.throw();
    });

    it('should not throw when element not found', () => {
      expect(() => instance._scrollToSection('nonexistent')).to.not.throw();
    });
  });

  // =========================================================================
  // _setScriptISOCode
  // =========================================================================
  describe('_setScriptISOCode', () => {
    it('should append script to pli lang attribute', () => {
      const node = document.createElement('div');
      instance.paliScript = 'sinhala';
      instance._setScriptISOCode(node, 'pli');
      expect(node.getAttribute('lang')).to.equal('pli-sinhala');
    });

    it('should not modify non-pli lang attribute', () => {
      const node = document.createElement('div');
      instance.paliScript = 'sinhala';
      instance._setScriptISOCode(node, 'en');
      expect(node.getAttribute('lang')).to.equal('en');
    });

    it('should handle null paliScript for pli lang', () => {
      const node = document.createElement('div');
      instance.paliScript = null;
      instance._setScriptISOCode(node, 'pli');
      expect(node.getAttribute('lang')).to.equal('pli');
    });
  });

  // =========================================================================
  // mapStyles
  // =========================================================================
  describe('mapStyles', () => {
    it('should have all expected style mappings', () => {
      expect(instance.mapStyles.has('sidenotes_plain')).to.be.true;
      expect(instance.mapStyles.has('sidenotes_sidebyside')).to.be.true;
      expect(instance.mapStyles.has('sidenotes_linebyline')).to.be.true;
      expect(instance.mapStyles.has('none_plain')).to.be.true;
      expect(instance.mapStyles.has('asterisk_plain')).to.be.true;
      expect(instance.mapStyles.has('none_sidebyside')).to.be.true;
      expect(instance.mapStyles.has('asterisk_sidebyside')).to.be.true;
      expect(instance.mapStyles.has('none_linebyline')).to.be.true;
      expect(instance.mapStyles.has('asterisk_linebyline')).to.be.true;
      expect(instance.mapStyles.has('pali')).to.be.true;
      expect(instance.mapStyles.has('sidenotes_root')).to.be.true;
    });

    it('should have 11 style entries', () => {
      expect(instance.mapStyles.size).to.equal(11);
    });
  });

  // =========================================================================
  // mapNoteDisplayStyles
  // =========================================================================
  describe('mapNoteDisplayStyles', () => {
    it('should have "none" and "asterisk" entries', () => {
      expect(instance.mapNoteDisplayStyles.has('none')).to.be.true;
      expect(instance.mapNoteDisplayStyles.has('asterisk')).to.be.true;
    });

    it('should have 2 entries', () => {
      expect(instance.mapNoteDisplayStyles.size).to.equal(2);
    });
  });

  // =========================================================================
  // constructor default values
  // =========================================================================
  describe('constructor defaults', () => {
    it('should set spansForWordsGenerated to false', () => {
      expect(instance.spansForWordsGenerated).to.be.false;
    });

    it('should set spansForGraphsGenerated to false', () => {
      expect(instance.spansForGraphsGenerated).to.be.false;
    });

    it('should set hasScriptBeenChanged to false', () => {
      expect(instance.hasScriptBeenChanged).to.be.false;
    });

    it('should set localizedStringsPath', () => {
      expect(instance.localizedStringsPath).to.equal('/localization/elements/interface');
    });

    it('should initialize commentSpanRectInfo as empty Map', () => {
      expect(instance.commentSpanRectInfo).to.be.instanceOf(Map);
      expect(instance.commentSpanRectInfo.size).to.equal(0);
    });

    it('should initialize rootEdition as empty array', () => {
      expect(instance.rootEdition).to.be.an('array');
      expect(instance.rootEdition).to.have.length(0);
    });

    it('should set isMultiSutta to false', () => {
      expect(instance.isMultiSutta).to.be.false;
    });

    it('should set isTraditionalChinese to false', () => {
      expect(instance.isTraditionalChinese).to.be.false;
    });

    it('should set viewCompose to empty string', () => {
      expect(instance.viewCompose).to.equal('');
    });

    it('should set floatingTooltipStyles to empty string', () => {
      expect(instance.floatingTooltipStyles).to.equal('');
    });

    it('should set _selectionEventsActive to false', () => {
      expect(instance._selectionEventsActive).to.be.false;
    });

    it('should set _handleContentMouseOver to null', () => {
      expect(instance._handleContentMouseOver).to.be.null;
    });
  });

  // =========================================================================
  // createRenderRoot
  // =========================================================================
  describe('createRenderRoot', () => {
    it('should return the element itself (no shadow DOM)', () => {
      expect(instance.createRenderRoot()).to.equal(instance);
    });
  });

  // =========================================================================
  // _cleanupSelectionEvents
  // =========================================================================
  describe('_cleanupSelectionEvents', () => {
    it('should set _selectionEventsActive to false', () => {
      instance._selectionEventsActive = true;
      instance.chosenTextView = 'plain';
      instance._cleanupSelectionEvents();
      expect(instance._selectionEventsActive).to.be.false;
    });

    it('should set userSelectStyles to null for non-sidebyside views', () => {
      instance.chosenTextView = 'plain';
      instance.userSelectStyles = 'some-styles';
      instance._cleanupSelectionEvents();
      expect(instance.userSelectStyles).to.be.null;
    });

    it('should not clear userSelectStyles for sidebyside view', () => {
      instance.chosenTextView = 'sidebyside';
      instance.userSelectStyles = 'some-styles';
      instance._cleanupSelectionEvents();
      expect(instance.userSelectStyles).to.equal('some-styles');
    });
  });

  // =========================================================================
  // Guard clause tests for various methods
  // =========================================================================
  describe('_addRootText', () => {
    it('should return early when bilaraRootSutta is null', () => {
      instance.bilaraRootSutta = null;
      expect(() => instance._addRootText()).to.not.throw();
    });
  });

  describe('_addTranslationText', () => {
    it('should return early when bilaraTranslatedSutta is null', () => {
      instance.bilaraTranslatedSutta = null;
      expect(() => instance._addTranslationText()).to.not.throw();
    });
  });

  describe('_addCommentText', () => {
    it('should return early when suttaComment is null', () => {
      instance.suttaComment = null;
      expect(() => instance._addCommentText()).to.not.throw();
    });

    it('should return early when chosenNoteDisplayType is "none"', () => {
      instance.suttaComment = { key: 'value' };
      instance.chosenNoteDisplayType = 'none';
      expect(() => instance._addCommentText()).to.not.throw();
    });
  });

  describe('_addVariantText', () => {
    it('should return early when suttaVariant is null', () => {
      instance.suttaVariant = null;
      expect(() => instance._addVariantText()).to.not.throw();
    });
  });

  describe('_addReferenceText', () => {
    it('should return early when suttaReference is null', async () => {
      instance.suttaReference = null;
      await instance._addReferenceText();
    });
  });

  describe('_addSCReference', () => {
    it('should return early when bilaraRootSutta is null', () => {
      instance.bilaraRootSutta = null;
      expect(() => instance._addSCReference()).to.not.throw();
    });
  });

  describe('_addRootSuttaMarkup', () => {
    it('should return early when bilaraRootSutta is null', () => {
      instance.bilaraRootSutta = null;
      expect(() => instance._addRootSuttaMarkup()).to.not.throw();
    });
  });

  describe('_addTranslationSuttaMarkup', () => {
    it('should return early when bilaraTranslatedSutta is null', () => {
      instance.bilaraTranslatedSutta = null;
      expect(() => instance._addTranslationSuttaMarkup()).to.not.throw();
    });
  });

  describe('_addTransliteratedRootText', () => {
    it('should return early when transliteratedRootSutta is null', () => {
      instance.transliteratedRootSutta = null;
      expect(() => instance._addTransliteratedRootText()).to.not.throw();
    });
  });

  // =========================================================================
  // _prepareNavigation
  // =========================================================================
  describe('_prepareNavigation', () => {
    it('should show empty TOC when no sutta data', () => {
      instance.bilaraTranslatedSutta = null;
      instance.bilaraRootSutta = null;
      const showTocStub = sinon.stub();
      sinon.stub(instance, 'actions').get(() => ({
        showToc: showTocStub,
      }));
      instance._prepareNavigation();
      expect(showTocStub.calledWith([])).to.be.true;
    });
  });

  // =========================================================================
  // listenThisSutta
  // =========================================================================
  describe('listenThisSutta', () => {
    it('should return early when suttaId is null', () => {
      instance.suttaId = null;
      const openStub = sinon.stub(window, 'open');
      instance.listenThisSutta();
      expect(openStub.called).to.be.false;
    });

    it('should return early when language is null', () => {
      instance.suttaId = 'dn1';
      instance.language = null;
      const openStub = sinon.stub(window, 'open');
      instance.listenThisSutta();
      expect(openStub.called).to.be.false;
    });

    it('should open sc-voice URL with correct parameters', () => {
      instance.suttaId = 'dn1';
      instance.language = 'en';
      instance.translatedSutta = { lang: 'de', author_uid: 'sabbamitta' };
      const openStub = sinon.stub(window, 'open');
      instance.listenThisSutta();
      expect(openStub.calledOnce).to.be.true;
      const url = openStub.firstCall.args[0];
      expect(url).to.include('dn1');
      expect(url).to.include('de');
      expect(url).to.include('sabbamitta');
      expect(openStub.firstCall.args[1]).to.equal('_blank');
    });

    it('should use default lang and author when translatedSutta is null', () => {
      instance.suttaId = 'mn1';
      instance.language = 'en';
      instance.translatedSutta = null;
      const openStub = sinon.stub(window, 'open');
      instance.listenThisSutta();
      const url = openStub.firstCall.args[0];
      expect(url).to.include('/en/');
      expect(url).to.include('/sujato');
    });
  });

  // =========================================================================
  // _checkAVIFSupport
  // =========================================================================
  describe('_checkAVIFSupport', () => {
    it('should return a Promise', () => {
      const result = instance._checkAVIFSupport();
      expect(result).to.be.instanceOf(Promise);
    });
  });

  // =========================================================================
  // _initializeFloatingTooltips
  // =========================================================================
  describe('_initializeFloatingTooltips', () => {
    it('should clear floatingTooltipStyles when note display is "none"', async () => {
      instance.chosenNoteDisplayType = 'none';
      instance.floatingTooltipStyles = 'some styles';
      await instance._initializeFloatingTooltips();
      expect(instance.floatingTooltipStyles).to.equal('');
    });

    it('should clear floatingTooltipStyles when note display is "sidenotes"', async () => {
      instance.chosenNoteDisplayType = 'sidenotes';
      instance.floatingTooltipStyles = 'some styles';
      await instance._initializeFloatingTooltips();
      expect(instance.floatingTooltipStyles).to.equal('');
    });
  });

  // =========================================================================
  // toggleChineseConvert
  // =========================================================================
  describe('toggleChineseConvert', () => {
    it('should return empty string when bilaraRootSutta is null', () => {
      instance.bilaraRootSutta = null;
      const result = instance.toggleChineseConvert();
      expect(result).to.equal('');
    });
  });

  // =========================================================================
  // _removeIllustrations
  // =========================================================================
  describe('_removeIllustrations', () => {
    it('should not throw when no illustrations exist', () => {
      expect(() => instance._removeIllustrations()).to.not.throw();
    });
  });

  // =========================================================================
  // _ensureIllustrationsAtEnd
  // =========================================================================
  describe('_ensureIllustrationsAtEnd', () => {
    it('should not throw when no illustrations exist', () => {
      expect(() => instance._ensureIllustrationsAtEnd()).to.not.throw();
    });
  });

  // =========================================================================
  // _addIllustrations
  // =========================================================================
  describe('_addIllustrations', () => {
    it('should return early in sidebyside view', async () => {
      instance.chosenTextView = 'sidebyside';
      instance.showIllustrations = true;
      await instance._addIllustrations();
    });

    it('should return early when showIllustrations is false', async () => {
      instance.chosenTextView = 'plain';
      instance.showIllustrations = false;
      await instance._addIllustrations();
    });
  });

  // =========================================================================
  // _changeScript
  // =========================================================================
  describe('_changeScript', () => {
    it('should return early when rootSutta is null', () => {
      instance.rootSutta = null;
      expect(() => instance._changeScript()).to.not.throw();
    });

    it('should return early when rootSutta lang is not pli', () => {
      instance.rootSutta = { lang: 'lzh' };
      expect(() => instance._changeScript()).to.not.throw();
    });
  });

  // =========================================================================
  // _removeRefFocusedClass / _removeDefineFocusedClass / _disableLookup
  // =========================================================================
  describe('_removeRefFocusedClass', () => {
    it('should not throw when no elements have refFocused class', () => {
      expect(() => instance._removeRefFocusedClass()).to.not.throw();
    });
  });

  describe('_removeDefineFocusedClass', () => {
    it('should not throw when no elements have spanFocused class', () => {
      expect(() => instance._removeDefineFocusedClass()).to.not.throw();
    });
  });

  describe('_disableLookup', () => {
    it('should not throw when no bottom sheet exists', () => {
      expect(() => instance._disableLookup()).to.not.throw();
    });
  });

  // =========================================================================
  // _conditionallyPutIntoSpans
  // =========================================================================
  describe('_conditionallyPutIntoSpans', () => {
    it('should not throw when rootSutta lang does not match', () => {
      instance.rootSutta = { lang: 'pli' };
      expect(() => instance._conditionallyPutIntoSpans('lzh')).to.not.throw();
    });
  });

  // =========================================================================
  // _putIntoSpans
  // =========================================================================
  describe('_putIntoSpans', () => {
    it('should call _putWordsIntoSpans for pli', () => {
      const stub = sinon.stub(instance, '_putWordsIntoSpans');
      instance._putIntoSpans('.root', 'pli');
      expect(stub.calledWith('.root', 'word')).to.be.true;
    });

    it('should call _putGraphsIntoSpans for lzh', () => {
      const stub = sinon.stub(instance, '_putGraphsIntoSpans');
      instance._putIntoSpans('.root', 'lzh');
      expect(stub.calledWith('.root', 'graph')).to.be.true;
    });
  });

  // =========================================================================
  // _addReferenceAnchor
  // =========================================================================
  describe('_addReferenceAnchor', () => {
    it('should not add anchors when refs contain only whitespace', () => {
      const refElement = document.createElement('span');
      instance.rootEdition = [];
      instance._addReferenceAnchor('pts-cs1.1', refElement);
      expect(refElement.children.length).to.equal(1);
    });

    it('should create anchor elements for each ref', () => {
      const refElement = document.createElement('span');
      instance.rootEdition = [{ uid: 'pts-cs', long_name: 'PTS' }];
      instance._addReferenceAnchor('pts-cs1.1, pts-cs1.2', refElement);
      expect(refElement.children.length).to.equal(2);
    });
  });
});
