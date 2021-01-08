import { html, css } from 'lit-element';

export const commonStyles = css`
  main {
    display: flex;
    justify-content: center;
  }

  p {
    -webkit-hyphens: auto;
    -webkit-hyphenate-limit-before: 3;
    -webkit-hyphenate-limit-after: 3;
    -webkit-hyphenate-limit-chars: 6 3 3;
    -webkit-hyphenate-limit-lines: 2;
    -webkit-hyphenate-limit-last: always;
    -webkit-hyphenate-limit-zone: 8%;
    -moz-hyphens: auto;
    -moz-hyphenate-limit-chars: 6 3 3;
    -moz-hyphenate-limit-lines: 2;
    -moz-hyphenate-limit-last: always;
    -moz-hyphenate-limit-zone: 8%;
    -ms-hyphens: auto;
    -ms-hyphenate-limit-chars: 6 3 3;
    -ms-hyphenate-limit-lines: 2;
    -ms-hyphenate-limit-last: always;
    -ms-hyphenate-limit-zone: 8%;
    hyphens: auto;
    hyphenate-limit-chars: 6 3 3;
    hyphenate-limit-lines: 2;
    hyphenate-limit-last: always;
    hyphenate-limit-zone: 8%;
  }
`;

export const paliScriptsStyles = css`
  .phagspatib-script {
    font-family: 'BabelStone PhagsPa TibA' !important;
    writing-mode: vertical-lr;
    line-height: 1.8em;
    font-size: 150%;
  }

  .phagspaseal-script {
    font-family: 'BabelStone PhagsPa Seal' !important;
    writing-mode: vertical-lr;
    line-height: 1.8em;
  }

  .mongolian-script {
    font-family: 'MQG8F02' !important;
    writing-mode: vertical-lr;
    line-height: 1.8em;
    font-size: 135%;
  }

  .soyombo-script {
    font-family: 'Noto Sans Soyombo' !important;
    font-size: 130%;
  }

  .russiancyrillic-script {
    font-family: 'Noto Sans Regular' !important;
  }

  .oriyavedic-script {
    font-family: 'Lohit Oriya Vedic' !important;
  }

  .bengalivedic-script {
    font-family: 'Noto Sans Bengali Vedic' !important;
  }

  .gujarativedic-script {
    font-family: 'Noto Sans Gujarati Vedic' !important;
  }

  .gurmukhivedic-script {
    font-family: 'Noto Sans Gurmukhi Vedic' !important;
  }

  .ariyaka-script {
    font-family: 'Ariyaka' !important;
    line-height: 1.5em;
  }

  .tamilold-script {
    font-family: 'Mukta Malar Regular' !important;
    font-feature-settings: 'ss04', 'kern';
  }
  .tamil-script {
    font-family: 'Noto Sans Tamil' !important;
  }
  .tibetandbumed-script {
    font-family: 'Tibetan Dbu Med' !important;
    line-height: 2.3em;
  }
  .tibetan-script {
    font-family: 'Noto Sans Tibetan' !important;
    font-size: 110%;
  }
  .buhid-script {
    font-family: 'Noto Sans Buhid' !important;
  }
  .rejang-script {
    font-family: 'Noto Sans Rejang' !important;
  }
  .hanunoo-script {
    font-family: 'Noto Sans Hanunoo' !important;
  }
  .saurashtra-script {
    font-family: 'Noto Sans Saurashtra' !important;
  }
  .sorasompeng-script {
    font-family: 'Noto Sans SoraSompeng' !important;
  }
  .khamtishan-script {
    font-family: 'Khamti Regular' !important;
  }
  .warangciti-script {
    font-family: 'Noto Sans WarangCiti' !important;
  }
  .balinese-script {
    font-family: 'Vimala' !important;
  }
  .kannada-script {
    font-family: 'Noto Sans Kannada' !important;
  }
  .javanese-script {
    font-family: 'Noto Sans Javanese', 'Javanese Text' !important;
  }
  .avestan-script {
    font-family: 'Noto Sans Avestan' !important;
    direction: rtl;
  }
  .buginese-script {
    font-family: 'Noto Sans Buginese' !important;
  }
  .sinhala-script {
    font-family: 'Noto Sans Sinhala' !important;
  }
  .dogra-script {
    font-family: 'Noto Serif Dogra' !important;
  }
  .tagalog-script {
    font-family: 'Noto Sans Tagalog' !important;
  }
  .tagbanwa-script {
    font-family: 'Noto Sans Tagbanwa' !important;
  }
  .sundanese-script {
    font-family: 'Noto Sans Sundanese' !important;
  }
  .cham-script {
    font-family: 'Noto Sans Cham' !important;
  }

  .ipa-script {
    font-family: 'Dejavu Sans' !important;
    line-height: 1.5em;
  }

  .gunjalagondi-script {
    font-family: 'Noto Sans GunjalaGondi' !important;
  }

  .masaramgondi-script {
    font-family: 'Noto Sans MasaramGondi' !important;
  }

  .malayalam-script {
    font-family: 'Noto Sans Malayalam' !important;
  }
  .malayalamold-script {
    font-family: 'Meera' !important;
    font-size: 130%;
    line-height: 125%;
  }
  .chakma-script {
    font-family: 'Noto Sans ChakmaPali' !important;
  }
  .lepcha-script {
    font-family: 'Noto Sans Lepcha' !important;
  }
  .limbu-script {
    font-family: 'Noto Sans Limbu' !important;
  }
  .batakkaro-script {
    font-family: 'Noto Sans Batak' !important;
  }
  .batakmanda-script {
    font-family: 'Noto Sans Batak' !important;
  }
  .batakpakpak-script {
    font-family: 'Noto Sans Batak' !important;
  }
  .bataksima-script {
    font-family: 'Noto Sans Batak' !important;
  }
  .bataktoba-script {
    font-family: 'Noto Sans Batak' !important;
  }
  .telugu-script {
    font-family: 'Noto Sans Telugu' !important;
  }
  .teluguzha-script {
    font-family: 'Aazhvaar Telugu' !important;
  }
  .khmer-script {
    font-family: 'Noto Sans Khmer' !important;
  }
  .meeteimayek-script {
    font-family: 'Noto Sans Meetei Mayek' !important;
  }
  .tolongsiki-script {
    font-family: 'kellytolong' !important;
  }
  .tamilbrahmi-script {
    font-family: 'Adinatha Tamil Brahmi' !important;
  }
  .phagspa-script {
    font-family: 'Microsoft PhagsPa', 'Noto Sans PhagsPa' !important;
    writing-mode: vertical-lr;
    line-height: 1.8em;
  }
  .urdu-script {
    font-family: 'Noto Sans Nastaliq Urdu' !important;
    direction: rtl;
  }
  .kaithi-script {
    font-family: 'Noto Sans Kaithi' !important;
  }
  .gujarati-script {
    font-family: 'Noto Serif Gujarati' !important;
  }
  .modi-script {
    font-family: 'Noto Sans Modi' !important;
  }
  .devanagari-script {
    font-family: 'Noto Sans Devanagari' !important;
  }
  .multani-script {
    font-family: 'Noto Sans Multani' !important;
  }
  .hanifirohingya-script {
    font-family: 'Noto Sans HanifiRohingya' !important;
    direction: rtl;
  }
  .ahom-script {
    font-family: 'Noto Serif Ahom' !important;
  }
  .tirhuta-script {
    font-family: 'MithilaUni' !important;
  }
  .oldpersian-script {
    font-family: 'Noto Sans OldPersian' !important;
  }
  .takri-script {
    font-family: 'Noto Sans Takri' !important;
  }
  .taitham-script {
    font-family: 'PaliTilok' !important;
    font-size: 150%;
  }
  .khomthai-script {
    font-family: 'Patimokkha' !important;
    font-size: 150%;
  }
  .taithamlao-script {
    font-family: 'Lamphun' !important;
    font-size: 150%;
  }
  .laotham-script {
    font-family: 'Lamphun' !important;
    font-size: 150%;
  }
  .sylotinagri-script {
    font-family: 'Noto Sans SylotiNagri' !important;
  }
  .granthagrantamil-script {
    font-family: 'e-Grantamil' !important;
    font-size: 110%;
    line-height: 1.5em;
  }
  .tamilgrantha-script {
    font-family: 'e-Grantamil' !important;
    font-size: 110%;
    line-height: 1.5em;
  }
  .tamilextended-script {
    font-family: 'Agastya Extended Tamil' !important;
    line-height: 1.6em;
  }
  .tamilextendedserif-script {
    font-family: 'Agastya Serif' !important;
    line-height: 1.6em;
  }
  .siddhammukta-script {
    font-size: 120%;
    font-family: Muktamsiddham;
  }
  .siddham-script {
    font-family: 'Noto Sans Siddham' !important;
  }
  .grantha-script {
    font-family: 'Noto Sans Grantha2' !important;
    line-height: 2em;
    font-feature-settings: 'ss04', 'ss06';
  }
  .granthaserif-script {
    font-family: 'Noto Serif Grantha' !important;
    font-feature-settings: 'ss04', 'ss06';
    line-height: 2em;
  }
  .granthalig-script {
    font-family: 'Noto Sans Grantha2' !important;
    font-feature-settings: 'ss04', 'ss06', 'ss03';
    line-height: 2em;
  }
  .granthaseriflig-script {
    font-family: 'Noto Serif Grantha' !important;
    font-feature-settings: 'ss04', 'ss06', 'ss03';
    line-height: 2em;
  }
  .kharoshthi-script {
    font-family: 'Segoe UI Historic', 'Noto Sans Kharoshthi' !important;
    direction: rtl;
  }
  .thaana-script {
    direction: rtl;
  }
  .zanabazarsquare-script {
    font-family: 'Noto Sans Zanabazar Square' !important;
    font-feature-settings: 'ss01';
    line-height: 3em;
  }
  .newa-script {
    font-family: 'Noto Sans Newa' !important;
  }
  .sharada-script {
    font-family: 'Noto Sans Sharada' !important;
  }
  .thainative-script {
    font-family: 'Kaccayana Thai' !important;
  }
  .mahajani-script {
    font-family: 'Noto Sans Mahajani' !important;
  }
  .multani-script {
    font-family: 'Noto Sans Multani' !important;
  }
  .bhaiksuki-script {
    font-family: 'Noto Sans Bhaiksuki' !important;
  }
  .khojki-script {
    font-family: 'Noto Sans Khojki' !important;
  }
  .khudawadi-script {
    font-family: 'Noto Sans Khudawadi' !important;
  }
  .granthapandya-script {
    font-family: 'e-Pandya' !important;
  }
  .vatteluttu-script {
    font-family: 'e-Vatteluttu' !important;
  }
  .brahmi-script {
    font-family: 'Segoe UI Historic', 'Noto Sans Brahmi' !important;
  }
  .siddhamap-script {
    font-family: 'ApDevaSiddham' !important;
  }
  .limbudeva-script {
    font-family: 'AnnaPurna' !important;
  }
  .laopali-script {
    font-family: 'Lao Pali' !important;
  }
  .nepaldevafont-script {
    font-family: 'Nepal2' !important;
  }
  .santali-script {
    font-family: 'Noto Sans Ol Chiki' !important;
  }
  .ranjana-script {
    font-family: 'RanjanaUnicode' !important;
  }
  .ranjanalantsa-script {
    font-family: 'JMYZK--LZT Lantsa' !important;
  }
  .ranjanawartu-script {
    font-family: 'JMYZK--WDT Wartu' !important;
  }
  .taikuen-script {
    font-family: 'A Tai Tham KH New' !important;
  }
  .khuentham-script {
    font-family: 'A Tai Tham KH New' !important;
  }
  .luetham-script {
    font-family: 'Pali TaiLue' !important;
  }
  .wancho-script {
    font-family: 'Noto Sans Wancho' !important;
  }
  .mro-script {
    font-family: 'Noto Sans Mro' !important;
  }
  .marchen-script {
    font-family: 'Noto Sans Marchen' !important;
    line-height: 2.5em;
  }
`;

