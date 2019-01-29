import { html, LitElement } from '@polymer/lit-element';

class SCYellowBrick extends LitElement {
  static get properties() {
    return {
      _clicked: Boolean,
      hasRoad: Boolean,
    }
  }

  shouldUpdate(props) {
    if (props.has('hasRoad') || props.has('_clicked')) {
      this.className = this.class;
    }

    return super.shouldUpdate(props);
  }

  onClick() {
    this._clicked = true;
  }

  get class() {
    return this.hasRoad && !this._clicked ? 'yellow-brick' : '';
  }

  render() {
    return html`
      <style>
        .yellow-brick::before {
          content: '';
          margin-left: auto;
          width: 30px;
          height: 30px;
          background: var(--sc-primary-accent-color);
          border-radius: 20px;
 
          position: absolute;
          right: 5px;
          top: 1px;
          z-index: -1;
        }
      </style>
  
      <div class="${this.class}" @click="${this.onClick}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('sc-yellow-brick', SCYellowBrick);
