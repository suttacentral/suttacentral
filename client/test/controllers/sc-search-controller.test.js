import {SCSearchController} from "../../elements/sc-search-controller";

import {assert} from '@esm-bundle/chai';

const FIRST_RESPONSE = Response.json({ response_num: 1 });

function* jsonGenerator() {
  let id = 1;
  while(true) {
    yield `{ id: ${ id } }`;
    id++;
  }
}

describe(`jsonGenerator()`, () => {
  it(`should generate sequence of json strings with incrementing id`,  () => {
    let json = jsonGenerator();
    assert.equal(json.next().value, `{ id: 1 }`);
    assert.equal(json.next().value, `{ id: 2 }`);
    assert.equal(json.next().value, `{ id: 3 }`);
  });
});

describe('SCSearchController', () => {
  it(`should fetch first time`, async () => {
    let controller = new SCSearchController();
    controller.stubbedResponse(Response.json({response_num: 1}));
    let result = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    assert.equal(result['response_num'], 1);
  });

  it(`should fetch if requestUrl changes`, async () => {
    let controller = new SCSearchController();
    controller.stubbedResponse(Response.json({response_num: 1}));
    let result_one = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    controller.stubbedResponse(Response.json({response_num: 2}));
    let result_two = await controller.fetchResult(`http://example.com/api/def`, ['en']);
    assert.equal(result_two['response_num'], 2);
  });

  it(`should fetch if selectedLanguages changes`, async () => {
    let controller = new SCSearchController();
    controller.stubbedResponse(Response.json({response_num: 1}));
    let result_one = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    controller.stubbedResponse(Response.json({response_num: 2}));
    let result_two = await controller.fetchResult(`http://example.com/api/abc`, ['en', 'pli']);
    assert.equal(result_two['response_num'], 2);
  });

  it(`should fetch if both change`, async () => {
    let controller = new SCSearchController();
    controller.stubbedResponse(Response.json({response_num: 1}));
    let result_one = await controller.fetchResult(`http://example.com/api/abc`, ['en']);
    controller.stubbedResponse(Response.json({response_num: 2}));
    let result_two = await controller.fetchResult(`http://example.com/api/def`, ['en', 'pli']);
    assert.equal(result_two['response_num'], 2);
  });
});