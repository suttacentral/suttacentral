import { LitElement, html, css } from 'lit-element';
import '@material/mwc-snackbar';

class SCToasts extends LitElement {
  static get properties() {
    return {
      defaultDuration: { type: Number },
      message: { type: String }
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: absolute;
        z-index: 9999;
        --mdc-typography-body2-font-size: calc(19px * var(--sc-skolar-font-scale));
      }

      .toast {
        text-align: center;
        margin-left: calc(50vw);
      }

      /* 841px: width at which the persistent sidebar appears*/
      @media screen and (min-width: 841px) {
        .toast {
          margin-left: calc(50vw + var(--app-drawer-width) / 2);
        }
      }

      .success-toast {
        --mdc-snackbar-fill-color: var(--sc-toast-success-color);
      }

      .error-toast {
        --mdc-snackbar-fill-color: var(--sc-toast-error-color);
      }
    `;
  }

  render() {
    return html`
      <mwc-snackbar id="error_toast" class="toast error-toast"></mwc-snackbar>
      <mwc-snackbar id="success_toast" class="toast success-toast"></mwc-snackbar>
      <mwc-snackbar id="info_toast" class="toast"><mwc-snackbar>
    `;
  }

  constructor() {
    super();
    this.defaultDuration = 4000;
  }

  firstUpdated() {
    this.parentNode.addEventListener('show-sc-toast', (e) => { this._displayToast(e); });
  }

  _displayToast(e) {
    let toast = this._getToast(e.detail.toastType);
    toast.labelText = e.detail.message;
    toast.timeoutMs = this.defaultDuration;
    requestAnimationFrame(() => {
      toast.open();
    });
  }

  _getToast(toastType) {
    let toastId = ['info', 'success', 'error'].includes(toastType) ? `${toastType}_toast` : 'info_toast';
    return this.shadowRoot.getElementById(toastId);
  }
}

customElements.define('sc-toasts', SCToasts);
