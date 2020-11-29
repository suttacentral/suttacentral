import { LitElement, html, css } from 'lit-element';
import { store } from '../../redux-store.js';
import './sc-language-base-menu.js';
import { LitLocalized } from '../addons/localization-mixin.js'

/*
Basic more-vert menu on the main toolbar for choice of language and for choosing static pages
*/

class SCMoreMenu extends LitLocalized(LitElement) {
  render() {
    return html`
      <style>
 .more-menu-link
{
    text-decoration: none;

    color: inherit;
}

.more-menu-item .more-menu-icon
{
    margin-right: var(--sc-size-md);

    color: var(--sc-disabled-text-color);
}

.more-menu-item
{
    position: relative;

    display: flex;

    min-height: 48px;
    padding: 0 16px;

    color: var(--sc-primary-text-color);
    border: none;
    outline: none;

    align-items: center;
}

.more-menu-item:hover
{
    background-color: var(--sc-tertiary-background-color);
}

.more-menu-item.language-choice-box:hover
{
    background-color: unset;
}

#language_menu:after
{
    content: '   ';
}

.pwa-icon
{
    fill: var(--sc-primary-color);
}

.separator
{
    overflow: hidden;

    width: 100%;
    height: 1px;
    margin-top: var(--sc-size-xxs);
    margin-bottom: var(--sc-size-xxs);

    background-color: var(--sc-border-color);
}

morph-ripple 
{
      --ripple-color: var(--sc-primary-color);
}
      </style>

      <div class="more-menu-item language-choice-box" role="option" tabindex="0" aria-disabled="false">
        <iron-icon class="more-menu-icon" icon="sc-iron-icons:language"></iron-icon>
        <sc-language-base-menu id="language_menu" noRoot="true"></sc-language-base-menu>
      </div>
      <a class="more-menu-link" href="/donations">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-svg-icons:pray"></iron-icon>
          ${this.localize('Donations')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <a class="more-menu-link" href="/offline">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon pwa-icon" icon="sc-svg-icons:pwa"></iron-icon>
          ${this.localize('UseOffline')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <a class="more-menu-link" href="/downloads">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:file-download"></iron-icon>
          ${this.localize('Downloads')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <a class="more-menu-link" href="/languages">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:translate"></iron-icon>
          ${this.localize('Languages')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <div class="separator"></div>
      <a class="more-menu-link" href="/numbering">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:format-list-numbered"></iron-icon>
          ${this.localize('Numbering')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <a class="more-menu-link" href="/abbreviations">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-svg-icons:abbreviations"></iron-icon>
          ${this.localize('Abbreviations')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <a class="more-menu-link" href="/methodology">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-svg-icons:school"></iron-icon>
          ${this.localize('Methodology')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <div class="separator"></div>
      <a class="more-menu-link" href="/acknowledgments">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-svg-icons:people"></iron-icon>
          ${this.localize('Acknowledgments')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <a class="more-menu-link" href="/licensing">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:copyright"></iron-icon>
          ${this.localize('Licensing')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <a class="more-menu-link" href="/about">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:info-outline"></iron-icon>
          ${this.localize('About')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
      <a class="more-menu-link" href="${this.getDiscourseUrl(this.routeName)}"
        title="${this.getDiscourseTitle(this.routeName)}" target="_blank" rel="noopener noreferrer">
        <div class="more-menu-item" role="option" tabindex="0" aria-disabled="false">
          <iron-icon class="more-menu-icon" icon="sc-iron-icons:forum"></iron-icon>
          ${this.localize('Discuss')}
          <morph-ripple></morph-ripple>
        </div>
      </a>
    `;
  }

  static get properties() {
    return {
      menuCreated: { type: Boolean },
      localizedStringsPath: { type: String },
      compactViewChosen: { type: Boolean },
      routeName: { type: String },
    };
  }

  constructor() {
    super();
    this.menuCreated = false;
    this.localizedStringsPath = '/localization/elements/sc-more-menu';
    this.routeName = store.getState().currentRoute.name;
  }

  get actions() {
    return {
      toggleSuttaplexDisplay(view) {
        store.dispatch({
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay: view
        })
      }
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.routeName !== state.currentRoute.name) {
      this.routeName = state.currentRoute.name;
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
    const title = (routeName === 'SUTTA' ? 'joinDiscussion' : 'discussSuttas');
    return this.localize(title);
  }

  firstUpdated() {
    this._initializeListeners();
  }

  _initializeListeners() {
    this.shadowRoot.querySelectorAll('.more-menu-link').forEach((e) => {
      e.addEventListener('click', (e) => {
        this._dispatchItemSelectedEvent();
      });
    });

    const languageMenuElement = this.shadowRoot.getElementById('language_menu');
    if (languageMenuElement) {
      languageMenuElement.addEventListener('iron-select', (e) => {
        if (this.menuCreated) {
          this._dispatchItemSelectedEvent();
        }
        this.menuCreated = true;
      });
    }
  }

  _dispatchItemSelectedEvent() {
    this.dispatchEvent(new CustomEvent('item-selected'));
  }
}

customElements.define('sc-more-menu', SCMoreMenu);
