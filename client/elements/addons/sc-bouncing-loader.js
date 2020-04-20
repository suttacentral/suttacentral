import { LitElement, html, css } from 'lit-element';

class SCBouncingLoader extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      @keyframes bouncing-loader {
        to {
          opacity: 0.1;
          transform: translate3d(0, -1rem, 0);
        }
      }

      .bouncing-loader {
        display: flex;
        justify-content: center;
      }

      .bouncing-loader > div {
        width: 1rem;
        height: 1rem;
        margin: 3rem 0.2rem;
        background: var(--sc-primary-color);
        border-radius: 50%;
        animation: bouncing-loader 0.6s infinite alternate;
      }

      .bouncing-loader > div:nth-child(2) {
        animation-delay: 0.2s;
      }

      .bouncing-loader > div:nth-child(3) {
        animation-delay: 0.4s;
      }
    `;
  }

  static get properties() {
    return {
      active: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.active = true;
  }

  render() {
    return this.active ? html`
      <div class="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    ` : ''
  }
}

customElements.define('sc-bouncing-loader', SCBouncingLoader);