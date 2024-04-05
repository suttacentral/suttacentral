import { html } from 'lit';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCUtilityStyles } from '../styles/sc-utility-styles';
import { SCStaticPage } from '../addons/sc-static-page';
import { API_ROOT } from '../../constants';
import '../addons/sc-pie-chart';
import { store } from '../../redux-store';
import { navIndex, setNavigation } from '../navigation/sc-navigation-common';

export class SCStaticLanguages extends SCStaticPage {
  static properties = {
    selectedLanguage: { type: String },
    languageData: { type: Object },
    languages: { type: Object },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/languages';
    this.fetchList();
  }

  async fetchList() {
    this.languages = await (await fetch(`${API_ROOT}/translation_count`)).json();
  }

  async fetchLanguage(lang) {
    this.languageData = undefined;
    this.languageData = await (await fetch(`${API_ROOT}/translation_count/${lang}`)).json();
  }

  stateChanged(state) {
    super.stateChanged(state);
    const [, , lang] = state.currentRoute.path.split('/');
    this.selectedLanguage = lang;
  }

  shouldUpdate(props) {
    if (props.has('selectedLanguage') && this.selectedLanguage !== undefined) {
      this.fetchLanguage(this.selectedLanguage);
    }

    return true;
  }

  _updateNav(fullLangName) {
    const navIndexesOfType = navIndex.get('languageDetail');
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray[navIndexesOfType.index] = {
      title: fullLangName,
      url: `${currentPath}/{this.selectedLanguage}`,
      type: 'LanguageDetailPage',
    };
    setNavigation(navArray);
    this.actions.changeToolbarTitle(this.localize('languages:languagesOnSuttaCentral'));
  }

  get actions() {
    return {
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title,
        });
      },
    };
  }

  findLanguage(code) {
    return [...this.languages.ancient, ...this.languages.modern].find(l => l.iso_code === code);
  }

  get languageTemplate() {
    const { name, percent } = this.findLanguage(this.selectedLanguage);
    this._updateNav(name);
    let rootLanguages = [];

    if (this.languageData) {
      this.languageData.division.map(item => {
        if (item.root_lang) {
          let { name } = this.findLanguage(item.root_lang);
          item.rootLanguageFullName = name;
        } else {
          item.rootLanguageFullName = this.localize('languages:other');
        }
      });

      let hash = {};
      rootLanguages = this.languageData.division.reduce((item, next) => {
        hash[next.rootLanguageFullName]
          ? ''
          : (hash[next.rootLanguageFullName] = true && item.push(next.rootLanguageFullName));
        return item;
      }, []);
    }

    const list = (title, names) => html`
      <h2>${this.localize(title)}</h2>
      <ul class="author-count-list">
        ${names.map(item => html` <li>${item.name} (${item.total})</li> `)}
      </ul>
    `;

    const listOfRootLanguage = () => html`
      ${rootLanguages.map(
        rootLang => html`
          <h3>${rootLang}</h3>
          <ul class="language-count-list">
            ${this.languageData.division
              .filter(rootItem => rootItem.rootLanguageFullName === rootLang)
              .map(item => html` <li>${item.name} (${item.total})</li> `)}
          </ul>
        `
      )}
    `;

    const chart = (name, percent) => html`
      <figure>
        <sc-pie-chart percent="${percent}"></sc-pie-chart>
        <figcaption>
          ${this.localize('languages:percentageOfOriginalTexts', { lang: name })}
        </figcaption>
      </figure>
    `;

    return html`
      ${this.languageData
        ? html`
            <h1>${name}</h1>
            ${percent
              ? html`
                  ${chart(name, percent)} ${listOfRootLanguage()}
                  ${list('languages:translators', this.languageData.author)}
                `
              : html`
                  ${listOfRootLanguage()} ${list('languages:authors', this.languageData.author)}
                `}
          `
        : ''}
    `;
  }

  get languageListTemplate() {
    const list = (title, languages) => html`
      <h2>${this.localize(title)} (${languages.length})</h2>
      <ul class="languages-list">
        ${languages.map(
          lang => html`
            <li>
              <a class="block-link" href="/languages/${lang.iso_code}"
                >${lang.name} (${lang.total})</a
              >
            </li>
          `
        )}
      </ul>
    `;

    return html`
      <h1>${this.localize('languages:languagesOnSuttaCentral')}</h1>
      ${list('languages:ancientLanguages', this.languages.ancient)}
      ${list('languages:modernLanguages', this.languages.modern)}
    `;
  }

  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
        ${SCUtilityStyles}
      </style>
      <style>
        article {
          width: 100%;
        }

        figure {
          float: right;

          width: 240px;
          margin: 0;

          text-align: center;
        }

        figcaption {
          font-family: var(--sc-sans-font);
          font-size: var(--sc-font-size-s);

          margin-top: 0.5em;

          color: var(--sc-on-primary-secondary-text-color);
        }

        .languages-list {
          display: flex;

          padding-left: 0;

          list-style-type: none;

          flex-wrap: wrap;
          gap: 1rem;
        }

        .languages-list li {
          margin: 0;
          padding: 0;
        }

        .language-count-list,
        .author-count-list {
          padding: 0;
        }

        .block-link {
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
      </style>
      <main>
        <article>
          ${this.languages
            ? this.selectedLanguage
              ? this.languageTemplate
              : this.languageListTemplate
            : ''}
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-languages', SCStaticLanguages);
