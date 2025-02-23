import { parseUserScript } from "./userscript_manager_logic.mjs";

function initializePrefHandlerForUserScriptsPermissions() {
  const PERM = "userScripts";
  const button = document.getElementById("grant_userScripts_permission");
  function renderPermStatus(granted) {
    if (granted) {
      button.disabled = true;
      button.textContent = "userScripts permission has been granted";
    } else {
      button.disabled = false;
      button.textContent = "Grant access to userScripts API";
    }
  }

  button.onclick = async () => {
    button.disabled = true; // Avoid double-click.
    button.textContent = "Showing userScripts permission request...";
    let ok = await browser.permissions.request({ permissions: [PERM] });
    renderPermStatus(ok);
  };

  browser.permissions.onAdded.addListener(permissions => {
    if (permissions.permissions.includes(PERM)) {
      renderPermStatus(true);
    }
  });

  browser.permissions.onRemoved.addListener(permissions => {
    if (permissions.permissions.includes(PERM)) {
      renderPermStatus(false);
    }
  });

  browser.permissions.contains({ permissions: [PERM] }).then(renderPermStatus);
}

function isValidMatchPattern(str) {
  // This is a bit stricter than what browsers consider a valid match pattern,
  // but userscripts usually run on http(s) only.
  return /^(https?|\*):\/\/(\*|(\*\.)?[^*/]+)\/.*$/.test(str);
}

/**
 * Shows the form where the user can edit or create a user script.
 *
 * @param {string} userScriptText - Non-empty if editing an existing script.
 */
function showEditDialog(userScriptText) {
  const edit_script_dialog = document.getElementById("edit_script_dialog");
  const textarea = edit_script_dialog.querySelector("textarea.source_text");
  const saveButton = edit_script_dialog.querySelector("button.save_button");
  const removeButton = edit_script_dialog.querySelector("button.remove_button");
  const outputStatus = edit_script_dialog.querySelector("output");

  textarea.value = userScriptText;

  outputStatus.value = "";

  saveButton.disabled = false;
  saveButton.onclick = async () => {
    saveButton.disabled = true;
    try {
      let savedScripts =
        await getScriptsToSaveIfValid(userScriptText, textarea.value);
      outputStatus.value = "Applying...";
      await browser.storage.local.set({ savedScripts });
      await renderCurrentScripts();
      edit_script_dialog.close();
    } catch (e) {
      outputStatus.value = e.message;
    } finally {
      saveButton.disabled = false;
    }
  };
  
  removeButton.hidden = !userScriptText;
  removeButton.onclick = async () => {
    if (confirm("Do you want to remove this script?")) {
      let { savedScripts } = await browser.storage.local.get("savedScripts");
      savedScripts = savedScripts.filter(txt => txt !== userScriptText);
      await browser.storage.local.set({ savedScripts });
      await renderCurrentScripts();
      edit_script_dialog.close();
    }
  };

  async function suggestExample(sourceUrl) {
    if (textarea.value && !confirm("Input is not empty. Proceed to replace?")) {
      return;
    }
    let res = await fetch(sourceUrl);
    textarea.value = await res.text();
  }

  edit_script_dialog.querySelector("#sample_privileged").onclick = () => {
    suggestExample("userscript_examples/privileged.user.js");
  };
  edit_script_dialog.querySelector("#sample_unprivileged").onclick = () => {
    suggestExample("userscript_examples/unprivileged.user.js");
  };

  edit_script_dialog.showModal();
}

async function getScriptsToSaveIfValid(oldUserScriptText, newUserScriptText) {
  let newScript = parseUserScript(newUserScriptText);
  if (!newScript) {
    throw new Error("Input is not a user script, missing header");
  }
  if (!newScript.matches?.length && !newScript.includeGlobs?.length) {
    throw new Error("At least one @include or @match must be specified");
  }
  for (let pattern of newScript.matches || []) {
    if (!isValidMatchPattern(pattern)) {
      throw new Error(`Invalid match pattern: @match ${pattern}`);
    }
  }
  for (let pattern of newScript.excludeMatches || []) {
    if (!isValidMatchPattern(pattern)) {
      throw new Error(`Invalid match pattern: @exclude-match ${pattern}`);
    }
  }
  let { savedScripts } = await browser.storage.local.get("savedScripts");
  savedScripts ||= [];
  if (oldUserScriptText) {
    let i = savedScripts.indexOf(oldUserScriptText);
    if (i === -1) {
      // This is unexpected, but could happen if the user opened the options
      // page in a different tab and continued modifying scripts there.
      throw new Error(
        "Cannot find old script to replace. Did you modify the script in another tab?"
      );
    }
    savedScripts[i] = newUserScriptText;
  } else {
    savedScripts.push(newUserScriptText);
  }

  // Script IDs must be unique. The storage should contain valid scripts only,
  // so getting too many IDs implies that the proposed ID was duplicated.
  let seenIds = savedScripts.map(s => parseUserScript(s).id);
  if (seenIds.filter(id => id === newScript.id).length > 1) {
    throw new Error("@namespace + @name must not be used elsewhere");
  }

  // All valid! Return the scripts to save.
  return savedScripts;
}

async function renderCurrentScripts() {
  const outputList = document.getElementById("list_of_scripts");
  outputList.querySelector("#add_new").onclick = () => {
    showEditDialog("");
  };
  // Clear any previously rendered results, except for the "#add_new" button.
  outputList.replaceChildren(outputList.firstElementChild);

  let { savedScripts } = await browser.storage.local.get("savedScripts");
  savedScripts ||= [];
  for (let userScriptText of savedScripts) {
    let registeredUserScript = parseUserScript(userScriptText);

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => {
      showEditDialog(userScriptText);
    };
    let li = document.createElement("li");
    li.append(editButton, `Script ID: ${registeredUserScript.id}`);
    outputList.append(li);
  }
}

initializePrefHandlerForUserScriptsPermissions();
renderCurrentScripts();
