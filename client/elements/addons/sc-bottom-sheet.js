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
        bottom: 0px;
        background-color: white;
      }

      body, main, article {
        display: flex;
      }

      body, article {
        flex-direction: column;
      }

      main article {
        width: 100%;
        padding-left: 0.5em;
        padding-right: 0.5em;
      }

      footer {
        display: inline-flex;
        width: 100%;
      }

      footer div {
        width: 50%;
        text-align: center;
      }

      #next {
        border-left: 1px solid rgba(0, 0, 0, 0.12);
      }

      dfn {
        border: 1px dotted;
        font-size: 24px;
        font-weight: bold;
        color: #b48c3d;
      }

      header {
        /* border-top: 1px solid var(--sc-border-color); */
        /* margin-top: var(--sc-size-md);
        padding-top: var(--sc-size-sm); */
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        padding-left: 0.5em;
        padding-right: 0em;
        display: flex;
        justify-content: space-between;
        /* padding-bottom: 1em; */
      }

      header button {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
      }

      #btnClose {
        font-size: 2em;
        border-left: 1px solid rgba(0, 0, 0, 0.12);
        cursor: pointer;
      }

      header a {
        text-decoration: none;
        cursor: pointer;
      }

      header h3 {
        margin-bottom: 0;
        padding-bottom: 0;
      }

      #wrapper {
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 2px;
        box-shadow: 1px 1px .5px .5px rgba(0, 0, 0, 0.14);
        animation: bottomSheetEject 0.5s 1 ease-in;
      }

      footer {
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        height: 3em;
      }

      footer div {
        position: relative;
      }

      #title {
        color: #3f8b43;
      }

      #subTitle {
        color: gray;
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
      }

      #btnNext {
        border-left: 1px solid rgba(0, 0, 0, 0.14);
      }

      @keyframes bottomSheetEject {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      .fadeIn {
        animation: fadeIn 0.5s;
      }

      .fadeOut {
        animation: fadeOut 0.5s;
      }
    `;
  }

  render() {
    return html`
      <div id="wrapper">
        <header>
          <div>
            <h3><a id="title" href="${this.defineURL}">New Concise Pali English Dictionary</a></h3>
            <a id="subTitle" href="${this.defineURL}">more dictionaries&#187;</a>
          </div>
          <div>
            <button id="btnClose" @click=${this.hide}>&#8675;</button>
          </div>
        </header>
        <main>
          <article>
            <p><dfn>${this.currentDefine}</dfn><br/>
              ${unsafeHTML(this.currentDefineDetail)}
            </p>
          </article>
        </main>
        <footer>
          <div>
            <paper-ripple></paper-ripple>
            <button id="btnPrevious" @click=${this._previous}>&#8592;</button>
          </div>
          <div>
            <paper-ripple></paper-ripple>
            <button id="btnNext" @click=${this._next}>&#8594;</button> 
          </div>
        </footer>
      </div>
    `;
  }

  hide() {
    //this.shadowRoot.querySelector('#wrapper').classList.add('fadeOut');
    this.style.display = 'none';
  }

  show() {
    //this.shadowRoot.querySelector('#wrapper').classList.add('fadeIn');
    this.style.display = 'block';
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