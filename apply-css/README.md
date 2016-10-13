# apply-css

## What it does

This extension includes:

* a background script, "background.js"
* a page action

It adds the [page action](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction)
to every tab the user opens. Clicking the page action
for a tab applies some CSS using [tabs.insertCSS](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/tabs/insertCSS).

Clicking again removes the CSS using [tabs.removeCSS](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/tabs/removeCSS).

## What it shows

* some basic page action functions
* how to apply and remove CSS.
