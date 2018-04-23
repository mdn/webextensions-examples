# Context menu: Copy link with types

This example adds a context menu item to every link that copies the URL to the
clipboard, as plain text and as rich HTML.

## What it does

This extension includes:

* a background script that:
  - Registers a context menu item for every link.
  - Upon click, it invokes the function to copy text and HTML to the clipboard.
* a helper script, "clipboard-helper.js" that provides the copy-to-clipboard functionality.
  In the example, this script is run as a content script, but the actual functionality can also
  be used in visible extension pages such as extension button popups or extension tabs.
* a page, "preview.html" for testing the effect of copying to the clipboard.
  This page does not need to be part of the extension, and can directly be opened in the browser.

To test the extension, right-click on any link to open a context menu, and choose the
"Copy link to clipboard" option. Then open preview.html and paste the clipboard content
in the two displayed boxes. The first box will display "This is text: ..." and the second
box will display "This is HTML: ...".

Note: since the add-on relies on a content script for copying the text, the copy operation
will only succeed if the add-on is allowed to run scripts in the current page.
If you wish to successfully copy the text even if the current page cannot be scripted, then
you can open an (extension) page in a new tab as a fallback.

## What it shows

* how to put data on the [clipboard](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Interact_with_the_clipboard)
  with custom types ("text/plain" and "text/html" in the example).
* how to safely construct HTML from given text.
* how to safely create JavaScript code to run as a dynamic content script.
* how to dynamically run a static content script only once.
