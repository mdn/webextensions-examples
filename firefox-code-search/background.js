const BASE_URL = "https://searchfox.org/mozilla-central";
const SEARCH_URL = `${BASE_URL}/search`;
const SOURCE_URL = `${BASE_URL}/source`;

// Provide help text to the user.
browser.omnibox.setDefaultSuggestion({
  description: `Search the firefox codebase
    (e.g. "hello world" | "path:omnibox.js onInputChanged")`
});

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  let headers = new Headers({"Accept": "application/json"});
  let init = {method: 'GET', headers};
  let url = buildSearchURL(text);
  let request = new Request(url, init);

  fetch(request)
    .then(createSuggestionsFromResponse)
    .then(addSuggestions);
});

// Open the page based on how the user clicks on a suggestion.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
  let url = text;
  if (!text.startsWith(SOURCE_URL)) {
    // Update the url if the user clicks on the default suggestion.
    url = `${SEARCH_URL}?q=${text}`;
  }
  switch (disposition) {
    case "currentTab":
      browser.tabs.update({url});
      break;
    case "newForegroundTab":
      browser.tabs.create({url});
      break;
    case "newBackgroundTab":
      browser.tabs.create({url, active: false});
      break;
  }
});

function buildSearchURL(text) {
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
    let suggestionsOnEmptyResults = [{
      content: SOURCE_URL,
      description: "no results found"
    }];
    response.json().then(json => {
      if (!json.normal) {
        return resolve(suggestionsOnEmptyResults);
      }

      let occurrences = json.normal["Textual Occurrences"];
      let files = json.normal["Files"];

      if (!occurrences && !files) {
        return resolve(suggestionsOnEmptyResults);
      }

      if (occurrences) {
        occurrences.forEach(({path, lines}) => {
          suggestions.push({
            content: `${SOURCE_URL}/${path}#${lines[0].lno}`,
            description: lines[0].line,
          });
        });
        return resolve(suggestions);
      }

      // There won't be any textual occurrences if the "path:" prefix is used.
      files.forEach(({path}) => {
        suggestions.push({
          content: `${SOURCE_URL}/${path}`,
          description: path,
        });
      });
      return resolve(suggestions);
    });
  });
}

