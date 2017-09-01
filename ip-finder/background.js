
// Setup the page action (icon, title)
function initializePageAction(tab) {

    browser.pageAction.setIcon({tabId: tab.id, path: "icons/icon.png"});
    browser.pageAction.setTitle({tabId: tab.id, title: "My IP"});
    browser.pageAction.show(tab.id);
      browser.pageAction.setPopup({
        tabId: tab.id,
        popup: "popup/index.html"
      });  
}

// initialize page acion on each tab update
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});
