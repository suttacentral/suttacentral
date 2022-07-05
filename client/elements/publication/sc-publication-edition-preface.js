import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { API_ROOT } from '../../constants';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

class ScPublicationEditionPreface extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${typographyCommonStyles}
      ${typographyStaticStyles}
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
    console.log(store.getState().currentEditionId);
    this._fetchPreface();
    this._updateNav();
    reduxActions.changeToolbarTitle('Edition Preface');
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

  async _fetchPreface() {
    try {
      this.editionFiles = await (
        await fetch(`${API_ROOT}/publication/edition/${store.getState().currentEditionId}/files`)
      ).json();
      // this.editionFiles = await (await fetch(`https://suttacentral.net/api/publication/edition/${store.getState().currentEditionId}/files`)).json();
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.editionFiles) {
        if (this.editionFiles.hasOwnProperty(key) && key.includes('preface')) {
          this.preface = this.editionFiles[key];
        }
      }
      this.requestUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.preface) {
      return html``;
    }
    return html` <main>${unsafeHTML(this.preface)}</main> `;
  }
}

customElements.define('sc-publication-edition-preface', ScPublicationEditionPreface);
