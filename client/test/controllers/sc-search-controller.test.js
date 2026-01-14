import {SCSearchController} from "../../elements/sc-search-controller";

import {assert} from '@esm-bundle/chai';

describe('SCSearchController', () => {
  it(`should fetch first time`, async () => {
    let controller = new SCSearchController([Response.json({response_num: 1})]);
    let result = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    assert.equal(result['response_num'], 1);
  });

  it(`should fetch if requestUrl changes`, async () => {
    let controller = new SCSearchController(
      [
        Response.json({response_num: 2}),
        Response.json({response_num: 1}),
      ]
    );
    let result_one = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    let result_two = await controller.fetchResult(`http://example.com/api/def`, ['en']);
    assert.equal(result_two['response_num'], 2);
  });

  it(`should fetch if selectedLanguages changes`, async () => {
    let controller = new SCSearchController(
      [
        Response.json({response_num: 2}),
        Response.json({response_num: 1}),
      ]
    );
    let result_one = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    let result_two = await controller.fetchResult(`http://example.com/api/abc`, ['en', 'pli']);
    assert.equal(result_two['response_num'], 2);
  });

  it(`should fetch if both change`, async () => {
    let controller = new SCSearchController(
      [
        Response.json({response_num: 2}),
        Response.json({response_num: 1}),
      ]
    );
    let result_one = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    let result_two = await controller.fetchResult(`http://example.com/api/def`, ['en', 'pli']);
    assert.equal(result_two['response_num'], 2);
  });
});