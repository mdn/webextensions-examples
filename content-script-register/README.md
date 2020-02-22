# Content script registration

This extension demonstrates the `browser.contentScripts.register()` API, which enables an extension to register URL-matching content scripts at runtime.

The contentScripts.register() API is intended to enable an extension to register scripts that are packaged in the extension. If you want to register third-party user scripts, use the [userScripts API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/userScripts). Please refer to [user script registration](https://github.com/mdn/webextensions-examples/tree/master/user-script-register) for an example of that API.

This extension adds a browser action that shows a popup. The popup lets you specify:

* some code that comprises your content script
* one or more [match patterns](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns), comma-separated. The content script will only be loaded into pages whose URLs match these patterns.

Once these are set up you can register the content script by clicking "Register script". The extension will then register a content script with the given properties by calling `browser.contentScripts.register()`.

To keep things simple, you can only have one script registered at any time: if you click "Register script" again, the active script is unregistered. To do this, the extension keeps a reference to the `RegisteredContentScript` object returned from `browser.contentScripts.register()`: this object provides the `unregister()` method.

Note that the extension uses a background script to register the content scripts and to keep a reference to the `RegisteredContentScript` object. If it did not do this, then as soon as the popup window closed, the `RegisteredContentScript` would go out of scope and be destroyed, and the browser would then unregister the content script as part of cleanup.

## Default settings

The popup is initialized with default values for the pattern and the code:

* the pattern `*://*.org/*`, which loads the script into any HTTP or HTTPS pages on a `.org` domain.
* the code `document.body.innerHTML = '<h1>This page has been eaten<h1>'`

To try the extension, open the browser action, click "Register script" with the defaults, and load http://example.org/ or 
https://www.mozilla.org/. Then change the pattern or the code, and reload these or related pages.
