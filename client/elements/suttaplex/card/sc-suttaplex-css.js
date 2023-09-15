import { css } from 'lit';

export const suttaplexCss = css`
  article {
    background-color: var(--sc-secondary-background-color);
    position: relative;
  }

  details {
    position: relative;

    box-sizing: border-box;
    margin: 0;
  }

  details p,
  details ul {
    position: absolute;
    z-index: 10;

    max-width: 210px;
    margin: 4px 0 0 0;
    padding: 12px 12px;

    color: var(--sc-on-secondary-secondary-text-color);
    border-radius: 12px;
    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-4dp);
  }

  a.top-menu-button,
  #copy-menu > summary {
    height: 34px;
    width: 34px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  .top-menu-button:hover,
  #copy-menu > summary:hover {
    background-color: var(--sc-tertiary-background-color);
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  .top-menu-button:active,
  #copy-menu > summary:active {
    background-color: var(--sc-darker-fixed-background-color);
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  details ul {
    right: 0px;
    padding: 8px 12px 8px 24px;
    font-size: var(--sc-font-size-xs);
  }

  .suttaplex-share-menu-list {
    padding: 0;
  }

  summary {
    cursor: pointer;

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
    transition: 0.2s;
    height: 24px;
    width: 24px;
    margin-left: -8px;
    margin-right: 0px;
    content: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="rgb(128,117,103)" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>');
  }

  details[open] > summary::before {
    transform: rotate(90deg);
  }

  #copy-menu > summary {
    list-style-type: none;
  }

  .suttaplex-share-menu-list {
    background-color: var(--sc-secondary-background-color);
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
    padding: var(--sc-suttaplex-padding);
    margin-bottom: var(--sc-size-md);
    box-shadow: var(--sc-suttaplex-shadow);
    border-radius: var(--sc-mid-border-radius);
  }

  .suttaplex.compact {
    padding: var(--sc-size-sm) var(--sc-size-md);
    border-radius: 2px;
    margin-bottom: 1px;
  }

  .compact .section-details.main-translations {
    border-top: none;
    padding-top: 0;
    margin-top: var(--sc-size-sm);
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .top-row .compact {
    cursor: pointer;
  }

  .icon {
    fill: var(--sc-icon-color);
  }

  .difficulty_icon {
    height: 28px;
    width: 28px;
    margin-right: 4px;
  }

  .difficulty_icon .icon {
    fill: var(--sc-primary-accent-color);
    stroke: var(--sc-primary-accent-color);
    height: 28px;
    width: 28px;
  }

  .suttaplex-nerdy-row {
    display: flex;
    flex-wrap: wrap;
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    color: var(--sc-on-secondary-secondary-text-color);
    text-overflow: ellipsis;
    overflow: hidden;
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
    overflow: visible;
    display: none;
  }

  .popuptext.show {
    display: unset;
  }

  .volpage-biblio-info,
  .suttaplex-nerdy-row .popuptext {
    position: absolute;
    z-index: 10;

    max-width: 360px;
    margin: 4px 0 0 0;
    padding: 8px 12px;

    font-size: var(--sc-font-size-s);

    color: var(--sc-on-secondary-primary-text-color);
    border: 1px solid var(--sc-border-color);
    border-radius: 8px;
    background-color: var(--sc-tertiary-background-color);
    box-shadow: var(--sc-shadow-elevation-4dp);

    white-space: normal;
  }

  .suttaplex-details {
    position: inherit;
  }

  .blurb {
    margin: var(--sc-size-sm) 0;
    line-height: 1.333;
  }

  .primary-accent-icon {
    color: var(--sc-primary-accent-color);
    stroke: var(--sc-primary-accent-color);
  }

  .section-details h3 {
    margin: var(--sc-size-sm) 0;
    color: var(--sc-on-secondary-secondary-text-color);
    display: inline-block;
  }

  .blurb,
  .section-details h3 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;
  }

  .top-row-icons {
    align-items: center;
    display: flex;
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
    width: 0px;
    height: 0px;
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
    color: inherit;
    text-decoration: inherit;
    position: relative;
    overflow: hidden;
  }

  .tx {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    padding: 0 8px;
    margin: 0 -8px;
    border-radius: 20px;
    position: relative;
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
    height: 20px;
    width: 20px;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    fill: var(--sc-primary-color);
    border: 2px solid var(--sc-primary-color);
  }

  .tx-details {
    padding: var(--sc-size-sm);
    display: flex;
    flex-direction: row;
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
    color: var(--sc-on-secondary-secondary-text-color);
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
  }

  .badges {
    display: flex;
    gap: var(--sc-size-xs);
    align-self: center;
  }
`;

export const parallelsListCss = css`
  .parallels-table {
    border-collapse: separate;
    border-spacing: 0 var(--sc-size-sm);
    margin: 0 auto;
    width: 95%;
  }

  .parallels-relation-cell .icon {
    fill: var(--sc-icon-color);
  }

  .parallels-root-cell,
  .parallels-parallel-cell {
    border-radius: 16px;
    background-color: var(--sc-tertiary-background-color);
    transition: background-color 0.2s ease;
  }

  .parallels-root-cell:hover,
  .parallels-parallel-cell:hover {
    background-color: var(--sc-primary-color-light-transparent);
    transition: background-color 0.2s ease;
  }

  .parallels-root-cell:active,
  .parallels-parallel-cell:active {
    background-color: var(--sc-primary-color-light);
    transition: background-color 0.2s ease;
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
    text-align: center;
    min-width: 90px;
    padding: 0;
    position: relative; /* Hack for anchor height. */
  }

  .parallels-root-cell a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
  }
`;

export const parallelItemCss = css`
  a {
    color: inherit;
    text-decoration: inherit;
    position: relative;
    display: block;
  }

  .parallel-item-main-info-container {
    width: 100%;
    padding: var(--sc-size-xs) var(--sc-size-sm);
    position: relative;
  }

  .parallel-item-title {
    font-family: 'Skolar Sans PE Md', var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 500;
    word-wrap: normal;
    margin-bottom: var(--sc-size-xs);
  }

  .parallel-item-biblio-info {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    box-shadow: var(--sc-shadow-elevation-4dp);
    position: absolute;
    z-index: 50;
    background-color: var(--sc-secondary-background-color);
    padding: 12px;
    margin: 0 var(--sc-size-xl) 0 0;
    white-space: normal;
  }

  .parallel-item-nerdy-row {
    color: var(--sc-on-secondary-secondary-text-color);
    display: flex;
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

  /* Remove the default triangle */
  summary {
    display: flex;
    align-items: center;
  }

  /* Create a new custom triangle on the left side */
  summary::before {
    display: inline-block;
    transition: 0.2s;
    height: 24px;
    width: 24px;
    margin-left: -8px;
    margin-right: -4px;
    content: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="rgb(128,117,103)" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>');
  }

  details[open] > summary::before {
    transform: rotate(90deg);
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
    width: 18px;
    height: 18px;
  }

  /* Remove the default triangle */
  summary {
    display: flex;
    align-items: center;
  }

  /* Create a new custom triangle on the left side */
  summary::before {
    display: inline-block;

    transition: 0.2s;
    height: 24px;
    width: 24px;
    margin-left: -8px;
    margin-right: -4px;

    content: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="rgb(128,117,103)" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>');
  }

  details[open] > summary::before {
    transform: rotate(90deg);
  }

  @media only screen and (max-width: 600px) {
    .book {
      display: none;
    }
  }
`;
