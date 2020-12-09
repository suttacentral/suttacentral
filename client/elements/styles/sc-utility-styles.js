import '@polymer/polymer/lib/elements/custom-style.js';

const template = document.createElement('template');

template.innerHTML = `
<custom-style>
  <style>
    html {
      --sc-screen-sm: 600px;
      --sc-screen-md: 840px;
      --sc-screen-l: 960px;
      --sc-screen-xl: 1280px;

      --sc-size-xxs: 2px;
      --sc-size-xs: 4px;
      --sc-size-sm: 8px;
      --sc-size-md: 16px;
      --sc-size-md-larger: 24px;
      --sc-size-lg: 32px;
      --sc-size-xl: 48px;
      --sc-size-xxl: 64px;

      --sc-container-margin: 3vw;

      --sc-size-language-icon: 19px;

      --sc-border: 1px solid var(--sc-border-color);

      --sc-umbra-opacity: rgba(0,0,0,.2);
      --sc-penumbra-opacity: rgba(0,0,0,.14);
      --sc-ambient-opacity: rgba(0,0,0,.12);


--sc-shadow-elevation-0dp: 0px 0px 0px 0px var(--sc-umbra-opacity), 0px 0px 0px 0px var(--sc-penumbra-opacity), 0px 0px 0px 0px var(--sc-ambient-opacity);
    
--sc-shadow-elevation-1dp: 0px 2px 1px -1px var(--sc-umbra-opacity), 0px 1px 1px 0px var(--sc-penumbra-opacity), 0px 1px 3px 0px var(--sc-ambient-opacity);
    
--sc-shadow-elevation-2dp: 0px 3px 1px -2px var(--sc-umbra-opacity), 0px 2px 2px 0px var(--sc-penumbra-opacity), 0px 1px 5px 0px var(--sc-ambient-opacity);
    
--sc-shadow-elevation-4dp: 0px 2px 4px -1px var(--sc-umbra-opacity), 0px 4px 5px 0px var(--sc-penumbra-opacity), 0px 1px 10px 0px var(--sc-ambient-opacity);
    
--sc-shadow-elevation-8dp: 0px 5px 5px -3px var(--sc-umbra-opacity), 0px 8px 10px 1px var(--sc-penumbra-opacity), 0px 3px 14px 2px var(--sc-ambient-opacity);
    
--sc-shadow-elevation-12dp: 0px 7px 8px -4px var(--sc-umbra-opacity), 0px 12px 17px 2px var(--sc-penumbra-opacity), 0px 5px 22px 4px var(--sc-ambient-opacity);
    
--sc-shadow-elevation-16dp: 0px 8px 10px -5px var(--sc-umbra-opacity), 0px 16px 24px 2px var(--sc-penumbra-opacity), 0px 6px 30px 5px var(--sc-ambient-opacity);
    
--sc-shadow-elevation-24dp: 0px 11px 15px -7px var(--sc-umbra-opacity), 0px 24px 38px 3px var(--sc-penumbra-opacity), 0px 9px 46px 8px var(--sc-ambient-opacity);

--sc-suttaplex-shadow: var(--sc-shadow-elevation-1dp);
    }
  </style>
</custom-style>`;

document.head.appendChild(template.content);
