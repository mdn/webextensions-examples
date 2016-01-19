var DELAY = 0.1;
var CATGIFS = "http://chilloutandwatchsomecatgifs.com/";

/*
Restart alarm for the currently active tab, whenever background.js is run.
*/
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  restartAlarm(tabs[0].id);
});

/*
Restart alarm for the currently active tab, whenever the user navigates.
*/
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!changeInfo.url) {
    return;
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabId == tabs[0].id) {
      restartAlarm(tabId);
    }
  });
});

/*
Restart alarm for the currently active tab, whenever a new tab becomes active.
*/
chrome.tabs.onActivated.addListener(function (activeInfo) {
  restartAlarm(activeInfo.tabId);
});

/*
restartAlarm: clear all alarms,
then set a new alarm for the given tab.
*/
function restartAlarm(tabId) {
  chrome.pageAction.hide(tabId);
  chrome.alarms.clearAll();
  chrome.tabs.get(tabId, function(tab) {
    if (tab.url != CATGIFS) {
      chrome.alarms.create(tabId, {delayInMinutes: DELAY});
    }
  });
}

/*
On alarm, show the page action.
*/
chrome.alarms.onAlarm.addListener(function(alarm) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.pageAction.show(alarm.name);
  });
});

/*
On page action click, navigate the corresponding tab to the cat gifs.
*/
chrome.pageAction.onClicked.addListener(function () {
  chrome.tabs.update({url: CATGIFS});
});
