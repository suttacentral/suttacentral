import { LitElement, html } from 'lit-element';
import { LitLocalized } from '../addons/sc-localization-mixin';

export class SCTextCommon extends LitLocalized(LitElement) {
  static get properties() {
    return {
      inputElement: { type: Object },
      showParagraphs: { type: Boolean },
      chosenTextView: { type: String },
      lang: { type: String },
    };
  }

  constructor() {
    super();
    this.inputElement = {};
    this.showParagraphs = false;
    this.chosenTextView = '';
    this.lang = '';
  }
}
