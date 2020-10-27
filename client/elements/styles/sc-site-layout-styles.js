import { css, html } from "lit-element";

export const SCSiteLayoutStyles = css`
  :host
{
  display: block;
}

p a,
li a
{
  text-decoration: underline;

  color: inherit;

  text-decoration-color: var(--sc-primary-color);
}

p a:hover,
li a:hover
{
  color: var(--sc-primary-color);
}

p a:visited,
li a:visited
{
  text-decoration-color: var(--sc-primary-color-dark);
}

.close-dialog-icon
{
  margin: var(--sc-size-sm);

  color: var(--sc-tertiary-text-color);
}

  /* apply font size here to avoid resizing title when returning to Home */
#title
{
  font-size: clamp(2rem, 8vw, 3em);
}

.homeTitle
{
  display: flex;
  overflow: hidden;
  flex-direction: column;

  box-sizing: border-box;
  height: 180px;
  margin: auto;

  transition: all .1s;
  white-space: nowrap;
  text-overflow: ellipsis;

  justify-content: center;
}

#mainTitle
{
  display: flex;

  justify-content: center;
  align-items: flex-end;
}

.homeTitle #mainTitle
{
  font-family: var(--sc-serif-font);
  line-height: 1;

  letter-spacing: var(--sc-caps-letter-spacing);

  font-variant-caps: small-caps;
}

#subTitle
{
  font-size: .5em;
  font-style: italic;
}

#universal_toolbar
{
  position: sticky;
  z-index: 9999;
  top: 0;

  color: var(--sc-tertiary-text-color);
  background-color: var(--sc-primary-color);
  box-shadow: var(--sc-shadow-elevation-2dp);
}

#context_toolbar
{
  display: flex;

  padding: 0 2%;

  justify-content: space-between;
}
 .generalTitle 
  {
  display: flex;

  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  }

  /* apply font size here to avoid resizing title when returning to Home */
.generalTitle span
{
    font-size: calc(20px * var(--sc-skolar-font-scale));
}
@media print
{
  #universal_toolbar,
  #title
  {
    display: none;
  }
}

.title-logo-icon
{
  width: 1.25em;
  height: 1.25em;
  /* these hacky margins compensate for the padding in the svg icon. Use em to scale with clamp*/
  margin: .1em .1em -.1em -.1em;
}

#static_pages_nav_menu
{
  height: 48px;

  background-color: var(--sc-primary-color-dark);
}

nav
{
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  flex-direction: row;

  box-sizing: border-box;
  height: 48px;
  padding: 0 calc(2% - 8px);

  white-space: nowrap;

  background-color: var(--sc-primary-color-dark);
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
  font-size: var(--sc-skolar-font-size-xs);
  font-weight: 500;

  margin-right: 8px;

  list-style-type: none;

  letter-spacing: var(--sc-caps-letter-spacing);
  text-transform: uppercase;

  align-items: center;
}

li a
{
  position: relative;

  display: flex;

  box-sizing: border-box;
  height: 100%;
  padding: 4px 8px 0;

  text-decoration: none;

  opacity: .8;
  color: var(--sc-tertiary-text-color);
  border-bottom: 4px solid rgba(0,0,0,0);

  align-items: center;
}

li a:hover
{
  cursor: pointer;

  opacity: 1;
  color: var(--sc-tertiary-text-color);
  border-bottom: 4px solid var(--sc-primary-color-light);
}

.staticPageSelected
{
  opacity: 1;
  border-bottom: 4px solid var(--sc-primary-color-light);
}

  morph-ripple 
  {
  --ripple-color: gold;
  }

`;
