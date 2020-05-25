import { css } from 'lit-element';

export const layoutSimpleStyles = css`
  main {
    display: flex;

    margin: 4.2em 2.4em;

    justify-content: center;
  }

  section,
  article {
    max-width: 720px;
  }
`;