// A useful way to extract the domain from a url.
function get_hostname(url) {
  var a = document.createElement('a');
  a.href = url;
  set_domain(a.hostname);
  return a.hostname;
}

function set_domain(domain) {
  const spans = document.getElementsByClassName('domain');
  [].slice.call(spans).forEach((span) => {
    span.textContent = domain;
  });
}

function no_history(hostname) {
  var history_text = document.getElementById('history');
  while(history_text.firstChild)
    history_text.removeChild(history_text.firstChild);
  history_text.textContent = `No history for ${hostname}.`;
}

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

// When the page is loaded find the current tab and then use that to query
// the history.
getActiveTab().then((tabs) => {
  var list = document.getElementById('history');
  var hostname = get_hostname(tabs[0].url);

  // Search for all history entries for the current windows domain.
  // Because this could be a lot of entries, lets limit it to 5.
  var searchingHistory = browser.history.search({text: hostname, maxResults: 5});
  searchingHistory.then((results) => {
    // What to show if there are no results.
    if (results.length < 1) {
      no_history(hostname);
    } else {
      for (var k in results) {
        var history = results[k];
        var li = document.createElement('p');
        var a = document.createElement('a');
        var url = document.createTextNode(history.url);
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
  getActiveTab().then((tabs) => {
    var hostname = get_hostname(tabs[0].url);
    if (!hostname) {
      // Don't try and delete history when there's no hostname.
      return;
    }

    // Search will return us a list of histories for this domain.
    // Loop through them and delete them one by one.
    var searchingHistory = browser.history.search({text: hostname})
    searchingHistory.then((results) => {
        for (let k in results) {
          browser.history.deleteUrl({url: results[k].url});
        }
        // Clear out the UI.
        no_history(hostname);
      }
    );
  });
  e.preventDefault();
}

document.getElementById('clear').addEventListener('click', clearAll);
