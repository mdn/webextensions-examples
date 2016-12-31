browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: "/tab.html"});
});
