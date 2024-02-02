import { css, html, LitElement } from 'lit';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';

class SCStaticDonationSuccessPage extends LitLocalized(LitElement) {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
  }

  static styles = [
    layoutSimpleStyles,
    typographyCommonStyles,
    css`
      h1 {
        text-align: center;
      }

      picture {
        margin: 2em 0;
        display: block;
      }
    `,
  ];

  render() {
    return html`
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('donations:success1'))}</h1>
          <p>${unsafeHTML(this.localize('donations:success2'))}</p>
          <picture>
            <source srcset="/img/static-pages/novice_reading.avif" type="image/avif" />
            <img
              alt="${unsafeHTML(this.localize('donations:successAltText'))}"
              class="image-home-full"
              src="/img/static-pages/novice_reading.jpg"
              width="100%"
              height="auto"
            />
          </picture>
          <p>${unsafeHTML(this.localize('donations:success3'))}</p>
          <p>${unsafeHTML(this.localize('donations:success4'))}</p>
          <blockquote>
            <p>${unsafeHTML(this.localize('donations:success5'))}
              <br />
              ${unsafeHTML(this.localize('donations:success6'))}
              <br />
              ${unsafeHTML(this.localize('donations:success7'))}
              <br />
              ${unsafeHTML(this.localize('donations:success8'))}
            </p>
          </blockquote>
          <p>${unsafeHTML(this.localize('donations:success9'))}</p>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-donation-success', SCStaticDonationSuccessPage);
