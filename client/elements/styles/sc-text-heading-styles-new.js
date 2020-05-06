import { html } from 'lit-element';

export const textHeadingStylesNew = html`
<style>
  [lang="he"] header h1, article[lang="he"] h2, article[lang="he"] h3 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
  }

  [lang="fa"] header h1, [lang="ar"] header h1, 
  [lang="hi"] header h1, [lang="mr"] header h1, 
  [lang="my"] header h1, [lang="si"] header h1,
  [lang="ta"] header h1, [lang="th"] header h1,
  [lang="xct"] header h1, [lang="ev"] header h1,
  [lang="kln"] header h1, [lang="au"] header h1,
  [lang="bn"] header h1 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-h1-md);
    line-height: 48px;
  }

  [lang="vu"] header h1 {
    font-family: inherit;
    font-size: var(--sc-tall-font-size-h1-md);
    line-height: 48px;
  }

  [lang="zh"] header h1, [lang="lzh"] header h1, 
  [lang="ko"] header h1, [lang="jpn"] header h1 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-dense-font-size-h1-md);
    line-height: 48px;
  }

  [lang="vi"] header h1 {
    font-size: var(--sc-tall-font-size-h1-md);
    line-height: 48px;
  }

  article[lang="fa"] h2, article[lang="ar"] h2, 
  article[lang="hi"] h2, article[lang="mr"] h2, 
  article[lang="my"] h2, article[lang="si"] h2,
  article[lang="ta"] h2, article[lang="th"] h2,
  article[lang="xct"] h2, article[lang="ev"] h2,
  article[lang="kln"] h2, article[lang="vu"] h2,
  article[lang="bn"] h2 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-static-subtitle);
    line-height: 34px;
  }

  article[lang="zh"] h2, article[lang="lzh"] h2, 
  article[lang="ko"] h2, article[lang="jpn"] h2 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-dense-font-size-static-subtitle);
    line-height: 34px;
  }

  article[lang="vi"] h2 {
    font-size: var(--sc-tall-font-size-static-subtitle);
    line-height: 34px;
  }

  article[lang="fa"] h3, article[lang="ar"] h3, 
  article[lang="hi"] h3, article[lang="mr"] h3, 
  article[lang="my"] h3, article[lang="si"] h3,
  article[lang="ta"] h3, article[lang="th"] h3,
  article[lang="xct"] h3, article[lang="ev"] h3,
  article[lang="kln"] h3, article[lang="vu"] h3,
  article[lang="bn"] h3 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-xl);
    line-height: 30px;
  }

  article[lang="zh"] h3, article[lang="lzh"] h3, 
  article[lang="ko"] h3, article[lang="jpn"] h3 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-dense-font-size-xl);
    line-height: 30px;
  }

  article[lang="vi"] h3 {
    font-size: var(--sc-tall-font-size-xl);
    line-height: 30px;
  }

  article[lang="fa"] h4, article[lang="ar"] h4, 
  article[lang="hi"] h4, article[lang="mr"] h4, 
  article[lang="my"] h4, article[lang="si"] h4,
  article[lang="ta"] h4, article[lang="th"] h4,
  article[lang="xct"] h4, article[lang="ev"] h4,
  article[lang="bn"] h4 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-l);
  }

  article[lang="zh"] h4, article[lang="lzh"] h4, 
  article[lang="ko"] h4, article[lang="jpn"] h4 {
    font-family: inherit;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-dense-font-size-l);
  }

  article[lang="vi"] h4 {
    font-size: var(--sc-tall-font-size-l);
  }

  article[lang="vi"] h5, article[lang="vi"] h6 {
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  h1 [lang="pli-Sinh"], h2 [lang="pli-Sinh"],
  h3 [lang="pli-Sinh"], h4 [lang="pli-Sinh"],
  .sinhala-script h1 .word, .sinhala-script h2 .word,
  .sinhala-script h3 .word, .sinhala-script h4 .word {
    font-family: var(--sc-sinhala-serif-font);
  }

  h1 [lang="pli-Deva"], h2 [lang="pli-Deva"],
  h3 [lang="pli-Deva"], h4 [lang="pli-Deva"],
  .devanagari-script h1 .word, .devanagari-script h2 .word,
  .devanagari-script h3 .word, .devanagari-script h4 .word {
    font-family: var(--sc-devanagari-serif-font);
  }

  h1 [lang="pli-Thai"], h2 [lang="pli-Thai"],
  h3 [lang="pli-Thai"], h4 [lang="pli-Thai"],
  .thai-script h1 .word, .thai-script h2 .word,
  .thai-script h3 .word, .thai-script h4 .word {
    font-family: var(--sc-thai-serif-font);
  }

  h1 [lang="pli-Mymr"], h2 [lang="pli-Mymr"],
  h3 [lang="pli-Mymr"], h4 [lang="pli-Mymr"],
  .myanmar-script h1 .word, .myanmar-script h2 .word,
  .myanmar-script h3 .word, .myanmar-script h4 .word {
    font-family: var(--sc-myanmar-serif-font);
  }

  h1 [lang="pli-Sinh"], .sinhala-script h1 .word,
  h1 [lang="pli-Deva"], .devanagari-script h1 .word,
  h1 [lang="pli-Thai"], .thai-script h1 .word,
  h1 [lang="pli-Mymr"], .myanmar-script h1 .word {
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-h1-md);
    line-height: 48px;
  }

  h2 [lang="pli-Sinh"], .sinhala-script h2 .word,
  h2 [lang="pli-Deva"], .devanagari-script h2 .word,
  h2 [lang="pli-Thai"], .thai-script h2 .word,
  h2 [lang="pli-Mymr"], .myanmar-script h2 .word {
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-static-subtitle);
    line-height: 34px;
  }

  h3 [lang="pli-Sinh"], .sinhala-script h3 .word,
  h3 [lang="pli-Deva"], .devanagari-script h3 .word,
  h3 [lang="pli-Thai"], .thai-script h3 .word,
  h3 [lang="pli-Mymr"], .myanmar-script h3 .word {
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-xl);
    line-height: 30px;
  }

  h4 [lang="pli-Sinh"], .sinhala-script h4 .word,
  h4 [lang="pli-Deva"], .devanagari-script h4 .word,
  h4 [lang="pli-Thai"], .thai-script h4 .word,
  h4 [lang="pli-Mymr"], .myanmar-script h4 .word {
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-l);
  }

  h5 [lang="pli-Sinh"], .sinhala-script h5 .word,
  h5 [lang="pli-Deva"], .devanagari-script h5 .word,
  h5 [lang="pli-Thai"], .thai-script h5 .word,
  h5 [lang="pli-Mymr"], .myanmar-script h5 .word, 
  h6 [lang="pli-Sinh"], .sinhala-script h6 .word,
  h6 [lang="pli-Deva"], .devanagari-script h6 .word,
  h6 [lang="pli-Thai"], .thai-script h6 .word,
  h6 [lang="pli-Mymr"], .myanmar-script h6 .word {
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-weight: 700;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  header h1, article h2, article h3, article h4, article h5, article h6, header p, .subheading, header ul {
    text-align: center;
    font-weight: normal;
    font-style: normal;
  }

  h1, h1 a, h2, h2 a, h3, h3 a, h4, h4 a, h5, h5 a, h6, h6 a, header ul {
    color: var(--sc-secondary-text-color);
  }

  /* This is the defaults for texts using a skolar font */

  header h1, article h2, article h3, article h4, article h5, article h6 {
    font-family: var(--sc-serif-font);
    font-variant-caps: small-caps;
    letter-spacing: var(--sc-caps-letter-spacing);
    white-space: initial;
  }

  h1 {
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
  }

  h2 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-static-subtitle);
    font-weight: 400;
    line-height: 32px;
  }

  h3 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-xl);
    font-weight: 400;
    line-height: 28px;
  }

  h4 {
    font-family: var(--sc-sans-font);
    font-weight: 400;
    line-height: 24px;
    font-size: var(--sc-skolar-font-size-l);
  }

  h5 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 24px;
  }

  h6 {
    text-align: left;
    font-variant-caps: all-small-caps;
    letter-spacing: var(--sc-caps-letter-spacing);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 24px;
  }

  .draft-notice {
    background-color: var(--sc-secondary-background-color);
    padding: var(--sc-size-md);
    display: table;
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    margin: var(--sc-size-md) auto 0;
    border-radius: var(--sc-size-xxs);
    box-shadow: var(--sc-shadow-elevation-2dp);
    font-feature-settings: initial;
    letter-spacing: normal;
    line-height: initial;
    font-style: italic;
  }

  #segmented_text_content.line-by-line h1 [lang="en"]:after {
    margin-bottom: var(--sc-size-md-larger);
  }

  header ul .latin {
    font-family: var(--sc-noto-sans-font);
  }

  ul + h1 {
    margin-top: 12px;
  }

  header ul.subheading {
    font-family: var(--sc-serif-font);
    font-style: italic;
    text-transform: none;
    font-feature-settings: normal
  }

  [lang="th"] header p.subheading,
  [lang="lzh"] header p.subheading {
    font-family: inherit;
    font-style: inherit;
  }

  header .collection,
  header .division,
  header .subdivision,
  header .subsubdivision,
  header .vagga,
  header .pannasa,
  header .nipata,
  header .collection sc-seg,
  header .division sc-seg,
  header .subdivision sc-seg,
  header .subsubdivision sc-seg,
  header .vagga sc-seg,
  header .pannasa sc-seg,
  header .nipata sc-seg {
    font-style: inherit;
  }

  /*bilingual headings*/
  .mirror {
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4.6em;
  }

  .mirror > * {
    display: table-row;
  }

  .mirror-left {
    padding-right: var(--sc-size-md);
    border-right: var(--sc-border);
    text-align: right;
    display: table-cell;
    width: 50%;
  }

  .mirror-right {
    padding-left: var(--sc-size-md);
    text-align: left;
    display: table-cell;
  }

  .mirror-middle {
    text-align: right;
    position: absolute;
    margin-top: 0.2em;
  }

  h1.mirror-row {
    line-height: 1.2
  }
</style>`;
