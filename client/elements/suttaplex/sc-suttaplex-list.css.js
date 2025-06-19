import { css } from 'lit';

export const suttaplexListCss = css`
  :host {
    display: block;
  }

  md-filled-button {
    --md-sys-color-primary: var(--sc-primary-accent-color);
    --md-sys-color-on-primary: #ffffff;
    --md-filled-button-label-text-font: var(--sc-sans-font);
    --md-filled-button-label-text-size: var(--sc-size-md);
    width: 100%;
  }

  .division-content {
    color: var(--sc-on-secondary-primary-text-color);
    position: relative;
    padding: 0;
  }

  .main {
    margin: 0 auto 64px;
    max-width: 720px;
  }

  @media (max-width: 680px) {
    .main {
      margin-top: -40px;
    }
  }

  .node {
    padding: var(--sc-size-md) var(--sc-size-md) 0;
    color: var(--sc-on-secondary-secondary-text-color);
  }

  .vagga-node {
    padding: var(--sc-size-md) var(--sc-size-md) var(--sc-size-sm) var(--sc-size-md);
    color: var(--sc-on-secondary-secondary-text-color);
  }

  .vagga-node + .vagga-node {
    padding-top: 0;
  }

  .loading-spinner {
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  .hidden {
    display: none;
  }

  .compact {
    margin-top: 1em;
  }
`;

export const suttaplexListTableViewCss = css`
  table {
    margin: 3vw;
    display: flex;
    justify-content: center;
    border-collapse: collapse;
  }

  tr {
    vertical-align: baseline;
    border-bottom: 1px solid var(--sc-border-color);
  }

  tr:first-of-type {
    border-top: 1px solid var(--sc-border-color);
  }

  td,
  th {
    padding: 0.5em;
  }

  .uid {
    white-space: nowrap;
    text-decoration: none;
  }

  table a {
    transition: var(--sc-link-transition);
    text-decoration: none;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.15em;
  }

  table a:hover {
    transition: var(--sc-link-transition);
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 4px;
    text-underline-offset: 0.15em;
  }

  table a:active {
    text-decoration-color: var(--sc-primary-color);
  }

  table a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  .parallels .uid {
    margin-left: 0.2em;
  }
`;
