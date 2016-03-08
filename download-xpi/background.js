var rx = new RegExp('^https://addons.mozilla.org/[A-Za-z\-]+/[a-z]+/addon/');
var xpi = new RegExp('^https://addons.mozilla.org/[a-z]+/downloads/file/[0-9]+/');

function download(url) {
  if (url.match(xpi)) {
    chrome.downloads.download({'url': url});
  } else {
    console.log('Not a valid XPI, ignoring:', xpi)
  }
}

chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, {}, download);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.match(rx)) {
    chrome.pageAction.show(tab.id);
  }
});
