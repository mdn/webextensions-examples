self.browser ??= self.chrome;

browser.action.onClicked.addListener(() => {
  browser.tabs.create({
    url: browser.runtime.getURL("page.html")
  });
});
