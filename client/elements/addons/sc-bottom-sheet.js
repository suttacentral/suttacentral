import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

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
      @media print {
        :host {
          display: none;
        }
      }

      :host {
        /* display: block; */
        z-index: 9999;
        position: sticky;
        display: none;
        background-color: var(--sc-secondary-background-color);
        bottom: 0px;
        animation: bottomSheetShow 200ms 1 ease-in normal forwards;
    }
    #wrapper {
        box-shadow: 1px 1px .5px .5px rgba(0, 0, 0, 0.14);
        font-family: "skolar sans pe";
        height: 200px
    }
    body,
    main,
    article,
    header,
    footer {
        display: flex;
    }


    header {
        padding: 0px var(--sc-size-md);
        justify-content: space-between;
        align-items: center;
        background-color: var(--sc-secondary-text-color);
        color: var(--sc-primary-background-color);
        height: 32px;
        position: relative
    }
    header div {
        display: flex;
        flex-direction: row;
    }

    details {
        padding: 4px;
        background-color: var(--sc-secondary-text-color);
        color: var(--sc-primary-background-color);
        font-size: 14px;
        z-index: 1;
    }
    details ul {
        margin-right: 1em
    }
    details a {
        color: inherit;
        text-decoration: underline;
        text-decoration-color: var(--sc-primary-color);
        text-decoration-skip-ink: auto;
    }

    details[open] {
        position: absolute;
        top: -300px;
        width: 80vw;
        right: 10vw
    }
    summary {
        white-space: nowrap;
    }
    header button {
        width: 100%;

        background: none;
        border: none;
    }

    #btnClose {
        cursor: pointer;
        color: inherit;
    }



    dfn {
        background-color: var(--sc-primary-color-light);
        color: var(--sc-primary-text-color);
        padding: 0 var(--sc-size-sm);
        margin-left: calc((100vw - 960px) / 2);
    }

    main {
        justify-content: center;
    }

    article {
        height: 120px;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 16px 16px 0;
        box-sizing: border-box;
        width: 960px
    }


    dl {
        margin: 0 0 16px 0;
        display: table;
        /*hack to get the padding-bottom working*/
        font-size: 16px;
    }
    dt {
        display: inline-block;
        background-color: var(--sc-primary-color-light);
    }
    dd {
        margin: var(--sc-size-sm) 0 0 0
    }
    dd a {
        color: inherit;
        text-decoration: underline;
        text-decoration-color: var(--sc-primary-color);
        text-decoration-skip-ink: auto;
        font-weight: bold
    }
    footer {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        height: 48px;
        background-color: var(--sc-secondary-background-color);
        box-sizing: border-box;
    }

    footer div {
        width: 50%;
        text-align: center;
    }

    #next {
        border-left: 1px solid var(--sc-border-color);
    }
    footer div button {
        font-size: 2em;
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        cursor: pointer;
        /* vertical-align: top; */
        padding-bottom: 10px;
        color: var(--sc-disabled-text-color)
    }

    #btnNext {
        border-left: 1px solid rgba(0, 0, 0, 0.14);
    }

    @keyframes bottomSheetShow {
        from {
            bottom: -200px;
        }
        to {
            bottom: 0px;
        }
    }

    @keyframes bottomSheetHide {
        from {
            bottom: 0px;
        }
        to {
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
            <button id="btnClose" @click=${this.hide}>&#8675;</button>
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
            <paper-ripple></paper-ripple>
            <button accesskey="b" id="btnPrevious" @click=${this._previous}>&#8592;</button>
        </div>
        <div>
            <paper-ripple></paper-ripple>
            <button accesskey="n" id="btnNext" @click=${this._next}>&#8594;</button>
        </div>
    </footer>
</div>
    `;
  }

  hide() {
    //this.shadowRoot.querySelector('#wrapper').classList.add('fadeOut');
    this.style.animation = 'bottomSheetHide 200ms 1 ease-in normal forwards';
  }
  show() {
    //this.shadowRoot.querySelector('#wrapper').classList.add('bottomSheetHide');
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