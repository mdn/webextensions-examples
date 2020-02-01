'use strict';

var registered = null;

async function registerScript(message) {
  let {
    scriptMetadata,
    hosts,
    code,
    runAt,
    excludeMatches,
    includeGlobs,
    excludeGlobs,
    matchAboutBlank,
    allFrames,
  } = message;

  if (registered) {
    await registered.unregister();
    registered = null;
  }

  registered = await browser.userScripts.register({
    matches: hosts,
    js: [{code}],
    runAt,
    excludeMatches,
    includeGlobs,
    excludeGlobs,
    matchAboutBlank,
    allFrames,
    scriptMetadata,
  });
}

browser.runtime.onMessage.addListener(registerScript);
