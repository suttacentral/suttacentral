import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@material/web/elevation/elevation';
import '@material/web/button/outlined-button';
import '@material/web/iconbutton/outlined-icon-button';

import { SCStaticPage } from '../addons/sc-static-page';
import { API_ROOT } from '../../constants';
import '../navigation/sc-navigation-tipitaka';
import { icon } from '../../img/sc-icon';
import { staticHomeStyles } from '../styles/sc-static-home-styles';
import { isMobileBrowser } from '../addons/sc-functions-miscellaneous';
import { store } from '../../redux-store';
import { reduxActions } from '../addons/sc-redux-actions';

export class SCStaticHomePage extends SCStaticPage {
  static properties = {
    randomEpigraph: { type: String },
    whyWeRead: { type: String },
    tipitaka: { type: Array },
    displayDonationBanner: { type: Boolean },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/home';
    this.siteLanguage = store.getState().siteLanguage;
    this.displayDonationBanner = store.getState().displayDonationBanner;
    this.#fetchDataForHomePage();
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.displayDonationBanner !== state.displayDonationBanner) {
      this.displayDonationBanner = state.displayDonationBanner;
    }
  }

  async #fetchDataForHomePage() {
    try {
      const api = `${API_ROOT}/homepage_data?language=${this.siteLanguage || 'en'}&r=${Math.random()}`;
      const response = await fetch(api);
      const dataForHomepage = await response.json();
      const getRandomEl = arr => arr[Math.floor(Math.random() * arr.length)];
      this.randomEpigraph = getRandomEl(dataForHomepage.epigraphs);
      this.whyWeRead = getRandomEl(dataForHomepage.whyweread);
      this.tipitaka = dataForHomepage.tipitaka;
      const sortedUids = ['sutta', 'vinaya', 'abhidhamma'];
      this.tipitaka.sort((a, b) => sortedUids.indexOf(a.uid) - sortedUids.indexOf(b.uid));
    } catch (err) {
      console.error(err);
    }
  }

  createRenderRoot() {
    return this;
  }

  #publicationEditionsTemplate() {
    return html`
      <div class="editions-card">
        <section class="plain editions">
          <a class="block-link" href="/editions">
            <h2>${unsafeHTML(this.localize('home:43'))}</h2>
            ${this.#publicationEditionsPictureTemplate()}
            <div class="call-to-action">${unsafeHTML(this.localize('home:44'))}</div>
            <md-ripple></md-ripple>
            <md-elevation></md-elevation>
          </a>
          ${this.#pirivenasProjectCardTemplate()}
        </section>
      </div>
    `;
  }

  #publicationEditionsPictureTemplate() {
    return isMobileBrowser()
      ? ''
      : html`
          <figure>
            <picture>
              <source srcset="/img/home-page/editions2.avif" type="image/avif" />
              <img
                src="/img/home-page/editions.jpg"
                alt="SuttaCentral editions covers"
                style="width:100%"
              />
            </picture>
          </figure>
        `;
  }

  #tipitakaSectionTemplate() {
    return html`
      <section class="tipitaka-section">
        <h2>${unsafeHTML(this.localize('home:1'))}</h2>
      </section>
    `;
  }

  #changeDonationBannerDisplayState() {
    reduxActions.changeDonationBannerDisplayState(false);
  }

  #videoTemplate() {
    return html`
      <section class="video">
        <video
          width="640"
          height="360"
          controls
          preload="none"
          poster="/img/home-page/video_overlay.jpg"
        >
          <source
            src="https://ia601508.us.archive.org/20/items/sutta-central-promo-2020-en.av-1/SuttaCentral_Promo-2020_en.av1.mp4"
            type="video/mp4"
          />
          <source
            src="https://ia601508.us.archive.org/12/items/sutta-central-promo-2020-en-vp-9/SuttaCentral_Promo-2020_en_VP9.webm"
            type="video/webm"
          />
          <source
            src="https://ia801504.us.archive.org/23/items/sutta-central-promo-2020-en-x-264/SuttaCentral_Promo-2020_en_x264.mp4"
            type="video/mp4"
          />
        </video>
      </section>
    `;
  }

  #BuddhaWordsTemplate() {
    return html`
      <h2>${unsafeHTML(this.localize('home:5'))}</h2>
      <blockquote>
        <span>${this.randomEpigraph ? this.randomEpigraph.epigraph : ''}</span>
      </blockquote>
      <a
        class="link-button block-link"
        href=${this.randomEpigraph ? `/${this.randomEpigraph.uid}` : ''}
      >
        ${unsafeHTML(this.localize('home:6'))}
        <md-ripple></md-ripple>
      </a>
    `;
  }

  #introductionTemplate() {
    return html`
      <article class="card">
        <a class="block-link" href="/introduction">
          <figure>
            <picture>
              <source srcset="/img/home-page/pali2.avif" type="image/avif" />
              <img src="/img/home-page/pali1.jpg" alt="Pali manuscript" style="width:100%" />
            </picture>
            <figcaption>${unsafeHTML(this.localize('home:7'))}</figcaption>
          </figure>

          <div class="card-content">
            <div class="card-text">
              <h2>${unsafeHTML(this.localize('home:8'))}</h2>
              <p>${unsafeHTML(this.localize('home:9'))}</p>
            </div>
          </div>
        </a>
        <md-ripple></md-ripple>
      </article>
    `;
  }

  #getStartedTemplate() {
    return html`
      <article class="card">
        <a class="block-link" href="/start">
          <figure>
            <picture>
              <source srcset="/img/home-page/koreana2.avif" type="image/avif" />
              <img
                src="/img/home-page/koreana.jpg"
                alt="Chinese Buddhist woodblock"
                style="width:100%"
              />
            </picture>
            <figcaption>${unsafeHTML(this.localize('home:11'))}</figcaption>
          </figure>

          <div class="card-content">
            <div class="card-text">
              <h2>${unsafeHTML(this.localize('home:12'))}</h2>
              <p>${unsafeHTML(this.localize('home:13'))}</p>
            </div>
          </div>
        </a>
        <md-ripple></md-ripple>
      </article>
    `;
  }

  #relatedProjectsHeaderTemplate() {
    return html`
      <h2>${unsafeHTML(this.localize('home:15'))}</h2>
      <a class="block-link" href="https://suttacentral.github.io/awesome/">
        <span>${unsafeHTML(this.localize('home:48'))}</span>
        ${icon.arrow_right}
      </a>
    `;
  }

  #scVoiceCardTemplate() {
    return html`
      <article class="card dark-accent">
        <a
          href="https://www.api.sc-voice.net/scv/ebt-site/site/${this.language}"
          target="_blank"
          class='block-link'
          rel="noopener noreferrer"
        >
          <header>
            <span>${icon.speaker}</span>
            <h3>
              <span>SuttaCentral Voice</span>
              <span class="sc-related-item-subtitle">
                ${unsafeHTML(this.localize('home:17'))}
              </span>
            </h3>
          </header>

          <div class="related-projects-content">
            <p>${unsafeHTML(this.localize('home:18'))}</p>
            <ul>
              <li>${unsafeHTML(this.localize('home:19'))}</li>
              <li>${unsafeHTML(this.localize('home:20'))}.</li>
            </ul>
          </div>
        </a>
        <md-ripple></md-ripple>
      </article>
    `;
  }

  #buddhaNexusCardTemplate() {
    return html`
      <article class="card secondary-accent">
        <a href="https://buddhanexus.net/" class="block-link">
          <header>
            <span>
              <picture>
                <source srcset="/img/home-page/buddhanexus_logo.avif" type="image/avif" />
                <img src="/img/home-page/buddhanexus_logo.png" alt="Buddhanexus logo" />
              </picture>
            </span>
            <h3>
              <span>BuddhaNexus</span>
              <span class="sc-related-item-subtitle">${unsafeHTML(this.localize('home:22'))}</span>
            </h3>
          </header>
          <div class="related-projects-content">
            <p>${unsafeHTML(this.localize('home:23'))}</p>
          </div>
        </a>
        <md-ripple></md-ripple>
      </article>
    `;
  }

  #scForumCardTemplate() {
    return html`
      <article class="card primary-color">
        <a
          href="https://discourse.suttacentral.net/"
          class="block-link"
        >
          <header>
            <span>${icon.people}</span>
            <h3>
              <span>Discuss & Discover</span>
              <span class="sc-related-item-subtitle">${unsafeHTML(this.localize('home:25'))}</span>
            </h3>
          </header>

          <div class="related-projects-content">
            <p>${unsafeHTML(this.localize('home:26'))}</p>
            <ul>
              <li>${unsafeHTML(this.localize('home:27'))}</li>
              <li>${unsafeHTML(this.localize('home:28'))}</li>
              <li>${unsafeHTML(this.localize('home:29'))}</li>
            </ul>
          </div>
        </a>
        <md-ripple></md-ripple>
      </article>
    `;
  }

  #bilaraCardTemplate() {
    return html`
      <article class="card primary-accent">
        <a
          href="https://buddhism.net/"
          class="block-link"
        >
          <header>
            <span class="buddhismnet-image-container"><img src='/img/home-page/bn.png' alt='Buddhism.net' /></span>
            <h3>
              <span>Buddhism.net</span>
              <span class="sc-related-item-subtitle">${unsafeHTML(this.localize('home:31'))}</span>
            </h3>
          </header>

          <div class="related-projects-content">
            <p>${unsafeHTML(this.localize('home:32'))}</p>
          </div>
        </a>
        <md-ripple></md-ripple>
      </article>
    `;
  }

  #pirivenasProjectCardTemplate() {
    return html`
      <div class="home-page-pirivena-notice">
        <h3 class="home-page-pirivena-heading">SuttaCentral Translations For Pirivenas</h3>
        <p>SuttaCentral, in conjunction with the Amarapura–Rāmañña and Siam Nikāyas, is pleased to launch the printing of English translations of the Suttas and Vinaya and their distribution through monastic education centers (Pirivena) of Sri Lanka.</p>
        <a class="link-button block-link" href="/pirivena-project">
          Learn More
          <md-ripple></md-ripple>
        </a>
      </div>
    `;
  }

  #whyWeReadTemplate() {
    return html`
      <h2>${unsafeHTML(this.localize('home:33'))}</h2>
      <blockquote>
        <span>${this.whyWeRead}</span>
      </blockquote>
      <a
        class="link-button block-link"
        href="https://discourse.suttacentral.net/t/why-we-read-tell-us-why-you-read-suttas/6747"
      >
        ${unsafeHTML(this.localize('home:34'))}
        <md-ripple></md-ripple>
      </a>
    `;
  }

  #guidesTemplate() {
    return html`
      <article class="card">
        <a class="block-link" href="/general-guide-sujato">
          <figure>
            <picture>
              <source srcset="/img/home-page/pali7.avif" type="image/avif" />
              <img
                src="/img/home-page/pali6.jpg"
                alt="Pali manuscript from Myanmar"
                style="width:100%"
              />
            </picture>
            <figcaption>${unsafeHTML(this.localize('home:35'))}</figcaption>
          </figure>

          <div class="card-content">
            <div class="card-text">
              <h2>${unsafeHTML(this.localize('home:36'))}</h2>
              <p>${unsafeHTML(this.localize('home:37'))}</p>
            </div>
          </div>
        </a>
        <md-ripple></md-ripple>
      </article>
    `;
  }

  #indexesTemplate() {
    return html`
      <article class="card">
        <a class="block-link" href="/subjects">
          <figure>
            <picture>
              <source srcset="/img/home-page/bhikkhuni3.avif" type="image/avif" />
              <img src="/img/home-page/bhikkhuni.jpg" alt="Pali manuscript" style="width:100%" />
            </picture>
            <figcaption>${unsafeHTML(this.localize('home:39'))}</figcaption>
          </figure>

          <div class="card-content">
            <div class="card-text">
              <h2>${unsafeHTML(this.localize('home:40'))}</h2>
              <p>${unsafeHTML(this.localize('home:41'))}</p>
            </div>
          </div>
        </a>
        <md-ripple></md-ripple>
      </article>
    `;
  }

  render() {
    return html`
      <style>
        ${staticHomeStyles}
      </style>
      <main>
        ${this.#tipitakaSectionTemplate()}

        <sc-navigation-tipitaka .mainMenuData=${this.tipitaka}></sc-navigation-tipitaka>

        ${this.#publicationEditionsTemplate()}

        <section class="top-two">
          ${this.#videoTemplate()}
          <section class="plain" style="min-height: 134px">
            <p>${unsafeHTML(this.localize('home:3'))}</p>
            <p>${unsafeHTML(this.localize('home:4'))}</p>
          </section>
        </section>

        <section class="plain quotation">${this.#BuddhaWordsTemplate()}</section>

        <section class="two-cards">
          ${this.#introductionTemplate()} ${this.#getStartedTemplate()}
        </section>

        <section class="sc-related">
          <div class="related-projects-heading">${this.#relatedProjectsHeaderTemplate()}</div>
          <div class="sc-related-items-wrapper">
            ${this.#scVoiceCardTemplate()} ${this.#buddhaNexusCardTemplate()}
            ${this.#scForumCardTemplate()} ${this.#bilaraCardTemplate()}
          </div>
        </section>

        <section class="plain quotation">${this.#whyWeReadTemplate()}</section>

        <section class="two-cards">${this.#guidesTemplate()} ${this.#indexesTemplate()}</section>
      </main>
    `;
  }
}

customElements.define('sc-static-home', SCStaticHomePage);
