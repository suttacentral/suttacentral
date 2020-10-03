import { html } from "lit-element";

export const SCPageSelectorStyles = html`
  <style>
    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
    }

    sc-text-page-selector {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    /* Only static pages use transparent backgrounds, other pages use the original backgrounds. */
    .toolbar-header,
    #sc_action_items {
      background-color: var(--sc-primary-color);
      /* background-color: transparent; */
      white-space: nowrap;
      z-index: 99999;
    }

    .headerPrimaryBackgroundColor {
      background-color: var(--sc-primary-color);
    }

    .headerTransparent {
      background-color: transparent;
    }

    .smallScreenPadding {
      padding: 0px;
    }

    #toolbar_title_box {
      width: 1px;
      z-index: -10;
    }

    .headerOpacity {
      opacity: 0;
    }

    #toolbar_title {
      font-family: var(--sc-sans-font);
      color: var(--sc-tertiary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #drawertoggle {
      z-index: 1;
      color: var(--sc-tertiary-text-color);
      margin-right: var(--sc-size-md);
    }

    #to_home_button {
      color: var(--sc-tertiary-text-color);
      z-index: 1;
      padding: 0;
      width: var(--sc-size-lg);
      height: var(--sc-size-lg);
      margin-right: var(--sc-size-sm);
    }

    #header {
      transition: all 200ms !important;
      --app-header-shadow: {
        box-shadow: 0px;
      }
    }

    @media screen and (min-width: 960px) {
      #header.drawer-closed {
        left: 0 !important;
      }

      #header {
        left: var(--app-drawer-width) !important;
      }
    }

    @media screen and (max-width: 600px) {
      #toolbar_title {
        font-size: var(--sc-skolar-font-size-md);
      }
    }

    .hidebutton {
      display: none;
    }

    @media print {
      #header {
        display: none;
      }
    }

    .link-anchor {
      position: absolute;
      width: calc(100% + 20px);
      height: 100%;
    }

    body {
      margin: 0;
      height: 100%;
      font-family: "skolar sans pe";
      font-size: 18px;
      overflow-x: hidden;
      /*When the sidebar expands, don't let the page grow sideways.*/
      background-color: rgb(250, 249, 248);
      color: rgb(34, 33, 32);
      line-height: 1.4;
    }

    /* Icons */
    .icon {
      cursor: pointer;
      width: 32px;
      height: 32px;
      fill: white;
      display: inline-block;
    }

    #titlebar .icon {
      background-color: rgb(206, 132, 0);
    }

    #sc-logo {
      padding: 0 4px 0 8px;
    }

    #closebtn {
      padding: 0 8px 0 0;
    }

    #openbtn {
      padding: 0 8px 0 16px;
    }

    #glass {
      padding: 0 8px 0 16px;
    }

    #threedots {
      padding: 0 16px 0 0;
    }

    /* Sidebar */
    #sidebar {
      height: 100%;
      width: 300px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      /*Ensure that sidebar and topbar remain the same elevation, except when modal sidebar is active on small screens. Also, ensure that the shadow of the sidebar does not show where it butts ou against the topbar. */
      background-color: white;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05), 2px 2px 2px rgba(0, 0, 0, 0.05),
        4px 4px 4px rgba(0, 0, 0, 0.05), 8px 8px 8px rgba(0, 0, 0, 0.05);
      transform: translateX(-300px);
      /* Start with sidebar off the screen. Transitions are applied to thies property. */
    }

    #sidebarHead {
      background-color: rgb(116, 115, 114);
      color: white;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0 0 8px;
    }

    #sidebarLeft {
      display: flex;
    }

    #sidebarTitle {
      font-family: "skolar pe";
      font-variant-caps: small-caps;
      font-size: 22.6px;
    }

    #sidebarBody {
      height: 100%;
    }

    ul {
      margin: 0;
      padding: 48px 36px;
      list-style-type: none;
    }

    li {
      padding: 8px 0;
      margin: 4px 0;
      font-variant-caps: all-small-caps;
      letter-spacing: 0.05em;
      font-weight: 500;
    }

    li b {
      font-weight: 800;
    }

    /* Container for topbar and main content. This container serves two purposes. When the pushy sidebar is activated, it pushes the topbar and main content over. When modal sidebar is activated, it shows a blur. */
    #container {
    }

    /* Topbar (AKA toolbar, AKA app-bar)*/
    #universal-toolbar {
      color: white;
      position: sticky;
      top: 0;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05), 2px 2px 2px rgba(0, 0, 0, 0.05),
        4px 4px 4px rgba(0, 0, 0, 0.05), 8px 8px 8px rgba(0, 0, 0, 0.05);
      z-index: 10;
      /* Ensure main content does not show on animation */
    }

    /* The first layer of the topbar. */
    #titlebar {
      background-color: rgb(206, 132, 0);
      height: 210px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start; /* This makes it easier to change to the Home page layout. Otherwise use center and no padding.*/
      padding-top: 16px;
      box-sizing: border-box;
    }

    #titlebarLeft,
    #titlebarRight,
    #titlebarCenter {
      min-width: 0;
      /*Due to a quirk in CSS, this is required to activate the text-overflow ellipsis on the title.*/
      display: flex;
    }

    #titlebarCenter {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transform: translateY(60px);
    }

    #titlebarRight {
      box-shadow: 0px 0px 16px rgb(206, 132, 0); /* Since I can't get text-overflow: elipsis to work, maybe a shadow will make it less harsh?*/
    }

    #titlebarTitle {
      font-size: 22.6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      /* This only takes effect when the sidebar is closed. I haven't figured out how to apply it when the icons have been transformed.*/
    }

    #titlebarSitetitle {
      font-size: 48px;
      font-family: "skolar pe";
      font-variant-caps: small-caps;
      text-align: center;
      line-height: 0.9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; /* This only takes effect when the sidebar is closed. I haven't figured out how to apply it when the icons have been transformed.*/
    }

    #titlebarSubtitle {
      text-align: center;
      font-style: italic;
      font-size: 22.6px;
    }

    /* Text content. Also boring! */
    main {
      margin: 60px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      padding: 0 16px;
    }

    article {
      max-width: 720px;
      font-family: "skolar pe";
    }
    h1 {
      color: #757575;
      font-family: "skolar pe";
      font-variant-caps: small-caps;
      font-weight: normal;
      text-align: center;
      font-size: 38px;
    }

    /* Transitions. Fun! */
    #universal-toolbar {
      transition: transform 300ms ease-in-out;
    }
    #titlebarLeft {
      transition: transform 300ms ease-in-out;
    }
    #titlebarCenter {
      transition: transform 300ms ease-in-out;
    }
    #titlebarRight {
      transition: transform 300ms ease-in-out;
    }
    #titlebarSubtitle {
      transition: all 300ms ease-in-out;
    }
    #titlebarSitetitle {
      transition: transform 300ms ease-in-out;
    }
    /* Add and remove via js to things that move. It is removed to prevent unwanted animations on zoom or page resize. */
    .transitionTransform {
      will-change: transform;
      transition: transform 200ms ease-in-out;
    }

    /* Most media queries are handled in JS. This ensures that modal sidebar stays above main content at all times.*/
    @media only screen and (max-width: 720px) {
      #sidebar {
        z-index: 20;
      }
      #container {
        transition: opacity 200ms ease-in-out;
      }
    }
  </style>
`;
