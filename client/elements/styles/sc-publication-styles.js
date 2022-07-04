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

  dd a {
    display: block;
    background-color: var(--sc-tertiary-background-color);
    margin: 1em 0;
    padding: 1em 2em;
    text-decoration: none;

    transition: all 200ms ease;
  }

  dd a:hover {
    background-color: var(--sc-primary-color-light-transparent);
  }

  table {
    margin: 4em auto;
    width: 100%;
    position: relative;
    border-collapse: collapse;
    font-family: var(--sc-sans-font);
  }

  caption {
    font-size: 1.5em;
    margin-bottom: 0px;
    font-weight: normal;
  }

  table .icon {
    height: 24px;
    width: 24px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
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
    display: inline-block;
    padding: 0.5em 1em 0.5em 0.75em;
    background-color: var(--sc-primary-accent-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-weight: 500;
  }

  table a:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    background-color: var(--sc-primary-accent-color);
  }

  tfoot td:first-child {
    font-weight: normal;
    font-size: 0.8em;
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
    color: #757575;
    text-align: center;
    font-size: 0.8em;
    font-family: var(--sc-sans-font);
  }

  dl.publication {
    font-family: var(--sc-sans-font);
    font-size: 0.8em;
  }
  dt {
    font-weight: bold;
  }
`;
