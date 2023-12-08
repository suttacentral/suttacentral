import { css } from 'lit';

export const SCPublicationEditionsStyles = css`
  main {
    max-width: 100vw;
    margin: 2em auto 4em;
  }

  hgroup {
    text-align: center;
  }

  .page-header {
    margin-bottom: 4em;

    border-bottom: 2px solid var(--sc-primary-color-light);
  }

  h1 {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-xxxxl);
    font-weight: 300;

    margin: 0;

    font-variant-caps: small-caps;
  }

  .subtitle {
    font-family: var(--sc-serif-font);
    font-style: italic;

    margin: 0;
    margin-bottom: 1rem;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;

    vertical-align: middle;

    fill: var(--sc-icon-color);
  }

  .project hgroup {
    padding: 1rem;
  }

  .translation_title {
    font-size: var(--sc-font-size-xxxl);

    color: var(--sc-on-tertiary-primary-text-color);
  }

  .translation_subtitle {
    font-size: var(--sc-font-size-md);
    font-style: italic;
  }

  .creator_name {
    font-size: var(--sc-font-size-l);

    margin-top: 0;

    text-align: center;

    font-variant-caps: all-small-caps;
  }

  .block-link {
    margin: 2em 0;
  }

  .publication_blurb {
    font-family: var(--sc-sans-font);

    min-height: 20em;
    padding: 1em;
  }

  h2 {
    margin-top: 0;
  }

  article {
    display: flex;
    flex-direction: column;

    margin-bottom: 8em;

    align-items: center;
  }

  .editions-top-sections {
    display: flex;

    flex-wrap: wrap;
    gap: 36px;
    justify-content: center;
  }

  .editions-header {
    max-width: 720px;
  }

  .all-editions {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }

  .project {
    max-width: 600px;
    margin: 0;
    padding: 24px 12px 12px 12px;

    color: var(--sc-on-tertiary-primary-text-color);
    border-radius: 24px;
    background-color: var(--sc-tertiary-background-color);
  }

  img {
    display: block;
    float: left;

    width: auto;
    height: 16em;
    margin: .5em 1em 1em 0;

    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  .main-image {
    float: right;

    width: 50%;
    height: auto;
    margin: 0 0 1em 1em;
  }

  .down-all {
    max-width: 360px;
    margin: 0;
    padding: 24px;

    border: 1px solid var(--sc-border-color);
    border-radius: 24px;
  }

  @media screen and (max-width: 1260px) {
    .down-all {
      max-width: 720px;
    }

    .down-all ul {
      margin-left: 0;
      padding-left: 0;

      list-style-type: none;
    }

    .down-all li {
      margin-left: 0;
      padding-left: 0;
    }

    .down-all aside {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-s);

      margin-top: 1rem;
      padding: 1em;

      color: var(--sc-on-primary-secondary-text-color);
    }

    h1 {
      font-family: var(--sc-sans-font);
      font-weight: 200;
      font-stretch: expanded;

      letter-spacing: var(--sc-caps-letter-spacing);
    }

    .link-button-container {
      display: flex;

      margin-top: 1em;

      justify-content: center;
    }
  }
`;
