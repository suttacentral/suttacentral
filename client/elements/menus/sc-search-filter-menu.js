import { css, html, LitElement } from 'lit-element';
import { LitLocalized } from '../addons/localization-mixin';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

/*
This dropdown for the search pages is normally hidden, and only shows when necessary.
The two necessary conditions are:

- The results are in more than one category of root texts, translations, and dictionaries
- there are more than ten results in total
*/

class SCSearchFilterMenu extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        --mdc-theme-primary: var(--sc-primary-accent-color);
        --mdc-select-fill-color: transparent;
        --mdc-typography-font-family: var(--sc-sans-font);
      }
    `;
  }

  static get properties() {
    return {
      searchSelected: { type: String },
      localizedStringsPath: { type: String },
    };
  }

  constructor() {
    super();
    this.searchSelected = 'all';
    this.localizedStringsPath = '/localization/elements/sc-search-filter-menu';
  }

  _onSelectedItemChanged(e) {
    const selectedItem = e.currentTarget.value;
    if (selectedItem) {
      this.searchSelected = selectedItem;
      this._searchChanged();
    }
  }

  // Fires resulting choice to search page, where it is converted to a selection of the relevant items.
  _searchChanged() {
    this.dispatchEvent(
      new CustomEvent('search-filter-changed', {
        detail: { searchView: this.searchSelected },
        composed: true,
        bubbles: true,
      })
    );
  }

  resetFilter() {
    this.searchSelected = 'all';
  }

  render() {
    return html`
      <style></style>
      <mwc-select
        class="filter-dropdown"
        label="${this.localize('filter')}"
        @selected="${e => this._onSelectedItemChanged(e)}"
      >
        <mwc-list-item id="all" value="all" selected>${this.localize('all')}</mwc-list-item>
        <mwc-list-item id="root-texts" value="root-texts">
          ${this.localize('rootTexts')}
        </mwc-list-item>
        <mwc-list-item id="translations" value="translations">
          ${this.localize('translations')}
        </mwc-list-item>
        <mwc-list-item id="dictionaries" value="dictionaries">
          ${this.localize('dictionaries')}
        </mwc-list-item>
      </mwc-select>
    `;
  }
}

customElements.define('sc-search-filter-menu', SCSearchFilterMenu);
