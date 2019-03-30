import { html } from '@polymer/lit-element';

export const languageBaseMenuCss = html`
<style>
  :host {
    --primary-color: var(--sc-primary-color);
    --paper-menu-button-content: {
      display: block;
    };
  }

  .language-menu-dropdown {
    @apply --sc-skolar-font-size-md;
    background-color: transparent;
    --paper-input-container-focus-color: var(--sc-primary-accent-color);
    --paper-dropdown-menu-icon: {
      color: var(--sc-disabled-text-color);
    };
    --paper-dropdown-menu-input: {
      --paper-input-container-input-color: var(--sc-primary-text-color);
      --paper-input-container-color: var(--sc-secondary-text-color);
    };
    --paper-menu-button-dropdown: {
      @apply --sc-shadow-elevation-9dp;
      width: 180px;
      background-color: var(--sc-secondary-background-color);
    };
  }

  .language-menu-list {
    background-color: var(--sc-secondary-background-color);
  }
  
  .language-menu-paper-item {
    @apply --sc-skolar-font-size-md;
    color: var(--sc-primary-text-color); 
    /*19px for the icon, 16px for the margin */
    --paper-item-icon-width: calc(var(--sc-size-language-icon) + var(--sc-size-md));
  }

  .language-menu-paper-item:hover {
    background-color: var(--sc-tertiary-background-color);
    cursor: pointer;
  }

  .language-name {
    padding-top: var(--sc-size-xxs);        
  }

  .language-menu-paper-item::after {
    content: attr(id);
    background-color:var(--sc-disabled-text-color);
    color: var(--sc-tertiary-text-color);
    font-weight: 800;
    width: var(--sc-size-md-larger);        
    height: 20px;
    line-height: 20px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    display: inline-block;
    text-align: center;
    font-size:14px;
    position:absolute;
    margin-top:1px;                
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

  #jpn::before, #sld::before, #kln::before{
    letter-spacing: 0;
    font-size: 12px
  }    
</style>`;
