"use strict";

var gettingItem = browser.storage.local.get("super-important-user-setting");
gettingItem.then(results => {
  const panelContent = results["super-important-user-setting"] || "No settings saved.";
  document.querySelector("#panel-content").textContent = panelContent;
});
