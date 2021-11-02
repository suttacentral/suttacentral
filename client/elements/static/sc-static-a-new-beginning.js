import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticANewBeginning extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('a-new-beginning:1')}</h1>
          <p>${this.localize('a-new-beginning:2')}</p>
          <p>${unsafeHTML(this.localize('a-new-beginning:3'))}</p>
          <p>${this.localize('a-new-beginning:4')}</p>
          <p>${this.localize('a-new-beginning:5')}</p>
          <p>${this.localize('a-new-beginning:6')}</p>
          <ul>
            <li>${this.localize('a-new-beginning:7')}</li>
            <li>${this.localize('a-new-beginning:8')}</li>
            <li>${this.localize('a-new-beginning:9')}</li>
            <li>${this.localize('a-new-beginning:10')}</li>
            <li>${this.localize('a-new-beginning:11')}</li>
            <li>${this.localize('a-new-beginning:12')}</li>
            <li>${this.localize('a-new-beginning:13')}</li>
            <li>${this.localize('a-new-beginning:14')}</li>
            <li>${this.localize('a-new-beginning:15')}</li>
          </ul>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/build/a-new-beginning';
  }
}

customElements.define('sc-static-a-new-beginning', SCStaticANewBeginning);
