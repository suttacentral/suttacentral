/* eslint-disable import/prefer-default-export */
import { css } from 'lit';

export const SCPublicationEditionsStyles = css`
  * {
    margin: 0;
    padding: 0;
  }

  * + * {
    margin-top: 1em;
  }

  body {
    margin-top: 0;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
  }

  main {
    margin: 4em auto;
    max-width: 720px;
    flex-grow: 1;
  }

  main,
  footer {
    flex-shrink: 0;
  }

  .page-header {
    text-align:  center;
  }

  h1 {
    margin: 0;
  }

  header p {
    margin: 8px;
  }

  .project a {
    color: inherit;
    text-decoration: none;
    display: block;
  }

  .project a:hover {
    background-color: orange;
  }

  img {
    width: 100%;
    height: auto;
    margin: 0 0 24px 0;
    object-fit: cover;
  }

  figcaption {
    color: #757575;
    text-align: center;
    font-size: 0.8em;
  }

  .byline {
    font-size: 1.25em;
    font-style: italic;
    margin-top: 0;
  }

  article {
    margin-bottom: 8em;
  }

  .project {
    border: 1px solid #ccc;
    padding: 1em 1em 1em 1em ;
    border-radius: 4px;
  }

  .down-all {
    margin-bottom: 4em;
  }

  .button {
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    display: block;
    padding: 1em;
    background-color: green;
    color: white;
    border-radius: 4px;
  }
`;
