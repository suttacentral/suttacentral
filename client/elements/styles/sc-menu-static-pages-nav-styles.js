import { css } from 'lit';

export const SCMenuStaticPagesNavStyles = css`
  :host {
    display: block;
  }

  li a {
    text-decoration: underline;
    color: inherit;
    text-decoration-color: var(--sc-primary-color);
  }

  li a:hover {
    color: var(--sc-primary-color);
  }

  li a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  #static_pages_nav_menu {
    height: 48px;

    background-color: var(--sc-primary-color-dark);
  }

  nav {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row;

    box-sizing: border-box;
    height: 48px;
    padding: 0 8px;

    white-space: nowrap;

    background-color: var(--sc-primary-color-dark);
  }

  ul {
    display: flex;

    width: 100%;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: var(--sc-font-size-md);
    font-weight: 500;

    margin-right: 8px;

    list-style-type: none;

    letter-spacing: var(--sc-caps-letter-spacing);
    font-variant-caps: all-small-caps;

    align-items: center;
  }

  li a {
    position: relative;

    display: flex;

    box-sizing: border-box;
    height: 100%;
    padding: 0 16px;

    text-decoration: none;

    color: white;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);

    border-radius: 24px;

    align-items: center;

    transition: all 200ms ease;
  }

  li a:hover {
    cursor: pointer;

    color: white;

    background-color: var(--sc-primary-color-darker);

    transition: all 200ms ease;
  }

  li a:active {
    background-color: var(--sc-primary-color-light-transparent);

    transition: background-color 200ms ease;
  }

  li a:hover .external {
    visibility: visible;
  }

  .staticPageSelected {
    opacity: 1;
    border-bottom: 4px solid var(--sc-primary-color-light);
  }
`;
