import { html } from "lit-element";
import { html as legacyHtml } from '@polymer/polymer/polymer-element.js';

export const staticStyles = html`
<style>
  #page-wrap {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 24px;
    height: auto !important;
    margin: 0 auto;
    min-width: 320px;
  }
  main {
    margin-top: 3em;
    margin-bottom: 6em;
  }
  section {
    margin: 6em auto 0 !important;
    padding: 0 5% !important;
    max-width: 720px;
    display: block;
  }

  h1 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-h1-md);
    font-weight: 400;
    line-height: 40px;
  }
  h2 {
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-static-subtitle);
        font-weight: 400;
        line-height: 32px;
  }
  h3 {
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-xl);
        font-weight: 400;
        line-height: 28px;
  }
  h4 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-l);
    font-weight: 400;
    line-height: 24px;
  }
  h5 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 24px;
  }
  h6 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 24px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-serif-font);
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
    line-height: 24px;
  }
  caption {
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-xl);
        font-weight: 400;
        line-height: 28px;
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
    font-family: var(--sc-serif-font);
    font-weight: bold;
  }
  .description {
    color: var(--sc-secondary-text-color);
    margin: 0;
    font-style: italic;
  }
  .type {
    margin-bottom: 8px;
  }
  .life-events {
    margin-top: 8px;
    color: var(--sc-secondary-text-color);
    font-style: italic;
  }
  .translation {
    font-family: var(--sc-serif-font);
    font-style: normal;
  }
  .ref {
    font-size: var(--sc-skolar-font-size-s);
    color: var(--sc-secondary-text-color);
    background-color: var(--sc-textual-info-background-color);
    border-radius: var(--sc-size-xxs);
    padding: var(--sc-size-xs) var(--sc-size-sm) var(--sc-size-xxs);
    white-space: nowrap;
  }
  nav.contents{
    border-radius: 2px;
    border-left: 4px solid #F6C200;
    margin: 64px 0;
    padding: 0px;
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
    padding: 8px 0;
    display: inline-block;
    margin: 8px;
    text-decoration: none;
    border-radius: 2px;
    width: 64px;
  }
  .entry-list a:hover {
    background-color: var(--sc-textual-info-background-color)
  }
  nav.contents li{
    margin:0.5em 0;
  }
  nav.contents a{
    text-decoration: none;
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
  a.ref {
    text-decoration: none;
  }
  .static-copyright {
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-h1-md);
    font-weight: 400;
    line-height: 40px;
    margin-top: 64px;
    background: var(--sc-tertiary-background-color);
    padding: 16px 32px;
    border: 1px solid var(--sc-border-color);
    border-radius: 2px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  dt,
  p,
  figure,
  pre,
  table,
  fieldset,
  hr {
    margin: 1em 0 0 0;
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
  }
</style>`;

export const legacyStaticStyles = legacyHtml([staticStyles.strings.join('')]);
