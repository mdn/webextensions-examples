chrome.runtime.onMessage.addListener(notify);

function notify(message) {
  console.log("background script received message");
  var notificationTitle = chrome.i18n.getMessage("notify-title");
  var notificationContent = chrome.i18n.getMessage("notify-content", message.url);
  chrome.notifications.create({
    "type": "basic",
    "iconUrl": chrome.extension.getURL("link.png"),
    "title": notificationTitle,
    "message": notificationContent
  });
}
