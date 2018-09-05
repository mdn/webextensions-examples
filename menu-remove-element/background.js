"use strict";

var popupParameters;

browser.menus.create({
  id: "remove_element",
  title: "Remove element",
  documentUrlPatterns: ["https://*/*", "http://*/*"],
  contexts: ["audio", "editable", "frame", "image", "link", "page", "password", "video"],
});

browser.menus.onClicked.addListener(async (info, tab) => {
  popupParameters = {
    tabId: tab.id,
    frameId: info.frameId,
    targetElementId: info.targetElementId,
  };
  // Show our extension panel (popup.html) using pageAction.openPopup.
  // This panel can only be shown when the pageAction button is enabled,
  // so we temporarily enable it via pageAction.show().
  //
  // Even though pageAction.show is an asynchronous API, we do not use "await"
  // before continuing with the execution of the code, because the
  // pageAction.openPopup method requires a user gesture, and user gestures are
  // lost when a function returns or waits on a promise.
  browser.pageAction.show(tab.id);
  await browser.pageAction.openPopup();
  await browser.pageAction.hide(tab.id);
});

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg === "getPopupParameters") {
    return popupParameters;
  }
});
