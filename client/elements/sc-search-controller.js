export class SCSearchController {
  constructor(cannedResponses = null) {
    this._cannedResponses = cannedResponses;
  }

  async #requestSearchResults(requestUrl, selectedLanguages) {
    let request = new Request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedLanguages),
    });

    return await fetch(request);
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