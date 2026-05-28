/*
Called when a menu item is created, or when creation fails due to an error.
We log the error here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError.message}`);
  }
}

/*
Called when the menu item is removed.
We log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there is an error in removing a menu item.
We log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Creates all the context menu items.
*/
browser.runtime.onInstalled.addListener(() => {
  browser.menus.create({
    id: "log-selection",
    title: browser.i18n.getMessage("menuItemSelectionLogger"),
    contexts: ["selection"]
  }, onCreated);

  browser.menus.create({
    id: "remove-me",
    title: browser.i18n.getMessage("menuItemRemoveMe"),
    contexts: ["all"]
  }, onCreated);

  browser.menus.create({
    id: "separator-1",
    type: "separator",
    contexts: ["all"]
  }, onCreated);

  browser.menus.create({
    id: "greenify",
    type: "radio",
    title: browser.i18n.getMessage("menuItemGreenify"),
    contexts: ["all"],
    checked: true,
    icons: {
      "16": "icons/paint-green-16.png",
      "32": "icons/paint-green-32.png"
    }
  }, onCreated);

  browser.menus.create({
    id: "bluify",
    type: "radio",
    title: browser.i18n.getMessage("menuItemBluify"),
    contexts: ["all"],
    checked: false,
    icons: {
      "16": "icons/paint-blue-16.png",
      "32": "icons/paint-blue-32.png"
    }
  }, onCreated);

  browser.menus.create({
    id: "separator-2",
    type: "separator",
    contexts: ["all"]
  }, onCreated);

  browser.menus.create({
    id: "check-uncheck",
    type: "checkbox",
    title: browser.i18n.getMessage("menuItemUncheckMe"),
    contexts: ["all"],
    checked: true,
  }, onCreated);

  browser.menus.create({
    id: "open-sidebar",
    title: browser.i18n.getMessage("menuItemOpenSidebar"),
    contexts: ["all"],
    command: "_execute_sidebar_action"
  }, onCreated);

  browser.menus.create({
    id: "tools-menu",
    title: browser.i18n.getMessage("menuItemToolsMenu"),
    contexts: ["tools_menu"],
  }, onCreated);
});

/*
Sets a colored border on the document in the tab returned by the onClicked listener.

Note that this only works on normal web pages, not special pages, such as about:debugging.
*/
const blue = "5px solid blue";
const green = "5px solid green";

function borderify(tabId, color) {
  browser.scripting.executeScript({
    target: { tabId },
    func: (border) => { document.body.style.border = border; },
    args: [color]
  });
}

/*
Updates the menu item's title according to "checked" value.
*/
function updateCheckUncheck(checkedState) {
  if (checkedState) {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemUncheckMe"),
    });
  } else {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemCheckMe"),
    });
  }
}

/*
The click event listener, where the extension performs the appropriate action given the ID of the menu item clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText);
      break;
    case "remove-me":
      browser.menus.remove(info.menuItemId).then(onRemoved, onError);
      break;
    case "bluify":
      borderify(tab.id, blue);
      break;
    case "greenify":
      borderify(tab.id, green);
      break;
    case "check-uncheck":
      updateCheckUncheck(info.checked);
      break;
    case "open-sidebar":
      console.warn("_execute_sidebar_action not supported");
      break;
    case "tools-menu":
      console.log("Clicked the tools menu item");
      break;
  }
});
