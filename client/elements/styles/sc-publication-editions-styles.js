/* eslint-disable import/prefer-default-export */
import { css } from 'lit';

export const SCPublicationEditionsStyles = css`
  * {
    margin: 0;
    padding: 0;
  }

  * + * {
    margin-top: 1em;
  }

  body {
    margin-top: 0;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
  }

  main {
    margin: 2em auto 4em;
    max-width: 720px;
    flex-grow: 1;
  }

  main,
  footer {
    flex-shrink: 0;
  }

  .page-header {
    text-align: center;
    border-bottom: 2px solid var(--sc-primary-color-light);
    margin-bottom: 4rem;
  }

  h1 {
    margin: 0;
    font-family: var(--sc-serif-font);
    font-variant-caps: small-caps;
    font-weight: 300;
    font-size: 3rem;
  }

  .subtitle {
    margin: 0;
    font-family: var(--sc-serif-font);
    font-style: italic;
    margin-bottom: 1rem;
  }

  .down-all ul {
    list-style-type: none;
  }
  .icon {
    width: 24px;
    height: 24px;
    fill: var(--sc-icon-color);
    vertical-align: middle;
    margin-right: 8px;
  }

  .project header {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .translation_title {
    color: var(--sc-primary-text-color);
    font-size: var(--sc-skolar-font-size-static-subtitle);
  }

  .translation_subtitle {
    font-size: var(--sc-skolar-font-size-md);
    font-style: italic;
  }
  .creator_name {
    font-variant-caps: all-small-caps;
    text-align: center;
    font-size: var(--sc-skolar-font-size-l);
  }

  .project a {
    color: inherit;
    text-decoration: none;
    display: block;
    border-radius: 4px;
  }

  .project a:hover {
    background-color: var(sc-primary-color);
  }
  .publication_blurb {
    padding: 1em;
    font-family: var(--sc-sans-font);
    min-height: 20em;
  }

  h2 {
    margin-top: 0;
  }

  article {
    margin-bottom: 8em;
  }

  .project {
    padding: 0;
    margin: 0;
  }

  .project:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 50%;
    margin-bottom: 24px;
    border-bottom: 1px solid var(--sc-border-color);
  }

  img {
    float: left;
    width: auto;
    height: 16em;
    margin: 0.5em 1em 1em 0;
    display: block;
  }

  .down-all {
    margin-bottom: 4em;
  }

  .down-all-notice {
    font-weight: normal;
    text-align: center;
    font-size: 1rem;
  }

  .button {
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    font-family: var(--sc-sans-font);
    font-size: 14px;
    display: block;
    padding: 0.5em;
    background-color: var(--sc-primary-accent-color);
    color: white;
    border-radius: 4px;
    text-decoration: none;
    box-shadow: var(--sc-shadow-elevation-1dp);
    letter-spacing: 0.1em;
  }

  .button:hover {
    box-shadow: var(--sc-shadow-elevation-4dp);
    background-color: var(--sc-primary-accent-color-light);
  }
`;
