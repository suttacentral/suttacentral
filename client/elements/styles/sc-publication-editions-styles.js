import { css } from 'lit';

export const SCPublicationEditionsStyles = css`
  main {
    max-width: 720px;
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
  
  .down-all ul {
    list-style-type: none;
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
  
    color: var(--sc-on-primary-primary-text-color);
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
    display: block;
  
    margin: 2em 0;
  
    transition: var(--sc-link-transition);
    text-decoration: none;
  
    color: inherit;
    border-radius: var(--sc-big-border-radius);
    background-color: inherit;
  }
  
  .block-link:hover {
    transition: var(--sc-link-transition);
  
    background-color: var(--sc-primary-color-light-transparent);
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
    margin-bottom: 8em;
  }
  
  .project {
    margin: 0;
    padding: 0;
  }
  
  .project:before {
    display: block;
  
    width: 50%;
    margin: 24px auto;
  
    content: '';
  
    border-bottom: 1px solid var(--sc-border-color);
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
    margin: 4em 0 4em 0;
  }
  
  .down-all ul {
    margin-left: 0;
    padding-left: 0;
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
  
    color: var(--sc-on-tertiary-secondary-text-color);
    border-radius: var(--sc-big-border-radius);
    background-color: var(--sc-tertiary-background-color);
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
`;
