/* eslint-disable import/prefer-default-export */
import { LitElement, html, css } from 'lit';

export class SCPieChart extends LitElement {
  static properties = {
    percent: { type: Number },
  };

  static styles = css`
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
  `;

  constructor() {
    super();
    this._percent = 0;
  }

  set percent(val) {
    let percent = val;
    if (val < 0) {
      percent = 0;
    }
    if (val > 100) {
      percent = 100;
    }
    this._percent = percent;
  }

  get percent() {
    return this._percent;
  }

  render() {
    const radius = 80;
    const len = 2 * Math.PI * radius;
    const progress = ((100 - this.percent) / 100) * len;

    return html`
      <svg viewBox="0 0 220 220">
        <circle
          r=${radius}
          cx="110"
          cy="110"
          stroke="var(--sc-pie-chart-bg-color)"
          stroke-dasharray=${len}
        />
        <circle
          r=${radius}
          cx="110"
          cy="110"
          transform="rotate(-90 110 110)"
          stroke="var(--sc-pie-chart-fill-color)"
          stroke-dasharray=${len}
          stroke-dashoffset=${progress}
        />
        <text x="110" y="110">${this.percent.toFixed(1)}%</text>
      </svg>
    `;
  }
}

customElements.define('sc-pie-chart', SCPieChart);
