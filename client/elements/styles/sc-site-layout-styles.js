import { css, html } from "lit-element";

export const SCSiteLayoutStyles = css`
  :host {
    display: block;
  }

  /* styles for the text dialogs: */
  .dialog {
    left: 0;
    background-color: var(--sc-secondary-background-color);
    white-space: initial;
    max-width: 630px;
    position: fixed;
    top: 50px;
    margin: 5% auto;
    right: 0;
  }

  @media screen and (max-width: 960px) {
    .dialog {
      left: 0;
    }
  }

  .dialog-header {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-static-subtitle);
    font-weight: 400;
    line-height: 32px;
    padding: var(--sc-size-lg) 0;
    color: var(--sc-tertiary-text-color);
    margin: 0;
  }

  .buttons-bar {
    margin-top: 0;
    padding-right: 0;
    display: flex;
    justify-content: space-between;
  }

  .green-bg {
    background-color: var(--sc-primary-accent-color);
  }

  .scrollable-dialog {
    margin-bottom: var(--sc-size-lg);
    margin-top: 0;
    --divider-color: transparent;
  }

  .dialog-section {
    margin-top: var(--sc-size-lg);
    color: var(--sc-primary-text-color);
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    line-height: 20px;
  }

  .dialog-section p[lang="ev"] {
    font-family: var(--sc-tengwar-font);
  }

  p a,
  li a {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--sc-primary-color);
    text-decoration-skip-ink: auto;
  }

  p a:hover,
  li a:hover {
    color: var(--sc-primary-color);
  }

  p a:visited,
  li a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  .close-dialog-icon {
    color: var(--sc-tertiary-text-color);
    margin: var(--sc-size-sm);
  }

  .homeTitle {
    display: flex;
    flex-direction: column;
    justify-content: center;

    box-sizing: border-box;
    height: 144px;
    margin: auto;

    transition: all 0.1s;

    white-space: nowrap;
    text-overflow: ellipsis;

    overflow: hidden;
    font-size: clamp(2rem, 8vw, 3rem);
  }

  #mainTitle {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .homeTitle #mainTitle {
    
    line-height: 1;
    font-family: var(--sc-serif-font);
    font-variant-caps: small-caps;
    letter-spacing: var(--sc-caps-letter-spacing);
  }

  #subTitle {
    font-style: italic;
    font-size: 0.5em;
  
  }

  #universal_toolbar {
    background-color: var(--sc-primary-color);
    color: var(--sc-tertiary-text-color);
    position: sticky;
    top: 0;
    box-shadow: var(--sc-shadow-elevation-2dp);
    z-index: 9999;
  }

  #context_toolbar {
    display: flex;
    justify-content: space-between;
    padding: 0 2%;
  }

  .generalTitle {
    display: flex;
    align-items: center;
    font-size: calc(20px * var(--sc-skolar-font-scale));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media print {
    #universal_toolbar,
    #title {
      display: none;
    }
  }

  .title-logo-icon {
    height: 1.25em;
    width: 1.25em;
/* these hacky margins compensate for the padding in the svg icon. Use em to scale with clamp*/
    margin: 0.1em 0.1em -0.1em -0.1em;
  }

  #static_pages_nav_menu {
    background-color: var(--sc-primary-color-dark);
  }

  nav {
    display: flex;
    overflow-x: auto;
    flex-direction: row;
    box-sizing: border-box;
    padding: 0 calc(2% - 8px);
    white-space: nowrap;
  }

  ul {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: var(--sc-skolar-font-size-xs);
    font-weight: 500;
    list-style-type: none;
    align-items: center;
    letter-spacing: var(--sc-caps-letter-spacing);
    text-transform: uppercase;
    margin-right: 8px;
  }

  li a {
    position: relative;
    display: inline-block;
    padding: 14px 8px 10px;
    text-decoration: none;
    border-bottom: 4px solid rgba(0,0,0,0);
    opacity: .8;
    color: var(--sc-tertiary-text-color);
  }

  li a:hover {
    color: var(--sc-tertiary-text-color);
    cursor: pointer;
    border-bottom: 4px solid var(--sc-primary-color-light);
    opacity: 1;
  }

  .staticPageSelected {
    opacity: 1;
    border-bottom: 4px solid var(--sc-primary-color-light);
  }

  morph-ripple {
    --ripple-color: gold;
  }
`;
