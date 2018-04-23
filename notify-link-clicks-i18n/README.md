# notify-link-clicks-i18n

**This add-on injects JavaScript into web pages. The `addons.mozilla.org` domain disallows this operation, so this add-on will not work properly when it's run on pages in the `addons.mozilla.org` domain.**

## What it does

This extension includes:

* a content script, "content-script.js", that is injected into all pages
* a background script, "background-script.js"

The content script listens for clicks in the page it's attached to.
If a click is on a link, the content script sends the link's href
to the background script.

The background script listens for this message. When the background script
receives the message, it displays a notification containing the href.

The notification's content, as well as the extension's name and description, are
localized into German, Dutch, and Japanese, as well as the default en-US.

# What it shows

* how to inject content scripts declaratively using manifest.json
* how to send messages from a content script to a background script
* how to display system notifications using the notifications API
* how to use the internationalization (i18n) system
