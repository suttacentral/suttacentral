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

export function isChinese(langIso) {
  return langIso === 'zh' || langIso === 'lzh'
}

function openTopSheetSearchOptions(e) {
  e.stopPropagation();
  const scActionItems = document.querySelector('sc-site-layout').querySelector('#action_items');
  scActionItems?.btnSearchOptionsClick();
}

function openGeneralSearchOptions(e) {
  dispatchCustomEvent(e.target, 'sc-navigate', { pathname: '/search-options' });
}

export function extractSelectedLangsName(displayedLanguages, linkText, isSearchPage = false) {
  const specialLangs = new Map([['lzh', 'Literary Chinese']]);
  const selectedLangs = displayedLanguages.filter(item => item.checked);

  const handleClickEvent = isSearchPage ? openTopSheetSearchOptions : openGeneralSearchOptions;

  if (selectedLangs.length === 0) {
    return html`
      <div class="selected-languages">
        <p>Searching in all document languages</p>
        <md-icon-button @click=${(e) => handleClickEvent(e)}>
          ${icon.language}
        </md-icon-button>
      </div>
    `;
  }

  selectedLangs.sort((a, b) => b.is_root - a.is_root);

  selectedLangs.forEach(item => {
    if (specialLangs.has(item.uid)) {
      item.name = specialLangs.get(item.uid);
    }
  });


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
