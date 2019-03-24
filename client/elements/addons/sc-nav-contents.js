import { LitElement, html } from '@polymer/lit-element';

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
    @apply --sc-paper-font-body;
    margin: 0.5em 0;
    padding: var(--sc-size-xs) 0;
  }

  ol {
    margin: 1em 0 0 0;
  }

  a {
    @apply --sc-inline-link;
    text-decoration: none;
  }

  a:hover  {
    @apply --sc-inline-link-hover;
  }

  a:visited {
    @apply --sc-inline-link-visited;
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
              ${this.items.map(item => html`<li><a href="${'#' + item.link}">${item.name}</a></li>`)}
          </ol>
        </nav>
      </div>
    `
  }
}

customElements.define('sc-nav-contents', SCNavContents);
