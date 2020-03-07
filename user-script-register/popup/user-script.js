'use strict';

const hostsInput =  document.querySelector("#hosts");
const codeInput =  document.querySelector("#code");
const userScriptIDInput =  document.querySelector("#userScriptID");
const lastErrorEl =  document.querySelector("#lastError");
const lastResultEl =  document.querySelector("#lastResult");

const defaultHosts = "*://*.org/*";
const defaultCode = `(async function () {
  console.log("USER SCRIPT EXECUTING on", window.location.href, {
    documentReadyState: document.readyState,
  });
  const oldStoredValue = await GM_getValue("testkey");
  await GM_setValue("testkey", window.location.href);
  const newStoredValue = await GM_getValue("testkey");

  const overwriteBody = () => {
    document.body.innerHTML = \`<h1>This page has been eaten: $\{JSON.stringify({oldStoredValue, newStoredValue})}<h1>\`
  }

  if (document.body) {
    overwriteBody();
  } else {
    window.addEventListener("load", overwriteBody, {once: true});
  }
})();`;
const defaultUserScriptID = "user_script_01";

hostsInput.value = defaultHosts;
codeInput.value = defaultCode;
userScriptIDInput.value = defaultUserScriptID;

async function loadLastSetValues() {
  const params = await browser.storage.local.get();

  const {
    hosts,
    code,
    userScriptID,
  } = params.lastSetValues || {};

  hostsInput.value = hosts ? hosts.join(",") : defaultHosts;
  codeInput.value = code ? code : defaultCode;
  userScriptIDInput.value = userScriptID ? userScriptID : defaultUserScriptID;

  lastErrorEl.textContent = params.lastError || "";
}

function stringToArray(value) {
  const res = value.split(",").map(el => el.trim()).filter(el => el !== "");

  return res.length > 0 ? res : null;
}

async function registerScript() {
  const params = {
    hosts: stringToArray(hostsInput.value),
    code: codeInput.value,
    userScriptID: userScriptID.value,
  };

  // Store the last submitted values to the extension storage
  // (so that they can be restored when the popup is opened
  // the next time).
  await browser.storage.local.set({
    lastSetValues: params,
  });

  try {
    // Clear the last userScripts.register result.
    lastResultEl.textContent = "";

    await browser.runtime.sendMessage(params);
    lastResultEl.textContent = "UserScript successfully registered";
    // Clear the last userScripts.register error.
    lastErrorEl.textContent = "";

    // Clear the last error stored.
    await browser.storage.local.remove("lastError");
  } catch (e) {
    // There was an error on registering the contentScript,
    // let's show the error message in the popup and store
    // the last error into the extension storage.

    const lastError = `${e}`;
    // Show the last userScripts.register error.
    lastErrorEl.textContent = lastError;

    // Store the last error.
    await browser.storage.local.set({lastError});
  }
}

loadLastSetValues();

document.querySelector("#register").addEventListener('click', registerScript);
