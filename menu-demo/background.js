/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.runtime.onInstalled.addListener(() => {
  browser.menus.create({
    id: "log-selection",
    title: browser.i18n.getMessage("menuItemSelectionLogger"),
    contexts: ["selection"]
  });

  browser.menus.create({
    id: "remove-me",
    title: browser.i18n.getMessage("menuItemRemoveMe"),
    contexts: ["all"]
  });

  browser.menus.create({
    id: "separator-1",
    type: "separator",
    contexts: ["all"]
  });

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
  });

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
  });

  browser.menus.create({
    id: "separator-2",
    type: "separator",
    contexts: ["all"]
  });

  browser.menus.create({
    id: "check-uncheck",
    type: "checkbox",
    title: browser.i18n.getMessage("menuItemUncheckMe"),
    contexts: ["all"],
    checked: true,
  });

  browser.menus.create({
    id: "open-sidebar",
    title: browser.i18n.getMessage("menuItemOpenSidebar"),
    contexts: ["all"],
    command: "_execute_sidebar_action"
  });

  browser.menus.create({
    id: "tools-menu",
    title: browser.i18n.getMessage("menuItemToolsMenu"),
    contexts: ["tools_menu"],
  });
});

/*
Set a colored border on the document in the given tab.

Note that this only works on normal web pages, not special pages
like about:debugging.
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
Update the menu item's title according to current "checked" value.
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
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
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
