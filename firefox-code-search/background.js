const BASE_URL = "https://searchfox.org/mozilla-central";
const SEARCH_URL = `${BASE_URL}/search`;
const SOURCE_URL = `${BASE_URL}/source`;
const EMPTY_RESULT =
browser.omnibox.setDefaultSuggestion({
  description: "Search the firefox codebase (e.g. `hello world` | `path:omnibox.js onInputChanged`"
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
  let url = text;
  if (!text.startsWith(SOURCE_URL)) {
    url = `${SEARCH_URL}?q=${text}`;
  }
  browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
    browser.tabs.update(tabs[0].id, {url});
  });
});

browser.omnibox.onInputChanged.addListener((text, suggest) => {
  let url = buildURL(text);
  let headers = new Headers({"Accept": "application/json"});
  let init = {method: 'GET', headers};
  let request = new Request(url, init);

  fetch(request)
    .then(createSuggestionsFromResponse)
    .then(suggest);
});

function buildURL(text) {
  let path = '';
  let queryParts = [];
  let query = '';
  let parts = text.split(' ');

  parts.forEach(part => {
    if (part.startsWith("path:")) {
      path = part.slice(5);
    } else {
      queryParts.push(part);
    }
  });

  query = queryParts.join(' ');
  return `${SEARCH_URL}?q=${query}&path=${path}`;
}

function createSuggestionsFromResponse(response) {
  return new Promise(resolve => {
    let suggestions = [];
    let contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      response.json().then(json => {
        let suggestions = [];
        if (json.normal) {
          if (json.normal["Textual Occurrences"]) {
            let occurrences = json.normal["Textual Occurrences"];
            occurrences.forEach(occurrence => {
              suggestions.push({
                content: `${SOURCE_URL}/${occurrence.path}#${occurrence.lines[0].lno}`,
                description: occurrence.lines[0].line,
              });
            });
            resolve(suggestions);
          } else if (json.normal["Files"]) {
            let files = json.normal["Files"];
            files.forEach(file => {
              suggestions.push({
                content: `${SOURCE_URL}/${file.path}`,
                description: file.path,
              });
            });
            resolve(suggestions);
          } else {
            resolve([{content: SOURCE_URL, description: "no results found"}]);
          }
        } else {
          resolve([{content: SOURCE_URL, description: "no results found"}]);
        }
      });
    } else {
      resolve([{content: SOURCE_URL, description: "no results found"}]);
    }
  });
}
