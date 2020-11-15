import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@moduware/morph-ripple';
import { icons } from '../../img/sc-icons';

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
      :host {
        font-family: var(--sc-sans-font);
      
        position: fixed;
        z-index: 100;
        bottom: 0;
      
        width: 100%;
        margin: 0 calc(-1 * var(--sc-container-margin));
      
        background-color: var(--sc-secondary-background-color);
        box-shadow: var(--sc-shadow-elevation-2dp);

        display: none;
      }
      
      body,
      main,
      article,
      header,
      footer {
        display: flex;
      }
      
      header {
        position: relative;
      
        height: 32px;
        padding: 0 var(--sc-size-md);
      
        color: var(--sc-primary-background-color);
        background-color: var(--sc-secondary-text-color);
      
        justify-content: space-between;
        align-items: center;
        ;
      }
      
      header div {
        display: flex;
        flex-direction: row;
      
        align-items: center;
      }
      
      details {
        font-size: var(--sc-skolar-font-size-s);
      
        z-index: 1;
      
        max-width: 720px;
      
        color: var(--sc-primary-background-color);
        background-color: var(--sc-secondary-text-color);
      }
      
      details ul {
        margin-right: 1em;
      }
      
      details a {
        text-decoration: underline;
      
        color: inherit;
      
        text-decoration-color: var(--sc-primary-color);
      }
      
      summary {
        white-space: nowrap;
      }
      
      details>summary {
        position: relative;
      
        display: flex;
      
        padding: 2px 8px;
      
        list-style: none;
      
        cursor: pointer;
      }
      
      details>summary::-webkit-details-marker {
        display: none;
      }
      
      details .help-display-inner {
        position: absolute;
        z-index: 1000;
        right: 3vw;
        bottom: 48px;
      
        max-width: 720px;
        margin-left: 3vw;
      
        border-radius: 4px;
        background-color: var(--sc-secondary-text-color);
        box-shadow: var(--sc-shadow-elevation-8dp);
      }
      
      .bottom-sheet-icon-label {
        font-family: 'Skolar Sans PE Compressed', var(--sc-sans-font);
        font-weight: 500;
      
        margin-left: 4px;
      
        align-self: center;
      }
      
      header button {
        width: 100%;
      
        border: none;
        background: none;
      }
      
      #btnClose {
        display: flex;
      
        padding: 2px 8px;
      
        cursor: pointer;
      
        color: inherit;
      }
      
      dfn {
        margin-left: calc((100vw - 960px) / 2);
        padding: 0 var(--sc-size-sm);
      
        color: var(--sc-paper-tooltip-color);
        background-color: var(--sc-primary-color-light);
      }
      
      main {
        justify-content: center;
      }
      
      article {
        overflow-x: hidden;
        overflow-y: auto;
      
        box-sizing: border-box;
        width: 960px;
        height: 120px;
        padding: 12px 16px 0;
        ;
      }
      
      dl {
        /*hack to get the padding-bottom working*/
        font-size: 16px;
      
        display: table;
      
        margin: 0 0 16px 0;
      }
      
      dt {
        display: inline-block;
      
        background-color: var(--sc-primary-color-light);
      }
      
      dd {
        margin: var(--sc-size-sm) 0 0 0;
      }
      
      dd a {
        font-weight: bold;
      
        text-decoration: underline;
      
        color: inherit;
      
        text-decoration-color: var(--sc-primary-color);
        ;
      }
      
      footer {
        box-sizing: border-box;
        height: 48px;
      
        border-top: 1px solid rgba(0, 0, 0, .12);
        background-color: var(--sc-tertiary-background-color);
      }
      
      footer div {
        position: relative;
      
        width: 50%;
      
        text-align: center;
        ;
      }
      
      #next {
        border-left: 1px solid var(--sc-border-color);
      }
      
      footer button {
        font-size: 2em;
      
        width: 100%;
        height: 100%;
        padding-bottom: 10px;
      
        cursor: pointer;
      
        color: var(--sc-disabled-text-color);
        border: none;
        outline: none;
        background: none;
      }
      
      #btnNext {
        border-left: 1px solid rgba(0, 0, 0, .14);
      }
      
      morph-ripple {
        --ripple-color: var(--sc-disabled-text-color);
      }
      
      @keyframes bottomSheetShow {
        from {
          bottom: -200px;
        }
      
        to {
          bottom: 0;
        }
      }
      
      @keyframes bottomSheetHide {
        from {
          bottom: 0;
        }
      
        to {
          bottom: -200px;
        }
      }
      
      morph-ripple {
        --ripple-color: var(--sc-primary-color);
      }
    `;
  }

  render() {
    return html`
      <div id="wrapper">
        <header>
          <dfn>${this.currentDefine}</dfn>
          <div>
            <details class="help-display">
              <summary>
                <svg aria-labelledby="help-display-svg-title" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><title id="help-display-svg-title">Help</title><path d="M0 0h24v24H0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
                <span class='bottom-sheet-icon-label'>Help</span>
              </summary>
              <div class="help-display-inner">
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
              </div>
            </details>
            <button id="btnClose" @click=${this.hide}>
              <svg aria-labelledby="close-display-svg-title" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><title id="close-display-svg-title">Close</title><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/></svg>
              <span class='bottom-sheet-icon-label'>Close</span>
            </button>
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
            <button accesskey="b" id="btnPrevious" @click=${this._previous}>
              <mwc-icon>${icons['arrow_left']}</mwc-icon>
              <morph-ripple></morph-ripple>
            </button>
          </div>
          <div>
            <button accesskey="n" id="btnNext" @click=${this._next}>
              <mwc-icon>${icons['arrow_right']}</mwc-icon>
              <morph-ripple></morph-ripple>
            </button>
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