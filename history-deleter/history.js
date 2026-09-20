// A useful way to extract the domain from a url.
function get_hostname(url) {
  let hostname = new URL(url).hostname;
  set_domain(hostname);
  return hostname;
}

function set_domain(domain) {
  const spans = document.getElementsByClassName('domain');
  Array.from(spans).forEach((span) => {
    span.textContent = domain;
  });
}

function no_history(hostname) {
  let history = document.getElementById('history');
  while (history.firstChild) {
    history.removeChild(history.firstChild);
  }
  history.textContent = `No history for ${hostname}.`;
}

function getActiveTab() {
  return browser.tabs.query({
    active: true,
    currentWindow: true
  }).then(tabs => tabs[0]);
}

// When the page is loaded find the current tab and then use that to query
// the history.
getActiveTab().then((tab) => {
  let list = document.getElementById('history');
  let hostname = get_hostname(tab.url);

  // Search for all history entries for the current windows domain.
  // Because this could be a lot of entries, lets limit it to 5.
  let searchingHistory = browser.history.search({text: hostname, maxResults: 5});
  searchingHistory.then((results) => {
    // What to show if there are no results.
    if (results.length < 1) {
      no_history(hostname);
    } else {
      for (const history of results) {
        let li = document.createElement('p');
        let a = document.createElement('a');
        let url = document.createTextNode(history.url);
        a.href = history.url;
        a.target = '_blank';
        a.appendChild(url);
        li.appendChild(a);
        list.appendChild(li);
      }
    }
  });
});

function clearAll(e) {
  getActiveTab().then((tab) => {
    let hostname = get_hostname(tab.url);
    if (!hostname) {
      // Don't try and delete history when there's no hostname.
      return;
    }

    // Search will return us a list of histories for this domain.
    // Loop through them and delete them one by one.
    let searchingHistory = browser.history.search({text: hostname})
    searchingHistory.then((results) => {
        for (const history of results) {
          browser.history.deleteUrl({url: history.url});
        }
        // Clear out the UI.
        no_history(hostname);
      }
    );
  });
  e.preventDefault();
}

document.getElementById('clear').addEventListener('click', clearAll);
