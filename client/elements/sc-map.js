import { LitElement, html, css, unsafeCSS, render } from 'lit';
import 'leaflet';
import leafletStyles from 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen';
import leafletFullscreenStyles from 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

import { LitLocalized } from './addons/sc-localization-mixin';
import { dispatchCustomEvent } from '../utils/customEvent';
import mapData from '../utils/mapData';
import { icon } from '../img/sc-icon';

L.Control.StaticMapButton = L.Control.extend({
  options: {
    title: undefined,
    position: 'topright',
  },
  onAdd: function () {
    let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control static-map-button');

    this.link = L.DomUtil.create('a', 'leaflet-bar-part static-map-button-link', container);
    this.link.href = '#';
    this.link.setAttribute('role', 'button');
    this.link.title = this.options.title;

    this.icon = L.DomUtil.create('span', 'static-map-button-icon', this.link);
    render(icon.map, this.icon);

    L.DomEvent.on(
      this.link,
      'click',
      e =>
        dispatchCustomEvent(e.target, 'sc-navigate', {
          pathname: `/map`,
        }),
      this
    );

    return container;
  },
});

export class SCMap extends LitLocalized(LitElement) {
  static properties = {
    view: { type: String },
    longitude: { type: Number },
    latitude: { type: Number },
    zoom: { type: Number },
    hideStaticMapButton: { type: Boolean, attribute: 'hide-static-map-button' },
  };

  constructor() {
    super();

    this.zoom = 13;
    this.hideStaticMapButton = false;
    this.markerScale = 3;

    this.mapElementID = 'map';
    this.idToLayer = {};

    this.localizedStringsPath = '/localization/elements/map';
  }

  static styles = [
    css`
      :host {
        display: block;
        margin: var(--sc-size-md) 0;
      }

      #map {
        height: 480px;
        z-index: 0;
      }

      #map.leaflet-pseudo-fullscreen {
        z-index: 1000 !important;
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

      .static-map-button {
        width: 44px;
        height: 44px;
      }

      .static-map-button-link {
        width: 44px !important;
        height: 44px !important;
      }

      .static-map-button svg {
        width: 28px;
        height: 28px;
        margin: 8px;
        filter: invert() brightness(50%);
      }

      .static-map-button:hover svg {
        filter: none;
      }
    `,
  ];

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

    this.map.addControl(
      new L.Control.Fullscreen({
        pseudoFullscreen: true,
        title: {
          false: this.localize('map:1'),
          true: this.localize('map:2'),
        },
      })
    );

    if (!this.hideStaticMapButton) {
      this.map.addControl(new L.Control.StaticMapButton({ title: this.localize('map:3') }));
    }

    mapData.then(({ geoJSON, layerNames }) => {
      this.map.addControl(
        L.control.layers(
          [],
          Object.fromEntries(
            layerNames.map(layerName => [
              layerName,
              this._buildLayer(geoJSON, layerName).addTo(this.map),
            ])
          )
        )
      );

      this._setView();
      this._makeIconsZoom();
    });

    this.getRootNode().addEventListener('keydown', e => this._keydownHandler(e));
  }

  _keydownHandler(e) {
    if (e.code === 'Escape' && this.map.isFullscreen()) {
      this.map.toggleFullscreen({ pseudoFullscreen: true });
    }
  }

  _buildLayer(geoJSON, layerName) {
    return L.geoJSON(geoJSON, {
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
              dispatchCustomEvent(this, 'sc-navigate', {
                pathname: `/define/${feature.properties.define}`,
              });
          });
      },
      pointToLayer: (feature, latlng) =>
        L.marker(latlng, {
          alt: feature.properties.name,
          icon: L.divIcon(
            Object.assign(
              {
                html: icon.marker[feature.properties.icon].strings, // hack to get string from html template result https://lit.dev/docs/api/templates/#html
                className: this.view == feature.properties.id ? 'marker-active' : '',
              },
              this._getIconZoom(this.zoom)
            )
          ),
          riseOnHover: true,
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
    this.map.fire('zoomend');
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
      this.map.fitBounds(L.featureGroup(Object.values(this.idToLayer)).getBounds());
    }
  }

  render() {
    return html`
      <style>
        ${leafletStyles}
        ${leafletFullscreenStyles}
      </style>
      <div id=${this.mapElementID}></div>
    `;
  }
}

customElements.define('sc-map', SCMap);
