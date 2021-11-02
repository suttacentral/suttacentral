import { css, html, LitElement } from 'lit';
import { LitLocalized } from '../addons/sc-localization-mixin';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

/*
This dropdown for the search pages is normally hidden, and only shows when necessary.
The two necessary conditions are:

- The results are in more than one category of root texts, translations, and dictionaries
- there are more than ten results in total
*/

class SCMenuSearchFilter extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        --mdc-theme-primary: var(--sc-primary-accent-color);
        --mdc-select-fill-color: var(--sc-tertiary-background-color);
        --mdc-typography-font-family: var(--sc-sans-font);
        --mdc-theme-surface: var(--sc-secondary-background-color);
        --mdc-select-ink-color: var(--sc-primary-text-color);
        --mdc-select-label-ink-color: var(--sc-secondary-text-color);
        --mdc-select-dropdown-icon-color: var(--sc-icon-color);
      }

      mwc-list-item {
        color: var(--sc-primary-text-color);
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
    this.localizedStringsPath = '/localization/elements/build/interface';
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
      <mwc-select
        class="filter-dropdown"
        label="${this.localize('search:filter')}"
        @selected="${e => this._onSelectedItemChanged(e)}"
      >
        <mwc-list-item id="all" value="all" selected>${this.localize('search:all')}</mwc-list-item>
        <mwc-list-item id="root-texts" value="root-texts">
          ${this.localize('search:rootTexts')}
        </mwc-list-item>
        <mwc-list-item id="translations" value="translations">
          ${this.localize('search:translations')}
        </mwc-list-item>
        <mwc-list-item id="dictionaries" value="dictionaries">
          ${this.localize('search:dictionaries')}
        </mwc-list-item>
      </mwc-select>
    `;
  }
}

customElements.define('sc-menu-search-filter', SCMenuSearchFilter);
