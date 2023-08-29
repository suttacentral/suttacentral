import { LitElement, html, css } from 'lit';
import { LitLocalized } from './sc-localization-mixin';
import { icon } from '../../img/sc-icon';

export class SCErrorIcon extends LitLocalized(LitElement) {
  static properties = {
    messages: { type: String },
    type: { type: String },
  };

  static styles = css`
    .error {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 2em;
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-xxxl);
      color: var(--sc-on-primary-secondary-text-color);
      text-align: center;
    }

    .icon {
      width: var(--sc-size-xxl);
      height: var(--sc-size-xxl);
    }
  `;

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';

    this.messages = {
      'no-network': {
        image: 'nonetwork',
        title: 'networkError',
        message: 'offline',
      },
      'general-error': {
        image: 'generalerror',
        title: 'generalError',
        message: 'generalError',
      },
      'page-no-found': {
        image: 'pagenotfound',
        title: 'pageNoFound',
        message: 'pageNoFound',
      },
      'data-load-error': {
        image: 'dataloaderror',
        title: 'dataLoadError',
        message: 'dataLoadError',
      },
      'connect-to-internet': {
        image: 'connecttointernet',
        title: 'connectToInternet',
        message: 'connectToInternet',
      },
      'translation-text-load-error': {
        image: 'dataloaderror',
        title: 'dataLoadError',
        message: 'translationDataLoadError',
      },
    };
  }

  render() {
    const { image, message } = this.messages[this.type];
    return html`
      <div class="error">
        ${icon[image]}
        <div>${this.localize(`interface:${message}`)}</div>
      </div>
    `;
  }
}

customElements.define('sc-error-icon', SCErrorIcon);
