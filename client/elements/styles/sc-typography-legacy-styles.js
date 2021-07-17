import { css } from 'lit';

export const typographyLegacyStyles = css`
  /* styles unique to legacy texts */

  /* sutta title */

  .subheading {
    font-style: italic;
  }

  /*bilingual sutta title*/

  .mirror {
    display: table;

    margin-right: auto;
    margin-left: auto;
  }
  .mirror > * {
    display: table-row;
  }
  .mirror-left {
    display: table-cell;

    width: 50%;
    padding-right: 1rem;

    text-align: right;

    border-right: var(--sc-border);
  }
  .mirror-right {
    display: table-cell;

    padding-left: 1rem;

    text-align: left;
  }
  .mirror-middle {
    position: absolute;

    margin-top: 0.2rem;

    text-align: right;
  }

  .text-table td:first-child {
    font-weight: inherit;
  }

  .spanFocused {
    color: rgb(34, 33, 32);
    background-color: var(--sc-primary-color-light);
  }
`;
