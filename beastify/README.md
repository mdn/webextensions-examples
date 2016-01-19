# beastify

## What it does ##

The extension includes:

* a browser action with a popup including HTML, CSS, and JS
* a content script
* three images, each of a different beast, packaged as web accessible resources

When the user clicks the browser action button, the popup is shown, enabling
the user to choose one of three beasts.

When they choose a beast, the extension injects the content script into
the current page, and sends the content script a message containing
the name of the chosen beast.

When the content script receives this message, it replaces the current page
content with an image of the chosen beast.

## What it shows ##

* write a browser action with a popup
* give the popup style and behavior using CSS and JS
* inject a content script programmatically using `tabs.executeScript()`
* send a message from the main extension to a content script
* use web accessible resources to enable web pages to load packaged content
