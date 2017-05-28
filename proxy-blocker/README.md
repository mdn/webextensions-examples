# proxy-filter

## What it does

This add-on registers a [PAC script](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_%28PAC%29_file) using the proxy API.

The PAC script is initialized with a list of hostnames: it blocks requests to any hosts that are in the list.

The list is given the following default values: `["example.com", "example.org"]`, but the user can add and remove hosts using the add-on's options page.

Note that the hostname-matching is very simple: hostnames must exactly match an entry in the list if they are to be blocked. So with the default settings, "example.org" would be blocked but "www.example.org" would be permitted.

To try it out:
* install it
* try visiting `http://example.com`, and see it is blocked
* visit `about:addons`, open the add-on's preferences, and try changing the hostnames in the text box
* try visiting some different pages, to see the effect of your changes.

## What it shows

* How to implement a simple PAC script, and register it using the proxy API.
* How to exchange messages between a PAC script and a background script.
