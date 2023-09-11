import { LitElement, css } from 'lit';
import { LitLocalized } from './sc-localization-mixin';

export default class SCTopSheetCommon extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      position: absolute;
      z-index: 100;

      display: none;
      overflow-y: auto;

      width: 100%;
      max-height: 65vh;

      color: var(--sc-on-primary-primary-text-color);
      border-bottom: 1px solid var(--sc-border-color);
      background-color: var(--sc-secondary-background-color);
      box-shadow: var(--sc-shadow-elevation-4dp);

      --sc-suttaplex-shadow: var(--sc-shadow-elevation-0dp);

      --sc-suttaplex-padding: 0;
    }

    section {
      max-width: 720px;
      margin: var(--sc-size-lg) auto;
      padding: 0 3vw;
    }

p a,
li a,
dl a,
table a
{
    transition: var(--sc-link-transition);
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 2px;
    text-underline-offset: .15em;
}

p a:hover,
li a:hover,
dl a:hover,
table a:hover
{
    transition: var(--sc-link-transition);
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 4px;
    text-underline-offset: .15em;
}

p a:active,
li a:active,
dl a:active,
table a:active
{
    text-decoration-color: var(--sc-primary-color);
}

p a:visited,
li a:visited,
dl a:visited,
table a:visited
{
    text-decoration-color: var(--sc-primary-color-dark);
}
  `;

  show() {
    this.style.display = 'block';
  }

  hide() {
    this.style.display = 'none';
  }

  toggle() {
    this.style.display = this.style.display === 'block' ? 'none' : 'block';
  }
}
