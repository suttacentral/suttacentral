import { LitElement, html, css } from 'lit';

import { LitLocalized } from './sc-localization-mixin';

export class ScSiteFooter extends LitLocalized(LitElement) {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
  }

  static styles = css`
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
      transition: var(--sc-link-transition);
      text-decoration: none;
      color: inherit;

      border-radius: 20px;

      padding: 8px 16px;

    }

    li a:hover {
      
      color: inherit;
      background-color: var(--sc-primary-color-light-transparent);
    }

    li a:active {
      background-color: var(--sc-primary-color-light);
    }

    li a:visited:hover {
      text-decoration-color: var(--sc-primary-color-dark);
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
              <li><a href="/introduction">${this.localize('footer:introduction')}</a></li>
              <li><a href="/start">${this.localize('footer:start')}</a></li>
              <li>
                <a href="/discourses-guide-sujato"
                  >${this.localize('footer:discoursesGuideSujato')}</a
                >
              </li>
              <li>
                <a href="/general-guide-sujato">${this.localize('footer:generalGuideSujato')}</a>
              </li>
              <li><a href="/subjects">${this.localize('footer:subjects')}</a></li>
              <li>
                <a href="/editions">${this.localize('footer:editions')}</a>
              </li>
            </ul>
          </div>
          <div class="second">
            <h2>${this.localize('footer:technicalInformation')}</h2>
            <ul>
              <li><a href="/languages">${this.localize('footer:languages')}</a></li>
              <li><a href="/numbering">${this.localize('footer:numbering')}</a></li>
              <li><a href="/methodology">${this.localize('footer:methodology')}</a></li>
              <li>
                <a href="https://github.com/suttacentral">${this.localize('footer:sourceCode')}</a>
              </li>
            </ul>
          </div>
          <div class="third">
            <h2>${this.localize('footer:relatedProjects')}</h2>
            <ul>
              <li>
                <a href="https://discourse.suttacentral.net">${this.localize('footer:scforum')}</a>
              </li>
              <li>
                <a href="https://voice.suttacentral.net/scv/index.html"
                  >${this.localize('footer:scvoice')}</a
                >
              </li>
              <li>
                <a href="https://buddhanexus.net">${this.localize('footer:buddhaNexus')}</a>
              </li>
              <li>
                <a href="https://readingfaithfully.org/"
                  >${this.localize('footer:readingfaithfully')}</a
                >
              </li>
              <li>
                <a href="https://suttacentral.github.io/awesome/"
                  >${this.localize('footer:scawesome')}</a
                >
              </li>
            </ul>
          </div>
        </section>
        <section class="footer-bottom">
          <ul>
            <li><a href="/">${this.localize('footer:home')}</a></li>
            <li><a href="/acknowledgments">${this.localize('footer:acknowledgments')}</a></li>
            <li><a href="/licensing">${this.localize('footer:licensing')}</a></li>
            <li><a href="/About">${this.localize('footer:about')}</a></li>
          </ul>
        </section>
      </footer>
    `;
  }
}

customElements.define('sc-site-footer', ScSiteFooter);
