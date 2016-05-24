# context-menu-demo

A demo of the [contextMenus API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contextMenus/).

## What it does

This add-on adds several items to the browser's context menu:

* one shown when there is a selection in the page, that logs the selected text
when clicked.
* one shown in all contexts, that is removed when clicked.
* two "radio" items that are shown when a page under "developer.mozilla.org"
is loaded. These items are grouped using a separator item on each side.
One radio item adds a blue border to the page, the other adds a green border.
* one "checkbox" item, shown in all contexts, whose title is updated when the
item is clicked.

Note that the "documentUrlPatterns" option is not
currently supported in Firefox.

## What it shows

* How to create various types of context menu item:
  * normal
  * radio
  * separator
  * checkbox
* How to use contexts to control when an item appears.
* How to display an item only for certain pages.
* How to update an item's properties.
* How to remove an item.
