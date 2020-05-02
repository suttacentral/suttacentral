import { LitElement, html } from 'lit-element';

const styles = html`
<style>
  .contents {
    margin: 0 auto !important;
    padding: 0 var(--sc-size-md);
    max-width: 720px;
    display: block;
    border-radius: 2px;
    border-left: 4px solid #F6C200;
  }

  li {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 24px;
    margin: 0.5em 0;
    padding: var(--sc-size-xs) 0;
  }

  ol {
    margin: 1em 0 0 0;
  }

  a {
        color: inherit;
        text-decoration: underline;
        text-decoration-color: var(--sc-primary-color);
        text-decoration-skip-ink: auto;
    text-decoration: none;
  }

  a:hover  {
    color: var(--sc-primary-color);
  }

  a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }
</style>`;

export class SCNavContents extends LitElement {

  static get properties() {
    return {
      items: {
        type: Object
      }
    }
  }

  render() {
    return html`
      ${styles}
      <div class="wrapper">
        <nav class="contents">
          <ol>
            ${this.items ? this.items.map(item => html`<li><a href="${'#' + item.link}">${item.name}</a></li>`) : ''}
          </ol>
        </nav>
      </div>
    `
  }
}

customElements.define('sc-nav-contents', SCNavContents);
