import { html } from "lit-element";
import { html as legacyHtml } from '@polymer/polymer/polymer-element.js';

export const staticStyles = html`
<style>
main {
    display: flex;
    justify-content: center;
    color: var(--sc-primary-text-color);
    margin: 6em 2em;
  }
  article {
    max-width: 720px;
    min-width: 320px;
    height: auto;
  }

  h1 {
    line-height: 1.3333;
    margin: 0.5em 0 0 0;
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-serif-font);
    font-size: 2em;
    font-size: clamp(1.5em, 5vw, 2em);
    font-weight: 300;
  }
  h2 {
    line-height: 1.3333;
    margin: 1em 0 0 0;
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-serif-font);
    font-size: 1.5em;
    font-size: clamp(1.125em, 3.75vw, 1.5em);
    font-weight: 400;
  }
  h3 {
    line-height: 1.3333;
    margin: 1em 0 0 0;
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-serif-font);
    font-size: 1.333em;
    font-size: clamp(1em, 3.333vw, 1.333em);
    font-weight: 400;
  }
  h4 {
    line-height: 1.3333;
    margin: 1em 0 0 0;
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-serif-font);
    font-size: 1.25em;
    font-size: clamp(1em, 5vw, 1.25em);
    font-weight: 400;
  }
  h5 {
    line-height: 1.3333;
    margin: 1em 0 0 0;
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-serif-font);
    font-size: 1em;
    font-weight: 600;
  }
  h6 {
    line-height: 1.3333;
    margin: 1em 0 0 0;
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-serif-font);
    font-size: 1em;
    font-weight: 400;
    font-style: italic
  }
  p,
  li,
  td,
  dt,
  dd,
  blockquote {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 1.5;
  }
  caption {
        font-size: var(--sc-skolar-font-size-xl);
        padding: 20px;
  }
  table {
    margin: var(--sc-size-xl) auto;
    border-collapse: collapse;
  }
  td {
    padding: 12px var(--sc-size-md-larger) 12px var(--sc-size-md-larger);
    vertical-align: text-top;
    border-top: 1px solid var(--sc-border-color);
    border-bottom: 1px solid var(--sc-border-color);
  }
  td:first-child {
    font-weight: bold;
  }
  li {
    padding: var(--sc-size-xs) 0;
  }
  ul {
    padding-left: var(--sc-size-xl);
  }
  ol ul, ul ol, ul ul, ol ol {
    margin: var(--sc-size-xs) 0 0;
  }
  dd ol,
  dd ul {
    padding-left: 0;
  }
  dt {
    font-weight: bold;
  }
  .description {
    margin: 0;
    font-style: italic;
  }
  .type {
    margin-bottom: 0.5em;
  }
  .life-events {
    margin-top: 0.5em;
    color: var(--sc-secondary-text-color);
    font-style: italic;
  }
  .translation {
    font-family: var(--sc-serif-font);
    font-style: normal;
  }
  .ref {
    color: var(--sc-secondary-text-color);
    white-space: nowrap;
    font-weight: 600;
    text-decoration: none;
  }
  .contents{
    border-radius: 4px;
    border-left: 4px solid var(--sc-primary-color-light);
    margin: 64px 0;
  }
  .entry-list {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;    
    text-align: center;
  }
  .entry-list a {
    padding: 0.5em 0;
    display: inline-block;
    margin: 1em 0.5em;
    text-decoration: none;
    border-radius: 2px;
    width: 64px;
  }
  .entry-list a:hover {
    background-color: var(--sc-textual-info-background-color)
  }
  .subject {
    font-style: italic;
    color: var(--sc-secondary-text-color);
  }
  .subject:before {
    content: "("
  }
  .subject:after {
    content: ")"
  }
  .static-copyright {
    color: var(--sc-secondary-text-color);
    margin-top: 64px;
    background: var(--sc-tertiary-background-color);
    padding: 1em 2em;
    border: 1px solid var(--sc-border-color);
    border-radius: 2px;
  }
  .about-index{
    color: var(--sc-secondary-text-color);
    margin-top: 64px;
    padding: 1em 2em;
    border: 1px solid var(--sc-border-color);
    border-radius: 2px;
  }
  ul,
  ol,
  dt,
  p,
  figure,
  pre,
  table,
  fieldset,
  hr {
    margin: 0.75em 0 0 0;
  }

  p a,
  li a,
  dd a,
  td a,
  blockquote a {
        color: inherit;
        text-decoration: underline;
        text-decoration-color: var(--sc-primary-color);
        text-decoration-skip-ink: auto;
  }

  p a:hover,
  li a:hover,
  dd a:hover,
  td a:hover  {
    color: var(--sc-primary-color);
  }

  p a:visited,
  li a:visited,
  dd a:visited,
  td a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }
  .link-button{
    background-color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--sc-primary-accent-color);
    border: 2px solid var(--sc-primary-accent-color);
    height: 36px;
    padding: 0px 15px;
    letter-spacing: var(--sc-caps-letter-spacing);
    font-variant-caps: all-small-caps;
    box-sizing: border-box;
    min-width: 64px;
  }
  .link-button:hover{
    background-color: var(--sc-primary-accent-color-light-transparent);
  }
  code > p {
    font-family: var(--sc-monospace-font);
  }
  img {
    display: block;
    margin: 32px auto;
    max-width: 100%;
  }
  .author {
    font-variant-caps: small-caps;
    letter-spacing: var(--sc-caps-letter-spacing);
  }
  .byline {
    font-style: italic;
  }
  .gatha {
    font-size: inherit;
    width: auto;
    margin: 0 auto;
    padding: 0 1em;
  }
  .pre {
    font-family: var(--sc-monospace-font);
    margin: var(--sc-size-xxl) var(--sc-size-md);
</style>`;

export const legacyStaticStyles = legacyHtml([staticStyles.strings.join('')]);
