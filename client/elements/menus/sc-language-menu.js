import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';

import './sc-language-menu.js';
import '../../img/sc-language-icons.js';
import { ReduxMixin } from '/redux-store.js';
import { Localized } from '../addons/localization-mixin.js';

/*
Language-menu used in the suttaplex card for denoting which translations exist of this particular text
*/

class SCLanguageMenu extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    <style include="paper-item-shared-styles">
      :host {
        --primary-color: var(--sc-primary-accent-color);
        --paper-menu-button-content: {
          display: flex;
        };
      }

      .language-menu-listbox, .language-menu-dropdown {
        --paper-input-container-input: {
          text-transform: capitalize;
        };
      }

      .language-menu-dropdown {
        width: var(--language-menu-dropdown-width, 200px);
        --paper-input-container-focus-color: var(--sc-primary-accent-color);
        --paper-dropdown-menu-icon: {
          color: var(--sc-disabled-text-color);
        };
        --paper-dropdown-menu-input: {
          --paper-input-container-input-color: var(--sc-primary-text-color);
          --paper-input-container-color: var(--sc-secondary-text-color);
        };
      }

      .language-menu-dropdown:focus {
        outline: none;
      }

      .language-menu-listbox {
        background-color: var(--sc-secondary-background-color);
        width: 230px;
      }

      .language-menu-url {
        text-decoration: none;
        color: inherit;
      }

      .language-menu-item {
        @apply --sc-skolar-font-size-md;
        color: var(--sc-primary-text-color);
        /*19px for the icon, 16px for the margin */
        --paper-item-icon-width: calc(var(--sc-size-language-icon) + var(--sc-size-md));
      }

      .root-lang-menu-item {
        color: var(--sc-primary-accent-color);
        cursor: pointer;
      }

      .root-lang-menu-item:hover {
        background-color: var(--sc-tertiary-background-color);
      }

      .language-menu-url:focus {
        outline: none;
      }

      .iso-code-image {
        fill: var(--sc-disabled-text-color);
        margin-top: var(--sc-size-xs);
        width: var(--sc-size-language-icon);
        height: var(--sc-size-language-icon);
      }

      .language-choice-box {
        background-color: var(--sc-secondary-background-color);
      }

      .language-choice-box:hover {
        background-color: var(--sc-tertiary-background-color);
        cursor: pointer;
      }

      .d-none {
        display: none;
      }

      .no-outline:focus {
        outline: none;
      }
    </style>

    <template is="dom-if" if="[[_shouldShowMenu(languageChoice, language)]]">
      <paper-dropdown-menu class="language-menu-dropdown custom" label="[[_getLabel(localize, showLabel)]]" title="{{localize('selectLanguage')}}" id="paper_dropdown_menu" vertical-align="top">
        <paper-listbox class="language-menu-listbox" slot="dropdown-content" selected="0">
          <template is="dom-repeat" id="languageMenuTemplate" items="[[_getDisplayedItems(languageChoice, language)]]" as="translation">
            <section class$="{{_rootLanguageClassOrStandard(translation)}} no-outline">
              <a class="language-menu-url" href="/[[rootId]]/[[translation.lang]]/[[translation.author_uid]][[_getParagraphRange()]]">
                <paper-icon-item class="language-menu-item" id="[[translation.id]]" title="[[_getTranslationAuthorTitle(translation, localize)]]">
                  <iron-icon class="iso-code-image" slot="item-icon" title="[[translation.lang_name]]" icon="[[_getLanguageIconName(translation.lang)]]"></iron-icon>
                  <paper-item-body>
                    [[_computeAuthor(translation.author_short)]]
                  </paper-item-body>
                </paper-icon-item>
              </a>
            </section>
          </template>

        </paper-listbox>
      </paper-dropdown-menu>

    </template>`;
  }

  static get properties() {
    return {
      languageChoice: {
        type: Array,
        notify: true
      },
      originalLanguage: String,
      rootId: {
        type: String,
        observer: '_idChanged'
      },
      rootLangMappings: {
        type: Object,
        value: {
          'pli': 'Pali',
          'lzh': 'Chinese',
          'san': 'Sanskrit',
          'xct': 'Tibetan',
          'pra': 'Prakrit',
          'pgd': 'Gandhari',
          'uig': 'Uighur',
          'xto': 'TocharianA',
          'kho': 'Khotanese'
        }
      },
      parallelTo: {
        type: String
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-language-menu'
      },
      hideIfOnlyUserLanguageTexts: {
        type: Boolean,
        value: false
      },
      parallelMenu: {
        type: Boolean,
        value: false
      },
      showLabel: {
        type: Boolean,
        statePath: 'suttaplexListDisplay'
      }
    }
  }

  _idChanged() {
    requestAnimationFrame(() => {
      const listbox = this.shadowRoot.querySelector('paper-listbox');
      if (listbox) {
        listbox.selected = -1;
        this.shadowRoot.querySelector('#languageMenuTemplate').render();
        listbox.forceSynchronousItemUpdate();
        listbox.selected = 0;
      }
    });
  }

  _getDisplayedItems(translations, siteLanguage) {
    if (!translations) return;
    // sort so that root languages are first and siteLanguages are deleted
    const languageChoice = [];
    translations.forEach(item => {
      if (item.lang in this.rootLangMappings) {
        languageChoice.splice(0, 0, item);
      } else if (item.lang !== siteLanguage || this.parallelMenu) {
        languageChoice.push(item);
      }
    });
    return languageChoice;
  }

  _computeHide(checkText) {
    return checkText ? checkText : 'd-none';
  }

  // If author name is too long it looks really bad in paper-item so just cut it.
  _shortenAuthor(author) {
    if (author.length > 16) {
      return `${author.substring(0, 15)}...`;
    } else {
      return author;
    }
  }

  _shouldShowMenu(languageMenu, language) {
    if (this.hideIfOnlyUserLanguageTexts) {
      return languageMenu.some(item => item.lang !== language);
    }
    return true;
  }

  _computeAuthor(author) {
    return author ? author : this.localize('anonym');
  }

  _computeFullLanguageName(isoCode) {
    return this.rootLangMappings[isoCode];
  }

  _rootLanguageClassOrStandard(language) {
    return language.lang === this.originalLanguage ? 'root-lang-menu-item' : 'language-choice-box';
  }

  _getLanguageIconName(isoCode) {
    return `sc-language-icons:${isoCode}`;
  }

  _getParagraphRange() {
    if (!this.parallelTo) {
      return '';
    };
    const toParallel = this.parallelTo;
    if (toParallel.match(/dhp/g)) {
      const ids = toParallel.substring(toParallel.indexOf('dhp') + 3);
      if (ids.includes('-')) {
        const [id1, id2] = ids.split('-');
        return `#${id1}--${id2}`;
      }
      return `#${ids}`;
    } else {
      const ids = toParallel.split(/#(.*)/)[1];
      if (!ids) {
        return '';
      }
      if (ids.includes('-')) {
        const [id1, id2] = ids.split('-#');
        return `#${id1}--${id2}`;
      }
      return `#${ids}`;
    }
  }

  _getTranslationAuthorTitle(translation, localize) {
    if (Object.keys(this.rootLangMappings).indexOf(translation.lang) !== -1) {
      return localize('selectOriginal', 'lang', translation.lang_name, 'author', translation.author);
    } else {
      return localize('selectTranslation', 'lang', translation.lang_name, 'author', translation.author);
    }
  }

  _getLabel(localize, showLabel) {
    return showLabel ? '' : localize('more');
  }
}

customElements.define('sc-language-menu', SCLanguageMenu)
