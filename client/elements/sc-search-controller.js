export class SCSearchController {
  constructor(cannedResponses = null) {
    this._cannedResponses = cannedResponses;
  }

  async fetchResult(requestUrl, selectedLanguages) {
    let request = this.#createRequest(requestUrl, selectedLanguages);
    let response = await this.#makeRequest(request);
    return await response.json();
  }

  async #makeRequest(request) {
    if(this._cannedResponses) {
      return await this._cannedResponses.pop();
    } else {
      return await fetch(request);
    }
  }

  #createRequest(requestUrl, selectedLanguages) {
    return new Request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedLanguages),
    });
  }
}