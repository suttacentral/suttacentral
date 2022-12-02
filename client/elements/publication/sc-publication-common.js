import { API_ROOT } from '../../constants';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

export const coverImage = new Map([
  ['dn', 'dn-book.jpg'],
  ['mn', 'mn-book.jpg'],
  ['sn', 'sn-book.jpg'],
  ['an', 'an-book.jpg'],
  ['dhp', 'snp-book.jpg'],
  ['ud', 'snp-book.jpg'],
  ['iti', 'snp-book.jpg'],
  ['snp', 'snp-book.jpg'],
  ['thag', 'snp-book.jpg'],
  ['thig', 'snp-book.jpg'],
  ['pli-tv-vi', 'snp-book.jpg'],
]);

export const collectionURL = new Map([
  ['dn', '/pitaka/sutta/long/dn'],
  ['mn', '/pitaka/sutta/middle/mn'],
  ['sn', '/pitaka/sutta/linked/sn'],
  ['an', '/pitaka/sutta/numbered/an'],
  ['dhp', '/dhp'],
  ['ud', '/pitaka/sutta/minor/kn/ud'],
  ['iti', '/pitaka/sutta/minor/kn/iti'],
  ['snp', '/pitaka/sutta/minor/kn/snp'],
  ['thag', '/pitaka/sutta/minor/kn/thag'],
  ['thig', '/pitaka/sutta/minor/kn/thig'],
  ['pli-tv-vi', '/pitaka/vinaya/pli-tv-vi'],
]);

function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

export const publicationLastGeneratedDate = '2022-11-22T09:00:00Z';
export const publicationLastGeneratedFormattedDate = formatDate(publicationLastGeneratedDate);
export const editionsGithubUrl = 'https://github.com/suttacentral/editions/raw/main';
export const editionsGithubRawUrl = 'https://raw.githubusercontent.com/suttacentral/editions/main';

let allEditions = [];
let editionId = '';
const { editionUid } = store.getState().currentRoute.params;
if (editionUid) {
  try {
    allEditions = await (await fetch(`${API_ROOT}/publication/editions`)).json();
    if (allEditions && allEditions.length > 0) {
      for (const edition of allEditions) {
        if (edition.edition_id?.substring(0, 9) === 'pli-tv-vi') {
          edition.uid = 'pli-tv-vi';
        } else {
          edition.uid = edition.edition_id?.split('-')[0];
        }
      }
      editionId = allEditions.find(
        x => x.uid === editionUid && x.edition_id?.includes('web')
      )?.edition_id;
      if (editionId) {
        reduxActions.changeCurrentEditionId(editionId);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export { allEditions, editionId };

let creatorBio = [];
try {
  creatorBio = await (await fetch(`${API_ROOT}/creator_bio`)).json();
} catch (error) {
  console.log(error);
}
export { creatorBio };

let editionDetail = [];
try {
  editionDetail = await (await fetch(`${API_ROOT}/menu/${editionUid}`)).json();
} catch (error) {
  console.log(error);
}
export { editionDetail };

let editionInfo = {};
if (editionId) {
  try {
    editionInfo = await (await fetch(`${API_ROOT}/publication/edition/${editionId}`)).json();
    if (editionDetail && editionDetail.length !== 0) {
      reduxActions.changeToolbarTitle(
        `${editionDetail[0].root_name} — ${editionInfo.publication.creator_name}`
      );
      reduxActions.changeCurrentEditionHomeInfo({
        title: editionDetail[0]?.translated_name?.replace('Collection', ''),
        url: `/edition/${editionUid}/${store.getState().currentRoute.params.langIsoCode}/${
          store.getState().currentRoute.params.authorUid
        }`,
        root_title: editionDetail[0].root_name,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export { editionInfo };
