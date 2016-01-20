/*
DELAY is set to 6 seconds in this example. Such a short period is chosen to make
the extension's behavior more obvious, but this is not recommended in real life.
Note that in Chrome, alarms cannot be set for less than a minute. In Chrome:

* if you install this extension "unpacked", you'll see a warning
in the console, but the alarm will still go off after 6 seconds
* if you package the extension and install it, then the alarm will go off after
a minute.
*/
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
      chrome.alarms.create("", {delayInMinutes: DELAY});
    }
  });
}

/*
On alarm, show the page action.
*/
chrome.alarms.onAlarm.addListener(function(alarm) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.pageAction.show(tabs[0].id);
  });
});

/*
On page action click, navigate the corresponding tab to the cat gifs.
*/
chrome.pageAction.onClicked.addListener(function () {
  chrome.tabs.update({url: CATGIFS});
});
