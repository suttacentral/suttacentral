import { LitLocalized } from '../addons/localization-mixin.js';
import { css, html, LitElement } from 'lit-element';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles.js';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles.js';

class SCDonationSuccessPage extends LitLocalized(LitElement) {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/sc-donate-success-page';
  }

  static get styles() {
    return css`
      ${layoutSimpleStyles}
      ${typographyCommonStyles}

      h1{
        text-align: center
      }
      picture{
        margin: 2em 0;
        display: block;
      }
      `;
  }

  render() {
    return html`
      <main>
        <article>
          <h1>Sādhu! Sādhu!</h1>
          <p>Your gift of Dhamma is precious to us. It will be carefully used to support SuttaCentral, and help make the Dhamma available for all those who wish to be free from suffering.</p>
          <picture>
            <source srcset="/img/static-pages/novice_reading.avif" type="image/avif">
            <img alt="A photo of two Burmese novices reading Dhamma" class="image-home-full" src="/img/static-pages/novice_reading.jpg" title="Novices reading" width="100%" height="auto">
          </picture>
          <p>May the merit of you kind offering be for the long-lasting happiness and welfare of yourself and all your loved ones!</p>
          <p>May it be for the happiness, welfare, and liberation of all sentient beings!</p>
          <blockquote>
          <p>The gift of the teaching beats all other gifts;<br>
            the taste of the teaching beats all other tastes;<br>
            the joy of the teaching beats all other joys;<br>
            one who has ended craving beats all suffering.
          </p>
          </blockquote>
          <p>Multiply your merit: <a href='https://suttacentral.net/search?query=giving'>read some suttas on the joys of giving</a>, and take the time to remind yourself of your own kindness.</p>
      </article>
    </main>
    `;
  }
}

customElements.define('sc-donation-success-page', SCDonationSuccessPage);
