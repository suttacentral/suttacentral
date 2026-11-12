import { expect } from '@open-wc/testing';
import { render } from 'lit';

import { SCParallelItem } from '../../elements/suttaplex/card/sc-parallel-item.js';
import { getRangeMemberAcronym, getRangeMemberUid } from '../../utils/suttaplex.js';

const renderTemplate = template => {
  const container = document.createElement('div');
  render(template, container);
  return container;
};

describe('Parallels to a sutta inside a range text', () => {
  it('finds the sutta a parallel points to inside a range', () => {
    expect(getRangeMemberUid('an2.32-41', 'an2.36')).to.equal('an2.36');
    expect(getRangeMemberUid('an2.32-41', 'an2.36#2.1')).to.equal('an2.36');
    expect(getRangeMemberUid('dhp146-156', '~dhp147')).to.equal('dhp147');
    expect(getRangeMemberUid('pli-tv-bi-vb-pj1-4', 'pli-tv-bi-vb-pj2')).to.equal(
      'pli-tv-bi-vb-pj2'
    );
  });

  it('ignores parallels to the text itself or outside the range', () => {
    expect(getRangeMemberUid('an2.36', 'an2.36')).to.equal('');
    expect(getRangeMemberUid('sn13.4', 'sn13.1')).to.equal('');
    expect(getRangeMemberUid('an2.32-41', 'an2.42')).to.equal('');
    expect(getRangeMemberUid('an2.32-41', 'an3.36')).to.equal('');
    expect(getRangeMemberUid('lzh-mi-bi-pm-pc1-3', 'lzh')).to.equal('');
  });

  it('builds the acronym of the sutta from the range acronym', () => {
    expect(getRangeMemberAcronym('an2.32-41', 'AN 2.32–41', 'an2.36')).to.equal('AN 2.36');
    expect(getRangeMemberAcronym('dhp146-156', 'Dhp 146–156', 'dhp147')).to.equal('Dhp 147');
    expect(getRangeMemberAcronym('g3dhp1-10', 'G3-Dhp 1–10', 'g3dhp1')).to.equal('G3-Dhp 1');
    expect(getRangeMemberAcronym('an2.32-41', 'AN 2.32–41', 'an2.32-41')).to.equal('');
    expect(getRangeMemberAcronym('an2.32-41', null, 'an2.36')).to.equal('');
  });

  const renderParallel = to => {
    const parallelItem = new SCParallelItem();
    parallelItem.expansionData = [{ an: ['AN', 'Aṅguttara Nikāya'] }];
    parallelItem.parallelItem = {
      acronym: 'AN 2.32–41',
      original_title: 'Samacittavagga',
      to,
      translations: [],
      uid: 'an2.32-41',
    };
    return renderTemplate(parallelItem.normalViewTemplate()).textContent;
  };

  it('shows MA 21 as a parallel to AN 2.36, not to AN 2.32–41', () => {
    const text = renderParallel('an2.36');
    expect(text).to.include('AN 2.36');
    expect(text).not.to.include('AN 2.32–41');
  });

  it('keeps the segment of a sutta inside a range', () => {
    expect(renderParallel('an2.36#2.1')).to.include('AN 2.36: 2.1');
  });

  it('still shows the range acronym for a parallel to the whole range', () => {
    expect(renderParallel('an2.32-41')).to.include('AN 2.32–41');
  });
});
