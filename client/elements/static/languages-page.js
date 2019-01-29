import { html } from '@polymer/lit-element/lit-element.js';
import { until } from 'lit-html/directives/until.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import { API_ROOT } from '../../constants.js';
import '../addons/sc-pie-chart.js';

class SCLanguagesPage extends SCStaticPage {
  static get properties() {
    return {
      selectedLanguage: { type: String },
      languageData: { type: Object },
      languages: { type: Object }
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_languages-page';
    this.fetchList();
  }

  async fetchList() {
    this.languages = await (await fetch(`${API_ROOT}/translation_count`)).json();
  }

  async fetchLanguage(lang) {
    this.languageData = undefined;
    this.languageData = await (await fetch(`${API_ROOT}/translation_count/${lang}`)).json();
  }

  _stateChanged(state) {
    super._stateChanged(state);
    const [,,lang] = state.currentRoute.path.split('/');
    this.selectedLanguage = lang;
  }

  shouldUpdate(props) {
    if (props.has('selectedLanguage') && this.selectedLanguage !== undefined) {
      this.fetchLanguage(this.selectedLanguage);
    }

    return true;
  }

  findLanguage(code) {
    return [...this.languages.ancient, ...this.languages.modern].find(l => l.iso_code === code);
  }

  get languageTemplate() {
    const { name, percent } = this.findLanguage(this.selectedLanguage);

    const list = (title, names) => html`
      <h2>${this.localize(title)}</h2>
      <ul>
        ${names.map(item => html`
        <li>${item.name} (${item.total})</li>
        `)}
      </ul>
    `;

    const chart = (name, percent) => html`
      <figure>
        <sc-pie-chart percent="${percent}"></sc-pie-chart>
        <figcaption>${this.localize('percentageOfOriginalTexts', { lang: name })}</figcaption>
      </figure>
    `;

    return html`
      ${
        this.languageData
        ? html`
          <h1>${name}</h1>
          ${
            percent
            ? html`
              ${chart(name, percent)}
              ${list('translations', this.languageData.division)}
              ${list('translators', this.languageData.author)}
            `
            : html `
              ${list('divisions', this.languageData.division)}
              ${list('authors', this.languageData.author)}
            `
          }
        `
        : html`<paper-spinner-lite active></paper-spinner-lite>`
      }
    `;
  }

  get languageListTemplate() {
    const list = (title, languages) => html`
      <h2>${this.localize(title)} (${languages.length})</h2>
      <ul>
        ${languages.map(lang => html`
          <li><a href="/languages/${lang.iso_code}">${lang.name} (${lang.total})</a></li>
        `)}
      </ul>
    `;

    return html`
      <h1>${this.localize('languagesOnSuttaCentral')}</h1>
      ${list('ancientLanguages', this.languages.ancient)}
      ${list('modernLanguages', this.languages.modern)}
    `;
  }

  render() {
    return html`
    ${staticStyles}
    <style>
      figure {
        width: 240px;
        float: right;
        margin: 0;
        text-align: center;
      }

      figcaption {
        margin-top: .5em;
      }

      paper-spinner-lite {
        --paper-spinner-color: var(--sc-primary-color);
        display: block;
        margin: 3em auto;
      }
    </style>
    <div id="page-wrap">
      <main>
        <section>
          <article>
            ${this.languages
              ? this.selectedLanguage
                ? this.languageTemplate
                : this.languageListTemplate
              : html`<paper-spinner-lite active></paper-spinner-lite>`
            }
          </article>
        </section>
      </main>
    </div>`;
  }
}

customElements.define('sc-languages-page', SCLanguagesPage);
