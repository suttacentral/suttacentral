export class SCSearchController {
  constructor(cannedResponses = null) {
    this._cannedResponses = cannedResponses;
  }

  async fetchResult(requestUrl, selectedLanguages) {
    let response;

    if(this._cannedResponses) {
      response = await this._cannedResponses.pop();
    } else {
      response = await this.#requestSearchResults(requestUrl, selectedLanguages);
    }

    return await response.json();
  }

  async #requestSearchResults(requestUrl, selectedLanguages) {
    let request = this.#createRequest(requestUrl, selectedLanguages);
    return await fetch(request);
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