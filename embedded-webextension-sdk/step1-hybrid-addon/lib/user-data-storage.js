const sp = require("sdk/simple-prefs");
const ss = require("sdk/simple-storage");

ss.storage.superImportantUserStoredData = "This value was saved in the simple-storage";

exports.setSyncLegacyDataPort = function(port) {
  // Send the initial data dump.
  port.postMessage({
    prefs: {
      superImportantUserPref: sp.prefs["superImportantUserPref"],
    },
    storage: {
      superImportantUserStoredData: ss.storage.superImportantUserStoredData,
    },
  });

  // Keep the preferences in sync with the data stored in the webextension.
  sp.on("superImportantUserPref", () => {
    port.postMessage({
      prefs: {
        superImportantUserPref: sp.prefs["superImportantUserPref"],
      }
    });
  });
};
