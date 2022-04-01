import { LitElement, html, css } from 'lit';

import { LitLocalized } from './sc-localization-mixin';

class ScSiteFooter extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      footer {
        background-color: var(--sc-tertiary-background-color);
        padding: 4em 4vw;
      }

      .footer-top {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        align-items: left;
        align-items: stretch;
        gap: 2em;
      }

      .footer-top div {
        flex: 1;
        min-width: 16em;
      }

      footer ul {
        padding: 0;
      }

      footer li {
        padding: 1em 0 0 0;
        list-style-type: none;
      }

      .footer-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        text-align: center;
      }

      .footer-bottom li {
        display: inline-block;
        padding: 1em 2em 0 2em;
      }
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
  }

  render() {
    return html`
      <footer>
        <section class="footer-top">
          <div class="first">
            <h2>Useful things</h2>
            <ul>
              <li><a href="/introduction">Introduction to SuttaCentral</a></li>
              <li><a href="/start">Getting started with reading suttas</a></li>
              <li>
                <a href="/discourses-guide-sujato">Discourses: conversations with the Buddha</a>
              </li>
              <li><a href="/general-guide-sujato">Reader’s Guides</a></li>
              <li><a href="/subjects">Indexes</a></li>
            </ul>
          </div>
          <div class="second">
            <h2>Technical information</h2>
            <ul>
              <li><a href="/languages">Statistics for languages on SuttaCentral</a></li>
              <li><a href="/numbering">Sutta numbering systems</a></li>
              <li><a href="/methodology">Methodology for parallels</a></li>
              <li>
                <a href="https://github.com/suttacentral/suttacentral">Source code on Github</a>
              </li>
            </ul>
          </div>
          <div class="third">
            <h2>Related projects</h2>
            <ul>
              <li>
                <a href="https://discourse.suttacentral.net"
                  >Discuss and Discover—SuttaCentral forum</a
                >
              </li>
              <li>
                <a href="https://voice.suttacentral.net/scv/index.html"
                  >SuttaCentral Voice—listen to suttas</a
                >
              </li>
              <li><a href="https://buddhanexus.net">BuddhaNexus—mapping suttas with AI</a></li>
              <li>
                Reading Faithfully—Devotional and contemplative sutta reading for the faithful
                disciple
              </li>
            </ul>
          </div>
        </section>
        <section class="footer-bottom">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/acknowledgments">Acknowledgements</a></li>
            <li><a href="/licensing">Licensing</a></li>
            <li><a href="/About">About</a></li>
          </ul>
        </section>
      </footer>
    `;
  }
}
customElements.define('sc-site-footer', ScSiteFooter);
