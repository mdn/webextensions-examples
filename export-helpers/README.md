# export-helpers

## What it does

This extension demonstrates how to use [export helpers](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Content_scripts#Sharing_content_script_objects_with_page_scripts) in Firefox to share
JavaScript objects defined in content scripts with scripts loaded by web pages.

## How it works

This example is in two parts:

* an extension that consists of a content script and a background script
* a web page at: https://mdn.github.io/webextensions-examples/export-helpers.html

### The extension

 The extension loads a content script into the page at: https://mdn.github.io/webextensions-examples/export-helpers.html. The content script:
 
 * defines a function `notify()` and uses `exportFunction()` to export it to the page as a property of the global `window` object.
 * defines an object `messenger`, that has a member function `notify()`, and
uses `cloneInto()` to export that to the page as a property of the global `window` object.
 
 In the implementation of `notify()`, the content script sends a message to the extension's background script: when the background script gets the messages, it displays a [notification](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/notifications).

## The page

The page is just a normal web page. It contains two buttons and loads a script. The script:

* listens for clicks on the first button and calls:


    window.notify("Message from the page script!");

* listens for clicks on the other button and calls:


    window.messenger.notify("Message from the page script!");

These items are available in the page's scope because the content script exported them.

## How to use it

To see the extension in action:

1. install the extension
2. visit https://mdn.github.io/webextensions-examples/export-helpers.html
3. click one of the buttons in the page. You should see a notification from the extension.
