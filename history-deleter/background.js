browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url.match(/^about:/)) {
    browser.pageAction.show(tab.id);
  }
});
