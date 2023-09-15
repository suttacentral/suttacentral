import { html, css, LitElement } from 'lit';

class SCSnackbar extends LitElement {
  static styles = css`
    div {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
      background-color: var(--sc-on-primary-primary-text-color);
      color: var(--sc-inverted-text-color);
      padding: 10px 20px;
      border-radius: 4px;
      z-index: 9999;
      width: 400px;
      text-align: center;
      font-family: var(--sc-serif-font);
    }
  `;

  static properties = {
    labelText: { type: String },
    visible: { type: Boolean },
    timeoutMs: { type: Number },
  };

  constructor() {
    super();
    this.labelText = '';
    this.visible = false;
    this.timeoutMs = 3000;
  }

  updated(changedProperties) {
    if (changedProperties.has('visible') && this.visible) {
      setTimeout(() => {
        this.visible = false;
        this.requestUpdate();
      }, this.timeoutMs);
    }
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  render() {
    return this.visible ? html`<div>${this.labelText}</div>` : html``;
  }
}

customElements.define('sc-snackbar', SCSnackbar);
