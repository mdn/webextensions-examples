/**
In this file:

On button click:
* find out if the tab's URL is bookmarked.
*   if it isn't, bookmark it.
*   if it is, remove the bookmark.
*/
function toggleBookmark(tabInfo) {

  function updateBookmark(bookmarkArray) {
    if (bookmarkArray.length === 0) {
      browser.bookmarks.create({
        title: tabInfo.title,
        url: tabInfo.url
      });
    } else {
      browser.bookmarks.remove(bookmarkArray[0].id);
    }
  }
  
  function handleError(error) {
    console.error(`Error updating bookmark state: ${error}`);
  }

  browser.bookmarks.search(tabInfo.url)
    .then(updateBookmark)
    .catch(handleError);
}

browser.browserAction.onClicked.addListener(toggleBookmark);
