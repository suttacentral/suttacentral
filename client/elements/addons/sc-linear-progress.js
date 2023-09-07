import { LitElement, html, css } from 'lit';
import '@material/web/progress/linear-progress';

export class SCLinearProgress extends LitElement {
  static styles = css`
    md-linear-progress {
      --md-linear-progress-active-indicator-color: var(--sc-primary-color-light);
      width: 100%;
    }
  `;

  static properties = {
    active: { type: Boolean },
  };

  constructor() {
    super();
    this.active = false;
  }

  render() {
    return this.active ? html` <md-linear-progress indeterminate></md-linear-progress> ` : '';
  }
}

customElements.define('sc-linear-progress', SCLinearProgress);
