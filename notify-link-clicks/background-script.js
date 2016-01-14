chrome.runtime.onMessage.addListener(notify);

function notify(message) {
  console.log("background script received message");
  chrome.notifications.create({
    "type": "basic",
    "iconUrl": chrome.extension.getURL("icons/link-48.png"),
    "title": "You clicked a link!",
    "message": message.url
  });
}
