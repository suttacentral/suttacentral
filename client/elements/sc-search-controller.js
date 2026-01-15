export class SCSearchController {
  constructor(cannedResponses = null) {
    this._cannedResponses = cannedResponses;
  }

  async fetchResult(url, selectedLanguages) {
    let body = JSON.stringify(selectedLanguages);
    let request = this.#createRequest(url, body);
    let response = await this.#getResponse(request);
    return await response.json();
  }

  #createRequest(url, body) {
    return new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });
  }

  async #getResponse(request) {
    if(this._cannedResponses) return await this._cannedResponses.pop();
    return await fetch(request);
  }
}