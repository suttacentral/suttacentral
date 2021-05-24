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
  [
    'home',
    {
      index: 0,
      position: 0,
      pathParamIndex: 2,
      navArrayLength: 1,
    },
  ],
  [
    'pitaka',
    {
      index: 1,
      position: 1,
      pathParamIndex: 2,
      navArrayLength: 2,
    },
  ],
  [
    'parallels',
    {
      index: 2,
      position: 2,
      pathParamIndex: 2,
      navArrayLength: 3,
    },
  ],
  [
    'vaggas',
    {
      index: 3,
      position: 3,
      pathParamIndex: 2,
      navArrayLength: 4,
    },
  ],
  [
    'vagga',
    {
      index: 4,
      position: 4,
      pathParamIndex: -1,
      navArrayLength: 5,
    },
  ],
  [
    'vaggaChildren',
    {
      index: 5,
      position: 5,
      pathParamIndex: -1,
      navArrayLength: 6,
    },
  ],
  [
    'vaggaChildrenChildren',
    {
      index: 6,
      position: 6,
      pathParamIndex: -1,
      navArrayLength: 7,
    },
  ],
  [
    'sakaChildren',
    {
      index: 7,
      position: 7,
      pathParamIndex: -1,
      navArrayLength: 8,
    },
  ],
  [
    'sutta',
    {
      index: 8,
      position: 8,
      pathParamIndex: -1,
      navArrayLength: 9,
    },
  ],
  [
    'staticPage',
    {
      index: 1,
      position: 1,
      pathParamIndex: -1,
      navArrayLength: 2,
    },
  ],
  [
    'searchPage',
    {
      index: 1,
      position: 1,
      pathParamIndex: -1,
      navArrayLength: 2,
    },
  ],
  [
    'languageDetail',
    {
      index: 2,
      position: 2,
      pathParamIndex: -1,
      navArrayLength: 3,
    },
  ],
]);

function getNavTypeByNavIndex(index) {
  const navTypes = new Map([
    [2, 'pitaka'],
    [3, 'parallels'],
    [4, 'vaggas'],
    [5, 'vagga'],
    [6, 'vaggaChildren'],
    [7, 'vaggaChildrenChildren'],
    [8, 'sakaChildren'],
  ]);
  return navTypes.get(index);
}

export function setNavigation(navArray) {
  store.dispatch({
    type: 'SET_NAVIGATION',
    navigationArray: navArray,
  });
}

export function setCurrentNavPosition(position) {
  store.dispatch({
    type: 'CHANGE_CURRENT_NAV_POSITION_STATE',
    currentNavPosition: position,
  });
}

async function genNavDetail(uid, navType, currentURL) {
  const navArray = store.getState().navigationArray;
  const url = `${API_ROOT}/menu/${uid}?language=${store.getState().siteLanguage || 'en'}`;
  fetch(url)
    .then(r => r.json())
    .then(menuData => {
      if (!menuData || !menuData[0].uid) {
        return;
      }
      const navIndexesOfType = navIndex.get(navType);
      const acronym =
        navType === 'pitaka' ? menuData[0].acronym.toLowerCase() : menuData[0].acronym;
      navArray[navIndexesOfType.index] = {
        title: acronym || menuData[0].translated_name || menuData[0].root_name,
        url: currentURL,
        type: navType,
        groupId: menuData[0].uid,
        groupName: menuData[0].root_name,
        position: navIndexesOfType.position,
        navigationArrayLength: navIndexesOfType.navArrayLength,
        displayPitaka: navType === 'pitaka',
        displayParallels: navType === 'parallels',
        displayVaggas: navType === 'vaggas',
        displayVaggaChildren: navType === 'vagga',
        displayVaggaChildrenChildren: navType === 'vaggaChildren',
      };
      setNavigation(navArray);
    })
    .catch(e => console.error(e));
}

async function fetchSuttaFullPath(uid) {
  try {
    return await (await fetch(`${API_ROOT}/suttafullpath/${uid}`)).json();
  } catch (e) {
    return null;
  }
}

export async function RefreshNav(uid, forceRefresh) {
  if (!uid) {
    return;
  }
  const suttaFullPath = await fetchSuttaFullPath(uid);
  if (!suttaFullPath || !suttaFullPath.full_path) {
    return;
  }
  const URLs = suttaFullPath.full_path.split('/');
  let currentURL = '/pitaka';
  const currentNav = store.getState().navigationArray;

  const truePathLength = URLs.filter(x => x !== null && x !== '' && x !== 'pitaka').length;
  const navSuttaPathLength = currentNav.filter(
    x => x != null && x.groupId !== uid && x.type !== 'home'
  ).length;

  const fatherLevelExists = currentNav.some(x => x !== null && x.groupId === URLs[URLs.length - 1]);
  if (fatherLevelExists && navSuttaPathLength === truePathLength && !forceRefresh) {
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const index of currentNav.keys()) {
    if (index > 0) {
      currentNav[index] = null;
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [index, value] of URLs.entries()) {
    if (index > 1) {
      const navType = getNavTypeByNavIndex(index);
      currentURL = `${currentURL}/${value}`;
      // eslint-disable-next-line no-await-in-loop
      await genNavDetail(value, navType, currentURL);
    }
  }
}
