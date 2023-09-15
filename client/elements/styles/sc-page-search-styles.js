import { css } from 'lit';

export const SCPageSearchStyles = css`
  :host {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;
    line-height: 1.5;

    display: block;

    width: 100%;

    color: var(--sc-on-primary-primary-text-color);
  }
input{
  color: red
}
  mwc-list-item {
    color: var(--sc-on-primary-primary-text-color);
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

    color: var(--sc-on-primary-secondary-text-color);

    justify-content: space-between;
    flex-wrap: wrap;
  }

  .search-result-header {
    font-family: var(--sc-sans-font);

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
    color: var(--sc-on-primary-secondary-text-color);

    font-size: var(--sc-font-size-s);

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
    color: var(--sc-on-primary-secondary-text-color);
    font-size: var(--sc-font-size-s);

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
    font-size: var(--sc-font-size-s);
    font-weight: 400;

    overflow: hidden;

    margin: 0;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--sc-on-primary-secondary-text-color);

    height: 1.5rem;
  }

  .search-result-snippet {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-md);
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

    width: 100%;
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
    font-size: var(--sc-font-size-md);
    font-weight: 400;
    font-variant-caps: all-small-caps;
    letter-spacing: var(--sc-caps-letter-spacing);
  }

  .dictionary dfn {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xxxl);
    font-weight: bold;

    color: var(--sc-primary-color-dark);
  }

  .dictionary dfn,
  .highlight,
  .search-result-term,
  .selected-terms-item > a {
    background-color: var(--sc-primary-color-light-transparent);
    color: var(--sc-primary-color-dark);
  }

  .dictionary dd p {
    margin: 0 0 var(--sc-size-s) 0;
  }

  .dictionary .grammar {
    display: block;

    color: var(--sc-on-primary-secondary-text-color);

    font-style: italic;
  }

  .dictionary .ref {
    font-family: var(--sc-sans-font);
    font-weight: 600;
    font-style: normal;

    white-space: nowrap;
    letter-spacing: normal;

    color: var(--sc-on-primary-secondary-text-color);

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

  md-filled-button {
    --md-sys-color-primary: var(--sc-primary-accent-color);
    --md-sys-color-on-primary: white;
    --md-filled-button-label-text-type: 500 var(--sc-size-md) system-ui;
    width: 100%;
  }

  #load-more {
    padding: 24px 0;
    display: flex;
    justify-content: center;
  }

  md-filled-text-field {
    --md-filled-text-field-container-color: var(--sc-tertiary-background-color);
    margin: 0px 0px 22px 0px;
    width: 100%;
    --md-sys-color-primary: var(--sc-primary-accent-color);
    --md-sys-color-on-primary: white;
    --md-filled-button-label-text-type: 600 var(--sc-size-md) var(--sc-sans-font);
  }

  md-icon {
    cursor: pointer;
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
    text-underline-offset: 0.15em;

    background-color: var(--sc-primary-color-light-transparent);
  }

  .uid:active {
    background-color: var(--sc-primary-color-light);
  }

  .uid:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  .pts_reference {
    color: inherit;
    text-decoration: none;
  }

  .pts_reference:hover {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--sc-primary-color);
    text-decoration-thickness: 0.15em;
    text-underline-offset: 0.15em;

    background-color: var(--sc-primary-color-light-transparent);
  }

  .pts_reference:active {
    background-color: var(--sc-primary-color-light);
  }

  .pts_reference:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  .highlightShrink {
    display: -webkit-box;
    overflow: hidden;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .parallels-link {
    text-decoration: none !important;
    color: var(--sc-on-primary-secondary-text-color);
    margin-top: 8px;
    padding: 12px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }

  .parallels-link:hover {
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

  .volpage {
    white-space: nowrap;
  }
`;
