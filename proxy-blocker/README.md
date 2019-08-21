
## What it does

This extension uses the proxy API listener `onRequest` to listen for requests to visit a web page, compare the webpage's domain with a blocked host list, and proxy domains on the blocked list to 127.0.0.1.

The list of blocked domains is held in local storage and given the initial value `["example.com", "example.org"]` when the extension installs. The list can be modified through the extension"s options page.

Note that the hostname-matching is simple: hostnames must match an entry in the list if they are to be blocked. So with the default settings, "example.org" is blocked but "www.example.org" is permitted.

To try out this extension:
* install it
* visit `http://example.com` and see it is blocked
* visit `about:addons`, open the add-on's preferences, and change the hostnames in the text box
* visit some pages to see the effect of your changes.

## What it shows

* How to implement `browser.proxy.onRequest` and proxy requests.
* How to store and retrieve lists from local storage.
