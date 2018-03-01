# menu-labelled-open

## What it does

This extension adds a menu item that's shown when the context menu is shown over a link. When the item is clicked, it just opens the link in the current tab.

The extension also listens for the `onShown` event: when this event is fired, the extension gets the hostname for the link and displays it in the menu item's title, so the user knows the hostname for the link they are thinking of clicking.

## What it shows

This extension is a demo of the [`menus.onShown` ](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/menus/onShown) and [`menus.refresh()`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/menus/refresh) features of the `menus` API.

The `onShown` event enables extensions to be notified when the menu is shown. At that point they are able to add, remove, or update their menu items, then refresh the menu using `refresh()`.
