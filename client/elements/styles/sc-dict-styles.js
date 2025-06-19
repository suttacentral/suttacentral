import { css } from 'lit';

export const dictStyles = css`
  dl {
    margin-top: var(--sc-size-sm);
  }

  dd {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;
    line-height: 1.5;

    margin: 0;
  }

  dd > p {
    margin: 0 0 0.5rem 0;
  }

  dd + dt {
    margin-top: 1rem;
  }

  dfn {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-xxxl);
    font-weight: 400;
    font-style: normal;
    line-height: 32px;

    text-transform: lowercase;

    color: var(--sc-primary-accent-color);
  }

  .dppn-entry dfn {
    text-transform: capitalize;
  }

  .case {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    line-height: 24px;

    display: block;
    overflow: hidden;

    white-space: nowrap;
    letter-spacing: var(--sc-caps-letter-spacing);

    color: var(--sc-on-primary-secondary-text-color);

    font-variant-caps: all-small-caps;
  }

  dd .ref {
    font-family: var(--sc-sans-font);
    font-weight: 600;
    font-style: normal;

    white-space: nowrap;
    letter-spacing: normal;

    color: var(--sc-on-primary-secondary-text-color);

    font-variant-caps: normal;
  }

  dd .author {
    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: all-small-caps;
  }

  dd .eti {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);

    color: var(--sc-on-primary-secondary-text-color);
  }

  dd .term {
    font-weight: normal;
  }

  dd .abbr {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: bold;

    padding: var(--sc-size-xs) var(--sc-size-sm);

    color: var(--sc-inverted-text-color);
    border-radius: var(--sc-size-xxs);
    background-color: var(--sc-inverted-text-color);
  }

  dd .inline-li {
    font-family: var(--sc-sans-font);
    font-weight: bold;

    padding: 0 8px;

    color: var(--sc-on-primary-secondary-text-color);
  }

  dd .square {
    font-size: 2.4em;
    line-height: 0;
    display: inline-block;

    margin-left: -8px;

    vertical-align: middle;

    color: var(--sc-icon-color);
  }

  dd ol {
    margin: 0;
    padding: 0 0 0 1rem;
  }

  dd li {
    padding-left: clamp(0rem, 3vw, 1rem);
  }

  li::marker {
    color: var(--sc-icon-color);
    font-family: var(--sc-sans-font);

    font-weight: 600;

    font-feature-settings: 'tnum', 'onum';
  }

  .little {
    list-style-type: decimal;
  }

  .little li {
    margin: 0 0 0 0;
  }

  dd ul {
    margin: 0 0 var(--sc-size-sm) var(--sc-size-md-larger) !important;
    list-style-type: disc;
  }

  dd ol + ul.compounds {
    margin-top: var(--sc-size-md-larger) !important;
  }

  dd ol li {
    margin: var(--sc-size-xs) 0 0 0;
  }

  .compounds {
    margin-left: var(--sc-size-md-larger) !important;

    list-style-type: none;
  }

  .lower-greek {
    list-style-type: lower-greek;
  }

  .compounds > li::before {
    margin-left: -12px;

    content: '◦';

    color: var(--sc-icon-color);
  }

  .info {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;

    text-align: left;
  }

  /* inline links */

  p a,
  li a,
  dl a,
  table a {
    transition: var(--sc-link-transition);
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.15em;
  }

  p a:hover,
  li a:hover,
  dl a:hover,
  table a:hover {
    transition: var(--sc-link-transition);
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 4px;
    text-underline-offset: 0.15em;
  }

  p a:active,
  li a:active,
  dl a:active,
  table a:active {
    text-decoration-color: var(--sc-primary-color);
  }

  p a:visited,
  li a:visited,
  dl a:visited,
  table a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  /* block links */

  .block-link {
    transition: var(--sc-link-transition);
    text-decoration: none;

    color: inherit;
    background-color: inherit;
  }

  .block-link:hover {
    transition: var(--sc-link-transition);

    text-decoration: none;

    background-color: var(--sc-primary-color-light-transparent);
  }

  .block-link:active {
    background-color: var(--sc-primary-color-light);
  }
`;
