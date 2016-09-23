"use strict";

browser.storage.local.set("super-important-user-setting", results => {
  const panelContent = results["super-important-user-setting"] || "No settings saved.";

  document.querySelector("#panel-content").textContent = panelContent;
});
