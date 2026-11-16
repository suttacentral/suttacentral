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
import { dispatchCustomEvent } from '../../utils/customEvent';
import { allEditions } from './sc-publication-common';

export class SCPublicationEditionMatter extends LitLocalized(LitElement) {
  #loadVersion = 0;
  #anchorPending = false;
  #anchorFrame;
  #renderedMatterContent;
  #metadataInputs;

  static properties = {
    matter: { type: String },
    editionFiles: { type: Object },
    editionDetail: { state: true },
    editionInfo: { state: true },
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
    this.editionId = this.#findWebEditionId(this.editionUid);
    this.#loadNewResult();
    if (this.editionId) {
      reduxActions.changeCurrentEditionId(this.editionId);
    }
  }

  #findWebEditionId(uid) {
    return allEditions.find(edition => edition.uid === uid && edition.edition_id?.includes('web'))
      ?.edition_id;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this.#requestAnchorScroll);
    this.addEventListener('click', this.#handleAnchorClick);
    this.#requestAnchorScroll();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.#requestAnchorScroll);
    this.removeEventListener('click', this.#handleAnchorClick);
    cancelAnimationFrame(this.#anchorFrame);
    this.#anchorPending = false;
  }

  #requestAnchorScroll = () => {
    if (!window.location.hash) {
      this.#anchorPending = false;
      cancelAnimationFrame(this.#anchorFrame);
      return;
    }
    this.#anchorPending = true;
    this.#scheduleAnchorScroll();
  };

  #handleAnchorClick = event => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const link = event.composedPath().find(element => element.tagName === 'A');
    if (
      !link?.hasAttribute('href') ||
      !this.querySelector('main')?.contains(link) ||
      link.hasAttribute('download') ||
      (link.target && link.target !== '_self')
    ) {
      return;
    }
    let url;
    try {
      url = new URL(link.href, document.baseURI);
    } catch {
      event.preventDefault();
      return;
    }
    if (
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash &&
      url.hash === window.location.hash
    ) {
      event.preventDefault();
      this.#requestAnchorScroll();
    }
  };

  updated() {
    const matterContent = this.#renderMatter();
    const contentChanged = matterContent !== this.#renderedMatterContent;
    this.#renderedMatterContent = matterContent;
    if (!matterContent) {
      this.#metadataInputs = undefined;
      return;
    }
    const metadataInputs = [this.matter, matterContent, this.editionDetail, this.editionInfo];
    if (
      !this.#metadataInputs ||
      metadataInputs.some((value, i) => value !== this.#metadataInputs[i])
    ) {
      this.#metadataInputs = metadataInputs;
      this.#updateMetaData();
    }
    if (contentChanged && window.location.hash) {
      this.#anchorPending = true;
    }
    this.#scheduleAnchorScroll();
  }

  #scheduleAnchorScroll() {
    if (
      !this.#anchorPending ||
      !this.isConnected ||
      this.isUpdatePending ||
      !this.#renderedMatterContent ||
      this.#renderedMatterContent !== this.#renderMatter()
    ) {
      return;
    }
    cancelAnimationFrame(this.#anchorFrame);
    this.#anchorFrame = requestAnimationFrame(() => {
      this.#anchorFrame = undefined;
      if (
        !this.isConnected ||
        this.isUpdatePending ||
        !this.#anchorPending ||
        this.#renderedMatterContent !== this.#renderMatter()
      ) {
        return;
      }
      this.#anchorPending = false;
      this.#scrollToAnchor();
    });
  }

