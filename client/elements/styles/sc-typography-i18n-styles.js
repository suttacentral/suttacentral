import { css } from 'lit-element';

export const typographyI18nStyles = css`

/* styles for texts with scripts other than latin */

/* Firefox & Safari use the font-synthesis property to remove faux italics  or bold. 
  Note that vi is excluded from this list: it uses Roman font but qualifies as tall script due to the stacked diacriticals */

[lang='ar'] *,
[lang='au'] *,
[lang='bn'] *,
[lang='ev'] *,
[lang='fa'] *,
[lang='he'] *,
[lang='hi'] *,
[lang='jpn'] *,
[lang='kln'] *,
[lang='ko'] *,
[lang='lzh']  *,
[lang='mr'] *,
[lang='my'] *,
[lang='si'] *,
[lang='ta'] *,
[lang='th'] *,
[lang='vu'] *,
[lang='xct'] *,
[lang='zh'] *
{
    font-style: normal;

    letter-spacing: normal;
    text-transform: none;

    font-synthesis: none;
    font-variant-caps: normal;
}

[lang='ar'] *,
[lang='au'] *,
[lang='bn'] *,
[lang='fa'] *,
[lang='he'] *,
[lang='hi'] *,
[lang='jpn'] *,
[lang='kln'] *,
[lang='ko'] *,
[lang='lzh']  *,
[lang='mr'] *,
[lang='si'] *,
[lang='ta'] *,
[lang='th'] *,
[lang='vi'] *,
[lang='vu'] *,
[lang='xct'] *,
[lang='zh']
{
    line-height: 1.6667
}
[lang='ev'] *,
[lang='my'] *
{
    line-height: 2
}

[lang='ar']
{
    font-family: var(--sc-arabic-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='au']
{
    font-family: var(--sc-aurebesh-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='bn']
{
    font-family: var(--sc-bengali-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='ev']
{
    font-family: var(--sc-tengwar-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='fa']
{
    font-family: var(--sc-arabic-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='he']
{
    font-family: var(--sc-hebrew-serif-font);
}
[lang='hi']
{
    font-family: var(--sc-devanagari-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='jpn']
{
    font-family: var(--sc-japanese-font);
    font-size: var(--sc-dense-font-size-md);
}
[lang='kln']
{
    font-family: var(--sc-klingon-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='ko']
{
    font-family: var(--sc-korean-font);
    font-size: var(--sc-dense-font-size-md);
}
[lang='lzh']
{
    font-family: var(--sc-traditional-chinese-font);
    font-size: var(--sc-dense-font-size-md);
}
[lang='mr']
{
    font-family: var(--sc-devanagari-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='my']
{
    font-family: var(--sc-myanmar-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='si']
{
    font-family: var(--sc-sinhala-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='ta']
{
    font-family: var(--sc-tamil-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='th']
{
    font-family: var(--sc-thai-serif-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='vi']
{
    font-size: var(--sc-tall-font-size-md);
}
[lang='vu']
{
    font-family: var(--sc-vulcan-font);
    font-size: var(--sc-tall-font-size-xl);
}
[lang='xct']
{
    font-family: var(--sc-tibetan-font);
    font-size: var(--sc-tall-font-size-md);
}
[lang='zh']
{
    font-family: var(--sc-traditional-chinese-font);
    font-size: var(--sc-dense-font-size-md);
}


/* don't let Pali/sanskrit words go too long, probably won't work but oh well */


[lang='pli'],
[lang='san']
{
    word-wrap: break-word;

    overflow-wrap: break-word;
}

`