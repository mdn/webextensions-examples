const CSS = "body { border: 20px solid red; }";

const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";

function toggleCSS(tab) {

  function gotTitle(title) {
    if (title === TITLE_APPLY) {
      chrome.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
      chrome.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
      chrome.tabs.insertCSS({code: CSS});
    } else {
      chrome.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
      chrome.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
      chrome.tabs.removeCSS({code: CSS});    
    }
  }

  chrome.pageAction.getTitle({tabId: tab.id}, gotTitle)
}

function initializePageAction(tabId) {
  chrome.pageAction.setIcon({tabId, path: "icons/off.svg"});
  chrome.pageAction.setTitle({tabId, title: TITLE_APPLY});
  chrome.pageAction.show(tabId);
}

chrome.tabs.query({}, (tabs)=> {
  for (tab of tabs) {
    initializePageAction(tab.id);
  }
});

chrome.tabs.onUpdated.addListener(initializePageAction);

chrome.pageAction.onClicked.addListener(toggleCSS);
