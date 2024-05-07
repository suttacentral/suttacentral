import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { API_ROOT } from '../../constants';

import { dpd_deconstructor } from '../../files/dpd/dpd_deconstructor.js'
import { dpd_ebts } from '../../files/dpd/dpd_ebts.js' 
import { dpd_i2h } from '../../files/dpd/dpd_i2h.js' 

// import dpd_deconstructor from '../../files/dpd/dpd_deconstructor.json'
// import dpd_ebts from '../../files/dpd/dpd_ebts.json' 
// import dpd_i2h from '../../files/dpd/dpd_i2h.json' 

export class SCPaliLookup extends LitLocalized(LitElement) {
  static properties = {
    syllSpacer: { type: String },
    dictData: { type: Object },
    loadingDict: { type: Boolean },
    isTi: { type: Boolean },
    loadedLanguage: { type: String },
    toLang: { type: String },
  };

  constructor() {
    super();
    this.syllSpacer = '‧';
    this.dictData = {};
    this.loadingDict = true;
    this.isTi = false;
    this.loadedLanguage = '';
    this.toLang = store.getState().textOptions.paliLookupTargetLanguage;
  }

  firstUpdated() {
    this.getNewDict();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('toLang')) {
      this._targetLanguageChanged();
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
    const targetLanguage = state.textOptions.paliLookupTargetLanguage;
    if (this.toLang !== targetLanguage) {
      this.toLang = targetLanguage;
    }
  }

  async getNewDict() {
    if (!this.toLang) {
      return;
    }
    this.loadingDict = true;
    this.loadedLanguage = this.toLang;
    this.dictData = await (await fetch(this._computeUrl())).json();
    this.loadingDict = false;
  }

  lookupWord(word){
    word = this._stripSpecialCharacters(word);
    word = word.toLowerCase().trim();
    word = word.replace(/­/g, '').replace(RegExp(this.syllSpacer, 'g'), ''); // optional hyphen, syllable-breaker
    word = word.replace(/ṁg/g, 'ṅg').replace(/ṁk/g, 'ṅk').replace(/ṁ/g, 'ṁ').replace(/ṁ/g, 'ṁ');

    let allMatches_dpd = []
    word = word.replace(/[’”]/g, "").replace(/ṁ/g, "ṃ");
    if(word in dpd_i2h){
      const dpd_i2h_t = this._dpdTransform(dpd_i2h[word].sort((a, b) => a - b)) // create array like below instead of simple enumeration of the dpd_i2h...
      let matches = []
      for (const match of dpd_i2h_t){
        for (const variation of match.vars){
          if(variation in dpd_ebts){
            matches.push(dpd_ebts[variation]);
          }
        }
        allMatches_dpd.push({base: match.root, meaning: matches}) 
        matches = []
      }
    }
  
    if(word in dpd_deconstructor){
      allMatches_dpd.push({base: word, meaning: dpd_deconstructor[word]})
    }

    //return { html: out.replace(/ṃ/g, "ṁ") }; based on user preference ?
    const meaning = this._toHtml(allMatches_dpd, word);
    return { html: meaning };

  }

  lookupWord_old(word) {
    word = this._stripSpecialCharacters(word);
    word = word.toLowerCase().trim();
    word = word.replace(/­/g, '').replace(RegExp(this.syllSpacer, 'g'), ''); // optional hyphen, syllable-breaker
    word = word.replace(/ṁg/g, 'ṅg').replace(/ṁk/g, 'ṅk').replace(/ṁ/g, 'ṁ').replace(/ṁ/g, 'ṁ');
    const allMatches = this._lookupWord(word);
    const meaning = this._toHtml(allMatches, word);
    return { html: meaning };
  }

  _dpdTransform = (arr) => {
    // function made by https://www.phind.com/ to help formating the dpd entries. Prompt in dpd/README.md

    // Step 1: Use reduce to accumulate results into an object
    const resultObj = arr.reduce((acc, item) => {
       // Step 2: Extract the root part of the string
       const root = item.split(' ')[0];
       
       // Step 3: Check if the root exists in the accumulator
       if (acc[root]) {
         // If it exists, push the item into the vars array
         acc[root].vars.push(item);
       } else {
         // If it doesn't exist, create a new entry
         acc[root] = { root, vars: [item] };
       }
       
       return acc;
    }, {});
     
    // Step 4: Convert the object into the desired array format
    return Object.values(resultObj);
   };
    

