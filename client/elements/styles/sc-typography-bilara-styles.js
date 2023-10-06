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

    z-index: 10;

    display: inline-block;

    box-sizing: border-box;
    padding: var(--sc-size-sm) var(--sc-size-md);

    text-align: left;
    text-indent: 0;
    text-transform: none;
    letter-spacing: normal;

    color: var(--sc-on-tertiary-secondary-text-color);
    border-radius: var(--sc-mid-border-radius);
    background-color: var(--sc-tertiary-background-color);

    font-variant-caps: normal;
  }

  .comment:hover,
  .variant:hover {
    cursor: help;
  }

  .comment:empty,
  .variant:empty {
    display: none;
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

    color: var(--sc-on-tertiary-secondary-text-color);
    border-radius: var(--sc-mid-border-radius);
    background-color: var(--sc-tertiary-background-color);
    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  [data-tooltip]:hover {
    cursor: help;
  }

  /* references */

  .reference {
    overflow-wrap: anywhere;
  }

  .reference a {
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

  header .reference,
  h2 .reference,
  h3 .reference,
  h4 .reference,
  h5 .reference,
  h6 .reference {
    display: none;
  }
`;
