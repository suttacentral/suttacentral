import { css } from 'lit';

export const typographyBilaraStyles = css`
  /* styles unique to bilara texts */

  /* verses */

  blockquote {
    margin: 0;
  }

  /* lookup */

  .spanFocused {
    color: rgb(34, 33, 32);
    background-color: var(--sc-primary-color-light);
  }

  /* notes */

  /* Anchor tooltips. */
  article {
    position: relative;
  }

  .comment,
  .variant {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    font-style: normal;
    line-height: 1.3333;

    padding: var(--sc-size-sm) var(--sc-size-md);

    z-index: 10;

    display: inline-block;

    box-sizing: border-box;

    color: var(--sc-on-tertiary-secondary-text-color);

    border-radius: var(--sc-card-border-radius);
    background-color: var(--sc-tertiary-background-color);

    letter-spacing: normal;

    font-variant-caps: normal;

    text-align: left;

    text-indent: 0;
  }

  .comment:hover,
  .variant:hover {
    cursor: help;
  }

    .comment:empty,
    .variant:empty{
      display: none
    }

  /* Set shared styles for the tooltip, but don't show it. Specify classes, avoid unattributed attribute selector for performance.*/

  .comment[data-tooltip]::after,
  .variant[data-tooltip]::after {
    position: absolute;
    z-index: 10;
    left: 50%;

    display: none;

    box-sizing: border-box;
    width: 300px;
    margin-left: -150px;
    padding: var(--sc-size-sm) var(--sc-size-md);

    content: attr(data-tooltip);
    white-space: normal;

    
    border-width: 0 0 0 8px;
    border-style: solid;
    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);
    color: var(--sc-on-primary-secondary-text-color);
    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  .comment[data-tooltip]::after {
    border-color: var(--sc-primary-accent-color);
  }

  .variant[data-tooltip]::after {
    border-color: var(--sc-secondary-accent-color);
  }

  [data-tooltip]:hover {
    cursor: help;
  }

  /* references */

  .reference {
    overflow-wrap: anywhere;
  }

  .reference a {
    display: inline-block;

    font-family: var(--sc-sans-font);

    font-size: var(--sc-font-size-xxs);

    font-weight: 400;
    font-style: normal;
    text-align: left;

    box-sizing: border-box;
    padding: 0.1em 0.5em;

    margin-right: 0.5em;

    white-space: nowrap;
    text-decoration: none;
    letter-spacing: normal;

    color: var(--sc-on-primary-secondary-text-color);
    border: 1px solid var(--sc-border-color);
    border-radius: 8px;
    background-color: var(--sc-secondary-background-color);

    font-variant-caps: normal;
  }

  .reference a:hover {
    background-color: var(--sc-tertiary-background-color);
  }

  .reference a {
    text-decoration: none;
  }

  header .reference,
  h2 .reference,
  h3 .reference,
  h4 .reference,
  h5 .reference,
  h6 .reference {
    display: none;
  }
`;
