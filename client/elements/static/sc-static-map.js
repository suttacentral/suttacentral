import { html, css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { SCStaticPage } from '../addons/sc-static-page';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCUtilityStyles } from '../styles/sc-utility-styles';
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
    this.localizedStringsPath = '/localization/elements/map';

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
      ${SCUtilityStyles}
      article {
        max-width: 100%;
      }

      .columns {
        margin-top: 2rem;

        columns: 3 480px;
      }

      .features-section {
        break-inside: avoid;
      }

      ul {
        padding-left: 0;
      }

      li {
        margin: 0.5em 0;
        padding: 0;

        list-style: none;
      }

      li a {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-font-size-s);
        font-weight: 550;
        line-height: 1;

        display: inline-flex;

        box-sizing: border-box;
        min-width: 64px;
        height: 40px;
        padding: 0 24px;

        transition: var(--sc-link-transition);
        text-decoration: none;

        color: var(--sc-on-tertiary-primary-text-color);
        border: 1px solid var(--sc-border-color);
        border-radius: var(--sc-big-border-radius);
        background-color: inherit;

        align-items: center;
        justify-content: center;
      }

      a svg {
        display: inline-block;

        width: 1.5em;
        margin-top: -0.2em;
        margin-right: 0.2em;
        margin-left: -0.6em;

        vertical-align: middle;
      }

      h3 {
        margin-top: 0;
      }

      .features-section {
        margin-bottom: 2rem;
      }

      img {
        margin-bottom: 8px;

        border-radius: var(--sc-big-border-radius);
        box-shadow: var(--sc-shadow-elevation-2dp);
      }

      figcaption {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-font-size-s);

        text-align: right;

        color: var(--sc-on-primary-secondary-text-color);
      }
    `,
  ];

  _featuresList() {
    return this.layerNames.map(layerName => {
      const listItems = this._sortObjectsByStringKey(
        this.features.filter(feature => feature.properties.layer === layerName),
        feature => feature.properties.name
      ).map(this._featureItem);
      return html`<div class="features-section">
        <h3>${this._getLocalizedTextByLayerName(layerName)}</h3>
        <ul>
          ${listItems}
        </ul>
      </div>`;
    });
  }

  _getLocalizedTextByLayerName(text) {
    const textMap = {
      'Capital cities': 'map:5',
      'Towns & villages': 'map:6',
      'Temples & features': 'map:7',
      'Regions': 'map:8',
      'Mahajanapadas': 'map:9',
      'Republics / countries': 'map:10',
      'Mahāparinibbāna journey': 'map:11',
      'Pārāyanavagga journey': 'map:12',
      'Extraterrestrial Places': 'map:13'
    };

    return textMap[text] ? this.localize(textMap[text]) : text;
  }

  _sortObjectsByStringKey(objectList, keyFn) {
    return objectList.sort((a, b) => keyFn(a).localeCompare(keyFn(b)));
  }

  _featureItem(feature) {
    const { name } = feature.properties;
    const linkedName = feature.properties.define
      ? html`<a href="/define/${feature.properties.define}"
          >${icon.marker[feature.properties.icon]}${name}</a
        >`
      : name;
    return html`<li>${linkedName}</li>`;
  }

  render() {
    return html`
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('map:1'))}</h1>
          <h2>${unsafeHTML(this.localize('map:2'))}</h2>
          <figure>
            <picture>
              <source srcset="/img/static-pages/jambudipa_map.avif" type="image/avif" />
              <img
                alt="Hand-drawn map of Jambudipa"
                class="image-home"
                src="/img/static-pages/jambudipa_map.jpg"
                width="1476px"
              />
            </picture>
            <figcaption>${unsafeHTML(this.localize('map:3'))}</figcaption>
          </figure>
          <h2>${unsafeHTML(this.localize('map:4'))}</h2>
          <sc-map id="map" hide-static-map-button></sc-map>

          <div class="columns">${this._featuresList()}</div>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-map', SCStaticMap);
