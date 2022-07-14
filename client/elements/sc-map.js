import { LitElement, html, css } from 'lit';
import 'leaflet';

import { LitLocalized } from './addons/sc-localization-mixin';
import { icon } from '../img/sc-icon';

class SCMapPopup extends LitLocalized(LitElement) {
  static get properties() {
    return {
      name: String,
      description: String,
    };
  }

  render() {
    return html`
      <h3>${this.name}</h3>
      ${this.description}
    `;
  }
}

customElements.define('sc-map-popup', SCMapPopup);

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

    map.addLayer(
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
    );

    // Alternative layers:
    // https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}

    let layersControl = L.control.layers();

    this.fetchData().then(data =>
      this.getLayerNames(data).map(layerName => {
        let layer = this.getLayer(data, layerName);
        map.addLayer(layer);
        layersControl.addOverlay(layer, layerName);
      })
    );

    layersControl.addTo(map);
  }

  async fetchData() {
    return fetch('../files/map-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`'Map data fetch response is not ok: status ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Map data fetch error:', error);
      });
  }

  getLayerNames(data) {
    return Array.from(new Set(data.features.map(feature => feature.properties.layer)));
  }

  getLayer(data, layerName) {
    return L.geoJSON(data, {
      filter: (feature, layer) => feature.properties.layer == layerName,
      style: feature => feature.properties.style,
      onEachFeature: (feature, layer) =>
        layer
          .bindTooltip(feature.properties.name)
          .bindPopup(`<h3>${feature.properties.name}</h3>${feature.properties.description}`),
      // TODO: I want to use lit element for the popup, but this breaks with complex content (like images)
      // .bindPopup(
      //   `<sc-map-popup name="${feature.properties.name}" description="${feature.properties.description}"></sc-map-popup>`
      // ),
      pointToLayer: (feature, latlng) =>
        L.marker(latlng, {
          alt: feature.properties.name,
          icon: L.divIcon({
            html: icon.marker[feature.properties.icon].strings, // TODO: I want to use .getHTML() here as documented, but it doesn't seem to exist https://lit.dev/docs/v1/api/lit-html/templates/#SVGTemplateResult
            className: '',
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          }),
        }),
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
