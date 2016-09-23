"use strict";

browser.storage.local.get("super-important-user-setting")
  .then(results => {
    // If the old preferences data has not been imported yet...
    if (!results["super-important-user-setting"]) {
      // Ask to the legacy part to dump the needed data and send it back
      // to the background page...
      browser.runtime.sendMessage("import-legacy-data").then(reply => {
        if (reply) {
          // Where it can be saved using the WebExtensions storage API.
          browser.storage.local.set(reply);
        }
      });
    }
  });
