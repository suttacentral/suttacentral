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
    

    background-color: var(--sc-primary-color-dark);

    display: flex;
    align-items: center;



  }

  nav {
    display: flex;

    flex-direction: row;

    box-sizing: border-box;

    margin: 0 8px;

    padding: 8px 0px;

    height: 48px;

    

    white-space: nowrap;

    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-gutter: stable both-edges;


  }

  ul {
    display: flex;

    padding: 0;



    width: 100%;
    margin: 0;
    

  
  }

  li {
    font-size: var(--sc-font-size-md);
    font-weight: 500;

    list-style-type: none;

    letter-spacing: var(--sc-caps-letter-spacing);
    font-variant-caps: all-small-caps;
  }

  li a {
    position: relative;

    display: flex;

    box-sizing: border-box;

    padding: 4px 16px 4px;



    text-decoration: none;

    color: white;

     opacity: .8;

    text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);

    align-items: center;

    transition: all 200ms ease;

    border-radius: 24px;


  }

  li a:hover {
    cursor: pointer;

    color: white;

    opacity: 1;

    transition: all 200ms ease;

    background-color: var(--sc-primary-color-light-transparent);

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
  }
`;
