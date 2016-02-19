# page-to-extension-messaging

## What it does

This extension includes a content script, which is injected only into: "https://mdn.github.io/webextensions-examples/content-script-page-script-messaging.html".

The content script listens for clicks on a particular button on the page. When the button is clicked, the content script sends a message to any scripts running in the page.

Conversely, the content script listens for messages from the same window posted using window.postMessage. When the content script receives such a message, it displays an alert.

To test it out, visit https://mdn.github.io/webextensions-examples/content-script-page-script-messaging.html and press the buttons. One button sends a message from the page script to the content script, the other button sends a message in the other direction.

## What it shows

How to exchange messages between an extension's content scripts, and scripts running in a web page.
