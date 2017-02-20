/**
In this file:

Update the browser action's icon when:
* the user changes the active tab (onActivated)
* the user loads a new page into the active tab (onUpdated)
* the add-on is installed or enabled.
*/

/**
Values for the icon when the page *is not* bookmarked.
*/
const notBookmarked = {
  19: "icons/star-empty-19.png",
  38: "icons/star-empty-38.png"
};

/**
Values for the icon when the page *is* bookmarked.
*/
const bookmarked = {
  19: "icons/star-filled-19.png",
  38: "icons/star-filled-38.png"
}


/**
If the array is empty, the page is not bookmarked.
Otherwise, the page is bookmarked.
*/
function updateIcon(bookmarkArray) {
  if (bookmarkArray.length === 0) {
    browser.browserAction.setIcon({
      path: notBookmarked
    });
  } else {
    browser.browserAction.setIcon({
      path: bookmarked
    });
  }
}

function handleError(error) {
  console.error(`Error updating bookmark icon: ${error}`);
}

/**
When the page hosted by a tab changes:
* check whether the new page is bookmarked
* update the icon accordingly.
*/
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    browser.bookmarks.search({url: changeInfo.url})
      .then(updateIcon)
      .catch(handleError);
  }
});

/**
When the currently active tab changes:
* get the new url for the newly active tab
* check whether the URL is bookmarked
* update the icon accordingly.
*/
browser.tabs.onActivated.addListener((activeInfo) => {
  browser.tabs.get(activeInfo.tabId)
    .then((tabInfo) => {
      return browser.bookmarks.search({url: tabInfo.url});
    })
    .then(updateIcon)
    .catch(handleError);
});

/**
When the add-on runs:
* get the active tab
* check whether the URL is bookmarked
* update the icon accordingly.
*/
function isArrayItemBookmarked(tabInfoArray) {
  if (tabInfoArray.length > 0) {
    return browser.bookmarks.search(tabInfoArray[0].url);
  } else {
    return Promise.resolve([]);
  }
}

browser.tabs.query({active: true, currentWindow: true})
  .then(isArrayItemBookmarked)
  .then(updateIcon);
