# User script

This extension demonstrates the [`browser.userScripts.register()`](https://wiki.developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/userScripts/RegisteredUserScript) API. This API enables an extension to register URL-matching scripts at runtime, scripts that run in isolated sandboxes.

The extension includes an API script (`customUserScriptAPIs.js`) that provides stubs that enable a registered script to make use of `browser.storage.local`. 

To enable a user script to be specified and registered, this extension includes a sidebar action. The sidebar enables you to define all the properties associated with controlling the execution of a registered script. The example includes values for:

* the host pattern `*://*.org/*`, which loads the script into any HTTP or HTTPS pages on a `.org` domain.
* script code that replaces the content of the pattern matched page with the message "This page has been eaten". The script also uses the API script stubs to save and recall the URL of each page "eaten". Information on the last and current "eaten" page is then included in the "eaten" message.

All other properties are empty or given their default value.

Clicking "Register script" register the script by calling `browser.userScripts.register()`.

You can only have one script registered at any time: registering a new script unregisters the existing script. The extension does this by keeping a reference to the `RegisteredUserScript` object returned from `browser.userScripts.register()`: this object provides the `unregister()` method.

To try the extension, click "Register script" with the defaults and load http://example.org/ or 
https://www.mozilla.org/. Then try changing the pattern or the code and reloading these or related pages.
