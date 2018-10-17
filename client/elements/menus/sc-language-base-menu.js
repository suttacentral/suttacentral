import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';

import '../../img/sc-language-icons.js';
import { ReduxMixin } from '../../redux-store.js';
import { Localized } from '../addons/localization-mixin.js';
import { API_ROOT } from '../../constants.js';

/*
This is the base language menu that determines the language of the site.
*/

class LanguageBaseMenu extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    <style>
      :host {
        --primary-color: var(--sc-primary-color);
        --paper-menu-button-content: {
          display: block;
        };
      }

      .language-menu-dropdown {
        @apply --sc-skolar-font-size-md;
        background-color: transparent;
        --paper-input-container-focus-color: var(--sc-primary-accent-color);
        --paper-dropdown-menu-icon: {
          color: var(--sc-disabled-text-color);
        };
        --paper-dropdown-menu-input: {
          --paper-input-container-input-color: var(--sc-primary-text-color);
          --paper-input-container-color: var(--sc-secondary-text-color);
        };
        --paper-menu-button-dropdown: {
          @apply --sc-shadow-elevation-9dp;
          width: 180px;
          background-color: var(--sc-secondary-background-color);
        };
      }

      .language-menu-list {
        background-color: var(--sc-secondary-background-color);
      }

      .iso-code-image {
        fill: var(--sc-disabled-text-color);
        margin-top: var(--sc-size-xs);
        width: var(--sc-size-language-icon);
        height: var(--sc-size-language-icon);
      }

      .language-menu-paper-item {
        @apply --sc-skolar-font-size-md;
        color: var(--sc-primary-text-color);
        /*19px for the icon, 16px for the margin */
        --paper-item-icon-width: calc(var(--sc-size-language-icon) + var(--sc-size-md));
      }

      .language-menu-paper-item:hover {
        background-color: var(--sc-tertiary-background-color);
        cursor: pointer;
      }

      .language-name {
        padding-top: var(--sc-size-xxs);
      }
    </style>

    <iron-ajax id="languages_ajax" url="[[_getLanguagesUrl()]]" handle-as="json" last-response="{{languageListResponse}}" on-response="_languageListDownloaded"></iron-ajax>

    <paper-dropdown-menu class="language-menu-dropdown" label="{{localize('languageLabel')}}" disabled="[[disabled]]" title="{{localize('browseTooltip')}}" vertical-align="auto">
      <paper-listbox class="language-menu-list" slot="dropdown-content" selected="{{selectedLanguageNum}}">
        <template is="dom-repeat" items="[[languageListResponse]]" as="language">
          <paper-icon-item class="language-menu-paper-item" id="[[language.uid]]">
            <iron-icon class="iso-code-image" title="[[language.name]]" slot="item-icon" icon="[[_getLanguageIconName(language.iso_code)]]"></iron-icon>
            <paper-item-body>
              <div class="language-name">[[language.name]]</div>
            </paper-item-body>
          </paper-icon-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>`;
  }

  static get properties() {
    return {
      languageListResponse: {
        type: Array,
        value: () => { return []; }
      },
      selectedLanguageNum: {
        type: Number,
        observer: '_selectedLanguageNumChanged'
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-language-base-menu'
      },
      // pass a unique name here to use in the language change event identifier.
      cloneName: {
        type: String
      },
      // Whether to ask backend for a list of all languages in the database
      // (as opposed to only ones with available translations).
      allLanguages: {
        type: Boolean
      },
      // If true, no root languages will be displayed.
      noRoot: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      }
    };
  }

  // Redux actions
  static get actions() {
    return {
      changeLanguage(language, fullName) {
        return {
          type: 'CHANGE_SITE_LANGUAGE',
          language: language,
          fullName: fullName
        }
      }
    }
  }

  ready() {
    super.ready();
    afterNextRender(this, () => {
      this.$.languages_ajax.generateRequest();
    });
  }

  // Is invoked when a language is chosen from the list.
  _selectedLanguageNumChanged() {
    if (!this.languageListResponse || this.languageListResponse.length === 0) {
      return;
    }
    if (!this.selectedLanguageNum && this.selectedLanguageNum !== 0) {
      return;
    }
    try {
      const chosenLanguage = this.languageListResponse[this.selectedLanguageNum];
      // If it's not a main language change menu (but a clone), dispatch an event
      if (this.cloneName) {
        dispatchEvent(new CustomEvent(`${this.cloneName}-language-changed`, {
          detail: { isoCode: chosenLanguage.iso_code, name: chosenLanguage.name },
          composed: true,
          bubbles: true
        }));
      } else {
        // If it is the main menu, change the website language.
        this.dispatch('changeLanguage', chosenLanguage.iso_code, chosenLanguage.name);
      }
    } catch (e) {
      console.error(e);
    }
  }

  _languageListDownloaded() {
    if (this.noRoot) {
      this.languageListResponse = this.languageListResponse.filter(lang => !lang.is_root);
    }
    this.selectedLanguageNum = this._findChosenLanguageIndex(this.languageListResponse, this.language);
  }

  // Listens to changes in the global redux app state and updates the language chosen in the list dropdown.
  _findChosenLanguageIndex(allLanguages, chosenLang) {
    try {
      return allLanguages.findIndex((language) => language.iso_code === chosenLang);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  _getLanguagesUrl() {
    if (this.allLanguages) {
      return `${API_ROOT}/languages?all=true`;
    } else {
      return `${API_ROOT}/languages`;
    }
  }

  _getLanguageIconName(isoCode) {
    return `sc-language-icons:${isoCode}`;
  }
}

customElements.define('sc-language-base-menu', LanguageBaseMenu);
