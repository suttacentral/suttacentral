export class SCSearchController {
  constructor() {
    this._stubbedResponse = null;
  }

  stubbedResponse(response) {
    this._stubbedResponse = response;
  }

  async #response(requestUrl, selectedLanguages) {
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

    if(this._stubbedResponse) {
      response = await this._stubbedResponse
    } else {
      response = await this.#response(requestUrl, selectedLanguages);
    }

    return await response.json();
  }
}