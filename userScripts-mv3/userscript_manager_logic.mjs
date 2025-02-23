// A userscript manager runs user-defined scripts (called userscripts) on
// websites based on the metadata that is encoded in the userscript source text.
// For history, see https://en.wikipedia.org/wiki/Userscript
//
// This file provides a partial implementation of a userscript manager, and
// exports the following functions that are called by code in background.js:
//
// - parseUserScript() - parses userscript source text to a representation of
//   the user script for use with the "browser.userScripts" extension API.
//
// - computeScriptDifferences() - compares two representations of a user script
//   and returns whether they have changed. This is used for determining which
//   scripts should be updated, when the actual registrations are compared with
//   the scripts in the extension storage. As script registration is relatively
//   expensive, this enables updating only the scripts that have changed.
//
// - handleUserScriptMessage() - Handles browser.runtime.onUserScriptMessage
//   event, which is triggered when a script in the USER_SCRIPT world invokes
//   the browser.runtime.sendMessage() method (see userscript_api.js).

export function parseUserScript(userScriptText) {
  let metadata = parseMetadataBlock(userScriptText);
  if (!metadata) {
    console.warn("Ignoring non-userscript input");
    return null;
  }

  // Create object for use with browser.userScripts.register():
  let registeredUserScript = {
    // The userScripts API requires each script to have a unique ID that does
    // not start with "_". The userscript format specifies the identifier of
    // a script is formed from @namespace and @name:
    // https://wiki.greasespot.net/Metadata_Block#@name
    // https://violentmonkey.github.io/api/metadata-block/#name
    id: JSON.stringify([ metadata.get("@namespace"), metadata.get("@name") ]),
    js: null, // js is a required array and will be set below.
    // All of the following fields are optional.
    allFrames: !metadata.has("@noframes"),
    matches: metadata.getArray("@match"),
    excludeMatches: metadata.getArray("@exclude-match"),
    includeGlobs: metadata.getArray("@include"),
    excludeGlobs: metadata.getArray("@exclude"),
    runAt: parseRunAt(metadata.get("@run-at")),
    world: null, // "MAIN" or "USER_SCRIPT", set below.
    worldId: null, // Can only be set if world is "USER_SCRIPT", set below.
  };

  // See https://wiki.greasespot.net/@grant
  // When "@grant" is used, the userscript requests access to extra APIs that
  // are not available to regular web pages.
  let grants = parseGrants(metadata.getArray("@grant"));
  if (grants.length === 0) {
    // When the userscript does not request any additional APIs, we only need
    // to execute one script: the original userscript source code.
    registeredUserScript.js = [{ code: userScriptText }];
    // When no additional APIs are granted, it is not strictly necessary to
    // isolate the code from the web page, and therefore we use the "MAIN"
    // world.
    registeredUserScript.world = "MAIN";
    registeredUserScript.worldId = "";
  } else {
    // When the userscript defines "@grant", it requests access to several
    // userscript-specific APIs. These are not provided by the browser, but
    // the responsibility of the user script manager extension.

    // See userscript_api.js for an explanation of this logic.
    registeredUserScript.js = [
      { file: "userscript_api.js" },
      // initCustomAPIForUserScripts is defined in userscript_api.js
      { code: `initCustomAPIForUserScripts(${JSON.stringify(grants)})`},
      { code: userScriptText },
    ];

    // If extra APIs are requested, we need to define a sandbox that isolates
    // the execution environment of the userscript from the web page, or else
    // the page can try to interfere with the userscript, and at worst abuse
    // privileged functionality.
    registeredUserScript.world = "USER_SCRIPT";
    // To isolate different userscript scripts from each other, we create a
    // unique world for each user script. This enables us to effectively
    // implement access control per script.
    registeredUserScript.worldId = Math.random().toString();
  }
  return registeredUserScript;
}

function parseMetadataBlock(userScriptText) {
  // Parse userscript metadata block, which is in the following format:
  // // ==UserScript==
  // // @key value
  // // ==/UserScript==
  // See https://wiki.greasespot.net/Metadata_Block
  let header = `\n${userScriptText}\n`.split("\n// ==UserScript==\n", 2)[1];
  if (!header) {
    console.error("UserScript header start not found");
    return null;
  }
  header = header.split("\n// ==/UserScript==\n")[0];
  if (!header) {
    console.error("UserScript header end not found");
    return null;
  }
  let metadata = new Map();
  for (let line of header.split("\n")) {
    let match = /^\/\/ (@\S+)(\s+.*)?$/.exec(line);
    if (!match) {
      console.warn(`Skipping invalid UserScript header line: ${line}`);
      continue;
    }
    let [, key, value] = match;
    if (!metadata.has(key)) {
      metadata.set(key, []);
    }
    metadata.get(key).push(value.trim());
  }
  return {
    rawHeader: header,
    has: key => metadata.has(key),
    get: key => metadata.get(key)?.[0],
    getArray: key => metadata.get(key) || [],
  };
}

