import {SCSearchController} from "../../elements/sc-search-controller";

import {assert} from '@esm-bundle/chai';

function makeResponses() {
  let responses = [];
  for (let id = 10; id > 0; id--) {
    responses.push(Response.json({ id: id }))
  }
  return responses;
}

describe(`makeResponses()`, () => {
  it(`should return an id of 1 when first popped`, async () => {
    let responses = makeResponses();
    let first_response = responses.pop();
    let as_object = await first_response.json();
    assert.equal(as_object['id'], 1);
  })
});

describe('SCSearchController', () => {
  it(`should fetch first time`, async () => {
    let controller = new SCSearchController(makeResponses());
    let result = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    assert.equal(result['id'], 1);
  });

  it(`should fetch if requestUrl changes`, async () => {
    let controller = new SCSearchController(makeResponses());
    await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    let result = await controller.fetchResult(`http://example.com/api/def`, ['en']);
    assert.equal(result['id'], 2);
  });

  it(`should fetch if selectedLanguages changes`, async () => {
    let controller = new SCSearchController(makeResponses());
    await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    let result = await controller.fetchResult(`http://example.com/api/abc`, ['en', 'pli']);
    assert.equal(result['id'], 2);
  });

  it(`should fetch if both change`, async () => {
    let controller = new SCSearchController(makeResponses());
    await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    let result = await controller.fetchResult(`http://example.com/api/def`, ['en', 'pli']);
    assert.equal(result['id'], 2);
  });

  it(`should return cached response if neither have changed`, async () => {
    let controller = new SCSearchController(makeResponses());
    await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    let result = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    // TODO: make this assertion pass
    // assert.equal(result['id'], 1);
  });
});