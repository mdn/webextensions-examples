"use strict";

// userscript_api.js defines a single function that generates the global APIs
// that should be made available to scripts running in this USER_SCRIPT sandbox.
// This script is scheduled to run before user scripts by the parseUserScript
// function in userscript_manager_logic.js

globalThis.initCustomAPIForUserScripts = grants => {
  // Allow initialization only once.
  delete globalThis.initCustomAPIForUserScripts;

  // background.js calls userScripts.configureWorld({ messaging: true }), which
  // exposes runtime.sendMessage here. When this method is called, the
  // runtime.onUserScriptMessage listener (in background.js) is called, which
  // in turn calls handleUserScriptMessage in userscript_manager_logic.js.
  const sendMessage = browser.runtime.sendMessage;

  // Clear access to privileged API to prevent userscripts from communicating
  // to the privileged backend.
  globalThis.browser = undefined;

  if (grants.includes("GM_info")) {
    // Example of an API that retrieves information:
    // https://www.tampermonkey.net/documentation.php#api:GM_info
    // https://violentmonkey.github.io/api/gm/#gm_info
    // https://wiki.greasespot.net/GM.info
    globalThis.GM_info = async () => {
      return sendMessage({ userscript_api_name: "GM_info" });
    };
  }

  if (grants.includes("GM_openInTab")) {
    // Example of an API that sends information:
    // https://www.tampermonkey.net/documentation.php#api:GM_openInTab
    // https://violentmonkey.github.io/api/gm/#gm_openintab
    // https://wiki.greasespot.net/GM.openInTab
    globalThis.GM_openInTab = async (url) => {
      await sendMessage({ userscript_api_name: "GM_openInTab", args: [url] });
    };
  }

  // TODO: Implement more APIs.

  // After this function returns, the userscript may execute and potentially
  // change built-in prototypes. To protect against that, make sure to store
  // any functions that you want to use in a local variable!
};
