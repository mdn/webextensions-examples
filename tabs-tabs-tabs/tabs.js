function firstUnpinnedTab(tabs) {
  for (var tab of tabs) {
    if (!tab.pinned) {
      return tab.index;
    }
  }
}

document.addEventListener("click", function(e) {
  function callOnActiveTab(callback) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      for (var tab of tabs) {
        if (tab.active) {
          callback(tab, tabs);
        }
      }
    });
  }

  if (e.target.id === "tabs-move-beginning") {
    callOnActiveTab((tab, tabs) => {
      var index = 0;
      if (!tab.pinned) {
        index = firstUnpinnedTab(tabs);
      }
      chrome.tabs.move([tab.id], {index});
    });
  }

  if (e.target.id === "tabs-move-end") {
    callOnActiveTab((tab, tabs) => {
      var index = -1;
      if (tab.pinned) {
        var lastPinnedTab = Math.max(0, firstUnpinnedTab(tabs) - 1);
        index = lastPinnedTab;
      }
      chrome.tabs.move([tab.id], {index});
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

  else if (e.target.id === "tabs-create") {
    chrome.tabs.create({url: "https://developer.mozilla.org/en-US/Add-ons/WebExtensions"});
  }

  else if (e.target.id === "tabs-alertinfo") {
    callOnActiveTab((tab) => {
      let props = "";
      for (let item in tab) {
        props += `${ item } = ${ tab[item] } \n`;
      }
      alert(props);
    });
  }

  else if (e.target.id === "tabs-add-zoom") {
      callOnActiveTab((tab) => {
        chrome.tabs.getZoom(tab.id, function(zoomFactor){
            var newZoomFactor = zoomFactor + 0.2;
            newZoomFactor = newZoomFactor > 3 ? 3 : newZoomFactor

            //the maximum zoomFactor is 3, it can't go higher
            if (zoomFactor >= 3) {
                alert("Tab zoom factor is already at max!");
            } else {
                chrome.tabs.setZoom(tab.id, newZoomFactor);
            }
        });
      });
  }

  else if (e.target.id === "tabs-decrease-zoom") {
      callOnActiveTab((tab) => {
        chrome.tabs.getZoom(tab.id, function(zoomFactor){
            var newZoomFactor = zoomFactor - 0.2;
            newZoomFactor = newZoomFactor < 0.3 ? 0.3 : newZoomFactor

            //the minimum zoomFactor is 0.3, it can't go lower
            if (zoomFactor <= 0.3) {
                alert("Tab zoom factor is already at minimum!");
            } else {
                chrome.tabs.setZoom(tab.id, newZoomFactor);
            }
        });
      });
  }

  else if (e.target.id === "tabs-default-zoom") {
      callOnActiveTab((tab) => {
        chrome.tabs.getZoom(tab.id, function(zoomFactor){
            if (zoomFactor == 1) {
                alert("Tab zoom is already at the default zoom factor");
            } else {
                chrome.tabs.setZoom(tab.id, 1);
            }
        });
      });
  }

  e.preventDefault();
});
