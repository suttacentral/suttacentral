import '@polymer/iron-collapse/iron-collapse.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

class SCCollapsible extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      
      .summary {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      i {
        box-sizing: border-box;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-style: solid;
        border-width: 5px 0 5px 10px;
        border-color: transparent transparent transparent var(--sc-secondary-text-color);
        transition: transform 0.3s ease;
        margin-right: var(--sc-size-xs);
      }
      
      i.opened {
        transform: rotate(90deg);
      }
      
      .summary slot {
        display: inline-block;
      }
    </style>

    <div>
      <div class="summary" on-tap="toggleVisibility">
        <i class$="[[getIconClass(opened)]]"></i>
        <slot name="summary"/>
      </div>

      <iron-collapse class="description" opened="[[opened]]">
        <slot/>
      </iron-collapse>
    </div>`;
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        notify: true,
      },
    }
  }

  toggleVisibility() {
    this.opened = !this.opened;
    this._updateIronLists();
  }

  getIconClass(opened) {
    return opened ? 'opened' : '';
  }

  _updateIronLists() {
    const interval = setInterval(() => {
      this.dispatchEvent(new CustomEvent('iron-resize', { composed: true, bubbles: true }))
    }, 20);
    setTimeout(() => clearInterval(interval), 300);
  }
}

customElements.define('sc-collapsible', SCCollapsible);
