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

const lastRunDateText = '2024-08-15T17:00:22Z';
export const publicationLastGeneratedDate = lastRunDateText;
export const publicationLastGeneratedFormattedDate = formatDate(publicationLastGeneratedDate);
export const editionsGithubUrl = 'https://github.com/suttacentral/editions/raw/main';
export const editionsGithubRawUrl = 'https://raw.githubusercontent.com/suttacentral/editions/main';

export const lastUpdatedDateOfCollections = new Map([
  ['dn-epub', '2025-01-20'],
  ['dn-html', '2025-01-20'],
  ['dn-tex', '2025-01-20'],
  ['dn-pdf', '2025-01-20'],
  ['mn-epub', '2025-01-20'],
  ['mn-html', '2025-01-20'],
  ['mn-tex', '2025-01-20'],
  ['mn-pdf', '2025-01-20'],
  ['sn-epub', '2025-01-20'],
  ['sn-html', '2025-01-20'],
  ['sn-tex', '2025-01-20'],
  ['sn-pdf', '2025-01-20'],
  ['an-epub', '2025-01-20'],
  ['an-html', '2025-01-20'],
  ['an-tex', '2025-01-20'],
  ['an-pdf', '2025-01-20'],
  ['dhp-epub', '2025-01-20'],
  ['dhp-html', '2025-01-20'],
  ['dhp-tex', '2025-01-20'],
  ['dhp-pdf', '2025-01-20'],
  ['ud-epub', '2025-01-20'],
  ['ud-html', '2025-01-20'],
  ['ud-tex', '2025-01-20'],
  ['ud-pdf', '2025-01-20'],
  ['iti-epub', '2025-01-20'],
  ['iti-html', '2025-01-20'],
  ['iti-tex', '2025-01-20'],
  ['iti-pdf', '2025-01-20'],
  ['snp-epub', '2025-01-20'],
  ['snp-html', '2025-01-20'],
  ['snp-tex', '2025-01-20'],
  ['snp-pdf', '2025-01-20'],
  ['thag-epub', '2025-01-20'],
  ['thag-html', '2025-01-20'],
  ['thag-tex', '2025-01-20'],
  ['thag-pdf', '2025-01-20'],
  ['thig-epub', '2025-01-20'],
  ['thig-html', '2025-01-20'],
  ['thig-tex', '2025-01-20'],
  ['thig-pdf', '2025-01-20'],
  ['pli-tv-vi-epub', '2025-01-20'],
  ['pli-tv-vi-html', '2025-01-20'],
  ['pli-tv-vi-tex', '2025-01-20'],
  ['pli-tv-vi-pdf', '2025-01-20'],
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
