# themed-icons

This example demonstrates how to use the prefers-color-scheme media query to adapt an SVG icon to dark and light themes.

## What it does

This extension includes:

* a background script, `background.js`.
* page (address bar) and browser (toolbar) action icons.

The extension displays the [page action](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction) on any webpage, and the extension test page, which the extension opens when it starts, and the [browser action](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/browserAction) is pinned to the toolbar when the extension is installed.

Clicking either icon opens the test extension page and switches to the next available theme.

When the active theme is enabled, the page and browser action change color based on the dark or light background color used in the UI.

For example:
- When the built-in Firefox Alpenglow or dark themes are active, the icons are black with a white outline.
- When the built-in Firefox light theme is active, the icons are red with a black outline. 

## NOTE: Implicit CSS filter applied to pageAction SVG icons in dark themes in Firefox Desktop 151 and earlier

In builds where the `about:config` preference `extensions.webextensions.pageActionIconDarkModeFilter.enabled` is set to `true` or not defined, a greyscale and brightness CSS filter is applied to page action icons for dark themes. This filter can reduce the contrast of icons that use multiple colors. (See [Bug 2001318](https://bugzilla.mozilla.org/2001318).)

This implicit CSS filter is turned off in Firefox Desktop Nightly in release 149 and later, and on the release channel
as part of [Bug 2016509](https://bugzilla.mozilla.org/20