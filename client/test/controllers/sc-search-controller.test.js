import {SCSearchController} from "../../elements/sc-search-controller";

import {assert} from '@esm-bundle/chai';

const FIRST_RESPONSE = Response.json({ response_num: 1 });

describe('SCSearchController', () => {
  it(`should fetch first time`, async () => {
    let controller = new SCSearchController();
    controller.stubbedResponse(Response.json({response_num: 1}));
    let result = await controller.fetchResult(`http://example.com/api/abc`, `['en']`);
    assert.equal(result['response_num'], 1);
  });

  it(`should fetch if requestUrl changes`, async () => {
    let controller = new SCSearchController();
    controller.stubbedResponse(Response.json({response_num: 1}));
    let result_one = await controller.fetchResult(`http://example.com/api/abc`, `['en']`);
    controller.stubbedResponse(Response.json({response_num: 2}));
    let result_two = await controller.fetchResult(`http://example.com/api/def`, `['en']`);
    assert.equal(result_two['response_num'], 2);
  });
});