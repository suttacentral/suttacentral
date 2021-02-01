import { html } from 'lit-element';


export const suttaplexCss = html`
<style>
 
 article{
  background-color: var(--sc-secondary-background-color);
  }

  details
{
    position: relative;

    box-sizing: border-box;
    margin: 0 0 0 4px;
}

details p, 
details ul
{
    position: absolute;
    z-index: 10;
    
    max-width: 360px;
    margin: 4px 0 0 0;
    padding: 8px 12px;

    color: var(--sc-primary-text-color);
    border: 1px solid var(--sc-border-color);
    border-radius: 8px;
    background-color: var(--sc-tertiary-background-color);
    box-shadow: var(--sc-shadow-elevation-4dp);
}

a.top-menu-button,
#copy-menu > summary{
  height: 34px;
  width: 34px;
  display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
}

.top-menu-button:hover,
#copy-menu > summary:hover{
  background-color: var(--sc-tertiary-background-color);
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.top-menu-button:active,
#copy-menu > summary:active{
  background-color: var(--sc-textual-info-background-color);
  border-radius: 50%;
  transition: background-color 0.2s ease;
}


details ul{
  right: 0px;
  padding: 0px
}

summary
{
    display: flex;

    cursor: pointer;

    outline-color: var(--sc-border-color);

    align-items: baseline;
}

summary::-webkit-details-marker
{
    color: var(--sc-disabled-text-color);
}

#copy-menu > summary{
list-style: none;
}

#copy-menu > summary::-webkit-details-marker {
  display: none;
}

  .suttaplex-share-menu-list {
      background-color: var(--sc-secondary-background-color);
  }

  h1 {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-skolar-font-size-static-subtitle);
        font-weight: 400;
    margin: 0;
  }

  h1.compact {
    font-size: var(--sc-skolar-font-size-xl);
  }

  .hide-element {
    display: none;
  }

  .suttaplex {
    display: block;
    padding: var(--sc-suttaplex-padding);
    margin-bottom: var(--sc-size-md);
    box-shadow: var(--sc-suttaplex-shadow);
    border-radius: var(--sc-size-sm);
  }

    .suttaplex.compact {
    padding: var(--sc-size-sm) var(--sc-size-md);
    border-radius: 2px;
    margin-bottom: 1px;
  }

      .section-details.main-translations {
        border-top: 1px solid var(--sc-border-color);
        margin-top: var(--sc-size-md);
        padding-top: var(--sc-size-sm);
      }

      .compact .section-details.main-translations{
        border-top: none;
        padding-top: 0;
        margin-top: var(--sc-size-sm);
      }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .top-row .compact {
    cursor: pointer;
  }


  
  summary {
    cursor: pointer;
    outline: none;
  }

  .icon {
    fill: var(--sc-disabled-text-color);
  }
 
  .suttaplex-nerdy-row {
  display: inline-flex;
  gap: 1em;
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    color: var(--sc-secondary-text-color);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

    .subTitle {
      font-weight: 800;

      letter-spacing: var(--sc-caps-letter-spacing);

      font-variant-caps: all-small-caps;
    }

 .nerdy-row-element{
  display: inline-flex;
 align-items: center;
 }

  .popuptext {
    overflow: visible;
    display: none;
  }

  .popuptext.show {
     display: unset;
  }

  .volpage-biblio-info, .suttaplex-nerdy-row .popuptext {
    position: absolute;
    z-index: 10;
    
    max-width: 360px;
    margin: 4px 0 0 0;
    padding: 8px 12px;

    font-size: var(--sc-skolar-font-size-s);

    color: var(--sc-primary-text-color);
    border: 1px solid var(--sc-border-color);
    border-radius: 8px;
    background-color: var(--sc-tertiary-background-color);
    box-shadow: var(--sc-shadow-elevation-4dp);

    white-space: normal;
  }

  .suttaplex-details {
    display: inline-block;
    position: inherit
  }

  .blurb {
    margin: var(--sc-size-sm) 0;
    line-height: 1.333
  }

  .primary-accent-icon {
    color: var(--sc-primary-accent-color);
    stroke: var(--sc-primary-accent-color);
  }

  .section-details h3 {
    margin: var(--sc-size-sm) 0;
    color: var(--sc-secondary-text-color);
    display: inline-block;
  }
  
  .blurb, .section-details h3 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
  }
  
  .top-row-icons {
    align-items: center;
    display: flex;
    gap: 0.5em;
  }

  #more_par_menu {
    outline: none;
  }

  ::-webkit-details-marker {
    color: var(--sc-disabled-text-color);
  }
  
  
  sc-suttaplex-tx {
    display: block;
    margin: var(--sc-size-sm) 0;
  }
  
  sc-suttaplex-tx:first-of-type {
    margin-top: 0;
  }

  sc-suttaplex-tx:last-of-type {
    margin-bottom: 0;
  }

  .book{
    width: 16px;
    height: 16px;
    fill: var(--sc-disabled-text-color);
  }
</style>`;


