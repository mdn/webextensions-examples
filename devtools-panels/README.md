# devtools-panels

**Adds a new panel to the developer tools. The panel contains buttons that demonstrate various basic features of the devtools API.**

## What it does ##

This extension adds a new panel to the developer tools. The panel contains four buttons:

* **Inspect H1**: this injects a script into the active page. The script uses the [`inspect()` helper function](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval#Helpers) to select the first &lt;h1&gt; element in the page in the devtools inspector.

* **Reddinate inspected element**: this injects a script into the active page. The script uses the [`$0` helper](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval#Helpers) to get the element that's currently selected in the devtools Inspector, and gives it a red background.

* **Check for jQuery**: this injects a script into the active page. The script checks whether `jQuery` is defined in the page, and logs a string to the add-on debugging console (note: *not* the web console) recording the result.

* **Inject content script**: this sends a message to the extension's background script, asking it to inject a given content script in the active page.

To learn more about the devtools APIs, see [Extending the developer tools](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Extending_the_developer_tools).

## What it shows ##

* How to add a new panel to the devtools.

* How to inject a script into the active page using [`inspectedWindow.eval()`](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval).

* How to use  [helpers](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval#Helpers) to interact with the devtools.

* That unlike content scripts, scripts injected with `eval()` can see objects, like `jQuery`, that were added by page scripts.

* How to send messages to the background script.