function parseRunAt(runAtFromUserScriptMetadata) {
  // Transforms some of the supported @run-at values to the values
  // https://wiki.greasespot.net/Metadata_Block#.40run-at
  // https://www.tampermonkey.net/documentation.php#meta:run_at
  // https://violentmonkey.github.io/api/metadata-block/#run-at
  switch (runAtFromUserScriptMetadata) {
    case "document-start": return "document_start";
    case "document-end": return "document_end";
    case "document-idle": return "document_idle";
    // Default if unspecified or not recognized. Some userscript managers
    // support more values, the extension API only recognizes the above three.
    default: return "document_idle";
  }
}

function isSameRegisteredUserScript(oldScript, newScript) {
  // In general, to test whether two RegisteredUserScript are equal, we have to
  // compare each property (and if undefined/null, use the default value).
  //
  // In this demo, the parseUserScripts function generated all of the script's
  // properties from an input code string, which is also the last item of the
  // "js" array. Comparing these is enough to test whether they are the same.
  return oldScript.js.at(-1).code === newScript.js.at(-1).code;
}

export function computeScriptDifferences(oldScripts, newScripts) {
  let scriptIdsToRemove = [];
  let scriptsToUpdate = [];
  let scriptsToRegister = [];

  for (let script of oldScripts) {
    if (!newScripts.some(s => s.id === script.id)) {
      // old script no longer exists. We should remove it.
      scriptIdsToRemove.push(script.id);
    }
  }
  for (let script of newScripts) {
    let oldScript = oldScripts.find(s => s.id === script.id);
    if (!oldScript) {
      scriptsToRegister.push(script);
    } else if (!isSameRegisteredUserScript(script, oldScript)) {
      // Script was updated, remove old one and register new one.
      scriptsToUpdate.push(script);
    } else {
      // oldScript is kept when we do not update or remove it.
    }
  }

  return { scriptIdsToRemove, scriptsToUpdate, scriptsToRegister };
}

function parseGrants(grantsFromUserScriptMetadata) {
  // Userscripts may access privileged APIs as defined in:
  // https://wiki.greasespot.net/@grant
  // https://violentmonkey.github.io/api/metadata-block/#grant
  // https://www.tampermonkey.net/documentation.php#meta:grant
  let grants = [];
  for (let grant of grantsFromUserScriptMetadata) {
    if (grant === "none") {
      // "@grant none" is equivalent to no grants.
      return [];
    }

    // Although there are many APIs, we only support a small subset in this
    // demo. ee handleUserScriptMessage() below and userscript_api.js.
    if (grant === "GM_info" || grant === "GM_openInTab") {
      grants.push(grant);
    } else {
      console.warn(`@grant ${grant} is not implemented`);
    }
  }
  return grants;
}

export async function handleUserScriptMessage(message, sender) {
  // This is the runtime.onUserScriptMessage handler that implements the
  // privileged functionality to support functionality in userscript_api.js

  // TODO: Validate that the message is allowed.
  // sender.userScriptWorldId can be used to look up the world and the scripts
  // that execute within.

  if (message.userscript_api_name === "GM_openInTab") {
    await browser.tabs.create({ url: message.args[0] });
    return;
  }

  if (message.userscript_api_name === "GM_info") {
    // In parseUserScripts(), each generated script has a unique worldId, so if
    // the script is still registered, we can discover the script registration.
    // For simplicity, we extract the original userscript source text from it.
    let scripts = await browser.userScripts.getScripts();
    let script = scripts.find(s => s.worldId === sender.userScriptWorldId);
    let userScriptText = script.js.at(-1).code;

    // Minimal implementation of GM_info, based on:
    // https://wiki.greasespot.net/GM.info
    let metadata = parseMetadataBlock(userScriptText);
    return {
      script: {
        description: metadata.get("@description"),
        excludes: metadata.getArray("@exclude"),
        includes: metadata.getArray("@include"),
        matches: metadata.getArray("@match"),
        name: metadata.get("@name"),
        namespace: metadata.get("@namespace"),
        "run-at": metadata.get("@run-at"),
        version: metadata.get("@version"),
      },
      scriptMetaStr: metadata.rawHeader,
      scriptHandler: "[Name of my Userscript Manager]",
      version: browser.runtime.getManifest().version,
    };
  }

  console.error("Unexpected message", message);
}
