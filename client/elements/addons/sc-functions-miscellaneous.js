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
    return html``;
  }

  selectedLangs.sort((a, b) => b.is_root - a.is_root);

  selectedLangs.forEach(item => {
    if (specialLangs.has(item.uid)) {
      item.name = specialLangs.get(item.uid);
    }
  });

  const handleClickEvent = isSearchPage ? openTopSheetSearchOptions : openGeneralSearchOptions;

  let languagesSearched;
  if (selectedLangs.length <= 5) {
    languagesSearched = selectedLangs.map(item => item.name).join(', ');
  } else {
    const firstFiveLangs = selectedLangs.slice(0, 5);
    const restLangs = selectedLangs.slice(5);
    languagesSearched = `${firstFiveLangs.map(item => item.name).join(', ')} +${restLangs.length} more`;
  }

  return html`
    <div class="selected-languages">
      <p>Documents searched ${languagesSearched}</p>
      <md-icon-button @click=${(e) => handleClickEvent(e)}>
        ${icon.language}
      </md-icon-button>
    </div>
  `;
}
