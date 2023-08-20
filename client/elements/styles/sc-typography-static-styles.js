import { css } from 'lit';

export const typographyStaticStyles = css`
  /* styles unique to static pages */
  li {
    padding: 0.25em 0.5em;
    margin: 0 0 0 1em;
  }

  pre {
    font-family: var(--sc-monospace-font);
  }
  .byline {
    font-style: italic;
  }
  .link-button {
    display: inline-flex;

    box-sizing: border-box;
    min-width: 64px;
    height: 36px;
    padding: 0 15px;

    letter-spacing: var(--sc-caps-letter-spacing);

    color: var(--sc-primary-accent-color);
    border: 2px solid var(--sc-primary-accent-color);
    background-color: inherit;

    align-items: center;
    justify-content: center;
    font-variant-caps: all-small-caps;
  }
  .link-button:hover {
    background-color: var(--sc-primary-accent-color-light-transparent);
  }
  /* images */
  img {
    display: block;

    max-width: 100%;
    margin: 32px auto;
  }
  /* indexes */

  .description {
    font-style: italic;

    margin: 0;
  }
  .type {
    margin-bottom: 0.5em;
  }
  .life-events {
    font-style: italic;

    margin-top: 0.5em;

    color: var(--sc-on-primary-secondary-text-color);
  }
  .term-translation {
    font-family: var(--sc-serif-font);
    font-style: normal;
  }
  .entry-list {
    display: flex;
    flex-direction: row;

    text-align: center;

    flex-wrap: wrap;
  }
  .entry-list a {
    display: inline-block;

    width: 64px;

    padding: 0.5em 0;

    text-decoration: none;

    border-radius: 2px;
  }
  .entry-list a:hover {
    background-color: var(--sc-primary-color-light-transparent);
    transition: background-color 200ms ease;
  }
  .entry-list a:active {
    background-color: var(--sc-primary-color-light);
  }
  .subject {
    font-style: italic;

    color: var(--sc-on-primary-secondary-text-color);
  }
  .subject:before {
    content: '(';
  }
  .subject:after {
    content: ')';
  }
  .static-copyright {
    margin-top: 64px;
    padding: 1em 2em;

    color: var(--sc-on-primary-secondary-text-color);
    border: var(--sc-border);
    border-radius: 2px;
    background: var(--sc-tertiary-background-color);
  }
  .about-index {
    margin-top: 64px;
    padding: 1em 2em;

    color: var(--sc-on-primary-secondary-text-color);
    border: var(--sc-border);
    border-radius: 2px;
  }

  sc-page-selector {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;
    line-height: 1.5;
    color: var(--sc-on-primary-primary-text-color);
  }
`;
