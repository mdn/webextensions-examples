# imagify

**This add-on injects JavaScript into web pages. The `addons.mozilla.org` domain disallows this operation, so this add-on will not work properly when it's run on pages in the `addons.mozilla.org` domain.**

## What it does ##

The extension includes:

* a sidebar including HTML, CSS, and JavaScript
* a content script
* a web page template, packaged as web accessible resources

When the extension loads the user is offered a file picker and drop zone as methods to choose an image file.

Once an image file has been chosen, the extension injects the content script into the active tab, and sends the content script a message containing the URL of the chosen image.

When the content script receives this message, it replaces the current page content with the chosen image file.

## What it shows ##

How to:
* write a sidebar
* implement a file picker and drag and drop zone
* give a sidebar style and behavior using CSS and JavaScript
* inject a content script programmatically using `tabs.executeScript()`
* send a message from the main extension to a content script
