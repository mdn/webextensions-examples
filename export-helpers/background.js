function onExecuted() {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  }
}

/*
Execute content script in the active tab.
*/
function loadContentScript() {
  chrome.tabs.executeScript({
    file: "/content_scripts/export.js"
  }, onExecuted);
}

/*
Add loadContentScript() as a listener to clicks on the browser action.
*/
chrome.browserAction.onClicked.addListener(loadContentScript);

/*
Show a notification when we get messages from the content script.
*/
chrome.runtime.onMessage.addListener((message) => {
  chrome.notifications.create({
    type: "basic",
    title: "Message from the page",
    message: message.content
  });
});
