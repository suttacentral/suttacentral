import { html, css, LitElement } from 'lit';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { store } from '../../redux-store';

class SCAutoCompleteList extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      z-index: 9999;
      background-color: var(--sc-primary-background-color);
      color: var(--sc-primary-text-color);
      display: none;
    }

    ul {
      list-style: none;
      padding: .5rem .5rem .25rem;
      margin: 0;
      overflow-y: auto;
      border-bottom: 1px solid var(--sc-border-color)
    }

      .orama-findings:before{
      content: "in:all";
      color: var(--sc-secondary-text-color);
      position:absolute;
      top: -32px;
      left:26px;
      font-family: monospace;
    }

          .orama-findings:after{
      content: "search all";
      color: var(--sc-primary-accent-color);
        font-size: var(--sc-skolar-font-size-xs);
    font-weight: 600;
    font-stretch: condensed;
      position:absolute;
      top: -34px;
      right:120px
    }

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;

      
  
      margin-bottom: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    li:not(.in-all){
      padding: 8px 16px;
      height: 20px;
      border-radius: 18px;
      border: none
    }

    li.in-all{
      padding: 0px 0px;
      flex-direction: column;
    }

        jumpto li:after{
      content: "jump to ⏎";
      color: var(--sc-primary-accent-color);
        font-size: var(--sc-skolar-font-size-xs);
    font-weight: 600;
    font-stretch: condensed;
    }

    .jumpto .text:after{
      content: "jump to text ⏎";
      color: var(--sc-primary-accent-color);
        font-size: var(--sc-skolar-font-size-xs);
    font-weight: 600;
    font-stretch: condensed;
    }

        .jumpto .collection:after{
      content: "jump to collection ⏎";
      color: var(--sc-primary-accent-color);
        font-size: var(--sc-skolar-font-size-xs);
    font-weight: 600;
    font-stretch: condensed;
    }

          .in-all:after{
      content: "search all 🔍";
      color: var(--sc-primary-accent-color);
        font-size: var(--sc-skolar-font-size-xs);
    font-weight: 600;
    font-stretch: condensed;
    position: absolute;
    right: 36px;
    top: 72px;
    }

      .in-mn:after{
      content: "search Majjhima Nikāya 🔍";
      color: var(--sc-primary-accent-color);
        font-size: var(--sc-skolar-font-size-xs);
    font-weight: 600;
    font-stretch: condensed;
    }

      .in-ebt:after{
      content: "search early texts 🔍";
      color: var(--sc-primary-accent-color);
        font-size: var(--sc-skolar-font-size-xs);
    font-weight: 600;
    font-stretch: condensed;
    }

  li:not(.in-all):hover {
      background-color: var(--sc-primary-accent-color-light-transparent);
    }

    li:not(.in-all):active {
      background-color: var(--sc-primary-accent-color-light);
    }

    li:not(.in-all):focus {
      background-color: var(--sc-primary-accent-color-light-transparent);
    }

    .orama-findings{
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 8px;
      box-shadow: var(--sc-shadow-elevation-4dp);
    }

    .in-foo{
        color: white;
  font-family: monospace;
  border: 1px solid var(--sc-border-color);
  width: fit-content;
  padding: 2px 4px;
  background-color: var(--sc-icon-color);
  border-radius: 8px;
  font-size: var(--sc-skolar-font-size-xxs);

    }

   div{
      padding: 1rem 2rem 0;

    }

    .caption{
      font-variant-caps: all-small-caps;
      font-stretch: expanded;
      text-align: center

    }
 
    label{
      font-variant-caps: all-small-caps;
      font-stretch: expanded;
      text-align: center;
      font-size: var(--sc-skolar-font-size-xs);
    color: var(--sc-secondary-text-color);
    margin-bottom: 1rem;
    margin-top: 1rem
    }


    .search-tips a{
      font-size: var(--sc-skolar-font-size-xs);
      text-decoration: none;
      color: var(--sc-primary-color)
    }

    .search-tips a:after{
      content: " 🔗"
    }
        .search-tips a:hover{
      text-decoration: underline
    }

    .search-tips{
    margin-bottom: 1rem
  }


    .section-tip {
      font-size: var(--sc-skolar-font-size-xs);
      color: var(--sc-secondary-text-color);
    }

    #orama_search_input{
width: 100%;
padding:  8px 8px 8px 16px;
border-radius: 24px;
border: 2px solid var(--sc-primary-accent-color);

    }

    ::placeholder {
  color: white;
  font-family: monospace;
  border: 1px solid var(--sc-border-color);
  width: fit-content;
  padding: 2px 4px;
  background-color: var(--sc-icon-color);
  border-radius: 8px;
  font-size: var(--sc-skolar-font-size-xxs);
}

.jumpto-item-divider{
  color: var(--sc-icon-color)
}
.jumpto-item-type{
  margin-right: 4px;
  border: 2px solid var(--sc-primary-color);
  border-radius: 50%;
  height: 24px;
  width:24px;
  padding: 4px
}

#input-dummy-delete-this{
  position: absolute;
