import { css } from 'lit';

export const suttaplexCss = css`
  article {
    position: relative;

    background-color: var(--sc-secondary-background-color);
  }

  details {
    position: relative;

    box-sizing: border-box;
    margin: 0;
  }

  details ul {
    margin: 0 0 12px 0;
    padding: 12px 24px;

    color: var(--sc-on-tertiary-secondary-text-color);

    font-size: var(--sc-font-size-s);

    border-radius: 8px;
    background-color: var(--sc-tertiary-background-color);
  }

  a.top-menu-button,
  #copy-menu > summary {
    display: inline-flex;

    width: 34px;
    height: 34px;

    transition: background-color 0.2s ease;

    border-radius: 50%;

    justify-content: center;
    align-items: center;
  }

  .top-menu-button:hover,
  #copy-menu > summary:hover {
    transition: background-color 0.2s ease;

    border-radius: 50%;
    background-color: var(--sc-tertiary-background-color);
  }

  .top-menu-button:active,
  #copy-menu > summary:active {
    transition: background-color 0.2s ease;

    border-radius: 50%;
    background-color: var(--sc-darker-fixed-background-color);
  }

  summary {
    cursor: s-resize;

    outline-color: var(--sc-border-color);
  }

  /* Remove the default triangle */
  summary {
    display: flex;

    align-items: center;
  }

  /* Create a new custom triangle on the left side */
  .section-details summary::before {
    display: inline-block;

    width: 24px;
    height: 24px;
    margin-right: 0;
    margin-left: -8px;

    content: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="rgb(168,164,156)" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>');
    transition: 0.2s;
  }

  details[open] > summary::before {
    transform: rotate(90deg);
  }

  .main-translations summary {
    cursor: help;
  }

  .main-translations summary::after {
    display: inline-block;

    margin: 8px 0 0 8px;

    content: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"><path fill="rgb(168,164,156)" d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>');
    transition: 0.2s;
  }

  #copy-menu > summary {
    list-style-type: none;
  }

  .suttaplex-share-menu-list {
    position: absolute;
    z-index: 10;
    right: 0;

    max-width: 360px;
    margin: 4px 0 0;
    padding: 0;

    color: var(--sc-on-tertiary-primary-text-color);
    border: 1px solid var(--sc-border-color);
    border-radius: 8px;
    background-color: var(--sc-tertiary-background-color);
    box-shadow: var(--sc-shadow-elevation-4dp);
  }

  h1 {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-xl);
    font-weight: 500;

    margin: 0;
  }

  h1.compact {
    font-size: var(--sc-font-size-xl);
  }

  .hide-element {
    display: none;
  }

  .suttaplex {
    display: block;

    margin-bottom: var(--sc-size-md);
    padding: var(--sc-suttaplex-padding);

    border-radius: var(--sc-mid-border-radius);
    box-shadow: var(--sc-suttaplex-shadow);
  }

  .suttaplex.compact {
    margin-bottom: 1px;
    padding: var(--sc-size-sm) var(--sc-size-md);

    border-radius: 2px;
  }

  .compact .section-details.main-translations {
    margin-top: var(--sc-size-sm);
    padding-top: 0;

    border-top: none;
  }

  .top-row {
    display: flex;

    justify-content: space-between;
    align-items: center;
  }

  .top-row summary {
    cursor: pointer;
  }

  .top-row .compact {
    cursor: pointer;
  }

  .icon {
    fill: var(--sc-icon-color);
  }

  .difficulty_icon {
    width: 28px;
    height: 28px;
    margin-right: 4px;
  }

  .difficulty_icon .icon {
    width: 28px;
    height: 28px;

    fill: var(--sc-primary-accent-color);
    stroke: var(--sc-primary-accent-color);
  }

  .suttaplex-nerdy-row {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;

    display: flex;
    overflow: hidden;

    text-overflow: ellipsis;

    color: var(--sc-on-secondary-secondary-text-color);

    flex-wrap: wrap;
    gap: 1em;
  }

  .subTitle {
    font-weight: 600;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: all-small-caps;
  }

  .nerdy-row-element {
    display: inline-flex;

    flex-wrap: nowrap;
    align-items: center;
  }

  .vol-page {
    font-stretch: condensed;
  }

  .popuptext {
    display: none;
    overflow: visible;
  }

  .popuptext.show {
    display: unset;
  }

  .volpage-biblio-info,
  .suttaplex-nerdy-row .popuptext {
    font-size: var(--sc-font-size-s);

    position: absolute;
    z-index: 10;

    max-width: 360px;
    margin: 4px 0 0 0;
    padding: 8px 12px;

    white-space: normal;

    color: var(--sc-on-secondary-primary-text-color);
    border: 1px solid var(--sc-border-color);
    border-radius: 8px;
    background-color: var(--sc-tertiary-background-color);
    box-shadow: var(--sc-shadow-elevation-4dp);
  }

  .suttaplex-details {
    position: inherit;
  }

  .blurb {
    line-height: 1.333;

    margin: var(--sc-size-sm) 0;
  }

  .primary-accent-icon {
    color: var(--sc-primary-accent-color);

    stroke: var(--sc-primary-accent-color);
  }

  .section-details h3 {
    display: inline-block;

    margin: var(--sc-size-sm) 0;

    color: var(--sc-on-secondary-secondary-text-color);
  }

  .blurb,
  .section-details h3 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;
  }

  .top-row-icons {
    display: flex;

    align-items: center;
    gap: 0.5em;
  }

  #more_par_menu {
    outline: none;
  }

  sc-suttaplex-tx {
    display: block;

    margin: var(--sc-size-sm) 0;
  }

  sc-suttaplex-tx:first-of-type {
    margin-top: 0;
  }

  sc-suttaplex-tx:last-of-type {
    margin-bottom: 0;
  }

  .hidden {
    width: 0;
    height: 0;

    opacity: 0;
  }

  .book {
    width: 16px;
    height: 16px;
  }

  @media only screen and (max-width: 600px) {
    .book {
      display: none;
    }
  }
`;

