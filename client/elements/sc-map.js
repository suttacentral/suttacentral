import { LitElement, html, css } from 'lit';
import 'leaflet';
import 'leaflet-fullscreen';

import { LitLocalized } from './addons/sc-localization-mixin';
import { icon } from '../img/sc-icon';

export class SCMap extends LitLocalized(LitElement) {
  static properties = {
    view: { type: String },
    longitude: { type: Number },
    latitude: { type: Number },
    zoom: { type: Number },
  };

  constructor() {
    super();

    this.zoom = 13;
    this.markerScale = 3;

    this.mapElementID = 'map';
    this.idToLayer = {};
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

      .marker-active svg path {
        stroke: #b30309;
        stroke-width: 6px;
        paint-order: stroke;
      }

      .moving-leaflet-popup {
        transition: false !important;
        pointer-events: none;
      }

      .moving-leaflet-popup .leaflet-popup-tip {
        pointer-events: none;
      }
    `;
  }

  firstUpdated() {
    this.map = L.map(this.shadowRoot.getElementById(this.mapElementID));

    this.map.addLayer(
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
    );

    // Alternative layers:
    // https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}

    this.map.addControl(new L.Control.Fullscreen());

    this._fetchData().then(data => {
      this.map.addControl(
        L.control.layers(
          [],
          Object.fromEntries(
            this._getLayerNames(data).map(layerName => [
              layerName,
              this._getLayer(data, layerName).addTo(this.map),
            ])
          )
        )
      );

      this._makeIconsZoom();
      this._setView();
    });
  }

  async _fetchData() {
    return fetch('../files/map-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Map data fetch response is not ok: status ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Map data fetch error:', error);
      });
  }

  _getLayerNames(data) {
    return Array.from(new Set(data.features.map(feature => feature.properties.layer)));
  }

  _getLayer(data, layerName) {
    return L.geoJSON(data, {
      filter: feature => feature.properties.layer == layerName,
      style: feature =>
        Object.assign(
          feature.properties.style,
          this.view == feature.properties.id ? { color: '#b30309', weight: '3' } : {}
        ),
      onEachFeature: (feature, layer) => {
        this.idToLayer[feature.properties.id] = layer;
        layer
          .on('mouseover mousemove', event => {
            this.map.openPopup(
              L.popup({
                autoPan: false,
                closeButton: false,
                closeOnEscapeKey: false,
                closeOnClick: false,
                className: 'moving-leaflet-popup',
              })
                .setLatLng(event.latlng)
                .setContent(feature.properties.name)
            );
          })
          .on('mouseout', () => {
            this.map.closePopup();
          })
          .on('click', () => {
            if (feature.properties.define)
              window.location.href = `/define/${feature.properties.define}`;
          });
      },
      pointToLayer: (feature, latlng) =>
        L.marker(latlng, {
          alt: feature.properties.name,
          icon: L.divIcon(
            Object.assign(
              {
                html: icon.marker[feature.properties.icon].strings, // TODO: I want to use .getHTML() here as documented, but it doesn't seem to exist https://lit.dev/docs/v1/api/lit-html/templates/#SVGTemplateResult
                className: this.view == feature.properties.id ? 'marker-active' : '',
              },
              this._getIconZoom(this.zoom)
            )
          ),
        }),
    });
  }

  _makeIconsZoom() {
    this.map.on('zoomend', () =>
      Object.values(this.idToLayer).map(layer => {
        if (layer._icon) {
          let icon = layer.options.icon;
          icon.options = Object.assign(icon.options, this._getIconZoom(this.map.getZoom()));
          layer.setIcon(icon);
        }
      })
    );
  }

  _getIconZoom(zoom) {
    let newIconSize = zoom * this.markerScale;
    return {
      iconSize: [newIconSize, newIconSize],
      iconAnchor: [newIconSize / 2, newIconSize / 2],
    };
  }

  _setView() {
    if (this.view) {
      if (this.idToLayer[this.view]) {
        let layer = this.idToLayer[this.view];
        if (layer.getBounds) {
          this.map.fitBounds(layer.getBounds());
        } else if (layer.getLatLng) {
          this.map.setView(layer.getLatLng(), this.zoom);
        }
      } else {
        console.error(`sc-map view option passed but no layer found with this id: ${this.view}`);
      }
    } else if (this.longitude !== undefined || this.latitude !== undefined) {
      if (this.longitude !== undefined && this.latitude !== undefined) {
        this.map.setView([this.latitude, this.longitude], this.zoom);
      } else {
        console.error(`sc-map: longitude or latitude is missing.`);
      }
    } else {
      this.map.fitBounds(L.featureGroup(layers).getBounds());
    }
  }

  render() {
    // TODO: how to link/import stylesheets properly?
    return html`
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css" />
      <div id="${this.mapElementID}"></div>
    `;
  }
}

customElements.define('sc-map', SCMap);
