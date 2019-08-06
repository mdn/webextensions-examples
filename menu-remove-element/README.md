# menu-remove-element

## What it does

This extension adds a menu item that's shown when the context menu is opened in a document.
Upon click, a panel is shown, where the clicked element and its ancestor elements are displayed in a list.
Upon hovering over these elements, the corresponding elements in the document are visually highlighted.
When one of the list items are clicked, the element is removed from the page.

## What it shows

This extension demonstrates the following APIs:

- [`menus.create`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/menus/create)
- [`menus.onClicked`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/menus/onClicked) and in particular its [`info.targetElementId`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/OnClickData) property.
- [`menus.getTargetElement`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/getTargetElement)
- [`pageAction.openPopup`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/pageAction/openPopup)
- [`pageAction.show`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/pageAction/show) and [`pageAction.hide`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/pageAction/hide)
- [`tabs.executeScript`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs.executeScript)

The `pageAction.openPopup` method requires user interaction, which is satisfied by calling the method from the `menus.onClicked` event.

The `activeTab` permission is used to unlock access to the page upon clicking the menu item,
so that the `info.targetElementId` becomes available and `tabs.executeScript` can be used to run a content script in a specific frame in the tab.

The `menus.getTargetElement` API and `info.targetElementId` were introduced in Firefox 63.

## Polyfill

In browsers that do not support this API, an extension has to register a content script that listens to the "contextmenu" event, as shown in `menusGetTargetElementPolyfill.js`.

This example includes the polyfill to demonstrate how one can create an extension that is compatible with browsers that do not support a new API.
If you are not interested in supporting browsers that lack the `browser.menus.getTargetElement` API, modify the example as follows:

- Remove `menusGetTargetElementPolyfill.js`
- Modify popup.js and remove the entire if-block that starts with `if (!browser.menus.getTargetElement) {`.
