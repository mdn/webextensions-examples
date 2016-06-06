// A useful way to extract the domain from a url.
function get_hostname(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

function no_history(hostname) {
  document.getElementById('history').innerHTML = `No history for ${hostname}.`;
}

// When the page is loaded find the current tab and then use that to query
// the history.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var list = document.getElementById('history');
  var hostname = get_hostname(tabs[0].url);

  chrome.history.search(
    // Search for all history entries for the current windows domain.
    {text: hostname, maxResults: 5},
    function(results) {
      // What to show if there are no results.
      if (results.length < 1) {
        no_history(hostname);
      } else {
        // Because this could be a lot of entries, lets limit it to 5.
        for (var k in results) {
          var history = results[k];
          var li = document.createElement('p');
          var url = document.createTextNode(history.url);
          li.appendChild(url);
          list.appendChild(li);
        }
      }
    }
  );
});

function clearAll(e) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var hostname = get_hostname(tabs[0].url);
    if (!hostname) {
      // Don't try and delete history when there's no hostname.
      return;
    }

    chrome.history.search(
      {text: hostname},
      // Search will return us a list of histories for this domain.
      // Loop through them and delete them one by one.
      function(results) {
        for (k = 0; k < results.length; k++) {
          chrome.history.deleteUrl({url: results[k].url});
        }
        // Clear out the UI.
        no_history(hostname);
      }
    );
  });
  e.preventDefault();
}

document.getElementById('clear').addEventListener('click', clearAll);
