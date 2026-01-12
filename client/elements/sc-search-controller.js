export class SCSearchController {
  constructor() {
    this._stubbedResult = null;
  }

  stubbedResult(value) {
    this._stubbedResult = value;
  }

  async response(requestUrl, selectedLanguages) {
    return await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedLanguages),
    });
  }

  async fetchResult(requestUrl, selectedLanguages) {
    if(this._stubbedResult) {
      return this._stubbedResult
    }

    let response = await this.response(requestUrl, selectedLanguages);
    return await response.json();
  }
}