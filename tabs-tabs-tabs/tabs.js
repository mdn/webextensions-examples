document.addEventListener("click", function(e) {
  function callOnActiveTab(callback) {
    chrome.tabs.query({}, function(tabs) {
      for (var tab of tabs) {
        if (tab.active) {
          callback(tab);
        }
      }
    });
  }

  if (e.target.id === "tabs-move-beginning") {
    callOnActiveTab((tab) => {
      chrome.tabs.move([tab.id], {index: 0});
    });
  }

  if (e.target.id === "tabs-move-end") {
    callOnActiveTab((tab) => {
      chrome.tabs.move([tab.id], {index: -1});
    });
  }

  else if (e.target.id === "tabs-duplicate") {
    callOnActiveTab((tab) => {
      chrome.tabs.duplicate(tab.id);
    });
  }

  else if (e.target.id === "tabs-reload") {
    callOnActiveTab((tab) => {
      chrome.tabs.reload(tab.id);
    });
  }

  else if (e.target.id === "tabs-remove") {
    callOnActiveTab((tab) => {
      chrome.tabs.remove(tab.id);
    });
  }

});
