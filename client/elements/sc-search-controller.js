export class SCSearchController {
  constructor(cannedResponses = null) {
    this._cannedResponses = cannedResponses;
  }

  async #requestSearchResults(requestUrl, selectedLanguages) {
    return await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedLanguages),
    });
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
}