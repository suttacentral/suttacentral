import { css } from 'lit';

export const typographyStaticStyles = css`
  /* styles unique to static pages */
li
{
    margin: 0 0 0 1em;
    padding: .25em .5em;
}

pre
{
    font-family: var(--sc-monospace-font);
}
.byline
{
    font-style: italic;
}

/* images */
img
{
    display: block;

    max-width: 100%;
    margin: 32px auto;
}
/* indexes */

.description
{
    font-style: italic;

    margin: 0;
}
.type
{
    margin-bottom: .5em;
}
.life-events
{
    font-style: italic;

    margin-top: .5em;

    color: var(--sc-on-primary-secondary-text-color);
}
.term-translation
{
    font-family: var(--sc-serif-font);
    font-style: normal;
}
.entry-list
{
    display: flex;
    flex-direction: row;

    text-align: center;

    flex-wrap: wrap;

    gap: 6px
}
.entry-list a
{
    display: inline-block;
    width: 64px;
    padding: 12px 0 8px 0;

    border-radius: 24px;
}
.subject
{
    font-style: italic;

    color: var(--sc-on-primary-secondary-text-color);
}
.subject:before
{
    content: '(';
}
.subject:after
{
    content: ')';
}
.static-copyright
{
    margin-top: 64px;
    padding: 1em 2em;

    color: var(--sc-on-primary-secondary-text-color);
    border: var(--sc-border);
    border-radius: 2px;
    background: var(--sc-tertiary-background-color);
}
.about-index
{
    margin-top: 64px;
    padding: 1em 2em;

    color: var(--sc-on-primary-secondary-text-color);
    border: var(--sc-border);
    border-radius: 2px;
}

sc-page-selector
{
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;
    line-height: 1.5;

    color: var(--sc-on-primary-primary-text-color);
}

`;
