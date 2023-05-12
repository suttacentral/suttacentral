import { LitElement, html, css } from 'lit';

export class SCBadge extends LitElement {
  static properties = {
    text: { type: String },
    color: { type: String },
    background: { type: String },
  };

  static styles = css`
    :host {
      padding: 0.25em 0.75em;
      font-size: var(--sc-skolar-font-size-xxs);
      font-weight: 550;
      font-stretch: condensed;
      line-height: 1;
      color: #fff;
      white-space: nowrap;
      border-radius: 0.6rem;
    }

    :host([color='primary']) {
      background-color: #007bff;
    }

    :host([color='secondary']) {
      background-color: #6c757d;
    }

    :host([color='success']) {
      background-color: #28a745;
    }

    :host([color='danger']) {
      background-color: #dc3545;
    }

    :host([color='warning']) {
      background-color: #ffc107;
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
     color: var(--sc-secondary-text-color);
    border: 1px solid var(--sc-border-color)
    }

        :host([color='gray']):before {
        content: "✓ ";
        color: var(--sc-primary-accent-color);
    }

  `;

  constructor() {
    super();
    this.text = '';
    this.color = 'primary';
    this.background = '';
  }

  render() {
    return html` ${this.text} `;
  }
}

customElements.define('sc-badge', SCBadge);
