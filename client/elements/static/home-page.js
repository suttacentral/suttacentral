import { css, html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { SCStaticPage } from '../addons/sc-static-page.js';
import { API_ROOT } from '../../constants.js';
import '../navigation/sc-tipitaka.js';

class SCHomePage extends SCStaticPage {
  static get styles() {
    return css`
      :root
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
}

body
{
    padding-top: 4rem;

    background-color: var(--sc-primary-background-color);
}

main
{
    max-width: 1600px;
    margin: 0 auto;
}

section + section
{
    margin-top: 4%;
}

.plain
{
    font-size: 1.125rem;

    display: flex;
    flex-direction: column;

    margin: auto 3vw;
    padding: 6% 0 0;

    text-align: center;

    align-items: center;
}

.tipitaka-section
{
    font-size: 1.125rem;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    min-height: 39px;
    margin: 0 3vw 16px;
    padding-bottom: 3px;

    text-align: center;

    border-bottom: 2px solid var(--sc-primary-color-light);

    align-items: center;
}

.tipitaka-section h2
{
    line-height: 1;

    box-sizing: border-box;
    width: 100%;
    padding-bottom: 6px;

    letter-spacing: var(--sc-caps-letter-spacing);

    border-bottom: 1px solid var(--sc-primary-color-light);

    font-variant-caps: all-small-caps;
}

.tipitaka-section h2 i
{
    font-size: .6667em;
    font-style: italic;

    display: inline-block;

    height: 17px;

    vertical-align: middle;
    letter-spacing: normal;

    font-variant-caps: normal;
}

blockquote
{
    font-family: var(--sc-serif-font);
    font-size: 1.5rem;
    font-size: clamp(1.125em, 3.75vw, 1.5em);
    font-weight: 300;
    font-style: italic;
    line-height: 1.5;

    position: relative;

    width: 80%;
    margin: 0 0 2% 0;
    padding: 0;

    text-align: center;
}

/* ensure a consistent spacing for the quote decoration */
blockquote span
{
    position: relative;
}

blockquote span:before
{
    font-size: 4em;
    line-height: 1;

    position: absolute;
    left: -.5em;

    content: '“';

    color: var(--sc-disabled-text-color);
}

article
{
    display: flex;
    overflow: hidden;
    flex-direction: column;

    margin-bottom: 16px;

    border-radius: 8px;
    box-shadow: var(--sc-shadow-elevation-1dp);
}

.two-cards
{
    display: grid;

    margin-right: 1vw;
    margin-left: 1vw;

    justify-content: center;
    grid-template-columns: repeat(2, minmax(240px, 1fr));
    grid-gap: 3% 2%;
}

figure
{
    position: relative;

    overflow: hidden;

    height: 480px;
    margin: 0;
}

img
{
    height: 100%;

    object-fit: cover;
}

figcaption
{
    font-size: .8em;
    font-weight: 600;

    position: absolute;
    right: 0;
    bottom: 0;

    box-sizing: border-box;
    width: 100%;
    padding: 16px;

    text-align: right;
    letter-spacing: .5px;

    color: white;
    background-color: rgba(0, 0, 0, .5);

    backdrop-filter: blur(2px);
}

.card-content
{
    display: flex;
    flex-direction: column;

    background: var(--sc-secondary-background-color);

    justify-content: space-between;
    flex: 1;
}

.card-text
{
    padding: 6% 4% 0;
}

.card-actions
{
    display: flex;

    min-height: 52px;
    padding: 4%;

    align-items: flex-end;
    justify-content: flex-end;
}

.link-button
{
    font-weight: 600;

    display: inline-flex;

    box-sizing: border-box;
    min-width: 64px;
    height: 36px;
    padding: 0 15px 2px;

    text-decoration: none;
    letter-spacing: var(--sc-caps-letter-spacing);

    color: var(--sc-primary-accent-color-dark);
    border: 1px solid var(--sc-primary-accent-color);
    border-radius: 4px;

    align-items: center;
    justify-content: center;
    font-variant-caps: all-small-caps;
}

.link-button:hover
{
    background-color: var(--sc-primary-accent-color-light-transparent);
}

.link-button:active
{
    color: white;
    background-color: var(--sc-primary-accent-color);
}

.quote-button
{
    align-self: flex-end;
}

h2
{
    font-family: var(--sc-serif-font);
    font-size: var(--sc-skolar-font-size-static-subtitle);
    font-weight: 400;
    line-height: 1.3333;

    margin: 0 0 0 0;
}

p
{
    font-size: var(--sc-skolar-font-size-md);
    line-height: 1.5;

    margin: .75em 0 0 0;
}

a
{
    text-decoration: none;
}

.video
{
    display: flex;

    height: 360px;

    justify-content: center;
}

video
{
    border-radius: 8px;
    box-shadow: var(--sc-shadow-elevation-1dp);
}

@media (max-width: 680px)
{
    .two-cards
    {
        display: flex;
        flex-direction: column;

        margin-right: 0;
        margin-left: 0;

        grid-gap: 0;
    }

    video
    {
        width: 100%;
        height: 56.25%;
    }

    br
    {
        content: '';
    }

    h2
    {
        font-weight: 500;
    }
}

    `;
  }
  render() {
    return html`
      <main>
          <section class="tipitaka-section">
          <h2>Tipiṭaka—<i>the</i> Three Baskets <i>of the</i> Buddhist canon</h2>
        </section>
        <sc-tipitaka></sc-tipitaka>
        <section class="plain" style="min-height: 134px">
          <p>${unsafeHTML(this.localize('2797e2ab111cd1d938bd327b38002092'))}</p>
          <p>${unsafeHTML(this.localize('9db604c6c61c4cb7431619341bc037bf'))}</p>
        </section>

        <section class="plain">
          <blockquote>
            <span>The Buddha said to the monks who were quarrelling: “If animals can be courteous to each other, so can you.”</span>
          </blockquote>
          <a class="link-button quote-button" href="/">Read this sutta</a>
        </section>

        <section class="video">
          <video width="640" height="360" controls preload="none" style="" poster="/img/home-page/video_overlay.jpg">
            <source src="https://ia801504.us.archive.org/18/items/suttacentral_video/suttacentral_video.webm">
            <source src="https://ia601504.us.archive.org/18/items/suttacentral_video/suttacentral_video.mp4">
          </video>
        </section>

        <section class="two-cards">
          <article>
            <figure>
            <picture>
            <source srcset="/img/home-page/pali1.avif" type="image/avif">
              <img src="/img/home-page/pali1.jpg" alt="Pali manuscript" style="width:100%">
              </picture>
              <figcaption>Palm leaf (ola) manuscript from Sri Lanka</figcaption>
            </figure>
            <div class="card-content">
              <div class="card-text">
                <h2>${this.localize('742e700832d62bb2f6a17592968b4dab')}</h2>
                <p>${this.localize('0ae097eff8e01d83a486582e1648d803')}</p>
              </div>
              <div class="card-actions">
                <a href="/introduction" class="link-button">Introduction</a>
              </div>
            </div>
          </article>

          <article>
            <figure>
            <picture>
            <source srcset="/img/home-page/koreana.avif" type="image/avif">
              <img src="/img/home-page/koreana.jpg" alt="Chinese Buddhist woodblock" style="width:100%">
              </picture>
              <figcaption>A block from the Tripiṭaka Koreana at Haeinsa Temple</figcaption>
            </figure>
            <div class="card-content">
              <div class="card-text">
                <h2>${this.localize('a5172cf2c34de3fc8e2af331ac915ec9')}</h2>
                <p>${this.localize('72b2622af85398029ea11349175e83af')}</p>
              </div>
              <div class="card-actions">
                <a href="/start" class="link-button">Get started</a>
              </div>
            </div>
          </article>
        </section>

        <section class="plain">
          <blockquote>
            <span>I read the suttas because they teach how to “read”; how to read oneself, one’s existence, one’s confusions, one’s tragedy. This “whole mass of suffering” becomes readable sentences. The pen that writes these sentences become apparent. And it becomes clear, right then, that with the disappearance of the pen, no more tears are written.</span>
          </blockquote>
          <a class="link-button quote-button" href="https://discourse.suttacentral.net/t/why-we-read-tell-us-why-you-read-suttas/6747">Testimonies</a>
        </section>

        <section class="two-cards">
          <article>
            <figure>
            <picture>
            <source srcset="/img/home-page/pali6.avif" type="image/avif">
              <img src="/img/home-page/pali6.jpg" alt="Pali manuscript from Myanmar" style="width:100%">
              </picture>
              <figcaption>Pali manuscript from Myanmar</figcaption>
            </figure>
            <div class="card-content">
              <div class="card-text">
                <h2>${this.localize('078365b3da2eb8b34d23c36661309359')}</h2>
                <p>${unsafeHTML(this.localize('2e64b76d5549e9dc3e83c5845571322a'))}</p>
              </div>
              <div class="card-actions">
                <a href="/general-guide-sujato" class="link-button">Guides</a>
              </div>
            </div>
          </article>

          <article>
            <figure>
            <picture>
            <source srcset="/img/home-page/bhikkhuni.avif" type="image/avif">
              <img src="/img/home-page/bhikkhuni.jpg" alt="Pali manuscript" style="width:100%">
              </picture>
              <figcaption>Bhikkhuni-patimokkha, Burmese manuscript, 19th century. British Library</figcaption>
            </figure>
            <div class="card-content">
              <div class="card-text">
                <h2>${this.localize('149842aa5477edb219ce272ec2aab269')}</h2>
                <p>${this.localize('70a49d1ca4c56cd629f76e90d6b6cc0f')}</p>
              </div>
              <div class="card-actions">
                <a href="/subjects" class="link-button">Indexes</a>
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
