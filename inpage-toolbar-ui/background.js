// Send a message to the current tab's content script.
function toggleToolbar() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "toggle-in-page-toolbar");
  });
}

// Handle the browser action button.
chrome.browserAction.onClicked.addListener(toggleToolbar);

// Handle connections received from the add-on toolbar ui iframes.
chrome.runtime.onConnect.addListener(function (port) {
  if (port.sender.url == chrome.runtime.getURL("toolbar/ui.html")) {
    // Handle port messages received from the connected toolbar ui frames.
    port.onMessage.addListener(toggleToolbar);
  }
});
