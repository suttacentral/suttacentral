import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/iron-dropdown/iron-dropdown-scroll-manager.js';
import '@polymer/iron-collapse/iron-collapse.js';

import '../suttaplex/card/sc-suttaplex.js';
import { ReduxMixin } from '../../redux-store.js';
import { Localized } from '../addons/localization-mixin.js';
import { suttaplexStyles } from '../styles/sc-suttaplex-styles.js';

/*
Pulls in one relevant suttaplex-card inside a collapse-item to display on top of each sutta text.
*/

class SCTextOptions extends ReduxMixin(Localized(PolymerElement)) {
  static get template() {
    return html`
    ${suttaplexStyles}
    <style>
      .container {
        padding: var(--sc-size-lg) 5% 0 !important;
        margin: 0 auto;
        max-width: 720px;
        display: flex;
        flex-direction: column;
      }

      .heading {
        display: flex;
        justify-content: flex-end;
      }

      .heading paper-icon-button {
        margin-left: 16px;
      }

      .sutta-list {
        max-width: 720px;
        transition: margin-top 0.3s, margin-bottom 0.3s;
        margin: 0 auto var(--sc-size-xxl);
      }

      .sc-tooltip {
        --paper-tooltip-opacity: 0.98;
        --paper-tooltip-background: var(--sc-paper-tooltip-color);
        --paper-tooltip: {
          @apply --sc-skolar-font-size-xs;
          line-height: var(--sc-size-md);
          padding: var(--sc-size-sm) var(--sc-size-md);
          text-shadow: 0 0 var(--sc-secondary-background-color);
          white-space: normal;
        };
      }

    </style>

    <div class="container">
      <div class="heading">
        <template is="dom-if" if="[[metaArea]]">
          <paper-icon-button id="text_info_button" icon="sc-iron-icons:info" on-tap="_openInfoDialog" aria-label$="{{localize('information')}}"></paper-icon-button>
          <paper-tooltip class="sc-tooltip" for="text_info_button" offset="0">
            {{localize('information')}}
          </paper-tooltip>
        </template>
        <paper-icon-button id="text_settings_button" icon="sc-iron-icons:settings" on-tap="_openSettingsDialog" aria-label$="{{localize('textSettings')}}"></paper-icon-button>
        <paper-tooltip class="sc-tooltip" for="text_settings_button" offset="0">
          {{localize('textSettings')}}
        </paper-tooltip>
        <paper-icon-button id="suttaplex_button" icon="[[_toggleIcon]]" on-tap="_toggleOpened" aria-label$="{{localize('viewParallels')}}"></paper-icon-button>
        <paper-tooltip class="sc-tooltip" for="suttaplex_button" offset="0" fit-to-visible-bounds="">
          {{localize('viewParallels')}}
        </paper-tooltip>
      </div>

      <iron-collapse opened="{{opened}}">
        <div class="sutta-list">
          <sc-suttaplex item="[[suttaplexItem]]"></sc-suttaplex>
        </div>
      </iron-collapse>
    </div>`;
  }

  static get properties() {
    return {
      _toggleIcon: {
        type: String,
        computed: '_computeToggleIcon(opened)'
      },
      suttaplexItem: {
        type: Object
      },
      opened: Boolean,
      metaArea: {
        type: String,
        statePath: 'suttaMetaText'
      },
      localizedStringsPath: {
        type: String,
        value: '/localization/elements/sc-text-options'
      }
    }
  }

  _toggleOpened() {
    this.opened = !this.opened;
  }

  _closeSuttaplex() {
    this.opened = false;
  }

  _computeToggleIcon() {
    return this.opened ? 'sc-iron-icons:expand-less' : 'sc-iron-icons:expand-more';
  }

  _openSettingsDialog() {
    this.dispatchEvent(new CustomEvent('open-dialog', {
      detail: { id: 'settings_dialog' },
      composed: true,
      bubbles: true
    }));
  }

  _openInfoDialog() {
    this.dispatchEvent(new CustomEvent('open-dialog', {
      detail: { id: 'info_dialog' },
      composed: true,
      bubbles: true
    }));
  }
}

customElements.define('sc-text-options', SCTextOptions);
