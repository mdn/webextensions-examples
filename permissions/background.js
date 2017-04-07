browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({
    url: chrome.runtime.getURL("page.html")
  });
});
