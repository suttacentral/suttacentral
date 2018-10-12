import { html } from "@polymer/lit-element/lit-element.js";

export const staticStyles = html`
<style>
  #page-wrap {
    @apply --sc-paper-font-body;
    height: auto !important;
    margin: 0 auto -240px;
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
    @apply --paper-font-display1;
  }
  h2 {
    @apply --paper-font-headline;
  }
  h3 {
    @apply --paper-font-title;
  }
  h4 {
    @apply --paper-font-subhead;
    @apply --sc-skolar-font-size-l;
  }
  h5 {
    @apply --paper-font-subhead;
  }
  h6 {
    @apply --paper-font-subhead;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--sc-secondary-text-color);
    @apply --sc-serif-font;
  }
  p,
  li,
  td,
  dt,
  dd,
  blockquote {
    @apply --sc-paper-font-body;
  }
  caption {
    @apply --paper-font-title;
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
  dd ol,
  dd ul {
    padding-left: 0;
  }
  dt {
    @apply --sc-serif-font;
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
    @apply --sc-serif-font;
    font-style: normal;
  }
  .ref {
    @apply --sc-skolar-font-size-s;
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
    @apply --paper-font-display1;
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
    @apply --sc-inline-link;
  }

  p a:hover,
  li a:hover,
  dd a:hover,
  td a:hover  {
    @apply --sc-inline-link-hover;
  }

  p a:visited,
  li a:visited,
  dd a:visited,
  td a:visited {
    @apply --sc-inline-link-visited;
  }
  code > p {
    @apply --sc-monospace-font
  }
  img {
    display: block;
    margin: 32px auto;
    max-width: 100%;
  }
  .author {
    @apply --sc-mixed-small-caps;
  }
  .byline {
    font-style: italic;
  }
  .gatha {
    font-size: inherit;
    display: table;
    width: auto;
    margin: 0 auto;
  }
  .pre {
    @apply --sc-monospace-font;
    margin: var(--sc-size-xxl) var(--sc-size-md);
  }
</style>`;
