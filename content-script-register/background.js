'use strict';

var registered = null;

async function registerScript(message) {

  let hosts = message.hosts;
  let code = message.code;

  if (registered) {
    registered.unregister();
  }

  registered = await browser.contentScripts.register({
    matches: hosts,
    js: [{code}],
    runAt: "document_idle"
  });

}

browser.runtime.onMessage.addListener(registerScript);
