import { LitElement, html, css } from 'lit';
import 'leaflet';
import 'leaflet-fullscreen';

import { LitLocalized } from './addons/sc-localization-mixin';
import { icon } from '../img/sc-icon';

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

    this.markerScale = 3;

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

    this.map.setView([this.latitude, this.longitude], this.zoom);

    this.map.addLayer(
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
    );

    // Alternative layers:
    // https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}

    let layersControl = L.control.layers();

    this._fetchData().then(data =>
      this._getLayerNames(data).map(layerName => {
        let layer = this._getLayer(data, layerName);
        this.map.addLayer(layer);
        layersControl.addOverlay(layer, layerName);
        this.map.on('zoomend', () => {
          layer.eachLayer(l => {
            if (l._icon) {
              let icon = l.options.icon;
              icon.options = Object.assign(icon.options, this._getIconZoom(this.map.getZoom()));
              l.setIcon(icon);
            }
          });
        });
      })
    );

    this.map.addControl(layersControl);
    this.map.addControl(new L.Control.Fullscreen());
  }

  async _fetchData() {
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

  _getLayerNames(data) {
    return Array.from(new Set(data.features.map(feature => feature.properties.layer)));
  }

  _getLayer(data, layerName) {
    return L.geoJSON(data, {
      filter: (feature, layer) => feature.properties.layer == layerName,
      style: feature => feature.properties.style,
      onEachFeature: (feature, layer) => {
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
          .on('mouseout', event => {
            this.map.closePopup();
          })
          .on('click', event => {
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
                className: '',
              },
              this._getIconZoom(this.zoom)
            )
          ),
        }),
    });
  }

  _getIconZoom(zoom) {
    let newIconSize = zoom * this.markerScale;
    return {
      iconSize: [newIconSize, newIconSize],
      iconAnchor: [newIconSize / 2, newIconSize / 2],
    };
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
