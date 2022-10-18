import { LitElement, html, css } from 'lit';
import 'leaflet';

import { LitLocalized } from './addons/sc-localization-mixin';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});

L.Marker.prototype.options.icon = DefaultIcon;

export class SCMap extends LitLocalized(LitElement) {
  static properties = {
    zoom: { type: Number },
    longitude: { type: Number },
    latitude: { type: Number },
  };

  constructor() {
    super();

    this.zoom = 13;
    this.longitude = 0;
    this.latitude = 0;

    this.mapElementID = 'map';
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: var(--sc-size-md) 0;
      }

      #map {
        height: 480px;
        z-index: 0;
      }
    `;
  }

  firstUpdated() {
    let map = L.map(this.shadowRoot.getElementById(this.mapElementID));

    map.setView([this.latitude, this.longitude], this.zoom);

    map.addLayer(L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png'));

    fetch('../files/map-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`'Map data fetch response is not ok: status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: L.icon({ iconUrl: feature.properties.icon }) });
          },
        }).addTo(map);
      })
      .catch(error => {
        console.error('Map data fetch error:', error);
      });
  }

  render() {
    // TODO: how to link/import css properly?
    return html`
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
      <div id="${this.mapElementID}"></div>
    `;
  }
}

customElements.define('sc-map', SCMap);
