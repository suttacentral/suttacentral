import { LitElement, html } from 'lit';
import '../addons/sc-snackbar';

export class SCToasts extends LitElement {
  render() {
    return html` <sc-snackbar id="info_toast" class="toast"></sc-snackbar> `;
  }

  firstUpdated() {
    this.parentNode.addEventListener('show-sc-toast', e => {
      this._displayToast(e);
    });
  }

  _displayToast(e) {
    const toast = this._getToast();
    toast.labelText = e.detail.message;
    toast.timeoutMs = e.detail.duration || 3000;
    requestAnimationFrame(() => {
      toast.show();
    });
  }

  _getToast() {
    return this.shadowRoot.getElementById('info_toast');
  }
}

customElements.define('sc-toasts', SCToasts);
