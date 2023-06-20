import { css } from 'lit';

export const suttaplexListCss = css`
  :host {
    display: block;
  }

  md-filled-button {
    --md-filled-button-label-text-type: 500 var(--sc-size-md) system-ui;
    --md-sys-color-primary: var(--sc-primary-accent-color);
    --md-sys-color-on-primary: #FFFFFF;
    width: 100%;
  }

  .division-content {
    color: var(--sc-primary-text-color);
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
    color: var(--sc-secondary-text-color);
  }

  .vagga-node {
    padding: var(--sc-size-md) var(--sc-size-md) var(--sc-size-sm) var(--sc-size-md);
    color: var(--sc-secondary-text-color);
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
    color: inherit;
    text-decoration: none;
  }

  .uid:hover {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--sc-primary-color);
    text-decoration-thickness: 0.15em;
    text-underline-offset: 0.06em;

    background-color: var(--sc-primary-color-light-transparent);
  }

  .uid:active {
    background-color: var(--sc-primary-color-light);
  }

  .uid:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  .parallels .uid {
    margin-left: 0.2em;
  }
`;
