"use strict";

/**
 * Performs feature detection, to detect whether access keys are supported.
 *
 * @returns {boolean}
 *          Whether access keys are supported in extension menu item labels.
 */
function detectAccessKeyMenuFeature() {
  // Access keys are supported since Firefox 63:
  // https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/63#Menus
  //
  // Before Firefox 63, any '&' in the menu label would appear literally. There
  // is no direct way to detect whether access keys are supported, so we will
  // indirectly detect support, via another feature that shipped in the same
  // release: the 'visible' property in the menus API, as shown below.

  // API parameters in the WebExtensions API are often validated immediately.
  // If validation fails, an error is thrown.
  // We can take advantage of this behavior to detect feature support:
  // If a property is not supported, an error is thrown.
  try {
    // If the feature is supported, then the API will be invoked. Pass an unused
    // menu item ID to make sure that we do not modify existing menu items.
    browser.menus.update("Some ID that is not used by any existing menu item", {
      visible: true,
    });
    return true;
  } catch (e) {
    return false;
  }
  // Side note: In Firefox 63, the menus.getTargetElement API was introduced.
  // So the above try-catch could also have been replaced with this:
  //
  // return !!browser.menus.getTargetElement;
  // 
  // The example uses try-catch anyway to demonstrate feature detection based
  // on parameter properties.
}

var IS_ACCESS_KEY_SUPPORTED = detectAccessKeyMenuFeature();

function formatMenuLabel(menuLabel) {
  if (!IS_ACCESS_KEY_SUPPORTED) {
    // Access keys not supported (e.g. Firefox 62 and older).
    // Remove ampersands to prevent them from showing up literally.
    menuLabel = menuLabel.replace(/&(&?)/g, "$1");
  }
  return menuLabel;
}

// The "menuItemWithAccessKey" message is defined in  _locales/en/messages.json
// and contains a '&' to specify an access key.
// To support Firefox 62 an earlier (where access keys were not recognized),
// the example below uses formatMenuLabel to post-process the message if
// access keys are not supported.
//
// If you are not interested in supporting Firefox 62 and earlier, remove all
// of the above code, and remove "formatMenuLabel(" and ")" below.

browser.menus.create({
  id: "menu_item_with_access_key",
  title: formatMenuLabel(browser.i18n.getMessage("menuItemWithAccessKey")),
  contexts: ["page"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "menu_item_with_access_key") {
    console.log(`Clicked at ${info.pageUrl} in tab at index ${tab.index}`);
  }
});
