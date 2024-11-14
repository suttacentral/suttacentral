import { LitElement } from 'lit';
import { LitLocalized } from '../addons/sc-localization-mixin';

export class SCTextCommon extends LitLocalized(LitElement) {
  static properties = {
    inputElement: { type: Object },
    showParagraphs: { type: Boolean },
    chosenTextView: { type: String },
    lang: { type: String },
  };

  constructor() {
    super();
    this.inputElement = {};
    this.showParagraphs = false;
    this.chosenTextView = '';
    this.lang = '';
  }

  handleTextSelection(event) {
    const selectedText = window.getSelection().toString().trim();
    const contextMenu = this.querySelector('#context-menu');
    const scTextContextMenu = this.querySelector('sc-text-context-menu');
    console.log('selectedTextA', selectedText);
    if (selectedText) {
      scTextContextMenu.keyword = selectedText;
      const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
      console.log('range', range);
      const top = range.top + window.scrollY;
      const left = range.left + window.scrollX;

      contextMenu.style.top = `${top + range.height}px`;
      contextMenu.style.left = `${left}px`;
      contextMenu.style.display = 'block';
    } else {
      contextMenu.style.display = 'none';
    }

    setTimeout(() => {
      if (!window.getSelection().toString().trim()) {
        contextMenu.style.display = 'none';
      }
    }, 100);
  }
}
