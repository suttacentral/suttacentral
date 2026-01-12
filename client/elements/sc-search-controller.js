export class SCSearchController {
  constructor() {
    this._stubbedResponse = null;
    this._lastRequestUrl = null;
    this._lastSelectedLanguages = null;
    this._cachedResult = null;
  }

  stubbedResponse(response) {
    this._stubbedResponse = response;
  }

  async response(requestUrl, selectedLanguages) {
    if(this._stubbedResponse) {
      return await this._stubbedResponse
    }

    return await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedLanguages),
    });
  }

  async fetchResult(requestUrl, selectedLanguages) {
    if(requestUrl === this._lastRequestUrl && selectedLanguages === this._lastSelectedLanguages) {
      return this._cachedResult;
    }

    let response = await this.response(requestUrl, selectedLanguages);
    let result =  await response.json();

    this._lastRequestUrl = requestUrl;
    this._lastSelectedLanguages = selectedLanguages;
    this._cachedResult = result;

    return result;
  }
}