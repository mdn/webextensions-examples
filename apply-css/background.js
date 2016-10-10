const CSS = "body { border: 20px solid red; }";
const TITLE_APPLY = "Apply CSS";
const TITLE_REMOVE = "Remove CSS";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

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
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
  var anchor =  document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    chrome.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
    chrome.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
    chrome.pageAction.show(tab.id);
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
chrome.tabs.query({}, (tabs) => {
  for (tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Toggle CSS when the page action is clicked.
*/
chrome.pageAction.onClicked.addListener(toggleCSS);
