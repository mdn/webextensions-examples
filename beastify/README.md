# beastify

## What it does ##

The extension includes:

* a browser action with a popup including HTML, CSS, and JS
* a content script
* three images, each of a different beast, packaged as web accessible resources

When the user clicks the browser action button, the popup is shown, enabling
the user to choose one of three beasts.

When it is shown, the popup injects a content script into the current page.

When the user chooses a beast, the extension sends the content script a message containing
the name of the chosen beast.

When the content script receives this message, it replaces the current page
content with an image of the chosen beast.

When the user clicks the reset button, the page reloads, and reverts to its original form.

Note that:

* if the user reloads the tab, or switches tabs, while the popup is open, then the popup won't be able to beastify the page any more (because the content script was injected into the original tab).

* by default [`tabs.executeScript()`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/executeScript) injects the script only when the web page and its resources have finished loading. This means that clicks in the popup will have no effect until the page has finished loading.

* it's not possible to inject content scripts into certain pages, including privileged browser pages like "about:debugging" and the [addons.mozilla.org](https://addons.mozilla.org/) website. If the user clicks the beastify icon when such a page is loaded into the active tab, the popup displays an error message.

## What it shows ##

* write a browser action with a popup
* how to have different browser_action images based upon the theme
* give the popup style and behavior using CSS and JS
* inject a content script programmatically using `tabs.executeScript()`
* send a message from the main extension to a content script
* use web accessible resources to enable web pages to load packaged content
* reload web pages
