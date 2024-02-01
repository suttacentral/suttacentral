import { dispatchCustomEvent } from '../../utils/customEvent';
import { icon } from '../../img/sc-icon';
import '@material/web/iconbutton/icon-button';
import { html } from 'lit';

export function getURLParam(name) {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(name);
  } catch (e) {
    return '';
  }
}

export function isMobileBrowser() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function openTopSheetSearchOptions(e) {
  e.stopPropagation();
  const scSiteLayout = document.querySelector('sc-site-layout');
  const searchOptionsTopSheet = scSiteLayout.querySelector('#search-options');
  searchOptionsTopSheet.toggle();
}

function openGeneralSearchOptions(e) {
  dispatchCustomEvent(e.target, 'sc-navigate', { pathname: '/search-options' });
}

export function extractSelectedLangsName(displayedLanguages, linkText, isSearchPage = false) {
  const specialLangs = new Map([['lzh', 'Literary Chinese']]);
  const selectedLangs = displayedLanguages.filter(item => item.checked);
  if (selectedLangs.length === 0) {
    return '';
  }
  selectedLangs.sort((a, b) => {
    if (a.is_root && !b.is_root) {
      return -1;
    }
    if (!a.is_root && b.is_root) {
      return 1;
    }
    return 0;
  });

  selectedLangs.forEach(item => {
    if (specialLangs.has(item.uid)) {
      item.name = specialLangs.get(item.uid);
    }
  });
  const handleClickEvent = isSearchPage ? openTopSheetSearchOptions : openGeneralSearchOptions;
  if (selectedLangs.length <= 5) {
    return html`
      <div class="selected-languages">
        Languages searched
        ${selectedLangs.map(item => item.name).join(', ')}
        <md-icon-button @click=${(e) => handleClickEvent(e)}>
          ${icon.language}
        </md-icon-button>
      </div>
    `;
  }
  const firstFiveLangs = selectedLangs.slice(0, 5);
  const restLangs = selectedLangs.slice(5);
  return html`
    <div class="selected-languages">
      <p>Languages searched
      ${firstFiveLangs.map(item => item.name).join(', ')}
      +${restLangs.length} more</p>
      <md-icon-button @click=${(e) => handleClickEvent(e)}>
        ${icon.language}
      </md-icon-button>
    </div>
  `;
}
