import { html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import SCTopSheetCommon from './sc-top-sheet-common';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { store } from '../../redux-store';
import { API_ROOT } from '../../constants';
import { reduxActions } from '../addons/sc-redux-actions';

import '@material/mwc-formfield';
import '@material/mwc-checkbox';

export class SCTopSheetSearchOptions extends SCTopSheetCommon {
  static properties = {
    displayedLanguages: { type: Array },
  };

  static styles = [
    super.styles,
    typographyCommonStyles,
    css`
      fieldset {
        display: flex;
        flex-direction: row;
      }

      .single-column {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1em;
        grid-auto-rows: minmax(auto);
        margin: 1em 1em 1em 0;
      }

      .five-column {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1em;
        grid-auto-rows: minmax(auto);
        margin: 1em 1em 1em 0;
      }

      section b {
        display: block;
      }

      fieldset div,
      input,
      label {
        cursor: pointer;
      }
    `,
  ];

  get actions() {
    return {
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display,
        });
      },
    };
  }

  constructor() {
    super();
    this.displayedLanguages = store.getState().searchOptions.displayedLanguages;
    this.rootLanguageList = this.displayedLanguages.filter(item => item.is_root);
    this.translationLanguageList = this.displayedLanguages.filter(item => item.is_root === false);
    if (!this.displayedLanguages || this.displayedLanguages.length === 0) {
      this.#fetchLanguageList();
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
  }

  firstUpdated() {
    //this.#fetchLanguageList();
  }

  async #fetchLanguageList() {
    this.languageList = await (await fetch(`${API_ROOT}/languages?all=true`)).json();
    // 循环this.languageList，添加checked属性
    this.languageList.forEach(item => {
      item.checked = item.uid === store.getState().siteLanguage ? true : false;
    });
    reduxActions.setSearchDisplayLanguage(this.languageList);
  }

  #rootLanguagesListTemplate() {
    return this.rootLanguageList
      ? html`
          <section>
            <b>root languages</b>
            <section class="single-column">
              ${this.rootLanguageList.map(
                lang => html`
                  <mwc-formfield label=${lang.name}>
                    <mwc-checkbox
                      name=${lang.name}
                      value=${lang.uid}
                      data-type=${lang.name}
                      ?checked=${lang.checked}
                      @change=${this.#onLanguageCheckboxChange}
                    ></mwc-checkbox>
                  </mwc-formfield>
                `
              )}
            </section>
          </section>
        `
      : '';
  }

  #translationLanguagesListTemplate() {
    return this.translationLanguageList
      ? html`
          <section>
            <b>translation languages</b>
            <section class="five-column">
              ${this.translationLanguageList.map(
                lang => html`
                  <mwc-formfield label=${lang.name}>
                    <mwc-checkbox
                      name=${lang.uid}
                      value=${lang.uid}
                      data-type=${lang.name}
                      ?checked=${lang.checked}
                      @change=${this.#onLanguageCheckboxChange}
                    ></mwc-checkbox>
                  </mwc-formfield>
                `
              )}
            </section>
          </section>
        `
      : '';
  }

  #onLanguageCheckboxChange({ target: { checked, value: selectedLanguage } }) {
    this.displayedLanguages = store.getState().searchOptions.displayedLanguages;
    this.displayedLanguages.forEach(item => {
      if (item.uid === selectedLanguage) {
        item.checked = checked;
      }
    });
    reduxActions.setSearchDisplayLanguage(this.displayedLanguages);
  }

  render() {
    return html`
      <main>
        <fieldset>
          <legend>Language options</legend>
          ${this.#rootLanguagesListTemplate()} ${this.#translationLanguagesListTemplate()}
        </fieldset>
      </main>
    `;
  }
}

customElements.define('sc-top-sheet-search-options', SCTopSheetSearchOptions);
