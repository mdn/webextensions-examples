let loadTime = new Date();
let manifest = browser.runtime.getManifest();

function onInstalledNotification(details) {
  browser.notifications.create('onInstalled', {
    title: `Runtime Examples version: ${manifest.version}`,
    message: 'onInstalled has been called',
    type: 'basic'
  });
}

function onClick() {
  browser.runtime.reload();
}

browser.browserAction.setBadgeText({
  text: `${loadTime.getMinutes()}:${loadTime.getSeconds()}`
});

browser.browserAction.onClicked.addListener(onClick);
browser.runtime.onInstalled.addListener(onInstalledNotification);
