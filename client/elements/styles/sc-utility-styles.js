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

      --sc-size-language-icon: 19px;

      --sc-border: 1px solid var(--sc-border-color);

      --margin-md: {
        margin: var(--sc-size-md);
      };

      --vertical-margin-md: {
        margin-top: var(--sc-size-md);
        margin-bottom: var(--sc-size-md);
      };

      --horizontal-margin-md: {
        margin-left: var(--sc-size-md);
        margin-right: var(--sc-size-md);
      };

      --padding-md: {
        padding: var(--sc-size-md);
      };

      --vertical-padding-md: {
        padding-top: var(--sc-size-md);
        padding-bottom: var(--sc-size-md);
      };

      --horizontal-padding-md: {
        padding-left: var(--sc-size-md);
        padding-right: var(--sc-size-md);
      };

      --sc-shadow-elevation-9dp: {
        box-shadow: 0 9px 11px 1px rgba(0, 0, 0, 0.14),
        0 3px 16px 2px rgba(0, 0, 0, 0.12),
        0 6px 7px -3px rgba(0, 0, 0, 0.4);
      };

      --sc-inline-link: {
        color: inherit;
        text-decoration: underline;
        text-decoration-color: var(--sc-primary-color);
        text-decoration-skip-ink: auto;
      };

      --sc-inline-link-hover: {
        color: var(--sc-primary-color);
      };

      --sc-inline-link-visited: {
        text-decoration-color: var(--sc-primary-color-dark);
      };

      --center: {
        position: absolute;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      };

      --sc-separator: {
        background-color: var(--sc-border-color);
        width: 100%;
        overflow: hidden;
        height: 1px;
        margin-top: var(--sc-size-xxs);
        margin-bottom: var(--sc-size-xxs);
      };
    }
  </style>
</custom-style>`;

document.head.appendChild(template.content);
