import { LitElement } from 'lit';

import { LitLocalized } from './sc-localization-mixin';
import { store } from '../../redux-store';
import { reduxActions } from './sc-redux-actions';

export class SCStaticPage extends LitLocalized(LitElement) {
  static properties = {
    currentId: { type: String },
    siteLanguage: { type: String },
  };

  constructor() {
    super();
    this.siteLanguage = store.getState().siteLanguage;
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

    this.#loadTempLocaleIfNeeded();
  }

  #loadTempLocaleIfNeeded() {
    if (store.getState().firstLoad && store.getState().currentRoute.name === 'home') {
      reduxActions.changeFirstLoadState(false);
      return;
    }
    this.temporarySiteLanguage = store.getState().temporarySiteLanguage;
    if (this.temporarySiteLanguage && this.temporarySiteLanguage !== this.siteLanguage) {
      this.loadTemporaryLocalization(this.temporarySiteLanguage);
      window.history.replaceState(null, null, `?lang=${this.temporarySiteLanguage || this.siteLanguage}`);
      this.requestUpdate();
      reduxActions.changeTemporarySiteLanguage(this.siteLanguage);
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
    }
  }

  _scrollToSection(sectionId, currentId) {
    if (!sectionId || currentId === sectionId) {
      return currentId;
    }
    const { currentRoute } = store.getState();
    if (currentRoute && currentRoute.params && currentRoute.params.suttaId) {
      return currentId;
    }
    try {
      const firstSection =
        this.querySelector(sectionId) || this.shadowRoot?.querySelector(sectionId);
      if (firstSection) {
        firstSection.scrollIntoView({
          behavior: 'instant',
          block: 'start',
          inline: 'nearest',
        });
      }
    } catch (err) {
      console.error(err);
    }
    return sectionId;
  }
}
