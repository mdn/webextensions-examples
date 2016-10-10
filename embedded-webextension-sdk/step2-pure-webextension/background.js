"use strict";

browser.runtime.onMessage.addListener(msg => {
  const {type} = msg;

  switch (type) {
  case "notify-attached-tab":
    browser.notifications.create({
      type: "basic",
      title: "Attached to tab",
      message: msg.message
    });
    break;
  }
});
