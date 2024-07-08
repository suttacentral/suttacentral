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
  ['pli-tv-vi', 'pli-tv-vi-book.jpg'],
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

const lastRunDateText = '2024-05-20T00:43:22Z';
export const publicationLastGeneratedDate = lastRunDateText;
export const publicationLastGeneratedFormattedDate = formatDate(publicationLastGeneratedDate);
export const editionsGithubUrl = 'https://github.com/suttacentral/editions/raw/main';
export const editionsGithubRawUrl = 'https://raw.githubusercontent.com/suttacentral/editions/main';

export const lastUpdatedDateOfCollections = new Map([
  ['dn-epub', '2024-07-08'],
  ['dn-html', '2024-07-08'],
  ['dn-tex', '2024-07-08'],
  ['dn-pdf', '2024-07-08'],
  ['mn-epub', '2024-07-08'],
  ['mn-html', '2024-07-08'],
  ['mn-tex', '2023-10-30'],
  ['mn-pdf', '2023-10-30'],
  ['sn-epub', '2024-07-08'],
  ['sn-html', '2024-07-08'],
  ['sn-tex', '2024-07-08'],
  ['sn-pdf', '2024-07-08'],
  ['an-epub', '2024-07-08'],
  ['an-html', '2024-07-08'],
  ['an-tex', '2024-07-08'],
  ['an-pdf', '2024-07-08'],
  ['dhp-epub', '2024-07-08'],
  ['dhp-html', '2024-07-08'],
  ['dhp-tex', '2024-07-08'],
  ['dhp-pdf', '2024-07-08'],
  ['ud-epub', '2024-07-08'],
  ['ud-html', '2024-07-08'],
  ['ud-tex', '2024-07-08'],
  ['ud-pdf', '2024-07-08'],
  ['iti-epub', '2024-07-08'],
  ['iti-html', '2024-07-08'],
  ['iti-tex', '2024-07-08'],
  ['iti-pdf', '2024-07-08'],
  ['snp-epub', '2024-07-08'],
  ['snp-html', '2024-07-08'],
  ['snp-tex', '2023-10-30'],
  ['snp-pdf', '2023-10-30'],
  ['thag-epub', '2024-07-08'],
  ['thag-html', '2024-07-08'],
  ['thag-tex', '2024-07-08'],
  ['thag-pdf', '2024-07-08'],
  ['thig-epub', '2024-05-27'],
  ['thig-html', '2024-05-27'],
  ['thig-tex', '2024-05-27'],
  ['thig-pdf', '2024-05-27'],
  ['pli-tv-vi-epub', '2023-12-11'],
  ['pli-tv-vi-html', '2023-12-11'],
  ['pli-tv-vi-tex', '2023-12-11'],
  ['pli-tv-vi-pdf', '2023-12-11'],
]);

let allEditions = [];
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
export { allEditions };

let creatorBio = [];
try {
  creatorBio = await (await fetch(`${API_ROOT}/creator_bio`)).json();
} catch (error) {
  console.log(error);
}
export { creatorBio };
