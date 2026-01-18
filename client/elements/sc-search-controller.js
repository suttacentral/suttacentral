// The SCSearchController class and it's helpers only exist because
// the SCPageSearch component needs to be reworked. Here we provide
// a way to cache the previous response and only request a new one
// from the search API if the request has changed. This should really
// be handled via the component lifecycle of the <sc-page-search>
// element. If we get around to sorting that out we can delete
// this module.

export class RequestData {
  constructor(url, selectedLanguages) {
    this.url = url;
    this.body = JSON.stringify(selectedLanguages);
  }

  equals(other) {
    if(!other) return false;
    return (this.url === other.url) && (this.body === other.body)
  }
}

export class RequestChecker {
  constructor() {
    this._previousRequestData = null;
    this._hasChanged = false;
  }

  check(requestData) {
    this._hasChanged = !requestData.equals(this._previousRequestData);
    this._previousRequestData = requestData;
  }

  hasChanged() {
    return this._hasChanged;
  }
}

export class SCSearchController {
  constructor(cannedResponses = null) {
    this._cannedResponses = cannedResponses;
    this._requestChecker = new RequestChecker();
    this._previousResponse = null;
  }

  async fetchResult(url, selectedLanguages) {
    let requestData = new RequestData(url, selectedLanguages);
    this._requestChecker.check(requestData);

    let response;
    if(this._requestChecker.hasChanged()) {
      let request = this.#createRequest(requestData);
      response = await this.#getResponse(request);
    } else {
      response = this._previousResponse;
    }

    this._previousResponse = response.clone();
    return await response.json();
  }

  #createRequest(requestData) {
    return new Request(requestData.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestData.body,
    });
  }

  async #getResponse(request) {
    if(this._cannedResponses) return await this._cannedResponses.pop();
    return await fetch(request);
  }
}