import { LitElement, html } from 'lit-element';

const styles = html`
<style>
  .contents
{
  margin: 0 auto !important;

  border-left: 4px solid var(--sc-primary-color-light);
  border-radius: 2px;
}

li
{
  font-family: var(--sc-sans-font);
  font-size: var(--sc-skolar-font-size-md);
  font-weight: 400;

  margin: .5em 0;
  padding: .25em 0 .25em clamp(0rem, 3vw, 1rem);
}

ol
{
  margin: 0;
  padding: 0 0 0 1rem;
}

li::marker
{
  font-family: var(--sc-sans-font);
  font-weight: bold;

  color: var(--sc-secondary-text-color);
}

a
{
  text-decoration: none;

  color: inherit;
}

a:hover
{
  color: var(--sc-primary-color);
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
        <nav class="contents">
          <ol>
            ${this.items ? this.items.map(item => html`<li><a href="${'#' + item.link}">${item.name}</a></li>`) : ''}
          </ol>
        </nav>
    `
  }
}

customElements.define('sc-nav-contents', SCNavContents);
