import { expect } from '@open-wc/testing';
import { render } from 'lit';

import { SCParallelItem } from '../../elements/suttaplex/card/sc-parallel-item.js';
import { SCSuttaplex } from '../../elements/suttaplex/card/sc-suttaplex.js';

const renderTemplate = template => {
  const container = document.createElement('div');
  render(template, container);
  return container;
};

describe('Suttaplex alternative acronyms', () => {
  it('displays SN 271 next to SN 11.25 in the suttaplex nerdy row', () => {
    const suttaplex = new SCSuttaplex();
    suttaplex.item = {
      acronym: 'SN 11.25',
      alt_acronym: 'SN 271',
      translated_title: 'Do Not Be Angry',
      uid: 'sn11.25',
    };

    const container = renderTemplate(suttaplex.nerdyRowTemplate);

    expect(container.textContent).to.include('SN 11.25');
    expect(container.textContent).to.include('SN 271');
  });

  it('does not display an alternative acronym when none is available', () => {
    const suttaplex = new SCSuttaplex();
    suttaplex.item = {
      acronym: 'MN 1',
      alt_acronym: null,
      translated_title: 'The Root of All Things',
      uid: 'mn1',
    };

    const container = renderTemplate(suttaplex.nerdyRowTemplate);

    expect(container.textContent).to.include('MN 1');
    expect(container.textContent).not.to.include('null');
  });

  it('displays SN 271 next to SN 11.25 in a parallel nerdy row', () => {
    const parallelItem = new SCParallelItem();
    parallelItem.expansionData = [{}];
    parallelItem.parallelItem = {
      acronym: 'SN 11.25',
      alt_acronym: 'SN 271',
      translated_title: 'Do Not Be Angry',
      to: 'sn11.25',
      translations: [],
      uid: 'sn11.25',
    };

    const container = renderTemplate(parallelItem.normalViewTemplate());

    expect(container.textContent).to.include('SN 11.25');
    expect(container.textContent).to.include('SN 271');
  });
});

for (const Component of [SCSuttaplex, SCParallelItem]) {
  describe(`${Component.name} acronym tooltips`, () => {
    const renderCard = (overrides = {}, translations = {}) => {
      const card = new Component();
      card.expansionData = [{ sn: ['SN', 'Saṁyutta Nikāya'] }];
      card.__resources = {
        'suttaplex:suttaCentralID': 'SuttaCentral ID',
        'suttaplex:alternateText': 'Alternate number in {book} edition:',
        ...translations,
      };
      const item = {
        acronym: 'SN 11.25',
        alt_acronym: 'SN 271',
        translated_title: 'Do Not Be Angry',
        uid: 'sn11.25',
        to: 'sn11.25',
        translations: [],
        ...overrides,
      };
      if (Component === SCSuttaplex) {
        card.item = item;
        return renderTemplate(card.nerdyRowTemplate);
      }
      card.parallelItem = item;
      return renderTemplate(card.normalViewTemplate());
    };

    const findLabel = (container, text) =>
      [...container.querySelectorAll('.nerdy-row-element')].find(
        element => element.textContent.trim() === text
      );

    it('gives the alternate ID its own neutral fallback tooltip', () => {
      const container = renderCard();

      expect(findLabel(container, 'SN 11.25').title).to.equal('SuttaCentral ID');
      expect(findLabel(container, 'SN 271').title).to.equal('Alternate ID');
    });

    it('uses the localized alternate ID tooltip without inferring an edition', () => {
      const container = renderCard(
        { alt_acronym: 'Other 271' },
        { 'suttaplex:alternateID': '替代编号' }
      );

      expect(findLabel(container, 'Other 271').title).to.equal('替代编号');
    });

    it('preserves the legacy double-slash tooltip alongside an alternate ID', () => {
      const container = renderCard({ acronym: 'DA 1//T 1', alt_acronym: 'Other 1' });

      expect(findLabel(container, 'DA 1').title).to.equal(
        'SuttaCentral ID\nAlternate number in Taishō edition: T 1'
      );
      expect(findLabel(container, 'Other 1').title).to.equal('Alternate ID');
    });

    it('keeps the alternate tooltip when the main acronym falls back to the UID', () => {
      const container = renderCard({ acronym: null });

      expect(findLabel(container, 'SN 11.25').title).to.equal('SuttaCentral ID');
      expect(findLabel(container, 'SN 271').title).to.equal('Alternate ID');
    });
  });
}
