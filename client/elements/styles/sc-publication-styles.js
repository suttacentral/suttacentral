/* eslint-disable import/prefer-default-export */
import { css } from 'lit';

export const SCPublicationStyles = css`
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

  .breadcrumbs {
    background-color: #333;
    color: white;
    padding-left: 1em;
  }

  .breadcrumbs ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
  }

  .breadcrumbs ul li {
    padding: 1em 0em 0.5em 1em;
    margin-top: 0;
    border-bottom: 8px solid rgba(0, 0, 0, 0);
  }

  .breadcrumbs ul li:after {
    content: '>';
    margin: 0 0 0 1em;
  }

  .breadcrumbs ul li#selected {
    margin: 0;
    border-bottom: 8px solid gold;
  }

  .breadcrumbs ul li#selected:after {
    content: ’’;
    margin: 0 0 0 1em;
  }

  .toolbar {
    background-color: darkgoldenrod;
    color: white;
    margin-top: 0;
    padding: 0.5rem 2rem;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .toolbar span {
    font-size: 1.5em;
  }

  .toolbar ul {
    list-style-type: none;
    display:  flex;
    flex-direction: row;
  }

  .toolbar ul li {
    padding:  1em 2em 0.5em;
    margin-top:  0;
    border-bottom:  8px solid rgba(0,0,0,0);
  }

  main {
    margin: 4em auto;
    max-width: 720px;
    flex-grow: 1;
  }

  header,
  main,
  footer {
    flex-shrink: 0;
  }

  dt {
    font-weight: bold;
  }

  header {

  }

  .page-header {
    text-align:  center;
  }

  h1 {
    margin: 0;
  }

  header p{
    margin: 8px;
  }

  p.author {
    font-size: 1.5em;
    font-style: italic;
    margin-top: 24px;
  }

  .toolbar-toc {
    position: absolute;
    left: 0;
    background-color: white;
    color: black;
    width: 100vw;
    border-bottom: 2px solid #ccc;
    display: flex;
    justify-content: center;
    padding: 2em 0;
  }


  .toc ol {
    border-left: 4px solid gold;
    padding-left: 2em;
    margin-bottom: 2em;
  }

  .toc li {

  }

  img {
    margin-right: 32px;
  }

  dd a p {
    background-color: #eee;
    margin: 1em 0;
    padding: 16px 32px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  dd a p:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  section + section {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid #ccc;
  }

  section li {
    margin-left: 2em;
    margin-top: 0;
  }

  table {
    margin: 48px auto;
    position: relative;
    border-collapse: collapse;
  }

  caption {
    font-size: 2em;
    margin-bottom: 16px;
  }

  tr {
  }

  th,
  td {
    padding: 16px 32px;
  }

  table a {
    display: block;
    padding: 8px 16px;
    background-color: green;
    color: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-weight: 500;
  }

  table a:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  .web:before {
    content: '🌐';
  }

  .book:before {
    content: '📖';
  }

  .epub:before {
    content: '🌐';
  }

  .pdf:before {
    content: '🌐';
  }

  .web:before,
  .book:before,
  .epub:before,
  .pdf:before {
    color: #777;
    margin-right: 8px;
  }

  .internal:after,
  .external:after,
  .download:after {
    float: right;
    margin-left: 16px;
  }

  .internal:after {
    content:'⮕';
  }

  .external:after {
    content: '⬈';
  }

  .download:after {
    content:'⬇';
  }
  .author-pic {
    float: right;
    width: 300px;
    height: 300px;
    margin: 0 0 24px 32px;
  }

  .book-pic {
    float: right;
    width: 300px;
    height: 300px;
    margin: 0 0 24px 32px;
  }

  figcaption {
    color: #757575;
    text-align: center;
    font-size: 0.8em;
  }

  .discourses-list {
    list-style-type: none;
  }

  .discourses-list li {
    font-weight: bold;
    margin-top: 0;
  }

  .discourses-list ul {
    list-style-type: none;
    margin-top: 1em;
    margin-left: 1em;
  }

  .discourses-list .translation {
    font-weight: normal;
  }

  .discourses-list .root {
    display: block;
    margin-top: 0;
    font-weight: normal;
  }

  .discourses-list a {
    display: inline-block;
    padding: 0.5em 1em;
  }

  .discourses-list a:hover {
    background-color: #eee;
  }

  footer {
    width: 100vw;
    height: 10rem;
    background-color: darkgoldenrod;
    align-self: flex-end;
    margin: 0;
    color: white;
    padding: 0 2em;
    box-sizing: border-box;
  }

  footer a {
    width: 50vw;
    height: 10rem;
    margin: 2em;

    display: table-cell;
    vertical-align: middle;
    font-size: 1.5em;
  }

  footer .prev {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
  }

  footer .next {
    text-align: right;
  }
`;
