// Open the UI to navigate the collection images in a tab.
browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: "/navigate-collection.html"});
});

// Add a context menu action on every image element in the page.
browser.contextMenus.create({
  id: "collect-image",
  title: "Add to the collected images",
  contexts: ["image"],
});

// Manage pending collected images.
let pendingCollectedUrls = [];
browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "get-pending-collected-urls") {
    let urls = pendingCollectedUrls;
    pendingCollectedUrls = [];
    return Promise.resolve(urls);
  }
});

// Handle the context menu action click events.
browser.contextMenus.onClicked.addListener(async (info) => {
  try {
    await browser.runtime.sendMessage({
      type: "new-collected-images",
      url: info.srcUrl,
    });
  } catch (err) {
    if (err.message.includes("Could not establish connection. Receiving end does not exist.")) {
      // Add the url to the pending urls and open a popup.
      pendingCollectedUrls.push(info.srcUrl);
      try {
        await browser.windows.create({
          type: "popup", url: "/popup.html",
          top: 0, left: 0, width: 300, height: 400,
        });
      } catch (err) {
        console.error(err);
      }
      return;
    }

    console.error(err);
  }
});
