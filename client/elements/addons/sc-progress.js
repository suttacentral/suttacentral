import { LitElement, html, css } from 'lit';
import '@material/web/progress/linear-progress';
import '@material/web/progress/circular-progress';

export class SCProgress extends LitElement {
  static styles = css`
    :host {
      --md-circular-progress-size: 32px;
      --md-sys-color-primary: var(--sc-primary-accent-color);
      --md-linear-progress-active-indicator-color: var(--sc-primary-color-light);
    }

    md-linear-progress {
      width: 100%;
    }
  `;

  static properties = {
    active: { type: Boolean },
    type: { type: String },
  };

  constructor() {
    super();
    this.active = false;
    this.type = 'linear';
  }

  render() {
    return this.active
      ? html`
          ${this.type === 'linear'
            ? html`<md-linear-progress indeterminate></md-linear-progress>`
            : html`<md-circular-progress indeterminate></md-circular-progress>`}
        `
      : '';
  }
}

customElements.define('sc-progress', SCProgress);
