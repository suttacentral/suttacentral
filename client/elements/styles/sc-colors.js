import '@polymer/polymer/lib/elements/custom-style.js';

const template = document.createElement('template');

template.innerHTML = `
<custom-style>
  <style>
    html {
      /* Text */
      --sc-primary-text-color: #212121;
      --sc-secondary-text-color: #737373;
      --sc-tertiary-text-color: #fff;
      --sc-disabled-text-color: #9e9e9e;
      --sc-disabled-text-color-opaque: rgba(158, 158, 158, .3);

      /* Main colors */
      --sc-primary-color: #ce8400;
      --sc-primary-color-light: #ffcb61;
      --sc-primary-color-light-transparent: rgba(255, 203, 97, 0.3);
      --sc-primary-color-medium: #f6b735;
      --sc-primary-color-dark: #b37800;
      --sc-primary-color-darkest: rgba(138, 93, 0, 1);
      --sc-primary-accent-color: #43a047;
      --sc-primary-accent-color-light: #52c756;
      --sc-primary-accent-color-dark: #428342;
      --sc-secondary-accent-color: #9c27b0;

      /* Background colors */
      --sc-primary-background-color: rgb(253, 251, 249);
      --sc-secondary-background-color: rgb(255, 253, 251);
      --sc-tertiary-background-color: rgb(243, 243, 243);

      /* Other colors */
      --sc-paper-tooltip-color: #616161;
      --sc-paper-tooltip-text-color: #fff;
      --sc-border-color: rgba(0, 0, 0, 0.12);
      --sc-textual-info-background-color: #e2e2e2;
      --sc-toast-error-color: #f44336;
      --sc-toast-success-color: #43a047;
      --sc-pie-chart-bg-color: #e1f7d0;
      --sc-pie-chart-fill-color: #c1eda1;
    }
  </style>
</custom-style>`;

document.head.appendChild(template.content);
