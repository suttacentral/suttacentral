export class SCSearchController {
  constructor(cannedResponses = null) {
    this._cannedResponses = cannedResponses;
  }

  async fetchResult(url, selectedLanguages) {
    let requestData = {
      url: url,
      body: JSON.stringify(selectedLanguages),
    }
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