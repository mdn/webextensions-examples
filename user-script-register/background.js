'use strict';

let registered = null;

async function registerScript(message) {
  const {
    hosts,
    code,
    userScriptID,
  } = message;

  if (registered) {
    await registered.unregister();
    registered = null;
  }

  registered = await browser.userScripts.register({
    matches: hosts,
    js: [{code}],
    scriptMetadata: {userScriptID},
  });
}

browser.runtime.onMessage.addListener(registerScript);
