const SRC_URL = "http://searchfox.org/mozilla-central";
const PATH_PREFIX = "path:";

chrome.omnibox.setDefaultSuggestion({
  description: "Search the firefox codebase (e.g. `hello world` | `path:omnibox.js hello world`"
});

chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  let url = text;
  if (!text.startsWith(SRC_URL)) {
    url = `${SRC_URL}/search?q=${text}+-path%3Aobj-&redirect=false`
  }
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.update(tabs[0].id, {url});
  });
});

function buildURL(text) {
  let path = '';
  let queryParts = [];
  let query = '';
  let parts = text.split(' ');

  parts.forEach((part, i) => {
    if (part.startsWith(PATH_PREFIX)) {
      path = part.slice(PATH_PREFIX.length);
    } else {
      queryParts.push(part);
    }
  });

  query = queryParts.join(' ');
  return `${SRC_URL}/search?q=${query}&case=false&regexp=${isRegex}&path=${path}`;
}

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  let url = buildURL(text);
  let headers = new Headers({"Accept": "application/json"});
  let init = {method: 'GET', headers};
  let request = new Request(url, init);

  fetch(request).then(response => {
    let contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      response.json().then(function(json) {
        let suggestions = [];
        if (json.normal) {
          if (json.normal["Textual Occurrences"]) {
            let occurrences = json.normal["Textual Occurrences"].slice(0, 3);
            occurrences.forEach(occurrence => {
              suggestions.push({
                content: `http://searchfox.org/mozilla-central/source/${occurrence.path}#${occurrence.lines[0].lno}`,
                description: `Occurrence: ${occurrence.lines[0].line}`,
              });
            });
          }
          if (json.normal["Files"]) {
            let files = json.normal["Files"].slice(0, 7);
            files.forEach(file => {
              suggestions.push({
                content: `http://searchfox.org/mozilla-central/source/${file.path}`,
                description: `File: ${file.path}`,
              });
            });
          }
        }
        if (suggestions.length) {
          suggest(suggestions);
        } else {
          suggest([{
            content: "http://searchfox.org/mozilla-central/source",
            description: "no results found",
          }]);
        }
      });
    } else {
      suggest([{
        content: "http://searchfox.org/mozilla-central/source",
        description: "no results found",
      }]);
    }
  });
});
