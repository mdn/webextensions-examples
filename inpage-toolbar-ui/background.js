// Send a message to the current tab's content script.
function toggleToolbar() {
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, "toggle-in-page-toolbar");
  });
}

// Handle the browser action button.
browser.browserAction.onClicked.addListener(toggleToolbar);

// Handle connections received from the add-on toolbar ui iframes.
browser.runtime.onConnect.addListener(function (port) {
  if (port.sender.url == browser.runtime.getURL("toolbar/ui.html")) {
    // Handle port messages received from the connected toolbar ui frames.
    port.onMessage.addListener(toggleToolbar);
  }
});
