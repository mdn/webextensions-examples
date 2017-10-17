# session-state

## What it does

This extension adds a context menu item. When the user clicks the context menu item, the extension adds a border to the page.

But the extension also uses `sessions.setTabValue` to store the fact that it has added a border to this page. If the user closes the page, then restores it, the extension will retrieve this fact using `sessions.getTabValue`, and use that to reapply the border.

Note: to restore a tab, press Control+Shift+T (or Command+Shift+T on a Mac). In Firefox you can also restore the tab from your "History->Recently Closed Tabs" menu.

## What it shows

This example demonstrates how you can use the [sessions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/sessions) API to store and retrieve arbitrary state that you want to associate with a tab or window. Then if the tab/window is closed and subsequently restored, you can retrieve the state.
