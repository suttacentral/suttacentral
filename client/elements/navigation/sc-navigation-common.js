import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';

export const tipitakaGuide = new Map([
  ['Sutta', '/discourses'],
  ['Vinaya', '/vinaya'],
  ['Abhidhamma', '/abhidhamma'],
]);

export const pitakaGuide = new Map([
  ['dn', '/dn-guide-sujato'],
  ['mn', '/mn-guide-sujato'],
  ['sn', '/sn-guide-sujato'],
  ['an', '/an-guide-sujato'],
]);

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
]);

export const shortcuts = [
  'dn',
  'mn',
  'mn-mulapannasa',
  'mn-majjhimapannasa',
  'mn-uparipannasa',
  'sn1',
  'sn2',
  'sn3',
  'sn4',
  'sn5',
  'sn6',
  'sn7',
  'sn8',
  'sn9',
  'sn10',
  'sn11',
  'sn12',
  'sn13',
  'sn14',
  'sn15',
  'sn16',
  'sn17',
  'sn18',
  'sn19',
  'sn20',
  'sn21',
  'sn22',
  'sn23',
  'sn24',
  'sn25',
  'sn26',
  'sn27',
  'sn28',
  'sn29',
  'sn30',
  'sn31',
  'sn32',
  'sn33',
  'sn34',
  'sn35',
  'sn36',
  'sn37',
  'sn38',
  'sn39',
  'sn40',
  'sn41',
  'sn42',
  'sn43',
  'sn44',
  'sn45',
  'sn46',
  'sn47',
  'sn48',
  'sn49',
  'sn50',
  'sn51',
  'sn52',
  'sn53',
  'sn54',
  'sn55',
  'sn56',
  'an1',
  'an2',
  'an3',
  'an4',
  'an5',
  'an6',
  'an7',
  'an8',
  'an9',
  'an10',
  'an11',
  'ud',
  'iti',
  'snp',
  'vv',
  'pv',
  'thag-ekakanipata',
  'thag-dukanipata',
  'thag-tikanipata',
  'thag-catukkanipata',
  'thag-pancakanipata',
  'thag-chakkanipata',
  'thag-sattakanipata',
  'thag-atthakanipata',
  'thag-navakanipata',
  'thag-dasakanipata',
  'thag-ekadasakanipata',
  'thag-dvadasakanipata',
  'thag-terasanipata',
  'thag-cuddasakanipata',
  'thag-solasakanipata',
  'thag-visatinipata',
  'thag-timsanipata',
  'thag-cattalisanipata',
  'thag-pannasanipata',
  'thag-satthinipata',
  'thag-mahanipata',
  'ja-ekakanipata',
  'ja-dukanipata',
  'ja-tikanipata',
  'ja-catukkanipata',
  'ja-pancakanipata',
  'ja-chakkanipata',
  'ja-sattakanipata',
  'ja-atthakanipata',
  'ja-navakanipata',
  'ja-dasakanipata',
  'ja-ekadasakanipata',
  'ja-dvadasakanipata',
  'ja-terasakanipata',
  'ja-pakinnakanipata',
  'ja-visatinipata',
  'ja-timsanipata',
  'ja-cattalisanipata',
  'ja-pannasanipata',
  'ja-satthinipata',
  'ja-sattatinipata',
  'ja-asitinipata',
  'ja-mahanipata',
];

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

async function fetchMenuDataByUid(uid) {
  const url = `${API_ROOT}/menu/${uid}`;
  try {
    return await (await fetch(url)).json();
  } catch (e) {
    return null;
  }
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

async function genNavDetail(uid, navType, currentURL, navArray) {
  const menuData = await fetchMenuDataByUid(uid);
  if (!menuData || !menuData[0].uid) {
    return;
  }
  const navIndexesOfType = navIndex.get(navType);
  const acronym = navType === 'pitaka' ? menuData[0].acronym.toLowerCase() : menuData[0].acronym;
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
}

async function fetchSuttaFullPath(uid) {
  try {
    return await (await fetch(`${API_ROOT}/suttafullpath/${uid}`)).json();
  } catch (e) {
    return null;
  }
}

export async function RefreshNav(uid) {
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

  const fatherLevelExists = currentNav.some(x => x !== null && x.groupId === URLs[URLs.length - 1]);
  if (fatherLevelExists) {
    return;
  }

  for (const index of currentNav.keys()) {
    if (index > 0) {
      currentNav[index] = null;
    }
  }

  for (const [index, value] of URLs.entries()) {
    if (index > 1) {
      const navType = getNavTypeByNavIndex(index);
      currentURL = `${currentURL}/${value}`;
      await genNavDetail(value, navType, currentURL, currentNav);
    }
  }
  setNavigation(currentNav);
}
