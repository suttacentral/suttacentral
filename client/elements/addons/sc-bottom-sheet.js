import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import '@material/mwc-icon';
import '@material/mwc-icon-button';

import '@moduware/morph-ripple';

export class SCBottomSheet extends LitElement {
  static get properties() {
    return {
      currentDefine: { type: String },
      currentDefineDetail: { type: String },
      currentTarget: { type: Object },
      paliLookup: { type: Object },
      defineURL: { type: String },
    };
  }

  constructor() {
    super();
    this.currentDefine = '';
    this.currentDefineDetail = '';
    this.currentTarget = {};
    this.paliLookup = {};
    this.defineURL = '';
  }

  static get styles() {
    return css`

:host
{
    font-family: var(--sc-sans-font);

    position: fixed;
    z-index: 100;
    bottom: 0;

    width: 100%;
    margin: 0 calc(-1 * var(--sc-container-margin));

    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-2dp);
}

body,
main,
article,
header,
footer
{
    display: flex;
}

header
{
    position: relative;

    height: 32px;
    padding: 0 var(--sc-size-md);

    color: var(--sc-primary-background-color);
    background-color: var(--sc-secondary-text-color);

    justify-content: space-between;
    align-items: center;;
}

header div
{
    display: flex;
    flex-direction: row;
    align-items: center;
}

details
{
    font-size: 14px;

    z-index: 1;

    color: var(--sc-primary-background-color);
    background-color: var(--sc-secondary-text-color);
}

details ul
{
    margin-right: 1em;
}

details a
{
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color);
}

details[open]
{
    position: absolute;
    top: -300px;
    right: 10vw;

    width: 80vw;

    box-shadow: var(--sc-shadow-elevation-8dp);

    border-radius: 4px
}

summary
{
    white-space: nowrap;
}

header button
{
    width: 100%;

    border: none;
    background: none;
}

#btnClose
{
    padding: 8px 16px;

    cursor: pointer;

    color: inherit;
}

dfn
{
    margin-left: calc((100vw - 960px) / 2);
    padding: 0 var(--sc-size-sm);

    color: var(--sc-paper-tooltip-color);
    background-color: var(--sc-primary-color-light);
}

main
{
    justify-content: center;
}

article
{
    overflow-x: hidden;
    overflow-y: auto;

    box-sizing: border-box;
    width: 960px;
    height: 120px;
    padding: 12px 16px 0;;
}

dl
{
    /*hack to get the padding-bottom working*/
    font-size: 16px;

    display: table;

    margin: 0 0 16px 0;
}

dt
{
    display: inline-block;

    background-color: var(--sc-primary-color-light);
}

dd
{
    margin: var(--sc-size-sm) 0 0 0;
}

dd a
{
    font-weight: bold;

    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color);;
}

footer
{
    box-sizing: border-box;
    height: 48px;

    border-top: 1px solid rgba(0, 0, 0, .12);
    background-color: var(--sc-secondary-background-color);
}

footer div
{
    position: relative;

    width: 50%;

    text-align: center;;
}

#next
{
    border-left: 1px solid var(--sc-border-color);
}

footer div button
{
    font-size: 2em;

    width: 100%;
    height: 100%;
    /* vertical-align: top; */
    padding-bottom: 10px;

    cursor: pointer;

    color: var(--sc-disabled-text-color);
    border: none;
    background: none;;
}

#btnNext
{
    border-left: 1px solid rgba(0, 0, 0, .14);
}

  morph-ripple 
{
    --ripple-color: var(--sc-primary-color);
}

@keyframes bottomSheetShow
{
    from
    {
        bottom: -200px;
    }

    to
    {
        bottom: 0;
    }
}

@keyframes bottomSheetHide
{
    from
    {
        bottom: 0;
    }

    to
    {
        bottom: -200px;
    }
}

`;
  }

  render() {
    return html`
      <div id="wrapper">
        <header>
          <dfn>${this.currentDefine}</dfn>
            <div>
              <details>
                <summary>Help</summary>
                  <ul>
                    <li>Source: <cite>New Concise Pali-English Dictionary</cite>, compiled by SuttaCentral from Buddhadatta’s <cite>Concise Pali-English Dictionary</cite>, updated and corrected from Margaret Cone’s <cite>Dictionary of Pali</cite>.</li>
                    <li>Pali words are analyzed by machine and results are not always accurate.</li>
                    <li>Click on a head word to go to full dictionary entry.</li>
                    <li>Navigate using keyboard.
                      <ul>
                        <li>Next = <kbd>Alt</kbd> + <kbd>n</kbd></li>
                        <li>Back = <kbd>Alt</kbd> + <kbd>b</kbd></li>
                      </ul>
                      If this doesn’t work for you, check the <a href='https://en.wikipedia.org/wiki/Access_key#Access_in_different_browsers' target='_blank'>HTML access key for your browser</a>.
                    </li>
                </ul>
              </details>
              <button id="btnClose" @click=${this.hide}>✕</button>

            </div>
        </header>
        <main>
          <article>
            <dl>
              <dd>${unsafeHTML(this.currentDefineDetail)}</dd>
            </dl>
          </article>
        </main>
        <footer>
          <div>
            <button accesskey="b" id="btnPrevious" @click=${this._previous}>&#8592;<morph-ripple></morph-ripple></button>
          </div>
          <div>
            <button accesskey="n" id="btnNext" @click=${this._next}>&#8594;<morph-ripple></morph-ripple></button>
          </div>
        </footer>
      </div>
    `;
  }

  hide() {
    this.style.animation = 'bottomSheetHide 200ms 1 ease-in normal forwards';
    setTimeout(() => {
      this.style.display = 'none';
    }, 100);
  }
  show() {
    this.style.display = 'block';
    this.style.animation = 'bottomSheetShow 200ms 1 ease-in normal forwards';
  }

  _previous() {
    // currentTarget(span.word) ID = (word_[num], e.g. word_0, word_1)
    let focusedWordId = this.currentTarget.id.slice(5);
    if (focusedWordId && parseInt(focusedWordId) !== 0) {
      let previousWord = this.parentNode.querySelector(`#word_${parseInt(focusedWordId) - 1}`);
      if (previousWord) {
        this._setProperties(previousWord);
      }
    }
  }

  _next() {
    let focusedWordId = this.currentTarget.id.slice(5);
    if (focusedWordId) {
      let nextWord = this.parentNode.querySelector(`#word_${parseInt(focusedWordId) + 1}`);
      if (nextWord) {
        this._setProperties(nextWord);
      }
    }
  }

  _setProperties(nextDefineElement) {
    this.currentDefine = nextDefineElement.textContent;
    let lookupResult = this.paliLookup.lookupWord(nextDefineElement.dataset.latin_text || nextDefineElement.textContent);
    this.currentDefineDetail = lookupResult.html;
    this.currentTarget.classList.remove('spanFocused');
    nextDefineElement.classList.add('spanFocused');
    this.currentTarget = nextDefineElement;
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('currentDefineDetail')) {
      if (this.currentDefineDetail === '') return;
      const template = this.currentDefineDetail;
      let newDiv = document.createElement('div');
      newDiv.innerHTML = template;
      let defineAElement = newDiv.querySelector('div a');
      if (defineAElement) {
        this.defineURL = defineAElement.href;
      }
    }
  }
}

customElements.define('sc-bottom-sheet', SCBottomSheet);