'use strict';

const openLabelledId = "open-labelled";

browser.menus.create({
  id: openLabelledId,
  title: "Open",
  contexts: ["link"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === openLabelledId) {
    browser.tabs.update(tab.id, {
      url: info.linkUrl
    });
  }
});

function updateMenuItem(linkHostname) {
  browser.menus.update(openLabelledId, {
    title: `Open (${linkHostname})`
  });
  browser.menus.refresh();
}

browser.menus.onShown.addListener(info => {
  if (!info.linkUrl) {
    return;
  }
  let linkElement = document.createElement("a");
  linkElement.href = info.linkUrl;
  updateMenuItem(linkElement.hostname);
});