export const suttaplexTxCss = css`
  a {
    position: relative;

    overflow: hidden;

    text-decoration: inherit;

    color: inherit;
  }

  .tx {
    position: relative;

    display: flex;

    margin: 0 -8px;
    padding: 0 8px;

    cursor: pointer;

    border-radius: 20px;

    align-items: center;
    flex-wrap: nowrap;
  }

  .tx,
  .tx:hover,
  .tx:active {
    transition: var(--sc-link-transition);
  }

  .tx:hover {
    background-color: var(--sc-primary-color-light-transparent);
  }

  .tx:active {
    background-color: var(--sc-primary-color-light);
  }

  .open_book {
    display: flex;

    width: 20px;
    height: 20px;
    padding: 4px;

    border: 2px solid var(--sc-primary-color);
    border-radius: 50%;

    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    fill: var(--sc-primary-color);
  }

  .tx-details {
    display: flex;
    flex-direction: row;

    padding: var(--sc-size-sm);

    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--sc-size-xs) var(--sc-size-md);
  }

  .tx-creator {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;
  }

  .tx-publication {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;

    color: var(--sc-on-secondary-secondary-text-color);
  }

  .badges {
    display: flex;

    gap: var(--sc-size-xs);
    align-self: center;
  }
`;

export const parallelsListCss = css`
  .parallels-table {
    width: 95%;
    margin: 0 auto;

    border-spacing: 0 var(--sc-size-sm);
    border-collapse: separate;
  }

  .parallels-relation-cell .icon {
    fill: var(--sc-icon-color);
  }

  .parallels-root-cell,
  .parallels-parallel-cell {
    transition: background-color 0.2s ease;

    border-radius: 16px;
    background-color: var(--sc-tertiary-background-color);
  }

  .parallels-root-cell:hover,
  .parallels-parallel-cell:hover {
    transition: background-color 0.2s ease;

    background-color: var(--sc-primary-color-light-transparent);
  }

  .parallels-root-cell:active,
  .parallels-parallel-cell:active {
    transition: background-color 0.2s ease;

    background-color: var(--sc-primary-color-light);
  }

  .parallels-parallel-cell {
    width: 100%;
    padding: 0;
  }

  @media screen and (max-width: 600px) {
    .parallels-parallel-cell {
      max-width: 200px;
    }
  }

  .parallels-root-cell {
    position: relative; /* Hack for anchor height. */

    min-width: 90px;
    padding: 0;

    text-align: center;
  }

  .parallels-root-cell a {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }

  .parallels-root-id {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
  }

  .parallels-table-body {
    display: block;

    margin-bottom: var(--sc-size-sm);
  }

  .root-link {
    display: flex;

    width: 100%;
    height: 100%;

    text-decoration: none;

    color: inherit;

    align-items: center;
    justify-content: center;
  }
`;

export const parallelItemCss = css`
  a {
    position: relative;

    display: block;

    text-decoration: inherit;

    color: inherit;
  }

  .parallel-item-main-info-container {
    position: relative;

    width: 100%;
    padding: var(--sc-size-sm) var(--sc-size-md);
  }

  .parallel-item-title {
    font-family: 'Skolar Sans PE Md', var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 500;

    margin-bottom: var(--sc-size-xs);

    word-wrap: normal;
  }

  .parallel-item-biblio-info {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;

    position: absolute;
    z-index: 50;

    margin: 0 var(--sc-size-xl) 0 0;
    padding: 12px;

    white-space: normal;

    color: var(--sc-on-secondary-secondary-text-color);
    border-radius: 12px;
    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-4dp);
  }

  .parallel-item-nerdy-row {
    display: flex;

    color: var(--sc-on-secondary-secondary-text-color);

    gap: 1em;
  }

  .parallel-item {
    flex-wrap: wrap;
  }

  .nerdy-row-element {
    display: inline-flex;

    flex-wrap: nowrap;
    align-items: center;
  }

  .disabled {
    cursor: default;

    background-color: var(--sc-tertiary-background-color);
  }

  .icon {
    fill: var(--sc-icon-color);
  }

  .volPage-row {
    display: inline-flex;

    align-items: center;
  }

  .vol-page {
    font-stretch: condensed;
  }

  .book {
    width: 16px;
    height: 16px;
  }

  .info {
    width: 16px;
    height: 16px;

    margin-top: 2px;
  }

  /* Remove the default triangle */
  summary {
    display: flex;

    align-items: center;

    cursor: help;
  }

  @media only screen and (max-width: 600px) {
    .book {
      display: none;
    }
  }
`;
