import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { API_ROOT } from '../../constants';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { store } from '../../redux-store';

export class SCPublicationEditionMatter extends LitLocalized(LitElement) {
  static properties = {
    matter: { type: String },
    matterContent: { type: Object },
  };

  static styles = [
    typographyCommonStyles,
    typographyStaticStyles,
    SCPublicationStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  constructor() {
    super();
    this.matter = store.getState().currentRoute.params.matter;

    console.log(this.matter);

    this._hashChangeHandler = () => {
      setTimeout(() => {
        this._scrollToSection(window.location.hash.substr(1));
      }, 0);
    };
  }

  firstUpdated() {
    this._fetchMatter();
    window.addEventListener('hashchange', this._hashChangeHandler);
  }

  _scrollToSection(sectionId, margin = 120) {
    if (!sectionId) return;
    try {
      const targetElement = this.shadowRoot.querySelector(`#${CSS.escape(sectionId)}`);
      if (targetElement) {
        targetElement.scrollIntoView();
        window.scrollTo(0, window.scrollY - margin);
      }
    } catch (e) {
      console.error(e);
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.changedRoute !== state.currentRoute) {
      this.changedRoute = state.currentRoute;
      this.matter = store.getState().currentRoute.params.matter;
      if (!this.matter) {
        return;
      }
      this._fetchMatter();
    }
  }

  _updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 3;
    navArray.push({
      title: 'Publications-Edition Preface',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  async _fetchMatter() {
    try {
      this.editionFiles = await (
        await fetch(`${API_ROOT}/publication/edition/${store.getState().currentEditionId}/files`)
      ).json();
      for (const key in this.editionFiles) {
        if (Object.hasOwn(this.editionFiles, key) && key.includes(this.matter.toLowerCase())) {
          this.matterContent = this.editionFiles[key];
        }
      }
      this.requestUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.matterContent) {
      return html``;
    }
    return html` <main>${unsafeHTML(this.matterContent)}</main> `;
  }
}

customElements.define('sc-publication-edition-matter', SCPublicationEditionMatter);
