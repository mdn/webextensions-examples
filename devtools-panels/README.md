# devtools-panels

**Adds a tab to the devtools toolbox. Click on the tab to see the different options. Each button will be positioned at a specific location on the web page.**

## What it does ##

The extension includes:

* Adding a new tab to the devtools bar

In this tab, several buttons are presented

* A button H1

* A button Background

* A button Jquery

* A button Message

When you activate the devtools bar either from inspected the item or from the F12 key, a new one is displayed called "My Panel"


## What it shows ##

You click on the 'My Panel' tab to see the various clickable buttons:

* The button: H1

This uses the inspect() helper to select the first <h1> element in the page
You can access the page https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval#Examples for more information

* The button: Background

This uses the $0 helper to set the background color of the element that's currently selected in the Inspector
You can access the page https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval#Examples for more information

* The button: jQuery

This tests whether jQuery is defined in the inspected window, and logs the result. Note that this wouldn't work in a content script, because even if jQuery were defined, the content script would not see it
You can access the page https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval#Examples for more information

* The button: message

This test shows how to send a message in the content script
You can access the page https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Extending_the_developer_tools for more information


