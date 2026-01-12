import { SCSearchController} from "../../elements/sc-search-controller";

import { assert } from '@esm-bundle/chai';

const FIRST_RESPONSE = Response.json({ response_num: 1 });

describe('SCSearchController', () => {
  it(`should fetch first time`, async () => {
    let response = Response.json({ response_num: 1 });
    let controller = new SCSearchController();
    controller.stubbedResponse(response);
    let result = await controller.fetchResult(`http://example.com/api/abc`, `['en']`);
    assert.equal(result['response_num'], 1);
  })
});