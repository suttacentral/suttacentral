import { LitElement, html, css } from 'lit';

export class SCLinearProgress extends LitElement {
  static styles = css`
    .linear-progress,
    .linear-progress:before {
      width: 100%;
      margin: -2px 0 0 0;
    }

    .linear-progress {
      display: flex;
    }

    .linear-progress:before {
      height: 4px;

      content: '';
      animation: running-progress 2s cubic-bezier(0.8, 0.6, 0.8, 0.9) infinite;

      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        var(--sc-primary-color-light),
        rgba(0, 0, 0, 0)
      );
    }

    @keyframes running-progress {
      0% {
        margin-right: 100%;
        margin-left: 0;
      }

      50% {
        margin-right: 0;
        margin-left: 25%;
      }

      100% {
        margin-right: 0;
        margin-left: 100%;
      }
    }
  `;

  static properties = {
    active: { type: Boolean },
  };

  constructor() {
    super();
    this.active = true;
  }

  render() {
    return this.active ? html` <div class="linear-progress"></div> ` : '';
  }
}

customElements.define('sc-linear-progress', SCLinearProgress);
