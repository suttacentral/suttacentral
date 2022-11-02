import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { SCStaticPage } from '../addons/sc-static-page';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import '../sc-map';
import { icon } from '../../img/sc-icon';

// TODO: page seems to display wrong breadcrumbs when viewed

export class SCStaticMap extends SCStaticPage {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/map';
    this.features = [];
    this._fetchData().then(
      data => (this.features = this._sortObjectsByStringKey(data.features, o => o.properties.name))
    );
  }

  // TODO: Using `static styles` instead of <style> causes all these styles to break?
  // static styles = [
  //   unsafeCSS(layoutSimpleStyles),
  //   unsafeCSS(typographyCommonStyles),
  //   unsafeCSS(typographyStaticStyles),
  //   css`
  //     .map {
  //       min-width: 720px;
  //     }
  //   `,
  // ];

  // TODO: share this with sc-map.js
  async _fetchData() {
    return fetch('../../files/map-data.json')
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

  _sortObjectsByStringKey(objectList, keyFn) {
    return objectList.sort((a, b) => keyFn(a).localeCompare(keyFn(b)));
  }

  _geometryTypeList(geometryType, labelFn) {
    let listItems = this.features
      .filter(feature => feature.geometry.type == geometryType)
      .map(feature => html`<li>${labelFn(feature)}</li>`);
    return html`<ul>
      ${listItems}
    </ul>`;
  }

  _pointLabelFn(feature) {
    return html`<span class="marker">${icon.marker[feature.properties.icon]}</span>
      <a href="/define/${feature.properties.id}">${feature.properties.name}</a>`;
  }

  _polygonLabelFn(feature) {
    return html`<a href="/define/${feature.properties.id}">${feature.properties.name}</a>`;
  }

  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
        /* comment to prevent ugly autoformatting. TODO: other solution? */

        #map {
          min-width: 720px; /* is there a better solutions for making map fill the main/article width set by layoutSimpleStyles? */
        }

        .columns {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
        }

        .column {
          display: flex;
          flex-direction: column;
          flex-basis: 100%;
          flex: 1;
        }

        .feature-list {
          list-style: none;
        }

        .feature-list li {
          padding: 0;
          margin: 0;
        }

        .marker {
          vertical-align: middle;
        }

        .marker svg {
          max-height: 1em; /* is this the correct way? */
        }
      </style>
      <main>
        <article>
          <h1>SuttaCentral Map</h1>
          <sc-map id="map"></sc-map>
          <div class="columns">
            <div class="column">
              <h2>${unsafeHTML(this.localize('map:1'))}</h2>
              ${this._geometryTypeList('Point', this._pointLabelFn)}
            </div>
            <div class="column">
              <h2>${unsafeHTML(this.localize('map:2'))}</h2>
              ${this._geometryTypeList('Polygon', this._polygonLabelFn)}
            </div>
          </div>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-map', SCStaticMap);
