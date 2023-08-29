import { LitElement, html, css } from 'lit';

import { LitLocalized } from './sc-localization-mixin';

export class SCBadge extends LitLocalized(LitElement) {
  static properties = {
    text: { type: String },
    color: { type: String },
    background: { type: String },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.text = '';
    this.color = 'primary';
    this.background = '';
  }

  static styles = css`
    :host {
      padding: 0.25em 0.75em;
      font-size: var(--sc-font-size-xxs);
      font-weight: 550;
      font-stretch: condensed;
      line-height: 1;
      color: #fff;
      white-space: nowrap;
      border-radius: 0.6rem;
    }

    :host([color='primary']) {
      background-color: var(--sc-primary-color);
    }

    :host([color='secondary']) {
      background-color: var(--sc-primary-accent-color);
    }

    :host([color='success']) {
      background-color: var(--sc-toast-success-color);
    }

    :host([color='danger']) {
      background-color: var(--sc-toast-error-color);
    }

    :host([color='warning']) {
      background-color: var(--sc-primary-color-dark);
    }

    :host([color='info']) {
      background-color: #17a2b8;
    }

    :host([color='light']) {
      background-color: #f8f9fa;
      color: #343a40;
    }

    :host([color='dark']) {
      background-color: #343a40;
    }

    :host([color='gray']) {
      color: var(--sc-on-primary-secondary-text-color);
      border: 1px solid var(--sc-border-color);
    }

    :host([text='aligned']):before {
      content: '✓ ';
      color: var(--sc-primary-accent-color);
    }

    :host([text='annotated']):before {
      content: '✓ ';
      color: var(--sc-primary-accent-color);
    }
  `;

  render() {
    const localizeString = `badge:${this.text.toLowerCase()}`;
    return html` ${this.localize(localizeString)} `;
  }
}

customElements.define('sc-badge', SCBadge);
