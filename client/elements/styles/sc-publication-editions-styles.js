/* eslint-disable import/prefer-default-export */
import { css } from 'lit';

export const SCPublicationEditionsStyles = css`
  main {
    max-width: 720px;
    margin: 2em auto 4em;
  }

  hgroup {
    text-align: center;
  }

  .page-header {
    border-bottom: 2px solid var(--sc-primary-color-light);
    margin-bottom: 4em;
  }

  h1 {
    font-family: var(--sc-serif-font);
    font-size: 3rem;
    font-weight: 300;

    margin: 0;

    font-variant-caps: small-caps;
  }

  .subtitle {
    font-family: var(--sc-serif-font);
    font-style: italic;

    margin: 0;
    margin-bottom: 1rem;
  }

  .down-all ul {
    list-style-type: none;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;

    vertical-align: middle;

    fill: var(--sc-icon-color);
  }

  .project hgroup {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .translation_title {
    font-size: var(--sc-skolar-font-size-static-subtitle);

    color: var(--sc-primary-text-color);
  }

  .translation_subtitle {
    font-size: var(--sc-skolar-font-size-md);
    font-style: italic;
  }

  .creator_name {
    font-size: var(--sc-skolar-font-size-l);

    text-align: center;

    font-variant-caps: all-small-caps;
  }

  .project a {
    display: block;

    text-decoration: none;
    text-decoration-color: var(--sc-primary-color-light);

    color: inherit;
    border-radius: 4px;
  }

  .project a:hover {
    background-color: var(sc-primary-color);
    text-decoration: underline;
    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 0.15em;
    text-underline-offset: 0.06em;
    transition: all 200ms ease;
  }

  .publication_blurb {
    font-family: var(--sc-sans-font);

    min-height: 20em;
    padding: 1em;
  }

  h2 {
    margin-top: 0;
  }

  article {
    margin-bottom: 8em;
  }

  .project {
    margin: 0;
    padding: 0;
  }

  .project:before {
    display: block;

    width: 50%;
    margin: 0 auto;
    margin-bottom: 24px;

    content: '';

    border-bottom: 1px solid var(--sc-border-color);
  }

  img {
    display: block;
    float: left;

    width: auto;
    height: 16em;
    margin: 0.5em 1em 1em 0;

    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  .down-all {
    margin-bottom: 4em;
  }
`;
