# User script registration

This extension demonstrates the [`browser.userScripts.register()`](https://wiki.developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/userScripts/Register) API.  

The extension includes an [API script](https://wiki.developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/user_scripts) (`customUserScriptAPIs.js`) that enables user scripts to make use of `browser.storage.local`. 

To enable a user script to be specified and registered, this extension includes a sidebar action. The sidebar enables you to define the following properties that control the execution of a registered script, with default values provided:

* the host pattern `*://*.org/*`, which loads the script into any HTTP or HTTPS pages on a `.org` domain.
* script code that replaces the content of the pattern matched page with the message "This page has been eaten". The script also uses the API script stubs to save and recall the URL of each page "eaten". Information on the last and current "eaten" page is then included in the "eaten" message.
* a script ID that is stored in the user script metadata and then used in the API script to store separate values for each registered script.

All other properties use their default value.

Clicking "Register script" registers the script by calling `browser.userScripts.register()`.

In this example, only one script can be registered at a time: registering a new script unregisters the active script. The extension does this by keeping a reference to the `RegisteredUserScript` object returned from `browser.userScripts.register()`: this object provides the `unregister()` method.

To try the extension, click "Register script" with the defaults and load http://example.org/ or 
https://www.mozilla.org/. Then change the pattern or the code and reload these or related pages.
