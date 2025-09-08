import { html, css } from 'lit';

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

  span.text[lang="la"] {
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

  .refFocused {
    background-color: var(--sc-primary-color-light-transparent) !important;
    padding-top: 8px;
  }

  .sutta-title {
    word-break: break-word;
  }

  #segmented_text_content {
    min-height: 70vh;
  }
`;

export const plainStyles = html`
  <style>
    section,
    article {
      max-width: 720px;
    }

    .root {
      display: none;
    }

    .verse-line {
      display: block;
    }

    .verse-line .translation {
      hyphens: none;
      margin-left: 2em;
    }

    j {
      display: block;
      margin-left: 2em;
    }

    /* Set styles for tooltip marker. First we hide the actual content. These settings ensure the beginning, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 0 0 0;
      margin-left: -4px;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }
  </style>
`;

export const plainPaliStyles = html`
  <style>
    section,
    article {
      max-width: 720px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      word-break: break-word;
    }

    .verse-line .root {
      display: block;
      hyphens: none;
      margin-left: 4em;
    }

    .verse-line .text {
      margin-left: -2em;
    }

    wbr {
      display: block;
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
      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment {
      margin-bottom: var(--sc-size-sm);

      height: fit-content;

      grid-column: 2;
      grid-row: 1;
    }

    .verse-line .translation,
    .verse-line .root {
      text-indent: 2em;
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .reference,
      .translation {
        display: block;
      }

      .variant,
      .comment {
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
      display: grid;
      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .variant {
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
      user-select: none;
    }

    .verse-line .translation,
    .verse-line .root {
      text-indent: 2em;
    }

    .translation {
      grid-column: 1;
      user-select: text;
    }

    .root {
      grid-column: 2;
      user-select: text;
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

    @media only screen and (max-width: 600px) {
      .segment,
      .translation,
      .root {
        position: relative;

        display: block;
      }

      .root .text {
        color: var(--sc-on-primary-secondary-text-color);
      }
    }
  </style>
`;

export const sideBySidePlusStyles = html`
  <style>
    .segment {
      display: grid;

      grid-template-columns: 60px 1fr 1fr;
      grid-column-gap: var(--sc-size-lg);
    }

    .verse-line .translation,
    .verse-line .root {
      text-indent: 2em;
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
      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 300px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment,
    .variant {
      grid-column: 2;
      grid-row: 1;

      height: fit-content;

      margin-bottom: var(--sc-size-sm);
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
        display: table;

        margin-top: var(--sc-size-sm);
      }

      .root .text {
        color: var(--sc-on-primary-secondary-text-color);
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

    .verse-line .translation,
    .verse-line .root {
      text-indent: 2em;
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
      color: var(--sc-on-primary-secondary-text-color);
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
      color: var(--sc-on-primary-secondary-text-color);
      font-family: var(--sc-sans-font);
    }

    .translation,
    .root {
      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment,
    .variant {
      padding: var(--sc-size-sm) var(--sc-size-md);

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

      content: '* ';
      vertical-align: super;

      font-weight: 800;
    }

    .comment::before {
      color: var(--sc-primary-accent-color-light);
    }

    .variant::before {
      color: var(--sc-secondary-accent-color-light);
    }
  </style>
`;

export const userSelectStyleForTranslation = html`
  <style>
    .translation {
      user-select: text !important;
    }

    .root {
      user-select: none !important;
    }
  </style>
`;

export const userSelectStyleForRoot = html`
  <style>
    .translation {
      user-select: none ;
    }

    .root {
      user-select: text;
    }
  </style>
`;

export const lineByLineRootTextFirstStyles = html`
  <style>
    .root {
      order: 1;
    }

    .translation {
      order: 2;
    }

    .root .text {
      color: var(--sc-on-primary-primary-text-color);
    }

    .translation .text {
      color: var(--sc-on-primary-secondary-text-color);
      font-family: var(--sc-sans-font);
    }
  </style>
`;

export const floatingTooltipStyles = html`
  <style>
    /* Hide the actual content of the comment and variant, but keep the elements interactive */
    .comment,
    .variant {
      position: relative;
      display: inline;
      cursor: help;

      font-size: 0;
      line-height: 0;
      overflow: hidden;
      white-space: nowrap;

      /* Ensure the element can still receive mouse events */
      min-width: 1em;
      min-height: 1em;
    }

    /* Floating UI tooltip styles */
    .floating-tooltip {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-s);
      font-weight: 400;
      font-style: normal;
      line-height: 1.3333;

      max-width: 320px;
      padding: 12px 16px;

      color: var(--sc-on-primary-primary-text-color);
      background-color: var(--sc-secondary-background-color);
      border: 1px solid var(--sc-border-color);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

      word-wrap: break-word;
      word-break: break-word;

      cursor: default;
      user-select: text;

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

    .floating-tooltip a {
      color: var(--sc-primary-color);
      text-decoration: underline;
    }

    .floating-tooltip a:hover {
      color: var(--sc-primary-color-dark);
    }

    .comment::before,
    .variant::before {
      font-size: var(--sc-font-size-md);
      line-height: 1;
      font-weight: 800;
      vertical-align: super;
      content: '* ';
    }

    .comment::before {
      color: var(--sc-primary-accent-color-light);
    }

    .variant::before {
      color: var(--sc-secondary-accent-color-light);
    }

    .floating-tooltip:hover::after {
      opacity: 0.8;
    }

    .floating-tooltip.mobile-tooltip {
      max-width: 90vw;
      font-size: 16px;
      padding: 16px 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
    }

    @media (pointer: coarse) {
      .comment::before,
      .variant::before {
        padding: 4px;
        margin: 0 2px;
      }
    }

    @media screen and (max-width: 768px) {
      .floating-tooltip {
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      }
    }
  </style>
`;

