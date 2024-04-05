import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { icon } from '../../img/sc-icon';
import { SCPublicationEditionsStyles } from '../styles/sc-publication-editions-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';
import { API_ROOT } from '../../constants';

class ScPublicationEditions extends LitLocalized(LitElement) {
  static properties = {
    webEditionInfo: { type: Array },
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
    this.webEditionInfo = [];
    this.editionBlurbs = [];
    this.localizedStringsPath = '/localization/elements/publication';
    this.coverImage = new Map([
      ['dn', 'dn-book.jpg'],
      ['mn', 'mn-book.jpg'],
      ['sn', 'sn-book.jpg'],
      ['an', 'an-book.jpg'],
      ['dhp', 'dhp-book.jpg'],
      ['ud', 'ud-book.jpg'],
      ['iti', 'iti-book.jpg'],
      ['snp', 'snp-book.jpg'],
      ['thag', 'thag-book.jpg'],
      ['thig', 'thig-book.jpg'],
      ['pli-tv-vi', 'pli-tv-vi-book.jpg'],
    ]);
  }

  firstUpdated() {
    this.#updateNav();
    reduxActions.changeToolbarTitle(this.localize('publication:editionsToolbarTitle'));
    document.querySelector('sc-site-layout')?.hideATB();
    this.#loadData();
  }

  async #loadData() {
    await this.#getWebEditionIds();
  }

  async #getWebEditionIds() {
    try {
      this.allEditions = await (await fetch(`${API_ROOT}/publication/editions`)).json();
      if (!this.allEditions) {
        return;
      }
      this.webEditionIds = [];
      this.webEditionInfo = [];
      for (const edition of this.allEditions) {
        if (edition.edition_id.includes('-web_')) {
          this.webEditionIds.push(edition.edition_id);
        }
      }
      for (const editionId of this.webEditionIds) {
        this.#fetchEditionInfo(editionId);
      }
      await this.#fetchEditionBlurbs('en');
      this.requestUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  #sortWebEditionInfoByUid() {
    this.webEditionInfo.sort((start, next) => {
      const order = [
        'dn',
        'mn',
        'sn',
        'an',
        'dhp',
        'ud',
        'iti',
        'snp',
        'thag',
        'thig',
        'pli-tv-vi',
      ];
      return order.indexOf(start.edition.text_uid) - order.indexOf(next.edition.text_uid);
    });
  }

  async #fetchEditionInfo(editionId) {
    try {
      this.editionInfo = await (await fetch(`${API_ROOT}/publication/edition/${editionId}`)).json();
      this.webEditionInfo.push(this.editionInfo);
    } catch (error) {
      console.error(error);
    }
  }

  async #fetchEditionBlurbs(lang) {
    try {
      this.editionBlurbs = await (
        await fetch(`${API_ROOT}/publication/edition/blurbs/${lang}`)
      ).json();
    } catch (error) {
      console.error(error);
    }
  }

  #updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: 'Editions',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  createRenderRoot() {
    return this;
  }

  #allEditionsTemplate() {
    return html`
      ${this.webEditionInfo?.map(
        edition => html`
          <section class="project">
            <hgroup>
              <h2 class="translation_title">${edition.publication.translation_title}</h2>
              <span class="translation_subtitle">${edition.publication.translation_subtitle}</span>
            </hgroup>
            <p class="creator_name">${edition.publication.creator_name}</p>
            <div class="link-button-container">
              <a
                class="link-button block-link"
                href="/edition/${edition.publication.text_uid}/${edition.publication
                  .translation_lang_iso}/${edition.publication.creator_uid}"
                >Get this book</a
              >
            </div>
            <p class="publication_blurb">
              <img
                src="/img/publication-pages/${this.coverImage.get(edition.publication.text_uid)}"
                alt="Cover art for ${edition.publication.translation_title}"
              />
              ${unsafeHTML(
                this.editionBlurbs.find(x => x.uid === edition.publication.text_uid)?.blurb
              )}
            </p>
          </section>
        `
      )}
    `;
  }

  render() {
    this.#sortWebEditionInfoByUid();
    return html`
      <style>
        ${typographyCommonStyles} ${typographyStaticStyles} ${SCPublicationEditionsStyles}
      </style>
      <main>
        <article>
          <hgroup class="page-header">
            <h1>${this.localize('publication:suttaCentralEditions')}</h1>
            <p class="subtitle">${this.localize('publication:editionsSubtitle')}</p>
          </hgroup>
        <div class='editions-top-sections'>

        <section class='editions-header'>
          <img class="main-image" src="/img/publication-pages/editions-kn-wet.jpg" />
          <p>${this.localize('publication:editions1')}</p>
          <p>${this.localize('publication:editions2')}</p>
          </section>

          <section class="down-all">
            <ul>
              <li>${icon.open_book} ${this.localize('publication:orderPrint')}</li>
              <li>
                ${icon.file_download}
                <a href="https://github.com/suttacentral/editions/archive/refs/heads/main.zip"
                  >${this.localize('publication:download')}</a>
              </li>
              <li>
                ${icon.external}
                <a href="https://github.com/suttacentral/editions">${this.localize('publication:githubSource')}</a></li>
            </ul>
            <aside>
              <b>${this.localize('publication:aboutTitle')}</b>
              <p>${this.localize('publication:about1')}</p>
              <p>${this.localize('publication:about2')}</p>
              <p>${this.localize('publication:about3')}</p>
              <p>${this.localize('publication:about4')}</p>
            </aside>
          </section>
          </div>
          <section class='all-editions'>
          ${this.#allEditionsTemplate()}
          </section>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-publication-editions', ScPublicationEditions);
