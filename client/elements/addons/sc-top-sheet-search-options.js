import { html, css } from 'lit';
import SCTopSheetCommon from './sc-top-sheet-common';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { store } from '../../redux-store';
import { API_ROOT } from '../../constants';
import { reduxActions } from './sc-redux-actions';

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

    :host
{
        --mdc-theme-secondary: var(--sc-primary-accent-color);
        --mdc-typography-font-family: var(--sc-sans-font);
        --mdc-theme-text-primary-on-background: var(--sc-primary-text-color);
        --mdc-typography-body2-font-weight: 550;
        --mdc-checkbox-unchecked-color: var(--sc-icon-color);
    }

      fieldset
{
    font-family: var(--sc-sans-font);

    display: flex;
    flex-direction: row;

    margin-top: 24px;
    padding: 1em;

    color: var(--sc-primary-text-color);;
    border-color: var(--sc-border-color);

    gap: 2em;
}

legend
{
    padding: 0 1em;

    color: var(--sc-secondary-text-color);
    border-radius: .8em;;
    background-color: var(--sc-border-color);

    font-variant-caps: all-small-caps;
}

section
{
    margin-top: 12px;
    padding: 0;
}

.single-column
{
    display: grid;

    margin: 1em 1em 1em 0;

    grid-template-columns: repeat(1, 1fr);
    gap: 1em;
    grid-auto-rows: minmax(auto);
}

.five-column
{
    display: grid;

    margin: 1em 1em 1em 0;

    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
    grid-auto-rows: minmax(auto);
}



section b
{
    display: block;

    padding-left: 14px;
}

fieldset div,
input,
label
{
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
    this.initDisplayedLanguages();
    this.rootLanguageList = this.displayedLanguages.filter(item => item.is_root);
    this.translationLanguageList = this.displayedLanguages.filter(item => item.is_root === false);
  }

  async initDisplayedLanguages() {
    if (!this.displayedLanguages || this.displayedLanguages.length === 0) {
      await this.#fetchLanguageList();
      this.displayedLanguages = store.getState().searchOptions.displayedLanguages;
      this.rootLanguageList = this.displayedLanguages.filter(item => item.is_root);
      this.translationLanguageList = this.displayedLanguages.filter(item => item.is_root === false);
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
  }

  async #fetchLanguageList() {
    this.languageList = await (await fetch(`${API_ROOT}/languages?all=true`)).json();
    this.languageList.forEach(item => {
      item.checked = !!(item.uid === store.getState().siteLanguage || item.is_root);
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
          <legend>Language options for search</legend>
          ${this.#rootLanguagesListTemplate()} ${this.#translationLanguagesListTemplate()}
        </fieldset>
      </main>
    `;
  }
}

customElements.define('sc-top-sheet-search-options', SCTopSheetSearchOptions);
