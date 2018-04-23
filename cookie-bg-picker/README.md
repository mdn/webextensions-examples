# Cookie BG Picker
A background customizer WebExtension — click a button in the browser UI and select from a range of background image tiles and colors to customize the look of any web page you are on.

The WebExtension also uses cookies to save preferences for each site you customize, provided the cookie is able to be saved. On your return, your customizations will be remembered.

Works in Firefox 47+, and will also work as a Chrome extension, out of the box.

**This add-on injects JavaScript into web pages. The `addons.mozilla.org` domain disallows this operation, so this add-on will not work properly when it's run on pages in the `addons.mozilla.org` domain.**

## What it does

This extension includes:

* A browser action that creates a popup — within the popup is:
	* Several buttons to select different background images.
	* A color picker input element to select a new background color.
	* A reset button to remove any customizations that have been set.
	* Functions to save customization preferences into cookies for each site visited and customized.
	* Functions to send messages to the content script (see below) containing style information so that style customizations can be applied to the pages.
* A background script to retrieve any cookies previously set by the WebExtension for each page visited, and if so send messages to the content script (see below) containing style information so that previously saved style customizations can be applied to pages as soon as they are visited in the browser. The background script also injects the content script into each page visited.
* A content script that is injected into every page visited. Its function is to receive messages from the browser action and background scripts and apply the style information contained within to the current page.

		
Cookie BG Picker uses the WebExtension:

* [cookies API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies) to save/retrieve/remove the cookies.
* [tabs API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs) to retrieve information about the current tab (whenever a new URL is loaded and at each significant point thereafter), inject the content script into it, and to send messages between the browser action/background script and the content script.
* [runtime API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime) to receive and handle messages sent to the content script.

## What it shows

* How to persist data via cookies using a WebExtension.
* How to send messages between browser actions/background scripts and content scripts.

## Acknowledgements

* WebExtension icon courtesy of [icons8.com](http://icons8.com).
* Transparent background images taken from [Transparent Textures](https://www.transparenttextures.com/).
