// The regex to determine when we should show the page action in the URL bar.
var page_url_regex = new RegExp('^https://addons.mozilla.org/[A-Za-z\-]+/[a-z]+/addon/');
// The regex to double check that the content script returned something that looked like an XPI.
var href_xpi_regex = new RegExp('^https://addons.mozilla.org/[a-z]+/downloads/file|latest/[0-9]+/');

function download(url) {
  if (url && href_xpi_regex.match(xpi)) {
    // Try and download the URL only if the content script found an actual
    // xpi to download. It is possible to fail in this quest.
    chrome.downloads.download({'url': url});
  } else {
    console.log('Not a valid XPI, ignoring:', url)
  }
}

chrome.pageAction.onClicked.addListener(function (tab) {
  // When the pageAction is clicked sends a message to the content script.
  chrome.tabs.sendMessage(tab.id, {}, download);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // When a tab is updated, check to see if we should show the page action
  // on that page.
  if (tab.url.match(page_url_regex)) {
    chrome.pageAction.show(tab.id);
  }
});