  #scrollToAnchor() {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      return;
    }
    let id;
    try {
      id = decodeURIComponent(hash);
    } catch {
      return;
    }
    const target = this.querySelector(`main #${CSS.escape(id)}`);
    if (!target) {
      return;
    }
    const toolbar = document.getElementById('universal_toolbar');
    const toolbarStyle = toolbar && getComputedStyle(toolbar);
    const offset =
      toolbarStyle && ['sticky', 'fixed'].includes(toolbarStyle.position)
        ? toolbar.offsetHeight + (parseFloat(toolbarStyle.top) || 0) + 12
        : 0;
    this.style.setProperty('--edition-anchor-offset', `${offset}px`);
    target.scrollIntoView({ behavior: 'instant', block: 'start', inline: 'nearest' });
  }

  async #fetchEditionDetails() {
    try {
      return await (await fetch(`${API_ROOT}/menu/${this.editionUid}`)).json();
    } catch (error) {
      console.error(error);
    }
  }

  async #fetchEditionInfo() {
    if (!this.editionId) {
      return;
    }
    try {
      return await (await fetch(`${API_ROOT}/publication/edition/${this.editionId}`)).json();
    } catch (error) {
      console.error(error);
    }
  }

  async #loadNewResult() {
    const version = ++this.#loadVersion;
    if (!this.editionId) return;
    const matterRequest = this.#fetchMatter(version);
    const [details, info] = await Promise.all([
      this.#fetchEditionDetails(),
      this.#fetchEditionInfo(),
    ]);
    if (version !== this.#loadVersion) return;
    this.editionDetail = details;
    this.editionInfo = info;
    this.#updateNav();
    reduxActions.changeToolbarTitle(
      [details?.[0]?.root_name, info?.publication?.creator_name].filter(Boolean).join(' — ') ||
        this.matter
    );
    reduxActions.changeCurrentEditionHomeInfo({
      title: details?.[0]?.translated_name?.replace('Collection', '') || this.editionUid,
      url: `/edition/${this.editionUid}/${this.currentRoute.params.langIsoCode}/${this.currentRoute.params.authorUid}`,
    });
    await matterRequest;
  }

  stateChanged(state) {
    super.stateChanged(state);
    const route = state.currentRoute;
    if (route === this.currentRoute) {
      return;
    }
    this.currentRoute = route;
    if (route.name !== 'publicationEditionMatter') {
      cancelAnimationFrame(this.#anchorFrame);
      this.#anchorPending = false;
      return;
    }
    const matterChanged = route.params.matter !== this.matter;
    this.matter = route.params.matter;
    if (route.params.editionUid !== this.editionUid) {
      this.editionUid = route.params.editionUid;
      this.editionId = this.#findWebEditionId(this.editionUid);
      this.editionFiles = undefined;
      this.editionDetail = undefined;
      this.editionInfo = undefined;
      this.#loadNewResult();
      if (this.editionId) reduxActions.changeCurrentEditionId(this.editionId);
    } else if (matterChanged) {
      this.#updateNav();
    }
    this.#requestAnchorScroll();
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

  async #fetchMatter(version) {
    try {
      const files = await (
        await fetch(`${API_ROOT}/publication/edition/${this.editionId}/files`)
      ).json();
      if (version !== this.#loadVersion) return;
      this.editionFiles = files;
    } catch (error) {
      console.error(error);
    }
  }

  #renderMatter() {
    if (!this.matter || !this.editionFiles) {
      return;
    }

    const key = `./matter/${this.matter}.html`
    return this.editionFiles[key];
  }

  #updateMetaData() {
    const description =
      this.querySelector('main h1')?.textContent?.trim() || this.matter || 'SuttaCentral';
    const editionTitle = [
      this.editionDetail?.[0]?.root_name,
      this.editionInfo?.publication?.creator_name,
    ]
      .filter(Boolean)
      .join(' — ');
    const title = editionTitle
      ? [editionTitle, this.matter].filter(Boolean).join(' - ')
      : description;
    dispatchCustomEvent(document, 'metadata', {
      pageTitle: title,
      title,
      description,
    });
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const matterContent = this.#renderMatter();
    if (!matterContent) {
      return html``;
    }
    return html`
      <style>
        ${typographyCommonStyles}
        ${typographyStaticStyles}
        ${SCPublicationStyles}
      </style>
      <style>
        sc-publication-edition-matter main [id] {
          scroll-margin-top: var(--edition-anchor-offset, 0px);
        }
      </style>
      <main>${unsafeHTML(matterContent)}</main>
    `;
  }
}

customElements.define('sc-publication-edition-matter', SCPublicationEditionMatter);
