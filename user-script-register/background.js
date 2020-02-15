'use strict';

let registered = null;

async function registerScript(message) {
  const {
    hosts,
    code,
  } = message;

  if (registered) {
    await registered.unregister();
    registered = null;
  }

  registered = await browser.userScripts.register({
    matches: hosts,
    js: [{code}],
  });
}

browser.runtime.onMessage.addListener(registerScript);
