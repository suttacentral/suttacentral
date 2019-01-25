import { LitElement, html } from '@polymer/lit-element';

export class SCPieChart extends LitElement {
  static get properties() {
    return {
      percent: { type: Number }
    };
  }

  constructor() {
    super();
    this._percent = 0;
  }

  set percent(val) {
    if (val < 0) { val = 0; }
    if (val > 100) { val = 100; }
    this._percent = val;
  }

  get percent() {
    return this._percent;
  }

  render() {
    const radius = 80;
    const len = 2 * Math.PI * radius;
    const progress = ((100 - this.percent) / 100) * len;

    return html`
      <style>
        :host {
          display: block;
        }

        circle {
          fill: none;
          stroke-width: 60px;
        }

        text {
          alignment-baseline: middle;
          text-anchor: middle;
          fill: var(--sc-primary-text-color);
        }
      </style>
      <svg viewBox="0 0 220 220">
        <circle
          r="${radius}"
          cx="110"
          cy="110"
          stroke="var(--sc-pie-chart-bg-color)"
          stroke-dasharray="${len}"
        />
        <circle
          r="${radius}"
          cx="110"
          cy="110"
          transform="rotate(-90 110 110)"
          stroke="var(--sc-pie-chart-fill-color)"
          stroke-dasharray="${len}"
          stroke-dashoffset="${progress}"
        />
        <text x="110" y="110">${this.percent.toFixed(1)}%</text>
      </svg>
    `;
  }
}

customElements.define('sc-pie-chart', SCPieChart);
