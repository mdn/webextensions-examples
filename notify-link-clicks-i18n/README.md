# notify-link-clicks-i18n

This add-on injects JavaScript into web pages that passes messages to the extension's background script when a link is clicked. The background script use the information in the message to create a notification. The extension illustrates how to localize the content of the notification as well as the extension's name and description.

## What it does

This extension includes a:

* Content script, "content-script.js", that is injected into all pages.
* Background script, "background-script.js".

The content script listens for clicks in the page it's attached to.
If a click is on a link, the content script sends the link's href
to the background script.

**The `addons.mozilla.org` domain doesn't allow scripts to be injected into its pages. Therefore, this extension doesn't work on pages in the `addons.mozilla.org` domain.**

The background script listens for this message. When the background script
receives the message, it displays a notification containing the href.

The notification's content, as well as the extension's name and description, are
localized into German, Dutch, and Japanese, as well as the default en-US.

# What it shows

This example extension shows how to:

* Inject content scripts declaratively using manifest.json.
* Send messages from a content script to a background script.
* Display system notifications using the notifications API.
* Use the internationalization (i18n) system.
