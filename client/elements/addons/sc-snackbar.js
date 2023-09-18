import { html, css, LitElement } from 'lit';

class SCSnackbar extends LitElement {
  static styles = css`
    div {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
      background-color: var(--sc-opposite-background-color);
      color: var(--sc-opposite-text-color);
      padding: 10px 20px;
      border-radius: 4px;
      box-shadow: 0 0 0.25rem 0.25rem rgba(0, 0, 0, 0.48);
      z-index: 9999;
      text-align: left;
      font-family: var(--sc-serif-font);
    }

    span {
      white-space: nowrap;
      width: auto;
      display: inline-block;
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
    return this.visible ? html`<div><span>${this.labelText}</span></div>` : html``;
  }
}

customElements.define('sc-snackbar', SCSnackbar);
