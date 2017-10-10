# menu-demo

A demo of the [menus API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/menus/).

**This add-on injects JavaScript into web pages. The `addons.mozilla.org` domain disallows this operation, so this add-on will not work properly when it's run on pages in the `addons.mozilla.org` domain.**

**This add-on uses the `menus` namespace to access the functions it needs to create menu items. Note that Chrome, Edge, and Opera all use the `contextMenus` namespace for this, so this extension will not work in these browsers. For compatibility with these browsers, Firefox also offers the `contextMenus` namespace, so to make this extension work with other browsers, use `contextMenus`.**

## What it does

This add-on adds several items to the browser's context menu:

* one shown when there is a selection in the page, that logs the selected text
to the browser console when clicked.
* one shown in all contexts, that is removed when clicked.
* two "radio" items that are shown in all contexts.
These items are grouped using a separator item on each side.
One radio item adds a blue border to the page, the other adds a green border.
Note that these buttons only work on normal web pages, not special pages
like about:debugging.
* one "checkbox" item, shown in all contexts, whose title is updated when the
item is clicked.
* one item that uses the "commands" property to open the add-on's sidebar.

It also adds one item to the browser's "Tools" menu.

## What it shows

* How to create various types of menu item:
  * normal
  * radio
  * separator
  * checkbox
* How to use contexts to control when an item appears.
* How to update an item's properties.
* How to remove an item.
