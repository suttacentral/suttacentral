import { html, css } from 'lit';
import SCTopSheetCommon from './sc-top-sheet-common';

export class SCTopSheetParallels extends SCTopSheetCommon {
  static styles = [super.styles];

  static properties = {
    suttaplexItem: { type: Object },
  };

  constructor() {
    super();
    this.suttaplexItem = {};
  }

  connectedCallback() {
    super.connectedCallback();
    import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      '../suttaplex/card/sc-suttaplex.js'
    );
  }

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
  }

  areParallelsOpen() {
    return this.suttaplexItem?.parallel_count > 0;
  }

  render() {
    return html`
      <section>
        <sc-suttaplex
          .item=${this.suttaplexItem}
          .parallelsOpened=${this.areParallelsOpen()}
          .clearBorderRadius=${true}
          .suttaplexListStyle=${''}
        ></sc-suttaplex>
      </section>
    `;
  }
}

customElements.define('sc-top-sheet-parallels', SCTopSheetParallels);
