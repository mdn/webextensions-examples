// Zoom constants. Define Max, Min, increment and default values
const ZOOM_INCREMENT = 0.2;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.3;
const DEFAULT_ZOOM = 1;

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
        //the maximum zoomFactor is 3, it can't go higher
        if (zoomFactor >= MAX_ZOOM) {
          alert("Tab zoom factor is already at max!");
        } else {
          var newZoomFactor = zoomFactor + ZOOM_INCREMENT;
          //if the newZoomFactor is set to higher than the max accepted
          //it won't change, and will never alert that it's at maximum
          newZoomFactor = newZoomFactor > MAX_ZOOM ? MAX_ZOOM : newZoomFactor;
          chrome.tabs.setZoom(tab.id, newZoomFactor);
        }
      });
    });
  }

  else if (e.target.id === "tabs-decrease-zoom") {
    callOnActiveTab((tab) => {
      chrome.tabs.getZoom(tab.id, function(zoomFactor){
        //the minimum zoomFactor is 0.3, it can't go lower
        if (zoomFactor <= MIN_ZOOM) {
          alert("Tab zoom factor is already at minimum!");
        } else {
          var newZoomFactor = zoomFactor - ZOOM_INCREMENT;
          //if the newZoomFactor is set to lower than the min accepted
          //it won't change, and will never alert that it's at minimum
          newZoomFactor = newZoomFactor < MIN_ZOOM ? MIN_ZOOM : newZoomFactor;
          chrome.tabs.setZoom(tab.id, newZoomFactor);
        }
      });
    });
  }

  else if (e.target.id === "tabs-default-zoom") {
    callOnActiveTab((tab) => {
      chrome.tabs.getZoom(tab.id, function(zoomFactor){
        if (zoomFactor == DEFAULT_ZOOM) {
          alert("Tab zoom is already at the default zoom factor");
        } else {
          chrome.tabs.setZoom(tab.id, DEFAULT_ZOOM);
        }
      });
    });
  }

  e.preventDefault();
});

//onRemoved listener. fired when tab is removed
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  console.log(`The tab with id: ${tabId}, is closing`);

  if(removeInfo.isWindowClosing) {
    console.log(`Its window is also closing.`);
  } else {
    console.log(`Its window is not closing`);
  }
});

//onMoved listener. fired when tab is moved into the same window
chrome.tabs.onMoved.addListener(function(tabId, moveInfo){
  var startIndex = moveInfo.fromIndex;
  var endIndex = moveInfo.toIndex;
  console.log(`Tab with id: ${tabId} moved from index: ${startIndex} to index: ${endIndex}`);
});
