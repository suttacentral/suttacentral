export class SCSearchController {
  constructor(cannedResponses = null) {
    this._cannedResponses = cannedResponses;
  }

  async fetchResult(requestUrl, selectedLanguages) {
    let response;

    if(this._cannedResponses) {
      response = await this._cannedResponses.pop();
    } else {
      let request = this.#createRequest(requestUrl, selectedLanguages);
      response = await fetch(request);
    }

    return await response.json();
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