document.addEventListener("click", function(e) {
  function callOnActiveTab(callback) {
    browser.tabs.query({}, function(tabs) {
      for (var tab of tabs) {
        if (tab.active) {
          callback(tab);
        }
      }
    });
  }

  if (e.target.id === "tabs-move-beginning") {
    callOnActiveTab((tab) => {
      browser.tabs.move([tab.id], {index: 0});
    });
  }

  if (e.target.id === "tabs-move-end") {
    callOnActiveTab((tab) => {
      browser.tabs.move([tab.id], {index: -1});
    });
  }

  else if (e.target.id === "tabs-duplicate") {
    callOnActiveTab((tab) => {
      browser.tabs.duplicate(tab.id);
    });
  }

  else if (e.target.id === "tabs-reload") {
    callOnActiveTab((tab) => {
      browser.tabs.reload(tab.id);
    });
  }

  else if (e.target.id === "tabs-remove") {
    callOnActiveTab((tab) => {
      browser.tabs.remove(tab.id);
    });
  }

});
