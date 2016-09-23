"use strict";

browser.storage.local.get("super-important-user-setting", results => {
  const panelContent = results["super-important-user-setting"] || "No settings saved.";

  document.querySelector("#panel-content").textContent = panelContent;
});
