import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class SCBadge extends PolymerElement {
  static get template() {
    return html`
    <style>
      .badge {
        position: relative;
        background-color: var(--sc-primary-accent-color);;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        top: -3px;
        left: 25px
      }

      .badge-number {
        @apply --sc-skolar-font-size-xs;
        text-align: center;
        color: var(--sc-tertiary-text-color);
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    </style>

    <div class="badge">
      <div class="badge-number">[[number]]</div>
    </div>`;
  }

  static get is() {
      return ;
  }

  static get properties() {
    return {
      number: {
        type: Number
      }
    }
  }
}

customElements.define('sc-badge', SCBadge);
