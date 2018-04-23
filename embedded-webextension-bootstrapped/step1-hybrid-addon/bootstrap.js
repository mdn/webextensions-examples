"use strict";

function startup({webExtension}) {
  Components.utils.import("chrome://original-bootstrap-addon-id/content/AddonPrefs.jsm");

  // Start the embedded webextension.
  webExtension.startup().then(api => {
    const {browser} = api;
    browser.runtime.onMessage.addListener((msg, sender, sendReply) => {
      if (msg == "import-legacy-data") {
        // When the embedded webextension asks for the legacy data,
        // dump the data which needs to be preserved and send it back to the
        // embedded extension.
        sendReply({
          "super-important-user-setting": AddonPrefs.get("super-important-user-setting"),
        });
      }
    });
  });
}

function shutdown(data) {
  Components.utils.unload("chrome://original-bootstrap-addon-id/content/AddonPrefs.jsm");
}
