var DELAY = 0.1;
var CATGIFS = "http://chilloutandwatchsomecatgifs.com/";

/*
Start-stop for the currently active tab, whenever this script is run.
*/
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  startStopAlarm(tabs[0].id);
});

/*
Start-stop for the currently active tab, whenever the user navigates.
*/
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!changeInfo.url) {
    return;
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabId == tabs[0].id) {
      startStopAlarm(tabId);
    }
  });
});

/*
Start-stop for the currently active tab, whenever a new tab becomes active.
*/
chrome.tabs.onActivated.addListener(function (activeInfo) {
  startStopAlarm(activeInfo.tabId);
});

/*
Start-stop: clear all alarms,
then set a new alarm for the given tab.
*/
function startStopAlarm(tabId) {
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
