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

// const lastActionRunDateUrl =
//   'https://raw.githubusercontent.com/suttacentral/editions/main/last_run_date';
// const response = await fetch(lastActionRunDateUrl);
// const lastRunDateText = await response.text();
const lastRunDateText = '2023-12-04T09:19:38Z';
export const publicationLastGeneratedDate = lastRunDateText;
export const publicationLastGeneratedFormattedDate = formatDate(publicationLastGeneratedDate);

export const lastUpdatedDateOfCollections = new Map([
  ['dn-epub', '2024-04-15'],
  ['dn-html', '2024-04-15'],
  ['dn-tex', '2024-04-15'],
  ['dn-pdf', '2024-04-15'],
  ['mn-epub', '2024-04-15'],
  ['mn-html', '2024-04-15'],
  ['mn-tex', '2023-10-30'],
  ['mn-pdf', '2023-10-30'],
  ['sn-epub', '2024-04-15'],
  ['sn-html', '2024-04-15'],
  ['sn-tex', '2024-04-15'],
  ['sn-pdf', '2024-04-15'],
  ['an-epub', '2024-04-15'],
  ['an-html', '2024-04-15'],
  ['an-tex', '2024-04-15'],
  ['an-pdf', '2024-04-15'],
  ['dhp-epub', '2024-04-15'],
  ['dhp-html', '2024-04-15'],
  ['dhp-tex', '2024-04-15'],
  ['dhp-pdf', '2024-04-15'],
  ['ud-epub', '2024-04-15'],
  ['ud-html', '2024-04-15'],
  ['ud-tex', '2024-04-15'],
  ['ud-pdf', '2024-04-15'],
  ['iti-epub', '2024-04-15'],
  ['iti-html', '2024-04-15'],
  ['iti-tex', '2024-04-15'],
  ['iti-pdf', '2024-04-15'],
  ['snp-epub', '2024-04-15'],
  ['snp-html', '2024-04-15'],
  ['snp-tex', '2023-10-30'],
  ['snp-pdf', '2023-10-30'],
  ['thag-epub', '2024-04-15'],
  ['thag-html', '2024-04-15'],
  ['thag-tex', '2024-04-15'],
  ['thag-pdf', '2024-04-15'],
  ['thig-epub', '2024-04-15'],
  ['thig-html', '2024-04-15'],
  ['thig-tex', '2024-04-15'],
  ['thig-pdf', '2024-04-15'],
  ['pli-tv-vi-epub', '2023-12-11'],
  ['pli-tv-vi-html', '2023-12-11'],
  ['pli-tv-vi-tex', '2023-12-11'],
  ['pli-tv-vi-pdf', '2023-12-11'],
]);

export const editionsGithubUrl = 'https://github.com/suttacentral/editions/raw/main';
export const editionsGithubRawUrl = 'https://raw.githubusercontent.com/suttacentral/editions/main';

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
