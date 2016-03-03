var currentTab;
var currentBookmark;

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
}

/*
 * Add or remove the bookmark on the current page.
 */
function toggleBookmark() {
  if (currentBookmark) {
    browser.bookmarks.remove(currentBookmark.id);
    currentBookmark = null;
    updateIcon();
  } else {
    browser.bookmarks.create({title: currentTab.title, url: currentTab.url}, function(bookmark) {
      currentBookmark = bookmark;
      updateIcon();
    });
  }
}

browser.browserAction.onClicked.addListener(toggleBookmark);

/*
 * Switches currentTab and currentBookmark to reflect the currently active tab
 */
function updateTab() {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];

      browser.bookmarks.search({url: currentTab.url}, (bookmarks) => {
        currentBookmark = bookmarks[0];
        updateIcon();
      });
    }
  });
}

// TODO listen for bookmarks.onCreated and bookmarks.onRemoved once Bug 1221764 lands

// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateTab);

// update when the extension loads initially
updateTab();
