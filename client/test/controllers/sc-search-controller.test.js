import {RequestChecker, RequestData, SCSearchController} from "../../elements/sc-search-controller";

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
    assert.equal(result['id'], 1);
  });
});

describe(`RequestData`, () => {
  it(`should be equal if url and languages are the same`, () => {
    let lhs = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    let rhs = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    assert.isTrue(lhs.equals(rhs));
  });

  it(`should not be equal if url changes`, () => {
    let lhs = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    let rhs = new RequestData(`http://example.com/def`, `['en', 'pli']`);
    assert.isFalse(lhs.equals(rhs));
  });

  it(`should not be equal if languages change`, () => {
    let lhs = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    let rhs = new RequestData(`http://example.com/abc`, `['de', 'pli']`);
    assert.isFalse(lhs.equals(rhs));
  });

  it(`should not be equal if both change`, () => {
    let lhs = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    let rhs = new RequestData(`http://example.com/def`, `['de', 'pli']`);
    assert.isFalse(lhs.equals(rhs));
  });
  it(`should not be equal if right hand side is falsey`, () => {
    let lhs = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    assert.isFalse(lhs.equals(null));
  });
});

describe(`RequestChecker`, () => {
  it(`should show first request has changed`, () => {
    let checker = new RequestChecker();
    let request = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    checker.check(request);
    assert.isTrue(checker.hasChanged());
  });

  it(`should show different request as changed`, () => {
    let checker = new RequestChecker();
    let request_one = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    let request_two = new RequestData(`http://example.com/def`, `['en', 'pli']`);
    checker.check(request_one);
    checker.check(request_two);
    assert.isTrue(checker.hasChanged());
  });

  it(`should show same request as not changed`, () => {
    let checker = new RequestChecker();
    let request_one = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    let request_two = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    checker.check(request_one);
    checker.check(request_two);
    assert.isFalse(checker.hasChanged());
  });

  it(`should show request has changed when previously it hadn't`, () => {
    let checker = new RequestChecker();
    let first =     new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    let unchanged = new RequestData(`http://example.com/abc`, `['en', 'pli']`);
    let changed =   new RequestData(`http://example.com/def`, `['en', 'pli']`);
    checker.check(first);
    checker.check(unchanged);
    checker.check(changed);
    assert.isTrue(checker.hasChanged());
  });
});