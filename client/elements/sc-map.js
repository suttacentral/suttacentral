/* eslint-disable import/prefer-default-export */
import { LitElement, html, css } from 'lit';

import { LitLocalized } from './addons/sc-localization-mixin';

export class SCMap extends LitLocalized(LitElement) {
  static get properties() {
    return {
      zoom: Number,
      longitude: Number,
      latitude: Number,
    };
  }

  constructor() {
    super();
    this.zoom = 13;
    this.longitude = 0;
    this.latitude = 0;

    this.mapID = 'z1fKgOqM_IYc.k-W6AbJIxLu8';
  }

  static get styles() {
    return css`
      .google-maps {
        height: 480px;
        margin: var(--sc-size-md) 0;
      }

      .google-maps iframe {
        width: 100%;
        height: 480px;

        border: none;
      }
    `;
  }

  render() {
    return html`
      <div class="google-maps">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=${this.mapID}&ll=${this.latitude},${this
            .longitude}&z=${this.zoom}"
        ></iframe>
      </div>
    `;
  }
}

customElements.define('sc-map', SCMap);
