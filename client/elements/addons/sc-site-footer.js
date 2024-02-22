import { LitElement, html, css } from 'lit';

import { LitLocalized } from './sc-localization-mixin';
import { SCUtilityStyles } from '../styles/sc-utility-styles';

export class ScSiteFooter extends LitLocalized(LitElement) {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/footer';
  }

  static styles = css`
    ${SCUtilityStyles}
    sc-site-footer {
      display: block;
      margin-top: auto;
    }

    footer {
      padding: 4em 4vw;
      background-color: var(--sc-tertiary-background-color);
      color: var(--sc-on-tertiary-secondary-text-color);
    }

    .footer-top {
      display: inline-flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: stretch;
      gap: 2em;
    }

    .footer-top div {
      min-width: 16em;
      flex: 1;
    }

    h2 {
      font-size: var(--sc-font-size-xxl);
      font-weight: 300;
    }

    footer ul {
      padding: 0;
    }

    footer li {
      line-height: 1.5;
      padding-top: 4px;
      list-style-type: none;
      margin-left: -14px;
    }

    .footer-bottom {
      display: flex;
      flex-direction: row;
      text-align: center;
      justify-content: space-around;
    }

    .footer-bottom li {
      display: inline-block;
      padding: 1em 2em 0 2em;
    }

    li a {
      display: inline-block;
      border-radius: 20px;
      padding: 8px 16px;
    }

    @media print {
      footer {
        display: none;
      }
    }
  `;

  render() {
    return html`
      <footer>
        <section class="footer-top">
          <div class="first">
            <h2>${this.localize('footer:usefulThings')}</h2>
            <ul>
              <li>
                <a class="block-link" href="/introduction"
                  >${this.localize('footer:introduction')}</a
                >
              </li>
              <li><a class="block-link" href="/start">${this.localize('footer:start')}</a></li>
              <li>
                <a class="block-link" href="/discourses-guide-sujato"
                  >${this.localize('footer:discoursesGuideSujato')}</a
                >
              </li>
              <li>
                <a class="block-link" href="/general-guide-sujato"
                  >${this.localize('footer:generalGuideSujato')}</a
                >
              </li>
              <li>
                <a class="block-link" href="/subjects">${this.localize('footer:subjects')}</a>
              </li>
              <li>
                <a class="block-link" href="/editions">${this.localize('footer:editions')}</a>
              </li>
            </ul>
          </div>
          <div class="second">
            <h2>${this.localize('footer:technicalInformation')}</h2>
            <ul>
              <li>
                <a class="block-link" href="/languages">${this.localize('footer:languages')}</a>
              </li>
              <li>
                <a class="block-link" href="/numbering">${this.localize('footer:numbering')}</a>
              </li>
              <li>
                <a class="block-link" href="/methodology">${this.localize('footer:methodology')}</a>
              </li>
              <li>
                <a class="block-link" href="https://github.com/suttacentral"
                  >${this.localize('footer:sourceCode')}</a
                >
              </li>
            </ul>
          </div>
          <div class="third">
            <h2>${this.localize('footer:relatedProjects')}</h2>
            <ul>
              <li>
                <a class="block-link" href="https://discourse.suttacentral.net"
                  >${this.localize('footer:scforum')}</a
                >
              </li>
              <li>
                <a class="block-link" href="https://voice.suttacentral.net/scv/index.html"
                  >${this.localize('footer:scvoice')}</a
                >
              </li>
              <li>
                <a class="block-link" href="https://buddhanexus.net"
                  >${this.localize('footer:buddhaNexus')}</a
                >
              </li>
              <li>
                <a class="block-link" href="https://readingfaithfully.org/"
                  >${this.localize('footer:readingfaithfully')}</a
                >
              </li>
               <li>
                <a class="block-link" href="https://buddhism.net/"
                  >Buddhism.net — making the teachings of the Buddha accessible</a>
              </li>
              <li>
                <a class="block-link" href="https://suttacentral.github.io/awesome/"
                  >${this.localize('footer:scawesome')}</a
                >
              </li>
            </ul>
          </div>
        </section>
        <section class="footer-bottom">
          <ul>
            <li><a class="block-link" href="/">${this.localize('footer:home')}</a></li>
            <li>
              <a class="block-link" href="/acknowledgments"
                >${this.localize('footer:acknowledgments')}</a
              >
            </li>
            <li>
              <a class="block-link" href="/licensing">${this.localize('footer:licensing')}</a>
            </li>
            <li><a class="block-link" href="/About">${this.localize('footer:about')}</a></li>
          </ul>
        </section>
      </footer>
    `;
  }

  firstUpdated() {
    this.addEventListener('click', e => {
      this.parentNode.querySelector('#action_items')?.hideTopSheets?.();
    });
  }
}

customElements.define('sc-site-footer', ScSiteFooter);