export const plainStyles = html`
  <style>
    article {
      max-width: 720px;
    }

    .root {
      display: none;
    }

    /* Set styles for tooltip marker. First we hide the actual content. These settings ensure the beginning, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 6px 0 0;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;

export const plainPaliStyles = html`
  <style>
    section,
    article {
      max-width: 720px;
    }

    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 6px 0 0;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }

    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;

export const plainPlusStyles = html`
  <style>
    .root {
      display: none;
    }

    /* Let min width be handled by media queries, max width according to the nested grid width.*/
    .segment {
      display: grid;

      grid-template-columns: 100px minmax(0, auto);
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;
    }

    .translation {
      grid-column: 2;
    }

    .translation {
      position: relative;

      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment {
      position: absolute;

      padding: var(--sc-size-sm) var(--sc-size-md);

      box-shadow: var(--sc-shadow-elevation-1dp);

      grid-column: 2;
      grid-row: 1;
    }

    /* remove <br> tags to avoid unsightly spaces in verses. */
    br {
      content: '';
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        position: relative;

        display: table;

        margin-top: var(--sc-size-sm);
      }
    }
  </style>
`;

export const sideBySideStyles = html`
  <style>
    .segment {
      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(240px, 720px);
      grid-column-gap: var(--sc-size-lg);
    }

    .translation {
      grid-column: 1;
    }

    .root {
      grid-column: 2;
    }

    br {
      content: '';
    }

    /* Center the tooltip in the respective column */
    .translation,
    .root {
      position: relative;
    }

    /* Set styles for tooltip marker. First we hide the actual content of the .comment tag. These settings ensure the beginning of .comment, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 6px 0 0;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .translation,
      .root {
        position: relative;

        display: block;
      }

      .root .text {
        color: var(--sc-secondary-text-color);
      }
    }
  </style>
`;

