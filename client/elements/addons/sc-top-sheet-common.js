import { LitElement, css } from 'lit-element';
import { LitLocalized } from './sc-localization-mixin';

export default class SCTopSheetCommon extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        position: absolute;
        z-index: 100;

        display: none;
        overflow-y: auto;

        width: 100%;
        max-height: 65vh;

        color: var(--sc-primary-text-color);
        border-bottom: 1px solid var(--sc-border-color);
        background-color: var(--sc-secondary-background-color);
        box-shadow: var(--sc-shadow-elevation-4dp);

        --sc-suttaplex-shadow: var(--sc-shadow-elevation-0dp);

        --sc-suttaplex-padding: 0;
      }

      section {
        max-width: 720px;
        margin: var(--sc-size-lg) auto;
        padding: 0 3vw;
      }
    `;
  }

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
  }

  toggle() {
    if (this.style.display === 'block') {
      this.style.display = 'none';
    } else {
      this.style.display = 'block';
    }
  }
}
