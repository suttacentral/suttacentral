import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';

let shortcuts = [];
try {
  shortcuts = await (await fetch(`${API_ROOT}/shortcuts`)).json();
} catch (error) {
  console.log(error);
}

const pitakaGuide = new Map();
try {
  let guides = await (await fetch(`${API_ROOT}/guides`)).json();
  for (const guide of guides) {
    pitakaGuide.set(guide.text_uid, guide.guide_uid);
  }
} catch (error) {
  console.log(error);
}

export { pitakaGuide, shortcuts };

export const navIndex = new Map([
  [ 'home', { index: 0 } ],
  [ 'sutta', { index: 99 } ],
  [ 'staticPage', { index: 1 } ],
  [ 'searchPage', { index: 1 } ],
  [ 'languageDetail', { index: 2 } ]
]);

export function setNavigation(navArray) {
  store.dispatch({
    type: 'SET_NAVIGATION',
    navigationArray: navArray,
  });
}

function genNavDetailNew(uid, currentURL, data, navArray, navIndex) {
  data
    ?.json()
    .then(menuData => {
      if (!menuData || !menuData[0].uid) {
        return;
      }
      const acronym = menuData[0].acronym;
      const hasChildren =
        menuData[0] &&
        menuData[0].children &&
        menuData[0].children.some(child => ['branch'].includes(child.node_type));
      if (!hasChildren) {
        currentURL = `/${uid}`;
      }
      if (!navArray.find(x => x.uid === uid) && menuData[0].node_type !== 'leaf') {
        navArray.push({
          uid: uid,
          title: acronym || menuData[0].translated_name || menuData[0].root_name,
          url: currentURL,
          index: navIndex,
        });
        navArray.sort(sortData);
        setNavigation(navArray);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function sortData(a, b) {
  return a.index - b.index;
}

export function RefreshNavNew(uid, forceRefresh) {
  if (!uid) {
    return;
  }
  fetch(`${API_ROOT}/suttafullpath/${uid}`)
    .then(r => r.json())
    .then(suttaFullPath => {
      if (!suttaFullPath || !suttaFullPath.full_path) {
        return;
      }
      let URLs = `${suttaFullPath.full_path}/${uid}`.split('/');
      const currentNav = store.getState().navigationArray;

      currentNav.length = 1;

      const fetchPromises = [];
      for (const [index, value] of URLs.entries()) {
        if (index > 1) {
          const url = `${API_ROOT}/menu/${value}?language=${store.getState().siteLanguage || 'en'}`;
          fetchPromises.push(fetch(url));
        }
      }

      let currentURL = '/pitaka';
      let fetchPromiseIndex = 0;
      let navIndex = 1;
      Promise.all(fetchPromises)
        .then(values => {
          for (const [index, value] of URLs.entries()) {
            if (index > 1) {
              currentURL = `${currentURL}/${value}`;
              genNavDetailNew(value, currentURL, values[fetchPromiseIndex], currentNav, navIndex);
              fetchPromiseIndex = fetchPromiseIndex + 1;
              navIndex = navIndex + 1;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
}