export const sideBySidePlusStyles = html`
  <style>
    .segment {
      position: relative;

      display: grid;

      grid-template-columns: 100px minmax(0, auto) minmax(0, auto);
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;
    }

    .translation {
      grid-column: 2;
    }

    .root {
      grid-column: 3;
    }

    .translation,
    .root {
      position: relative;

      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 300px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment,
    .variant {
      position: absolute;

      padding: var(--sc-size-sm) var(--sc-size-md);

      box-shadow: var(--sc-shadow-elevation-1dp);

      grid-column: 2;
      grid-row: 1;
    }

    br {
      content: '';
    }

    blockquote {
      margin: 0;
    }

    @media only screen and (max-width: 1280px) {
      .translation,
      .root,
      .variant,
      .comment {
        position: relative;

        display: table;

        margin-top: var(--sc-size-sm);
      }

      .segment {
        grid-template-columns: minmax(240px, 720px) minmax(240px, 720px);
      }

      .reference {
        grid-column: 1 / span 2;
      }

      .translation {
        grid-column: 1;
      }

      .root {
        grid-column: 2;
      }
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        position: relative;

        display: table;

        margin-top: var(--sc-size-sm);
      }

      .root .text {
        color: var(--sc-secondary-text-color);
      }
    }
  </style>
`;

