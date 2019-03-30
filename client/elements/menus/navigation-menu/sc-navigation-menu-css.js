import { html } from '@polymer/lit-element';
import { scrollbarStyle } from '../../styles/sc-scrollbar-style.js';

const litScrollbarStyle = html([scrollbarStyle.innerHTML]);

export const scNavigationMenuCss =  html`
${litScrollbarStyle}

<style>
  .sc-nav {
    user-select: none;
    height: 100%;
    @apply --paper-font-common-base;
  }

  .paper-spinner {
    @apply --center;
    --paper-spinner-color: var(--sc-primary-color);
  }

  .network-error {
    @apply --center;
    @apply --sc-sans-font;
    @apply --sc-skolar-font-size-l;
    color: var(--sc-secondary-text-color);
    text-align: center;
  }

  .network-error-icon {
    width: var(--sc-size-xxl);
    height: var(--sc-size-xxl);
  }

  .nav-list-container {
    height: calc(100% - var(--sc-size-xxl));
  }

  .nav-back-button {
    @apply --sc-skolar-font-size-l;
    background-color: var(--sc-disabled-text-color);
    padding: var(--sc-size-sm);
    display: flex;
    align-items: center;
    font-weight: bold;
    margin: 0;
    z-index: 1;
  }

  .nav-back-button.swap-section {
    height: var(--sc-size-xl);
  }

  .nav-back-title {
    @apply --sc-skolar-font-size-xl;
    color: var(--sc-tertiary-text-color);
    margin-left: var(--sc-size-sm);
    padding-right: var(--sc-size-md);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none;
  }

  .nav-back-title:hover {
    color: var(--sc-primary-color-light);
  }

  .swap-section {
    height: 0;
    opacity: 0;
    transition: opacity .5s, transform 375ms;
  }

  .nav .swap-section {
    transition-duration: 225ms;
  }

  .swap-section.up {
    will-change: transform;
    transform: translateY(-100%);
  }

  .swap-section.right {
    will-change: transform;
    transform: translateX(100%);
  }

  .swap-section.left {
    will-change: transform;
    transform: translateX(-100%);
  }

  .swap-section.active {
    opacity: 1;
    position: relative;
    transform: translate(0, 0);
    width: auto;
  }

  .nav-menu-item {
    list-style-type: none;
    margin: 0 0 var(--sc-size-sm);
    position: relative;
    justify-content: space-between;
    align-items: center;
  }

  .nav-list, .sub-nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .sub-nav-container {
    z-index: 1;
  }

  .nav-link {
    @apply --sc-skolar-font-size-md;
    @apply --sc-all-caps;
    color: var(--sc-primary-text-color);
    display: block;
    font-weight: bold;
    padding: 5px var(--sc-size-md);
    margin: var(--sc-size-xs) 0;
    text-decoration: none;
    transition: background-color 0.35s cubic-bezier(0.35, 0, 0.25, 1);
  }

  .nav-menu-item.selected {
    background: linear-gradient(to right, var(--sc-primary-color) 4px, transparent 4px);
  }

  .yellow-brick:not(.open)::after {
    content: '';
    margin-left: auto;
    width: 30px;
    height: 30px;
    background: var(--sc-primary-accent-color-light);
    border-radius: 20px;
    position: absolute;
    right: 5px;
    top: 1px;
    z-index: -1;
  }

  .yellow-brick:not(.open) > .menu-dropdown-icon {
      color: var(--sc-tertiary-text-color);
  }

  .nav-menu-item.selected > .nav-link {
    color: var(--sc-primary-color);
  }

  .nav-menu-item.selected.open li {
    background: var(--sc-secondary-background-color);
  }

  .menu-dropdown-icon {
    color: var(--sc-disabled-text-color);
    display: inline-block;
    position: absolute;
    right: 0;
    top: -4px;
    transition: .225s ease-out all;
    cursor: pointer;
  }

  .open > .menu-dropdown-icon {
    transform: rotateZ(180deg);
  }

  .iso-code-image {
    fill: var(--sc-disabled-text-color);
    width: var(--sc-size-language-icon);
    height: var(--sc-size-language-icon);
    position: absolute;
    display: inline-block;
    left: var(--sc-size-md);
    top: var(--sc-size-sm);
  }

  .menu-dropdown-icon,
  .nav-back-button {
    --iron-icon: {
      pointer-events: none;
    }
  }

  .nav-secondary, .nav-tertiary {
    list-style-type: none;
    padding-left: var(--sc-size-sm);
    transition: max-height cubic-bezier(0, 1, 0, 1) .3s;
    overflow: hidden;
    will-change: transform;
  }

  .nav-secondary .nav-link,
  .nav-tertiary .nav-link {
    @apply --sc-skolar-font-size-s;
    padding-right: var(--sc-size-lg);
    font-weight: 400;
  }

  .nav-tertiary .nav-link {
    text-transform: none;
    letter-spacing: 0;
    font-weight: 400;
    color: var(--sc-primary-accent-color);
    text-decoration: none;
  }

  .open .nav-secondary,
  .open .nav-tertiary {
    max-height: 9999px;
    transition: max-height cubic-bezier(1, 0, 1, 0) .3s;
  }

  :not(.open) > .nav-secondary,
  :not(.open) > .nav-tertiary {
    max-height: 0 !important;
  }

  #main_navigation {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .nav-link[href=""] {
    color: var(--sc-primary-text-color);
    cursor: default;
  }

  #main_navigation .nav-secondary,
  #main_navigation .nav-tertiary {
    padding-left: 0;
  }

  /* Padding for ISO code icons (19px for the icon + 16px for the icon padding) */
  #main_navigation .nav-tertiary > .nav-menu-item,
  #sub_navigation[data-menuid="dharmapadas"] .top-menu-item {
    padding-left: 35px;
  }

  #main_navigation .nav-link {
    padding-left: calc(35px + var(--sc-size-md));
  }

  #main_navigation .nav-tertiary .nav-link {
    padding: 5px var(--sc-size-md);
  }

  #main_navigation .nav-tertiary .nav-link.link-text-ellipsis {
    padding-right: calc(var(--sc-size-sm) + var(--sc-size-lg));
  }

  #main_navigation:not(.active)::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  #back_arrow {
    cursor: pointer;
    min-width: 40px;
    color: var(--sc-tertiary-text-color);
  }

  #sub_navigation_header {
    display: flex;
    align-items: center;
  }

  #sub_navigation {
    height: calc(100% - 65px);
    width: 100%;
  }

  #sub_navigation .sub-nav {
    height: 100%;
    overflow-y: auto;
  }

  .sub-nav {
    padding-left: 0;
  }

  .sub-nav .nav-link {
    font-weight: 700;
  }

  .sub-nav-child .nav-link {
    font-weight: 400;
  }

  .sub-nav .sub-nav-child {
    padding-left: 0;
  }

  #main_menu_container {
    transform: translateY(-100%);
    height: 100%;
  }

  .top-menu-item:first-of-type {
    margin-top: var(--sc-size-md);
  }

  .link-text-ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  [data-iso]::before {
    content: attr(data-iso);
      background-color:var(--sc-disabled-text-color);
      color: var(--sc-tertiary-text-color);
      font-weight: 800;
      width: var(--sc-size-md-larger);
      height: 20px;
      line-height: 20px;
      text-transform: uppercase;
      display: inline-block;
      text-align: center;
      font-size:11px;
      position:absolute;
      margin-top:1px;
      margin-left: -40px;
      --notchSize: 4px;
      clip-path: 
      polygon(
        0% var(--notchSize), 
        var(--notchSize) 0%, 
        calc(100% - var(--notchSize)) 0%, 
        100% var(--notchSize), 
        100% calc(100% - var(--notchSize)), 
        calc(100% - var(--notchSize)) 100%, 
        var(--notchSize) 100%, 
        0% calc(100% - var(--notchSize))
      );
  }  
</style>`;