top: 55px;
    left: 56px;
}


  `;

  static properties = {
    items: { type: Array },
  };

  constructor() {
    super();
    this.items = [];
    this.priorityAuthors = new Map([['en', 'sujato']]);
  }

  firstUpdated() {
    const ulELem = document
      .querySelector('sc-navigation-linden-leaves')
      .shadowRoot.querySelector('sc-action-items-universal')
      .shadowRoot.querySelector('sc-auto-complete-list')
      .shadowRoot.querySelector('ul');

    document.addEventListener('keydown', event => {
      const currentSelectedItem = document
        .querySelector('sc-navigation-linden-leaves')
        .shadowRoot.querySelector('sc-action-items-universal')
        .shadowRoot.querySelector('sc-auto-complete-list')
        .shadowRoot.querySelector('.selected');

      if (!currentSelectedItem) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();

        if (currentSelectedItem) {
          currentSelectedItem.classList.remove('selected');
          currentSelectedItem.tabIndex = -1;

          const nextItem = currentSelectedItem.nextElementSibling;
          if (nextItem) {
            nextItem.classList.add('selected');
            nextItem.tabIndex = 0;
            nextItem.focus();
          } else {
            const firstItem = ulELem.querySelector('li:first-child');
            if (firstItem) {
              firstItem.classList.add('selected');
              firstItem.tabIndex = 0;
              firstItem.focus();
            }
          }
        } else {
          const firstItem = ulELem.querySelector('li:first-child');
          if (firstItem) {
            firstItem.classList.add('selected');
            firstItem.tabIndex = 0;
            firstItem.focus();
          }
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();

        if (currentSelectedItem) {
          currentSelectedItem.classList.remove('selected');
          currentSelectedItem.tabIndex = -1;

          const previousItem = currentSelectedItem.previousElementSibling;
          if (previousItem) {
            previousItem.classList.add('selected');
            previousItem.tabIndex = 0;
            previousItem.focus();
          } else {
            const lastItem = ulELem.querySelector('li:last-child');
            if (lastItem) {
              lastItem.classList.add('selected');
              lastItem.tabIndex = 0;
              lastItem.focus();
            }
          }
        } else {
          const lastItem = ulELem.querySelector('li:last-child');
          if (lastItem) {
            lastItem.classList.add('selected');
            lastItem.tabIndex = 0;
            lastItem.focus();
          }
        }
      }
    });
  }

  render() {
    return html`
    <section class='orama-findings'>
    <ul class='search-options'>
        <li class='in-all'>
<div id='input-dummy-delete-this''>satipa<mark>ṭṭhāna</mark></div>
          <label for="orama_search_input">Full text search </label>
          <input
        id="orama_search_input"
        name="q"
        type="search"
        style="height: 48px"
        spellcheck="true"
        placeholder="in:all"
        aria-label="Search through site content"
        autocomplete="on"
      />

    </li>
    <li class='in-ebt'>
    <span>
    <span class='in-foo'>in:ebt</span>
    <span class='search-term'><b>satipa</b>ṭṭhāna</span>
    </span>
    </li>
    <li class='in-mn'>
    <span>
    <span class='in-foo'>in:mn</span>
    <span class='search-term'><b>satipa</b>ṭṭhāna</span>
    </span>
    </li>
    </ul>
    <div class='caption'><span class='section-tip'>jump directly to text or collection</span></div>
      <ul class='jumpto'>
        ${this.items.map(
          (item, i) =>
            html`<li
              tabindex=${i === this.selectedIndex ? '0' : '-1'}
              @click=${() => this.selectItem(item.uid)}
              @keydown=${e => this.handleKeyDown(e, i, item.uid)}
              @mouseover=${e => this.handleMouseOver(e, i)}
              class=${i === 0 ? 'selected' : ''}
            >
            <span class='jumpto-item'>
            <span class='jumpto-item-type'>📚</span>
              <span class='jumpto-item-uid'>${item.uid}</span>
             <span class='jumpto-item-divider'> — </span>
             <span class='jumpto-item-title'>${item.title}</span>
             </span>
            </li>`
        )}
      </ul>
      <div class='search-tips'><a href=''>search tips</a></div>
      </section>
    `;
  }

  selectItem(item) {
    const siteLang = store.getState().siteLanguage;
    let link = `/${item}`;
    if (this.priorityAuthors.get(siteLang)) {
      link = `/${item}/${siteLang}/${this.priorityAuthors.get(siteLang)}`;
    }
    dispatchCustomEvent(this, 'sc-navigate', { pathname: link });
    document
      .querySelector('sc-navigation-linden-leaves')
      .shadowRoot.querySelector('sc-action-items-universal')
      .shadowRoot.querySelector('#search_input').value = item;
    this.style.display = 'none';
  }

  handleKeyDown(event, index, uid) {
    if (event.key === 'Enter') {
      this.selectItem(uid);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = Math.min(this.items.length - 1, this.selectedIndex + 1);
    }
    this.requestUpdate();
  }

  handleMouseOver(event, index) {
    const autoCompleteList = document
      .querySelector('sc-navigation-linden-leaves')
      .shadowRoot.querySelector('sc-action-items-universal')
      .shadowRoot.querySelector('sc-auto-complete-list').shadowRoot;

    const currentSelectedItem = autoCompleteList.querySelector('.selected');
    if (currentSelectedItem) {
      currentSelectedItem.classList.remove('selected');
      currentSelectedItem.tabIndex = -1;
    }

    this.selectedIndex = index;
    event.target.classList.toggle('selected');
    event.target.tabIndex = 0;
    event.target.focus();
  }
}

customElements.define('sc-auto-complete-list', SCAutoCompleteList);
