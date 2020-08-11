import { html } from 'lit-element';

export const navigationNormaModelStyles = html`
  <style>

main
{
    max-width: 720px;
    margin: var(--sc-size-md-larger) auto;
}

.main-nav
{
    display: flex;
    flex-direction: row;

    margin-top: 4em;

    justify-content: center;
    flex-wrap: nowrap;
}

@media screen and (max-width: 720px)
{
    .main-nav
    {
        flex-wrap: wrap;
    }
}

.card
{
    position: relative;

    overflow: hidden;;

    margin: .5em;
    padding-bottom: .5rem;

    cursor: pointer;
    transition: box-shadow 200ms ease-out;

    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-1dp);
}

.card:hover
{
    z-index: 10;

    transition: all 200ms ease-out;

    background-color: var(--sc-primary-color-light-transparent);
    box-shadow: var(--sc-shadow-elevation-8dp);
}

.card:active
{
    box-shadow: var(--sc-shadow-elevation-1dp);
}

.nav-card:first-of-type
{
    margin-top: 4em;
}

.nav-card:last-of-type
{
    margin-bottom: 4em;
}

.blurb
{
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 24px;

    padding: .5rem 1rem;
}

.blurb:empty
{
    margin: 0;
    padding: 0;
}

.blurb + .essay
{
    margin-top: 1rem;
}

.card header
{
    display: flex;

    justify-content: space-between;
}

.header-left
{
    padding: 1rem 1rem .333rem;
}

.title
{
    font-family: var(--sc-serif-font);
    font-size: var(--sc-skolar-font-size-static-subtitle);
    font-weight: 500;

    display: block;

    color: var(--sc-primary-text-color);
}

.subTitle
{
    font-size: var(--sc-skolar-font-size-s);

    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--sc-secondary-text-color);
}

a
{
    cursor: pointer;
    text-decoration: none;

    color: inherit;
}

.header-right
{
    font-size: var(--sc-skolar-font-size-xxs);
    font-weight: 600;
    line-height: 1;

    display: flex;
    flex-direction: column;

    height: 100%;
    padding: .3333rem .5rem;

    color: var(--sc-paper-tooltip-text-color);
    background-color: var(--sc-primary-color-dark);

    justify-content: center;
    align-items: center;
}

.number:before
{
    content: '✅ ';
}

.essay
{
    padding: 0 1rem .5rem 1rem;
}

.essay block-link
{
    display: inline;
}

.essay:before
{
    font-weight: 800;

    content: 'Essay: ';
}

.essay a
{
    font-family: var(--sc-serif-font);
}

.essay a:hover
{
    cursor: pointer;
    text-decoration: underline;

    text-decoration-color: var(--sc-primary-color);
}

.shortcut
{
    display: flex;

    margin-right: 1rem;;

    justify-content: flex-end;
}

.shortcut block-link
{
    display: inline;
}

.shortcut-link
{
    font-style: italic;;

    display: inline-block;

    padding: .333rem 1rem;

    border-radius: 8px;
    background-color: var(--sc-primary-background-color);
}

.shortcut:before
{
    font-weight: 800;
    line-height: 2;

    display: inline-block;

    margin-right: .333rem;

    content: '↳';

    color: var(--sc-disabled-text-color);
}

.shortcut-link:hover
{
    text-decoration: underline;

    background-color: var(--sc-tertiary-background-color);

    text-decoration-color: var(--sc-primary-color);
}

  </style>
`;

export const navigationCompactModeStyles = html`
  <style>
    .blurb,
.essay
{
    display: none;
}

.card
{
    min-width: 20em;
    margin-top: 0;
    margin-bottom: 1px;
    padding-bottom: 8px;

    cursor: pointer;

    border-radius: 0;
}

.header-left
{
    padding: 12px 1rem 0;
}

.title
{
    font-size: var(--sc-skolar-font-size-l);
    line-height: 1;
}

.shortcut
{
    font-size: var(--sc-skolar-font-size-s);
}

  </style>
`;