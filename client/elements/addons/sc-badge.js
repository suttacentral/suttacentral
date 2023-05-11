import { LitElement, html, css } from 'lit';

export class SCBadge extends LitElement {
  static properties = {
    text: { type: String },
    color: { type: String },
    background: { type: String },
  };

  static styles = css`
    :host {
      display: inline-block;
      padding: 0.25em 0.4em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.25rem;
      margin-left: 0.2em;
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
      background-color: rgb(159, 158, 157);
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
