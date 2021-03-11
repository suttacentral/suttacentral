import { css } from 'lit-element';

export const typographyBilaraStyles = css`
  /* styles unique to bilara texts */

  /* root texts */

  .translation + .root {
    font-family: var(--sc-sans-font);
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
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    font-style: normal;
    line-height: 1.3333;

    z-index: 10;

    display: inline-block;

    box-sizing: border-box;
    padding: var(--sc-size-sm) var(--sc-size-md);

    color: var(--sc-secondary-text-color);
    border-width: 0 0 0 8px;
    border-style: solid;
    border-color: transparent;
    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);

    letter-spacing: normal;

    font-variant-caps: normal;

    text-align: left;
  }
  .comment {
    border-color: var(--sc-primary-accent-color);
  }
  .variant {
    border-color: var(--sc-secondary-accent-color);
  }

  /* click on notes to raise obscured note when they overlap. this should be replaced by JS  */

  .comment:active,
  .variant:active {
    z-index: 1000;

    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  .comment:hover,
  .variant:hover {
    cursor: help;
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

    color: var(--sc-secondary-text-color);
    border-width: 0 0 0 8px;
    border-style: solid;
    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);
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

  .reference a {
    display: inline-block;

    font-family: var(--sc-sans-font);

    font-size: var(--sc-skolar-font-size-xxs);

    font-weight: 400;
    font-style: normal;
    text-align: left;

    box-sizing: border-box;
    padding: 0.1em 0.5em;

    margin-right: 0.5em;

    white-space: nowrap;
    text-decoration: none;
    letter-spacing: normal;

    color: var(--sc-secondary-text-color);
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

  /* Vinaya classes */

  .kamma {
    font-weight: 600;
  }

  .patimokkha .rule {
  }

  .rule {
    font-weight: 700;
  }

  .subrule {
    font-weight: 500;
  }

  .highlight .vinaya-cakka {
    color: var(--sc-secondary-accent-color);
  }

  .highlight .vinaya-anapatti {
    font-weight: 500;
  }

  .highlight .vinaya-nidana {
    color: var(--sc-primary-accent-color);
  }

  .highlight .kamma {
    outline: 2px solid var(--sc-secondary-accent-color);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .patimokkha p {
    outline: 2px solid var(--sc-toast-error-color);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight :not(.patimokkha) .rule {
    outline: 2px dotted var(--sc-toast-error-color);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .suttanta {
    outline: 2px solid var(--sc-primary-color-light);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .jataka {
    outline: 2px solid var(--sc-primary-accent-color-light);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .patimokkha p::before,
  .highlight :not(.patimokkha) .rule::before,
  .highlight .kamma::before,
  .highlight .suttanta::before,
  .highlight .jataka::before {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    font-style: normal;
    line-height: 1.3333;

    z-index: 10;

    display: inline-block;

    box-sizing: border-box;
    padding: var(--sc-size-sm) var(--sc-size-md);

    color: var(--sc-secondary-text-color);

    letter-spacing: normal;

    font-variant-caps: normal;

    text-align: left;
    position: absolute;

    left: 0;

    top: -36px;

    visibility: hidden;

    height: 36px;

    padding: var(--sc-size-sm) var(--sc-size-md);

    white-space: normal;

    color: var(--sc-secondary-text-color);
    border-width: 0 0 0 8px;
    border-style: solid;
    border-radius: var(--sc-size-sm);
    border-color: var(--sc-primary-color);
    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  .highlight .patimokkha p::before {
    content: 'This text is included in the patimokkha recitation';
  }

  .highlight :not(.patimokkha) .rule::before {
    content: 'This rule is not included in the patimokkha recitation';
  }

  .highlight .kamma::before {
    content: 'This text is a formal legal statement of the Sangha';
  }

  .highlight .suttanta::before {
    content: 'This text is found also in the Discourses (Sutta)';
  }

  .highlight .jataka::before {
    content: 'This text is a story of the Buddha’s past lives (Jātaka)';
  }

  .highlight :hover::before,
  .highlight .patimokkha p:hover::before,
  .highlight :not(.patimokkha) .rule:hover::before {
    visibility: visible;
  }

  .highlight .vinaya-pada {
    background-color: var(--sc-tertiary-background-color);
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .vinaya-vinita {
    color: var(--sc-primary-accent-color-dark);
  }

  .pe {
    font-style: italic;
  }

  .anunidana {
  }

  .anupannatti {
  }

  .help-heading {
  }

  .range {
  }

  .uddana-intro {
  }

  .nidana {
  }

  .bhikkhuni {
  }
`;
