import { css } from 'lit';

export const SCPageSearchStyles = css`
  :host {
    --mdc-theme-primary: var(--sc-primary-accent-color);
    --mdc-select-fill-color: var(--sc-tertiary-background-color);
    --mdc-typography-font-family: var(--sc-sans-font);
    --mdc-theme-surface: var(--sc-secondary-background-color);
    --mdc-select-ink-color: var(--sc-primary-text-color);
    --mdc-select-label-ink-color: var(--sc-secondary-text-color);
    --mdc-select-dropdown-icon-color: var(--sc-icon-color);

    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 1.5;

    display: block;

    width: 100%;

    color: var(--sc-primary-text-color);
  }

  mwc-list-item {
    color: var(--sc-primary-text-color);
  }

  h2 {
    line-height: 1.25;
  }

  #search_result_list {
    padding: var(--sc-size-xl) 0 var(--sc-size-md);
  }

  .search-results-container {
    margin: 0 3vw var(--sc-size-xxl) 3vw;
  }

  .search-results-main {
    max-width: 720px;
    margin: 0 auto;
    padding-bottom: 64px;
  }

  .search-result-head {
    display: flex;

    color: var(--sc-secondary-text-color);

    justify-content: space-between;
    flex-wrap: wrap;
  }

  .search-result-header {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-h1-md);
    font-weight: 400;
    line-height: 1.25;

    display: inline-block;

    margin: 0 1rem 1rem 0;
  }

  .search-result-term {
    font-family: var(--sc-serif-font);
    font-weight: bold;
  }

  aside {
    color: var(--sc-secondary-text-color);

    font-size: var(--sc-skolar-font-size-s);

    margin-bottom: 1em;
  }

  .search-result-item {
    display: flex;
    flex-direction: column;

    border-bottom: var(--sc-border);
  }

  .search-result-item dl a {
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color);
  }

  .search-result-item dl a:hover {
    color: var(--sc-primary-color);
  }

  .search-result-item dl a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  .search-result-item:focus {
    outline: 0;
  }

  .padded-container {
    display: flex;
    flex-direction: column;

    padding: 0;
  }

  .primary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 32px;
  }

  .search-result-title {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-skolar-font-size-static-subtitle);
    font-weight: 400;

    overflow: hidden;

    margin: 0;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--sc-primary-accent-color);
  }

  .all-dictionaries {
    display: none;
  }

  .dictionary .all-dictionaries {
    display: inline-flex;
    color: var(--sc-secondary-text-color);
    font-size: var(--sc-skolar-font-size-s);

    flex-direction: row;
    align-items: center;
    gap: 0.5em;
  }
  .icon {
    fill: var(--sc-icon-color);
    height: 20px;
    width: 20px;
  }

  .search-result-division {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;

    overflow: hidden;

    margin: 0;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--sc-secondary-text-color);

    height: 1.5rem;
  }

  .search-result-snippet {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 1.333;

    margin: 0 0 1rem 0;
  }

  .search-result-snippet dd {
    margin-left: 0;
  }

  .search-result-snippet dfn {
    font-weight: bold;
    font-style: normal;

    color: var(--sc-primary-color-dark);
  }

  .search-result-link {
    text-decoration: none;

    color: initial;

    padding: 12px 0 8px;

    width: 100%
  }

  .search-result-link:hover {
    text-decoration: underline;

    text-decoration-color: var(--sc-primary-accent-color);
  }

  .dictionary {
    margin: 5px 0 1em 0;
    padding: 0 clamp(1rem, 3vw, 2rem);

    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-1dp);
  }

  .dictionary .search-result-division {
    display: none;
  }

  .dictionary .search-result-title {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    font-variant-caps: all-small-caps;
    letter-spacing: var(--sc-caps-letter-spacing);
  }

  .dictionary dfn {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-static-subtitle);
    font-weight: bold;

    color: var(--sc-primary-color-dark);
  }

  .dictionary dfn,
  .highlight,
  .search-result-term,
  .selected-terms-item > a {
    background-color: var(--sc-primary-color-light-transparent);
    color: var(--sc-primary-color-darkest);
  }

  .dictionary dd p {
    margin: 0 0 var(--sc-size-s) 0;
  }

  .dictionary .grammar {
    display: block;

    color: var(--sc-secondary-text-color);

    font-style: italic;
  }

  .dictionary .ref {
    font-family: var(--sc-sans-font);
    font-weight: 600;
    font-style: normal;

    padding: 0 4px;

    white-space: nowrap;
    letter-spacing: normal;

    color: var(--sc-secondary-text-color);
    border-radius: 8px;
    background-color: rgba(159, 158, 157, 0.15);

    font-variant-caps: normal;
  }

  dd ol,
  dd ul {
    margin: 0;
    padding: 0 0 0 1rem;
  }

  li {
    padding-left: clamp(0.25rem, 1vw, 1rem);
  }

  li::marker {
    color: var(--sc-icon-color);
    font-family: var(--sc-sans-font);

    font-weight: 600;

    font-feature-settings: 'tnum', 'onum';
  }

  p + ol,
  p + ul {
    margin: 0.5em 0 1em;
  }

  .d-none {
    display: none;
  }

  [hidden] {
    display: none !important;
  }

  mwc-button {
    --mdc-theme-primary: var(--sc-primary-accent-color);
    --mdc-theme-on-primary: white;
  }

  #load-more {
    padding: 24px 0;
    display: flex;
    justify-content: center;
  }
`;

export const searchResultTableViewStyles = css`
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

  .highlightShrink {
    display: -webkit-box;
    overflow: hidden;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .parallels-link {
    text-decoration: none; !important;
    color: var(--sc-secondary-text-color);
    margin-top: 8px;
    padding: 12px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }

  .parallels-link:hover{
    background-color: var(--sc-tertiary-background-color);
  }

  .parallels-btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item-head {
    display: flex;
    justify-content: space-between;
  }
`;