  _stripSpecialCharacters(word) {
    return word.replace(
      /(~|`|!|@|#|\$|%|\^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=|“|‘|—)/g,
      ''
    );
  }

  _computeUrl() {
    return `${API_ROOT}/dictionaries/lookup?from=pli&to=${this.toLang}`;
  }

  _targetLanguageChanged() {
    if (this.toLang && this.toLang !== this.loadedLanguage) {
      this.getNewDict();
    }
  }

  _toHtml(allMatches, original) {
    if (allMatches.length === 0) {
      allMatches.push({ base: original, meaning: '?', grammar: '', xr: '' });
    }
    if (this.isTi) {
      allMatches.push({ base: 'iti', meaning: 'endquote', grammar: '', xr: '' });
    }
    return html`
      ${allMatches.map(
        match => html`
          <dl>
            <dt>
              <dfn class="entry" lang="pi" translate="no">
                <a href="/define/${match.base}" target="_blank" rel="noopener noreferrer" class="lookup-link">
                  ${match.base}
                </a>
              </dfn>
            </dt>
            <dd>
              ${match.grammar ? html` <span class="grammar">${match.grammar}</span> ` : ''}
              ${match.meaning
                ? html`
                    <ol class="definition">
                      ${match.meaning.constructor === Array
                        ? html` ${match.meaning.map(item => html` <li>${unsafeHTML(item)}</li> `)} `
                        : html` <li>${unsafeHTML(match.meaning)}</li> `}
                    </ol>
                  `
                : ''}
              ${match.xr
                ? html`
                    <ul class="xr">
                      ${match.xr.constructor === Array
                        ? html`
                            ${match.xr.map(
                              item => html` <li><a href="/define/${item}">${item}</a></li> `
                            )}
                          `
                        : html` <li><a href="/define/${match.xr}">${match.xr}</a></li> `}
                    </ul>
                  `
                : ''}
            </dd>
          </dl>
        `
      )}
    `;
  }

  _lookupWord(word) {
    let allMatches = [];
    this.isTi = false;
    if (word.match(/[’”]ti$/)) {
      this.isTi = true;
      word = word.replace(/[’”]ti$/, '');
    }
    word = word.replace(/[’”]/g, '');
    let unword = null; // The un-negated version.

    // First we try to match the word as-is
    let matchCompleteResult = this.matchComplete(word, { ti: this.isTi });
    if (!matchCompleteResult || matchCompleteResult.length === 0) {
      if (word.search(/^an|^a(.)\1/) !== -1) {
        unword = word.substring(2, word.length);
      } else if (word.search(/^a/) !== -1) {
        unword = word.substring(1, word.length);
      }

      if (unword) {
        matchCompleteResult = this.matchComplete(unword, { ti: this.isTi });
        if (matchCompleteResult && matchCompleteResult.length > 0) {
          allMatches.push({ base: 'an', meaning: 'non/not', grammar: '', xr: '' });
        }
      }
    }
    if (matchCompleteResult && matchCompleteResult.length > 0) {
      allMatches = allMatches.concat(matchCompleteResult);
    }

    if (allMatches.length === 0) {
      // Now we attempt to break up the compound.
      // First is special case since 'an' is possibility.
      matchCompleteResult = this.matchPartial(word);
      if (unword) {
        const matchPartialResult = this.matchPartial(unword);
        if (
          (matchPartialResult && !matchCompleteResult) ||
          (matchPartialResult &&
            matchCompleteResult &&
            matchPartialResult.base.length > matchCompleteResult.base.length)
        ) {
          matchCompleteResult = matchPartialResult;
          allMatches.push({ base: 'an', meaning: 'non/not', grammar: '', xr: '' });
        }
      }
      let foundComplete = false;
      while (matchCompleteResult && !foundComplete) {
        if (matchCompleteResult instanceof Array && matchCompleteResult.length === 1) {
          matchCompleteResult = matchCompleteResult[0];
        }
        allMatches = allMatches.concat(matchCompleteResult);
        let { leftover } = matchCompleteResult;
        let firstChar = '';
        const sandhi = matchCompleteResult.base[matchCompleteResult.base.length - 1];
        if (leftover) {
          firstChar = leftover[0];
          leftover = leftover.substring(1, leftover.length);
        } else {
          break;
        }
        const starts = [firstChar, '', sandhi + firstChar];
        let vowels = ['a', 'ā', 'i', 'ī', 'u', 'ū', 'o', 'e'];
        // As a rule sandhi doesn't shortern vowels
        if (sandhi === 'a' || sandhi === 'i' || sandhi === 'u') {
          vowels = ['a', 'i', 'u'];
        }
        for (let i in vowels) {
          starts.push(vowels[i] + firstChar);
        }
        for (const i in starts) {
          matchCompleteResult = this.matchComplete(starts[i] + leftover, { ti: this.isTi });
          if (matchCompleteResult && matchCompleteResult.length > 0) {
            allMatches = allMatches.concat(matchCompleteResult);
            foundComplete = true;
            break;
          }
          matchCompleteResult = this.matchPartial(starts[i] + leftover);
          if (matchCompleteResult) {
            break;
          }
        }
        if (!matchCompleteResult) {
          const entry = firstChar + leftover;
          if (entry !== 'ṁ') {
            allMatches.push({ base: entry, meaning: '?', grammar: '', xr: '' });
          }
          break;
        }
      }
      // In the long run it would be nice to implement 'two ended candle' match.
    }

    return allMatches;
  }

  matchComplete(word, args) {
    const matches = [];
    for (
      let pi = 0;
      pi < 2;
      pi++ // 'pi (list)
    )
      for (
        let vy = 0;
        vy < 2;
        vy++ // vy / by (burmese)
      )
        for (let ti = 0; ti < 2; ti++) {
          // 'ti (end quote)
          // On the first pass change nothing.
          let wordForMatch = word;
          // On the second pass we change the last vowel if 'ti', otherwise skip.
          if (ti && args.ti === true) {
            wordForMatch = wordForMatch
              .replace(/ī$/, 'i')
              .replace(/ā$/, 'i')
              .replace(/ū$/, 'i')
              .replace(/n$/, '')
              .replace(/n$/, 'ṁ');
          }
          if (pi) {
            if (wordForMatch.search(/pi$/) === -1) {
              continue;
            }
            wordForMatch = wordForMatch.replace(/pi$/, '');
          }
          if (vy) {
            if (wordForMatch.match(/vy/)) {
              wordForMatch = wordForMatch.replace(/vy/g, 'by');
            } else if (wordForMatch.match(/by/)) {
              wordForMatch = wordForMatch.replace(/by/g, 'vy');
            } else {
              continue;
            }
          }

          const exactOrFuzzyMatchResult =
            this.exactMatch(wordForMatch) || this.fuzzyMatch(wordForMatch);
          if (exactOrFuzzyMatchResult) {
            matches.push(exactOrFuzzyMatchResult);
            if (pi) {
              matches.push({ base: 'pi', meaning: 'too', grammar: '', xr: '' });
            }
            return matches;
          }
        }

    return null;
  }

  matchPartial(word, maxLength = 4) {
    if (!this.dictData || this.dictData.length === 0) {
      return;
    }
    // Matching partials is somewhat simpler, since all ending cases are clipped off.
    for (let vy = 0; vy < 2; vy++) {
      let wordp = word;
      if (vy) {
        if (wordp.match(/vy/)) {
          wordp = wordp.replace(/vy/g, 'by');
        } else if (wordp.match(/by/)) {
          wordp = wordp.replace(/by/g, 'vy');
        } else {
          continue;
        }
      }

      for (let i = 0; i < word.length; i++) {
        const part = word.substring(0, word.length - i);
        if (part.length < maxLength) {
          break;
        }
        const target = this.dictData?.find(x => x.entry === part);
        if (typeof target === 'object') {
          return {
            base: part,
            meaning: target.definition,
            grammar: target.grammar,
            xr: target.xr,
            leftover: word.substring(word.length - i, word.length),
          };
        }
      }
    }
  }

  // Every match should return an object containing:
  // "base": The base text being matched
  // "meaning": The meaning of the matched text.
  // "leftovers": Anything which wasn't matched by the function, should be empty string
  //  or null if meaningless (such as a grammatical insertion ie. 'ti')
  exactMatch(word) {
    if (!this.dictData || this.dictData.length === 0) {
      return;
    }
    const target = this.dictData?.find(x => x.entry === word);
    if (typeof target === 'object') {
      return { base: word, meaning: target.definition, grammar: target.grammar, xr: target.xr };
    }
    return null;
  }

  fuzzyMatch(word) {
    if (!this.dictData || this.dictData.length === 0) {
      return;
    }
    const end = this._getEndings();
    for (let i = 0; i < end.length; i++) {
      if (
        word.length > end[i][2] &&
        word.substring(word.length - end[i][0].length, word.length) === end[i][0]
      ) {
        const orig = word.substring(0, word.length - end[i][0].length + end[i][1]) + end[i][3];
        const target = this.dictData?.find(x => x.entry === orig);
        if (typeof target === 'object') {
          return { base: orig, meaning: target.definition, grammar: target.grammar, xr: target.xr };
        }
      }
    }
    return null;
  }

  _getEndings() {
    return [
      ['i', 1, 0, ''],
      ['u', 1, 0, ''],
      ['ati', 1, 0, ''],
      ['āti', 1, 0, ''],
      ['eti', 1, 0, ''],
      ['oti', 1, 0, ''],
      ['o', 0, 0, 'a'],
      ['ā', 0, 0, 'a'],
      ['aṁ', 1, 0, ''],
      ['ṁ', 0, 0, ''],
      ['e', 0, 0, 'a'],
      ['ena', 0, 0, 'a'],
      ['ehi', 0, 0, 'a'],
      ['ebhi', 0, 0, 'a'],
      ['āya', 0, 0, 'a'],
      ['ssa', 0, 0, ''],
      ['ānaṁ', 0, 0, 'a'],
      ['smā', 0, 0, ''],
      ['mhā', 0, 0, ''],
      ['smiṁ', 0, 0, ''],
      ['mhi', 0, 1, ''],
      ['esu', 0, 0, 'a'],
      ['ayo', 0, 1, 'i'],
      ['ī', 1, 1, ''],
      ['inā', 1, 1, ''],
      ['īhi', 1, 1, ''],
      ['hi', 0, 2, ''],
      ['ībhi', 1, 1, ''],
      ['bhi', 0, 1, ''],
      ['ino', 1, 1, ''],
      ['īnaṁ', 1, 1, ''],
      ['īsu', 1, 1, ''],
      ['i', 1, 2, 'i'],
      ['inaṁ', 1, 0, ''],
      ['avo', 0, 1, 'u'],
      ['ave', 0, 1, 'u'],
      ['ū', 1, 1, ''],
      ['unā', 1, 1, ''],
      ['ūhi', 1, 1, ''],
      ['ūbhi', 1, 1, ''],
      ['uno', 1, 1, ''],
      ['ūnaṁ', 1, 1, ''],
      ['ūsu', 1, 1, ''],
      ['u', 1, 2, 'u'],
      ['āni', 0, 2, 'a'],
      ['īni', 1, 2, ''],
      ['ūni', 1, 2, ''],
      ['a', 1, 2, 'a'],
      ['āyo', 0, 0, 'a'],
      ['āhi', 0, 0, 'a'],
      ['ābhi', 0, 0, 'a'],
      ['āyaṁ', 0, 0, 'a'],
      ['āsu', 0, 0, 'a'],
      ['iyo', 1, 0, ''],
      ['iyā', 1, 0, ''],
      ['iyaṁ', 1, 0, ''],
      ['iyā', 0, 0, 'ī'],
      ['iyaṁ', 0, 0, 'ī'],
      ['iyaṁ', 0, 0, 'i'],
      ['āya', 0, 0, 'ī'],
      ['ī', 0, 0, 'a'],
      ['inī', 0, 0, 'a'],
      ['uyo', 1, 0, ''],
      ['uyā', 1, 0, ''],
      ['uyaṁ', 1, 0, ''],
      ['ā', 0, 3, 'ant'],
      ['a', 1, 3, 'nt'],
      ['ataṁ', 1, 3, 'nt'],
      ['antaṁ', 1, 3, 'nt'],
      ['anto', 1, 3, 'nt'],
      ['antā', 1, 3, 'nt'],
      ['ante', 1, 3, 'nt'],
      ['atā', 1, 3, 'nt'],
      ['antehi', 1, 3, 'nt'],
      ['ato', 1, 3, 'nt'],
      ['antānaṁ', 1, 3, 'nt'],
      ['ati', 1, 3, 'nt'],
      ['antesu', 1, 3, 'nt'],
      ['ā', 0, 3, 'anta'],
      ['a', 1, 3, 'nta'],
      ['ataṁ', 1, 3, 'nta'],
      ['ataṁ', 1, 3, 'ti'],
      ['antaṁ', 1, 3, 'nta'],
      ['anto', 1, 3, 'nta'],
      ['antā', 1, 3, 'nta'],
      ['ante', 1, 3, 'nta'],
      ['atā', 1, 3, 'nta'],
      ['antehi', 1, 3, 'nta'],
      ['ato', 1, 3, 'nta'],
      ['antānaṁ', 1, 3, 'nta'],
      ['ati', 1, 3, 'nta'],
      ['antesu', 1, 3, 'nta'],
      ['ā', 0, 2, 'ar'],
      ['āraṁ', 0, 2, 'ar'],
      ['ārā', 0, 2, 'ar'],
      ['u', 0, 2, 'ar'],
      ['uno', 0, 2, 'ar'],
      ['ari', 0, 2, 'ar'],
      ['āro', 0, 2, 'ar'],
      ['ūhi', 0, 2, 'ar'],
      ['ūbhi', 0, 2, 'ar'],
      ['ūnaṁ', 0, 2, 'ar'],
      ['ārānaṁ', 0, 2, 'ar'],
      ['ūsu', 0, 2, 'ar'],
      ['ā', 0, 2, 'ar'],
      ['a', 0, 2, 'ar'],
      ['araṁ', 0, 2, 'ar'],
      ['arā', 0, 2, 'ar'],
      ['aro', 0, 2, 'ar'],
      ['unā', 0, 2, 'ar'],
      ['arehi', 0, 2, 'ar'],
      ['arebhi', 0, 2, 'ar'],
      ['ānaṁ', 0, 2, 'ar'],
      ['arānaṁ', 0, 2, 'ar'],
      ['unnaṁ', 0, 2, 'ar'],
      ['ito', 0, 2, 'ar'],
      ['uyā', 0, 2, 'ar'],
      ['yā', 0, 2, 'ar'],
      ['yaṁ', 0, 2, 'ar'],
      ['uyaṁ', 0, 2, 'ar'],
      ['aṁ', 0, 0, 'ā'],
      ['āya', 0, 0, 'ā'],
      ['asā', 0, 0, 'o'],
      ['aso', 0, 0, 'o'],
      ['asi', 0, 0, 'o'],
      ['ā', 0, 0, 'o'],
      ['aṁ', 0, 0, 'o'],
      ['e', 0, 0, 'o'],
      ['ena', 0, 0, 'o'],
      ['ehi', 0, 0, 'o'],
      ['ebhi', 0, 0, 'o'],
      ['āya', 0, 0, 'o'],
      ['assa', 0, 0, 'o'],
      ['ānaṁ', 0, 0, 'o'],
      ['asmā', 0, 0, 'o'],
      ['amhā', 0, 0, 'o'],
      ['asmiṁ', 0, 0, 'o'],
      ['amhi', 0, 0, 'o'],
      ['esu', 0, 0, 'o'],
      ['ato', 1, 2, 'ti'],
      ['atā', 1, 2, 'ti'],
      ['ato', 1, 2, 'ati'],
      ['atā', 1, 2, 'ati'],
      ['eto', 1, 2, 'ti'],
      ['etā', 1, 2, 'ti'],
      ['oto', 1, 2, 'ti'],
      ['otā', 1, 2, 'ti'],
      ['ahi', 1, 1, ''],
      ['to', 0, 2, ''],
      ['annaṁ', 1, 1, ''],
      ['unnaṁ', 1, 1, ''],
      ['innaṁ', 1, 1, ''],
      ['atā', 2, 1, 'i'],
      ['iya', 0, 2, 'a'],
      ['uyaṁ', 0, 0, ''],
      ['ati', 3, 0, ''],
      ['āti', 3, 0, ''],
      ['eti', 3, 0, ''],
      ['oti', 3, 0, ''],
      ['anti', 1, 0, 'ti'],
      ['si', 0, 3, 'ti'],
      ['asi', 1, 0, 'ti'],
      ['atha', 1, 0, 'ati'],
      ['āmi', 0, 0, 'ati'],
      ['āma', 0, 0, 'ati'],
      ['āmi', 1, 0, 'ti'],
      ['āma', 1, 0, 'ti'],
      ['onti', 1, 0, 'ti'],
      ['osi', 1, 0, 'ti'],
      ['otha', 1, 0, 'ti'],
      ['omi', 1, 0, 'ti'],
      ['oma', 1, 0, 'ti'],
      ['enti', 1, 0, 'ti'],
      ['esi', 1, 0, 'ti'],
      ['etha', 1, 0, 'ti'],
      ['emi', 1, 0, 'ti'],
      ['ema', 1, 0, 'ti'],
      ['hi', 0, 3, 'ti'],
      ['atu', 1, 2, 'ti'],
      ['antu', 1, 1, 'ti'],
      ['ohi', 1, 0, 'ti'],
      ['otu', 1, 0, 'ti'],
      ['ontu', 1, 0, 'ti'],
      ['etu', 1, 0, 'ti'],
      ['entu', 1, 0, 'ti'],
      ['ehi', 1, 0, 'ti'],
      ['eti', 0, 2, 'ati'],
      ['enti', 0, 2, 'ati'],
      ['esi', 0, 2, 'ati'],
      ['etha', 0, 2, 'ati'],
      ['emi', 0, 2, 'ati'],
      ['ema', 0, 2, 'ati'],
      ['eti', 0, 2, 'āti'],
      ['enti', 0, 2, 'āti'],
      ['esi', 0, 2, 'āti'],
      ['etha', 0, 2, 'āti'],
      ['emi', 0, 2, 'āti'],
      ['ema', 0, 2, 'āti'],
      ['entu', 0, 2, 'ati'],
      ['ayitvā', 0, 2, 'eti'],
      ['ayitvāna', 0, 2, 'eti'],
      ['vāna', 0, 2, 'i'],
      ['āpetvā', 0, 0, 'ati'],
      ['itvāna', 0, 0, 'ati'],
      ['itvāna', 0, 0, 'āti'],
      ['itvāna', 0, 0, 'eti'],
      ['etvāna', 0, 0, 'ati'],
      ['tvāna', 0, 0, 'ti'],
      ['itvā', 0, 0, 'ati'],
      ['itvā', 0, 0, 'āti'],
      ['itvā', 0, 0, 'eti'],
      ['etvā', 0, 0, 'ati'],
      ['tvā', 0, 0, 'ti'],
      ['āya', 0, 0, 'ati'],
      ['āya', 0, 0, 'ati'],
      ['āya', 0, 0, 'āti'],
      ['āya', 0, 0, 'eti'],
      ['tuṁ', 0, 0, 'ti'],
      ['ituṁ', 0, 0, 'ati'],
      ['ituṁ', 0, 0, 'āti'],
      ['a', 0, 3, 'ati'],
      ['i', 0, 3, 'ati'],
      ['imha', 0, 0, 'ati'],
      ['imhā', 0, 0, 'ati'],
      ['iṁsu', 0, 1, 'ati'],
      ['ittha', 0, 0, 'ati'],
      ['uṁ', 0, 0, 'ati'],
      ['suṁ', 0, 0, 'ti'],
      ['siṁ', 0, 0, 'ti'],
      ['iṁ', 0, 0, 'ati'],
      ['a', 0, 3, 'āti'],
      ['i', 0, 3, 'āti'],
      ['imha', 0, 0, 'āti'],
      ['imhā', 0, 0, 'āti'],
      ['iṁsu', 0, 1, 'āti'],
      ['ittha', 0, 0, 'āti'],
      ['uṁ', 0, 0, 'āti'],
      ['iṁ', 0, 0, 'āti'],
      ['a', 0, 3, 'eti'],
      ['i', 0, 3, 'eti'],
      ['imha', 0, 0, 'eti'],
      ['imhā', 0, 0, 'eti'],
      ['iṁsu', 0, 1, 'eti'],
      ['ayiṁsu', 0, 1, 'eti'],
      ['ittha', 0, 0, 'eti'],
      ['uṁ', 0, 0, 'eti'],
      ['iṁ', 0, 0, 'eti'],
      ['iyaṁ', 0, 0, 'eti'],
      ['eyya', 0, 0, 'ati'],
      ['eyyaṁ', 0, 0, 'ati'],
      ['eyyuṁ', 0, 0, 'ati'],
      ['eyyati', 0, 0, 'ati'],
      ['eyyasi', 0, 0, 'ati'],
      ['eyyātha', 0, 0, 'ati'],
      ['eyyāmi', 0, 0, 'ati'],
      ['eyyāsi', 0, 0, 'ati'],
      ['eyyāma', 0, 0, 'ati'],
      ['eyyanti', 0, 0, 'ati'],
      ['eyya', 0, 0, 'āti'],
      ['eyyaṁ', 0, 0, 'āti'],
      ['eyyuṁ', 0, 0, 'āti'],
      ['eyyati', 0, 0, 'āti'],
      ['eyyasi', 0, 0, 'āti'],
      ['eyyātha', 0, 0, 'āti'],
      ['eyyāmi', 0, 0, 'āti'],
      ['eyyāsi', 0, 0, 'āti'],
      ['eyyāma', 0, 0, 'āti'],
      ['eyyanti', 0, 0, 'āti'],
      ['eyya', 1, 0, 'ti'],
      ['eyyaṁ', 1, 0, 'ti'],
      ['eyyuṁ', 1, 0, 'ti'],
      ['eyyati', 1, 0, 'ti'],
      ['eyyasi', 1, 0, 'ti'],
      ['eyyātha', 1, 0, 'ti'],
      ['eyyāmi', 1, 0, 'ti'],
      ['eyyāsi', 1, 0, 'ti'],
      ['eyyāma', 1, 0, 'ti'],
      ['eyyanti', 1, 0, 'ti'],
      ['eyya', 0, 0, 'oti'],
      ['eyyaṁ', 0, 0, 'oti'],
      ['eyyuṁ', 0, 0, 'oti'],
      ['eyyati', 0, 0, 'oti'],
      ['eyyasi', 0, 0, 'oti'],
      ['eyyātha', 0, 0, 'oti'],
      ['eyyāmi', 0, 0, 'oti'],
      ['eyyāsi', 0, 0, 'oti'],
      ['eyyāma', 0, 0, 'oti'],
      ['eyyanti', 0, 0, 'oti'],
      ['issa', 0, 2, 'ati'],
      ['issā', 0, 2, 'ati'],
      ['issaṁsu', 0, 2, 'ati'],
      ['issatha', 0, 2, 'ati'],
      ['issaṁ', 0, 2, 'ati'],
      ['issāmi', 0, 2, 'ati'],
      ['issati', 0, 3, 'ati'],
      ['issāma', 0, 2, 'ati'],
      ['issa', 0, 2, 'āti'],
      ['issā', 0, 2, 'āti'],
      ['issaṁsu', 0, 2, 'āti'],
      ['issa', 0, 2, 'āti'],
      ['issatha', 0, 2, 'āti'],
      ['issaṁ', 0, 2, 'āti'],
      ['issāma', 0, 2, 'āti'],
      ['essa', 1, 2, 'ti'],
      ['essā', 1, 2, 'ti'],
      ['essaṁsu', 1, 2, 'ti'],
      ['essa', 1, 2, 'ti'],
      ['essatha', 1, 2, 'ti'],
      ['essaṁ', 1, 2, 'ti'],
      ['essāma', 1, 2, 'ti'],
      ['issanti', 0, 3, 'ati'],
    ];
  }
}

customElements.define('sc-pali-lookup', SCPaliLookup);
