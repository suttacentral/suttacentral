import { css } from 'lit';

export const SCPublicationStyles = css`
  main {
    max-width: 720px;
    margin: 2em auto 4em;
  }

  hgroup {
    text-align: center;
  }

  h1 {
    margin: 0;
  }

  hgroup h1 {
    font-variant-caps: small-caps;
  }

  .translation_subtitle {
    font-size: var(--sc-font-size-md);
    font-style: italic;
  }

  .creator_name {
    font-size: var(--sc-font-size-l);

    text-align: center;

    font-variant-caps: all-small-caps;
  }

  [rel~='license'] {
    display: block;

    margin: 1em 0;
    padding: 1em 2em;

    border-radius: var(--sc-big-border-radius);
    background-color: var(--sc-tertiary-background-color);
  }

  [rel~='license'] p {
    margin-top: 0;
  }

  table {
    font-family: var(--sc-sans-font);

    position: relative;

    width: 100%;
    margin: 4em auto;
    padding: 1em 2vw;

    border-spacing: 0;
    border-collapse: initial;

    border: 1px solid var(--sc-border-color);
    border-radius: var(--sc-big-border-radius);
  }

  caption {
    font-size: var(--sc-font-size-xl);
    font-weight: normal;
    font-style: italic;

    margin-bottom: 0;
    padding: 2rem 1rem 1rem 1rem;
  }

  table .icon {
    display: inline-block;

    width: 24px;
    height: 48px;
    margin-right: 8px;

    vertical-align: middle;
  }

  table a .icon {
    height: 24px;
  }

  table svg {
    display: inline-block;

    margin-right: 1vw;

    vertical-align: middle;

    fill: var(--sc-icon-color);
  }

  table a .icon {
    fill: var(--sc-icon-color);
  }

  .link-button {
    width: 100%;
    min-width: fit-content;
    max-width: min-content;
    height: 48px;
    padding-right: 4vw;
    padding-left: 4vw;
  }

  .link-button + .link-button {
    display: flex;
    margin-top: 8px;
  }

  td {
    padding: 2vw;

    vertical-align: middle;
  }

  tfoot td:first-child {
    font-size: var(--sc-font-size-s);
    font-weight: normal;

    color: var(--sc-on-primary-secondary-text-color);
  }

  tbody td:first-child span {
    font-size: var(--sc-font-size-l);
    font-weight: normal;

    display: inline-flex;
    flex-direction: column;

    font-variant-caps: all-small-caps;
  }

  small {
    font-size: var(--sc-font-size-s);
    font-weight: 500;
    font-stretch: condensed;
    line-height: 1;

    color: var(--sc-on-primary-secondary-text-color);

    font-variant-caps: initial;
  }

  figure {
    float: right;

    max-width: 300px;
    height: auto;
    margin: 0 0 0 2em;
  }

  @media screen and (max-width: 600px) {
    figure {
      float: initial;

      max-width: 300px;
      margin: 2em auto 0;
    }
  }

  figure img {
    margin: 0 0 8px 0;

    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  figcaption {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);

    margin-top: 0;

    text-align: center;

    color: var(--sc-on-primary-secondary-text-color);
  }

  dl.publication {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
  }

  dt {
    font-weight: bold;
  }
`;
