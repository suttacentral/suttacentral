import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '@material/mwc-button';

import { SCStaticPage } from '../addons/sc-static-page.js';
import { API_ROOT } from '../../constants.js';

class SCHomePage extends SCStaticPage {
  render() {
    return html`
    <style>
   html {

   }
mwc-button {
  --mdc-theme-primary: var(--sc-primary-accent-color);
  --mdc-theme-on-primary: white;
}
   html,
   body {
     font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
   }
   body {
       background-color: var(--sc-background-color);
       padding-top: 4rem;
   }
   main {
       max-width: 1600px;
       margin: 0 auto 8em;
       padding: 0 2%;
   }
   section + section {
       margin-top: 4%;
   }
   .plain {
   		font-size: 1.125rem;
       text-align: center;
       display: flex;
       align-items: center;
       flex-direction: column;
       width: 80%;
       padding: 6% 0 0;
       margin: auto;
   }
   blockquote {
       font-style: italic;
       font-size: 1.5rem;
       font-family: "skolar pe";
       font-weight: 300;
       padding: 0;
       margin: 0 0 2% 0;
       text-align: center;
       position: relative;
   }
   blockquote:before {
       content: "“";
       font-size: 4em;
       color: #757575;
       position: absolute;
       left: -0.5em;
       line-height: 1;
   }

   article {
       background-color: #fff;
       border-radius: 8px;
       box-shadow: var(--sc-shadow-elevation-1dp);
       overflow: hidden;
       display: flex;
       flex-direction: column;
       margin-bottom: 16px;
   }

   .two-cards {
       display: grid;
       justify-content: center;
       grid-template-columns: repeat(2, minmax(240px, 1fr));
       grid-gap: 3% 2%;
   }

   .three-card-row {
       display: grid;
       justify-content: center;
       grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
       grid-gap: 3% 2%;
   }
   .three-card-row-first {
       grid-column: 1/-2;
       grid-row: 1/3;
   }
   .three-card-row-second {
       grid-row: 1 / 2;
   }
   .three-card-row-third {
       grid-row: 2 / 3;
   }

   figure {
       margin: 0;
       height: 480px;
       overflow: hidden;
   }
   img {
       height: 100%;
       object-fit: cover;
   }
   figcaption {
       font-size: 0.8em;
       color: white;
       font-weight: 600;
       margin: -48px 0px 0 0px;
       padding: 16px;
       text-shadow: 0px 0px 1px black, 0px 0px 2px black, 0px 0px 3px black,0px 0px 4px black,0px 0px 1px black, 0px 0px 2px black, 0px 0px 3px black,0px 0px 4px black;
       text-align: right;
   }

   .card-content {
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       flex: 1;
   }
   .card-text {
       padding: 6% 4% 0;
   }
   .card-actions {
       padding: 16px;
       min-height: 52px;
       display: flex;
       align-items: flex-end;
   }
   .quote-button {
       align-self: flex-end;
   }
   h1 {
       margin: 0 0 0.25em 0;
       font-size: 2em;
       line-height: 1.3333;
       font-weight: 300;
       font-family: "skolar pe";
       padding-left: 4%;
   }
   h2 {
       margin: 0 0 0 0;
       font-size: 1.5em;
       line-height: 1.3333;
       font-weight: 400;
       font-family: "skolar pe";
   }
   p {
       margin: 0.75em 0 0 0;
       line-height: 1.5;
   }
a{
	text-decoration: none;
}
   .video {
       display: flex;
       justify-content: center;
   }
   video {
       border-radius: 8px;
       box-shadow: var(--sc-shadow-elevation-1dp);
   }

   @media (max-width: 680px) {
       .two-cards,
       .three-card-row {
           display: flex;
           flex-direction: column;
           grid-gap: 0;
       }
   }
    </style>
    <main>
        <section class="plain">
            <p>
            ${unsafeHTML(this.localize('2797e2ab111cd1d938bd327b38002092'))}
        </p>
            <p>
            ${unsafeHTML(this.localize('9db604c6c61c4cb7431619341bc037bf'))}</p>
        </section>

        <section class="plain">
            <blockquote>The Buddha said to the monks who were quarrelling: “If animals can be courteous to each other, so can you.”
            </blockquote>
            <a class="quote-button" href="/"><mwc-button unelevated label="Read this sutta" class="quote-button"></mwc-button></a>
        </section>

        <section class="video">

<video width="640" height="360" controls preload="none" tabindex="-1" style="" poster="/img/home-page/video_overlay.webp">
	<source src="https://archive.org/download/suttacentral_video/suttacentral_video.webm">
	<source src="https://archive.org/download/suttacentral_video/suttacentral_video.mkv">
	</video>
        </section>

        <section class="two-cards">

            <article>
                <figure>
                    <img src="/img/home-page/pali1.webp" alt="Pali manuscript" style="width:100%">
                    <figcaption>Palm leaf (ola) manuscript from Sri Lanka</figcaption>
                </figure>
                <div class="card-content">
                    <div class="card-text">
                        <h2>
                        ${this.localize('742e700832d62bb2f6a17592968b4dab')}
                    </h2>
                        <p>
                            ${this.localize('0ae097eff8e01d83a486582e1648d803')}
                        </p>
                    </div>
                    <div class="card-actions">
                        <a href="/introduction"><mwc-button unelevated label="Introduction"></mwc-button></a>
                    </div>
                </div>
            </article>

            <article>
                <figure>
                    <img src="/img/home-page/koreana.webp" alt="Chinese Buddhist woodblock" style="width:100%">
                    <figcaption>A block from the Tripiṭaka Koreana at Haeinsa Temple</figcaption>
                </figure>
                <div class="card-content">
                    <div class="card-text">
                        <h2>
                        ${this.localize('a5172cf2c34de3fc8e2af331ac915ec9')}
                    </h2>
                        <p>
                       ${this.localize('72b2622af85398029ea11349175e83af')}
                    </p>
                    </div>
                    <div class="card-actions">
                        <a href="/start"><mwc-button unelevated label="Get started"></mwc-button></a>
                    </div>
                </div>
            </article>

        </section>

<section class="three-cards">
<h1>
${this.localize('24cbc4d3253a2779ae4dab326e42659b')}
</h1>
        <div class="three-card-row">
            <article class="three-card-row-first">
                <figure>
                    <img src="/img/home-page/pali4.webp" alt="Pali manuscript" style="width:100%">
                    <figcaption>Palm leaf (ola) manuscript from Sri Lanka</figcaption>
                </figure>
                <div class="card-content">
                    <div class="card-text">
                        <h2>
                        ${this.localize('e30baf2773fd1ff10ac21a7ebd63198d')}
                    </h2>
                        <p>
                        ${this.localize('31f31787de5aa09d662dfef82b0b686e')}</p>
                    </div>
                    <div class="card-actions">
                        <a href="/discourses"><mwc-button unelevated label="More …"></mwc-button></a>
                    </div>
                </div>
            </article>

            <article class="three-card-row-second">
                <div class="card-content">
                    <div class="card-text">
                        <h2>
                        ${this.localize('09c18e7d1f00a37ba925092e7a101a05')}
                    </h2>
                        <p>
                        ${this.localize('45cc0214114c2d971cf2701f842f8926')}
                    </p>
                    </div>
                    <div class="card-actions">
                        <a href="/vinaya"><mwc-button unelevated label="More …"></mwc-button></a>
                    </div>
                </div>
            </article>
            <article class="three-card-row-third">
                <div class="card-content">
                    <div class="card-text">
                        <h2> 
                        ${this.localize('ff9331ad058b3717457b73d2bdc51534')}
                    </h2>
                        <p>
                        ${this.localize('db01f7b42cfc777fd2f2a84d3a6787fa')}
                    </p>
                    </div>
                    <div class="card-actions">
                        <a href="/abhidhamma"><mwc-button unelevated label="More …"></mwc-button></a>
                    </div>
                </div>
            </article>

        </section>
</section>
        <section class="plain">
            <blockquote>I read the suttas because they teach how to “read”; how to read oneself, one’s existence, one’s confusions, one’s tragedy. This “whole mass of suffering” becomes readable sentences. The pen that writes these sentences become apparent. And it becomes clear, right then, that with the disappearance of the pen, no more tears are written.
            </blockquote>
            <a class="quote-button" href="https://discourse.suttacentral.net/t/why-we-read-tell-us-why-you-read-suttas/6747"><mwc-button unelevated label="Testimonies"></mwc-button></a>
        </section>

        <section class="two-cards">

            <article>
                <figure>
                    <img src="/img/home-page/pali6.webp" alt="Pali manuscript" style="width:100%">
                    <figcaption>Pali manuscript from Myanmar.</figcaption>
                </figure>
                <div class="card-content">
                    <div class="card-text">
                        <h2>
                        ${this.localize('078365b3da2eb8b34d23c36661309359')}
                    </h2>
                        <p>
                         ${unsafeHTML(this.localize('2e64b76d5549e9dc3e83c5845571322a'))}
                    </p>
                    </div>
                    <div class="card-actions">
                        <a href="/general-guide-sujato"><mwc-button unelevated label="Guides"></mwc-button></a>
                    </div>
                </div>
            </article>

            <article>
                <figure>
                    <img src="/img/home-page/bhikkhuni.webp" alt="Pali manuscript" style="width:100%">
                    <figcaption>Bhikkhuni-patimokkha, Burmese manuscript, 19th century. British Library.</figcaption>
                </figure>
                <div class="card-content">
                    <div class="card-text">
                        <h2>
                         ${this.localize('149842aa5477edb219ce272ec2aab269')}
                     </h2>
                        <p>
                        ${this.localize('70a49d1ca4c56cd629f76e90d6b6cc0f')}
                    </p>
                    </div>
                    <div class="card-actions">
                        <a href="/subjects"><mwc-button unelevated label="Indexes"></mwc-button></a>
                    </div>
                </div>
            </article>

        </section>
    </main>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_home-page';
  }
}

customElements.define('home-page', SCHomePage);