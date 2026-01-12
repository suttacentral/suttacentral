export class SCSearchController {
  constructor() {
    this._stubbedResult = null;
  }

  stubbedResult(value) {
    this._stubbedResult = value;
  }

  async fetchResult(requestUrl, selectedLanguages) {
    if(this._stubbedResult) {
      return this._stubbedResult
    }

    return await (
      await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedLanguages),
      })
    ).json();
  }
}