export const lineByLineStyles = html`
  <style>
    .segment {
      display: grid;

      grid-template-columns: minmax(200px, 720px);
    }

    .reference {
      display: none;
    }

    .translation {
      grid-column: 1;
    }

    .root {
      grid-column: 1;
    }

    .root .text {
      color: var(--sc-secondary-text-color);
    }

    br {
      content: '';
    }

    .comment,
    .variant {
      overflow: hidden;

      width: 1ex;
      height: 1em;
      padding: 0 6px 0 0;

      white-space: nowrap;

      border: none;
      background-color: inherit;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;

export const lineByLinePlusStyles = html`
  <style>
    .segment {
      display: grid;

      grid-template-columns: 100px minmax(0, auto);
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;
    }

    .translation {
      grid-column: 2;
    }

    .root {
      grid-column: 2;
    }

    .root .text {
      color: var(--sc-secondary-text-color);
    }

    .translation,
    .root {
      position: relative;

      display: grid;

      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
    }

    .text {
      grid-column: 1;
    }

    .comment,
    .variant {
      position: absolute;

      padding: var(--sc-size-sm) var(--sc-size-md);

      box-shadow: var(--sc-shadow-elevation-1dp);

      grid-column: 2;
      grid-row: 1;
    }

    br {
      content: '';
    }

    blockquote {
      margin: 0;
    }

    blockquote .text {
      margin-left: 2vw;
    }

    @media only screen and (max-width: 840px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        position: relative;

        display: table;

        margin-top: var(--sc-size-sm);
      }
    }
  </style>
`;

export const hideReferenceStyles = html`
  <style>
    .reference {
      display: none;
    }
  </style>
`;

export const hidePTSReferenceStyles = html`
  <style>
    .reference {
      display: inherit;
    }

    a.pts {
      display: none;
    }

    a.sc {
      display: inherit;
    }
  </style>
`;

export const showAllReferenceStyles = html`
  <style>
    .reference {
      display: inherit;
    }
  </style>
`;

export const hideAsterisk = html`
  <style>
    .comment,
    .variant {
      display: none;
    }

    .comment:before,
    .variant:before {
      content: none;
    }
  </style>
`;

export const showAsterisk = html`
  <style>
    .comment:before,
    .variant:before {
      line-height: 1;

      content: '*';
      vertical-align: super;
    }

    .comment:before {
      color: var(--sc-primary-accent-color);
    }

    .variant:before {
      color: var(--sc-secondary-accent-color);
    }
  </style>
`;
