"use strict";

if (typeof browser == "undefined") {
  // `browser` is not defined in Chrome, but Manifest V3 extensions in Chrome
  // also support promises in the `chrome` namespace, like Firefox. To easily
  // test the example without modifications, polyfill "browser" to "chrome".
  globalThis.browser = chrome;
}

const permissions = {
  // This origin is listed in host_permissions:
  origins: ["*://*.example.com/"],
};

const checkbox_host_permission = document.getElementById("checkbox_host_permission");
checkbox_host_permission.onchange = async () => {
  if (checkbox_host_permission.checked) {
    let granted = await browser.permissions.request(permissions);
    if (!granted) {
      // Permission request was denied by the user.
      checkbox_host_permission.checked = false;
    }
  } else {
    try {
      await browser.permissions.remove(permissions);
    } catch (e) {
      // While Chrome allows granting of host_permissions that have manually
      // been revoked by the user, it fails when revoking them, with
      // "Error: You cannot remove required permissions."
      console.error(e);
      checkbox_host_permission.checked = true;
    }
  }
};
browser.permissions.contains(permissions).then(granted => {
  checkbox_host_permission.checked = granted;
});