export const suttaplexTxCss = html`
<style>
  a {
    color: inherit;
    text-decoration: inherit;
    position: relative;
    overflow: hidden;
  }

  .tx {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    padding: 0 var(--sc-size-sm);
    margin: 0;
    border-radius: var(--sc-size-sm);
  }

  .tx,
  .tx:hover,
  .tx:active {
    transition: background-color 0.2s ease;
  }

  .tx:hover {
    background-color: var(--sc-primary-color-light-transparent);
  }

    .tx:active {
    background-color: var(--sc-primary-color-light);
  }


  .translation {
    height: 20px;
    width: 20px;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    fill: var(--sc-primary-color);
    border: 2px solid var(--sc-primary-color);
  }

  .tx-details {
    padding: var(--sc-size-sm);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline
  }

  .tx-creator {
    margin-right: var(--sc-size-md);
    font-family: var(--sc-serif-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
  }

  .tx-publication {
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: 400;
  }

</style>`;

export const parallelsListCss = html`
<style>
  .parallels-table {
    border-collapse: separate;
    border-spacing: 0 var(--sc-size-sm);
    margin: 0 auto;
    width: 95%;
  }

  .parallels-root-cell,
  .parallels-parallel-cell {
    border-radius: var(--sc-size-sm);
    background-color: var(--sc-tertiary-background-color);
    transition: background-color 0.2s ease;
  }
  
  .parallels-root-cell:hover,
  .parallels-parallel-cell:hover {
      background-color: var(--sc-primary-color-light-transparent);
      transition: background-color 0.2s ease;
  }

    .parallels-root-cell:active,
  .parallels-parallel-cell:active {
      background-color: var(--sc-primary-color-light);
      transition: background-color 0.2s ease;
  }

  .parallels-parallel-cell {
    width: 100%;
    padding: 0;
  }

  @media screen and (max-width: 600px) {
    .parallels-parallel-cell {
      max-width: 200px;
    }
  }

  .parallels-root-cell {
    text-align: center;
    min-width: 90px;
    padding: 0;
    position: relative; /* Hack for anchor height. */
  }

  .parallels-root-cell a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  .parallels-root-id {
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: 400;
  }

  sc-bouncing-loader {
    margin: var(--sc-size-md) 0;
    left: 50%;
  }

  .parallels-table-body {
    display: block;
    margin-bottom: var(--sc-size-sm);
  }

  .root-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
  }
</style>`;

export const parallelItemCss = html`
<style>
  a {
    color: inherit;
    text-decoration: inherit;
    position: relative;
    display: block;
  }

  .parallel-item-main-info-container {
    width: 100%;
    padding: var(--sc-size-xs) var(--sc-size-sm);
  }

  .parallel-item-title {
    font-family: 'Skolar Sans PE Md', var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: 500;
    word-wrap: normal;
    margin-bottom: var(--sc-size-xs);
  }

  .parallel-item-biblio-info {
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: 400;
    box-shadow: var(--sc-shadow-elevation-4dp);
    border-top: var(--sc-border);
    position: absolute;
    z-index: 50;
    background-color: var(--sc-secondary-background-color);
    padding: 12px;
    margin: 0 var(--sc-size-xl) 0 0;
    white-space: normal;
  }

  ::-webkit-details-marker {
    color: var(--sc-disabled-text-color);
  }

  .parallel-item-nerdy-row {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 1em;
    color: var(--sc-secondary-text-color);
  }

  .parallel-item {
    flex-wrap: wrap;
  }

  .nerdy-row-element{
    display: inline-flex;
    place-items: center

  }
  
  .disabled {
    cursor: default;
    background-color: var(--sc-tertiary-background-color);
  }
  
  summary {
    cursor: pointer;
    outline: none;
    display: inline-flex;
    align-items: center
  }

  .book{
    display: inline-flex;

  }
  .icon{
    fill: var(--sc-disabled-text-color);
    width: 16px;
    height: 16px;

  }

</style>
`;
