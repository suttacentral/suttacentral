import { html } from 'lit-element';

export const navigationNormaModelStyles = html`
  <style>
    html {
      --sc-umbra-opacity: rgba(0, 0, 0, .2);
      --sc-penumbra-opacity: rgba(0, 0, 0, .14);
      --sc-ambient-opacity: rgba(0, 0, 0, .12);
      --sc-shadow-elevation-1dp: 0px 2px 1px -1px var(--sc-umbra-opacity), 0px 1px 1px 0px var(--sc-penumbra-opacity), 0px 1px 3px 0px var(--sc-ambient-opacity);
      --sc-shadow-elevation-8dp: 0px 5px 5px -3px var(--sc-umbra-opacity), 0px 8px 10px 1px var(--sc-penumbra-opacity), 0px 3px 14px 2px var(--sc-ambient-opacity);
    }

        main{
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .main-nav {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: nowrap;
      margin-top: 4em;
    }

    @media screen and (max-width: 720px){
      .main-nav {
        flex-wrap: wrap;
        
      }
    }

    .card {
      position: relative;

      /* overflow: hidden; */
      max-width: 30em;

      min-width: 10em;
      padding-bottom: 1rem;
      margin: 0.5em;

      transition: box-shadow 200ms ease-out;

      border-radius: var(--sc-size-sm);
      background-color: var(--sc-secondary-background-color);
      box-shadow: var(--sc-shadow-elevation-1dp);

      cursor: pointer;

      overflow: hidden
    }

    .card:hover {
      z-index: 10;

      transition: box-shadow 200ms ease-out;

      box-shadow: var(--sc-shadow-elevation-8dp);
    }

    .card:hover .title{
      text-decoration: underline;
      text-decoration-color: var(--sc-primary-color);
    }

    .card:active {
      box-shadow: var(--sc-shadow-elevation-1dp);
    }

.nav-card{
  min-width: 30em;
}
    .nav-card:first-of-type{
margin-top: 4em
    }
    .nav-car:last-of-type{
      margin-bottom: 4em
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
      font-size: 1.5em;
      font-weight: 500;

      display: block;
    }

    .title:lang(pli) {
      font-weight: 600;

      color: #757575;
    } */

    .title {
      font-family: var(--sc-serif-font);
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
      font-size: var(--sc-skolar-font-size-xs);
      line-height: 1;

      display: flex;
      flex-direction: column;

      height: 100%;
      padding: .3333rem .5rem;

      color: var(--sc-paper-tooltip-text-color);
      font-weight: 600;
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

    .essay a:hover {
      cursor: pointer;
      text-decoration: underline;
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