# menu-demo

This extension demonstrates the [menus API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/menus/).

**This add-on injects JavaScript into web pages. The `addons.mozilla.org` domain doesn't allow that, so this extension doesn't work properly when run on pages in the `addons.mozilla.org` domain.**

**This add-on uses the `menus` namespace to access the functions it needs to create menu items. Note that Chrome, Edge, and Opera use the `contextMenus` namespace for this, so this extension doesn't work in these browsers. For compatibility with these browsers, Firefox also offers this API on the `contextMenus` namespace. However, to make this extension work with other browsers, you would need to allow for feature differences when using `contextMenus', such as the lack of support for specifying icons when creating a menu item.**

## What it does

This add-on adds these items to the browser's context menu:

* one shown when there is a selection in the page, which, when clicked, logs the selected text to the browser console.
* one shown in all contexts, which is removed when clicked.
* two "radio" items that are shown in all contexts. These items are grouped using a separator item on each side. One radio item adds a blue border to the page, the other adds a green border. **Note** These buttons only work on normal web pages, not special pages such as `about:debugging`.
* one "checkbox" item, shown in all contexts, whose title is updated when the item is clicked.
* one item that uses the "commands" property to open the add-on's sidebar.

It also adds one item to the browser's "Tools" menu.

## What it shows

* How to create various types of menu items:
  * normal
  * radio
  * separator
  * checkbox
* How to use contexts to control when an item appears.
* How to update an item's properties.
* How to remove an item.
