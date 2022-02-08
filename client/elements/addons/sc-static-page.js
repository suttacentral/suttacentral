/* eslint-disable import/prefer-default-export */
import { LitElement } from 'lit';

import { LitLocalized } from './sc-localization-mixin';
import { store } from '../../redux-store';
import { API_ROOT } from '../../constants';
import { getURLParam } from './sc-functions-miscellaneous';
import { reduxActions } from './sc-redux-actions';

export class SCStaticPage extends LitLocalized(LitElement) {
  static get properties() {
    return {
      currentId: { type: String },
      siteLanguage: { type: String },
    };
  }

  constructor() {
    super();
    this.siteLanguage = store.getState().siteLanguage;
  }

  connectedCallback() {
    super.connectedCallback();
    // this._fetchLanguageList();
    const { currentRoute } = store.getState();
    if (!this.getUrlLangParam && currentRoute.path !== '/') {
      this._updateUrlParams();
    }
    if (this.getUrlLangParam !== store.getState().siteLanguage && currentRoute.path !== '/') {
      this.changeSiteLanguage(this.getUrlLangParam);
    }
  }

  firstUpdated() {
    const targetMainElement = this.querySelector('main') || this.shadowRoot?.querySelector('main');

    if (targetMainElement) {
      targetMainElement.addEventListener('click', () => {
        setTimeout(() => {
          this.currentId = this._scrollToSection(window.location.hash, this.currentId);
        });
      });
    }

    window.addEventListener('hashchange', () => {
      setTimeout(() => {
        this.currentId = this._scrollToSection(window.location.hash, this.currentId);
      });
    });

    this.currentId = this._scrollToSection(window.location.hash, this.currentId);
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._updateUrlParams();
    }
  }

  _scrollToSection(sectionId, currentId) {
    if (!sectionId || currentId === sectionId) {
      return currentId;
    }
    const firstSection = this.querySelector(sectionId) || this.shadowRoot.querySelector(sectionId);
    if (firstSection) {
      firstSection.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }
    return sectionId;
  }

  _updateUrlParams() {
    window.history.replaceState(null, null, `?lang=${store.getState().siteLanguage}`);
  }

  get getUrlLangParam() {
    return getURLParam(window.location.href, 'lang');
  }

  async changeSiteLanguage(lang) {
    await this._fetchLanguageList();
    if (!this.languageListResponse || this.languageListResponse.length === 0) {
      return;
    }
    try {
      const chosenLanguage = this.languageListResponse.find(x => x.iso_code === lang);
      if (chosenLanguage) {
        reduxActions.changeLanguage(chosenLanguage.iso_code, chosenLanguage.name);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async _fetchLanguageList() {
    try {
      this.languageListResponse = await (await fetch(`${API_ROOT}/languages?all=true`)).json();
      this.languageListResponse = this.languageListResponse.filter(
        lang => !lang.is_root && lang.localized
      );
    } catch (e) {
      console.error(e);
    }
  }
}
