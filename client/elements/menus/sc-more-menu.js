import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';

import './sc-language-base-menu.js';
import { ReduxMixin } from '../../redux-store.js';
import { Localized } from "../addons/localization-mixin.js";

/*
Basic more-vert menu on the main toolbar for choice of language and for choosing static pages
*/

class SCMoreMenu extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    <style>
      .more-menu-link {
        text-decoration: none;
        color: inherit;
      }

      .more-menu-paper-item .more-menu-icon {
        margin-right: var(--sc-size-md);
        color: var(--sc-disabled-text-color);
      }

      .more-menu-paper-item {
        color: var(--sc-primary-text-color);
      }

      .more-menu-paper-item:hover {
        background-color: var(--sc-tertiary-background-color);
      }

      .more-menu-paper-item.language-choice-box:hover {
        background-color: unset;
      }

      #language_menu:after {
        content: "   ";
      }

      .pwa-icon {
        fill: var(--sc-primary-color);
      }

      .separator {
        @apply --sc-separator;
      }

      .toggle-button {
        --paper-toggle-button-unchecked-bar-color: var(--sc-secondary-text-color);
        --paper-toggle-button-checked-bar-color: var(--sc-primary-accent-color-light);
        --paper-toggle-button-checked-button-color: var(--sc-primary-accent-color);
        --paper-toggle-button-checked-ink-color: var(--sc-primary-accent-color-dark);
        margin-left: calc(var(--sc-size-xs) * -1);
      }
    </style>

    <paper-item class="more-menu-paper-item language-choice-box">
      <iron-icon class="more-menu-icon" icon="language"></iron-icon>
      <sc-language-base-menu id="language_menu" noRoot="true"></sc-language-base-menu>
    </paper-item>

    <a class="more-menu-link" href="/donations">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" src="/img/pray.png"></iron-icon>
        {{localize('Donations')}}
      </paper-item>
    </a>
    <a class="more-menu-link" href="/offline">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon pwa-icon" icon="sc-svg-icons:pwa"></iron-icon>
        {{localize('UseOffline')}}
      </paper-item>
    </a>
    <paper-item class="more-menu-paper-item">
      <paper-toggle-button id="theme_toggler" class="toggle-button" checked="{{darkThemeChosen}}"></paper-toggle-button>
      {{localize('DarkTheme')}}
    </paper-item>
    <paper-item class="more-menu-paper-item">
      <paper-toggle-button id="view_toggler" class="toggle-button" checked="{{compactViewChosen}}"></paper-toggle-button>
      {{localize('SuttaplexCompactView')}}
    </paper-item>
    <a class="more-menu-link" href="/downloads">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" icon="file-download"></iron-icon>
        {{localize('Downloads')}}
      </paper-item>
    </a>
    <div class="separator"></div>
    <a class="more-menu-link" href="/numbering">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" icon="editor:format-list-numbered"></iron-icon>
        {{localize('Numbering')}}
      </paper-item>
    </a>
    <a class="more-menu-link" href="/abbreviations">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" icon="sc-svg-icons:abbreviations"></iron-icon>
        {{localize('Abbreviations')}}
      </paper-item>
    </a>
    <a class="more-menu-link" href="/methodology">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" icon="sc-svg-icons:school"></iron-icon>
        {{localize('Methodology')}}
      </paper-item>
    </a>
    <div class="separator"></div>
    <a class="more-menu-link" href="/acknowledgments">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" icon="sc-svg-icons:people"></iron-icon>
        {{localize('Acknowledgments')}}
      </paper-item>
    </a>
    <a class="more-menu-link" href="/licensing">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" icon="icons:copyright"></iron-icon>
        {{localize('Licensing')}}
      </paper-item>
    </a>
    <a class="more-menu-link" href="/about">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" icon="icons:info"></iron-icon>
        {{localize('About')}}
      </paper-item>
    </a>
    <a class="more-menu-link" href="[[getDiscourseUrl(routeName)]]"
      title="[[getDiscourseTitle(routeName)]]" target="_blank" rel="noopener noreferrer">
      <paper-item class="more-menu-paper-item">
        <iron-icon class="more-menu-icon" icon="communication:forum"></iron-icon>
        {{localize('Discuss')}}
      </paper-item>
    </a>`;
  }

  static get properties() {
    return {
      menuCreated: {
        type: Boolean,
        value: false
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-more-menu'
      },
      appTheme: {
        type: String,
        statePath: 'colorTheme'
      },
      darkThemeChosen: {
        type: Boolean,
        computed: '_isDarkThemeChosen(appTheme)'
      },
      compactViewChosen: {
        type: Boolean,
        computed: '_isCompactViewChosen(appView)'
      },
      appView: {
        type: Boolean,
        statePath: 'suttaplexListDisplay'
      },
      routeName: {
        type: String,
        statePath: 'currentRoute.name',
      },
    };
  }

  static get actions() {
    return {
      changeAppTheme(theme) {
        return {
          type: "CHANGE_COLOR_THEME",
          theme: theme
        }
      },
      toggleSuttaplexDisplay(view) {
        return {
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay: view
        }
      }
    }
  }

  getDiscourseUrl(routeName) {
    if (routeName === 'SUTTA') {
      const sutta_id = window.location.pathname.split('/')[1];
      return `https://discourse.suttacentral.net/search?q="${sutta_id}%20"`;
    } else {
      return 'https://discourse.suttacentral.net';
    }
  }

  getDiscourseTitle(routeName) {
    const title = (routeName === 'SUTTA' ? 'joinDiscussion': 'discussSuttas');
    return this.localize(title);
  }

  ready() {
    super.ready();
    this._initializeListeners();
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.theme_toggler.addEventListener('checked-changed', () => {
      const newTheme = this.darkThemeChosen ? 'light' : 'dark';
      this.dispatch('changeAppTheme', newTheme);
    });
    this.$.view_toggler.addEventListener('checked-changed', () => {
      const newView = this.compactViewChosen ? false : true;
      this.dispatch('toggleSuttaplexDisplay', newView);
    });
  }

  _initializeListeners() {
    this.shadowRoot.querySelectorAll('.more-menu-link').forEach((e) => {
      e.addEventListener('click', (e) => {
        this._dispatchItemSelectedEvent();
      });
    });
    this.$.language_menu.addEventListener('iron-select', (e) => {
      if (this.menuCreated) {
        this._dispatchItemSelectedEvent();
      }
      this.menuCreated = true;
    });
  }

  _dispatchItemSelectedEvent() {
    this.dispatchEvent(new CustomEvent('item-selected'));
  }

  _isDarkThemeChosen() {
    return this.appTheme === 'dark';
  }

  _isCompactViewChosen() {
    return this.appView === true;
  }
}

customElements.define('sc-more-menu', SCMoreMenu);
