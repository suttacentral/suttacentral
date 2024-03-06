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

  input {
    color: red;
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
    max-width: 1440px;
    margin: 0 auto;
    padding-bottom: 64px;
  }

  .all-search-results {
    display: flex;
    flex-direction: row;
    gap: var(--sc-size-xl);
  }

  .search-result-head,
  .primary-search-results {
    display: flex;
    flex-direction: column;
    max-width: 720px;
    min-width: 40%;
    flex-grow: 2;
  }

  .additional-search-results {
    max-width: 40%;
    min-width: 40%;
  }

  @media (max-width: 780px) {
    .all-search-results {
      flex-direction: column-reverse;
      gap: var(--sc-size-xl);
    }

    .primary-search-results {
      max-width: 100%;
    }

    .additional-search-results {
      max-width: 100%;
    }
  }

  .search-result-head {
    color: var(--sc-on-primary-secondary-text-color);
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

  .search-result-item {
    display: flex;
    flex-direction: column;

    border-bottom: var(--sc-border);
  }

  .search-result-item dl a {
    transition: var(--sc-link-transition);
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.15em;
  }

  .search-result-item dl a:hover {
    transition: var(--sc-link-transition);
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 4px;
    text-underline-offset: 0.15em;
  }

  .search-result-item dl a:active {
    text-decoration-color: var(--sc-primary-color);
  }

  .search-result-item dl a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  .search-result-item:focus {
    outline: 0;
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
    font-size: var(--sc-font-size-xl);

    overflow: hidden;

    margin: 0;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--sc-primary-color);

    display: flex;
    align-items: center;
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

  .search-result-snippet dl {
    margin: 8px 0 0;
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
    transition: var(--sc-link-transition);
    text-decoration: none;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.15em;
    padding: 12px 0 4px;

    width: 100%;
  }

  .search-result-link:hover {
    transition: var(--sc-link-transition);
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 4px;
    text-underline-offset: 0.15em;
  }

  .search-result-link:active {
    text-decoration-color: var(--sc-primary-color);
  }

  .search-result-link:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  .dictionary {
    margin: 0;
    margin-bottom: 3px;
    padding: 0 var(--sc-suttaplex-padding);

    border-radius: var(--sc-size-lg);
    background-color: var(--sc-tertiary-background-color);
  }

  .dictionary + .suttaplex {
    margin-top: var(--sc-size-lg);
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

  @media (max-width: 1080px) {
    .dictionary .search-result-title {
      font-size: var(--sc-font-size-xs) !important;
    }
  }

  .dictionary dfn {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xl);
    font-weight: bold;

    color: var(--sc-primary-color-dark);
  }

  .dictionary dfn,
  .highlight,
  .search-result-term,
  .selected-terms-item > a {
    background-color: var(--sc-primary-color-light-transparent);
    color: inherit;
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
    padding: 0 0 0 var(--sc-size-md-larger);
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
    --md-filled-button-label-text-font: var(--sc-sans-font);
    --md-filled-button-label-text-size: var(--sc-size-md);
    width: 100%;
  }

  #load-more {
    padding: 24px 0;
    display: flex;

    justify-content: center;
  }

  #load-more-progress {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  md-filled-text-field {
    width: 100%;

    --md-filled-text-field-container-color: var(--sc-tertiary-background-color);
    --md-filled-text-field-focus-input-text-color: var(--sc-on-primary-primary-text-color);
    --md-sys-color-primary: var(--sc-primary-accent-color);
    --md-sys-color-on-primary: white;
    --md-filled-text-field-input-text-font: var(--sc-sans-font);
    --md-filled-text-field-input-text-size: var(--sc-size-md);
    --md-filled-text-field-input-text-color: var(--sc-on-primary-primary-text-color);
    --md-filled-text-field-hover-input-text-color: var(--sc-on-primary-primary-text-color);
    --md-filled-text-field-label-text-color: var(--sc-primary-accent-color);
    --md-filled-text-field-hover-label-text-color: var(--sc-primary-accent-color);
    --md-filled-text-field-error-focus-supporting-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-hover-supporting-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-supporting-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-label-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-focus-label-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-hover-label-text-color: var(--sc-primary-color);
    --md-filled-text-field-supporting-text-color: var(--sc-on-primary-primary-text-color);
    --md-filled-text-field-hover-supporting-text-color: var(--sc-on-primary-primary-text-color);
  }

  md-icon {
    cursor: pointer;
  }

  md-switch {
    --md-sys-color-primary: var(--sc-primary-accent-color);
  }

  .search-options {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: end;
  }

  .search-options > label {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  select {
    width: 200px;
  }

  md-switch {
    margin-left: 5px;
  }

  .search-options label {
    line-height: 1.8;
  }

  .reference {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xxs);
    font-weight: 400;
    font-style: normal;

    display: inline-block;

    box-sizing: border-box;
    margin-right: 0.5em;
    padding: 0.1em 0.5em;

    text-align: left;
    text-indent: 0;
    text-transform: none;
    white-space: nowrap;

    letter-spacing: normal;

    color: var(--sc-on-primary-secondary-text-color);
    border: 1px solid var(--sc-border-color);
    border-radius: 8px;
    background-color: var(--sc-secondary-background-color);

    font-variant-caps: normal;
  }

  .navigation-links {
    margin-bottom: 0.3em;
    font-size: var(--sc-font-size-s);
    color: var(--sc-on-primary-secondary-text-color);
  }

  .navigation-links a {
    text-decoration: none;
    color: var(--sc-on-primary-secondary-text-color);
    box-sizing: border-box;
    transition: var(--sc-link-transition);
    opacity: 0.8;
    border-radius: 16px;
    padding: 0 4px;
    display: inline-block;
  }

  .navigation-links a:hover {
    cursor: pointer;
    transition: var(--sc-link-transition);
    background-color: var(--sc-primary-color-light-transparent);
    opacity: 1;
  }

  .search-result-action-items {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  sc-badge {
    margin-right: 2px;
  }

  .no-result-prompt {
    color: var(--sc-on-primary-secondary-text-color);
  }

  .selected-languages {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .selected-languages a {
    margin-right: 0.5em;
    padding: 0.2em 0.5em;
    border-radius: 16px;
    background-color: var(--sc-primary-color-light-transparent);
    color: var(--sc-on-primary-primary-text-color);
    font-size: var(--sc-font-size-xs);
    text-decoration: none;
    transition: var(--sc-link-transition);
  }

  .volpage-search-result-item {
    margin-bottom: 1em;
  }

  .volpage-search-result-item .sutta_title {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-l);
    color: var(--sc-primary-color);
  }

  .volpage-search-result-item .sutta_name {
    color: var(--sc-primary-color);
    font-weight: 400;
    font-size: var(--sc-font-size-xl);
    white-space: normal;
    margin: 0;
  }

  .volpage-search-result-item .uid:hover {
    text-decoration: underline;
    text-decoration-color: var(--sc-primary-color);
    text-decoration-thickness: 0.15em;
    text-underline-offset: 0.15em;

    background-color: var(--sc-primary-color-light-transparent);
  }

  .volpage-search-result-item .sutta_info {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    color: var(--sc-on-primary-secondary-text-color);
    margin: 0;
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
  }

  .volpage-search-result-item .highlight {
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
  }

  .volpage-search-result-item .references {
    margin-top: 0.3em;
    font-size: var(--sc-font-size-m);
  }

  md-filled-text-field {
    max-width: 720px;
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
    display: flex;
    flex-wrap:wrap;
  }
  tr:first-of-type {
    border-top: 1px solid var(--sc-border-color);
  }

  td,
  th {
    padding: 0.5em;
  }

  @media (max-width: 900px) { 
    th:last-child, td:last-child {
        display: block;
        width: 100%;
    }
}

  .uid {
    white-space: nowrap;
    text-decoration: none;
  }

  .uid:hover {
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
    align-items: center;
  }

  .volpage {
    white-space: nowrap;
  }
`;
