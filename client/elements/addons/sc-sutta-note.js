import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

/*
Basic note for each sutta if they exist with a paper-tooltip.
Used in the Suttaplex.
*/

class SCSuttaNote extends PolymerElement {
  static get template() {
    return html`
    <style>
      .note {
        cursor: help;
      }

      .icon-outline {
        --iron-icon-height: 20px;
        --iron-icon-width: 20px;
      }

      .tooltip {
        --paper-tooltip-opacity: 0.98;
        --paper-tooltip-background: var(--sc-paper-tooltip-color);
        --paper-tooltip-text-color: var(--sc-paper-tooltip-text-color);
        --paper-tooltip: {
          @apply --shadow-elevation-6dp;
          @apply --sc-skolar-font-size-xs;
          line-height: var(--sc-size-md);
          padding: 8px var(--sc-size-md);
          text-shadow: 0 0 #ffffff;
          white-space: normal;
        };
      }
    </style>

    <span class="note">
      <iron-icon class="icon-outline" icon="info-outline" id="note1"></iron-icon>
      <paper-tooltip class="tooltip" for="note1" fit-to-visible-bounds=""><span inner-h-t-m-l="[[noteData]]"></span></paper-tooltip>
    </span>`;
  }

  static get properties(){
    return {
      noteData: {
        type: String
      }
    }
  }
}

customElements.define('sc-sutta-note', SCSuttaNote);
