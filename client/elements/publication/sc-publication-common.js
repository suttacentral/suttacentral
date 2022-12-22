import { API_ROOT } from '../../constants';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

export const coverImage = new Map([
  ['dn', 'dn-book.jpg'],
  ['mn', 'mn-book.jpg'],
  ['sn', 'sn-book.jpg'],
  ['an', 'an-book.jpg'],
  ['dhp', 'dhp-book.jpg'],
  ['ud', 'ud-book.jpg'],
  ['iti', 'iti-book.jpg'],
  ['snp', 'snp-book.jpg'],
  ['thag', 'thag-book.jpg'],
  ['thig', 'thig-book.jpg'],
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
  return date.split('T')[0];
}

const lastActionRunDateUrl =
  'https://raw.githubusercontent.com/suttacentral/editions/main/last_run_date';
const response = await fetch(lastActionRunDateUrl);
const lastRunDateText = await response.text();
export const publicationLastGeneratedDate = lastRunDateText;
export const publicationLastGeneratedFormattedDate = formatDate(publicationLastGeneratedDate);

export const lastUpdatedDateOfCollections = new Map([
  ['dn', '2022-12-15'],
  ['mn', '2022-12-15'],
  ['sn', publicationLastGeneratedFormattedDate],
  ['an', '2022-12-15'],
  ['dhp', '2022-12-15'],
  ['ud', '2022-12-15'],
  ['iti', '2022-12-15'],
  ['snp', '2022-12-21'],
  ['thag', '2022-12-15'],
  ['thig', '2022-12-15'],
]);

export const editionsGithubUrl = 'https://github.com/suttacentral/editions/raw/main';
export const editionsGithubRawUrl = 'https://raw.githubusercontent.com/suttacentral/editions/main';

let allEditions = [];
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
    }
  } catch (error) {
    console.log(error);
  }
}
export { allEditions };

let creatorBio = [];
try {
  creatorBio = await (await fetch(`${API_ROOT}/creator_bio`)).json();
} catch (error) {
  console.log(error);
}
export { creatorBio };
