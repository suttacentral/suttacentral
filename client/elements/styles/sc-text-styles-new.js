import { html } from 'lit-element';

export const textStylesNew = html`
<style>
  a {
    text-decoration: none;
  }

  /* Firefox & Safari use the font-synthesis property
  to remove italics, etc. that do not appear in the script
  not yet implemented for other browsers */
  [lang="ar"], [lang="si"], [lang="fa"], [lang="he"], [lang="hi"],
  [lang="vi"], [lang="jpn"], [lang="lzh"], [lang="zh"], [lang="mr"],
  [lang="my"], [lang="ta"], [lang="th"], [lang="xct"], [lang="ko"],
  [lang="bn"] {
    font-synthesis: none;
  }

  article[lang="ar"], section[lang="ar"],
  article[lang="fa"], section[lang="fa"] {
    font-family: var(--sc-arabic-serif-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }
  
  [lang="ar"] header ul, 
  [lang="fa"] header ul, 
  [lang="ar"] header ul, 
  [lang="fa"] header ul {
    font-family: var(--sc-arabic-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  article[lang="he"], section[lang="he"] {
    font-family: var(--sc-hebrew-serif-font);
  }

  [lang="he"] header ul {
    font-family: var(--sc-hebrew-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
  }

  article[lang="hi"], article[lang="mr"],
  section[lang="hi"], section[lang="mr"],
  article[lang="pli-Deva"] .word, .devanagari-script .word {
    font-family: var(--sc-devanagari-serif-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="hi"] header ul, [lang="mr"] header ul,
  [lang="hi"] header ul, [lang="mr"] header ul,
  header ul li [lang="pli-Deva"] .word,
  .devanagari-script header ul .word {
    font-family: var(--sc-devanagari-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  .uddanagatha [lang="pli-Deva"] .word,
  .devanagari-script .uddanagatha .word {
    font-family: var(--sc-devanagari-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-s);
    line-height: 23px;
  }

  article[lang="my"], section[lang="my"], [lang="pli-Mymr"] .word,
  .myanmar-script .word {
    font-family: var(--sc-myanmar-serif-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="my"] header ul, [lang="my"] header ul,
  header ul [lang="pli-Mymr"] .word,
  .myanmar-script header ul .word {
    font-family: var(--sc-myanmar-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  .uddanagatha [lang="pli-Mymr"] .word,
  .myanmar-script .uddanagatha .word {
    font-family: var(--sc-myanmar-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-s);
    line-height: 23px;
  }

  article[lang="si"], section[lang="si"], [lang="pli-Sinh"] .word,
  .sinhala-script .word {
    font-family: var(--sc-sinhala-serif-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="si"] header ul, section[lang="si"] header ul, 
  header ul [lang="pli-Sinh"] .word,
  .sinhala-script header ul .word {
    font-family: var(--sc-sinhala-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  .uddanagatha [lang="pli-Sinh"] .word,
  .sinhala-script .uddanagatha .word {
    font-family: var(--sc-sinhala-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-s);
    line-height: 23px;
  }

  article[lang="ta"], section[lang="ta"]{
    font-family: var(--sc-tamil-serif-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="ta"] header ul {
    font-family: var(--sc-tamil-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  article[lang="bn"], section[lang="bn"] {
    font-family: var(--sc-bengali-serif-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="bn"] header ul {
    font-family: var(--sc-bengali-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  article[lang="th"], section[lang="th"],
  [lang="pli-Thai"] .word,
  .thai-script .word {
    font-family: var(--sc-thai-serif-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="th"] header ul,
  header ul [lang="pli-Thai"] .word,
  .thai-script header ul .word {
    font-family: var(--sc-thai-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="th"] .uddana, .uddanagatha [lang="pli-Thai"] .word,
  .thai-script .uddanagatha .word {
    font-family: var(--sc-thai-sans-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-s);
    line-height: 23px;
  }

  article[lang="xct"], section[lang="xct"]{
    font-family: var(--sc-tibetan-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="xct"] header ul {
    font-family: var(--sc-tibetan-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  article[lang="zh"], article[lang="lzh"] {
    font-family: var(--sc-traditional-chinese-font);
    font-size: var(--sc-dense-font-size-md);
    line-height: 26px;
  }
  }

  [lang="lzh"] header ul, [lang="zh"] header ul,
  [lang="lzh"] .counter, [lang="lzh"] .t-counter {
    font-family: var(--sc-traditional-chinese-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-dense-font-size-md);
    line-height: 26px;
  }

  [lang="lzh"] .uddana, [lang="zh"] .uddanagatha {
    font-family: var(--sc-traditional-chinese-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-dense-font-size-s);
    line-height: 23px;
  }

  article[lang="ko"], section[lang="ko"] {
    font-family: var(--sc-korean-font);
    font-size: var(--sc-dense-font-size-md);
    line-height: 26px;
  }

  [lang="ko"] header ul {
    font-family: var(--sc-korean-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-dense-font-size-md);
    line-height: 26px;
  }

  article[lang="jpn"], section[lang="jpn"] {
    font-family: var(--sc-japanese-font);
    font-size: var(--sc-dense-font-size-md);
    line-height: 26px;
  }

  [lang="jpn"] header ul {
    font-family: var(--sc-japanese-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-dense-font-size-md);
    line-height: 26px;
  }

  [lang="jpn"] .uddana {
    font-family: var(--sc-japanese-font);
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;;
    font-size: var(--sc-dense-font-size-s);
    line-height: 23px;
  }

  article[lang="ev"], section[lang="ev"] {
    font-family: var(--sc-tengwar-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  article[lang="kln"], section[lang="kln"] {
    font-family: var(--sc-klingon-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  article[lang="vu"] ,section[lang="vu"] {
    font-family: var(--sc-vulcan-font);
    font-size: var(--sc-tall-font-size-xl);
    line-height: 30px;
  }

  article[lang="au"], section[lang="au"] {
    font-family: var(--sc-aurebesh-font);
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  article[lang="vi"], section[lang="vi"], [lang="vi"] header ul {
    font-size: var(--sc-tall-font-size-md);
    line-height: 34px;
  }

  [lang="vi"] .uddana, [lang="vi"] .uddanagatha {
    font-size: var(--sc-tall-font-size-s);
    line-height: 23px;
  }

  article, section, article.latin-script {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 24px;
    font-family: var(--sc-serif-font);
  }

  .html-text-content section, .html-text-content article {
    margin: 0 auto !important;
    padding: var(--sc-size-lg) var(--sc-size-md) var(--sc-size-xxl);
    max-width: 720px;
    display: block;
  }

  .html-text-content.side-by-side section, .html-text-content.side-by-side article {
    max-width: 1440px;
  }

  .html-text-content.side-by-side .sc-segmented-text {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .html-text-content.line-by-line .original-text {
    font-family: var(--sc-sans-font);
    color: var(--sc-secondary-text-color);
    margin-bottom: 20px;
  }

  .original-text:not([lang='pli-Latn']) {
    font-style: normal;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
    font-synthesis: none;
  }

  .html-text-content:not(.latin-script) .word {
    font-style: normal;
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
  }

  [lang='pli-Latn'] .original-text {
    font-family: var(--sc-serif-font);
  }

  .side-by-side .translated-text {
    padding-right: var(--sc-size-md);
    display: inline-block;
    width: 47%;
    vertical-align: text-top;
  }

  .side-by-side .original-text {
    font-family: var(--sc-sans-font);
    display: inline-block;
    width: 47%;
    padding-left: 5px;
    vertical-align: text-top;
  }

  .line-by-line .translated-text, .line-by-line .original-text {
    display: block;
  }

  .show-pali .translated-text {
    display: none;
  }

  .show-pali .original-text {
    font-family: var(--sc-serif-font);
    display: inline;
  }

  .text-tooltip {
    --paper-tooltip-opacity: 0.98;
    --paper-tooltip-background: var(--sc-paper-tooltip-color);
    --paper-tooltip: {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-skolar-font-size-xs);
      line-height: var(--sc-size-md);
      padding: var(--sc-size-sm) var(--sc-size-md);
      text-shadow: 0 0 var(--sc-secondary-background-color);
      white-space: normal;
    };
  }

  /*Descriptions of all classes below can be found in zz1 and zz3 test files*/

  .infomode .term,
  .infomode .gloss {
    color: var(--sc-primary-accent-color);
  }

  .term {
    font-weight: bold;
  }

  .suttainfo,
  .colophon {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    line-height: 20px;
    padding: var(--sc-size-md);
    color: var(--sc-secondary-text-color);
    background: var(--sc-primary-background-color);
    border: 1px solid var(--sc-tertiary-background-color);
    border-radius: var(--sc-size-xxs);
    display: inline-block;
    margin-bottom: var(--sc-size-md);
  }

  [lang="lzh"] .suttainfo,
  .xu,
  .w {
    font-family: var(--sc-traditional-chinese-font);
    font-size: var(--sc-dense-font-size-md);
    line-height: 26px;
    font-weight: 400;
    padding: var(--sc-size-md);
    color: var(--sc-secondary-text-color);
    background: var(--sc-primary-background-color);
    border: 1px solid var(--sc-tertiary-background-color);
    border-radius: var(--sc-size-xxs);
    display: inline-block;
    margin-bottom: var(--sc-size-md);
  }

  .suttainfo p,
  .xu p,
  .w p,
  .colophon p {
    margin-bottom: 0;
  }

  /* TEXT */

  article ul {
    list-style-type: none;
    padding: 0 0 1px 0;
    /* margin-left: 32px; */
  }

  article ul li::before {
    position: absolute;
    /* content: "◦"; */
    color: var(--sc-disabled-text-color);
    margin-left: -12px;
  }

  article ol {
    padding: 0 0 12px 0;
    margin-left: 32px;
  }

  article ol ol {
    padding: 0 0 0 1em;
    margin: 0 0 0 0;
  }

  .gatha {
    font-size: inherit;
    width: auto;
    margin: 0 auto;
    padding: 0 1em;
  }

  .indent {
    padding-left: 32px;
  }

  .endsection,
  .end,
  .endsubsection {
    font-style: italic;
    text-align: center;
    color: var(--sc-secondary-text-color);
  }

  [lang="si"] .endsection,
  [lang="he"] .endsection,
  [lang="hi"] .end,
  [lang="jpn"] .end,
  [lang="lzh"] .endsection,
  [lang="lzh"] .scribe,
  [lang="zh"] .endsection,
  [lang="th"] .endsection,
  [lang="th"] .end,
  [lang="th"] .namo,
  [lang="hi"] .namo,
  [lang="jpn"] .namo,
  [lang="lzh"] .namo,
  [lang="si"] .namo,
  [lang="ta"] .speaker,
  [lang="bn"] .endsutta,
  [lang="bn"] .endsection,
  [lang="bn"] .namo {
    font-style: inherit;
  }

  .endsutta {
    font-weight: bold;
    text-align: center;
    color: var(--sc-secondary-text-color);
  }

  .uddana {
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    line-height: 20px;
  }

  .uddana-intro {
    font-weight: bold;
    color: var(--sc-secondary-text-color);
  }

  .endbook,
  .endvagga {
    text-align: center;
    color: var(--sc-secondary-text-color);
    text-transform: uppercase;
    letter-spacing: var(--sc-caps-letter-spacing);
  }

  [lang="si"] .endbook,
  [lang="zh"] .endbook,
  [lang="si"] .endvagga {
    font-variant-caps: normal;
    letter-spacing: normal;
    text-transform: none;
  }

  .endbook {
    font-weight: bold;
  }

  .surplus {
    display: none;
  }

  .infomode .surplus {
    display: inline;
    color: var(--sc-secondary-text-color);
  }

  .infomode .supplied {
    color: var(--sc-primary-color)
  }

  .infomode .supplied2 {
    color: var(--sc-primary-color-dark);
  }

  [lang="pgd"] .add,
  [lang="pli"] .add,
  [lang="san"] .add,
  [lang="pra"] .add,
  [lang="en"] .add,
  .infomode .add {
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-sans-font);
  }

  [lang="lzh"] .add,
  [lang="xct"] .add {
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-noto-sans-font);
  }

  [lang="pli"] p,
  [lang="san"] p {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .pe {
    font-style: italic;
  }

  .infomode .pe {
    color: var(--sc-secondary-text-color);
  }

  .metre {
    display: none;
  }

  .infomode .metre {
    font-size: var(--sc-skolar-font-size-xxs);
    color: var(--sc-primary-accent-color);
    display: inline-block;
    position: absolute;
    margin-top: -11px;
    letter-spacing: 0.2em;
  }

  .infomode .expanded {
    color: var(--sc-secondary-text-color);
  }

  .suppliedmetre {
    color: var(--sc-secondary-text-color);
  }

  .gap {
    color: var(--sc-secondary-text-color);
  }

  .infomode .var {
    color: var(--sc-secondary-accent-color);
  }

  .text-table {
    margin: var(--sc-size-xl) auto;
    border-collapse: collapse;
  }

  .text-table td {
    padding: 12px var(--sc-size-md-larger) 12px var(--sc-size-md-larger);
    vertical-align: text-top;
    border-top: 1px solid var(--sc-tertiary-background-color);
    border-bottom: 1px solid var(--sc-tertiary-background-color);
  }

  .text-table li {
    padding: var(--sc-size-xs) 0;
  }

  .text-table ul {
    padding-left: var(--sc-size-xl);
  }

  .varnote,
  .corrnote {
    --paper-tooltip-opacity: 0.98;
    --paper-tooltip-background: var(--sc-paper-tooltip-color);
    --paper-tooltip: {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-skolar-font-size-xs);
      line-height: var(--sc-size-md);
      padding: var(--sc-size-sm) var(--sc-size-md);
      text-shadow: 0 0 var(--sc-secondary-background-color);
      white-space: normal;
      max-width: 100% !important;
    }
  }

  .varnote table {
    color: var(--sc-paper-tooltip-text-color);
  }

  .varnote td {
    padding: 0;
    vertical-align: middle;
    border: none;
  }

  .varnote td:first-child:not(:last-child) {
    font-weight: bold;
    padding-right: var(--sc-size-xs);
  }

  .varnote td:last-child {
    font-size: 14px;
  }

  .infomode .corr,
  .infomode .corrected {
    color: var(--sc-primary-accent-color)
  }

  .del, .del-scribe {
    display: none
  }

  .infomode .del, .infomode .del-scribe {
    text-decoration: line-through;
    display: inline
  }

  .unclear {
    color: var(--sc-secondary-text-color);
  }

  .scribe {
    font-style: italic;
  }

  hr {
    width: 33%;
    margin: 1em auto 0;
  }

  .t-gaiji {
    color: var(--sc-primary-accent-color);
  }

  a.cr {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: var(--sc-primary-color);
    text-decoration-skip-ink: auto;
  }

  a.cr:hover  {
    color: var(--sc-primary-color);
  }

    a.cr:visited {
      text-decoration-color: var(--sc-primary-color-dark);
    }

  .hidden,
  .alt-title {
    display: none;
  }

  .allowance,
  .kamma {
    font-weight: bold;
  }

  .t-byline,
  .t-headname,
  .t-juanname {
    font-style: inherit;
  }

  .uddanagatha {
    color: var(--sc-secondary-text-color);
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    line-height: 20px;
    font-style: inherit;
  }

  .evam {
    font-variant-caps: all-small-caps;
    letter-spacing: var(--sc-caps-letter-spacing);
  }

  .namo {
    text-align: center;
    font-style: italic;
    color: var(--sc-primary-text-color);
  }

  .rightview,
  .wrongview,
  .rule-number,
  .t-note,
  .vagga-number {
    color: var(--sc-secondary-text-color);
  }

  .rule,
  .subrule {
    font-weight: bold;
  }

  .speaker {
    font-style: italic;
  }

  .counter,
  .t-counter {
    font-family: var(--sc-traditional-chinese-font);
    font-size: var(--sc-dense-font-size-s);
    line-height: 23px;
    font-weight: 400;
    line-height: 20px;
    color: var(--sc-secondary-text-color);
  }

  h1, h2, h3, h4, h5, h6, ul, ol, dd, p, figure, pre, table, fieldset {
    margin: 1em 0 0 0;
  }

  header + p,
  header + blockquote {
    margin-top: var(--sc-size-xl);
  }

  footer {
    display: none;
  }
</style>`;
