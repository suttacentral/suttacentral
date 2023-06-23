import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';

const shortcuts = [];
try {
  const allShortcuts = await (await fetch(`${API_ROOT}/shortcuts`)).json();
  if (allShortcuts && allShortcuts[0] && allShortcuts[0].shortcuts) {
    shortcuts.push(...allShortcuts[0].shortcuts);
  }
} catch (error) {
  console.error(error);
}

const pitakaGuide = new Map();
try {
  const guides = await (await fetch(`${API_ROOT}/guides`)).json();
  for (const guide of guides) {
    pitakaGuide.set(guide.text_uid, guide.guide_uid);
  }
} catch (error) {
  console.error(error);
}

export { pitakaGuide, shortcuts };

export const navIndex = new Map([
  ['home', { index: 0 }],
  ['sutta', { index: 99 }],
  ['staticPage', { index: 1 }],
  ['searchPage', { index: 1 }],
  ['languageDetail', { index: 2 }],
]);

export function setNavigation(navArray) {
  store.dispatch({
    type: 'SET_NAVIGATION',
    navigationArray: navArray,
  });
}

export function RefreshNavNew(uid) {
  if (!uid) {
    return;
  }
  const currentNav = store.getState().navigationArray;
  currentNav.length = 1;
  fetch(`${API_ROOT}/navigation_data/${uid}`)
    .then(r => r.json())
    .then(navigationData => {
      if (!navigationData) {
        return;
      }
      for (const nav of navigationData) {
        if (!currentNav.find(x => x.uid === nav.uid)) {
          currentNav.push(nav);
        }
      }
      setNavigation(currentNav);
    })
    .catch(error => {
      console.error(error);
    });
}
