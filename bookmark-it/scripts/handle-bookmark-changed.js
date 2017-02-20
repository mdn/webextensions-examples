/**
In this file:

Respond to bookmarks being created or destroyed,
and update the icon accordingly.
*/

function handleBookmarksUpdated(iconInfo, bookmarkInfo) {
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      if ((tabs.length > 0) && (tabs[0].url === bookmarkInfo.url)) {
        browser.browserAction.setIcon({
          path: iconInfo
        });
      }
    });
}

/**
When a new bookmark is created:
* check whether its URL matches the active tab's URL
* update the icon accordingly.
*/
browser.bookmarks.onCreated.addListener((id, bookmarkInfo) => {
  handleBookmarksUpdated(bookmarked, bookmarkInfo);
});

/**
When a new bookmark is removed:
* check whether its URL matches the active tab's URL
* update the icon accordingly.
*/
browser.bookmarks.onRemoved.addListener((id, removeInfo) => {
  handleBookmarksUpdated(notBookmarked, removeInfo.node);
});
