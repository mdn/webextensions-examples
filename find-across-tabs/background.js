async function find(query) {
  browser.runtime.sendMessage({msg: "clear-results"});

  // If you don"t exclude the current tab, every search will find a hit on the
  // current page.
  let this_tab_url = browser.runtime.getURL("find.html");
  let tabs = await browser.tabs.query({});

  for (let tab of tabs) {
    if (tab.url === this_tab_url) {
      continue;
    }

    let result = await browser.find.find(query, {tabId: tab.id});
    browser.runtime.sendMessage({
      msg: "found-result",
      id: tab.id,
      url: tab.url,
      count: result.count
    });

    if (result.count) {
      browser.find.highlightResults({tabId: tab.id});
    }
  }
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({"url": "/find.html"});
});
