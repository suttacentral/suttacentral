async function requestSearchResults(requestUrl, selectedLanguages) {
  return await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedLanguages),
  });
}

export class SCSearchController {
  constructor() {
    this._stubbedResponse = null;
  }

  stubbedResponse(response) {
    this._stubbedResponse = response;
  }

  async fetchResult(requestUrl, selectedLanguages) {
    let response;

    if(this._stubbedResponse) {
      response = await this._stubbedResponse
    } else {
      response = await requestSearchResults(requestUrl, selectedLanguages);
    }

    return await response.json();
  }
}