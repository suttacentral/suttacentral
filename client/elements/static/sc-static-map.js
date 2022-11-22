import { html, css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { SCStaticPage } from '../addons/sc-static-page';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import '../sc-map';
import mapData from '../../utils/mapData';
import { icon } from '../../img/sc-icon';

export class SCStaticMap extends SCStaticPage {
  static properties = {
    features: Array,
    layerNames: Array,
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static-map';

    this.features = [];
    this.layerNames = [];
    mapData.then(({ features, layerNames }) => {
      this.features = features;
      this.layerNames = layerNames;
    });
  }

  static styles = [
    unsafeCSS(layoutSimpleStyles),
    unsafeCSS(typographyCommonStyles),
    unsafeCSS(typographyStaticStyles),
    css`
      .columns {
        columns: 2;
      }

      .features-section {
        break-inside: avoid;
        display: inline-block;
      }

      .marker-item {
        list-style-image: var(--marker-icon);
      }
    `,
  ];

  _featuresList() {
    return this.layerNames.map(layerName => {
      let listItems = this._sortObjectsByStringKey(
        this.features.filter(feature => feature.properties.layer == layerName),
        feature => feature.properties.name
      ).map(this._featureItem);
      return html`<div class="features-section">
        <h3>${layerName}</h3>
        <ul>
          ${listItems}
        </ul>
      </div>`;
    });
  }

  _sortObjectsByStringKey(objectList, keyFn) {
    return objectList.sort((a, b) => keyFn(a).localeCompare(keyFn(b)));
  }

  _featureItem(feature) {
    let name = feature.properties.name;
    let linkedName = feature.properties.define
      ? html`<a href="/define/${feature.properties.define}">${name}</a>`
      : name;
    if (feature.geometry.type == 'Point') {
      return html`<li
        class="marker-item"
        style="--marker-icon: url('data:image/svg+xml;utf8,${encodeURIComponent(
          icon.marker[feature.properties.icon].strings
        )}')"
      >
        ${linkedName}
      </li>`;
    } else {
      return html`<li>${linkedName}</li>`;
    }
  }

  render() {
    return html`
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('static-map:1'))}</h1>
          <sc-map id="map" hide-static-map-button></sc-map>
          <h2>${unsafeHTML(this.localize('static-map:2'))}</h2>
          <div class="columns">${this._featuresList()}</div>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-map', SCStaticMap);
