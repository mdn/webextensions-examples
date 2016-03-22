function firstUnpinnedTab(tabs) {
  for (var tab of tabs) {
    if (!tab.pinned) {
      return tab.index;
    }
  }
}

document.addEventListener("click", function(e) {
  function callOnActiveTab(callback) {
    chrome.tabs.query({}, function(tabs) {
      for (var tab of tabs) {
        if (tab.active) {
          callback(tab, tabs);
        }
      }
    });
  }

  if (e.target.id === "tabs-move-beginning") {
    callOnActiveTab((tab, tabs) => {
      var destination = 0;
      if (!tab.pinned) {
        destination = firstUnpinnedTab(tabs);
      }
      chrome.tabs.move([tab.id], {index: destination});
    });
  }

  if (e.target.id === "tabs-move-end") {
    callOnActiveTab((tab, tabs) => {
      var destination = -1;
      if (tab.pinned) {
        destination = firstUnpinnedTab(tabs);
      }
      chrome.tabs.move([tab.id], {index: destination});
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
