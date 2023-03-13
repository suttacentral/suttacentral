import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { API_ROOT } from '../../constants';
import { reduxActions } from '../addons/sc-redux-actions';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { store } from '../../redux-store';
import { allEditions } from './sc-publication-common';

export class SCPublicationEditionMatter extends LitLocalized(LitElement) {
  static properties = {
    matter: { type: String },
    matterContent: { type: Object },
  };

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  constructor() {
    super();
    this.currentRoute = store.getState().currentRoute;
    this.matter = store.getState().currentRoute.params.matter;
    this.editionUid = store.getState().currentRoute.params.editionUid;
    this.editionId = allEditions.find(
      x => x.uid === this.editionUid && x.edition_id?.includes('web')
    )?.edition_id;
    this.#loadNewResult();
    if (this.editionId) {
      reduxActions.changeCurrentEditionId(this.editionId);
      this.requestUpdate();
    }
  }

  async #fetchEditionDetails() {
    try {
      this.editionDetail = await (await fetch(`${API_ROOT}/menu/${this.editionUid}`)).json();
      if (this.editionDetail && this.editionDetail.length !== 0) {
        this.#updateNav();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async #fetchEditionInfo() {
    try {
      this.editionInfo = await (
        await fetch(`${API_ROOT}/publication/edition/${this.editionId}`)
      ).json();
      if (this.editionDetail && this.editionDetail.length !== 0) {
        reduxActions.changeToolbarTitle(
          `${this.editionDetail[0].root_name} — ${this.editionInfo.publication.creator_name}`
        );

        reduxActions.changeCurrentEditionHomeInfo({
          title: this.editionDetail[0]?.translated_name?.replace('Collection', ''),
          url: `/edition/${this.editionUid}/${this.currentRoute.params.langIsoCode}/${this.currentRoute.params.authorUid}`,
          root_title: this.editionDetail[0].root_name,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async #loadNewResult() {
    await this.#fetchMatter();
    await this.#fetchEditionDetails();
    await this.#fetchEditionInfo();
    this.requestUpdate();
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.changedRoute !== state.currentRoute) {
      this.changedRoute = state.currentRoute;
      this.matter = store.getState().currentRoute.params.matter;
      if (!this.matter) {
        return;
      }
      this.#fetchMatter();
    }
  }

  #updateNav() {
    if (!this.editionDetail || !this.editionDetail[0]) {
      return;
    }
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: 'Editions',
      url: `/editions`,
      type: 'PublicationPage',
    });
    navArray.push({
      title: `${this.editionDetail[0]?.translated_name?.replace('Collection', '') || 'edition'}`,
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  async #fetchMatter() {
    try {
      this.editionFiles = await (
        await fetch(`${API_ROOT}/publication/edition/${this.editionId}/files`)
      ).json();
      for (const key in this.editionFiles) {
        if (Object.hasOwn(this.editionFiles, key) && key.includes(this.matter.toLowerCase())) {
          this.matterContent = this.editionFiles[key];
        }
      }
      this.requestUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    if (!this.matterContent) {
      return html``;
    }
    return html`
      <style>
        ${typographyCommonStyles}
        ${typographyStaticStyles}
        ${SCPublicationStyles}
      </style>
      <main>${unsafeHTML(this.matterContent)}</main>
    `;
  }
}

customElements.define('sc-publication-edition-matter', SCPublicationEditionMatter);
