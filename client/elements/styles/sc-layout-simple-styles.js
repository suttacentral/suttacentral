/* eslint-disable import/prefer-default-export */
import { css } from 'lit';

export const layoutSimpleStyles = css`
  section,
  article {
    max-width: 720px;
  }

  .image-link {
    cursor: pointer;
  }

  .image-book-link {
    margin-bottom: 0.5em;
    margin-left: 0.2em;
  }

  .image-book-link:before {
    display: none;
  }

  .text-center {
    text-align: center;
  }

  .margin-top-xl {
    margin-top: var(--sc-size-xl);
  }

  article p,
  .word,
  .translated-text,
  .original-text {
    transition: background-color 300ms ease-in;
  }

  p,
  li {
    hanging-punctuation: first last;
  }
`;
