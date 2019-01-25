
import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import { API_ROOT } from '../../constants.js';
import _ from '../../localization/macro.js';
import '../addons/text-carousel.js';

class SCHomePage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <style>
      .content {
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: 2% 96% 2%;
        grid-row-gap: 80px;
        margin-top: 60px;
      }

      #page-wrap {
        max-width: 2058px;
      }

      .bottom-space {
        margin-bottom: var(--sc-size-xl) !important;
      }

      .row {
        grid-column-start: 2;
        width: 100%;
      }

      .preamble {
        @apply --sc-skolar-font-size-xl;
        color: var(--sc-primary-text-color);
        text-align: center;
      }

      .card {
        background-color: var(--sc-secondary-background-color);
        width: 100%;
        min-height: 180px;
        display: flex;
        flex-flow: column;
      }

      .card-heading {
        @apply --sc-skolar-font-size-xxl;
        width: 100%;
        background-color: var(--sc-primary-color-medium);
        color: var(--sc-tertiary-text-color);
        font-weight: bold;
        line-height: 100%;
        text-align: right;
      }

      .card-content {
        position: relative;
        width: 100%;
        background-color: var(--sc-secondary-background-color);
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-evenly;
        padding-bottom: var(--sc-size-xxl);
      }

      .card-content-text {
        @apply --sc-skolar-font-size-md;
        padding: var(--sc-size-lg);
        text-align: center;
      }

      .button-link {
        background: none !important;
        text-decoration: none;
      }

      .card-heading-text {
        @apply --sc-sans-font;
        padding: var(--sc-size-lg);
        text-align: center;
        direction: rtl;
      }

      .card-content-video {
        width: 100%;
        padding: 0;
      }

      .d-none {
        display: none;
      }

      .card-text {
        @apply --sc-skolar-font-size-l;
        font-style: italic;
      }

      .button {
        @apply --sc-skolar-font-size-s;
        margin-top: var(--sc-size-md);
        background-color: var(--sc-primary-accent-color);
        color: var(--sc-tertiary-text-color);
        font-weight: bold;
        text-align: center;
      }

      .two-paper-cards {
        width: 100%;
      }

      .paper-cards-no-background {
        --paper-card-background-color: var(--sc-primary-background-color);
        box-shadow: none;
      }

      .card-content-wrapper {
        padding: var(--sc-size-md-larger);
      }

      .no-bottom-padding {
        padding-bottom: 0;
      }

      .transparent-card-content-wrapper {
        padding-top: var(--sc-size-md-larger);
      }

      .image-card-text,
      .text-card-text {
        margin-top: 1em;
      }

      .card-title-text {
        @apply --paper-font-headline;
        @apply --sc-serif-font;
      }

      .why-we-read {
        text-align: center;
        font-style: italic;
      }

      .first-row {
        grid-column-start: 1;
      }

      .second-row {
        grid-column-start: 2;
      }

      .three-elements-grid {
        display: grid;
        grid-gap: var(--sc-size-lg);
      }

      .full-height {
        height: 100%;
      }

      .embed-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        width: 100%;
      }

      .embed-container iframe,
      .embed-container object,
      .embed-container embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .paper-card-with-button {
        padding-bottom: calc(var(--sc-size-md-larger) * 2 + 36px);
      }

      paper-card {
        overflow: hidden;
        background-color: var(--sc-secondary-background-color);
        width: 100%;
      }

      .transparent-card {
        background-color: var(--sc-primary-background-color);
      }

      .cards {
        display: grid;
        justify-content: space-between;
        grid-template-columns: 1fr;
        grid-auto-flow: row;
        grid-gap: var(--sc-size-lg);
      }

      .first-card {
        grid-row-start: 1;
      }

      .first-card-button {
        grid-row-start: 2;
      }

      .second-card {
        grid-row-start: 3;
      }

      .second-card-button {
        grid-row-start: 4;
      }

      .big-card-title {
        @apply --sc-skolar-font-size-static-subtitle;
        margin-bottom: var(--sc-size-md);
      }

      .center-text {
        text-align: center;
      }

      .card-button {
        position: absolute;
        right: var(--sc-size-md-larger);
        bottom: var(--sc-size-md-larger);
        margin-left: 0;
      }

      .grid-button {
        justify-self: end;
      }

      .carousel {
        width: 100%;
      }

      .card-heading-subtext {
        @apply --sc-skolar-font-size-md;
        font-weight: normal;
        line-height: 1em;
        margin: 0 var(--sc-size-md-larger) var(--sc-size-md-larger);
        text-align: right;
      }

      .card-button-middle {
        position: absolute;
        transform: translate(-50%);
        bottom: var(--sc-size-md-larger);
      }

      .buddhas-words-text {
        @apply --sc-skolar-font-size-xl;
        line-height: 1.1;
      }

      @media (min-width: 960px) {
        .buddhas-words-text {
          @apply --sc-skolar-font-size-static-subtitle;
        }
      }

      @media (min-width: 1280px) {
        .content {
          grid-template-columns: 5% 90% 5%;
        }

        .three-elements-grid {
          grid-template-rows: 1fr 1fr;
          grid-template-columns: 3fr 2fr;
        }

        .three-elements-big {
          grid-column-start: 1;
          grid-row-start: 1;
          grid-row-end: span 2;
        }

        .three-elements-small {
          grid-column-start: 2;
          grid-row-start: unset;
        }

        .three-elements-first-small {
          grid-row-start: 1;
        }

        .three-elements-second-small {
          grid-row-start: 2;
        }

        .cards {
          grid-template-columns: 1fr 1fr;
          grid-gap: var(--sc-size-lg);
        }

        .second-card {
          grid-row-start: 1;
        }

        .first-card-button {
          grid-row-start: 2;
        }

        .second-card-button {
          grid-row-start: 2;
        }

        .card-heading-text {
          text-align: unset;
        }

        .card-button {
          right: unset;
          left: var(--sc-size-md-larger);
        }

        .grid-button {
          justify-self: start;
        }
      }

      @media (min-width: 1600px) {
        .content {
          grid-template-columns: 15% 70% 15%;
        }

        .card {
          flex-flow: unset;
        }

        .card-content-video,
        .card-content {
          width: 75%;
        }

        .card-heading {
          width: 25%;
        }

        .smaller-title {
          @apply --sc-skolar-font-size-dialog-header;
        }

        .d-none {
          display: unset;
        }

        #sc-video {
          z-index: 999;
        }
      }

      @media (min-width: 1680px) {
        .smaller-title {
          @apply --sc-skolar-font-size-xxl;
        }
      }

    </style>

    <div class="bottom-space" id="page-wrap">
      <div class="content">
        <div class="row preamble">
          <p>
            ${_`The wisdom of the Buddha has been preserved in a vast ocean of ancient texts.<br/> Many of these scriptures have now been translated into the world’s languages.`}
          </p>
          <p>
            ${_`SuttaCentral brings these together and makes them freely available. <br/> Setting aside the boundaries of language and tradition, we let the Buddha speak for himself.`}
          </p>
        </div>
        <div class="row">
          <paper-card elevation="2">
            <div class="card">
              <div class="card-heading">
                <div class="card-heading-text">
                  ${_`The <br class="d-none"/> Buddha’s <br class="d-none"/> words`}
                </div>
              </div>
              <div class="card-content">
                <div class="card-content-text">
                  <div class="card-text center-text buddhas-words-text">
                    <sc-text-carousel class="carousel" .elementsUrl="${`${API_ROOT}/epigraphs`}" link="true">
                    </sc-text-carousel>
                  </div>
                </div>
              </div>
            </div>
          </paper-card>
        </div>
        <div class="row cards">
          <paper-card class="two-paper-cards paper-cards-no-background first-card transparent-card" elevation="2" image="/img/home-page/becomingone-min.jpg" alt="${_`What’s here`}">
            <div class="transparent-card-content-wrapper">
              <div class="card-title-text">
                ${_`What’s here`}
              </div>
              <div class="image-card-text">
                ${_`SuttaCentral contains early Buddhist texts, known as the Tipiṭaka or “Three Baskets”. This is a large collection of teachings attributed to the Buddha or his earliest disciples, who were teaching in India around 2500 years ago. They are regarded as sacred canon in all schools of Buddhism. You can find all of our texts through the sidebar menu on the left.`}
              </div>
            </div>
          </paper-card>
          <paper-card class="two-paper-cards paper-cards-no-background second-card transparent-card" elevation="2" image="/img/home-page/contemplatingthemoon-min.jpg" alt="${_`Where to begin`}">
            <div class="transparent-card-content-wrapper">
              <div class="card-title-text">
                ${_`Where to begin`}
              </div>
              <div class="image-card-text">
                ${_`There are thousands of early Buddhist texts, and they’re not organized for easy reading. But here’s the good news: you are not alone. We’ve been down this road ourselves, and have tried to make it a little easier for you. Here are some things you can try.`}
              </div>
            </div>
          </paper-card>
          <div>
            ${_`<a class="button-link first-card-button grid-button" href="/introduction"> <paper-button class="button" raised="">INTRODUCTION</paper-button> </a>`}
          </div>
          <div>
            ${_`<a class="button-link second-card-button grid-button" href="/start"> <paper-button class="button" raised="">GET STARTED</paper-button> </a>`}
          </div>
        </div>
        <div class="row">
          <paper-card elevation="2">
            <div class="card">
              <div class="card-heading">
                <div class="card-heading-text smaller-title">
                  ${_`Meet<br class="d-none"/> SuttaCentral`}
                </div>
              </div>
              <div class="card-content-video">
                <div class="embed-container">
                  <iframe allowfullscreen="" frameborder="0" height="360" id="sc-video" mozallowfullscreen="" src="https://player.vimeo.com/video/257038431?color=efe700&byline=0" webkitallowfullscreen="" width="640" title="SuttaCentral.net - Early Buddhist texts, translations, and parallels">
                  </iframe>
                </div>
              </div>
            </div>
          </paper-card>
        </div>
        <div class="row">
          <div class="big-card-title">
            ${_`Tipiṭaka—the three baskets`}
          </div>
          <div class="three-elements-grid">
            <paper-card alt="${_`Sixteen gilt and lacquer leaves with two gilt and lacquer book covers. Wood coated with lacquer, \n                        twelve lines to each leaf written in Pali script in black lacquer, the text interspersed and bordered \n                        with undulating floral and vegetal motifs in gold on an orange ground. Burma, 19th century. 16 x 63 cm.`}" class="three-elements-big paper-card-with-button" elevation="2" image="/img/home-page/burmese_kammavaca.jpg" title="${_`A decorative kammavaca manuscript`}">
              <div class="card-content-wrapper no-bottom-padding">
                <div class="card-title-text">
                  ${_`Discourses`}
                </div>
                <div class="image-card-text">
                  ${_`These are our primary sources for understanding what the Buddha taught. They record the Buddha’s teachings and conversations on specific occasions with a diverse range of people. Discourses are called sutta in Pali, which is spelled sūtra in Sanskrit.`}
                </div>
              </div>
              <div>
                ${_`<a class="button-link" href="/discourses"> <paper-button class="button card-button" raised="">MORE ...</paper-button> </a>`}
              </div>
            </paper-card>
            <paper-card class="three-elements-small three-elements-first-small full-height paper-card-with-button" elevation="2">
              <div class="card-content-wrapper no-bottom-padding">
                <div class="card-title-text">
                  ${_`Monastic Law`}
                </div>
                <div class="text-card-text">
                  ${_`The texts on Monastic Law (vinaya) detail the lifestyle, rules, and procedures for Buddhist monks and nuns. They provide the guidelines for Buddhist monastics to this day, and in addition, paint a detailed and vivid picture of everyday life in ancient India.`}
                </div>
              </div>
              <div>
                ${_`<a class="button-link" href="/vinaya"> <paper-button class="button card-button" raised="">MORE ...</paper-button> </a>`}
              </div>
            </paper-card>
            <paper-card class="three-elements-small three-elements-second-small full-height paper-card-with-button" elevation="2">
              <div class="card-content-wrapper no-bottom-padding">
                <div class="card-title-text">
                  ${_`Abhidhamma`}
                </div>
                <div class="image-card-text">
                  ${_`Abhidhamma texts are systematic summaries and analyses of the teachings drawn from the earlier discourses. The Abhidhamma (spelled abhidharma in Sanskrit) is somewhat later than the Discourses and Vinaya.`}
                </div>
              </div>
              <div>
                ${_`<a class="button-link" href="/abhidhamma"> <paper-button class="button card-button" raised="">MORE ...</paper-button> </a>`}
              </div>
            </paper-card>
          </div>
        </div>
        <div class="row">
          <paper-card elevation="2">
            <div class="card">
              <div class="card-heading">
                <div class="card-heading-text">
                  ${_`Why<br class="d-none"/> we<br class="d-none"/> read`}
                </div>
              </div>
              <div class="card-content">
                <div class="card-content-text">
                  <div class="why-we-read">
                    <sc-text-carousel .elementsUrl="${`${API_ROOT}/whyweread`}">
                    </sc-text-carousel>
                  </div>
                </div>
              </div>
            </div>
          </paper-card>
        </div>
        <div class="row cards">
          <paper-card class="two-paper-cards first-card paper-card-with-button" elevation="2" image="/img/home-page/noword-min.jpg" alt="${_`A Reader’s Guide to the Pali Suttas`}">
            <div class="card-content-wrapper">
              <div class="card-title-text">
                ${_`A Reader’s Guide to the Pali Suttas`}
              </div>
              <div class="image-card-text">
                ${_`The suttas of the Pali Canon (Tipiṭaka), especially the four main <i lang="pli">nikāyas</i>, are essential reading for anyone who wishes to understand the Buddha and his teaching. Bhikkhu Sujato has prepared an extensive set of reading guides for the serious student. These provide essential background and survey most of the core teachings from the perspective of early Buddhism.`}
              </div>
            </div>
            <div>
              ${_`<a class="button-link" href="/general-guide-sujato"><paper-button class="button card-button" raised>GUIDES</paper-button></a>`}
            </div>
          </paper-card>
          <paper-card class="two-paper-cards second-card paper-card-with-button" elevation="2" image="/img/home-page/listeningtotherain-min.jpg" alt="${_`Indexes and Terminology`}">
            <div class="card-content-wrapper">
              <div class="card-title-text">
                ${_`Indexes and Terminology`}
              </div>
              <div class="image-card-text">
                ${_`Like any specialized field, Buddhist studies has it's own terminology and content. It's easy to get lost or to miss references, so here we provide indexes of terms in the early texts sorted by subject, name and simile, as well a glossary of important terms. These hand-curated lists offer another way to find the sutta or passage that you're looking for.`}
              </div>
            </div>
            <div>
              ${_`<a class="button-link" href="/subjects"> <paper-button class="button card-button" raised="">Indexes</paper-button> </a>`}
            </div>
          </paper-card>
        </div>
      </div>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_home-page';
  }
}

customElements.define('home-page', SCHomePage);
