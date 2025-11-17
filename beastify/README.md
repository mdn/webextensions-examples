# beastify

This extension used a tootlbar button to enable the section of beast that replaces the content of the active web page.

## What it does ##

The extension includes:

* An action with a popup that includes HTML, CSS, and JavaScript.
* A content script.
* Three images, each of a beast, packaged as web accessible resources.

When the user clicks the action (toolbar button), the popup displays, enabling the user to choose one of three beasts.

When it's displayed, the popup injects a content script into the active page.

When the user chooses a beast, the extension sends the content script a message containing the name of the chosen beast.

When the content script receives this message, it replaces the active page content with an image of the chosen beast.

When the user clicks the reset button, the page reloads and reverts to its original form.

Note that:

* If the user reloads the tab, or switches tabs, while the popup is open, then the popup can't beastify the page (because the content script was injected into the original tab).

* By default, [`scripting.executeScript()`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/scripting/executeScript) injects the script only when the web page and its resources have finished loading. This means that clicks in the popup have no effect until the page has finished loading.

* It isn't possible to inject content scripts into certain pages, including privileged browser pages such as "about:debugging" and the [addons.mozilla.org](https://addons.mozilla.org/) website. If the user clicks the beastify icon on one of these pages, the popup displays an error message.

## What it shows ##

In this eample, you see how to:

* Write an action (toolbar button) with a popup.
* Display action (toolbar button) icons based on the browser theme.
* Give a popup style and behavior using CSS and JavaScript.
* Inject a content script programmatically using `scripting.executeScript()`.
* Send a message from the main extension to a content script.
* Use web accessible resources to enable web pages to load packaged content.
* Reload web pages.
