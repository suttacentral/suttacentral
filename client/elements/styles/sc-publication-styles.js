/* eslint-disable import/prefer-default-export */
import { css } from 'lit';

export const SCPublicationStyles = css`
  main {
    max-width: 720px;
    margin: 2em auto 4em;
  }

  h1 {
    margin: 0;
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

  [rel~='license'] {
    display: block;

    margin: 1em 0;
    padding: 1em 2em;

    transition: all 200ms ease;
    text-decoration: none;

    background-color: var(--sc-tertiary-background-color);
  }

  [rel~='license']:hover {
    background-color: var(--sc-primary-color-light-transparent);
  }

  [rel~='license'] p {
    margin-top: 0;
  }

  table {
    font-family: var(--sc-sans-font);

    position: relative;

    width: 100%;
    margin: 4em auto;

    border-collapse: collapse;
  }

  caption {
    font-size: 1.5em;
    font-weight: normal;

    margin-bottom: 0;
  }

  table .icon {
    display: inline-block;

    width: 24px;
    height: 24px;
    margin-right: 8px;

    vertical-align: middle;
  }

  table .paperback {
    width: 36px;
    height: 36px;
    margin: -8px 4px 0 -8px;
  }

  table a .icon {
    fill: white;
  }

  table a {
    font-weight: 500;

    display: inline-block;

    padding: 0.5em 1em 0.5em 0.75em;

    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    text-decoration: none;

    color: white;
    border-radius: 5px;
    background-color: var(--sc-primary-accent-color);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  table a:hover {
    background-color: var(--sc-primary-accent-color);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  tfoot td:first-child {
    font-size: 0.8em;
    font-weight: normal;
  }

  figure {
    float: right;

    width: 300px;
    height: auto;
    margin: 0 0 1em 1em;
  }

  figure img {
    margin-bottom: 8px;

    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  figcaption {
    font-family: var(--sc-sans-font);
    font-size: 0.8em;

    text-align: center;

    color: #757575;
  }

  dl.publication {
    font-family: var(--sc-sans-font);
    font-size: 0.8em;
  }

  dt {
    font-weight: bold;
  }
`;
