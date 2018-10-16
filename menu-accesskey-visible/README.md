# menu-accesskey-visible

Demonstrates access keys in the [menus API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/menus/).

**This add-on uses the `menus` namespace to access the functions it needs to create menu items. Note that Chrome, Edge, and Opera all use the `contextMenus` namespace for this, so this extension will not work in these browsers. For compatibility with these browsers, Firefox also offers the `contextMenus` namespace, so to make this extension work with other browsers, use `contextMenus`.**

## What it does

This extension adds a menu item that has an access key.
An access key allows users to activate the menu item with one keystroke.
On Linux and Windows, the chosen access key is underlined.
On macOS, access keys are supported too, but without visual indicators.

When an access key is shared by multiple menu items, pressing the key
will switch between the menu items that share the access key. Otherwise
(if an access key is bound to one menu item only), the menu item is clicked.

The menu item in this demo logs a message to the extension's console upon
click. This console can be shown via the "Debug" button at `about:debugging` .

## What it shows

* Specifying access keys via `&` in the menu item title.
* Detecting feature support, exemplified by detecting support for the `visible`
  property of the `menus.update` API that was also introduced in Firefox 63.

As access keys are only supported in Firefox 63 and later, this example also
shows how one can detect the feature support in the browser and fall back to
menu items without access keys if needed.
