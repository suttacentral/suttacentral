export class SCSearchController {
  async fetchResult(requestUrl, selectedLanguages) {
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