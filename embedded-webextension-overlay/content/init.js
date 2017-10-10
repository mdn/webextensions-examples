/* globals Components, dump */

{
  const addonId = "my-overlay-addon@me";
  const {
    AddonManager,
  } = Components.utils.import("resource://gre/modules/AddonManager.jsm", {});

  AddonManager.getAddonByID(addonId, addon => {
    const baseURI = addon.getResourceURI("/");

    const {
      LegacyExtensionsUtils,
    } = Components.utils.import("resource://gre/modules/LegacyExtensionsUtils.jsm");

    const myOverlayEmbeddedWebExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
      id: addonId, resourceURI: baseURI,
    });

    myOverlayEmbeddedWebExtension.startup().then(({browser}) => {
      dump(`${addonId} - embedded webext started\n`);
      browser.runtime.onMessage.addListener(msg => {
        dump(`${addonId} - received message from embedded webext ${msg}\n`);
      });
    }).catch(err => {
      Components.utils.reportError(
        `${addonId} - embedded webext startup failed: ${err.message} ${err.stack}\n`
      );
    });
  });
}
