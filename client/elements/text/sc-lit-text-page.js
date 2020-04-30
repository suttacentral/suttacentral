import {LitElement, html} from 'lit-element';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import { LitLocalized } from '../addons/localization-mixin';

export class SCLitTextPage extends LitLocalized(LitElement) {
  static get properties() {
    return {
      inputElement: { type: Object },
      showParagraphs: { type: Boolean },
      chosenTextView: { type: String },
      lang: { type: String }
    }
  }

  constructor() {
    super();
    this.inputElement = {};
    this.showParagraphs = false;
    this.chosenTextView = '';
    this.lang = '';
  }

}
