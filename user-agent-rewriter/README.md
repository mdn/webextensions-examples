# user-agent-rewriter

## What it does

This extension uses the webRequest API to rewrite the browser's User Agent header, but only when visiting pages under "https://httpbin.org", for example: https://httpbin.org/user-agent

It adds a browser action. The browser action has a popup that lets the user choose one of three browsers: Firefox 41, Chrome 41, and IE 11. When the user chooses a browser, the extension then rewrites the User Agent header so the real browser identifies itself as the chosen browser on the site https://httpbin.org/.

## What it shows

* how to intercept and modify HTTP requests
* how to write a browser action with a popup
* how to give the popup style and behavior using CSS and JS
* how to send a message from a popup script to a background script
