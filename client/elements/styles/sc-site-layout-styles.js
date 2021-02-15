import { css } from 'lit-element';

export const SCSiteLayoutStyles = css`
  :host {
    display: block;
  }

  p a,
  li a {
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color);
  }

  p a:hover,
  li a:hover {
    color: var(--sc-primary-color);
  }

  p a:visited,
  li a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  /* apply font size here to avoid resizing title when returning to Home */
  #title {
    font-size: clamp(2rem, 8vw, 3em);
  }

  .homeTitle {
    display: flex;
    overflow: hidden;
    flex-direction: column;

    box-sizing: border-box;
    height: 180px;
    margin: auto;

    transition: all 0.1s;
    white-space: nowrap;
    text-overflow: ellipsis;

    justify-content: center;
  }

  #mainTitle {
    display: flex;

    justify-content: center;
    align-items: flex-end;
  }

  .homeTitle #mainTitle {
    font-family: var(--sc-serif-font);
    line-height: 1;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;

    height: 60px;
  }

  #subTitle {
    font-size: 0.5em;
    font-style: italic;
  }

  #universal_toolbar {
    position: sticky;
    z-index: 100;
    top: 0;

    color: var(--sc-tertiary-text-color);
    background-color: var(--sc-primary-color);
    box-shadow: var(--sc-shadow-elevation-2dp);
  }

  #context_toolbar {
    display: flex;

    height: 60px;

    padding: 0 2%;

    justify-content: space-between;
  }

  .generalTitle {
    display: flex;

    height: 60px;

    align-items: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* apply font size here to avoid resizing title when returning to Home */
  .generalTitle span {
    font-size: calc(20px * var(--sc-skolar-font-scale));
    font-family: 'Skolar Sans PE Condensed', var(--sc-sans-font), 'Noto Sans CJK TC';
  }

  @media print {
    #universal_toolbar,
    #title {
      display: none;
    }
  }

  .sc_logo {
    width: 1.25em;
    height: 1.25em;
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
    padding: 0 calc(2% - 8px);

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
    font-size: var(--sc-skolar-font-size-md);
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
    padding: 4px 8px 0;

    text-decoration: none;

    color: white;
    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);

    border-bottom: 4px solid rgba(0, 0, 0, 0);

    align-items: center;

    transition: all 200ms ease;
  }

  li a:hover {
    cursor: pointer;

    color: white;
    text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.1);
    border-bottom: 4px solid var(--sc-primary-color-light);

    transition: all 200ms ease;
  }

  li a:active {
    background-color: var(--sc-primary-color-light-transparent);

    transition: background-color 200ms ease;
  }

  li a:hover .external {
    visibility: visible;
  }

  svg.external {
    width: 15px;
    height: 15px;
    fill: rgba(255, 255, 255, 0.8);
    margin: 6px 0 0 6px;
    visibility: hidden;
  }

  .staticPageSelected {
    opacity: 1;
    border-bottom: 4px solid var(--sc-primary-color-light);
  }

  @media only screen and (max-width: 600px) {
    #context_toolbar.contextToolbarExpand {
      flex-direction: column;
      justify-content: center;
      height: 112px !important;
    }
  }
`;
