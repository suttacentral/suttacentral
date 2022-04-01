import { LitElement, html, css } from 'lit';

class ScSiteFooter extends LitElement {
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

  render() {
    return html`
      <footer>
        <section class="footer-top">
          <div class="first">
            <h2>Useful things</h2>
            <ul>
              <li>Introduction to SuttaCentral</li>
              <li>Getting started with reading suttas</li>
              <li>Discourses: conversations with the Buddha</li>
              <li>Reader’s Guides</li>
              <li>Indexes</li>
            </ul>
          </div>
          <div class="second">
            <h2>Technical information</h2>
            <ul>
              <li>Statistics for languages on SuttaCentral</li>
              <li>Sutta numbering systems</li>
              <li>Methodology for parallels</li>
              <li>Source code on Github</li>
            </ul>
          </div>
          <div class="third">
            <h2>Related projects</h2>
            <ul>
              <li>Discuss and Discover—SuttaCentral forum</li>
              <li>SuttaCentral Voice—listen to suttas</li>
              <li>BuddhaNexus—mapping suttas with AI</li>
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
