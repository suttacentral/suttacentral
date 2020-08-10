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

    margin: var(--sc-size-md-larger) auto;
    max-width: 720px;
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

      padding-bottom: 0.5rem;
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
      background-color: var(--sc-primary-color-light-transparent);
    }

    .card:hover .title{
      text-decoration: underline;
      text-decoration-color: var(--sc-primary-color);
    }

    .card:active {
      box-shadow: var(--sc-shadow-elevation-1dp);
    }

    .nav-card:first-of-type{
margin-top: 4em
    }
    .nav-car:last-of-type{
      margin-bottom: 4em
    }

    .blurb {
      padding: .5rem 1rem;
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 1.5;
    }

    .blurb:empty{
      margin: 0;
      padding: 0;
    }
.blurb + .essay{
  margin-top: 1rem
}
    .card header {
      display: flex;

      justify-content: space-between;
    }

    .header-left {
      padding: 1rem 1rem 0.333rem;
    }

    /* .title:lang(en) {
      font-size: var(--sc-skolar-font-size-static-subtitle);

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

    .subTitle {
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    color: var(--sc-secondary-text-color);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    }
    .shortcut{
display: flex;
justify-content: flex-end;
margin-right: 1rem

}
.shortcut block-link{
  display: inline
}
.shortcut-link{
  display: inline-block;
  background-color: var(--sc-primary-background-color);
padding: 0.333rem 1rem;
border-radius: 8px;
font-style: italic
}
.shortcut:before{
      content: '↳';
    display: inline-block;
    margin-right: 0.333rem;
    line-height: 2;
    font-weight: 800;
    color: var(--sc-disabled-text-color)
}
.shortcut-link:hover{
text-decoration: underline;
      text-decoration-color: var(--sc-primary-color);
      background-color: var(--sc-tertiary-background-color);
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

      margin: 0 0 0 8px;
      

      list-style-type: none;

      color: white;
    }

    nav li a {
      display: inline-block;
      padding: 14px 8px 10px 4px;
    }

    nav li a:hover {
      cursor: pointer;

      border-bottom: 4px solid var(--sc-primary-color-light);
    }

    nav li:last-child {
      font-weight: 700;
      border-bottom: 4px solid var(--sc-primary-color-light);
    }

    nav li:last-child a:hover {
      color: white;
      cursor: default;
      border-bottom: none;
    }

    nav li:last-child a {
      cursor: default;
    }

    nav li:after {
      font-weight: 400;

      margin-left: 8px;

      content: '❭';
      color: white;
    }

    nav li:last-of-type:after {
      content: '';
      margin-left: 0;
    }

    .header-right {
      font-size: var(--sc-skolar-font-size-xxs);
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



    .number:before {
      content: '✅ '
    }

    .essay {

      padding: 0 1rem .5rem 1rem;

      
    }
.essay block-link{
  display: inline
}
    .essay:before{
      content: 'Essay: ';
      font-weight: 800;
    }
    .essay a{
font-family: var(--sc-serif-font);

    }

    .essay a:hover {
      cursor: pointer;
      text-decoration: underline;
      text-decoration-color: var(--sc-primary-color);
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

    .card {
      border-radius: 0px;
      padding-bottom: 8px;
      cursor: pointer;
      margin-top: 0;
      margin-bottom: 1px;
      min-width: 20em;
    }

    .title {
      font-size: var(--sc-skolar-font-size-xl);

    }

  </style>
`;