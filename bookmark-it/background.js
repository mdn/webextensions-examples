let currentTab;
let currentBookmark;

/*
 * Updates the browserAction icon to reflect whether the current page
 * is already bookmarked.
 */
function updateIcon() {
  browser.browserAction.setIcon({
    path: currentBookmark ? {
      19: "icons/star-filled-19.png",
      38: "icons/star-filled-38.png"
    } : {
      19: "icons/star-empty-19.png",
      38: "icons/star-empty-38.png"
    },
    tabId: currentTab.id
  });
  browser.browserAction.setTitle({
    // Screen readers can see the title
    title: currentBookmark ? 'Unbookmark it!' : 'Bookmark it!',
    tabId: currentTab.id
  }); 
}

/*
 * Add or remove the bookmark on the current page.
 */
function toggleBookmark() {
  if (currentBookmark) {
    browser.bookmarks.remove(currentBookmark.id);
  } else {
    browser.bookmarks.create({title: currentTab.title, url: currentTab.url});
  }
}

browser.browserAction.onClicked.addListener(toggleBookmark);

/*
 * Switches currentTab and currentBookmark to reflect the currently active tab
 */
function updateAddonStateForActiveTab() {

  function isSupportedProtocol(urlString) {
    let supportedProtocols = ["https:", "http:", "ftp:", "file:"];
    let url = new URL(urlString);
    return supportedProtocols.indexOf(url.protocol) != -1;
  }

  function updateTab(tabs) {
    if (tabs.length) {
      currentTab = tabs[0];
      if (isSupportedProtocol(currentTab.url)) {
        let searching = browser.bookmarks.search({url: currentTab.url});
        searching.then((bookmarks) => {
          currentBookmark = bookmarks[0];
          updateIcon();
        });
      } else {
        console.log(`Bookmark it! does not support the '${currentTab.url}' URL.`)
      }
    }
  }

  let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

// listen for bookmarks being created
browser.bookmarks.onCreated.addListener(updateAddonStateForActiveTab);

// listen for bookmarks being removed
browser.bookmarks.onRemoved.addListener(updateAddonStateForActiveTab);

// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateAddonStateForActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateAddonStateForActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateAddonStateForActiveTab);

// update when the extension loads initially
updateAddonStateForActiveTab();
