export function transformId(rootId, expansionData, idOrName = 0) {
  if (!rootId || !expansionData) {
    return '';
  }
  try {
    rootId = rootId.replace('~', '');
    if (rootId.substring(0, 5) === 'g3dhp') {
      const idNumbers = rootId.substring(5);
      return `G-3 Dhp ${idNumbers}`;
    }
    const idPart = getParagraphRange(rootId).replace('--', '–').replace('#', ': ');
    let scAcronym = '';
    const rootPart = rootId.split('#')[0];
    const uidParts = rootPart.split('-');
    let tail = '';
    uidParts.forEach(item => {
      if (!expansionData[0][item]) {
        const tailMatch = item.match(/\d+.*/g);
        tailMatch ? (tail = tailMatch[0] + '–') : tail;
        const itemMatch = item.match(/[a-z]*/g);
        itemMatch ? (item = itemMatch[0]) : item;
      }
      if (item && expansionData[0][item]) {
        scAcronym += `${expansionData[0][item][idOrName]} ${tail}`;
      } else {
        scAcronym += tail;
      }
    });
    scAcronym = scAcronym.replace(/–\s*$/, '');
    scAcronym = scAcronym.replaceAll('-', '–');

    return `${scAcronym}${idPart}`;
  } catch (e) {
    return rootId;
  }
}

export function getParagraphRange(toParallel, isUrl) {
  if (!toParallel) {
    return '';
  }

  if (toParallel.match(/dhp/g) && isUrl) {
    const ids = toParallel.substring(toParallel.indexOf('dhp') + 3);
    if (ids.includes('-')) {
      const [id1, id2] = ids.split('-');
      return `#${id1}--${id2}`;
    }
    return `#${ids}`;
  } else {
    const ids = toParallel.split(/#(.*)/)[1];
    if (!ids) {
      return '';
    }
    if (ids.includes('-')) {
      const [id1, id2] = ids.split('-#');
      return `#${id1}--${id2}`;
    }
    return `#${ids}`;
  }
}

// A parallel can point to one sutta of a range text, e.g. to an2.36 in the text an2.32-41.
// Returns the uid of that sutta ("an2.36"), or '' when the parallel points to the text itself.
export function getRangeMemberUid(uid, toParallel) {
  const range = uid?.match(/^(.*?)(\d+)-(\d+)$/);
  const memberUid = toParallel?.replace('~', '').split('#')[0];
  const member = memberUid?.match(/^(.*?)(\d+)$/);
  if (!range || !member || member[1] !== range[1]) {
    return '';
  }
  const number = Number(member[2]);
  return number >= Number(range[2]) && number <= Number(range[3]) ? memberUid : '';
}

// The acronym of that sutta, built from the range's acronym: "AN 2.32–41" -> "AN 2.36".
export function getRangeMemberAcronym(uid, acronym, toParallel) {
  const memberUid = getRangeMemberUid(uid, toParallel);
  if (!memberUid || !acronym) {
    return '';
  }
  const [, first, last] = uid.match(/(\d+)-(\d+)$/);
  const rangeAcronym = acronym.split('//')[0];
  const rangeEnd = `${first}–${last}`;
  if (!rangeAcronym.endsWith(rangeEnd)) {
    return '';
  }
  return `${rangeAcronym.slice(0, -rangeEnd.length)}${memberUid.match(/\d+$/)[0]}`;
}

const PTS1 = 'pts-vp-pli1ed',
  PTS2 = 'pts-vp-pli2ed';

export function pickVolPage(volpages) {
  if (typeof volpages === 'string') {
    return volpages;
  } else if (volpages instanceof Object && Object.values(volpages).length) {
    if (volpages[PTS2]) return volpages[PTS2];
    if (volpages[PTS1]) return volpages[PTS1];
    return Object.values(volpages)[0];
  } else {
    return '';
  }
}

export function hasTwoPTSEditions(volpages) {
  return (
    volpages instanceof Object &&
    volpages[PTS1] &&
    volpages[PTS2] &&
    volpages[PTS1] !== volpages[PTS2]
  );
}

export function volPagesToString(volpages) {
  if (typeof volpages === 'string') {
    return volpages;
  } else if (hasTwoPTSEditions(volpages)) {
    return `${volpages[PTS1]}; ${volpages[PTS2]}`;
  } else if (volpages instanceof Object) {
    return Array.from(new Set(Object.values(volpages))).join('; ');
  } else {
    return '';
  }
}

export function formatVolPages(volPages) {
  return volPages.replace('PTS (1st ed)', '').replace('PTS (2nd ed)', '').replace('PTS', '');
}
