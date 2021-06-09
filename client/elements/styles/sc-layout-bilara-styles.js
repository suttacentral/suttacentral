import { html, css } from 'lit-element';

export const commonStyles = css`
  main {
    display: flex;
    justify-content: center;
  }

  p {
    -webkit-hyphens: auto;
    -webkit-hyphenate-limit-before: 3;
    -webkit-hyphenate-limit-after: 3;
    -webkit-hyphenate-limit-chars: 6 3 3;
    -webkit-hyphenate-limit-lines: 2;
    -webkit-hyphenate-limit-last: always;
    -webkit-hyphenate-limit-zone: 8%;
    -moz-hyphens: auto;
    -moz-hyphenate-limit-chars: 6 3 3;
    -moz-hyphenate-limit-lines: 2;
    -moz-hyphenate-limit-last: always;
    -moz-hyphenate-limit-zone: 8%;
    -ms-hyphens: auto;
    -ms-hyphenate-limit-chars: 6 3 3;
    -ms-hyphenate-limit-lines: 2;
    -ms-hyphenate-limit-last: always;
    -ms-hyphenate-limit-zone: 8%;
    hyphens: auto;
    hyphenate-limit-chars: 6 3 3;
    hyphenate-limit-lines: 2;
    hyphenate-limit-last: always;
    hyphenate-limit-zone: 8%;
  }
`;

export const plainStyles = html`
  <style>
    article {
      max-width: 720px;
    }

    .root {
      display: none;
    }

    /* Set styles for tooltip marker. First we hide the actual content. These settings ensure the beginning, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 6px 0 0;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;

export const plainPaliStyles = html`
  <style>
    section,
    article {
      max-width: 720px;
    }

    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 6px 0 0;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }

    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;

export const plainPlusStyles = html`
  <style>
    .root {
      display: none;
    }

    /* Let min width be handled by media queries, max width according to the nested grid width.*/
    .segment {
      display: grid;

      grid-template-columns: 60px 1fr;
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;

      border: none;

      background-color: inherit;
    }

    .translation {
      grid-column: 2;
    }

    .translation {
      position: relative;

      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment {
      position: absolute;

      padding: var(--sc-size-sm) var(--sc-size-md);

      box-shadow: var(--sc-shadow-elevation-1dp);

      grid-column: 2;
      grid-row: 1;
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        position: relative;

        display: table;

        margin-top: var(--sc-size-sm);
      }
    }
  </style>
`;

export const rootPlainPlusStyles = html`
  <style>
    .segment {
      display: grid;
      grid-template-columns: 60px 1fr;
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;
      border: none;
      background-color: inherit;
    }

    .root {
      grid-column: 2;
    }

    .root {
      position: relative;
      display: grid;
      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .variant {
      position: absolute;
      padding: var(--sc-size-sm) var(--sc-size-md);
      box-shadow: var(--sc-shadow-elevation-1dp);
      grid-column: 2;
      grid-row: 1;
    }

    br {
      content: '';
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .reference,
      .root {
        display: block;
      }

      .variant,
      .comment {
        position: relative;
        display: table;
        margin-top: var(--sc-size-sm);
      }
    }
  </style>
`;

export const sideBySideStyles = html`
  <style>
    .segment {
      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(240px, 720px);
      grid-column-gap: var(--sc-size-lg);
    }

    .translation {
      grid-column: 1;
    }

    .root {
      grid-column: 2;
    }

    .root .text {
      font-family: var(--sc-sans-font);
    }

    br {
      content: '';
    }

    /* Center the tooltip in the respective column */
    .translation,
    .root {
      position: relative;
    }

    .reference {
      justify-self: baseline;
    }

    /* Set styles for tooltip marker. First we hide the actual content of the .comment tag. These settings ensure the beginning of .comment, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 6px 0 0;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .translation,
      .root {
        position: relative;

        display: block;
      }

      .root .text {
        color: var(--sc-secondary-text-color);
      }
    }
  </style>
`;

export const sideBySidePlusStyles = html`
  <style>
    .segment {
      position: relative;

      display: grid;

      grid-template-columns: 60px 1fr 1fr;
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;

      justify-self: baseline;
    }

    .translation {
      grid-column: 2;
    }

    .root {
      grid-column: 3;
    }

    .root .text {
      font-family: var(--sc-sans-font);
    }

    .translation,
    .root {
      position: relative;

      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 300px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment,
    .variant {
      position: absolute;

      padding: var(--sc-size-sm) var(--sc-size-md);

      box-shadow: var(--sc-shadow-elevation-1dp);

      grid-column: 2;
      grid-row: 1;
    }

    br {
      content: '';
    }

    blockquote {
      margin: 0;
    }

    @media only screen and (max-width: 1280px) {
      .translation,
      .root,
      .variant,
      .comment {
        position: relative;

        display: table;

        margin-top: var(--sc-size-sm);
      }

      .segment {
        grid-template-columns: minmax(240px, 720px) minmax(240px, 720px);
      }

      .reference {
        grid-column: 1 / span 2;
      }

      .translation {
        grid-column: 1;
      }

      .root {
        grid-column: 2;
      }
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        position: relative;

        display: table;

        margin-top: var(--sc-size-sm);
      }

      .root .text {
        color: var(--sc-secondary-text-color);
      }
    }
  </style>
`;

export const lineByLineStyles = html`
  <style>
    .segment {
      display: grid;

      grid-template-columns: minmax(200px, 720px);
    }

    .reference {
      display: none;

      justify-self: baseline;
    }

    .translation {
      grid-column: 1;
    }

    .root {
      grid-column: 1;
    }

    .root .text {
      color: var(--sc-secondary-text-color);
      font-family: var(--sc-sans-font);
    }

    br {
      content: '';
    }

    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 6px 0 0;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;

export const lineByLinePlusStyles = html`
  <style>
    .segment {
      display: grid;

      grid-template-columns: 60px 1fr;
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;

      justify-self: baseline;
    }

    .translation {
      grid-column: 2;
    }

    .root {
      grid-column: 2;
    }

    .root .text {
      color: var(--sc-secondary-text-color);
      font-family: var(--sc-sans-font);
    }

    .translation,
    .root {
      position: relative;

      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment,
    .variant {
      position: absolute;

      padding: var(--sc-size-sm) var(--sc-size-md);

      box-shadow: var(--sc-shadow-elevation-1dp);

      grid-column: 2;
      grid-row: 1;
    }

    br {
      content: '';
    }

    blockquote {
      margin: 0;
    }

    blockquote .text {
      margin-left: 2vw;
    }

    @media only screen and (max-width: 840px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        position: relative;

        display: table;

        margin-top: var(--sc-size-sm);
      }
    }
  </style>
`;

export const hideReferenceStyles = html`
  <style>
    .reference {
      display: none;
    }
  </style>
`;

export const hideAsterisk = html`
  <style>
    .comment,
    .variant {
      display: none;
    }

    .comment:before,
    .variant:before {
      content: none;
    }
  </style>
`;

export const showAsterisk = html`
  <style>
    .comment::before,
    .variant::before {
      line-height: 1;

      content: '*';
      vertical-align: super;
    }

    .comment::before {
      color: var(--sc-primary-accent-color);
    }

    .variant::before {
      color: var(--sc-secondary-accent-color);
    }
  </style>
`;
