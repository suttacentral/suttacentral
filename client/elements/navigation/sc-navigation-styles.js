import { html } from 'lit-element';

export const navigationNormaModelStyles = html`
  <style>
    html {
      --sc-umbra-opacity: rgba(0, 0, 0, .2);
      --sc-penumbra-opacity: rgba(0, 0, 0, .14);
      --sc-ambient-opacity: rgba(0, 0, 0, .12);
      --sc-shadow-elevation-1dp: 0px 2px 1px -1px var(--sc-umbra-opacity), 0px 1px 1px 0px var(--sc-penumbra-opacity), 0px 1px 3px 0px var(--sc-ambient-opacity);
      --sc-shadow-elevation-8dp: 0px 5px 5px -3px var(--sc-umbra-opacity), 0px 8px 10px 1px var(--sc-penumbra-opacity), 0px 3px 14px 2px var(--sc-ambient-opacity);
      --sc-serif: 'source serif variable';
      --sc-sans: 'source sans variable';
    }

    body {
      font-family: var(--sc-sans), sans-serif;
      margin: 0;
      background-color: rgb(251, 250, 249);
    }

    .appbar {
      font-size: 22.6px;

      display: flex;

      height: 64px;
      padding: 0 2rem 0 32px;

      color: white;
      background-color: goldenrod;

      align-items: center;
      justify-content: space-between;
    }

    .text-functions {
      display: flex;
      flex-direction: row;
    }

    .icon {
      font-size: 1.2rem;
      line-height: 1.5;
    }

    .appbar-function {
      display: flex;
      flex-direction: column;

      padding: 0 16px;

      align-items: center;
    }

    .label {
      font-size: 12px;
      font-weight: 500;
    }

    .home-page {
      height: 12rem;

      justify-content: center;
    }

    .home-page .page-title {
      font-family: var(--sc-serif);
      font-size: 3em;

      font-variant-caps: small-caps;
    }

    nav,
    header {
      margin: 0;
    }

    main {
      display: flex;
      flex-direction: column;

      height: 100%;
      margin: 2em 0;

      align-items: center;
    }

    .main-nav {
      display: flex;
      flex-direction: row;
      flex-gap: 1em;
      justify-content: center;
      flex-wrap: wrap;
    }

    section {
      width: 720px;
      margin: 1em 0 0 0;
    }

    @media screen and (min-width: 320px) and (max-width: 480px){
      section {
        max-width: 300px;
        max-width: min-content;
      }
    }

    .home-card {
      max-width: 30em;
      margin: 4em 1em 0;
    }

    .card {
      position: relative;

      /* overflow: hidden; */

      min-width: 20em;
      padding-bottom: 1rem;

      transition: box-shadow 200ms ease-out;

      border-radius: 8px;
      background-color: var(--sc-primary-background-color);
      box-shadow: var(--sc-shadow-elevation-1dp);

      cursor: pointer;
    }

    .card:hover {
      z-index: 10;

      transition: box-shadow 200ms ease-out;

      box-shadow: var(--sc-shadow-elevation-8dp);
    }

    .card:active {
      box-shadow: var(--sc-shadow-elevation-1dp);
    }

    .blurb {
      margin-bottom: 1rem;
      padding: .5rem 1rem;
      color: var(--sc-primary-text-color);
    }

    .card header {
      display: flex;

      justify-content: space-between;
    }

    .header-left {
      padding: 1rem 1rem;
    }

    /* .title:lang(en) {
      font-family: var(--sc-serif);
      font-size: 1.5em;
      font-weight: 500;

      display: block;
    }

    .title:lang(pli) {
      font-weight: 600;

      color: #757575;
    } */

    .title {
      font-family: var(--sc-serif);
      font-size: 1.5em;
      font-weight: 500;

      display: block;
      color: var(--sc-primary-text-color);
    }

    .rootTitle {
      font-weight: 600;

      color: var(--sc-secondary-text-color);
    }

    .transition:hover {
      background-color: rgba(67, 160, 71, .3);
    }

    .actions {
      display: flex;

      margin-top: 1em;
      padding: .5rem 1rem;
    }

    button {
      font-weight: 700;

      margin-right: 1em;
      padding: .5em 1em;

      cursor: pointer;
      text-transform: uppercase;

      color: rgba(67, 160, 71, 1);
      border: 2px solid rgba(67, 160, 71, 1);
      border-radius: 8px;
      background-color: inherit;
    }

    .demphasized-button {
      border: none;
    }

    a {
      cursor: pointer;
      text-decoration: none;
      text-transform:capitalize;
      color: inherit;
    }

    .stats {
      font-size: .8em;

      display: flex;
      flex-direction: row;

      margin-top: 1em;
      padding: 2rem 1rem .5rem;
      padding-top: 2em;

      border-top: 1px solid #ccc;

      justify-content: space-between;
    }

    .stats-head {
      font-weight: bold;

      padding: .5rem 1rem;

      color: white;
      background-color: #757575;
    }

    .stats-head~div {
      padding: .5rem 1rem;
    }

    .stats>div {
      overflow: hidden;

      width: 20%;
      padding: 0;

      border: 1px solid #ccc;
      border-radius: 8px;
    }

    .editions {
      padding: .5rem 1rem;
    }

    .editions ul {
      display: flex;

      margin: 0;

      justify-content: space-around;
    }

    .editions li {
      margin: .25em 0;
      padding: .25em .5em;
      list-style-type: none;
    }

    .subtitle {
      font-family: var(--sc-serif);
      font-size: 1.2em;
      font-weight: 500;
    }

    .editions {
      margin: 1em;

      border: 1px solid #ccc;
      border-radius: 4px;
    }

    nav {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      padding: 0 2rem 0 12px;
      background-color: rgb(75, 74, 74);
      justify-content: space-between;
      overflow-x: auto;
      white-space:nowrap;
    }

    .nav-right span {
      padding: 12px 16px;
      color: white;
    }

    .nav-right {
      display: flex;
      flex-direction: row;
    }

    nav ul {
      display: flex;

      width: 100%;
      margin: 0;
      padding: 0;
    }

    nav li {
      font-size: .8em;
      font-weight: 500;

      margin: 0;
      margin: 0 8px 0 16px;
      padding: 14px 8px 10px 4px;

      list-style-type: none;

      color: white;
    }

    nav li:hover {
      cursor: pointer;

      border-bottom: 4px solid gold;
    }

    nav li:last-child {
      font-weight: 700;
      border-bottom: 4px solid gold;
    }

    nav li:last-child:hover {
      color: white;
      cursor: default;
    }

    nav li:last-child a {
      cursor: default;
    }

    nav li:after {
      font-weight: 400;

      position: absolute;

      margin-left: 16px;

      content: '❭';
      /* transform: scale(0.707) rotate(45deg); */
      color: white;
    }

    nav li:last-of-type:after {
      content: '';
    }

    .header-right {
      font-size: .75em;
      line-height: 1;

      display: flex;
      flex-direction: column;

      height: 100%;
      padding: .3333em .5em;

      color: var(--sc-primary-text-color);
      background-color: var(--sc-primary-color-dark);

      justify-content: center;
      align-items: center;
    }

    .number {
      font-weight: 800;
    }

    .essay {
      display: table;

      padding: 0 1rem .5rem 1rem;

      color: rgba(67, 160, 71, 1);
    }

    .essay:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    .essay:hover:after {
      content: '↗';
    }

    .text {
      max-width: 40em;
    }

    .search-field {
      position: relative;

      display: flex;
      flex-direction: column;

      width: 720px;
      margin-bottom: 2em;
    }

    input {
      font-size: 16px;

      margin: 0 1em;
      padding: 20px 16px 8px 16px;

      border: none;
      border-bottom: 1px solid goldenrod;
      border-radius: 8px 8px 0 0;
      background-color: #eee;
    }

    label {
      font-size: 12px;

      position: absolute;
      top: 4px;
      left: 32px;

      color: #757575;
    }

    .checked {
      display: none;
    }

    [hidden] {
      display: none !important;
    }

    titlebarSitetitle {
      
    }
  </style>
`;

export const navigationCompactModeStyles = html`
  <style>
    .blurb,
    button,
    .essay,
    .actions,
    .stats,
    .editions {
      display: none;
    }

    section {
      margin: 0 0 1px 0;
    }

    .card {
      border-radius: 0px;
      padding-bottom: 0;
      cursor: pointer;
    }

    .title {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .checked {
      display: flex;
    }

    .unchecked {
      display: none
    }
  </style>
`;