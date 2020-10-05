import { css, html } from "lit-element";

export const SCSiteLayoutStyles = css`
  :host {
    display: block;
  }

  .nav-logo-icon {
    margin-left: var(--sc-size-md);
    margin-right: var(--sc-size-md);
    vertical-align: text-bottom;
    width: var(--sc-size-lg);
    height: var(--sc-size-lg);
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

  @media screen and (max-width: 480px) {
    #titlebarSitetitle {
      font-size: 1.8rem !important;
    }

    #titlebarSubtitle {
      font-size: 1.05rem !important;
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

  .navigation-menu {
    height: 100%;
  }

  #titlebar {
    /* display: flex !important; */
    display: flex;
    box-sizing: border-box;
    height: 8em;
    margin: auto;
    /* padding-top: 1.8em; */

    background-color: var(--sc-primary-color);

    /* align-items: center; */
    justify-content: center;
    transition: all 0.1s;
  }

  #titlebarSitetitle {
    font-size: 3.5rem;
    font-family: "skolar pe";
    font-variant-caps: small-caps;
    text-align: center;
    line-height: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    /* align-items: center; */
    justify-content: center;
  }

  #titlebarSubtitle {
    text-align: center;
    font-style: italic;
    font-size: 1.5rem;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    margin-left: 1em;
  }

  #universal-toolbar {
    color: white;
    position: sticky;
    /* position: relative; */
    top: 0;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05), 2px 2px 2px rgba(0, 0, 0, 0.05),
      4px 4px 4px rgba(0, 0, 0, 0.05), 8px 8px 8px rgba(0, 0, 0, 0.05);
    z-index: 9999;
  }

  #titlebarCenter {
    min-width: 0;
  }

  /* #titlebarSitetitle {
  transform: scale(1);
}

#titlebarSubtitle {
  opacity: 1;
  transform: scale(1);
} */

  .hover-underline-animation {
    display: inline-block;
    position: relative;
    /* color: #0087ca; */
  }

  .hover-underline-animation:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: gold;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .hover-underline-animation:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  #context-toolbar {
    height: 64px;
    display: flex;
    background-color: var(--sc-primary-color);
    padding: 0 2%;
  }

  #context-toolbar span:first-child {
    margin-right: auto;
  }

  #toolbarTitle {
    font-weight: normal;
    display: flex;
    align-items: center;
    font-family: var(--sc-sans-font);
    font-size: calc(20px * var(--sc-skolar-font-scale));
    color: var(--sc-tertiary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(80%);
    text-transform: capitalize;
  }

  #titlebarCenter span a {
    color: var(--sc-tertiary-text-color);
    text-decoration: none;
  }

  titlebar {
    background-color: var(--sc-primary-color);
  }

  @media screen and (max-width: 600px) {
    #toolbar_title {
      font-size: var(--sc-skolar-font-size-md);
    }
  }

  @media print {
    #universal-toolbar,
    titlebar {
      display: none;
    }
  }

  .title-logo-icon {
    vertical-align: bottom;
    height: var(--sc-size-xxl);
    width: var(--sc-size-xxl);
    margin: 0 var(--sc-size-sm);
  }

  @media (max-width: 600px) {
    h1 {
      font-size: var(--sc-skolar-font-size-xxl);
      padding-top: 0.2em;
    }
    .title-logo-icon {
      height: 40px;
      width: 40px;
    }
    .subtitle {
      font-size: var(--sc-skolar-font-size-md);
      margin-bottom: 0.5em;
    }
    #titlebarSitetitle {
      padding-top: 0.4em;
    }
  }

  #static_pages_nav_menu {
    background-color: var(--sc-primary-color-dark);
  }

  #static_pages_nav_menu nav {
    display: flex;
    overflow-x: auto;
    flex-direction: row;
    box-sizing: border-box;
    padding: 0 calc(2% - 8px);
    white-space: nowrap;
    font-size: 1.1em;
  }

  #static_pages_nav_menu nav ul {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #static_pages_nav_menu nav li {
    font-size: var(--sc-skolar-font-size-xs);
    font-weight: 500;
    list-style-type: none;
    align-items: center;
    letter-spacing: var(--sc-caps-letter-spacing);
    text-transform: uppercase;
    margin-right: 8px;
  }

  #static_pages_nav_menu nav li a {
    position: relative;
    display: inline-block;
    padding: 14px 8px 10px;
    text-decoration: none;
    border-bottom: 4px solid rgba(0,0,0,0);
    opacity: .8;
    color: var(--sc-tertiary-text-color);
  }

  #static_pages_nav_menu nav li a:hover {
    cursor: pointer;
    border-bottom: 4px solid var(--sc-primary-color-light);
    opacity: 1;
  }

  .staticPageSelected {
    color: red;
    border-bottom: 4px solid var(--sc-primary-color-light);
  }

  morph-ripple {
    --ripple-color: gold;
  }

  .transitionTransform {
    will-change: transform;
    transition: transform 200ms ease-in-out;
  }
`;
