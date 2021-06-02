import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticAbout extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('about:1')}</h1>
          <p>${this.localize('about:2')}</p>
          <p>${this.localize('about:3')}</p>
          <p>${this.localize('about:4')}</p>
          <p>${this.localize('about:5')}</p>
          <p>${unsafeHTML(this.localize('about:6'))}</p>
          <h2>${this.localize('about:7')}</h2>
          <p>${this.localize('about:8')}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/about';
  }
}

customElements.define('sc-static-about', SCStaticAbout);
