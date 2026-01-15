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
  }

  async fetchResult(url, selectedLanguages) {
    let requestData = new RequestData(url, selectedLanguages);
    let request = this.#createRequest(requestData);
    let response = await this.#getResponse(request);
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