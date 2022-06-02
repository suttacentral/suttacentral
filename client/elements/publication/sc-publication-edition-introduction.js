import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { API_ROOT } from '../../constants';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

class ScPublicationEditionIntroduction extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${SCPublicationStyles}
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {};
  }

  firstUpdated() {
    this._fetchIntroduction();
    this._updateNav();
    reduxActions.changeToolbarTitle('Edition Introduction');
  }

  _updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 3;
    navArray.push({
      title: 'Publications-Edition Introduction',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  async _fetchIntroduction() {
    try {
      // this.preface = await (await fetch(`${API_ROOT}/publication/edition/frontmatter/${store.getState().currentEditionId}/preface`)).json();
      this.editionFiles = await (
        await fetch(
          `https://suttacentral.net/api/publication/edition/${
            store.getState().currentEditionId
          }/files`
        )
      ).json();

      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.editionFiles) {
        if (this.editionFiles.hasOwnProperty(key) && key.includes('introduction')) {
          this.introduction = this.editionFiles[key];
        }
      }

      this.requestUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.introduction) {
      return html``;
    }
    return html` <main>${unsafeHTML(this.introduction)}</main> `;
  }
}

customElements.define('sc-publication-edition-introduction', ScPublicationEditionIntroduction);
