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
    const idPart = getParagraphRange(rootId).replace('--', '–').replace('#', ': ').replace(/[a-z]+/g,'');
    let scAcronym = '';
    const rootPart = rootId.split('#')[0];
    const uidParts = rootPart.split('-');
    let tail = '';
    uidParts.forEach(item => {
      if (!expansionData[0][item]) {
        const tailMatch = item.match(/\d+.*/g);
        tailMatch ? tail = tailMatch[0] + '–' : tail;
        const itemMatch = item.match(/[a-z]*/g);
        itemMatch ? item = itemMatch[0] : item;
      }
      if (item && expansionData[0][item]) {
        scAcronym += `${expansionData[0][item][idOrName]} ${tail}`
      } else {
        scAcronym += tail;
      }
    });
    scAcronym = scAcronym.replace(/–\s*$/, '');

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

