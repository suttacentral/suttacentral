import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';
import { API_ROOT } from '../../constants';

class SCStaticAbbreviations extends SCStaticPage {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      abbrTexts: { type: Array },
      abbrEditions: { type: Array },
      abbrSchools: { type: Array },
    };
  }

  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
        .abbrTable {
          width: 100%;
          white-space: nowrap;
        }
      </style>
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('abbreviations:1'))}</h1>
          <p>${unsafeHTML(this.localize('abbreviations:2'))}</p>
          <ul>
            <li>${unsafeHTML(this.localize('abbreviations:3'))}</li>
            <li>${unsafeHTML(this.localize('abbreviations:4'))}</li>
            <li>${unsafeHTML(this.localize('abbreviations:5'))}</li>
            <li>${unsafeHTML(this.localize('abbreviations:6'))}</li>
            <li>${unsafeHTML(this.localize('abbreviations:7'))}</li>
          </ul>
          <p>${unsafeHTML(this.localize('abbreviations:8'))}</p>
          <table class="abbrTable">
            <caption>
              ${unsafeHTML(this.localize('abbreviations:9'))}
            </caption>
            ${this.abbrTexts.map(
              abbr => html`
                <tr>
                  <td>${unsafeHTML(abbr.acronym)}</td>
                  <td>${unsafeHTML(abbr.name)}</td>
                </tr>
              `
            )}
          </table>

          <table class="abbrTable">
            <caption>
              List of Edition Abbreviations
            </caption>
            ${this.abbrEditions.map(
              abbr => html`
                <tr>
                  <td>${unsafeHTML(abbr.acronym)}</td>
                  <td>${unsafeHTML(abbr.name)}</td>
                </tr>
              `
            )}
          </table>

          <table class="abbrTable">
            <caption>
              List of School Abbreviations
            </caption>
            ${this.abbrSchools.map(
              abbr => html`
                <tr>
                  <td>${unsafeHTML(abbr.acronym)}</td>
                  <td>${unsafeHTML(abbr.name)}</td>
                </tr>
              `
            )}
          </table>
        </article>
      </main>
    `;
  }

  firstUpdated() {
    this._fetchAbbreviationTexts();
    this._fetchAbbreviationEditions();
    this._fetchAbbreviationSchools();
  }

  async _fetchAbbreviationTexts() {
    try {
      this.abbrTexts = await (await fetch(`${API_ROOT}/abbreviation_texts`)).json();
    } catch (error) {
      console.log(error);
    }
  }

  async _fetchAbbreviationEditions() {
    try {
      this.abbrEditions = await (await fetch(`${API_ROOT}/abbreviation_editions`)).json();
    } catch (error) {
      console.log(error);
    }
  }

  async _fetchAbbreviationSchools() {
    try {
      this.abbrSchools = await (await fetch(`${API_ROOT}/abbreviation_schools`)).json();
    } catch (error) {
      console.log(error);
    }
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/abbreviations';
    this.abbrTexts = [];
    this.abbrEditions = [];
    this.abbrSchools = [];
  }
}

customElements.define('sc-static-abbreviations', SCStaticAbbreviations);
