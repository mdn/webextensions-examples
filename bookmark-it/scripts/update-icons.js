/**
In this file, update the icon for actve tabs when:
* bookmarks are created and removed
* the URLs of active tabs might have changed.
*/

/**
Values for the icon when the page *is not* bookmarked.
*/
const notBookmarkedIcon = {
  19: "icons/star-empty-19.png",
  38: "icons/star-empty-38.png"
};

/**
Values for the icon when the page *is* bookmarked.
*/
const bookmarkedIcon = {
  19: "icons/star-filled-19.png",
  38: "icons/star-filled-38.png"
}

function handleError(message) {
 console.error(`Error updating icon: ${message}`);
}

function isSupported(urlString) {
  var supportedProtocols = ["https:", "http:", "ftp:", "file:"];
  var url = document.createElement('a');
  url.href = urlString;
  return supportedProtocols.indexOf(url.protocol) != -1;;
}

/**
For a given tab, check whether it's bookmarked, and update its icon. 
*/
function updateIconForTab(tab) {
  if (!isSupported(tab.url)) {
    console.log(`${tab.url} not supported`)
    return;
  }
  // Note that we must specify:
  // bookmarks.search({url: tab.url}) rather than:
  // bookmarks.search(tab.url)
  // because we need an exact match for the URL.
  browser.bookmarks.search({url: tab.url})
    .then((bookmarkList) => {
      if (bookmarkList.length === 0) {
        return browser.browserAction.setIcon({
          path: notBookmarkedIcon,
          tabId: tab.id
        });
      } else {
        return browser.browserAction.setIcon({
          path: bookmarkedIcon,
          tabId: tab.id
        });
      }
    });
}

/**
For all active tabs, check whether it's bookmarked, and update its icon. 
*/
function updateIconsForActiveTabs() {
  // ask for all active tabs across all browser windows
  browser.tabs.query({active: true})
    .then((tabArray) => {
      for (tab of tabArray) {
        updateIconForTab(tab);
      }
    })
    .catch(handleError);
}

/**
When a new bookmark is created, update the icons for all active tabs.
*/
browser.bookmarks.onCreated.addListener((id, bookmarkInfo) => {
  updateIconsForActiveTabs();
});

/**
When a new bookmark is removed, update the icons for all active tabs.
*/
browser.bookmarks.onRemoved.addListener((id, removeInfo) => {
  updateIconsForActiveTabs();
});

/**
When the page hosted by a tab changes, update the icons for all active tabs.
*/
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  console.log("updated");
  updateIconsForActiveTabs();
});

/**
When the currently active tab changes, update the icons for
all active tabs.
*/
browser.tabs.onActivated.addListener((activeInfo) => {
  console.log("activated");
  updateIconsForActiveTabs();
});

/**
On install/enable, update the icons for all active tabs.
*/
updateIconsForActiveTabs();
