import { css } from 'lit';

export const SCAutoCompleteListStyles = css`
  :host {
    font-size: var(--sc-font-size-md);

    position: absolute;
    z-index: 9999;
    top: var(--sc-size-sm);
    left: var(--sc-size-sm);

    display: none;

    width: calc(100% - var(--sc-size-sm) * 2);
    margin: auto;

    color: var(--sc-on-tertiary-primary-text-color);
    border-radius: var(--sc-mid-border-radius);
    background-color: var(--sc-tertiary-background-color);
    box-shadow: 0 0 0 2048px rgba(0, 0, 0, 0.8);

    --md-icon-button-icon-size: 24px;
    --md-sys-color-primary: var(--sc-primary-accent-color);
  }

  #instant_search_dialog {
    position: relative;

    padding: 8px;

    border-radius: var(--sc-mid-border-radius);
  }

  .ss-header {
    display: flex;

    padding: 0px;

    justify-content: center;
    align-items: center;
  }

  md-filled-text-field {
    width: 100%;
    padding: 0 10px;

    --md-sys-color-primary: var(--sc-primary-accent-color);
    --md-sys-color-on-primary: white;
    --md-filled-text-field-container-color: var(--sc-tertiary-background-color);
    --md-filled-text-field-focus-input-text-color: var(--sc-on-primary-primary-text-color);
    --md-filled-text-field-input-text-font: var(--sc-sans-font);
    --md-filled-text-field-input-text-size: var(--sc-size-md);
    --md-filled-text-field-input-text-color: var(--sc-on-primary-primary-text-color);
    --md-filled-text-field-hover-input-text-color: var(--sc-on-primary-primary-text-color);
    --md-filled-text-field-error-focus-supporting-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-hover-supporting-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-supporting-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-label-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-focus-label-text-color: var(--sc-primary-color);
    --md-filled-text-field-error-hover-label-text-color: var(--sc-primary-color);
  }

  .ss-list {
    overflow-y: auto;

    max-height: calc(100vh - 200px);
    padding: 0 4px;

    scrollbar-gutter: stable both-edges;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: var(--sc-icon-color);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #87817a;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #79746d;
  }
  ::-webkit-scrollbar-track {
    border-radius: 6px;
    background: var(--sc-border-color);
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  ul {
    margin: 0;
    padding: 8px 0 4px;

    list-style: none;
  }

  li {
    position: relative;

    margin-bottom: 0;
  }

  .search-suggestion-link {
    display: flex;

    height: 24px;
    padding: 24px 12px 8px 16px;

    cursor: pointer;
    transition: var(--sc-link-transition);
    text-decoration: none;

    color: inherit;
    border-radius: 4px 4px 0 0;
    background-color: inherit;

    align-items: center;
    justify-content: space-between;

    gap: 16px;
  }

  .search-suggestion-link:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }

  .search-suggestion-link:active {
    background-color: var(--sc-primary-color-light);
  }

  .search-suggestion-link:focus {
    background-color: var(--sc-primary-color-light-transparent);
  }

  .search-suggestion {
    display: flex;

    align-items: baseline;
    gap: 8px;

    scroll-snap-type: x mandatory;

    overflow-x: hidden;
  }

  .search-suggestion-tip {
    display: block;
    position: absolute;
    top: 8px;

    font-family: monospace;
    font-size: var(--sc-font-size-xxs);
    color: var(--sc-on-primary-secondary-text-color);
  }

  .search-suggestion::before,
  .instant-nav-description-text {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xs);

    color: var(--sc-icon-color);
  }

  .search-suggestion-filter {
    font-family: monospace;
    font-size: var(--sc-font-size-xs);

    position: relative;

    color: var(--sc-on-primary-secondary-text-color);
  }

  .search-suggestion-query {
    text-wrap: nowrap;
    scroll-snap-align: end;

    font-size: 16px;
  }

  .search-suggestion-prompt {
    display: inline-flex;

    height: 40px;
  }

  .instant-nav-description-text {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xs);

    color: var(--sc-icon-color);

    display: none;

    margin: 16px 0 8px 16px;

    align-items: center;
  }

  .instant-nav-description-text .icon {
    width: 1em;
    min-width: 1em;
    height: 1em;
    margin: 0 0.25em 0 0.25em;
  }

  .instant-nav {
    display: flex;
    align-items: center;

    flex-direction: row;
    gap: 8px;
  }

  .instant-nav-link {
    display: flex;

    margin-bottom: 8px;
    padding: 4px 12px 4px 12px;

    cursor: pointer;
    transition: var(--sc-link-transition);
    text-decoration: none;

    color: var(--sc-on-primary-primary-text-color);
    border-radius: var(--sc-big-border-radius);
    background-color: var(--sc-primary-background-color);

    align-items: center;
    justify-content: space-between;
  }

  .instant-nav-link:hover {
    background-color: var(--sc-primary-color-light-transparent);
  }

  .instant-nav-link:active {
    background-color: var(--sc-primary-color-light);
  }

  .instant-nav-link:focus {
    background-color: var(--sc-primary-color-light-transparent);
  }

  .instant-nav-uid-title-wrap {
    display: flex;

    flex-direction: column;
  }

  .instant-nav-uid {
    font-size: var(--sc-font-size-xs);

    color: var(--sc-on-primary-secondary-text-color);
  }

  .instant-nav-title {
    font-family: var(--sc-serif-font);
    font-style: italic;
  }

  .instant-nav-text {
    font-family: var(--sc-serif-font);
  }

  .instant-nav-prompt {
    display: inline-flex;
  }

  #openSearchTip {
    font-size: var(--sc-font-size-s);

    display: flex;

    padding: 8px 16px 0px 16px;

    color: var(--sc-on-tertiary-secondary-text-color);
    border-top: 1px solid var(--sc-border-color);

    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  #opensearchtip-left {
    display: inline-flex;

    align-items: center;
  }

  ul li:last-child {
    margin-bottom: 0.5rem;
  }

  hr {
    display: none;

    margin: 0 0 8px;
  }

  li ~ hr,
  ul li:last-child + hr,
  li ~ .instant-nav-description-text {
    display: flex;
  }

  .icon {
    fill: var(--sc-icon-color);
    min-width: 24px;
  }

  md-icon {
    cursor: pointer;
  }

  .highlight {
    color: var(--sc-primary-color-dark);
    background-color: var(--sc-primary-color-light-transparent);
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
    margin-left: 1em;
    margin-bottom: 0.3em;
    font-size: var(--sc-font-size-s);
    color: var(--sc-on-primary-secondary-text-color);
  }

  .navigation-links a {
    text-decoration: none;
    color: var(--sc-on-primary-primary-text-color);
    box-sizing: border-box;
    transition: var(--sc-link-transition);
    opacity: 0.8;
    border-radius: 16px;
  }

  .navigation-links a:hover {
    cursor: pointer;
    transition: var(--sc-link-transition);
    background-color: var(--sc-primary-color-light-transparent);
    opacity: 1;
  }

  .algolia-logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .algolia-title {
    margin-right: 0.3em;
  }
`;