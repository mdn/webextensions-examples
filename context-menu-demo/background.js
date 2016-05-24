/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated(n) {
  if (chrome.runtime.lastError) {
    console.log("error creating item:" + chrome.runtime.lastError);
  } else {
    console.log("item created successfully");
  }
}

/*
Called when the item has been removed, or when there was an error.
We'll just log success or failure here.
*/
function onRemoved() {
  if (chrome.runtime.lastError) {
    console.log("error removing item:" + chrome.runtime.lastError);
  } else {
    console.log("item removed successfully");
  }
}

/*
Create all the context menu items.
*/
chrome.contextMenus.create({
  id: "log-selection",
  title: chrome.i18n.getMessage("contextMenuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);

chrome.contextMenus.create({
  id: "remove-me",
  title: chrome.i18n.getMessage("contextMenuItemRemoveMe"),
  contexts: ["all"]
}, onCreated);

chrome.contextMenus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
}, onCreated);

chrome.contextMenus.create({
  id: "greenify",
  type: "radio",
  title: chrome.i18n.getMessage("contextMenuItemGreenify"),
  contexts: ["all"],
  checked: true
}, onCreated);

chrome.contextMenus.create({
  id: "bluify",
  type: "radio",
  title: chrome.i18n.getMessage("contextMenuItemBluify"),
  contexts: ["all"],
  checked: false
}, onCreated);

chrome.contextMenus.create({
  id: "separator-2",
  type: "separator",
  contexts: ["all"]
}, onCreated);

var checkedState = true;

chrome.contextMenus.create({
  id: "check-uncheck",
  type: "checkbox",
  title: chrome.i18n.getMessage("contextMenuItemUncheckMe"),
  contexts: ["all"],
  checked: checkedState
}, onCreated);

/*
Set a colored border on the document in the given tab.
*/
var blue = 'document.body.style.border = "5px solid blue"';
var green = 'document.body.style.border = "5px solid green"';

function borderify(tabId, color) {
  chrome.tabs.executeScript(tabId, {
    code: color
  });
}

/*
Toggle checkedState, and update the menu item's title
appropriately.

Note that we should not have to maintain checkedState independently like
this, but have to because Firefox does not currently pass the "checked"
property into the event listener.
*/
function updateCheckUncheck() {
  checkedState = !checkedState;
  if (checkedState) {
    chrome.contextMenus.update("check-uncheck", {
      title: chrome.i18n.getMessage("contextMenuItemUncheckMe"),
    });
  } else {
    chrome.contextMenus.update("check-uncheck", {
      title: chrome.i18n.getMessage("contextMenuItemCheckMe"),
    });
  }
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText);
      break;
    case "remove-me":
      chrome.contextMenus.remove(info.menuItemId, onRemoved);
      break;
    case "bluify":
      borderify(tab.id, blue);
      break;
    case "greenify":
      borderify(tab.id, green);
      break;
    case "check-uncheck":
      updateCheckUncheck();
      break;
  }
});
