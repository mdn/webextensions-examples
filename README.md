# webextensions-examples
Example Firefox add-ons created using the WebExtensions API.

## beastify ##

An example to accompany a [walkthrough tutorial on MDN](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Walkthrough).

The extension includes:

* a browser action with a popup including HTML, CSS, and JS
* a content script
* three images, each of a different beast, packaged as web accessible resources

When the user clicks the browser action button, the popup is shown, enabling the user to choose one of three beasts.

When they choose, the extension injects the content script into the current page, and sends the content script a message containing the chosen beast.

When the content script receives this message, it replaces all <IMG> elements in the current page with the packaged image that corresponds to the chosen beast.

### What it shows ###

* how to write a browser action with a popup
* how to give the popup style and behavior using CSS and JS
* how to inject a content script programmatically into a tab using tabs.executeScript()
* how to send a message from the main extension to a content script
* how to use web accessible resources to enable web pages to load packaged content

## borderify ##

This extension just includes:

* a content script, "borderify.js", that is injected into any pages under "mozilla.org/" or any of its subdomains

The content script draws a border around the document.body.

### What it shows ###

* how to inject content scripts declaratively using manifest.json

## notify-link-clicks ##

This extension includes:

* a content script, "content-script.js", that is injected into any pages under "mozilla.org/" or any of its subdomains
* a background script, "background-script.js", 

The content script listens for clicks in the page it's attached to. If a click is on a link, it messages the link's href to the background script.

The background script listens for this message. When it receives one, it displays a notification containing the href.

### What it shows ###

* how to inject content scripts declaratively using manifest.json
* how to send messages from a content script to a background script
* how to display system notifications using the notifications API

## open-my-page ##

This extension includes:

* a background script, "background.js"
* a browser action
* a page "my-page.html"

All it does is: when the user clicks the button, open "my-page.html" in a new tab.

### What it shows ###

    how to listen for browser action clicks in a background script
    how to open a page packaged with your extension
