"use strict";

// The browser.menus.getTargetElement API allows extensions to identify the
// clicked element that matches a menus.onClicked or menus.onShown event, as of
// Firefox 63.
//
// This polyfill script approximates the behavior, by returning the target of
// the most recently observed contextmenu event in this document.
//
// Limitations:
// - Cannot return the menu target before this script has run.
//   In contrast, the real menus.getTargetElement API will return the element
//   even if the extension did not run any scripts at the time of the click.
//
// - Does not offer the guarantee that the element matches the menus.onClicked
//   or menus.onShown event.
//   In contrast, the real menus.getTargetElement API only returns an element
//   if the given first parameter matches the info.targetElementId integer from
//   the menus.onClicked or menus.onShown events.
if (!browser.menus || !browser.menus.getTargetElement) {
  var menuTarget = null;
  let cleanupIfNeeded = () => {
    if (menuTarget && !document.contains(menuTarget)) menuTarget = null;
  };
  document.addEventListener("contextmenu", (event) => {
    menuTarget = event.target;
  }, true);
  document.addEventListener("visibilitychange", cleanupIfNeeded, true);
  browser.menus = browser.menus || {};
  browser.menus.getTargetElement = () => {
    cleanupIfNeeded();
    return menuTarget;
  };
  true; // Used by popup.js, as variable didUsePolyfill.
}
