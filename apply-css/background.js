const CSS = "body { border: 20px solid red; }";
const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";

/*
Toggle CSS: based on the current title, insert or remove the CSS.
Update the page action's title and icon to reflect its state.
*/
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

/*
Initialize the page action: set icon and title, then show.
*/
function initializePageAction(tabId) {
  chrome.pageAction.setIcon({tabId, path: "icons/off.svg"});
  chrome.pageAction.setTitle({tabId, title: TITLE_APPLY});
  chrome.pageAction.show(tabId);
}

/*
When first loaded, initialize the page action for all tabs.
*/
chrome.tabs.query({}, (tabs)=> {
  for (tab of tabs) {
    initializePageAction(tab.id);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
chrome.tabs.onUpdated.addListener(initializePageAction);

/*
Toggle CSS when the page action is clicked.
*/
chrome.pageAction.onClicked.addListener(toggleCSS);
