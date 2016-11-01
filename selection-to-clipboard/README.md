# selection-to-clipboard

## What it does

This extension includes:

* a content script, "content-script.js", that is injected into all pages

The content script listens for text selections in the page it's attached to and copies the text to the clipboard on mouse-up.

# What it shows

* how to inject content scripts declaratively using manifest.json
* how to write to the [clipboard](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Interact_with_the_clipboard)
