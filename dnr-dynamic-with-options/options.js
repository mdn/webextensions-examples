"use strict";

if (typeof browser == "undefined") {
  // `browser` is not defined in Chrome, but Manifest V3 extensions in Chrome
  // also support promises in the `chrome` namespace, like Firefox. To easily
  // test the example without modifications, polyfill "browser" to "chrome".
  globalThis.browser = chrome;
}

function initializePrefHandlerForHostPermissions() {
  const textarea = document.getElementById("input-host-permissions");
  const statusOutput = document.getElementById("status-host-permissions");
  document.getElementById("grant-host-permissions").onclick = async () => {
    try {
      let origins = JSON.parse(textarea.value);
      statusOutput.value = "Requesting permissions";
      let ok = await browser.permissions.request({ origins });
      statusOutput.value = ok ? "Permissions granted" : "Permissions denied";
    } catch (e) {
      statusOutput.value = `Failed to grant permissions: ${e}`;
    }
  };
  document.getElementById("reset-host-permissions").onclick = async () => {
    let permissions = await browser.permissions.getAll();
    await browser.permissions.remove({ origins: permissions.origins });
    statusOutput.value = `Removed: ${JSON.stringify(permissions.origins)}`;
  };

  browser.permissions.getAll().then(
    permissions => {
      textarea.value = JSON.stringify(permissions.origins, null, 2);
    }
  );
}

function serializeRules(rules) {
  // The getDynamicRules and getSessionRules APIs returns the rules, including
  // optional keys. For readability, we strip all optional keys.
  // JSON.stringify will drop keys if the replacer function returns undefined.
  const replacer = (key, value) => value === null ? undefined : value;
  return JSON.stringify(rules, replacer, 2);
}

function initializePrefHandlerForDynamicDNR() {
  const textarea = document.getElementById("input-dynamic-rules");
  const statusOutput = document.getElementById("status-dynamic-rules");
  document.getElementById("save-dynamic-rules").onclick = async () => {
    try {
      let newRules = JSON.parse(textarea.value);
      let oldRules = await browser.declarativeNetRequest.getDynamicRules();
      await browser.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: oldRules.map(rule => rule.id),
        addRules: newRules,
      });
      statusOutput.value = `Saved ${newRules.length} rules`;
    } catch (e) {
      statusOutput.value = `Failed to save rules: ${e}`;
    }
  };

  browser.declarativeNetRequest.getDynamicRules().then(rules => {
    textarea.value = serializeRules(rules);
  });
}

function initializePrefHandlerForSessionDNR() {
  const textarea = document.getElementById("input-session-rules");
  const statusOutput = document.getElementById("status-session-rules");
  document.getElementById("save-session-rules").onclick = async () => {
    try {
      let newRules = JSON.parse(textarea.value);
      let oldRules = await browser.declarativeNetRequest.getSessionRules();
      await browser.declarativeNetRequest.updateSessionRules({
        removeRuleIds: oldRules.map(rule => rule.id),
        addRules: newRules,
      });
      statusOutput.value = `Saved ${newRules.length} rules`;
    } catch (e) {
      statusOutput.value = `Failed to save rules: ${e}`;
    }
  };

  browser.declarativeNetRequest.getSessionRules().then(rules => {
    textarea.value = serializeRules(rules);
  });
}

initializePrefHandlerForHostPermissions();
initializePrefHandlerForDynamicDNR();
initializePrefHandlerForSessionDNR();
