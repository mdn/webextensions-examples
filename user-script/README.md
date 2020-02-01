# User script

This extension demonstrates the `browser.userScripts.register()` API, which enables an extension to register URL-matching scripts at runtime which runs in isolated sandboxes.

This extension adds a browser action that shows a popup. The popup lets you specify:

* some code that comprises your content script
* one or more [match patterns](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns), comma-separated. The content script will only be loaded into pages whose URLs match these patterns.

Once these are set up you can register the user script by clicking "Register script". The extension will then register a "User Script" with the given properties by calling `browser.userScripts.register()`.

To keep things simple, you can only have one script registered at any time: if you click "Register script" again, the old script is unregistered. To do this, the extension keeps a reference to the `RegisteredUserScript` object returned from `browser.userScripts.register()`: this object provides the `unregister()` method.

Note that the extension uses a background script to register the user scripts and to keep a reference to the `RegisteredUserScript` object. If it did not do this, then as soon as the popup window closed, the `RegisteredUserScript` would go out of scope and be destroyed, and the browser would then unregister the content script as part of cleanup.

## Default settings

The popup is initialized with some default values for the pattern and the code:

* the pattern `*://*.org/*`, which will load the script into any HTTP or HTTPS pages on a `.org` domain.
* the code `document.body.innerHTML = '<h1>This page has been eaten<h1>'`

To try the extension out quickly, just click "Register script" with these defaults, and load http://example.org/ or 
https://www.mozilla.org/. Then try changing the pattern or the code, and reloading these or related pages.
