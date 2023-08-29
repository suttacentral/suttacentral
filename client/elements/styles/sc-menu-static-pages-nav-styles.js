import { css } from 'lit';

export const SCMenuStaticPagesNavStyles = css`
  :host
{
    display: block;
}

li a
{
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color);
}

li a:hover
{
    color: var(--sc-primary-color);
}

li a:visited
{
    text-decoration-color: var(--sc-primary-color-dark);
}

#static_pages_nav_menu
{
    display: flex;

    background-color: var(--sc-primary-color-dark);

    align-items: center;
}

nav
{
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row;

    box-sizing: border-box;
    height: 48px;
    margin: 0 4px;
    padding: 8px 0;

    white-space: nowrap;

    scrollbar-width: thin;
    scrollbar-gutter: stable;
}

ul
{
    display: flex;

    width: 100%;
    margin: 0;
    padding: 0;
}

li
{
    font-size: var(--sc-font-size-md);
    font-weight: 600;
    font-stretch: condensed;

    list-style-type: none;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: all-small-caps;
}

li a
{
    position: relative;

    display: flex;

    box-sizing: border-box;
    padding: 4px 12px;

    transition: var(--sc-link-transition);
    text-decoration: none;

    opacity: .8;
    color: white;
    border-radius: var(--sc-big-border-radius);
    text-shadow: 0 0 1px rgba(0, 0, 0, .1);

    align-items: center;
}

li a:hover
{
    cursor: pointer;
    transition: var(--sc-link-transition);

    opacity: 1;
    color: white;
    background-color: var(--sc-primary-color-light-transparent);
}

li a:active
{
    transition: var(--sc-link-transition);

    background-color: var(--sc-primary-color-light-transparent);
}

li a:hover .external
{
    visibility: visible;
}

.staticPageSelected
{
    opacity: 1;
}

`;
