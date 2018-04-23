let loadTime = new Date();
let manifest = browser.runtime.getManifest();

function onInstalledNotification(details) {
  browser.notifications.create('onInstalled', {
    title: `Runtime Examples version: ${manifest.version}`,
    message: `onInstalled has been called, background page loaded at ${loadTime.getHours()}:${loadTime.getMinutes()}`,
    type: 'basic'
  });
}

function onClick() {
  browser.runtime.reload();
}

browser.browserAction.onClicked.addListener(onClick);
browser.runtime.onInstalled.addListener(onInstalledNotification);
