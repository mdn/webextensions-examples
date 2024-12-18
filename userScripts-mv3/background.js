"use strict";

// This background.js file is responsible for observing the availability of the
// userScripts API, and registering user scripts when needed.
//
// - The runtime.onInstalled event is used to detect new installations, and
//   opens a custom extension UI where the user is asked to grant the
//   "userScripts" permission.
//
// - The permissions.onAdded and permissions.onRemoved events detect changes to
//   the "userScripts" permission, whether triggered from the extension UI, or
//   externally (e.g., through browser UI).
//
// - The storage.local API is used to store user scripts across extension
//   updates. This is necessary because the userScripts API clears any
//   previously registered scripts when an extension is updated.
//
// - The userScripts API manages script registrations with the browser. The
//   applyUserScripts() function in this file demonstrates the relevant aspects
//   to registering and updating user scripts that apply to most extensions
//   that manage user scripts. To keep this file reasonably small, most of the
//   application-specific logic is in userscript_manager_logic.mjs.

function isUserScriptsAPIAvailable() {
  return !!browser.userScripts;
}
var userScriptsAvailableAtStartup = isUserScriptsAPIAvailable();

var managerLogic; // Lazily initialized by ensureManagerLogicLoaded().
async function ensureManagerLogicLoaded() {
  if (!managerLogic) {
    managerLogic = await import("./userscript_manager_logic.mjs");
  }
}

browser.runtime.onInstalled.addListener(details => {
  if (details.reason !== "install") {
    // Only show the extension's onboarding logic on extension installation,
    // and not, e.g., on browser or extension updates.
    return;
  }
  if (!isUserScriptsAPIAvailable()) {
    // The extension needs the "userScripts" permission, but this is not
    // granted. Open the extension's options_ui page, which implements
    // onboarding logic, in options.html + options.mjs.
    browser.runtime.openOptionsPage();
  }
});

browser.permissions.onRemoved.addListener(permissions => {
  if (permissions.permissions.includes("userScripts")) {
    // Pretend that userScripts is not available, to enable permissions.onAdded
    // to re-initialize when the permission is restored.
    userScriptsAvailableAtStartup = false;

    // Clear the cached state, so that ensureUserScriptsRegistered() refreshes
    // the registered user scripts when the permission is granted again.
    browser.storage.session.remove("didInitScripts");

    // Note: the "userScripts" namespace is unavailable, so we cannot and
    // should not try to unregister scripts.
  }
});

browser.permissions.onAdded.addListener(permissions => {
  if (permissions.permissions.includes("userScripts")) {
    if (userScriptsAvailableAtStartup) {
      // If background.js woke up to dispatch permissions.onAdded, it has
      // detected the availability of the userScripts API and immediately
      // started initialization. Return now to avoid double-initialization.
      return;
    }
    browser.runtime.onUserScriptMessage.addListener(onUserScriptMessage);
    ensureUserScriptsRegistered();
  }
});

// When the user modifies a user script in options.html + options.mjs, the
// changes are stored in storage.local and this listener is triggered.
browser.storage.local.onChanged.addListener(changes => {
  if (changes.savedScripts?.newValue && isUserScriptsAPIAvailable()) {
    // userScripts API is available and there are changes that can be applied.
    applyUserScripts(changes.savedScripts.newValue);
  }
});

if (userScriptsAvailableAtStartup) {
  // Register listener immediately if the API is available, in case the
  // background.js is woken to dispatch the onUserScriptMessage event.
  browser.runtime.onUserScriptMessage.addListener(onUserScriptMessage);
  ensureUserScriptsRegistered();
}

async function onUserScriptMessage(message, sender) {
  await ensureManagerLogicLoaded();
  return managerLogic.handleUserScriptMessage(message, sender);
}

async function ensureUserScriptsRegistered() {
  let { didInitScripts } = await browser.storage.session.get("didInitScripts");
  if (didInitScripts) {
    // The scripts are initialized, e.g., by a (previous) startup of this
    // background script. Skip expensive initialization.
    return;
  }
  let { savedScripts } = await browser.storage.local.get("savedScripts");
  savedScripts ||= [];
  try {
    await applyUserScripts(savedScripts);
  } finally {
    // Set a flag to mark the completion of initialization, to avoid running
    // this logic again at the next startup of this background.js script.
    await browser.storage.session.set({ didInitScripts: true });
  }
}

async function applyUserScripts(userScriptTexts) {
  await ensureManagerLogicLoaded();
  // Note: assumes userScriptTexts to be valid, validated by options.mjs.
  let scripts = userScriptTexts.map(str => managerLogic.parseUserScript(str));

  // Registering scripts is expensive. Compare the scripts with the old scripts
  // to ensure that only modified scripts are updated.
  let oldScripts = await browser.userScripts.getScripts();

  let {
    scriptIdsToRemove,
    scriptsToUpdate,
    scriptsToRegister,
  } = managerLogic.computeScriptDifferences(oldScripts, scripts);

  // Now, for the changed scripts, apply the changes in this order:
  // 1. Unregister obsolete scripts.
  // 2. Reset or configure worlds.
  // 3. Update and/or register new scripts.
  // This order is significant: scripts rely on world configurations, and while
  // running this asynchronous script updating logic, the browser may try to
  // execute any of the registered scripts when a website loads in a tab or
  // iframe, unrelated to the extension execution.
  // To prevent scripts from executing with the wrong world configuration,
  // worlds are configured before new scripts are registered.

  // 1. Unregister obsolete scripts.
  if (scriptIdsToRemove.length) {
    await browser.userScripts.unregister({ worldIds: scriptIdsToRemove });
  }

  // 2. Reset or configure worlds.
  if (scripts.some(s => s.worldId)) {
    // When userscripts need privileged functionality, run them in a sandbox
    // (USER_SCRIPT world). To offer privileged functionality, we need
    // a communication channel between the userscript and this privileged side.
    // Specifying "messaging:true" exposes runtime.sendMessage() these worlds,
    // which upon invocation triggers the runtime.onUserScriptMessage event.
    //
    // Calling configureWorld without a specific worldId sets the default world
    // configuration, which is inherit by every other USER_SCRIPT world that
    // does not have a more specific configuration.
    //
    // Since every USER_SCRIPT world in this demo extension has the same world
    // configuration, we can set the default once, without needing to define
    // world-specific configurations.
    await browser.userScripts.configureWorld({ messaging: true });
  } else {
    // Reset the default world's configuration.
    await browser.userScripts.resetWorldConfiguration();
  }

  // 3. Update and/or register new scripts.
  if (scriptsToUpdate.length) {
    await browser.userScripts.update(scriptsToUpdate);
  }
  if (scriptsToRegister.length) {
    await browser.userScripts.register(scriptsToRegister);
  }
}
