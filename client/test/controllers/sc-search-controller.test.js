import { SCSearchController} from "../../elements/sc-search-controller";

import { assert } from '@esm-bundle/chai';

describe('SCSearchController', () => {
  it(`should fetch stubbed results`, async () => {
    let controller = new SCSearchController();
    controller.stubbedResult('some response');
    let result = await controller.fetchResult(
      `http://localhost/api/search/instant?limit=50&query=ghosts&language=en&restrict=all&matchpartial=false`,
      `['en', 'pli']`
    );
    assert.equal(result, 'some response');
  })
});