import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

import { Localized } from '../addons/localization-mixin.js';
import { ReduxMixin } from '../../redux-store.js';

/*
This dropdown for the search pages is normally hidden, and only shows when necessary.
The two necessary conditions are:

- The results are in more than one category of root texts, translations, and dictionaries
- there are more than ten results in total
*/

class SCSearchFilterMenu extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    <style>
      :host {
        --primary-color: var(--sc-primary-accent-color);
      }

      .filter-dropdown, .filter-menu-items {
        --paper-dropdown-menu-icon: {
          color: var(--sc-disabled-text-color);
        };
        --paper-dropdown-menu-input: {
          --paper-input-container-focus-color: var(--sc-primary-accent-color);
          --paper-input-container-input-color: var(--sc-primary-text-color);
          --paper-input-container-color: var(--sc-secondary-text-color);
        };
        --paper-menu-button-dropdown: {
          @apply --shadow-elevation-8dp;
          background-color: var(--sc-secondary-background-color);
        };
        width: 150px;
      }

      .filter-menu-items {
        background-color: var(--sc-secondary-background-color);
      }

      .filter-menu-item {
        --paper-item: {
          color: var(--sc-primary-text-color);
        };
        cursor: pointer;
      }

      .filter-menu-item:hover {
        background-color: var(--sc-tertiary-background-color);
      }
    </style>

    <paper-dropdown-menu id="filter_dropdown" class="filter-dropdown" title="Select search scope" vertical-align="auto" label="{{localize('filter')}}">
      <paper-listbox class="filter-menu-items" slot="dropdown-content" selected="{{searchSelected}}">
        <paper-item class="filter-menu-item" id="all">{{localize('all')}}</paper-item>
        <paper-item class="filter-menu-item" id="root-texts">{{localize('rootTexts')}}</paper-item>
        <paper-item class="filter-menu-item" id="translations">{{localize('translations')}}</paper-item>
        <paper-item class="filter-menu-item" id="dictionaries">{{localize('dictionaries')}}</paper-item>
      </paper-listbox>
    </paper-dropdown-menu>`;
  }

  static get properties() {
    return {
      searchSelected: {
        type: String,
        value: '0',
        observer: '_searchChanged'
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-search-filter-menu'
      }
    }
  }

  // Fires resulting choice to search page, where it is converted to a selection of the relevant items.
  _searchChanged() {
    this.dispatchEvent(new CustomEvent('search-filter-changed', {
      detail: { searchView: this.searchSelected },
      composed: true,
      bubbles: true
    }));
  }

  resetFilter() {
    this.searchSelected = 0;
  }
}

customElements.define('sc-search-filter-menu', SCSearchFilterMenu);
