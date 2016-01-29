// Connect to the background page.
var port = chrome.runtime.connect();

// Handle click events on the toolbar button.
document.querySelector("#toggle").addEventListener("click", function() {
  // Ask the background page to toggle the toolbar on the current tab
  port.postMessage("toggle-in-page-toolbar");
});
